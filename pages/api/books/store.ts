import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const googleBooksUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

export default async function storeBook(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { code, donor, userId, place } = req.body;

  if(!donor) {
    return res.status(409).json({message: "本の持ち主を入力してください"});
  }

  const validPlaces = ["自宅", "オフィス"];
  if (!validPlaces.includes(place)) {
    return res.status(400).json({ message: "適切な置き場所を選択してください" });
  }

  const ExistingBook = await prisma.book.findUnique({
    where: {
      bookCode: code,
    },
  });

  if (ExistingBook) {
    return res.status(409).json({ message: "同じ本が既に存在します" });
  }

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
          imageLink: item.imageLinks?.thumbnail ?? "/images/NoImage.png",
          bookCode: code,
          donor: donor,
          userId: userId,
          publishedDate: item.publishedDate,
          place: place,
        },
      });
      return res
        .status(200)
        .json({ message: "本の登録に成功しました！", book });
    } catch (err) {
      console.error("Error saving the book:", err);
      return res.status(500).json({ message: "本の登録に失敗しました..." });
    }
  } else {
    return res.status(404).json({ message: "本が存在しないです" });
  }
}
