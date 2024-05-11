import React, { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { useRouter } from "next/router";
import { fetchData } from "../api/fetchData";
import Image from "next/image";
import BookDetail from "@/components/BookDetail/BookDetail";

type PropsType = {
  id: string;
};

const BookPage = () => {
  const router = useRouter();
  const { id } = router.query;
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
    <div className="container mx-auto px-10 py-10">
      <BookDetail book={book} />
    </div>
  );
};

export default BookPage;
