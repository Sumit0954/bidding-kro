import React, { useEffect, useState } from "react";
import BlogImg5 from "../../../assets/images/blog/bolg-list-img.jpg";
import { Box, Typography, Grid } from "@mui/material";
import styles from "./BlogList.module.scss"; // Import SCSS
import _sendAPIRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import { convertHtmlToText, truncateString } from "../../../helpers/formatter";
import { NavLink } from "react-router-dom";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [screenLoader, setScreenLoader] = useState(true);

  const fetchBlogList = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        WebsiteApiUrls.WEBSITE_BLOGS,
        "",
        true
      );
      if (response.status === 200) {
        setBlogs(response.data);
        setScreenLoader(false);
      }
    } catch (error) {
      console.log(error, " : error");
    }
  };

  useEffect(() => {
    fetchBlogList();
  }, []);

  if (screenLoader) {
    return <ScreenLoader />;
  }
  return (
    <Grid container spacing={3} className={styles.blogListContainer}>
      {blogs.map((blog, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <NavLink to={`/blogs/${blog.slug}`} state={{ blogs: blogs }}>
            <Box className={styles.blogItem}>
              {/* Background Image */}
              <Box
                className={styles.image}
                sx={{ backgroundImage: `url(${blog.cover_image})` }}
              />

              {/* Text Overlay */}
              <Box className={styles.content}>
                <Typography variant="caption" className={styles.subtitle}>
                  {blog.title}
                </Typography>
              </Box>

              {/* Hidden Description */}
              <Box className={styles.description}>
                <Typography variant="body2">
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
              </Box>
            </Box>
          </NavLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogList;
