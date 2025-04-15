import {
  Container,
  Grid,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Banner.module.scss";
import aboutUsbanner from "../../../src/assets/images/website/home/about-us-banner.avif";
import { CheckCircleTwoTone } from "@mui/icons-material";
const AboutUs = () => {
  return (
    <>
      <div className={styles["banner"]}>
        <img
          src={aboutUsbanner}
          alt="BlogBanner"
          className={styles["blog-banner-img"]}
        />
      </div>
      {/* About Us Content */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Image */}
          <Grid item xs={12} md={6}>
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#aaa",
              }}
            >
              1170x780
            </div>
          </Grid>

          {/* Right Side - Content */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Who <strong>We Are</strong>
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              At Bidding Karo, we are revolutionizing industrial procurement
              with a streamlined, transparent, and cost-effective platform. We
              empower industrial buyers to connect with verified vendors through
              a competitive bidding system, ensuring access to the best prices
              and reliable suppliers.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Our platform offers:
              <ul
                style={{ margin: 0, paddingLeft: "1.2rem", listStyle: "none" }}
              >
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 8,
                  }}
                >
                  <CheckCircleTwoTone
                    style={{ fontSize: "16px", marginRight: 8, marginTop: 3 }}
                  />
                  Multiple vendor options for competitive pricing and quality
                  assurance.
                </li>
                <li
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: 8,
                  }}
                >
                  <CheckCircleTwoTone
                    style={{ fontSize: "16px", marginRight: 8, marginTop: 3 }}
                  />
                  Real-time bidding to maximize cost efficiency.
                </li>
                <li style={{ display: "flex", alignItems: "flex-start" }}>
                  <CheckCircleTwoTone
                    style={{ fontSize: "16px", marginRight: 8, marginTop: 3 }}
                  />
                  Simplified procurement processes with credible and transparent
                  transactions.
                </li>
              </ul>
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Backed by industry expertise and technology, Bidding Karo enables
              businesses to reduce procurement costs, optimize operations, and
              drive profitability with confidence.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Our Vision</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our vision is to create a world where seamless and transparent
                  bidding enhances business opportunities for all stakeholders.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Our Mission</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our mission is to provide an intuitive, efficient, and
                  reliable bidding platform that fosters competition and trust
                  among buyers and suppliers.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={6}>
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#aaa",
              }}
            >
              1170x780
            </div>
          </Grid>
        </Grid>
      </Container>
      {/* New Section with Images, Paragraph, and Button */}
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Grid container spacing={3} justifyContent="center">
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box
                sx={{
                  width: "100%",
                  height: "360px",
                  backgroundColor: index === 0 ? "#999" : "#ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  color: "#aaa",
                }}
              >
                392x360
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="body1"
          color="textSecondary"
          paragraph
          sx={{ mt: 4 }}
        >
          Bidding Karo is a next-generation industrial procurement platform
          founded by seasoned financial and operational experts with a vision to
          bring transparency, efficiency, and cost-effectiveness to the
          industry. By connecting buyers with verified vendors, we enable
          businesses to bid in real time for raw materials, ensuring access to
          optimal pricing and trusted suppliers.
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          paragraph
          sx={{ mt: 4 }}
        >
          With decades of experience in finance and business operations, our
          founders understand the complexities of procurement and have designed
          Bidding Karo to simplify the process. Through realtime bidding,
          multiple vendor options, and seamless transactions, we help industries
          reduce costs, enhance efficiency, and make smarter procurement
          decisions.
        </Typography>
      </Container>
      <Box
        sx={{
          position: "relative",
          minHeight: "80vh", // Reduced height
          backgroundImage: "url('/path-to-your-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start", // Align content towards top
          alignItems: "center",
          textAlign: "center",
          pt: 10, // Adjust padding top
          pb: 5, // Reduce bottom space
          px: 3,
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay effect
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2, maxWidth: "800px" }}>
          <Typography sx={{ fontSize: "18px", color: "#d4af37" }}>
            Empowering Buyers & Suppliers
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1 }}>
            Smart Bidding Solutions
          </Typography>
          <Typography sx={{ mt: 2, fontSize: "16px" }}>
            Bidding Kro is the ultimate platform for seamless bidding
            experiences. Whether you're a **buyer** looking for competitive
            offers or a **supplier** aiming to secure contracts, we provide a
            streamlined process with full transparency. Experience fast,
            efficient, and reliable online bidding like never before.
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4, justifyContent: "center" }}>
            {[
              { label: "Bids Created", value: "5K" },
              { label: "Successful Deals", value: "3.2K" },
              { label: "Active Buyers", value: "1.5K" },
              { label: "Trusted Suppliers", value: "2K" },
            ].map((item, index) => (
              <Grid item key={index} xs={6} md={3}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {item.value} <span style={{ color: "#d4af37" }}>+</span>
                </Typography>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                  {item.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AboutUs;
