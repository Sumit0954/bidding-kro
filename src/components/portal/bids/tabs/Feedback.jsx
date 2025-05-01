import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import styles from "./Feedback.module.scss";
import { useEffect, useState } from "react";
import FeedbackModal from "../../../../elements/CustomModal/FeedbackModal";
import { PortalApiUrls } from "../../../../helpers/api-urls/PortalApiUrls";
import _sendAPIRequest from "../../../../helpers/api";
import ScreenLoader from "../../../../elements/CustomScreeenLoader/ScreenLoader";
const Feedback = ({ bidDetails }) => {
  const [feedback, setfeedback] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [rated_company, setRated_company] = useState();
  const [screenLoader, setScreenLoader] = useState(true);

  const getBidParticipants = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.PARTICIPANTS_LIST +
          `${bidDetails?.id}/?status=accepted&status=participated&status=awarded`,
        "",
        true
      );

      if (response?.status === 200) {
        setParticipants(response?.data?.participants);
        setScreenLoader(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBidParticipants();
  }, []);

  const filterParticiapnts = participants.filter((participants) => {
    return participants?.sample?.invite_status === "accepted";
  });

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <TableContainer component={Paper} elevation={3} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">S.No</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Company Name</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography fontWeight="bold">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {bidDetails?.type === "QCBS" ? (
            <>
              <TableBody>
                {filterParticiapnts.map((supplier, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link href="#" underline="hover" color="primary">
                          {supplier?.company?.name}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <button
                          className={styles["feedback-btn"]}
                          onClick={() => {
                            setRated_company(supplier?.company?.id);
                            setfeedback(true);
                          }}
                        >
                          Feedback
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </>
          ) : (
            <>
              <TableBody>
                {participants.map((supplier, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link href="#" underline="hover" color="primary">
                          {supplier?.company?.name}
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <button
                          className={styles["feedback-btn"]}
                          onClick={() => {
                            setRated_company(supplier?.company?.id);
                            setfeedback(true);
                          }}
                        >
                          Feedback
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>

      {feedback && (
        <FeedbackModal
          feedback={feedback}
          setfeedback={setfeedback}
          bidId={bidDetails?.id}
          rated_company={rated_company}
        />
      )}
    </>
  );
};

export default Feedback;
