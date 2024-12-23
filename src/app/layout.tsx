import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const lightAvenir = localFont({
  src: "../app/fonts/Avenir-LT-W01-65-Medium-Book.woff",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // icons: [
  //   {
  //     media: "(prefers-color-scheme: light)",
  //     url: "/logo-dark.svg",
  //     href: "/logo-dark.svg",
  //   },
  //   {
  //     media: "(prefers-color-scheme: dark)",
  //     url: "/logo-light.svg",
  //     href: "/logo-light.svg",
  //   },
  // ],
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
            "bg-[#0b2c24] text-[#edf2f4] w-[92vw] mx-auto h-[100dvh] overflow-hidden",
            geistSans.className,
            lightAvenir.className
          )}
          suppressHydrationWarning={true}
        >
          <Header>{children}</Header>
          <Toaster theme="system" richColors offset={50} />
        </body>
      </html>
    </ClerkProvider>
  );
}
