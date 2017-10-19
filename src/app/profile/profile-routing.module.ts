import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BorrowBookDetailComponent } from "./borrow-book-detail/borrow-book-detail.component";
import { ProfileComponent } from "./profile.component";

const routes: Routes = [{
  path: 'profile',
  component: ProfileComponent
}, {
  path: 'profile/books/:id',
  component: BorrowBookDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
  
 }
