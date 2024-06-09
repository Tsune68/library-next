import React from "react";
import styles from "./BookForm.module.scss";

type Props = {
  code: string;
  donor: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setDonor: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const BookForm = ({ code, donor, setCode, setDonor, onSubmit }: Props) => {
  return (
    <form className={styles.bookForm} onSubmit={onSubmit}>
      <input
        className={styles.bookForm_input}
        placeholder="ISBNコードを入力してください。"
        onChange={(e) => setCode(e.target.value)}
        required
        value={code}
      />
      <input
        className={styles.bookForm_input}
        placeholder="寄贈者の名前を入力してください"
        onChange={(e) => setDonor(e.target.value)}
        value={donor}
      />
      <button className={styles.bookForm_button} type="submit">登録する</button>
    </form>
  );
};

export default BookForm;
