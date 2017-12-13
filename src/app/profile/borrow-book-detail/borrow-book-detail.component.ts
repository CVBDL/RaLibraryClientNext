import {
  ActivatedRoute,
  ParamMap,
  Router
} from "@angular/router";
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import {
  filter,
  switchMap,
  takeUntil
} from 'rxjs/operators';

import { BorrowedBook } from "../../shared/borrowed-book.model";
import { BooksService } from "../../core/books.service";
import { ConfirmationDialogComponent } from "../../core/confirmation-dialog/confirmation-dialog.component";
import { HttpErrorHandlerService } from "../../core/http-error-handler.service";
import { UsersService } from "../../core/users.service";

@Component({
  templateUrl: './borrow-book-detail.component.html',
  styleUrls: ['./borrow-book-detail.component.scss']
})
export class BorrowBookDetailComponent implements OnInit, OnDestroy {
  book: BorrowedBook;
  isReturned: boolean;

  private ngUnsubscribe: Subject<boolean>;

  constructor(
      public dialog: MatDialog,
      public snackBar: MatSnackBar,
      private route: ActivatedRoute,
      private router: Router,
      private booksService: BooksService,
      private errHandler: HttpErrorHandlerService,
      private usersService: UsersService) {
    this.isReturned = false;
    this.ngUnsubscribe = new Subject<boolean>();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.usersService.listMyBooks()
            .pipe(
              switchMap(books => from(books)),
              filter(book => book.Book.Id === Number(params.get('id')))
            );
        })
      )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        data => {
          this.book = data;
          if (this.book && !this.book.Book.ThumbnailLink) {
            this.book.Book.ThumbnailLink = './assets/img/book_cover.jpg';
          }
        },
        err => {
          this.router.navigateByUrl('/profile');
        });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  returnBook(id: number): void {
    this.confirm()
      .pipe(filter(data => data === true))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.return(id);
      });
  }

  private confirm(): Observable<boolean> {
    let confirmDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Are you sure to return this book?'
      }
    });

    return confirmDialogRef.afterClosed();
  }

  private return(id: number): void {
    this.usersService.returnBook(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        () => {
          this.showMessage('Success', 'Return');
          this.isReturned = true;
        },
        err => this.errHandler.handle(err)
      );
  }

  private showMessage(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
