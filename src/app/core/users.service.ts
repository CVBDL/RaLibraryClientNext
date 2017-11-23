import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import { BooksService } from "../core/books.service";
import { BorrowedBook } from "../shared/borrowed-book.model";
import { UserProfile } from "./user-profile.model";

@Injectable()
export class UsersService {
  readonly  rootEndpoint: string;

  private books: BorrowedBook[];
  private profile: UserProfile;

  constructor(
      private http: HttpClient,
      private booksService: BooksService) {

    this.rootEndpoint = 'https://APCNDAEC3YCS12.ra-int.com/ralibrary/api/user';
    this.books = [];
  }

  /**
   * Get user profile from server and cache it.
   */
  getProfile(): Observable<UserProfile> {
    const endpoint = `${this.rootEndpoint}/details`;

    return this.http
      .get<UserProfile>(endpoint)
      .pipe(
        tap(data => {
          this.profile = data;
        })
      );
  }

  /**
   * List all of my currently borrowed books.
   */
  listMyBooks(): Observable<BorrowedBook[]> {
    const endpoint = `${this.rootEndpoint}/books`;

    return this.http
      .get<BorrowedBook[]>(endpoint)
      .pipe(
        tap(data => {
          this.books = data;
        })
      );
  }

  /**
   * Borrow a book.
   * @param id Book's id.
   */
  borrowBook(id: number) {
    const endpoint = `${this.rootEndpoint}/books/${id}`;

    return this.http
      .post(endpoint, null)
      .pipe(
        tap(() => {
          this.booksService.updateBookInCache(id, {
            IsBorrowed: true
          });
        })
      );
  }

  /**
   * Return a book.
   * @param id Book's id.
   */
  returnBook(id: number) {
    const endpoint = `${this.rootEndpoint}/books/${id}`;

    return this.http
      .delete(endpoint)
      .pipe(
        tap(() => {
          this.booksService.updateBookInCache(id, {
            IsBorrowed: false
          });
        })
      );
  }
}
