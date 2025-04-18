import { Container, Typography, Box } from "@mui/material";
import styles from "./CencelationPolicy.module.scss";

const refundPolicyPoints = [
  {
    title: "1. Processing Services and Activation",
    content:
      "Upon successful purchase, the processing services provided by Bidding Karo are activated to enable users to access tender-related information, updates, and bidding support. Once the service is activated, the processing fee becomes non-refundable in any circumstances.",
  },
  {
    title: "2. Cancellation Policy",
    content: `• Cancellation After Activation:
- Once your account and services are activated, cancellations are not permitted under any circumstances.

• Cancellation Before Activation:
- If you wish to cancel a service before activation, you must contact our support team immediately or can do through Bidding Karo online. Any cancellation requests made after activation will not be entertained.`,
  },
  {
    title: "3. Refund Policy",
    content: ` • Non-Refundable Services:
Processing fees for all services offered by Bidding Karo are strictly non-refundable.

 • No Refund for Missed or Delayed Information:
We are not responsible for any missed tenders, delayed information updates, or errors in the information displayed on our platform or any connectivity issues or non-Participation by bidders in the bid etc.

• Service Disruptions:
While we strive for uninterrupted services, occasional disruptions may occur due to technical, operational, or external factors. Such interruptions do not qualify users for refunds or compensation.`,
  },
  {
    title: "4. User Responsibilities",
    content:
      "It is the responsibility of the user to:\n\n•  Regularly monitor their account and tender updates,\n•  Verify information independently, if necessary,\n•  Maintain updated contact information to receive timely notifications,\n•  Use the platform in accordance with our Terms of Use and other applicable policies.",
  },
  {
    title: "5. Disclaimer",
    content:
      "Bidding Karo does not guarantee the award of tenders or contracts. Our role is limited to providing information and facilitation services. We do not influence tender outcomes or decisions made by tender authorities.",
  },
  {
    title: "6. Contact Us",
    content:
      "For any queries or assistance regarding your account, services, or this policy, please feel free to reach out to our support team:\n\nEmail: info@biddingkaro.in\nPhone: +91-9599712997\nWorking Hours: Monday to Friday, 10:00 AM – 6:00 PM (IST)\n\n We value your trust and are committed to providing the best possible service experience.",
  },
];

const CencelationPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          fontSize: "2.8rem",
          fontWeight: "bold",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "#062d72" }}>BIDDING</span>
        <span style={{ color: "#05baee" }}> KARO</span>
      </Typography>

      <Typography
        variant="h6"
        align="center"
        gutterBottom
        className={styles["heading-with-lines"]}
      >
        Refund and Cancellation Policy
      </Typography>

      <Typography align="center" sx={{ fontSize: "0.9rem", mb: 5 }}>
        <strong>Effective Date:</strong> 18/04/2025 &nbsp;&nbsp; | &nbsp;&nbsp;
        <strong>Last Updated:</strong> 18/04/2025
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "justify" }} mb={3}>
        At Bidding Karo ("we," "us," or "our"), we are committed to fostering a
        transparent, efficient, and reliable bidding environment for all our
        users. This Refund and Cancellation Policy outlines the terms and
        conditions regarding the purchase of our processing services,
        cancellations, and the circumstances under which refunds may or may not
        be issued. By using our services, you agree to abide by the terms
        mentioned below.
      </Typography>
      {refundPolicyPoints.map((point, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#062d72", mb: 1 }}
          >
            {point.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "justify", whiteSpace: "pre-line" }}
          >
            {point.content}
          </Typography>
        </Box>
      ))}
    </Container>
  );
};

export default CencelationPolicy;
