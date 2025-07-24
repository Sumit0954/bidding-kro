import React, { useContext, useEffect, useState } from "react";
import AddressForm from "../../../components/portal/company-profile/AddressForm";
import CertificateForm from "../../../components/portal/company-profile/CertificateForm";
import { CompanyDetailsContext } from "../../../contexts/CompanyDetailsProvider";
import styles from "../../../components/portal/company-profile/CompanyProfile.module.scss";
import cn from "classnames";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../../contexts/AlertProvider";

const CompanyAddressAndCertificatePage = () => {
  const { companyDetails } = useContext(CompanyDetailsContext);
  const { setAlert } = useContext(AlertContext);
  const [addresses, setAddresses] = useState([
    { street: "", city: "", state: "", pincode: "" },
  ]);
  const [certificates, setCertificates] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setAddresses(companyDetails?.address || []);
    setCertificates(companyDetails?.certificate || []);
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
              <AddressForm
                addresses={addresses}
                id={id}
                setAddresses={setAddresses}
              />
              <CertificateForm
                certificates={certificates}
                setCertificates={setCertificates}
              />
              <div
                className={styles["btn-container"]}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  className={cn("btn", "button", styles["custom-btn"])}
                  onClick={() =>
                    navigate(`/portal/company-profile/category/${id}`)
                  }
                >
                  Back
                </button>
                <button
                  type="button"
                  className={cn("btn", "button")}
                  onClick={() => {
                    if (!addresses || addresses.length === 0) {
                      setAlert({
                        isVisible: true,
                        message:
                          "Please add the address before proceeding further.",
                        severity: "error",
                      });
                      return;
                    }
                    navigate("/portal/bids");
                  }}
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyAddressAndCertificatePage;
