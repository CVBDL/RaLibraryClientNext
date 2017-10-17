import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { Book } from "../../shared/book";
import { BooksService } from "../../core/books.service";
import 'rxjs/add/operator/switchMap';
@Component({
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
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

}
