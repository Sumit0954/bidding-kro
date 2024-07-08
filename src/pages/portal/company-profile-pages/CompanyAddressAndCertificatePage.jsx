import React, { useContext, useEffect, useState } from "react";
import AddressForm from "../../../components/portal/company-profile/AddressForm";
import CertificateForm from "../../../components/portal/company-profile/CertificateForm";
import { CompanyDetailsContext } from "../../../contexts/CompanyDetailsProvider";
import styles from "../../../components/portal/company-profile/CompanyProfile.module.scss";
import cn from "classnames";
import { useParams } from "react-router-dom";

const CompanyAddressAndCertificatePage = () => {
  const { companyDetails } = useContext(CompanyDetailsContext);
  const [addresses, setAddresses] = useState([
    { street: "", city: "", state: "", pincode: "" },
  ]);
  const [certificates, setCertificates] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setAddresses(companyDetails?.address);
    setCertificates(companyDetails?.certificate);
  }, [companyDetails]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className={cn(
              styles["form-container"],
              styles["cac-form-container"]
            )}
          >
            <div className={cn("row", styles["form-section"])}>
              <AddressForm addresses={addresses} id={id} />
              <CertificateForm certificates={certificates} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyAddressAndCertificatePage;
