import React from "react";
import styles from "./BookButton.module.scss";

type BookButtonProps = {
  isLending: boolean;
  isOwned: boolean;
  onRentalBook: () => void;
  onReturnBook: () => void;
};

const BookButton = ({ isLending, isOwned, onRentalBook, onReturnBook }: BookButtonProps) => {
  if (isLending && isOwned) {
    return (
      <button className={styles.returnButton} onClick={onReturnBook}>
        返却する
      </button>
    );
  } else if (!isLending) {
    return (
      <button className={styles.rentalButton} onClick={onRentalBook}>
        借りる
      </button>
    );
  } else {
    return (
      <button className={styles.disabledButton} disabled>
        貸し出し中
      </button>
    );
  }
};

export default BookButton;
