import { signOut, useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, Droplet, Settings, User } from "iconoir-react";
import { ROUTES } from "@/lib/helpers/consts";
import useClickOutside from "@/lib/hooks/useClickOutside";

const Divider: React.FC = () => (
  <div className="border-t border-gray-150 dark:border-gray-450" />
);

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<"main" | "theme">("main");
  const { data: session, status } = useSession();

  const ref = useRef<HTMLDivElement>(null)

  const handleOpen = () => setOpen(!open);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="flex items-center gap-2 relative" ref={ref}>
      <button className="flex items-center gap-1" onClick={handleOpen}>
        {session?.user && (
          <div className="flex items-center">
            <motion.div animate={{ rotate: open ? 180 : 0 }}>
              <ArrowDown width="1em" />
            </motion.div>
            <span className="font-medium">{session.user.name}</span>
          </div>
        )}
        <img
          className="w-8 h-8 rounded-full"
          src={session?.user?.image ?? "/default_avatar.svg"}
          alt={session?.user?.name as string}
        />
      </button>

      {/* Profile
		 Settings
		 Themes
		 Logout */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-14 right-0 w-64 bg-gray-200 dark:bg-gray-500 rounded-lg shadow-san p-2"
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
                        className="flex items-center gap-2 hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors rounded-lg p-2"
                      >
                        <User />
                        My Profile
                      </Link>
                      <Link
                        href={ROUTES.settings}
                        className="flex items-center gap-2 hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors rounded-lg p-2"
                      >
                        <Settings />
                        Settings
                      </Link>
                      <button
                        className="flex items-center gap-2 hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors rounded-lg p-2"
                        onClick={() => setActiveMenu("theme")}
                      >
                        <Droplet />
                        Themes
                      </button>
                      <Divider/>
                      <button
                        className="flex items-center gap-2 hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors rounded-lg p-2"
                        onClick={() => signOut()}
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
                          className="text-center bg-primary-300 transition-colors rounded-lg p-2"
                        >
                          Login
                        </Link>
                        <Link
                          href={ROUTES.register}
                          className="text-center bg-gray-300 hover:bg-gray-400D dark:bg-gray-600 hover:dark:bg-gray-600/50 transition-colors rounded-lg p-2"
                        >
                          Register
                        </Link>
                      </div>
                      <Divider/>
                      <button
                        className="flex items-center gap-2 hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors rounded-lg p-2"
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
                    className="flex items-center gap-2 hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors rounded-lg p-2"
                    onClick={() => setActiveMenu("main")}
                  >
                    <ArrowLeft />
                    Back
                  </button>
                  <button className="flex items-center gap-2 hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors rounded-lg p-2">
                    Light
                  </button>
                  <button className="flex items-center gap-2 hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors rounded-lg p-2">
                    Dark
                  </button>
                  <button className="flex items-center gap-2 hover:bg-gray-300 hover:dark:bg-gray-600 transition-colors rounded-lg p-2">
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
