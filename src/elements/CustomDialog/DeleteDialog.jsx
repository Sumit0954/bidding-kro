import {
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

const DeleteDialog = ({ title, message, handleClick }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={() => handleClick(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <div className={styles["dialog-title"]}>
            <img src={warning} alt="warning" />
            <p>{title}</p>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            className="btn button reject"
            onClick={() => handleClick(false)}
            autoFocus
            sx={{ width: "8rem" }}
          >
            No
          </Button>
          <Button
            className="btn button"
            onClick={() => handleClick(true)}
            autoFocus
            sx={{ width: "8rem" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
