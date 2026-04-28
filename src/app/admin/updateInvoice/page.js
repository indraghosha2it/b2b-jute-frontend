
// 'use client';

// import { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   FileText,
//   ArrowLeft,
//   Save,
//   Send,
//   Plus,
//   Trash2,
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   DollarSign,
//   Calendar,
//   User,
//   Building2,
//   Mail,
//   Phone,
//   MapPin,
//   Package,
//   XCircle,
//   Copy,
//   Upload,
//   Image as ImageIcon,
//   ChevronDown,
//   ChevronUp,
//   Search,
//   X,
//   ShoppingBag,
//   TrendingUp,
//   TrendingDown,
//   CreditCard,
//   Wallet,
//   Landmark,
//   Lock,
//   AlertTriangle,
//   Scale
// } from 'lucide-react';
// import { toast } from 'sonner';

// // Helper function to format currency
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
//   }).format(price || 0);
// };

// // Helper function to get unit label
// const getUnitLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'kg';
//     case 'ton': return 'MT';
//     default: return 'pcs';
//   }
// };

// // Default logo URL
// const DEFAULT_LOGO_URL = 'https://i.ibb.co.com/60xkJ1Wd/favicon.png';

// // Parse number helper
// const parseNumber = (value) => {
//   if (value === '' || value === null || value === undefined) return 0;
//   const num = parseFloat(value);
//   return isNaN(num) ? 0 : num;
// };

// // Status Badge Component
// const StatusBadge = ({ status }) => {
//   const statusConfig = {
//     Paid: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
//     Partial: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: TrendingUp },
//     Unpaid: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: AlertCircle },
//     Overpaid: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', icon: TrendingDown },
//     'Not Calculated': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', icon: DollarSign }
//   };

//   const config = statusConfig[status] || statusConfig['Not Calculated'];
//   const Icon = config.icon;

//   return (
//     <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg} ${config.border} border`}>
//       <Icon className={`w-4 h-4 ${config.text}`} />
//       <span className={`text-xs font-medium ${config.text}`}>{status}</span>
//     </div>
//   );
// };

// // Weight Quantity Input Component for kg/ton products
// const WeightQuantityInput = ({ quantity, onQuantityChange, unitLabel, moq, readOnly, onBlur }) => {
//   const displayValue = quantity === 0 ? '' : quantity;

//   const handleChange = (e) => {
//     if (readOnly) return;
//     const value = e.target.value;
//     if (value === '') {
//       onQuantityChange(0);
//     } else {
//       const num = parseFloat(value);
//       if (!isNaN(num) && num >= 0) {
//         onQuantityChange(num);
//       }
//     }
//   };

//   const handleBlur = () => {
//     if (readOnly) return;
//     if (quantity === 0) {
//       onQuantityChange(0);
//     }
//     if (onBlur) onBlur();
//   };

//   return (
//     <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-[#6B4F3A] transition-all">
//       <div className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-50 border-r border-gray-200">
//         <span className="text-[10px] sm:text-xs font-medium text-gray-700">Qty</span>
//       </div>
//       <input
//         type="number"
//         step="0.01"
//         min="0"
//         value={displayValue}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         onWheel={(e) => e.target.blur()}
//         readOnly={readOnly}
//         className={`w-20 sm:w-24 px-1 py-1 sm:py-1.5 text-[10px] sm:text-xs text-center border-none focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${readOnly ? 'bg-gray-50 text-gray-600' : ''}`}
//         placeholder="0"
//       />
//       <div className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-50 border-l border-gray-200">
//         <span className="text-[9px] sm:text-[10px] font-medium text-gray-500">{unitLabel}</span>
//       </div>
//     </div>
//   );
// };

// // Size Badge Component
// const SizeBadge = ({ size, quantity, onRemove, onQuantityChange, readOnly = false, onBlur }) => {
//   const displayValue = quantity === 0 ? '' : quantity;

//   const handleChange = (e) => {
//     if (readOnly) return;
//     const value = e.target.value;
//     if (value === '') {
//       onQuantityChange(0);
//     } else {
//       const num = parseInt(value);
//       if (!isNaN(num) && num >= 0) {
//         onQuantityChange(num);
//       }
//     }
//   };

//   const handleBlur = () => {
//     if (readOnly) return;
//     if (quantity === 0) {
//       onQuantityChange(0);
//     }
//     if (onBlur) onBlur();
//   };

//   return (
//     <div className={`inline-flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm ${!readOnly && 'hover:border-[#6B4F3A]'} transition-all`}>
//       <div className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-50 border-r border-gray-200">
//         <span className="text-[10px] sm:text-xs font-medium text-gray-700">{size}</span>
//       </div>
//       <input
//         type="number"
//         min="0"
//         value={displayValue}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         onWheel={(e) => e.target.blur()}
//         readOnly={readOnly}
//         className={`w-10 sm:w-14 px-1 py-1 sm:py-1.5 text-[10px] sm:text-xs text-center border-none focus:outline-none ${!readOnly && 'focus:ring-2 focus:ring-[#6B4F3A]'} ${readOnly ? 'bg-gray-50 text-gray-600' : ''}`}
//         placeholder="0"
//       />
//       {!readOnly && (
//         <button
//           onClick={onRemove}
//           className="p-1 sm:p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border-l border-gray-200"
//           title="Remove size"
//         >
//           <Trash2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
//         </button>
//       )}
//     </div>
//   );
// };

// // Banking Term Field Component
// const BankingTermField = ({ field, onUpdate, onRemove, readOnly = false }) => {
//   return (
//     <div className="flex flex-col sm:flex-row items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//       <div className="flex-1 w-full">
//         <input
//           type="text"
//           value={field.title}
//           onChange={(e) => onUpdate(field.id, 'title', e.target.value)}
//           readOnly={readOnly}
//           placeholder="Term title (e.g., Payment Terms, Late Fee)"
//           className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent mb-2 ${readOnly ? 'bg-gray-50 text-gray-600' : ''}`}
//         />
//         <textarea
//           value={field.value}
//           onChange={(e) => onUpdate(field.id, 'value', e.target.value)}
//           readOnly={readOnly}
//           placeholder="Term description or value (optional - can be left empty)"
//           rows="2"
//           className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${readOnly ? 'bg-gray-50 text-gray-600' : ''}`}
//         />
//         <p className="text-xs text-gray-400 mt-1">
//           You can leave the value empty if this is just a heading or note
//         </p>
//       </div>
//       {!readOnly && (
//         <button
//           onClick={() => onRemove(field.id)}
//           className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//           title="Remove term"
//         >
//           <Trash2 className="w-4 h-4" />
//         </button>
//       )}
//     </div>
//   );
// };

// // Product Item Card Component - Supports both piece-based and weight-based
// const ProductItemCard = ({ 
//   item, 
//   itemIndex, 
//   product, 
//   onUpdate, 
//   onUpdateWeightQuantity,
//   onUpdateUnitPrice,  
//   onAddColor, 
//   onAddSize, 
//   onRemoveColor, 
//   onRemoveSize,
//   onRemoveProduct,
//   isExpanded,
//   onToggleExpand,
//   calculateBulkPrice,
//   readOnly = false
// }) => {
//   const availableColors = product?.colors || [];
//   const availableSizes = product?.sizes || [];
//   const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
//   const unitLabel = getUnitLabel(item.orderUnit);

//   const handleSizeQuantityChange = (colorIndex, sizeIndex, newQuantity) => {
//     if (readOnly) return;
//     onUpdate(itemIndex, colorIndex, sizeIndex, newQuantity);
//   };

//   const handleWeightQuantityChange = (colorIndex, newQuantity) => {
//     if (readOnly) return;
//     if (onUpdateWeightQuantity) {
//       onUpdateWeightQuantity(itemIndex, colorIndex, newQuantity);
//     }
//   };

//   const handleRemoveColor = (colorIndex) => {
//     if (readOnly) return;
//     onRemoveColor(itemIndex, colorIndex);
//   };

//   const handleRemoveSize = (colorIndex, sizeIndex) => {
//     if (readOnly) return;
//     onRemoveSize(itemIndex, colorIndex, sizeIndex);
//   };

//   const handleAddColor = (colorCode, colorName) => {
//     if (readOnly) return;
//     onAddColor(itemIndex, colorCode, colorName);
//   };

//   const handleAddSize = (colorIndex, size) => {
//     if (readOnly) return;
//     onAddSize(itemIndex, colorIndex, size);
//   };

//   const imageUrl = item.productImage || product?.images?.[0]?.url || 'https://via.placeholder.com/80x80?text=No+Image';
//   const productTotalPrice = item.total || 0;

//   // Calculate bulk price for a color when quantity changes
//   const handleQuantityBlur = (colorIndex, colorTotal, color) => {
//     if (readOnly) return;
//     if (product && colorTotal > 0 && !color.isPriceOverridden) {
//       const bulkPrice = calculateBulkPrice(product, colorTotal);
//       if (bulkPrice !== undefined && bulkPrice > 0) {
//         onUpdateUnitPrice(itemIndex, colorIndex, bulkPrice, false);
//       }
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
//       <div 
//         className={`bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 ${!readOnly && 'cursor-pointer hover:bg-gray-100/50'} transition-colors`}
//         onClick={readOnly ? undefined : onToggleExpand}
//       >
//         <div className="flex flex-col gap-3">
//           {/* Row 1: Image and Product Name + Stats Row */}
//           <div className="flex items-start gap-3 sm:gap-4">
//             <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
//               <img 
//                 src={imageUrl} 
//                 alt={item.productName}
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
//                 }}
//               />
//             </div>
            
//             <div className="flex-1">
//               <h3 className="text-sm sm:text-base font-semibold text-gray-900">{item.productName}</h3>
//               <div className="flex flex-wrap items-center gap-2 mt-2">
//                 <span className="text-[10px] sm:text-xs bg-blue-50 text-blue-700 px-1.5 sm:px-2 py-0.5 rounded-full">
//                   {item.orderUnit === 'kg' ? 'KG (Weight)' : item.orderUnit === 'ton' ? 'MT (Weight)' : 'Pieces'}
//                 </span>
//                 <span className="text-[10px] sm:text-xs bg-purple-50 text-purple-700 px-1.5 sm:px-2 py-0.5 rounded-full">
//                   {item.colors.length} Colors
//                 </span>
//                 <span className="text-[10px] sm:text-xs bg-green-50 text-green-700 px-1.5 sm:px-2 py-0.5 rounded-full">
//                   {item.totalQuantity} {unitLabel}
//                 </span>
//                 {product?.quantityBasedPricing?.length > 0 && !readOnly && (
//                   <span className="text-[10px] sm:text-xs bg-orange-50 text-orange-700 px-1.5 sm:px-2 py-0.5 rounded-full">
//                     Bulk Pricing Available
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {/* Row 2: Pricing and Actions */}
//           <div className="flex items-center justify-between gap-3 ml-0 sm:ml-0">
//             <div className="text-left">
//               <p className="text-[10px] sm:text-xs text-gray-500">Base Price</p>
//               <p className="text-sm sm:text-base font-bold text-[#6B4F3A]">{formatPrice(item.unitPrice)}</p>
//               <p className="text-[8px] text-gray-400">per {unitLabel === 'pcs' ? 'pc' : unitLabel}</p>
//             </div>
            
//             <div className="text-left">
//               <p className="text-[10px] sm:text-xs text-gray-500">Product Total</p>
//               <p className="text-sm sm:text-base font-bold text-[#6B4F3A]">{formatPrice(productTotalPrice)}</p>
//             </div>
            
//             {!readOnly && (
//               <div className="flex items-center gap-1">
//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onRemoveProduct(itemIndex);
//                   }}
//                   className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
//                   title="Remove product"
//                 >
//                   <Trash2 className="w-4 h-4 text-red-500" />
//                 </button>
//                 <button 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onToggleExpand();
//                   }}
//                   className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
//                 >
//                   {isExpanded ? (
//                     <ChevronUp className="w-5 h-5 text-gray-500" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5 text-gray-500" />
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className="p-4 sm:p-5 space-y-4">
//           {item.colors.map((color, colorIndex) => {
//             let colorTotal = 0;
//             if (isWeightBased) {
//               colorTotal = color.quantity || color.totalQuantity || 0;
//             } else {
//               colorTotal = color.sizeQuantities.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
//             }
//             const displayUnitPrice = color.unitPrice || 0;
//             const isPriceOverridden = color.isPriceOverridden || false;
            
//             // Calculate bulk price for this quantity
//             const bulkPrice = calculateBulkPrice(product, colorTotal);
//             const bulkPriceInfo = bulkPrice > 0 && bulkPrice !== displayUnitPrice && !isPriceOverridden && colorTotal >= item.moq ? { price: bulkPrice } : null;
            
//             return (
//               <div key={`${itemIndex}-${colorIndex}-${color.color.code}`} className="bg-gray-50/50 rounded-lg p-3 sm:p-4 border border-gray-100">
//                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
//                   <div className="flex items-center gap-2">
//                     <div 
//                       className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-md" 
//                       style={{ backgroundColor: color.color.code }}
//                     />
//                     <span className="text-xs sm:text-sm font-semibold text-gray-800">
//                       {color.color.name || color.color.code}
//                     </span>
//                     <span className="text-[10px] sm:text-xs bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-gray-200">
//                       {colorTotal} {unitLabel}
//                     </span>
//                     {isPriceOverridden && (
//                       <span className="text-[8px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
//                         Manual Price
//                       </span>
//                     )}
//                     {bulkPriceInfo && !isPriceOverridden && (
//                       <span className="text-[8px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
//                         Bulk Price Applied
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="flex items-center gap-2">
//                     {colorTotal > 0 && (
//                       <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
//                         <span className="text-[9px] sm:text-[10px] text-gray-500">$</span>
//                         <input
//                           type="number"
//                           step="0.01"
//                           min="0"
//                           value={displayUnitPrice}
//                           onChange={(e) => {
//                             if (readOnly) return;
//                             const newPrice = parseFloat(e.target.value) || 0;
//                             onUpdateUnitPrice(itemIndex, colorIndex, newPrice, true);
//                           }}
//                           readOnly={readOnly}
//                           className={`w-16 sm:w-20 px-1 py-0.5 text-[9px] sm:text-[10px] text-center bg-transparent border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${readOnly ? 'text-gray-600' : ''}`}
//                         />
//                         <span className="text-[9px] sm:text-[10px] text-gray-500">/{unitLabel === 'pcs' ? 'pc' : unitLabel}</span>
//                       </div>
//                     )}
//                     {!readOnly && (
//                       <button
//                         onClick={() => handleRemoveColor(colorIndex)}
//                         className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start sm:self-auto"
//                         title="Remove color"
//                       >
//                         <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Quantity Input - Weight-based OR Size-based */}
//                 {isWeightBased ? (
//                   <div className="mt-3">
//                     <WeightQuantityInput
//                       quantity={color.quantity || color.totalQuantity || 0}
//                       onQuantityChange={(newQty) => handleWeightQuantityChange(colorIndex, newQty)}
//                       onBlur={() => handleQuantityBlur(colorIndex, colorTotal, color)}
//                       unitLabel={unitLabel}
//                       moq={item.moq}
//                       readOnly={readOnly}
//                     />
//                     {colorTotal > 0 && colorTotal < item.moq && !readOnly && (
//                       <p className="text-[10px] text-yellow-600 mt-1">
//                         ⚠️ Quantity ({colorTotal} {unitLabel}) is below MOQ ({item.moq} {unitLabel})
//                       </p>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
//                     {color.sizeQuantities.map((sq, sizeIndex) => (
//                       <SizeBadge
//                         key={`${itemIndex}-${colorIndex}-${sizeIndex}-${sq.size}`}
//                         size={sq.size}
//                         quantity={sq.quantity}
//                         onQuantityChange={(newQty) => handleSizeQuantityChange(colorIndex, sizeIndex, newQty)}
//                         onBlur={() => handleQuantityBlur(colorIndex, colorTotal, color)}
//                         onRemove={() => handleRemoveSize(colorIndex, sizeIndex)}
//                         readOnly={readOnly}
//                       />
//                     ))}
                    
//                     {!readOnly && availableSizes.length > 0 && (
//                       <select
//                         onChange={(e) => {
//                           if (e.target.value) {
//                             handleAddSize(colorIndex, e.target.value);
//                             e.target.value = '';
//                           }
//                         }}
//                         className="px-1.5 sm:px-2 py-1 sm:py-1.5 text-[10px] sm:text-xs border border-gray-200 rounded-lg bg-white hover:border-[#6B4F3A] focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] transition-colors"
//                         value=""
//                       >
//                         <option value="">+ Add Size</option>
//                         {availableSizes
//                           .filter(s => !color.sizeQuantities.some(sq => sq.size === s))
//                           .map(size => (
//                             <option key={size} value={size}>{size}</option>
//                           ))
//                         }
//                       </select>
//                     )}
//                   </div>
//                 )}

//                 {/* Price Breakdown */}
//                 {colorTotal > 0 && (
//                   <div className="mt-2 pt-2 border-t border-gray-200">
//                     <div className="flex justify-between items-center text-[9px] sm:text-[10px]">
//                       <div className="flex flex-col gap-0.5">
//                         <span className="text-gray-500">
//                           {colorTotal < item.moq ? (
//                             <span className="text-yellow-600">⚠️ Below MOQ ({item.moq} {unitLabel} required)</span>
//                           ) : isPriceOverridden ? (
//                             <span className="text-blue-600">✏️ Manually set price</span>
//                           ) : bulkPriceInfo ? (
//                             <span className="text-green-600">✓ Bulk pricing applied</span>
//                           ) : (
//                             <span>Base price applied</span>
//                           )}
//                         </span>
//                         {bulkPriceInfo && !isPriceOverridden && !readOnly && (
//                           <span className="text-[8px] text-gray-400">
//                             Bulk rate: {formatPrice(bulkPrice)}/{unitLabel === 'pcs' ? 'pc' : unitLabel} (was {formatPrice(item.unitPrice)})
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-right">
//                         <span className="text-gray-500">
//                           {colorTotal} {unitLabel} × {formatPrice(displayUnitPrice)}/{unitLabel === 'pcs' ? 'pc' : unitLabel} = 
//                         </span>
//                         <span className="font-semibold text-[#6B4F3A] ml-1">
//                           {formatPrice(colorTotal * displayUnitPrice)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {!readOnly && availableColors.length > 0 && (
//             <div className="mt-4 pt-3 border-t border-gray-200">
//               <label className="block text-xs font-medium text-gray-700 mb-2">
//                 Add New Color
//               </label>
              
//               <div className="flex flex-wrap gap-2 sm:gap-3">
//                 {availableColors
//                   .filter(c => !item.colors.some(ic => ic.color.code === c.code))
//                   .map(color => (
//                     <button
//                       key={color.code}
//                       onClick={() => handleAddColor(color.code, color.name)}
//                       className="group relative focus:outline-none"
//                       title={color.code}
//                     >
//                       <div 
//                         className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform hover:ring-2 hover:ring-[#6B4F3A]"
//                         style={{ backgroundColor: color.code }}
//                       />
//                       <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-[10px] sm:text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                         {color.code}
//                       </span>
//                     </button>
//                   ))
//                 }
//               </div>
              
//               {availableColors.filter(c => !item.colors.some(ic => ic.color.code === c.code)).length === 0 && (
//                 <p className="text-xs text-gray-400 italic">All colors have been added</p>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// // Search Product Modal Component
// const SearchProductModal = ({ isOpen, onClose, onSelectProduct, existingProductIds }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [allProducts, setAllProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       fetchAllProducts();
//     }
//   }, [isOpen]);

//   const fetchAllProducts = async () => {
//     setLoadingProducts(true);
//     try {
//       const response = await fetch('http://localhost:5000/api/products?limit=100');
//       const data = await response.json();
//       if (data.success) {
//         const filtered = data.data.filter(p => !existingProductIds.includes(p._id));
//         setAllProducts(filtered);
//         setSearchResults(filtered);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       toast.error('Failed to load products');
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//     if (term.trim() === '') {
//       setSearchResults(allProducts);
//     } else {
//       const filtered = allProducts.filter(product =>
//         product.productName.toLowerCase().includes(term.toLowerCase())
//       );
//       setSearchResults(filtered);
//     }
//   };

//   const handleSelectProduct = (product) => {
//     setSelectedProduct(product);
//   };

//   const getUnitDisplay = (orderUnit) => {
//     switch(orderUnit) {
//       case 'kg': return 'KG (Weight)';
//       case 'ton': return 'MT (Weight)';
//       default: return 'Pieces';
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
//         <div className="flex-shrink-0 p-4 sm:p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Add Product to Invoice</h2>
//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//               <X className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>
//         </div>

//         <div className="flex-shrink-0 p-4 sm:p-6 pb-0">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products by name..."
//               value={searchTerm}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent"
//               autoFocus
//             />
//             {(searching || loadingProducts) && (
//               <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-[#6B4F3A]" />
//             )}
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 pt-4">
//           <div className="space-y-2">
//             {searchResults.length > 0 ? (
//               searchResults.map((product) => (
//                 <div
//                   key={product._id}
//                   onClick={() => handleSelectProduct(product)}
//                   className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
//                     selectedProduct?._id === product._id
//                       ? 'border-[#6B4F3A] bg-orange-50'
//                       : 'border-gray-200 hover:border-[#6B4F3A] hover:bg-gray-50'
//                   }`}
//                 >
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                     <img
//                       src={product.images?.[0]?.url || 'https://via.placeholder.com/48'}
//                       alt={product.productName}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{product.productName}</h3>
//                       <span className="text-[8px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full whitespace-nowrap">
//                         {getUnitDisplay(product.orderUnit)}
//                       </span>
//                     </div>
//                     <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
//                       {product.colors?.length || 0} colors • {product.sizes?.length || 0} sizes
//                       {product.quantityBasedPricing?.length > 0 && ` • ${product.quantityBasedPricing.length} pricing tiers`}
//                     </p>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <p className="text-xs sm:text-sm font-bold text-[#6B4F3A]">{formatPrice(product.pricePerUnit)}</p>
//                     <p className="text-[10px] sm:text-xs text-gray-500">MOQ: {product.moq}</p>
//                   </div>
//                 </div>
//               ))
//             ) : searchTerm.length > 0 && !loadingProducts ? (
//               <div className="text-center py-8 sm:py-12">
//                 <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-sm text-gray-500">No products found</p>
//                 <p className="text-xs text-gray-400 mt-1">Try searching with different keywords</p>
//               </div>
//             ) : loadingProducts ? (
//               <div className="text-center py-8 sm:py-12">
//                 <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#6B4F3A] mx-auto mb-3 animate-spin" />
//                 <p className="text-sm text-gray-500">Loading products...</p>
//               </div>
//             ) : (
//               <div className="text-center py-8 sm:py-12">
//                 <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
//                 <p className="text-sm text-gray-500">Start typing to search for products</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
//           <div className="flex justify-end gap-2">
//             <button onClick={onClose} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 if (selectedProduct) {
//                   onSelectProduct(selectedProduct);
//                   setSearchTerm('');
//                   setSearchResults([]);
//                   setSelectedProduct(null);
//                   onClose();
//                 }
//               }}
//               disabled={!selectedProduct}
//               className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Add Product
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function UpdateInvoicePage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const invoiceId = searchParams.get('invoiceId');
  
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploadingLogo, setUploadingLogo] = useState(false);
//   const [productDetails, setProductDetails] = useState({});
//   const [expandedItems, setExpandedItems] = useState({});
//   const [showProductSearch, setShowProductSearch] = useState(false);
//   const [dynamicFields, setDynamicFields] = useState([]);
//   const [bankingTerms, setBankingTerms] = useState([]);
//   const [isPaid, setIsPaid] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
  
//   const [invoiceData, setInvoiceData] = useState({
//     invoiceNumber: '',
//     invoiceDate: '',
//     dueDate: '',
//     inquiryId: '',
//     inquiryNumber: '',
//     userId: '',
//     company: {
//       logo: DEFAULT_LOGO_URL,
//       logoPublicId: '',
//       companyName: 'Asian Clothify',
//       contactPerson: '',
//       email: 'info@asianclothify.com',
//       phone: '+8801305-785685',
//       address: '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'
//     },
//     customer: {
//       companyName: '',
//       contactPerson: '',
//       email: '',
//       phone: '',
//       whatsapp: '',
//       billingAddress: '',
//       billingCity: '',
//       billingZipCode: '',
//       billingCountry: '',
//       shippingAddress: '',
//       shippingCity: '',
//       shippingZipCode: '',
//       shippingCountry: ''
//     },
//     bankDetails: {
//       bankName: '',
//       accountName: '',
//       accountNumber: '',
//       accountType: '',
//       routingNumber: '',
//       swiftCode: '',
//       iban: '',
//       bankAddress: ''
//     },
//     items: [],
//     subtotal: 0,
//     vatPercentage: 0,
//     vatAmount: 0,
//     totalAfterVat: 0,
//     discountPercentage: 0,
//     discountAmount: 0,
//     totalAfterDiscount: 0,
//     shippingCost: 0,
//     finalTotal: 0,
//     amountPaid: 0,
//     dueAmount: 0,
//     notes: '',
//     terms: 'This invoice is issued for wholesale purposes only and confirms the agreed products, quantities, prices, and payment terms; all sales are subject to availability and are non-returnable unless stated otherwise.',
//     status: 'draft',
//     paymentStatus: 'unpaid'
//   });

//   // Calculate bulk price based on quantity tiers
//   const calculateBulkPrice = (product, quantity) => {
//     if (!product || quantity === 0) return product?.pricePerUnit || 0;
    
//     if (!product.quantityBasedPricing || product.quantityBasedPricing.length === 0) {
//       return product.pricePerUnit;
//     }
    
//     if (quantity < product.moq) {
//       return product.pricePerUnit;
//     }
    
//     const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
//       const aMin = parseInt(a.range.split('-')[0] || a.range.replace('+', ''));
//       const bMin = parseInt(b.range.split('-')[0] || b.range.replace('+', ''));
//       return aMin - bMin;
//     });
    
//     for (const tier of sortedTiers) {
//       const range = tier.range;
//       if (range.includes('-')) {
//         const [min, max] = range.split('-').map(Number);
//         if (quantity >= min && quantity <= max) {
//           return tier.price;
//         }
//       } else if (range.includes('+')) {
//         const minQty = parseInt(range.replace('+', ''));
//         if (quantity >= minQty) {
//           return tier.price;
//         }
//       }
//     }
    
//     const highestTier = sortedTiers[sortedTiers.length - 1];
//     if (highestTier && highestTier.range.includes('-') && quantity > parseInt(highestTier.range.split('-')[1])) {
//       return highestTier.price;
//     }
    
//     return product.pricePerUnit;
//   };

//   // Banking Terms Handlers
//   const handleAddBankingTerm = () => {
//     if (isPaid) return;
//     setBankingTerms(prev => [
//       ...prev,
//       { id: Date.now(), title: '', value: '' }
//     ]);
//   };

//   const handleBankingTermUpdate = (id, field, value) => {
//     if (isPaid) return;
//     setBankingTerms(prev =>
//       prev.map(term =>
//         term.id === id ? { ...term, [field]: value } : term
//       )
//     );
//   };

//   const handleRemoveBankingTerm = (id) => {
//     if (isPaid) return;
//     setBankingTerms(prev => prev.filter(term => term.id !== id));
//   };

//   // Fetch invoice data
//   useEffect(() => {
//     if (!invoiceId) {
//       toast.error('No invoice ID provided');
//       router.push('/admin/invoices');
//       return;
//     }

//     fetchInvoice();
//   }, [invoiceId]);

//   const fetchInvoice = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();
//       if (data.success) {
//         const invoice = data.data;
        
//         // Check if invoice is paid
//         const paid = invoice.paymentStatus?.toLowerCase() === 'paid';
//         setIsPaid(paid);
        
//         // Format dates for input fields
//         const formattedInvoice = {
//           ...invoice,
//           invoiceDate: invoice.invoiceDate ? new Date(invoice.invoiceDate).toISOString().split('T')[0] : '',
//           dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '',
//         };

//         // Process items to ensure they have proper structure for weight-based products
//         const processedItems = (formattedInvoice.items || []).map(item => ({
//           ...item,
//           orderUnit: item.orderUnit || 'piece',
//           colors: (item.colors || []).map(color => ({
//             ...color,
//             quantity: color.quantity || 0,
//             totalQuantity: color.totalQuantity || color.totalForColor || 0,
//             totalForColor: color.totalForColor || color.totalQuantity || 0,
//             isPriceOverridden: color.isPriceOverridden || false,
//             sizeQuantities: (color.sizeQuantities || []).map(sq => ({
//               size: sq.size,
//               quantity: sq.quantity || 0
//             }))
//           }))
//         }));

//         setInvoiceData({ ...formattedInvoice, items: processedItems });

//         // Set banking terms if they exist
//         if (invoice.bankingTerms && invoice.bankingTerms.length > 0) {
//           setBankingTerms(invoice.bankingTerms.map((term, index) => ({
//             id: Date.now() + index,
//             title: term.title || '',
//             value: term.value || ''
//           })));
//         }

//         // Fetch product details for each item
//         if (processedItems && processedItems.length > 0) {
//           processedItems.forEach(item => {
//             if (item.productId) {
//               fetchProductDetails(item.productId);
//             }
//           });

//           // Set all items as expanded by default
//           const initialExpandedState = {};
//           processedItems.forEach((_, index) => {
//             initialExpandedState[index] = true;
//           });
//           setExpandedItems(initialExpandedState);
//         }

//         // Set dynamic fields if they exist
//         if (invoice.customFields && invoice.customFields.length > 0) {
//           setDynamicFields(invoice.customFields.map((field, index) => ({
//             id: Date.now() + index,
//             fieldName: field.fieldName,
//             fieldValue: field.fieldValue
//           })));
//         }
//       } else {
//         toast.error('Failed to load invoice');
//         router.push('/admin/invoices');
//       }
//     } catch (error) {
//       console.error('Error fetching invoice:', error);
//       toast.error('Failed to load invoice');
//       router.push('/admin/invoices');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductDetails = async (productId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//       const data = await response.json();
//       if (data.success) {
//         setProductDetails(prev => ({
//           ...prev,
//           [productId]: data.data
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     }
//   };

//   const handleAddField = () => {
//     if (isPaid) return;
//     setDynamicFields(prev => [
//       ...prev,
//       { id: Date.now(), fieldName: '', fieldValue: '' }
//     ]);
//   };

//   const handleFieldChange = (id, field, value) => {
//     if (isPaid) return;
//     setDynamicFields(prev =>
//       prev.map(fieldItem =>
//         fieldItem.id === id ? { ...fieldItem, [field]: value } : fieldItem
//       )
//     );
//   };

//   const handleRemoveField = (id) => {
//     if (isPaid) return;
//     setDynamicFields(prev => prev.filter(fieldItem => fieldItem.id !== id));
//   };

//   const toggleExpand = (itemIndex) => {
//     if (isPaid) return;
//     setExpandedItems(prev => ({
//       ...prev,
//       [itemIndex]: !prev[itemIndex]
//     }));
//   };

//   // Recalculate totals with bulk pricing
//   const recalculateTotals = (items) => {
//     let subtotal = 0;
    
//     const updatedItems = items.map(item => {
//       let itemTotalQty = 0;
//       let itemTotalPrice = 0;
//       const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
//       const product = productDetails[item.productId];
      
//       item.colors.forEach(color => {
//         let colorQty = 0;
        
//         if (isWeightBased) {
//           colorQty = color.quantity || color.totalQuantity || 0;
//         } else {
//           colorQty = color.sizeQuantities.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
//         }
        
//         let unitPrice;
        
//         if (color.isPriceOverridden) {
//           unitPrice = color.unitPrice;
//         } else if (colorQty > 0 && product) {
//           unitPrice = calculateBulkPrice(product, colorQty);
//         } else {
//           unitPrice = color.unitPrice || item.unitPrice || 0;
//         }
        
//         const colorTotal = colorQty * unitPrice;
//         itemTotalQty += colorQty;
//         itemTotalPrice += colorTotal;
        
//         color.unitPrice = unitPrice;
//         color.totalForColor = colorQty;
//         color.totalQuantity = colorQty;
//         if (isWeightBased) {
//           color.quantity = colorQty;
//         }
//       });
      
//       subtotal += itemTotalPrice;
      
//       return {
//         ...item,
//         totalQuantity: itemTotalQty,
//         total: itemTotalPrice
//       };
//     });
    
//     return { items: updatedItems, subtotal };
//   };

//   // Handle size quantity change (piece-based)
//   const handleSizeQuantityChange = (itemIndex, colorIndex, sizeIndex, newQuantity) => {
//     if (isPaid) return;
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items));
//       const color = updatedItems[itemIndex].colors[colorIndex];
//       const item = updatedItems[itemIndex];
//       const product = productDetails[item.productId];
      
//       color.sizeQuantities[sizeIndex].quantity = newQuantity;
//       const newColorTotal = color.sizeQuantities.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
      
//       // ALWAYS apply bulk pricing when quantity changes (overrides manual price)
//       if (product && newColorTotal > 0 && !color.isPriceOverridden) {
//         const bulkPrice = calculateBulkPrice(product, newColorTotal);
//         if (bulkPrice > 0) {
//           color.unitPrice = bulkPrice;
//           color.isPriceOverridden = false;
//         }
//       } else if (newColorTotal === 0) {
//         color.unitPrice = product?.pricePerUnit || 0;
//         color.isPriceOverridden = false;
//       }
      
//       const { items, subtotal } = recalculateTotals(updatedItems);
//       return { ...prev, items, subtotal };
//     });
//   };

//   // Handle weight quantity change (kg/ton)
//   const handleWeightQuantityChange = (itemIndex, colorIndex, newQuantity) => {
//     if (isPaid) return;
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items));
//       const color = updatedItems[itemIndex].colors[colorIndex];
//       const item = updatedItems[itemIndex];
//       const product = productDetails[item.productId];
      
//       color.quantity = newQuantity;
//       color.totalQuantity = newQuantity;
//       color.totalForColor = newQuantity;
      
//       // ALWAYS apply bulk pricing when quantity changes (overrides manual price)
//       if (product && newQuantity > 0 && !color.isPriceOverridden) {
//         const bulkPrice = calculateBulkPrice(product, newQuantity);
//         if (bulkPrice > 0) {
//           color.unitPrice = bulkPrice;
//           color.isPriceOverridden = false;
//         }
//       } else if (newQuantity === 0) {
//         color.unitPrice = product?.pricePerUnit || 0;
//         color.isPriceOverridden = false;
//       }
      
//       const { items, subtotal } = recalculateTotals(updatedItems);
//       return { ...prev, items, subtotal };
//     });
//   };

//   // Handle color unit price change
//   const handleColorUnitPriceChange = (itemIndex, colorIndex, newUnitPrice, isManualOverride = false) => {
//     if (isPaid) return;
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items));
//       const color = updatedItems[itemIndex].colors[colorIndex];
      
//       color.unitPrice = newUnitPrice;
//       color.isPriceOverridden = isManualOverride;
      
//       const { items, subtotal } = recalculateTotals(updatedItems);
//       return { ...prev, items, subtotal };
//     });
//   };

//   // Add a new color
//   const handleAddColor = (itemIndex, colorCode, colorName) => {
//     if (isPaid) return;
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items));
//       const item = updatedItems[itemIndex];
//       const product = productDetails[item.productId];
      
//       if (!product) return prev;
      
//       const colorExists = item.colors.some(c => c.color?.code === colorCode);
//       if (colorExists) return prev;
      
//       const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
//       const baseUnitPrice = product.pricePerUnit || 0;
      
//       if (isWeightBased) {
//         item.colors.push({
//           color: { code: colorCode, name: colorName || colorCode },
//           quantity: 0,
//           totalQuantity: 0,
//           totalForColor: 0,
//           unitPrice: baseUnitPrice,
//           isPriceOverridden: false,
//           sizeQuantities: []
//         });
//       } else {
//         const sizeQuantities = (product.sizes || []).map(size => ({ size, quantity: 0 }));
//         item.colors.push({
//           color: { code: colorCode, name: colorName || colorCode },
//           sizeQuantities,
//           totalForColor: 0,
//           totalQuantity: 0,
//           unitPrice: baseUnitPrice,
//           isPriceOverridden: false
//         });
//       }
      
//       const { items, subtotal } = recalculateTotals(updatedItems);
//       return { ...prev, items, subtotal };
//     });
//   };

//   // Add a new size
//   const handleAddSize = (itemIndex, colorIndex, size) => {
//     if (isPaid) return;
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items));
//       const color = updatedItems[itemIndex].colors[colorIndex];
      
//       const sizeExists = color.sizeQuantities.some(sq => sq.size === size);
//       if (sizeExists) return prev;
      
//       color.sizeQuantities.push({ size, quantity: 0 });
//       const { items, subtotal } = recalculateTotals(updatedItems);
//       return { ...prev, items, subtotal };
//     });
//   };

//   // Remove a color
//   const handleRemoveColor = (itemIndex, colorIndex) => {
//     if (isPaid) return;
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items));
//       updatedItems[itemIndex].colors.splice(colorIndex, 1);
      
//       if (updatedItems[itemIndex].colors.length === 0) {
//         updatedItems.splice(itemIndex, 1);
//       }
      
//       const { items, subtotal } = recalculateTotals(updatedItems);
      
//       const newExpandedItems = {};
//       items.forEach((_, index) => {
//         newExpandedItems[index] = true;
//       });
//       setExpandedItems(newExpandedItems);
      
//       return { ...prev, items, subtotal };
//     });
//   };

//   // Remove a size
//   const handleRemoveSize = (itemIndex, colorIndex, sizeIndex) => {
//     if (isPaid) return;
//     setInvoiceData(prev => {
//       const updatedItems = JSON.parse(JSON.stringify(prev.items));
//       const color = updatedItems[itemIndex].colors[colorIndex];
      
//       color.sizeQuantities.splice(sizeIndex, 1);
//       const { items, subtotal } = recalculateTotals(updatedItems);
//       return { ...prev, items, subtotal };
//     });
//   };

//   // Remove a product
//   const handleRemoveProduct = (itemIndex) => {
//     setProductToDelete(itemIndex);
//     setShowDeleteConfirm(true);
//   };

//   const handleConfirmRemoveProduct = () => {
//     if (productToDelete !== null) {
//       setInvoiceData(prev => {
//         const updatedItems = JSON.parse(JSON.stringify(prev.items));
//         updatedItems.splice(productToDelete, 1);
        
//         const { items, subtotal } = recalculateTotals(updatedItems);
        
//         const newExpandedItems = {};
//         items.forEach((_, index) => {
//           newExpandedItems[index] = true;
//         });
//         setExpandedItems(newExpandedItems);
        
//         toast.success('Product removed from invoice');
        
//         return {
//           ...prev,
//           items,
//           subtotal
//         };
//       });
//     }
//     setShowDeleteConfirm(false);
//     setProductToDelete(null);
//   };

//   // Add a new product
//   const handleAddProduct = (product) => {
//     if (isPaid) return;
//     setInvoiceData(prev => {
//       const newItem = {
//         productId: product._id,
//         productName: product.productName,
//         productImage: product.images?.[0]?.url,
//         orderUnit: product.orderUnit || 'piece',
//         colors: [],
//         totalQuantity: 0,
//         unitPrice: product.pricePerUnit,
//         moq: product.moq,
//         total: 0
//       };

//       const updatedItems = [...prev.items, newItem];
      
//       fetchProductDetails(product._id);
      
//       const newExpandedItems = {};
//       updatedItems.forEach((_, index) => {
//         newExpandedItems[index] = true;
//       });
//       setExpandedItems(newExpandedItems);
      
//       toast.success(`${product.productName} added to invoice`);
//       return { ...prev, items: updatedItems };
//     });
//   };

//   const handleCompanyChange = (field, value) => {
//     if (isPaid) return;
//     setInvoiceData(prev => ({
//       ...prev,
//       company: {
//         ...prev.company,
//         [field]: value
//       }
//     }));
//   };

//   const handleCustomerChange = (field, value) => {
//     if (isPaid) return;
//     setInvoiceData(prev => ({
//       ...prev,
//       customer: {
//         ...prev.customer,
//         [field]: value
//       }
//     }));
//   };

//   const handleBankDetailsChange = (field, value) => {
//     if (isPaid) return;
//     setInvoiceData(prev => ({
//       ...prev,
//       bankDetails: {
//         ...(prev.bankDetails || {}),
//         [field]: value
//       }
//     }));
//   };

//   const handleLogoUpload = async (e) => {
//     if (isPaid) return;
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Please upload an image file (JPEG, PNG, or WEBP)');
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error('Logo image must be less than 2MB');
//       return;
//     }

//     setUploadingLogo(true);
//     try {
//       const formData = new FormData();
//       formData.append('logo', file);

//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/upload/company-logo', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         handleCompanyChange('logo', data.fileUrl);
//         handleCompanyChange('logoPublicId', data.publicId);
//         toast.success('Logo uploaded successfully');
//         e.target.value = '';
//       } else {
//         toast.error(data.error || 'Failed to upload logo');
//       }
//     } catch (error) {
//       console.error('Error uploading logo:', error);
//       toast.error('Failed to upload logo. Please check your connection.');
//     } finally {
//       setUploadingLogo(false);
//     }
//   };

//   const resetToDefaultLogo = () => {
//     if (isPaid) return;
//     if (invoiceData.company.logoPublicId) {
//       fetch(`http://localhost:5000/api/upload/delete-logo?publicId=${invoiceData.company.logoPublicId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       }).catch(err => console.error('Error deleting old logo:', err));
//     }
    
//     handleCompanyChange('logo', DEFAULT_LOGO_URL);
//     handleCompanyChange('logoPublicId', '');
//     toast.success('Reset to default logo');
//   };

//   const copyBillingToShipping = () => {
//     if (isPaid) return;
//     handleCustomerChange('shippingAddress', invoiceData.customer?.billingAddress || '');
//     handleCustomerChange('shippingCity', invoiceData.customer?.billingCity || '');
//     handleCustomerChange('shippingZipCode', invoiceData.customer?.billingZipCode || '');
//     handleCustomerChange('shippingCountry', invoiceData.customer?.billingCountry || '');
//     toast.success('Billing address copied to shipping');
//   };

//   const existingProductIds = invoiceData.items.map(item => item.productId);

//   const vatPercentage = parseNumber(invoiceData.vatPercentage);
//   const discountPercentage = parseNumber(invoiceData.discountPercentage);
//   const shippingCost = parseNumber(invoiceData.shippingCost);
//   const paidAmount = parseNumber(invoiceData.amountPaid);
//   const subtotal = invoiceData.subtotal || 0;

//   const vatAmount = (subtotal * vatPercentage) / 100;
//   const totalAfterVat = subtotal + vatAmount;
//   const discountAmount = (totalAfterVat * discountPercentage) / 100;
//   const totalAfterDiscount = totalAfterVat - discountAmount;
//   const finalTotal = totalAfterDiscount + shippingCost;
//   const dueAmount = finalTotal - paidAmount;

//   const getStatus = () => {
//     const epsilon = 0.01;
    
//     if (Math.abs(dueAmount) < epsilon && finalTotal > 0) {
//       return { text: 'Paid', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle };
//     }
//     if (dueAmount < -epsilon) {
//       return { text: 'Overpaid', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', icon: TrendingDown };
//     }
//     if (paidAmount > epsilon) {
//       return { text: 'Partial', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: TrendingUp };
//     }
//     if (finalTotal > epsilon) {
//       return { text: 'Unpaid', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: AlertCircle };
//     }
//     return { text: 'Not Calculated', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: DollarSign };
//   };

//   const status = getStatus();

//   const handleInputChange = (field, value) => {
//     if (field === 'amountPaid') {
//       setInvoiceData(prev => ({
//         ...prev,
//         [field]: value === '' ? '' : parseFloat(value) || 0
//       }));
//     } else {
//       setInvoiceData(prev => ({
//         ...prev,
//         [field]: value
//       }));
//     }
//   };

//   const handleNumericBlur = (field) => {
//     if (invoiceData[field] === '') {
//       setInvoiceData(prev => ({
//         ...prev,
//         [field]: 0
//       }));
//     }
//   };

//   const handleUpdateInvoice = async () => {
//     if (isPaid) {
//       toast.error('Cannot update a paid invoice');
//       return;
//     }
    
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       const validDynamicFields = dynamicFields.filter(
//         field => field.fieldName.trim() !== '' && field.fieldValue.trim() !== ''
//       );
      
//       const validBankingTerms = bankingTerms.filter(
//         term => term.title.trim() !== '' || term.value.trim() !== ''
//       );
      
//       const userStr = localStorage.getItem('user');
//       let adminId = null;
      
//       if (userStr) {
//         try {
//           const user = JSON.parse(userStr);
//           adminId = user.id;
//         } catch (e) {
//           console.error('Error parsing user data:', e);
//         }
//       }

//       const formattedItems = invoiceData.items.map(item => {
//         const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
        
//         return {
//           productId: item.productId,
//           productName: item.productName,
//           orderUnit: item.orderUnit,
//           colors: item.colors.map(color => ({
//             color: {
//               code: color.color.code,
//               name: color.color.name || color.color.code
//             },
//             sizeQuantities: isWeightBased ? [] : color.sizeQuantities.map(sq => ({
//               size: sq.size,
//               quantity: sq.quantity
//             })),
//             quantity: isWeightBased ? (color.quantity || 0) : 0,
//             totalForColor: color.totalForColor || 0,
//             unitPrice: color.unitPrice || 0
//           })),
//           totalQuantity: item.totalQuantity,
//           unitPrice: item.unitPrice,
//           moq: item.moq,
//           productImage: item.productImage || '',
//           total: item.total
//         };
//       });

//       const invoicePayload = {
//         invoiceNumber: invoiceData.invoiceNumber,
//         invoiceDate: invoiceData.invoiceDate,
//         dueDate: invoiceData.dueDate,
//         inquiryId: invoiceData.inquiryId,
//         inquiryNumber: invoiceData.inquiryNumber,
        
//         customer: invoiceData.customer,
//         company: invoiceData.company,
//         bankDetails: invoiceData.bankDetails,
//         bankingTerms: validBankingTerms,
//         items: formattedItems,
        
//         subtotal: subtotal,
//         vatPercentage: vatPercentage,
//         vatAmount: vatAmount,
//         totalAfterVat: totalAfterVat,
//         discountPercentage: discountPercentage,
//         discountAmount: discountAmount,
//         totalAfterDiscount: totalAfterDiscount,
//         shippingCost: shippingCost,
//         finalTotal: finalTotal,
//         amountPaid: paidAmount,
//         dueAmount: dueAmount,
        
//         paymentStatus: status.text.toLowerCase(),
        
//         notes: invoiceData.notes || '',
//         terms: invoiceData.terms || '',
//         customFields: validDynamicFields,
        
//         updatedAt: new Date().toISOString()
//       };

//       const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(invoicePayload)
//       });

//       const responseText = await response.text();
//       let data;
//       try {
//         data = JSON.parse(responseText);
//       } catch (e) {
//         console.error('Failed to parse response:', responseText);
//         throw new Error('Invalid response from server');
//       }
      
//       if (response.ok && data.success) {
//         toast.success('Invoice updated successfully');
//         router.push('/admin/invoices');
//       } else {
//         toast.error(data.error || data.message || 'Failed to update invoice');
//       }
//     } catch (error) {
//       console.error('Update invoice error:', error);
//       toast.error('Failed to update invoice: ' + error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center px-4">
//           <Loader2 className="w-10 h-10 animate-spin text-[#6B4F3A] mx-auto mb-4" />
//           <p className="text-sm text-gray-500">Loading invoice details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
//         <div className="container mx-auto px-4 max-w-7xl py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <Link
//                 href="/admin/invoices"
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5 text-gray-600" />
//               </Link>
//               <div>
//                 <h1 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
//                   {isPaid ? 'View Invoice (Read Only)' : 'Update Invoice'}
//                 </h1>
//                 <p className="text-xs text-gray-500 mt-0.5">
//                   Invoice: {invoiceData.invoiceNumber}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               {isPaid ? (
//                 <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
//                   <Lock className="w-4 h-4" />
//                   <span className="text-xs sm:text-sm font-medium">Paid Invoice - Read Only</span>
//                 </div>
//               ) : (
//                 <button
//                   onClick={handleUpdateInvoice}
//                   disabled={saving}
//                   className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors"
//                 >
//                   {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                   Update Invoice
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Read-Only Banner for Paid Invoices */}
//       {isPaid && (
//         <div className="container mx-auto px-4 max-w-7xl pt-4">
//           <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 flex items-center gap-3">
//             <Lock className="w-5 h-5 text-amber-600 flex-shrink-0" />
//             <div>
//               <p className="text-sm font-medium text-amber-800">This invoice is Paid, you can't update it.</p>
//               <p className="text-xs text-amber-600 mt-1">No changes can be made to paid invoices.</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Rest of the form - Invoice Information, Company Information, Customer Information */}
//       {/* Products Section */}
//       <div className="container mx-auto px-4 max-w-7xl pb-6">
//         <div className="mb-6">
//           <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
//               <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Products</h2>
//               {!isPaid && (
//                 <button
//                   onClick={() => setShowProductSearch(true)}
//                   className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Product
//                 </button>
//               )}
//             </div>

//             {invoiceData.items.length > 0 ? (
//               <div className="space-y-4">
//                 {invoiceData.items.map((item, itemIndex) => {
//                   const product = productDetails[item.productId];
//                   const isExpanded = expandedItems[itemIndex] !== false;
                  
//                   return (
//                     <ProductItemCard
//                       key={`${itemIndex}-${item.productId}`}
//                       item={item}
//                       itemIndex={itemIndex}
//                       product={product}
//                       onUpdate={handleSizeQuantityChange}
//                       onUpdateWeightQuantity={handleWeightQuantityChange}
//                       onUpdateUnitPrice={handleColorUnitPriceChange}
//                       onAddColor={handleAddColor}
//                       onAddSize={handleAddSize}
//                       onRemoveColor={handleRemoveColor}
//                       onRemoveSize={handleRemoveSize}
//                       onRemoveProduct={handleRemoveProduct}
//                       isExpanded={isExpanded}
//                       onToggleExpand={() => toggleExpand(itemIndex)}
//                       calculateBulkPrice={calculateBulkPrice}
//                       readOnly={isPaid}
//                     />
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
//                 <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                 <h3 className="text-sm font-medium text-gray-900 mb-1">No products added</h3>
//                 <p className="text-xs text-gray-500 mb-4">Click the "Add Product" button to add products to this invoice</p>
//                 {!isPaid && (
//                   <button
//                     onClick={() => setShowProductSearch(true)}
//                     className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Product
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Search Product Modal */}
//       {!isPaid && (
//         <SearchProductModal
//           isOpen={showProductSearch}
//           onClose={() => setShowProductSearch(false)}
//           onSelectProduct={handleAddProduct}
//           existingProductIds={existingProductIds}
//         />
//       )}

//       {/* Delete Product Confirmation Modal */}
//       {showDeleteConfirm && productToDelete !== null && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
//             <div className="p-4 sm:p-6">
//               <div className="flex items-center gap-2 sm:gap-3 text-red-600 mb-3 sm:mb-4">
//                 <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
//                 <h3 className="text-base sm:text-lg font-semibold">Remove Product</h3>
//               </div>
              
//               <p className="text-xs sm:text-sm text-gray-600 mb-2">
//                 Are you sure you want to remove <span className="font-semibold">"{invoiceData.items[productToDelete]?.productName}"</span> from this invoice?
//               </p>
//               <p className="text-[10px] sm:text-xs text-gray-500 mb-4 sm:mb-6">
//                 This action cannot be undone. All quantities and color selections for this product will be lost.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-3">
//                 <button
//                   onClick={() => {
//                     setShowDeleteConfirm(false);
//                     setProductToDelete(null);
//                   }}
//                   className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   Cancel                </button>
//                 <button
//                   onClick={handleConfirmRemoveProduct}
//                   className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
//                 >
//                   <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
//                   Remove Product
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  ArrowLeft,
  Save,
  Send,
  Plus,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Package,
  XCircle,
  Copy,
  Upload,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Search,
  X,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  Landmark,
  Lock,
  AlertTriangle,
  Scale
} from 'lucide-react';
import { toast } from 'sonner';

// Helper function to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price || 0);
};

// Helper function to get unit label
const getUnitLabel = (orderUnit) => {
  switch(orderUnit) {
    case 'kg': return 'kg';
    case 'ton': return 'MT';
    default: return 'pcs';
  }
};

// Default logo URL
const DEFAULT_LOGO_URL = 'https://i.ibb.co.com/60xkJ1Wd/favicon.png';

// Parse number helper
const parseNumber = (value) => {
  if (value === '' || value === null || value === undefined) return 0;
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Paid: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: CheckCircle },
    Partial: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', icon: TrendingUp },
    Unpaid: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: AlertCircle },
    Overpaid: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', icon: TrendingDown },
    'Not Calculated': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', icon: DollarSign }
  };

  const config = statusConfig[status] || statusConfig['Not Calculated'];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${config.bg} ${config.border} border`}>
      <Icon className={`w-4 h-4 ${config.text}`} />
      <span className={`text-xs font-medium ${config.text}`}>{status}</span>
    </div>
  );
};

// Weight Quantity Input Component for kg/ton products
const WeightQuantityInput = ({ quantity, onQuantityChange, unitLabel, moq, readOnly, onBlur }) => {
  const displayValue = quantity === 0 ? '' : quantity;

  const handleChange = (e) => {
    if (readOnly) return;
    const value = e.target.value;
    if (value === '') {
      onQuantityChange(0);
    } else {
      const num = parseFloat(value);
      if (!isNaN(num) && num >= 0) {
        onQuantityChange(num);
      }
    }
  };

  const handleBlur = () => {
    if (readOnly) return;
    if (quantity === 0) {
      onQuantityChange(0);
    }
    if (onBlur) onBlur();
  };

  return (
    <div className="inline-flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:border-[#6B4F3A] transition-all">
      <div className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-50 border-r border-gray-200">
        <span className="text-[10px] sm:text-xs font-medium text-gray-700">Qty</span>
      </div>
      <input
        type="number"
        step="0.01"
        min="0"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onWheel={(e) => e.target.blur()}
        readOnly={readOnly}
        className={`w-20 sm:w-24 px-1 py-1 sm:py-1.5 text-[10px] sm:text-xs text-center border-none focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${readOnly ? 'bg-gray-50 text-gray-600' : ''}`}
        placeholder="0"
      />
      <div className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-50 border-l border-gray-200">
        <span className="text-[9px] sm:text-[10px] font-medium text-gray-500">{unitLabel}</span>
      </div>
    </div>
  );
};

// Size Badge Component
const SizeBadge = ({ size, quantity, onRemove, onQuantityChange, readOnly = false, onBlur }) => {
  const displayValue = quantity === 0 ? '' : quantity;

  const handleChange = (e) => {
    if (readOnly) return;
    const value = e.target.value;
    if (value === '') {
      onQuantityChange(0);
    } else {
      const num = parseInt(value);
      if (!isNaN(num) && num >= 0) {
        onQuantityChange(num);
      }
    }
  };

  const handleBlur = () => {
    if (readOnly) return;
    if (quantity === 0) {
      onQuantityChange(0);
    }
    if (onBlur) onBlur();
  };

  return (
    <div className={`inline-flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm ${!readOnly && 'hover:border-[#6B4F3A]'} transition-all`}>
      <div className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-gray-50 border-r border-gray-200">
        <span className="text-[10px] sm:text-xs font-medium text-gray-700">{size}</span>
      </div>
      <input
        type="number"
        min="0"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onWheel={(e) => e.target.blur()}
        readOnly={readOnly}
        className={`w-10 sm:w-14 px-1 py-1 sm:py-1.5 text-[10px] sm:text-xs text-center border-none focus:outline-none ${!readOnly && 'focus:ring-2 focus:ring-[#6B4F3A]'} ${readOnly ? 'bg-gray-50 text-gray-600' : ''}`}
        placeholder="0"
      />
      {!readOnly && (
        <button
          onClick={onRemove}
          className="p-1 sm:p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors border-l border-gray-200"
          title="Remove size"
        >
          <Trash2 className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
        </button>
      )}
    </div>
  );
};

// Banking Term Field Component
const BankingTermField = ({ field, onUpdate, onRemove, readOnly = false }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex-1 w-full">
        <input
          type="text"
          value={field.title}
          onChange={(e) => onUpdate(field.id, 'title', e.target.value)}
          readOnly={readOnly}
          placeholder="Term title (e.g., Payment Terms, Late Fee)"
          className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent mb-2 ${readOnly ? 'bg-gray-50 text-gray-600' : ''}`}
        />
        <textarea
          value={field.value}
          onChange={(e) => onUpdate(field.id, 'value', e.target.value)}
          readOnly={readOnly}
          placeholder="Term description or value (optional - can be left empty)"
          rows="2"
          className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${readOnly ? 'bg-gray-50 text-gray-600' : ''}`}
        />
        <p className="text-xs text-gray-400 mt-1">
          You can leave the value empty if this is just a heading or note
        </p>
      </div>
      {!readOnly && (
        <button
          onClick={() => onRemove(field.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
          title="Remove term"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// Product Item Card Component - Supports both piece-based and weight-based
const ProductItemCard = ({ 
  item, 
  itemIndex, 
  product, 
  onUpdate, 
  onUpdateWeightQuantity,
  onUpdateUnitPrice,  
  onAddColor, 
  onAddSize, 
  onRemoveColor, 
  onRemoveSize,
  onRemoveProduct,
  isExpanded,
  onToggleExpand,
  calculateBulkPrice,
  readOnly = false
}) => {
  const availableColors = product?.colors || [];
  const availableSizes = product?.sizes || [];
  const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
  const unitLabel = getUnitLabel(item.orderUnit);

  const handleSizeQuantityChange = (colorIndex, sizeIndex, newQuantity) => {
    if (readOnly) return;
    onUpdate(itemIndex, colorIndex, sizeIndex, newQuantity);
  };

  const handleWeightQuantityChange = (colorIndex, newQuantity) => {
    if (readOnly) return;
    if (onUpdateWeightQuantity) {
      onUpdateWeightQuantity(itemIndex, colorIndex, newQuantity);
    }
  };

  const handleRemoveColor = (colorIndex) => {
    if (readOnly) return;
    onRemoveColor(itemIndex, colorIndex);
  };

  const handleRemoveSize = (colorIndex, sizeIndex) => {
    if (readOnly) return;
    onRemoveSize(itemIndex, colorIndex, sizeIndex);
  };

  const handleAddColor = (colorCode, colorName) => {
    if (readOnly) return;
    onAddColor(itemIndex, colorCode, colorName);
  };

  const handleAddSize = (colorIndex, size) => {
    if (readOnly) return;
    onAddSize(itemIndex, colorIndex, size);
  };

  const imageUrl = item.productImage || product?.images?.[0]?.url || 'https://via.placeholder.com/80x80?text=No+Image';
  const productTotalPrice = item.total || 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className={`bg-gradient-to-r from-gray-50 to-white px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 ${!readOnly && 'cursor-pointer hover:bg-gray-100/50'} transition-colors`}
        onClick={readOnly ? undefined : onToggleExpand}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
              <img 
                src={imageUrl} 
                alt={item.productName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                }}
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900">{item.productName}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-[10px] sm:text-xs bg-blue-50 text-blue-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                  {item.orderUnit === 'kg' ? 'KG (Weight)' : item.orderUnit === 'ton' ? 'MT (Weight)' : 'Pieces'}
                </span>
                <span className="text-[10px] sm:text-xs bg-purple-50 text-purple-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                  {item.colors.length} Colors
                </span>
                <span className="text-[10px] sm:text-xs bg-green-50 text-green-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                  {item.totalQuantity} {unitLabel}
                </span>
                {product?.quantityBasedPricing?.length > 0 && !readOnly && (
                  <span className="text-[10px] sm:text-xs bg-orange-50 text-orange-700 px-1.5 sm:px-2 py-0.5 rounded-full">
                    Bulk Pricing Available
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-3 ml-0 sm:ml-0">
            <div className="text-left">
              <p className="text-[10px] sm:text-xs text-gray-500">Base Price</p>
              <p className="text-sm sm:text-base font-bold text-[#6B4F3A]">{formatPrice(item.unitPrice)}</p>
              <p className="text-[8px] text-gray-400">per {unitLabel === 'pcs' ? 'pc' : unitLabel}</p>
            </div>
            
            <div className="text-left">
              <p className="text-[10px] sm:text-xs text-gray-500">Product Total</p>
              <p className="text-sm sm:text-base font-bold text-[#6B4F3A]">{formatPrice(productTotalPrice)}</p>
            </div>
            
            {!readOnly && (
              <div className="flex items-center gap-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveProduct(itemIndex);
                  }}
                  className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                  title="Remove product"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleExpand();
                  }}
                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4">
          {item.colors.map((color, colorIndex) => {
            let colorTotal = 0;
            if (isWeightBased) {
              colorTotal = color.quantity || color.totalQuantity || 0;
            } else {
              colorTotal = (color.sizeQuantities || []).reduce((sum, sq) => sum + (sq.quantity || 0), 0);
            }
            const displayUnitPrice = color.unitPrice || 0;
            const isManuallySet = color.isManuallySet || false;
            
            const bulkPrice = calculateBulkPrice(product, colorTotal);
            const showBulkInfo = bulkPrice > 0 && !isManuallySet && colorTotal >= item.moq && product?.quantityBasedPricing?.length > 0;
            
            return (
              <div key={`${itemIndex}-${colorIndex}-${color.color.code}`} className="bg-gray-50/50 rounded-lg p-3 sm:p-4 border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-md" 
                      style={{ backgroundColor: color.color.code }}
                    />
                  
                    <span className="text-[10px] sm:text-xs bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-gray-200">
                      {colorTotal} {unitLabel}
                    </span>
                    {isManuallySet && (
                      <span className="text-[8px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                        Manual Price
                      </span>
                    )}
                    {showBulkInfo && (
                      <span className="text-[8px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                        Bulk: {bulkPrice}/{unitLabel === 'pcs' ? 'pc' : unitLabel}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {colorTotal > 0 && (
                      <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                        <span className="text-[9px] sm:text-[10px] text-gray-500">$</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={displayUnitPrice}
                          onChange={(e) => {
                            if (readOnly) return;
                            const newPrice = parseFloat(e.target.value) || 0;
                            onUpdateUnitPrice(itemIndex, colorIndex, newPrice, true);
                          }}
                          readOnly={readOnly}
                          className={`w-16 sm:w-20 px-1 py-0.5 text-[9px] sm:text-[10px] text-center bg-transparent border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${readOnly ? 'text-gray-600' : ''}`}
                        />
                        <span className="text-[9px] sm:text-[10px] text-gray-500">/{unitLabel === 'pcs' ? 'pc' : unitLabel}</span>
                      </div>
                    )}
                    {!readOnly && (
                      <button
                        onClick={() => handleRemoveColor(colorIndex)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start sm:self-auto"
                        title="Remove color"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                </div>

   {isWeightBased ? (
  <div className="mt-3">
    <WeightQuantityInput
      quantity={color.quantity !== undefined ? color.quantity : (color.totalQuantity || 0)}
      onQuantityChange={(newQty) => handleWeightQuantityChange(colorIndex, newQty)}  // ✅ FIXED
      unitLabel={unitLabel}
      moq={item.moq}
      readOnly={readOnly}
    />
    {colorTotal > 0 && colorTotal < item.moq && !readOnly && (
      <p className="text-[10px] text-yellow-600 mt-1">
        ⚠️ Quantity ({colorTotal} {unitLabel}) is below MOQ ({item.moq} {unitLabel})
      </p>
    )}
  </div>

                ) : (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                    {(color.sizeQuantities || []).map((sq, sizeIndex) => (
                      <SizeBadge
                        key={`${itemIndex}-${colorIndex}-${sizeIndex}-${sq.size}`}
                        size={sq.size}
                        quantity={sq.quantity}
                        onQuantityChange={(newQty) => handleSizeQuantityChange(colorIndex, sizeIndex, newQty)}
                        onRemove={() => handleRemoveSize(colorIndex, sizeIndex)}
                        readOnly={readOnly}
                      />
                    ))}
                    
                    {!readOnly && availableSizes.length > 0 && (
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleAddSize(colorIndex, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="px-1.5 sm:px-2 py-1 sm:py-1.5 text-[10px] sm:text-xs border border-gray-200 rounded-lg bg-white hover:border-[#6B4F3A] focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] transition-colors"
                        value=""
                      >
                        <option value="">+ Add Size</option>
                        {availableSizes
                          .filter(s => !(color.sizeQuantities || []).some(sq => sq.size === s))
                          .map(size => (
                            <option key={size} value={size}>{size}</option>
                          ))
                        }
                      </select>
                    )}
                  </div>
                )}

                {colorTotal > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex justify-between items-center text-[9px] sm:text-[10px]">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-gray-500">
                          {colorTotal < item.moq ? (
                            <span className="text-yellow-600">⚠️ Below MOQ ({item.moq} {unitLabel} required)</span>
                          ) : isManuallySet ? (
                            <span className="text-blue-600">✏️ Manually set price (quantity change will reset to bulk)</span>
                          ) : showBulkInfo ? (
                            <span className="text-green-600">✓ Bulk pricing applied</span>
                          ) : (
                            <span>Base price applied</span>
                          )}
                        </span>
                        {showBulkInfo && (
                          <span className="text-[8px] text-gray-400">
                            Bulk rate: {formatPrice(bulkPrice)}/{unitLabel === 'pcs' ? 'pc' : unitLabel} (was {formatPrice(item.unitPrice)})
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-gray-500">
                          {colorTotal} {unitLabel} × {formatPrice(displayUnitPrice)}/{unitLabel === 'pcs' ? 'pc' : unitLabel} = 
                        </span>
                        <span className="font-semibold text-[#6B4F3A] ml-1">
                          {formatPrice(colorTotal * displayUnitPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {!readOnly && availableColors.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Add New Color
              </label>
              
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {availableColors
                  .filter(c => !item.colors.some(ic => ic.color.code === c.code))
                  .map(color => (
                    <button
                      key={color.code}
                      onClick={() => handleAddColor(color.code, color.name)}
                      className="group relative focus:outline-none"
                      title={color.code}
                    >
                      <div 
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform hover:ring-2 hover:ring-[#6B4F3A]"
                        style={{ backgroundColor: color.code }}
                      />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-[10px] sm:text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {color.code}
                      </span>
                    </button>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Search Product Modal Component
const SearchProductModal = ({ isOpen, onClose, onSelectProduct, existingProductIds }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAllProducts();
    }
  }, [isOpen]);

  const fetchAllProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await fetch('http://localhost:5000/api/products?limit=100');
      const data = await response.json();
      if (data.success) {
        const filtered = data.data.filter(p => !existingProductIds.includes(p._id));
        setAllProducts(filtered);
        setSearchResults(filtered);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setSearchResults(allProducts);
    } else {
      const filtered = allProducts.filter(product =>
        product.productName.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const getUnitDisplay = (orderUnit) => {
    switch(orderUnit) {
      case 'kg': return 'KG (Weight)';
      case 'ton': return 'MT (Weight)';
      default: return 'Pieces';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex-shrink-0 p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Add Product to Invoice</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 p-4 sm:p-6 pb-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent"
              autoFocus
            />
            {(searching || loadingProducts) && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-[#6B4F3A]" />
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 p-4 sm:p-6 pt-4">
          <div className="space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleSelectProduct(product)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedProduct?._id === product._id
                      ? 'border-[#6B4F3A] bg-orange-50'
                      : 'border-gray-200 hover:border-[#6B4F3A] hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.images?.[0]?.url || 'https://via.placeholder.com/48'}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-900 truncate">{product.productName}</h3>
                      <span className="text-[8px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                        {getUnitDisplay(product.orderUnit)}
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                      {product.colors?.length || 0} colors • {product.sizes?.length || 0} sizes
                      {product.quantityBasedPricing?.length > 0 && ` • ${product.quantityBasedPricing.length} pricing tiers`}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs sm:text-sm font-bold text-[#6B4F3A]">{formatPrice(product.pricePerUnit)}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">MOQ: {product.moq}</p>
                  </div>
                </div>
              ))
            ) : searchTerm.length > 0 && !loadingProducts ? (
              <div className="text-center py-8 sm:py-12">
                <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No products found</p>
                <p className="text-xs text-gray-400 mt-1">Try searching with different keywords</p>
              </div>
            ) : loadingProducts ? (
              <div className="text-center py-8 sm:py-12">
                <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#6B4F3A] mx-auto mb-3 animate-spin" />
                <p className="text-sm text-gray-500">Loading products...</p>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <Package className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Start typing to search for products</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedProduct) {
                  onSelectProduct(selectedProduct);
                  setSearchTerm('');
                  setSearchResults([]);
                  setSelectedProduct(null);
                  onClose();
                }
              }}
              disabled={!selectedProduct}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function UpdateInvoicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const invoiceId = searchParams.get('invoiceId');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [dynamicFields, setDynamicFields] = useState([]);
  const [bankingTerms, setBankingTerms] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    inquiryId: '',
    inquiryNumber: '',
    userId: '',
    company: {
      logo: DEFAULT_LOGO_URL,
      logoPublicId: '',
      companyName: 'Asian Clothify',
      contactPerson: '',
      email: 'info@asianclothify.com',
      phone: '+8801305-785685',
      address: '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'
    },
    customer: {
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      whatsapp: '',
      billingAddress: '',
      billingCity: '',
      billingZipCode: '',
      billingCountry: '',
      shippingAddress: '',
      shippingCity: '',
      shippingZipCode: '',
      shippingCountry: ''
    },
    bankDetails: {
      bankName: '',
      accountName: '',
      accountNumber: '',
      accountType: '',
      routingNumber: '',
      swiftCode: '',
      iban: '',
      bankAddress: ''
    },
    items: [],
    subtotal: 0,
    vatPercentage: 0,
    vatAmount: 0,
    totalAfterVat: 0,
    discountPercentage: 0,
    discountAmount: 0,
    totalAfterDiscount: 0,
    shippingCost: 0,
    finalTotal: 0,
    amountPaid: 0,
    dueAmount: 0,
    notes: '',
    terms: 'This invoice is issued for wholesale purposes only and confirms the agreed products, quantities, prices, and payment terms; all sales are subject to availability and are non-returnable unless stated otherwise.',
    status: 'draft',
    paymentStatus: 'unpaid'
  });

  // Calculate bulk price based on quantity tiers
  const calculateBulkPrice = (product, quantity) => {
    if (!product || quantity === 0) return product?.pricePerUnit || 0;
    
    if (!product.quantityBasedPricing || product.quantityBasedPricing.length === 0) {
      return product.pricePerUnit;
    }
    
    if (quantity < product.moq) {
      return product.pricePerUnit;
    }
    
    const sortedTiers = [...product.quantityBasedPricing].sort((a, b) => {
      const aMin = parseInt(a.range.split('-')[0] || a.range.replace('+', ''));
      const bMin = parseInt(b.range.split('-')[0] || b.range.replace('+', ''));
      return aMin - bMin;
    });
    
    for (const tier of sortedTiers) {
      const range = tier.range;
      if (range.includes('-')) {
        const [min, max] = range.split('-').map(Number);
        if (quantity >= min && quantity <= max) {
          return tier.price;
        }
      } else if (range.includes('+')) {
        const minQty = parseInt(range.replace('+', ''));
        if (quantity >= minQty) {
          return tier.price;
        }
      }
    }
    
    const highestTier = sortedTiers[sortedTiers.length - 1];
    if (highestTier && highestTier.range.includes('-') && quantity > parseInt(highestTier.range.split('-')[1])) {
      return highestTier.price;
    }
    
    return product.pricePerUnit;
  };

  // Banking Terms Handlers
  const handleAddBankingTerm = () => {
    if (isPaid) return;
    setBankingTerms(prev => [
      ...prev,
      { id: Date.now(), title: '', value: '' }
    ]);
  };

  const handleBankingTermUpdate = (id, field, value) => {
    if (isPaid) return;
    setBankingTerms(prev =>
      prev.map(term =>
        term.id === id ? { ...term, [field]: value } : term
      )
    );
  };

  const handleRemoveBankingTerm = (id) => {
    if (isPaid) return;
    setBankingTerms(prev => prev.filter(term => term.id !== id));
  };

  // Fetch invoice data
  useEffect(() => {
    if (!invoiceId) {
      toast.error('No invoice ID provided');
      router.push('/admin/invoices');
      return;
    }

    fetchInvoice();
  }, [invoiceId]);

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        const invoice = data.data;
        
        const paid = invoice.paymentStatus?.toLowerCase() === 'paid';
        setIsPaid(paid);
        
        const formattedInvoice = {
          ...invoice,
          invoiceDate: invoice.invoiceDate ? new Date(invoice.invoiceDate).toISOString().split('T')[0] : '',
          dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : '',
          vatPercentage: invoice.vatPercentage || 0,
          discountPercentage: invoice.discountPercentage || 0,
          shippingCost: invoice.shippingCost || 0,
          amountPaid: invoice.amountPaid || 0,
          notes: invoice.notes || '',
          terms: invoice.terms || ''
        };

        // Process items to ensure proper structure
        const processedItems = (formattedInvoice.items || []).map(item => ({
          ...item,
          orderUnit: item.orderUnit || 'piece',
          colors: (item.colors || []).map(color => {
            const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
            
            if (isWeightBased) {
              const quantityValue = color.quantity || color.totalQuantity || color.totalForColor || 0;
              return {
                ...color,
                quantity: quantityValue,
                totalQuantity: quantityValue,
                totalForColor: quantityValue,
                isManuallySet: color.isManuallySet || false,
                sizeQuantities: []
              };
            } else {
              return {
                ...color,
                quantity: 0,
                totalQuantity: color.totalQuantity || color.totalForColor || 0,
                totalForColor: color.totalForColor || color.totalQuantity || 0,
                isManuallySet: color.isManuallySet || false,
                sizeQuantities: (color.sizeQuantities || []).map(sq => ({
                  size: sq.size,
                  quantity: sq.quantity || 0
                }))
              };
            }
          })
        }));

        setInvoiceData({ ...formattedInvoice, items: processedItems });

        // Set banking terms
        if (invoice.bankingTerms && invoice.bankingTerms.length > 0) {
          setBankingTerms(invoice.bankingTerms.map((term, index) => ({
            id: Date.now() + index,
            title: term.title || '',
            value: term.value || ''
          })));
        }

        // Set dynamic fields
        if (invoice.customFields && invoice.customFields.length > 0) {
          setDynamicFields(invoice.customFields.map((field, index) => ({
            id: Date.now() + index,
            fieldName: field.fieldName,
            fieldValue: field.fieldValue
          })));
        }

        // Fetch product details
        if (processedItems && processedItems.length > 0) {
          processedItems.forEach(item => {
            if (item.productId) {
              fetchProductDetails(item.productId);
            }
          });

          const initialExpandedState = {};
          processedItems.forEach((_, index) => {
            initialExpandedState[index] = true;
          });
          setExpandedItems(initialExpandedState);
        }
      } else {
        toast.error('Failed to load invoice');
        router.push('/admin/invoices');
      }
    } catch (error) {
      console.error('Error fetching invoice:', error);
      toast.error('Failed to load invoice');
      router.push('/admin/invoices');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      if (data.success) {
        setProductDetails(prev => ({
          ...prev,
          [productId]: data.data
        }));
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleAddField = () => {
    if (isPaid) return;
    setDynamicFields(prev => [
      ...prev,
      { id: Date.now(), fieldName: '', fieldValue: '' }
    ]);
  };

  const handleFieldChange = (id, field, value) => {
    if (isPaid) return;
    setDynamicFields(prev =>
      prev.map(fieldItem =>
        fieldItem.id === id ? { ...fieldItem, [field]: value } : fieldItem
      )
    );
  };

  const handleRemoveField = (id) => {
    if (isPaid) return;
    setDynamicFields(prev => prev.filter(fieldItem => fieldItem.id !== id));
  };

  const toggleExpand = (itemIndex) => {
    if (isPaid) return;
    setExpandedItems(prev => ({
      ...prev,
      [itemIndex]: !prev[itemIndex]
    }));
  };

  // Recalculate totals with bulk pricing
  const recalculateTotals = (items) => {
    let subtotal = 0;
    
    const updatedItems = items.map(item => {
      let itemTotalQty = 0;
      let itemTotalPrice = 0;
      const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
      const product = productDetails[item.productId];
      
      item.colors.forEach(color => {
        let colorQty = 0;
        
        if (isWeightBased) {
          colorQty = color.quantity || color.totalQuantity || color.totalForColor || 0;
        } else {
          colorQty = (color.sizeQuantities || []).reduce((sum, sq) => sum + (sq.quantity || 0), 0);
        }
        
        let unitPrice;
        
        if (color.isManuallySet) {
          unitPrice = color.unitPrice;
        } else if (colorQty > 0 && product) {
          unitPrice = calculateBulkPrice(product, colorQty);
        } else {
          unitPrice = color.unitPrice || item.unitPrice || 0;
        }
        
        const colorTotal = colorQty * unitPrice;
        itemTotalQty += colorQty;
        itemTotalPrice += colorTotal;
        
        color.unitPrice = unitPrice;
        color.totalForColor = colorQty;
        color.totalQuantity = colorQty;
        if (isWeightBased) {
          color.quantity = colorQty;
        }
      });
      
      subtotal += itemTotalPrice;
      
      return {
        ...item,
        totalQuantity: itemTotalQty,
        total: itemTotalPrice
      };
    });
    
    return { items: updatedItems, subtotal };
  };

  // Handle size quantity change
  const handleSizeQuantityChange = (itemIndex, colorIndex, sizeIndex, newQuantity) => {
    if (isPaid) return;
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      const color = updatedItems[itemIndex].colors[colorIndex];
      const item = updatedItems[itemIndex];
      const product = productDetails[item.productId];
      
      color.sizeQuantities[sizeIndex].quantity = newQuantity;
      const newColorTotal = (color.sizeQuantities || []).reduce((sum, sq) => sum + (sq.quantity || 0), 0);
      
      if (product && newColorTotal > 0) {
        const bulkPrice = calculateBulkPrice(product, newColorTotal);
        if (bulkPrice > 0) {
          color.unitPrice = bulkPrice;
          color.isManuallySet = false;
        }
      } else if (newColorTotal === 0) {
        color.unitPrice = product?.pricePerUnit || 0;
        color.isManuallySet = false;
      }
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      return { ...prev, items, subtotal };
    });
  };

  // Handle weight quantity change
// Handle weight quantity change (kg/ton) - AUTO apply bulk pricing
const handleWeightQuantityChange = (itemIndex, colorIndex, newQuantity) => {
  if (isPaid) return;
  
  setInvoiceData(prev => {
    try {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      
      // Validate item exists
      if (!updatedItems[itemIndex]) {
        console.error(`Item not found at index ${itemIndex}. Total items: ${updatedItems.length}`);
        return prev;
      }
      
      // Validate colors array exists
      if (!updatedItems[itemIndex].colors) {
        console.error(`Colors array not found for item at index ${itemIndex}`);
        return prev;
      }
      
      // Validate color index is valid
      if (colorIndex >= updatedItems[itemIndex].colors.length || colorIndex < 0) {
        console.error(`Color index ${colorIndex} out of range. Colors length: ${updatedItems[itemIndex].colors.length}`);
        return prev;
      }
      
      const color = updatedItems[itemIndex].colors[colorIndex];
      const item = updatedItems[itemIndex];
      const product = productDetails[item.productId];
      
      const safeQuantity = newQuantity !== undefined && !isNaN(newQuantity) ? newQuantity : 0;
      
      // Update all quantity fields
      color.quantity = safeQuantity;
      color.totalQuantity = safeQuantity;
      color.totalForColor = safeQuantity;
      
      // Apply bulk pricing
      if (product && safeQuantity > 0) {
        const bulkPrice = calculateBulkPrice(product, safeQuantity);
        if (bulkPrice > 0) {
          color.unitPrice = bulkPrice;
          color.isManuallySet = false;
        }
      } else if (safeQuantity === 0) {
        color.unitPrice = product?.pricePerUnit || 0;
        color.isManuallySet = false;
      }
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      return { ...prev, items, subtotal };
    } catch (error) {
      console.error('Error in handleWeightQuantityChange:', error);
      return prev;
    }
  });
};

  // Handle color unit price change
  const handleColorUnitPriceChange = (itemIndex, colorIndex, newUnitPrice, isManualOverride = true) => {
    if (isPaid) return;
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      const color = updatedItems[itemIndex].colors[colorIndex];
      
      color.unitPrice = newUnitPrice;
      color.isManuallySet = isManualOverride;
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      return { ...prev, items, subtotal };
    });
  };

  // Add a new color
  const handleAddColor = (itemIndex, colorCode, colorName) => {
    if (isPaid) return;
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      const item = updatedItems[itemIndex];
      const product = productDetails[item.productId];
      
      if (!product) return prev;
      
      const colorExists = item.colors.some(c => c.color?.code === colorCode);
      if (colorExists) return prev;
      
      const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
      const baseUnitPrice = product.pricePerUnit || 0;
      
      if (isWeightBased) {
        item.colors.push({
          color: { code: colorCode, name: colorName || colorCode },
          quantity: 0,
          totalQuantity: 0,
          totalForColor: 0,
          unitPrice: baseUnitPrice,
          isManuallySet: false,
          sizeQuantities: []
        });
      } else {
        const sizeQuantities = (product.sizes || []).map(size => ({ size, quantity: 0 }));
        item.colors.push({
          color: { code: colorCode, name: colorName || colorCode },
          sizeQuantities,
          totalForColor: 0,
          totalQuantity: 0,
          unitPrice: baseUnitPrice,
          isManuallySet: false
        });
      }
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      return { ...prev, items, subtotal };
    });
  };

  // Add a new size
  const handleAddSize = (itemIndex, colorIndex, size) => {
    if (isPaid) return;
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      const color = updatedItems[itemIndex].colors[colorIndex];
      
      const sizeExists = (color.sizeQuantities || []).some(sq => sq.size === size);
      if (sizeExists) return prev;
      
      if (!color.sizeQuantities) color.sizeQuantities = [];
      color.sizeQuantities.push({ size, quantity: 0 });
      const { items, subtotal } = recalculateTotals(updatedItems);
      return { ...prev, items, subtotal };
    });
  };

  // Remove a color
  const handleRemoveColor = (itemIndex, colorIndex) => {
    if (isPaid) return;
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      updatedItems[itemIndex].colors.splice(colorIndex, 1);
      
      if (updatedItems[itemIndex].colors.length === 0) {
        updatedItems.splice(itemIndex, 1);
      }
      
      const { items, subtotal } = recalculateTotals(updatedItems);
      
      const newExpandedItems = {};
      items.forEach((_, index) => {
        newExpandedItems[index] = true;
      });
      setExpandedItems(newExpandedItems);
      
      return { ...prev, items, subtotal };
    });
  };

  // Remove a size
  const handleRemoveSize = (itemIndex, colorIndex, sizeIndex) => {
    if (isPaid) return;
    setInvoiceData(prev => {
      const updatedItems = JSON.parse(JSON.stringify(prev.items));
      const color = updatedItems[itemIndex].colors[colorIndex];
      
      color.sizeQuantities.splice(sizeIndex, 1);
      const { items, subtotal } = recalculateTotals(updatedItems);
      return { ...prev, items, subtotal };
    });
  };

  // Remove a product
  const handleRemoveProduct = (itemIndex) => {
    setProductToDelete(itemIndex);
    setShowDeleteConfirm(true);
  };

  const handleConfirmRemoveProduct = () => {
    if (productToDelete !== null) {
      setInvoiceData(prev => {
        const updatedItems = JSON.parse(JSON.stringify(prev.items));
        updatedItems.splice(productToDelete, 1);
        
        const { items, subtotal } = recalculateTotals(updatedItems);
        
        const newExpandedItems = {};
        items.forEach((_, index) => {
          newExpandedItems[index] = true;
        });
        setExpandedItems(newExpandedItems);
        
        toast.success('Product removed from invoice');
        
        return {
          ...prev,
          items,
          subtotal
        };
      });
    }
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  // Add a new product
  const handleAddProduct = (product) => {
    if (isPaid) return;
    setInvoiceData(prev => {
      const newItem = {
        productId: product._id,
        productName: product.productName,
        productImage: product.images?.[0]?.url,
        orderUnit: product.orderUnit || 'piece',
        colors: [],
        totalQuantity: 0,
        unitPrice: product.pricePerUnit,
        moq: product.moq,
        total: 0
      };

      const updatedItems = [...prev.items, newItem];
      
      fetchProductDetails(product._id);
      
      const newExpandedItems = {};
      updatedItems.forEach((_, index) => {
        newExpandedItems[index] = true;
      });
      setExpandedItems(newExpandedItems);
      
      toast.success(`${product.productName} added to invoice`);
      return { ...prev, items: updatedItems };
    });
  };

  // Form handlers
  const handleCompanyChange = (field, value) => {
    if (isPaid) return;
    setInvoiceData(prev => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value
      }
    }));
  };

  const handleCustomerChange = (field, value) => {
    if (isPaid) return;
    setInvoiceData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value
      }
    }));
  };

  const handleBankDetailsChange = (field, value) => {
    if (isPaid) return;
    setInvoiceData(prev => ({
      ...prev,
      bankDetails: {
        ...(prev.bankDetails || {}),
        [field]: value
      }
    }));
  };

  const handleLogoUpload = async (e) => {
    if (isPaid) return;
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload an image file (JPEG, PNG, or WEBP)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo image must be less than 2MB');
      return;
    }

    setUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append('logo', file);

      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/upload/company-logo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        handleCompanyChange('logo', data.fileUrl);
        handleCompanyChange('logoPublicId', data.publicId);
        toast.success('Logo uploaded successfully');
        e.target.value = '';
      } else {
        toast.error(data.error || 'Failed to upload logo');
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo. Please check your connection.');
    } finally {
      setUploadingLogo(false);
    }
  };

  const resetToDefaultLogo = () => {
    if (isPaid) return;
    if (invoiceData.company.logoPublicId) {
      fetch(`http://localhost:5000/api/upload/delete-logo?publicId=${invoiceData.company.logoPublicId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).catch(err => console.error('Error deleting old logo:', err));
    }
    
    handleCompanyChange('logo', DEFAULT_LOGO_URL);
    handleCompanyChange('logoPublicId', '');
    toast.success('Reset to default logo');
  };

  const copyBillingToShipping = () => {
    if (isPaid) return;
    handleCustomerChange('shippingAddress', invoiceData.customer?.billingAddress || '');
    handleCustomerChange('shippingCity', invoiceData.customer?.billingCity || '');
    handleCustomerChange('shippingZipCode', invoiceData.customer?.billingZipCode || '');
    handleCustomerChange('shippingCountry', invoiceData.customer?.billingCountry || '');
    toast.success('Billing address copied to shipping');
  };

  const existingProductIds = invoiceData.items.map(item => item.productId);

  const vatPercentage = parseNumber(invoiceData.vatPercentage);
  const discountPercentage = parseNumber(invoiceData.discountPercentage);
  const shippingCost = parseNumber(invoiceData.shippingCost);
  const paidAmount = parseNumber(invoiceData.amountPaid);
  const subtotal = invoiceData.subtotal || 0;

  const vatAmount = (subtotal * vatPercentage) / 100;
  const totalAfterVat = subtotal + vatAmount;
  const discountAmount = (totalAfterVat * discountPercentage) / 100;
  const totalAfterDiscount = totalAfterVat - discountAmount;
  const finalTotal = totalAfterDiscount + shippingCost;
  const dueAmount = finalTotal - paidAmount;

  const getStatus = () => {
    const epsilon = 0.01;
    
    if (Math.abs(dueAmount) < epsilon && finalTotal > 0) {
      return { text: 'Paid', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle };
    }
    if (dueAmount < -epsilon) {
      return { text: 'Overpaid', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', icon: TrendingDown };
    }
    if (paidAmount > epsilon) {
      return { text: 'Partial', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: TrendingUp };
    }
    if (finalTotal > epsilon) {
      return { text: 'Unpaid', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: AlertCircle };
    }
    return { text: 'Not Calculated', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: DollarSign };
  };

  const status = getStatus();

  const handleInputChange = (field, value) => {
    if (isPaid) return;
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNumericChange = (field, value) => {
    if (isPaid) return;
    setInvoiceData(prev => ({
      ...prev,
      [field]: value === '' ? 0 : parseFloat(value) || 0
    }));
  };

  const handleNumericBlur = (field) => {
    if (isPaid) return;
    if (invoiceData[field] === '' || invoiceData[field] === undefined) {
      setInvoiceData(prev => ({
        ...prev,
        [field]: 0
      }));
    }
  };

  const handleUpdateInvoice = async () => {
    if (isPaid) {
      toast.error('Cannot update a paid invoice');
      return;
    }
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      
      const validDynamicFields = dynamicFields.filter(
        field => field.fieldName.trim() !== '' && field.fieldValue.trim() !== ''
      );
      
      const validBankingTerms = bankingTerms.filter(
        term => term.title.trim() !== '' || term.value.trim() !== ''
      );
      
      const userStr = localStorage.getItem('user');
      let adminId = null;
      
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          adminId = user.id;
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      }

      const formattedItems = invoiceData.items.map(item => {
        const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
        
        return {
          productId: item.productId,
          productName: item.productName,
          orderUnit: item.orderUnit,
          colors: item.colors.map(color => ({
            color: {
              code: color.color.code,
              name: color.color.name || color.color.code
            },
            sizeQuantities: isWeightBased ? [] : (color.sizeQuantities || []).map(sq => ({
              size: sq.size,
              quantity: sq.quantity
            })),
            quantity: isWeightBased ? (color.quantity || 0) : 0,
            totalForColor: color.totalForColor || 0,
            unitPrice: color.unitPrice || 0,
            isManuallySet: color.isManuallySet || false
          })),
          totalQuantity: item.totalQuantity,
          unitPrice: item.unitPrice,
          moq: item.moq,
          productImage: item.productImage || '',
          total: item.total
        };
      });

      const invoicePayload = {
        invoiceNumber: invoiceData.invoiceNumber,
        invoiceDate: invoiceData.invoiceDate,
        dueDate: invoiceData.dueDate,
        inquiryId: invoiceData.inquiryId,
        inquiryNumber: invoiceData.inquiryNumber,
        
        customer: invoiceData.customer,
        company: invoiceData.company,
        bankDetails: invoiceData.bankDetails,
        bankingTerms: validBankingTerms,
        items: formattedItems,
        
        subtotal: subtotal,
        vatPercentage: vatPercentage,
        vatAmount: vatAmount,
        totalAfterVat: totalAfterVat,
        discountPercentage: discountPercentage,
        discountAmount: discountAmount,
        totalAfterDiscount: totalAfterDiscount,
        shippingCost: shippingCost,
        finalTotal: finalTotal,
        amountPaid: paidAmount,
        dueAmount: dueAmount,
        
        paymentStatus: status.text.toLowerCase(),
        
        notes: invoiceData.notes || '',
        terms: invoiceData.terms || '',
        customFields: validDynamicFields,
        
        updatedAt: new Date().toISOString()
      };

      const response = await fetch(`http://localhost:5000/api/invoices/${invoiceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoicePayload)
      });

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response:', responseText);
        throw new Error('Invalid response from server');
      }
      
      if (response.ok && data.success) {
        toast.success('Invoice updated successfully');
        router.push('/admin/invoices');
      } else {
        toast.error(data.error || data.message || 'Failed to update invoice');
      }
    } catch (error) {
      console.error('Update invoice error:', error);
      toast.error('Failed to update invoice: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <Loader2 className="w-10 h-10 animate-spin text-[#6B4F3A] mx-auto mb-4" />
          <p className="text-sm text-gray-500">Loading invoice details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/admin/invoices" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {isPaid ? 'View Invoice (Read Only)' : 'Update Invoice'}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Invoice: {invoiceData.invoiceNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isPaid ? (
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
                  <Lock className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">Paid Invoice - Read Only</span>
                </div>
              ) : (
                <button
                  onClick={handleUpdateInvoice}
                  disabled={saving}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Update Invoice
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Read-Only Banner for Paid Invoices */}
      {isPaid && (
        <div className="container mx-auto px-4 max-w-7xl pt-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">This invoice is Paid, you can't update it.</p>
              <p className="text-xs text-amber-600 mt-1">No changes can be made to paid invoices.</p>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Information */}
      <div className="container mx-auto px-4 max-w-7xl pt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Invoice Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Invoice Number</label>
              <input type="text" value={invoiceData.invoiceNumber || 'N/A'} readOnly disabled className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Invoice Date</label>
              <input type="date" value={invoiceData.invoiceDate} onChange={(e) => handleInputChange('invoiceDate', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Due Date</label>
              <input type="date" value={invoiceData.dueDate} onChange={(e) => handleInputChange('dueDate', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Company and Customer Information */}
      <div className="container mx-auto px-4 max-w-7xl pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Company Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Company Information</h2>
            
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-500 mb-2">Company Logo</label>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {invoiceData.company.logo ? (
                    <img src={invoiceData.company.logo} alt="Company logo" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_LOGO_URL; }} />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                {!isPaid && (
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap gap-2">
                      <input type="file" id="logo-upload" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handleLogoUpload} className="hidden" />
                      <label htmlFor="logo-upload" className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                        {uploadingLogo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                      </label>
                      {invoiceData.company.logo !== DEFAULT_LOGO_URL && (
                        <button onClick={resetToDefaultLogo} className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                          <ImageIcon className="w-4 h-4" /> Reset to Default
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Upload your own image (JPEG, PNG, WEBP, max 2MB)</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Company Name</label>
                <input type="text" value={invoiceData.company?.companyName || 'Asian Clothify'} onChange={(e) => handleCompanyChange('companyName', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Contact Person</label>
                <input type="text" value={invoiceData.company?.contactPerson || ''} onChange={(e) => handleCompanyChange('contactPerson', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input type="email" value={invoiceData.company?.email || 'info@asianclothify.com'} onChange={(e) => handleCompanyChange('email', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                <input type="text" value={invoiceData.company?.phone || '+8801305-785685'} onChange={(e) => handleCompanyChange('phone', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                <input type="text" value={invoiceData.company?.address || '49/10-C, Ground Floor, Genda, Savar, Dhaka, Bangladesh'} onChange={(e) => handleCompanyChange('address', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Customer Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Company Name</label>
                <input type="text" value={invoiceData.customer?.companyName || ''} onChange={(e) => handleCustomerChange('companyName', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Contact Person</label>
                <input type="text" value={invoiceData.customer?.contactPerson || ''} onChange={(e) => handleCustomerChange('contactPerson', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input type="email" value={invoiceData.customer?.email || ''} onChange={(e) => handleCustomerChange('email', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                <input type="text" value={invoiceData.customer?.phone || ''} onChange={(e) => handleCustomerChange('phone', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">WhatsApp</label>
                <input type="text" value={invoiceData.customer?.whatsapp || ''} onChange={(e) => handleCustomerChange('whatsapp', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
              </div>
            </div>

            {/* Billing Address */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Billing Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Street Address</label>
                  <input type="text" value={invoiceData.customer?.billingAddress || ''} onChange={(e) => handleCustomerChange('billingAddress', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
                  <input type="text" value={invoiceData.customer?.billingCity || ''} onChange={(e) => handleCustomerChange('billingCity', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">ZIP Code</label>
                  <input type="text" value={invoiceData.customer?.billingZipCode || ''} onChange={(e) => handleCustomerChange('billingZipCode', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Country</label>
                  <input type="text" value={invoiceData.customer?.billingCountry || ''} onChange={(e) => handleCustomerChange('billingCountry', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-medium text-gray-700">Shipping Address</h3>
                {!isPaid && (
                  <button onClick={copyBillingToShipping} className="flex items-center justify-center gap-1 px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <Copy className="w-3 h-3" /> Copy from Billing
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Street Address</label>
                  <input type="text" value={invoiceData.customer?.shippingAddress || ''} onChange={(e) => handleCustomerChange('shippingAddress', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
                  <input type="text" value={invoiceData.customer?.shippingCity || ''} onChange={(e) => handleCustomerChange('shippingCity', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">ZIP Code</label>
                  <input type="text" value={invoiceData.customer?.shippingZipCode || ''} onChange={(e) => handleCustomerChange('shippingZipCode', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Country</label>
                  <input type="text" value={invoiceData.customer?.shippingCountry || ''} onChange={(e) => handleCustomerChange('shippingCountry', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Products</h2>
              {!isPaid && (
                <button onClick={() => setShowProductSearch(true)} className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              )}
            </div>

            {invoiceData.items.length > 0 ? (
              <div className="space-y-4">
                {invoiceData.items.map((item, itemIndex) => {
                  const product = productDetails[item.productId];
                  const isExpanded = expandedItems[itemIndex] !== false;
                  
                  return (
                    <ProductItemCard
                      key={`${itemIndex}-${item.productId}`}
                      item={item}
                      itemIndex={itemIndex}
                      product={product}
                      onUpdate={handleSizeQuantityChange}
                      onUpdateWeightQuantity={handleWeightQuantityChange}
                      onUpdateUnitPrice={handleColorUnitPriceChange}
                      onAddColor={handleAddColor}
                      onAddSize={handleAddSize}
                      onRemoveColor={handleRemoveColor}
                      onRemoveSize={handleRemoveSize}
                      onRemoveProduct={handleRemoveProduct}
                      isExpanded={isExpanded}
                      onToggleExpand={() => toggleExpand(itemIndex)}
                      calculateBulkPrice={calculateBulkPrice}
                      readOnly={isPaid}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No products in this invoice</p>
                {!isPaid && <p className="text-xs text-gray-400 mt-1">Click "Add Product" to add products</p>}
              </div>
            )}
          </div>
        </div>

        {/* Summary and Bank Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Bank Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              <Landmark className="w-5 h-5 text-[#6B4F3A]" /> Bank Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Bank Name</label>
                <input type="text" value={invoiceData.bankDetails?.bankName || ''} onChange={(e) => handleBankDetailsChange('bankName', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} placeholder="Enter bank name" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Account Name</label>
                <input type="text" value={invoiceData.bankDetails?.accountName || ''} onChange={(e) => handleBankDetailsChange('accountName', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} placeholder="Enter account holder name" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Account Number</label>
                <input type="text" value={invoiceData.bankDetails?.accountNumber || ''} onChange={(e) => handleBankDetailsChange('accountNumber', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} placeholder="Enter account number" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Account Type</label>
                <input type="text" value={invoiceData.bankDetails?.accountType || ''} onChange={(e) => handleBankDetailsChange('accountType', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} placeholder="e.g., Savings, Checking, Business" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Routing Number</label>
                  <input type="text" value={invoiceData.bankDetails?.routingNumber || ''} onChange={(e) => handleBankDetailsChange('routingNumber', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} placeholder="Routing number" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">SWIFT Code</label>
                  <input type="text" value={invoiceData.bankDetails?.swiftCode || ''} onChange={(e) => handleBankDetailsChange('swiftCode', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} placeholder="SWIFT/BIC code" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">IBAN (Optional)</label>
                <input type="text" value={invoiceData.bankDetails?.iban || ''} onChange={(e) => handleBankDetailsChange('iban', e.target.value)} readOnly={isPaid} className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} placeholder="IBAN" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Bank Address</label>
                <textarea value={invoiceData.bankDetails?.bankAddress || ''} onChange={(e) => handleBankDetailsChange('bankAddress', e.target.value)} readOnly={isPaid} rows="2" className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`} placeholder="Bank address" />
              </div>
            </div>
          </div>

          {/* Summary - Calculations */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Invoice Summary</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Subtotal</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subtotal Amount</span>
                    <span className="text-lg font-bold text-gray-900">{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">VAT Percentage</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={invoiceData.vatPercentage}
                      onChange={(e) => handleNumericChange('vatPercentage', e.target.value)}
                      onWheel={(e) => e.target.blur()}
                      onBlur={() => handleNumericBlur('vatPercentage')}
                      readOnly={isPaid}
                      className={`w-28 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                  <div className="flex-1 text-right">
                    <span className="text-sm text-gray-600">VAT Amount: </span>
                    <span className="font-semibold text-blue-600">{formatPrice(vatAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-700">After VAT</span>
                  <span className="text-lg font-bold text-blue-700">{formatPrice(totalAfterVat)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Discount Percentage</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={invoiceData.discountPercentage}
                      onChange={(e) => handleNumericChange('discountPercentage', e.target.value)}
                      onWheel={(e) => e.target.blur()}
                      onBlur={() => handleNumericBlur('discountPercentage')}
                      readOnly={isPaid}
                      className={`w-28 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                  <div className="flex-1 text-right">
                    <span className="text-sm text-gray-600">Discount Amount: </span>
                    <span className="font-semibold text-red-600">-{formatPrice(discountAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-yellow-700">After Discount</span>
                  <span className="text-lg font-bold text-yellow-700">{formatPrice(totalAfterDiscount)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Shipping Cost</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm text-gray-600">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={invoiceData.shippingCost}
                      onChange={(e) => handleNumericChange('shippingCost', e.target.value)}
                      onBlur={() => handleNumericBlur('shippingCost')}
                      onWheel={(e) => e.target.blur()}
                      readOnly={isPaid}
                      className={`w-32 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-emerald-700">Final Total</span>
                  <span className="text-xl font-bold text-emerald-700">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Details</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Amount Paid</label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max={finalTotal}
                        value={invoiceData.amountPaid}
                        onChange={(e) => handleNumericChange('amountPaid', e.target.value)}
                        onBlur={() => handleNumericBlur('amountPaid')}
                        onWheel={(e) => e.target.blur()}
                        readOnly={isPaid}
                        className={`w-32 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Due Amount</span>
                    <span className={`text-lg font-bold ${status.color}`}>{formatPrice(dueAmount)}</span>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-700">Paid</span>
                      </div>
                      <span className="text-sm font-bold text-green-700">{formatPrice(paidAmount)}</span>
                    </div>
                    <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${finalTotal > 0 ? Math.min((paidAmount / finalTotal) * 100, 100) : 0}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-green-600">Percentage</span>
                      <span className="font-medium text-green-700">{finalTotal > 0 ? ((paidAmount / finalTotal) * 100).toFixed(1) : 0}%</span>
                    </div>
                  </div>

                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-medium text-red-700">Unpaid</span>
                      </div>
                      <span className="text-sm font-bold text-red-700">{formatPrice(dueAmount)}</span>
                    </div>
                    <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full transition-all duration-300" style={{ width: `${finalTotal > 0 ? Math.max(Math.min((dueAmount / finalTotal) * 100, 100), 0) : 0}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-2">
                      <span className="text-red-600">Percentage</span>
                      <span className="font-medium text-red-700">{finalTotal > 0 ? ((dueAmount / finalTotal) * 100).toFixed(1) : 0}%</span>
                    </div>
                  </div>

                  <div className="flex justify-center pt-2">
                    <StatusBadge status={status.text} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Banking Terms Section */}
        <div className="mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                <FileText className="w-5 h-5 text-[#6B4F3A]" /> Banking Terms (Optional)
              </h2>
              {!isPaid && (
                <button onClick={handleAddBankingTerm} className="flex items-center justify-center gap-2 px-4 py-2 text-sm bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors">
                  <Plus className="w-4 h-4" /> Add Term
                </button>
              )}
            </div>
            
            <p className="text-xs text-gray-500 mb-4">
              Add any banking terms, conditions, or instructions. Each term can have a title and an optional value/description.
            </p>

            {bankingTerms.length > 0 ? (
              <div className="space-y-3">
                {bankingTerms.map((term) => (
                  <BankingTermField key={term.id} field={term} onUpdate={handleBankingTermUpdate} onRemove={handleRemoveBankingTerm} readOnly={isPaid} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No banking terms added</p>
                <p className="text-xs text-gray-400 mt-1">{isPaid ? 'No banking terms available' : 'Click "Add Term" to add payment terms'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Additional Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Notes</label>
                <textarea
                  value={invoiceData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  readOnly={isPaid}
                  rows="3"
                  className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                  placeholder="Add any additional notes..."
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Terms & Conditions</label>
                <textarea
                  value={invoiceData.terms}
                  onChange={(e) => handleInputChange('terms', e.target.value)}
                  readOnly={isPaid}
                  rows="3"
                  className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                />
              </div>

              {/* Dynamic Fields Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm font-medium text-gray-700">Custom Fields</h3>
                  {!isPaid && (
                    <button onClick={handleAddField} className="flex items-center justify-center gap-1 px-3 py-1.5 text-xs bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors">
                      <Plus className="w-3.5 h-3.5" /> Add Field
                    </button>
                  )}
                </div>

                {dynamicFields.length > 0 ? (
                  <div className="space-y-3">
                    {dynamicFields.map((field) => (
                      <div key={field.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={field.fieldName}
                            onChange={(e) => handleFieldChange(field.id, 'fieldName', e.target.value)}
                            readOnly={isPaid}
                            placeholder="Field name (e.g., PO Number)"
                            className={`w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                          />
                        </div>
                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={field.fieldValue}
                            onChange={(e) => handleFieldChange(field.id, 'fieldValue', e.target.value)}
                            readOnly={isPaid}
                            placeholder="Value"
                            className={`w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent ${isPaid ? 'bg-gray-50 text-gray-600 cursor-not-allowed' : ''}`}
                          />
                        </div>
                        {!isPaid && (
                          <button onClick={() => handleRemoveField(field.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic text-center py-3 border border-dashed border-gray-200 rounded-lg">
                    {isPaid ? 'No custom fields' : 'No custom fields added. Click "Add Field" to create custom fields.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ADD THE UPDATE INVOICE BUTTON HERE */}
{!isPaid && (
  <div className="flex justify-end mb-6">
    <button
      onClick={handleUpdateInvoice}
      disabled={saving}
      className="flex items-center gap-2 px-6 py-3 text-base bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
    >
      {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
      Update Invoice
    </button>
  </div>
)}
      </div>

      

      {/* Search Product Modal */}
      {!isPaid && (
        <SearchProductModal
          isOpen={showProductSearch}
          onClose={() => setShowProductSearch(false)}
          onSelectProduct={handleAddProduct}
          existingProductIds={existingProductIds}
        />
      )}

      {/* Delete Product Confirmation Modal */}
      {showDeleteConfirm && productToDelete !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 text-red-600 mb-3 sm:mb-4">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-base sm:text-lg font-semibold">Remove Product</h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                Are you sure you want to remove <span className="font-semibold">"{invoiceData.items[productToDelete]?.productName}"</span> from this invoice?
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500 mb-4 sm:mb-6">This action cannot be undone.</p>
              <div className="flex flex-col sm:flex-row items-center justify-end gap-2 sm:gap-3">
                <button onClick={() => { setShowDeleteConfirm(false); setProductToDelete(null); }} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button onClick={handleConfirmRemoveProduct} className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-1.5"><Trash2 className="w-3 h-3" /> Remove Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}