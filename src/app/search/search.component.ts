import { Component } from '@angular/core';

import { Book } from "../shared/book";
import { BooksService } from "../core/books.service";

@Component({
  selector: 'ral-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  books: Book[];
  keyword: string = '';
  message: string = 'Getting books';

  private isSearching: boolean = false;

  constructor(private booksService: BooksService) { }

  search(keyword: string): void {
    this.isSearching = true;
    this.booksService.list().subscribe(data => {
      this.books = this.filter(data, keyword);
      this.isSearching = false;
    }, () => this.isSearching = false);
  }

  private filter(books: Book[], keyword: string): Book[] {
    var filteredBooks: Book[] = [];
    books.forEach(book => {
      console.log(book.Title.toLowerCase(), keyword)
      if (book.Title.toLowerCase().includes(keyword)) {
        filteredBooks.push(book);
      }
    });
    return filteredBooks;
  }

}
