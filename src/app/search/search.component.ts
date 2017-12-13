import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {
  filter,
  map,
  switchMap
} from 'rxjs/operators';

import { AvailableBooksFilter } from "./filter-available-books";
import { Book } from "../shared/book.model";
import { BooksService } from "../core/books.service";
import { Filter } from "./filter";

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  books: Book[];
  filters: Filter<Book>[];
  isSearching: boolean;
  keyword: string;

  constructor(private booksService: BooksService) {
    this.books = [];
    this.filters = [];
    this.isSearching = false;
    this.keyword = '';
  }

  ngOnInit(): void {
    this.filters.push(new AvailableBooksFilter());
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
      .subscribe(
        data => {
          this.books = data;
        },
        (err) => {
          this.isSearching = false;
        },
        () => {
          this.isSearching = false;
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
