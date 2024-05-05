import { Book } from "@/types/book";
import Link from "next/link";
import { Button } from "@mantine/core";
import styles from "./BookCard.module.scss";

type Props = {
  book: Book;
  onUpdateIsRending: (id: string) => void;
}

export const BookCard =({ book , onUpdateIsRending }: Props) => {
  return (
    <div className={styles.bookCard}>
      <div>
        <img
          className={styles.thumbnail}
          src={book.imageLink}
          alt="本のサムネイル"
        />
      </div>
      <Link href={`books/${book.id}`}>{book.title}</Link>
      <p>{book.author} / 著</p>

      {!book.isLending ? (
        <Button onClick={() => onUpdateIsRending(book.id)}>借りる</Button>
      ) : (
        <button
          className={styles.returnButton}
          onClick={() => onUpdateIsRending(book.id)}
        >
          返却する
        </button>
      )}
    </div>
  );
}
