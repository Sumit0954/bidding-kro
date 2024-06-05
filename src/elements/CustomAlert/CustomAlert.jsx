import React, { useContext, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { AlertContext } from "../../contexts/AlertProvider";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomAlert = ({ severity, message, snackPositon }) => {
  const { setAlert } = useContext(AlertContext);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    setAlert({
      message: "",
      severity: "",
      isVisible: false,
    });
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={4500}
        onClose={handleClose}
        anchorOrigin={snackPositon || { vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomAlert;
