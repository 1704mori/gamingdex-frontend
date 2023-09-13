import "react-mde/lib/styles/css/react-mde-all.css";
import "tippy.js/dist/tippy.css"; // optional
import "../../styles/globals.scss";

import DefaultLayout from "@/components/DefaultLayout";
import Providers from "../providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
