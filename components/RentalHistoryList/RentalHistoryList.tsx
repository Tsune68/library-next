import React from "react";
import { RentalHistory } from "@/types/rentalHistory";
import Image from "next/image";
import Link from "next/link";

type RentalHistoryListProps = {
  rentalHistory: RentalHistory[];
};

const RentalHistoryList = ({ rentalHistory }: RentalHistoryListProps) => {
  return (
    <ul>
      {rentalHistory.map((rental) => (
        <li key={rental.id}>
          <div>
            <div>
              <Image
                src={rental.book.imageLink}
                alt={"本のサムネイル"}
                width={130}
                height={185}
              />
            </div>
            <div>
              <Link href={`/books/${rental.book.id}`}>
                {rental.book.title}
              </Link>
              <p>
                借りた日：{new Date(rental.borrowedAt).toLocaleDateString("ja-JP", { month: "long", day: "numeric" })}
              </p>
              <p>
                返却日：
                {rental.returnedAt
                  ? new Date(rental.returnedAt).toLocaleDateString("ja-JP", { month: "long", day: "numeric" })
                  : "貸出中"}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RentalHistoryList;
