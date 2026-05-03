


// // app/productDetails/page.js
// import { Suspense } from 'react';
// import ProductDetailsClient from './ProductDetailsClient';

// // Since we're using static export (output: 'export'), we cannot use generateMetadata with searchParams
// // The metadata will be handled client-side by the MetadataUpdater component
// // This page.js is intentionally kept simple

// // Loading fallback component
// function ProductDetailsLoading() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 max-w-7xl py-8 mt-16">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             <div className="lg:col-span-5">
//               <div className="bg-gray-200 rounded-xl h-[500px]"></div>
//             </div>
//             <div className="lg:col-span-7 space-y-4">
//               <div className="h-8 bg-gray-200 rounded w-3/4"></div>
//               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//               <div className="h-20 bg-gray-200 rounded"></div>
//               <div className="h-40 bg-gray-200 rounded"></div>
//               <div className="h-32 bg-gray-200 rounded"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main page component with Suspense for loading state
// export default function ProductDetailsPage() {
//   return (
//     <Suspense fallback={<ProductDetailsLoading />}>
//       <ProductDetailsClient />
//     </Suspense>
//   );
// }

// app/productDetails/page.js
import { Suspense } from 'react';
import ProductDetailsClient from './ProductDetailsClient';

// Since we're using static export (output: 'export'), we cannot use generateMetadata with searchParams
// The metadata will be handled client-side by the MetadataUpdater component
// This page.js is intentionally kept simple

// Loading fallback component
function ProductDetailsLoading() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="container mx-auto px-4 max-w-7xl py-8 mt-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="bg-gray-200 rounded-xl h-[500px]"></div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense for loading state
export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<ProductDetailsLoading />}>
      <ProductDetailsClient />
    </Suspense>
  );
}