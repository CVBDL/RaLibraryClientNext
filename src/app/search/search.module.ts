import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';

import { MatInputModule } from '@angular/material';

import { SearchRoutingModule } from "./search-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    SearchRoutingModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
