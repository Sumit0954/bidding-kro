import styles from "./About.module.scss";
import React, { forwardRef, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import { useParams } from "react-router-dom";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import _sendAPIRequest from "../../../helpers/api";

const About = forwardRef((_, ref) => {
  const [screenLoader, setScreenLoader] = useState(true);
  const [companyDetail, setCompanyDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const getCompanyDetails = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.RETRIEVE_COMPANY_DETAILS + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setCompanyDetail(response.data);
            setScreenLoader(false);
          }
        } catch (error) {
          console.log(error);
          setScreenLoader(false);
        }
      };
      getCompanyDetails();
    }
  }, [id]);

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <div ref={ref}>
        {/* Summary */}
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["bids-detail-accordion"]}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Summary
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Company Name</h6>
                <p className={styles["col-data"]}>{companyDetail?.name}</p>
              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Website Url</h6>
                <a
                  className={styles["col-data"]}
                  href={companyDetail?.website}
                  style={{ cursor: "pointer" }}
                  target="_blank"
                >
                  {companyDetail?.website}
                </a>
              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Organisation Type</h6>
                <p className={styles["col-data"]}>
                  {companyDetail?.organization_type === null
                    ? "-"
                    : companyDetail?.organization_type}
                </p>
              </div>
            </div>
            <Divider classes={{ root: "custom-divider" }} />
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Year of incorporation</h6>
                <p className={styles["col-data"]}>
                  {companyDetail?.incorporation_year}
                </p>
              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>No. of Employess</h6>
                <p className={styles["col-data"]}>
                  {companyDetail?.employee_count}
                </p>
              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>GST</h6>
                <p className={styles["col-data"]}>{companyDetail?.gstin}</p>
              </div>
            </div>
            <Divider classes={{ root: "custom-divider" }} />
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>
                  Average Annual Revenue (last 3 years)
                </h6>
                <p className={styles["col-data"]}>
                  {companyDetail?.avg_annual_revenue}
                </p>
              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Business Email</h6>
                <p className={styles["col-data"]}>
                  {companyDetail?.business_email}
                </p>
              </div>
              <div className="col">
                <h6 className={styles["col-heading"]}>Business Mobile</h6>
                <p className={styles["col-data"]}>
                  {companyDetail?.business_mobile}
                </p>
              </div>
            </div>
            <Divider classes={{ root: "custom-divider" }} />
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Description</h6>
                <p className={styles["col-data"]}>
                  {companyDetail?.description
                    ? companyDetail.description.replace(/<\/?p>/g, "")
                    : "No description available"}
                </p>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Categories */}
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["bids-detail-accordion"]}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Categories({companyDetail?.category?.length})
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Stack direction="row" flexWrap="wrap" gap="10px">
              {companyDetail?.category?.map((category) => {
                return <Chip label={category?.name} />;
              })}
            </Stack>
          </AccordionDetails>
        </Accordion>
        {/* Address */}
        <Accordion
          defaultExpanded
          square={true}
          classes={{
            root: `custom-accordion ${styles["bids-detail-accordion"]}`,
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography classes={{ root: "custom-accordion-heading" }}>
              Address
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {console.log("address")}

            {companyDetail?.address?.length > 0 ? (
              companyDetail?.address?.map((item, index) => {
                return (
                  <>
                    <div className="row">
                      <div className="col">
                        <h6 className={styles["col-heading"]}>
                          Address {index + 1}
                        </h6>
                        <p className={styles["col-data"]}>
                          {`${item.address}, ${item.city}, ${item.state}, ${item.country} - ${item.pincode}`}
                        </p>
                      </div>
                    </div>

                    {index < companyDetail?.address?.length - 1 && (
                      <Divider classes={{ root: "custom-divider" }} />
                    )}
                  </>
                );
              })
            ) : (
              <address> - No Addres Provided</address>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
});

export default About;
