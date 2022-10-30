import { BASE_URL } from "@/settings";
import { NextSeo } from "next-seo";

export function SEO({
  title,
  description,
  slug,
  cover,
}: {
  title: string;
  description: string;
  slug: string;
  cover: string;
}) {
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        url: `${BASE_URL}/${slug}`,
        description,
        images: [
          {
            url: cover,
            alt: title,
          },
        ],
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  );
}
