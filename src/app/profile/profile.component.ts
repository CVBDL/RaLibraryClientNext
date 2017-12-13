import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";

import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { takeUntil } from "rxjs/operators/takeUntil";

import { AuthenticationService } from "../core/authentication.service";
import { BorrowedBook } from "../shared/borrowed-book.model";
import { LaunchScreenService } from "../core/launch-screen.service";
import { LoginDialogComponent } from "../core/login-dialog/login-dialog.component";
import { UsersService } from "../core/users.service";

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  books: BorrowedBook[];
  booksClassification: {
    [key: string]: BorrowedBook[]
  };
  isLoading: boolean;

  private readonly threshold: number = 7 * 24 * 60 * 60 * 1000;
  private ngUnsubscribe: Subject<boolean>;

  constructor(
      private dialog: MatDialog,
      private auth: AuthenticationService,
      private launchScreen: LaunchScreenService,
      private router: Router,
      private usersService: UsersService) {
    this.booksClassification = {};
    this.isLoading = false;
    this.ngUnsubscribe = new Subject<boolean>();
  }

  ngOnInit() {
    // Workaround for:
    // Opening MdDialog in ngOnInit throws
    // ExpressionChangedAfterItHasBeenCheckedError.
    // https://github.com/angular/material2/issues/5268
    // https://github.com/angular/angular/issues/15634
    setTimeout(() => {
      if (this.auth.isAuthenticated) {
        this.loadMyBooks();

      } else {
        let launchScreenRef = this.launchScreen.getLaunchScreenRef();

        if (launchScreenRef) {
          launchScreenRef
            .afterClosed()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(this.openLoginDialog.bind(this));

        } else {
          this.openLoginDialog();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  onClickProfile(): void {
    this.openLoginDialog();
  }

  onClickRefresh(): void {
    if (this.auth.isAuthenticated) {
      this.loadMyBooks();

    } else {
      this.openLoginDialog();
    }
  }

  private openLoginDialog() {
    this.dialog.open(LoginDialogComponent)
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: string) => {
        if (this.auth.isAuthenticated && data === 'signin') {
          this.loadMyBooks();

        } else if (data === 'signout') {
          this.router.navigateByUrl('/browse');

        } else {
          // noop
        }
      });
  }

  private loadMyBooks(): void {
    this.isLoading = true;

    this.usersService.listMyBooks()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        data => {
          this.books = this.sortBooks(data);
          this.booksClassification = this.classifyBooksByExpectedReturnTime(this.books);
        },
        () => {
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
        });
  }

  private sortBooks(books: BorrowedBook[]): BorrowedBook[] {
    return books.sort((a, b) => {
      return (this.getTimestamp(b.ExpectedReturnTime)
              - this.getTimestamp(a.ExpectedReturnTime));
    });
  }

  private classifyBooksByExpectedReturnTime(books: BorrowedBook[]) {
    const now = Date.now();

    let normal: BorrowedBook[] = [];
    let aboutOverdue: BorrowedBook[] = [];
    let overdue: BorrowedBook[] = [];

    books.forEach(book => {
      const timestamp = this.getTimestamp(book.ExpectedReturnTime);

      if (timestamp <= now) {
        overdue.push(book);

      } else if (timestamp > now && timestamp <= now + this.threshold) {
        aboutOverdue.push(book);

      } else {
        normal.push(book);
      }
    });

    return ({
      normal,
      aboutOverdue,
      overdue
    });
  }

  private findOverdueBooks(books: BorrowedBook[]): BorrowedBook[] {
    const now = Date.now();

    return books.filter(book => {
      const timestamp = this.getTimestamp(book.ExpectedReturnTime);
      return timestamp <= now;
    });
  }

  private findWillOverdueBooks(books: BorrowedBook[]): BorrowedBook[] {
    const now = Date.now();

    return books.filter(book => {
      const timestamp = this.getTimestamp(book.ExpectedReturnTime);
      return timestamp > now && timestamp <= now + this.threshold;
    });
  }

  private findNormalBooks(books: BorrowedBook[]): BorrowedBook[] {
    const now = Date.now();

    return books.filter(book => {
      const timestamp = this.getTimestamp(book.ExpectedReturnTime);
      return timestamp > now + this.threshold;
    });
  }

  /**
   * Get the milliseconds elapsed since the UNIX epoch.
   * @param date ISO 8601 date string.
   */
  private getTimestamp(date: string): number {
    return new Date(date).getTime();
  }

}
