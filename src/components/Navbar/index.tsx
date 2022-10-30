"use client";

import { classes } from "@/lib/helpers/common";
import { Menu, ArrowDown, Droplet } from "iconoir-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import { ROUTES } from "../../lib/helpers/consts";
import Dropdown from "../Dropdown";
import Avatar from "../Avatar";
import Switch from "../Switch";
import { TbDeviceGamepad } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";

const variants = {
  open: {
    opacity: 1,
    y: 0,
    x: "-50%",
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    x: "-50%",
  },
};

function MobileNavbar({ open }: { open: boolean }) {
  return (
    <motion.div
      className="flex flex-col gap-5 w-11/12 absolute top-[4rem] left-2/4 mobile-menu shadow-san"
      animate={open ? "open" : "closed"}
      variants={variants}
    >
      <Link href={ROUTES.home} className="flex items-center gap-2">
        <AiOutlineHome size="1.7em" />
        Games
      </Link>
      <Link href={ROUTES.explore.games} className="flex items-center gap-2">
        <TbDeviceGamepad size="1.7em" />
        Games
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const isMd = useMediaQuery({ query: "(min-width: 768px)" });

  // useClickOutside(avatarRef, () => setOpen(false));

  return (
    <div className="w-full h-16 fixed left-0 top-0 select-none flex justify-center z-50 bg-gray-200 dark:bg-gray-500">
      <div className="flex items-center justify-between sm:justify-center gap-5 max-w-5xl navbar">
        <div className="flex items-center">
          <Link href={ROUTES.home} className="flex items-center">
            <img className="w-8 h-16 mt-0.5" src="/logo_mini.svg" alt="Mini" />
            <img
              className={classes("w-20 h-16", !isDesktopOrLaptop && "hidden")}
              src="/logo_name.svg"
              alt="Name"
            />
          </Link>
          <motion.button
            animate={{ rotate: open ? 180 : 0 }}
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowDown /> : <Menu />}
          </motion.button>
          {isMd ? (
            <div className="items flex items-center gap-3 ml-5">
              <Link href={ROUTES.home}>Home</Link>
              <Dropdown
                label="Explore"
                className="remove-dropdown-bg"
                width="250px"
              >
                <Dropdown.Item>
                  <Link href={ROUTES.explore.games} className="flex items-center justify-center gap-2">
                    <TbDeviceGamepad size="1.5em" />
                    Games
                  </Link>
                </Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <MobileNavbar open={open} />
          )}
        </div>

        <UserDropdown />
      </div>
    </div>
  );
}
