import { Box, Container, Typography, Divider } from "@mui/material";
import styles from "./Disclaimer.module.scss";

const disclaimerPoints = [
  {
    title: "1. General Disclaimer",
    content: `The information provided by BIDDING KARO ("we," "us," or "our") on our digital platform is for general informational purposes only. All information on the platform is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the platform.`,
  },
  {
    title: "2. Professional Advice Disclaimer",
    content: `The BIDDING KARO platform may contain information related to various fields such as vendors, buyers, industry-wise information, various details of the companies registered on Bidding Karo, bidding status, company ratings, and other information. However, this does not guarantee the quality of goods, payment assurance, timely delivery, issuance of purchase orders, or participation in bidding. Bidding Karo only provides a platform and does not guarantee any outcomes. Users act at their own risk and discretion.`,
  },
  {
    title: "3. Affiliates Disclaimer",
    content: `The BIDDING KARO platform may contain links to affiliate websites. We may receive a commission or fee for purchases or actions made through such links. Our affiliates include [List of Affiliates]. We are not responsible for their content, offerings, or policies.`,
  },
  {
    title: "4. User-Generated Content Disclaimer",
    content: `BIDDING KARO may include content such as user reviews or comments. These reflect the views of the users, not BIDDING KARO. We do not endorse or verify their accuracy and are not responsible for any loss resulting from such content.`,
  },
  {
    title: "5. No Responsibility for Technical Issues",
    content: `BIDDING KARO does not guarantee that the platform will always be functional or error-free. Outages, data loss, or other technical issues may occur. We are not liable for any related inconvenience or damages.`,
  },
  {
    title: "6. Changes and Updates",
    content: `We may update this Disclaimer Policy periodically. Updates will be posted on this page with the latest revision date. Continued use of the platform indicates your acceptance of any changes.`,
  },
];

const Disclaimer = () => {
  return (
    <>
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
          Disclaimer
        </Typography>

        {disclaimerPoints.map((point, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", mb: 1, color: "#062d72" }}
            >
              {point.title}
            </Typography>
            <Typography sx={{ color: "#444", lineHeight: 1.8 }}>
              {point.content}
            </Typography>
            {index !== disclaimerPoints.length - 1 && (
              <Divider sx={{ mt: 2, mb: 2 }} />
            )}
          </Box>
        ))}
        <Box>
          <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
            <strong>CONTACT US</strong>
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
            If you have any questions or comments about these our Terms of
            Service as outlined above, you can contact us at:
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
            <strong>BIDDING KARO Address:</strong>
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
            <strong>
              Bidding Genie Pvt Limited, First Floor, Shri Ram Market, Sector
              86, Tigaon Road, Faridabad, Haryana 121002
            </strong>
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
            <strong>Grievance Officer</strong>
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
            <strong>Mr. Sweety Agarwal</strong>
          </Typography>

          <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
            <strong>+91 8800532997</strong>
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
            <strong>Finance@snehsanskriti.com</strong>
          </Typography>
          <Box sx={{ textAlign: "justify", mt: 1 }}>
            <img src="./logo.png" alt="Bidding karo logo" width="180" />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Disclaimer;
