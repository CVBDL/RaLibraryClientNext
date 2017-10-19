import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

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

  constructor(
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
    this.usersService.return(id)
      .subscribe(
        () => console.log('success'),
        (err) => console.log(err)
      );
  }
}
