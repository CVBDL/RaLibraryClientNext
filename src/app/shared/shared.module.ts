import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';

import { CardComponent } from "./card/card.component";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [
    CardComponent
  ],
  declarations: [
    CardComponent
  ]
})
export class SharedModule { }
