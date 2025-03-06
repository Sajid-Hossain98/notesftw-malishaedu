import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { ModalProvider } from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/QueryProviders";

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
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  // themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "Sajid Hossain",
      url: "https://github.com/Sajid-Hossain98",
    },
  ],
  // viewport:
  //   "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/Logo-128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
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
          className="relative text-zinc-300 overflow-hidden bg-[url('/static/bg-gradient-img.svg')] bg-no-repeat bg-cover bg-top"
          suppressHydrationWarning={true}
        >
          <div className="absolute inset-0 md:bg-black/30 bg-black/15 -z-10" />
          <div
            className={cn(
              "w-[92vw] mx-auto h-[100dvh]",
              geistSans.className,
              lightAvenir.className
            )}
          >
            <ModalProvider />
            <QueryProvider>
              <Header>{children}</Header>
            </QueryProvider>
            <Toaster theme="system" richColors offset={50} />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
