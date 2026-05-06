// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Navbar from '../components/layout/Navbar';

// import WhatsAppButton from '../components/layout/WhatsAppButton';
// import { 
//   Calendar, 
//   User, 
//   ChevronRight, 
//   Search,
//   Clock,
//   ArrowRight,
//   BookOpen,
//   Leaf,
//   ChevronLeft,
//   X,
//   Eye,
//   Bookmark,
//   Award,
//   TrendingUp
// } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Footer from '../components/layout/Footer';

// // Jute Theme Colors
// const COLORS = {
//   primary: '#6B4F3A',
//   secondary: '#F5E6D3',
//   accent: '#3A7D44',
//   neutral: '#FFFFFF',
//   lightGray: '#FAF7F2',
//   border: '#E5D5C0',
//   text: '#2C2420',
//   textLight: '#8B7355',
//   dark: '#1A1512',
//   gold: '#C6A43B'
// };

// // Blog Categories
// const BLOG_CATEGORIES = [
//   { value: 'all', label: 'All Articles', icon: '📚', color: COLORS.primary },
//   { value: 'eco-sustainability', label: 'Eco & Sustainability', icon: '🌿', color: '#3A7D44' },
//   { value: 'jute-product-guides', label: 'Product Guides', icon: '📖', color: '#4A90E2' },
//   { value: 'manufacturing-process', label: 'Manufacturing', icon: '🏭', color: '#E67E22' },
//   { value: 'bulk-buying-export', label: 'Bulk & Export', icon: '🚢', color: '#8E44AD' },
//   { value: 'jute-industry-trends', label: 'Industry Trends', icon: '📈', color: '#F39C12' },
//   { value: 'jute-craft-diy', label: 'Craft & DIY', icon: '✂️', color: '#E74C3C' }
// ];

// export default function BlogPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [latestFeaturedPost, setLatestFeaturedPost] = useState(null);
//   const [moreFeaturedPosts, setMoreFeaturedPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [savedPosts, setSavedPosts] = useState([]);
  
//   const blogsPerPage = 6;

//   // Fetch all blogs first, then use first 4 as featured
//   useEffect(() => {
//     const fetchAllBlogs = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/blogs?limit=4&sort=-publishDate');
//         const data = await response.json();
//         if (data.success && data.data.length > 0) {
//           setLatestFeaturedPost(data.data[0]);
//           setMoreFeaturedPosts(data.data.slice(1, 4));
//         }
//       } catch (error) {
//         console.error('Error fetching featured posts:', error);
//       }
//     };

//     fetchAllBlogs();
//   }, []);

//   // Fetch blogs with pagination and category
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       setLoading(true);
//       try {
//         const params = new URLSearchParams({
//           page: currentPage,
//           limit: blogsPerPage,
//           ...(selectedCategory !== 'all' && { category: selectedCategory }),
//           ...(searchTerm && { search: searchTerm })
//         });

//         const response = await fetch(`http://localhost:5000/api/blogs?${params}`);
//         const data = await response.json();

//         if (data.success) {
//           setBlogs(data.data);
//           setTotalPages(data.pagination.pages);
//         }
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const timer = setTimeout(() => {
//       fetchBlogs();
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [currentPage, selectedCategory, searchTerm]);

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   // Get reading time
//   const getReadingTime = (content) => {
//     if (!content) return '3';
//     const wordsPerMinute = 200;
//     const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
//     const minutes = Math.ceil(wordCount / wordsPerMinute);
//     return minutes;
//   };

//   // Get category details
//   const getCategoryDetails = (categoryValue) => {
//     return BLOG_CATEGORIES.find(c => c.value === categoryValue) || BLOG_CATEGORIES[0];
//   };

//   // Clear search
//   const clearSearch = () => {
//     setSearchTerm('');
//     setCurrentPage(1);
//   };

//   // Handle category change
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setCurrentPage(1);
//   };

//   // Toggle save post
//   const toggleSavePost = (blogId, e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setSavedPosts(prev => 
//       prev.includes(blogId) 
//         ? prev.filter(id => id !== blogId)
//         : [...prev, blogId]
//     );
//   };

//   // Animation variants
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0 },
//     hover: { 
//       y: -8,
//       transition: { type: "spring", stiffness: 400, damping: 17 }
//     }
//   };

//   return (
//     <>
//       <Navbar />
      
//       <main className="bg-[#FAF7F2] min-h-screen pt-28 pb-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          
//           {/* ========== SIMPLE HEADER ========== */}
//           <motion.div 
//             className="mb-10"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}>
//               Blog
//             </h1>
//             <div className="w-16 h-0.5 bg-[#C6A43B] mt-2"></div>
//             <p className="text-sm mt-3" style={{ color: COLORS.textLight }}>
//               Insights, trends, and stories from the world of jute
//             </p>
//           </motion.div>

//           {/* ========== SECTION 1: 2-COLUMN FEATURED POSTS (Details on Image) ========== */}
//           {latestFeaturedPost && moreFeaturedPosts.length > 0 && !searchTerm && selectedCategory === 'all' && (
//             <motion.div 
//               className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16"
//               initial="hidden"
//               animate="visible"
//               variants={fadeInUp}
//             >
//               {/* LEFT COLUMN - 2/3 width - Latest Featured Post - Details on Image */}
//               <motion.div 
//                 className="lg:col-span-2 group cursor-pointer"
//                 variants={cardVariants}
//                 whileHover="hover"
//               >
//                 <Link href={`/blog/blogDetailsPage?id=${latestFeaturedPost._id}`}>
//                   <div className="relative overflow-hidden rounded-2xl h-[500px]">
//                     {latestFeaturedPost.featuredImage ? (
//                       <motion.img
//                         src={latestFeaturedPost.featuredImage}
//                         alt={latestFeaturedPost.title}
//                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-gradient-to-br from-[#6B4F3A] to-[#3A7D44] flex items-center justify-center">
//                         <BookOpen className="w-20 h-20 text-white/30" />
//                       </div>
//                     )}
                    
//                     {/* Dark Overlay for text readability */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    
//                     {/* Content Overlay on Image */}
//                     <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
//                       {/* Featured Badge */}
//                       <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#C6A43B] to-[#D4B85C] rounded-full shadow-lg mb-4">
//                         <Award className="w-3.5 h-3.5 text-[#1A1512]" />
//                         <span className="text-xs font-bold text-[#1A1512]">LATEST FEATURED</span>
//                       </div>

//                       {/* Category Badge */}
//                       <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full mb-4">
//                         <span className="text-sm">
//                           {getCategoryDetails(latestFeaturedPost.category).icon}
//                         </span>
//                         <span className="text-xs text-white">
//                           {getCategoryDetails(latestFeaturedPost.category).label}
//                         </span>
//                       </div>
                      
//                       <h2 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                         {latestFeaturedPost.title}
//                       </h2>
                      
//                       <p className="text-sm mb-4 line-clamp-2 text-white/80">
//                         {latestFeaturedPost.excerpt || latestFeaturedPost.content?.replace(/<[^>]*>/g, '').slice(0, 120) + '...'}
//                       </p>
                      
//                       <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 mb-4">
                        
//                         <div className="flex items-center gap-1.5">
//                           <User className="w-3.5 h-3.5" />
//                           <span>{latestFeaturedPost.author}</span>
//                         </div>
                     
//                       </div>
                      
//                       <motion.div 
//                         className="inline-flex items-center gap-2 text-sm font-semibold text-[#C6A43B]"
//                         whileHover={{ gap: 8 }}
//                       >
//                         Read Full Article
//                         <ArrowRight className="w-4 h-4" />
//                       </motion.div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>

//               {/* RIGHT COLUMN - 1/3 width - 3 More Featured Posts (List Cards) */}
//               <div className="space-y-4">
//                 <div className="flex items-center gap-2 mb-3">
//                   <TrendingUp className="w-4 h-4" style={{ color: COLORS.primary }} />
//                   <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.primary }}>
//                     More Featured Posts
//                   </span>
//                 </div>
//             {moreFeaturedPosts.map((post, idx) => {
//   const category = getCategoryDetails(post.category);
//   return (
//     <motion.div
//       key={post._id}
//       className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
//       variants={cardVariants}
//       whileHover="hover"
//     >
//       <Link href={`/blog/blogDetailsPage?id=${post._id}`}>
//         <div className="flex gap-4 p-4">
//           <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[#FAF7F2]">
//             {post.featuredImage ? (
//               <motion.img
//                 src={post.featuredImage}
//                 alt={post.title}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//               />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-[#6B4F3A]/20 to-[#3A7D44]/20 flex items-center justify-center">
//                 <BookOpen className="w-6 h-6" style={{ color: COLORS.textLight }} />
//               </div>
//             )}
//           </div>
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-1">
//               <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
//                 {category.icon} {category.label}
//               </span>
//               {idx === 0 && (
//                 <span className="text-xs px-1.5 py-0.5 rounded bg-[#C6A43B]/20 text-[#C6A43B]">
//                   🔥 Trending
//                 </span>
//               )}
//             </div>
//             <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-[#6B4F3A] transition-colors" style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}>
//               {post.title}
//             </h3>
//             <div className="flex items-center gap-2 text-xs" style={{ color: COLORS.textLight }}>
//               <div className="flex items-center gap-1">
//                 <User className="w-3 h-3" />
//                 <span className="truncate max-w-[100px]">{post.author}</span>
//               </div>
           
//             </div>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// })}
//               </div>
//             </motion.div>
//           )}

//           {/* ========== SECTION 2: BROWSE BY CATEGORY WITH TABS & SEARCH ========== */}
//           <motion.div 
//             className="mb-10"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//               <div className="flex items-center gap-2">
//                 <div className="w-1 h-6 rounded-full" style={{ backgroundColor: COLORS.primary }}></div>
//                 <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}>
//                   Browse by Category
//                 </h2>
//               </div>
              
//               {/* Search Field */}
//               <div className="relative w-full md:w-80">
//                 <input
//                   type="text"
//                   placeholder="Search articles..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-4 py-2.5 pl-10 bg-white border border-[#E5D5C0] rounded-xl focus:ring-2 focus:ring-[#6B4F3A]/20 focus:border-[#6B4F3A] outline-none transition-all text-sm"
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: COLORS.textLight }} />
//                 {searchTerm && (
//                   <button
//                     onClick={clearSearch}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                   >
//                     <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Category Tabs */}
//             <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto scrollbar-hide">
//               {BLOG_CATEGORIES.map((category) => (
//                 <motion.button
//                   key={category.value}
//                   onClick={() => handleCategoryChange(category.value)}
//                   className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
//                     selectedCategory === category.value
//                       ? 'text-white shadow-md'
//                       : 'bg-white border border-[#E5D5C0] text-[#2C2420] hover:border-[#6B4F3A] hover:shadow-sm'
//                   }`}
//                   style={selectedCategory === category.value ? { backgroundColor: category.color } : {}}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <span className="mr-1.5">{category.icon}</span>
//                   {category.label}
//                 </motion.button>
//               ))}
//             </div>

//             {/* Active Filters Info */}
//             {(selectedCategory !== 'all' || searchTerm) && (
//               <div className="mt-4 flex flex-wrap items-center gap-3">
//                 <p className="text-sm" style={{ color: COLORS.textLight }}>
//                   Showing <span className="font-semibold" style={{ color: COLORS.primary }}>{blogs.length}</span> articles
//                   {selectedCategory !== 'all' && (
//                     <span> in <span className="font-medium">{BLOG_CATEGORIES.find(c => c.value === selectedCategory)?.label}</span></span>
//                   )}
//                   {searchTerm && (
//                     <span> matching <span className="font-medium">"{searchTerm}"</span></span>
//                   )}
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSelectedCategory('all');
//                     clearSearch();
//                   }}
//                   className="text-xs flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-[#E5D5C0] hover:bg-[#FAF7F2] transition-colors"
//                   style={{ color: COLORS.primary }}
//                 >
//                   <X className="w-3 h-3" />
//                   Clear all filters
//                 </button>
//               </div>
//             )}
//           </motion.div>

//           {/* ========== SECTION 3: BLOG GRID - 6 POSTS PER PAGE ========== */}
//           {loading ? (
//             <div className="flex justify-center py-20">
//               <div className="relative">
//                 <div className="w-12 h-12 border-3 border-[#E5D5C0] border-t-[#6B4F3A] rounded-full animate-spin"></div>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <Leaf className="w-4 h-4 text-[#6B4F3A] animate-pulse" />
//                 </div>
//               </div>
//             </div>
//           ) : blogs.length === 0 ? (
//             <motion.div 
//               className="text-center py-20 bg-white rounded-2xl border border-[#E5D5C0]"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//             >
//               <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.textLight }} />
//               <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.text }}>No articles found</h3>
//               <p className="text-sm" style={{ color: COLORS.textLight }}>Try adjusting your search or category selection</p>
//             </motion.div>
//           ) : (
//             <>
//               <motion.div 
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                 variants={staggerContainer}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//               >
//                 <AnimatePresence mode="wait">
//                   {blogs.map((blog) => {
//                     const category = getCategoryDetails(blog.category);
//                     const isSaved = savedPosts.includes(blog._id);
                    
//                     return (
//                       <motion.article
//                         key={blog._id}
//                         variants={cardVariants}
//                         whileHover="hover"
//                         layout
//                         exit={{ opacity: 0, scale: 0.8 }}
//                         className="group bg-white rounded-xl border border-[#E5D5C0] overflow-hidden hover:shadow-xl transition-all duration-300"
//                       >
//                         <Link href={`/blog/blogDetailsPage?id=${blog._id}`}>
//                           {/* Image Container */}
//                           <div className="relative h-52 overflow-hidden bg-[#FAF7F2]">
//                             {blog.featuredImage ? (
//                               <motion.img
//                                 src={blog.featuredImage}
//                                 alt={blog.title}
//                                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                               />
//                             ) : (
//                               <div className="w-full h-full bg-gradient-to-br from-[#6B4F3A]/10 to-[#3A7D44]/10 flex items-center justify-center">
//                                 <BookOpen className="w-10 h-10" style={{ color: COLORS.textLight }} />
//                               </div>
//                             )}
                            
//                             {/* Category Badge */}
//                             <div 
//                               className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium text-white shadow-md"
//                               style={{ backgroundColor: category.color }}
//                             >
//                               <span className="mr-1">{category.icon}</span>
//                               <span>{category.label}</span>
//                             </div>

//                             {/* Save Button */}
//                             <button
//                               onClick={(e) => toggleSavePost(blog._id, e)}
//                               className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-md"
//                             >
//                               <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#6B4F3A] text-[#6B4F3A]' : 'text-gray-500'}`} />
//                             </button>

//                             {/* Reading Time Overlay */}
//                             <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
//                               <Clock className="w-3 h-3 text-white/80" />
//                               <span className="text-xs text-white/80">{getReadingTime(blog.content)} min read</span>
//                             </div>
//                           </div>

//                           {/* Content */}
//                           <div className="p-5">
//                             {/* Meta Info */}
//                             <div className="flex items-center gap-3 text-xs mb-3" style={{ color: COLORS.textLight }}>
//                               <div className="flex items-center gap-1">
//                                 <Calendar className="w-3 h-3" />
//                                 <span>{formatDate(blog.publishDate)}</span>
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <User className="w-3 h-3" />
//                                 <span className="truncate max-w-[100px]">{blog.author}</span>
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <Eye className="w-3 h-3" />
//                                 <span>1.2k</span>
//                               </div>
//                             </div>
                            
//                             {/* Title */}
//                             <h3 className="font-bold mb-2 group-hover:text-[#6B4F3A] transition-colors line-clamp-2 text-lg" style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}>
//                               {blog.title}
//                             </h3>
                            
//                             {/* Excerpt */}
//                             <p className="text-sm mb-4 line-clamp-2" style={{ color: COLORS.textLight }}>
//                               {blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').slice(0, 100) + '...'}
//                             </p>
                            
//                             {/* Read More Link */}
//                             <motion.div 
//                               className="inline-flex items-center gap-2 text-sm font-medium"
//                               style={{ color: COLORS.primary }}
//                               whileHover={{ gap: 6 }}
//                             >
//                               Read More
//                               <ChevronRight className="w-3.5 h-3.5" />
//                             </motion.div>
//                           </div>
//                         </Link>
//                       </motion.article>
//                     );
//                   })}
//                 </AnimatePresence>
//               </motion.div>

//               {/* ========== PAGINATION ========== */}
//               {totalPages > 1 && (
//                 <motion.div 
//                   className="flex justify-center gap-2 mt-12"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                 >
//                   <button
//                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                     className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5D5C0] bg-white disabled:opacity-40 hover:border-[#6B4F3A] transition-all"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>
                  
//                   {[...Array(Math.min(totalPages, 5))].map((_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= totalPages - 2) {
//                       pageNum = totalPages - 4 + i;
//                     } else {
//                       pageNum = currentPage - 2 + i;
//                     }
                    
//                     const isActive = currentPage === pageNum;
                    
//                     return (
//                       <motion.button
//                         key={pageNum}
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`w-10 h-10 rounded-xl font-medium transition-all ${
//                           isActive
//                             ? 'text-white shadow-md'
//                             : 'bg-white border border-[#E5D5C0] text-gray-600 hover:border-[#6B4F3A]'
//                         }`}
//                         style={isActive ? { backgroundColor: COLORS.primary } : {}}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         {pageNum}
//                       </motion.button>
//                     );
//                   })}
                  
//                   {totalPages > 5 && currentPage < totalPages - 2 && (
//                     <span className="w-10 flex items-center justify-center text-gray-400">...</span>
//                   )}
                  
//                   <button
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5D5C0] bg-white disabled:opacity-40 hover:border-[#6B4F3A] transition-all"
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </motion.div>
//               )}
//             </>
//           )}
//         </div>
//       </main>

//       <Footer />
//       <WhatsAppButton />

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import { 
  Calendar, 
  User, 
  ChevronRight, 
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  Leaf,
  ChevronLeft,
  X,
  Eye,
  Bookmark,
  Award,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  { value: 'all', label: 'All Articles', icon: '📚', color: COLORS.primary },
  { value: 'eco-sustainability', label: 'Eco & Sustainability', icon: '🌿', color: '#3A7D44' },
  { value: 'jute-product-guides', label: 'Product Guides', icon: '📖', color: '#4A90E2' },
  { value: 'manufacturing-process', label: 'Manufacturing', icon: '🏭', color: '#E67E22' },
  { value: 'bulk-buying-export', label: 'Bulk & Export', icon: '🚢', color: '#8E44AD' },
  { value: 'jute-industry-trends', label: 'Industry Trends', icon: '📈', color: '#F39C12' },
  { value: 'jute-craft-diy', label: 'Craft & DIY', icon: '✂️', color: '#E74C3C' }
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [latestFeaturedPost, setLatestFeaturedPost] = useState(null);
  const [moreFeaturedPosts, setMoreFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [savedPosts, setSavedPosts] = useState([]);
  
  const blogsPerPage = 6;

  // Fetch all blogs first, then use first 4 as featured
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs?limit=4&sort=-publishDate');
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setLatestFeaturedPost(data.data[0]);
          setMoreFeaturedPosts(data.data.slice(1, 4));
        }
      } catch (error) {
        console.error('Error fetching featured posts:', error);
      }
    };

    fetchAllBlogs();
  }, []);

  // Fetch blogs with pagination and category
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: blogsPerPage,
          ...(selectedCategory !== 'all' && { category: selectedCategory }),
          ...(searchTerm && { search: searchTerm })
        });

        const response = await fetch(`http://localhost:5000/api/blogs?${params}`);
        const data = await response.json();

        if (data.success) {
          setBlogs(data.data);
          setTotalPages(data.pagination.pages);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchBlogs();
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, selectedCategory, searchTerm]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
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

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Toggle save post
  const toggleSavePost = (blogId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedPosts(prev => 
      prev.includes(blogId) 
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      y: -8,
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="bg-[#FAF7F2] min-h-screen pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          
          {/* ========== SIMPLE HEADER ========== */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}>
              Blog
            </h1>
            <div className="w-16 h-0.5 bg-[#C6A43B] mt-2"></div>
            <p className="text-sm mt-3" style={{ color: COLORS.textLight }}>
              Insights, trends, and stories from the world of jute
            </p>
          </motion.div>

          {/* ========== SECTION 1: 2-COLUMN FEATURED POSTS (ALWAYS VISIBLE) ========== */}
          {latestFeaturedPost && moreFeaturedPosts.length > 0 && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {/* LEFT COLUMN - 2/3 width - Latest Featured Post - Details on Image */}
              <motion.div 
                className="lg:col-span-2 group cursor-pointer"
                variants={cardVariants}
                whileHover="hover"
              >
                <Link href={`/blog/blogDetailsPage?id=${latestFeaturedPost._id}`}>
                  <div className="relative overflow-hidden rounded-2xl h-[500px]">
                    {latestFeaturedPost.featuredImage ? (
                      <motion.img
                        src={latestFeaturedPost.featuredImage}
                        alt={latestFeaturedPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#6B4F3A] to-[#3A7D44] flex items-center justify-center">
                        <BookOpen className="w-20 h-20 text-white/30" />
                      </div>
                    )}
                    
                    {/* Dark Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    
                    {/* Content Overlay on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      {/* Featured Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#C6A43B] to-[#D4B85C] rounded-full shadow-lg mb-4">
                        <Award className="w-3.5 h-3.5 text-[#1A1512]" />
                        <span className="text-xs font-bold text-[#1A1512]">LATEST FEATURED</span>
                      </div>

                      {/* Category Badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full mb-4">
                        <span className="text-sm">
                          {getCategoryDetails(latestFeaturedPost.category).icon}
                        </span>
                        <span className="text-xs text-white">
                          {getCategoryDetails(latestFeaturedPost.category).label}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 line-clamp-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {latestFeaturedPost.title}
                      </h2>
                      
                      <p className="text-sm mb-4 line-clamp-2 text-white/80">
                        {latestFeaturedPost.excerpt || latestFeaturedPost.content?.replace(/<[^>]*>/g, '').slice(0, 120) + '...'}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs text-white/70 mb-4">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          <span>{latestFeaturedPost.author}</span>
                        </div>
                      </div>
                      
                      <motion.div 
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#C6A43B]"
                        whileHover={{ gap: 8 }}
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* RIGHT COLUMN - 1/3 width - 3 More Featured Posts (List Cards) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4" style={{ color: COLORS.primary }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: COLORS.primary }}>
                    More Featured Posts
                  </span>
                </div>
                {moreFeaturedPosts.map((post, idx) => {
                  const category = getCategoryDetails(post.category);
                  return (
                    <motion.div
                      key={post._id}
                      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <Link href={`/blog/blogDetailsPage?id=${post._id}`}>
                        <div className="flex gap-4 p-4">
                          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-[#FAF7F2]">
                            {post.featuredImage ? (
                              <motion.img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#6B4F3A]/20 to-[#3A7D44]/20 flex items-center justify-center">
                                <BookOpen className="w-6 h-6" style={{ color: COLORS.textLight }} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: `${category.color}15`, color: category.color }}>
                                {category.icon} {category.label}
                              </span>
                              {idx === 0 && (
                                <span className="text-xs px-1.5 py-0.5 rounded bg-[#C6A43B]/20 text-[#C6A43B]">
                                  🔥 Trending
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-[#6B4F3A] transition-colors" style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}>
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs flex-wrap" style={{ color: COLORS.textLight }}>
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span className="truncate max-w-[100px]">{post.author}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ========== SECTION 2: BROWSE BY CATEGORY WITH TABS & SEARCH ========== */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: COLORS.primary }}></div>
                <h2 className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}>
                  Browse by Category
                </h2>
              </div>
              
              {/* Search Field */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 bg-white border border-[#E5D5C0] rounded-xl focus:ring-2 focus:ring-[#6B4F3A]/20 focus:border-[#6B4F3A] outline-none transition-all text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: COLORS.textLight }} />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs - Scrollable on mobile, single row */}
            <div 
              className="flex flex-nowrap gap-2 pb-3 overflow-x-auto scrollbar-hide"
              style={{ 
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {BLOG_CATEGORIES.map((category) => (
                <motion.button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                    selectedCategory === category.value
                      ? 'text-white shadow-md'
                      : 'bg-white border border-[#E5D5C0] text-[#2C2420] hover:border-[#6B4F3A] hover:shadow-sm'
                  }`}
                  style={selectedCategory === category.value ? { backgroundColor: category.color } : {}}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="mr-1.5">{category.icon}</span>
                  {category.label}
                </motion.button>
              ))}
            </div>

            {/* Active Filters Info */}
            {(selectedCategory !== 'all' || searchTerm) && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <p className="text-sm" style={{ color: COLORS.textLight }}>
                  Showing articles
                  {selectedCategory !== 'all' && (
                    <span> in <span className="font-medium">{BLOG_CATEGORIES.find(c => c.value === selectedCategory)?.label}</span></span>
                  )}
                  {searchTerm && (
                    <span> matching <span className="font-medium">"{searchTerm}"</span></span>
                  )}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    clearSearch();
                  }}
                  className="text-xs flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-[#E5D5C0] hover:bg-[#FAF7F2] transition-colors"
                  style={{ color: COLORS.primary }}
                >
                  <X className="w-3 h-3" />
                  Clear all filters
                </button>
              </div>
            )}
          </motion.div>

          {/* ========== SECTION 3: BLOG GRID - 6 POSTS PER PAGE ========== */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="w-12 h-12 border-3 border-[#E5D5C0] border-t-[#6B4F3A] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-[#6B4F3A] animate-pulse" />
                </div>
              </div>
            </div>
          ) : blogs.length === 0 ? (
            <motion.div 
              className="text-center py-20 bg-white rounded-2xl border border-[#E5D5C0]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: COLORS.textLight }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.text }}>No articles found</h3>
              <p className="text-sm" style={{ color: COLORS.textLight }}>Try adjusting your search or category selection</p>
            </motion.div>
          ) : (
            <>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <AnimatePresence mode="wait">
                  {blogs.map((blog) => {
                    const category = getCategoryDetails(blog.category);
                    const isSaved = savedPosts.includes(blog._id);
                    
                    return (
                      <motion.article
                        key={blog._id}
                        variants={cardVariants}
                        whileHover="hover"
                        layout
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="group bg-white rounded-xl border border-[#E5D5C0] overflow-hidden hover:shadow-xl transition-all duration-300"
                      >
                        <Link href={`/blog/blogDetailsPage?id=${blog._id}`}>
                          {/* Image Container */}
                          <div className="relative h-52 overflow-hidden bg-[#FAF7F2]">
                            {blog.featuredImage ? (
                              <motion.img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-[#6B4F3A]/10 to-[#3A7D44]/10 flex items-center justify-center">
                                <BookOpen className="w-10 h-10" style={{ color: COLORS.textLight }} />
                              </div>
                            )}
                            
                            {/* Category Badge */}
                            <div 
                              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium text-white shadow-md"
                              style={{ backgroundColor: category.color }}
                            >
                              <span className="mr-1">{category.icon}</span>
                              <span>{category.label}</span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            {/* Meta Info */}
                            <div className="flex items-center gap-3 text-xs mb-3 flex-wrap" style={{ color: COLORS.textLight }}>
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span className="truncate max-w-[100px]">{blog.author}</span>
                              </div>
                            </div>
                            
                            {/* Title */}
                            <h3 className="font-bold mb-2 group-hover:text-[#6B4F3A] transition-colors line-clamp-2 text-lg" style={{ fontFamily: 'Playfair Display, serif', color: COLORS.text }}>
                              {blog.title}
                            </h3>
                            
                            {/* Excerpt */}
                            <p className="text-sm mb-4 line-clamp-2" style={{ color: COLORS.textLight }}>
                              {blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').slice(0, 100) + '...'}
                            </p>
                            
                            {/* Read More Link */}
                            <motion.div 
                              className="inline-flex items-center gap-2 text-sm font-medium"
                              style={{ color: COLORS.primary }}
                              whileHover={{ gap: 6 }}
                            >
                              Read More
                              <ChevronRight className="w-3.5 h-3.5" />
                            </motion.div>
                          </div>
                        </Link>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* ========== PAGINATION ========== */}
              {totalPages > 1 && (
                <motion.div 
                  className="flex justify-center gap-2 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5D5C0] bg-white disabled:opacity-40 hover:border-[#6B4F3A] transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    const isActive = currentPage === pageNum;
                    
                    return (
                      <motion.button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl font-medium transition-all ${
                          isActive
                            ? 'text-white shadow-md'
                            : 'bg-white border border-[#E5D5C0] text-gray-600 hover:border-[#6B4F3A]'
                        }`}
                        style={isActive ? { backgroundColor: COLORS.primary } : {}}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="w-10 flex items-center justify-center text-gray-400">...</span>
                  )}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#E5D5C0] bg-white disabled:opacity-40 hover:border-[#6B4F3A] transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}