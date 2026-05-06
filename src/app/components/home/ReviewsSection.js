


// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Star, 
//   MessageCircle, 
//   ChevronLeft, 
//   ChevronRight, 
//   Quote, 
//   ArrowRight,
//   Eye,
//   X,
//   Calendar,
//   User,
//   Award,
//   CheckCircle,
//   Package,
//   Sparkles,
//   Heart,
//   Share2
// } from 'lucide-react';
// import ReviewModal from './ReviewModal';

// export default function ReviewsSection() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedReview, setSelectedReview] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [averageRating, setAverageRating] = useState(0);
//   const [totalReviews, setTotalReviews] = useState(0);
//   const [hoveredCard, setHoveredCard] = useState(null);

//   // Fetch reviews from API
//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/reviews/featured?limit=6');
//       const data = await response.json();
      
//       if (data.success) {
//         setReviews(data.data || []);
//         calculateStats(data.data || []);
//       } else {
//         console.error('Failed to fetch reviews:', data.error);
//         const mockReviews = getMockReviews();
//         setReviews(mockReviews);
//         calculateStats(mockReviews);
//       }
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//       const mockReviews = getMockReviews();
//       setReviews(mockReviews);
//       calculateStats(mockReviews);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateStats = (reviewsData) => {
//     if (reviewsData.length === 0) return;
    
//     const total = reviewsData.reduce((sum, review) => sum + review.rating, 0);
//     setAverageRating((total / reviewsData.length).toFixed(1));
//     setTotalReviews(reviewsData.length);
//   };

//   // Mock data for development
//   const getMockReviews = () => [
//     {
//       _id: '1',
//       rating: 5,
//       title: 'Excellent quality and service',
//       comment: 'The bulk order quality exceeded our expectations. Fast shipping and great communication throughout.',
//       createdAt: '2024-01-15T10:00:00Z',
//       user: {
//         _id: 'u1',
//         companyName: 'Fashion Hub Retail',
//         contactPerson: 'John Smith',
//         email: 'john@example.com'
//       },
//       userName: 'John Smith',
//       userCompany: 'Fashion Hub Retail',
//       isFeatured: true,
//       product: {
//         _id: 'p1',
//         productName: 'Premium Cotton T-Shirts',
//         images: [{ url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' }]
//       }
//     },
//     {
//       _id: '2',
//       rating: 5,
//       title: 'Best wholesale partner',
//       comment: 'We\'ve been ordering for 2 years now. Consistent quality, competitive pricing, and they always deliver on time.',
//       createdAt: '2024-01-10T10:00:00Z',
//       user: {
//         _id: 'u2',
//         companyName: 'Urban Styles Boutique',
//         contactPerson: 'Sarah Johnson',
//         email: 'sarah@example.com'
//       },
//       userName: 'Sarah Johnson',
//       userCompany: 'Urban Styles Boutique',
//       isFeatured: true,
//       product: {
//         _id: 'p2',
//         productName: 'Hoodies Collection',
//         images: [{ url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100' }]
//       }
//     },
//     {
//       _id: '3',
//       rating: 4,
//       title: 'Great products, responsive team',
//       comment: 'The MOQ options are flexible and the pricing tiers work well for our growing business.',
//       createdAt: '2024-01-05T10:00:00Z',
//       user: {
//         _id: 'u3',
//         companyName: 'Sportswear Pro',
//         contactPerson: 'Michael Chen',
//         email: 'michael@example.com'
//       },
//       userName: 'Michael Chen',
//       userCompany: 'Sportswear Pro',
//       product: {
//         _id: 'p3',
//         productName: 'Sports Jerseys',
//         images: [{ url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=100' }]
//       }
//     },
//     {
//       _id: '4',
//       rating: 5,
//       title: 'Amazing quality and fast shipping',
//       comment: 'The products arrived earlier than expected and the quality is top-notch. Highly recommend!',
//       createdAt: '2024-01-20T10:00:00Z',
//       user: {
//         _id: 'u4',
//         companyName: 'Trendy Fashion',
//         contactPerson: 'Emma Wilson',
//         email: 'emma@example.com'
//       },
//       userName: 'Emma Wilson',
//       userCompany: 'Trendy Fashion',
//       product: {
//         _id: 'p4',
//         productName: 'Summer Dresses',
//         images: [{ url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100' }]
//       }
//     }
//   ];

//   // Get number of items to show based on screen size
//   const getItemsToShow = () => {
//     if (typeof window !== 'undefined') {
//       if (window.innerWidth >= 1024) return 3;
//       if (window.innerWidth >= 768) return 2;
//       return 1;
//     }
//     return 3;
//   };

//   const [itemsToShow, setItemsToShow] = useState(3);

//   useEffect(() => {
//     const handleResize = () => {
//       setItemsToShow(getItemsToShow());
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const totalGroups = Math.ceil(reviews.length / itemsToShow);
//   const currentGroup = Math.floor(currentIndex / itemsToShow);

//   const nextReview = () => {
//     if (currentIndex + itemsToShow < reviews.length) {
//       setCurrentIndex(currentIndex + itemsToShow);
//     } else {
//       setCurrentIndex(0);
//     }
//   };

//   const prevReview = () => {
//     if (currentIndex - itemsToShow >= 0) {
//       setCurrentIndex(currentIndex - itemsToShow);
//     } else {
//       setCurrentIndex(Math.max(0, reviews.length - itemsToShow));
//     }
//   };

//   const handleViewReview = (review) => {
//     setSelectedReview(review);
//     setIsViewModalOpen(true);
//   };

//   const StarRating = ({ rating, size = "w-4 h-4", isHovered = false }) => {
//     return (
//       <div className="flex gap-0.5">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <motion.div
//             key={star}
//             animate={isHovered ? {
//               scale: [1, 1.2, 1],
//               rotate: [0, 5, -5, 0],
//               transition: { 
//                 duration: 0.5, 
//                 delay: star * 0.1,
//                 repeat: Infinity,
//                 repeatDelay: 2
//               }
//             } : {
//               scale: 1,
//               rotate: 0
//             }}
//           >
//             <Star
//               className={`${size} ${
//                 star <= rating
//                   ? 'fill-yellow-400 text-yellow-400'
//                   : 'text-gray-300'
//               }`}
//             />
//           </motion.div>
//         ))}
//       </div>
//     );
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Helper function to get user display name
//   const getUserName = (review) => {
//     if (review.userName) return review.userName;
//     if (review.user) {
//       if (review.user.contactPerson) return review.user.contactPerson;
//       if (review.user.companyName) return review.user.companyName;
//       if (review.user.name) return review.user.name;
//       if (review.user.email) return review.user.email.split('@')[0];
//     }
//     return 'Anonymous Buyer';
//   };

//   // Helper function to get user company
//   const getUserCompany = (review) => {
//     if (review.userCompany) return review.userCompany;
//     if (review.user?.companyName) return review.user.companyName;
//     return null;
//   };

//   // Helper function to get user initials
//   const getUserInitials = (review) => {
//     const name = getUserName(review);
//     return name.charAt(0).toUpperCase();
//   };

//   // Helper function to get product image
//   const getProductImage = (review) => {
//     if (review.product?.images && review.product.images.length > 0) {
//       return review.product.images[0].url;
//     }
//     if (review.product?.image) return review.product.image;
//     return null;
//   };

//   // Helper function to get product name
//   const getProductName = (review) => {
//     if (review.product?.productName) return review.product.productName;
//     if (review.product?.name) return review.product.name;
//     return null;
//   };

//   if (loading) {
//     return (
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           <div className="text-center mb-12">
//             <motion.span 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-[#E39A65] font-semibold text-sm uppercase tracking-wider"
//             >
//               Testimonials
//             </motion.span>
//             <motion.h2 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4"
//             >
//               What Our Clients Say
//             </motion.h2>
//             <div className="flex justify-center items-center py-12">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 className="w-8 h-8 border-4 border-[#E39A65] border-t-transparent rounded-full"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <>
//       <section className="pt-8 pb-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Section Header with Animation */}
//           <motion.div 
//             initial={{ opacity: 0, y: -30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <motion.span 
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//               className="inline-block px-4 py-1 bg-[#E39A65]/10 text-[#E39A65] rounded-full text-sm font-semibold mb-4"
//             >
//               <Sparkles className="w-4 h-4 inline mr-1" />
//               Testimonials
//             </motion.span>
//             <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
//               What Our Clients Say
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
//               Join 1000+ satisfied wholesale buyers
//             </p>

//             {/* Rating Summary with Animation */}
//             {totalReviews > 0 && (
//               <motion.div 
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 className="flex items-center justify-center gap-4 flex-wrap"
//               >
//                 <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
//                   <div className="flex">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         className={`w-5 h-5 ${
//                           star <= Math.round(averageRating)
//                             ? 'fill-yellow-400 text-yellow-400'
//                             : 'text-gray-300'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
//                 </div>
//               </motion.div>
//             )}
//           </motion.div>

//           {/* Reviews Carousel */}
//           {reviews.length > 0 ? (
//             <div className="relative px-4 md:px-8">
//               {/* Navigation Buttons */}
//               {reviews.length > itemsToShow && (
//                 <>
//                   <motion.button
//                     whileHover={{ scale: 1.1, x: -5 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={prevReview}
//                     className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all"
//                   >
//                     <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
//                   </motion.button>
//                   <motion.button
//                     whileHover={{ scale: 1.1, x: 5 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={nextReview}
//                     className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all"
//                   >
//                     <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
//                   </motion.button>
//                 </>
//               )}

//               {/* Reviews Grid Container */}
//               <div className="overflow-hidden">
//                 <div className="flex -mx-2 sm:-mx-3">
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       key={currentIndex}
//                       initial={{ opacity: 0, x: 50 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -50 }}
//                       transition={{ duration: 0.3 }}
//                       className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full px-2 sm:px-3`}
//                     >
//                       {reviews.slice(currentIndex, currentIndex + itemsToShow).map((review, idx) => (
//                         <motion.div
//                           key={review._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: idx * 0.1 }}
//                           whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
//                           onHoverStart={() => setHoveredCard(review._id)}
//                           onHoverEnd={() => setHoveredCard(null)}
//                           className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 hover:border-[#E39A65]/30 transition-all duration-300 relative group w-full"
//                         >
//                           {/* Decorative Background */}
//                           <motion.div 
//                             className="absolute inset-0 bg-gradient-to-br from-[#E39A65]/5 to-transparent rounded-2xl"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: hoveredCard === review._id ? 1 : 0 }}
//                             transition={{ duration: 0.3 }}
//                           />

//                           {/* Quote Icon with Animation */}
//                           <motion.div
//                             animate={{ 
//                               rotate: hoveredCard === review._id ? 5 : 0,
//                               scale: hoveredCard === review._id ? 1.1 : 1
//                             }}
//                             transition={{ duration: 0.3 }}
//                           >
//                             <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 text-[#E39A65] opacity-20" />
//                           </motion.div>

//                           {/* Rating with Hover Animation */}
//                           <div className="mb-3 sm:mb-4">
//                             <StarRating 
//                               rating={review.rating} 
//                               size="w-3 h-3 sm:w-4 sm:h-4"
//                               isHovered={hoveredCard === review._id}
//                             />
//                           </div>

//                           {/* Review Title - 1 line with ellipsis */}
//                           <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2 truncate pr-6 sm:pr-8" title={review.title}>
//                             {review.title || 'Great Experience'}
//                           </h3>

//                           {/* Review Comment - 2 lines with ellipsis */}
//                           <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2" title={review.comment}>
//                             "{review.comment}"
//                           </p>

//                           {/* Product Info - 2 lines max */}
//                           {getProductName(review) && (
//                             <div className="flex items-center gap-2 mb-3 sm:mb-4 p-1.5 sm:p-2 bg-gray-50 rounded-lg border border-gray-100">
//                               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
//                                 {getProductImage(review) ? (
//                                   <img
//                                     src={getProductImage(review)}
//                                     alt={getProductName(review)}
//                                     className="w-full h-full object-cover"
//                                   />
//                                 ) : (
//                                   <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                                     <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
//                                   </div>
//                                 )}
//                               </div>
//                               <span className="text-[10px] sm:text-sm text-gray-500 line-clamp-2 flex-1">
//                                 {getProductName(review)}
//                               </span>
//                             </div>
//                           )}

//                           {/* User Info */}
//                           <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
//                             <motion.div 
//                               whileHover={{ scale: 1.1 }}
//                               className="w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-[#E39A65] to-[#d48b54] flex-shrink-0"
//                             >
//                               {review.user?.avatar ? (
//                                 <img
//                                   src={review.user.avatar}
//                                   alt={getUserName(review)}
//                                   className="w-full h-full object-cover"
//                                 />
//                               ) : (
//                                 <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
//                                   {getUserInitials(review)}
//                                 </div>
//                               )}
//                             </motion.div>
//                             <div className="min-w-0 flex-1">
//                               <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
//                                 {getUserName(review)}
//                               </p>
//                               {getUserCompany(review) && (
//                                 <p className="text-[10px] sm:text-sm text-gray-500 truncate">
//                                   {getUserCompany(review)}
//                                 </p>
//                               )}
//                               <p className="text-[8px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 flex items-center gap-0.5 sm:gap-1">
//                                 <Calendar className="w-2 h-2 sm:w-3 sm:h-3" />
//                                 {formatDate(review.createdAt)}
//                               </p>
//                             </div>
//                           </div>

//                           {/* View Icon at Bottom Right */}
//                           <motion.div 
//                             className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4"
//                             initial={{ opacity: 0, scale: 0 }}
//                             animate={{ 
//                               opacity: hoveredCard === review._id ? 1 : 0,
//                               scale: hoveredCard === review._id ? 1 : 0,
//                               rotate: hoveredCard === review._id ? 0 : 180
//                             }}
//                             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                           >
//                             <motion.button
//                               whileHover={{ scale: 1.1, rotate: 5 }}
//                               whileTap={{ scale: 0.9 }}
//                               onClick={() => handleViewReview(review)}
//                               className="p-1.5 sm:p-2 bg-[#E39A65] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
//                               title="View full review"
//                             >
//                               <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
//                             </motion.button>
//                           </motion.div>
//                         </motion.div>
//                       ))}
//                     </motion.div>
//                   </AnimatePresence>
//                 </div>
//               </div>

//               {/* Dots Indicator */}
//               {reviews.length > itemsToShow && (
//                 <motion.div 
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 }}
//                   className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8"
//                 >
//                   {Array.from({ length: totalGroups }).map((_, idx) => (
//                     <motion.button
//                       key={idx}
//                       onClick={() => setCurrentIndex(idx * itemsToShow)}
//                       whileHover={{ scale: 1.2 }}
//                       whileTap={{ scale: 0.9 }}
//                       className={`h-1.5 sm:h-2 rounded-full transition-all ${
//                         currentGroup === idx
//                           ? 'w-4 sm:w-8 bg-[#E39A65]'
//                           : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
//                       }`}
//                     />
//                   ))}
//                 </motion.div>
//               )}
//             </div>
//           ) : (
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-12 bg-white rounded-2xl border border-gray-100"
//             >
//               <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">No reviews yet</h3>
//               <p className="text-gray-500 mb-6">Be the first to share your experience!</p>
//             </motion.div>
//           )}

//           {/* Buttons Row - Give Feedback & Browse All side by side on all devices */}
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-row items-center justify-center gap-2 sm:gap-4 mt-6 px-2"
//           >
//             {/* Give Your Feedback Button - Responsive sizing */}
//             <motion.button
//               whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(227, 154, 101, 0.3)" }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsModalOpen(true)}
//               className="inline-flex items-center px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-xs sm:text-sm md:text-base"
//             >
//               <motion.span
//                 animate={{ rotate: [0, 10, -10, 0] }}
//                 transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
//                 className="flex items-center"
//               >
//                 <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2" />
//               </motion.span>
//               <span className=" xs:inline">Give Your Feedback</span>
            
//               <motion.div
//                 animate={{ x: [0, 5, 0] }}
//                 transition={{ duration: 1, repeat: Infinity }}
//                 className="ml-1 sm:ml-2"
//               >
//                 <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
//               </motion.div>
//             </motion.button>

//             {/* Browse All Reviews Button - Responsive sizing */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link
//                 href="/reviews"
//                 className="inline-flex items-center px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-white text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 group text-xs sm:text-sm md:text-base"
//               >
//                 <span className=" xs:inline">Browse All Reviews</span>
              
              
//                 <motion.span
//                   animate={{ x: [0, 5, 0] }}
//                   transition={{ duration: 1, repeat: Infinity }}
//                   className="ml-1 sm:ml-2 text-gray-700"
//                 >
//                   →
//                 </motion.span>
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Review Modal for writing reviews */}
//       <ReviewModal 
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onReviewSubmitted={() => {
//           fetchReviews();
//           setIsModalOpen(false);
//         }}
//       />

//       {/* View Details Modal with Animation */}
//       <AnimatePresence>
//         {isViewModalOpen && selectedReview && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 overflow-y-auto"
//           >
//             <div className="flex items-center justify-center min-h-screen px-4">
//               {/* Backdrop */}
//               <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="fixed inset-0 bg-black/50 backdrop-blur-sm"
//                 onClick={() => setIsViewModalOpen(false)}
//               />

//               {/* Modal */}
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: 50 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: 50 }}
//                 transition={{ type: "spring", duration: 0.5 }}
//                 className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//               >
//                 {/* Close button with animation */}
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => setIsViewModalOpen(false)}
//                   className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
//                 >
//                   <X className="w-5 h-5 text-gray-500" />
//                 </motion.button>

//                 <div className="p-6">
//                   {/* Header with Animation */}
//                   <motion.div 
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="flex items-start gap-4 mb-6"
//                   >
//                     <motion.div 
//                       whileHover={{ scale: 1.1, rotate: 5 }}
//                       className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E39A65] to-[#d48b54] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
//                     >
//                       {getUserInitials(selectedReview)}
//                     </motion.div>
//                     <div className="flex-1">
//                       <h3 className="text-lg font-bold text-gray-900">
//                         {getUserName(selectedReview)}
//                       </h3>
//                       {getUserCompany(selectedReview) && (
//                         <p className="text-gray-600">{getUserCompany(selectedReview)}</p>
//                       )}
//                       <div className="flex items-center gap-3 mt-2">
//                         <StarRating rating={selectedReview.rating} size="w-5 h-5" />
//                         <span className="text-sm text-gray-400 flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           {formatDate(selectedReview.createdAt)}
//                         </span>
//                       </div>
//                     </div>
//                   </motion.div>

//                   {/* Title with Animation */}
//                   {selectedReview.title && (
//                     <motion.h4 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="text-xl font-bold text-gray-900 mb-4"
//                     >
//                       {selectedReview.title}
//                     </motion.h4>
//                   )}

//                   {/* Comment with Animation */}
//                   <motion.div 
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.3 }}
//                     className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200"
//                   >
//                     <p className="text-gray-700 text-sm leading-relaxed">
//                       "{selectedReview.comment}"
//                     </p>
//                   </motion.div>

//                   {/* Product Info with Animation */}
//                   {getProductName(selectedReview) && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.4 }}
//                       className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100"
//                     >
//                       <p className="text-xs text-orange-600 mb-2 flex items-center gap-1">
//                         <Package className="w-4 h-4" />
//                         Product Reviewed
//                       </p>
//                       <div className="flex items-center gap-3">
//                         {getProductImage(selectedReview) && (
//                           <motion.div 
//                             whileHover={{ scale: 1.05 }}
//                             className="w-16 h-16 rounded-lg overflow-hidden bg-white border border-orange-200"
//                           >
//                             <img
//                               src={getProductImage(selectedReview)}
//                               alt={getProductName(selectedReview)}
//                               className="w-full h-full object-cover"
//                             />
//                           </motion.div>
//                         )}
//                         <div>
//                           <p className="font-semibold text-gray-900">
//                             {getProductName(selectedReview)}
//                           </p>
//                           <Link 
//                             href={`/productDetails?id=${selectedReview.product?._id}`}
//                             className="text-sm text-[#E39A65] hover:underline inline-flex items-center gap-1 mt-1 group"
//                           >
//                             View Product Details
//                             <motion.span
//                               animate={{ x: [0, 3, 0] }}
//                               transition={{ duration: 1, repeat: Infinity }}
//                             >
//                               →
//                             </motion.span>
//                           </Link>
//                         </div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* Stats with Animation */}
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                     className="flex items-center gap-4 pt-4 border-t border-gray-200"
//                   >
//                     <motion.div 
//                       whileHover={{ scale: 1.05 }}
//                       className="flex items-center gap-1 text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full"
//                     >
//                       <CheckCircle className="w-4 h-4 text-green-500" />
//                       Verified Purchase
//                     </motion.div>
//                     {selectedReview.helpfulCount > 0 && (
//                       <motion.div 
//                         whileHover={{ scale: 1.05 }}
//                         className="flex items-center gap-1 text-sm text-gray-600 bg-orange-50 px-3 py-1 rounded-full"
//                       >
//                         <Heart className="w-4 h-4 text-[#E39A65]" />
//                         {selectedReview.helpfulCount} found this helpful
//                       </motion.div>
//                     )}
//                   </motion.div>

//                   {/* Admin Response with Animation */}
//                   {selectedReview.response && (
//                     <motion.div 
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.6 }}
//                       className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
//                     >
//                       <p className="text-xs font-medium text-blue-700 mb-2 flex items-center gap-1">
//                         <MessageCircle className="w-4 h-4" />
//                         Response from seller
//                       </p>
//                       <p className="text-sm text-blue-800">{selectedReview.response.text}</p>
//                       <p className="text-xs text-blue-600 mt-2">
//                         {formatDate(selectedReview.response.respondedAt)}
//                       </p>
//                     </motion.div>
//                   )}
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }



'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  ArrowRight,
  Eye,
  X,
  Calendar,
  Award,
  CheckCircle,
  Package,
  Sparkles,
  Building2,
  Globe,
  TrendingUp,
  User,
  Briefcase,
  MapPin,
  Clock,
  ThumbsUp,
  Heart
} from 'lucide-react';
import ReviewModal from './ReviewModal';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);

  // Cards per page based on screen size
  const getCardsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3;
  };

  const [cardsPerPage, setCardsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(reviews.length / cardsPerPage);

  // Auto-scroll functionality
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (!isAutoPlaying || totalPages <= 1) return;
    
    autoPlayRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);
  }, [isAutoPlaying, totalPages]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [startAutoPlay]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Fetch reviews from API
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews/featured?limit=20');
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data || []);
        calculateStats(data.data || []);
      } else {
        console.error('Failed to fetch reviews:', data.error);
        const mockReviews = getMockReviews();
        setReviews(mockReviews);
        calculateStats(mockReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      const mockReviews = getMockReviews();
      setReviews(mockReviews);
      calculateStats(mockReviews);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData) => {
    if (reviewsData.length === 0) return;
    
    const total = reviewsData.reduce((sum, review) => sum + review.rating, 0);
    setAverageRating((total / reviewsData.length).toFixed(1));
    setTotalReviews(reviewsData.length);
  };

  // Mock data for development
  const getMockReviews = () => [
    {
      _id: '1',
      rating: 5,
      title: 'Excellent quality and service',
      comment: 'The bulk order quality exceeded our expectations. Fast shipping and great communication throughout. Will definitely order again.',
      createdAt: '2024-01-15T10:00:00Z',
      user: {
        _id: 'u1',
        companyName: 'EcoPack Solutions',
        contactPerson: 'Michael Rodriguez',
        email: 'michael@example.com',
        country: 'USA'
      },
      isFeatured: true,
      product: {
        _id: 'p1',
        productName: 'Premium Jute Shopping Bags'
      }
    },
    {
      _id: '2',
      rating: 5,
      title: 'Best wholesale partner',
      comment: 'We\'ve been ordering for 2 years now. Consistent quality, competitive pricing, and they always deliver on time. Highly recommended for bulk orders.',
      createdAt: '2024-01-10T10:00:00Z',
      user: {
        _id: 'u2',
        companyName: 'GreenLife Imports',
        contactPerson: 'Sarah Williams',
        email: 'sarah@example.com',
        country: 'UK'
      },
      product: {
        _id: 'p2',
        productName: 'Jute Rugs & Mats'
      }
    },
    {
      _id: '3',
      rating: 4,
      title: 'Great products, responsive team',
      comment: 'The MOQ options are flexible and the pricing tiers work well for our growing business. Customer service is excellent.',
      createdAt: '2024-01-05T10:00:00Z',
      user: {
        _id: 'u3',
        companyName: 'EcoHome Germany',
        contactPerson: 'Hans Mueller',
        email: 'hans@example.com',
        country: 'Germany'
      },
      product: {
        _id: 'p3',
        productName: 'Home Decor Items'
      }
    },
    {
      _id: '4',
      rating: 5,
      title: 'Amazing quality and fast shipping',
      comment: 'The products arrived earlier than expected and the quality is top-notch. Very satisfied with the service.',
      createdAt: '2024-01-20T10:00:00Z',
      user: {
        _id: 'u4',
        companyName: 'GreenRetail Australia',
        contactPerson: 'James O\'Brien',
        email: 'james@example.com',
        country: 'Australia'
      },
      product: {
        _id: 'p4',
        productName: 'Jute Bags & Totes'
      }
    },
    {
      _id: '5',
      rating: 5,
      title: 'Reliable supplier for B2B',
      comment: 'We have placed multiple bulk orders and the quality has been consistently excellent. Their team is very professional.',
      createdAt: '2024-01-25T10:00:00Z',
      user: {
        _id: 'u5',
        companyName: 'EcoWorld Canada',
        contactPerson: 'Lisa Chen',
        email: 'lisa@example.com',
        country: 'Canada'
      },
      product: {
        _id: 'p5',
        productName: 'Jute Fiber Rolls'
      }
    },
    {
      _id: '6',
      rating: 4,
      title: 'Great value for money',
      comment: 'Competitive pricing with good quality. Shipping was well organized. Looking forward to more orders.',
      createdAt: '2024-01-28T10:00:00Z',
      user: {
        _id: 'u6',
        companyName: 'Sustainable Living NL',
        contactPerson: 'Mark van der Berg',
        email: 'mark@example.com',
        country: 'Netherlands'
      },
      product: {
        _id: 'p6',
        productName: 'Jute Twine & Rope'
      }
    }
  ];

const handleViewReview = (review) => {
  setSelectedReview(review);
  setIsViewModalOpen(true);
};

  const StarRating = ({ rating, size = "w-4 h-4" }) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating
                ? 'fill-[#C6A43B] text-[#C6A43B]'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getUserName = (review) => {
    if (review.userName) return review.userName;
    if (review.user) {
      if (review.user.contactPerson) return review.user.contactPerson;
      if (review.user.companyName) return review.user.companyName;
    }
    return 'Verified Buyer';
  };

  const getUserCompany = (review) => {
    if (review.userCompany) return review.userCompany;
    if (review.user?.companyName) return review.user.companyName;
    return null;
  };

  const getUserCountry = (review) => {
    return review.user?.country || null;
  };

  const getUserInitials = (review) => {
    const name = getUserName(review);
    return name.charAt(0).toUpperCase();
  };

  const getProductName = (review) => {
    if (review.product?.productName) return review.product.productName;
    return null;
  };

  const getRandomColor = (index) => {
    const colors = ['#4A7C59', '#C6A43B', '#6B4F3A', '#3A7D44', '#8B6B51'];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-[#4A7C59] border-t-transparent rounded-full"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentReviews = reviews.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  return (
    <>
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-[#FAF7F2] overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-[#4A7C59]/10 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="w-4 h-4 text-[#4A7C59]" />
              <span className="text-xs font-semibold text-[#4A7C59] tracking-wider uppercase font-sans">What Our Clients Say</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2420] mb-3 font-serif">
              Trusted by{' '}
              <span className="font-bold bg-gradient-to-r from-[#4A7C59] to-[#C6A43B] bg-clip-text text-transparent">
                Global Importers
              </span>
            </h2>
            
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-sans">
              Real feedback from wholesale buyers and importers worldwide
            </p>

            {/* Rating Summary */}
            {totalReviews > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center gap-4 flex-wrap mt-6"
              >
                <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg border border-[#E8D5C0]">
                  <StarRating rating={Math.round(averageRating)} size="w-5 h-5" />
                  <span className="text-2xl font-bold text-[#2C2420] font-serif">{averageRating}</span>
              
                </div>
              </motion.div>
            )}
          </motion.div>


          {/* Reviews Carousel */}
          {reviews.length > 0 && (
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-[#4A7C59] hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-[#4A7C59] hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Cards Grid - Auto-scrolling */}
              <div className="overflow-hidden px-2">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                >
                  {currentReviews.map((review, idx) => {
                    const color = getRandomColor(idx);
                    const userName = getUserName(review);
                    const userCompany = getUserCompany(review);
                    const userCountry = getUserCountry(review);
                    const productName = getProductName(review);
                    const reviewDate = formatDate(review.createdAt);
                    
                    return (
                      <motion.div
                        key={review._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="group bg-white rounded-2xl border border-[#E8D5C0] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => handleViewReview(review)}
                      >
                        {/* Card Content */}
                        <div className="p-5 md:p-6">
                          {/* Header - Avatar and Rating */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                style={{ backgroundColor: color }}
                              >
                                {getUserInitials(review)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-[#2C2420] font-serif text-sm md:text-base">
                                  {userName}
                                </h4>
                                {userCompany && (
                                  <p className="text-[10px] text-[#C6A43B] font-medium font-sans flex items-center gap-1">
                                    <Briefcase className="w-2.5 h-2.5" />
                                    {userCompany}
                                  </p>
                                )}
                                {userCountry && (
                                  <p className="text-[9px] text-gray-400 font-sans flex items-center gap-1 mt-0.5">
                                    <MapPin className="w-2.5 h-2.5" />
                                    {userCountry}
                                  </p>
                                )}
                              </div>
                            </div>
                            <StarRating rating={review.rating} size="w-3 h-3" />
                          </div>

                          {/* Testimonial Text */}
                          <div className="mb-4">
                            <div className="flex items-center gap-1 mb-2">
                              <Quote className="w-4 h-4 text-[#C6A43B]/40" />
                              {review.title && (
                                <p className="text-xs font-semibold text-[#4A7C59] uppercase tracking-wide font-sans">
                                  {review.title}
                                </p>
                              )}
                            </div>
                            <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-sans line-clamp-1 truncate">
                              "{review.comment}"
                            </p>
                          </div>

                          {/* Product Info */}
                          {productName && (
                            <div className="mb-4 pt-3 border-t border-[#E8D5C0]">
                              <div className="flex items-center gap-1.5">
                                <Package className="w-3 h-3 text-[#4A7C59]" />
                                <p className="text-[10px] text-gray-500 font-sans">
                                  Product: <span className="font-medium text-[#2C2420]">{productName}</span>
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Date and Verification Badge */}
                          <div className="flex items-center justify-between pt-3 border-t border-[#E8D5C0]">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-[9px] text-gray-400 font-sans">{reviewDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-[#4A7C59]" />
                              <span className="text-[9px] text-[#4A7C59] font-sans font-medium">Verified</span>
                            </div>
                          </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex border-t border-[#E8D5C0] bg-[#FAF7F2]">
                        <button
  onClick={(e) => {
    e.stopPropagation();
    handleViewReview(review);
  }}
  className="flex-1 flex items-center justify-center gap-2 py-3..."
>
  <Eye className="w-3.5 h-3.5" />
  Read Full Review
</button>
                          <div className="w-px bg-[#E8D5C0]"></div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsModalOpen(true);
                            }}
                            className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-medium text-gray-600 hover:bg-white hover:text-[#4A7C59] transition-all duration-300"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            Write Review
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Dots Indicator */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setCurrentPage(idx);
                        setTimeout(() => setIsAutoPlaying(true), 5000);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentPage === idx 
                          ? 'w-8 bg-[#4A7C59]' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Auto-play Indicator */}
              {isAutoPlaying && totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <div className="w-16 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#4A7C59] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
       {/* Action Buttons */}
<motion.div 
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.6, duration: 0.5 }}
  className="flex flex-row items-center justify-center gap-2 sm:gap-4 mt-12"
>
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => setIsModalOpen(true)}
    className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#4A7C59] to-[#5D9B6B] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-[11px] sm:text-sm whitespace-nowrap"
  >
    <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    <span>Give Feedback</span>
    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
  </motion.button>

  <Link href="/reviews">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-6 py-2.5 sm:py-3 bg-white text-[#4A7C59] font-semibold rounded-full border-2 border-[#4A7C59] hover:bg-[#4A7C59] hover:text-white transition-all duration-300 text-[11px] sm:text-sm whitespace-nowrap"
    >
      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span>Browse All Reviews</span>
    </motion.button>
  </Link>
</motion.div>

          {/* Trust Badge Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#4A7C59]/5 rounded-full px-5 py-2">
              <Award className="w-4 h-4 text-[#4A7C59]" />
              <span className="text-xs text-gray-600 font-sans">
                Join <span className="font-semibold text-[#4A7C59]">800+ satisfied businesses</span> worldwide
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Review Modal for writing reviews */}
      <ReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={() => {
          fetchReviews();
          setIsModalOpen(false);
        }}
      />

      {/* View Details Modal */}
   {/* View Details Modal */}
<AnimatePresence>
  {isViewModalOpen && selectedReview && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsViewModalOpen(false)}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <button
            onClick={() => setIsViewModalOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="p-6 md:p-8">
            {/* User Info */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4A7C59] to-[#C6A43B] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                {getUserInitials(selectedReview)}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 font-serif">
                  {getUserName(selectedReview)}
                </h3>
                {getUserCompany(selectedReview) && (
                  <p className="text-gray-600 font-sans">{getUserCompany(selectedReview)}</p>
                )}
                {getUserCountry(selectedReview) && (
                  <p className="text-xs text-gray-400 font-sans flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {getUserCountry(selectedReview)}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  <StarRating rating={selectedReview.rating} size="w-5 h-5" />
                  <span className="text-sm text-gray-400 flex items-center gap-1 font-sans">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedReview.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Title */}
            {selectedReview.title && (
              <h4 className="text-xl font-bold text-gray-900 mb-4 font-serif">
                {selectedReview.title}
              </h4>
            )}

            {/* Review Comment */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
              <Quote className="w-8 h-8 text-[#C6A43B]/30 mb-3" />
              <p className="text-gray-700 text-sm leading-relaxed font-sans">
                "{selectedReview.comment}"
              </p>
            </div>

            {/* Product Info */}
            {getProductName(selectedReview) && (
              <div className="mb-6 p-4 bg-[#F5E6D3] rounded-lg border border-[#E8D5C0]">
                <p className="text-xs text-[#4A7C59] mb-2 flex items-center gap-1 font-sans">
                  <Package className="w-4 h-4" />
                  Product Reviewed
                </p>
                <div>
                  <p className="font-semibold text-gray-900 font-sans">
                    {getProductName(selectedReview)}
                  </p>
                </div>
              </div>
            )}

            {/* Verification Badges */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-1 text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Verified Buyer
              </div>
            
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}