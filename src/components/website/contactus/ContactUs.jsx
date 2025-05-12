import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import {
  EmailOutlined,
  LocationOn,
  PhonelinkLockOutlined,
  SendAndArchiveOutlined,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import _sendAPIRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import { AlertContext } from "../../../contexts/AlertProvider";
import { ButtonLoader } from "../../../elements/CustomLoader/Loader";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { setAlert } = useContext(AlertContext);
  const [buttonLoader, setButtonLoader] = useState(false);
  const onSubmit = async (data) => {
    setButtonLoader(true);
    const contactusFormData = new FormData();
    for (const key in data) {
      contactusFormData.append(key, data[key]);
    }
    try {
      const response = await _sendAPIRequest(
        "POST",
        WebsiteApiUrls.CONTACT_US,
        contactusFormData,
        true
      );

      if (response.status === 201) {
        setButtonLoader(false);
        setAlert({
          isVisible: true,
          message: "Details has been submitted successfully",
          severity: "success",
        });
        reset();
      }
    } catch (error) {
      setButtonLoader(false);
      setAlert({
        isVisible: true,
        message: "Something went wrong",
        severity: "error",
      });
      reset();
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Top Info */}
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="body2"
            fontWeight={600}
            gutterBottom
            sx={{ color: " #062d72" }}
          >
            CALL US
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <PhonelinkLockOutlined
              fontSize="small"
              sx={{ color: " #062d72" }}
            />
            <Typography variant="body1" fontWeight={700}>
              +91 9599712997
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography
            variant="body2"
            fontWeight={600}
            gutterBottom
            sx={{ color: " #062d72" }}
          >
            SEND AN EMAIL
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailOutlined fontSize="small" sx={{ color: " #062d72" }} />
            <Typography variant="body1" fontWeight={700}>
              info@biddingkaro.in
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography
            variant="body2"
            fontWeight={600}
            gutterBottom
            sx={{ color: " #062d72" }}
          >
            FIND US
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOn fontSize="small" sx={{ color: " #062d72" }} />
            <Typography variant="body1" fontWeight={700}>
              Bidding Genie Pvt Limited, First Floor, Shri Ram Market, Sector
              86, Tigaon Road, Faridabad, Haryana 121002
            </Typography>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ color: " #062d72" }}
            variant="h5"
            fontWeight={700}
            gutterBottom
          >
            Send Us a Message
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="on"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              margin="normal"
              placeholder="Your Name"
              variant="outlined"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              fullWidth
              margin="normal"
              placeholder="Your E-mail Address"
              variant="outlined"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              margin="normal"
              placeholder="Subject"
              variant="outlined"
              {...register("subject", { required: "Subject is required" })}
              error={!!errors.subject}
              helperText={errors.subject?.message}
            />

            <TextField
              fullWidth
              margin="normal"
              placeholder="Phone No."
              variant="outlined"
              {...register("phone", { required: "phone is required" })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              margin="normal"
              placeholder="Message"
              variant="outlined"
              {...register("message", { required: "Message is required" })}
              error={!!errors.message}
              helperText={errors.message?.message}
            />

            {buttonLoader ? (
              <ButtonLoader size={60} />
            ) : (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "var(--primary-color)",
                    "&:hover": {
                      backgroundColor: "var(--secondary-color)",
                    },
                  }}
                >
                  Send Message
                </Button>
              </>
            )}
          </Box>
        </Grid>

        {/* Map Section */}
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ color: " #062d72" }}
            variant="h5"
            fontWeight={700}
            gutterBottom
          >
            Where We Are
          </Typography>
          <Box
            sx={{
              height: 350,
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <iframe
              title="Our Location"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.336817601524!2d77.33607367456374!3d28.409091994193975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cddaae0993c71%3A0x693f048aeba5a94a!2sCorporate%20Genie-%20Your%20Professional%20Business%20%26%20Tax%20Advisor!5e0!3m2!1sen!2sin!4v1744352186032!5m2!1sen!2sin"
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
