import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

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

  constructor(
    public dialog: MatDialog,
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
      
      if (this.book && !this.book.ThumbnailLink) {
        this.book.ThumbnailLink = '/assets/img/book_cover.jpg';
      }
    });
  }

  borrowBook(id: number): void {
    if (!this.auth.isAuthenticated) {
      let dialogRef = this.dialog.open(LoginDialogComponent, {
        width: '250px'
      });

      dialogRef.afterClosed().subscribe(() => {
        if (this.auth.isAuthenticated) {
          this.usersService.borrow(id).subscribe();
        }
      });
    } else {
      this.usersService.borrow(id).subscribe();
    }
  }

}
