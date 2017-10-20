import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/filter';

import { BorrowedBook } from "../../shared/borrowed-book";
import { BooksService } from "../../core/books.service";
import { UsersService } from "../../core/users.service";
import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: './borrow-book-detail.component.html',
  styleUrls: ['./borrow-book-detail.component.scss']
})
export class BorrowBookDetailComponent implements OnInit {
  book: BorrowedBook;
  isReturned: boolean = false;

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private booksService: BooksService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      return this.usersService.listCachedBorrowedBooks()
        .filter((borrow) => borrow.Book.Id === Number(params.get('id')))

    }).subscribe(data => {
      this.book = data;
      
      if (this.book && !this.book.Book.ThumbnailLink) {
        this.book.Book.ThumbnailLink = '/assets/img/book_cover.jpg';
      }
    }, err => console.log(err));
  }

  returnBook(id: number): void {
    this.return(id);
  }

  private return(id: number) {
    this.usersService.return(id).subscribe(() => {
      this.showMessage('Success', 'Return');
      this.isReturned = true;
    }, () => {
      this.showMessage('Failed', 'Return');
    });
  }

  private showMessage(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
