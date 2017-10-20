import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule
} from '@angular/material';

import { CardComponent } from "./card/card.component";
import { StatusComponent } from './status/status.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [
    CardComponent,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    StatusComponent
  ],
  declarations: [
    CardComponent,
    StatusComponent
  ]
})
export class SharedModule { }
