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

  const onUpdateIsRending = async (id: string) => {
    try {
      const updatedBook = await fetchData("/api/books/update", "POST", { id });
      setBooks((books) =>
        books.map((book) => (book.id === id ? updatedBook : book))
      );
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
        <BookList books={books} onUpdateIsRending={onUpdateIsRending} />
      </div>
    );
  } else {
    return <LoginButton />;
  }
}
