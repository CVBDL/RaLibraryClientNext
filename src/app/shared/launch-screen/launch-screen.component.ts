import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'ral-launch-screen',
  templateUrl: './launch-screen.component.html',
  styleUrls: ['./launch-screen.component.scss'],
  animations: [
    trigger('launchState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('195ms ease-out'))
    ])
  ]
})
export class LaunchScreenComponent implements OnInit {
  launchState: string = 'show';
  hide: boolean = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.launchState = 'hide';
    }, 2500)
  }

  animationDone($event): void {
    if ($event.toState === 'hide') {
      this.hide = true;
    }
  }

}
