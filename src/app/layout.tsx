import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "block",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Automart",
  description: "Automart is a car inventory app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.className} data-theme="light">
      <body>
        <div className="navbar bg-base-300">
          <button className="btn btn-ghost text-xl">automart</button>
        </div>
        {children}
      </body>
    </html>
  );
}
