import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map, filter, switchMap } from 'rxjs/operators';

import { Book } from "../shared/book";
import { BooksService } from "../core/books.service";

@Component({
  selector: 'ral-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  books: Book[];
  keyword: string = '';
  filters: any[] = [{
    label: 'Available',
    isSelected: true
  }];

  private isSearching: boolean = false;

  constructor(private booksService: BooksService) { }

  search(): void {
    let isAvailableFilterOn: boolean = this.filters[0].isSelected,
      kw = this.keyword;

    this.isSearching = true;
    this.booksService.list()
      .pipe(
        map(this.selectKeyword(kw)),
        map(this.selectAvailable(isAvailableFilterOn))
      )
      .subscribe(
        data => {
          this.books = data;
          this.isSearching = false;
        },
        () => this.isSearching = false);
  }

  private selectKeyword(keyword: string = ''): (b: Book[]) => Book[] {
    return function(books: Book[]): Book[] {
      let filteredBooks: Book[] = [];
      books.forEach(book => {
        if (book.Title.toLowerCase().includes(keyword.toLowerCase())) {
          filteredBooks.push(book);
        }
      });
      return filteredBooks;
    };
  }

  /**
   * Available means a book is not borrowed by others.
   * @param {boolen} isOn  Enable this filter or not.
   */
  private selectAvailable(isOn: boolean = false): (b: Book[]) => Book[] {
    return function(books: Book[]): Book[] {
      if (!isOn) return books;

      let filteredBooks: Book[] = [];
      books.forEach(book => {
        if (!book.IsBorrowed) {
          filteredBooks.push(book);
        }
      });
      return filteredBooks;
    };
  }

}
