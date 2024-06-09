import React, { useEffect, useState } from "react";
import { Book } from "@/types/book";
import { useRouter } from "next/router";
import { fetchData } from "../api/fetchData";
import BookDetail from "@/components/BookDetail/BookDetail";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const BookPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;
  const [book, setBook] = useState<Book>();

  //仮のAPIから本の詳細を取得
  const getBookDetail = async () => {
    const response = await fetchData(`/api/books/${id}`, "GET");
    const bookDetail = response.data;
    setBook(bookDetail);
  };

  useEffect(() => {
    if (id) {
      getBookDetail();
    }
  }, [id]);

  const rentalBook = async (bookId: string) => {
    try {
      const response = await fetchData("/api/books/rental", "POST", {
        bookId,
        userId: session?.user.id,
      });
      if (response.ok) {
        toast.success(response.data.message);
        getBookDetail();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to rental the book:", error);
    }
  };

  const returnBook = async (bookId: string) => {
    try {
      const response = await fetchData("/api/books/return", "POST", {
        bookId,
        userId: session?.user.id,
      });
      if (response.ok) {
        toast.success(response.data.message);
        setBook((prevBook) =>
          prevBook ? { ...prevBook, isLending: false, rental: null } : prevBook
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to return the book:", error);
    }
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pageContainer">
      <BookDetail
        book={book}
        onRentalBook={rentalBook}
        onReturnBook={returnBook}
      />
    </div>
  );
};

export default BookPage;
