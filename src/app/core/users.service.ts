import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
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
    // return Observable.of([{"Borrower":"PZhong@ra.rockwell.com","BorrowTime":"2017-10-18T06:40:41.333","ExpectedReturnTime":"2018-01-16T06:40:41.333","Book":{"Id":1,"Code":"P001","ISBN10":"0596008031","ISBN13":"9780596008031","Title":"Designing Interfaces","Subtitle":"Patterns for Effective Interaction Design","Authors":"Jenifer Tidwell","Publisher":"\"O'Reilly Media, Inc.\"","PublishedDate":"2005-11-21","Description":"Provides information on designing easy-to-use interfaces.","PageCount":331,"ThumbnailLink":"http://books.google.com/books/content?id=1D2bAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","CreatedDate":"2017-10-18T14:33:52.64","RowVersion":"AAAAAAAAB9E=", "IsBorrowed": true}}])
    //   .do((data) => {
    //     this.borrowedBookdsCache = data;
    //   });
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
