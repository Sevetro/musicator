import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { Toaster } from "react-hot-toast";

import { Navbar } from "./_components/navbar";
import Providers from "@/providers";
import { Footer } from "./_components/footer";

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

          <Toaster position="top-right" />

          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
