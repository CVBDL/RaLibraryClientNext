import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'ral-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
  animations: [
    trigger('visibleState', [
      state('visible', style({
        transform: 'scale(1)'
      })),
      state('invisible', style({
        transform: 'scale(0)'
      })),
      transition('invisible => visible', animate('225ms ease-in')),
      transition('visible => invisible', animate('195ms ease-out'))
    ])
  ]
})
export class BackToTopComponent implements OnInit {
  @Input() container: HTMLElement;

  state: string = 'invisible';

  ngOnInit() {
    if (this.container) {
      this.container.addEventListener('scroll', () => this.onScroll());
    }
  }

  scrollToTop(): void {
    this.container.scrollTop = 0;
  }

  private onScroll(): void {
    this.state = (this.container.scrollTop > 0) ? 'visible' : 'invisible';
  }

}
