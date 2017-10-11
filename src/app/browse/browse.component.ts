import { Component, OnInit } from '@angular/core';

import { Book } from "../shared/book";
import { BooksService } from "../core/Books.service";

@Component({
  selector: 'ral-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  host: { 'class': 'ral-browse' }
})
export class BrowseComponent implements OnInit {

  books: Book[];

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.booksService.list().subscribe(data => {
      this.books = data;
    });
  }

}
