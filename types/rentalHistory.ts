import { Book } from "./book";
import { User } from "./user";

export type RentalHistory = {
  id: number;
  userId: string;
  bookId: string;
  borrowedAt: Date;
  returnedAt: Date | null;
  book: Book;
  user: User;
};
