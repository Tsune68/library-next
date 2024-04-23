import React, { useEffect, useState } from "react";
import { Book } from "..";
import { useRouter } from "next/router";

type PropsType = {
  id: string;
};

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query; // URLからidを取得
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    // 仮のAPIから本のデータを取得する例
    const getBookDetail = async () => {
      const response = await fetch(`/api/books/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const bookDetail = await response.json();
      console.log(bookDetail);
      setBook(bookDetail);
    };
    getBookDetail();

    // fetch(`/api/books/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => setBook(data));
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={book.imageLink} alt={"本のサムネイル"} />
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      {/* 他の本の詳細情報を表示 */}
    </div>
  );
};

export default BookDetail;
