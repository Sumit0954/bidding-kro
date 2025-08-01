import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Tab,
  Tabs,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Summary from "../../../components/portal/bids/tabs/Summary";
import Documents from "../../../components/portal/bids/tabs/Documents";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import cn from "classnames";
import AmendmentModal from "../../../elements/CustomModal/AmendmentModal";
import DeleteDialog from "../../../elements/CustomDialog/DeleteDialog";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";
import RazorpayPaymentHandler from "../../../utils/RazorpayPaymentHandler";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import ThankyouModal from "../../../elements/CustomModal/ThankyouModal";
import PrintableBidDetails from "../../../components/portal/bids/PrintableBidDetails";
import Questions from "../../../components/portal/bids/tabs/Questions";
import InvitedSuppliers from "../../../components/portal/bids/tabs/InvitedSuppliers";
import SampleReceiving from "../../../components/portal/bids/tabs/SampleReceiving";
import Feedback from "../../../components/portal/bids/tabs/Feedback";
import LetterOfIntent from "../../../components/portal/bids/tabs/LetterOfIntent";
import Bids from "../../../components/portal/bids/tabs/Bids";
import Award from "../../../components/portal/bids/tabs/Award";
import Remark from "../../../components/portal/bids/tabs/Remark";
import AcceptanceStatus from "../../../components/portal/bids/tabs/AcceptanceStatus";
import * as React from "react";
import PendingRequests from "../../../components/portal/bids/tabs/PendingRequests";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../store/tabSlice";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import Analysis from "../../../components/portal/bids/tabs/Award";
import Bidresult from "../../../components/portal/bids/tabs/Bidresult";
import { Print, PrintOutlined } from "@mui/icons-material";
import styles from "./BidDetailsPage.module.scss";
import FeedbackSupplier from "../../../components/portal/bids/tabs/FeedbackSupplier";
import { AlertContext } from "../../../contexts/AlertProvider";
import BidPaymentModal from "../../../components/portal/bid-activation-payment/BidPaymentModal";
import { truncateString } from "../../../helpers/formatter";
import PaymentLoader from "../../../components/portal/bid-activation-payment/PaymentLoader";
import { useReactToPrint } from "react-to-print";
const BidDetailsPage = () => {
  const [addAmendment, setAddAmendment] = useState(false);
  const navigate = useNavigate();
  const [activateBid, setActivateBid] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);
  const { id } = useParams();
  const [bidDetails, setBidDetails] = useState({});
  const componentRef = useRef(null);
  const type = new URLSearchParams(useLocation().search).get("type");
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [participant, setParticipant] = useState();
  const [screenLoader, setScreenLoader] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const { setAlert } = useContext(AlertContext);
  const [bidAmount, setBidAmount] = useState(null);
  const [confirmPaymentLoading, setConfirmPaymentLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
  });

  // const urlActiveTab = new URLSearchParams(useLocation().search).get("activeTab");
  const decodedSearch = decodeURIComponent(window.location.search).replace(
    /&amp;/g,
    "&"
  ); // Decode the URL
  const urlParams = new URLSearchParams(decodedSearch);
  // const urlParams = new URLSearchParams(location.search);
  const urlActiveTab = Number(urlParams.get("activeTab"));

  const isQCBSBid = bidDetails?.type === "QCBS";

  const isSampleNotApproved = !participant?.participants.some(
    (participant) => participant.sample?.approval_status === "approved"
  );

  // Disable condition for the tab
  const shouldDisableTab = isQCBSBid && isSampleNotApproved;

  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab.activeTab);

  const handleChange = (event, newValue) => {
    dispatch(setActiveTab(newValue));
    urlParams.set("activeTab", newValue);
    navigate({ search: urlParams.toString() }, { replace: true });
  };

  const fetchBidPrice = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls?.BID_PRICE_AMOUNT,
        "",
        true
      );
      if (response?.status === 200) {
        setBidAmount(response?.data?.amount);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (urlActiveTab) {
      dispatch(setActiveTab(urlActiveTab));
    }
    fetchBidPrice();
  }, []);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment the refresh key
  };

  const handleDelete = async () => {
    try {
      const response = await _sendAPIRequest(
        "DELETE",
        PortalApiUrls.CANCEL_BID + `${id}/`,
        "",
        true
      );
      if (response.status === 204) {
        setDeleteDetails({ open: false, title: "", message: "" });
      }
    } catch (error) {
      if (error.status === 403) {
        setDeleteDetails({ open: false, title: "", message: "" });
        setAlert({
          isVisible: true,
          message: "You do not have permission to perform this action.",
          severity: "error",
        });
      }
    }
  };

  const handleDeleteConfirmation = (choice) => {
    if (choice) {
      handleDelete();
    } else {
      setDeleteDetails({ open: false, title: "", message: "" });
    }
  };

  const checkBidConfirmation = (IsPaymentDone) => {
    setPaymentDetails(IsPaymentDone);
  };

  const breadcrumbs = [
    <NavLink
      underline="hover"
      key="1"
      color="inherit"
      to="/portal/bids"
      style={{ textDecoration: "none" }}
    >
      Bids
    </NavLink>,
    <Tooltip title={bidDetails?.title || ""} arrow>
      <Typography key="2" color="text.primary" style={{ cursor: "pointer" }}>
        {truncateString(bidDetails?.title, 30)}
      </Typography>
    </Tooltip>,
  ];

  useEffect(() => {
    if (id) {
      let url =
        type === "invited"
          ? PortalApiUrls.RETRIEVE_INVITED_BID
          : PortalApiUrls.RETRIEVE_CREATED_BID;

      const retrieveBid = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            url + `${id}/`,
            "",
            true
          );
          if (response.status === 200) {
            setBidDetails(response.data);
            setScreenLoader(false);
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id, type, refreshKey, showThankyou, deleteDetails]);

  useEffect(() => {
    if (bidDetails?.id) {
      const getParticipants = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.PARTICIPANTS_LIST + `${bidDetails?.id}/`,
            "",
            true
          );
          if (response.status === 200) {
            const participants = response.data.participants;
            setParticipant(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getParticipants();
    }
  }, [bidDetails?.id, refreshKey]);

  useEffect(() => {
    getPar();
  }, [showThankyou, deleteDetails]);

  const getPar = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.PARTICIPANTS_LIST + `${id}/`,
        "",
        true
      );
      if (response.status === 200) {
        setParticipant(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isWithinThreeHoursOfBidOpen = (bidOpenDate) => {
    if (!bidOpenDate) return false;
    const bidOpenTime = new Date(bidOpenDate);
    const now = new Date();
    const cutoffTime = new Date(bidOpenTime.getTime() - 3 * 60 * 60 * 1000);
    return now >= cutoffTime;
  };

  const isInviteDisabled =
    bidDetails?.status !== "active" ||
    (bidDetails?.type === "L1" && bidDetails?.bid_close_date === null) ||
    (bidDetails?.type === "QCBS" &&
      (bidDetails?.sample_receive_start_date === null ||
        bidDetails?.sample_receive_end_date === null));

  const isAmendmentDisabled =
    bidDetails?.status === "cancelled" ||
    bidDetails?.amendment?.length === 3 ||
    isWithinThreeHoursOfBidOpen(bidDetails?.bid_open_date);

  if (screenLoader) {
    return <ScreenLoader />;
  }

  if (confirmPaymentLoading) {
    return <PaymentLoader />;
  }

  return (
    <>
      {/* BUTTONS IN BIDDETAILS */}
      <div className="d-flex flex-column w-100 mb-2">
        {/* Breadcrumb and Buttons Container */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center w-100">
          {/* Breadcrumb */}
          <Breadcrumbs separator=">" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>

          {/* Buttons Section */}
          <div className="d-flex flex-column flex-md-row gap-2 mt-2 mt-md-0">
            {type === "related" ||
            type === "invited" ||
            bidDetails?.status === "completed" ||
            bidDetails?.status === "closed" ||
            bidDetails?.status === "live" ||
            bidDetails?.status === "cancelled" ? (
              <Tooltip title={`This Bid Is ${bidDetails?.status}`} arrow>
                <div className="position-relative w-100">
                  <button
                    className={`btn button w-100 ${
                      bidDetails?.status === "cancelled"
                        ? styles["ifCancelled"]
                        : "approve"
                    }`}
                    type="button"
                    disabled
                    style={{ backgroundColor: "red" }}
                    onClick={() => navigate("/portal/liveBids")}
                  >
                    {bidDetails?.status}
                  </button>

                  {bidDetails?.status === "live" && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "#FFBF00",
                        animation: "blink 1s infinite",
                      }}
                    />
                  )}
                </div>
              </Tooltip>
            ) : (
              <>
                {bidDetails?.status === "active" ? (
                  <Tooltip title={"Your Bid Is Active Now"} arrow>
                    <button
                      className={cn("btn", "button", "approve")}
                      type="button"
                      disabled
                    >
                      Active
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip title={"Activate Your Bid"} arrow>
                    <button
                      className="btn button"
                      type="button"
                      onClick={() => setActivateBid(true)}
                      disabled={bidDetails?.status === "cancelled"}
                    >
                      Activate Bid
                    </button>
                  </Tooltip>
                )}
                <Tooltip
                  title={
                    isInviteDisabled
                      ? bidDetails?.type === "L1"
                        ? "! Please Fill Out Live Bid Dates to Invite Suppliers"
                        : "! Please Fill Out Sample Dates to Invite Suppliers"
                      : "Invite Supplier for this Bid"
                  }
                  arrow
                >
                  <button
                    className="button"
                    type="button"
                    onClick={() => {
                      if (!isInviteDisabled) {
                        navigate(`/portal/companies/${bidDetails?.id}`);
                      }
                    }}
                    style={{
                      ...(isInviteDisabled && {
                        opacity: 0.5,
                        cursor: "not-allowed", // Set the disabled cursor
                      }),
                    }}
                  >
                    Invite Suppliers
                  </button>
                </Tooltip>

                {participant?.participants.length > 0 ? (
                  <Tooltip
                    title={
                      isWithinThreeHoursOfBidOpen(bidDetails?.bid_open_date)
                        ? "Less than 3 hours left for live bid"
                        : bidDetails?.amendment?.length === 3
                        ? "! Amendments limit exceeded"
                        : "Make a Amendment on this bid"
                    }
                    arrow
                  >
                    <button
                      className="button"
                      type="button"
                      onClick={() => {
                        if (!isAmendmentDisabled) {
                          setAddAmendment(true);
                        }
                      }}
                      style={{
                        ...(isAmendmentDisabled && {
                          opacity: 0.5,
                          cursor: "not-allowed",
                        }),
                      }}
                    >
                      Amendments
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip title={"Edit This Bid"} arrow>
                    <button
                      type="submit"
                      className="btn button"
                      onClick={() =>
                        navigate(`/portal/bids/categories/${bidDetails.id}`)
                      }
                      disabled={bidDetails?.status === "cancelled"}
                    >
                      Edit Bid
                    </button>
                  </Tooltip>
                )}

                <Tooltip title={"Cancel This Bid"} arrow>
                  <button
                    type="submit"
                    className="btn button reject"
                    onClick={() =>
                      setDeleteDetails({
                        open: true,
                        title: "Cancel Bid",
                        message: `Are you sure you want to cancel this ${bidDetails?.title}? This action cannot be undone.`,
                      })
                    }
                    disabled={bidDetails?.status === "cancelled"}
                  >
                    Cancel Bid
                  </button>
                </Tooltip>
                <Tooltip title="Print this bid">
                  <button
                    className={cn("btn", "button")}
                    onClick={reactToPrintFn}
                  >
                    <Print />
                  </button>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </div>
      {/*NOTE AND WARNINGS IN BIDDETAILS  */}
      {type === "invited" || type === "related" ? null : (
        <>
          <>
            {bidDetails?.status === "pending" && (
              <Alert severity="warning" className="my-3">
                <AlertTitle sx={{ fontWeight: "bold" }}>
                  Warning: Bid Activation Required
                </AlertTitle>
                Your bid is not yet activated. Please activate your bid for
                further process.
              </Alert>
            )}

            {bidDetails?.status === "active" &&
              bidDetails?.type === "L1" &&
              bidDetails?.bid_close_date === null && (
                <Alert severity="warning" className="my-3">
                  <AlertTitle sx={{ fontWeight: "bold" }}>
                    Warning: Live Bid Dates Required
                  </AlertTitle>
                  Live bid dates are not yet submitted. Please set the dates to
                  invite suppliers for the bid.{" "}
                  <span
                    onClick={() => dispatch(setActiveTab(3))}
                    style={{
                      color: "darkblue",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Click here
                  </span>
                </Alert>
              )}
            {bidDetails?.status === "active" &&
              bidDetails?.type === "QCBS" &&
              bidDetails?.sample_receive_end_date === null && (
                <Alert severity="warning" className="my-3">
                  <AlertTitle sx={{ fontWeight: "bold" }}>
                    Warning: Sample Receiving Dates Required
                  </AlertTitle>
                  Sample Receiving Dates are not yet submitted. Please set the
                  dates to invite suppliers for the bid.{" "}
                  <span
                    onClick={() => dispatch(setActiveTab(4))}
                    style={{
                      color: "darkblue",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Click here
                  </span>
                </Alert>
              )}
          </>
        </>
      )}

      {/*TABS IN BIDDETAILS  */}
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="bid-detail-tabs"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {type === "invited"
            ? [
                <Tooltip title={"See the summary of the bid"}>
                  <Tab label="Summary" {...a11yProps(0)} key={0} />
                </Tooltip>,
                <Tooltip title={"See the Documents in the bid"}>
                  <Tab label="Documents" {...a11yProps(1)} key={1} />
                </Tooltip>,
                <Tooltip title={"See Your Status of Bid Invite"}>
                  <Tab
                    label={
                      <Box display="flex" alignItems="center" gap={1}>
                        {bidDetails?.type === "L1" ? (
                          bidDetails?.participant?.status === "pending" ? (
                            <Box
                              sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#FFBF00", // Yellow for pending
                                animation: "blink 1s infinite",
                              }}
                            />
                          ) : null
                        ) : bidDetails?.participant?.sample?.approval_status ===
                          "approved" ? (
                          bidDetails?.participant?.status === "pending" &&
                          bidDetails?.bid_open_date !== null ? (
                            <Box
                              sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#FFBF00", // Yellow for pending
                                animation: "blink 1s infinite",
                              }}
                            />
                          ) : null
                        ) : bidDetails?.participant?.sample?.invite_status ===
                          "pending" ? (
                          <Box
                            sx={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: "#FFBF00", // Yellow for pending
                              animation: "blink 1s infinite",
                            }}
                          />
                        ) : null}

                        <span>Acceptance Status</span>
                      </Box>
                    }
                    {...a11yProps(2)}
                    key={2}
                  />
                </Tooltip>,
                <Tooltip title={"See Questions asked by buyer"}>
                  <Tab label="Questions" {...a11yProps(3)} key={3} />
                </Tooltip>,
                <Tooltip title={"Set the remark for this bid"}>
                  <Tab label="Remark" {...a11yProps(4)} key={4} />
                </Tooltip>,

                <Tooltip title={"See the result of this bid"}>
                  {bidDetails?.status === "completed" && (
                    <Tab label="Bid Result" {...a11yProps(5)} key={5} />
                  )}
                </Tooltip>,
                <Tooltip title={"Give the feedback to buyer"}>
                  {bidDetails?.status === "completed" && (
                    <Tab label="Feedback" {...a11yProps(6)} key={6} />
                  )}
                </Tooltip>,
              ]
            : [
                <Tooltip title={"See the summary of the bid"}>
                  <Tab label="Summary" {...a11yProps(0)} key={0} />
                </Tooltip>,
                <Tooltip title={"See the Documents in the bid"}>
                  <Tab label="Documents" {...a11yProps(1)} key={1} />
                </Tooltip>,

                type !== "related" && (
                  <Tooltip title={"See the pending request for this"}>
                    <Tab
                      // label="Pending Requests"
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          {bidDetails?.has_bid_request ? (
                            <Box
                              sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#FFBF00", // Green for pending
                                animation: "blink 1s infinite",
                              }}
                            />
                          ) : null}

                          <span>Pending Requests</span>
                        </Box>
                      }
                      {...a11yProps(2)}
                      key={2}
                    />
                  </Tooltip>
                ),

                type !== "related" && (
                  <Tooltip title={"See the invited suppliers for this"}>
                    <Tab
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          {bidDetails?.type === "L1" &&
                          bidDetails?.status === "active" &&
                          bidDetails?.bid_open_date == null ? (
                            <Box
                              sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "#FFBF00", // Green for pending
                                animation: "blink 1s infinite",
                              }}
                            />
                          ) : null}

                          <span>Invited Suppliers</span>
                        </Box>
                      }
                      {...a11yProps(3)}
                      key={3}
                      disabled={shouldDisableTab}
                    />
                  </Tooltip>
                ),

                bidDetails?.type === "L1"
                  ? [
                      (bidDetails.status === "completed" ||
                        bidDetails.status === "closed") && [
                        <Tab label="Bidders" {...a11yProps(4)} key="bids" />,
                        <Tab
                          label="Analysis"
                          {...a11yProps(5)}
                          key="analysis"
                        />,
                      ],

                      bidDetails.status === "completed" && [
                        <Tab
                          label="Letter Of Intent"
                          {...a11yProps(6)}
                          key={6}
                        />,
                      ],
                      bidDetails.status === "completed" && [
                        <Tab label="Feedback" {...a11yProps(7)} key={7} />,
                      ],
                    ]
                  : [
                      type !== "related" && (
                        <Tooltip title={"QCBS status of this bid"}>
                          <Tab
                            label={
                              <Box display="flex" alignItems="center" gap={1}>
                                {bidDetails?.status === "active" &&
                                bidDetails?.sample_receive_start_date ==
                                  null ? (
                                  <Box
                                    sx={{
                                      width: "10px",
                                      height: "10px",
                                      borderRadius: "50%",
                                      backgroundColor: "#FFBF00", // Green for pending
                                      animation: "blink 1s infinite",
                                    }}
                                  />
                                ) : null}

                                <span>QCBS Status</span>
                              </Box>
                            }
                            {...a11yProps(4)}
                            key={4}
                          />
                        </Tooltip>
                      ),
                      bidDetails.status === "closed" ||
                      bidDetails.status === "completed"
                        ? [
                            <Tooltip title={"Bidders in this bid"}>
                              <Tab label="Bidders" {...a11yProps(5)} key={5} />
                            </Tooltip>,
                            <Tooltip title={"Analysis screen"}>
                              <Tab label="Analysis" {...a11yProps(6)} key={6} />
                            </Tooltip>,
                          ]
                        : null,

                      bidDetails.status === "completed"
                        ? [
                            <Tooltip title={"LOI of this bid"}>
                              <Tab
                                label="Letter Of Intent"
                                {...a11yProps(7)}
                                key={7}
                              />
                            </Tooltip>,
                          ]
                        : null,
                      bidDetails.status === "completed"
                        ? [
                            <Tooltip title={"LOI of this bid"}>
                              <Tab label="Feedback" {...a11yProps(8)} key={8} />
                            </Tooltip>,
                          ]
                        : null,
                    ],
              ]}
        </Tabs>
      </Box>

      {/*TABPANELS IN BIDDETAILS  */}
      {type === "invited" ? (
        <>
          <TabPanel value={activeTab} index={0}>
            <Summary bidDetails={bidDetails} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Documents bidDetails={bidDetails} type={type} />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <AcceptanceStatus
              bidDetails={bidDetails}
              type={type}
              onActionComplete={handleRefresh}
            />
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <Questions bidDetails={bidDetails} />
          </TabPanel>
          <TabPanel value={activeTab} index={4}>
            <Remark bidDetails={bidDetails} />
          </TabPanel>
          <TabPanel value={activeTab} index={5}>
            <Bidresult bidDetails={bidDetails} />
          </TabPanel>
          <TabPanel value={activeTab} index={6}>
            <FeedbackSupplier bidDetails={bidDetails} />
          </TabPanel>
        </>
      ) : (
        <>
          <TabPanel value={activeTab} index={0}>
            <Summary bidDetails={bidDetails} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Documents bidDetails={bidDetails} type={type} />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <PendingRequests
              bidDetails={bidDetails}
              id={id}
              tab={activeTab}
              listtype={"InviteRequest"}
              onActionComplete={handleRefresh}
            />
            {/* <CompanyList
              bidDetails={bidDetails}
              id={id}
              tab={value}
              listtype={"InviteRequest"}
            /> */}
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <InvitedSuppliers
              // bidDetails={bidDetails}
              // participant={participant}
              // onActionComplete={() => setValue(2)}
              // onActionComplete={() => dispatch(setActiveTab(2))}
              onActionComplete={handleRefresh}
              id={id}
              type={type}
            />
          </TabPanel>
          {bidDetails?.type === "L1" ? (
            <>
              <TabPanel value={activeTab} index={4}>
                <Bids bidDetails={bidDetails} />
              </TabPanel>
              <TabPanel value={activeTab} index={5}>
                <Analysis bidDetails={bidDetails} />
              </TabPanel>
              <TabPanel value={activeTab} index={6}>
                <LetterOfIntent bidDetails={bidDetails} />
              </TabPanel>
              <TabPanel value={activeTab} index={7}>
                <Feedback bidDetails={bidDetails} />
              </TabPanel>
            </>
          ) : (
            <>
              <TabPanel value={activeTab} index={4}>
                <SampleReceiving
                  bidDetails={bidDetails}
                  participant={participant}
                  onActionComplete={handleRefresh}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={5}>
                <Bids bidDetails={bidDetails} />
              </TabPanel>
              <TabPanel value={activeTab} index={6}>
                <Analysis bidDetails={bidDetails} />
              </TabPanel>
              <TabPanel value={activeTab} index={7}>
                <LetterOfIntent bidDetails={bidDetails} />
              </TabPanel>
              <TabPanel value={activeTab} index={8}>
                <Feedback bidDetails={bidDetails} />
              </TabPanel>
            </>
          )}
        </>
      )}

      {/*AMENDMENT MODAL IN BIDDETAILS  */}
      {addAmendment && (
        <AmendmentModal
          addAmendment={addAmendment}
          setAddAmendment={setAddAmendment}
          bidDetails={bidDetails}
          setBidDetails={setBidDetails}
          id={id}
        />
      )}

      {/*BID CANCELATION CONFIRMATION MODAL IN BIDDETAILS  */}
      {deleteDetails?.open && (
        <DeleteDialog
          title={deleteDetails.title}
          message={deleteDetails.message}
          handleClick={handleDeleteConfirmation}
        />
      )}

      {/*HDFC PAYEMENT MODAL  */}
      {activateBid && (
        <BidPaymentModal
          activateBid={activateBid}
          setActivateBid={setActivateBid}
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          setConfirmPaymentLoading={setConfirmPaymentLoading}
          bidid={bidDetails?.id}
          setShowThankyou={setShowThankyou}
          checkBidConfirmation={checkBidConfirmation}
          bidDetails={bidDetails}
        />
      )}

      {/*PAYMENT SUCCESSFULL MODAL IN BIDDETAILS  */}
      {showThankyou && (
        <ThankyouModal
          showThankyou={showThankyou}
          setShowThankyou={setShowThankyou}
          heading={"Payment Successful!"}
          description={`Your bid has been activated successfully!`}
          showLogin={false}
          paymentDetails={paymentDetails}
        />
      )}

      {/*PRINT BID MODAL IN BIDDETAILS  */}
      <div className="print-only">
        <PrintableBidDetails ref={contentRef} bidDetails={bidDetails} />
      </div>
    </>
  );
};

export default BidDetailsPage;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
