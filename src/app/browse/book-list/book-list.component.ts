import { Component, OnInit } from '@angular/core';

import { Book } from "../../shared/book";
import { BooksService } from "../../core/books.service";
import { HttpErrorHandlerService } from "../../core/http-error-handler.service";

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[];
  isLoading: boolean = false;

  constructor(
    private booksService: BooksService,
    private errHandler: HttpErrorHandlerService) { }
  
  ngOnInit() {
    this.loadBooks();
  }

  onClickRefresh(): void {
    this.loadBooks(true);
  }

  private loadBooks(force: boolean = false): void {
    this.isLoading = true;
    this.booksService.list(force)
      .subscribe(
        data => {
          this.isLoading = false;
          this.books = data;
        },
        err => {
          this.isLoading = false;
          this.errHandler.handle(err);
        });
  }

}
