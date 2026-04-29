// 'use client';

// import { useState, useEffect } from 'react';
// import { 
//   Save, 
//   Plus, 
//   Trash2, 
//   X, 
//   Loader2, 
//   AlertCircle,
//   Package,
//   Clock,
//   Eye,
//   ShoppingCart,
//   ChevronDown,
//   ChevronUp
// } from 'lucide-react';
// import { toast } from 'sonner';
// import Link from 'next/link';

// export default function PromotionalSettings() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [settings, setSettings] = useState({
//     isActive: true,
//     products: [],
//     intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
//     maxShows: 3
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showProductDropdown, setShowProductDropdown] = useState(false);
//   const [selectedProductIndex, setSelectedProductIndex] = useState(null);

//   // Fetch products and settings
//   useEffect(() => {
//     fetchProducts();
//     fetchSettings();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/products?limit=100', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success) {
//         setProducts(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       toast.error('Failed to fetch products');
//     }
//   };

//   const fetchSettings = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/promotional-settings', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
//       if (data.success && data.data) {
//         setSettings({
//           isActive: data.data.isActive,
//           products: data.data.products || [],
//           intervals: data.data.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
//           maxShows: data.data.maxShows || 3
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching settings:', error);
//       toast.error('Failed to fetch settings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = async () => {
//     // Validate
//     if (settings.products.length === 0) {
//       toast.error('Please add at least one product');
//       return;
//     }

//     if (settings.intervals.length === 0) {
//       toast.error('Please add at least one interval');
//       return;
//     }

//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/promotional-settings', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(settings)
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Promotional settings saved successfully!');
//         setSettings(data.data);
//       } else {
//         toast.error(data.error || 'Failed to save settings');
//       }
//     } catch (error) {
//       console.error('Error saving settings:', error);
//       toast.error('Network error. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const addProduct = (product, index) => {
//     if (settings.products.some(p => p.productId === product._id)) {
//       toast.error('Product already added');
//       return;
//     }
    
//     const newProducts = [...settings.products];
//     if (selectedProductIndex !== null) {
//       // Edit existing
//       newProducts[selectedProductIndex] = {
//         productId: product._id,
//         tag: newProducts[selectedProductIndex]?.tag || '',
//         order: selectedProductIndex
//       };
//     } else {
//       // Add new
//       newProducts.push({
//         productId: product._id,
//         tag: '',
//         order: settings.products.length
//       });
//     }
    
//     setSettings({ ...settings, products: newProducts });
//     setShowProductDropdown(false);
//     setSelectedProductIndex(null);
//     setSearchTerm('');
//   };

//   const removeProduct = (index) => {
//     const newProducts = settings.products.filter((_, i) => i !== index);
//     setSettings({ ...settings, products: newProducts });
//   };

//   const updateProductTag = (index, tag) => {
//     const newProducts = [...settings.products];
//     newProducts[index] = { ...newProducts[index], tag };
//     setSettings({ ...settings, products: newProducts });
//   };

//   const addInterval = () => {
//     setSettings({
//       ...settings,
//       intervals: [...settings.intervals, { delay: 15 }]
//     });
//   };

//   const removeInterval = (index) => {
//     if (settings.intervals.length > 1) {
//       const newIntervals = settings.intervals.filter((_, i) => i !== index);
//       setSettings({ ...settings, intervals: newIntervals });
//     }
//   };

//   const updateInterval = (index, delay) => {
//     const newIntervals = [...settings.intervals];
//     newIntervals[index] = { delay: parseInt(delay) || 0 };
//     setSettings({ ...settings, intervals: newIntervals });
//   };

//   const filteredProducts = products.filter(product =>
//     product.productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FAF7F2] p-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-[#6B4F3A] font-serif">Promotional Popup Settings</h1>
//           <p className="text-sm text-gray-600 mt-1">
//             Configure products and timing for the promotional popup that appears to customers
//           </p>
//         </div>

//         {/* Main Form */}
//         <div className="space-y-6">
//           {/* Active Toggle */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">Enable Promotional Popup</h2>
//                 <p className="text-sm text-gray-500">Turn on/off the promotional popup for customers</p>
//               </div>
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={settings.isActive}
//                   onChange={(e) => setSettings({ ...settings, isActive: e.target.checked })}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6B4F3A]"></div>
//               </label>
//             </div>
//           </div>

//           {/* Products Selection */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Package className="w-5 h-5 text-[#6B4F3A]" />
//               Select Products
//             </h2>
//             <p className="text-sm text-gray-500 mb-4">
//               Add products that will appear in the promotional popup
//             </p>

//             {/* Product List */}
//             {settings.products.length > 0 && (
//               <div className="space-y-3 mb-4">
//                 {settings.products.map((item, index) => {
//                   const product = products.find(p => p._id === item.productId);
//                   return (
//                     <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                       <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
//                         {product?.images?.[0]?.url ? (
//                           <img
//                             src={product.images[0].url}
//                             alt={product.productName}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <Package className="w-6 h-6 text-gray-400 m-3" />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-medium text-gray-900 text-sm">{product?.productName || 'Unknown'}</p>
//                         <input
//                           type="text"
//                           value={item.tag}
//                           onChange={(e) => updateProductTag(index, e.target.value)}
//                           placeholder="Enter tag (e.g., Special Offer, Limited Time)"
//                           className="mt-1 w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] focus:border-[#6B4F3A] outline-none"
//                         />
//                       </div>
//                       <button
//                         onClick={() => removeProduct(index)}
//                         className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Add Product Button */}
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setShowProductDropdown(!showProductDropdown)}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-[#6B4F3A] rounded-lg text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Product
//               </button>

//               {showProductDropdown && (
//                 <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
//                   <div className="p-3 border-b border-gray-200">
//                     <input
//                       type="text"
//                       placeholder="Search products..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
//                       autoFocus
//                     />
//                   </div>
//                   <div className="max-h-64 overflow-y-auto">
//                     {filteredProducts.length === 0 ? (
//                       <p className="text-center text-gray-500 py-4 text-sm">No products found</p>
//                     ) : (
//                       filteredProducts.map(product => (
//                         <button
//                           key={product._id}
//                           onClick={() => addProduct(product)}
//                           className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors flex items-center gap-3"
//                         >
//                           <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
//                             {product.images?.[0]?.url ? (
//                               <img
//                                 src={product.images[0].url}
//                                 alt={product.productName}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <Package className="w-5 h-5 text-gray-400 m-2.5" />
//                             )}
//                           </div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-900">{product.productName}</p>
//                             <p className="text-xs text-gray-500">${product.pricePerUnit} / piece</p>
//                           </div>
//                         </button>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Interval Settings */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Clock className="w-5 h-5 text-[#6B4F3A]" />
//               Timing Configuration
//             </h2>
//             <p className="text-sm text-gray-500 mb-4">
//               Configure when the popup appears. The first delay is after page load, subsequent delays are after closing.
//             </p>

//             <div className="space-y-4">
//               {settings.intervals.map((interval, index) => (
//                 <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <div className="flex-1">
//                     <label className="block text-xs font-medium text-gray-600 mb-1">
//                       {index === 0 ? 'Initial Delay (after page load)' : `Delay after ${index}st close`}
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="number"
//                         value={interval.delay}
//                         onChange={(e) => updateInterval(index, e.target.value)}
//                         min="0"
//                         step="1"
//                         className="w-32 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
//                       />
//                       <span className="text-sm text-gray-600">seconds</span>
//                     </div>
//                   </div>
//                   {settings.intervals.length > 1 && (
//                     <button
//                       onClick={() => removeInterval(index)}
//                       className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors mt-5"
//                     >
//                       <Trash2 className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>
//               ))}
              
//               <button
//                 type="button"
//                 onClick={addInterval}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-[#6B4F3A] rounded-lg text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
//               >
//                 <Plus className="w-4 h-4" />
//                 Add Another Interval
//               </button>
//             </div>

//             {/* Max Shows */}
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Maximum number of times to show popup
//               </label>
//               <select
//                 value={settings.maxShows}
//                 onChange={(e) => setSettings({ ...settings, maxShows: parseInt(e.target.value) })}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
//               >
//                 <option value={1}>1 time</option>
//                 <option value={2}>2 times</option>
//                 <option value={3}>3 times</option>
//                 <option value={4}>4 times</option>
//                 <option value={5}>5 times</option>
//               </select>
//             </div>
//           </div>

//           {/* Preview Section */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               <Eye className="w-5 h-5 text-[#6B4F3A]" />
//               Preview
//             </h2>
//             <div className="bg-gray-100 rounded-lg p-4">
//               <div className="text-center text-gray-500 text-sm">
//                 Popup will appear with {settings.products.length} product(s) at these intervals:
//                 {settings.intervals.map((interval, idx) => (
//                   <span key={idx} className="inline-block mx-1 px-2 py-1 bg-white rounded shadow-sm text-xs">
//                     {idx === 0 ? 'First: ' : `${idx}th close: `}{interval.delay}s
//                   </span>
//                 ))}
//                 <span className="inline-block ml-2 px-2 py-1 bg-white rounded shadow-sm text-xs">
//                   Max shows: {settings.maxShows}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Save Button */}
//           <div className="flex justify-end gap-3">
//             <Link
//               href="/admin/dashboard"
//               className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//             >
//               Cancel
//             </Link>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="flex items-center gap-2 px-6 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50"
//             >
//               {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//               Save Settings
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  X, 
  Loader2, 
  Package,
  Clock,
  Eye,
  Edit,
  RefreshCw,
  PlusCircle,
  MinusCircle
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function PromotionalSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [products, setProducts] = useState([]);
  const [promotionalItems, setPromotionalItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form for creating new promotional item
  const [newItemForm, setNewItemForm] = useState({
    productId: null,
    product: null,
    tag: '',
    intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
    maxShows: 3,
    isActive: true
  });

  // Edit form
  const [editForm, setEditForm] = useState({
    tag: '',
    intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
    maxShows: 3,
    isActive: true
  });

  // Fetch products and promotional items
  useEffect(() => {
    fetchProducts();
    fetchPromotionalItems();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/products?limit=100', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  const fetchPromotionalItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/promotional-settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setPromotionalItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching promotional items:', error);
      toast.error('Failed to fetch promotional items');
    } finally {
      setLoading(false);
    }
  };

  // Interval management for new form
  const addIntervalToNew = () => {
    setNewItemForm({
      ...newItemForm,
      intervals: [...newItemForm.intervals, { delay: 15 }]
    });
  };

  const removeIntervalFromNew = (index) => {
    if (newItemForm.intervals.length <= 1) {
      toast.error('At least one interval is required');
      return;
    }
    const newIntervals = newItemForm.intervals.filter((_, i) => i !== index);
    setNewItemForm({ ...newItemForm, intervals: newIntervals });
  };

  const updateIntervalInNew = (index, delay) => {
    const newIntervals = [...newItemForm.intervals];
    newIntervals[index] = { delay: parseInt(delay) || 0 };
    setNewItemForm({ ...newItemForm, intervals: newIntervals });
  };

  // Interval management for edit form
  const addIntervalToEdit = () => {
    setEditForm({
      ...editForm,
      intervals: [...editForm.intervals, { delay: 15 }]
    });
  };

  const removeIntervalFromEdit = (index) => {
    if (editForm.intervals.length <= 1) {
      toast.error('At least one interval is required');
      return;
    }
    const newIntervals = editForm.intervals.filter((_, i) => i !== index);
    setEditForm({ ...editForm, intervals: newIntervals });
  };

  const updateIntervalInEdit = (index, delay) => {
    const newIntervals = [...editForm.intervals];
    newIntervals[index] = { delay: parseInt(delay) || 0 };
    setEditForm({ ...editForm, intervals: newIntervals });
  };

  const createPromotionalItem = async () => {
    // Validate
    if (!newItemForm.productId) {
      toast.error('Please select a product');
      return;
    }
    if (!newItemForm.tag.trim()) {
      toast.error('Please enter a tag');
      return;
    }
    if (newItemForm.intervals.length === 0) {
      toast.error('At least one interval is required');
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/promotional-settings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: newItemForm.productId,
          tag: newItemForm.tag,
          intervals: newItemForm.intervals,
          maxShows: newItemForm.maxShows,
          isActive: newItemForm.isActive
        })
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Promotional item created successfully!');
        await fetchPromotionalItems();
        // Reset form
        setNewItemForm({
          productId: null,
          product: null,
          tag: '',
          intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
          maxShows: 3,
          isActive: true
        });
        setShowProductDropdown(false);
        setSearchTerm('');
      } else {
        toast.error(data.error || 'Failed to create promotional item');
      }
    } catch (error) {
      console.error('Error creating promotional item:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updatePromotionalItem = async () => {
    if (!editingItem) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/promotional-settings/${editingItem._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Promotional item updated successfully!');
        await fetchPromotionalItems();
        setEditingItem(null);
        setEditForm({
          tag: '',
          intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
          maxShows: 3,
          isActive: true
        });
      } else {
        toast.error(data.error || 'Failed to update promotional item');
      }
    } catch (error) {
      console.error('Error updating promotional item:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const deletePromotionalItem = async (id) => {
    if (!confirm('Are you sure you want to delete this promotional item?')) return;
    
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/promotional-settings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Promotional item deleted successfully!');
        await fetchPromotionalItems();
      } else {
        toast.error(data.error || 'Failed to delete promotional item');
      }
    } catch (error) {
      console.error('Error deleting promotional item:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setEditForm({
      tag: item.tag,
      intervals: item.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
      maxShows: item.maxShows || 3,
      isActive: item.isActive
    });
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setEditForm({
      tag: '',
      intervals: [{ delay: 5 }, { delay: 15 }, { delay: 15 }],
      maxShows: 3,
      isActive: true
    });
  };

  const selectProduct = (product) => {
    setNewItemForm({
      ...newItemForm,
      productId: product._id,
      product: product
    });
    setShowProductDropdown(false);
    setSearchTerm('');
  };

  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !promotionalItems.some(item => item.productId?._id === product._id)
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price || 0);
  };

  const getUnitLabel = (orderUnit) => {
    switch(orderUnit) {
      case 'kg': return 'kg';
      case 'ton': return 'MT';
      default: return 'pc';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#6B4F3A] font-serif">Promotional Popup Settings</h1>
          <p className="text-sm text-gray-600 mt-1">
            Create promotional posts with custom timing and tags
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Create New Promotional Item */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#6B4F3A]" />
              Create New Promotional Post
            </h2>

            {/* Product Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                {newItemForm.product ? (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      {newItemForm.product.images?.[0]?.url ? (
                        <img
                          src={newItemForm.product.images[0].url}
                          alt={newItemForm.product.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-gray-400 m-3" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{newItemForm.product.productName}</p>
                      <p className="text-xs text-gray-500">{formatPrice(newItemForm.product.pricePerUnit)} / {getUnitLabel(newItemForm.product.orderUnit)}</p>
                    </div>
                    <button
                      onClick={() => setNewItemForm({ ...newItemForm, product: null, productId: null })}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowProductDropdown(!showProductDropdown)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-[#6B4F3A] rounded-lg text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Select Product
                    </button>

                    {showProductDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                        <div className="p-3 border-b border-gray-200">
                          <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
                            autoFocus
                          />
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {filteredProducts.length === 0 ? (
                            <p className="text-center text-gray-500 py-4 text-sm">No products found</p>
                          ) : (
                            filteredProducts.map(product => (
                              <button
                                key={product._id}
                                onClick={() => selectProduct(product)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors flex items-center gap-3"
                              >
                                <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                  {product.images?.[0]?.url ? (
                                    <img
                                      src={product.images[0].url}
                                      alt={product.productName}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Package className="w-5 h-5 text-gray-400 m-2.5" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{product.productName}</p>
                                  <p className="text-xs text-gray-500">{formatPrice(product.pricePerUnit)} / {getUnitLabel(product.orderUnit)}</p>
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Tag Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tag <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newItemForm.tag}
                onChange={(e) => setNewItemForm({ ...newItemForm, tag: e.target.value })}
                placeholder="e.g., Limited Time Offer, Best Seller, Hot Deal"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">This tag will appear on the popup badge</p>
            </div>

            {/* Intervals Configuration */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timing Intervals (seconds)
              </label>
              <p className="text-xs text-gray-500 mb-3">
                First interval is the delay before first popup. Subsequent intervals are delays after each close.
              </p>
              <div className="space-y-2">
                {newItemForm.intervals.map((interval, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-32">
                      {idx === 0 ? 'Initial delay:' : `After close ${idx}:`}
                    </span>
                    <input
                      type="number"
                      value={interval.delay}
                      onChange={(e) => updateIntervalInNew(idx, e.target.value)}
                      min="0"
                      step="1"
                      className="w-24 px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
                    />
                    <span className="text-sm text-gray-500">seconds</span>
                    {idx > 0 && (
                      <button
                        onClick={() => removeIntervalFromNew(idx)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                      >
                        <MinusCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addIntervalToNew}
                className="mt-2 text-sm text-[#6B4F3A] hover:underline flex items-center gap-1"
              >
                <PlusCircle className="w-4 h-4" />
                Add Another Interval
              </button>
            </div>

            {/* Max Shows */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum number of times to show
              </label>
              <select
                value={newItemForm.maxShows}
                onChange={(e) => setNewItemForm({ ...newItemForm, maxShows: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none"
              >
                <option value={1}>1 time</option>
                <option value={2}>2 times</option>
                <option value={3}>3 times</option>
                <option value={4}>4 times</option>
                <option value={5}>5 times</option>
                <option value={6}>6 times</option>
                <option value={7}>7 times</option>
                <option value={8}>8 times</option>
                <option value={9}>9 times</option>
                <option value={10}>10 times</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Popup will not appear after this many total shows</p>
            </div>

            {/* Active Status */}
            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItemForm.isActive}
                  onChange={(e) => setNewItemForm({ ...newItemForm, isActive: e.target.checked })}
                  className="w-4 h-4 rounded focus:ring-[#6B4F3A]"
                />
                <span className="text-sm text-gray-700">Active (immediately start showing)</span>
              </label>
            </div>

            {/* Create Button */}
            <button
              onClick={createPromotionalItem}
              disabled={saving || !newItemForm.productId || !newItemForm.tag}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#6B4F3A] text-white rounded-lg hover:bg-[#8B6B51] transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Create Promotional Post
            </button>
          </div>

          {/* Right Column - List of Promotional Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#6B4F3A]" />
                Promotional Posts ({promotionalItems.length})
              </h2>
              <button
                onClick={fetchPromotionalItems}
                className="p-2 text-gray-400 hover:text-[#6B4F3A] transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {promotionalItems.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No promotional posts created yet</p>
                <p className="text-xs text-gray-400 mt-1">Use the form to create your first promotional post</p>
              </div>
            ) : (
              <div className="space-y-4">
                {promotionalItems.map((item) => {
                  const product = item.productId;
                  if (!product) return null;
                  
                  return (
                    <div key={item._id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          {/* Product Image */}
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                            {product.images?.[0]?.url ? (
                              <img
                                src={product.images[0].url}
                                alt={product.productName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-gray-400 m-5" />
                            )}
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm">{product.productName}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <span>{formatPrice(product.pricePerUnit)}/{getUnitLabel(product.orderUnit)}</span>
                              <span>•</span>
                              <span>MOQ: {product.moq}</span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2 py-0.5 bg-[#F5E6D3] text-[#6B4F3A] text-xs rounded-full">
                                Tag: {item.tag}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                Max Shows: {item.maxShows}
                              </span>
                              <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {item.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                              Intervals: {item.intervals.map((i, idx) => (
                                <span key={idx} className="inline-block mr-2">
                                  {idx === 0 ? 'First: ' : `${idx}th close: `}{i.delay}s
                                </span>
                              ))}
                            </div>
                            {/* Add this inside the product details div */}
<div className="text-xs text-gray-400 mt-1">
  Created: {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
</div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEditing(item)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deletePromotionalItem(item._id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Edit Form */}
                        {editingItem?._id === item._id && (
                          <div className="border-t border-gray-200 mt-3 pt-3">
                            <h4 className="font-medium text-gray-900 text-sm mb-3">Edit Configuration</h4>
                            
                            {/* Tag */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Tag</label>
                              <input
                                type="text"
                                value={editForm.tag}
                                onChange={(e) => setEditForm({ ...editForm, tag: e.target.value })}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] focus:border-[#6B4F3A] outline-none"
                              />
                            </div>
                            
                            {/* Intervals */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Intervals (seconds)</label>
                              <div className="space-y-1">
                                {editForm.intervals.map((interval, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 w-28">
                                      {idx === 0 ? 'Initial:' : `After close ${idx}:`}
                                    </span>
                                    <input
                                      type="number"
                                      value={interval.delay}
                                      onChange={(e) => updateIntervalInEdit(idx, e.target.value)}
                                      min="0"
                                      step="1"
                                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] outline-none"
                                    />
                                    <span className="text-xs text-gray-500">seconds</span>
                                    {idx > 0 && (
                                      <button
                                        onClick={() => removeIntervalFromEdit(idx)}
                                        className="p-0.5 text-red-500 hover:bg-red-50 rounded"
                                      >
                                        <MinusCircle className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <button
                                onClick={addIntervalToEdit}
                                className="mt-1 text-xs text-[#6B4F3A] hover:underline flex items-center gap-0.5"
                              >
                                <PlusCircle className="w-3 h-3" />
                                Add Interval
                              </button>
                            </div>
                            
                            {/* Max Shows */}
                            <div className="mb-3">
                              <label className="block text-xs font-medium text-gray-700 mb-1">Max Shows</label>
                              <select
                                value={editForm.maxShows}
                                onChange={(e) => setEditForm({ ...editForm, maxShows: parseInt(e.target.value) })}
                                className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#6B4F3A] outline-none"
                              >
                                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                  <option key={num} value={num}>{num} time{num > 1 ? 's' : ''}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Active Status */}
                            <div className="mb-3">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={editForm.isActive}
                                  onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                                  className="w-3.5 h-3.5 rounded"
                                />
                                <span className="text-xs text-gray-700">Active</span>
                              </label>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={updatePromotionalItem}
                                disabled={saving}
                                className="px-3 py-1 bg-[#6B4F3A] text-white text-sm rounded hover:bg-[#8B6B51] transition-colors"
                              >
                                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Save Changes'}
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}