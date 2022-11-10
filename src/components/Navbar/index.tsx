"use client";

import { Menu, ArrowDown, Search } from "iconoir-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { AnimatePresence, motion } from "framer-motion";
import { ROUTES } from "../../lib/helpers/consts";
import Dropdown from "../Dropdown";
import { TbDeviceGamepad } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import UserDropdown from "./UserDropdown";
import Input from "../Input";
import { classes } from "@/lib/helpers/common";
import useClickOutside from "@/lib/hooks/useClickOutside";

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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(mobileMenuRef, () => setOpen(false));

  return (
    <div className="w-full h-16 fixed left-0 top-0 select-none flex items-center justify-center z-50 bg-accent">
      <div className="flex items-center gap-3 max-w-2xl" ref={mobileMenuRef}>
        <Link href={ROUTES.home} className="flex items-center">
          <img className="w-8 h-16 mt-0.5" src="/logo_mini.svg" alt="Mini" />
          <img
            className={classes("w-20 h-16", "hidden lg:block")}
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

        <div className="hidden items md:flex items-center gap-3 ml-5 font-medium">
          <Link href={ROUTES.home}>Home</Link>
          <Dropdown
            label="Explore"
            className="remove-dropdown-bg"
            width="250px"
          >
            <Dropdown.Item>
              <Link
                href={ROUTES.games.index}
                className="flex items-center justify-center gap-2"
              >
                <TbDeviceGamepad size="1.5em" />
                Games
              </Link>
            </Dropdown.Item>
          </Dropdown>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="lg:hidden flex flex-col gap-5 w-11/12 absolute top-[4.5rem] rounded-lg left-2/4 bg-accent py-4 px-6 shadow-san font-medium"
              animate={open ? "open" : "closed"}
              variants={variants}
            >
              <Link href={ROUTES.home} className="flex items-center gap-2">
                <AiOutlineHome size="1.7em" />
                Home
              </Link>
              <Link
                href={ROUTES.games.index}
                className="flex items-center gap-2"
              >
                <TbDeviceGamepad size="1.7em" />
                Games
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <Input
          className="!hidden lg:!flex !w-64"
          fit={false}
          icon={<Search />}
          placeholder="Search"
          color="accent2"
        />

        <button className="lg:hidden">
          <Search />
        </button>

        <UserDropdown />
      </div>
    </div>
  );
}
