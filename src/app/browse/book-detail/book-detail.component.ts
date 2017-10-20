import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Rx';

import { AuthenticationService } from "../../core/authentication.service";
import { Book } from "../../shared/book";
import { BooksService } from "../../core/books.service";
import { LoginDialogComponent } from "../../core/login-dialog/login-dialog.component";
import { UsersService } from "../../core/users.service";
import 'rxjs/add/operator/switchMap';

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
    private route: ActivatedRoute,
    private booksService: BooksService,
    private auth: AuthenticationService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap(
      (params: ParamMap) => this.booksService.get(Number(params.get('id')))
    ).subscribe(book => {
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
          this.borrow(id);
        }
      });
    } else {
      this.borrow(id);
    }
  }

  private borrow(id: number) {
    this.usersService.borrow(id).subscribe(() => {
      this.showMessage('Success', 'Borrow');
      this.isBorrowed = true;
    }, () => {
      this.showMessage('Failed', 'Borrow');
    });
  }

  private showMessage(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
