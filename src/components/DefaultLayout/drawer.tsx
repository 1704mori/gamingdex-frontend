"use client";

import { classes } from "@/lib/helpers/common";
import useScroll from "@/lib/hooks/useScroll";
import Footer from "../Footer";
import Input from "../Input";
import Navbar from "../Navbar";
import UserDropdown from "../Navbar/UserDropdown";

export default function Layout({ children }: any) {
  const { scrollDirection, scrollY } = useScroll();

  return (
    <div className="flex flex-col grow h-full">
      <div className="flex flex-grow">
        <Navbar />
        <main className="flex-grow flex flex-col justify-center items-center relative pb-3">
          <div
            className={classes(
              "flex items-center justify-between sticky top-0 w-full py-3 z-[900] transition-[background-color_border-color] duration-300 ease-in-out",
              scrollDirection === "up" && scrollY > 0
                ? "bg-background border-b  border-accent3"
                : "border-transparent"
            )}
          >
            <div className="mx-auto flex items-center justify-end w-full lg:max-w-screen-2xl">
              <div className="mx-auto">
                <Input placeholder="Search" fit={false} />
              </div>
              <UserDropdown />
            </div>
          </div>
          <div className=" w-full mx-auto lg:max-w-screen-2xl">{children}</div>
        </main>
      </div>
      {/* <Footer /> */}
      {/* <footer className="flex flex-1 py-8 mt-12 border-t border-gray-300/30 justify-between items-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center grow"
        >
          Powered by{" "}
          <span className="ml-2">
            <img src="/logo_mini.svg" alt="GamingDex" width={24} height={24} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
