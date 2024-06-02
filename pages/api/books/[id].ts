import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const getBookDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: String(id),
      },
      include: {
        user: true,
        rentalHistory: {
          where: {
            returnedAt: null,
          },
        },
      },
    });
    if (book) {
      const isLending = book.rentalHistory.length > 0;
      const rental =
        book.rentalHistory.length > 0 ? book.rentalHistory[0] : null;

      return res.status(200).json({
        ...book,
        isLending,
        rental,
      });
    } else {
      return res.status(404).json({ message: "本が見つかりませんでした。" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

export default getBookDetail;
