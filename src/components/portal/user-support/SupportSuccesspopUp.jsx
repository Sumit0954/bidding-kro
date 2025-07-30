import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Fade,
} from "@mui/material";
import styles from "./SupportForm.module.scss";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SupportSuccesspopUp = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f4ff, #ffffff)",
        px: 2, // padding for smaller screen
        py: 4,
      }}
    >
      <Fade in timeout={500}>
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 5,
            boxShadow: "0px 8px 30px rgba(0,0,0,0.1)",
            textAlign: "center",
            px: { xs: 2, sm: 4 },
            py: { xs: 3, sm: 5 },
          }}
        >
          <CardContent>
            <CheckCircle
              className={styles.iconAnimate}
              sx={{ fontSize: 60, color: "#062d72", mb: 2 }}
            />

            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              fontSize={{ xs: "1.3rem", sm: "1.5rem" }}
            >
              Thank You!
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              mb={3}
              fontSize={{ xs: "0.9rem", sm: "1rem" }}
            >
              Your support request has been received.
              <br />
              Our team will get back to you shortly.
            </Typography>

            <Button
              variant="contained"
              size="medium"
              sx={{
                borderRadius: 3,
                textTransform: "none",
                backgroundColor: "#062d72",
                "&:hover": {
                  backgroundColor: "#05baee",
                },
              }}
              onClick={() => navigate("/portal")}
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default SupportSuccesspopUp;
