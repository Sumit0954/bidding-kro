import styles from "./BlogDetail.module.scss";
import BlogDetailImg1 from "../../../assets/images/blog/blog-image (1).png";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import _sendAPIRequest from "../../../helpers/api";
import { WebsiteApiUrls } from "../../../helpers/api-urls/WebsiteApiUrls";
import ScreenLoader from "../../../elements/CustomScreeenLoader/ScreenLoader";
import { AlertContext } from "../../../contexts/AlertProvider";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blogDetail, setBlogdetail] = useState({});
  const [screenLoader, setScreenLoader] = useState(true);
  const { setAlert } = useContext(AlertContext);

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
  return (
    <>
      <div className={styles["banner"]}>
        <img
          src={blogDetail?.banner_image}
          alt="BlogBanner"
          className={styles["blog-details-img"]}
        />
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12 text-center">
            {/* Blog Cover Image */}
            <img
              src={blogDetail?.cover_image}
              alt="Cover Image"
              className={styles["blog-cover-img"]}
            />

            {/* Blog Title */}
            <h2 className="blog-title">{blogDetail?.title}</h2>

            {/* Blog Description */}
            <p className="blog-description">{blogDetail?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
