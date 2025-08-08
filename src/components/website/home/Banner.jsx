import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useMediaQuery, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Banner.module.scss";
import HomeBanner1 from "../../../assets/images/website/home/banner1.jpg";
import HomeBanner2 from "../../../assets/images/website/home/banner2.jpg";
import HomeBanner3 from "../../../assets/images/website/home/banner3.jpg";

const Banner = () => {
  const banners = [HomeBanner1, HomeBanner2, HomeBanner3];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screen

  return (
    <div className={styles["banner"]}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000 }}
        loop={true}
        navigation={!isMobile} // Disable navigation on mobile
        pagination={{ clickable: true }}
        className={styles["banner-slider"]}
      >
        {banners.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              srcSet={`
    ${image}?w=480 480w,
    ${image}?w=768 768w,
    ${image}?w=1200 1200w
  `}
              sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
              alt={`Banner ${index + 1}`}
              className={styles["banner-img"]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
