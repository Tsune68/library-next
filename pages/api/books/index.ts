import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const getAllBooks = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const allBooks = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        rentalHistory: true
      },
    });

    const booksWithLendingStatus = allBooks.map((book) => {
      const rental = book.rentalHistory.find((rental) => rental.returnedAt === null);
      const isLending = book.rentalHistory.length > 0;
      return {
        ...book,
        rental,
        isLending,
      };
    });

    return res.status(200).json(booksWithLendingStatus);
  } catch (err) {
    return res.status(500).json({ message: "Failed to retrieve books" });
  }
};

export default getAllBooks;
