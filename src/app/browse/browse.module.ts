import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material';

import { BrowseRoutingModule } from "./browse-routing.module";
import { SharedModule } from "../shared/shared.module";

import { BookListComponent } from './book-list/book-list.component';
import { BrowseComponent } from './browse.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

@NgModule({
  imports: [
    BrowseRoutingModule,
    CommonModule,
    MatToolbarModule,
    SharedModule
  ],
  declarations: [
    BookListComponent,
    BrowseComponent,
    BookDetailComponent
  ]
})
export class BrowseModule { }
