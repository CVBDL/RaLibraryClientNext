import { Component, Input } from '@angular/core';

@Component({
  selector: 'ral-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {
  @Input() message: string;
}
