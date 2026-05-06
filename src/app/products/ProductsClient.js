
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Link from 'next/link';
import { 
  Search, 
  Grid, 
  List, 
  SlidersHorizontal, 
  X, 
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Tag,
  Users,
  DollarSign,
  Sparkles,
  Eye, 
  ShoppingCart,
  ArrowLeft,
  Package,
  TrendingUp,
  Palette,
  Ruler,
  FolderTree,
  Leaf,
  Gem,
  Crown,
  Zap,
  Truck,
  Scissors,
  LayoutGrid,
  Star
} from 'lucide-react';
import WhatsAppButton from '../components/layout/WhatsAppButton';

// Jute Theme Colors
const JUTE_COLORS = {
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

// Loading Bar Component
const LoadingBar = ({ isVisible }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-0.5 bg-[#F5E6D3] z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="h-full bg-[#6B4F3A] animate-loading-bar" style={{ width: '100%' }}></div>
    </div>
  );
};

// Helper functions
const getUnitLabel = (orderUnit) => {
  switch(orderUnit) {
    case 'kg': return 'kg';
    case 'ton': return 'MT';
    default: return 'pc';
  }
};

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

const formatPrice = (price) => {
  return price?.toFixed(2) || '0.00';
};

const truncateText = (text, limit = 25) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const getTagStyles = (tag) => {
  const styles = {
    'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
    'New Arrival': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
    'Top Deal': 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/30',
    'Eco-Friendly': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30',
    'Hot Export Item': 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30',
    'Customizable': 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/30',
    'Premium Quality': 'bg-gradient-to-r from-amber-600 to-yellow-700 text-white shadow-lg shadow-amber-600/30',
    'Trending': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30',
  };
  return styles[tag] || `bg-gradient-to-r from-[${JUTE_COLORS.primary}] to-[#8B6B51] text-white`;
};

const getTargetedAudienceStyle = (audience) => {
  const styles = {
    'ladies': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
    'gents': 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white',
    'kids': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    'unisex': 'bg-gradient-to-r from-purple-500 to-violet-500 text-white',
  };
  return styles[audience] || `bg-gradient-to-r from-[${JUTE_COLORS.primary}] to-[#8B6B51] text-white`;
};

// Filter Sidebar Component - Left Side
const FilterSidebar = ({ 
  expandedSections, 
  toggleSection, 
  categories, 
  subcategories,
  childSubcategories,
  filters, 
  handleCategoryChange, 
  handleRemoveCategory,
  handleSubcategoryChange,
  handleRemoveSubcategory,
  handleChildSubcategoryChange,
  handleRemoveChildSubcategory,
  handleTargetedCustomerChange,
  minPriceInput,
  maxPriceInput,
  setMinPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  clearPriceRange,
  getActiveFilterCount,
  clearFilters,
  selectedCategory,
  selectedSubcategory,
  showChildSubcategory
}) => (
  <div className="bg-white border border-[#E5D5C0] p-5 sticky top-24 shadow-sm">
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
        <Filter className="w-5 h-5 text-[#6B4F3A]" />
        Filters
      </h3>
      {getActiveFilterCount() > 0 && (
        <button
          onClick={clearFilters}
          className="text-xs text-[#6B4F3A] hover:text-[#8B6B51] font-medium"
        >
          Clear All ({getActiveFilterCount()})
        </button>
      )}
    </div>

    {/* Price Range */}
    <div className="mb-5 border-b border-[#E5D5C0] pb-5">
      <button
        onClick={() => toggleSection('price')}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-medium text-[#2C2420] flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#6B4F3A]" />
          Price Range
        </h4>
        {expandedSections.price ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.price && (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#8B7355]">Min ($)</span>
              <input
                type="text"
                inputMode="decimal"
                value={minPriceInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    setMinPriceInput(value);
                  }
                }}
                placeholder="0.00"
                className="w-28 px-2 py-1.5 text-right text-sm border border-[#E5D5C0] focus:outline-none focus:ring-2 focus:ring-[#6B4F3A]"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#8B7355]">Max ($)</span>
              <input
                type="text"
                inputMode="decimal"
                value={maxPriceInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    setMaxPriceInput(value);
                  }
                }}
                placeholder="∞"
                className="w-28 px-2 py-1.5 text-right text-sm border border-[#E5D5C0] focus:outline-none focus:ring-2 focus:ring-[#6B4F3A]"
              />
            </div>
          </div>
          
          <button
            onClick={applyPriceRange}
            disabled={!minPriceInput && !maxPriceInput}
            className="w-full py-2 bg-[#6B4F3A] text-white text-sm font-medium hover:bg-[#8B6B51] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Apply Price Range
          </button>

          {(filters.priceRange.min || filters.priceRange.max) && (
            <div className="flex items-center justify-between bg-[#FAF7F2] p-2">
              <span className="text-sm text-[#6B4F3A]">
                ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
              </span>
              <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Categories */}
    <div className="mb-5 border-b border-[#E5D5C0] pb-5">
      <button
        onClick={() => toggleSection('categories')}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-medium text-[#2C2420] flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#6B4F3A]" />
          Categories
        </h4>
        {expandedSections.categories ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.categories && (
        <div className="space-y-2">
          {filters.categories.length > 0 && (
            <div className="mb-3 p-2 bg-[#FAF7F2]">
              <p className="text-xs text-[#8B7355] mb-2">Selected Categories:</p>
              {filters.categories.map(catId => {
                const category = categories.find(c => c._id === catId);
                return category ? (
                  <div key={catId} className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium text-[#2C2420]">{category.name}</span>
                    <button
                      onClick={() => handleRemoveCategory(catId)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
          
          <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
            {categories.map(category => (
              <label key={category._id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category._id)}
                  onChange={() => handleCategoryChange(category._id)}
                  className="w-4 h-4 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
                />
                <span className="text-sm text-gray-700 group-hover:text-[#6B4F3A] transition-colors flex-1">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Subcategories Section */}
    {selectedCategory && subcategories.length > 0 && (
      <div className="mb-5 border-b border-[#E5D5C0] pb-5">
        <button
          onClick={() => toggleSection('subcategories')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h4 className="font-medium text-[#2C2420] flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[#6B4F3A]" />
            Subcategories
          </h4>
          {expandedSections.subcategories ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.subcategories && (
          <div className="space-y-2">
            {filters.subcategories.length > 0 && (
              <div className="mb-3 p-2 bg-[#FAF7F2]">
                <p className="text-xs text-[#8B7355] mb-2">Selected Subcategories:</p>
                {filters.subcategories.map(subId => {
                  const subcategory = subcategories.find(s => s._id === subId);
                  return subcategory ? (
                    <div key={subId} className="flex items-center justify-between py-1">
                      <span className="text-sm font-medium text-[#2C2420]">{subcategory.name}</span>
                      <button
                        onClick={() => handleRemoveSubcategory(subId)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
              {subcategories.map(subcategory => (
                <label key={subcategory._id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.subcategories.includes(subcategory._id)}
                    onChange={() => handleSubcategoryChange(subcategory._id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-[#6B4F3A] transition-colors flex-1">
                    {subcategory.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    {/* Child Subcategories Section */}
    {showChildSubcategory && selectedSubcategory && childSubcategories.length > 0 && (
      <div className="mb-5 border-b border-[#E5D5C0] pb-5">
        <button
          onClick={() => toggleSection('childSubcategories')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h4 className="font-medium text-[#2C2420] flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[#6B4F3A]" />
            Child Subcategories
          </h4>
          {expandedSections.childSubcategories ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.childSubcategories && (
          <div className="space-y-2">
            {filters.childSubcategories.length > 0 && (
              <div className="mb-3 p-2 bg-[#FAF7F2]">
                <p className="text-xs text-[#8B7355] mb-2">Selected Child Subcategories:</p>
                {filters.childSubcategories.map(childId => {
                  const child = childSubcategories.find(c => c._id === childId);
                  return child ? (
                    <div key={childId} className="flex items-center justify-between py-1">
                      <span className="text-sm font-medium text-[#2C2420]">{child.name}</span>
                      <button
                        onClick={() => handleRemoveChildSubcategory(childId)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
              {childSubcategories.map(child => (
                <label key={child._id} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.childSubcategories.includes(child._id)}
                    onChange={() => handleChildSubcategoryChange(child._id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-[#6B4F3A] transition-colors flex-1">
                    {child.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    {/* Target Audience */}
    <div className="mb-2">
      <button
        onClick={() => toggleSection('audience')}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <h4 className="font-medium text-[#2C2420] flex items-center gap-2">
          <Users className="w-4 h-4 text-[#6B4F3A]" />
          Target Audience
        </h4>
        {expandedSections.audience ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {expandedSections.audience && (
        <div className="space-y-2">
          {[
            { value: 'ladies', label: 'Ladies' },
            { value: 'gents', label: 'Gents' },
            { value: 'kids', label: 'Kids' },
            { value: 'unisex', label: 'Unisex' }
          ].map(customer => (
            <label key={customer.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.targetedCustomer.includes(customer.value)}
                onChange={() => handleTargetedCustomerChange(customer.value)}
                className="w-4 h-4 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
              />
              <span className="text-sm text-gray-700 group-hover:text-[#6B4F3A] transition-colors flex-1">
                {customer.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  </div>
);

// Product Grid Card - With Shadow
const ProductGridCard = ({ product }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const firstTier = product.quantityBasedPricing?.[0];
  const primaryTag = product.tags?.[0];
  const tagStyle = primaryTag ? getTagStyles(primaryTag) : '';
  const audienceStyle = product.targetedCustomer ? getTargetedAudienceStyle(product.targetedCustomer) : '';
  const unitLabel = getUnitLabel(product.orderUnit);
const bulkRangeDisplay = firstTier ? formatBulkRange(firstTier.range, unitLabel === 'pcs' ? 'pc' : unitLabel) : '';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        layout: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white border border-[#E5D5C0] hover:border-[#6B4F3A]/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
      onClick={() => {
        if (isMobile) {
          window.location.href = `/productDetails?id=${product._id}`;
        } else {
          window.open(`/productDetails?id=${product._id}`, '_blank');
        }
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden bg-white">
        <motion.img
          src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
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
        
        {/* Top Right Action Icons */}
      {/* Top Right Action Icons - Always visible on mobile */}
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
      window.open(`/productDetails?id=${product._id}`, '_blank');
    }}
    className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
  >
    <Eye className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-700" />
  </div>
  
  <div
    onClick={(e) => {
      e.stopPropagation();
      window.open(`/productDetails?id=${product._id}#inquiry-form`, '_blank');
    }}
    className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
  >
    <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#6B4F3A]" />
  </div>
</motion.div>

        {/* Tag Badge - Top Left */}
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
      
      {/* Thumbnail Images */}
      {hasMultipleImages && (
        <div className="flex justify-center items-center gap-1 py-1">
          {productImages.slice(0, 4).map((image, index) => (
            <button
              key={index}
              className={`w-5 h-5 md:w-6 md:h-6 overflow-hidden transition-all duration-200 ${
                activeIndex === index 
                  ? 'border-2 border-[#6B4F3A]' 
                  : 'border border-gray-200 opacity-60 hover:opacity-100'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(index);
              }}
            >
              <img src={image.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-2 md:p-3">
        {/* Product Name */}
        <h3 className="text-[11px] md:text-sm font-semibold text-gray-900 truncate hover:text-[#6B4F3A] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }} title={product.productName}>
          {truncateText(product.productName, 25)}
        </h3>

        {/* Starting Price and MOQ Row */}
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

        {/* Category, Targeted Audience, First Bulk Price */}
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
              <span className="text-[6px] text-[#A8947A]">({bulkRangeDisplay})</span>
            </div>
          )}
        </div>

        {/* Color Dots */}
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
};

// Product List Card - With Shadow and Hover Icons
const ProductListCard = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const productImages = product.images || [];
  const hasMultipleImages = productImages.length > 1;
  const firstTier = product.quantityBasedPricing?.[0];
  const primaryTag = product.tags?.[0];
  const audienceStyle = product.targetedCustomer ? getTargetedAudienceStyle(product.targetedCustomer) : '';
  const unitLabel = getUnitLabel(product.orderUnit);
const bulkRangeDisplay = firstTier ? formatBulkRange(firstTier.range, unitLabel === 'pcs' ? 'pc' : unitLabel) : '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white border border-[#E5D5C0] hover:border-[#6B4F3A]/30 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
      onClick={() => window.open(`/productDetails?id=${product._id}`, '_blank')}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 lg:w-72 relative">
          <div className="relative h-48 md:h-56 overflow-hidden bg-white">
            <motion.img
              src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
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
            
            {/* Hover Icons - Top Right for List View */}
            <motion.div 
              className="absolute top-2 right-2 flex flex-col gap-1.5 z-30"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              transition={{ duration: 0.2 }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/productDetails?id=${product._id}`, '_blank');
                }}
                className="w-7 h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-gray-700" />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/productDetails?id=${product._id}#inquiry-form`, '_blank');
                }}
                className="w-7 h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-[#6B4F3A]" />
              </div>
            </motion.div>
            
            {primaryTag && (
              <span className={`absolute top-2 left-2 ${getTagStyles(primaryTag)} text-white text-[9px] px-1.5 py-0.5 font-semibold z-20 shadow-lg`}>
                {primaryTag}
              </span>
            )}
          </div>

          {hasMultipleImages && (
            <div className="flex justify-center gap-1 py-1 ">
              {productImages.slice(0, 4).map((image, idx) => (
                <div
                  key={idx}
                  className={`w-5 h-5 overflow-hidden cursor-pointer border transition-all ${
                    activeIndex === idx 
                      ? 'border-2 border-[#6B4F3A]' 
                      : 'border border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                  }}
                >
                  <img src={image.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 p-4">
          <h3 className="text-base font-semibold text-[#2C2420] mb-2 line-clamp-1 hover:text-[#6B4F3A] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
            {product.productName}
          </h3>
          
          <div className="flex items-center flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-1 bg-[#FAF7F2] px-2 py-1">
              <Package className="w-3 h-3 text-[#6B4F3A]" />
              <span className="text-[10px] text-gray-700">{product.category?.name || 'Uncategorized'}</span>
            </div>

            {product.targetedCustomer && (
              <div className={`flex items-center gap-1 px-2 py-1 ${audienceStyle} text-[9px]`}>
                <Users className="w-3 h-3" />
                <span className="capitalize">
                  {product.targetedCustomer === 'ladies' ? 'Ladies' : 
                   product.targetedCustomer === 'gents' ? 'Gents' :
                   product.targetedCustomer === 'kids' ? 'Kids' : product.targetedCustomer}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1 bg-[#FAF7F2] px-2 py-1">
              <span className="text-[9px] text-gray-500">MOQ:</span>
              <span className="text-[9px] font-semibold text-gray-800">{product.moq} {unitLabel}</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {product.description?.replace(/<[^>]*>/g, '') || 'No description available'}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-[8px] text-[#8B7355]">Starting from</p>
              <p className="text-lg font-bold text-[#6B4F3A]">
                ${formatPrice(product.pricePerUnit)}
                <span className="text-[9px] font-normal text-[#A8947A] ml-0.5">/{unitLabel}</span>
              </p>
            </div>
            
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-[8px] text-[#8B7355] mb-0.5">Colors</p>
                <div className="flex items-center gap-0.5 flex-wrap">
                  {product.colors.slice(0, 4).map((color, idx) => (
                    <div
                      key={idx}
                      className="w-3 h-3 rounded-full border border-gray-200 shadow-sm"
                      style={{ backgroundColor: color.code }}
                      title={color.name || `Color ${idx + 1}`}
                    />
                  ))}
                  {product.colors.length > 4 && (
                    <div className="w-3 h-3 rounded-full bg-gray-200 flex items-center justify-center text-[6px] font-medium text-gray-600">
                      +{product.colors.length - 4}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {firstTier && (
              <div className="flex-1 bg-[#FAF7F2] p-2 border border-[#E5D5C0]">
                <p className="text-[8px] text-[#6B4F3A] font-medium mb-0.5">Bulk pricing:</p>
                <div className="flex justify-between text-[10px]">
                  <span className="text-gray-700">{firstTier.range || 'Bulk'}</span>
                  <span className="font-semibold text-[#6B4F3A]">
                    ${formatPrice(firstTier.price)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}
                  </span>
                </div>
              </div>
            )}

           <button
  onClick={(e) => {
    e.stopPropagation();
    window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
  }}
  className="px-4 py-2 bg-[#6B4F3A] text-white text-xs font-medium hover:bg-[#8B6B51] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
>
  <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5" />
  Add to Inquiry
</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ========== MAIN PRODUCTS CONTENT COMPONENT ==========
export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    subcategories: true,
    childSubcategories: true,
    audience: true
  });

  const productsContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const searchTimerRef = useRef(null);

  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    subcategories: [],
    childSubcategories: [],
    targetedCustomer: [],
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });

  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [initialCategorySet, setInitialCategorySet] = useState(false);

  const saveScrollPosition = () => {
    scrollPositionRef.current = window.scrollY;
  };

  const restoreScrollPosition = () => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    }
  };

  const debouncedSearch = useCallback((searchValue) => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      saveScrollPosition();
      setFilters(prev => ({ ...prev, search: searchValue }));
      setCurrentPage(1);
    }, 500);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    saveScrollPosition();
    setFilters(prev => ({ ...prev, search: '' }));
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !initialCategorySet) {
      const categoryParam = searchParams.get('category');
      const subcategoryParam = searchParams.get('subcategory');
      const childSubcategoryParam = searchParams.get('childSubcategory');
      
      if (categoryParam) {
        const categoryExists = categories.some(cat => cat._id === categoryParam);
        if (categoryExists) {
          setFilters(prev => ({ ...prev, categories: [categoryParam] }));
          
          if (subcategoryParam) {
            const loadSubcategoriesAndSetFilter = async () => {
              const subcats = await fetchSubcategories(categoryParam);
              if (subcats && Array.isArray(subcats)) {
                const subcategoryExists = subcats.some(sub => sub._id === subcategoryParam);
                if (subcategoryExists) {
                  setFilters(prev => ({ ...prev, subcategories: [subcategoryParam] }));
                  
                  if (childSubcategoryParam) {
                    const children = await fetchChildSubcategories(categoryParam, subcategoryParam);
                    if (children && Array.isArray(children)) {
                      const childExists = children.some(child => child._id === childSubcategoryParam);
                      if (childExists) {
                        setFilters(prev => ({ ...prev, childSubcategories: [childSubcategoryParam] }));
                      }
                    }
                  }
                }
              }
            };
            loadSubcategoriesAndSetFilter();
          }
        }
      }
      setInitialCategorySet(true);
    }
  }, [categories, searchParams, initialCategorySet]);

  useEffect(() => {
    if (filters.categories.length === 1) {
      const categoryId = filters.categories[0];
      setSelectedCategory(categoryId);
      fetchSubcategories(categoryId);
    } else {
      setSubcategories([]);
      setSelectedCategory(null);
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.subcategories.length > 0) {
        setFilters(prev => ({ ...prev, subcategories: [] }));
      }
      if (filters.childSubcategories.length > 0) {
        setFilters(prev => ({ ...prev, childSubcategories: [] }));
      }
    }
  }, [filters.categories]);

  useEffect(() => {
    if (filters.subcategories.length === 1 && selectedCategory) {
      const subcategoryId = filters.subcategories[0];
      setSelectedSubcategory(subcategoryId);
      fetchChildSubcategories(selectedCategory, subcategoryId);
    } else {
      setChildSubcategories([]);
      setSelectedSubcategory(null);
      setShowChildSubcategory(false);
      if (filters.childSubcategories.length > 0) {
        setFilters(prev => ({ ...prev, childSubcategories: [] }));
      }
    }
  }, [filters.subcategories, selectedCategory]);

  useEffect(() => {
    if (initialCategorySet) {
      fetchProducts();
    }
  }, [filters, currentPage, initialCategorySet]);

  useEffect(() => {
    if (!loading) restoreScrollPosition();
  }, [loading]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
      setCategoriesLoaded(true);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategoriesLoaded(true);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data.subcategories)) {
        setSubcategories(data.data.subcategories);
        return data.data.subcategories;
      } else {
        setSubcategories([]);
        return [];
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubcategories([]);
      return [];
    }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data.children)) {
        setChildSubcategories(data.data.children);
        setShowChildSubcategory(data.data.children.length > 0);
        return data.data.children;
      } else {
        setChildSubcategories([]);
        setShowChildSubcategory(false);
        return [];
      }
    } catch (error) {
      console.error('Error fetching child subcategories:', error);
      setChildSubcategories([]);
      setShowChildSubcategory(false);
      return [];
    }
  };

  const handleSubcategoryChange = (subcategoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newSubcategories = prev.subcategories.includes(subcategoryId)
        ? prev.subcategories.filter(id => id !== subcategoryId)
        : [...prev.subcategories, subcategoryId];
      return { ...prev, subcategories: newSubcategories, childSubcategories: [] };
    });
    setCurrentPage(1);
  };

  const handleRemoveSubcategory = (subcategoryId) => {
    saveScrollPosition();
    setFilters(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter(id => id !== subcategoryId),
      childSubcategories: []
    }));
    setCurrentPage(1);
  };

  const handleChildSubcategoryChange = (childSubcategoryId) => {
    saveScrollPosition();
    setFilters(prev => {
      const newChildSubcategories = prev.childSubcategories.includes(childSubcategoryId)
        ? prev.childSubcategories.filter(id => id !== childSubcategoryId)
        : [...prev.childSubcategories, childSubcategoryId];
      return { ...prev, childSubcategories: newChildSubcategories };
    });
    setCurrentPage(1);
  };

  const handleRemoveChildSubcategory = (childSubcategoryId) => {
    saveScrollPosition();
    setFilters(prev => ({
      ...prev,
      childSubcategories: prev.childSubcategories.filter(id => id !== childSubcategoryId)
    }));
    setCurrentPage(1);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', currentPage);
      queryParams.append('limit', 12);
      
      if (filters.search) queryParams.append('search', filters.search);
      
      if (filters.categories.length > 0) {
        filters.categories.forEach(cat => queryParams.append('category', cat));
      }

      if (filters.subcategories.length > 0) {
        filters.subcategories.forEach(sub => queryParams.append('subcategory', sub));
      }

      if (filters.childSubcategories.length > 0) {
        filters.childSubcategories.forEach(child => queryParams.append('childSubcategory', child));
      }
      
      if (filters.targetedCustomer.length > 0) {
        filters.targetedCustomer.forEach(cust => queryParams.append('targetedCustomer', cust));
      }
      
      if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
      if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
      let sortParam = '-createdAt';
      switch (filters.sortBy) {
        case 'price_low': sortParam = 'price_asc'; break;
        case 'price_high': sortParam = 'price_desc'; break;
        case 'name_asc': sortParam = 'name_asc'; break;
        default: sortParam = 'newest';
      }
      queryParams.append('sort', sortParam);

      const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    saveScrollPosition();
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  // const handleCategoryChange = (categoryId) => {
  //   saveScrollPosition();
  //   setFilters(prev => {
  //     const newCategories = prev.categories.includes(categoryId)
  //       ? prev.categories.filter(id => id !== categoryId)
  //       : [...prev.categories, categoryId];
  //     return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
  //   });
  //   setCurrentPage(1);
  // };

const handleCategoryChange = (categoryId) => {
  saveScrollPosition();
  setFilters(prev => {
    const newCategories = prev.categories.includes(categoryId)
      ? prev.categories.filter(id => id !== categoryId)
      : [...prev.categories, categoryId];
    return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
  });
  setCurrentPage(1);
  
  // Dispatch custom event to notify popup manager about category change
  if (typeof window !== 'undefined') {
    const isSelected = !filters.categories.includes(categoryId);
    const newCategory = isSelected ? categoryId : null;
    
    if (newCategory) {
      // Update URL to reflect the new category
      const params = new URLSearchParams(window.location.search);
      params.set('category', newCategory);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.pushState({}, '', newUrl);
    } else {
      // Remove category from URL
      const params = new URLSearchParams(window.location.search);
      params.delete('category');
      const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
      window.history.pushState({}, '', newUrl);
    }
    
    // Dispatch event for popup manager
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { 
      detail: { categoryId: newCategory }
    }));
  }
};
  // const handleRemoveCategory = (categoryId) => {
  //   saveScrollPosition();
  //   setFilters(prev => ({
  //     ...prev,
  //     categories: prev.categories.filter(id => id !== categoryId),
  //     subcategories: [],
  //     childSubcategories: []
  //   }));
  //   setCurrentPage(1);
  // };

  const handleRemoveCategory = (categoryId) => {
  saveScrollPosition();
  setFilters(prev => ({
    ...prev,
    categories: prev.categories.filter(id => id !== categoryId),
    subcategories: [],
    childSubcategories: []
  }));
  setCurrentPage(1);
  
  // Notify popup manager
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    params.delete('category');
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.pushState({}, '', newUrl);
    
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { 
      detail: { categoryId: null }
    }));
  }
};
  const handleTargetedCustomerChange = (customer) => {
    saveScrollPosition();
    setFilters(prev => {
      const newCustomers = prev.targetedCustomer.includes(customer)
        ? prev.targetedCustomer.filter(c => c !== customer)
        : [...prev.targetedCustomer, customer];
      return { ...prev, targetedCustomer: newCustomers };
    });
    setCurrentPage(1);
  };

  const applyPriceRange = () => {
    saveScrollPosition();
    setFilters(prev => ({
      ...prev,
      priceRange: { min: minPriceInput || '', max: maxPriceInput || '' }
    }));
    setCurrentPage(1);
  };

  const clearPriceRange = () => {
    saveScrollPosition();
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
  };

  // const clearFilters = () => {
  //   saveScrollPosition();
  //   setSearchInput('');
  //   setFilters({
  //     search: '',
  //     categories: [],
  //     subcategories: [],
  //     childSubcategories: [],
  //     targetedCustomer: [],
  //     priceRange: { min: '', max: '' },
  //     sortBy: 'newest'
  //   });
  //   setMinPriceInput('');
  //   setMaxPriceInput('');
  //   setCurrentPage(1);
  // };

  const clearFilters = () => {
  saveScrollPosition();
  setSearchInput('');
  setFilters({
    search: '',
    categories: [],
    subcategories: [],
    childSubcategories: [],
    targetedCustomer: [],
    priceRange: { min: '', max: '' },
    sortBy: 'newest'
  });
  setMinPriceInput('');
  setMaxPriceInput('');
  setCurrentPage(1);
  
  // Clear URL and notify popup
  if (typeof window !== 'undefined') {
    window.history.pushState({}, '', window.location.pathname);
    window.dispatchEvent(new CustomEvent('categoryFilterChanged', { 
      detail: { categoryId: null }
    }));
  }
};
  const handlePageChange = (newPage) => {
    saveScrollPosition();
    setCurrentPage(newPage);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count += 1;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.subcategories.length > 0) count += filters.subcategories.length;
    if (filters.childSubcategories.length > 0) count += filters.childSubcategories.length;
    if (filters.targetedCustomer.length > 0) count += filters.targetedCustomer.length;
    if (filters.priceRange.min || filters.priceRange.max) count += 1;
    return count;
  };

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  return (
    <>
      <LoadingBar isVisible={loading} />
      <Navbar />
      
      {/* Simple Header with Breadcrumb and Search - No sticky */}
      <div className="bg-white border-b border-[#E5D5C0] mt-20">
        <div className="container mx-auto px-4 max-w-7xl py-4 md:py-6">
          {/* Breadcrumb / Home Button */}
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-gray-500 hover:text-[#6B4F3A] transition-colors text-sm">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#6B4F3A] font-medium text-sm">Products</span>
          </div>

          {/* Title and Search Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#2C2420]" style={{ fontFamily: 'Playfair Display, serif' }}>
                All Products
              </h1>
              <p className="text-sm text-[#8B7355] mt-1">
                Browse our complete collection of premium jute products
              </p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 text-sm border border-[#E5D5C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent bg-white"
              />
              {searchInput && (
                <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-[#FAF7F2]">
        <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
          {/* Filter and Sort Bar */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="md:hidden flex items-center gap-2 px-3 py-2 bg-white border border-[#E5D5C0] hover:bg-gray-50 transition-colors shadow-sm text-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-[#6B4F3A] text-white text-xs rounded-full">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>

                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-2 text-sm border border-[#E5D5C0] bg-white focus:ring-2 focus:ring-[#6B4F3A]/20 focus:border-[#6B4F3A] outline-none transition shadow-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>

                <div className="hidden md:flex items-center gap-1 bg-white border border-[#E5D5C0] p-1 shadow-sm">
                  <button onClick={() => setViewMode('grid')} className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#6B4F3A] text-white' : 'text-gray-500 hover:bg-gray-100'}`} title="Grid View">
                    <Grid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#6B4F3A] text-white' : 'text-gray-500 hover:bg-gray-100'}`} title="List View">
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {getActiveFilterCount() > 0 && (
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                {filters.search && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
                    <span>"{filters.search}"</span>
                    <button onClick={handleClearSearch} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
                  </div>
                )}
                {filters.categories.map(catId => {
                  const category = categories.find(c => c._id === catId);
                  return category ? (
                    <div key={catId} className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
                      <span>{category.name}</span>
                      <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
                    </div>
                  ) : null;
                })}
                {filters.subcategories.map(subId => {
                  const subcategory = subcategories.find(s => s._id === subId);
                  return subcategory ? (
                    <div key={subId} className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
                      <FolderTree className="w-3 h-3" />
                      <span>{subcategory.name}</span>
                      <button onClick={() => handleRemoveSubcategory(subId)} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
                    </div>
                  ) : null;
                })}
                {filters.childSubcategories.map(childId => {
                  const child = childSubcategories.find(c => c._id === childId);
                  return child ? (
                    <div key={childId} className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
                      <FolderTree className="w-3 h-3" />
                      <span>{child.name}</span>
                      <button onClick={() => handleRemoveChildSubcategory(childId)} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
                    </div>
                  ) : null;
                })}
                {filters.targetedCustomer.map(cust => (
                  <div key={cust} className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
                    <span>{cust.charAt(0).toUpperCase() + cust.slice(1)}</span>
                    <button onClick={() => handleTargetedCustomerChange(cust)} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
                  </div>
                ))}
                {(filters.priceRange.min || filters.priceRange.max) && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
                    <span>${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}</span>
                    <button onClick={clearPriceRange} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
                  </div>
                )}
                {getActiveFilterCount() > 0 && (
                  <button onClick={clearFilters} className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700">Clear All</button>
                )}
              </div>
            )}
          </div>

          {/* Main Content - Filters on Left Side */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Desktop Filters - Left Side */}
            <div className="hidden md:block md:w-80 flex-shrink-0">
              <FilterSidebar 
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                categories={categories}
                subcategories={subcategories}
                childSubcategories={childSubcategories}
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                handleRemoveCategory={handleRemoveCategory}
                handleSubcategoryChange={handleSubcategoryChange}
                handleRemoveSubcategory={handleRemoveSubcategory}
                handleChildSubcategoryChange={handleChildSubcategoryChange}
                handleRemoveChildSubcategory={handleRemoveChildSubcategory}
                handleTargetedCustomerChange={handleTargetedCustomerChange}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                setMinPriceInput={setMinPriceInput}
                setMaxPriceInput={setMaxPriceInput}
                applyPriceRange={applyPriceRange}
                clearPriceRange={clearPriceRange}
                getActiveFilterCount={getActiveFilterCount}
                clearFilters={clearFilters}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                showChildSubcategory={showChildSubcategory}
              />
            </div>

            {/* Products Grid/List - Right Side */}
            <div className="flex-1" ref={productsContainerRef}>
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(12)].map((_, index) => (
                    <div key={index} className="bg-white border border-[#E5D5C0] overflow-hidden animate-pulse shadow-md">
                      <div className="h-40 bg-gray-200"></div>
                      <div className="p-3">
                        <div className="h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                        <div className="h-2 bg-gray-200 rounded mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {products.length === 0 ? (
                    <div className="text-center py-16 bg-white border border-[#E5D5C0] shadow-md">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">No products found</p>
                      <button onClick={clearFilters} className="px-4 py-2 bg-[#6B4F3A] text-white hover:bg-[#8B6B51] transition-colors">Clear Filters</button>
                    </div>
                  ) : (
                    <>
                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {products.map(product => <ProductGridCard key={product._id} product={product} />)}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {products.map(product => <ProductListCard key={product._id} product={product} />)}
                        </div>
                      )}

                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-1 mt-8">
                          <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="p-2 border border-[#E5D5C0] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                              return (
                                <button key={i} onClick={() => handlePageChange(pageNum)} className={`w-8 h-8 rounded text-sm font-medium transition-colors shadow-sm ${currentPage === pageNum ? 'bg-[#6B4F3A] text-white' : 'bg-white border border-[#E5D5C0] hover:bg-gray-50'}`}>
                                  {pageNum}
                                </button>
                              );
                            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                              return <span key={i} className="text-sm text-gray-400">...</span>;
                            }
                            return null;
                          })}
                          <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-[#E5D5C0] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-[#E5D5C0] flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#2C2420]" style={{ fontFamily: 'Playfair Display, serif' }}>Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4">
              <FilterSidebar 
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                categories={categories}
                subcategories={subcategories}
                childSubcategories={childSubcategories}
                filters={filters}
                handleCategoryChange={handleCategoryChange}
                handleRemoveCategory={handleRemoveCategory}
                handleSubcategoryChange={handleSubcategoryChange}
                handleRemoveSubcategory={handleRemoveSubcategory}
                handleChildSubcategoryChange={handleChildSubcategoryChange}
                handleRemoveChildSubcategory={handleRemoveChildSubcategory}
                handleTargetedCustomerChange={handleTargetedCustomerChange}
                minPriceInput={minPriceInput}
                maxPriceInput={maxPriceInput}
                setMinPriceInput={setMinPriceInput}
                setMaxPriceInput={setMaxPriceInput}
                applyPriceRange={applyPriceRange}
                clearPriceRange={clearPriceRange}
                getActiveFilterCount={getActiveFilterCount}
                clearFilters={clearFilters}
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                showChildSubcategory={showChildSubcategory}
              />
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t border-[#E5D5C0]">
              <button onClick={() => setShowMobileFilters(false)} className="w-full py-3 bg-[#6B4F3A] text-white font-medium hover:bg-[#8B6B51] transition-colors">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}




// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import Link from 'next/link';
// import { 
//   Search, 
//   Grid, 
//   List, 
//   SlidersHorizontal, 
//   X, 
//   Filter,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Tag,
//   Users,
//   DollarSign,
//   Sparkles,
//   Eye, 
//   ShoppingCart,
//   ArrowLeft,
//   Package,
//   TrendingUp,
//   Palette,
//   Ruler,
//   FolderTree,
//   Leaf,
//   Gem,
//   Crown,
//   Zap,
//   Truck,
//   Scissors,
//   LayoutGrid,
//   Star
// } from 'lucide-react';
// import WhatsAppButton from '../components/layout/WhatsAppButton';

// // Jute Theme Colors
// const JUTE_COLORS = {
//   primary: '#6B4F3A',
//   secondary: '#F5E6D3',
//   accent: '#3A7D44',
//   neutral: '#FFFFFF',
//   lightGray: '#FAF7F2',
//   border: '#E5D5C0',
//   text: '#333333',
//   textLight: '#8B7355',
//   textMuted: '#A8947A'
// };

// // Loading Bar Component
// const LoadingBar = ({ isVisible }) => {
//   return (
//     <div className={`fixed top-0 left-0 w-full h-0.5 bg-[#F5E6D3] z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//       <div className="h-full bg-[#6B4F3A] animate-loading-bar" style={{ width: '100%' }}></div>
//     </div>
//   );
// };

// // Helper functions
// const getUnitLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'kg';
//     case 'ton': return 'MT';
//     default: return 'pc';
//   }
// };

// const formatBulkRange = (range, unitLabel = 'pcs') => {
//   if (!range) return '';
//   if (range.includes('-')) {
//     const [min, max] = range.split('-');
//     return `${min}+ ${unitLabel}`;
//   }
//   if (range.includes('+')) {
//     return `${range.replace('+', '')}+ ${unitLabel}`;
//   }
//   return range;
// };

// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// const truncateText = (text, limit = 25) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const getTagStyles = (tag) => {
//   const styles = {
//     'Best Seller': 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30',
//     'New Arrival': 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30',
//     'Top Deal': 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/30',
//     'Eco-Friendly': 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30',
//     'Hot Export Item': 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30',
//     'Customizable': 'bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/30',
//     'Premium Quality': 'bg-gradient-to-r from-amber-600 to-yellow-700 text-white shadow-lg shadow-amber-600/30',
//     'Trending': 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30',
//   };
//   return styles[tag] || `bg-gradient-to-r from-[${JUTE_COLORS.primary}] to-[#8B6B51] text-white`;
// };

// const getTargetedAudienceStyle = (audience) => {
//   const styles = {
//     'ladies': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
//     'gents': 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white',
//     'kids': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
//     'unisex': 'bg-gradient-to-r from-purple-500 to-violet-500 text-white',
//   };
//   return styles[audience] || `bg-gradient-to-r from-[${JUTE_COLORS.primary}] to-[#8B6B51] text-white`;
// };

// // Filter Sidebar Component - Left Side (same as before)
// const FilterSidebar = ({ 
//   expandedSections, 
//   toggleSection, 
//   categories, 
//   subcategories,
//   childSubcategories,
//   filters, 
//   handleCategoryChange, 
//   handleRemoveCategory,
//   handleSubcategoryChange,
//   handleRemoveSubcategory,
//   handleChildSubcategoryChange,
//   handleRemoveChildSubcategory,
//   handleTargetedCustomerChange,
//   minPriceInput,
//   maxPriceInput,
//   setMinPriceInput,
//   setMaxPriceInput,
//   applyPriceRange,
//   clearPriceRange,
//   getActiveFilterCount,
//   clearFilters,
//   selectedCategory,
//   selectedSubcategory,
//   showChildSubcategory
// }) => (
//   <div className="bg-white border border-[#E5D5C0] p-5 sticky top-24 shadow-sm">
//     <div className="flex items-center justify-between mb-5">
//       <h3 className="text-lg font-semibold text-[#2C2420] flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//         <Filter className="w-5 h-5 text-[#6B4F3A]" />
//         Filters
//       </h3>
//       {getActiveFilterCount() > 0 && (
//         <button
//           onClick={clearFilters}
//           className="text-xs text-[#6B4F3A] hover:text-[#8B6B51] font-medium"
//         >
//           Clear All ({getActiveFilterCount()})
//         </button>
//       )}
//     </div>

//     {/* Price Range */}
//     <div className="mb-5 border-b border-[#E5D5C0] pb-5">
//       <button
//         onClick={() => toggleSection('price')}
//         className="flex items-center justify-between w-full text-left mb-3"
//       >
//         <h4 className="font-medium text-[#2C2420] flex items-center gap-2">
//           <DollarSign className="w-4 h-4 text-[#6B4F3A]" />
//           Price Range
//         </h4>
//         {expandedSections.price ? (
//           <ChevronUp className="w-4 h-4 text-gray-500" />
//         ) : (
//           <ChevronDown className="w-4 h-4 text-gray-500" />
//         )}
//       </button>
      
//       {expandedSections.price && (
//         <div className="space-y-4">
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-[#8B7355]">Min ($)</span>
//               <input
//                 type="text"
//                 inputMode="decimal"
//                 value={minPriceInput}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === '' || /^\d*\.?\d*$/.test(value)) {
//                     setMinPriceInput(value);
//                   }
//                 }}
//                 placeholder="0.00"
//                 className="w-28 px-2 py-1.5 text-right text-sm border border-[#E5D5C0] focus:outline-none focus:ring-2 focus:ring-[#6B4F3A]"
//               />
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-[#8B7355]">Max ($)</span>
//               <input
//                 type="text"
//                 inputMode="decimal"
//                 value={maxPriceInput}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (value === '' || /^\d*\.?\d*$/.test(value)) {
//                     setMaxPriceInput(value);
//                   }
//                 }}
//                 placeholder="∞"
//                 className="w-28 px-2 py-1.5 text-right text-sm border border-[#E5D5C0] focus:outline-none focus:ring-2 focus:ring-[#6B4F3A]"
//               />
//             </div>
//           </div>
          
//           <button
//             onClick={applyPriceRange}
//             disabled={!minPriceInput && !maxPriceInput}
//             className="w-full py-2 bg-[#6B4F3A] text-white text-sm font-medium hover:bg-[#8B6B51] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Apply Price Range
//           </button>

//           {(filters.priceRange.min || filters.priceRange.max) && (
//             <div className="flex items-center justify-between bg-[#FAF7F2] p-2">
//               <span className="text-sm text-[#6B4F3A]">
//                 ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
//               </span>
//               <button onClick={clearPriceRange} className="text-gray-400 hover:text-gray-600">
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>

//     {/* Categories */}
//     <div className="mb-5 border-b border-[#E5D5C0] pb-5">
//       <button
//         onClick={() => toggleSection('categories')}
//         className="flex items-center justify-between w-full text-left mb-3"
//       >
//         <h4 className="font-medium text-[#2C2420] flex items-center gap-2">
//           <Tag className="w-4 h-4 text-[#6B4F3A]" />
//           Categories
//         </h4>
//         {expandedSections.categories ? (
//           <ChevronUp className="w-4 h-4 text-gray-500" />
//         ) : (
//           <ChevronDown className="w-4 h-4 text-gray-500" />
//         )}
//       </button>
      
//       {expandedSections.categories && (
//         <div className="space-y-2">
//           {filters.categories.length > 0 && (
//             <div className="mb-3 p-2 bg-[#FAF7F2]">
//               <p className="text-xs text-[#8B7355] mb-2">Selected Categories:</p>
//               {filters.categories.map(catId => {
//                 const category = categories.find(c => c._id === catId);
//                 return category ? (
//                   <div key={catId} className="flex items-center justify-between py-1">
//                     <span className="text-sm font-medium text-[#2C2420]">{category.name}</span>
//                     <button
//                       onClick={() => handleRemoveCategory(catId)}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ) : null;
//               })}
//             </div>
//           )}
          
//           <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
//             {categories.map(category => (
//               <label key={category._id} className="flex items-center gap-2 cursor-pointer group">
//                 <input
//                   type="checkbox"
//                   checked={filters.categories.includes(category._id)}
//                   onChange={() => handleCategoryChange(category._id)}
//                   className="w-4 h-4 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
//                 />
//                 <span className="text-sm text-gray-700 group-hover:text-[#6B4F3A] transition-colors flex-1">
//                   {category.name}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Subcategories Section */}
//     {selectedCategory && subcategories.length > 0 && (
//       <div className="mb-5 border-b border-[#E5D5C0] pb-5">
//         <button
//           onClick={() => toggleSection('subcategories')}
//           className="flex items-center justify-between w-full text-left mb-3"
//         >
//           <h4 className="font-medium text-[#2C2420] flex items-center gap-2">
//             <FolderTree className="w-4 h-4 text-[#6B4F3A]" />
//             Subcategories
//           </h4>
//           {expandedSections.subcategories ? (
//             <ChevronUp className="w-4 h-4 text-gray-500" />
//           ) : (
//             <ChevronDown className="w-4 h-4 text-gray-500" />
//           )}
//         </button>
        
//         {expandedSections.subcategories && (
//           <div className="space-y-2">
//             {filters.subcategories.length > 0 && (
//               <div className="mb-3 p-2 bg-[#FAF7F2]">
//                 <p className="text-xs text-[#8B7355] mb-2">Selected Subcategories:</p>
//                 {filters.subcategories.map(subId => {
//                   const subcategory = subcategories.find(s => s._id === subId);
//                   return subcategory ? (
//                     <div key={subId} className="flex items-center justify-between py-1">
//                       <span className="text-sm font-medium text-[#2C2420]">{subcategory.name}</span>
//                       <button
//                         onClick={() => handleRemoveSubcategory(subId)}
//                         className="text-gray-400 hover:text-gray-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ) : null;
//                 })}
//               </div>
//             )}
            
//             <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
//               {subcategories.map(subcategory => (
//                 <label key={subcategory._id} className="flex items-center gap-2 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={filters.subcategories.includes(subcategory._id)}
//                     onChange={() => handleSubcategoryChange(subcategory._id)}
//                     className="w-4 h-4 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
//                   />
//                   <span className="text-sm text-gray-700 group-hover:text-[#6B4F3A] transition-colors flex-1">
//                     {subcategory.name}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     )}

//     {/* Child Subcategories Section */}
//     {showChildSubcategory && selectedSubcategory && childSubcategories.length > 0 && (
//       <div className="mb-5 border-b border-[#E5D5C0] pb-5">
//         <button
//           onClick={() => toggleSection('childSubcategories')}
//           className="flex items-center justify-between w-full text-left mb-3"
//         >
//           <h4 className="font-medium text-[#2C2420] flex items-center gap-2">
//             <FolderTree className="w-4 h-4 text-[#6B4F3A]" />
//             Child Subcategories
//           </h4>
//           {expandedSections.childSubcategories ? (
//             <ChevronUp className="w-4 h-4 text-gray-500" />
//           ) : (
//             <ChevronDown className="w-4 h-4 text-gray-500" />
//           )}
//         </button>
        
//         {expandedSections.childSubcategories && (
//           <div className="space-y-2">
//             {filters.childSubcategories.length > 0 && (
//               <div className="mb-3 p-2 bg-[#FAF7F2]">
//                 <p className="text-xs text-[#8B7355] mb-2">Selected Child Subcategories:</p>
//                 {filters.childSubcategories.map(childId => {
//                   const child = childSubcategories.find(c => c._id === childId);
//                   return child ? (
//                     <div key={childId} className="flex items-center justify-between py-1">
//                       <span className="text-sm font-medium text-[#2C2420]">{child.name}</span>
//                       <button
//                         onClick={() => handleRemoveChildSubcategory(childId)}
//                         className="text-gray-400 hover:text-gray-600"
//                       >
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ) : null;
//                 })}
//               </div>
//             )}
            
//             <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
//               {childSubcategories.map(child => (
//                 <label key={child._id} className="flex items-center gap-2 cursor-pointer group">
//                   <input
//                     type="checkbox"
//                     checked={filters.childSubcategories.includes(child._id)}
//                     onChange={() => handleChildSubcategoryChange(child._id)}
//                     className="w-4 h-4 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
//                   />
//                   <span className="text-sm text-gray-700 group-hover:text-[#6B4F3A] transition-colors flex-1">
//                     {child.name}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     )}

//     {/* Target Audience */}
//     <div className="mb-2">
//       <button
//         onClick={() => toggleSection('audience')}
//         className="flex items-center justify-between w-full text-left mb-3"
//       >
//         <h4 className="font-medium text-[#2C2420] flex items-center gap-2">
//           <Users className="w-4 h-4 text-[#6B4F3A]" />
//           Target Audience
//         </h4>
//         {expandedSections.audience ? (
//           <ChevronUp className="w-4 h-4 text-gray-500" />
//         ) : (
//           <ChevronDown className="w-4 h-4 text-gray-500" />
//         )}
//       </button>
      
//       {expandedSections.audience && (
//         <div className="space-y-2">
//           {[
//             { value: 'ladies', label: 'Ladies' },
//             { value: 'gents', label: 'Gents' },
//             { value: 'kids', label: 'Kids' },
//             { value: 'unisex', label: 'Unisex' }
//           ].map(customer => (
//             <label key={customer.value} className="flex items-center gap-2 cursor-pointer group">
//               <input
//                 type="checkbox"
//                 checked={filters.targetedCustomer.includes(customer.value)}
//                 onChange={() => handleTargetedCustomerChange(customer.value)}
//                 className="w-4 h-4 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#6B4F3A]"
//               />
//               <span className="text-sm text-gray-700 group-hover:text-[#6B4F3A] transition-colors flex-1">
//                 {customer.label}
//               </span>
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
// );

// // Product Grid Card - With Shadow (shortened for brevity)
// const ProductGridCard = ({ product }) => {
//   const [isMobile, setIsMobile] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
  
//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const firstTier = product.quantityBasedPricing?.[0];
//   const primaryTag = product.tags?.[0];
//   const tagStyle = primaryTag ? getTagStyles(primaryTag) : '';
//   const audienceStyle = product.targetedCustomer ? getTargetedAudienceStyle(product.targetedCustomer) : '';
//   const unitLabel = getUnitLabel(product.orderUnit);
//   const bulkRangeDisplay = firstTier ? formatBulkRange(firstTier.range, unitLabel === 'pcs' ? 'pc' : unitLabel) : '';

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       transition={{
//         layout: { type: "spring", stiffness: 100, damping: 15 },
//         opacity: { duration: 0.3 }
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group bg-white border border-[#E5D5C0] hover:border-[#6B4F3A]/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
//       onClick={() => {
//         if (isMobile) {
//           window.location.href = `/productDetails?id=${product._id}`;
//         } else {
//           window.open(`/productDetails?id=${product._id}`, '_blank');
//         }
//       }}
//     >
//       <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden bg-white">
//         <motion.img
//           src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
//           alt={product.productName}
//           className="w-full h-full object-contain p-2"
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.4 }}
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
//           }}
//           loading="lazy"
//         />
        
//         <motion.div 
//           className="absolute top-2 right-2 flex flex-col gap-1.5 z-30"
//           initial={{ opacity: 0, x: 10 }}
//           animate={{ 
//             opacity: isMobile ? 1 : (isHovered ? 1 : 0), 
//             x: isMobile ? 0 : (isHovered ? 0 : 10) 
//           }}
//           transition={{ duration: 0.2 }}
//         >
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${product._id}`, '_blank');
//             }}
//             className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
//           >
//             <Eye className="w-3 h-3 md:w-3.5 md:h-3.5 text-gray-700" />
//           </div>
          
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(`/productDetails?id=${product._id}#inquiry-form`, '_blank');
//             }}
//             className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
//           >
//             <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5 text-[#6B4F3A]" />
//           </div>
//         </motion.div>

//         {primaryTag && (
//           <motion.div 
//             initial={{ x: -10, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className={`absolute top-2 left-2 ${tagStyle} text-[7px] md:text-[9px] px-1.5 py-0.5 font-semibold z-20 flex items-center gap-1 shadow-lg`}
//           >
//             <span className="truncate">{primaryTag}</span>
//           </motion.div>
//         )}
//       </div>
      
//       {hasMultipleImages && (
//         <div className="flex justify-center items-center gap-1 py-1">
//           {productImages.slice(0, 4).map((image, index) => (
//             <button
//               key={index}
//               className={`w-5 h-5 md:w-6 md:h-6 overflow-hidden transition-all duration-200 ${
//                 activeIndex === index 
//                   ? 'border-2 border-[#6B4F3A]' 
//                   : 'border border-gray-200 opacity-60 hover:opacity-100'
//               }`}
//               onMouseEnter={() => setActiveIndex(index)}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setActiveIndex(index);
//               }}
//             >
//               <img src={image.url} alt="" className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       )}

//       <div className="p-2 md:p-3">
//         <h3 className="text-[11px] md:text-sm font-semibold text-gray-900 truncate hover:text-[#6B4F3A] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }} title={product.productName}>
//           {truncateText(product.productName, 25)}
//         </h3>

//         <div className="flex items-center justify-between mb-2">
//           <div>
//             <span className="text-[7px] md:text-[8px] text-[#8B7355]">Starting from</span>
//             <p className="text-sm md:text-base font-bold text-[#6B4F3A] leading-tight">
//               ${formatPrice(product.pricePerUnit)}
//               <span className="text-[8px] md:text-[9px] font-normal text-[#A8947A] ml-0.5">/{unitLabel}</span>
//             </p>
//           </div>
//           <div className="text-right">
//             <span className="text-[7px] md:text-[8px] text-[#8B7355]">MOQ</span>
//             <p className="text-[10px] md:text-xs font-semibold text-gray-700">{product.moq} {unitLabel}</p>
//           </div>
//         </div>

//         <div className="flex items-center justify-start flex-wrap gap-1.5 mb-1.5">
//           {product.category?.name && (
//             <div className="flex items-center gap-0.5">
//               <Package className="w-2.5 h-2.5 text-[#A8947A]" />
//               <span className="text-[7px] md:text-[8px] text-gray-500">
//                 {truncateText(product.category.name, 10)}
//               </span>
//             </div>
//           )}

//           {product.targetedCustomer && (
//             <div className={`flex items-center gap-0.5 px-1 py-0.5 ${audienceStyle} text-[6px] md:text-[7px]`}>
//               <Users className="w-2 h-2" />
//               <span className="capitalize">
//                 {product.targetedCustomer === 'ladies' ? 'Ladies' : 
//                  product.targetedCustomer === 'gents' ? 'Gents' :
//                  product.targetedCustomer === 'kids' ? 'Kids' : product.targetedCustomer}
//               </span>
//             </div>
//           )}

//           {firstTier && (
//             <div className="flex items-center gap-0.5 px-1 py-0.5 bg-[#F5E6D3]/50 rounded border border-[#E5D5C0]">
//               <span className="text-[6px] text-[#8B7355]">Bulk:</span>
//               <span className="text-[7px] font-medium text-[#6B4F3A]">
//                 ${formatPrice(firstTier.price)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}
//               </span>
//               <span className="text-[6px] text-[#A8947A]">({bulkRangeDisplay})</span>
//             </div>
//           )}
//         </div>

//         {product.colors && product.colors.length > 0 && (
//           <div className="flex items-center gap-0.5 mb-1.5">
//             <Palette className="w-2.5 h-2.5 text-[#A8947A]" />
//             <div className="flex items-center gap-0.5">
//               {product.colors.slice(0, 5).map((color, i) => (
//                 <div
//                   key={i}
//                   className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-gray-200 shadow-sm"
//                   style={{ backgroundColor: color.code }}
//                   title={color.name || color.code}
//                 />
//               ))}
//               {product.colors.length > 5 && (
//                 <span className="text-[6px] text-[#A8947A] ml-0.5">+{product.colors.length - 5}</span>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
//         }}
//         className="w-full py-1.5 md:py-2 text-center text-[9px] md:text-[10px] font-medium text-white bg-[#6B4F3A] hover:bg-[#8B6B51] transition-colors flex items-center justify-center gap-1.5"
//       >
//         <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5" />
//         Add to Inquiry
//       </button>
//     </motion.div>
//   );
// };

// // Product List Card - With Shadow and Hover Icons (shortened)
// const ProductListCard = ({ product }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
  
//   const productImages = product.images || [];
//   const hasMultipleImages = productImages.length > 1;
//   const firstTier = product.quantityBasedPricing?.[0];
//   const primaryTag = product.tags?.[0];
//   const audienceStyle = product.targetedCustomer ? getTargetedAudienceStyle(product.targetedCustomer) : '';
//   const unitLabel = getUnitLabel(product.orderUnit);
//   const bulkRangeDisplay = firstTier ? formatBulkRange(firstTier.range, unitLabel === 'pcs' ? 'pc' : unitLabel) : '';

//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.95 }}
//       whileHover={{ y: -4 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group bg-white border border-[#E5D5C0] hover:border-[#6B4F3A]/30 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
//       onClick={() => window.open(`/productDetails?id=${product._id}`, '_blank')}
//     >
//       <div className="flex flex-col md:flex-row">
//         <div className="md:w-64 lg:w-72 relative">
//           <div className="relative h-48 md:h-56 overflow-hidden bg-white">
//             <motion.img
//               src={productImages[activeIndex]?.url || productImages[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'}
//               alt={product.productName}
//               className="w-full h-full object-contain p-2"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.4 }}
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500';
//               }}
//               loading="lazy"
//             />
            
//             <motion.div 
//               className="absolute top-2 right-2 flex flex-col gap-1.5 z-30"
//               initial={{ opacity: 0, x: 10 }}
//               animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
//               transition={{ duration: 0.2 }}
//             >
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   window.open(`/productDetails?id=${product._id}`, '_blank');
//                 }}
//                 className="w-7 h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
//               >
//                 <Eye className="w-3.5 h-3.5 text-gray-700" />
//               </div>
//               <div
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   window.open(`/productDetails?id=${product._id}#inquiry-form`, '_blank');
//                 }}
//                 className="w-7 h-7 flex items-center justify-center border border-gray-300 bg-white/80 hover:bg-white transition-all duration-200 cursor-pointer"
//               >
//                 <ShoppingCart className="w-3.5 h-3.5 text-[#6B4F3A]" />
//               </div>
//             </motion.div>
            
//             {primaryTag && (
//               <span className={`absolute top-2 left-2 ${getTagStyles(primaryTag)} text-white text-[9px] px-1.5 py-0.5 font-semibold z-20 shadow-lg`}>
//                 {primaryTag}
//               </span>
//             )}
//           </div>

//           {hasMultipleImages && (
//             <div className="flex justify-center gap-1 py-1">
//               {productImages.slice(0, 4).map((image, idx) => (
//                 <div
//                   key={idx}
//                   className={`w-5 h-5 overflow-hidden cursor-pointer border transition-all ${
//                     activeIndex === idx 
//                       ? 'border-2 border-[#6B4F3A]' 
//                       : 'border border-gray-200 opacity-60 hover:opacity-100'
//                   }`}
//                   onMouseEnter={() => setActiveIndex(idx)}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setActiveIndex(idx);
//                   }}
//                 >
//                   <img src={image.url} alt="" className="w-full h-full object-cover" />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="flex-1 p-4">
//           <h3 className="text-base font-semibold text-[#2C2420] mb-2 line-clamp-1 hover:text-[#6B4F3A] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
//             {product.productName}
//           </h3>
          
//           <div className="flex items-center flex-wrap gap-2 mb-3">
//             <div className="flex items-center gap-1 bg-[#FAF7F2] px-2 py-1">
//               <Package className="w-3 h-3 text-[#6B4F3A]" />
//               <span className="text-[10px] text-gray-700">{product.category?.name || 'Uncategorized'}</span>
//             </div>

//             {product.targetedCustomer && (
//               <div className={`flex items-center gap-1 px-2 py-1 ${audienceStyle} text-[9px]`}>
//                 <Users className="w-3 h-3" />
//                 <span className="capitalize">
//                   {product.targetedCustomer === 'ladies' ? 'Ladies' : 
//                    product.targetedCustomer === 'gents' ? 'Gents' :
//                    product.targetedCustomer === 'kids' ? 'Kids' : product.targetedCustomer}
//                 </span>
//               </div>
//             )}

//             <div className="flex items-center gap-1 bg-[#FAF7F2] px-2 py-1">
//               <span className="text-[9px] text-gray-500">MOQ:</span>
//               <span className="text-[9px] font-semibold text-gray-800">{product.moq} {unitLabel}</span>
//             </div>
//           </div>
          
//           <p className="text-xs text-gray-600 mb-3 line-clamp-2">
//             {product.description?.replace(/<[^>]*>/g, '') || 'No description available'}
//           </p>

//           <div className="grid grid-cols-2 gap-3 mb-3">
//             <div>
//               <p className="text-[8px] text-[#8B7355]">Starting from</p>
//               <p className="text-lg font-bold text-[#6B4F3A]">
//                 ${formatPrice(product.pricePerUnit)}
//                 <span className="text-[9px] font-normal text-[#A8947A] ml-0.5">/{unitLabel}</span>
//               </p>
//             </div>
            
//             {product.colors && product.colors.length > 0 && (
//               <div>
//                 <p className="text-[8px] text-[#8B7355] mb-0.5">Colors</p>
//                 <div className="flex items-center gap-0.5 flex-wrap">
//                   {product.colors.slice(0, 4).map((color, idx) => (
//                     <div
//                       key={idx}
//                       className="w-3 h-3 rounded-full border border-gray-200 shadow-sm"
//                       style={{ backgroundColor: color.code }}
//                       title={color.name || `Color ${idx + 1}`}
//                     />
//                   ))}
//                   {product.colors.length > 4 && (
//                     <div className="w-3 h-3 rounded-full bg-gray-200 flex items-center justify-center text-[6px] font-medium text-gray-600">
//                       +{product.colors.length - 4}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             {firstTier && (
//               <div className="flex-1 bg-[#FAF7F2] p-2 border border-[#E5D5C0]">
//                 <p className="text-[8px] text-[#6B4F3A] font-medium mb-0.5">Bulk pricing:</p>
//                 <div className="flex justify-between text-[10px]">
//                   <span className="text-gray-700">{firstTier.range || 'Bulk'}</span>
//                   <span className="font-semibold text-[#6B4F3A]">
//                     ${formatPrice(firstTier.price)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}
//                   </span>
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 window.location.href = `/productDetails?id=${product._id}#inquiry-form`;
//               }}
//               className="px-4 py-2 bg-[#6B4F3A] text-white text-xs font-medium hover:bg-[#8B6B51] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
//             >
//               <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5" />
//               Add to Inquiry
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // ========== MAIN PRODUCTS CONTENT COMPONENT ==========
// export default function ProductsClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('grid');
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  
//   const [expandedSections, setExpandedSections] = useState({
//     price: true,
//     categories: true,
//     subcategories: true,
//     childSubcategories: true,
//     audience: true
//   });

//   const productsContainerRef = useRef(null);
//   const scrollPositionRef = useRef(0);
//   const searchTimerRef = useRef(null);

//   const [filters, setFilters] = useState({
//     search: '',
//     categories: [],
//     subcategories: [],
//     childSubcategories: [],
//     targetedCustomer: [],
//     priceRange: { min: '', max: '' },
//     sortBy: 'newest'
//   });

//   const [searchInput, setSearchInput] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [minPriceInput, setMinPriceInput] = useState('');
//   const [maxPriceInput, setMaxPriceInput] = useState('');
//   const [initialCategorySet, setInitialCategorySet] = useState(false);

//   const saveScrollPosition = () => {
//     scrollPositionRef.current = window.scrollY;
//   };

//   const restoreScrollPosition = () => {
//     if (scrollPositionRef.current > 0) {
//       window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
//     }
//   };

//   const debouncedSearch = useCallback((searchValue) => {
//     if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
//     searchTimerRef.current = setTimeout(() => {
//       saveScrollPosition();
//       setFilters(prev => ({ ...prev, search: searchValue }));
//       setCurrentPage(1);
//     }, 500);
//   }, []);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     debouncedSearch(value);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, search: '' }));
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Listen for route changes (when coming from category page)
//   useEffect(() => {
//     const categoryParam = searchParams.get('category');
//     const subcategoryParam = searchParams.get('subcategory');
//     const childSubcategoryParam = searchParams.get('childSubcategory');
    
//     console.log('🔍 Route change detected - URL params:', { 
//       category: categoryParam, 
//       subcategory: subcategoryParam, 
//       child: childSubcategoryParam 
//     });
    
//     if (categoryParam && categories.length > 0) {
//       const categoryExists = categories.some(cat => cat._id === categoryParam);
//       if (categoryExists) {
//         console.log('✅ Setting filter for category from route change:', categoryParam);
//         setFilters(prev => ({ ...prev, categories: [categoryParam] }));
//         setSelectedCategory(categoryParam);
        
//         if (subcategoryParam) {
//           fetchSubcategories(categoryParam).then(subcats => {
//             if (subcats && Array.isArray(subcats)) {
//               const subcategoryExists = subcats.some(sub => sub._id === subcategoryParam);
//               if (subcategoryExists) {
//                 setFilters(prev => ({ ...prev, subcategories: [subcategoryParam] }));
//                 setSelectedSubcategory(subcategoryParam);
//               }
//             }
//           });
//         }
//       }
//     }
//   }, [searchParams, categories.length]);

//   // Initial load from URL parameters
//   useEffect(() => {
//     if (categories.length > 0 && !initialCategorySet) {
//       const categoryParam = searchParams.get('category');
//       const subcategoryParam = searchParams.get('subcategory');
//       const childSubcategoryParam = searchParams.get('childSubcategory');
      
//       console.log('🔍 Initial load - URL params:', { categoryParam, subcategoryParam, childSubcategoryParam });
      
//       if (categoryParam) {
//         const categoryExists = categories.some(cat => cat._id === categoryParam);
//         if (categoryExists) {
//           setFilters(prev => ({ ...prev, categories: [categoryParam] }));
//           setSelectedCategory(categoryParam);
          
//           if (subcategoryParam) {
//             fetchSubcategories(categoryParam).then(subcats => {
//               if (subcats && Array.isArray(subcats)) {
//                 const subcategoryExists = subcats.some(sub => sub._id === subcategoryParam);
//                 if (subcategoryExists) {
//                   setFilters(prev => ({ ...prev, subcategories: [subcategoryParam] }));
//                   setSelectedSubcategory(subcategoryParam);
//                 }
//               }
//             });
//           }
//         }
//       }
//       setInitialCategorySet(true);
//     }
//   }, [categories, searchParams, initialCategorySet]);

//   useEffect(() => {
//     if (filters.categories.length === 1) {
//       const categoryId = filters.categories[0];
//       setSelectedCategory(categoryId);
//       fetchSubcategories(categoryId);
//     } else {
//       setSubcategories([]);
//       setSelectedCategory(null);
//       setChildSubcategories([]);
//       setSelectedSubcategory(null);
//       setShowChildSubcategory(false);
//       if (filters.subcategories.length > 0) {
//         setFilters(prev => ({ ...prev, subcategories: [] }));
//       }
//       if (filters.childSubcategories.length > 0) {
//         setFilters(prev => ({ ...prev, childSubcategories: [] }));
//       }
//     }
//   }, [filters.categories]);

//   useEffect(() => {
//     if (filters.subcategories.length === 1 && selectedCategory) {
//       const subcategoryId = filters.subcategories[0];
//       setSelectedSubcategory(subcategoryId);
//       fetchChildSubcategories(selectedCategory, subcategoryId);
//     } else {
//       setChildSubcategories([]);
//       setSelectedSubcategory(null);
//       setShowChildSubcategory(false);
//       if (filters.childSubcategories.length > 0) {
//         setFilters(prev => ({ ...prev, childSubcategories: [] }));
//       }
//     }
//   }, [filters.subcategories, selectedCategory]);

//   useEffect(() => {
//     if (initialCategorySet) {
//       fetchProducts();
//     }
//   }, [filters, currentPage, initialCategorySet]);

//   useEffect(() => {
//     if (!loading) restoreScrollPosition();
//   }, [loading]);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/categories');
//       const data = await response.json();
//       if (data.success) {
//         setCategories(data.data);
//       }
//       setCategoriesLoaded(true);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategoriesLoaded(true);
//     }
//   };

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
//       const data = await response.json();
//       if (data.success && Array.isArray(data.data.subcategories)) {
//         setSubcategories(data.data.subcategories);
//         return data.data.subcategories;
//       } else {
//         setSubcategories([]);
//         return [];
//       }
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//       setSubcategories([]);
//       return [];
//     }
//   };

//   const fetchChildSubcategories = async (categoryId, subcategoryId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`);
//       const data = await response.json();
//       if (data.success && Array.isArray(data.data.children)) {
//         setChildSubcategories(data.data.children);
//         setShowChildSubcategory(data.data.children.length > 0);
//         return data.data.children;
//       } else {
//         setChildSubcategories([]);
//         setShowChildSubcategory(false);
//         return [];
//       }
//     } catch (error) {
//       console.error('Error fetching child subcategories:', error);
//       setChildSubcategories([]);
//       setShowChildSubcategory(false);
//       return [];
//     }
//   };

//   const handleSubcategoryChange = (subcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newSubcategories = prev.subcategories.includes(subcategoryId)
//         ? prev.subcategories.filter(id => id !== subcategoryId)
//         : [...prev.subcategories, subcategoryId];
//       return { ...prev, subcategories: newSubcategories, childSubcategories: [] };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveSubcategory = (subcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({
//       ...prev,
//       subcategories: prev.subcategories.filter(id => id !== subcategoryId),
//       childSubcategories: []
//     }));
//     setCurrentPage(1);
//   };

//   const handleChildSubcategoryChange = (childSubcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newChildSubcategories = prev.childSubcategories.includes(childSubcategoryId)
//         ? prev.childSubcategories.filter(id => id !== childSubcategoryId)
//         : [...prev.childSubcategories, childSubcategoryId];
//       return { ...prev, childSubcategories: newChildSubcategories };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveChildSubcategory = (childSubcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({
//       ...prev,
//       childSubcategories: prev.childSubcategories.filter(id => id !== childSubcategoryId)
//     }));
//     setCurrentPage(1);
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams();
//       queryParams.append('page', currentPage);
//       queryParams.append('limit', 12);
      
//       if (filters.search) queryParams.append('search', filters.search);
      
//       if (filters.categories.length > 0) {
//         filters.categories.forEach(cat => queryParams.append('category', cat));
//       }

//       if (filters.subcategories.length > 0) {
//         filters.subcategories.forEach(sub => queryParams.append('subcategory', sub));
//       }

//       if (filters.childSubcategories.length > 0) {
//         filters.childSubcategories.forEach(child => queryParams.append('childSubcategory', child));
//       }
      
//       if (filters.targetedCustomer.length > 0) {
//         filters.targetedCustomer.forEach(cust => queryParams.append('targetedCustomer', cust));
//       }
      
//       if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
//       if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
//       let sortParam = '-createdAt';
//       switch (filters.sortBy) {
//         case 'price_low': sortParam = 'price_asc'; break;
//         case 'price_high': sortParam = 'price_desc'; break;
//         case 'name_asc': sortParam = 'name_asc'; break;
//         default: sortParam = 'newest';
//       }
//       queryParams.append('sort', sortParam);

//       const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.data || []);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalProducts(data.pagination?.total || 0);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (filterType, value) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, [filterType]: value }));
//     setCurrentPage(1);
//   };

//   const handleCategoryChange = (categoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newCategories = prev.categories.includes(categoryId)
//         ? prev.categories.filter(id => id !== categoryId)
//         : [...prev.categories, categoryId];
//       return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveCategory = (categoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({
//       ...prev,
//       categories: prev.categories.filter(id => id !== categoryId),
//       subcategories: [],
//       childSubcategories: []
//     }));
//     setCurrentPage(1);
//   };

//   const handleTargetedCustomerChange = (customer) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newCustomers = prev.targetedCustomer.includes(customer)
//         ? prev.targetedCustomer.filter(c => c !== customer)
//         : [...prev.targetedCustomer, customer];
//       return { ...prev, targetedCustomer: newCustomers };
//     });
//     setCurrentPage(1);
//   };

//   const applyPriceRange = () => {
//     saveScrollPosition();
//     setFilters(prev => ({
//       ...prev,
//       priceRange: { min: minPriceInput || '', max: maxPriceInput || '' }
//     }));
//     setCurrentPage(1);
//   };

//   const clearPriceRange = () => {
//     saveScrollPosition();
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
//   };

//   const clearFilters = () => {
//     saveScrollPosition();
//     setSearchInput('');
//     setFilters({
//       search: '',
//       categories: [],
//       subcategories: [],
//       childSubcategories: [],
//       targetedCustomer: [],
//       priceRange: { min: '', max: '' },
//       sortBy: 'newest'
//     });
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     saveScrollPosition();
//     setCurrentPage(newPage);
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   const getActiveFilterCount = () => {
//     let count = 0;
//     if (filters.search) count += 1;
//     if (filters.categories.length > 0) count += filters.categories.length;
//     if (filters.subcategories.length > 0) count += filters.subcategories.length;
//     if (filters.childSubcategories.length > 0) count += filters.childSubcategories.length;
//     if (filters.targetedCustomer.length > 0) count += filters.targetedCustomer.length;
//     if (filters.priceRange.min || filters.priceRange.max) count += 1;
//     return count;
//   };

//   useEffect(() => {
//     return () => {
//       if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
//     };
//   }, []);

//   return (
//     <>
//       <LoadingBar isVisible={loading} />
//       <Navbar />
      
//       {/* Simple Header with Breadcrumb and Search - No sticky */}
//       <div className="bg-white border-b border-[#E5D5C0] mt-20">
//         <div className="container mx-auto px-4 max-w-7xl py-4 md:py-6">
//           {/* Breadcrumb / Home Button */}
//           <div className="flex items-center gap-2 mb-4">
//             <Link href="/" className="text-gray-500 hover:text-[#6B4F3A] transition-colors text-sm">
//               Home
//             </Link>
//             <span className="text-gray-400">/</span>
//             <span className="text-[#6B4F3A] font-medium text-sm">Products</span>
//           </div>

//           {/* Title and Search Row */}
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-[#2C2420]" style={{ fontFamily: 'Playfair Display, serif' }}>
//                 All Products
//               </h1>
//               <p className="text-sm text-[#8B7355] mt-1">
//                 Browse our complete collection of premium jute products
//               </p>
//             </div>
            
//             {/* Search Bar */}
//             <div className="relative w-full md:w-80">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchInput}
//                 onChange={handleSearchChange}
//                 className="w-full pl-10 pr-4 py-2 text-sm border border-[#E5D5C0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent bg-white"
//               />
//               {searchInput && (
//                 <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2">
//                   <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="min-h-screen bg-[#FAF7F2]">
//         <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
//           {/* Filter and Sort Bar */}
//           <div className="mb-6">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setShowMobileFilters(true)}
//                   className="md:hidden flex items-center gap-2 px-3 py-2 bg-white border border-[#E5D5C0] hover:bg-gray-50 transition-colors shadow-sm text-sm"
//                 >
//                   <SlidersHorizontal className="w-4 h-4" />
//                   <span>Filters</span>
//                   {getActiveFilterCount() > 0 && (
//                     <span className="ml-1 px-1.5 py-0.5 bg-[#6B4F3A] text-white text-xs rounded-full">
//                       {getActiveFilterCount()}
//                     </span>
//                   )}
//                 </button>

//                 <select
//                   value={filters.sortBy}
//                   onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                   className="px-3 py-2 text-sm border border-[#E5D5C0] bg-white focus:ring-2 focus:ring-[#6B4F3A]/20 focus:border-[#6B4F3A] outline-none transition shadow-sm"
//                 >
//                   <option value="newest">Newest</option>
//                   <option value="price_low">Price: Low to High</option>
//                   <option value="price_high">Price: High to Low</option>
//                   <option value="name_asc">Name: A to Z</option>
//                 </select>

//                 <div className="hidden md:flex items-center gap-1 bg-white border border-[#E5D5C0] p-1 shadow-sm">
//                   <button onClick={() => setViewMode('grid')} className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#6B4F3A] text-white' : 'text-gray-500 hover:bg-gray-100'}`} title="Grid View">
//                     <Grid className="w-4 h-4" />
//                   </button>
//                   <button onClick={() => setViewMode('list')} className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[#6B4F3A] text-white' : 'text-gray-500 hover:bg-gray-100'}`} title="List View">
//                     <List className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Active Filters Display */}
//             {getActiveFilterCount() > 0 && (
//               <div className="mt-4 flex items-center gap-2 flex-wrap">
//                 {filters.search && (
//                   <div className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
//                     <span>"{filters.search}"</span>
//                     <button onClick={handleClearSearch} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
//                   </div>
//                 )}
//                 {filters.categories.map(catId => {
//                   const category = categories.find(c => c._id === catId);
//                   return category ? (
//                     <div key={catId} className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
//                       <span>{category.name}</span>
//                       <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.subcategories.map(subId => {
//                   const subcategory = subcategories.find(s => s._id === subId);
//                   return subcategory ? (
//                     <div key={subId} className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
//                       <FolderTree className="w-3 h-3" />
//                       <span>{subcategory.name}</span>
//                       <button onClick={() => handleRemoveSubcategory(subId)} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.childSubcategories.map(childId => {
//                   const child = childSubcategories.find(c => c._id === childId);
//                   return child ? (
//                     <div key={childId} className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
//                       <FolderTree className="w-3 h-3" />
//                       <span>{child.name}</span>
//                       <button onClick={() => handleRemoveChildSubcategory(childId)} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.targetedCustomer.map(cust => (
//                   <div key={cust} className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
//                     <span>{cust.charAt(0).toUpperCase() + cust.slice(1)}</span>
//                     <button onClick={() => handleTargetedCustomerChange(cust)} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
//                   </div>
//                 ))}
//                 {(filters.priceRange.min || filters.priceRange.max) && (
//                   <div className="flex items-center gap-1 px-2 py-1 bg-[#FAF7F2] text-[#6B4F3A] text-xs border border-[#E5D5C0]">
//                     <span>${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}</span>
//                     <button onClick={clearPriceRange} className="ml-1 hover:text-[#8B6B51]"><X className="w-3 h-3" /></button>
//                   </div>
//                 )}
//                 {getActiveFilterCount() > 0 && (
//                   <button onClick={clearFilters} className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700">Clear All</button>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Main Content - Filters on Left Side */}
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Desktop Filters - Left Side */}
//             <div className="hidden md:block md:w-80 flex-shrink-0">
//               <FilterSidebar 
//                 expandedSections={expandedSections}
//                 toggleSection={toggleSection}
//                 categories={categories}
//                 subcategories={subcategories}
//                 childSubcategories={childSubcategories}
//                 filters={filters}
//                 handleCategoryChange={handleCategoryChange}
//                 handleRemoveCategory={handleRemoveCategory}
//                 handleSubcategoryChange={handleSubcategoryChange}
//                 handleRemoveSubcategory={handleRemoveSubcategory}
//                 handleChildSubcategoryChange={handleChildSubcategoryChange}
//                 handleRemoveChildSubcategory={handleRemoveChildSubcategory}
//                 handleTargetedCustomerChange={handleTargetedCustomerChange}
//                 minPriceInput={minPriceInput}
//                 maxPriceInput={maxPriceInput}
//                 setMinPriceInput={setMinPriceInput}
//                 setMaxPriceInput={setMaxPriceInput}
//                 applyPriceRange={applyPriceRange}
//                 clearPriceRange={clearPriceRange}
//                 getActiveFilterCount={getActiveFilterCount}
//                 clearFilters={clearFilters}
//                 selectedCategory={selectedCategory}
//                 selectedSubcategory={selectedSubcategory}
//                 showChildSubcategory={showChildSubcategory}
//               />
//             </div>

//             {/* Products Grid/List - Right Side */}
//             <div className="flex-1" ref={productsContainerRef}>
//               {loading ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {[...Array(12)].map((_, index) => (
//                     <div key={index} className="bg-white border border-[#E5D5C0] overflow-hidden animate-pulse shadow-md">
//                       <div className="h-40 bg-gray-200"></div>
//                       <div className="p-3">
//                         <div className="h-3 bg-gray-200 rounded mb-2"></div>
//                         <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
//                         <div className="h-2 bg-gray-200 rounded mb-2"></div>
//                         <div className="h-6 bg-gray-200 rounded"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <>
//                   {products.length === 0 ? (
//                     <div className="text-center py-16 bg-white border border-[#E5D5C0] shadow-md">
//                       <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                       <p className="text-gray-500 mb-4">No products found</p>
//                       <button onClick={clearFilters} className="px-4 py-2 bg-[#6B4F3A] text-white hover:bg-[#8B6B51] transition-colors">Clear Filters</button>
//                     </div>
//                   ) : (
//                     <>
//                       {viewMode === 'grid' ? (
//                         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                           {products.map(product => <ProductGridCard key={product._id} product={product} />)}
//                         </div>
//                       ) : (
//                         <div className="space-y-4">
//                           {products.map(product => <ProductListCard key={product._id} product={product} />)}
//                         </div>
//                       )}

//                       {totalPages > 1 && (
//                         <div className="flex justify-center items-center gap-1 mt-8">
//                           <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="p-2 border border-[#E5D5C0] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm">
//                             <ChevronLeft className="w-4 h-4" />
//                           </button>
//                           {[...Array(totalPages)].map((_, i) => {
//                             const pageNum = i + 1;
//                             if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
//                               return (
//                                 <button key={i} onClick={() => handlePageChange(pageNum)} className={`w-8 h-8 rounded text-sm font-medium transition-colors shadow-sm ${currentPage === pageNum ? 'bg-[#6B4F3A] text-white' : 'bg-white border border-[#E5D5C0] hover:bg-gray-50'}`}>
//                                   {pageNum}
//                                 </button>
//                               );
//                             } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                               return <span key={i} className="text-sm text-gray-400">...</span>;
//                             }
//                             return null;
//                           })}
//                           <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-[#E5D5C0] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors bg-white shadow-sm">
//                             <ChevronRight className="w-4 h-4" />
//                           </button>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filters Modal */}
//       {showMobileFilters && (
//         <div className="fixed inset-0 z-50 md:hidden">
//           <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
//           <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
//             <div className="sticky top-0 bg-white p-4 border-b border-[#E5D5C0] flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-[#2C2420]" style={{ fontFamily: 'Playfair Display, serif' }}>Filters</h3>
//               <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
//             </div>
//             <div className="p-4">
//               <FilterSidebar 
//                 expandedSections={expandedSections}
//                 toggleSection={toggleSection}
//                 categories={categories}
//                 subcategories={subcategories}
//                 childSubcategories={childSubcategories}
//                 filters={filters}
//                 handleCategoryChange={handleCategoryChange}
//                 handleRemoveCategory={handleRemoveCategory}
//                 handleSubcategoryChange={handleSubcategoryChange}
//                 handleRemoveSubcategory={handleRemoveSubcategory}
//                 handleChildSubcategoryChange={handleChildSubcategoryChange}
//                 handleRemoveChildSubcategory={handleRemoveChildSubcategory}
//                 handleTargetedCustomerChange={handleTargetedCustomerChange}
//                 minPriceInput={minPriceInput}
//                 maxPriceInput={maxPriceInput}
//                 setMinPriceInput={setMinPriceInput}
//                 setMaxPriceInput={setMaxPriceInput}
//                 applyPriceRange={applyPriceRange}
//                 clearPriceRange={clearPriceRange}
//                 getActiveFilterCount={getActiveFilterCount}
//                 clearFilters={clearFilters}
//                 selectedCategory={selectedCategory}
//                 selectedSubcategory={selectedSubcategory}
//                 showChildSubcategory={showChildSubcategory}
//               />
//             </div>
//             <div className="sticky bottom-0 bg-white p-4 border-t border-[#E5D5C0]">
//               <button onClick={() => setShowMobileFilters(false)} className="w-full py-3 bg-[#6B4F3A] text-white font-medium hover:bg-[#8B6B51] transition-colors">Apply Filters</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//       <WhatsAppButton />

//       <style jsx>{`
//         @keyframes loading-bar {
//           0% { transform: translateX(-100%); }
//           50% { transform: translateX(0); }
//           100% { transform: translateX(100%); }
//         }
//         .animate-loading-bar {
//           animation: loading-bar 1.5s ease-in-out infinite;
//         }
//       `}</style>
//     </>
//   );
// }