import { Book } from "./book.model";

export class  BorrowedBook {
  Borrower: string;
  BorrowTime: string;
  ExpectedReturnTime: string;
  Book: Book
}
