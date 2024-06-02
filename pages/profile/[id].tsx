import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../api/fetchData";
import { RentalHistory } from "@/types/rentalHistory";
import RentalHistoryList from "@/components/RentalHistoryList/RentalHistoryList";

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rentalHistory, setRentalHistory] = useState<RentalHistory[]>();

  const getRentalHistory = async () => {
    const response = await fetchData(`/api/users/${id}/rentals`, "GET");
    if (response.ok) {
      console.log(response.data);
      setRentalHistory(response.data);
    }
  };

  useEffect(() => {
    if (id) {
      getRentalHistory();
    }
  }, [id]);

  return (
    <div className="container mx-auto px-10 py-10">
      <h1>貸し出し履歴</h1>
      {rentalHistory && rentalHistory.length > 0 ? (
        <RentalHistoryList rentalHistory={rentalHistory} />
      ) : (
        <p>まだ本を借りていないです！</p>
      )}
    </div>
  );
};

export default ProfilePage;
