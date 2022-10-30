import { BASE_URL } from "@/settings";

export const DEFAULT_SEO = {
  title: "GamingDex",
  description:
    "GamingDex is a community of gamers who want to share their gaming experiences.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    site_name: "GamingDex",
    images: [
      {
        url: `${BASE_URL}/static/gamingdex.png`,
        alt: "GamingDex",
      },
    ],
  },
  twitter: {
    handle: "@gamingdex",
    site: "@gamingdex",
    cardType: "summary_large_image",
  },
};
