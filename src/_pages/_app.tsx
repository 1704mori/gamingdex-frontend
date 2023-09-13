import "react-mde/lib/styles/css/react-mde-all.css";
import "tippy.js/dist/tippy.css"; // optional
import "../styles/globals.scss";
import type { AppType } from "next/app";
import { ThemeProvider } from "next-themes";
import DefaultLayout from "../components/DefaultLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "../components/Notification";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const getLayout =
    (Component as any).getLayout ||
    ((page: any) => {
      return <DefaultLayout>{page}</DefaultLayout>;
    });

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <SessionProvider>
          <ThemeProvider attribute="class" themes={['light', 'dark', 'dim']}>
            {getLayout(<Component {...pageProps} />)}
            {/* <Layout>
              <Component {...pageProps} />
            </Layout> */}
          </ThemeProvider>
        </SessionProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
