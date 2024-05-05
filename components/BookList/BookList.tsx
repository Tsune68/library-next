import { Book } from "@/types/book";
import { BookCard } from "../BookCard/BookCard";
import styles from "./BookList.module.scss";

type Props = {
  books: Book[];
  onUpdateIsRending: (id: string) => void;
}

export const BookList = ({books, onUpdateIsRending}: Props) => {
  return (
    <div className={styles.bookList}>
      {books &&
        books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onUpdateIsRending={onUpdateIsRending}
          />
        ))}
    </div>
  );
}
