import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const returnBook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { bookId, userId } = req.body;

  if (!bookId) {
    return res.status(400).json({ message: "本が存在しないです。" });
  }

  if (!userId) {
    return res.status(401).json({ messsage: "ログインしてください。" });
  }

  try {
    const rentalHistory = await prisma.rentalHistory.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
        returnedAt: null,
      },
    });

    if (!rentalHistory) {
      return res
        .status(404)
        .json({ message: "貸し出し履歴に存在しないです。" });
    }

    const updatedRentalHistory = await prisma.rentalHistory.update({
      where: {
        id: rentalHistory.id,
      },
      data: {
        returnedAt: new Date(),
      },
    });

    return res
      .status(200)
      .json({ updatedRentalHistory, message: "本を返却しました！" });
  } catch (error) {
    console.error("Error returning book:", error);
    return res.status(500).json({ message: "Failed to return book" });
  }
};

export default returnBook;
