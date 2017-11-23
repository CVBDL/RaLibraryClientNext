import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';

import { BackToTopComponent } from './back-to-top/back-to-top.component';
import { BookComponent } from './book/book.component';
import { CardComponent } from "./card/card.component";
import { ProgressComponent } from './progress/progress.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TroubleshootingComponent } from './troubleshooting/troubleshooting.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [
    BackToTopComponent,
    BookComponent,
    CardComponent,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    ProgressComponent,
    ToolbarComponent,
    TroubleshootingComponent
  ],
  declarations: [
    BackToTopComponent,
    BookComponent,
    CardComponent,
    ProgressComponent,
    TroubleshootingComponent,
    ToolbarComponent
  ]
})
export class SharedModule { }
