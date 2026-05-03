// app/terms/page.js
import TermsClient from './TermsClient';

// Metadata for Terms & Conditions page - Jute Craftify
export const metadata = {
  title: "Terms & Conditions - Legal Agreement",
  description: "Read the terms and conditions of Jute Craftify, a premium jute products supplier from Bangladesh. Understand our policies on bulk orders, RFQ process, pricing, shipping, user roles, and legal agreements for our B2B jute platform.",
  keywords: [
    "terms and conditions",
    "jute craftify terms",
    "B2B jute platform terms",
    "legal agreement",
    "user obligations",
    "RFQ process",
    "bulk order policy",
    "shipping terms",
    "payment terms",
    "Bangladesh jute terms",
    "wholesale terms",
    "custom manufacturing terms",
    "export terms",
    "MOQ policy"
  ],
  openGraph: {
    title: "Terms & Conditions - Jute Craftify B2B Platform",
    description: "Review our terms and conditions. Learn about bulk order policies, RFQ process, pricing, shipping terms, and legal agreements for using Jute Craftify's jute products platform.",
    url: "https://jutecraftify.com/terms",
    siteName: "Jute Craftify",
    images: [
      {
        url: "/terms-og.jpg",
        width: 1200,
        height: 630,
        alt: "Jute Craftify Terms & Conditions"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions - Jute Craftify",
    description: "Review our terms and conditions for using Jute Craftify's B2B jute products platform.",
    images: ["/terms-og.jpg"],
    site: "@JuteCraftify",
  },
  alternates: {
    canonical: "/terms"
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Simple server component that renders the client component
export default function TermsPage() {
  return <TermsClient />;
}