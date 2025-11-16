import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { ModalProvider } from "@/components/providers/modal-provider";
import QueryProvider from "@/components/providers/QueryProviders";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
  keywords: ["notes", "nextjs13", "next13", "pwa", "next-pwa"],
  authors: [
    {
      name: "Sajid Hossain",
      url: "https://github.com/Sajid-Hossain98",
    },
  ],

  icons: [
    { rel: "apple-touch-icon", url: "icons/Logo-128.png" },
    { rel: "icon", url: "icons/favicon.png" },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1E8A65" },
    { media: "(prefers-color-scheme: light)", color: "#0F5037" },
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
          className="relative dark:text-zinc-300 text-[#1A1A1A] overflow-hidden dark:bg-[url('/static/bg-gradient-img.svg')] dark:bg-no-repeat dark:bg-cover dark:bg-top bg-zinc-200/80"
          suppressHydrationWarning={true}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey="notesftw-theme"
            enableSystem
            disableTransitionOnChange
          >
            <div className="absolute inset-0 dark:md:bg-black/30 dark:bg-black/15 -z-10" />
            <div
              className={cn(
                "w-[92vw] mx-auto h-[100dvh]",
                geistSans.className,
                lightAvenir.className
              )}
            >
              <QueryProvider>
                <ModalProvider />
                <Header className="h-full">{children}</Header>
              </QueryProvider>
              <Toaster theme="system" richColors offset={50} />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
