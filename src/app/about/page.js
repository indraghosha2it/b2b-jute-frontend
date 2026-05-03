


// // app/about/page.jsx
// import AboutClient from './AboutClient';

// // Metadata for About page
// export const metadata = {
//   title: "About Us ",
//   description: "Learn about Asian Clothify, a top clothing seller in Bangladesh. With 8+ years of experience, we provide premium wholesale clothing to global markets. Trusted by 500+ active clients worldwide.",
//   keywords: [
//     "about asian clothify",
//     "clothing Shop bangladesh",
//     "wholesale clothing company",
//     "b2b clothing supplier",
//     "bangladesh garment factory",
//     "top clothing seller bangladesh"
//   ],
//   openGraph: {
//     title: "About Asian Clothify - Leading Wholesale Clothing Manufacturer",
//     description: "Discover our story, values, and commitment to quality. Leading B2B clothing supplier from Bangladesh serving global markets since 2016.",
//     images: ['/about-og.jpg'],
//     url: "https://asianclothify.com/about",
//     siteName: "Asian Clothify",
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "About Asian Clothify - Wholesale Clothing Manufacturer",
//     description: "Leading B2B clothing supplier from Bangladesh. 8+ years of excellence, 500+ clients worldwide.",
//     images: ['/about-og.jpg'],
//     site: "@asianclothify",
//   },
//   alternates: {
//     canonical: "/about"
//   },
//   robots: {
//     index: true,
//     follow: true,
//   }
// };

// // Simple server component that renders the client component
// export default function AboutPage() {
//   return <AboutClient />;



// }



// app/about/page.jsx
import AboutClient from './AboutClient';

// Metadata for About page - Jute Craftify
export const metadata = {
  title: "About Us - Jute Products Manufacturer from Bangladesh",
  description: "Jute Craftify: Eco-friendly jute products manufacturer from Bangladesh. Handcrafted with tradition, designed for global markets. Sustainable, ethical, and quality-driven since 2023. Trusted supplier for bulk jute orders worldwide.",
  keywords: [
    "about jute craftify",
    "jute manufacturer Bangladesh",
    "eco-friendly jute company",
    "jute products supplier",
    "sustainable jute manufacturing",
    "Bangladesh jute industry",
    "handcrafted jute products",
    "ethical jute sourcing",
    "jute craft Bangladesh",
    "wholesale jute supplier"
  ],
  openGraph: {
    title: "About Jute Craftify - Your Sustainable Jute Supply Partner",
    description: "Discover our story, craftsmanship, and commitment to sustainability. Leading eco-friendly jute products manufacturer from Bangladesh serving global B2B buyers.",
    images: ['/about-og.jpg'],
    url: "https://jutecraftify.com/about",
    siteName: "Jute Craftify",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Jute Craftify - Sustainable Jute Products from Bangladesh",
    description: "Handcrafted jute products with traditional Bangladeshi craftsmanship. Eco-friendly, sustainable, and built for global markets. Request a quote for bulk orders.",
    images: ['/about-og.jpg'],
    site: "@JuteCraftify",
  },
  alternates: {
    canonical: "/about"
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Simple server component that renders the client component
export default function AboutPage() {
  return <AboutClient />;
}