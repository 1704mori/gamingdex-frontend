import { useRouter } from "next/router";
import en from "../../locales/en-US";
import ja from "../../locales/ja";

export const useLocale = () => {
  const { locale } = useRouter();
  const t = locale === "en-US" ? en : ja;
  return { locale, t };
};
