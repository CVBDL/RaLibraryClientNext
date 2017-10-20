import { Component, Inject, OnInit } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";

@Component({
  selector: 'ral-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  private isLoading: boolean = false;
  private isSignIn: boolean = false;
  private name: string;

  username: string;
  password: string;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private auth: AuthenticationService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.isSignIn = this.auth.isAuthenticated;
    if (this.isSignIn) {
      this.usersService.getProfile()
        .subscribe(data => {
          this.name = data.Name;
        })
    }
  }

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

  onClickSignOut(): void {
    this.isLoading = false;
    this.auth.logout();
    this.isSignIn = false;
    this.dialogRef.close();
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

}
