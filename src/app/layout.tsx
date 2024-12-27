import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

import { Navbar } from "./_components/navbar";
import Providers from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Musicator",
  description: "Your online sequencer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //TODO: dynamic theme
    <html lang="en" data-theme="dark">
      <body
        className={twMerge(
          inter.className,
          "flex h-screen flex-col overflow-hidden",
        )}
      >
        <Providers>
          <Navbar />

          {children}

          <div className="absolute bottom-1 right-4">
            Version <b>1.0.0</b> made by{" "}
            <a href="https://github.com/Sevetro" target="_blank">
              <b>Łukasz Gil</b>
            </a>
          </div>
        </Providers>
      </body>
    </html>
  );
}
