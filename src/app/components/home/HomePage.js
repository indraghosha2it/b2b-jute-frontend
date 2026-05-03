import React from 'react'
import HeroBanner from './HeroBanner.js'
import ScrollingLogos from './ScrollingLogos.js'
import WhyChooseUs from './WhyChooseUs.js'
import ManufacturingSupplyChain from './ManufacturingSupplyChain.js'
import FeaturedProducts from './FeaturedProducts.js'
import Newsletter from './Newsletter.js'
import Categories from './Categories.js'
import AlibabaTrustSection from './AlibabaTrustSection.js'

import Navbar from '../layout/Navbar.js'
import Footer from '../layout/Footer.js'

import ReviewsSection from './ReviewsSection.js'
import StatsSection from './StatsSection.js'
import WhatsAppButton from '../layout/WhatsAppButton.js'
import CTASection from './CTASection.js'
import TrustCertifications from './TrustCertifications.js'


export default function HomePage() {
  return (
     <>
     <Navbar />
      <HeroBanner />

      {/* <ScrollingLogos /> */}
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
      <ManufacturingSupplyChain />
      
      
     
           <AlibabaTrustSection /> 
           {/* <StatsSection/> */}
      <TrustCertifications />
            <ReviewsSection />
              <CTASection />
           <Footer />
<WhatsAppButton />
    </>
  )
}


// 'use client';

// import React from 'react';
// import HeroBanner from './HeroBanner.js';
// import ScrollingLogos from './ScrollingLogos.js';
// import WhyChooseUs from './WhyChooseUs.js';
// import ManufacturingSupplyChain from './ManufacturingSupplyChain.js';
// import FeaturedProducts from './FeaturedProducts.js';
// import Newsletter from './Newsletter.js';
// import Categories from './Categories.js';
// import AlibabaTrustSection from './AlibabaTrustSection.js';
// import Navbar from '../layout/Navbar.js';
// import Footer from '../layout/Footer.js';
// import ReviewsSection from './ReviewsSection.js';
// import StatsSection from './StatsSection.js';
// import WhatsAppButton from '../layout/WhatsAppButton.js';

// import PromotionalModal, { usePromotionalModal } from '../PromotionalModal.js';
// import { Loader2 } from 'lucide-react';
// import CTASection from './CTASection.js';
// // import PromotionalModal, { usePromotionalModal } from '../components/PromotionalModal.js';

// export default function HomePage() {
//   const { showModal, modalProducts, isLoading, handleModalClose } = usePromotionalModal();

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-12 h-12 animate-spin text-[#6B4F3A] mx-auto mb-4" />
//             <p className="text-gray-600">Loading amazing offers...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <HeroBanner />
//       <Categories />
//       <FeaturedProducts />
//       <WhyChooseUs />
//       <ManufacturingSupplyChain />
//       <AlibabaTrustSection />
//       <ReviewsSection />
//       <CTASection />
//       <Footer />
//       <WhatsAppButton />

//       {/* Promotional Modal */}
//       {showModal && modalProducts.length > 0 && (
//         <PromotionalModal 
//           products={modalProducts} 
//           onClose={handleModalClose} 
//         />
//       )}
//     </>
//   );
// }

