import { Component, Input } from '@angular/core';

@Component({
  selector: 'ral-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  host: { class: 'ral-status' }
})
export class StatusComponent {
  @Input() message: string;
  @Input() showProgress: boolean;
}
