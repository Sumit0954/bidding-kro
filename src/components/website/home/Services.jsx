import SupplierImg from "../../../assets/images/website/home/supplier-portal-01.png";
import { Box, Typography, Grid, Button } from "@mui/material";
import styles from "./Services.module.scss";
import cn from "classnames";

const Services = () => {
  return (
    <>
      <Box sx={{ p: 5, display: "flex", alignItems: "center" }}>
        <Grid container spacing={4} alignItems="center">
          {/* Images Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ position: "relative", width: "90%", maxWidth: 600 }}>
              <Box
                component="img"
                src={SupplierImg}
                alt="Bidding Karo Image 1"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  position: "relative",
                  zIndex: 1,
                  maxHeight: 400,
                }}
              />
            </Box>
          </Grid>

          {/* Text Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              What Makes Bidding Karo Go Too Far?
            </Typography>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              A Marketplace Without Boundaries
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              At Bidding Karo, we believe in breaking the limits of traditional
              buying and selling. Whether you're a buyer looking for the best
              deals or a seller ready to bid on opportunities, we flip the
              script—because here, buyers can be sellers, and sellers can be
              buyers!
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Why stay restricted to one role? On Bidding Karo, you get the
              power to negotiate, bid, and close deals on both sides of the
              market. This means:
            </Typography>
            <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
              <li style={{ display: "list-item" }}>
                Suppliers can become buyers when they find competitive offers.
              </li>
              <li style={{ display: "list-item" }}>
                Buyers can become sellers by offering products or services in
                demand.
              </li>
              <li style={{ display: "list-item" }}>
                Real-time bidding ensures you always get the best value.
              </li>
            </ul>

            <Typography variant="body2" color="textSecondary" paragraph>
              Unlike traditional marketplaces, we don’t just connect
              businesses—we create a dynamic trading environment where roles are
              flexible, and opportunities are limitless.
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              So, whether you’re looking to buy, sell, or do both, Bidding Karo
              goes too far—so you can go even further. Join us today and start
              bidding beyond boundaries!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Services;
