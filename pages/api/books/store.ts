import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const googleBooksUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

export default async function storeBook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { code, userId } = req.body;
  const url = `${googleBooksUrl}${code}`;
  const response = await fetch(url);
  const bookData = await response.json();

  if (bookData.items && bookData.items.length > 0) {
    const item = bookData.items[0].volumeInfo;
    try {
      const book = await prisma.book.create({
        data: {
          title: item.title,
          author: item.authors[0],
          description: item.description,
          imageLink: item.imageLinks?.thumbnail,
          userId: userId,
          publishedDate: item.publishedDate,
        },
      });
      return res.status(200).json({ message: "Book saved successfully", book });
    } catch (err) {
      console.error("Error saving the book:", err);
      return res.status(500).json({ message: "Failed to save the book" });
    }
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
}
