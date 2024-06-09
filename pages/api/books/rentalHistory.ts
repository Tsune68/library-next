import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const getRentalHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  // HTTPメソッドのチェック
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const allRentals = await prisma.rentalHistory.findMany({
      orderBy: {
        borrowedAt: "desc",
      },
      include: {
        book: true,
        user: true,
      },
    });

    return res.status(200).json(allRentals);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

export default getRentalHistory;
