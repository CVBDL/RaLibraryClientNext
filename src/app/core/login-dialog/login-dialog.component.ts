import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import { Subject } from "rxjs/Subject";
import { takeUntil } from "rxjs/operators/takeUntil";

import { AuthenticationService } from "../authentication.service";
import { UsersService } from "../users.service";

@Component({
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit, OnDestroy {
  username: string;
  password: string;
  hasError: boolean;
  isLoading: boolean;
  isSignIn: boolean;

  private name: string;
  private ngUnsubscribe: Subject<boolean>;

  constructor(
      private dialogRef: MatDialogRef<LoginDialogComponent>,
      private auth: AuthenticationService,
      private usersService: UsersService) {
    this.username = '';
    this.password = '';
    this.hasError = false;
    this.isLoading = false;
    this.isSignIn = false;
    this.name = '';
    this.ngUnsubscribe = new Subject<boolean>();
  }

  ngOnInit(): void {
    this.isSignIn = this.auth.isAuthenticated;

    if (this.isSignIn) {
      this.usersService
        .getProfile()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(data => {
          this.name = data.Name;
        });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  /**
   * Sign in button callback.
   */
  onClickSignIn(): void {
    if (!this.username || !this.password) return;

    this.isLoading = true;
    this.auth
      .login(this.username, this.password)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        () => {
          this.dialogRef.close('signin');
        },
        () => {
          this.isLoading = false;
          this.hasError = true;
        },
        () => {
          this.isLoading = false;
          this.hasError = false;
        });
  }

  /**
   * Sign out button callback.
   */
  onClickSignOut(): void {
    this.auth.logout();
    this.isLoading = false;
    this.isSignIn = false;
    this.hasError = false;
    this.dialogRef.close('signout');
  }

  /**
   * Cancel button callback.
   */
  onClickCancel(): void {
    this.isLoading = false;
    this.hasError = false;
    this.dialogRef.close('cancel');
  }

}
