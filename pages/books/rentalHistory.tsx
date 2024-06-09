import React, { useEffect, useState } from "react";
import { fetchData } from "../api/fetchData";
import { RentalHistory } from "@/types/rentalHistory";
import RentalHistoryList from "@/components/RentalHistoryList/RentalHistoryList";

const RentalHistoryPage = () => {
  const [rentalHistory, setAllRentalHistory] = useState<RentalHistory[]>();

  const getAllRentalHistory = async () => {
    const response = await fetchData(`/api/books/rentalHistory`, "GET");
    if (response.ok) {
      console.log(response.data);
      setAllRentalHistory(response.data);
    }
  };

  useEffect(() => {
    getAllRentalHistory();
  }, []);

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">貸し出し履歴</h1>
      {rentalHistory && rentalHistory.length > 0 ? (
        <RentalHistoryList rentalHistory={rentalHistory} showRentalUserName={true}/>
      ) : (
        <p>まだ本を借りていないです！</p>
      )}
    </div>
  );
};

export default RentalHistoryPage;
