import { Component, OnInit } from '@angular/core';

import { Book } from "../../shared/book";
import { BooksService } from "../../core/books.service";

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[];
  
  constructor(private booksService: BooksService) { }
  
  ngOnInit() {
    this.booksService.list().subscribe(data => {
      this.books = data;
    });
  }

}
