import {
  Alert,
  AlertTitle,
  Box,
  Breadcrumbs,
  Button,
  Tab,
  Tabs,
  Typography,
  Badge,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Summary from "../../../components/portal/bids/tabs/Summary";
import Documents from "../../../components/portal/bids/tabs/Documents";
// import Award from "../../../components/portal/bids/Award";
// import Bids from "../../../components/portal/bids/Bids";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import cn from "classnames";
import AmendmentModal from "../../../elements/CustomModal/AmendmentModal";
import DeleteDialog from "../../../elements/CustomDialog/DeleteDialog";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";
import RazorpayPaymentHandler from "../../../utils/RazorpayPaymentHandler";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import ThankyouModal from "../../../elements/CustomModal/ThankyouModal";
import { PrintOutlined } from "@mui/icons-material";
import ReactToPrint from "react-to-print";
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
import CompanyList from "../../../components/portal/companies/CompanyList";
import PendingRequests from "../../../components/portal/bids/tabs/PendingRequests";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../store/tabSlice";

const BidDetailsPage = () => {
  const [addAmendment, setAddAmendment] = useState(false);
  const navigate = useNavigate();
  const { userDetails } = useContext(UserDetailsContext);
  const [activateBid, setActivateBid] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);
  const { id } = useParams();
  const [bidDetails, setBidDetails] = useState({});
  const componentRef = useRef(null);
  const type = new URLSearchParams(useLocation().search).get("type");
  const status = new URLSearchParams(useLocation().search).get("status");
  const [value, setValue] = useState(status === "acceptanceStatus" ? 2 : 0);
  const [participant, setParticipant] = useState();

  const isQCBSBid = bidDetails?.type === "QCBS";

  const isSampleNotApproved = !participant?.participants.some(
    (participant) => participant.sample?.approval_status === "approved"
  );

  // Disable condition for the tab
  const shouldDisableTab = isQCBSBid && isSampleNotApproved;

  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.tab.activeTab);

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    dispatch(setActiveTab(newValue));
  };

  const truncatelength = (title, maxlength) => {
    return title?.length > maxlength
      ? title.substring(0, maxlength) + "..."
      : title;
  };

  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    message: "",
  });

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
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConfirmation = (choice) => {
    if (choice) {
      handleDelete();
    } else {
      setDeleteDetails({ open: false, title: "", message: "" });
    }
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
    <Typography key="2" color="text.primary">
      {truncatelength(bidDetails?.title, 50)}
    </Typography>,
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
            console.log(response.data, "badge");
            setBidDetails(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      retrieveBid();
    }
  }, [id, type]);

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
  }, [bidDetails?.id]);

  const isInviteDisabled =
    bidDetails?.status !== "active" ||
    (bidDetails?.type === "L1" && bidDetails?.bid_close_date === null) ||
    (bidDetails?.type === "QCBS" &&
      (bidDetails?.sample_receive_start_date === null ||
        bidDetails?.sample_receive_end_date === null));

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
        </div>
        <div className="d-flex align-items-center justify-content-end gap-3">
          <ReactToPrint
            content={() => componentRef.current}
            documentTitle={bidDetails?.formatted_number}
            trigger={() => (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<PrintOutlined />}
                sx={{
                  width: "8rem",
                  backgroundColor: "var(--primary-color)",
                  "&:hover": {
                    backgroundColor: "var(--secondary-color)",
                  },
                }}
              >
                Print
              </Button>
            )}
            removeAfterPrint
          />

          {type === "related" || type === "invited" ? null : (
            <>
              <button
                className={cn("btn", "button")}
                type="button"
                onClick={() => navigate(`/portal/companies/${bidDetails?.id}`)}
                disabled={isInviteDisabled}
              >
                Invite Suppliers
              </button>
              {bidDetails?.status === "active" ? (
                <button
                  className={cn("btn", "button", "approve")}
                  type="button"
                  disabled
                >
                  Active
                </button>
              ) : (
                <button
                  className={cn("btn", "button")}
                  type="button"
                  onClick={() => setActivateBid(true)}
                  disabled={bidDetails?.status === "cancelled" ? true : false}
                >
                  Activate Bid
                </button>
              )}

              {participant?.participants.length > 0 ? (
                <button
                  className={cn("btn", "button")}
                  type="button"
                  onClick={() => setAddAmendment(true)}
                  disabled={
                    bidDetails?.status === "cancelled" ||
                    bidDetails?.amendment?.length === 3
                      ? true
                      : false
                  }
                >
                  Amendments
                </button>
              ) : (
                <button
                  type="submit"
                  className={cn("btn", "button")}
                  onClick={() =>
                    navigate(`/portal/bids/categories/${bidDetails.id}`)
                  }
                  disabled={bidDetails?.status === "cancelled" ? true : false}
                >
                  Edit Bid
                </button>
              )}

              <button
                type="submit"
                className={cn("btn", "button", "reject")}
                onClick={() =>
                  setDeleteDetails({
                    open: true,
                    title: "Cancel Bid",
                    message: `Are you sure you want to cancel this ${bidDetails?.title} ? This action cannot be undone.`,
                  })
                }
                disabled={bidDetails?.status === "cancelled" ? true : false}
              >
                Cancel Bid
              </button>
            </>
          )}
        </div>
      </div>

      {bidDetails?.status === "pending" && (
        <Alert severity="warning" className="my-3">
          <AlertTitle sx={{ fontWeight: "bold" }}>
            Warning: Bid Activation Required
          </AlertTitle>
          Your bid is not yet activated. Please activate your bid for further
          process.
        </Alert>
      )}

      <Box sx={{ width: "100%" }}>
        <Tabs
          // value={value}
          value={activeTab}
          onChange={handleChange}
          aria-label="bid-detail-tabs"
        >
          {type === "invited"
            ? [
                <Tab label="Summary" {...a11yProps(0)} key={0} />,
                <Tab label="Documents" {...a11yProps(1)} key={1} />,
                // <Tab label="Acceptance Status" {...a11yProps(2)} key={2} />,
                <Tab
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      {bidDetails?.participant?.status === "pending" ? (
                        <Badge color="success" variant="dot" />
                      ) : null}
                      <span>Acceptance Status</span>
                    </Box>
                  }
                  {...a11yProps(2)}
                  key={2}
                />,
                <Tab label="Questions" {...a11yProps(3)} key={3} />,
                <Tab label="Remark" {...a11yProps(4)} key={4} />,
              ]
            : [
                <Tab label="Summary" {...a11yProps(0)} key={0} />,
                <Tab label="Documents" {...a11yProps(1)} key={1} />,
                <Tab label="Pending Requests" {...a11yProps(2)} key={2} />,

                type !== "related" && (
                  <Tab
                    label="Invite Suppliers"
                    {...a11yProps(3)}
                    key={3}
                    disabled={shouldDisableTab}
                  />
                ),

                bidDetails?.type === "L1"
                  ? [
                      // <Tab
                      //   label="Invite Suppliers"
                      //   {...a11yProps(2)}
                      //   key={2}
                      //   disabled={shouldDisableTab}
                      // />,
                      // <Tab label="Bids" {...a11yProps(3)} key={3} />,
                      // <Tab label="Analysis" {...a11yProps(4)} key={4} />,
                      // <Tab
                      //   label="Letter Of Intent"
                      //   {...a11yProps(5)}
                      //   key={5}
                      // />,
                      // <Tab label="Feedback" {...a11yProps(6)} key={6} />,
                    ]
                  : [
                      type !== "related" && (
                        <Tab
                          label="Sample Receiving"
                          {...a11yProps(4)}
                          key={4}
                        />
                      ),
                      // <Tab
                      //   label="Invite Suppliers"
                      //   {...a11yProps(2)}
                      //   key={2}
                      //   disabled={shouldDisableTab}
                      // />,
                      // <Tab label="Bids" {...a11yProps(4)} key={4} />,
                      // <Tab label="Analysis" {...a11yProps(5)} key={5} />,
                      // <Tab
                      //   label="Letter Of Intent"
                      //   {...a11yProps(6)}
                      //   key={6}
                      // />,
                      // <Tab label="Feedback" {...a11yProps(7)} key={7} />,
                    ],
              ]}
        </Tabs>
      </Box>

      {type === "invited" ? (
        <>
          <TabPanel value={activeTab} index={0}>
            <Summary bidDetails={bidDetails} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <Documents bidDetails={bidDetails} type={type} />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <AcceptanceStatus bidDetails={bidDetails} type={type} />
          </TabPanel>
          <TabPanel value={activeTab} index={3}>
            <Questions bidDetails={bidDetails} />
          </TabPanel>
          <TabPanel value={activeTab} index={4}>
            <Remark bidDetails={bidDetails} />
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
              bidDetails={bidDetails}
              participant={participant}
              // onActionComplete={() => setValue(2)}
              onActionComplete={() => dispatch(setActiveTab(2))}
            />
          </TabPanel>
          {bidDetails?.type === "L1" ? (
            <>
              <TabPanel value={activeTab} index={4}>
                <Bids />
              </TabPanel>
              <TabPanel value={activeTab} index={5}>
                <Award />
              </TabPanel>
              <TabPanel value={activeTab} index={6}>
                <LetterOfIntent bidDetails={bidDetails} />
              </TabPanel>
              <TabPanel value={activeTab} index={7}>
                <Feedback />
              </TabPanel>
            </>
          ) : (
            <>
              <TabPanel value={activeTab} index={4}>
                <SampleReceiving
                  bidDetails={bidDetails}
                  participant={participant}
                />
              </TabPanel>
              <TabPanel value={activeTab} index={5}>
                <Bids />
              </TabPanel>
              <TabPanel value={activeTab} index={6}>
                <Award />
              </TabPanel>
              <TabPanel value={activeTab} index={7}>
                <LetterOfIntent bidDetails={bidDetails} />
              </TabPanel>
              <TabPanel value={activeTab} index={8}>
                <Feedback />
              </TabPanel>
            </>
          )}
        </>
      )}

      {addAmendment && (
        <AmendmentModal
          addAmendment={addAmendment}
          setAddAmendment={setAddAmendment}
          id={id}
        />
      )}

      {deleteDetails?.open && (
        <DeleteDialog
          title={deleteDetails.title}
          message={deleteDetails.message}
          handleClick={handleDeleteConfirmation}
        />
      )}

      {activateBid && (
        <RazorpayPaymentHandler
          userData={userDetails}
          setActivateBid={setActivateBid}
          setShowThankyou={setShowThankyou}
          id={bidDetails?.id}
        />
      )}

      {showThankyou && (
        <ThankyouModal
          showThankyou={showThankyou}
          setShowThankyou={setShowThankyou}
          heading={"Payment Successful!"}
          description={`Your bid has been activated successfully!`}
          showLogin={false}
        />
      )}
      <div className="print-only">
        <PrintableBidDetails ref={componentRef} bidDetails={bidDetails} />
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
