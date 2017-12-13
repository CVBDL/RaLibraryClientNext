import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Book } from "../book.model";

@Component({
  selector: 'ral-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { 'class': 'ral-card' }
})
export class CardComponent implements OnInit {
  @Input() book: Book;
  @Input() borrowData: {};
  @Input() hasBorrow: boolean = true;
  @Input() hasReturn: boolean = true;
  @Output() onBorrow = new EventEmitter<number>();
  @Output() onReturn = new EventEmitter<number>();

  thumbnailLink: string = './assets/img/book_cover.jpg';

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

  borrowBook(id: number): void {
    this.onBorrow.emit(id);
  }

  returnBook(id: number): void {
    this.onReturn.emit(id);
  }

}
