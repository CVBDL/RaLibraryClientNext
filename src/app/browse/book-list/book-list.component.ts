import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subject } from "rxjs/Subject";
import { takeUntil } from 'rxjs/operators/takeUntil';

import { Book } from "../../shared/book.model";
import { BooksService } from "../../core/books.service";
import { HttpErrorHandlerService } from "../../core/http-error-handler.service";

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[];
  isLoading: boolean;

  private ngUnsubscribe: Subject<boolean>;

  constructor(
      private booksService: BooksService,
      private errHandler: HttpErrorHandlerService) {
    this.books = [];
    this.isLoading = false;
    this.ngUnsubscribe = new Subject<boolean>();
  }

  ngOnInit() {
    this.loadBooks();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
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
      .pipe(takeUntil(this.ngUnsubscribe))
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
