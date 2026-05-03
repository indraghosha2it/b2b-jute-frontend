


// import { Suspense } from 'react';
// import ProductsClient from './ProductsClient';

// // Loading fallback component
// function ProductsLoading() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="mt-16 container mx-auto px-4 max-w-7xl py-6 md:py-8">
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//           {[...Array(12)].map((_, index) => (
//             <div key={index} className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
//               <div className="h-36 sm:h-52 bg-gray-200"></div>
//               <div className="p-2 sm:p-5">
//                 <div className="h-3 sm:h-6 bg-gray-200 rounded mb-1 sm:mb-2"></div>
//                 <div className="h-4 sm:h-8 bg-gray-200 rounded mb-1 sm:mb-3 w-1/2"></div>
//                 <div className="h-2 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-4"></div>
//                 <div className="h-6 sm:h-10 bg-gray-200 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export const metadata = {
//   title: "Products - Wholesale Collection",
//   description: "Browse our extensive collection of wholesale clothing. Find the perfect products for your business.",
//   keywords: ["wholesale products", "bulk clothing", "fashion wholesale"],
//   openGraph: {
//     title: "Products Collection - Asian Clothify",
//     description: "Explore our wholesale clothing collection",
//     images: ['/products-og.jpg'],
//   },
// };

// // Server component with Suspense
// export default function ProductsPage() {
//   return (
//     <Suspense fallback={<ProductsLoading />}>
//       <ProductsClient />
//     </Suspense>
//   );
// }



import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

// Loading fallback component
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="mt-16 container mx-auto px-4 max-w-7xl py-6 md:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-[#F5E6D3] animate-pulse">
              <div className="h-36 sm:h-52 bg-gray-200"></div>
              <div className="p-2 sm:p-5">
                <div className="h-3 sm:h-6 bg-gray-200 rounded mb-1 sm:mb-2"></div>
                <div className="h-4 sm:h-8 bg-gray-200 rounded mb-1 sm:mb-3 w-1/2"></div>
                <div className="h-2 sm:h-4 bg-gray-200 rounded mb-2 sm:mb-4"></div>
                <div className="h-6 sm:h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Premium Jute Products - Eco-Friendly",
  description: "Browse our extensive collection of premium jute products. Raw jute fiber, jute bags, home decor, industrial products. Bulk orders available for global buyers. Wholesale pricing.",
  keywords: [
    "jute products", 
    "jute bags wholesale", 
    "raw jute fiber", 
    "jute home decor", 
    "eco-friendly products", 
    "sustainable jute", 
    "bulk jute order", 
    "jute supplier Bangladesh",
    "jute yarn",
    "jute twine",
    "jute rugs",
    "jute mats",
    "industrial jute",
    "woven jute products"
  ],
  openGraph: {
    title: "Premium Jute Products Collection - Jute Craftify",
    description: "Explore our sustainable jute product collection. Raw materials, finished goods, and custom manufacturing for bulk buyers.",
    images: ['/products-og.jpg'],
    type: 'website',
    locale: 'en_US',
    siteName: 'Jute Craftify',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jute Craftify Products - Eco-Friendly Jute Collection",
    description: "Browse our premium jute products. Available for bulk orders worldwide.",
    images: ['/products-og.jpg'],
  },
  alternates: {
    canonical: '/products',
  },
};

// Server component with Suspense
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClient />
    </Suspense>
  );
}