import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

import { Book } from "../shared/book";
import { BorrowedBook } from "../shared/borrowed-book";

@Injectable()
export class UsersService {
  private rootEndpoint: string = 'https://APCNDAEC3YCS12.ra-int.com/ralibrary/api/user';
  private profileCache: UserProfile = null;
  private borrowedBookdsCache: BorrowedBook[] = [];

  constructor(private http: HttpClient) { }

  getProfile(): Observable<UserProfile> {
    const endpoint = this.rootEndpoint + '/details';
    return this.http.get<UserProfile>(endpoint)
      .do((data) => {
        this.profileCache = data;
      });
  }

  getCachedProfile(): Observable<UserProfile> {
    return Observable.of<UserProfile>(this.profileCache);
  }

  listBorrowedBooks(): Observable<BorrowedBook[]> {
    const endpoint = this.rootEndpoint + '/books';
    return this.http.get<BorrowedBook[]>(endpoint)
      .do((data) => {
        this.borrowedBookdsCache = data;
      });
  }

  listCachedBorrowedBooks(): Observable<BorrowedBook> {
    return Observable.from(this.borrowedBookdsCache);
  }

  borrow(id: number) {
    const endpoint = `${this.rootEndpoint}/books/${id}`;
    return this.http.post(endpoint, '');
  }

  return(id: number) {
    const endpoint = `${this.rootEndpoint}/books/${id}`;
    return this.http.delete(endpoint);
  }
}

interface UserProfile {
  Email: string,
  Name: string,
  IsAdmin: boolean
}
