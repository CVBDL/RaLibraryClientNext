import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AuthenticationService } from "../core/authentication.service";
import { LoginDialogComponent } from "../core/login-dialog/login-dialog.component";

@Component({
  selector: 'ral-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public dialog: MatDialog, private auth: AuthenticationService) { }

  ngOnInit() {
    // Workaround for:
    // https://github.com/angular/material2/issues/5268
    // https://github.com/angular/angular/issues/15634
    setTimeout(() => {
      let dialogRef = this.dialog.open(LoginDialogComponent, {
        width: '250px'
      });
    });
  }

}
