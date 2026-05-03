


// // app/contact/page.js

// import ContactClient from "./ContactClient";
// // Metadata for Contact page
// export const metadata = {
//   title: "Contact us - Clothing Inquiries",
//   description: "Get in touch with Asian Clothify for wholesale clothing inquiries. Quick response within 2 hours. Call, email, or visit our facility in Savar, Dhaka, Bangladesh.",
//   keywords: [
//     "contact asian clothify",
//     "wholesale clothing inquiry",
//     "b2b clothing contact",
//     "clothing manufacturer bangladesh contact",
//     "bulk order inquiry",
//     "custom clothing manufacturing contact"
//   ],
//   openGraph: {
//     title: "Contact Asian Clothify - Clothing Inquiries",
//     description: "Reach out to us for wholesale clothing orders. Quick response within 2 hours. Phone: +8801305-785685 | Email: info@asianclothify.com",
//     url: "https://asianclothify.com/contact",
//     siteName: "Asian Clothify",
//     images: [
//       {
//         url: "/contact-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Contact Asian Clothify - Wholesale Clothing"
//       }
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Contact Asian Clothify - Wholesale Clothing Inquiries",
//     description: "Get quick quotes for bulk clothing orders. Response within 2 hours.",
//     images: ["/contact-og.jpg"],
//     site: "@asianclothify",
//   },
//   alternates: {
//     canonical: "/contact"
//   },
//   robots: {
//     index: true,
//     follow: true,
//   }
// };

// // Simple server component that renders the client component
// export default function ContactPage() {
//   return <ContactClient />;
// }


// app/contact/page.js
import ContactClient from "./ContactClient";

// Metadata for Contact page - Jute Craftify
export const metadata = {
  title: "Contact Us - Request Quote for Jute Products",
  description: "Get in touch with Jute Craftify for premium jute product inquiries. Bulk orders, custom manufacturing, and global shipping. Response within 24 hours. Contact our B2B sales team.",
  keywords: [
    "contact jute craftify",
    "jute products inquiry",
    "bulk jute order bangladesh",
    "jute manufacturer contact",
    "wholesale jute supplier",
    "custom jute manufacturing",
    "jute bag quote",
    "eco-friendly products inquiry",
    "jute export Bangladesh",
    "RFQ jute products"
  ],
  openGraph: {
    title: "Contact Jute Craftify - Request a Quote for Jute Products",
    description: "Looking for premium jute products? Contact our B2B sales team for bulk orders, custom manufacturing, and global shipping. Quick response guaranteed.",
    url: "https://jutecraftify.com/contact",
    siteName: "Jute Craftify",
    images: [
      {
        url: "/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Jute Craftify - Premium Jute Products from Bangladesh"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Jute Craftify - Bulk Jute Product Inquiries",
    description: "Get quotes for wholesale jute orders. Custom manufacturing available. Global shipping. Response within 24 hours.",
    images: ["/contact-og.jpg"],
    site: "@JuteCraftify",
  },
  alternates: {
    canonical: "/contact"
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Simple server component that renders the client component
export default function ContactPage() {
  return <ContactClient />;
}