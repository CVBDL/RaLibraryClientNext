import { Component, OnInit } from '@angular/core';

import { Book } from "../../shared/book.model";
import { BooksService } from "../../core/books.service";
import { HttpErrorHandlerService } from "../../core/http-error-handler.service";

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[];
  isLoading: boolean;

  constructor(
      private booksService: BooksService,
      private errHandler: HttpErrorHandlerService) {
    this.books = [];
    this.isLoading = false;
  }
  
  ngOnInit() {
    this.loadBooks();
  }

  /**
   * Force to fetch books from server.
   */
  onClickRefresh(): void {
    this.loadBooks(true);
  }

  /**
   * Load books.
   * @param force Force to fetch from server.
   */
  private loadBooks(force: boolean = false): void {
    this.isLoading = true;
    this.booksService
      .list(force)
      .subscribe(
        data => {
          this.books = data;
        },
        err => {
          this.isLoading = false;
          this.errHandler.handle(err);
        },
        () => {
          this.isLoading = false;
        });
  }

}
