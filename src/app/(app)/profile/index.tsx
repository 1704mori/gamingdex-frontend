import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { WhiteFlag } from "iconoir-react";
import { useMediaQuery } from "react-responsive";

export default function Profile() {
  const isSmallestScreen = useMediaQuery({
    query: "(max-width: 375px)",
  });

  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:max-w-7xl lg:m-auto">
      <div className="hidden lg:block absolute h-[21rem] left-0 top0 w-full -z-10">
        <div
          className="w-full h-72 bg-cover bg-center bg-no-repeat after:absolute after:left-0 after:top-0 after:h-full after:w-full after:pointer-events-none after:bg-gradient-to-r after:from-primary-300/25 after:to-transparent after:backdrop-blur-lg"
          style={{
            backgroundImage: `url(/vercel.svg)`,
          }}
        ></div>
      </div>

      <div className="flex flex-col relative">
        <img
          src="/vercel.svg"
          alt="profile cover"
          className="w-full h-60 lg:w-60 lg:h-80 object-cover rounded-lg shadow-ni bg-primary/50"
        />
        <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

        <div className="lg:hidden flex flex-col justify-end absolute gap-5 top-14 p-3 w-full h-full">
          <div className="flex items-center gap-3 w-full">
            <div className="img div">
              <div className="bg-primary w-24 h-24 rounded-full"></div>
            </div>

            <div className="flex flex-col w-full gap-5 -mb-5">
              <div className="flex items-end justify-between">
                <h3 className="text-xl font-medium">Username</h3>
                <Button size="sm">
                  <WhiteFlag />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                {isSmallestScreen ? (
                  <Button className="!fixed bottom-4 right-4">
                    Edit Profile
                  </Button>
                ) : (
                  <Button size="sm">Edit Profile</Button>
                )}
                <div className="flex items-center gap-1">
                  <div className="bg-gray-200 dark:bg-gray-500 w-8 h-8 rounded-full flex items-center justify-center">
                    10
                  </div>
                  <span className="text-xs">Followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-gray-200 dark:bg-gray-500 w-8 h-8 rounded-full flex items-center justify-center">
                    10
                  </div>
                  <span className="text-xs">Following</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col mt-14 px-4">
        <div className="grid grid-cols-2 gap-3 ">
          <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-500 p-2 rounded-lg">
            <span className="text-xs">Completed Games</span>

            <div className="w-7 h-w-7 bg-gray-150 dark:bg-gray-450 rounded-full flex items-center justify-center">
              10
            </div>
          </div>
          <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-500 p-2 rounded-lg">
            <span className="text-xs">Now Playing</span>

            <div className="w-7 h-w-7 bg-gray-150 dark:bg-gray-450 rounded-full flex items-center justify-center">
              10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
