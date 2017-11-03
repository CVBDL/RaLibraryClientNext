import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';

import { Book } from "../shared/book";
import { BooksService } from "../core/books.service";
import { BorrowedBook } from "../shared/borrowed-book";

@Injectable()
export class UsersService {
  private rootEndpoint: string = 'https://APCNDAEC3YCS12.ra-int.com/ralibrary/api/user';
  private profileCache: UserProfile = null;
  private borrowedBookdsCache: BorrowedBook[] = [];

  constructor(
    private http: HttpClient,
    private booksService: BooksService) { }

  getProfile(): Observable<UserProfile> {
    const endpoint = this.rootEndpoint + '/details';
    return this.http.get<UserProfile>(endpoint)
      .pipe(
        tap(data => this.profileCache = data)
      );
  }

  getCachedProfile(): Observable<UserProfile> {
    return of<UserProfile>(this.profileCache);
  }

  listBorrowedBooks(): Observable<BorrowedBook[]> {
    // return this.http.get<BorrowedBook[]>('/assets/mock/borrow-books.json');;
    const endpoint = this.rootEndpoint + '/books';
    return this.http.get<BorrowedBook[]>(endpoint)
      .pipe(
        tap(data => this.borrowedBookdsCache = data)
      );
  }

  listCachedBorrowedBooks(): Observable<BorrowedBook> {
    return from(this.borrowedBookdsCache);
  }

  borrow(id: number) {
    const endpoint = `${this.rootEndpoint}/books/${id}`;
    return this.http.post(endpoint, '')
      .pipe(
        tap(() => this.booksService._borrowFromCache(id))
      );
  }

  return(id: number) {
    const endpoint = `${this.rootEndpoint}/books/${id}`;

    return this.http.delete(endpoint)
      .pipe(
        tap(() => this.booksService._returnFromCache(id))
      );
  }
}

interface UserProfile {
  Email: string,
  Name: string,
  IsAdmin: boolean
}
