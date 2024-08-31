import { TooltipProvider } from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://davidpescariu.com"),
  title: "David Pescariu",
  description:
    "Hi there! 👋 I'm David - a software engineer that strives for perfection while building products that scale alongside your business.",
  authors: [{ name: "David Pescariu", url: "https://davidpescariu.com" }],
  robots: "index, follow",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://davidpescariu.com",
    title: "David Pescariu",
    description: "Hi there! 👋",
    siteName: "David Pescariu",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "David Pescariu - Portfolio",
      },
    ],
  },
  twitter: {
    creator: "@DPescariu",
    card: "summary_large_image",
    description: "Hi there! 👋",
    images: [{ url: "/og.jpg", alt: "David Pescariu - Portfolio" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={workSans.className}>
        <TooltipProvider>{children}</TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
