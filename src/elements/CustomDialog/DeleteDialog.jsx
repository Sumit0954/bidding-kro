import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import styles from "./DeleteDialog.module.scss";
import warning from "../../assets/images/portal/bids/warning.png";
/**
 * DeleteDialog Component
 *
 * A responsive confirmation dialog used to display a warning message
 * before performing a delete or confirmation action. It can optionally show
 * alerts related to non-L1 bidders and pending sample submissions.
 *
 * @component
 * @param {Object} props - Props passed to the DeleteDialog component
 * @param {string} props.title - The title of the dialog
 * @param {string} props.message - The confirmation message shown inside the dialog
 * @param {function} props.handleClick - Function called when the user clicks "Yes" or "No".
 *                                        Receives a boolean value: `true` for "Yes", `false` for "No"
 * @param {string} [props.supplierName] - Name of the supplier, used in optional alerts
 * @param {boolean} [props.isNonL1=false] - If true, shows an alert indicating the supplier is a non-L1 bidder
 * @param {boolean} [props.isSamplePending=false] - If true, shows an alert indicating the supplier's sample is pending
 *
 * @returns {JSX.Element} A Material UI Dialog component with warning message and actions
 *
 * @example
 * <DeleteDialog
 *   title="Are you sure?"
 *   message="This action will permanently delete the item."
 *   handleClick={(confirmed) => console.log(confirmed)}
 *   supplierName="ABC Pvt Ltd"
 *   isNonL1={true}
 *   isSamplePending={false}
 * />
 */

const DeleteDialog = ({
  title,
  message,
  handleClick,
  supplierName,
  isNonL1,
  isSamplePending,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={() => handleClick(false)}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 4,
            maxWidth: 420,
            mx: "auto",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            animation: "fadeIn 0.3s ease-in-out",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title" sx={{ p: 0 }}>
          <div
            className={styles["dialog-title"]}
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              borderBottom: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "#fdecea",
                borderRadius: "50%",
                padding: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "popIn 0.4s ease",
              }}
            >
              <img
                src={warning}
                alt="warning"
                style={{ width: 28, height: 28 }}
              />
            </div>
            <p style={{ fontWeight: 700, fontSize: "1.5rem", margin: 0 }}>
              {title}
            </p>
          </div>
        </DialogTitle>

        {isNonL1 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <strong>Note:</strong> {supplierName} is (non-L1) bidder of this
            product.
          </Alert>
        )}
        {isSamplePending && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <strong>Note:</strong> The sample has not been received from&nbsp;
            {supplierName}.
          </Alert>
        )}

        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText sx={{ fontSize: "1rem", color: "#555" }}>
            {message}
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", mt: 3, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => handleClick(false)}
            sx={{
              width: "8rem",
              borderRadius: 10,
              fontWeight: 600,
              textTransform: "none",
              borderColor: "#d32f2f",
              color: "#d32f2f",
              ":hover": {
                backgroundColor: "#ffecec",
                borderColor: "#c62828",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleClick(true)}
            sx={{
              width: "8rem",
              borderRadius: 10,
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "#062d72",
              ":hover": {
                backgroundColor: "#05baee",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
