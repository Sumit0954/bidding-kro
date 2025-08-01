import { forwardRef, useState } from "react";
import styles from "./CompanyDetail.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Download, ExpandMore } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import DOMPurify from "dompurify";
import { convertHtmlToText } from "../../../helpers/formatter";

const CompanyDetail = forwardRef(({ companyDetails }, ref) => {
  const [expanded, setExpanded] = useState("Summary");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <div ref={ref}>
        <Accordion
          expanded={expanded === "Summary"}
          defaultExpanded
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
                  {companyDetails?.organization_type !== null
                    ? companyDetails?.organization_type.name
                    : "Yet to be declare"}
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
                <div
                  className={styles["col-data"]}
                  style={{ whiteSpace: "pre-line" }}
                  dangerouslySetInnerHTML={{
                    __html: convertHtmlToText(
                      companyDetails?.description || ""
                    ),
                  }}
                ></div>
              </div>
            </div>
            <Divider classes={{ root: "custom-divider" }} />
            <div className="row">
              <div className="col">
                <h6 className={styles["col-heading"]}>Company Id</h6>
                <p
                  className={styles["col-data"]}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      companyDetails?.formatted_number
                    ),
                  }}
                ></p>
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
            {companyDetails?.category?.length > 0 ? (
              <Stack direction="row" flexWrap="wrap" gap="10px">
                {companyDetails.category.map((category, index) => (
                  <Chip key={index} label={category?.name} />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No Categories selected
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>

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
            {companyDetails?.address?.length > 0 ? (
              companyDetails?.address?.map((item, index) => {
                return (
                  <>
                    <div className="row">
                      <div className="col">
                        <h6 className={styles["col-heading"]}>
                          Address
                          {item?.is_billing_address && (
                            <Box component="span" sx={{ ml: 1 }}>
                              <Chip
                                label="Billing Address"
                                size="small"
                                className={styles["billing-badge"]}
                              />
                            </Box>
                          )}
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
              })
            ) : (
              <Typography variant="body2" color="text.secondary">
                No Address added
              </Typography>
            )}
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
            {companyDetails?.certificate?.length > 0 ? (
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
                      <ImageListItemBar
                        title={item.type.name}
                        actionIcon={
                          <Tooltip title={"Download certificate"}>
                            <IconButton
                              aria-label="download"
                              href={item.file}
                              download
                              sx={{
                                color: "white",
                                "&:hover": {
                                  color: "#062d72",
                                },
                              }}
                            >
                              <Download />
                            </IconButton>
                          </Tooltip>
                        }
                      />
                    </ImageListItem>
                  </>
                ))}
              </ImageList>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No Certificate added
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
});
export default CompanyDetail;
