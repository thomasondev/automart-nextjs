import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";

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
          <Link href="/" className="btn btn-ghost text-xl">
            automart
          </Link>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/inventory">Inventory</Link>
              </li>
              <li>
                <Link href="/locations">Locations</Link>
              </li>
            </ul>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
