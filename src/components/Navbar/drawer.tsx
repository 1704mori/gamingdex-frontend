// "use client";

// import {
//   Menu,
//   ArrowDown,
//   Search,
//   BookStack,
//   Book,
//   DiceFive,
//   GraphUp,
//   Trophy,
// } from "lucide-react";
// import Link from "next/link";
// import { useRef, useState } from "react";
// import { AnimatePresence, motion, useCycle } from "framer-motion";
// import { ROUTES } from "../../lib/helpers/consts";
// import { AiOutlineHome } from "react-icons/ai";
// import { classes } from "@/lib/helpers/common";
// import useClickOutside from "@/lib/hooks/useClickOutside";
// import { useRouter } from "next/router";

// const variants = {
//   open: {
//     opacity: 1,
//     y: 0,
//     x: "-50%",
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
//   closed: {
//     opacity: 0,
//     y: -20,
//     x: "-50%",
//   },
// };

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [openMenu, toggle] = useCycle(true, false);

//   const mobileMenuRef = useRef<HTMLDivElement>(null);

//   const { data: session } = useSession();

//   useClickOutside(mobileMenuRef, () => setOpen(false));

//   const router = useRouter();

//   return (
//     <>
//       <div className="max-md:hidden fixed top-0 left-16 z-40">
//         <div className="flex items-center gap-3">
//           <button className="btn-icon hover:bg-accent2" onClick={() => toggle()}>
//             <Menu />
//           </button>
//           <Link href={ROUTES.home} className="flex items-center h-16">
//             <img className="w-8 h-16 mt-0.5" src="/logo_mini.svg" alt="Mini" />
//             <img
//               className={classes("w-20 h-16", "hidden lg:block")}
//               src="/logo_name.svg"
//               alt="Name"
//             />
//           </Link>
//         </div>
//       </div>

//       <motion.div
//         className="w-60 h-screen md:h-full left-0 top-0 select-none flex flex-col bg-accent px-5 py-1 z-50"
//         animate={{
//           x: openMenu ? 0 : "-100%",
//         }}
//         transition={{
//           type: "spring",
//           stiffness: 260,
//           damping: 20,
//         }}
//       >
//         <div className="flex-grow lg:static lg:h-auto fixed left-0 top-0 z-50 h-screen md:h-full">
//           <div className="lg:top-0 lg:sticky flex flex-col overflow-y-auto overscroll-contain h-screen">
//             {/* <div className="flex items-center gap-3 max-w-2xl" ref={mobileMenuRef}> */}
//             <div className="flex items-center gap-3">
//               <button
//                 className="btn-icon hover:bg-accent2"
//                 onClick={() => toggle()}
//               >
//                 <Menu />
//               </button>
//               <Link href={ROUTES.home} className="flex items-center h-16">
//                 <img
//                   className="w-8 h-16 mt-0.5"
//                   src="/logo_mini.svg"
//                   alt="Mini"
//                 />
//                 <img
//                   className={classes("w-20 h-16", "hidden lg:block")}
//                   src="/logo_name.svg"
//                   alt="Name"
//                 />
//               </Link>
//             </div>

//             <motion.button
//               animate={{ rotate: open ? 180 : 0 }}
//               className="md:hidden"
//               onClick={() => setOpen(!open)}
//             >
//               {open ? <ArrowDown /> : <Menu />}
//             </motion.button>

//             <div className="hidden items md:flex flex-col gap-3 font-medium">
//               <Link
//                 href={ROUTES.home}
//                 className={classes(
//                   "flex items-center gap-2 hover:bg-accent2 px-3 py-2 rounded-lg transition-colors",
//                   router.pathname === ROUTES.home && "bg-accent2"
//                 )}
//               >
//                 <AiOutlineHome size="1.4em" />
//                 Home
//               </Link>
//               {/* ROUTES.profile.lists = /profile/:username?tab=lists */}
//               <Link
//                 href={
//                   session?.user
//                     ? ROUTES.profile.lists.replace(
//                       ":username",
//                       session.user.name as string
//                     )
//                     : ROUTES.login
//                 }
//                 className={classes(
//                   "flex items-center gap-2 hover:bg-accent2 px-3 py-2 rounded-lg transition-colors",
//                   session?.user &&
//                   router.pathname ===
//                   ROUTES.profile.lists.replace(
//                     ":username",
//                     session?.user.name as string
//                   ) &&
//                   "bg-accent2"
//                 )}
//               >
//                 <BookStack width="1.4em" height="1.4em" />
//                 My Lists
//               </Link>
//               {/* divider */}
//               <div className="h-0.5 bg-accent2 rounded-lg"></div>
//               <div className="flex flex-col gap-1">
//                 <div className="flex items-center gap-1">
//                   <Book width="1.4em" height="1.4em" />
//                   <span className="text-sm font-semibold">Games</span>
//                 </div>
//                 <Link
//                   href={ROUTES.games.index}
//                   className={classes(
//                     "flex items-center gap-2 hover:bg-accent2 px-3 py-2 rounded-lg transition-colors",
//                     router.pathname === ROUTES.games.index && "bg-accent2"
//                   )}
//                 >
//                   <Search width="1.4em" height="1.4em" />
//                   Find
//                 </Link>
//                 <Link
//                   href={ROUTES.games.index}
//                   className={classes(
//                     "flex items-center gap-2 hover:bg-accent2 px-3 py-2 rounded-lg transition-colors",
//                     router.pathname === ROUTES.games.index && "bg-accent2"
//                   )}
//                 >
//                   <Trophy width="1.4em" height="1.4em" />
//                   Top
//                 </Link>
//                 <Link
//                   href={ROUTES.games.index}
//                   className={classes(
//                     "flex items-center gap-2 hover:bg-accent2 px-3 py-2 rounded-lg transition-colors",
//                     router.pathname === ROUTES.games.index && "bg-accent2"
//                   )}
//                 >
//                   <GraphUp width="1.4em" height="1.4em" />
//                   Most Popular
//                 </Link>
//                 <Link
//                   href={ROUTES.games.random}
//                   className="flex items-center gap-2 hover:bg-accent2 px-3 py-2 rounded-lg transition-colors"
//                 >
//                   <DiceFive width="1.4em" height="1.4em" />
//                   Random
//                 </Link>
//               </div>

//               {/* <Dropdown
//               label="Explore"
//               className="remove-dropdown-bg"
//               width="250px"
//             >
//               <Dropdown.Item>
//                 <Link
//                   href={ROUTES.explore.games}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <TbDeviceGamepad size="1.5em" />
//                   Games
//                 </Link>
//               </Dropdown.Item>
//             </Dropdown> */}
//             </div>

//             {/* <AnimatePresence>
//         {open && (
//           <motion.div
//             className="lg:hidden flex flex-col gap-5 w-11/12 absolute top-[4.5rem] rounded-lg left-2/4 bg-accent py-4 px-6 shadow-san font-medium"
//             animate={open ? "open" : "closed"}
//             variants={variants}
//           >
//             <Link href={ROUTES.home} className="flex items-center gap-2">
//               <AiOutlineHome size="1.7em" />
//               Home
//             </Link>
//             <Link
//               href={ROUTES.explore.games}
//               className="flex items-center gap-2"
//             >
//               <TbDeviceGamepad size="1.7em" />
//               Games
//             </Link>
//           </motion.div>
//         )}
//       </AnimatePresence> */}

//             {/* <Input
//           className="!hidden lg:!flex !w-64"
//           fit={false}
//           icon={<Search />}
//           placeholder="Search"
//         /> */}

//             {/* <button className="lg:hidden">
//         <Search />
//       </button> */}
//           </div>
//         </div>
//         {/* </div> */}
//       </motion.div>
//     </>
//   );
// }
