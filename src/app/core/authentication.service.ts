import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { UserDetails } from "./user-details.model";
import { UserToken } from "./user-token.model";

@Injectable()
export class AuthenticationService {
  readonly rootEndpoint: string;

  private _isAuthenticated: boolean;
  private _token: string;

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get token(): string {
    return this._token;
  }

  constructor(private http: HttpClient) {
    this.rootEndpoint =
      'https://APCNDAEC3YCS12.ra-int.com/raauthentication/api';
    this._isAuthenticated = false;
    this._token = '';
  }

  /**
   * Authenticate the user with INT account.
   * @param username Account username.
   * @param password Account password.
   */
  login(username: string, password: string): Observable<UserToken> {
    const endpoint = `${this.rootEndpoint}/user`;

    return this.http
      .post<UserToken>(endpoint, {
        'UserName': username,
        'Password': password
      })
      .pipe(tap(this.save.bind(this)));
  }

  /**
   * Just remove saved token and mark as logout.
   */
  logout() {
    this.drop();
  }

  getUserDetails(username: string, password: string): Observable<UserDetails> {
    const endpoint = `${this.rootEndpoint}/user/details`;

    return this.http.post<UserDetails>(endpoint, {
      'UserName': username,
      'Password': password
    });
  }

  /**
   * Save the login user.
   * @param data Contains the user's id token.
   */
  private save(data: UserToken): void {
    this._token = data.IdToken;
    this._isAuthenticated = true;
  }

  /**
   * Remove the saved login user.
   */
  private drop(): void {
    this._isAuthenticated = false;
    this._token = '';
  }

}
