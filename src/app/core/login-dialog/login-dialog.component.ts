import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";

@Component({
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  username: string;
  password: string;
  hasError: boolean = false;
  isLoading: boolean = false;
  isSignIn: boolean = false;

  private name: string;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private auth: AuthenticationService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.isSignIn = this.auth.isAuthenticated;

    if (this.isSignIn) {
      this.usersService
        .getProfile()
        .subscribe(data => {
          this.name = data.Name;
        });
    }
  }

  onClickSignIn(): void {
    if (!this.username || !this.password) return;

    this.isLoading = true;
    this.auth
      .login(this.username, this.password)
      .subscribe(() => {
        this.isLoading = false;
        this.hasError = false;
        this.dialogRef.close();

      }, () => {
        this.isLoading = false;
        this.hasError = true;
      });
  }

  onClickSignOut(): void {
    this.auth.logout();
    this.isLoading = false;
    this.isSignIn = false;
    this.hasError = false;
    this.dialogRef.close();
  }

  onClickCancel(): void {
    this.isLoading = false;
    this.hasError = false;
    this.dialogRef.close();
  }

}
