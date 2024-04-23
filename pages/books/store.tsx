import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from 'react-toastify'

const Store = () => {
  const { data: session, status } = useSession();
  const [code, setCode] = useState("");
  const storeBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/books/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, userId: session?.user.id }),
    });

    if (response.ok) {
      toast.success('本の登録に成功しました！')
      setCode("");
      console.log("Book saved successfully");
    } else {
      toast.error('本の登録に失敗しました、、、')
      console.error("Failed to save the book");
    }
  };
  return (
    <div>
      <form onSubmit={storeBook}>
        <input
          className="h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="ISBNコードを入力してください。"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        <button type="submit">登録する</button>
      </form>
    </div>
  );
};

export default Store;
