import Banner from "../../components/website/home/Banner";
import BiddingProcess from "../../components/website/home/BiddingProcess";
// import BrandSlider from "../../components/website/home/BrandSlider";
import Contact from "../../components/website/home/Contact";
import VideoReviewSection from "./WebsiteVideoReview";
import CompaniesSlider from "./CompaniesSlider";
import RecentBlogs from "../../components/website/home/OurGallery";
import BuyersAndSupplier from "../../components/website/home/SupplierPortal";
import BiddingKaroTagLines from "../../components/website/home/Marquee";
import { useNavigate, useSearchParams } from "react-router-dom";
import _sendAPIRequest from "../../helpers/api";
import { WebsiteApiUrls } from "../../helpers/api-urls/WebsiteApiUrls";
import { login } from "../../utils/AxiosInterceptors";

const HomePage = () => {
  let [queryParams] = useSearchParams();
  const type = queryParams.get("type");
  const navigate = useNavigate();

  const submitForm = async () => {
    console.log(type)
    let formData = new FormData();
    formData.append("token", queryParams.get("token"));
    formData.append("salt", queryParams.get("salt"));

    try {
      const response = await _sendAPIRequest(
        "POST",
        WebsiteApiUrls.VERIFY_EMAIL,
        formData
      );
      if (response.status === 200) {
        login(response.data, "PORTAL");
        console.log(response.data, " reset");
        if (type === "reset") {
          console.log("password-reset");
          navigate("/reset-password");
        } else {
          const showReset = localStorage.getItem("showReset");
          navigate(showReset ? "/reset-password" : "/portal");
          console.log("password-reset");
        }
      }
    } catch (error) {
      console.log(error, " : error 2");
    }
  };

  if (type === "reset") {
    submitForm();
  }
  return (
    <>
      <Banner />
      <BiddingKaroTagLines />
      <br />
      <VideoReviewSection />
      <br />
      <BuyersAndSupplier />
      <br />
      <br />
      {/* <CompaniesSlider /> */}
      <br />
      <br />
      <br />
      <BiddingProcess />
      <br />
      <br />
      <br />
      <RecentBlogs />
      <br />
      <br id="contact-us" />
      <Contact />
    </>
  );
};

export default HomePage;
