import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Book } from "@/types/book";
import { BookList } from "@/components/BookList/BookList";
import { LoginButton } from "@/components/LoginButton/LoginButton";
import { fetchData } from "./api/fetchData";
import { toast } from "react-toastify";

export default function Home() {
  const { data: session, status } = useSession();
  const [books, setBooks] = useState<Book[]>([]);

  const getAllBooks = async () => {
    const response = await fetchData("/api/books", "GET");
    const allBooks = response.data;
    setBooks(allBooks);
  };

  //本の一覧を取得
  useEffect(() => {
    getAllBooks();
  }, []);

  const rentalBook = async (bookId: string) => {
    try {
      const response = await fetchData("/api/books/rental", "POST", {
        bookId,
        userId: session?.user.id,
      });
      if (response.ok) {
        toast.success(response.data.message);
        getAllBooks();
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
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId
              ? { ...book, isLending: false, rental: null }
              : book
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to return the book:", error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <div className="pageContainer">
        <p>You are logged in as {session.user.id}</p>
        <button onClick={() => signOut()}>Logout</button>
        <BookList
          books={books}
          onRentalBook={rentalBook}
          onReturnBook={returnBook}
        />
      </div>
    );
  } else {
    return <LoginButton />;
  }
}
