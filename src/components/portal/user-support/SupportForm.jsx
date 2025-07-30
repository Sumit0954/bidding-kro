import { Box, Button, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomInput from "../../../elements/CustomInput/CustomInput";
import CustomCkEditor from "../../../elements/CustomEditor/CustomCkEditor";
import { useContext, useState } from "react";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import SupportSuccesspopUp from "./SupportSuccesspopUp";

const SupportForm = () => {
  const [btnLoader, setbtnLoader] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [IsSuccess, setIsSuccess] = useState(false);
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = async (data) => {
    setbtnLoader(true);
    const supportFormData = new FormData();
    supportFormData.append("subject", data?.complaint_subject);
    supportFormData.append("message", data?.complaint_description);

    try {
      const response = await _sendAPIRequest(
        "POST",
        PortalApiUrls?.CUSTOMER_SUPPORT_TICKET,
        supportFormData,
        true
      );

      if (response?.status === 201) {
        setbtnLoader(false);
        setIsSuccess(true);
      }
    } catch (error) {
      setbtnLoader(false);
      setAlert({
        isVisible: true,
        message: "Somthing went wrong",
        severity: "error",
      });
    }

    reset();
  };

  console.log(IsSuccess, " : IsSuccess");
  return (
    <>
      {IsSuccess ? (
        <SupportSuccesspopUp />
      ) : (
        <Box
          sx={{
            maxWidth: 900,
            margin: "auto",
            p: 3,
            background: "#f9fcff",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            We Are Here to Assist You
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Please complete the form below for your complaints.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomInput
                  control={control}
                  name="complaint_subject"
                  label="Complaint Subject"
                  inputType="text"
                  placeholder="Enter your complaint issue"
                  rules={{
                    required: "Complaint subject is required",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <CustomCkEditor
                  control={control}
                  name="complaint_description"
                  label="Describe your complaint briefly"
                  rules={{
                    required: "Description is required",
                  }}
                />
              </Grid>

              <Grid item xs={12} textAlign="right">
                {btnLoader ? (
                  <ButtonLoader size={60} />
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    className="btn button"
                  >
                    Submit
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      )}
    </>
  );
};
export default SupportForm;
