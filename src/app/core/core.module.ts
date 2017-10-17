import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatTabsModule
} from '@angular/material';
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { RouterModule } from '@angular/router';

import { AuthenticationService } from "./authentication.service";
import { BooksService } from "./books.service";
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { NavComponent } from './nav/nav.component';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    RouterModule
  ],
  exports: [
    NavComponent
  ],
  providers: [
    AuthenticationService,
    BooksService
  ],
  declarations: [
    LoginDialogComponent,
    NavComponent,
    LoginDialogComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
