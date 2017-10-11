import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';

import { CardComponent } from "./card/card.component";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    CardComponent,
    FlexLayoutModule
  ],
  declarations: [
    CardComponent
  ]
})
export class SharedModule { }
