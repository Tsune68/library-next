import { PrismaClient } from "@prisma/client";
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
    });
    return res.status(200).json(allBooks);
  } catch (err) {
    return res.status(500).json({ message: "Failed to retrieve books" });
  }
};

export default getAllBooks;
