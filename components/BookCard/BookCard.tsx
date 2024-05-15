import { Book } from "@/types/book";
import Link from "next/link";
import { Button } from "@mantine/core";
import styles from "./BookCard.module.scss";
import Image from "next/image";

type Props = {
  book: Book;
  onRentalBook: (id: string) => void;
  onReturnBook: (id: string) => void;
};

export const BookCard = ({ book, onRentalBook, onReturnBook }: Props) => {
  return (
    <div className={styles.bookCard}>
      <a href={`books/${book.id}`}>
        <div className={styles.bookCard_thumbnail}>
          <Image
            src={book.imageLink}
            alt={"本のサムネイル"}
            className={styles.bookCard_img}
            width={130}
            height={185}
          />
        </div>
      </a>
      <div className={styles.bookCard_text_wrap}>
        <Link href={`books/${book.id}`} className={styles.bookCard_title}>
          {book.title}
        </Link>
        <p className={styles.bookCard_author}>{book.author} / 著</p>
        {!book.isLending ? (
          <Button onClick={() => onRentalBook(book.id)}>借りる</Button>
        ) : (
          <button
            className={styles.returnButton}
            onClick={() => onReturnBook(book.id)}
          >
            返却する
          </button>
        )}
      </div>
    </div>
  );
};
