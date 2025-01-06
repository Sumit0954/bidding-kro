import React, { useEffect, useState } from "react";
import styles from "./Bids.module.scss";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import DataTable from "../../../../elements/CustomDataTable/DataTable";
import { Bid_pricing_column } from "../../../../elements/CustomDataTable/PortalColumnData";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
import _sendAPIRequest from "../../../../helpers/api";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import { useParams } from "react-router-dom";
const Bids = ({ bidDetails }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [liveBidparticipants, setLiveBidparticipants] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(false);
  const theme = useTheme();
  const [screenLoader, setScreenLoader] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleAccordionChange = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? false : index));
  };

  const liveBidBidders = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.LIVE_BID_BIDDERS + `${bidDetails?.id}/`,
        "",
        true
      );
      if (response.status === 200) {
        setLiveBidparticipants(response?.data);
        setScreenLoader(false)
      }
    } catch (error) {
      console.log(error);
      setScreenLoader(false)
    }
  };

  useEffect(() => {
    liveBidBidders();
  }, []);

  if (screenLoader) {
    return <ScreenLoader />;
  }

  return (
    <>
      <br />
      <div className={styles["heading"]}>
        <Typography variant="h6">Company Name</Typography>
      </div>
      {liveBidparticipants.map((participant, index) => {
        return (
          <>
            <Accordion
              expanded={expandedIndex === index}
              onChange={() => handleAccordionChange(index)}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ fontWeight: "bolder" }}>
                  {participant?.company}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Tabs for the three panels */}
                <Tabs
                  value={tabIndex}
                  onChange={handleTabChange}
                  variant={isMobile ? "scrollable" : "fullWidth"}
                  scrollButtons="auto"
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tab label="Questionnaire" />
                  <Tab label="Bid Pricing" />
                  <Tab label="Supplier Remarks" />
                </Tabs>

                {/* Tab Panels */}
                <Box
                  hidden={tabIndex !== 0}
                  sx={{
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {participant.question.map((question, key) => {
                    return (
                      <>
                        <Box sx={{ marginBottom: "20px" }}>
                          <Typography
                            variant="h6"
                            sx={{ color: "#052c65", marginBottom: "8px" }}
                          >
                            {key + 1}. {question.text}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ paddingLeft: "16px", color: "#4a4a4a" }}
                          >
                            -{" "}
                            {`${
                              question.answer === null
                                ? "The supplier did not answer this question"
                                : question.answer
                            }`}
                          </Typography>
                        </Box>
                      </>
                    );
                  })}
                </Box>

                <Box hidden={tabIndex !== 1} sx={{ padding: "20px" }}>
                  {/* Bid Pricing Panel */}
                  <DataTable
                    propsColumn={Bid_pricing_column}
                    propsData={participant?.bid_pricing || []}
                  />
                </Box>

                <Box
                  hidden={tabIndex !== 2}
                  sx={{
                    padding: "20px",
                    backgroundColor: "#f5faff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #cfe0fc",
                  }}
                >
                  {/* Bid Suppliers Remark */}
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#052c65",
                      fontWeight: "bold",
                      marginBottom: "12px",
                    }}
                  >
                    {participant?.company}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#4a4a4a", lineHeight: 1.6 }}
                  >
                    -{" "}
                    {participant?.remarks === ""
                      ? "The supplier did not provide a remark for this bid"
                      : participant?.remarks}
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </>
        );
      })}
    </>
  );
};
export default Bids;
