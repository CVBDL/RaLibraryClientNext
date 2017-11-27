import { Component, Input, OnInit } from '@angular/core';

import { Book } from "../book";

@Component({
  selector: 'ral-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book;

  thumbnailLink: string = './assets/img/book_cover.jpg';

  constructor() { }

  ngOnInit() {
    if (this.book.ThumbnailLink) {
      let img: HTMLImageElement | null = new Image();
      img.src = this.book.ThumbnailLink;
      img.onload = () => {
        this.thumbnailLink = this.book.ThumbnailLink;
        img = null;
      };
    }
  }

}
