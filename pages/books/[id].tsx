import React, { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { useRouter } from "next/router";
import { fetchData } from "../api/fetchData";
import Image from "next/image";

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
      const bookDetail = await fetchData(`/api/books/${id}`, "GET");
      setBook(bookDetail);
    };
    getBookDetail();
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Image width={250} height={400} src={book.imageLink} alt={"本のサムネイル"} />
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      {/* 他の本の詳細情報を表示 */}
    </div>
  );
};

export default BookDetail;
