"use client";

import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main className="h-full w-full main !mt-16 flex-1">{children}</main>
      <Footer />
    </>
  );
}
