import { Container, Typography, Box } from "@mui/material";
import styles from "./CodeOfEthics.module.scss";

const ethicsPoints = [
  {
    title: "1. Transparency and Honesty",
    content:
      "BIDDING KARO is committed to upholding the highest standards of integrity, transparency, and consumer protection in all its digital services. At the core of our values is the principle of transparency and honesty. We pledge to clearly disclose all terms and conditions related to our services, ensuring that consumers receive accurate and comprehensive information about pricing, features, and any limitations. In all our communications, we provide truthful and detailed information, fostering trust and clarity.",
  },
  {
    title: "2. Consumer Privacy and Data Protection",
    content:
      "Respecting consumer privacy and ensuring data protection are paramount. We commit to collecting only necessary consumer data with explicit consent and implementing robust security measures to protect this data from unauthorized access or breaches. Consumers will have the ability to view, modify, or delete their personal information, empowering them to control their digital footprint. Our commitment to fair advertising and marketing practices ensures that all promotional content is free from misleading information.",
  },
  {
    title: "3. Fair Advertising and Marketing",
    content:
      "Fair advertising and marketing practices are emphasized, prohibiting misleading or deceptive tactics and ensuring that all promotional content is clearly distinguished from editorial content. Accuracy in marketing materials is paramount, with a mandate to always provide truthful information about products and services.",
  },
  {
    title: "4. Accessible and Inclusive Services",
    content:
      "Accessibility and inclusivity are core values, with efforts made to ensure that services are accessible to all users, including those with disabilities. Multilingual support and services are offered to cater to consumers from diverse linguistic backgrounds, promoting inclusivity and broad accessibility.",
  },
  {
    title: "5. Customer Support and Complaint Resolution",
    content:
      "Customer support is prioritized, with multiple channels available for consumer inquiries and complaints, including phone, email, and live chat options. The platform is committed to responding to consumer concerns promptly and professionally, with a clear and fair process for resolving complaints outlined and adhered to.",
  },
  {
    title: "6. Ethical Content Practices",
    content:
      "Ethical content practices guide content creation and publication, prohibiting false, misleading, or harmful content. Respectful content that does not promote hate speech, discrimination, or violence is emphasized, with ongoing review and updates to maintain accuracy and relevance.",
  },
  {
    title: "7. User Empowerment and Education",
    content:
      "Empowering consumers through education and resources is integral, with efforts to provide information on consumer rights and digital literacy. Feedback from users is actively encouraged to improve services and address concerns effectively.",
  },
  {
    title: "8. Fair Business Practices",
    content:
      "Fair business practices are foundational, promoting integrity and fairness in all dealings and avoiding conflicts of interest. Compliance with laws and regulations is mandatory, ensuring ethical conduct and accountability across all operations.",
  },
  {
    title: "9. Sustainable and Responsible Operations",
    content:
      "Sustainable and responsible operations are encouraged, promoting environmentally sustainable practices and responsible consumption among consumers. The platform commits to continuous improvement in sustainability and corporate social responsibility, with regular audits conducted to ensure adherence to these principles.",
  },
  {
    title: "10. Regular Audits and Accountability",
    content:
      "Overall, the DNPA Code of Ethics for BIDDING KARO reflects a commitment to ethical conduct, consumer welfare, and operational excellence, aimed at fostering trust, transparency, and responsible business practices within the digital platform ecosystem.",
  },
];

const CodeOfEthics = () => {
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
          DNPA Code of Ethics for BIDDING KARO Digital Platform
        </Typography>

        {ethicsPoints.map((point, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", color: "#062d72", mb: 1 }}
            >
              {point.title}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "justify" }}>
              {point.content}
            </Typography>
          </Box>
        ))}
      </Container>
    </>
  );
};

export default CodeOfEthics;
