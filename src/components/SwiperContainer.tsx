import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const images = [
  "https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const SwiperContainer = () => {
  return (
    <div className="relative sm:mx-[100px] mt-4">
      <Slider
        autoplay
        autoplaySpeed={2000}
        dots={true}
        initialSlide={1}
        slidesToShow={1}
        infinite
        arrows={false}
      >
        {images.map((slide, index) => (
          <div
            key={index}
            className="relative h-[500px] overflow-hidden rounded-[10px]"
          >
            <Image
              src={slide}
              alt="#"
              fill
              unoptimized
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>
      <div className="flex-ic justify-center flex-col absolute top-1/4 left-1/4 right-1/4 bottom-1/4 text-white">
        <div className="text-[32px] text-center">Enjoy Your Dream Vacation</div>
        <div className="text-xl max-w-[650px] text-center">
          Plan and book our perfect trip with expert advice, travel tips,
          destination information and inspiration from us
        </div>
      </div>
    </div>
  );
};

export default SwiperContainer;
