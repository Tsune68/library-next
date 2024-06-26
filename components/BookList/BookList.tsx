import { Book } from "@/types/book";
import { BookCard } from "../BookCard/BookCard";
import styles from "./BookList.module.scss";

type Props = {
  books: Book[];
  onRentalBook: (id: string) => void;
  onReturnBook: (id: string) => void;
}

export const BookList = ({books, onRentalBook, onReturnBook}: Props) => {
  return (
    <div className={styles.bookList}>
      {books &&
        books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onRentalBook={onRentalBook}
            onReturnBook={onReturnBook}
          />
        ))}
    </div>
  );
}
