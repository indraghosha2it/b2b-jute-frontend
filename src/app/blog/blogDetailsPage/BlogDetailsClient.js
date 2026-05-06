


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';

// import { motion } from 'framer-motion';
// import { 
//   Calendar,
//   User,
//   Tag,
//   Eye,
//   Clock,
//   ArrowLeft,
//   ChevronRight,
//   Play,
//   Pause,
//   Volume2,
//   VolumeX,
//   Maximize2,
//   Image as ImageIcon,
//   X,
//   BookOpen,
//   FileText,
//   Package,
//   Users,
//   CheckCircle,
//   Youtube,
//   ChevronLeft
// } from 'lucide-react';
// import Navbar from '@/app/components/layout/Navbar';
// import Footer from '@/app/components/layout/Footer';
// import WhatsAppButton from '@/app/components/layout/WhatsAppButton';

// export default function BlogDetailsClient() {
//   const searchParams = useSearchParams();
//   const blogId = searchParams.get('id');
  
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [relatedPosts, setRelatedPosts] = useState([]);
//   const [activeImage, setActiveImage] = useState(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [showImageModal, setShowImageModal] = useState(false);
  
//   // Categories for reference
//   const categories = [
//     { value: 'fashion-trends', label: 'Fashion Trends', icon: '👗', color: 'from-pink-500 to-rose-500' },
//     { value: 'wholesale-guide', label: 'Wholesale Guide', icon: '📦', color: 'from-blue-500 to-indigo-500' },
//     { value: 'industry-news', label: 'Industry News', icon: '📰', color: 'from-purple-500 to-violet-500' },
//     { value: 'style-tips', label: 'Style Tips', icon: '✨', color: 'from-amber-500 to-orange-500' },
//     { value: 'business-tips', label: 'Business Tips', icon: '💼', color: 'from-emerald-500 to-teal-500' },
//     { value: 'fabric-and-quality', label: 'Fabric and Quality', icon: '🧵', color: 'from-stone-500 to-neutral-500' },
//     { value: 'customer-stories', label: 'Customer Stories', icon: '👥', color: 'from-cyan-500 to-sky-500' },
//     { value: 'case-studies', label: 'Case Studies', icon: '📊', color: 'from-indigo-500 to-purple-500' },
//     { value: 'product-guide', label: 'Product Guide', icon: '📖', color: 'from-lime-500 to-green-500' },
//     { value: 'others', label: 'Others', icon: '📌', color: 'from-gray-500 to-slate-500' }
//   ];

//   // Fetch blog details
//   useEffect(() => {
//     const fetchBlogDetails = async () => {
//       if (!blogId) {
//         setLoading(false);
//         setError('No blog ID provided');
//         return;
//       }
      
//       setLoading(true);
//       try {
//         const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setBlog(data.data);
//           // Parse paragraphs if they're stringified
//           if (typeof data.data.paragraphs === 'string') {
//             data.data.paragraphs = JSON.parse(data.data.paragraphs);
//           }
          
//           // Fetch related posts
//           fetchRelatedPosts(data.data.category, data.data._id);
//         } else {
//           setError('Blog post not found');
//         }
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//         setError('Failed to load blog post');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogDetails();
//   }, [blogId]);

//   // Fetch related posts
//   const fetchRelatedPosts = async (category, currentId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/blogs?category=${category}&limit=3`);
//       const data = await response.json();
//       if (data.success) {
//         setRelatedPosts(data.data.filter(post => post._id !== currentId).slice(0, 3));
//       }
//     } catch (error) {
//       console.error('Error fetching related posts:', error);
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Get category details
//   const getCategoryDetails = (categoryValue) => {
//     return categories.find(c => c.value === categoryValue) || categories[0];
//   };

//   // Handle image click to open modal with specific image
//   const handleImageClick = (imageUrl, index) => {
//     setActiveImage(imageUrl);
//     setActiveImageIndex(index);
//     setShowImageModal(true);
//   };

//   // Navigate to previous image
//   const handlePrevImage = () => {
//     if (blog?.thumbnailImages && blog.thumbnailImages.length > 0) {
//       const newIndex = (activeImageIndex - 1 + blog.thumbnailImages.length) % blog.thumbnailImages.length;
//       setActiveImageIndex(newIndex);
//       setActiveImage(blog.thumbnailImages[newIndex].url);
//     }
//   };

//   // Navigate to next image
//   const handleNextImage = () => {
//     if (blog?.thumbnailImages && blog.thumbnailImages.length > 0) {
//       const newIndex = (activeImageIndex + 1) % blog.thumbnailImages.length;
//       setActiveImageIndex(newIndex);
//       setActiveImage(blog.thumbnailImages[newIndex].url);
//     }
//   };

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!showImageModal) return;
      
//       if (e.key === 'ArrowLeft') {
//         handlePrevImage();
//       } else if (e.key === 'ArrowRight') {
//         handleNextImage();
//       } else if (e.key === 'Escape') {
//         setShowImageModal(false);
//       }
//     };
    
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [showImageModal, activeImageIndex, blog]);

//   // Scroll to section function for table of contents
//   const scrollToSection = (sectionId) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const yOffset = -100;
//       const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
//       window.scrollTo({ top: y, behavior: 'smooth' });
//     }
//   };

//   // Animation variants
//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//     transition: { duration: 0.5 }
//   };

//   const staggerChildren = {
//     animate: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
//           <div className="text-center">
//             <div className="relative w-20 h-20 mx-auto mb-4">
//               <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
//               <div className="absolute top-0 left-0 w-full h-full border-4 border-[#E39A65] rounded-full border-t-transparent animate-spin"></div>
//             </div>
//             <p className="text-gray-500">Loading amazing content...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error || !blog) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-white pt-32 flex items-center justify-center">
//           <div className="text-center max-w-md mx-auto px-4">
//             <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <span className="text-4xl">😕</span>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Post Not Found</h1>
//             <p className="text-gray-500 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
//             <Link 
//               href="/blog"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-[#E39A65] text-white font-medium rounded-xl hover:bg-[#d48b54] transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Back to Blog
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const categoryDetails = getCategoryDetails(blog.category);

//   return (
//     <>
//       <Navbar />
      
//       {/* Image Modal with Navigation Arrows */}
//       {showImageModal && activeImage && (
//         <div 
//           className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
//           onClick={(e) => {
//             if (e.target === e.currentTarget) {
//               setShowImageModal(false);
//             }
//           }}
//         >
//           {/* Close button */}
//           <button 
//             onClick={() => setShowImageModal(false)}
//             className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
//             aria-label="Close"
//           >
//             <X className="w-6 h-6" />
//           </button>

//           {/* Image counter */}
//           {blog.thumbnailImages && blog.thumbnailImages.length > 1 && (
//             <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
//               {activeImageIndex + 1} / {blog.thumbnailImages.length}
//             </div>
//           )}

//           {/* Left Navigation Arrow */}
//           {blog.thumbnailImages && blog.thumbnailImages.length > 1 && (
//             <button
//               onClick={handlePrevImage}
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all hover:scale-110 z-10"
//               aria-label="Previous image"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
//           )}

//           {/* Right Navigation Arrow */}
//           {blog.thumbnailImages && blog.thumbnailImages.length > 1 && (
//             <button
//               onClick={handleNextImage}
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all hover:scale-110 z-10"
//               aria-label="Next image"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>
//           )}

//           {/* Image */}
//           <img 
//             src={activeImage} 
//             alt={`Gallery image ${activeImageIndex + 1}`}
//             className="max-w-[90vw] max-h-[90vh] object-contain cursor-pointer"
//             onClick={(e) => e.stopPropagation()}
//           />

//           {/* Thumbnail navigation bar at bottom */}
//           {blog.thumbnailImages && blog.thumbnailImages.length > 1 && (
//             <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 py-2">
//               <div className="flex gap-2 bg-black/50 rounded-lg p-2 backdrop-blur-sm">
//                 {blog.thumbnailImages.map((image, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => {
//                       setActiveImageIndex(idx);
//                       setActiveImage(image.url);
//                     }}
//                     className={`relative w-12 h-12 rounded-lg overflow-hidden transition-all ${
//                       idx === activeImageIndex 
//                         ? 'ring-2 ring-[#E39A65] ring-offset-2 ring-offset-black scale-110' 
//                         : 'opacity-60 hover:opacity-100'
//                     }`}
//                   >
//                     <img 
//                       src={image.url} 
//                       alt={`Thumbnail ${idx + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Rest of your existing JSX remains the same */}
//       {/* Back to Blog Link */}
//       <div className="pt-24 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <Link 
//             href="/blog"
//             className="inline-flex items-center gap-2 text-gray-500 hover:text-[#E39A65] transition-colors group mb-6"
//           >
//             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//             Back to Blog
//           </Link>
//         </div>
//       </div>

//       {/* Hero Section with Featured Image */}
//       <section className="bg-white pb-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div 
//             className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 shadow-2xl"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//           >
//             {blog.featuredImage ? (
//               <>
//                 <img 
//                   src={blog.featuredImage} 
//                   alt={blog.title}
//                   className="w-full h-[500px] object-cover opacity-60"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//               </>
//             ) : (
//               <div className="w-full h-[500px] bg-gradient-to-r from-[#E39A65]/20 to-amber-600/20 flex items-center justify-center">
//                 <span className="text-8xl opacity-20">{categoryDetails.icon}</span>
//               </div>
//             )}

//             {/* Content Overlay */}
//             <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
//               <div className="max-w-4xl">
//                 {/* Category Badge */}
//                 <motion.div 
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-4"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <span className="text-xl">{categoryDetails.icon}</span>
//                   <span className="text-white font-medium">{categoryDetails.label}</span>
//                 </motion.div>

//                 {/* Title */}
//                 <motion.h1 
//                   className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   {blog.title}
//                 </motion.h1>

//                 {/* Meta Info */}
//                 <motion.div 
//                   className="flex flex-wrap items-center gap-6 text-white/80"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   {/* <div className="flex items-center gap-2">
//                     <div className="p-1.5 bg-white/10 rounded-lg">
//                       <Calendar className="w-4 h-4" />
//                     </div>
//                     <span>{formatDate(blog.publishDate)}</span>
//                   </div> */}
//                   <div className="flex items-center gap-2">
//                     <div className="p-1.5 bg-white/10 rounded-lg">
//                       <User className="w-4 h-4" />
//                     </div>
//                     <span>{blog.author}</span>
//                   </div>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row gap-12">
//             {/* Main Content Area */}
//             <div className="lg:w-2/3">
//               {/* Excerpt */}
//               <motion.div 
//                 className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 mb-8 border border-orange-100"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//               >
//                 <p className="text-lg text-gray-700 italic leading-relaxed">
//                   "{blog.excerpt}"
//                 </p>
//               </motion.div>

//               {/* Main Content with Rich Text */}
//               <motion.div 
//                 className="blog-content prose prose-lg max-w-none mb-12"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 dangerouslySetInnerHTML={{ __html: blog.content }}
//               />

//               {/* YouTube Video Section */}
//               {blog.youtubeVideo && blog.youtubeVideo.videoId && (
//                 <motion.div 
//                   className="mb-12"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                     <Youtube className="w-6 h-6 text-red-600" />
//                     Featured Video
//                   </h3>
//                   <div className="relative rounded-2xl overflow-hidden bg-black shadow-xl aspect-video">
//                     <iframe
//                       src={`https://www.youtube.com/embed/${blog.youtubeVideo.videoId}`}
//                       title="YouTube video player"
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                       className="absolute top-0 left-0 w-full h-full"
//                     ></iframe>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Additional Sections with Rich Text */}
//               {blog.paragraphs && blog.paragraphs.length > 0 && (
//                 <motion.div 
//                   className="space-y-8 mb-12"
//                   variants={staggerChildren}
//                   initial="initial"
//                   animate="animate"
//                 >
//                   <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                     <span className="w-8 h-8 bg-[#E39A65] rounded-lg flex items-center justify-center text-white text-sm">+</span>
//                     In-Depth Analysis
//                   </h3>
                  
//                   {blog.paragraphs.map((section, index) => {
//                     const sectionId = `section-${index}`;
//                     return (
//                       <motion.div 
//                         key={index}
//                         id={sectionId}
//                         className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow scroll-mt-24"
//                         variants={fadeInUp}
//                       >
//                         <h4 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                           <span className="w-6 h-6 bg-[#E39A65]/20 rounded-lg flex items-center justify-center text-[#E39A65] font-bold text-sm">
//                             {index + 1}
//                           </span>
//                           {section.header}
//                         </h4>
//                         <div 
//                           className="blog-content prose max-w-none text-gray-600"
//                           dangerouslySetInnerHTML={{ __html: section.description }}
//                         />
//                       </motion.div>
//                     );
//                   })}
//                 </motion.div>
//               )}

//               {/* Thumbnail Gallery - Updated with new onClick handler */}
//               {blog.thumbnailImages && blog.thumbnailImages.length > 0 && (
//                 <motion.div 
//                   className="mb-12"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                 >
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                     <ImageIcon className="w-6 h-6 text-[#E39A65]" />
//                     Photo Gallery
//                   </h3>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {blog.thumbnailImages.map((image, index) => (
//                       <motion.div
//                         key={index}
//                         className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
//                         whileHover={{ scale: 1.05 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                         onClick={() => handleImageClick(image.url, index)}
//                       >
//                         <img 
//                           src={image.url} 
//                           alt={`Gallery ${index + 1}`}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
//                           }}
//                         />
//                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                           <Eye className="w-6 h-6 text-white" />
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}

//               {/* Tags */}
//               {blog.tags && blog.tags.length > 0 && (
//                 <motion.div 
//                   className="border-t border-gray-200 pt-8"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                 >
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                     <Tag className="w-5 h-5 text-[#E39A65]" />
//                     Tags
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {blog.tags.map((tag, index) => (
//                       <motion.span
//                         key={index}
//                         className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-[#E39A65] hover:text-white transition-colors cursor-pointer"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         #{tag}
//                       </motion.span>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
//             </div>

//             {/* Sidebar */}
//             <div className="lg:w-1/3">
//               <div className="sticky top-24 space-y-8">
//                 {/* Author Card */}
//                 <motion.div 
//                   className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <div className="flex items-center gap-4 mb-4">
//                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm">
//                       <img 
//                         src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
//                         alt="Asian Clothify"
//                         className="w-full h-full object-contain"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = 'https://via.placeholder.com/100?text=AC';
//                         }}
//                       />
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900">Asian Clothify</h4>
//                       <p className="text-sm text-gray-500">Official Blog</p>
//                     </div>
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     Expert insights from Asian Clothify's fashion and wholesale specialists. 
//                     Bringing you the latest trends and industry knowledge.
//                   </p>
//                 </motion.div>

//                 {/* Table of Contents */}
//                 <motion.div 
//                   className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                     <BookOpen className="w-5 h-5 text-[#E39A65]" />
//                     Table of Contents
//                   </h4>
//                   <ul className="space-y-3">
//                     <li>
//                       <button 
//                         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                         className="text-sm text-gray-600 hover:text-[#E39A65] flex items-center gap-2 w-full text-left"
//                       >
//                         <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
//                         Introduction
//                       </button>
//                     </li>
//                     {blog.paragraphs?.map((section, index) => (
//                       <li key={index}>
//                         <button 
//                           onClick={() => scrollToSection(`section-${index}`)}
//                           className="text-sm text-gray-600 hover:text-[#E39A65] flex items-center gap-2 w-full text-left"
//                         >
//                           <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
//                           <span className="line-clamp-1">{section.header}</span>
//                         </button>
//                       </li>
//                     ))}
//                     <li>
//                       <button 
//                         onClick={() => {
//                           const tagsSection = document.querySelector('.border-t.border-gray-200.pt-8');
//                           if (tagsSection) {
//                             const yOffset = -100;
//                             const y = tagsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
//                             window.scrollTo({ top: y, behavior: 'smooth' });
//                           }
//                         }}
//                         className="text-sm text-gray-600 hover:text-[#E39A65] flex items-center gap-2 w-full text-left"
//                       >
//                         <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
//                         Tags
//                       </button>
//                     </li>
//                   </ul>
//                 </motion.div>

//                 {/* Related Posts */}
//                 {relatedPosts.length > 0 && (
//                   <motion.div 
//                     className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.4 }}
//                   >
//                     <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                       <FileText className="w-5 h-5 text-[#E39A65]" />
//                       You Might Also Like
//                     </h4>
//                     <div className="space-y-4">
//                       {relatedPosts.map((post) => (
//                         <Link key={post._id} href={`/blog/blogDetailsPage?id=${post._id}`}>
//                           <motion.div 
//                             className="flex gap-6 mb-3 p-1 border-b-gray-300 group cursor-pointer"
//                             whileHover={{ x: 5 }}
//                           >
//                             <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
//                               {post.featuredImage ? (
//                                 <img 
//                                   src={post.featuredImage} 
//                                   alt={post.title} 
//                                   className="w-full h-full object-cover"
//                                   onError={(e) => {
//                                     e.target.onerror = null;
//                                     e.target.src = 'https://via.placeholder.com/100?text=No+Image';
//                                   }}
//                                 />
//                               ) : (
//                                 <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                                   <span className="text-2xl">{getCategoryDetails(post.category).icon}</span>
//                                 </div>
//                               )}
//                             </div>
//                             <div>
//                               <h5 className="text-sm font-medium text-gray-900 group-hover:text-[#E39A65] line-clamp-2">
//                                 {post.title}
//                               </h5>
//                               <p className="text-xs text-gray-500 mt-1">{formatDate(post.publishDate)}</p>
//                             </div>
//                           </motion.div>
//                         </Link>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//       <WhatsAppButton />

//       {/* Global styles for rich text content */}
//       <style jsx global>{`
//         .blog-content {
//           color: #374151;
//           line-height: 1.6;
//         }
        
//         .blog-content h1 {
//           font-size: 2em;
//           margin: 0.5em 0;
//           font-weight: 600;
//           color: #111827;
//         }
        
//         .blog-content h2 {
//           font-size: 1.5em;
//           margin: 0.5em 0;
//           font-weight: 600;
//           color: #111827;
//         }
        
//         .blog-content h3 {
//           font-size: 1.17em;
//           margin: 0.5em 0;
//           font-weight: 600;
//           color: #111827;
//         }
        
//         .blog-content h4 {
//           font-size: 1em;
//           margin: 0.5em 0;
//           font-weight: 600;
//           color: #111827;
//         }
        
//         .blog-content p {
//           margin: 0.75em 0;
//         }
        
//         .blog-content ul {
//           list-style-type: disc;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
        
//         .blog-content ol {
//           list-style-type: decimal;
//           padding-left: 1.5em;
//           margin: 0.5em 0;
//         }
        
//         .blog-content li {
//           margin: 0.25em 0;
//         }
        
//         .blog-content a {
//           color: #2563eb;
//           text-decoration: none;
//           font-weight: 500;
//         }
        
//         .blog-content a:hover {
//           text-decoration: underline;
//           color: #1d4ed8;
//         }
        
//         .blog-content strong {
//           font-weight: 600;
//           color: #111827;
//         }
        
//         .blog-content em {
//           font-style: italic;
//         }
        
//         .blog-content blockquote {
//           border-left: 4px solid #e5e7eb;
//           padding-left: 1em;
//           margin: 1em 0;
//           color: #6b7280;
//         }
        
//         .blog-content code {
//           background-color: #f3f4f6;
//           padding: 0.2em 0.4em;
//           border-radius: 0.25em;
//           font-family: monospace;
//           font-size: 0.875em;
//         }
        
//         .blog-content pre {
//           background-color: #f3f4f6;
//           padding: 1em;
//           border-radius: 0.5em;
//           overflow-x: auto;
//           font-family: monospace;
//           font-size: 0.875em;
//         }
        
//         .blog-content img {
//           max-width: 100%;
//           height: auto;
//           border-radius: 0.5em;
//           margin: 1em 0;
//         }
        
//         .blog-content table {
//           width: 100%;
//           border-collapse: collapse;
//           margin: 1em 0;
//         }
        
//         .blog-content th,
//         .blog-content td {
//           border: 1px solid #e5e7eb;
//           padding: 0.5em;
//           text-align: left;
//         }
        
//         .blog-content th {
//           background-color: #f9fafb;
//           font-weight: 600;
//         }
        
//         .blog-content hr {
//           border: none;
//           border-top: 1px solid #e5e7eb;
//           margin: 1.5em 0;
//         }
//       `}</style>
//     </>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Eye,
  Heart,
  Share2,
  Bookmark,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  ChevronRight,
  AlertCircle,
  Tag,
  Mail,
  Award,
  TrendingUp,
  Leaf,
  Quote,
  Copy,
  Check,
  Star,
  Image as ImageIcon,
  List,
  X,
  ChevronLeft
} from 'lucide-react';
import Footer from '@/app/components/layout/Footer';
import Navbar from '@/app/components/layout/Navbar';
import WhatsAppButton from '@/app/components/layout/WhatsAppButton';

// Jute Theme Colors
const COLORS = {
  primary: '#6B4F3A',
  secondary: '#F5E6D3',
  accent: '#3A7D44',
  neutral: '#FFFFFF',
  lightGray: '#FAF7F2',
  border: '#E5D5C0',
  text: '#2C2420',
  textLight: '#8B7355',
  dark: '#1A1512',
  gold: '#C6A43B'
};

// Blog Categories
const BLOG_CATEGORIES = [
  { value: 'eco-sustainability', label: 'Eco & Sustainability', icon: '🌿', color: '#3A7D44' },
  { value: 'jute-product-guides', label: 'Product Guides', icon: '📖', color: '#4A90E2' },
  { value: 'manufacturing-process', label: 'Manufacturing', icon: '🏭', color: '#E67E22' },
  { value: 'bulk-buying-export', label: 'Bulk & Export', icon: '🚢', color: '#8E44AD' },
  { value: 'jute-industry-trends', label: 'Industry Trends', icon: '📈', color: '#F39C12' },
  { value: 'jute-craft-diy', label: 'Craft & DIY', icon: '✂️', color: '#E74C3C' }
];

export default function BlogDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const blogId = searchParams.get('id');
  
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showTableOfContents, setShowTableOfContents] = useState(true);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  
  // Table of contents state
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');

  // Fetch blog details
  useEffect(() => {
    if (!blogId) {
      setError('No blog ID provided');
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
        const data = await response.json();
        
        if (data.success) {
          setBlog(data.data);
          
          // Extract headings from content for table of contents
          const headingRegex = /<h2>(.*?)<\/h2>/g;
          const matches = [...data.data.content.matchAll(headingRegex)];
          setHeadings(matches.map(match => ({ text: match[1], id: match[1].toLowerCase().replace(/\s/g, '-') })));
          
          // Prepare gallery images
          const images = [];
          if (data.data.featuredImage) {
            images.push({ url: data.data.featuredImage, alt: data.data.title, type: 'featured' });
          }
          if (data.data.thumbnailImages && data.data.thumbnailImages.length > 0) {
            data.data.thumbnailImages.forEach(img => {
              images.push({ url: img.url, alt: data.data.title, type: 'thumbnail' });
            });
          }
          setGalleryImages(images);
          
          // Fetch related posts
          fetchRelatedPosts(data.data.category, data.data._id);
        } else {
          setError(data.message || 'Blog not found');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  // Fetch related posts
  const fetchRelatedPosts = async (category, currentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs?category=${category}&limit=3`);
      const data = await response.json();
      if (data.success) {
        setRelatedPosts(data.data.filter(post => post._id !== currentId).slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get reading time
  const getReadingTime = (content) => {
    if (!content) return '3';
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // Get category details
  const getCategoryDetails = (categoryValue) => {
    return BLOG_CATEGORIES.find(c => c.value === categoryValue) || BLOG_CATEGORIES[0];
  };

  // Share blog
  const shareBlog = (platform) => {
    const url = window.location.href;
    const title = blog?.title;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Scroll to heading
  const scrollToHeading = (id, text) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveHeading(text);
    }
  };

  // Open lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Next image
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  // Previous image
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Track active heading while scrolling
  useEffect(() => {
    const handleScroll = () => {
      const headingsElements = headings.map(h => document.getElementById(h.id));
      for (let i = headingsElements.length - 1; i >= 0; i--) {
        if (headingsElements[i] && window.scrollY >= headingsElements[i].offsetTop - 100) {
          setActiveHeading(headings[i].text);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto">
              <div className="w-16 h-16 border-3 border-[#E5D5C0] border-t-[#6B4F3A] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#6B4F3A] animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-sm" style={{ color: COLORS.textLight }}>Loading article...</p>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center pt-32">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.text }}>Article Not Found</h2>
            <p className="text-sm mb-6" style={{ color: COLORS.textLight }}>
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#6B4F3A] text-white rounded-xl hover:bg-[#5a3e2e] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
        <WhatsAppButton />
      </>
    );
  }

  const category = getCategoryDetails(blog.category);
  const readingTime = getReadingTime(blog.content);

  return (
    <>
      <Navbar />
      
      <main className="bg-[#FAF7F2] min-h-screen">
        {/* ========== HERO BANNER WITH FEATURED IMAGE ========== */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          {blog.featuredImage ? (
            <>
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat cursor-pointer"
                style={{ backgroundImage: `url(${blog.featuredImage})` }}
                onClick={() => openLightbox(0)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#6B4F3A] to-[#3A7D44]" />
          )}
          
          <div className="absolute bottom-0 left-0 right-0 pb-12 pt-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-5 transition-colors text-sm bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span 
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-white shadow-lg"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon} {category.label}
                </span>
              
              
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span>{blog.author}</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* ========== MAIN CONTENT AREA - 2/3 + 1/3 LAYOUT ========== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            
            {/* ========== LEFT COLUMN - 2/3 PORTION ========== */}
            <div className="flex-1 lg:w-2/3">
              {/* Blog Content */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div 
                  className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#2C2420] prose-p:text-[#4a3a2e] prose-p:leading-relaxed prose-a:text-[#6B4F3A] prose-strong:text-[#2C2420] prose-li:text-[#4a3a2e]"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
              
              {/* Excerpt Section */}
              <div className="mt-6 bg-[#F5E6D3] rounded-2xl p-6 border-l-4 border-l-[#6B4F3A]">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: COLORS.primary }}>Excerpt</h3>
                <p className="text-base italic leading-relaxed" style={{ color: COLORS.text }}>
                  {blog.excerpt}
                </p>
              </div>
              
              {/* Additional Sections (Paragraphs) */}
              {blog.paragraphs && blog.paragraphs.length > 0 && (
                <div className="mt-8 space-y-8">
                  {blog.paragraphs.map((paragraph, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                      {paragraph.header && (
                        <h2 
                          id={paragraph.header.toLowerCase().replace(/\s/g, '-')}
                          className="text-xl md:text-2xl font-bold mb-4" 
                          style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}
                        >
                          {paragraph.header}
                        </h2>
                      )}
                      {paragraph.image && (
                        <div className="mb-5 rounded-xl overflow-hidden cursor-pointer" onClick={() => {
                          const imgIndex = galleryImages.findIndex(img => img.url === paragraph.image);
                          openLightbox(imgIndex !== -1 ? imgIndex : 0);
                        }}>
                          <img 
                            src={paragraph.image} 
                            alt={paragraph.header} 
                            className="w-full object-cover max-h-96 hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div 
                        className="prose prose-lg max-w-none prose-p:text-[#4a3a2e] prose-p:leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: paragraph.description }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* YouTube Video Section */}
              {blog.youtubeVideo && blog.youtubeVideo.videoId && (
                <div className="mt-8 bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      src={`https://www.youtube.com/embed/${blog.youtubeVideo.videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Thumbnail Gallery */}
              {blog.thumbnailImages && blog.thumbnailImages.length > 0 && (
                <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}>
                    <ImageIcon className="w-5 h-5" style={{ color: COLORS.primary }} />
                    Image Gallery
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {blog.thumbnailImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        className="rounded-lg overflow-hidden aspect-square cursor-pointer group"
                        onClick={() => openLightbox(idx + 1)}
                      >
                        <img 
                          src={img.url} 
                          alt={`Gallery ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags Section */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5" style={{ color: COLORS.primary }} />
                    <span className="text-sm font-semibold" style={{ color: COLORS.text }}>Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-[#FAF7F2] border border-[#E5D5C0] rounded-full text-xs hover:bg-[#F5E6D3] transition-colors cursor-pointer"
                        style={{ color: COLORS.textLight }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

          

          
            </div>

            {/* ========== RIGHT SIDEBAR - 1/3 PORTION ========== */}
            <aside className="lg:w-1/3">
              <div className="sticky top-24 space-y-6">
                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div className="bg-white rounded-xl border border-[#E5D5C0] p-5 shadow-sm">
                    <h3 className="font-semibold text-sm mb-4 flex items-center gap-2 pb-3 border-b border-[#E5D5C0]" style={{ color: COLORS.text }}>
                      <List className="w-4 h-4" style={{ color: COLORS.primary }} />
                      Table of Contents
                    </h3>
                    <nav className="space-y-2 max-h-64 overflow-y-auto">
                      {headings.map((heading, idx) => (
                        <button
                          key={idx}
                          onClick={() => scrollToHeading(heading.id, heading.text)}
                          className={`text-xs block w-full text-left px-3 py-2 rounded-lg transition-all ${
                            activeHeading === heading.text
                              ? 'bg-[#F5E6D3] text-[#6B4F3A] font-medium'
                              : 'text-gray-500 hover:bg-[#FAF7F2] hover:text-[#6B4F3A]'
                          }`}
                        >
                          {heading.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Author Card */}
                <div className="bg-gradient-to-br from-[#6B4F3A] to-[#8B6B51] rounded-xl p-5 text-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">About the Author</h4>
                      <p className="text-sm font-medium">{blog.author}</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Expert in sustainable jute products with over 10 years of experience in the industry. Passionate about eco-friendly alternatives and green living.
                  </p>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-center">
                      <div>
                        <div className="text-lg font-bold">50+</div>
                        <div className="text-xs text-white/60">Articles</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">10+</div>
                        <div className="text-xs text-white/60">Years Exp</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">500+</div>
                        <div className="text-xs text-white/60">Followers</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white rounded-xl border border-[#E5D5C0] overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-[#E5D5C0] bg-[#FAF7F2]">
                      <h3 className="font-semibold text-sm flex items-center gap-2" style={{ color: COLORS.text }}>
                        <Star className="w-4 h-4" style={{ color: COLORS.gold }} />
                        Related Articles
                      </h3>
                    </div>
                    <div className="p-4 space-y-4">
                      {relatedPosts.map((post) => (
                        <Link key={post._id} href={`/blog/blogDetailsPage?id=${post._id}`}>
                          <div className="group cursor-pointer">
                            <div className="flex gap-3">
                              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[#FAF7F2]">
                                {post.featuredImage ? (
                                  <img
                                    src={post.featuredImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-[#6B4F3A]/20 to-[#3A7D44]/20 flex items-center justify-center">
                                    <ImageIcon className="w-6 h-6" style={{ color: COLORS.textLight }} />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-[#6B4F3A] transition-colors" style={{ color: COLORS.text }}>
                                  {post.title}
                                </h4>
                                <div className="flex items-center gap-2 text-xs mt-1" style={{ color: COLORS.textLight }}>
                                  <span>{post.author}</span>
                               
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter Card */}
                {/* <div className="bg-gradient-to-br from-[#3A7D44] to-[#2d6335] rounded-xl p-5 text-white shadow-lg">
                  <div className="text-center">
                    <Mail className="w-8 h-8 mx-auto mb-3 text-white/80" />
                    <h4 className="font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Weekly Newsletter</h4>
                    <p className="text-xs text-white/70 mb-4">Get the latest articles delivered to your inbox</p>
                    <div className="flex flex-col gap-2">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/30 outline-none"
                      />
                      <button className="px-4 py-2 bg-[#C6A43B] text-[#1A1512] text-sm font-medium rounded-lg hover:bg-[#D4B85C] transition-colors">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div> */}

                {/* Quote Card */}
                <div className="bg-[#F5E6D3] rounded-xl p-5 text-center">
                  <Quote className="w-8 h-8 mx-auto mb-3 opacity-50" style={{ color: COLORS.primary }} />
                  <p className="text-sm italic" style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}>
                    "Jute is not just a fiber; it's a sustainable future for our planet."
                  </p>
                  <p className="text-xs mt-2" style={{ color: COLORS.textLight }}>- Industry Expert</p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ========== LIGHTBOX MODAL ========== */}
        {lightboxOpen && galleryImages.length > 0 && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-5 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-5 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            
            <div className="max-w-5xl max-h-[90vh] mx-4">
              <img
                src={galleryImages[currentImageIndex]?.url}
                alt={galleryImages[currentImageIndex]?.alt || 'Gallery image'}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-5 left-0 right-0 text-center text-white/60 text-sm">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        )}

     
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}