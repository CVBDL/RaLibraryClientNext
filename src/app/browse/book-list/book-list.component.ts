import { Component, OnInit } from '@angular/core';

import { Book } from "../../shared/book";
import { BooksService } from "../../core/books.service";

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[];
  message: string = "Getting books";
  isLoading: boolean = false;
  
  constructor(private booksService: BooksService) { }
  
  ngOnInit() {
    this.isLoading = true;
    this.booksService.list().subscribe(data => {
      this.isLoading = false;
      this.books = data;
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    });
  }

}
