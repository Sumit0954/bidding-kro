import CompanyList from "../../../components/portal/companies/CompanyList";
import { Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          margin: '15px 0'
        }}
      >
        <NavLink to={"/portal/companies"} className={cn("btn", "button")}>
          My Company
        </NavLink>
      </Box>

      <CompanyList bidDetails={bidDetails} id={id} />
    </>
  );
};

export default CompanyListPage;
