import { signOut, useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, Droplet, Settings, User } from "iconoir-react";
import { destroyCookie } from "nookies";
import { useTheme } from "next-themes";
import { Check } from "react-feather";
import { classes, styled } from "@/lib/helpers/common";
import { ROUTES, TOKEN_KEY } from "@/lib/helpers/consts";
import useClickOutside from "@/lib/hooks/useClickOutside";

const Divider = styled("div", "border-t border-accent4");

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"main" | "theme">("main");

  const { data: session, status } = useSession();

  const { theme, setTheme } = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => setOpen(!open);

  useClickOutside(ref, () => setOpen(false));

  const handleLogout = () => {
    signOut();
    destroyCookie(undefined, TOKEN_KEY);
  };

  return (
    <div className="flex items-center gap-2 relative" ref={ref}>
      <button className="flex items-center gap-1" onClick={handleOpen}>
        <img
          className="w-10 h-10 rounded-full dark:filter dark:invert"
          src={session?.user?.image ?? "/default_avatar.svg"}
          alt={session?.user?.name as string}
        />

        {session?.user && (
          <div className="flex items-center">
            <span className="font-medium">{session.user.name}</span>
            <motion.div animate={{ rotate: open ? 180 : 0 }}>
              <ArrowDown width="1em" />
            </motion.div>
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-14 -right-1/2 translate-x-1/2 w-64 bg-accent rounded-lg shadow-san p-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* on click themes, show theme menu coming from the right */}
            <motion.div
              className="flex flex-col gap-2 relative"
              initial="main"
              animate={activeMenu}
              // variants={{
              //   main: { x: 0 },
              //   theme: { x: -250 },
              // }}
              transition={{ duration: 0.2 }}
            >
              {/* Main Menu */}
              {activeMenu === "main" && (
                <motion.div className="flex flex-col gap-2 w-full relative">
                  {status === "authenticated" && (
                    <>
                      <Link
                        href={`${ROUTES.profile}/${session?.user?.name}`}
                        className="flex items-center gap-2 hover:bg-accent2 transition-colors rounded-lg p-2"
                      >
                        <User />
                        My Profile
                      </Link>
                      <Link
                        href={ROUTES.settings}
                        className="flex items-center gap-2 hover:bg-accent2 transition-colors rounded-lg p-2"
                      >
                        <Settings />
                        Settings
                      </Link>
                      <button
                        className="flex items-center gap-2 hover:bg-accent2 transition-colors rounded-lg p-2"
                        onClick={() => setActiveMenu("theme")}
                      >
                        <Droplet />
                        Themes
                      </button>
                      <Divider />
                      <button
                        className="flex items-center gap-2 hover:bg-accent2 transition-colors rounded-lg p-2"
                        onClick={handleLogout}
                      >
                        <ArrowLeft />
                        Logout
                      </button>
                    </>
                  )}

                  {status === "unauthenticated" && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href={ROUTES.login}
                          className="text-white text-center bg-primary hover:bg-primary2 transition-colors rounded-lg p-2"
                        >
                          Login
                        </Link>
                        <Link
                          href={ROUTES.register}
                          className="text-center bg-accent2 hover:bg-accent3 transition-colors rounded-lg p-2"
                        >
                          Register
                        </Link>
                      </div>
                      <Divider />
                      <button
                        className="flex items-center gap-2 hover:bg-accent2 transition-colors rounded-lg p-2"
                        onClick={() => setActiveMenu("theme")}
                      >
                        <Droplet />
                        Themes
                      </button>
                    </>
                  )}
                </motion.div>
              )}
              {/* Theme Menu */}
              {activeMenu === "theme" && (
                <motion.div
                  className="flex flex-col gap-2 w-full"
                  // initial={{ x: 250 }}
                >
                  <button
                    className="flex items-center gap-2 hover:bg-accent2 transition-colors rounded-lg p-2"
                    onClick={() => setActiveMenu("main")}
                  >
                    <ArrowLeft />
                    Back
                  </button>
                  <button
                    className={classes(
                      "flex items-center gap-2 hover:bg-accent2 transition-colors rounded-lg p-2",
                      theme === "light" && "bg-accent2"
                    )}
                    onClick={() => setTheme("light")}
                  >
                    {theme === "light" && <Check />}
                    Light
                  </button>
                  <button
                    className={classes(
                      "flex items-center gap-2 hover:bg-accent2 transition-colors rounded-lg p-2",
                      theme === "dark" && "bg-accent2"
                    )}
                    onClick={() => setTheme("dark")}
                  >
                    {theme === "dark" && <Check />}
                    Dark
                  </button>
                  <button
                    className={classes(
                      "flex items-center gap-2 hover:bg-accent2 transition-colors rounded-lg p-2",
                      theme === "dim" && "bg-accent2"
                    )}
                    onClick={() => setTheme("dim")}
                  >
                    {theme === "dim" && <Check />}
                    Dim
                  </button>
                  <button
                    className={classes(
                      "flex items-center gap-2 hover:bg-accent2 transition-colors rounded-lg p-2",
                      theme === "system" && "bg-accent2"
                    )}
                    onClick={() => setTheme("system")}
                  >
                    {theme === "system" && <Check />}
                    System
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
