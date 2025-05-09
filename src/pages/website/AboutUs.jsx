import {
  Container,
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  Grow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Banner.module.scss";
import aboutUsbanner from "../../../src/assets/images/website/home/about-us-banner.avif";
import who_we_are_img from "../../assets/images/website/about-us/who-we-are.jpg";
import vission_misson_img from "../../assets/images/website/about-us/vision-misson.jpg";
import bidding_solution_img from "../../assets/images/website/about-us/bidding-solution-img.jpg";
import { useState } from "react";
import CountUp from "react-countup";
import aboutusBg from "../../assets/images/website/about-us/about-bg-img.jpg";
import aboutus1 from "../../assets/images/website/about-us/aboutus1.png";
import aboutus2 from "../../assets/images/website/about-us/aboutus2.png";
import aboutus3 from "../../assets/images/website/about-us/aboutus3.png";

const AboutUs = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const images = [aboutus1, aboutus2, aboutus3];
  const handleImage = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };
  return (
    <>
      <div
        className={styles["aboutUsWrapper"]}
        style={{
          backgroundImage: `url(${aboutusBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Optional: for a parallax effect
          padding: "0", // Ensure no padding around the background
        }}
      >
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
              <img
                src={who_we_are_img} // replace with a new image path
                alt="Who We Are - Modern Bidding UI"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)", // deep shadow
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  transform: "translateY(0)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 32px rgba(0, 0, 0, 0.25)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0, 0, 0, 0.2)";
                }}
              />
            </Grid>

            {/* Right Side - Content */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                Who <strong>We Are</strong>
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                At <strong>Bidding Karo</strong>, we are reshaping the future of
                industrial procurement by offering a dynamic, transparent, and
                opportunity-driven marketplace. Our platform empowers buyers to
                take control of their sourcing decisions through real-time
                competitive bidding, while enabling suppliers to connect
                directly with active and serious buyers.
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                By breaking away from traditional procurement inefficiencies,
                Bidding Karo creates an environment where businesses can
                negotiate smarter, operate faster, and secure better value
                without compromising on quality. We are not just facilitating
                transactions—we are building a smarter ecosystem where
                procurement becomes a strategic advantage for every business.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        {/* Rest of the content remains the same */}
        <Container sx={{ py: 8 }}>
          <Grid container spacing={4} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Our Vision</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Our vision at <strong>Bidding Karo</strong> is to lead a
                    fundamental shift in how industries approach procurement
                    moving away from rigid, opaque systems to a transparent,
                    agile, and empowered ecosystem. We envision a future where
                    businesses, irrespective of size, have the tools and
                    opportunities to negotiate dynamically, optimize operational
                    costs, and grow without traditional market barriers. We
                    believe procurement should not be a limiting process but a
                    strategic driver of business excellence, helping industries
                    become more competitive, resilient, and future-ready.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">Our Mission</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Our mission at <strong>Bidding Karo</strong> is to
                    revolutionize procurement by putting control, transparency,
                    and efficiency into the hands of businesses. We aim to
                    empower buyers to secure the best value through real-time
                    competitive bidding while enabling suppliers to compete
                    fairly and access new markets. Through technology-driven
                    solutions and a buyer-first approach, we are dedicated to
                    simplifying complex procurement processes, building trust
                    across industries, and helping businesses scale sustainably
                    with greater confidence and agility.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12} md={6}>
              <img
                src={vission_misson_img}
                alt="Who We Are"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)", // deep shadow
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  transform: "translateY(0)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 16px 32px rgba(0, 0, 0, 0.25)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(0, 0, 0, 0.2)";
                }}
              />
            </Grid>
          </Grid>
        </Container>

        {/* New Section with Images, Paragraph, and Button */}
        <Container sx={{ py: 8, textAlign: "center" }}>
          <Grid container spacing={3} justifyContent="center">
            {images.map((src, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <img
                  src={src}
                  alt="Who We Are"
                  onClick={() => handleImage(src)}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    borderRadius: "12px",
                    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)", // deep shadow
                    transform: "translateY(0)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 32px rgba(0, 0, 0, 0.25)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 24px rgba(0, 0, 0, 0.2)";
                  }}
                />
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
            founded by seasoned financial and operational experts with a vision
            to bring transparency, efficiency, and cost-effectiveness to the
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
            founders understand the complexities of procurement and have
            designed Bidding Karo to simplify the process. Through real-time
            bidding, multiple vendor options, and seamless transactions, we help
            industries reduce costs, enhance efficiency, and make smarter
            procurement decisions.
          </Typography>
        </Container>

        <Box
          sx={{
            position: "relative",
            minHeight: "80vh",
            backgroundImage: `url(${bidding_solution_img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "center",
            pt: 10,
            pb: 5,
            px: 3,
            "::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Faded dark overlay
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

            <Grid
              container
              spacing={4}
              sx={{ mt: 4, justifyContent: "center" }}
            >
              {[
                { label: "Bids Created", value: "5" },
                { label: "Successful Deals", value: "3.2" },
                { label: "Active Buyers", value: "1.5" },
                { label: "Trusted Suppliers", value: "2" },
              ].map((item, index) => (
                <Grid item key={index} xs={6} md={3}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    <CountUp
                      end={parseFloat(item.value)}
                      duration={4}
                      decimals={item.value.includes(".") ? 1 : 0}
                    />
                    K<span style={{ color: "#d4af37" }}>+</span>
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                    {item.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Modal Dialog */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="lg"
          TransitionComponent={Grow}
          TransitionProps={{ timeout: 300 }}
        >
          <div style={{ width: "100%", height: "400px" }}>
            <img
              src={selectedImage}
              alt="Who We Are Enlarged"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default AboutUs;
