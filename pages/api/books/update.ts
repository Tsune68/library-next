import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const updateBookIsLending = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: String(id),
      },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const updatedBook = await prisma.book.update({
      where: {
        id: String(id),
      },
      data: {
        isLending: !book.isLending,
      }
    });

    return res.status(200).json(updatedBook);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

export default updateBookIsLending;
