"use client";

import { Toaster } from "sonner";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Toaster theme="dark" richColors expand position="top-right" />
        <div className="flex flex-col items-center justify-center min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
