import "react-mde/lib/styles/css/react-mde-all.css";
import "tippy.js/dist/tippy.css"; // optional
import "../../styles/globals.scss";

import DefaultLayout from "@/components/DefaultLayout";
import Providers from "../providers";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader showSpinner={false} />
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
