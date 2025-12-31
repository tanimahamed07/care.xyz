// import Footer from "@/components/common/Footer";
// import Navbar from "@/components/common/Navbar";

// import React from "react";

// const layout = ({ children }) => {
//   return (
//     <div>
//
//       <div className="min-h-[90vh]">{children}</div>
//       <Footer />
//     </div>
//   );
// };

// export default layout;

import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import '../../src/app/globals.css'
// import "../../../src/app/globals.css";
import "./globals.css";
import Providers from "@/providers";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </Providers>
  );
}
