import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from "./search-routing.module";
import { SharedModule } from "../shared/shared.module";

import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
