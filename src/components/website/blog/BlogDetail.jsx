import styles from "./BlogDetail.module.scss";
import BlogDetailImg1 from "../../../assets/images/blog/blog-image (1).png";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import { AlertContext } from "../../../contexts/AlertProvider";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blogDetail, setBlogdetail] = useState({});
  const [screenLoader, setScreenLoader] = useState(true);
  const { setAlert } = useContext(AlertContext);
  const location = useLocation();
  const { blogs = [] } = location.state || {};
  const fetchBlogDetails = async () => {
    try {
      const response = await _sendAPIRequest(
        "GET",
        `${WebsiteApiUrls.WEBSITE_BLOG_DETAIL}${slug}/`,
        "",
        true
      );
      if (response) {
        setBlogdetail(response.data);
        setScreenLoader(false);
      }
    } catch (error) {
      setAlert({
        isVisible: true,
        message: "Something went wrong",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  if (screenLoader) {
    return <ScreenLoader />;
  }
  console.log(blogs, " blogs");

  return (
    <>
      <div className={styles["banner"]}>
        <img
          src={blogDetail?.banner_image}
          alt="BlogBanner"
          className={styles["blog-details-img"]}
        />
      </div>

      <div className="container-fluid mt-5">
        <div className="row">
          {/* Main Content Column: Cover Image + Blog Content */}
          <div className="col-lg-9 col-md-8">
            <img
              src={blogDetail?.cover_image}
              alt="Cover"
              className={styles["blog-cover-img"]}
            />

            <div className="mt-4">
              <h2 className="blog-title">{blogDetail?.title}</h2>
              <p className="blog-description">{blogDetail?.description}</p>
            </div>
          </div>

          {/* Sidebar Column: Latest Blogs */}
          <div className="col-lg-3 col-md-4 mt-md-0 mt-4">
            <div className={styles["latest-blogs-box"]}>
              <h5 className={styles["section-title"]}>Latest Blogs</h5>
              <ul className={styles["styled-list"]}>
                {blogs?.map((blog) => (
                  <li key={blog.slug}>
                    <NavLink to={`/blogs/${blog.slug}`}>
                      <span className="arrow">→</span> {blog.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
