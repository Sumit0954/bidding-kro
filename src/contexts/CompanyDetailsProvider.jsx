import { createContext, useEffect, useState } from "react";
import _sendAPIRequest from "../helpers/api";
import { PortalApiUrls } from "../helpers/api-urls/PortalApiUrls";

export const CompanyDetailsContext = createContext();
const CompanyDetailsProvider = (props) => {
  const [companyDetails, setCompanyDetails] = useState({});
  const [noCompanyCat, setNoCompanyCat] = useState(false);

  const getCompanyProfile = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.GET_COMPANY_PROFILE,
        "",
        true
      );
      if (response.status === 200) {
        setCompanyDetails(response.data);
        setNoCompanyCat(response.data.category.length === 0);
        localStorage.setItem("loginUserID", response.data.id);
      }
    } catch (error) {
      if (error?.status === 404) {
        setCompanyDetails({});
      }
    }
  };

  useEffect(() => {
    getCompanyProfile();
  }, []);

  return (
    <CompanyDetailsContext.Provider
      value={{
        companyDetails,
        setCompanyDetails,
        noCompanyCat,
        setNoCompanyCat,
      }}
    >
      {props.children}
    </CompanyDetailsContext.Provider>
  );
};

export default CompanyDetailsProvider;
