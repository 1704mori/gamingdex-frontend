import {
  ArrowRight,
  ChatLines,
  Heart,
  NintendoSwitch,
  User,
} from "iconoir-react";
import Activities from "./Activities";
import { useBlazeSlider } from "@/lib/hooks/useBlazeSlider";
import { useLocale } from "@/lib/hooks/useLocale";

export default function Home() {
  const { t } = useLocale();

  const upcomingRef = useBlazeSlider({
    all: {
      slidesToShow: 3,
    },
  });

  const popularRef = useBlazeSlider({
    all: {
      slidesToShow: 3,
    },
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_1fr)_270px] px-6 gap-5 mt-12">
      <div className="flex flex-col gap-5 ">
        <div className="upcoming flex flex-col gap-1 relative">
          <h3 className="font-medium text-2xl">{t.UPCOMING_GAMES}</h3>
          <div className="blaze-slider" ref={upcomingRef}>
            <div className="blaze-container">
              <div className="blaze-track-container">
                <div className="blaze-track">
                  <div className="bg-primary"> 1 </div>
                  <div> 2 </div>
                  <div> 3 </div>
                  <div> 4 </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="popular-lists flex flex-col gap-1 relative">
          <h3 className="font-medium text-2xl">{t.RECENT_REVIEWS}</h3>
          <div className="blaze-slider" ref={popularRef}>
            <div className="blaze-container">
              <div className="blaze-track-container">
                <div className="blaze-track">
                  <div> 1 </div>
                  <div> 2 </div>
                  <div> 3 </div>
                  <div> 4 </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="activities flex flex-col gap-1 relative">
          <h3 className="font-medium text-2xl">{t.RECENT_ACTIVITIES}</h3>

          <Activities />
          <div className="activities-pagination flex items-center justify-center gap-1 mt-2" />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-2xl">{t.MOST_POPULAR_GAMES}</h4>
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
            <h4 className="font-medium text-2xl">{t.POPULAR_LISTS}</h4>
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
