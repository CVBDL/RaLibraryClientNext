import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
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
  book: Book;
  isBorrowed: boolean = true;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private auth: AuthenticationService,
    private booksService: BooksService,
    private errHandler: HttpErrorHandlerService,
    private route: ActivatedRoute,
    private usersService: UsersService) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.booksService.get(Number(params.get('id'))))
      )
      .subscribe(book => {
        this.book = book;
        
        if (this.book) {
          this.isBorrowed = book.IsBorrowed;

          if (!this.book.ThumbnailLink) {
            this.book.ThumbnailLink = '/assets/img/book_cover.jpg';
          }
        }
      });
  }

  borrowBook(id: number): void {
    if (!this.auth.isAuthenticated) {
      let dialogRef = this.dialog.open(LoginDialogComponent);

      dialogRef.afterClosed().subscribe(() => {
        if (this.auth.isAuthenticated) {
          this.confirm().pipe(
            filter(data => data === true)
          )
          .subscribe(() => this.borrow(id));
        }
      });
    } else {
      this.confirm().pipe(
        filter(data => data === true)
      )
      .subscribe(() => this.borrow(id));
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

  private borrow(id: number) {
    this.usersService.borrow(id).subscribe(
      () => {
        this.showMessage('Success', 'Borrow');
        this.isBorrowed = true;
      },
      err => {
        this.errHandler.handle(err);
      });
  }

  private showMessage(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
