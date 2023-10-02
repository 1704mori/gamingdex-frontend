"use client";

import { resolvePromise } from "@/lib/helpers/common";
import { authService } from "@/lib/services/auth";
import { userAtom } from "@/lib/stores/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const logic = async () => {
      if (!user || !user?.id || !authService.getToken()) {
        const [me, err] = await resolvePromise(authService.me())

        if (err) {
          authService.logout();
          setUser(null);
          return
        }

        setUser(me.attributes)
      };
    }
    logic()
  }, [user, setUser])

  return (
    <>
      <Toaster richColors expand position="top-right" toastOptions={{
        style: {
          background: "var(--accent)",
          color: "var(--text)",
          borderColor: "var(--accent3)",
          fontFamily: "Poppins",
          fontWeight: 600,
        }
      }} />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
