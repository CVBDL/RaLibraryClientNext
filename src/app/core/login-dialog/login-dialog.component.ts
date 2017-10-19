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
  private isLoading: boolean = false;

  username: string;
  password: string;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private auth: AuthenticationService) { }

  onClickSignIn(): void {
    this.isLoading = true;
    this.auth.login(this.username, this.password)
      .subscribe(() => {
        this.isLoading = false;
        this.dialogRef.close();
      }, () => {
        this.isLoading = false;
        this.dialogRef.close();
      });
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

}
