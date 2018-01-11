import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import {
  filter,
  map,
  switchMap,
  takeUntil
} from 'rxjs/operators';

import { AvailableBooksFilter } from "./filter-available-books";
import { Book } from "../shared/book.model";
import { BooksService } from "../core/books.service";
import { StorageService } from "../core/storage.service";
import { Filter } from "./filter";

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  readonly placeholder: string = 'Book name or code';

  books: Book[];
  filters: Filter<Book>[];
  isSearching: boolean;
  keyword: string;

  private readonly filtersStorageKey: string = 'searchFilters';
  private readonly keywordStorageKey: string = 'searchKeyword';
  private ngUnsubscribe: Subject<boolean>;

  constructor(
      private booksService: BooksService,
      private storage: StorageService) {
    this.books = [];
    this.filters = [];
    this.isSearching = false;
    this.keyword = '';
    this.ngUnsubscribe = new Subject<boolean>();
  }

  ngOnInit(): void {
    let hasInitSearch: boolean = false;

    if (this.storage.getItem(this.filtersStorageKey) !== undefined) {
      this.filters = this.storage.getItem(this.filtersStorageKey);
      hasInitSearch = true;

    } else {
      this.filters.push(new AvailableBooksFilter());
    }

    if (this.storage.getItem(this.keywordStorageKey) !== undefined) {
      this.keyword = this.storage.getItem(this.keywordStorageKey);
      hasInitSearch = true;
    }

    if (hasInitSearch) {
      this.search();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  /**
   * Search books by keywords and filters.
   */
  search(): void {
    this.isSearching = true;
    this.booksService
      .list()
      .pipe(
        map(this.selectKeyword(this.keyword)),
        map(this.applyFilters())
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        data => {
          this.books = data;
        },
        err => {
          this.isSearching = false;
        },
        () => {
          this.isSearching = false;

          // cache the current search criteria
          this.storage.setItem('searchFilters', this.filters);
          this.storage.setItem('searchKeyword', this.keyword);
        });
  }

  /**
   * Returns a function that apply all the custom filters.
   */
  private applyFilters(): (books: Book[]) => Book[] {
    return (books: Book[]): Book[] => {
      return this.filters.reduce((filteredBooks, filter) => {
        return filter.filter(filteredBooks);
      }, books);
    };
  }

  /**
   * Returns a function that filter books by keyword.
   * @param keyword Search keyword.
   */
  private selectKeyword(keyword: string = ''): (b: Book[]) => Book[] {
    return (books: Book[]): Book[] => {
      return books.filter(book => {
        return (this.isMatchTitle(book, keyword)
               || this.isMatchCode(book, keyword));
      });
    };
  }

  private isMatchTitle(book: Book, title: string): boolean {
    return book.Title.toLowerCase().includes(title.toLowerCase());
  }

  private isMatchCode(book: Book, code: string): boolean {
    return book.Code.toLowerCase() === code.toLowerCase();
  }

}
