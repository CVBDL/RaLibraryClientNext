import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { SharedModule } from "../shared/shared.module";
import { BorrowBookDetailComponent } from './borrow-book-detail/borrow-book-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    BorrowBookDetailComponent
  ]
})
export class ProfileModule { }
