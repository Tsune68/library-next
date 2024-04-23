import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageLink: string;
  isLending: boolean;
  publishedDate: string;
};

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
  //本の登録
  const storeBook = async (code: string) => {
    const response = await fetch("/api/books/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, userId: session?.user.id }),
    });

    if (response.ok) {
      console.log("Book saved successfully");
    } else {
      console.error("Failed to save the book");
    }
  };

  const updateIsRending = async (id: string) => {
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
        <button onClick={() => storeBook("9784781603476")}>登録！！</button>
        <div className="grid grid-cols-4 place-content-center gap-14">
          {books &&
            books.map((book) => (
              <div key={book.id} className="grid-items m-auto mb-10">
                <div>
                  <div>
                    <img
                      className="shadow-custom"
                      src={book.imageLink}
                      alt={"本のサムネイル"}
                    />
                  </div>
                  <Link href={`books/${book.id}`}>{book.title}</Link>
                  <p>{book.author} / 著</p>
                  {!book.isLending ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => updateIsRending(book.id)}
                    >
                      借りる
                    </button>
                  ) : (
                    <button
                      className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => updateIsRending(book.id)}
                    >
                      返却する
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    return <button onClick={() => signIn("slack")}>Login</button>;
  }
}
