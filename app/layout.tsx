import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";

import { Providers } from "@/components/Providers/Providers";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Flow",
  description: "Fast food ordering across your favorite shops",
  metadataBase: new URL("https://food-flow-psi.vercel.app/"),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Food Flow",
    description: "Fast food ordering across your favorite shops",
    url: "https://food-flow-psi.vercel.app/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Food Flow",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${sourceSans.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
