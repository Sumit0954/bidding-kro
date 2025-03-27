import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { CheckCircleTwoTone } from "@mui/icons-material";
import styles from "./PrivacyAndPolicy.module.scss";

const PrivacyAndPolicy = () => {
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
        Privacy And Policy
      </Typography>
      <Box sx={{ p: 3 }}>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          This Privacy Policy governs the manner in which Biddingkaro.in
          collects, uses, maintains and discloses information collected from
          users (each, a “User”) of the Biddingkaro.in website (“Site”).
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          This privacy policy applies to the Site and all products and services
          offered by Biddingkaro.in.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          The terms “we” / “us” / “our”/ “Company” individually and collectively
          refer to Bidding Genie Pvt Limited and the terms “you” / “your” /
          “yourself” refer to the Users.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          This Privacy Policy is an electronic record in the form of an
          electronic contract formed under the Information Technology Act, 2000
          and the rules made thereunder and the amended provisions pertaining to
          electronic documents/records in various statutes as amended by the
          Information Technology Act, 2000. This Privacy Policy does not require
          any physical, electronic or digital signature. This Privacy Policy is
          a legally binding document between you and Bidding Genie Pvt Limited.
          The terms of this Privacy Policy will be effective upon your
          acceptance of the same (directly or indirectly in electronic form, by
          clicking on the I accept tab or by use of the website or by other
          means) and will govern the relationship between you and Bidding Genie
          Pvt Limited for your use of the website “Biddingkaro.in”. As per our
          understanding we will assume that the information shared above is not
          confidential.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          This document is published and shall be construed in accordance with
          the provisions of the Information Technology (reasonable security
          practices and procedures and sensitive personal data of information)
          rules, 2011 under Information Technology Act, 2000; that require
          publishing of the Privacy Policy for collection, use, storage and
          transfer of sensitive personal data or information.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          Please read this Privacy Policy carefully. By using the Website, you
          indicate that you understand, agree and consent to this Privacy
          Policy. If you do not agree with the terms of this Privacy Policy,
          please do not use this Website.
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>(a) Personal Identification Information</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          We may collect personal identification information from Users in a
          variety of ways, including, but not limited to, when Users visit our
          site, register on the site, place an order, and in connection with
          other activities, services, features or resources we make available on
          our Site. Users may be asked for, as appropriate, name, email address,
          mailing address, phone number. Users may, however, visit our Site
          anonymously. We will collect personal identification information from
          Users only if they voluntarily submit such information to us. Users
          can always refuse to supply personally identification information,
          except that it may prevent them from engaging in certain Site related
          activities.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>(b) Non-personal identification information</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          We may collect non-personal identification information about Users
          whenever they interact with our Site. Non-personal identification
          information may include the browser name, the type of computer and
          technical information about Users means of connection to our Site,
          such as the operating system and the Internet service providers’
          utilized and other similar information. We also take other relevant
          information/documents as required for performing various services
          which may be shared with various experts for various relevant
          activities to perform the services.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>(c) Web browser cookies</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          Our Site may use “cookies” to enhance User experience. User’s web
          browser places cookies on their hard drive for record-keeping purposes
          and sometimes to track information about them. User may choose to set
          their web browser to refuse cookies, or to alert you when cookies are
          being sent. If they do so, note that some parts of the Site may not
          function properly.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>(d) How we use collected information</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          Bidding Karo may collect and use Users personal information for the
          following purposes:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleTwoTone style={{ color: "#062d72" }} />
            </ListItemIcon>
            <ListItemText
              primary="To improve customer service"
              secondary="Information you provide helps us respond to your customer service requests and support needs more efficiently."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <CheckCircleTwoTone style={{ color: "#062d72" }} />
            </ListItemIcon>
            <ListItemText
              primary="To personalize user experience"
              secondary="We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <CheckCircleTwoTone style={{ color: "#062d72" }} />
            </ListItemIcon>{" "}
            <ListItemText
              primary="To improve our Site"
              secondary="We may use feedback you provide to improve our products and services."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <CheckCircleTwoTone style={{ color: "#062d72" }} />
            </ListItemIcon>{" "}
            <ListItemText
              primary="To process payments"
              secondary="We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <CheckCircleTwoTone style={{ color: "#062d72" }} />
            </ListItemIcon>{" "}
            <ListItemText
              primary="To run a promotion, contest, survey or other Site feature"
              secondary="To send Users information they agreed to receive about topics we think will be of interest to them."
            />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              {" "}
              <CheckCircleTwoTone style={{ color: "#062d72" }} />
            </ListItemIcon>{" "}
            <ListItemText
              primary="To send periodic emails"
              secondary="We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email or User may contact us via our Site."
            />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>(e) How we protect your information</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          We adopt appropriate data collection, storage and processing practices
          and security measures to protect against unauthorized access,
          alteration, disclosure or destruction of your personal information,
          username, password, transaction information and data stored on our
          Site to the extent possible.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>(f) Sharing your personal information</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          We may use third party service providers to help us operate our
          business and the Site or administer activities on our behalf, such as
          sending out newsletters or surveys. We may share your information with
          these third parties for those limited purposes.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>(g) Google ad sense</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          Some of the ads may be served by Google and use the DART cookie that
          enables it to serve ads to Users based on their visit to our Site and
          other sites on the Internet. DART uses “non -personally identifiable
          information” and does NOT track personal information about you, such
          as your name, email address, physical address, etc. You may opt out of
          the use of the DART cookie by visiting the Google ad and content
          network privacy policy at http://www.google.com/privacy_ads.html
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>(h) Changes to this privacy policy</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          Bidding Karo have the discretion to update this privacy policy at any
          time. When we do, we will send you an email. We encourage Users to
          frequently check this page for any changes to stay informed about how
          we are helping to protect the personal information we collect. You
          acknowledge and agree that it is your responsibility to review this
          privacy policy periodically and become aware of modifications.
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>CONTACT US</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          If you have any questions or comments about these our Terms of Service
          as outlined above, you can contact us at:
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>Bidding Karo</strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>
            Bidding Genie Pvt Limited, First Floor, Shri Ram Market, Sector 86,
            Tigaon Road, Faridabad,
          </strong>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
          <strong>Haryana 121002</strong>
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
  );
};

export default PrivacyAndPolicy;
