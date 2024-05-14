import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const returnBook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ messsage: "Unauthorized" });
  }

  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    const rentalHistory = await prisma.rentalHistory.findFirst({
      where: {
        userId: session.user.id,
        bookId: bookId,
        returnedAt: null,
      },
    });

    if (!rentalHistory) {
      return res.status(404).json({ message: "Rental history not found" });
    }

    const updatedRentalHistory = await prisma.rentalHistory.update({
      where: {
        id: rentalHistory.id,
      },
      data: {
        returnedAt: new Date(),
      },
    });

    return res.status(200).json(updatedRentalHistory);
  } catch (error) {
    console.error("Error returning book:", error);
    return res.status(500).json({ message: "Failed to return book" });
  }
};

export default returnBook;
