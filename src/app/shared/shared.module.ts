import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';

import { CardComponent } from "./card/card.component";
import { ProgressComponent } from './progress/progress.component';
import { TroubleshootingComponent } from './troubleshooting/troubleshooting.component';
import { BookComponent } from './book/book.component';

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
    MatSnackBarModule,
    ProgressComponent,
    TroubleshootingComponent,
    BookComponent
  ],
  declarations: [
    CardComponent,
    ProgressComponent,
    TroubleshootingComponent,
    BookComponent
  ]
})
export class SharedModule { }
