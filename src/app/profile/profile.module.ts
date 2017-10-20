import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProfileRoutingModule } from "./profile-routing.module";
import { SharedModule } from "../shared/shared.module";

import { BorrowBookDetailComponent } from './borrow-book-detail/borrow-book-detail.component';
import { ProfileComponent } from "./profile.component";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    BorrowBookDetailComponent,
    ProfileComponent
  ]
})
export class ProfileModule { }
