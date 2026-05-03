

// // app/blog/page.js

// import BlogClient from './BlogClient';

// // Metadata for Blog page
// export const metadata = {
//   title: "Fashion Insights Blog - Clothing Tips & Trends",
//   description: "Expert fashion insights, clothing tips, industry trends, and business guides for fashion retailers. Stay updated with the latest in fashion from Asian Clothify, a top clothing seller in Bangladesh offering stylish, high-quality apparel with a focus on craftsmanship and affordability.",
//   keywords: [
//     "fashion blog",
//     "clothing tips",
//     "fashion trends",
//     "clothing industry news",
//     "fashion business tips",
//     "fashion insights",
//     "fashion blog",
//     "clothing guide",
//     "fashion business tips",
//     "Asian Clothify blog",
//     "Bangladesh clothing blog",
//     "fashion trends"
//   ],
//   openGraph: {
//     title: "Fashion Insights Blog - Clothing Tips & Trends",
//     description: "Expert fashion insights, clothing tips, and industry trends. Stay updated with Asian Clothify, a top clothing seller in Bangladesh offering stylish, high-quality apparel for global markets.",
//     url: "https://asianclothify.com/blog",
//     siteName: "Asian Clothify",
//     images: [
//       {
//         url: "/blog-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Asian Clothify Fashion Blog - Clothing Insights"
//       }
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Fashion Insights Blog - Clothing Tips & Trends",
//     description: "Expert fashion insights, clothing tips, and industry trends from Asian Clothify.",
//     images: ["/blog-og.jpg"],
//     site: "@asianclothify",
//   },
//   alternates: {
//     canonical: "/blog"
//   },
//   robots: {
//     index: true,
//     follow: true,
//   }
// };

// // Simple server component that renders the client component
// export default function BlogPage() {
//   return <BlogClient />;
// }


// app/blog/page.js

import BlogClient from './BlogClient';

// Metadata for Blog page - Jute Craftify
export const metadata = {
  title: "Jute Craftify Insights - Sustainable Products Blog & News",
  description: "Expert insights on jute products, sustainable manufacturing, eco-friendly alternatives, and B2B industry trends. Stay updated with Jute Craftify, a premium jute products supplier from Bangladesh offering sustainable, handcrafted solutions for global markets.",
  keywords: [
    "jute industry blog",
    "sustainable products news",
    "eco-friendly insights",
    "jute manufacturing trends",
    "B2B jute market",
    "sustainability blog",
    "jute products guide",
    "eco-friendly packaging trends",
    "Bangladesh jute industry",
    "natural fiber products",
    "sustainable business practices",
    "jute craft insights",
    "green manufacturing",
    "biodegradable products news"
  ],
  openGraph: {
    title: "Jute Industry Insights - Sustainable Products Blog",
    description: "Expert insights on jute products, sustainable manufacturing, and industry trends. Stay updated with Jute Craftify, your premium jute products partner from Bangladesh.",
    url: "https://jutecraftify.com/blog",
    siteName: "Jute Craftify",
    images: [
      {
        url: "/blog-og.jpg",
        width: 1200,
        height: 630,
        alt: "Jute Craftify Blog - Sustainable Jute Industry Insights"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jute Industry Insights - Sustainable Products Blog",
    description: "Expert insights on jute products, sustainable manufacturing, and B2B industry trends.",
    images: ["/blog-og.jpg"],
    site: "@JuteCraftify",
  },
  alternates: {
    canonical: "/blog"
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Simple server component that renders the client component
export default function BlogPage() {
  return <BlogClient />;
}