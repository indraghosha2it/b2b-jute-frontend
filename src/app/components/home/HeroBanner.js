'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Product showcase images
  const productImages = [
    {
      url: "https://i.ibb.co.com/C3m0HNW2/mediterranean-aesthetics-bag-still-life.jpg",
      name: "Premium Jute Bags",
      category: "Shopping & Tote"
    },
    {
      url: "https://i.ibb.co.com/rhs0mbn/Home-pages.jpg",
      name: "Raw Jute Fiber",
      category: "Industrial Grade"
    },
    {
      url: "https://i.ibb.co.com/LhvmZfgc/91-CPUL-e-ES.jpg",
      name: "Jute Rugs & Mats",
      category: "Home Decor"
    },
    {
      url: "https://i.ibb.co.com/Hs6Ch96/thread-fabric-high-angle.jpg",
      name: "Jute Yarn & Twine",
      category: "Eco-Friendly"
    },
  ];

  // Scroll to CTA section function
const scrollToQuoteSection = () => {
  const quoteSection = document.getElementById('request-quote');
  if (quoteSection) {
    quoteSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate images every 4 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mt-16 min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Natural Jute Texture */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/nqZZx5Pn/asian-market-bamboo-wicker-baskets.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Simple Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8 lg:gap-12">
          
          {/* LEFT SIDE - Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Trust Badge */}
            <div 
              className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 mb-3 border border-white/20 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3A7D44] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3A7D44]"></span>
              </span>
              <span className="text-[#F5E6D3] text-xs font-medium tracking-wide">
                🌾 Made in Bangladesh | Trusted Global Supplier
              </span>
            </div>

            {/* Main Headline - Smaller on mobile */}
         <h1 
  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 md:mb-3 leading-tight transition-all duration-700 delay-100 font-serif ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
  style={{ fontFamily: 'Playfair Display, Georgia, Times New Roman, serif' }}
>
  Premium Jute Products
  <br />
  <span className="relative inline-block mt-0.5">
    Supplier from Bangladesh
    <svg 
      className="absolute -bottom-1 left-0 w-full h-1.5 md:h-2 text-[#3A7D44]" 
      viewBox="0 0 400 20" 
      fill="currentColor"
      preserveAspectRatio="none"
    >
      <path d="M0,10 C50,20 100,0 150,10 C200,20 250,0 300,10 C350,20 400,10 400,10 L400,20 L0,20 Z" />
    </svg>
  </span>
  <span className="text-white"> to the World</span>
</h1>

            {/* Subtext with bullet points - Smaller on mobile */}
            <div 
              className={`flex flex-wrap justify-center lg:justify-start gap-1.5 md:gap-2 mb-3 md:mb-4 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center gap-1 px-2 md:px-2.5 py-0.5 md:py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-xs md:text-sm">📦</span>
                <span className="text-[#F5E6D3] font-medium text-[10px] md:text-xs">Bulk Orders</span>
              </div>
              <div className="flex items-center gap-1 px-2 md:px-2.5 py-0.5 md:py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-xs md:text-sm">⚙️</span>
                <span className="text-[#F5E6D3] font-medium text-[10px] md:text-xs">Custom Manufacturing</span>
              </div>
              <div className="flex items-center gap-1 px-2 md:px-2.5 py-0.5 md:py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-xs md:text-sm">🚢</span>
                <span className="text-[#F5E6D3] font-medium text-[10px] md:text-xs">Global Export</span>
              </div>
            </div>

            {/* CTA Buttons - Side by side on mobile */}
            <div 
              className={`flex flex-row justify-center lg:justify-start gap-2 md:gap-3 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Request a Quote Button - Primary */}
           <button
  onClick={scrollToQuoteSection}
  className="group relative inline-flex items-center justify-center px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#3A7D44] focus:ring-offset-2"
>
  <span className="absolute inset-0 bg-gradient-to-r from-[#3A7D44] to-[#2D5E35]"></span>
  <span className="absolute inset-0 bg-gradient-to-r from-[#2D5E35] to-[#3A7D44] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
  <span className="relative flex items-center gap-1 md:gap-2 text-white">
    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    Request a Quote
  </span>
</button>

              {/* View Products Button - Secondary */}
              <Link
                href="/products"
                className="group inline-flex items-center justify-center px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 border-2 border-[#F5E6D3] bg-transparent hover:bg-[#F5E6D3] focus:ring-2 focus:ring-[#F5E6D3] focus:ring-offset-2"
              >
                <span className="relative flex items-center gap-1 md:gap-2 text-[#F5E6D3] group-hover:text-[#6B4F3A] transition-colors duration-300">
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  View Products
                </span>
              </Link>
            </div>

            {/* Product Image - Moves here on mobile (after buttons) */}
            <div className="block lg:hidden mt-6 max-w-[280px] mx-auto">
              <div className="relative">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={productImages[currentImageIndex].url}
                    alt={productImages[currentImageIndex].name}
                    className="w-full h-auto object-cover transition-transform duration-1000 hover:scale-110"
                    style={{ aspectRatio: '1/1' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-xs font-bold text-white">{productImages[currentImageIndex].name}</h3>
                    <p className="text-[8px] text-gray-200">{productImages[currentImageIndex].category}</p>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-[#3A7D44] text-white px-1.5 py-0.5 rounded-full text-[8px] font-semibold shadow-lg">
                  🌿 Eco-Friendly
                </div>
                <div className="absolute -bottom-2 -left-2 bg-[#F5E6D3] text-[#6B4F3A] px-1.5 py-0.5 rounded-full text-[8px] font-semibold shadow-lg">
                  🇧🇩 Made in BD
                </div>
              </div>
              {/* Slide Indicators for mobile */}
              <div className="flex justify-center gap-1.5 mt-3">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'w-6 bg-[#3A7D44]' 
                        : 'w-1.5 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Trust Indicators - Stats (after image on mobile) */}
            <div 
              className={`mt-4 md:mt-5 pt-3 md:pt-4 border-t border-white/15 flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-center lg:text-left">
                <div className="text-base sm:text-lg md:text-xl font-bold text-[#F5E6D3]">30+</div>
                <div className="text-[9px] md:text-[11px] text-[#E8D5C0]">Countries</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-base sm:text-lg md:text-xl font-bold text-[#F5E6D3]">500+</div>
                <div className="text-[9px] md:text-[11px] text-[#E8D5C0]">Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-base sm:text-lg md:text-xl font-bold text-[#F5E6D3]">100%</div>
                <div className="text-[9px] md:text-[11px] text-[#E8D5C0]">Eco-Friendly</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-base sm:text-lg md:text-xl font-bold text-[#F5E6D3]">24/7</div>
                <div className="text-[9px] md:text-[11px] text-[#E8D5C0]">Support</div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Product Image Showcase (Desktop only) */}
          <div className="hidden lg:block flex-1 max-w-md mx-auto lg:max-w-sm">
            <div 
              className={`relative transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-1.5 border border-white/20 shadow-xl">
                <div className="relative overflow-hidden rounded-lg aspect-square">
                  <img
                    src={productImages[currentImageIndex].url}
                    alt={productImages[currentImageIndex].name}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-sm font-bold text-white">{productImages[currentImageIndex].name}</h3>
                    <p className="text-[10px] text-gray-200">{productImages[currentImageIndex].category}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-[#3A7D44] text-white px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-lg">
                🌿 Eco-Friendly
              </div>
              <div className="absolute -bottom-2 -left-2 bg-[#F5E6D3] text-[#6B4F3A] px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-lg">
                🇧🇩 Made in BD
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentImageIndex === index 
                      ? 'w-8 bg-[#3A7D44]' 
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}