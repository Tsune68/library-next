import { Book } from "@/types/book";
import Link from "next/link";
import styles from "./BookCard.module.scss";
import Image from "next/image";
import { useSession } from "next-auth/react";
import BookButton from "../BookButton/BookButton";

type Props = {
  book: Book;
  onRentalBook: (id: string) => void;
  onReturnBook: (id: string) => void;
};

export const BookCard = ({ book, onRentalBook, onReturnBook }: Props) => {
  const { data: session } = useSession();
  let actionButton;

  // 貸し出し状態によってボタンの表示を変更
  if (book.isLending && book.rental?.userId === session?.user.id) {
    actionButton = (
      <button
        className={styles.returnButton}
        onClick={() => onReturnBook(book.id)}
      >
        返却する
      </button>
    );
  } else if (!book.isLending) {
    actionButton = (
      <button
        className={styles.rentalButton}
        onClick={() => onRentalBook(book.id)}
      >
        借りる
      </button>
    );
  } else {
    actionButton = (
      <button className={styles.disabledButton} disabled>
        貸し出し中
      </button>
    );
  }

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
        <BookButton
          isLending={book.isLending}
          isOwned={book.rental?.userId === session?.user.id}
          onRentalBook={() => onRentalBook(book.id)}
          onReturnBook={() => onReturnBook(book.id)}
        />
      </div>
    </div>
  );
};
