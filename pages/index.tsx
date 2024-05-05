import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Book } from "@/types/book";
import { BookList } from "@/components/BookList/BookList";
import { LoginButton } from "@/components/LoginButton/LoginButton";


export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const { data: session, status } = useSession();

  //本の一覧を取得
  useEffect(() => {
    const getAllBooks = async () => {
      const response = await fetch("/api/books", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allbooks = await response.json();
      setBooks(allbooks);
    };
    getAllBooks();
  }, []);

  const onUpdateIsRending = async (id: string) => {
    const response = await fetch("/api/books/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      const updatedBook = await response.json();
      setBooks((books) =>
        books.map((book) => {
          if (book.id === id) {
            return updatedBook;
          }
          return book;
        })
      );
    } else {
      console.error("Failed to update the book");
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
