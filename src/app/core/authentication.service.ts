import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  readonly rootEndpoint: string =
    'https://APCNDAEC3YCS12.ra-int.com/raauthentication/api';

  private _isAuthenticated: boolean = false;
  private _token: string = '';

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get token() {
    return this._token;
  }

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<UserToken> {
    var endpoint: string = this.rootEndpoint + '/user';

    return this.http.post<UserToken>(endpoint, {
      'UserName': username,
      'Password': password
    })
    .pipe(
      tap(data => {
        this._isAuthenticated = true;
        this._token = data.IdToken;
      })
    );
  }

  logout() {
    this._isAuthenticated = false;
    this._token = '';
  }

  getUserDetails(username: string, password: string): Observable<UserDetails> {
    var endpoint: string = this.rootEndpoint + '/user/details';

    return this.http.post<UserDetails>(endpoint, {
      'UserName': username,
      'Password': password
    });
  }

}

interface UserToken {
  IdToken: string
}

interface UserDetails {
  DisplayName: string,
  EmailAddress: string,
  EmployeeId: string,
  Name: string
}
