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
      const allbooks = await fetchData("/api/books", "GET");
      setBooks(allbooks);
    };
    getAllBooks();
  }, []);

  const rentalBook = async (bookId: string) => {
    try {
      await fetchData("/api/books/rental", "POST", { bookId, userId: session?.user.id });
    } catch (error) {
      console.error("Failed to update the book:", error);
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
        <BookList books={books} onRentalBook={rentalBook} />
      </div>
    );
  } else {
    return <LoginButton />;
  }
}
