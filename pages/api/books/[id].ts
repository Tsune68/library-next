import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getBookDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: String(id),
      },
      include: {
        user: true,
      },
    });
    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

export default getBookDetail;
