import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
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
    MatButtonModule,
    CardComponent,
    FlexLayoutModule,
    MatIconModule,
    StatusComponent
  ],
  declarations: [
    CardComponent,
    StatusComponent
  ]
})
export class SharedModule { }
