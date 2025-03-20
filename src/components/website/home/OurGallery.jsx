import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./OurGallery.module.scss";
import GalleryImg1 from "../../../assets/images/website/home/blog1.avif";
import GalleryImg2 from "../../../assets/images/website/home/blog2.avif";
import GalleryImg3 from "../../../assets/images/website/home/blog3.jpg";
import blogBgImg from "../../../assets/images/website/home/blog-bg-imge.jpg";

import { Pagination } from "swiper/modules";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";

const RecentBlogs = () => {
  useEffect(() => {
    AOS.init({ duration: 2000, once: true }); // Initialize AOS
  }, []);

  const blogs = [
    {
      title: "How Bidding Karo is Revolutionizing the Procurement Process",
      date: "18 FEB",
      description:
        "In this post, explore how Bidding Karo streamlines procurement by giving buyers ...",
      image: GalleryImg1,
    },
    {
      title: "The Power of Bidding: Why Buyers Should Lead the Negotiation",
      date: "19 FEB",
      description:
        "Focus on the buyer-centric approach that Bidding Karo takes. Discuss the benefits...",
      image: GalleryImg2,
    },
    {
      title: "How Suppliers Benefit from Bidding Karo’s Dynamic Marketplace",
      date: "18 FEB",
      description:
        "Highlight how suppliers can gain exposure to a wider pool of buyers and how the...",
      image: GalleryImg3,
    },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const DateBox = styled(Box)({
    backgroundColor: "#E63946",
    color: "#fff",
    padding: "5px 10px",
    position: "absolute",
    bottom: "10px",
    right: "10px",
    fontWeight: "bold",
    textAlign: "center",
  });

  const ImageContainer = styled(Box)({
    position: "relative",
    overflow: "hidden",
    "&:hover img": {
      filter: "blur(5px)",
      transition: "filter 0.3s ease-in-out",
    },
  });

  const BlogCard = ({ blog }) => (
    <Card
      sx={{ maxWidth: 393, position: "relative", boxShadow: 3 }}
      data-aos="fade-left" // Apply AOS animation
    >
      <ImageContainer>
        <CardMedia component="img" height="205" image={blog.image} alt="Blog" />
        <DateBox sx={{ backgroundColor: "#062d72" }}>
          <Typography variant="body2">{blog.date}</Typography>
        </DateBox>
      </ImageContainer>
      <CardContent>
        <Typography variant="caption" color="textSecondary">
          BY ADMIN
        </Typography>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {blog.description}
        </Typography>
        <Typography
          sx={{
            color: "#062d72",
            fontWeight: "bold",
            mt: 1,
            cursor: "pointer",
          }}
        >
          View More →
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{
          backgroundImage: `url(${blogBgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Heading Section */}
        <Grid
          item
          xs={12}
          textAlign="center"
          sx={{ paddingX: 2, marginBottom: isMobile ? 2 : 4 }}
        >
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ marginBottom: 1 }}
          >
            Our Blogs
          </Typography>
          <Box
            sx={{
              display: "inline-block",
              backgroundColor: "#062d72",
              color: "#fff",
              borderRadius: "20px",
              padding: "8px 20px",
              fontWeight: "bold",
              marginTop: "5px",
              fontSize: isMobile ? "14px" : "16px",
            }}
          >
            Recent Stories
          </Box>
        </Grid>

        {/* Blog Cards with Swiper */}
        <Swiper
          spaceBetween={20}
          pagination={{ clickable: true }}
          centeredSlides={true}
          breakpoints={{
            0: { slidesPerView: 1, centeredSlides: true },
            768: { slidesPerView: 2, centeredSlides: true },
            1024: { slidesPerView: 3, centeredSlides: false },
          }}
          style={{ paddingBottom: "50px", width: "80%" }}
        >
          {blogs.map((blog, index) => (
            <SwiperSlide
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </>
  );
};

export default RecentBlogs;
