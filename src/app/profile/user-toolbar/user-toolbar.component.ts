import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ral-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.scss']
})
export class UserToolbarComponent implements OnInit {
  @Output() profile: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickProfile() {
    this.profile.emit();
  }

}
