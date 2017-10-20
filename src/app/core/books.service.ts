import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

import { Book } from "../shared/book";

@Injectable()
export class BooksService {
  readonly rootEndpoint: string = 'https://APCNDAEC3YCS12.ra-int.com/ralibrary/api/books';

  constructor(private http: HttpClient) { }

  list(): Observable<Book[]> {
    return this.http.get<Book[]>(this.rootEndpoint);
  }

  get(id: number): Observable<Book> {
    return this.http
    .get<Book[]>(this.rootEndpoint)
    .switchMap(books => {
      return books.filter(book => {
        return book.Id === id;
      });
    });
  }

}
