import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { switchMap, tap } from 'rxjs/operators';

import { Book } from "../shared/book";

@Injectable()
export class BooksService {
  readonly rootEndpoint: string = 'https://APCNDAEC3YCS12.ra-int.com/ralibrary/api/books';

  private booksCache: Book[];

  constructor(private http: HttpClient) { }

  list(force: boolean = false): Observable<Book[]> {
    if (!force && this.booksCache) {
      return of(this.booksCache);

    } else {
      return this.http.get<Book[]>(this.rootEndpoint)
        .pipe(
          tap(data => this.booksCache = data)
        );
    }
  }

  get(id: number, force: boolean = false): Observable<Book> {
    if (!force && this.booksCache) {
      let filteredBook: Book[] = this.booksCache.filter(book => book.Id === id);

      if (filteredBook.length) {
        return from(filteredBook);
      }
    }

    return this.getRemote(id);
  }

  /**
   * Internal use.
   */
  _borrowFromCache(id: number): void {
    if (this.booksCache && this.booksCache.length) {
      this.booksCache.forEach(book => {
        if (book.Id === id) {
          book.IsBorrowed = true;
        }
      });
    }
  }

  /**
   * Internal use.
   */
  _returnFromCache(id: number): void {
    if (this.booksCache && this.booksCache.length) {
      this.booksCache.forEach(book => {
        if (book.Id === id) {
          book.IsBorrowed = false;
        }
      });
    }
  }

  private getRemote(id: number): Observable<Book> {
    return this.http
      .get<Book[]>(this.rootEndpoint)
      .pipe(
        switchMap(books => {
          return books.filter(book => {
            return book.Id === id;
          });
        })
      );
  }

}
