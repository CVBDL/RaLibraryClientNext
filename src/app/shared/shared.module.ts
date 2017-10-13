import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';

import { CardComponent } from "./card/card.component";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    CardComponent,
    FlexLayoutModule,
    MatIconModule
  ],
  declarations: [
    CardComponent
  ]
})
export class SharedModule { }
