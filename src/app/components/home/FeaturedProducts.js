'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Loader2, 
  Sparkles, 
  TrendingUp, 
  Award, 
  Flame, 
  Tag, 
  Zap, 
  Crown, 
  Star, 
  ChevronRight, 
  Users, 
  ChevronDown, 
  ChevronUp,
  ShoppingCart,
  Eye,
  Package,
  Ruler,
  Palette,
  Leaf,
  Truck,
  Scissors,
  Gem,
  Heart,
  Shield,
  Clock,
  ArrowRight,
  Grid3x3,
  LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Jute Theme Tags
const TAGS = [
  { id: 'all', name: 'All Products', icon: <LayoutGrid className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  { id: 'Best Seller', name: 'Best Seller', icon: <Crown className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  { id: 'New Arrival', name: 'New Arrival', icon: <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  { id: 'Top Deal', name: 'Top Deal', icon: <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  { id: 'Eco-Friendly', name: 'Eco-Friendly', icon: <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  { id: 'Hot Export Item', name: 'Hot Export', icon: <Truck className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  { id: 'Customizable', name: 'Customizable', icon: <Scissors className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  { id: 'Premium Quality', name: 'Premium', icon: <Gem className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
  { id: 'Trending', name: 'Trending', icon: <Flame className="w-3.5 h-3.5 md:w-4 md:h-4" /> },
];

// Color Palette
const COLORS = {
  primary: '#6B4F3A',
  secondary: '#F5E6D3',
  accent: '#3A7D44',
  neutral: '#FFFFFF',
  lightGray: '#FAF7F2',
  border: '#E5D5C0',
  text: '#333333',
  textLight: '#8B7355',
  textMuted: '#A8947A'
};

// Tag styling for product badges
const getTagStyles = (tag) => {
  const styles = {
    'Best Seller': `bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30`,
    'New Arrival': `bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30`,
    'Top Deal': `bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/30`,
    'Eco-Friendly': `bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30`,
    'Hot Export Item': `bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30`,
    'Customizable': `bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/30`,
    'Premium Quality': `bg-gradient-to-r from-amber-600 to-yellow-700 text-white shadow-lg shadow-amber-600/30`,
    'Trending': `bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30`,
  };
  return styles[tag] || `bg-gradient-to-r from-[${COLORS.primary}] to-[#8B6B51] text-white`;
};

// Helper for targeted audience badge styling
const getTargetedAudienceStyle = (audience) => {
  const styles = {
    'ladies': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
    'gents': 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white',
    'kids': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    'unisex': 'bg-gradient-to-r from-purple-500 to-violet-500 text-white',
  };
  return styles[audience] || `bg-gradient-to-r from-[${COLORS.primary}] to-[#8B6B51] text-white`;
};

// Get unit label helper
const getUnitLabel = (orderUnit) => {
  switch(orderUnit) {
    case 'kg': return 'kg';
    case 'ton': return 'MT';
    default: return 'pc';
  }
};

// Format bulk range display
// Format bulk range display with dynamic unit label
const formatBulkRange = (range, unitLabel = 'pcs') => {
  if (!range) return '';
  if (range.includes('-')) {
    const [min, max] = range.split('-');
    return `${min}+ ${unitLabel}`;
  }
  if (range.includes('+')) {
    return `${range.replace('+', '')}+ ${unitLabel}`;
  }
  return range;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('all');
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [visibleCount, setVisibleCount] = useState(5);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(4);
      } else {
        setVisibleCount(5);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTag === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.tags && product.tags.includes(activeTag)
      );
      setFilteredProducts(filtered);
    }
    if (window.innerWidth < 768) {
      setVisibleCount(4);
    } else {
      setVisibleCount(5);
    }
  }, [activeTag, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products?isFeatured=true&limit=20&sort=-createdAt');
      const data = await response.json();
      
      if (data.success) {
        const productsWithKeys = data.data.map(product => ({
          ...product,
          key: product._id?.toString() || `product-${Math.random()}`
        }));
        setProducts(productsWithKeys);
        setFilteredProducts(productsWithKeys);
        
        const initialActiveIndex = {};
        data.data.forEach(product => {
          if (product._id) {
            initialActiveIndex[product._id] = 0;
          }
        });
        setActiveImageIndex(initialActiveIndex);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFirstPricingTier = (pricingTiers) => {
    if (!pricingTiers || pricingTiers.length === 0) return null;
    return pricingTiers[0];
  };

  const formatPrice = (price) => {
    return price?.toFixed(2) || '0.00';
  };

  const truncateText = (text, limit = 25) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  const handleProductNavigation = (e, productId, hasHash = false) => {
    e.stopPropagation();
    const url = hasHash 
      ? `/productDetails?id=${productId}#inquiry-form`
      : `/productDetails?id=${productId}`;
    
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  };

  const handleImageHover = (productId, imageIndex) => {
    setActiveImageIndex(prev => ({ ...prev, [productId]: imageIndex }));
  };

  const handleMouseLeave = (productId) => {
    setActiveImageIndex(prev => ({ ...prev, [productId]: 0 }));
  };

  const handleShowMore = () => {
    setIsExpanding(true);
    const increment = window.innerWidth < 768 ? 4 : 5;
    setVisibleCount(prev => Math.min(prev + increment, filteredProducts.length));
    setTimeout(() => setIsExpanding(false), 500);
  };

  const handleShowLess = () => {
    setIsCollapsing(true);
    const minCount = window.innerWidth < 768 ? 4 : 5;
    const decrement = window.innerWidth < 768 ? 4 : 5;
    setVisibleCount(prev => Math.max(minCount, prev - decrement));
    setTimeout(() => setIsCollapsing(false), 500);
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const minVisibleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 5;
  const hasMore = visibleCount < filteredProducts.length;
  const hasLess = visibleCount > minVisibleCount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  if (loading) {
    return (
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 bg-[#FAF7F2]"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-[#6B4F3A]/10 px-3 py-1.5 rounded-full mb-3"
            >
              <Sparkles className="w-3 h-3 text-[#6B4F3A]" />
              <span className="text-[#6B4F3A] font-medium text-[10px] uppercase tracking-wider">
                Curated Selection
              </span>
            </motion.div>
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-xl md:text-3xl font-bold text-[#2C2420] mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <span className="font-semibold bg-gradient-to-r from-[#4A7C59] to-[#C6A43B] bg-clip-text text-transparent">Featured</span> Collections
            </motion.h2>
          </div>
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-[#6B4F3A]" />
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      id="featured-products"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-10 md:py-16 bg-[#FAF7F2]"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header - Reduced spacing */}
        <div className="text-center mb-6 md:mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-flex items-center gap-2 bg-[#6B4F3A]/10 px-3 py-1.5 rounded-full mb-3"
          >
            <Sparkles className="w-3 h-3 text-[#6B4F3A]" />
            <span className="text-[#6B4F3A] font-medium text-[10px] uppercase tracking-wider">
              Curated Selection
            </span>
          </motion.div>
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-3xl lg:text-4xl font-bold text-[#2C2420] mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            <span className="font-semibold bg-gradient-to-r from-[#4A7C59] to-[#C6A43B] bg-clip-text text-transparent">Featured</span> Collections
          </motion.h2>
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm text-[#8B7355] max-w-2xl mx-auto"
          >
            Browse by category to find exactly what you need
          </motion.p>
        </div>

        {/* Modern Underline Tabs - Reduced size */}
        <div className="mb-6 md:mb-8">
          <div className="relative">
            <div className="overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex gap-1 min-w-max justify-center">
                {TAGS.map((tag) => {
                  const isActive = activeTag === tag.id;
                  const productCount = tag.id === 'all' 
                    ? products.length 
                    : products.filter(p => p.tags?.includes(tag.id)).length;
                  
                  return (
                    <button
                      key={tag.id}
                      onClick={() => setActiveTag(tag.id)}
                      className={`
                        relative px-3 md:px-5 py-2 md:py-3 transition-all duration-300 group
                        ${isActive ? `text-[${COLORS.primary}]` : 'text-gray-500 hover:text-gray-700'}
                      `}
                    >
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="flex items-center gap-1 md:gap-2">
                          <span className="text-sm md:text-base transition-transform duration-300 group-hover:scale-110">
                            {tag.icon}
                          </span>
                          <span className="text-[11px] md:text-sm font-medium whitespace-nowrap">
                            {tag.name}
                          </span>
                      
                        </div>
                        
                        <motion.div
                          className={`
                            h-0.5 rounded-full transition-all duration-300
                            ${isActive ? `bg-[${COLORS.primary}]` : 'bg-transparent group-hover:bg-gray-300'}
                          `}
                          initial={false}
                          animate={{
                            width: isActive ? '100%' : '0%',
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          style={{ width: isActive ? '100%' : '0%' }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8 bg-white border border-gray-200"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
              <Tag className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">No products found</h3>
            <p className="text-xs text-gray-500 mb-3">No products available with this tag</p>
            <button
              onClick={() => setActiveTag('all')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#6B4F3A] text-white hover:bg-[#8B6B51] transition-colors"
            >
              View all products
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="wait">
                {visibleProducts.map((product) => {
                  const firstTier = getFirstPricingTier(product.quantityBasedPricing);
                  const productImages = product.images || [];
                  const activeIndex = activeImageIndex[product._id] || 0;
                  const hasMultipleImages = productImages.length > 1;
                  const primaryTag = product.tags?.[0];
                  const tagStyle = primaryTag ? getTagStyles(primaryTag) : '';
                  const audienceStyle = product.targetedCustomer ? getTargetedAudienceStyle(product.targetedCustomer) : '';
                  const unitLabel = getUnitLabel(product.orderUnit);
                  const isHovered = hoveredProductId === product._id;
                  const bulkRangeDisplay = firstTier ? formatBulkRange(firstTier.range) : '';
                  
                  return (
                    <motion.div
                      key={product._id}
                      variants={itemVariants}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        layout: { type: "spring", stiffness: 100, damping: 15 },
                        opacity: { duration: 0.2 }
                      }}
                      onMouseEnter={() => setHoveredProductId(product._id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className="group bg-white border border-[#E5D5C0] hover:border-[#6B4F3A]/30 transition-all duration-300 cursor-pointer"
                      onClick={(e) => handleProductNavigation(e, product._id, false)}
                    >
                      {/* Image Container - Reduced height for mobile */}
                      <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden bg-[#FAF7F2]">
                        <motion.img
                          src={productImages[activeIndex]?.url || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
                          alt={product.productName}
                          className="w-full h-full object-contain p-2"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
                          }}
                          loading="lazy"
                        />
                        
                        {/* Top Right Action Icons - Smaller for mobile */}
                       {/* Top Right Action Icons - Always visible on mobile */}
<motion.div 
  className="absolute top-2 right-2 flex flex-col gap-1.5 z-30"
  initial={{ opacity: 0, x: 10 }}
  animate={{ 
    opacity: isMobile ? 1 : (isHovered ? 1 : 0), 
    x: isMobile ? 0 : (isHovered ? 0 : 10) 
  }}
  transition={{ duration: 0.2 }}
>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductNavigation(e, product._id, false);
                            }}
                            className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <Eye className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-700" />
                          </div>
                          
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductNavigation(e, product._id, true);
                            }}
                            className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
                          >
                            <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#6B4F3A]" />
                          </div>
                        </motion.div>

                        {/* Tag Badge - Smaller for mobile */}
                        {primaryTag && (
                          <motion.div 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className={`absolute top-2 left-2 ${tagStyle} text-[7px] md:text-[9px] px-1.5 py-0.5 font-semibold z-20 flex items-center gap-1 shadow-lg`}
                          >
                            <span className="truncate">{primaryTag}</span>
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Thumbnail Images - Smaller for mobile */}
                      {hasMultipleImages && (
                        <div className="flex justify-center items-center gap-1 py-1 border-b border-[#E5D5C0]" onMouseLeave={() => handleMouseLeave(product._id)}>
                          {productImages.slice(0, 4).map((image, index) => (
                            <button
                              key={index}
                              className={`w-5 h-5 md:w-6 md:h-6 overflow-hidden transition-all duration-200 ${
                                activeIndex === index 
                                  ? 'border-2 border-[#6B4F3A]' 
                                  : 'border border-gray-200 opacity-60 hover:opacity-100'
                              }`}
                              onMouseEnter={() => handleImageHover(product._id, index)}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleImageHover(product._id, index);
                              }}
                            >
                              <img
                                src={image.url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Content - Compact for mobile */}
                      <div className="p-2 md:p-3">
                        {/* Product Name */}
                        <h3 className="text-[11px] md:text-sm font-semibold text-gray-900 truncate hover:text-[#6B4F3A] transition-colors " style={{ fontFamily: 'Playfair Display, serif' }} title={product.productName}>
                          {truncateText(product.productName, 25)}
                        </h3>

                        {/* Starting Price and MOQ Row - Compact */}
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-[7px] md:text-[8px] text-[#8B7355]">Starting from</span>
                            <p className="text-sm md:text-base font-bold text-[#6B4F3A] leading-tight">
                              ${formatPrice(product.pricePerUnit)}
                              <span className="text-[8px] md:text-[9px] font-normal text-[#A8947A] ml-0.5">/{unitLabel}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[7px] md:text-[8px] text-[#8B7355]">MOQ</span>
                            <p className="text-[10px] md:text-xs font-semibold text-gray-700">{product.moq} {unitLabel}</p>
                          </div>
                        </div>

                        {/* Category, Targeted Audience, First Bulk Price - Compact Row */}
                        <div className="flex items-center justify-start flex-wrap gap-1.5 mb-1.5">
                          {product.category?.name && (
                            <div className="flex items-center gap-0.5">
                              <Package className="w-2.5 h-2.5 text-[#A8947A]" />
                              <span className="text-[7px] md:text-[8px] text-gray-500">
                                {truncateText(product.category.name, 10)}
                              </span>
                            </div>
                          )}

                          {product.targetedCustomer && (
                            <div className={`flex items-center gap-0.5 px-1 py-0.5 ${audienceStyle} text-[6px] md:text-[7px]`}>
                              <Users className="w-2 h-2" />
                              <span className="capitalize">
                                {product.targetedCustomer === 'ladies' ? 'Ladies' : 
                                 product.targetedCustomer === 'gents' ? 'Gents' :
                                 product.targetedCustomer === 'kids' ? 'Kids' : product.targetedCustomer}
                              </span>
                            </div>
                          )}

                         {firstTier && (
  <div className="flex items-center gap-0.5 px-1 py-0.5 bg-[#F5E6D3]/50 rounded border border-[#E5D5C0]">
    <span className="text-[6px] text-[#8B7355]">Bulk:</span>
    <span className="text-[7px] font-medium text-[#6B4F3A]">
      ${formatPrice(firstTier.price)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}
    </span>
    <span className="text-[6px] text-[#A8947A]">({formatBulkRange(firstTier.range, unitLabel === 'pcs' ? 'pc' : unitLabel)})</span>
  </div>
)}
                        </div>

                        {/* Color Dots - Compact */}
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center gap-0.5 mb-1.5">
                            <Palette className="w-2.5 h-2.5 text-[#A8947A]" />
                            <div className="flex items-center gap-0.5">
                              {product.colors.slice(0, 5).map((color, i) => (
                                <div
                                  key={i}
                                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-gray-200 shadow-sm"
                                  style={{ backgroundColor: color.code }}
                                  title={color.name || color.code}
                                />
                              ))}
                              {product.colors.length > 5 && (
                                <span className="text-[6px] text-[#A8947A] ml-0.5">+{product.colors.length - 5}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Add to Inquiry Button - Compact */}
                     {/* Add to Inquiry Button */}
<button
  onClick={(e) => {
    e.stopPropagation();
    window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
  }}
  className="w-full py-1.5 md:py-2 text-center text-[9px] md:text-[10px] font-medium text-white bg-[#6B4F3A] hover:bg-[#8B6B51] transition-colors flex items-center justify-center gap-1.5"
>
  <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5" />
  Add to Inquiry
</button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Show More/Less Buttons - Compact */}
            <div className="flex justify-center gap-3 mt-6 md:mt-8">
              {hasMore && (
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleShowMore}
                  className="inline-flex items-center gap-1.5 px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <span>Show More</span>
                  <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />
                </motion.button>
              )}
              
              {hasLess && (
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleShowLess}
                  className="inline-flex items-center gap-1.5 px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-300 border border-gray-200 shadow-md"
                >
                  <span>Show Less</span>
                  <ChevronUp className="w-3 h-3 md:w-4 md:h-4" />
                </motion.button>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.section>
  );
}