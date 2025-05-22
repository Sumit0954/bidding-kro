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
import fallback_user_img from "../../../assets/images/portal/company-profile/fallback-profile-img.jpg";

const Reviews = ({ id, companyDetail }) => {
  const [companyReviews, setCompanyReviews] = useState();
  const [screenLoader, setScreenLoader] = useState(true);

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
          {companyReviews?.rating?.avg_rating !== null ? (
            <Rating
              value={Number(companyReviews?.rating?.avg_rating?.toFixed(1))}
              readOnly
              size="large"
              precision={0.5}
              sx={{ fontSize: "40px", mr: 1 }}
            />
          ) : (
            <Typography variant="body1" align="center" color="primary">
              No review Yet for this Company
            </Typography>
          )}
        </Box>
        <Grid container spacing={3}>
          {companyReviews?.comments?.map((review, index) => (
            <Grid item xs={12} key={index}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "center", sm: "flex-start" },
                      textAlign: { xs: "center", sm: "left" },
                      mb: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={review?.rating_company?.logo || fallback_user_img}
                      alt="Company Logo"
                      sx={{
                        width: { xs: 60, sm: 68, md: 60 },
                        height: { xs: 60, sm: 60, md: 60 },
                        objectFit: "contain",
                        borderRadius: "50%",
                        border: "1px solid black",
                        mb: { xs: 1, sm: 0 },
                        mr: { sm: 2 },
                      }}
                    />

                    <Box>
                      <Typography variant="h6" component="div">
                        {review?.rating_company?.name}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ textAlign: { xs: "center", sm: "left" } }}
                  >
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
