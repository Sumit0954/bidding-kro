import React from "react";
import TransactionList from "../../components/admin/transaction/TransactionList";
import BidPriceForm from "../../components/admin/transaction/BidPriceForm";

const TransactionListPage = () => {
  return (
    <>
      <BidPriceForm />
      <TransactionList />
    </>
  );
};

export default TransactionListPage;
