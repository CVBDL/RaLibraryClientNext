import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Rx';

import { Book } from "../shared/book";

@Injectable()
export class BooksService {
  readonly rootEndpoint: string = '/assets/mock/books.json';

  constructor(private http: HttpClient) { }

  list(): Observable<Book[]>  {
    return this.http.get<Book[]>(this.rootEndpoint);
  }

}
