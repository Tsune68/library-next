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
          {/* {book.isLending ? (
            <span className={styles.bookCard_label_lending}>貸出中</span>
          ) : (
            <span className={styles.bookCard_label_notLending}>貸出可能</span>
          )} */}
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
