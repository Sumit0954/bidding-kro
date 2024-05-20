import React from "react";
import Layout from "../../components/admin/layout/Layout";

const LayoutPage = ({ Component }) => {
  return (
    <>
      <Layout Component={Component} />
    </>
  );
};

export default LayoutPage;
