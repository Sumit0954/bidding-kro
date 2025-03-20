import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import styles from "./BiddingProcess.module.scss";

import BiddingProcessImg from "../../../assets/images/website/home/Bidding Process1.png";
import BiddingProcessImg2 from "../../../assets/images/website/home/Bidding Process2.png";
import BiddingProcessImg3 from "../../../assets/images/website/home/Bidding Process3.png";
import BiddingProcessImg4 from "../../../assets/images/website/home/Bidding Process4.png";
import BiddingProcessImg5 from "../../../assets/images/website/home/Bidding Process5.png";
import cn from "classnames";
import { Box, Typography } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from "react";

const BiddingProcess = () => {
  const steps = [
    {
      img: BiddingProcessImg,
      step: "Step 1",
      text: "Gathering defining purchase requirement for creating a bid re-requisites for conducting the Auction.",
      color: "one",
    },
    {
      img: BiddingProcessImg2,
      step: "Step 2",
      text: "Creating a bid with the market competitive pricing.",
      color: "two",
    },
    {
      img: BiddingProcessImg3,
      step: "Step 3",
      text: "Inviting a diverse range of suppliers from our Bidding Karo platform.",
      color: "three",
    },
    {
      img: BiddingProcessImg4,
      step: "Step 4",
      text: "Conducting Live Bidding and providing system driven negotiations.",
      color: "four",
    },
    {
      img: BiddingProcessImg5,
      step: "Step 5",
      text: "Reports and Analysis for Future Strategy and Audit Compliance.",
      color: "five",
    },
  ];
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // Initialize AOS
  }, []);

  return (
    <div className="container mt-5">
      {/* Heading Section */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          className={styles["heading-with-lines"]}
        >
          5 Basic Steps For Bidding Process on Bidding Karo
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: "800px", mx: "auto", mt: 1 }}
        >
          The 5-step bidding process on Bidding Karo ensures a smooth and
          efficient transaction for both buyers and suppliers. From placing your
          bid to negotiating the final offer.
        </Typography>
      </Box>
      {/* Swiper Component */}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        modules={[Pagination]}
        className={styles["swiper-container"]}
      >
        {steps.map((step, index) => (
          <SwiperSlide key={index}>
            <div
              className={styles["box"]}
              data-aos="fade-down" // AOS animation effect
              data-aos-delay={index * 200} // Delays each step slightly
            >
              <img
                src={step.img}
                alt={`Bidding Process ${step.step}`}
                className={styles["bidding-process-img"]}
              />
              <p className={cn(styles["step"], styles[step.color])}>
                {step.step}
              </p>
              <p className={styles["content"]}>{step.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BiddingProcess;
