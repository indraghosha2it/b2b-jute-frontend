


// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import {
//   ArrowLeft,
//   Save,
//   FileText,
//   Package,
//   Users,
//   DollarSign,
//   AlertCircle,
//   Loader2,
//   CheckCircle,
//   XCircle,
//   Plus,
//   Trash2,
//   Edit,
//   Eye,
//   MessageCircle,
//   Send,
//   MinusCircle,
//   Ban,
//   Lock,
//   Scale
// } from 'lucide-react';
// import { toast } from 'sonner';

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

// const getPricePerUnitLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'kg';
//     case 'ton': return 'MT';
//     default: return 'pc';
//   }
// };

// export default function EditQuotationPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const inquiryId = searchParams.get('id');
  
//   const [inquiry, setInquiry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [globalNote, setGlobalNote] = useState('');
//   const [adminNote, setAdminNote] = useState('');
//   const [editedItems, setEditedItems] = useState([]);
  
//   useEffect(() => {
//     if (inquiryId) {
//       fetchInquiry();
//     } else {
//       toast.error('No inquiry ID provided');
//       router.push('/admin/inquiries');
//     }
//   }, [inquiryId]);
  
//   const fetchInquiry = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiryId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setInquiry(data.data);
//         const itemsCopy = JSON.parse(JSON.stringify(data.data.items));
//         itemsCopy.forEach(product => {
//           if (product.isAvailable === undefined) {
//             product.isAvailable = true;
//           }
//           if (product.orderUnit === undefined) {
//             product.orderUnit = 'piece';
//           }
//           product.colors.forEach(color => {
//             if (color.isAvailable === undefined) {
//               color.isAvailable = true;
//             }
//             // CRITICAL FIX: Ensure quantity field exists for weight-based products
//             const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
//             if (isWeightBased) {
//               // For weight-based, ensure quantity is set from totalQuantity or totalForColor
//               if (color.quantity === undefined && color.totalQuantity !== undefined) {
//                 color.quantity = color.totalQuantity;
//               }
//               if (color.quantity === undefined && color.totalForColor !== undefined) {
//                 color.quantity = color.totalForColor;
//               }
//               if (color.quantity === undefined) {
//                 color.quantity = 0;
//               }
//               // Also set totalQuantity and totalForColor
//               color.totalQuantity = color.quantity;
//               color.totalForColor = color.quantity;
//             }
//             // For piece-based, ensure sizeQuantities exist
//             if (color.sizeQuantities && Array.isArray(color.sizeQuantities)) {
//               color.sizeQuantities.forEach(sq => {
//                 if (sq.isAvailable === undefined) {
//                   sq.isAvailable = true;
//                 }
//               });
//             }
//           });
//         });
//         setEditedItems(itemsCopy);
//         setGlobalNote(data.data.specialInstructions || '');
//         setAdminNote(data.data.adminNote || '');
//       } else {
//         toast.error('Failed to load inquiry');
//         router.push('/admin/inquiries');
//       }
//     } catch (error) {
//       console.error('Error fetching inquiry:', error);
//       toast.error('Failed to load inquiry');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Helper function to get color quantity based on order unit
//   const getColorQuantity = (color, orderUnit) => {
//     const isWeightBased = orderUnit === 'kg' || orderUnit === 'ton';
//     if (isWeightBased) {
//       // For weight-based, use quantity field (priority: quantity > totalQuantity > totalForColor)
//       return color.quantity || color.totalQuantity || color.totalForColor || 0;
//     }
//     // For piece-based, sum from sizeQuantities
//     return (color.sizeQuantities || []).reduce((sum, sq) => {
//       if (sq.isAvailable !== false) {
//         return sum + (sq.quantity || 0);
//       }
//       return sum;
//     }, 0);
//   };
  
//   // Toggle entire product availability
//   const toggleProductAvailability = (productIndex) => {
//     const newItems = [...editedItems];
//     const product = newItems[productIndex];
//     product.isAvailable = !product.isAvailable;
    
//     if (product.isAvailable) {
//       const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
//       product.totalQuantity = product.colors.reduce((sum, c) => {
//         if (c.isAvailable === false) return sum;
//         let colorTotal;
//         if (isWeightBased) {
//           colorTotal = c.quantity || c.totalQuantity || 0;
//         } else {
//           colorTotal = c.sizeQuantities.reduce((s, sq) => {
//             if (sq.isAvailable !== false) return s + sq.quantity;
//             return s;
//           }, 0);
//         }
//         c.totalForColor = colorTotal;
//         c.totalQuantity = colorTotal;
//         if (isWeightBased) {
//           c.quantity = colorTotal;
//         }
//         return sum + colorTotal;
//       }, 0);
//     } else {
//       product.totalQuantity = 0;
//     }
    
//     setEditedItems(newItems);
//   };
  
//   // Update color quantity
//   const updateColorQuantity = (productIndex, colorIndex, size, newQuantity) => {
//     const newItems = [...editedItems];
//     const product = newItems[productIndex];
//     const color = product.colors[colorIndex];
//     const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
    
//     if (product.isAvailable === false) {
//       toast.error('This product is marked as unavailable. Please make it available first.');
//       return;
//     }
    
//     if (isWeightBased) {
//       // For weight-based products, update the quantity field directly
//       const qty = parseFloat(newQuantity) || 0;
//       color.quantity = qty;
//       color.totalForColor = qty;
//       color.totalQuantity = qty;
//     } else {
//       // For piece-based products, update the specific size quantity
//       const sizeIndex = color.sizeQuantities.findIndex(sq => sq.size === size);
//       if (sizeIndex !== -1) {
//         color.sizeQuantities[sizeIndex].quantity = parseInt(newQuantity) || 0;
//       }
      
//       // Recalculate total for this color (only include available sizes)
//       color.totalForColor = color.sizeQuantities.reduce((sum, sq) => {
//         if (sq.isAvailable === false) return sum;
//         return sum + sq.quantity;
//       }, 0);
//       color.totalQuantity = color.totalForColor;
//     }
    
//     // Recalculate total for this product
//     product.totalQuantity = product.colors.reduce((sum, c) => {
//       if (c.isAvailable === false) return sum;
//       if (isWeightBased) {
//         return sum + (c.quantity || 0);
//       }
//       return sum + c.totalForColor;
//     }, 0);
    
//     setEditedItems(newItems);
//   };
  
//   // Toggle size availability (piece-based only)
//   const toggleSizeAvailability = (productIndex, colorIndex, size) => {
//     const newItems = [...editedItems];
//     const product = newItems[productIndex];
//     const color = product.colors[colorIndex];
//     const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
    
//     if (isWeightBased) {
//       toast.error('Size availability is only for piece-based products');
//       return;
//     }
    
//     if (product.isAvailable === false) {
//       toast.error('This product is marked as unavailable. Please make it available first.');
//       return;
//     }
    
//     const sizeIndex = color.sizeQuantities.findIndex(sq => sq.size === size);
//     if (sizeIndex !== -1) {
//       color.sizeQuantities[sizeIndex].isAvailable = !color.sizeQuantities[sizeIndex].isAvailable;
//     }
    
//     // Recalculate total for this color
//     color.totalForColor = color.sizeQuantities.reduce((sum, sq) => {
//       if (sq.isAvailable === false) return sum;
//       return sum + sq.quantity;
//     }, 0);
//     color.totalQuantity = color.totalForColor;
    
//     // Recalculate product total
//     product.totalQuantity = product.colors.reduce((sum, c) => sum + c.totalForColor, 0);
    
//     setEditedItems(newItems);
//   };
  
//   // Update color unit price
//   const updateColorUnitPrice = (productIndex, colorIndex, newPrice) => {
//     const newItems = [...editedItems];
//     const product = newItems[productIndex];
    
//     if (product.isAvailable === false) {
//       toast.error('This product is marked as unavailable. Please make it available first.');
//       return;
//     }
    
//     newItems[productIndex].colors[colorIndex].unitPrice = parseFloat(newPrice) || 0;
//     setEditedItems(newItems);
//   };
  
//   // Toggle color availability
//   const toggleColorAvailability = (productIndex, colorIndex) => {
//     const newItems = [...editedItems];
//     const product = newItems[productIndex];
//     const color = product.colors[colorIndex];
//     const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
    
//     if (product.isAvailable === false) {
//       toast.error('This product is marked as unavailable. Please make it available first.');
//       return;
//     }
    
//     color.isAvailable = !color.isAvailable;
    
//     if (color.isAvailable) {
//       if (isWeightBased) {
//         const qty = color.quantity || 0;
//         color.totalForColor = qty;
//         color.totalQuantity = qty;
//       } else {
//         color.totalForColor = color.sizeQuantities.reduce((sum, sq) => {
//           if (sq.isAvailable === false) return sum;
//           return sum + sq.quantity;
//         }, 0);
//         color.totalQuantity = color.totalForColor;
//       }
//     } else {
//       color.totalForColor = 0;
//       color.totalQuantity = 0;
//     }
    
//     product.totalQuantity = product.colors.reduce((sum, c) => sum + c.totalForColor, 0);
    
//     setEditedItems(newItems);
//   };
  
//   // Calculate total after edits
//   const calculateTotal = () => {
//     return editedItems.reduce((total, product) => {
//       if (product.isAvailable === false) return total;
//       const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
      
//       const productTotal = product.colors.reduce((sum, color) => {
//         if (color.isAvailable === false) return sum;
//         let qty;
//         if (isWeightBased) {
//           qty = color.quantity || color.totalQuantity || color.totalForColor || 0;
//         } else {
//           qty = (color.sizeQuantities || []).reduce((s, sq) => {
//             if (sq.isAvailable !== false) return s + sq.quantity;
//             return s;
//           }, 0);
//         }
//         const price = color.unitPrice || 0;
//         return sum + (qty * price);
//       }, 0);
//       return total + productTotal;
//     }, 0);
//   };
  
//   // Calculate total quantity after edits
//   const calculateTotalQuantity = () => {
//     return editedItems.reduce((total, product) => {
//       if (product.isAvailable === false) return total;
//       const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
      
//       const productQty = product.colors.reduce((sum, color) => {
//         if (color.isAvailable === false) return sum;
//         if (isWeightBased) {
//           return sum + (color.quantity || color.totalQuantity || 0);
//         }
//         return sum + (color.sizeQuantities || []).reduce((s, sq) => {
//           if (sq.isAvailable !== false) return s + sq.quantity;
//           return s;
//         }, 0);
//       }, 0);
//       return total + productQty;
//     }, 0);
//   };
  
//   // Submit quotation
//   const handleSubmitQuotation = async () => {
//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
      
//       // const quotationData = {
//       //   items: editedItems,
//       //   specialInstructions: globalNote,
//       //   adminNote: adminNote,
//       //   status: 'quoted',
//       //   quotedAt: new Date().toISOString()
//       // };

//       // In EditQuotationPage.js, in the handleSubmitQuotation function
// const quotationData = {
//   items: editedItems.map(item => ({
//     ...item,
//     colors: item.colors.map(color => ({
//       ...color,
//       // Ensure quantity is preserved for weight-based products
//       quantity: color.quantity || color.totalQuantity || 0,
//       totalForColor: color.totalForColor || color.totalQuantity || 0,
//       totalQuantity: color.totalQuantity || color.totalForColor || 0
//     }))
//   })),
//   specialInstructions: globalNote,
//   adminNote: adminNote,
//   status: 'quoted',
//   quotedAt: new Date().toISOString()
// };
      
//       const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiryId}/quotation`, {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(quotationData)
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Quotation submitted successfully!');
//         router.push('/admin/inquiries');
//       } else {
//         toast.error(data.error || 'Failed to submit quotation');
//       }
//     } catch (error) {
//       console.error('Error submitting quotation:', error);
//       toast.error('Failed to submit quotation');
//     } finally {
//       setSaving(false);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
//       </div>
//     );
//   }
  
//   if (!inquiry) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h2 className="text-xl font-semibold">Inquiry not found</h2>
//           <Link href="/admin/inquiries" className="text-[#6B4F3A] mt-2 inline-block">
//             Back to Inquiries
//           </Link>
//         </div>
//       </div>
//     );
//   }
  
//   const totalAmount = calculateTotal();
//   const totalQuantity = calculateTotalQuantity();
  
//   // Get the main unit for display
//   const mainUnit = editedItems[0]?.orderUnit === 'kg' ? 'kg' : editedItems[0]?.orderUnit === 'ton' ? 'MT' : 'pcs';
  
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 max-w-7xl py-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//           <div>
//             <Link 
//               href="/admin/inquiries" 
//               className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#6B4F3A] mb-2"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Back to Inquiries
//             </Link>
//             <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Review & Quote</h1>
//             <p className="text-sm text-gray-500">
//               Inquiry: {inquiry.inquiryNumber} • Customer: {inquiry.userDetails?.companyName}
//             </p>
//           </div>
//           <button
//             onClick={handleSubmitQuotation}
//             disabled={saving}
//             className="flex items-center gap-2 px-4 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50"
//           >
//             {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
//             Submit Quotation
//           </button>
//         </div>
        
//         {/* Customer Info */}
//         <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
//           <h2 className="text-sm font-semibold text-gray-900 mb-3">Customer Information</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
//             <div>
//               <span className="text-gray-500">Company:</span>
//               <p className="font-medium">{inquiry.userDetails?.companyName || 'N/A'}</p>
//             </div>
//             <div>
//               <span className="text-gray-500">Contact:</span>
//               <p className="font-medium">{inquiry.userDetails?.contactPerson || 'N/A'}</p>
//             </div>
//             <div>
//               <span className="text-gray-500">Email:</span>
//               <p className="font-medium">{inquiry.userDetails?.email || 'N/A'}</p>
//             </div>
//             <div>
//               <span className="text-gray-500">Phone:</span>
//               <p className="font-medium">{inquiry.userDetails?.phone || 'N/A'}</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Products Edit Section */}
//         <div className="space-y-4">
//           <h2 className="text-lg font-semibold text-gray-900">Products & Pricing</h2>
          
//           {editedItems.map((product, productIndex) => {
//             const isProductAvailable = product.isAvailable !== false;
//             const unitLabel = getUnitLabel(product.orderUnit);
//             const pricePerUnitLabel = getPricePerUnitLabel(product.orderUnit);
//             const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
            
//             return (
//               <div key={productIndex} className={`bg-white rounded-xl border overflow-hidden transition-all ${
//                 isProductAvailable ? 'border-gray-200' : 'border-red-200 bg-red-50/10'
//               }`}>
//                 {/* Product Header */}
//                 <div className="p-4 bg-gray-50 border-b border-gray-200">
//                   <div className="flex flex-wrap items-start justify-between gap-3">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
//                         <img 
//                           src={product.productImage || 'https://via.placeholder.com/48'} 
//                           alt=""
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-2 flex-wrap">
//                           <h3 className="font-semibold text-gray-900">{product.productName}</h3>
//                           <span className="text-[10px] bg-[#F5E6D3] text-[#6B4F3A] px-1.5 py-0.5 rounded-full">
//                             {unitLabel === 'pcs' ? 'Pieces' : unitLabel.toUpperCase()}
//                           </span>
//                           {!isProductAvailable && (
//                             <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
//                               Product Unavailable
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-xs text-gray-500">
//                           MOQ: {product.moq} {unitLabel} per color | Original Total: {product.totalQuantity} {unitLabel}
//                         </p>
//                       </div>
//                     </div>
                    
//                     <button
//                       onClick={() => toggleProductAvailability(productIndex)}
//                       className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors ${
//                         isProductAvailable 
//                           ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
//                           : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
//                       }`}
//                     >
//                       {isProductAvailable ? (
//                         <>
//                           <Ban className="w-3.5 h-3.5" />
//                           Make Unavailable
//                         </>
//                       ) : (
//                         <>
//                           <CheckCircle className="w-3.5 h-3.5" />
//                           Make Available
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
                
//                 {/* Colors Section */}
//                 {isProductAvailable && (
//                   <div className="p-4 space-y-4">
//                     {product.colors.map((color, colorIndex) => {
//                       const isColorAvailable = color.isAvailable !== false;
//                       const colorQuantity = getColorQuantity(color, product.orderUnit);
//                       const colorSubtotal = colorQuantity * (color.unitPrice || 0);
                      
//                       return (
//                         <div 
//                           key={colorIndex} 
//                           className={`border rounded-lg p-3 transition-all ${
//                             isColorAvailable ? 'border-gray-200' : 'border-red-200 bg-red-50/30'
//                           }`}
//                         >
//                           <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
//                             <div className="flex items-center gap-2">
//                               <div 
//                                 className="w-5 h-5 rounded-full border shadow-sm"
//                                 style={{ backgroundColor: color.color.code }}
//                               />
                            
//                               {!isColorAvailable && (
//                                 <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
//                                   Unavailable
//                                 </span>
//                               )}
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <div className="flex items-center gap-1">
//                                 <span className="text-xs text-gray-500">$</span>
//                                 <input
//                                   type="number"
//                                   step="0.01"
//                                   value={color.unitPrice || 0}
//                                   onChange={(e) => updateColorUnitPrice(productIndex, colorIndex, e.target.value)}
//                                   onWheel={(e) => e.target.blur()}
//                                   disabled={!isColorAvailable}
//                                   className="w-20 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] disabled:bg-gray-100"
//                                 />
//                                 <span className="text-xs text-gray-500">/{pricePerUnitLabel}</span>
//                               </div>
                              
//                               <button
//                                 onClick={() => toggleColorAvailability(productIndex, colorIndex)}
//                                 className={`flex items-center gap-1 px-2 py-1 text-xs rounded-lg transition-colors ${
//                                   isColorAvailable 
//                                     ? 'bg-green-50 text-green-700 hover:bg-green-100'
//                                     : 'bg-red-50 text-red-700 hover:bg-red-100'
//                                 }`}
//                               >
//                                 {isColorAvailable ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
//                                 {isColorAvailable ? 'Available' : 'Unavailable'}
//                               </button>
//                             </div>
//                           </div>
                          
//                           {/* Quantity Inputs */}
//                           {isColorAvailable && (
//                             <>
//                               {isWeightBased ? (
//                                 // Weight-based: simple quantity input
//                                 <div className="mb-3">
//                                   <label className="block text-xs font-medium text-gray-500 mb-1">
//                                     Quantity ({unitLabel})
//                                   </label>
//                                   <div className="flex items-center gap-2">
//                                     <input
//                                       type="number"
//                                       step="0.01"
//                                       min="0"
//                                       value={color.quantity !== undefined ? color.quantity : (color.totalQuantity || 0)}
//                                       onChange={(e) => updateColorQuantity(productIndex, colorIndex, null, e.target.value)}
//                                       className="w-32 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A]"
//                                     />
//                                     <span className="text-xs text-gray-500">{unitLabel}</span>
//                                   </div>
//                                   <p className="text-[10px] text-gray-400 mt-1">
//                                     Current quantity: {colorQuantity} {unitLabel}
//                                   </p>
//                                 </div>
//                               ) : (
//                                 // Piece-based: size grid
//                                 <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-2">
//                                   {color.sizeQuantities.map((sq, sqIndex) => {
//                                     const isSizeAvailable = sq.isAvailable !== false;
                                    
//                                     return (
//                                       <div key={sqIndex} className="flex flex-col">
//                                         <div className="flex items-center justify-between mb-1">
//                                           <label className={`text-[10px] ${isSizeAvailable ? 'text-gray-500' : 'text-gray-400 line-through'}`}>
//                                             {sq.size}
//                                           </label>
//                                           <button
//                                             onClick={() => toggleSizeAvailability(productIndex, colorIndex, sq.size)}
//                                             className={`text-[9px] flex items-center gap-0.5 px-1 py-0.5 rounded ${
//                                               isSizeAvailable 
//                                                 ? 'text-green-600 hover:bg-green-50' 
//                                                 : 'text-red-600 hover:bg-red-50'
//                                             }`}
//                                             title={isSizeAvailable ? 'Mark as unavailable' : 'Mark as available'}
//                                           >
//                                             {isSizeAvailable ? (
//                                               <CheckCircle className="w-2.5 h-2.5" />
//                                             ) : (
//                                               <MinusCircle className="w-2.5 h-2.5" />
//                                             )}
//                                           </button>
//                                         </div>
//                                         <input
//                                           type="number"
//                                           min="0"
//                                           value={sq.quantity}
//                                           onChange={(e) => updateColorQuantity(productIndex, colorIndex, sq.size, e.target.value)}
//                                           onWheel={(e) => e.target.blur()}
//                                           disabled={!isSizeAvailable}
//                                           className={`w-full px-2 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] ${
//                                             isSizeAvailable 
//                                               ? 'border-gray-200 bg-white' 
//                                               : 'border-red-200 bg-red-50 text-gray-400 line-through'
//                                           }`}
//                                           placeholder="0"
//                                         />
//                                       </div>
//                                     );
//                                   })}
//                                 </div>
//                               )}
                              
//                               {/* Color Summary */}
//                               <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between text-xs">
//                                 <span className="text-gray-500">Total for this color:</span>
//                                 <span className="font-semibold text-[#6B4F3A]">
//                                   {colorQuantity} {unitLabel} × {formatPrice(color.unitPrice)} = {formatPrice(colorQuantity * (color.unitPrice || 0))}
//                                 </span>
//                               </div>
//                             </>
//                           )}
                          
//                           {!isColorAvailable && (
//                             <p className="text-xs text-red-600 mt-2">
//                               This color has been marked as unavailable. It will be excluded from the quotation.
//                             </p>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
                
//                 {/* Product Unavailable Message */}
//                 {!isProductAvailable && (
//                   <div className="p-8 text-center">
//                     <Ban className="w-12 h-12 text-red-400 mx-auto mb-2" />
//                     <p className="text-sm text-red-600">
//                       This product has been marked as unavailable and will be excluded from the quotation.
//                     </p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       Click "Make Available" above to restore this product.
//                     </p>
//                   </div>
//                 )}
                
//                 {/* Product Summary */}
//                 {isProductAvailable && (
//                   <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
//                     <span className="text-sm text-gray-600">Product Total:</span>
//                     <span className="text-base font-bold text-[#6B4F3A]">
//                       {formatPrice(product.colors.reduce((sum, color) => {
//                         if (color.isAvailable === false) return sum;
//                         let qty;
//                         if (isWeightBased) {
//                           qty = color.quantity || color.totalQuantity || color.totalForColor || 0;
//                         } else {
//                           qty = (color.sizeQuantities || []).reduce((s, sq) => {
//                             if (sq.isAvailable !== false) return s + sq.quantity;
//                             return s;
//                           }, 0);
//                         }
//                         return sum + (qty * (color.unitPrice || 0));
//                       }, 0))}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
        
//         {/* Customer Instructions - Read Only */}
//         <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-4">
//           <div className="flex items-center gap-2 mb-2">
//             <Lock className="w-4 h-4 text-gray-500" />
//             <label className="text-sm font-medium text-gray-700">
//               Customer Instructions (Read Only)
//             </label>
//           </div>
//           <div className="bg-white rounded-lg p-3 border border-gray-200 min-h-[80px]">
//             <p className="text-sm text-gray-600 whitespace-pre-wrap">
//               {globalNote || 'No instructions provided by customer.'}
//             </p>
//           </div>
//           <p className="text-xs text-gray-400 mt-2">
//             These instructions were provided by the customer and cannot be edited.
//           </p>
//         </div>
        
//         {/* Internal Admin Note */}
//         <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4">
//           <label className="text-sm font-medium text-gray-700 mb-2 block">
//             Internal Admin Note (Not visible to customer)
//           </label>
//           <textarea
//             value={adminNote}
//             onChange={(e) => setAdminNote(e.target.value)}
//             rows="3"
//             className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent"
//             placeholder="Add internal notes for reference (these will not be shown to the customer)..."
//           />
//           <p className="text-xs text-gray-400 mt-1">
//             This note is for internal use only and will not be visible to the customer.
//           </p>
//         </div>
        
//         {/* Quotation Summary */}
//         <div className="mt-6 bg-gradient-to-r from-[#6B4F3A]/10 to-transparent rounded-xl border border-[#6B4F3A]/20 p-4">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">Quotation Summary</h3>
//               <p className="text-sm text-gray-500">
//                 Total Quantity: {totalQuantity} {mainUnit}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-500">Total Amount</p>
//               <p className="text-2xl font-bold text-[#6B4F3A]">{formatPrice(totalAmount)}</p>
//             </div>
//           </div>
//         </div>
        
//         {/* Action Buttons */}
//         <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
//           <Link
//             href="/admin/inquiries"
//             className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center"
//           >
//             Cancel
//           </Link>
//           <button
//             onClick={handleSubmitQuotation}
//             disabled={saving}
//             className="flex items-center justify-center gap-2 px-6 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50"
//           >
//             {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
//             Submit Quotation to Customer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  FileText,
  Package,
  Users,
  DollarSign,
  AlertCircle,
  Loader2,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Edit,
  Eye,
  MessageCircle,
  Send,
  MinusCircle,
  Ban,
  Lock,
  Scale
} from 'lucide-react';
import { toast } from 'sonner';

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

const getPricePerUnitLabel = (orderUnit) => {
  switch(orderUnit) {
    case 'kg': return 'kg';
    case 'ton': return 'MT';
    default: return 'pc';
  }
};

export default function EditQuotationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inquiryId = searchParams.get('id');
  
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [globalNote, setGlobalNote] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [editedItems, setEditedItems] = useState([]);
  
  useEffect(() => {
    if (inquiryId) {
      fetchInquiry();
    } else {
      toast.error('No inquiry ID provided');
      router.push('/admin/inquiries');
    }
  }, [inquiryId]);
  
const fetchInquiry = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiryId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (data.success) {
      setInquiry(data.data);
      const itemsCopy = JSON.parse(JSON.stringify(data.data.items));
      itemsCopy.forEach(product => {
        // Initialize product availability
        if (product.isAvailable === undefined) {
          product.isAvailable = true;
        }
        if (product.orderUnit === undefined) {
          product.orderUnit = 'piece';
        }
        product.colors.forEach(color => {
          // Initialize color availability
          if (color.isAvailable === undefined) {
            color.isAvailable = true;
          }
          
          const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
          if (isWeightBased) {
            if (color.quantity === undefined && color.totalQuantity !== undefined) {
              color.quantity = color.totalQuantity;
            }
            if (color.quantity === undefined && color.totalForColor !== undefined) {
              color.quantity = color.totalForColor;
            }
            if (color.quantity === undefined) {
              color.quantity = 0;
            }
            color.totalQuantity = color.quantity;
            color.totalForColor = color.quantity;
          }
          
          // Initialize size availability for piece-based products
          if (color.sizeQuantities && Array.isArray(color.sizeQuantities)) {
            color.sizeQuantities.forEach(sq => {
              if (sq.isAvailable === undefined) {
                sq.isAvailable = true;
              }
            });
          }
        });
      });
      setEditedItems(itemsCopy);
      setGlobalNote(data.data.specialInstructions || '');
      setAdminNote(data.data.adminNote || '');
    } else {
      toast.error('Failed to load inquiry');
      router.push('/admin/inquiries');
    }
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    toast.error('Failed to load inquiry');
  } finally {
    setLoading(false);
  }
};
  
  // Helper function to get color quantity based on order unit
  const getColorQuantity = (color, orderUnit) => {
    const isWeightBased = orderUnit === 'kg' || orderUnit === 'ton';
    if (isWeightBased) {
      // For weight-based, use quantity field (priority: quantity > totalQuantity > totalForColor)
      return color.quantity || color.totalQuantity || color.totalForColor || 0;
    }
    // For piece-based, sum from sizeQuantities
    return (color.sizeQuantities || []).reduce((sum, sq) => {
      if (sq.isAvailable !== false) {
        return sum + (sq.quantity || 0);
      }
      return sum;
    }, 0);
  };
  
  // Toggle entire product availability
  const toggleProductAvailability = (productIndex) => {
    const newItems = [...editedItems];
    const product = newItems[productIndex];
    product.isAvailable = !product.isAvailable;
    
    if (product.isAvailable) {
      const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
      product.totalQuantity = product.colors.reduce((sum, c) => {
        if (c.isAvailable === false) return sum;
        let colorTotal;
        if (isWeightBased) {
          colorTotal = c.quantity || c.totalQuantity || 0;
        } else {
          colorTotal = c.sizeQuantities.reduce((s, sq) => {
            if (sq.isAvailable !== false) return s + sq.quantity;
            return s;
          }, 0);
        }
        c.totalForColor = colorTotal;
        c.totalQuantity = colorTotal;
        if (isWeightBased) {
          c.quantity = colorTotal;
        }
        return sum + colorTotal;
      }, 0);
    } else {
      product.totalQuantity = 0;
    }
    
    setEditedItems(newItems);
  };
  
  // Update color quantity
  const updateColorQuantity = (productIndex, colorIndex, size, newQuantity) => {
    const newItems = [...editedItems];
    const product = newItems[productIndex];
    const color = product.colors[colorIndex];
    const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
    
    if (product.isAvailable === false) {
      toast.error('This product is marked as unavailable. Please make it available first.');
      return;
    }
    
    if (isWeightBased) {
      // For weight-based products, update the quantity field directly
      const qty = parseFloat(newQuantity) || 0;
      color.quantity = qty;
      color.totalForColor = qty;
      color.totalQuantity = qty;
    } else {
      // For piece-based products, update the specific size quantity
      const sizeIndex = color.sizeQuantities.findIndex(sq => sq.size === size);
      if (sizeIndex !== -1) {
        color.sizeQuantities[sizeIndex].quantity = parseInt(newQuantity) || 0;
      }
      
      // Recalculate total for this color (only include available sizes)
      color.totalForColor = color.sizeQuantities.reduce((sum, sq) => {
        if (sq.isAvailable === false) return sum;
        return sum + sq.quantity;
      }, 0);
      color.totalQuantity = color.totalForColor;
    }
    
    // Recalculate total for this product
    product.totalQuantity = product.colors.reduce((sum, c) => {
      if (c.isAvailable === false) return sum;
      if (isWeightBased) {
        return sum + (c.quantity || 0);
      }
      return sum + c.totalForColor;
    }, 0);
    
    setEditedItems(newItems);
  };
  
  // Toggle size availability (piece-based only)
// Toggle size availability (piece-based only)
const toggleSizeAvailability = (productIndex, colorIndex, size) => {
  const newItems = [...editedItems];
  const product = newItems[productIndex];
  const color = product.colors[colorIndex];
  const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
  
  if (isWeightBased) {
    toast.error('Size availability is only for piece-based products');
    return;
  }
  
  if (product.isAvailable === false) {
    toast.error('This product is marked as unavailable. Please make it available first.');
    return;
  }
  
  if (color.isAvailable === false) {
    toast.error('This color is marked as unavailable. Please make it available first.');
    return;
  }
  
  const sizeIndex = color.sizeQuantities.findIndex(sq => sq.size === size);
  if (sizeIndex !== -1) {
    // Toggle the isAvailable flag
    color.sizeQuantities[sizeIndex].isAvailable = !color.sizeQuantities[sizeIndex].isAvailable;
  }
  
  // Recalculate total for this color (only include available sizes)
  color.totalForColor = color.sizeQuantities.reduce((sum, sq) => {
    if (sq.isAvailable === false) return sum;
    return sum + sq.quantity;
  }, 0);
  color.totalQuantity = color.totalForColor;
  
  // Recalculate product total
  product.totalQuantity = product.colors.reduce((sum, c) => {
    if (c.isAvailable === false) return sum;
    return sum + (c.totalForColor || 0);
  }, 0);
  
  setEditedItems(newItems);
};
  
  // Update color unit price
  const updateColorUnitPrice = (productIndex, colorIndex, newPrice) => {
    const newItems = [...editedItems];
    const product = newItems[productIndex];
    
    if (product.isAvailable === false) {
      toast.error('This product is marked as unavailable. Please make it available first.');
      return;
    }
    
    newItems[productIndex].colors[colorIndex].unitPrice = parseFloat(newPrice) || 0;
    setEditedItems(newItems);
  };
  
  // Toggle color availability
// Toggle color availability
const toggleColorAvailability = (productIndex, colorIndex) => {
  const newItems = [...editedItems];
  const product = newItems[productIndex];
  const color = product.colors[colorIndex];
  const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
  
  if (product.isAvailable === false) {
    toast.error('This product is marked as unavailable. Please make it available first.');
    return;
  }
  
  // Toggle the isAvailable flag
  color.isAvailable = !color.isAvailable;
  
  if (color.isAvailable) {
    if (isWeightBased) {
      const qty = color.quantity || 0;
      color.totalForColor = qty;
      color.totalQuantity = qty;
    } else {
      color.totalForColor = color.sizeQuantities.reduce((sum, sq) => {
        if (sq.isAvailable === false) return sum;
        return sum + sq.quantity;
      }, 0);
      color.totalQuantity = color.totalForColor;
    }
  } else {
    color.totalForColor = 0;
    color.totalQuantity = 0;
  }
  
  // Recalculate product total
  product.totalQuantity = product.colors.reduce((sum, c) => {
    if (c.isAvailable === false) return sum;
    return sum + (c.totalForColor || 0);
  }, 0);
  
  setEditedItems(newItems);
};
  
  // Calculate total after edits
  const calculateTotal = () => {
    return editedItems.reduce((total, product) => {
      if (product.isAvailable === false) return total;
      const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
      
      const productTotal = product.colors.reduce((sum, color) => {
        if (color.isAvailable === false) return sum;
        let qty;
        if (isWeightBased) {
          qty = color.quantity || color.totalQuantity || color.totalForColor || 0;
        } else {
          qty = (color.sizeQuantities || []).reduce((s, sq) => {
            if (sq.isAvailable !== false) return s + sq.quantity;
            return s;
          }, 0);
        }
        const price = color.unitPrice || 0;
        return sum + (qty * price);
      }, 0);
      return total + productTotal;
    }, 0);
  };
  
  // Calculate total quantity after edits
  const calculateTotalQuantity = () => {
    return editedItems.reduce((total, product) => {
      if (product.isAvailable === false) return total;
      const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
      
      const productQty = product.colors.reduce((sum, color) => {
        if (color.isAvailable === false) return sum;
        if (isWeightBased) {
          return sum + (color.quantity || color.totalQuantity || 0);
        }
        return sum + (color.sizeQuantities || []).reduce((s, sq) => {
          if (sq.isAvailable !== false) return s + sq.quantity;
          return s;
        }, 0);
      }, 0);
      return total + productQty;
    }, 0);
  };
  
  // Submit quotation
// Submit quotation
const handleSubmitQuotation = async () => {
  setSaving(true);
  try {
    const token = localStorage.getItem('token');
    
    // Prepare quotation data with ALL fields including isAvailable flags
    const quotationData = {
      items: editedItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        orderUnit: item.orderUnit,
        moq: item.moq,
        unitPrice: item.unitPrice,
        isAvailable: item.isAvailable !== false, // ← IMPORTANT: Include product availability
        specialInstructions: item.specialInstructions || '',
        totalQuantity: item.totalQuantity || 0,
        colors: item.colors.map(color => ({
          color: color.color,
          unitPrice: color.unitPrice || 0,
          isAvailable: color.isAvailable !== false, // ← IMPORTANT: Include color availability
          quantity: color.quantity || 0,
          totalForColor: color.totalForColor || 0,
          totalQuantity: color.totalQuantity || color.totalForColor || 0,
          sizeQuantities: (color.sizeQuantities || []).map(sq => ({
            size: sq.size,
            quantity: sq.quantity || 0,
            isAvailable: sq.isAvailable !== false // ← IMPORTANT: Include size availability
          }))
        }))
      })),
      specialInstructions: globalNote,
      adminNote: adminNote,
      status: 'quoted',
      quotedAt: new Date().toISOString()
    };
    
    console.log('Submitting quotation with availability flags:', JSON.stringify(quotationData, null, 2));
    
    const response = await fetch(`http://localhost:5000/api/admin/inquiries/${inquiryId}/quotation`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quotationData)
    });
    
    const data = await response.json();
    
    if (data.success) {
      toast.success('Quotation submitted successfully!');
      router.push('/admin/inquiries');
    } else {
      toast.error(data.error || 'Failed to submit quotation');
    }
  } catch (error) {
    console.error('Error submitting quotation:', error);
    toast.error('Failed to submit quotation');
  } finally {
    setSaving(false);
  }
};
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
      </div>
    );
  }
  
  if (!inquiry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Inquiry not found</h2>
          <Link href="/admin/inquiries" className="text-[#6B4F3A] mt-2 inline-block">
            Back to Inquiries
          </Link>
        </div>
      </div>
    );
  }
  
  const totalAmount = calculateTotal();
  const totalQuantity = calculateTotalQuantity();
  
  // Get the main unit for display
  const mainUnit = editedItems[0]?.orderUnit === 'kg' ? 'kg' : editedItems[0]?.orderUnit === 'ton' ? 'MT' : 'pcs';
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <Link 
              href="/admin/inquiries" 
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#6B4F3A] mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Inquiries
            </Link>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>Review & Quote</h1>
            <p className="text-sm text-gray-500">
              Inquiry: {inquiry.inquiryNumber} • Customer: {inquiry.userDetails?.companyName}
            </p>
          </div>
          <button
            onClick={handleSubmitQuotation}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Submit Quotation
          </button>
        </div>
        
        {/* Customer Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Customer Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Company:</span>
              <p className="font-medium">{inquiry.userDetails?.companyName || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-500">Contact:</span>
              <p className="font-medium">{inquiry.userDetails?.contactPerson || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-500">Email:</span>
              <p className="font-medium">{inquiry.userDetails?.email || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-500">Phone:</span>
              <p className="font-medium">{inquiry.userDetails?.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        {/* Products Edit Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Products & Pricing</h2>
          
          {editedItems.map((product, productIndex) => {
            const isProductAvailable = product.isAvailable !== false;
            const unitLabel = getUnitLabel(product.orderUnit);
            const pricePerUnitLabel = getPricePerUnitLabel(product.orderUnit);
            const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
            
            return (
              <div key={productIndex} className={`bg-white rounded-xl border overflow-hidden transition-all ${
                isProductAvailable ? 'border-gray-200' : 'border-red-200 bg-red-50/10'
              }`}>
                {/* Product Header */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={product.productImage || 'https://via.placeholder.com/48'} 
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{product.productName}</h3>
                          <span className="text-[10px] bg-[#F5E6D3] text-[#6B4F3A] px-1.5 py-0.5 rounded-full">
                            {unitLabel === 'pcs' ? 'Pieces' : unitLabel.toUpperCase()}
                          </span>
                          {!isProductAvailable && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                              Product Unavailable
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          MOQ: {product.moq} {unitLabel} per color | Original Total: {product.totalQuantity} {unitLabel}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleProductAvailability(productIndex)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        isProductAvailable 
                          ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                          : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                      }`}
                    >
                      {isProductAvailable ? (
                        <>
                          <Ban className="w-3.5 h-3.5" />
                          Make Unavailable
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          Make Available
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Colors Section */}
                {isProductAvailable && (
                  <div className="p-4 space-y-4">
                    {product.colors.map((color, colorIndex) => {
                      const isColorAvailable = color.isAvailable !== false;
                      const colorQuantity = getColorQuantity(color, product.orderUnit);
                      const colorSubtotal = colorQuantity * (color.unitPrice || 0);
                      
                      return (
                        <div 
                          key={colorIndex} 
                          className={`border rounded-lg p-3 transition-all ${
                            isColorAvailable ? 'border-gray-200' : 'border-red-200 bg-red-50/30'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-5 h-5 rounded-full border shadow-sm"
                                style={{ backgroundColor: color.color.code }}
                              />
                            
                              {!isColorAvailable && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                  Unavailable
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">$</span>
                                <input
                                  type="number"
                                  step="0.01"
                                  value={color.unitPrice || 0}
                                  onChange={(e) => updateColorUnitPrice(productIndex, colorIndex, e.target.value)}
                                  onWheel={(e) => e.target.blur()}
                                  disabled={!isColorAvailable}
                                  className="w-20 px-2 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] disabled:bg-gray-100"
                                />
                                <span className="text-xs text-gray-500">/{pricePerUnitLabel}</span>
                              </div>
                              
                              <button
                                onClick={() => toggleColorAvailability(productIndex, colorIndex)}
                                className={`flex items-center gap-1 px-2 py-1 text-xs rounded-lg transition-colors ${
                                  isColorAvailable 
                                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                                }`}
                              >
                                {isColorAvailable ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                {isColorAvailable ? 'Available' : 'Unavailable'}
                              </button>
                            </div>
                          </div>
                          
                          {/* Quantity Inputs */}
                          {isColorAvailable && (
                            <>
                              {isWeightBased ? (
                                // Weight-based: simple quantity input
                                <div className="mb-3">
                                  <label className="block text-xs font-medium text-gray-500 mb-1">
                                    Quantity ({unitLabel})
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={color.quantity !== undefined ? color.quantity : (color.totalQuantity || 0)}
                                      onChange={(e) => updateColorQuantity(productIndex, colorIndex, null, e.target.value)}
                                      className="w-32 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A]"
                                    />
                                    <span className="text-xs text-gray-500">{unitLabel}</span>
                                  </div>
                                  <p className="text-[10px] text-gray-400 mt-1">
                                    Current quantity: {colorQuantity} {unitLabel}
                                  </p>
                                </div>
                              ) : (
                                // Piece-based: size grid
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-2">
                                  {color.sizeQuantities.map((sq, sqIndex) => {
                                    const isSizeAvailable = sq.isAvailable !== false;
                                    
                                    return (
                                      <div key={sqIndex} className="flex flex-col">
                                        <div className="flex items-center justify-between mb-1">
                                          <label className={`text-[10px] ${isSizeAvailable ? 'text-gray-500' : 'text-gray-400 line-through'}`}>
                                            {sq.size}
                                          </label>
                                          <button
                                            onClick={() => toggleSizeAvailability(productIndex, colorIndex, sq.size)}
                                            className={`text-[9px] flex items-center gap-0.5 px-1 py-0.5 rounded ${
                                              isSizeAvailable 
                                                ? 'text-green-600 hover:bg-green-50' 
                                                : 'text-red-600 hover:bg-red-50'
                                            }`}
                                            title={isSizeAvailable ? 'Mark as unavailable' : 'Mark as available'}
                                          >
                                            {isSizeAvailable ? (
                                              <CheckCircle className="w-2.5 h-2.5" />
                                            ) : (
                                              <MinusCircle className="w-2.5 h-2.5" />
                                            )}
                                          </button>
                                        </div>
                                        <input
                                          type="number"
                                          min="0"
                                          value={sq.quantity}
                                          onChange={(e) => updateColorQuantity(productIndex, colorIndex, sq.size, e.target.value)}
                                          onWheel={(e) => e.target.blur()}
                                          disabled={!isSizeAvailable}
                                          className={`w-full px-2 py-1 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] ${
                                            isSizeAvailable 
                                              ? 'border-gray-200 bg-white' 
                                              : 'border-red-200 bg-red-50 text-gray-400 line-through'
                                          }`}
                                          placeholder="0"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              
                              {/* Color Summary */}
                              <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between text-xs">
                                <span className="text-gray-500">Total for this color:</span>
                                <span className="font-semibold text-[#6B4F3A]">
                                  {colorQuantity} {unitLabel} × {formatPrice(color.unitPrice)} = {formatPrice(colorQuantity * (color.unitPrice || 0))}
                                </span>
                              </div>
                            </>
                          )}
                          
                          {!isColorAvailable && (
                            <p className="text-xs text-red-600 mt-2">
                              This color has been marked as unavailable. It will be excluded from the quotation.
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Product Unavailable Message */}
                {!isProductAvailable && (
                  <div className="p-8 text-center">
                    <Ban className="w-12 h-12 text-red-400 mx-auto mb-2" />
                    <p className="text-sm text-red-600">
                      This product has been marked as unavailable and will be excluded from the quotation.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Click "Make Available" above to restore this product.
                    </p>
                  </div>
                )}
                
                {/* Product Summary */}
                {isProductAvailable && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm text-gray-600">Product Total:</span>
                    <span className="text-base font-bold text-[#6B4F3A]">
                      {formatPrice(product.colors.reduce((sum, color) => {
                        if (color.isAvailable === false) return sum;
                        let qty;
                        if (isWeightBased) {
                          qty = color.quantity || color.totalQuantity || color.totalForColor || 0;
                        } else {
                          qty = (color.sizeQuantities || []).reduce((s, sq) => {
                            if (sq.isAvailable !== false) return s + sq.quantity;
                            return s;
                          }, 0);
                        }
                        return sum + (qty * (color.unitPrice || 0));
                      }, 0))}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Customer Instructions - Read Only */}
        <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Customer Instructions (Read Only)
            </label>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 min-h-[80px]">
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {globalNote || 'No instructions provided by customer.'}
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            These instructions were provided by the customer and cannot be edited.
          </p>
        </div>
        
        {/* Internal Admin Note */}
        <div className="mt-4 bg-white rounded-xl border border-gray-200 p-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Internal Admin Note (Not visible to customer)
          </label>
          <textarea
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent"
            placeholder="Add internal notes for reference (these will not be shown to the customer)..."
          />
          <p className="text-xs text-gray-400 mt-1">
            This note is for internal use only and will not be visible to the customer.
          </p>
        </div>
        
        {/* Quotation Summary */}
        <div className="mt-6 bg-gradient-to-r from-[#6B4F3A]/10 to-transparent rounded-xl border border-[#6B4F3A]/20 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quotation Summary</h3>
              <p className="text-sm text-gray-500">
                Total Quantity: {totalQuantity} {mainUnit}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-[#6B4F3A]">{formatPrice(totalAmount)}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <Link
            href="/admin/inquiries"
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmitQuotation}
            disabled={saving}
            className="flex items-center justify-center gap-2 px-6 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Submit Quotation to Customer
          </button>
        </div>
      </div>
    </div>
  );
}