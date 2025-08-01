import { useEffect, useState } from "react";
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
import _sendAPIRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import { convertHtmlToText, truncateString } from "../../../helpers/formatter";
import { NavLink } from "react-router-dom";

const RecentBlogs = () => {
  const [blogss, setBlogs] = useState([]);

  const fetchThreelatestBlogs = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        WebsiteApiUrls.WEBSITE_BLOGS,
        "",
        true
      );
      if (response.status === 200) {
        setBlogs(response.data.slice(0, 4));
      }
    } catch (error) {
      console.log(error, " : error");
    }
  };

  useEffect(() => {
    fetchThreelatestBlogs();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 2000, once: true }); // Initialize AOS
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <CardMedia
          component="img"
          height="205"
          image={blog.cover_image}
          alt="Blog"
        />
      </ImageContainer>
      <CardContent>
        <Typography variant="caption" color="textSecondary">
          BY ADMIN
        </Typography>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {}
          <div
            className={styles["col-data"]}
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{
              __html: convertHtmlToText(
                truncateString(blog.description, 100) || ""
              ),
            }}
          ></div>
        </Typography>
        <NavLink to={`/blogs/${blog.slug}`} style={{ textDecoration: "none" }}>
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
        </NavLink>
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
          {blogss.map((blog, index) => (
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
