


// // app/privacy-policy/page.js
// import PrivacyPolicyClient from './PrivacyPolicyClient';

// // Metadata for Privacy Policy page
// export const metadata = {
//   title: "Privacy Policy - Data Protection & Security",
//   description: "Read Asian Clothify's privacy policy. Learn how we collect, use, and protect your business information. We prioritize your privacy and data security.",
//   keywords: [
//     "privacy policy",
//     "data protection",
//     "asian clothify privacy",
//     "information security",
//     "cookie policy",
//     "data collection",
//     "business privacy",
//     "bangladesh clothing privacy",
//     "user rights"
//   ],
//   openGraph: {
//     title: "Privacy Policy - Asian Clothify | Data Protection",
//     description: "Learn how Asian Clothify protects your privacy and business information. Read our comprehensive privacy policy.",
//     url: "https://asianclothify.com/privacy-policy",
//     siteName: "Asian Clothify",
//     images: [
//       {
//         url: "/privacy-og.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Asian Clothify Privacy Policy"
//       }
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Privacy Policy - Asian Clothify",
//     description: "Your privacy matters. Read our comprehensive privacy policy to understand how we protect your information.",
//     images: ["/privacy-og.jpg"],
//     site: "@asianclothify",
//   },
//   alternates: {
//     canonical: "/privacy-policy"
//   },
//   robots: {
//     index: true,
//     follow: true,
//   }
// };

// // Simple server component that renders the client component
// export default function PrivacyPolicyPage() {
//   return <PrivacyPolicyClient />;
// }


// app/privacy-policy/page.js
import PrivacyPolicyClient from './PrivacyPolicyClient';

// Metadata for Privacy Policy page - Jute Craftify
export const metadata = {
  title: "Privacy Policy - Data Protection & Security",
  description: "Read Jute Craftify's privacy policy. Learn how we collect, use, and protect your business information. We prioritize your data security and confidentiality in all B2B transactions.",
  keywords: [
    "privacy policy",
    "data protection",
    "jute craftify privacy",
    "information security",
    "cookie policy",
    "data collection",
    "B2B privacy policy",
    "Bangladesh jute privacy",
    "user rights",
    "GDPR compliance",
    "business data protection",
    "confidentiality policy"
  ],
  openGraph: {
    title: "Privacy Policy - Jute Craftify | Data Protection & Security",
    description: "Learn how Jute Craftify protects your privacy and business information. Read our comprehensive privacy policy for B2B transactions.",
    url: "https://jutecraftify.com/privacy-policy",
    siteName: "Jute Craftify",
    images: [
      {
        url: "/privacy-og.jpg",
        width: 1200,
        height: 630,
        alt: "Jute Craftify Privacy Policy - Data Protection"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Jute Craftify",
    description: "Your privacy matters. Read our comprehensive privacy policy to understand how we protect your business information.",
    images: ["/privacy-og.jpg"],
    site: "@JuteCraftify",
  },
  alternates: {
    canonical: "/privacy-policy"
  },
  robots: {
    index: true,
    follow: true,
  }
};

// Simple server component that renders the client component
export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}