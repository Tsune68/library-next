import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const getRentalHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  // HTTPメソッドのチェック
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // クエリパラメータの取得とチェック
  const { id } = req.query;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "妥当なユーザーIDじゃないです" });
  }

  try {
    const rentals = await prisma.rentalHistory.findMany({
      where: {
        userId: String(id),
      },
      orderBy: {
        borrowedAt: "desc",
      },
      include: {
        book: true,
      },
    });

    return res.status(200).json(rentals);
  } catch (err) {
    return res.status(500).json({ message: "Server error", err });
  }
};

export default getRentalHistory;
