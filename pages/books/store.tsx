import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { fetchData } from "../api/fetchData";
import BookForm from "@/components/BookForm/BookForm";

const Store = () => {
  const places = [
    { id: 1, place: "自宅" },
    { id: 2, place: "オフィス" },
  ];

  const { data: session } = useSession();
  const [code, setCode] = useState("");
  const [donor, setDonor] = useState(session?.user.name?.replace(/\s+/g, "") || "");
  const [selectedPlace, setSelectedPlace] = useState(places[0].place);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlace(e.target.value);
  };

  const storeBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetchData("/api/books/store", "POST", {
      code,
      donor,
      userId: session?.user.id,
      place: selectedPlace,
    });

    if (response.ok) {
      toast.success(response.data.message);
      setCode("");
      setDonor("");
      setSelectedPlace(places[0].place);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="pageContainer">
      <h1 className="pageTitle">本の登録</h1>
      <BookForm
        code={code}
        donor={donor}
        setCode={setCode}
        setDonor={setDonor}
        onSubmit={storeBook}
        places={places}
        selectedPlace={selectedPlace}
        onSelectChange={handleSelectChange}      />
    </div>
  );
};

export default Store;
