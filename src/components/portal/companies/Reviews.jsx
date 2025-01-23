import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Rating,
} from "@mui/material";
import { useEffect, useState } from "react";
import _sendAPIRequest from "../../../helpers/api";
import { PortalApiUrls } from "../../../helpers/api-urls/PortalApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const Reviews = ({ id, companyDetail }) => {
  const [companyReviews, setCompanyReviews] = useState();
  const [screenLoader, setScreenLoader] = useState(true);

  const reviews = [
    {
      name: "Tushar Sharma",
      review:
        "I have had the pleasure of working with AppCode Technologies, and I am thoroughly impressed with their services. Their expertise in digital solutions, combined with a client-centric approach, makes their proficiency in the latest technologies and trends remarkable.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      review:
        "AppCode Technologies has been an incredible partner for our business. Their attention to detail and innovative solutions helped us streamline our operations. The team is professional, responsive, and always ready to go above and beyond.",
      rating: 4,
    },
    {
      name: "Siddharth Desai",
      review:
        "We have been working with AppCode Technologies for over a year now, and their team has consistently delivered high-quality results. Their ability to understand our unique needs and provide tailored solutions is unparalleled.",
      rating: 5,
    },
    {
      name: "Ananya Gupta",
      review:
        "From the start, AppCode Technologies demonstrated a deep understanding of our project requirements. Their seamless execution and constant communication made the entire process smooth and efficient. Highly recommend their services!",
      rating: 4,
    },
    {
      name: "Ravi Kumar",
      review:
        "I’ve worked with many tech firms, but AppCode Technologies stands out for their commitment to delivering results. The team is skilled, professional, and provides valuable insights into every stage of the project.",
      rating: 5,
    },
  ];

  const fetchCompanyReviews = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        PortalApiUrls.RETRIVE_COMPANY_REVIEWS + `${id}/`,
        "",
        true
      );
      if (response?.status === 200) {
        setCompanyReviews(response?.data);
        setScreenLoader(false);
      }
    } catch (error) {
      setScreenLoader(false);
    }
  };
  useEffect(() => {
    fetchCompanyReviews();
  }, []);

  const { address, city, country, pincode, state } =
    companyDetail.address.length > 0 && companyDetail.address[0];

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <>
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
        <Typography
          variant="h5"
          align="center"
          fontWeight={"bold"}
          gutterBottom
        >
          {companyDetail?.name}
        </Typography>
        {companyDetail.address.length > 0 && (
          <Typography variant="body1" align="center" color="textSecondary">
            {`${address} , ${city} ,${country} ,${pincode}, ${state}`}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            mb: 4,
          }}
        >
          {/* Average Rating Number */}
          <Typography
            variant="h4"
            component="span"
            sx={{ fontWeight: "bold", mr: 1 }}
          >
            {companyReviews?.rating?.avg_rating?.toFixed(1)}
          </Typography>

          {/* Rating Stars */}
          <Rating
            value={Number(companyReviews?.rating?.avg_rating?.toFixed(1))}
            readOnly
            size="large"
            precision={0.5} // Allows fractional star ratings
            sx={{ fontSize: "40px", mr: 1 }}
          />
        </Box>
        <Grid container spacing={3}>
          {companyReviews?.comments?.map((review, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                      {review?.rating_company?.logo === null
                        ? review?.rating_company?.name.charAt(0)
                        : review?.rating_company?.logo}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="div">
                        {review?.rating_company?.name}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {review.comment}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default Reviews;
