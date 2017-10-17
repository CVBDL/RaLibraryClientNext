import { Component, Inject } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import { AuthenticationService } from "../authentication.service";

@Component({
  selector: 'ral-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  username: string;
  password: string;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private auth: AuthenticationService
  ) { }

  onClickSignIn(): void {
    this.dialogRef.close();

    this.auth.login(this.username, this.password)
      .subscribe((data) => {
        console.log(data.IdToken);
      })
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

}
