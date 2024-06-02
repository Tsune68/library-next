import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { fetchData } from "../api/fetchData";

const Store = () => {
  const { data: session } = useSession();
  const [code, setCode] = useState("");
  const [donor, setDonor] = useState("");

  const storeBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetchData("/api/books/store", "POST", {
      code,
      donor,
      userId: session?.user.id,
    });

    if (response.ok) {
      toast.success(response.data.message);
      setCode("");
      setDonor("");
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div>
      <form onSubmit={storeBook}>
        <input
          className="h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="ISBNコードを入力してください。"
          onChange={(e) => setCode(e.target.value)}
          required
          value={code}
        />
        <br />
        <input
          className="h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="寄贈者の名前を入力してください"
          onChange={(e) => setDonor(e.target.value)}
          value={donor}
        />
        <br />
        <button type="submit">登録する</button>
      </form>
    </div>
  );
};

export default Store;
