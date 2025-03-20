import Banner from "../../components/website/home/Banner";
import Services from "../../components/website/home/Services";
import BiddingChallenges from "../../components/website/home/BiddingChallenges";
import BiddingProcess from "../../components/website/home/BiddingProcess";
// import BrandSlider from "../../components/website/home/BrandSlider";
import ProcurementManagement from "../../components/website/home/ProcurementManagement";
import Contact from "../../components/website/home/Contact";
import VideoReviewSection from "./WebsiteVideoReview";
import CompaniesSlider from "./CompaniesSlider";
import RecentBlogs from "../../components/website/home/OurGallery";
import BuyersAndSupplier from "../../components/website/home/SupplierPortal";
import BiddingKaroTagLines from "../../components/website/home/Marquee";

const HomePage = () => {
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
      <CompaniesSlider />
      <br />
      <br />
      <br />
      <BiddingProcess />
      <br />
      <br />
      <br />
      <RecentBlogs />
      <br />
      <br />
      <Contact />
    </>
  );
};

export default HomePage;
