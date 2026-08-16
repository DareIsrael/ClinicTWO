// layout.js - Completely redesigned with red Theme
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";


// Import Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Metadata
export const metadata = {
  title: "Trim medical centre - Your Health Partner",
  description: "Book appointments with healthcare professionals easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/TrimLOGO11.svg" />
        {/* IMPORTANT: Viewport meta tag for proper mobile scaling */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes, viewport-fit=cover"
        />
        {/* Prevent layout shifts on mobile */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider>
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen bg-white overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </LanguageProvider>

        </SessionProvider>
      </body>
    </html>
  );
}

