import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/do";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { Book } from "../shared/book";

@Injectable()
export class BooksService {
  readonly rootEndpoint: string = 'https://APCNDAEC3YCS12.ra-int.com/ralibrary/api/books';

  private booksCache: Book[];

  constructor(private http: HttpClient) { }

  list(force: boolean = false): Observable<Book[]> {
    if (!force && this.booksCache) {
      return Observable.of<Book[]>(this.booksCache);

    } else {
      return this.http.get<Book[]>(this.rootEndpoint)
        .do(data => this.booksCache = data);
    }
  }

  get(id: number, force: boolean = false): Observable<Book> {
    if (!force && this.booksCache) {
      let filteredBook: Book[] = this.booksCache.filter(book => book.Id === id);

      if (filteredBook.length) {
        return Observable.from(filteredBook);
      }
    }

    return this.getRemote(id);
  }

  private getRemote(id: number): Observable<Book> {
    return this.http
    .get<Book[]>(this.rootEndpoint)
    .switchMap(books => {
      return books.filter(book => {
        return book.Id === id;
      });
    });
  }

}
