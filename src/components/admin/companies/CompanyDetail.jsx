import React, { useState } from "react";
import styles from "./CompanyDetail.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";

const CompanyDetail = ({ companyDetails }) => {
  const [expanded, setExpanded] = useState("Summary");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        expanded={expanded === "Summary"}
        onChange={handleChange("Summary")}
        square={true}
        classes={{ root: "custom-accordion" }}
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
              <p className={styles["col-data"]}>{companyDetails?.name}</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Website url</h6>
              <p className={styles["col-data"]}>
                <NavLink href={companyDetails?.website} target="_blank">
                  {companyDetails?.website}
                </NavLink>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Organisation Type</h6>
              <p className={styles["col-data"]}>
                {companyDetails?.organization_type?.name}
              </p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Year of Incorporation</h6>
              <p className={styles["col-data"]}>
                {companyDetails?.incorporation_year}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>No. of Employess</h6>
              <p className={styles["col-data"]}>
                {companyDetails?.employee_count}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>GST</h6>
              <p className={styles["col-data"]}>{companyDetails?.gstin}</p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>
                Average Annual Reveue (last 3 years)
              </h6>
              <p className={styles["col-data"]}>
                {companyDetails?.avg_annual_revenue}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Business Email</h6>
              <p className={styles["col-data"]}>
                <a href={`mailto:${companyDetails?.business_email}`}>
                  {companyDetails?.business_email}
                </a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Business Mobile</h6>
              <p className={styles["col-data"]}>
                <a href={`tel:${companyDetails?.business_mobile}`}>
                  {companyDetails?.business_mobile}
                </a>
              </p>
            </div>
          </div>
          <Divider classes={{ root: "custom-divider" }} />
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Description</h6>
              <p
                className={styles["col-data"]}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(companyDetails?.description),
                }}
              ></p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "Owner Info"}
        onChange={handleChange("Owner Info")}
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Owner Info
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Owner Name</h6>
              <p className={styles["col-data"]}>
                {companyDetails?.customer_profile?.user?.first_name}{" "}
                {companyDetails?.customer_profile?.user?.last_name}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Designation</h6>
              <p className={styles["col-data"]}>
                {companyDetails?.customer_profile?.designation}
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Mobile</h6>
              <p className={styles["col-data"]}>
                <a
                  href={`tel:${companyDetails?.customer_profile?.user?.mobile_number}`}
                >
                  {companyDetails?.customer_profile?.user?.mobile_number}
                </a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Email</h6>
              <p className={styles["col-data"]}>
                <a
                  href={`mailto:${companyDetails?.customer_profile?.user?.email}`}
                >
                  {companyDetails?.customer_profile?.user?.email}
                </a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>WhatsApp</h6>
              <p className={styles["col-data"]}>
                {companyDetails?.customer_profile?.whatsapp_number}
              </p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "Categories"}
        onChange={handleChange("Categories")}
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Categories ({companyDetails?.category?.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" flexWrap="wrap" gap="10px">
            {companyDetails?.category?.map((category) => {
              return <Chip label={category?.name} />;
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* <Accordion
        expanded={expanded === "Contacts"}
        onChange={handleChange("Contacts")}
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Contacts (2)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Contact Person Name</h6>
              <p className={styles["col-data"]}>Arvind Kumar</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Designation</h6>
              <p className={styles["col-data"]}>Owner</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Mobile</h6>
              <p className={styles["col-data"]}>
                <a href="tel:+91-9999999999">+91-9999999999</a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Email</h6>
              <p className={styles["col-data"]}>
                <a href="mailto:arvind@gmail.com">arvind@gmail.com</a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>WhatsApp</h6>
              <p className={styles["col-data"]}>+91-9999999999</p>
            </div>
          </div>

          <Divider classes={{ root: "custom-divider" }} />

          <div className="row">
            <div className="col">
              <h6 className={styles["col-heading"]}>Contact Person Name</h6>
              <p className={styles["col-data"]}>Arvind Kumar</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Designation</h6>
              <p className={styles["col-data"]}>Owner</p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Mobile</h6>
              <p className={styles["col-data"]}>
                <a href="tel:+91-9999999999">+91-9999999999</a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>Email</h6>
              <p className={styles["col-data"]}>
                <a href="mailto:arvind@gmail.com">arvind@gmail.com</a>
              </p>
            </div>
            <div className="col">
              <h6 className={styles["col-heading"]}>WhatsApp</h6>
              <p className={styles["col-data"]}>+91-9999999999</p>
            </div>
          </div>
        </AccordionDetails>
      </Accordion> */}

      <Accordion
        expanded={expanded === "Addresses"}
        onChange={handleChange("Addresses")}
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Addresses ({companyDetails?.address?.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {companyDetails?.address?.map((item, index) => {
            return (
              <>
                <div className="row">
                  <div className="col">
                    <h6 className={styles["col-heading"]}>
                      Address Line {index + 1}
                    </h6>
                    <p className={styles["col-data"]}>
                      {`${item.address}, ${item.city}, ${item.state}, ${item.country} - ${item.pincode}`}
                    </p>
                  </div>
                </div>

                {index < companyDetails?.address?.length - 1 && (
                  <Divider classes={{ root: "custom-divider" }} />
                )}
              </>
            );
          })}
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "Certificates"}
        onChange={handleChange("Certificates")}
        square={true}
        classes={{ root: "custom-accordion" }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography classes={{ root: "custom-accordion-heading" }}>
            Certificates ({companyDetails?.certificate?.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ImageList cols={5} gap={10} sx={{ overflowY: "unset" }}>
            {companyDetails?.certificate?.map((item, index) => (
              <>
                <ImageListItem key={index}>
                  <img
                    srcSet={`${item.file}?w=164&h=164&fit=contain&auto=format&dpr=2 2x`}
                    src={item.file}
                    alt={`Certificate ${index + 1}`}
                    loading="lazy"
                  />
                  <ImageListItemBar title={item.type.name} />
                </ImageListItem>
              </>
            ))}
          </ImageList>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CompanyDetail;
