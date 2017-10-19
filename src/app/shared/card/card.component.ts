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

  thumbnailLink: string = '/assets/img/book_cover.jpg';

  ngOnInit() {
    if (this.book.ThumbnailLink) {
      let img = new Image();
      img.src = this.book.ThumbnailLink;
      img.onload = () => {
        this.thumbnailLink = this.book.ThumbnailLink;
        img = null;
      };
    }
  }

}
