import {
  ActivatedRoute,
  ParamMap,
  Router
} from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog, MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { _throw as rxThrow } from "rxjs/observable/throw";
import { filter, switchMap } from 'rxjs/operators';

import { AuthenticationService } from "../../core/authentication.service";
import { Book } from "../../shared/book.model";
import { BooksService } from "../../core/books.service";
import { ConfirmationDialogComponent } from "../../core/confirmation-dialog/confirmation-dialog.component";
import { HttpErrorHandlerService } from "../../core/http-error-handler.service";
import { LoginDialogComponent } from "../../core/login-dialog/login-dialog.component";
import { UsersService } from "../../core/users.service";

@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book | null;

  private readonly defaultThumbnailLink: string;
  private readonly httpNotFoundError: HttpErrorResponse;

  constructor(
      private auth: AuthenticationService,
      private booksService: BooksService,
      private dialog: MatDialog,
      private errHandler: HttpErrorHandlerService,
      private route: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      private usersService: UsersService) {
    this.book = null;
    this.defaultThumbnailLink = './assets/img/book_cover.jpg';
    this.httpNotFoundError = new HttpErrorResponse({
      status: 404
    });
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id: number = Number(params.get('id'));

          if (Number.isNaN(id)) {
            return rxThrow(this.httpNotFoundError);

          } else {
            return this.booksService.get(id);
          }
        })
      )
      .subscribe(
        (data: Book) => {
          this.book = data;
          if (this.book && !this.book.ThumbnailLink) {
            this.book.ThumbnailLink = this.defaultThumbnailLink;
          }
        },
        (err: HttpErrorResponse) => {
          this.errHandler.handle(err);
        });
  }

  /**
   * Workflow of borrowing a book by id.
   * @param id Book's id.
   */
  borrowBook(id: number): void {
    if (!this.auth.isAuthenticated) {
      let dialogRef = this.dialog.open(LoginDialogComponent);

      dialogRef.afterClosed()
        .subscribe(() => {
          if (this.auth.isAuthenticated) {
            this.confirm()
              .pipe(filter(data => data === true))
              .subscribe(() => {
                this.borrow(id);
              });
          }
        });

    } else {
      this.confirm()
        .pipe(filter(data => data === true))
        .subscribe(() => {
          this.borrow(id);
        });
    }
  }

  /**
   * Open confirmation dialog.
   */
  private confirm(): Observable<boolean> {
    let confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Are you sure to borrow this book?'
      }
    });

    return confirmDialogRef.afterClosed();
  }

  /**
   * Borrow a book by id.
   * @param id Book's id.
   */
  private borrow(id: number): void {
    this.usersService.borrowBook(id)
      .subscribe(
        () => {
          this.showMessage('Success', 'Borrow');
          if (this.book) {
            this.book.IsBorrowed = true;
          }
        },
        (err: HttpErrorResponse) => {
          this.errHandler.handle(err);
        });
  }

  /**
   * Show message helper.
   * @param message Message.
   * @param action Action.
   */
  private showMessage(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
