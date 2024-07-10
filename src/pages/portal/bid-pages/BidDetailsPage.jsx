import { Box, Breadcrumbs, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Summary from "../../../components/portal/bids/Summary";
import Documents from "../../../components/portal/bids/Documents";
// import Award from "../../../components/portal/bids/Award";
// import Bids from "../../../components/portal/bids/Bids";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import cn from "classnames";
import AmendmentModal from "../../../elements/CustomModal/AmendmentModal";
import DeleteDialog from "../../../elements/CustomDialog/DeleteDialog";
import { UserDetailsContext } from "../../../contexts/UserDetailsProvider";
import RazorpayPaymentHandler from "../../../utils/RazorpayPaymentHandler";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import ThankyouModal from "../../../elements/CustomModal/ThankyouModal";

const BidDetailsPage = () => {
  const [value, setValue] = useState(0);
  const [addAmendment, setAddAmendment] = useState(false);
  const navigate = useNavigate();
  const { userDetails } = useContext(UserDetailsContext);
  const [activateBid, setActivateBid] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);
  const { id } = useParams();
  const [bidDetails, setBidDetails] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [deleteDetails, setDeleteDetails] = useState({
    open: false,
    title: "",
    item: "",
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
        setDeleteDetails({ open: false, title: "", item: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteConfirmation = (choice) => {
    if (choice) {
      handleDelete();
    } else {
      setDeleteDetails({ open: false, title: "", item: "" });
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
      {bidDetails?.title}
    </Typography>,
  ];

  useEffect(() => {
    if (id) {
      const retrieveBid = async () => {
        try {
          const response = await _sendAPIRequest(
            "GET",
            PortalApiUrls.RETRIEVE_BID + `${id}/`,
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

  useEffect(() => {
    const createdDate = new Date(bidDetails?.created_at);
    const currentDate = new Date();

    const difference = currentDate.getTime() - createdDate.getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (difference > twentyFourHours) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [bidDetails?.created_at]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
        </div>

        <div className="d-flex align-items-center justify-content-end gap-3">
          {bidDetails?.status === "active" ? (
            <button
              className={cn("btn", "button", "approve")}
              type="button"
              disabled
            >
              Activated
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

          {show ? (
            <button
              className={cn("btn", "button")}
              type="button"
              onClick={() => setAddAmendment(true)}
              disabled={bidDetails?.status === "cancelled" ? true : false}
            >
              Amendments
            </button>
          ) : (
            <button
              type="submit"
              className={cn("btn", "button")}
              onClick={() => navigate(`/portal/bids/update/${bidDetails.id}`)}
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
                item: bidDetails?.title,
              })
            }
            disabled={bidDetails?.status === "cancelled" ? true : false}
          >
            Cancel Bid
          </button>
        </div>
      </div>

      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="bid-detail-tabs"
        >
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Documents" {...a11yProps(1)} />
          {/* <Tab label="Bids" {...a11yProps(2)} />
          <Tab label="Award" {...a11yProps(3)} /> */}
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Summary bidDetails={bidDetails} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Documents bidDetails={bidDetails} />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        <Award />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Bids />
      </TabPanel> */}

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
          item={deleteDetails.item}
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
