import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from "../core/authentication.service";
import { BorrowedBook } from "../shared/borrowed-book";
import { LaunchScreenService } from "../core/launch-screen.service";
import { LoginDialogComponent } from "../core/login-dialog/login-dialog.component";
import { UsersService } from "../core/users.service";

@Component({
  selector: 'ral-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  books: BorrowedBook[];
  overdueBooks: BorrowedBook[];
  willOverdueBooks: BorrowedBook[];
  normalBooks: BorrowedBook[];
  isLoading: boolean = false;

  private readonly threshold: number = 7 * 24 * 60 * 60 * 1000;

  constructor(
    public dialog: MatDialog,
    private auth: AuthenticationService,
    private launchScreen: LaunchScreenService,
    private usersService: UsersService) { }

  ngOnInit() {
    // Workaround for:
    // https://github.com/angular/material2/issues/5268
    // https://github.com/angular/angular/issues/15634
    setTimeout(() => {
      if (this.auth.isAuthenticated) {
        this.loadBorrowedBooks();

      } else {
        let launchScreenRef = this.launchScreen.getLaunchScreenRef();

        if (launchScreenRef) {
          launchScreenRef.afterClosed().subscribe(this.openLoginDialog.bind(this));

        } else {
          this.openLoginDialog();
        }
      }
    });
  }

  onClickProfile(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent);
  }

  onClickRefresh(): void {
    if (this.auth.isAuthenticated) {
      this.loadBorrowedBooks();
    }
  }

  private openLoginDialog() {
    let dialogRef = this.dialog.open(LoginDialogComponent);
    
    dialogRef.afterClosed().subscribe(() => {
      if (this.auth.isAuthenticated) {
        this.loadBorrowedBooks();
      }
    });
  }

  private loadBorrowedBooks(): void {
    this.isLoading = true;

    this.usersService.listMyBooks()
      .subscribe(
        data => {
          this.isLoading = false;
          this.books = this.sortBooks(data);
          this.overdueBooks = this.findOverdueBooks(this.books);
          this.willOverdueBooks = this.findWillOverdueBooks(this.books);
          this.normalBooks = this.findNormalBooks(this.books);
        },
        err => this.isLoading = false
      );
  }

  private sortBooks(books: BorrowedBook[]): BorrowedBook[] {
    return books.sort((a, b) => {
      return new Date(b.ExpectedReturnTime).getTime() - new Date(a.ExpectedReturnTime).getTime();
    });
  }

  private findOverdueBooks(books: BorrowedBook[]): BorrowedBook[] {
    const now = Date.now();
    return books.filter(book => {
      const timestamp = new Date(book.ExpectedReturnTime).getTime();
      return timestamp <= now;
    });
  }

  private findWillOverdueBooks(books: BorrowedBook[]): BorrowedBook[] {
    const now = Date.now();

    return books.filter(book => {
      const timestamp = new Date(book.ExpectedReturnTime).getTime();
      return timestamp > now && timestamp <= now + this.threshold;
    });
  }

  private findNormalBooks(books: BorrowedBook[]): BorrowedBook[] {
    const now = Date.now();

    return books.filter(book => {
      const timestamp = new Date(book.ExpectedReturnTime).getTime();
      return timestamp > now + this.threshold;
    });
  }

}
