import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* 🔥 METADATA */
export const metadata = {
  title: "Home", 
  description: "Welcome to Care.xyz - Your trusted platform for booking reliable caregivers for children, elderly, and special needs at home.",
  openGraph: {
    title: "Care.xyz | Trusted Caregiving Services",
    description: "Easily find and book reliable caregivers for your loved ones. Safe, simple, and accessible care services.",
    images: [
      {
        url: "/banner-og.png", 
        width: 1200,
        height: 630,
        alt: "Care.xyz Home - Trusted Care Platform",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
