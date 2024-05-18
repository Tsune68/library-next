import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Book } from "@/types/book";
import { BookList } from "@/components/BookList/BookList";
import { LoginButton } from "@/components/LoginButton/LoginButton";
import { fetchData } from "./api/fetchData";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const { data: session, status } = useSession();

  //本の一覧を取得
  useEffect(() => {
    const getAllBooks = async () => {
      const response = await fetchData("/api/books", "GET");
      const allBooks = response.data;
      setBooks(allBooks);
    };
    getAllBooks();
  }, []);

  const rentalBook = async (bookId: string) => {
    try {
      await fetchData("/api/books/rental", "POST", {
        bookId,
        userId: session?.user.id,
      });
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, isLending: true } : book
        )
      );
    } catch (error) {
      console.error("Failed to rental the book:", error);
    }
  };

  const returnBook = async (bookId: string) => {
    try {
      await fetchData("/api/books/return", "POST", {
        bookId,
        userId: session?.user.id,
      });
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, isLending: false } : book
        )
      );
    } catch (error) {
      console.error("Failed to return the book:", error);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    return (
      <div className="container mx-auto px-10 py-10">
        <p>You are logged in as {session.user.id}</p>
        <button onClick={() => signOut()}>Logout</button>
        <BookList books={books} onRentalBook={rentalBook} onReturnBook={returnBook} />
      </div>
    );
  } else {
    return <LoginButton />;
  }
}
