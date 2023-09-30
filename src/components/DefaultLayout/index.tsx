"use client";

import Navbar from "../Navbar";

export default function DefaultLayout({ children }: any) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-1 mt-14 lg:mt-20 flex flex-1 flex-col justify-center items-center w-full mx-auto lg:max-w-7xl">
        {children}
      </main>
      <footer className="flex flex-1 py-8 mt-20 border-t border-gray-300/30 justify-between items-center">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center grow"
        >
          Powered by{" "}
          <span className="ml-2">
            <img src="/logo_mini.svg" alt="GamingDex" width={24} height={24} />
          </span>
        </a>
      </footer>
    </>
  );
}
