import { Book } from "./book";

export type RentalHistory = {
  id: number;
  userId: string;
  bookId: string;
  borrowedAt: Date;
  returnedAt: Date | null;
  book: Book;
};
