import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowseRoutingModule } from "./browse-routing.module";
import { SharedModule } from "../shared/shared.module";

import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { BrowseComponent } from './browse.component';

@NgModule({
  imports: [
    BrowseRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    BookDetailComponent,
    BookListComponent,
    BrowseComponent
  ]
})
export class BrowseModule { }
