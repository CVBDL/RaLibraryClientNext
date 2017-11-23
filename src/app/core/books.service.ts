import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {
  switchMap,
  tap
} from 'rxjs/operators';

import { Book } from "../shared/book.model";

@Injectable()
export class BooksService {
  readonly rootEndpoint: string;

  /** Books cache. */
  private books: Book[];

  constructor(private http: HttpClient) {
    this.rootEndpoint = 'https://APCNDAEC3YCS12.ra-int.com/ralibrary/api/books';
    this.books = [];
  }

  /**
   * List all the books data from cache or from server.
   * @param force Force to fetch books from server.
   */
  list(force: boolean = false): Observable<Book[]> {
    if (!force && this.hasCache()) {
      return of(this.books);

    } else {
      return this.http
        .get<Book[]>(this.rootEndpoint)
        .pipe(tap(data => { this.books = data; }));
    }
  }

  /**
   * Get a single book data.
   * @param id Book's id.
   * @param force If true, force to fetch books from server.
   */
  get(id: number, force: boolean = false): Observable<Book> {
    // first, find in cache when not use force
    if (!force && this.hasCache()) {
      let book: Book | undefined = this.books.find(book => book.Id === id);

      if (book) {
        return of(book);
      }
    }

    return this.getRemote(id);
  }

  /**
   * Update book data in cache.
   * @param id Book's id.
   * @param book Updated book data.
   */
  updateBookInCache(id: number, book: {}): void {
    if (!this.hasCache()) return;

    this.books.forEach(b => {
      if (b.Id === id) {
        Object.assign(b, book);
      }
    });
  }

  /**
   * Check cache books.
   */
  private hasCache(): boolean {
    return Array.isArray(this.books) && this.books.length > 0;
  }

  /**
   * Get a single book from server.
   * @param id Book's id.
   */
  private getRemote(id: number): Observable<Book> {
    const endpoint = `${this.rootEndpoint}/${id}`;

    return this.http
      .get<Book>(endpoint)
      .pipe(
        tap(book => {
          this.updateBookInCache(id, book);
        })
      );
  }

}
