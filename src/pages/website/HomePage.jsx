import Banner from "../../components/website/home/Banner";
import Services from "../../components/website/home/Services";
import SupplierPortal from "../../components/website/home/SupplierPortal";
import BiddingChallenges from "../../components/website/home/BiddingChallenges";
import BiddingProcess from "../../components/website/home/BiddingProcess";
import OurGallery from "../../components/website/home/OurGallery";
// import BrandSlider from "../../components/website/home/BrandSlider";
import ProcurementManagement from "../../components/website/home/ProcurementManagement";
import Contact from "../../components/website/home/Contact";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Services />
      <SupplierPortal />
      <BiddingChallenges />
      <BiddingProcess />
      <OurGallery />
      {/* <BrandSlider /> */}
      <ProcurementManagement />
      <Contact />
    </>
  );
};

export default HomePage;
