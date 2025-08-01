import styles from "./BlogDetail.module.scss";
import BlogDetailImg1 from "../../../assets/images/blog/blog-image (1).png";
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import { AlertContext } from "../../../contexts/AlertProvider";
import DOMPurify from "../../../utils/DomPurifier";

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
          className={styles["blog-banner-img"]}
        />
      </div>

      <div className="container mt-5">
        <div className="row g-5">
          <div className="col-lg-9 col-md-8">
            <div className={styles["blog-content-box"]}>
              <img
                src={blogDetail?.cover_image}
                alt="Cover"
                className={styles["blog-cover-img"]}
              />
              <div className="mt-4">
                <div className={styles["blog-title-wrapper"]}>
                  <h2 className={styles["blog-title"]}>{blogDetail?.title}</h2>
                  <span className={styles["blog-title-underline"]}></span>
                </div>
                <div className={styles["blog-description-wrapper"]}>
                  <div
                    className={styles["blog-description"]}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(blogDetail?.description),
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4">
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
