import { Component, Input, OnInit } from '@angular/core';

import { Book } from "../book";

@Component({
  selector: 'ral-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { 'class': 'ral-card' }
})
export class CardComponent implements OnInit {
  @Input() book: Book;

  ngOnInit() {
    if (this.book && !this.book.ThumbnailLink) {
      this.book.ThumbnailLink = '/assets/img/book_cover.jpg';
    }
  }

}
