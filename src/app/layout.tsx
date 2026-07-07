import type { Metadata } from "next";
import { Bungee, Nunito } from 'next/font/google';
import "@/app/globals.css";

const bungee = Bungee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bungee',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: "KPopPulls - Collect Your Favorite K-Pop Idols",
  description: "Pull and collect your favorite K-Pop idols in this gacha game",
  metadataBase: new URL('https://kpoppulls.vercel.app'),
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/logo.ico", sizes: "48x48" },
    ],
    shortcut: "/images/favicon-48.png",
    apple: "/images/apple-icon.png",
  },
  openGraph: {
    title: "KPopPulls - Collect Your Favorite K-Pop Idols",
    description: "Pull and collect your favorite K-Pop idols in this gacha game",
    url: "https://kpoppulls.vercel.app",
    siteName: "KPop Pulls",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KPopPulls - Collect Your Favorite K-Pop Idols",
    description: "Pull and collect your favorite K-Pop idols in this gacha game",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/images/gacha-machine.png"
          as="image"
          type="image/png"
        />
      </head>
      <body
        className={`${bungee.variable} ${nunito.variable} font-nunito antialiased retro-bg`}
      >
        {children}
      </body>
    </html>
  );
}
