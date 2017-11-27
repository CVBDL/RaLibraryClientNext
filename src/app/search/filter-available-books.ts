import { Filter } from "./filter";
import { Book } from "../shared/book.model";

export class AvailableBooksFilter extends Filter<Book> {
  get label(): string {
    return 'Available';
  }

  constructor(isOn: boolean = true) {
    super();

    this.isOn = isOn;
  }

  filter(books: Book[]): Book[] {
    if (!this.isOn) return books;

    return books.filter(book => !book.IsBorrowed);
  }

}
