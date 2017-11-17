import { Component, Input, OnInit, Renderer2 } from '@angular/core';
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

  visibleState: string;

  constructor(private renderer: Renderer2) {
    this.visibleState = 'invisible';
  }

  ngOnInit() {
    if (this.container) {
      this.renderer.listen(
        this.container, 'scroll', this.onScroll.bind(this));
    }
  }

  scrollToTop(): void {
    this.container.scrollTop = 0;
  }

  private onScroll(): void {
    this.visibleState = (this.container.scrollTop > 0) ? 'visible' : 'invisible';
  }

}
