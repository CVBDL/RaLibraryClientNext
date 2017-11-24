import {
  ActivatedRoute,
  ParamMap,
  Router
} from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { _throw as rxThrow } from "rxjs/observable/throw";
import { filter, switchMap } from 'rxjs/operators';

import { AuthenticationService } from "../../core/authentication.service";
import { Book } from "../../shared/book";
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

  constructor(
      private dialog: MatDialog,
      private snackBar: MatSnackBar,
      private auth: AuthenticationService,
      private booksService: BooksService,
      private errHandler: HttpErrorHandlerService,
      private route: ActivatedRoute,
      private router: Router,
      private usersService: UsersService) {
    this.book = null;
    this.defaultThumbnailLink = './assets/img/book_cover.jpg';
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id: number = Number(params.get('id'));

          if (Number.isNaN(id)) {
            return rxThrow(ERROR_TYPE.INVALID_ID);

          } else {
            return this.booksService.get(id);
          }
        })
      )
      .subscribe(data => {
        this.book = data;

        if (this.book && !this.book.ThumbnailLink) {
          this.book.ThumbnailLink = this.defaultThumbnailLink;
        }

      }, err => {
        if (err === ERROR_TYPE.INVALID_ID) {
          this.router.navigateByUrl('/browse/books');
        }
      });
  }

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

  private confirm(): Observable<boolean> {
    let confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Are you sure to borrow this book?'
      }
    });

    return confirmDialogRef.afterClosed();
  }

  private borrow(id: number): void {
    this.usersService.borrowBook(id)
      .subscribe(() => {
        this.showMessage('Success', 'Borrow');
        if (this.book) {
          this.book.IsBorrowed = true;
        }

      }, err => {
        this.errHandler.handle(err);
      });
  }

  private showMessage(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}

enum ERROR_TYPE {
  INVALID_ID
}
