import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';

import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";

import { LaunchScreenService } from "../launch-screen.service";

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
  isHide: boolean;
  launchState: string;

  private _afterClosed: ReplaySubject<any>;
  private delay: number;

  constructor(launchScreenService: LaunchScreenService) {
    this.isHide = false;
    this.launchState = 'show';
    this._afterClosed = new ReplaySubject();
    this.delay = 2500;
    launchScreenService.setLaunchScreenRef(this);
  }

  ngOnInit() {
    setTimeout(() => {
      this.launchState = 'hide';
    }, this.delay);
  }

  /**
   * Fire when launch screen is closed.
   */
  afterClosed(): Observable<any> {
    return this._afterClosed;
  }

  /**
   * Animation done callback.
   * @param $event Animation event.
   */
  afterAnimationDone($event: AnimationEvent): void {
    if ($event.toState === 'hide') {
      this.isHide = true;
      this._afterClosed.next(null);
      this._afterClosed.complete();
    }
  }

}
