import {
  SiNintendo,
  SiNintendo3Ds,
  SiNintendogamecube,
  SiWii,
  SiWiiu,
  SiPlaystation,
  SiPlaystation2,
  SiPlaystation3,
  SiPlaystation4,
  SiPlaystation5,
  SiXbox,
  SiAndroid,
  SiIos,
  SiMacos,
} from "react-icons/si";
import { FaGamepad } from "react-icons/fa";
import { TbDeviceGamepad } from "react-icons/tb";
import {
  NintendoSwitch,
  Windows,
  Linux,
} from "iconoir-react";
import Typography from "../Typography";
import React from "react";

export function Amazon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 4.233 4.233"
      xmlns="http://www.w3.org/2000/svg"
      className="retail-icon"
    >
      <path
        d="M.794 0H3.44c.44 0 .793.354.793.794V3.44c0 .44-.354.793-.793.793H.794A.792.792 0 0 1 0 3.44V.794C0 .354.354 0 .794 0z"
        fill="#fff"
      ></path>
      <path
        d="M3.537 3.064a.695.695 0 0 0-.382.107c-.034.024-.028.057.01.053.125-.015.403-.049.453.015.05.064-.055.326-.102.443-.014.035.016.05.048.023.209-.175.262-.54.22-.593-.021-.026-.123-.05-.247-.048zM.34 3.09c-.025.004-.037.043-.01.073.456.518 1.057.83 1.725.83.476 0 1.03-.19 1.41-.545.064-.058.01-.147-.054-.112-.428.229-.893.34-1.317.34A2.94 2.94 0 0 1 .37 3.1a.045.045 0 0 0-.03-.01z"
        fill="#ffa700"
      ></path>
      <path d="M2.094.257c-.468 0-.99.175-1.1.753-.012.062.033.094.074.103l.476.052c.045-.003.077-.047.086-.091.04-.2.208-.295.395-.295.102 0 .217.037.277.127.069.102.059.24.059.357v.065c-.285.031-.658.053-.925.17a.835.835 0 0 0-.524.804c0 .511.322.767.736.767.35 0 .541-.083.811-.358.09.13.119.192.282.328.037.02.084.018.117-.012v.002c.099-.088.277-.243.378-.327.04-.033.033-.086.001-.131-.09-.124-.185-.225-.185-.456V1.35c0-.325.022-.624-.217-.847-.189-.181-.501-.245-.74-.245zm.268 1.464v.107c0 .192.004.351-.092.522-.079.138-.203.223-.341.223-.189 0-.3-.144-.3-.357 0-.419.377-.495.733-.495z"></path>
    </svg>
  );
}

export function Steam() {
  return (
    <svg
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 65 65"
      fill="#fff"
    >
      <use xlinkHref="#B" x=".5" y=".5" />
      <defs>
        <linearGradient id="A" x2="50%" x1="50%" y2="100%" y1="0%">
          <stop stopColor="#111d2e" offset="0%" />
          <stop stopColor="#051839" offset="21.2%" />
          <stop stopColor="#0a1b48" offset="40.7%" />
          <stop stopColor="#132e62" offset="58.1%" />
          <stop stopColor="#144b7e" offset="73.8%" />
          <stop stopColor="#136497" offset="87.3%" />
          <stop stopColor="#1387b8" offset="100%" />
        </linearGradient>
      </defs>
      <symbol id="B">
        <g>
          <path
            d="M1.305 41.202C5.259 54.386 17.488 64 31.959 64c17.673 0 32-14.327 32-32s-14.327-32-32-32C15.001 0 1.124 13.193.028 29.874c2.074 3.477 2.879 5.628 1.275 11.328z"
            fill="url(#A)"
          />
          <path d="M30.31 23.985l.003.158-7.83 11.375c-1.268-.058-2.54.165-3.748.662a8.14 8.14 0 0 0-1.498.8L.042 29.893s-.398 6.546 1.26 11.424l12.156 5.016c.6 2.728 2.48 5.12 5.242 6.27a8.88 8.88 0 0 0 11.603-4.782 8.89 8.89 0 0 0 .684-3.656L42.18 36.16l.275.005c6.705 0 12.155-5.466 12.155-12.18s-5.44-12.16-12.155-12.174c-6.702 0-12.155 5.46-12.155 12.174zm-1.88 23.05c-1.454 3.5-5.466 5.147-8.953 3.694a6.84 6.84 0 0 1-3.524-3.362l3.957 1.64a5.04 5.04 0 0 0 6.591-2.719 5.05 5.05 0 0 0-2.715-6.601l-4.1-1.695c1.578-.6 3.372-.62 5.05.077 1.7.703 3 2.027 3.696 3.72s.692 3.56-.01 5.246M42.466 32.1a8.12 8.12 0 0 1-8.098-8.113 8.12 8.12 0 0 1 8.098-8.111 8.12 8.12 0 0 1 8.1 8.111 8.12 8.12 0 0 1-8.1 8.113m-6.068-8.126a6.09 6.09 0 0 1 6.08-6.095c3.355 0 6.084 2.73 6.084 6.095a6.09 6.09 0 0 1-6.084 6.093 6.09 6.09 0 0 1-6.081-6.093z" />
        </g>
      </symbol>
    </svg>
  );
}

export function Default() {
  return (
    <svg
      width="16px"
      height="16px"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000000"
    >
      <path
        d="M19.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9.5 22a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#000000"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M5 4h17l-2 11H7L5 4zm0 0c-.167-.667-1-2-3-2M20 15H5.23c-1.784 0-2.73.781-2.73 2 0 1.219.946 2 2.73 2H19.5"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
}

export function getRetailLogo(site: string) {
  switch (String(site)) {
    case "steam":
      return <Steam />;
    case "gog":
      return <Amazon />;
    case "amazon":
      return <Amazon />;
    default:
      return <Default />;
  }
}

export function getPlatformIcon(platform: string) {
  switch (platform) {
    case "nintendo_64":
      return (
        <SiNintendo
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--red-3)"
        />
      );
    case "ngc":
      return (
        <SiNintendogamecube
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--red-3)"
        />
      );
    case "switch":
      return (
        <NintendoSwitch width="1.5em" height="1.5em" color="var(--red-3)" />
      );
    case "nes":
      return (
        <TbDeviceGamepad
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--red-3)"
        />
      );
    case "super_famicom":
      return (
        <FaGamepad
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--red-3)"
        />
      );
    case "snes":
      return (
        <FaGamepad
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--red-3)"
        />
      );
    case "game_boy_advance":
      return (
        <Typography className="text-red-200" thickness={4}>
          GBA
        </Typography>
      );
    case "nintendo_3ds":
      return (
        <SiNintendo3Ds
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--red-3)"
        />
      );
    case "wii":
      return (
        <SiWii size="1.5em" width="1.5em" height="1.5em" color="var(--red-3)" />
      );
    case "wii_u":
      return (
        <SiWiiu
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--red-3)"
        />
      );
    case "playstation":
      return (
        <SiPlaystation
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--primary-300)"
        />
      );
    case "ps2":
      return (
        <SiPlaystation2
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--primary-300)"
        />
      );
    case "ps3":
      return (
        <SiPlaystation3
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--primary-300)"
        />
      );
    case "ps4":
      return (
        <SiPlaystation4
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--primary-300)"
        />
      );
    case "ps5":
      return (
        <SiPlaystation5
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--primary-300)"
        />
      );
    case "xbox_360":
      return (
        <SiXbox
          size="1.5em"
          width="1.5em"
          height="1.5em"
          color="var(--green-300)"
        />
      );
    case "xbox_one":
      return (
        <Typography className="text-green-200" thickness={4}>
          X1
        </Typography>
      );
    case "xbox_series_x":
      return (
        <Typography className="text-green-200" thickness={4}>
          XSX
        </Typography>
      );
    case "windows":
      return <Windows width="1.5em" height="1.5em" />;
    case "mac_os":
      return <SiMacos width="1.5em" height="1.5em" />;
    case "linux":
      return <Linux width="1.5em" height="1.5em" />;
    case "android":
      return <SiAndroid size="1.5em" width="1.5em" height="1.5em" />;
    case "ios":
      return <SiIos size="1.5em" width="1.5em" height="1.5em" />;
    default:
      return <Default />;
  }
}
