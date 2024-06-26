import React from "react";
import styles from "./BookForm.module.scss";
import Image from "next/image";

type Place = {
  id: number;
  place: string;
};

type Props = {
  code: string;
  donor: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setDonor: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  places: Place[];
  selectedPlace: string;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const BookForm = ({
  code,
  donor,
  setCode,
  setDonor,
  onSubmit,
  places,
  selectedPlace,
  onSelectChange,
}: Props) => {
  return (
    <div className={styles.bookForm}>
      <div className={styles.bookForm_caution}>
        <h2>⚠️登録前に前にお読みください⚠️</h2>
        <ul>
          <li>
            名前は本名で<b>スペースを空けずに</b>入力してください。
          </li>
          <li>
            代理で登録する場合は、<b>本の持ち主の名前</b>を入力してください。
          </li>
          <li>
            会社で買った場合は、<b>オフィス</b>と入力してください。
          </li>
          <li>
            ISBNコードは、-(ハイフン)等を省略して<b>数字のみ</b>
            で入力してください。
          </li>
        </ul>
      </div>

      <form onSubmit={onSubmit}>
        <label htmlFor="bookCode" className={styles.bookForm_label}>
          ISBNコード
          <span>*</span>
        </label>
        <input
          id="bookCode"
          className={styles.bookForm_input}
          placeholder="ISBNコードを入力してください。"
          onChange={(e) => setCode(e.target.value)}
          required
          value={code}
        />
        <details>
          <summary>ISBNコードとは</summary>
          <div>
            <p>
              画像の赤枠で囲まれた箇所がISBNコードです。
              <br />
              -(ハイフン)を省略して入力してください。
            </p>
            <Image
              alt="ISBNコードの説明"
              src="/images/isbn.png"
              width={400}
              height={100}
            />
          </div>
        </details>
        <label htmlFor="donor" className={styles.bookForm_label}>
          持ち主の名前
          <span>*</span>
        </label>
        <input
          id="donor"
          className={styles.bookForm_input}
          placeholder="持ち主の名前を入力してください"
          onChange={(e) => setDonor(e.target.value)}
          required
          value={donor}
        />
        <label htmlFor="place" className={styles.bookForm_label}>
          本の置き場所
        </label>
        <select
          id="place"
          className={styles.bookForm_select}
          onChange={onSelectChange}
          required
        >
          {places.map((place) => (
            <option value={place.place} key={place.id}>
              {place.place}
            </option>
          ))}
        </select>
        <details>
          <summary className={styles.place_details}>本の置き場所とは</summary>
          <div>
            <strong>自宅</strong>
            <p>
              まだ読む可能性がある本や、普段手元に置いておきたい本は「自宅」を選択して登録してください。その上で、借りたい人が現れた場合は、直接受け渡しの調整を行ってください。
            </p>
          </div>
          <div>
            <strong>オフィス</strong>
            <p>
              既に読まない本や、本の受け渡しの手続きを簡略化したい方は「オフィス」を選択して登録してください。その後、対象の本をオフィスにお持ちください。オフィスで一括して保管いたします。
            </p>
          </div>
        </details>

        <button className={styles.bookForm_button} type="submit">
          登録する
        </button>
      </form>
    </div>
  );
};

export default BookForm;
