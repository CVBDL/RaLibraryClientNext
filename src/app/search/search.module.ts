import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';

import { SearchRoutingModule } from "./search-routing.module";
import { SharedModule } from "../shared/shared.module";

import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    SharedModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
