// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { useState, useEffect, useRef } from 'react';
// import { ChevronLeft, ChevronRight, Loader2, ArrowRight } from 'lucide-react';

// export default function Categories() {
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(true);
//   const [hoveredCategory, setHoveredCategory] = useState(null);
//   const scrollContainerRef = useRef(null);

//   // Fetch categories from API
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/categories');
//       const data = await response.json();
      
//       if (data.success) {
//         // Transform API data to match component format - removed product count
//         const formattedCategories = data.data.map((cat, index) => ({
//           _id: cat._id,
//           name: cat.name,
//           image: cat.image?.url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500',
//           slug: cat.slug,
//           gradient: getGradientByIndex(index) // Use index-based gradient instead of random
//         }));
//         setCategories(formattedCategories);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Professional gradient system - consistent and elegant
//   const getGradientByIndex = (index) => {
//     const gradients = [
//       'from-gray-900/80 to-gray-800/60',      // Classic Dark
//       'from-slate-800/80 to-slate-700/60',    // Slate
//       'from-neutral-900/80 to-neutral-800/60', // Neutral
//       'from-stone-800/80 to-stone-700/60',    // Stone
//       'from-zinc-900/80 to-zinc-800/60',      // Zinc
//       'from-gray-800/80 to-gray-700/60',      // Medium Dark
//       'from-slate-900/80 to-slate-800/60',    // Deep Slate
//       'from-neutral-800/80 to-neutral-700/60'  // Soft Neutral
//     ];
//     return gradients[index % gradients.length];
//   };

//   // Check scroll position to show/hide arrows
//   const checkScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftArrow(scrollLeft > 0);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
//     }
//   };

//   // Scroll functions
//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = 300;
//       const newScrollLeft = direction === 'left' 
//         ? scrollContainerRef.current.scrollLeft - scrollAmount
//         : scrollContainerRef.current.scrollLeft + scrollAmount;
      
//       scrollContainerRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: 'smooth'
//       });
//     }
//   };

//   // Add scroll event listener
//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       container.addEventListener('scroll', checkScroll);
//       checkScroll();
      
//       window.addEventListener('load', checkScroll);
      
//       return () => {
//         container.removeEventListener('scroll', checkScroll);
//         window.removeEventListener('load', checkScroll);
//       };
//     }
//   }, [categories]);

//   if (isLoading) {
//     return (
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Updated Header Section - Left Aligned */}
//           <div className="mb-10 md:mb-12">
//             <motion.span 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-gray-400 font-medium text-xs uppercase tracking-[0.2em]"
//             >
//               Curated Collections
//             </motion.span>
//             <motion.h2 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-3xl md:text-4xl font-light text-gray-900 mt-3 mb-3"
//             >
//               Shop by <span className="font-semibold">Category</span>
//             </motion.h2>
         
//           </div>
          
//           {/* Loading Skeleton */}
//           <div className="flex justify-center items-center py-12">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             >
//               <Loader2 className="w-8 h-8 text-blue-600" />
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (categories.length === 0) {
//     return (
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Updated Header Section - Left Aligned */}
//           <div className="mb-10 md:mb-12">
//             <span className="text-gray-400 font-medium text-xs uppercase tracking-[0.2em]">
//               Curated Collections
//             </span>
//             <h2 className="text-3xl md:text-4xl font-light text-gray-900 mt-3 mb-3">
//               Shop by <span className="font-semibold">Category</span>
//             </h2>
//             <p className="text-base text-gray-500 max-w-2xl">
//               No categories available at the moment
//             </p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="pt-2 pb-2 md:pt-6 md:pb-4 bg-white">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Updated Header Section - Left Aligned */}
//         <div className="mb-8 md:mb-12">
//           <motion.span 
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//             className="text-gray-400 font-medium text-xs uppercase tracking-[0.2em]"
//           >
//             Curated Collections
//           </motion.span>
//           <motion.h2 
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="text-3xl md:text-4xl font-light text-gray-900 mt-3 mb-3"
//           >
//             Shop by <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#cd7332] to-[#c98250]">Category</span>
//           </motion.h2>
       
//         </div>

//         {/* Categories Carousel */}
//         <div className="relative group">
//           {/* Left Arrow with animation */}
//           {showLeftArrow && (
//             <motion.button
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               onClick={() => scroll('left')}
//               className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 -ml-3 md:-ml-4 hover:scale-110"
//               aria-label="Scroll left"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
//             </motion.button>
//           )}

//           {/* Right Arrow with animation */}
//           {showRightArrow && (
//             <motion.button
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               onClick={() => scroll('right')}
//               className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 -mr-3 md:-mr-4 hover:scale-110"
//               aria-label="Scroll right"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
//             </motion.button>
//           )}

//           {/* Scrollable Container */}
//           <div
//             ref={scrollContainerRef}
//             className="flex overflow-x-auto scrollbar-hide gap-3 md:gap-4 pb-4 scroll-smooth"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             {categories.map((category, index) => (
//               <motion.div
//                 key={category._id || index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ scale: 1.02, y: -5 }}
//                 className="flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
//               >
//                 <Link href={`/products?category=${category._id}`}>
//                   <motion.div 
//                     className="relative h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden cursor-pointer"
//                     whileHover="hover"
//                   >
//                     {/* Image with zoom animation */}
//                     <motion.img
//                       src={category.image}
//                       alt={category.name}
//                       className="w-full h-full object-cover rounded-2xl"
//                       loading="lazy"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500';
//                       }}
//                       variants={{
//                         hover: { scale: 1.1 }
//                       }}
//                       transition={{ duration: 0.5 }}
//                     />
                    
//                     {/* Professional gradient overlay */}
//                     <motion.div 
//                       className={`absolute inset-0 rounded-2xl bg-gradient-to-t ${category.gradient}`}
//                       initial={{ opacity: 0.75 }}
//                       variants={{
//                         hover: { opacity: 0.85 }
//                       }}
//                       transition={{ duration: 0.3 }}
//                     />
                    
//                     {/* Category name - bottom left with proper wrapping */}
//                     <motion.div 
//                       className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-5 z-10 max-w-[70%]"
//                       variants={{
//                         hover: { y: -3 }
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white leading-tight drop-shadow-lg">
//                         {category.name.split(' ').map((word, i, arr) => (
//                           <span key={i} className="block">
//                             {i === arr.length - 1 ? (
//                               <span className="font-semibold">{word}</span>
//                             ) : (
//                               word
//                             )}
//                           </span>
//                         ))}
//                       </h3>
//                     </motion.div>

//                     {/* Browse Now text - appears on hover */}
//                     <motion.div 
//                       className="absolute bottom-0 right-0 p-3 sm:p-4 md:p-5 z-10"
//                       initial={{ opacity: 0, x: 20 }}
//                       variants={{
//                         hover: { opacity: 1, x: 0 }
//                       }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <span className="inline-flex items-center gap-1.5 text-white text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-[2px] px-3 py-1.5 shadow-lg">
//                         <span className="hidden sm:inline">Browse</span>
//                         <span className="sm:hidden">Go</span>
//                         <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
//                       </span>
//                     </motion.div>
//                   </motion.div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Mobile Scroll Hint with animation */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.5 }}
//           className="text-center mt-4 md:hidden"
//         >
//           <motion.p 
//             animate={{ x: [0, 5, 0, -5, 0] }}
//             transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
//             className="text-xs text-gray-500"
//           >
//             ← Swipe to see more categories →
//           </motion.p>
//         </motion.div>
//       </div>

//       {/* Hide scrollbar globally */}
//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//       `}</style>
//     </section>
//   );
// }


'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Package, TrendingUp } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      
      if (data.success) {
        const formattedCategories = data.data.map((cat, index) => ({
          _id: cat._id,
          name: cat.name,
          image: cat.image?.url || getDefaultImage(index),
          slug: cat.slug,
        }));
        setCategories(formattedCategories);
        setShowRightArrow(formattedCategories.length > 8);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      const fallbackCategories = [
        { _id: '1', name: 'Raw Jute Fiber', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=150' },
        { _id: '2', name: 'Jute Yarn', image: 'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?w=150' },
        { _id: '3', name: 'Jute Bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=150' },
        { _id: '4', name: 'Home Decor', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=150' },
        { _id: '5', name: 'Jute Rugs', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=150' },
        { _id: '6', name: 'Industrial Jute', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150' },
        { _id: '7', name: 'Jute Twine', image: 'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?w=150' },
        { _id: '8', name: 'Jute Sack', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=150' },
        { _id: '9', name: 'Jute Fabric Roll', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=150' },
        { _id: '10', name: 'Jute Rope', image: 'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?w=150' },
        { _id: '11', name: 'Jute Netting', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=150' },
        { _id: '12', name: 'Jute Geo Textile', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=150' },
      ];
      setCategories(fallbackCategories);
      setShowRightArrow(fallbackCategories.length > 8);
    } finally {
      setIsLoading(false);
    }
  };

  const getDefaultImage = (index) => {
    const images = [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=150',
      'https://images.unsplash.com/photo-1587223075055-82e9a937ddff?w=150',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=150',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=150',
    ];
    return images[index % images.length];
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [categories]);

  const hasMoreThanEight = categories.length > 8;

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-[#2C2420] font-serif">Shop by Category</h2>
            <div className="w-16 h-0.5 bg-[#C6A43B] mx-auto mt-2" />
          </div>
          <div className="flex gap-4 justify-center">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse flex-shrink-0">
                <div className="w-36 h-36 rounded-xl bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header with Modern Serif Heading */}
        <div className="text-center mb-8 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Leaf className="w-4 h-4 text-[#4A7C59]" />
            <span className="text-xs font-medium text-[#6B4F3A] tracking-wide font-sans">BULK ORDER CATEGORIES</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#2C2420] font-serif"
          >
            Shop by <span className="font-semibold bg-gradient-to-r from-[#4A7C59] to-[#C6A43B] bg-clip-text text-transparent">Category</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#5C4B3A] max-w-2xl mx-auto mt-2 text-sm font-sans"
          >
            Explore our premium jute products available for wholesale and bulk export
          </motion.p>
          
          {/* Category count indicator */}
          {hasMoreThanEight && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-3"
            >
              <span className="text-xs text-[#8B7355] bg-[#F5E6D3] px-3 py-1 rounded-full font-sans">
             All Categories Available → Scroll to see more
              </span>
            </motion.div>
          )}
        </div>

        {/* Categories Row with Scroll Arrows */}
        <div className="relative group">
          {/* Left Arrow - only shows when scrolled right */}
          {showLeftArrow && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 hover:bg-gray-50 -ml-3 md:-ml-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-[#6B4F3A]" />
            </motion.button>
          )}

          {/* Right Arrow - only shows when there are more categories to scroll */}
          {showRightArrow && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 hover:bg-gray-50 -mr-3 md:-mr-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-[#6B4F3A]" />
            </motion.button>
          )}

          {/* Scrollable Container - All categories in one row with scroll */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category, index) => (
              <CategoryCard 
                key={category._id || index} 
                category={category} 
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Scroll Indicator for More Categories */}
        {hasMoreThanEight && !showRightArrow && showLeftArrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4"
          >
            <p className="text-xs text-[#8B7355] flex items-center justify-center gap-2 font-sans">
              <span>←</span> Scroll for more categories <span>→</span>
            </p>
          </motion.div>
        )}

      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// Individual Category Card - Square box with border, image and name both inside the border
function CategoryCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0"
    >
      <Link href={`/products?category=${category._id}`}>
        <div className="cursor-pointer">
          {/* Square Box with Border - Contains both image and name */}
          <motion.div 
            className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl border-2 flex flex-col items-center justify-center gap-1 sm:gap-2 overflow-hidden"
            animate={{
              borderColor: isHovered ? '#4A7C59' : '#E8D5C0',
              backgroundColor: isHovered ? '#FAF7F2' : 'white',
              boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Small Image inside box */}
            <motion.img
              src={category.image}
              alt={category.name}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
              loading="lazy"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://cdn-icons-png.flaticon.com/512/3063/3063826.png';
              }}
            />
            
            {/* Category Name Inside Border - Below Image - Clean Sans-serif */}
            <motion.h3 
              className="text-[10px] sm:text-xs md:text-sm font-medium text-[#2C2420] text-center px-1 sm:px-2 line-clamp-2 font-sans tracking-wide"
              animate={{ color: isHovered ? '#4A7C59' : '#2C2420' }}
              transition={{ duration: 0.2 }}
            >
              {category.name}
            </motion.h3>
            
            {/* Hover Overlay Effect */}
            <motion.div 
              className="absolute inset-0 bg-[#4A7C59]/5 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}