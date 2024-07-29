import CompanyList from "../../../components/portal/companies/CompanyList";
import {useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";

const CompanyListPage = () => {
  const [bidDetails, setBidDetails] = useState({});
  const id = new URLSearchParams(useLocation().search).get("bid");

  useEffect(() => {
    if (id) {
      const retrieveBid = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.RETRIEVE_CREATED_BID + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setBidDetails(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id]);

  return (
    <>
      <CompanyList bidDetails={bidDetails} id={id} />
    </>
  );
};

export default CompanyListPage;
