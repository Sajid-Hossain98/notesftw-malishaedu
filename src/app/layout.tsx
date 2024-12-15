import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const lightAvenir = localFont({
  src: "../app/fonts/Avenir-LT-W01-65-Medium-Book.woff",
});

export const metadata: Metadata = {
  title: "Notes For The Win :)",
  description:
    "It is an application that will be helpful to quickly check for any notes/guidance to apply in different universities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "bg-[#0b2c24] text-[#edf2f4] w-[92vw] mx-auto h-screen overflow-hidden",
            geistSans.className,
            lightAvenir.className
          )}
          suppressHydrationWarning={true}
        >
          <Header>{children}</Header>
        </body>
      </html>
    </ClerkProvider>
  );
}
