"use client"
// import "swiper/css";
// import "swiper/css/pagination";
import "swiper/swiper-bundle.css"
import {
  ArrowRight,
  ChatLines,
  Heart,
  NintendoSwitch,
  User,
} from "iconoir-react";
import Activities from "./Activities";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocale } from "@/lib/hooks/useLocale";
import { Mousewheel, Pagination } from "swiper";

export default function Home() {
  const { t } = useLocale();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1fr)_270px] w-full gap-5 mt-12">
      <div className="flex flex-col gap-5 ">
        <div className="upcoming flex flex-col gap-1 relative">
          <h3 className="font-medium text-2xl">Upcoming Games</h3>
          <Swiper
            freeMode
            slidesPerView={1}
            spaceBetween={20}
            mousewheel={true}
            pagination={{
              clickable: true,
              el: ".upcoming-pagination",
            }}
            modules={[Mousewheel, Pagination]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className="upcoming-swiper"
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
          <div className="upcoming-pagination flex items-center justify-center gap-1 mt-2" />
        </div>

        <div className="popular-lists flex flex-col gap-1 relative">
          <h3 className="font-medium text-2xl">Recent Reviews</h3>
          <Swiper
            freeMode
            slidesPerView={3}
            spaceBetween={20}
            mousewheel={true}
            pagination={{
              clickable: true,
              el: ".popular-lists-pagination",
            }}
            modules={[Mousewheel, Pagination]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className="upcoming-swiper"
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
          <div className="popular-lists-pagination flex items-center justify-center gap-1 mt-2" />
        </div>

        <div className="activities flex flex-col gap-1 relative">
          <h3 className="font-medium text-xl">Recent Activities</h3>

          <Activities />
          <div className="activities-pagination flex items-center justify-center gap-1 mt-2" />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-xl">Most Popular</h4>
            <ArrowRight />
          </div>
          <div className="grid grid-cols-1 gap-3 ">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="popular-game">
                  <img
                    className="game-cover"
                    src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/hero_capsule.jpg?t=1628200839"
                    alt=""
                  />
                  <div className="flex md:flex-col items-center justify-between my-auto md:items-start md:my-[unset] px-2 md:py-2">
                    <span className="font-medium">Elden Ring</span>
                    <div className="flex items-center text-sm">
                      <User />
                      <span className="text-sm font-medium">178,534</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-2xl">Popular List</h4>
            <ArrowRight />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="popular-list">
                  <div className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-5">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <img
                          key={index}
                          className="game-cover hover:scale-105 transition-all duration-200"
                          src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/hero_capsule.jpg?t=1628200839"
                          alt=""
                        />
                      ))}
                  </div>
                  <div className="p-2">
                    <h5 className="font-medium">Best JRPGs</h5>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center">
                        <NintendoSwitch width="1.3em" />
                        <span className="text-sm">15 Games</span>
                      </div>
                      <div className="flex items-center">
                        <Heart width="1.3em" />
                        <span className="text-sm">15 likes</span>
                      </div>
                      <div className="flex items-center">
                        <ChatLines width="1.3em" />
                        <span className="text-sm">15</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
