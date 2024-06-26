import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const rentalBook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { bookId, userId } = req.body;

  if (!bookId) {
    return res.status(405).json({ message: "本が存在しないです。" });
  }

  if(!userId) {
    return res.status(401).json({ messsage: "ログインしてください。" });
  }

  try {
    const rental = await prisma.rentalHistory.create({
      data: {
        userId: userId,
        bookId: bookId,
      },
    });

    return res.status(201).json({rental, message:"レンタルしました！"});
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default rentalBook;
