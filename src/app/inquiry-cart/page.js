



// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import {
//   Trash2,
//   Plus,
//   ShoppingCart,
//   ArrowLeft,
//   Send,
//   FileText,
//   Upload,
//   X,
//   Loader2,
//   AlertCircle,
//   CheckCircle,
//   ChevronDown,
//   ChevronUp,
//   Save,
//   Scale,
//   Package,
//   Leaf,
//   Globe,
//   Award,
//   Minus,
//   ShoppingBag,
//   CreditCard,
//   Shield,
//   Truck
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import WhatsAppButton from '../components/layout/WhatsAppButton';

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

// const getUnitFullLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'Kilograms';
//     case 'ton': return 'Metric Tons';
//     default: return 'Pieces';
//   }
// };

// // Helper function to get price based on quantity for a specific color
// const getPriceForQuantity = (quantity, productDetail, basePrice, orderUnit = 'piece') => {
//   if (!productDetail?.quantityBasedPricing || productDetail.quantityBasedPricing.length === 0) {
//     return basePrice;
//   }
  
//   const sortedTiers = [...productDetail.quantityBasedPricing].sort((a, b) => {
//     const aMin = parseInt(a.range.split('-')[0] || a.range.replace('+', ''));
//     const bMin = parseInt(b.range.split('-')[0] || b.range.replace('+', ''));
//     return aMin - bMin;
//   });
  
//   for (const tier of sortedTiers) {
//     const range = tier.range;
//     if (range.includes('-')) {
//       const [min, max] = range.split('-').map(Number);
//       if (quantity >= min && quantity <= max) {
//         return tier.price;
//       }
//     }
//     else if (range.includes('+')) {
//       const minQty = parseInt(range.replace('+', ''));
//       if (quantity >= minQty) {
//         return tier.price;
//       }
//     }
//   }
  
//   const highestTier = sortedTiers[sortedTiers.length - 1];
//   if (highestTier && highestTier.range.includes('-') && quantity > parseInt(highestTier.range.split('-')[1])) {
//     return highestTier.price;
//   }
  
//   return basePrice;
// };

// export default function InquiryCartPage() {
//   const router = useRouter();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [specialInstructions, setSpecialInstructions] = useState('');
//   const [attachments, setAttachments] = useState([]);
//   const [uploading, setUploading] = useState(false);
  
//   const [expandedItems, setExpandedItems] = useState({});
//   const [selectedColors, setSelectedColors] = useState({});
//   const [colorQuantities, setColorQuantities] = useState({});
//   const [addingToCart, setAddingToCart] = useState({});
//   const [productDetails, setProductDetails] = useState({});
//   const [editingColors, setEditingColors] = useState({});
//   const [editedQuantities, setEditedQuantities] = useState({});
//   const [savingEdits, setSavingEdits] = useState({});
//   const [deletingColor, setDeletingColor] = useState({});
//   const [weightQuantities, setWeightQuantities] = useState({});
  
//   const [deleteModal, setDeleteModal] = useState({ show: false, itemId: null, colorIndex: null, colorName: '', productName: '' });
//   const [productDeleteModal, setProductDeleteModal] = useState({ show: false, itemId: null, productName: '' });
//   const [clearCartModal, setClearCartModal] = useState({ show: false });

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/inquiry-cart', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         data.data.items.forEach(item => {
//           fetchProductDetails(item.productId);
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//       toast.error('Failed to load cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProductDetails = async (productId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/products/${productId}`);
//       const data = await response.json();
//       if (data.success) {
//         setProductDetails(prev => ({ ...prev, [productId]: data.data }));
//       }
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     }
//   };

//   const toggleExpand = (itemId) => {
//     setExpandedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
//   };

//   const isColorBelowMOQ = (item, color) => {
//     const isWeightBased = item?.orderUnit === 'kg' || item?.orderUnit === 'ton';
//     let colorTotal = 0;
//     if (isWeightBased) {
//       colorTotal = color.quantity || color.totalQuantity || 0;
//     } else {
//       colorTotal = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
//     }
//     return colorTotal > 0 && colorTotal < item?.moq;
//   };

//   const hasBelowMOQColor = (item) => {
//     if (!item?.colors) return false;
//     return item.colors.some(color => isColorBelowMOQ(item, color));
//   };

//   const showDeleteModal = (itemId, colorIndex, colorName, productName) => {
//     setDeleteModal({ show: true, itemId, colorIndex, colorName, productName });
//   };

//   const handleDeleteColor = async () => {
//     const { itemId, colorIndex } = deleteModal;
//     closeDeleteModal();
    
//     setDeletingColor(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: true }));
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/inquiry-cart/item/${itemId}/color/${colorIndex}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setCart(data.data);
//         toast.success('Color removed successfully');
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error('Failed to remove color');
//       }
//     } catch (error) {
//       toast.error('Failed to remove color');
//     } finally {
//       setDeletingColor(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: false }));
//     }
//   };

//   const closeDeleteModal = () => {
//     setDeleteModal({ show: false, itemId: null, colorIndex: null, colorName: '', productName: '' });
//   };

//   const showProductDeleteModal = (itemId, productName) => {
//     setProductDeleteModal({ show: true, itemId, productName });
//   };

//   const handleProductDeleteConfirm = async () => {
//     const { itemId } = productDeleteModal;
//     setProductDeleteModal({ show: false, itemId: null, productName: '' });
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/inquiry-cart/item/${itemId}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setCart(data.data);
//         toast.success('Product removed from cart');
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error('Failed to remove product');
//       }
//     } catch (error) {
//       toast.error('Failed to remove product');
//     }
//   };

//   const closeProductDeleteModal = () => {
//     setProductDeleteModal({ show: false, itemId: null, productName: '' });
//   };

//   const showClearCartModal = () => {
//     setClearCartModal({ show: true });
//   };

//   const handleClearCartConfirm = async () => {
//     setClearCartModal({ show: false });
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/inquiry-cart/clear', {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setCart({ ...cart, items: [], totalItems: 0, totalQuantity: 0, estimatedTotal: 0 });
//         toast.success('Cart cleared successfully');
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error('Failed to clear cart');
//       }
//     } catch (error) {
//       toast.error('Failed to clear cart');
//     }
//   };

//   const closeClearCartModal = () => {
//     setClearCartModal({ show: false });
//   };

//   const handleSaveColorEdits = async (itemId, colorIndex) => {
//     const item = cart.items.find(i => i._id === itemId);
//     if (!item) return;
    
//     const productDetail = productDetails[item.productId];
//     const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
//     const unitLabel = getUnitLabel(item.orderUnit);
    
//     setSavingEdits(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: true }));
    
//     try {
//       const token = localStorage.getItem('token');
//       let updatedColors = [...item.colors];
//       let updatedTotalQuantity = 0;
//       let colorTotal = 0;
      
//       if (isWeightBased) {
//         const newQuantity = weightQuantities[`${itemId}-${colorIndex}`] ?? (item.colors[colorIndex]?.quantity || item.colors[colorIndex]?.totalQuantity || 0);
        
//         if (newQuantity > 0 && newQuantity < item.moq) {
//           toast.error(`Quantity must meet MOQ of ${item.moq} ${unitLabel}. Current: ${newQuantity} ${unitLabel}`);
//           setSavingEdits(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: false }));
//           return;
//         }
        
//         colorTotal = newQuantity;
//         const colorUnitPrice = getPriceForQuantity(newQuantity, productDetail, item.unitPrice, item.orderUnit);
        
//         updatedColors[colorIndex] = {
//           ...updatedColors[colorIndex],
//           quantity: newQuantity,
//           totalQuantity: newQuantity,
//           totalForColor: newQuantity,
//           unitPrice: colorUnitPrice
//         };
        
//         updatedTotalQuantity = updatedColors.reduce((sum, color) => sum + (color.totalQuantity || 0), 0);
//       } else {
//         const editedData = editedQuantities[`${itemId}-${colorIndex}`] || {};
//         const allSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
//         const sizeQuantitiesArray = allSizes.map(size => ({ size, quantity: editedData[size] || 0 }));
//         colorTotal = sizeQuantitiesArray.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
        
//         if (colorTotal > 0 && colorTotal < item.moq) {
//           toast.error(`This color must meet MOQ of ${item.moq} ${unitLabel}. Current total: ${colorTotal} ${unitLabel}.`);
//           setSavingEdits(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: false }));
//           return;
//         }
        
//         const colorUnitPrice = getPriceForQuantity(colorTotal, productDetail, item.unitPrice, item.orderUnit);
        
//         updatedColors[colorIndex] = {
//           ...updatedColors[colorIndex],
//           sizeQuantities: sizeQuantitiesArray,
//           totalQuantity: colorTotal,
//           totalForColor: colorTotal,
//           unitPrice: colorUnitPrice
//         };
        
//         updatedTotalQuantity = updatedColors.reduce((sum, color) => sum + (color.totalQuantity || 0), 0);
//       }

//       const cartItem = {
//         productId: item.productId,
//         productName: item.productName,
//         colors: updatedColors,
//         totalQuantity: updatedTotalQuantity,
//         unitPrice: item.unitPrice,
//         moq: item.moq,
//         productImage: item.productImage,
//         specialInstructions: item.specialInstructions,
//         orderUnit: item.orderUnit
//       };

//       const response = await fetch('http://localhost:5000/api/inquiry-cart/add', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify(cartItem)
//       });

//       const data = await response.json();
//       if (data.success) {
//         setCart(data.data);
//         setEditingColors(prev => { const newState = { ...prev }; delete newState[`${itemId}-${colorIndex}`]; return newState; });
//         toast.success(`Quantities updated!`);
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to update quantities');
//       }
//     } catch (error) {
//       toast.error('Failed to update quantities');
//     } finally {
//       setSavingEdits(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: false }));
//     }
//   };

//   const toggleEditColor = (itemId, colorIndex) => {
//     const key = `${itemId}-${colorIndex}`;
//     setEditingColors(prev => ({ ...prev, [key]: !prev[key] }));
    
//     const item = cart.items.find(i => i._id === itemId);
//     const color = item?.colors[colorIndex];
    
//     if (item?.orderUnit === 'kg' || item?.orderUnit === 'ton') {
//       setWeightQuantities(prev => ({ ...prev, [key]: color?.quantity || color?.totalQuantity || 0 }));
//     } else {
//       const quantitiesObj = {};
//       (color?.sizeQuantities || []).forEach(sq => { quantitiesObj[sq.size] = sq.quantity; });
//       setEditedQuantities(prev => ({ ...prev, [key]: quantitiesObj }));
//     }
//   };

//   const cancelEdit = (itemId, colorIndex) => {
//     const key = `${itemId}-${colorIndex}`;
//     setEditingColors(prev => { const newState = { ...prev }; delete newState[key]; return newState; });
//   };

//   const handleWeightQuantityChange = (itemId, colorIndex, value) => {
//     setWeightQuantities(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: parseInt(value) || 0 }));
//   };

//   const handleEditQuantityChange = (itemId, colorIndex, size, value) => {
//     const key = `${itemId}-${colorIndex}`;
//     setEditedQuantities(prev => ({ ...prev, [key]: { ...(prev[key] || {}), [size]: parseInt(value) || 0 } }));
//   };

//   const handleColorSelect = (itemId, color) => {
//     setSelectedColors(prev => ({ ...prev, [itemId]: color }));
//     const item = cart?.items?.find(i => i._id === itemId);
//     const isWeightBased = item?.orderUnit === 'kg' || item?.orderUnit === 'ton';
    
//     if (isWeightBased) {
//       setColorQuantities(prev => ({ ...prev, [itemId]: 0 }));
//     } else if (!colorQuantities[itemId]) {
//       setColorQuantities(prev => ({ ...prev, [itemId]: {} }));
//     }
//   };

//   const handleQuantityChange = (itemId, size, value) => {
//     setColorQuantities(prev => ({
//       ...prev,
//       [itemId]: { ...(prev[itemId] || {}), [size]: parseInt(value) || 0 }
//     }));
//   };

//   const handleSimpleQuantityChange = (itemId, value) => {
//     setColorQuantities(prev => ({ ...prev, [itemId]: parseInt(value) || 0 }));
//   };

//   const getNewColorTotal = (itemId, item) => {
//     const isWeightBased = item?.orderUnit === 'kg' || item?.orderUnit === 'ton';
//     if (isWeightBased) {
//       const qty = colorQuantities[itemId];
//       return typeof qty === 'number' ? qty : 0;
//     }
//     const quantities = colorQuantities[itemId] || {};
//     return Object.values(quantities).reduce((sum, qty) => sum + (parseInt(qty) || 0), 0);
//   };

//   const getNewColorUnitPrice = (itemId, item) => {
//     const totalQty = getNewColorTotal(itemId, item);
//     const productDetail = productDetails[item?.productId];
//     return getPriceForQuantity(totalQty, productDetail, item?.unitPrice || 0, item?.orderUnit);
//   };

//   const handleAddColorToCart = async (item) => {
//     const selectedColor = selectedColors[item._id];
//     if (!selectedColor) {
//       toast.error('Please select a color');
//       return;
//     }

//     const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
//     const totalQty = getNewColorTotal(item._id, item);
//     const unitLabel = getUnitLabel(item.orderUnit);

//     if (totalQty === 0) {
//       toast.error(`Please enter quantity in ${unitLabel}`);
//       return;
//     }

//     if (totalQty < item.moq) {
//       toast.error(`This color must meet MOQ of ${item.moq} ${unitLabel}. Current: ${totalQty} ${unitLabel}.`);
//       return;
//     }

//     setAddingToCart(prev => ({ ...prev, [item._id]: true }));

//     try {
//       const token = localStorage.getItem('token');
//       const existingColors = item.colors || [];
      
//       if (existingColors.some(c => c.color?.code === selectedColor.code)) {
//         toast.error('This color is already in your cart');
//         setAddingToCart(prev => ({ ...prev, [item._id]: false }));
//         return;
//       }

//       const productDetail = productDetails[item.productId];
//       const colorUnitPrice = getPriceForQuantity(totalQty, productDetail, item.unitPrice, item.orderUnit);

//       let newColorData;
//       if (isWeightBased) {
//         newColorData = {
//           color: { code: selectedColor.code, name: selectedColor.name || selectedColor.code },
//           quantity: totalQty,
//           totalQuantity: totalQty,
//           totalForColor: totalQty,
//           unitPrice: colorUnitPrice
//         };
//       } else {
//         const allSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
//         const quantities = colorQuantities[item._id] || {};
//         const sizeQuantitiesArray = allSizes.map(size => ({ size, quantity: quantities[size] || 0 }));
//         newColorData = {
//           color: { code: selectedColor.code, name: selectedColor.name || selectedColor.code },
//           sizeQuantities: sizeQuantitiesArray,
//           totalQuantity: totalQty,
//           totalForColor: totalQty,
//           unitPrice: colorUnitPrice
//         };
//       }

//       const updatedColors = [...existingColors, newColorData];
//       const updatedTotalQuantity = updatedColors.reduce((sum, color) => sum + (color.totalQuantity || 0), 0);

//       const cartItem = {
//         productId: item.productId,
//         productName: item.productName,
//         colors: updatedColors,
//         totalQuantity: updatedTotalQuantity,
//         unitPrice: item.unitPrice,
//         moq: item.moq,
//         productImage: item.productImage,
//         orderUnit: item.orderUnit
//       };

//       const response = await fetch('http://localhost:5000/api/inquiry-cart/add', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify(cartItem)
//       });

//       const data = await response.json();
//       if (data.success) {
//         toast.success(`${selectedColor.code || 'Color'} added! (${totalQty} ${unitLabel})`);
//         setSelectedColors(prev => { const newState = { ...prev }; delete newState[item._id]; return newState; });
//         setColorQuantities(prev => { const newState = { ...prev }; delete newState[item._id]; return newState; });
//         setCart(data.data);
//         window.dispatchEvent(new Event('cart-update'));
//         setExpandedItems(prev => ({ ...prev, [item._id]: false }));
//       } else {
//         toast.error(data.error || 'Failed to add color');
//       }
//     } catch (error) {
//       toast.error('Failed to add color');
//     } finally {
//       setAddingToCart(prev => ({ ...prev, [item._id]: false }));
//     }
//   };

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('File too large, max 5MB');
//       return;
//     }

//     const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error('Only PNG, JPEG, PDF files are allowed');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('attachment', file);

//     setUploading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/inquiry-cart/upload', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` },
//         body: formData
//       });
//       const data = await response.json();
//       if (data.success) {
//         setAttachments([...attachments, data.data]);
//         toast.success('File uploaded successfully');
//         e.target.value = '';
//       } else {
//         toast.error('Upload failed');
//       }
//     } catch (error) {
//       toast.error('Upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const removeAttachment = (index) => {
//     setAttachments(attachments.filter((_, i) => i !== index));
//   };

//   const handleSubmitInquiry = async () => {
//     if (!cart?.items?.length) {
//       toast.error('Your cart is empty');
//       return;
//     }

//     if (cart.items.some(item => hasBelowMOQColor(item))) {
//       toast.error('Cannot submit. Some colors are below MOQ. Please adjust quantities.');
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/inquiry-cart/submit', {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ specialInstructions, attachments })
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success('Inquiry submitted successfully!');
//         router.push('/customer/inquiries');
//       } else {
//         toast.error(data.error || 'Failed to submit inquiry');
//       }
//     } catch (error) {
//       toast.error('Failed to submit inquiry');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-white flex items-center justify-center">
//           <div className="text-center">
//             <Loader2 className="w-10 h-10 animate-spin text-[#6B4F3A] mx-auto mb-4" />
//             <p className="text-gray-500">Loading your cart...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-white pt-20">
//         {/* Hero Section */}
//         <div className="bg-white border-b border-gray-100">
//           <div className="container mx-auto px-4 py-8">
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div>
//                 <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#6B4F3A] transition-colors mb-2">
//                   <ArrowLeft className="w-4 h-4" />
//                   Continue Shopping
//                 </Link>
//                 <h1 className="text-3xl md:text-4xl font-bold text-[#6B4F3A]" style={{ fontFamily: 'Playfair Display, serif' }}>
//                   Your Cart
//                 </h1>
//                 <p className="text-gray-500 mt-1">Review and manage your inquiry items</p>
//               </div>
//               {cart?.items?.length > 0 && (
//                 <button
//                   onClick={showClearCartModal}
//                   className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                   Clear Cart
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="container mx-auto px-4 py-8">
//           {!cart?.items?.length ? (
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
//               <div className="w-24 h-24 bg-[#F5E6D3] rounded-full flex items-center justify-center mx-auto mb-6">
//                 <ShoppingBag className="w-12 h-12 text-[#6B4F3A]" />
//               </div>
//               <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
//               <p className="text-gray-500 mb-8">Looks like you haven't added any products yet.</p>
//               <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#6B4F3A] text-white rounded-xl hover:bg-[#8B6B51] transition-colors">
//                 Browse Products <ArrowLeft className="w-4 h-4 rotate-180" />
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Cart Items */}
//               <div className="lg:col-span-2 space-y-4">
//                 {cart.items.map((item) => {
//                   const productDetail = productDetails[item.productId];
//                   const availableColors = productDetail?.colors || [];
//                   const availableSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
//                   const isExpanded = expandedItems[item._id];
//                   const selectedColor = selectedColors[item._id];
//                   const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
//                   const unitLabel = getUnitLabel(item.orderUnit);
//                   const unitFullLabel = getUnitFullLabel(item.orderUnit);
//                   const isAdding = addingToCart[item._id];
//                   const newColorTotal = getNewColorTotal(item._id, item);
//                   const newColorUnitPrice = getNewColorUnitPrice(item._id, item);
//                   const meetsMOQ = newColorTotal >= item.moq;

//                   return (
//                     <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
//                       {/* Product Header */}
//                       <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-white to-[#FAF7F2]">
//                         <div className="flex items-start justify-between">
//                           <div className="flex items-center gap-4">
//                             <div className="w-16 h-16 bg-[#FAF7F2] rounded-xl overflow-hidden flex-shrink-0">
//                               <img src={item.productImage || 'https://via.placeholder.com/64'} alt={item.productName} className="w-full h-full object-cover" />
//                             </div>
//                             <div>
//                               <Link href={`/productDetails?id=${item.productId}`} className="block">
//                                 <h3 className="font-semibold text-gray-900 hover:text-[#6B4F3A] transition-colors">{item.productName}</h3>
//                               </Link>
//                               <div className="flex items-center gap-2 mt-1">
//                                 <span className="px-2 py-0.5 bg-[#F5E6D3] text-[#6B4F3A] text-xs rounded-full">{unitFullLabel}</span>
//                                 <span className="text-xs text-gray-500">MOQ: {item.moq} {unitLabel}/color</span>
//                               </div>
//                             </div>
//                           </div>
//                           <button onClick={() => showProductDeleteModal(item._id, item.productName)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Colors Section */}
//                       <div className="p-5">
//                         <div className="flex items-center justify-between mb-4">
//                           <h4 className="text-sm font-medium text-gray-700">Colors & Quantities</h4>
//                           {availableColors.length > 0 && (
//                             <button onClick={() => toggleExpand(item._id)} className="flex items-center gap-1 text-xs text-[#6B4F3A] hover:text-[#8B6B51] transition-colors">
//                               {isExpanded ? <><ChevronUp className="w-3 h-3" /> Hide</> : <><ChevronDown className="w-3 h-3" /> Add Color</>}
//                             </button>
//                           )}
//                         </div>

//                         <div className="space-y-3">
//                           {item.colors?.map((colorItem, colorIndex) => {
//                             const editKey = `${item._id}-${colorIndex}`;
//                             const isEditing = editingColors[editKey];
//                             const isSaving = savingEdits[editKey];
//                             const isDeleting = deletingColor[editKey];
                            
//                             let colorTotal = 0;
//                             let colorUnitPrice = colorItem.unitPrice || 0;
                            
//                             if (isWeightBased) {
//                               colorTotal = colorItem.quantity || colorItem.totalQuantity || 0;
//                               colorUnitPrice = colorItem.unitPrice || getPriceForQuantity(colorTotal, productDetail, item.unitPrice, item.orderUnit);
//                             } else {
//                               colorTotal = (colorItem.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
//                               colorUnitPrice = colorItem.unitPrice || getPriceForQuantity(colorTotal, productDetail, item.unitPrice, item.orderUnit);
//                             }
                            
//                             const colorSubtotal = colorTotal * colorUnitPrice;
//                             const colorName = colorItem.color?.name || colorItem.color?.code || `Color ${colorIndex + 1}`;
//                             const isBelowMOQ = colorTotal > 0 && colorTotal < item.moq;

//                             return (
//                               <div key={colorIndex} className={`bg-[#FAF7F2] rounded-xl p-4 border ${isBelowMOQ ? 'border-amber-200' : 'border-transparent'}`}>
//                                 <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
//                                   <div className="flex items-center gap-3">
//                                     <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: colorItem.color?.code || '#CCCCCC' }} />
                                 
//                                     {isBelowMOQ && (
//                                       <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Below MOQ</span>
//                                     )}
//                                   </div>
//                                   <div className="flex items-center gap-2">
//                                     <div className="text-right">
//                                       <div className="text-sm font-bold text-[#6B4F3A]">{formatPrice(colorSubtotal)}</div>
//                                       <div className="text-xs text-gray-500">{colorTotal} {unitLabel} @ {formatPrice(colorUnitPrice)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}</div>
//                                     </div>
//                                     <button onClick={() => showDeleteModal(item._id, colorIndex, colorName, item.productName)} disabled={isDeleting} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
//                                       {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
//                                     </button>
//                                     {!isEditing ? (
//                                       <button onClick={() => toggleEditColor(item._id, colorIndex)} className="p-1.5 text-gray-400 hover:text-[#6B4F3A] hover:bg-[#F5E6D3] rounded-lg transition-colors">
//                                         <Plus className="w-3 h-3" />
//                                       </button>
//                                     ) : (
//                                       <div className="flex gap-1">
//                                         <button onClick={() => handleSaveColorEdits(item._id, colorIndex)} disabled={isSaving} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
//                                           {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
//                                         </button>
//                                         <button onClick={() => cancelEdit(item._id, colorIndex)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
//                                           <X className="w-3 h-3" />
//                                         </button>
//                                       </div>
//                                     )}
//                                   </div>
//                                 </div>

//                                 {/* Quantity Inputs */}
//                                 {isWeightBased ? (
//                                   <div className="mt-2">
//                                     <label className="block text-xs text-gray-500 mb-1">Quantity ({unitLabel})</label>
//                                     <input type="number" min="0" value={isEditing ? (weightQuantities[editKey] ?? colorTotal) : colorTotal} onChange={(e) => handleWeightQuantityChange(item._id, colorIndex, e.target.value)} disabled={!isEditing} className="w-36 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent disabled:bg-gray-100" />
//                                   </div>
//                                 ) : (
//                                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
//                                     {availableSizes.map((size) => {
//                                       let currentQty = 0;
//                                       if (isEditing) {
//                                         currentQty = editedQuantities[editKey]?.[size] !== undefined ? editedQuantities[editKey][size] : ((colorItem.sizeQuantities || []).find(sq => sq.size === size)?.quantity || 0);
//                                       } else {
//                                         currentQty = (colorItem.sizeQuantities || []).find(sq => sq.size === size)?.quantity || 0;
//                                       }
//                                       return (
//                                         <div key={size} className="flex items-center gap-2">
//                                           <span className="text-xs text-gray-500 w-8">{size}</span>
//                                           <input type="number" min="0" value={currentQty || ''} onChange={(e) => handleEditQuantityChange(item._id, colorIndex, size, e.target.value)} disabled={!isEditing} className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] disabled:bg-gray-100" placeholder="0" />
//                                         </div>
//                                       );
//                                     })}
//                                   </div>
//                                 )}

//                                 {isEditing && (
//                                   <div className="mt-2 pt-2 text-xs text-gray-500">
//                                     Preview: {(() => {
//                                       let tempTotal = 0;
//                                       if (isWeightBased) tempTotal = weightQuantities[editKey] || 0;
//                                       else tempTotal = Object.values(editedQuantities[editKey] || {}).reduce((s, v) => s + (v || 0), 0);
//                                       const tempPrice = getPriceForQuantity(tempTotal, productDetail, item.unitPrice, item.orderUnit);
//                                       return `${tempTotal} ${unitLabel} @ ${formatPrice(tempPrice)}/${unitLabel === 'pcs' ? 'pc' : unitLabel} = ${formatPrice(tempTotal * tempPrice)}`;
//                                     })()}
//                                   </div>
//                                 )}
//                               </div>
//                             );
//                           })}

//                           {hasBelowMOQColor(item) && (
//                             <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl text-amber-700 text-sm">
//                               <AlertCircle className="w-4 h-4" />
//                               <span>Some colors are below MOQ ({item.moq} {unitLabel}). Please adjust quantities.</span>
//                             </div>
//                           )}

//                           {isExpanded && (
//                             <div className="mt-4 p-4 bg-[#F5E6D3] rounded-xl">
//                               <h5 className="font-medium text-[#6B4F3A] mb-3">Add Another Color</h5>
                              
//                               {availableColors.length > 0 && (
//                                 <div className="mb-4">
//                                   <label className="block text-xs text-[#6B4F3A] mb-2">Select Color:</label>
//                                   <div className="flex flex-wrap gap-2">
//                                     {availableColors.map((color, idx) => {
//                                       const colorExists = item.colors?.some(c => c.color?.code === color.code);
//                                       return (
//                                         <button key={idx} onClick={() => !colorExists && handleColorSelect(item._id, color)} disabled={colorExists} className={`relative p-0.5 rounded-full transition-all ${selectedColor?.code === color.code ? 'ring-2 ring-[#6B4F3A] ring-offset-2' : colorExists ? 'opacity-40 cursor-not-allowed' : 'hover:ring-2 hover:ring-[#6B4F3A]/50'}`}>
//                                           <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color.code }} />
//                                           {colorExists && <CheckCircle className="absolute -top-1 -right-1 w-3.5 h-3.5 text-green-600 bg-white rounded-full" />}
//                                         </button>
//                                       );
//                                     })}
//                                   </div>
//                                 </div>
//                               )}

//                               {selectedColor && (
//                                 <>
//                                   <div className="mb-3">
//                                     <label className="block text-xs text-[#6B4F3A] mb-2">Quantity ({unitLabel}):</label>
//                                     {isWeightBased ? (
//                                       <input type="number" min="0" value={colorQuantities[item._id] || ''} onChange={(e) => handleSimpleQuantityChange(item._id, e.target.value)} className="w-40 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A]" placeholder={`Enter ${unitLabel}`} />
//                                     ) : (
//                                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                                         {availableSizes.map((size, idx) => (
//                                           <div key={idx}>
//                                             <label className="text-xs text-gray-600 mb-1 block">{size}</label>
//                                             <input type="number" min="0" value={(colorQuantities[item._id] || {})[size] || ''} onChange={(e) => handleQuantityChange(item._id, size, e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A]" placeholder="0" />
//                                           </div>
//                                         ))}
//                                       </div>
//                                     )}
//                                   </div>

//                                   {newColorTotal > 0 && (
//                                     <div className="mb-3 p-2 bg-white rounded-lg">
//                                       <div className="flex justify-between text-sm">
//                                         <span className="text-gray-600">Preview:</span>
//                                         <span className="font-medium text-[#6B4F3A]">{newColorTotal} {unitLabel} @ {formatPrice(newColorUnitPrice)}/{unitLabel === 'pcs' ? 'pc' : unitLabel} = {formatPrice(newColorTotal * newColorUnitPrice)}</span>
//                                       </div>
//                                     </div>
//                                   )}

//                                   {newColorTotal > 0 && !meetsMOQ && (
//                                     <div className="mb-3 p-2 bg-amber-50 rounded-lg text-amber-700 text-sm">⚠️ Need {item.moq - newColorTotal} more {unitLabel} to meet MOQ</div>
//                                   )}

//                                   {meetsMOQ && newColorTotal > 0 && (
//                                     <div className="mb-3 p-2 bg-green-50 rounded-lg text-green-700 text-sm">✓ Meets MOQ!</div>
//                                   )}

//                                   <button onClick={() => handleAddColorToCart(item)} disabled={isAdding || !meetsMOQ || newColorTotal === 0} className="w-full py-2.5 bg-[#6B4F3A] text-white rounded-xl hover:bg-[#8B6B51] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
//                                     {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
//                                     Add {newColorTotal} {unitLabel} @ {formatPrice(newColorUnitPrice)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}
//                                   </button>
//                                 </>
//                               )}
//                             </div>
//                           )}
//                         </div>

//                         {item.specialInstructions && (
//                           <div className="mt-4 p-3 bg-[#F5E6D3] rounded-xl">
//                             <div className="flex gap-2">
//                               <FileText className="w-4 h-4 text-[#6B4F3A]" />
//                               <div><p className="text-xs font-medium text-[#6B4F3A]">Special Instructions:</p><p className="text-xs text-gray-700 mt-0.5">{item.specialInstructions}</p></div>
//                             </div>
//                           </div>
//                         )}

//                         <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
//                           <div><span className="text-sm text-gray-500">Product Total:</span><span className="ml-2 text-xl font-bold text-[#6B4F3A]">{formatPrice(item.colors?.reduce((sum, color) => { let ct = 0; if (isWeightBased) ct = color.quantity || color.totalQuantity || 0; else ct = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0); const cup = color.unitPrice || getPriceForQuantity(ct, productDetail, item.unitPrice, item.orderUnit); return sum + (ct * cup); }, 0) || 0)}</span></div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Order Summary */}
//              {/* Order Summary */}
// <div className="lg:col-span-1">
//   <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
//     <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Order Summary</h2>
    
//     <div className="space-y-3 mb-5">
//       <div className="flex justify-between text-sm">
//         <span className="text-gray-500">Total Products:</span>
//         <span className="font-medium">{cart.totalItems}</span>
//       </div>
//       <div className="flex justify-between text-sm">
//         <span className="text-gray-500">Total Quantity:</span>
//         <span className="font-medium">{cart.totalQuantity} {cart.items[0]?.orderUnit === 'kg' ? 'kg' : cart.items[0]?.orderUnit === 'ton' ? 'MT' : 'pcs'}</span>
//       </div>
      
//       {/* Item Breakdown - Group by Product */}
//       <div className="pt-3 max-h-[350px] overflow-y-auto space-y-3 border-t border-gray-100">
//         {cart.items.map((item) => {
//           const productDetail = productDetails[item.productId];
//           const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
//           const unitLabel = getUnitLabel(item.orderUnit);
//           const productColors = item.colors?.filter(color => {
//             let ct = 0;
//             if (isWeightBased) ct = color.quantity || color.totalQuantity || 0;
//             else ct = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
//             return ct > 0;
//           }) || [];
          
//           if (productColors.length === 0) return null;
          
//           return (
//             <div key={item._id} className="border-b border-gray-100 pb-3 last:border-0">
//               {/* Product Name */}
//               <div className="font-medium text-gray-800 mb-2 text-sm">
//                 {item.productName}
//               </div>
              
//               {/* Colors under this product */}
//               <div className="space-y-1.5 pl-2">
//                 {productColors.map((color, idx) => {
//                   let colorTotal = 0;
//                   if (isWeightBased) {
//                     colorTotal = color.quantity || color.totalQuantity || 0;
//                   } else {
//                     colorTotal = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
//                   }
//                   if (colorTotal === 0) return null;
                  
//                   const colorUnitPrice = color.unitPrice || getPriceForQuantity(colorTotal, productDetail, item.unitPrice, item.orderUnit);
//                   const colorSubtotal = colorTotal * colorUnitPrice;
//                   const colorName = color.color?.name || color.color?.code || `Color ${idx + 1}`;
//                   const isBelowMOQ = colorTotal < item.moq;
                  
//                   return (
//                     <div key={`${item._id}-${idx}`} className="flex items-center justify-between text-xs">
//                       <div className="flex items-center gap-2 flex-1">
//                         <div 
//                           className="w-2.5 h-2.5 rounded-full shadow-sm flex-shrink-0"
//                           style={{ backgroundColor: color.color?.code || '#CCCCCC' }}
//                         />
//                         <span className={`text-gray-600 ${isBelowMOQ ? 'text-amber-600' : ''}`}>
                        
//                           {isBelowMOQ && <span className="ml-1 text-[10px] text-amber-500">(Below MOQ)</span>}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <span className="text-gray-500 text-[10px]">{colorTotal} {unitLabel}</span>
//                         <span className={`font-semibold ${isBelowMOQ ? 'text-amber-600' : 'text-[#6B4F3A]'}`}>
//                           {formatPrice(colorSubtotal)}
//                         </span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {/* Product Subtotal */}
//               <div className="flex justify-end mt-2 pt-1 border-t border-gray-50">
//                 <span className="text-xs text-gray-500">Product Subtotal:</span>
//                 <span className="ml-2 text-sm font-semibold text-[#6B4F3A]">
//                   {formatPrice(productColors.reduce((sum, color) => {
//                     let ct = 0;
//                     if (isWeightBased) ct = color.quantity || color.totalQuantity || 0;
//                     else ct = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
//                     const cup = color.unitPrice || getPriceForQuantity(ct, productDetail, item.unitPrice, item.orderUnit);
//                     return sum + (ct * cup);
//                   }, 0))}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//       {/* Total */}
//       <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 mt-2">
//         <span>Estimated Total:</span>
//         <span className="text-[#6B4F3A]">
//           {formatPrice(cart.items?.reduce((total, item) => {
//             const pd = productDetails[item.productId];
//             const isWB = item.orderUnit === 'kg' || item.orderUnit === 'ton';
//             return total + (item.colors?.reduce((sum, color) => {
//               let ct = 0;
//               if (isWB) ct = color.quantity || color.totalQuantity || 0;
//               else ct = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
//               const cup = color.unitPrice || getPriceForQuantity(ct, pd, item.unitPrice, item.orderUnit);
//               return sum + (ct * cup);
//             }, 0) || 0);
//           }, 0) || 0)}
//         </span>
//       </div>
//     </div>

//     {/* Rest of the order summary (special instructions, attachments, submit button) */}
//     <div className="mb-5">
//       <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
//       <textarea 
//         value={specialInstructions} 
//         onChange={(e) => setSpecialInstructions(e.target.value)} 
//         rows="3" 
//         className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent resize-none" 
//         placeholder="Add special requirements..."
//       />
//     </div>

//     <div className="mb-5">
//       <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
//       <div className="space-y-2">
//         {attachments.map((file, idx) => (
//           <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
//             <div className="flex items-center gap-2">
//               <FileText className="w-4 h-4 text-gray-500"/>
//               <span className="text-xs truncate max-w-[150px]">{file.fileName}</span>
//             </div>
//             <button onClick={() => removeAttachment(idx)} className="p-1 hover:bg-gray-200 rounded">
//               <X className="w-3 h-3"/>
//             </button>
//           </div>
//         ))}
//         <label className="block">
//           <input type="file" onChange={handleFileUpload} className="hidden" disabled={uploading}/>
//           <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#6B4F3A] transition-colors">
//             {uploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Upload className="w-4 h-4"/>}
//             <span className="text-sm">{uploading ? 'Uploading...' : 'Upload File'}</span>
//           </div>
//         </label>
//         <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF (Max 5MB)</p>
//       </div>
//     </div>

//     <button 
//       onClick={handleSubmitInquiry} 
//       disabled={submitting || !cart.items.length || cart.items.some(item => hasBelowMOQColor(item))} 
//       className="w-full py-3 bg-[#6B4F3A] text-white font-semibold rounded-xl hover:bg-[#8B6B51] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//     >
//       {submitting ? <><Loader2 className="w-4 h-4 animate-spin"/> Submitting...</> : <><Send className="w-4 h-4"/> Submit Inquiry</>}
//     </button>

//     {cart.items.some(item => hasBelowMOQColor(item)) && (
//       <div className="mt-4 p-3 bg-amber-50 rounded-xl flex gap-2">
//         <AlertCircle className="w-4 h-4 text-amber-600"/>
//         <p className="text-xs text-amber-700">Some colors are below MOQ. Please adjust quantities.</p>
//       </div>
//     )}

//     <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-center">
//       <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
//         <Shield className="w-3.5 h-3.5"/>Secure Checkout
//       </div>
//       <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
//         <Truck className="w-3.5 h-3.5"/>Worldwide Shipping
//       </div>
//     </div>
//   </div>
// </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modals */}
//       {deleteModal.show && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl max-w-md w-full p-6"><div className="flex items-center gap-3 text-red-600 mb-4"><AlertCircle className="w-6 h-6"/><h3 className="text-lg font-semibold">Remove Color</h3></div><p className="text-gray-600 mb-6">Remove <span className="font-semibold">"{deleteModal.colorName}"</span> from cart?</p><div className="flex justify-end gap-3"><button onClick={closeDeleteModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button onClick={handleDeleteColor} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Remove</button></div></div></div>)}

//       {productDeleteModal.show && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl max-w-md w-full p-6"><div className="flex items-center gap-3 text-red-600 mb-4"><AlertCircle className="w-6 h-6"/><h3 className="text-lg font-semibold">Remove Product</h3></div><p className="text-gray-600 mb-6">Remove <span className="font-semibold">"{productDeleteModal.productName}"</span> from cart?</p><div className="flex justify-end gap-3"><button onClick={closeProductDeleteModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button onClick={handleProductDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Remove</button></div></div></div>)}

//       {clearCartModal.show && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl max-w-md w-full p-6"><div className="flex items-center gap-3 text-red-600 mb-4"><AlertCircle className="w-6 h-6"/><h3 className="text-lg font-semibold">Clear Cart</h3></div><p className="text-gray-600 mb-6">Remove all items from your cart?</p><div className="flex justify-end gap-3"><button onClick={closeClearCartModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button onClick={handleClearCartConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Clear All</button></div></div></div>)}

//       <Footer />
//       <WhatsAppButton />
//     </>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Plus,
  ShoppingCart,
  ArrowLeft,
  Send,
  FileText,
  Upload,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Save,
  Scale,
  Package,
  Leaf,
  Globe,
  Award,
  Minus,
  ShoppingBag,
  CreditCard,
  Shield,
  Truck,
  Eye,
  Clock,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/layout/WhatsAppButton';
import { motion } from 'framer-motion';

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

const getUnitFullLabel = (orderUnit) => {
  switch(orderUnit) {
    case 'kg': return 'Kilograms';
    case 'ton': return 'Metric Tons';
    default: return 'Pieces';
  }
};

// Helper function to get price based on quantity for a specific color
const getPriceForQuantity = (quantity, productDetail, basePrice, orderUnit = 'piece') => {
  if (!productDetail?.quantityBasedPricing || productDetail.quantityBasedPricing.length === 0) {
    return basePrice;
  }
  
  const sortedTiers = [...productDetail.quantityBasedPricing].sort((a, b) => {
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
    }
    else if (range.includes('+')) {
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
  
  return basePrice;
};

// Helper to get recently viewed products from localStorage
const getRecentlyViewedProducts = () => {
  if (typeof window === 'undefined') return [];
  try {
    const recent = localStorage.getItem('recentlyViewed');
    return recent ? JSON.parse(recent) : [];
  } catch {
    return [];
  }
};

// Helper to get product image URL
const getProductImage = (product) => {
  if (product.images && product.images.length > 0) {
    return product.images[0].url;
  }
  return 'https://via.placeholder.com/200';
};

// Related Product Card Component
const RelatedProductCard = ({ product }) => {
  const unitLabel = getUnitLabel(product.orderUnit);
  const firstTier = product.quantityBasedPricing?.[0];
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={() => window.location.href = `/productDetails?id=${product._id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100"
    >
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img 
          src={getProductImage(product)} 
          alt={product.productName} 
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500" 
        />
        {product.tags?.[0] && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full">
            {product.tags[0]}
          </span>
        )}
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start gap-1 mb-2">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 flex-1">{product.productName}</h3>
          <span className="font-bold text-[#6B4F3A] text-sm whitespace-nowrap">
            ${product.pricePerUnit?.toFixed(2) || '0.00'}
            <span className="text-gray-400 text-[10px]">/{unitLabel === 'pcs' ? 'pc' : unitLabel}</span>
          </span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-[8px] bg-gray-100 px-1.5 py-0.5 rounded">MOQ: {product.moq} {unitLabel}</span>
        </div>
        <div className="flex items-center gap-0.5 mb-2">
          {product.colors?.slice(0, 3).map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ backgroundColor: c.code }} />
          ))}
          {product.colors?.length > 3 && <span className="text-[7px] text-gray-400">+{product.colors.length - 3}</span>}
        </div>
        <button className="w-full py-2 bg-[#6B4F3A] text-white text-[11px] font-medium rounded-lg hover:bg-[#8B6B51] transition flex items-center justify-center gap-1">
          <ShoppingCart className="w-3 h-3" /> Add to Inquiry
        </button>
      </div>
    </motion.div>
  );
};

export default function InquiryCartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(false);
  
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [colorQuantities, setColorQuantities] = useState({});
  const [addingToCart, setAddingToCart] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const [editingColors, setEditingColors] = useState({});
  const [editedQuantities, setEditedQuantities] = useState({});
  const [savingEdits, setSavingEdits] = useState({});
  const [deletingColor, setDeletingColor] = useState({});
  const [weightQuantities, setWeightQuantities] = useState({});
  
  const [deleteModal, setDeleteModal] = useState({ show: false, itemId: null, colorIndex: null, colorName: '', productName: '' });
  const [productDeleteModal, setProductDeleteModal] = useState({ show: false, itemId: null, productName: '' });
  const [clearCartModal, setClearCartModal] = useState({ show: false });

  // Fetch recently viewed products
  useEffect(() => {
    fetchRecentlyViewed();
  }, []);

  const fetchRecentlyViewed = async () => {
    setLoadingRecent(true);
    try {
      const recentIds = getRecentlyViewedProducts();
      if (recentIds.length === 0) {
        setRecentlyViewed([]);
        setLoadingRecent(false);
        return;
      }
      
      // Fetch product details for each recently viewed ID
      const products = await Promise.all(
        recentIds.slice(0, 4).map(async (id) => {
          try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`);
            const data = await response.json();
            if (data.success) {
              return data.data;
            }
            return null;
          } catch {
            return null;
          }
        })
      );
      
      setRecentlyViewed(products.filter(p => p !== null && p._id !== cart?.items?.some(item => item.productId === p._id)));
    } catch (error) {
      console.error('Error fetching recently viewed:', error);
    } finally {
      setLoadingRecent(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/inquiry-cart', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        data.data.items.forEach(item => {
          fetchProductDetails(item.productId);
        });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`);
      const data = await response.json();
      if (data.success) {
        setProductDetails(prev => ({ ...prev, [productId]: data.data }));
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const isColorBelowMOQ = (item, color) => {
    const isWeightBased = item?.orderUnit === 'kg' || item?.orderUnit === 'ton';
    let colorTotal = 0;
    if (isWeightBased) {
      colorTotal = color.quantity || color.totalQuantity || 0;
    } else {
      colorTotal = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
    }
    return colorTotal > 0 && colorTotal < item?.moq;
  };

  const hasBelowMOQColor = (item) => {
    if (!item?.colors) return false;
    return item.colors.some(color => isColorBelowMOQ(item, color));
  };

  const showDeleteModal = (itemId, colorIndex, colorName, productName) => {
    setDeleteModal({ show: true, itemId, colorIndex, colorName, productName });
  };

  const handleDeleteColor = async () => {
    const { itemId, colorIndex } = deleteModal;
    closeDeleteModal();
    
    setDeletingColor(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: true }));
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/inquiry-cart/item/${itemId}/color/${colorIndex}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setCart(data.data);
        toast.success('Color removed successfully');
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error('Failed to remove color');
      }
    } catch (error) {
      toast.error('Failed to remove color');
    } finally {
      setDeletingColor(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: false }));
    }
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, itemId: null, colorIndex: null, colorName: '', productName: '' });
  };

  const showProductDeleteModal = (itemId, productName) => {
    setProductDeleteModal({ show: true, itemId, productName });
  };

  const handleProductDeleteConfirm = async () => {
    const { itemId } = productDeleteModal;
    setProductDeleteModal({ show: false, itemId: null, productName: '' });
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/inquiry-cart/item/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
        toast.success('Product removed from cart');
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error('Failed to remove product');
      }
    } catch (error) {
      toast.error('Failed to remove product');
    }
  };

  const closeProductDeleteModal = () => {
    setProductDeleteModal({ show: false, itemId: null, productName: '' });
  };

  const showClearCartModal = () => {
    setClearCartModal({ show: true });
  };

  const handleClearCartConfirm = async () => {
    setClearCartModal({ show: false });
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/inquiry-cart/clear', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCart({ ...cart, items: [], totalItems: 0, totalQuantity: 0, estimatedTotal: 0 });
        toast.success('Cart cleared successfully');
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error('Failed to clear cart');
      }
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const closeClearCartModal = () => {
    setClearCartModal({ show: false });
  };

  const handleSaveColorEdits = async (itemId, colorIndex) => {
    const item = cart.items.find(i => i._id === itemId);
    if (!item) return;
    
    const productDetail = productDetails[item.productId];
    const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
    const unitLabel = getUnitLabel(item.orderUnit);
    
    setSavingEdits(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: true }));
    
    try {
      const token = localStorage.getItem('token');
      let updatedColors = [...item.colors];
      let updatedTotalQuantity = 0;
      let colorTotal = 0;
      
      if (isWeightBased) {
        const newQuantity = weightQuantities[`${itemId}-${colorIndex}`] ?? (item.colors[colorIndex]?.quantity || item.colors[colorIndex]?.totalQuantity || 0);
        
        if (newQuantity > 0 && newQuantity < item.moq) {
          toast.error(`Quantity must meet MOQ of ${item.moq} ${unitLabel}. Current: ${newQuantity} ${unitLabel}`);
          setSavingEdits(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: false }));
          return;
        }
        
        colorTotal = newQuantity;
        const colorUnitPrice = getPriceForQuantity(newQuantity, productDetail, item.unitPrice, item.orderUnit);
        
        updatedColors[colorIndex] = {
          ...updatedColors[colorIndex],
          quantity: newQuantity,
          totalQuantity: newQuantity,
          totalForColor: newQuantity,
          unitPrice: colorUnitPrice
        };
        
        updatedTotalQuantity = updatedColors.reduce((sum, color) => sum + (color.totalQuantity || 0), 0);
      } else {
        const editedData = editedQuantities[`${itemId}-${colorIndex}`] || {};
        const allSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
        const sizeQuantitiesArray = allSizes.map(size => ({ size, quantity: editedData[size] || 0 }));
        colorTotal = sizeQuantitiesArray.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
        
        if (colorTotal > 0 && colorTotal < item.moq) {
          toast.error(`This color must meet MOQ of ${item.moq} ${unitLabel}. Current total: ${colorTotal} ${unitLabel}.`);
          setSavingEdits(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: false }));
          return;
        }
        
        const colorUnitPrice = getPriceForQuantity(colorTotal, productDetail, item.unitPrice, item.orderUnit);
        
        updatedColors[colorIndex] = {
          ...updatedColors[colorIndex],
          sizeQuantities: sizeQuantitiesArray,
          totalQuantity: colorTotal,
          totalForColor: colorTotal,
          unitPrice: colorUnitPrice
        };
        
        updatedTotalQuantity = updatedColors.reduce((sum, color) => sum + (color.totalQuantity || 0), 0);
      }

      const cartItem = {
        productId: item.productId,
        productName: item.productName,
        colors: updatedColors,
        totalQuantity: updatedTotalQuantity,
        unitPrice: item.unitPrice,
        moq: item.moq,
        productImage: item.productImage,
        specialInstructions: item.specialInstructions,
        orderUnit: item.orderUnit
      };

      const response = await fetch('http://localhost:5000/api/inquiry-cart/add', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem)
      });

      const data = await response.json();
      if (data.success) {
        setCart(data.data);
        setEditingColors(prev => { const newState = { ...prev }; delete newState[`${itemId}-${colorIndex}`]; return newState; });
        toast.success(`Quantities updated!`);
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to update quantities');
      }
    } catch (error) {
      toast.error('Failed to update quantities');
    } finally {
      setSavingEdits(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: false }));
    }
  };

  const toggleEditColor = (itemId, colorIndex) => {
    const key = `${itemId}-${colorIndex}`;
    setEditingColors(prev => ({ ...prev, [key]: !prev[key] }));
    
    const item = cart.items.find(i => i._id === itemId);
    const color = item?.colors[colorIndex];
    
    if (item?.orderUnit === 'kg' || item?.orderUnit === 'ton') {
      setWeightQuantities(prev => ({ ...prev, [key]: color?.quantity || color?.totalQuantity || 0 }));
    } else {
      const quantitiesObj = {};
      (color?.sizeQuantities || []).forEach(sq => { quantitiesObj[sq.size] = sq.quantity; });
      setEditedQuantities(prev => ({ ...prev, [key]: quantitiesObj }));
    }
  };

  const cancelEdit = (itemId, colorIndex) => {
    const key = `${itemId}-${colorIndex}`;
    setEditingColors(prev => { const newState = { ...prev }; delete newState[key]; return newState; });
  };

  const handleWeightQuantityChange = (itemId, colorIndex, value) => {
    setWeightQuantities(prev => ({ ...prev, [`${itemId}-${colorIndex}`]: parseInt(value) || 0 }));
  };

  const handleEditQuantityChange = (itemId, colorIndex, size, value) => {
    const key = `${itemId}-${colorIndex}`;
    setEditedQuantities(prev => ({ ...prev, [key]: { ...(prev[key] || {}), [size]: parseInt(value) || 0 } }));
  };

  const handleColorSelect = (itemId, color) => {
    setSelectedColors(prev => ({ ...prev, [itemId]: color }));
    const item = cart?.items?.find(i => i._id === itemId);
    const isWeightBased = item?.orderUnit === 'kg' || item?.orderUnit === 'ton';
    
    if (isWeightBased) {
      setColorQuantities(prev => ({ ...prev, [itemId]: 0 }));
    } else if (!colorQuantities[itemId]) {
      setColorQuantities(prev => ({ ...prev, [itemId]: {} }));
    }
  };

  const handleQuantityChange = (itemId, size, value) => {
    setColorQuantities(prev => ({
      ...prev,
      [itemId]: { ...(prev[itemId] || {}), [size]: parseInt(value) || 0 }
    }));
  };

  const handleSimpleQuantityChange = (itemId, value) => {
    setColorQuantities(prev => ({ ...prev, [itemId]: parseInt(value) || 0 }));
  };

  const getNewColorTotal = (itemId, item) => {
    const isWeightBased = item?.orderUnit === 'kg' || item?.orderUnit === 'ton';
    if (isWeightBased) {
      const qty = colorQuantities[itemId];
      return typeof qty === 'number' ? qty : 0;
    }
    const quantities = colorQuantities[itemId] || {};
    return Object.values(quantities).reduce((sum, qty) => sum + (parseInt(qty) || 0), 0);
  };

  const getNewColorUnitPrice = (itemId, item) => {
    const totalQty = getNewColorTotal(itemId, item);
    const productDetail = productDetails[item?.productId];
    return getPriceForQuantity(totalQty, productDetail, item?.unitPrice || 0, item?.orderUnit);
  };

  const handleAddColorToCart = async (item) => {
    const selectedColor = selectedColors[item._id];
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
    const totalQty = getNewColorTotal(item._id, item);
    const unitLabel = getUnitLabel(item.orderUnit);

    if (totalQty === 0) {
      toast.error(`Please enter quantity in ${unitLabel}`);
      return;
    }

    if (totalQty < item.moq) {
      toast.error(`This color must meet MOQ of ${item.moq} ${unitLabel}. Current: ${totalQty} ${unitLabel}.`);
      return;
    }

    setAddingToCart(prev => ({ ...prev, [item._id]: true }));

    try {
      const token = localStorage.getItem('token');
      const existingColors = item.colors || [];
      
      if (existingColors.some(c => c.color?.code === selectedColor.code)) {
        toast.error('This color is already in your cart');
        setAddingToCart(prev => ({ ...prev, [item._id]: false }));
        return;
      }

      const productDetail = productDetails[item.productId];
      const colorUnitPrice = getPriceForQuantity(totalQty, productDetail, item.unitPrice, item.orderUnit);

      let newColorData;
      if (isWeightBased) {
        newColorData = {
          color: { code: selectedColor.code, name: selectedColor.name || selectedColor.code },
          quantity: totalQty,
          totalQuantity: totalQty,
          totalForColor: totalQty,
          unitPrice: colorUnitPrice
        };
      } else {
        const allSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
        const quantities = colorQuantities[item._id] || {};
        const sizeQuantitiesArray = allSizes.map(size => ({ size, quantity: quantities[size] || 0 }));
        newColorData = {
          color: { code: selectedColor.code, name: selectedColor.name || selectedColor.code },
          sizeQuantities: sizeQuantitiesArray,
          totalQuantity: totalQty,
          totalForColor: totalQty,
          unitPrice: colorUnitPrice
        };
      }

      const updatedColors = [...existingColors, newColorData];
      const updatedTotalQuantity = updatedColors.reduce((sum, color) => sum + (color.totalQuantity || 0), 0);

      const cartItem = {
        productId: item.productId,
        productName: item.productName,
        colors: updatedColors,
        totalQuantity: updatedTotalQuantity,
        unitPrice: item.unitPrice,
        moq: item.moq,
        productImage: item.productImage,
        orderUnit: item.orderUnit
      };

      const response = await fetch('http://localhost:5000/api/inquiry-cart/add', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem)
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`${selectedColor.code || 'Color'} added! (${totalQty} ${unitLabel})`);
        setSelectedColors(prev => { const newState = { ...prev }; delete newState[item._id]; return newState; });
        setColorQuantities(prev => { const newState = { ...prev }; delete newState[item._id]; return newState; });
        setCart(data.data);
        window.dispatchEvent(new Event('cart-update'));
        setExpandedItems(prev => ({ ...prev, [item._id]: false }));
      } else {
        toast.error(data.error || 'Failed to add color');
      }
    } catch (error) {
      toast.error('Failed to add color');
    } finally {
      setAddingToCart(prev => ({ ...prev, [item._id]: false }));
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large, max 5MB');
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PNG, JPEG, PDF files are allowed');
      return;
    }

    const formData = new FormData();
    formData.append('attachment', file);

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/inquiry-cart/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setAttachments([...attachments, data.data]);
        toast.success('File uploaded successfully');
        e.target.value = '';
      } else {
        toast.error('Upload failed');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmitInquiry = async () => {
    if (!cart?.items?.length) {
      toast.error('Your cart is empty');
      return;
    }

    if (cart.items.some(item => hasBelowMOQColor(item))) {
      toast.error('Cannot submit. Some colors are below MOQ. Please adjust quantities.');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/inquiry-cart/submit', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ specialInstructions, attachments })
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Inquiry submitted successfully!');
        router.push('/customer/inquiries');
      } else {
        toast.error(data.error || 'Failed to submit inquiry');
      }
    } catch (error) {
      toast.error('Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-white flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#6B4F3A] mx-auto mb-4" />
            <p className="text-gray-500">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-white pt-20">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#6B4F3A] transition-colors mb-2">
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-[#6B4F3A]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Your Cart
                </h1>
                <p className="text-gray-500 mt-1">Review and manage your inquiry items</p>
              </div>
              {cart?.items?.length > 0 && (
                <button
                  onClick={showClearCartModal}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Cart
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {!cart?.items?.length ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-24 h-24 bg-[#F5E6D3] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-[#6B4F3A]" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added any products yet.</p>
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#6B4F3A] text-white rounded-xl hover:bg-[#8B6B51] transition-colors">
                Browse Products <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.items.map((item) => {
                    const productDetail = productDetails[item.productId];
                    const availableColors = productDetail?.colors || [];
                    const availableSizes = productDetail?.sizes?.filter(s => s.trim()) || [];
                    const isExpanded = expandedItems[item._id];
                    const selectedColor = selectedColors[item._id];
                    const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
                    const unitLabel = getUnitLabel(item.orderUnit);
                    const unitFullLabel = getUnitFullLabel(item.orderUnit);
                    const isAdding = addingToCart[item._id];
                    const newColorTotal = getNewColorTotal(item._id, item);
                    const newColorUnitPrice = getNewColorUnitPrice(item._id, item);
                    const meetsMOQ = newColorTotal >= item.moq;

                    return (
                      <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        {/* Product Header */}
                        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-white to-[#FAF7F2]">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-[#FAF7F2] rounded-xl overflow-hidden flex-shrink-0">
                                <img src={item.productImage || 'https://via.placeholder.com/64'} alt={item.productName} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <Link href={`/productDetails?id=${item.productId}`} className="block">
                                  <h3 className="font-semibold text-gray-900 hover:text-[#6B4F3A] transition-colors">{item.productName}</h3>
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="px-2 py-0.5 bg-[#F5E6D3] text-[#6B4F3A] text-xs rounded-full">{unitFullLabel}</span>
                                  <span className="text-xs text-gray-500">MOQ: {item.moq} {unitLabel}/color</span>
                                </div>
                              </div>
                            </div>
                            <button onClick={() => showProductDeleteModal(item._id, item.productName)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Colors Section */}
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-medium text-gray-700">Colors & Quantities</h4>
                            {availableColors.length > 0 && (
                              <button onClick={() => toggleExpand(item._id)} className="flex items-center gap-1 text-xs text-[#6B4F3A] hover:text-[#8B6B51] transition-colors">
                                {isExpanded ? <><ChevronUp className="w-3 h-3" /> Hide</> : <><ChevronDown className="w-3 h-3" /> Add Color</>}
                              </button>
                            )}
                          </div>

                          <div className="space-y-3">
                            {item.colors?.map((colorItem, colorIndex) => {
                              const editKey = `${item._id}-${colorIndex}`;
                              const isEditing = editingColors[editKey];
                              const isSaving = savingEdits[editKey];
                              const isDeleting = deletingColor[editKey];
                              
                              let colorTotal = 0;
                              let colorUnitPrice = colorItem.unitPrice || 0;
                              
                              if (isWeightBased) {
                                colorTotal = colorItem.quantity || colorItem.totalQuantity || 0;
                                colorUnitPrice = colorItem.unitPrice || getPriceForQuantity(colorTotal, productDetail, item.unitPrice, item.orderUnit);
                              } else {
                                colorTotal = (colorItem.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
                                colorUnitPrice = colorItem.unitPrice || getPriceForQuantity(colorTotal, productDetail, item.unitPrice, item.orderUnit);
                              }
                              
                              const colorSubtotal = colorTotal * colorUnitPrice;
                              const colorName = colorItem.color?.name || colorItem.color?.code || `Color ${colorIndex + 1}`;
                              const isBelowMOQ = colorTotal > 0 && colorTotal < item.moq;

                              return (
                                <div key={colorIndex} className={`bg-[#FAF7F2] rounded-xl p-4 border ${isBelowMOQ ? 'border-amber-200' : 'border-transparent'}`}>
                                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: colorItem.color?.code || '#CCCCCC' }} />
                                    
                                      {isBelowMOQ && (
                                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Below MOQ</span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="text-right">
                                        <div className="text-sm font-bold text-[#6B4F3A]">{formatPrice(colorSubtotal)}</div>
                                        <div className="text-xs text-gray-500">{colorTotal} {unitLabel} @ {formatPrice(colorUnitPrice)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}</div>
                                      </div>
                                      <button onClick={() => showDeleteModal(item._id, colorIndex, colorName, item.productName)} disabled={isDeleting} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                      </button>
                                      {!isEditing ? (
                                        <button onClick={() => toggleEditColor(item._id, colorIndex)} className="p-1.5 text-gray-400 hover:text-[#6B4F3A] hover:bg-[#F5E6D3] rounded-lg transition-colors">
                                          <Plus className="w-3 h-3" />
                                        </button>
                                      ) : (
                                        <div className="flex gap-1">
                                          <button onClick={() => handleSaveColorEdits(item._id, colorIndex)} disabled={isSaving} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                            {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                          </button>
                                          <button onClick={() => cancelEdit(item._id, colorIndex)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <X className="w-3 h-3" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Quantity Inputs */}
                                  {isWeightBased ? (
                                    <div className="mt-2">
                                      <label className="block text-xs text-gray-500 mb-1">Quantity ({unitLabel})</label>
                                      <input type="number" min="0" value={isEditing ? (weightQuantities[editKey] ?? colorTotal) : colorTotal} onChange={(e) => handleWeightQuantityChange(item._id, colorIndex, e.target.value)} disabled={!isEditing} className="w-36 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent disabled:bg-gray-100" />
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                                      {availableSizes.map((size) => {
                                        let currentQty = 0;
                                        if (isEditing) {
                                          currentQty = editedQuantities[editKey]?.[size] !== undefined ? editedQuantities[editKey][size] : ((colorItem.sizeQuantities || []).find(sq => sq.size === size)?.quantity || 0);
                                        } else {
                                          currentQty = (colorItem.sizeQuantities || []).find(sq => sq.size === size)?.quantity || 0;
                                        }
                                        return (
                                          <div key={size} className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 w-8">{size}</span>
                                            <input type="number" min="0" value={currentQty || ''} onChange={(e) => handleEditQuantityChange(item._id, colorIndex, size, e.target.value)} disabled={!isEditing} className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] disabled:bg-gray-100" placeholder="0" />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {isEditing && (
                                    <div className="mt-2 pt-2 text-xs text-gray-500">
                                      Preview: {(() => {
                                        let tempTotal = 0;
                                        if (isWeightBased) tempTotal = weightQuantities[editKey] || 0;
                                        else tempTotal = Object.values(editedQuantities[editKey] || {}).reduce((s, v) => s + (v || 0), 0);
                                        const tempPrice = getPriceForQuantity(tempTotal, productDetail, item.unitPrice, item.orderUnit);
                                        return `${tempTotal} ${unitLabel} @ ${formatPrice(tempPrice)}/${unitLabel === 'pcs' ? 'pc' : unitLabel} = ${formatPrice(tempTotal * tempPrice)}`;
                                      })()}
                                    </div>
                                  )}
                                </div>
                              );
                            })}

                            {hasBelowMOQColor(item) && (
                              <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl text-amber-700 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                <span>Some colors are below MOQ ({item.moq} {unitLabel}). Please adjust quantities.</span>
                              </div>
                            )}

                            {isExpanded && (
                              <div className="mt-4 p-4 bg-[#F5E6D3] rounded-xl">
                                <h5 className="font-medium text-[#6B4F3A] mb-3">Add Another Color</h5>
                                
                                {availableColors.length > 0 && (
                                  <div className="mb-4">
                                    <label className="block text-xs text-[#6B4F3A] mb-2">Select Color:</label>
                                    <div className="flex flex-wrap gap-2">
                                      {availableColors.map((color, idx) => {
                                        const colorExists = item.colors?.some(c => c.color?.code === color.code);
                                        return (
                                          <button key={idx} onClick={() => !colorExists && handleColorSelect(item._id, color)} disabled={colorExists} className={`relative p-0.5 rounded-full transition-all ${selectedColor?.code === color.code ? 'ring-2 ring-[#6B4F3A] ring-offset-2' : colorExists ? 'opacity-40 cursor-not-allowed' : 'hover:ring-2 hover:ring-[#6B4F3A]/50'}`}>
                                            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color.code }} />
                                            {colorExists && <CheckCircle className="absolute -top-1 -right-1 w-3.5 h-3.5 text-green-600 bg-white rounded-full" />}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}

                                {selectedColor && (
                                  <>
                                    <div className="mb-3">
                                      <label className="block text-xs text-[#6B4F3A] mb-2">Quantity ({unitLabel}):</label>
                                      {isWeightBased ? (
                                        <input type="number" min="0" value={colorQuantities[item._id] || ''} onChange={(e) => handleSimpleQuantityChange(item._id, e.target.value)} className="w-40 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A]" placeholder={`Enter ${unitLabel}`} />
                                      ) : (
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                          {availableSizes.map((size, idx) => (
                                            <div key={idx}>
                                              <label className="text-xs text-gray-600 mb-1 block">{size}</label>
                                              <input type="number" min="0" value={(colorQuantities[item._id] || {})[size] || ''} onChange={(e) => handleQuantityChange(item._id, size, e.target.value)} className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#6B4F3A]" placeholder="0" />
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    {newColorTotal > 0 && (
                                      <div className="mb-3 p-2 bg-white rounded-lg">
                                        <div className="flex justify-between text-sm">
                                          <span className="text-gray-600">Preview:</span>
                                          <span className="font-medium text-[#6B4F3A]">{newColorTotal} {unitLabel} @ {formatPrice(newColorUnitPrice)}/{unitLabel === 'pcs' ? 'pc' : unitLabel} = {formatPrice(newColorTotal * newColorUnitPrice)}</span>
                                        </div>
                                      </div>
                                    )}

                                    {newColorTotal > 0 && !meetsMOQ && (
                                      <div className="mb-3 p-2 bg-amber-50 rounded-lg text-amber-700 text-sm">⚠️ Need {item.moq - newColorTotal} more {unitLabel} to meet MOQ</div>
                                    )}

                                    {meetsMOQ && newColorTotal > 0 && (
                                      <div className="mb-3 p-2 bg-green-50 rounded-lg text-green-700 text-sm">✓ Meets MOQ!</div>
                                    )}

                                    <button onClick={() => handleAddColorToCart(item)} disabled={isAdding || !meetsMOQ || newColorTotal === 0} className="w-full py-2.5 bg-[#6B4F3A] text-white rounded-xl hover:bg-[#8B6B51] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                                      {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                      Add {newColorTotal} {unitLabel} @ {formatPrice(newColorUnitPrice)}/{unitLabel === 'pcs' ? 'pc' : unitLabel}
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          {item.specialInstructions && (
                            <div className="mt-4 p-3 bg-[#F5E6D3] rounded-xl">
                              <div className="flex gap-2">
                                <FileText className="w-4 h-4 text-[#6B4F3A]" />
                                <div><p className="text-xs font-medium text-[#6B4F3A]">Special Instructions:</p><p className="text-xs text-gray-700 mt-0.5">{item.specialInstructions}</p></div>
                              </div>
                            </div>
                          )}

                          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                            <div><span className="text-sm text-gray-500">Product Total:</span><span className="ml-2 text-xl font-bold text-[#6B4F3A]">{formatPrice(item.colors?.reduce((sum, color) => { let ct = 0; if (isWeightBased) ct = color.quantity || color.totalQuantity || 0; else ct = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0); const cup = color.unitPrice || getPriceForQuantity(ct, productDetail, item.unitPrice, item.orderUnit); return sum + (ct * cup); }, 0) || 0)}</span></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                    <h2 className="text-xl font-bold text-gray-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Order Summary</h2>
                    
                    <div className="space-y-3 mb-5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Products:</span>
                        <span className="font-medium">{cart.totalItems}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Quantity:</span>
                        <span className="font-medium">{cart.totalQuantity} {cart.items[0]?.orderUnit === 'kg' ? 'kg' : cart.items[0]?.orderUnit === 'ton' ? 'MT' : 'pcs'}</span>
                      </div>
                      
                      {/* Item Breakdown - Group by Product */}
                      <div className="pt-3 max-h-[350px] overflow-y-auto space-y-3 border-t border-gray-100">
                        {cart.items.map((item) => {
                          const productDetail = productDetails[item.productId];
                          const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
                          const unitLabel = getUnitLabel(item.orderUnit);
                          const productColors = item.colors?.filter(color => {
                            let ct = 0;
                            if (isWeightBased) ct = color.quantity || color.totalQuantity || 0;
                            else ct = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
                            return ct > 0;
                          }) || [];
                          
                          if (productColors.length === 0) return null;
                          
                          return (
                            <div key={item._id} className="border-b border-gray-100 pb-3 last:border-0">
                              <div className="font-medium text-gray-800 mb-2 text-sm">
                                {item.productName}
                              </div>
                              
                              <div className="space-y-1.5 pl-2">
                                {productColors.map((color, idx) => {
                                  let colorTotal = 0;
                                  if (isWeightBased) {
                                    colorTotal = color.quantity || color.totalQuantity || 0;
                                  } else {
                                    colorTotal = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
                                  }
                                  if (colorTotal === 0) return null;
                                  
                                  const colorUnitPrice = color.unitPrice || getPriceForQuantity(colorTotal, productDetail, item.unitPrice, item.orderUnit);
                                  const colorSubtotal = colorTotal * colorUnitPrice;
                                  const isBelowMOQ = colorTotal < item.moq;
                                  
                                  return (
                                    <div key={`${item._id}-${idx}`} className="flex items-center justify-between text-xs">
                                      <div className="flex items-center gap-2 flex-1">
                                        <div 
                                          className="w-2.5 h-2.5 rounded-full shadow-sm flex-shrink-0"
                                          style={{ backgroundColor: color.color?.code || '#CCCCCC' }}
                                        />
                                        <span className={`text-gray-600 ${isBelowMOQ ? 'text-amber-600' : ''}`}>
                                          
                                          {isBelowMOQ && <span className="ml-1 text-[10px] text-amber-500">(Below MOQ)</span>}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <span className="text-gray-500 text-[10px]">{colorTotal} {unitLabel}</span>
                                        <span className={`font-semibold ${isBelowMOQ ? 'text-amber-600' : 'text-[#6B4F3A]'}`}>
                                          {formatPrice(colorSubtotal)}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              <div className="flex justify-end mt-2 pt-1 border-t border-gray-50">
                                <span className="text-xs text-gray-500">Product Subtotal:</span>
                                <span className="ml-2 text-sm font-semibold text-[#6B4F3A]">
                                  {formatPrice(productColors.reduce((sum, color) => {
                                    let ct = 0;
                                    if (isWeightBased) ct = color.quantity || color.totalQuantity || 0;
                                    else ct = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
                                    const cup = color.unitPrice || getPriceForQuantity(ct, productDetail, item.unitPrice, item.orderUnit);
                                    return sum + (ct * cup);
                                  }, 0))}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 mt-2">
                        <span>Estimated Total:</span>
                        <span className="text-[#6B4F3A]">
                          {formatPrice(cart.items?.reduce((total, item) => {
                            const pd = productDetails[item.productId];
                            const isWB = item.orderUnit === 'kg' || item.orderUnit === 'ton';
                            return total + (item.colors?.reduce((sum, color) => {
                              let ct = 0;
                              if (isWB) ct = color.quantity || color.totalQuantity || 0;
                              else ct = (color.sizeQuantities || []).reduce((s, sq) => s + (sq.quantity || 0), 0);
                              const cup = color.unitPrice || getPriceForQuantity(ct, pd, item.unitPrice, item.orderUnit);
                              return sum + (ct * cup);
                            }, 0) || 0);
                          }, 0) || 0)}
                        </span>
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                      <textarea 
                        value={specialInstructions} 
                        onChange={(e) => setSpecialInstructions(e.target.value)} 
                        rows="3" 
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent resize-none" 
                        placeholder="Add special requirements..."
                      />
                    </div>

                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                      <div className="space-y-2">
                        {attachments.map((file, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-500"/>
                              <span className="text-xs truncate max-w-[150px]">{file.fileName}</span>
                            </div>
                            <button onClick={() => removeAttachment(idx)} className="p-1 hover:bg-gray-200 rounded">
                              <X className="w-3 h-3"/>
                            </button>
                          </div>
                        ))}
                        <label className="block">
                          <input type="file" onChange={handleFileUpload} className="hidden" disabled={uploading}/>
                          <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#6B4F3A] transition-colors">
                            {uploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Upload className="w-4 h-4"/>}
                            <span className="text-sm">{uploading ? 'Uploading...' : 'Upload File'}</span>
                          </div>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF (Max 5MB)</p>
                      </div>
                    </div>

                    <button 
                      onClick={handleSubmitInquiry} 
                      disabled={submitting || !cart.items.length || cart.items.some(item => hasBelowMOQColor(item))} 
                      className="w-full py-3 bg-[#6B4F3A] text-white font-semibold rounded-xl hover:bg-[#8B6B51] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submitting ? <><Loader2 className="w-4 h-4 animate-spin"/> Submitting...</> : <><Send className="w-4 h-4"/> Submit Inquiry</>}
                    </button>

                    {cart.items.some(item => hasBelowMOQColor(item)) && (
                      <div className="mt-4 p-3 bg-amber-50 rounded-xl flex gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600"/>
                        <p className="text-xs text-amber-700">Some colors are below MOQ. Please adjust quantities.</p>
                      </div>
                    )}

                    <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-center">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Shield className="w-3.5 h-3.5"/>Secure Checkout
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Truck className="w-3.5 h-3.5"/>Worldwide Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recently Viewed Products Section */}
              {recentlyViewed.length > 0 && !loadingRecent && (
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-[#6B4F3A]/10 px-3 py-1 rounded-full mb-2">
                        <Clock className="w-4 h-4 text-[#6B4F3A]" />
                        <span className="text-xs font-medium text-[#6B4F3A]">Recently Viewed</span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Products You've Seen</h2>
                      <p className="text-sm text-gray-500 mt-1">Continue shopping from your recent browsing history</p>
                    </div>
                    <Link href="/products" className="text-sm text-[#6B4F3A] hover:underline flex items-center gap-1">
                      Browse All <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {recentlyViewed.map((product) => (
                      <RelatedProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {deleteModal.show && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl max-w-md w-full p-6"><div className="flex items-center gap-3 text-red-600 mb-4"><AlertCircle className="w-6 h-6"/><h3 className="text-lg font-semibold">Remove Color</h3></div><p className="text-gray-600 mb-6">Remove <span className="font-semibold">"{deleteModal.colorName}"</span> from cart?</p><div className="flex justify-end gap-3"><button onClick={closeDeleteModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button onClick={handleDeleteColor} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Remove</button></div></div></div>)}

      {productDeleteModal.show && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl max-w-md w-full p-6"><div className="flex items-center gap-3 text-red-600 mb-4"><AlertCircle className="w-6 h-6"/><h3 className="text-lg font-semibold">Remove Product</h3></div><p className="text-gray-600 mb-6">Remove <span className="font-semibold">"{productDeleteModal.productName}"</span> from cart?</p><div className="flex justify-end gap-3"><button onClick={closeProductDeleteModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button onClick={handleProductDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Remove</button></div></div></div>)}

      {clearCartModal.show && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl max-w-md w-full p-6"><div className="flex items-center gap-3 text-red-600 mb-4"><AlertCircle className="w-6 h-6"/><h3 className="text-lg font-semibold">Clear Cart</h3></div><p className="text-gray-600 mb-6">Remove all items from your cart?</p><div className="flex justify-end gap-3"><button onClick={closeClearCartModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button onClick={handleClearCartConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Clear All</button></div></div></div>)}

      <Footer />
      <WhatsAppButton />
    </>
  );
}