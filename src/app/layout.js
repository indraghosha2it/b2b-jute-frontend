



// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import LayoutContent from "./components/layout/LayoutContent";

import ScrollToTop from "./components/layout/ScrollToTop";
import PromotionalModalWrapper from "./components/PromotionalModalWrapper";
import NewsletterPopup from "./components/NewsletterPopup";
import UnifiedPopupManager from "./components/UnifiedPopupManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default metadata for the entire site
export const metadata = {
  title: {
    default: "Jute Craftify || Premium Eco-Friendly Jute Products from Bangladesh",
    template: "%s || Jute Craftify"
  },
  description: "Premium jute products supplier from Bangladesh. Eco-friendly bags, home decor, raw jute fiber, and custom manufacturing. Bulk orders for global buyers. Sustainable & handcrafted.",
  keywords: [
    "jute products", 
    "jute bags", 
    "eco-friendly products", 
    "jute supplier Bangladesh", 
    "bulk jute order", 
    "custom jute manufacturing", 
    "OEM jute products",
    "sustainable packaging",
    "jute home decor",
    "jute fiber",
    "B2B jute supplier",
    "wholesale jute",
    "natural fiber products",
    "biodegradable products",
    "jute craft Bangladesh"
  ],
  authors: [{ name: "Jute Craftify" }],
  creator: "Jute Craftify",
  publisher: "Jute Craftify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Jute Craftify - Premium Eco-Friendly Jute Products from Bangladesh",
    description: "Your end-to-end sustainable jute supply partner. Raw jute fiber, jute bags, home decor, and custom manufacturing. Bulk orders | Global export | OEM/ODM services",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    siteName: "Jute Craftify",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jute Craftify - Premium Jute Products from Bangladesh',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jute Craftify - Sustainable Jute Products",
    description: "Premium jute products supplier from Bangladesh. Eco-friendly, handcrafted, and globally exported. Request a quote for bulk orders.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  category: "business",
  classification: "B2B Jute Products Manufacturing & Export",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" data-theme="light" style={{ colorScheme: 'light' }}>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>{`
          :root {
            color-scheme: light only;
          }
        `}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
      >
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={true}
          duration={4000}
          theme="light"
        />
      
        <ScrollToTop />
        {/* <PromotionalModalWrapper />
          <NewsletterPopup /> */}
          <UnifiedPopupManager />
      </body>
    </html>
  );
}


