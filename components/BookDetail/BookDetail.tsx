import { Book } from "@/types/book";
import React from "react";
import styles from "./BookDetail.module.scss";
import Image from "next/image";
import BookButton from "../BookButton/BookButton";
import { useSession } from "next-auth/react";

type Props = {
  book: Book;
  onRentalBook: (id: string) => void;
  onReturnBook: (id: string) => void;
};

const BookDetail = ({ book, onRentalBook, onReturnBook }: Props) => {
  const { data: session } = useSession();

  return (
    <div className={styles.bookDetail}>
      <div className={styles.bookDetail_img}>
        <Image
          width={250}
          height={400}
          src={book.imageLink}
          alt={"本のサムネイル"}
        />
      </div>
      <div className={styles.bookDetail_info}>
        <h1 className={styles.bookDetail_info_title}>{book.title}</h1>
        <div className={styles.bookDetail_info_sub}>
          <p className={styles.bookDetail_info_author}>{book.author} /著、</p>
          <p className={styles.bookDetail_info_donor}>持ち主：{book.donor}、</p>
          <p className={styles.bookDetail_info_place}>
            置き場所：{book.place}
          </p>
        </div>
        <p className={styles.bookDetail_info_desc}>{book.description}</p>
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

export default BookDetail;
