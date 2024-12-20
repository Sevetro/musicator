import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      <body className={inter.className}>
        <>
          {children}
          <div className="absolute bottom-1 right-1">
            Version <b>1.0.0</b> made by <b>Łukasz Gil</b>
          </div>
        </>
      </body>
    </html>
  );
}
