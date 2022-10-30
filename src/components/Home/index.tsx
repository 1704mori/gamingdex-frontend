import { useLocale } from "../../lib/hooks/useLocale";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Typography from "../Typography";
import {
  ArrowRight,
  ChatLines,
  Heart,
  NintendoSwitch,
  User,
} from "iconoir-react";
import Activities from "./Activities";

export default function Home() {
  const { t } = useLocale();

  return (
    <div className="home-container gap-5">
      <div className="flex flex-col gap-5 ">
        <div className="upcoming flex flex-col gap-1 relative">
          <Typography.Title level="3" thickness={3}>
            {t.UPCOMING_GAMES}
          </Typography.Title>
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
          <Typography.Title level="3" thickness={3}>
            {t.RECENT_REVIEWS}
          </Typography.Title>
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
          <Typography.Title level="3" thickness={3}>
            {t.RECENT_ACTIVITIES}
          </Typography.Title>
          {/* <Swiper
            freeMode
            slidesPerView={2}
            spaceBetween={10}
            mousewheel={true}
            pagination={{
              clickable: true,
              el: ".activities-pagination",
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
            className="activities-swiper"
          >
            <SwiperSlide>
              <img
                className="game-cover"
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/hero_capsule.jpg?t=1628200839"
                alt=""
              />
              <div className="flex items-center mr-auto gap-1 px-1">
                <div className="avatar">
                  <img
                    className="rounded-full"
                    src="/default_avatar.svg"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-start w-full">
                  <Typography className="text-sm" thickness={5}>
                    Completed by
                  </Typography>
                  <Typography className="text-sm">mori</Typography>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper> */}
          <Activities />
          <div className="activities-pagination flex items-center justify-center gap-1 mt-2" />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Typography.Title level="4" thickness={3}>
              {t.MOST_POPULAR_GAMES}
            </Typography.Title>
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
                    <Typography thickness={3}>Elden Ring</Typography>
                    <div className="flex items-center text-sm">
                      <User />
                      <Typography className="text-sm" thickness={3}>
                        178,534
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Typography.Title level="4" thickness={3}>
              {t.POPULAR_LISTS}
            </Typography.Title>
            <ArrowRight />
          </div>
          <div className="grid grid-cols-1 gap-3">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="popular-list">
                  <div className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-5">
                    <img
                      className="game-cover"
                      src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/hero_capsule.jpg?t=1628200839"
                      alt=""
                    />
                    <img
                      className="game-cover"
                      src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/hero_capsule.jpg?t=1628200839"
                      alt=""
                    />
                    <img
                      className="game-cover"
                      src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/hero_capsule.jpg?t=1628200839"
                      alt=""
                    />
                    <img
                      className="game-cover"
                      src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/hero_capsule.jpg?t=1628200839"
                      alt=""
                    />
                    <img
                      className="game-cover"
                      src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/hero_capsule.jpg?t=1628200839"
                      alt=""
                    />
                  </div>
                  <div className="p-2">
                    <Typography.Title level="5" thickness={3}>
                      Best JRPGs
                    </Typography.Title>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center">
                        <NintendoSwitch width="1.3em" />
                        <Typography className="!text-sm">15 Games</Typography>
                      </div>
                      <div className="flex items-center">
                        <Heart width="1.3em" />
                        <Typography className="!text-sm">15 likes</Typography>
                      </div>
                      <div className="flex items-center">
                        <ChatLines width="1.3em" />
                        <Typography className="!text-sm">15</Typography>
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
