import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from "rxjs/Observable";

import { AuthenticationService } from "../core/authentication.service";
import { BorrowedBook } from "../shared/borrowed-book";
import { LoginDialogComponent } from "../core/login-dialog/login-dialog.component";
import { UsersService } from "../core/users.service";

@Component({
  selector: 'ral-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  books: BorrowedBook[];

  constructor(
    public dialog: MatDialog,
    private auth: AuthenticationService,
    private usersService: UsersService) { }

  ngOnInit() {
    this.loadBorrowedBooks();
    // Workaround for:
    // https://github.com/angular/material2/issues/5268
    // https://github.com/angular/angular/issues/15634
    // setTimeout(() => {
    //   if (this.auth.isAuthenticated) {
    //     this.loadBorrowedBooks();

    //   } else {
    //     let dialogRef = this.dialog.open(LoginDialogComponent, {
    //       width: '250px'
    //     });
  
    //     dialogRef.afterClosed().subscribe(() => {
    //       if (this.auth.isAuthenticated) {
    //         this.loadBorrowedBooks();
    //       }
    //     });
    //   }
    // });
  }

  private loadBorrowedBooks(): void {
    this.usersService.listBorrowedBooks().subscribe((data) => {
      this.books = data;
    }, (err) => console.log(err));
  }

}
