





// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { 
//   Plus, 
//   X, 
//   Save, 
//   ArrowLeft,
//   Image as ImageIcon,
//   AlertCircle,
//   Loader2,
//   Trash2,
//   Upload,
//   Package,
//   DollarSign,
//   Palette,
//   Ruler,
//   MinusCircle,
//   PlusCircle,
//   ChevronDown,
//   Users,
//   Info,
//   Hash,
//   Type,
//   Star,
//   Search,
//   Tag,
//   FolderTree,
//   GripVertical,
//   Scale,
//   Wrench
// } from 'lucide-react';
// import NextLink from 'next/link';
// import { toast } from 'sonner';
// import { SketchPicker } from 'react-color';
// import { MantineProvider } from '@mantine/core';
// import { RichTextEditor } from '@mantine/tiptap';
// import { useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import TextAlign from '@tiptap/extension-text-align';
// import Link from '@tiptap/extension-link';

// import '@mantine/tiptap/styles.css';
// import '@mantine/core/styles.css';

// // Predefined colors for quick selection
// const PREDEFINED_COLORS = [
//   '#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF',
//   '#000000', '#FFFFFF', '#808080', '#800000', '#808000', '#008000',
//   '#800080', '#008080', '#000080', '#FFA500', '#FFC0CB', '#A52A2A',
//   '#6B4F3A', '#4A90E2', '#50C878', '#9B59B6', '#E74C3C', '#F39C12', '#1ABC9C'
// ];

// // Targeted customer options
// const TARGETED_CUSTOMERS = [
//   { value: 'ladies', label: 'Ladies', icon: '👩' },
//   { value: 'gents', label: 'Gents', icon: '👨' },
//   { value: 'kids', label: 'Kids', icon: '🧒' },
//   { value: 'unisex', label: 'Unisex', icon: '👤' }
// ];

// // Available tags
// // const AVAILABLE_TAGS = [
// //   'Top Ranking',
// //   'New Arrival',
// //   'Top Deal',
// //   'Best Seller',
// //   'Summer Collection',
// //   'Winter Collection',
// //   'Limited Edition',
// //   'Trending'
// // ];

// const AVAILABLE_TAGS = [
//   'Best Seller',
//   'New Arrival',
//   'Top Deal',
//   'Eco-Friendly',
//   'Hot Export Item',
//   'Customizable',
//   'Premium Quality',
//   'Trending'
// ];

// // Order unit options - Updated with Metric Ton
// const ORDER_UNITS = [
//   { value: 'piece', label: 'Pieces / Units', icon: '📦', description: 'Sell by individual pieces/units', unitLabel: 'pieces' },
//   { value: 'kg', label: 'Kilogram (KG)', icon: '⚖️', description: 'Sell by weight in kilograms', unitLabel: 'kg' },
//   { value: 'ton', label: 'Metric Ton (MT)', icon: '🏗️', description: 'Sell by metric ton (1000 kg)', unitLabel: 'metric tons' }
// ];

// // Conversion factors for display
// const UNIT_CONVERSION = {
//   piece: { factor: 1, label: 'pieces', shortLabel: 'pcs' },
//   kg: { factor: 1, label: 'kg', shortLabel: 'kg' },
//   ton: { factor: 1000, label: 'metric tons', shortLabel: 'MT' }
// };

// // Cloudinary upload function
// const uploadToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'b2b-products');
//   formData.append('folder', 'b2b-products');
  
//   try {
//     const response = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: 'POST',
//         body: formData,
//       }
//     );
    
//     const data = await response.json();
//     if (data.secure_url) {
//       return {
//         url: data.secure_url,
//         publicId: data.public_id,
//       };
//     } else {
//       throw new Error('Upload failed');
//     }
//   } catch (error) {
//     console.error('Cloudinary upload error:', error);
//     throw error;
//   }
// };

// export default function ModeratorCreateProduct() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [currentColorIndex, setCurrentColorIndex] = useState(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [keywordInput, setKeywordInput] = useState('');
//   const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  
//   const [showTags, setShowTags] = useState(false);
//   const [showMeta, setShowMeta] = useState(false);
  
//   // NEW: Order unit state
//   const [orderUnit, setOrderUnit] = useState('piece'); // 'piece', 'kg', or 'ton'

//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [dragOverIndex, setDragOverIndex] = useState(null);
//   const colorPickerRef = useRef(null);
  
//   const [formData, setFormData] = useState({
//     productName: '',
//     description: '',
//     instruction: '', 
//     category: '',
//     subcategory: '',
//     childSubcategory: '',
//     targetedCustomer: 'unisex',
//     fabric: '',
//     weightPerUnit: '', // Weight per piece/unit in kg (for reference)
//     orderUnit: 'piece', // 'piece', 'kg', or 'ton'
//     moq: 100,
//     pricePerUnit: 0,
//     quantityBasedPricing: [
//       { range: '100-299', price: 0 }
//     ],
//     sizes: ['S', 'M', 'L', 'XL', 'XXL'],
//     colors: [
//       { code: '#6B4F3A' },
//       { code: '#F5E6D3' },
//       { code: '#3A7D44' }
//     ],
//     additionalInfo: [],
//     customizationOptions: [],
//     isFeatured: false,
//     tags: [],
//     metaSettings: {
//       metaTitle: '',
//       metaDescription: '',
//       metaKeywords: []
//     }
//   });

//   // Image state with upload status - 6 slots
//   const [productImages, setProductImages] = useState([
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false },
//     { file: null, preview: null, error: '', url: null, publicId: null, uploading: false }
//   ]);

//   const fileInputRefs = useRef([]);
//   const [errors, setErrors] = useState({});

//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//   const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
//   const maxFileSize = 5 * 1024 * 1024;

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
//         setShowColorPicker(false);
//         setCurrentColorIndex(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Update pricing range labels when order unit changes
//   useEffect(() => {
//     const unit = ORDER_UNITS.find(u => u.value === orderUnit);
//     const unitLabel = unit?.unitLabel || 'pieces';
    
//     if (orderUnit === 'kg') {
//       setFormData(prev => ({
//         ...prev,
//         quantityBasedPricing: [
//           { range: '100-499', price: 0 }
//         ]
//       }));
//     } else if (orderUnit === 'ton') {
//       setFormData(prev => ({
//         ...prev,
//         quantityBasedPricing: [
//           { range: '1-4', price: 0 }
//         ]
//       }));
//     } else {
//       // piece based
//       setFormData(prev => ({
//         ...prev,
//         quantityBasedPricing: [
//           { range: '100-299', price: 0 }
//         ]
//       }));
//     }
//   }, [orderUnit]);

//   // TipTap editors
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: { keepMarks: true, keepAttributes: false },
//         orderedList: { keepMarks: true, keepAttributes: false },
//       }),
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
//       }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: formData.description,
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, description: editor.getHTML() }));
//     },
//     immediatelyRender: false,
//     editable: true,
//   });

//   const instructionEditor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: { keepMarks: true, keepAttributes: false },
//         orderedList: { keepMarks: true, keepAttributes: false },
//       }),
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
//       }),
//       TextAlign.configure({ types: ['heading', 'paragraph'] }),
//     ],
//     content: formData.instruction,
//     onUpdate: ({ editor }) => {
//       setFormData(prev => ({ ...prev, instruction: editor.getHTML() }));
//     },
//     immediatelyRender: false,
//     editable: true,
//   });

//   // Fetch categories on mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Fetch subcategories when category changes
//   useEffect(() => {
//     if (formData.category) {
//       fetchSubcategories(formData.category);
//       fetchCategoryDetails(formData.category);
//     } else {
//       setSubcategories([]);
//       setSelectedCategoryDetails(null);
//       setChildSubcategories([]);
//       setShowChildSubcategory(false);
//       setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' }));
//     }
//   }, [formData.category]);

//   // Fetch child subcategories when subcategory changes
//   useEffect(() => {
//     if (formData.category && formData.subcategory) {
//       fetchChildSubcategories(formData.category, formData.subcategory);
//     } else {
//       setChildSubcategories([]);
//       setShowChildSubcategory(false);
//       setFormData(prev => ({ ...prev, childSubcategory: '' }));
//     }
//   }, [formData.subcategory]);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (user.role !== 'moderator' && user.role !== 'admin') {
//       router.push('/login');
//     }
//   }, [router]);

//   const fetchCategories = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/categories', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setCategories(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       toast.error('Failed to fetch categories');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setSubcategories(data.data.subcategories);
//       } else {
//         setSubcategories([]);
//       }
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//       setSubcategories([]);
//     }
//   };

//   const fetchChildSubcategories = async (categoryId, subcategoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setChildSubcategories(data.data.children);
//         setShowChildSubcategory(data.data.children.length > 0);
//       } else {
//         setChildSubcategories([]);
//         setShowChildSubcategory(false);
//       }
//     } catch (error) {
//       console.error('Error fetching child subcategories:', error);
//       setChildSubcategories([]);
//       setShowChildSubcategory(false);
//     }
//   };

//   const fetchCategoryDetails = async (categoryId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setSelectedCategoryDetails(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching category details:', error);
//     }
//   };

//   const validateImageFile = (file) => {
//     if (!allowedFileTypes.includes(file.type)) {
//       const fileExtension = file.name.split('.').pop().toLowerCase();
//       return {
//         valid: false,
//         message: `Invalid format: .${fileExtension}. Allowed: ${allowedExtensions.join(', ')}`
//       };
//     }

//     if (file.size > maxFileSize) {
//       const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
//       return {
//         valid: false,
//         message: `File too large: ${fileSizeMB}MB. Max: 5MB`
//       };
//     }

//     return { valid: true };
//   };

//   const handleImageChange = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const validation = validateImageFile(file);
//     if (!validation.valid) {
//       const updatedImages = [...productImages];
//       updatedImages[index] = { ...updatedImages[index], error: validation.message };
//       setProductImages(updatedImages);
//       return;
//     }

//     const previewUrl = URL.createObjectURL(file);
    
//     const updatedImages = [...productImages];
//     updatedImages[index] = {
//       file: file,
//       preview: previewUrl,
//       error: '',
//       uploading: true,
//       url: null,
//       publicId: null
//     };
//     setProductImages(updatedImages);

//     try {
//       const { url, publicId } = await uploadToCloudinary(file);
      
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         updated[index] = {
//           ...updated[index],
//           url: url,
//           publicId: publicId,
//           uploading: false
//         };
//         return updated;
//       });
      
//       toast.success(`Image ${index + 1} uploaded successfully`);
//     } catch (error) {
//       console.error('Upload error:', error);
//       setProductImages(prevImages => {
//         const updated = [...prevImages];
//         updated[index] = {
//           ...updated[index],
//           error: 'Failed to upload image to Cloudinary',
//           uploading: false
//         };
//         return updated;
//       });
//       toast.error(`Failed to upload image ${index + 1}`);
//     }
//   };

//   // const handleMultipleImageSelect = async (e) => {
//   //   const files = Array.from(e.target.files);
    
//   //   if (files.length === 0) return;
    
//   //   const currentImagesCount = productImages.filter(img => img.url !== null || img.uploading).length;
//   //   const availableSlots = 6 - currentImagesCount;
    
//   //   if (files.length > availableSlots) {
//   //     toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
//   //     return;
//   //   }
    
//   //   const emptySlots = [];
//   //   for (let i = 0; i < productImages.length; i++) {
//   //     if (!productImages[i].url && !productImages[i].uploading && !productImages[i].preview) {
//   //       emptySlots.push(i);
//   //     }
//   //   }
    
//   //   const tempImages = [...productImages];
    
//   //   for (let i = 0; i < files.length && i < emptySlots.length; i++) {
//   //     const file = files[i];
//   //     const slotIndex = emptySlots[i];
      
//   //     const validation = validateImageFile(file);
//   //     if (!validation.valid) {
//   //       toast.error(`Image ${i + 1}: ${validation.message}`);
//   //       continue;
//   //     }
      
//   //     const previewUrl = URL.createObjectURL(file);
      
//   //     tempImages[slotIndex] = {
//   //       file: file,
//   //       preview: previewUrl,
//   //       error: '',
//   //       uploading: true,
//   //       url: null,
//   //       publicId: null
//   //     };
//   //   }
    
//   //   setProductImages([...tempImages]);
    
//   //   for (let i = 0; i < files.length && i < emptySlots.length; i++) {
//   //     const file = files[i];
//   //     const slotIndex = emptySlots[i];
      
//   //     const validation = validateImageFile(file);
//   //     if (!validation.valid) {
//   //       const updatedImages = [...productImages];
//   //       updatedImages[slotIndex] = { file: null, preview: null, error: validation.message, url: null, publicId: null, uploading: false };
//   //       setProductImages(updatedImages);
//   //       continue;
//   //     }
      
//   //     try {
//   //       const { url, publicId } = await uploadToCloudinary(file);
        
//   //       setProductImages(prevImages => {
//   //         const updatedImages = [...prevImages];
//   //         updatedImages[slotIndex] = {
//   //           ...updatedImages[slotIndex],
//   //           url: url,
//   //           publicId: publicId,
//   //           uploading: false
//   //         };
//   //         return updatedImages;
//   //       });
        
//   //       toast.success(`Image ${i + 1} uploaded successfully`);
//   //     } catch (error) {
//   //       console.error('Upload error:', error);
//   //       setProductImages(prevImages => {
//   //         const updatedImages = [...prevImages];
//   //         updatedImages[slotIndex] = {
//   //           ...updatedImages[slotIndex],
//   //           error: 'Failed to upload image',
//   //           uploading: false
//   //         };
//   //         return updatedImages;
//   //       });
//   //       toast.error(`Failed to upload image ${i + 1}`);
//   //     }
//   //   }
    
//   //   if (fileInputRefs.current['multiple']) {
//   //     fileInputRefs.current['multiple'].value = '';
//   //   }
//   // };


// const handleMultipleImageSelect = async (e) => {
//   const files = Array.from(e.target.files);
  
//   if (files.length === 0) return;
  
//   const currentImagesCount = productImages.filter(img => img.url !== null || img.uploading).length;
//   const availableSlots = 6 - currentImagesCount;
  
//   if (files.length > availableSlots) {
//     toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
//     if (fileInputRefs.current['multiple']) {
//       fileInputRefs.current['multiple'].value = '';
//     }
//     return;
//   }
  
//   // First, validate all files and collect valid ones WITH THEIR ORIGINAL INDEX
//   const validFiles = [];
//   const invalidFiles = [];
  
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const validation = validateImageFile(file);
//     if (validation.valid) {
//       validFiles.push({ file, originalIndex: i });
//     } else {
//       invalidFiles.push({ index: i + 1, message: validation.message });
//       toast.error(`Image ${i + 1}: ${validation.message}`);
//     }
//   }
  
//   // If no valid files, return early
//   if (validFiles.length === 0) {
//     toast.error('No valid images to upload');
//     if (fileInputRefs.current['multiple']) {
//       fileInputRefs.current['multiple'].value = '';
//     }
//     return;
//   }
  
//   // Find empty slots in productImages in order (first empty slot gets first image, etc.)
//   const emptySlots = [];
//   for (let i = 0; i < productImages.length; i++) {
//     if (!productImages[i].url && !productImages[i].uploading && !productImages[i].preview) {
//       emptySlots.push(i);
//     }
//   }
  
//   // Check if we have enough empty slots for valid files
//   if (validFiles.length > emptySlots.length) {
//     toast.error(`Only ${emptySlots.length} slots available. Please remove some images first.`);
//     if (fileInputRefs.current['multiple']) {
//       fileInputRefs.current['multiple'].value = '';
//     }
//     return;
//   }
  
//   // Create temporary state for uploading - preserve selection order
//   const tempImages = [...productImages];
  
//   // Assign files to slots in the order they were selected
//   for (let i = 0; i < validFiles.length; i++) {
//     const { file } = validFiles[i];
//     const slotIndex = emptySlots[i]; // This ensures first selected image goes to first empty slot
//     const previewUrl = URL.createObjectURL(file);
    
//     tempImages[slotIndex] = {
//       file: file,
//       preview: previewUrl,
//       error: '',
//       uploading: true,
//       url: null,
//       publicId: null
//     };
//   }
  
//   setProductImages([...tempImages]);
  
//   // Upload each valid file in the order they were selected
//   for (let i = 0; i < validFiles.length; i++) {
//     const { file } = validFiles[i];
//     const slotIndex = emptySlots[i];
    
//     try {
//       const { url, publicId } = await uploadToCloudinary(file);
      
//       setProductImages(prevImages => {
//         const updatedImages = [...prevImages];
//         updatedImages[slotIndex] = {
//           ...updatedImages[slotIndex],
//           url: url,
//           publicId: publicId,
//           uploading: false
//         };
//         return updatedImages;
//       });
      
//       toast.success(`Image uploaded successfully`);
//     } catch (error) {
//       console.error('Upload error:', error);
//       setProductImages(prevImages => {
//         const updatedImages = [...prevImages];
//         updatedImages[slotIndex] = {
//           ...updatedImages[slotIndex],
//           error: 'Failed to upload image',
//           uploading: false,
//           preview: null,
//           file: null
//         };
//         return updatedImages;
//       });
//       toast.error(`Failed to upload one image`);
//     }
//   }
  
//   // Show summary of skipped invalid files
//   if (invalidFiles.length > 0) {
//     toast.warning(`${invalidFiles.length} image(s) skipped due to validation errors`);
//   }
  
//   // Clear the file input
//   if (fileInputRefs.current['multiple']) {
//     fileInputRefs.current['multiple'].value = '';
//   }
// };
//   // const removeImage = (index) => {
//   //   if (productImages[index].preview && productImages[index].preview.startsWith('blob:')) {
//   //     URL.revokeObjectURL(productImages[index].preview);
//   //   }
    
//   //   const updatedImages = [...productImages];
//   //   updatedImages[index] = { file: null, preview: null, error: '', url: null, publicId: null, uploading: false };
//   //   setProductImages(updatedImages);
//   //   if (fileInputRefs.current[index]) {
//   //     fileInputRefs.current[index].value = '';
//   //   }
//   // };


//   const removeImage = (index) => {
//   // Check if there's an image being uploaded at this index
//   const imageToRemove = productImages[index];
  
//   // Revoke object URL if it exists (to prevent memory leaks)
//   if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
//     URL.revokeObjectURL(imageToRemove.preview);
//   }
  
//   // Reset the image slot completely
//   const updatedImages = [...productImages];
//   updatedImages[index] = { 
//     file: null, 
//     preview: null, 
//     error: '', 
//     url: null, 
//     publicId: null, 
//     uploading: false 
//   };
  
//   setProductImages(updatedImages);
  
//   // Clear the file input value for this slot if it exists
//   if (fileInputRefs.current[index]) {
//     fileInputRefs.current[index].value = '';
//   }
  
//   // Show success message for removal
//   toast.success(`Image removed from slot ${index + 1}`);
// };
//   const moveImage = (fromIndex, toIndex) => {
//     const updatedImages = [...productImages];
//     const [movedImage] = updatedImages.splice(fromIndex, 1);
//     updatedImages.splice(toIndex, 0, movedImage);
//     setProductImages(updatedImages);
//   };

//   const handleDragStart = (index) => {
//     setDraggedIndex(index);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDragOverWithFeedback = (event, index) => {
//     event.preventDefault();
//     if (productImages[index].preview) {
//       setDragOverIndex(index);
//     }
//   };

//   const handleDragLeave = () => {
//     setDragOverIndex(null);
//   };

//   const handleDrop = (dropIndex) => {
//     if (draggedIndex === null || draggedIndex === dropIndex) {
//       setDragOverIndex(null);
//       setDraggedIndex(null);
//       return;
//     }
//     moveImage(draggedIndex, dropIndex);
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const handleDragEnd = () => {
//     setDraggedIndex(null);
//     setDragOverIndex(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

// const handleOrderUnitChange = (unit) => {
//   setOrderUnit(unit);
  
//   // Clear sizes when unit is not 'piece'
//   const updatedSizes = unit !== 'piece' ? [] : formData.sizes;
  
//   setFormData(prev => ({ 
//     ...prev, 
//     orderUnit: unit,
//     moq: unit === 'ton' ? 1 : 100,
//     pricePerUnit: 0,
//     sizes: updatedSizes  // Clear sizes for kg/ton
//   }));
// };

//   const handlePricingChange = (index, field, value) => {
//     const updatedPricing = [...formData.quantityBasedPricing];
    
//     if (field === 'price') {
//       if (value === '') {
//         updatedPricing[index] = { ...updatedPricing[index], [field]: '' };
//       } else {
//         const numValue = parseFloat(value);
//         if (!isNaN(numValue)) {
//           updatedPricing[index] = { ...updatedPricing[index], [field]: numValue };
//         }
//       }
//     } else {
//       updatedPricing[index] = { ...updatedPricing[index], [field]: value };
//     }
    
//     setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
//   };

//   const addPricingRow = () => {
//     let newRange = '5000+';
//     if (orderUnit === 'ton') {
//       newRange = '50+';
//     } else if (orderUnit === 'kg') {
//       newRange = '5000+';
//     } else {
//       newRange = '5000+';
//     }
//     setFormData(prev => ({
//       ...prev,
//       quantityBasedPricing: [
//         ...prev.quantityBasedPricing,
//         { range: newRange, price: 0 }
//       ]
//     }));
//   };

//   const removePricingRow = (index) => {
//     if (formData.quantityBasedPricing.length > 1) {
//       const updatedPricing = formData.quantityBasedPricing.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
//     }
//   };

//   const handleSizeChange = (index, value) => {
//     const updatedSizes = [...formData.sizes];
//     updatedSizes[index] = value;
//     setFormData(prev => ({ ...prev, sizes: updatedSizes }));
//   };

//   const addSize = () => {
//     setFormData(prev => ({
//       ...prev,
//       sizes: [...prev.sizes, '']
//     }));
//   };

//   const removeSize = (index) => {
//     if (formData.sizes.length > 1) {
//       const updatedSizes = formData.sizes.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, sizes: updatedSizes }));
//     }
//   };

//   const handleColorChange = (index, field, value) => {
//     const updatedColors = [...formData.colors];
//     updatedColors[index] = { ...updatedColors[index], [field]: value };
//     setFormData(prev => ({ ...prev, colors: updatedColors }));
//   };

//   const openColorPicker = (index, event) => {
//     event.stopPropagation();
//     setCurrentColorIndex(index);
//     setShowColorPicker(true);
//   };

//   const addColor = () => {
//     setFormData(prev => ({
//       ...prev,
//       colors: [...prev.colors, { code: '#6B4F3A' }]
//     }));
//   };

//   const removeColor = (index) => {
//     if (formData.colors.length > 1) {
//       const updatedColors = formData.colors.filter((_, i) => i !== index);
//       setFormData(prev => ({ ...prev, colors: updatedColors }));
//     }
//   };

//   const handleAdditionalInfoChange = (index, field, value) => {
//     const updatedInfo = [...formData.additionalInfo];
//     updatedInfo[index] = { ...updatedInfo[index], [field]: value };
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    
//     if (errors[`additionalInfo_${index}_${field}`]) {
//       setErrors(prev => ({ ...prev, [`additionalInfo_${index}_${field}`]: null }));
//     }
//   };

//   const addAdditionalInfo = () => {
//     setFormData(prev => ({
//       ...prev,
//       additionalInfo: [
//         ...prev.additionalInfo,
//         { fieldName: '', fieldValue: '' }
//       ]
//     }));
//   };

//   const removeAdditionalInfo = (index) => {
//     const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
//   };

//   const handleCustomizationChange = (index, field, value) => {
//     const updatedOptions = [...formData.customizationOptions];
//     updatedOptions[index] = { ...updatedOptions[index], [field]: value };
//     setFormData(prev => ({ ...prev, customizationOptions: updatedOptions }));
//   };

//   const addCustomizationOption = () => {
//     setFormData(prev => ({
//       ...prev,
//       customizationOptions: [
//         ...prev.customizationOptions,
//         { title: '', value: '' }
//       ]
//     }));
//   };

//   const removeCustomizationOption = (index) => {
//     const updatedOptions = formData.customizationOptions.filter((_, i) => i !== index);
//     setFormData(prev => ({ ...prev, customizationOptions: updatedOptions }));
//   };

//   const handleTagToggle = (tag) => {
//     setFormData(prev => ({
//       ...prev,
//       tags: prev.tags.includes(tag) ? [] : [tag]
//     }));
//   };

//   const handleMetaChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         [field]: value
//       }
//     }));
//   };

//   const addKeyword = () => {
//     if (!keywordInput.trim()) return;
    
//     const keywordsToAdd = keywordInput
//       .split(',')
//       .map(k => k.trim())
//       .filter(k => k !== '');
    
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd]
//       }
//     }));
//     setKeywordInput('');
//   };

//   const handleKeywordKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       addKeyword();
//     }
//   };

//   const handleKeywordBlur = () => {
//     if (keywordInput.trim()) {
//       addKeyword();
//     }
//   };

//   const removeKeyword = (indexToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       metaSettings: {
//         ...prev.metaSettings,
//         metaKeywords: prev.metaSettings.metaKeywords.filter((_, index) => index !== indexToRemove)
//       }
//     }));
//   };

//   const validateAdditionalInfo = () => {
//     let isValid = true;
//     const newErrors = {};

//     formData.additionalInfo.forEach((info, index) => {
//       if (!info.fieldName.trim()) {
//         newErrors[`additionalInfo_${index}_fieldName`] = 'Field name is required';
//         isValid = false;
//       }
//       if (!info.fieldValue.trim()) {
//         newErrors[`additionalInfo_${index}_fieldValue`] = 'Field value is required';
//         isValid = false;
//       }
//     });

//     setErrors(prev => ({ ...prev, ...newErrors }));
//     return isValid;
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.productName.trim()) {
//       newErrors.productName = 'Product name is required';
//     }

//     if (!formData.category) {
//       newErrors.category = 'Category is required';
//     }

//     if (!formData.targetedCustomer) {
//       newErrors.targetedCustomer = 'Targeted customer is required';
//     }

//     if (!formData.fabric.trim()) {
//       newErrors.fabric = 'Fabric details are required';
//     }

//     if (formData.moq < 1) {
//       newErrors.moq = 'MOQ must be at least 1';
//     }

//     if (formData.pricePerUnit < 0) {
//       newErrors.pricePerUnit = 'Price must be 0 or greater';
//     }

//     const hasImages = productImages.some(img => img.url !== null);
//     if (!hasImages) {
//       newErrors.images = 'At least one product image is required';
//     }

//     if (formData.colors.length === 0) {
//       newErrors.colors = 'At least one color is required';
//     }

//     if (formData.metaSettings.metaTitle && formData.metaSettings.metaTitle.length > 70) {
//       newErrors.metaTitle = 'Meta title should not exceed 70 characters';
//     }

//     if (formData.metaSettings.metaDescription && formData.metaSettings.metaDescription.length > 160) {
//       newErrors.metaDescription = 'Meta description should not exceed 160 characters';
//     }

//     setErrors(newErrors);
//     const isAdditionalInfoValid = validateAdditionalInfo();
    
//     return Object.keys(newErrors).length === 0 && isAdditionalInfoValid;
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   // Add debug logs
//   const token = localStorage.getItem('token');
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
  
//   console.log('=== SUBMIT DEBUG ===');
//   console.log('Token exists:', !!token);
//   console.log('User role:', user.role);
//   console.log('User email:', user.email);
//   console.log('User ID:', user.id);
//   console.log('Token first 20 chars:', token?.substring(0, 20));
  
//   // Check if token is expired
//   if (token) {
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       console.log('Token expiry:', new Date(payload.exp * 1000));
//       console.log('Token is expired:', Date.now() >= payload.exp * 1000);
//       console.log('Token payload:', payload);
//     } catch (e) {
//       console.log('Could not parse token:', e);
//     }
//   }

//   const uploading = productImages.some(img => img.uploading === true);
//   if (uploading) {
//     toast.error('Please wait for all images to finish uploading');
//     return;
//   }

//   const hasEmptyPrice = formData.quantityBasedPricing.some(tier => tier.price === '');
//   if (hasEmptyPrice) {
//     toast.error('Please fill in all price fields in Quantity Based Pricing');
//     return;
//   }

//   if (!validateForm()) {
//     toast.error('Please fix the errors in the form');
//     return;
//   }

//   setIsSubmitting(true);

//   try {
//     const token = localStorage.getItem('token');
//     console.log('Using token for API call:', !!token);
    
//     const imageUrls = productImages
//       .filter(img => img.url !== null)
//       .map(img => img.url);
    
//     console.log('Image URLs count:', imageUrls.length);
    
//     const processedPricing = formData.quantityBasedPricing.map(tier => ({
//       ...tier,
//       price: tier.price === '' ? 0 : parseFloat(tier.price)
//     }));

//     const processedAdditionalInfo = formData.additionalInfo.filter(
//       info => info.fieldName.trim() !== '' && info.fieldValue.trim() !== ''
//     );

//     const processedCustomizationOptions = formData.customizationOptions.filter(
//       option => option.title.trim() !== '' && option.value.trim() !== ''
//     );

//     // Only include sizes if order unit is 'piece', otherwise send empty array
//     const filteredSizes = orderUnit === 'piece' 
//       ? formData.sizes.filter(s => s.trim() !== '')
//       : [];

//     const payload = {
//       productName: formData.productName,
//       description: formData.description,
//       instruction: formData.instruction || '',
//       category: formData.category,
//       subcategory: formData.subcategory || '',
//       childSubcategory: formData.childSubcategory || '',
//       targetedCustomer: formData.targetedCustomer,
//       fabric: formData.fabric,
//       weightPerUnit: formData.weightPerUnit || '',
//       orderUnit: orderUnit,
//       moq: formData.moq,
//       pricePerUnit: formData.pricePerUnit === 0 ? '' : formData.pricePerUnit,
//       quantityBasedPricing: processedPricing,
//       sizes: filteredSizes,
//       colors: formData.colors,
//       additionalInfo: processedAdditionalInfo,
//       customizationOptions: processedCustomizationOptions,
//       images: imageUrls,
//       isFeatured: formData.isFeatured,
//       tags: formData.tags,
//       metaSettings: formData.metaSettings
//     };

//     console.log('Sending payload to:', 'http://localhost:5000/api/products');
//     console.log('Payload summary:', {
//       productName: payload.productName,
//       category: payload.category,
//       orderUnit: payload.orderUnit,
//       imagesCount: payload.images.length,
//       sizesCount: payload.sizes.length,
//       colorsCount: payload.colors.length
//     });

//     const response = await fetch('http://localhost:5000/api/products', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payload)
//     });

//     console.log('Response status:', response.status);
//     console.log('Response status text:', response.statusText);

//     const data = await response.json();
//     console.log('Response data:', data);

//     if (response.ok && data.success) {
//       toast.success('Product created successfully!');
//       router.push('/moderator/all-products');
//     } else {
//       console.error('API Error:', data);
//       toast.error(data.error || 'Failed to create product');
      
//       // If unauthorized, redirect to login
//       if (response.status === 401) {
//         console.log('Unauthorized - redirecting to login');
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         router.push('/login');
//       }
//     }
//   } catch (error) {
//     console.error('Error creating product:', error);
//     toast.error('Network error. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   const getSelectedCustomerIcon = () => {
//     const customer = TARGETED_CUSTOMERS.find(c => c.value === formData.targetedCustomer);
//     return customer ? customer.icon : '👤';
//   };

//   const getCurrentUnitLabel = () => {
//     const unit = ORDER_UNITS.find(u => u.value === orderUnit);
//     return unit?.unitLabel || 'pieces';
//   };

//   const getPricePerLabel = () => {
//     const unit = ORDER_UNITS.find(u => u.value === orderUnit);
//     if (orderUnit === 'piece') return 'Per Piece';
//     if (orderUnit === 'kg') return 'Per KG';
//     return 'Per Metric Ton';
//   };

//   return (
//     <MantineProvider>
//       <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
//         {/* Header */}
//         <div className="bg-white border-b shadow-sm sticky top-0 z-10" style={{ borderBottomColor: '#6B4F3A' }}>
//           <div className="px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <NextLink href="/moderator/all-products" className="p-2 hover:bg-[#F5E6D3] rounded-lg transition-colors">
//                   <ArrowLeft className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                 </NextLink>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <h1 className="text-2xl font-bold" style={{ color: '#2A2A2A', fontFamily: 'Playfair Display, serif' }}>Create New Product</h1>
//                     <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>
//                       Moderator
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">Add a new jute product to your catalog</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit}>
//             {/* Row 1: Basic Details and Product Images */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//               {/* Basic Details Card */}
//               <div className="lg:col-span-2">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                       <Package className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                       Basic Details
//                     </h2>
//                   </div>
                  
//                   <div className="p-5 space-y-4">
//                     {/* Product Name */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Product Name <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="productName"
//                         value={formData.productName}
//                         onChange={handleChange}
//                         className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition ${
//                           errors.productName ? 'border-red-500' : 'border-gray-300'
//                         }`}
//                         placeholder="e.g., Premium Jute Fiber, Jute Shopping Bag"
//                       />
//                       {errors.productName && (
//                         <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                           <AlertCircle className="w-3 h-3" />
//                           {errors.productName}
//                         </p>
//                       )}
//                     </div>

//                     {/* Description */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Description
//                       </label>
//                       {isMounted && editor && (
//                         <div className="border border-gray-300 rounded-lg overflow-hidden">
//                           <RichTextEditor editor={editor}>
//                             <RichTextEditor.Toolbar>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Bold />
//                                 <RichTextEditor.Italic />
//                                 <RichTextEditor.Underline />
//                                 <RichTextEditor.Strikethrough />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.H1 />
//                                 <RichTextEditor.H2 />
//                                 <RichTextEditor.H3 />
//                                 <RichTextEditor.H4 />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.BulletList />
//                                 <RichTextEditor.OrderedList />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.AlignLeft />
//                                 <RichTextEditor.AlignCenter />
//                                 <RichTextEditor.AlignRight />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Link />
//                                 <RichTextEditor.Unlink />
//                               </RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>
//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                     </div>

//                     {/* Instruction Field */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Packaging / Care Instructions
//                       </label>
//                       {isMounted && instructionEditor && (
//                         <div className="border border-gray-300 rounded-lg overflow-hidden">
//                           <RichTextEditor editor={instructionEditor}>
//                             <RichTextEditor.Toolbar>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Bold />
//                                 <RichTextEditor.Italic />
//                                 <RichTextEditor.Underline />
//                                 <RichTextEditor.Strikethrough />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.H1 />
//                                 <RichTextEditor.H2 />
//                                 <RichTextEditor.H3 />
//                                 <RichTextEditor.H4 />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.BulletList />
//                                 <RichTextEditor.OrderedList />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.AlignLeft />
//                                 <RichTextEditor.AlignCenter />
//                                 <RichTextEditor.AlignRight />
//                               </RichTextEditor.ControlsGroup>
//                               <RichTextEditor.ControlsGroup>
//                                 <RichTextEditor.Link />
//                                 <RichTextEditor.Unlink />
//                               </RichTextEditor.ControlsGroup>
//                             </RichTextEditor.Toolbar>
//                             <RichTextEditor.Content />
//                           </RichTextEditor>
//                         </div>
//                       )}
//                       <p className="text-xs text-gray-500 mt-1">
//                         Add care instructions, washing guidelines, or any special notes for customers
//                       </p>
//                     </div>

//                     {/* Category, Subcategory, Child Subcategory, Targeted Customer, Fabric, Weight */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//                       {/* Category */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Category <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                           name="category"
//                           value={formData.category}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition ${
//                             errors.category ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                         >
//                           <option value="">Choose Category</option>
//                           {categories.map(cat => (
//                             <option key={cat._id} value={cat._id}>{cat.name}</option>
//                           ))}
//                         </select>
//                         {errors.category && (
//                           <p className="text-xs text-red-600 mt-1">{errors.category}</p>
//                         )}
//                       </div>

//                       {/* Subcategory Field */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           <div className="flex items-center gap-1">
//                             <FolderTree className="w-4 h-4" />
//                             Subcategory <span className="text-gray-400 text-xs font-normal">(Optional)</span>
//                           </div>
//                         </label>
//                         <select
//                           name="subcategory"
//                           value={formData.subcategory}
//                           onChange={(e) => {
//                             handleChange(e);
//                             setFormData(prev => ({ ...prev, childSubcategory: '' }));
//                           }}
//                           disabled={!formData.category || subcategories.length === 0}
//                           className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300"
//                         >
//                           <option value="">-- Select Subcategory (Optional) --</option>
//                           {subcategories.map(sub => (
//                             <option key={sub._id} value={sub._id}>{sub.name}</option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* Child Subcategory Field */}
//                       {showChildSubcategory && (
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             <div className="flex items-center gap-1">
//                               <FolderTree className="w-4 h-4" />
//                               Child Subcategory <span className="text-gray-400 text-xs font-normal">(Optional)</span>
//                             </div>
//                           </label>
//                           <select
//                             name="childSubcategory"
//                             value={formData.childSubcategory}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition border-gray-300"
//                           >
//                             <option value="">-- Select Child Subcategory (Optional) --</option>
//                             {childSubcategories.map(child => (
//                               <option key={child._id} value={child._id}>{child.name}</option>
//                             ))}
//                           </select>
//                         </div>
//                       )}

//                       {/* Targeted Customer */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           <div className="flex items-center gap-1">
//                             <Users className="w-4 h-4" />
//                             Target Customer <span className="text-red-500">*</span>
//                           </div>
//                         </label>
//                         <div className="relative">
//                           <select
//                             name="targetedCustomer"
//                             value={formData.targetedCustomer}
//                             onChange={handleChange}
//                             className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition appearance-none ${
//                               errors.targetedCustomer ? 'border-red-500' : 'border-gray-300'
//                             }`}
//                           >
//                             {TARGETED_CUSTOMERS.map(customer => (
//                               <option key={customer.value} value={customer.value}>
//                                 {customer.icon} {customer.label}
//                               </option>
//                             ))}
//                           </select>
//                           <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                             <span className="text-lg">{getSelectedCustomerIcon()}</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Fabric */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Fabric (Material) <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           name="fabric"
//                           value={formData.fabric}
//                           onChange={handleChange}
//                           className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition ${
//                             errors.fabric ? 'border-red-500' : 'border-gray-300'
//                           }`}
//                           placeholder="e.g., 100% Natural Jute"
//                         />
//                       </div>

//                       {/* Weight Per Unit - optional field */}
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           <div className="flex items-center gap-1">
//                             <Scale className="w-4 h-4" />
//                             Weight Per Unit <span className="text-gray-400 text-xs font-normal">(Optional)</span>
//                           </div>
//                         </label>
//                         <div className="flex items-center gap-2">
//                           <input
//                             type="number"
//                             name="weightPerUnit"
//                             value={formData.weightPerUnit}
//                             onChange={handleChange}
//                             step="0.01"
//                             min="0"
//                             className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             placeholder="e.g., 0.5"
//                           />
//                           <span className="text-sm text-gray-500">kg/unit</span>
//                         </div>
//                         <p className="text-xs text-gray-500 mt-1">
//                           Specify weight per piece/unit (helps with shipping calculations)
//                         </p>
//                       </div>
//                     </div>

//                     {/* Category Info Display */}
//                     {selectedCategoryDetails && (
//                       <div className="mt-2 p-3 rounded-lg border" style={{ backgroundColor: '#F5E6D3', borderColor: '#6B4F3A' }}>
//                         <div className="flex items-center gap-2">
//                           <Package className="w-4 h-4" style={{ color: '#6B4F3A' }} />
//                           <div>
//                             <p className="text-sm font-medium text-gray-900">
//                               Selected Category: {selectedCategoryDetails.name}
//                             </p>
//                             {formData.subcategory && subcategories.find(s => s._id === formData.subcategory) && (
//                               <p className="text-xs text-gray-600 mt-1">
//                                 <span className="font-medium">Subcategory:</span> {subcategories.find(s => s._id === formData.subcategory)?.name}
//                               </p>
//                             )}
//                             {formData.childSubcategory && childSubcategories.find(c => c._id === formData.childSubcategory) && (
//                               <p className="text-xs text-gray-600 mt-1">
//                                 <span className="font-medium">Child Subcategory:</span> {childSubcategories.find(c => c._id === formData.childSubcategory)?.name}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Product Images Card */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                   <div className="p-5 border-b border-gray-200">
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                       <ImageIcon className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                       Product Images <span className="text-red-500">*</span>
//                     </h2>
//                     <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each)</p>
//                   </div>
                  
//                   <div className="p-5">
//                     {errors.images && (
//                       <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         {errors.images}
//                       </p>
//                     )}
                    
//                     {/* Multiple Image Upload Button */}
//                     <div className="mb-4">
//                       <input
//                         type="file"
//                         id="multiple-images"
//                         className="hidden"
//                         accept="image/jpeg,image/jpg,image/png,image/webp"
//                         multiple
//                         onChange={handleMultipleImageSelect}
//                         ref={el => {
//                           if (el) fileInputRefs.current['multiple'] = el;
//                         }}
//                       />
//                       <button
//                         type="button"
//                         onClick={() => fileInputRefs.current['multiple']?.click()}
//                         className="w-full flex items-center justify-center gap-2 px-4 py-3 font-medium rounded-lg border-2 border-dashed transition-colors"
//                         style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A', borderColor: '#6B4F3A' }}
//                       >
//                         <Upload className="w-5 h-5" />
//                         <span>Select Multiple Images (Up to 6)</span>
//                       </button>
//                       <p className="text-xs text-gray-500 mt-2 text-center">
//                         You can select multiple images at once. Images will be uploaded automatically.
//                       </p>
//                     </div>

//                 {/* Image Preview Grid with Drag and Drop */}
// <div className="grid grid-cols-2 gap-4">
//   {productImages.map((img, index) => (
//     <div
//       key={index}
//       draggable={img.preview !== null}
//       onDragStart={() => img.preview && handleDragStart(index)}
//       onDragOver={(e) => img.preview && handleDragOverWithFeedback(e, index)}
//       onDragLeave={handleDragLeave}
//       onDrop={() => img.preview && handleDropWithFeedback(index)}
//       onDragEnd={handleDragEnd}
//       className={`transition-all duration-200 ${
//         draggedIndex === index ? 'opacity-50 scale-95' : ''
//       } ${
//         dragOverIndex === index && draggedIndex !== index && draggedIndex !== null 
//           ? 'ring-2 ring-[#6B4F3A] ring-offset-2 rounded-lg' 
//           : ''
//       }`}
//     >
//       {img.preview ? (
//         <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-40 hover:border-[#6B4F3A] transition-colors cursor-grab active:cursor-grabbing">
//           <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10">
//             <GripVertical className="w-3 h-3 text-white" />
//           </div>
          
//           <img 
//             src={img.preview} 
//             alt={`Product ${index + 1}`} 
//             className="w-full h-full object-contain bg-gray-100"
//             onError={(e) => {
//               console.error('Image failed to load');
//               e.target.src = 'https://via.placeholder.com/150?text=Error';
//             }}
//           />
          
//           {/* Uploading Overlay */}
//           {img.uploading && (
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
//               <Loader2 className="w-6 h-6 text-white animate-spin" />
//             </div>
//           )}
          
//           {/* Remove Button */}
//           <button
//             type="button"
//             onClick={() => removeImage(index)}
//             className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20"
//             disabled={false}
//             title="Remove image"
//           >
//             <X className="w-3 h-3" />
//           </button>
          
//           <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded z-10">
//             {index + 1}
//           </span>
//         </div>
//       ) : (
//         <div 
//           className={`border-2 border-dashed rounded-lg p-4 text-center h-40 flex flex-col items-center justify-center cursor-pointer ${
//             img.error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-[#6B4F3A] hover:bg-[#F5E6D3]'
//           }`}
//           onClick={() => fileInputRefs.current[index]?.click()}
//         >
//           <input 
//             type="file" 
//             ref={el => fileInputRefs.current[index] = el}
//             className="hidden" 
//             accept="image/jpeg,image/jpg,image/png,image/webp" 
//             onChange={(e) => handleImageChange(e, index)} 
//           />
//           <ImageIcon className={`w-8 h-8 mx-auto mb-2 ${img.error ? 'text-red-400' : 'text-gray-400'}`} />
//           <p className={`text-xs ${img.error ? 'text-red-600' : 'text-gray-600'}`}>
//             Slot {index + 1}
//           </p>
//           <p className="text-[10px] text-gray-400 mt-1">Click to upload</p>
//           {img.error && (
//             <p className="text-xs text-red-600 mt-1">{img.error}</p>
//           )}
//         </div>
//       )}
//     </div>
//   ))}
// </div>
                    
//                     {/* Upload Progress Summary */}
//                     {productImages.some(img => img.uploading) && (
//                       <div className="mt-4 p-2 rounded-lg" style={{ backgroundColor: '#F5E6D3' }}>
//                         <p className="text-xs" style={{ color: '#6B4F3A' }}>
//                           Uploading: {productImages.filter(img => img.uploading).length} image(s) remaining...
//                         </p>
//                       </div>
//                     )}
                    
//                     {/* Image Count Info */}
//                     <div className="mt-4 text-xs text-gray-500 text-center">
//                       {productImages.filter(img => img.url !== null).length} of 6 images uploaded
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

         

//             {/* Sizes and Colors */}
//          {/* Sizes and Colors */}
// <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//   {/* Sizes - Only show for 'piece' unit */}
// {/* Sizes - Only show for 'piece' unit */}
// {orderUnit === 'piece' ? (
//   <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//     <div className="p-5 border-b border-gray-200">
//       <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//         <Ruler className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//         Sizes <span className="text-gray-400 text-sm font-normal">(Optional)</span>
//       </h2>
//       <p className="text-xs text-gray-500 mt-1">Sizes available only for piece-based products</p>
//     </div>
//     <div className="p-5">
//       <div className="space-y-2">
//         {formData.sizes.map((size, index) => (
//           <div key={index} className="flex items-center gap-2">
//             <input
//               type="text"
//               value={size}
//               onChange={(e) => handleSizeChange(index, e.target.value)}
//               placeholder={`Size ${index + 1}`}
//               className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//             />
//             {formData.sizes.length > 1 && (
//               <button
//                 type="button"
//                 onClick={() => removeSize(index)}
//                 className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addSize}
//           className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium border border-dashed rounded-lg transition-colors"
//           style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//         >
//           <Plus className="w-3.5 h-3.5" />
//           Add Size
//         </button>
//         <p className="text-xs text-gray-400 text-center mt-2">
//           Add custom sizes for this product
//         </p>
//       </div>
//     </div>
//   </div>
// ) : (
//   <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-center">
//     <Ruler className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//     <p className="text-sm text-gray-500">Sizes are not available for {orderUnit === 'kg' ? 'KG' : 'Metric Ton'} based products</p>
//     <p className="text-xs text-gray-400 mt-1">Please select "Pieces / Units" to add size options</p>
//   </div>
// )}

//   {/* Colors - Always show */}
//   <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${orderUnit !== 'piece' ? 'lg:col-span-2' : ''}`}>
//     <div className="p-5 border-b border-gray-200">
//       <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//         <Palette className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//         Colors <span className="text-red-500">*</span>
//       </h2>
//       {orderUnit !== 'piece' && (
//         <p className="text-xs text-gray-500 mt-1">Colors configuration for weight-based products (kg/ton)</p>
//       )}
//     </div>
//     <div className="p-5">
//       {errors.colors && (
//         <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
//           <AlertCircle className="w-3 h-3" />
//           {errors.colors}
//         </p>
//       )}
//       <div className="space-y-3">
//         {formData.colors.map((color, index) => (
//           <div key={index} className="relative">
//             <div className="flex items-center gap-2 w-full">
//               <div 
//                 className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-1 cursor-pointer hover:border-[#6B4F3A] transition-colors"
//                 onClick={(e) => openColorPicker(index, e)}
//               >
//                 <div 
//                   className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
//                   style={{ backgroundColor: color.code }}
//                 />
//                 <div className="flex-1 font-mono text-sm text-gray-600">
//                   {color.code}
//                 </div>
//                 <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
//               </div>
//               {formData.colors.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeColor(index)}
//                   className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//             {showColorPicker && currentColorIndex === index && (
//               <div ref={colorPickerRef} className="absolute right-0 mt-2 z-50">
//                 <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
//                   <SketchPicker
//                     color={color.code}
//                     onChange={(color) => handleColorChange(index, 'code', color.hex)}
//                     presetColors={PREDEFINED_COLORS}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addColor}
//           className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium border border-dashed rounded-lg transition-colors"
//           style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//         >
//           <Plus className="w-3.5 h-3.5" />
//           Add Color
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

//                {/* Order Unit Selection - Updated with 3 options */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <Package className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Selling Unit
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">Select how this product is measured and sold</p>
//                 </div>
//                 <div className="p-5">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {ORDER_UNITS.map(unit => (
//                       <button
//                         key={unit.value}
//                         type="button"
//                         onClick={() => handleOrderUnitChange(unit.value)}
//                         className={`p-4 rounded-lg border-2 transition-all text-left ${
//                           orderUnit === unit.value 
//                             ? 'border-[#6B4F3A] bg-[#F5E6D3]' 
//                             : 'border-gray-200 hover:border-[#6B4F3A]'
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <span className="text-2xl">{unit.icon}</span>
//                           <div>
//                             <p className="font-medium text-gray-900">{unit.label}</p>
//                             <p className="text-xs text-gray-500">{unit.description}</p>
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Pricing Section - Updated for all unit types */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <DollarSign className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Pricing & MOQ
//                   </h2>
//                 </div>
//                 <div className="p-5 space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Minimum Order Quantity (MOQ) <span className="text-red-500">*</span>
//                       </label>
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="number"
//                           name="moq"
//                           value={formData.moq}
//                           onChange={handleChange}
//                           onWheel={(e) => e.target.blur()}
//                           min="1"
//                           className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                         />
//                         <span className="text-sm text-gray-500">
//                           {getCurrentUnitLabel()}
//                         </span>
//                       </div>
//                       {errors.moq && <p className="text-xs text-red-600 mt-1">{errors.moq}</p>}
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         {getPricePerLabel()} ($) <span className="text-red-500">*</span>
//                       </label>
//                       <div className="flex items-center gap-2">
//                       <input
//   type="number"
//   name="pricePerUnit"
//   value={formData.pricePerUnit === 0 ? '' : formData.pricePerUnit}
//   onChange={handleChange}
//   onWheel={(e) => e.target.blur()}
//   min="0"
//   step="0.01"
//   placeholder="0.00"
//   className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
// />
//                         <span className="text-sm text-gray-500">$</span>
//                       </div>
//                       {errors.pricePerUnit && <p className="text-xs text-red-600 mt-1">{errors.pricePerUnit}</p>}
//                     </div>
//                   </div>

//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Bulk Pricing (Quantity in {getCurrentUnitLabel()}):
//                       </label>
//                       <button
//                         type="button"
//                         onClick={addPricingRow}
//                         className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border"
//                         style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//                       >
//                         <PlusCircle className="w-3.5 h-3.5" />
//                         Add Tier
//                       </button>
//                     </div>
//                     <div className="space-y-4">
//                       {formData.quantityBasedPricing.map((tier, index) => (
//                         <div key={index} className="flex items-start gap-3">
//                           <div className="w-1/2">
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               Quantity Range ({getCurrentUnitLabel()})
//                             </label>
//                             <input
//                               type="text"
//                               value={tier.range}
//                               onChange={(e) => handlePricingChange(index, 'range', e.target.value)}
//                               placeholder={
//                                 orderUnit === 'ton' ? "e.g., 1-4 MT" : 
//                                 orderUnit === 'kg' ? "e.g., 100-499 kg" : 
//                                 "e.g., 100-299 pcs"
//                               }
//                               className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                           <div className="w-1/2">
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               Price Per {orderUnit === 'ton' ? 'MT ($)' : orderUnit === 'kg' ? 'KG ($)' : 'Unit ($)'}
//                             </label>
//                            <input
//   type="number"
//   value={tier.price === 0 ? '' : tier.price}
//   onChange={(e) => handlePricingChange(index, 'price', e.target.value)}
//   onWheel={(e) => e.target.blur()}
//   placeholder="0.00"
//   min="0"
//   step="0.01"
//   className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
// />
//                           </div>
//                           {formData.quantityBasedPricing.length > 1 && (
//                             <div className="flex items-end h-[62px]">
//                               <button
//                                 type="button"
//                                 onClick={() => removePricingRow(index)}
//                                 className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                               >
//                                 <MinusCircle className="w-5 h-5" />
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2">
//                       {orderUnit === 'ton' 
//                         ? 'Set pricing tiers based on order quantity in Metric Tons (1 MT = 1000 kg)' 
//                         : orderUnit === 'kg'
//                         ? 'Set pricing tiers based on order weight in kilograms'
//                         : 'Set pricing tiers based on order quantity in pieces'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Customization Options */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <Wrench className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Customization Options
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Add customization options available for this product (e.g., Logo Printing, Handle Type, Color Options, etc.)
//                   </p>
//                 </div>
//                 <div className="p-5">
//                   <div className="space-y-4">
//                     {formData.customizationOptions.map((option, index) => (
//                       <div key={index} className="flex items-start gap-3 p-4 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
//                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               <Type className="w-3 h-3 inline mr-1" />
//                               Customization Title
//                             </label>
//                             <input
//                               type="text"
//                               value={option.title}
//                               onChange={(e) => handleCustomizationChange(index, 'title', e.target.value)}
//                               placeholder="e.g., Logo Printing, Handle Type, Material Finish"
//                               className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               <Hash className="w-3 h-3 inline mr-1" />
//                               Options / Details
//                             </label>
//                             <input
//                               type="text"
//                               value={option.value}
//                               onChange={(e) => handleCustomizationChange(index, 'value', e.target.value)}
//                               placeholder="e.g., Custom logo available, Cotton handle, Matte finish"
//                               className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeCustomizationOption(index)}
//                           className="mt-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addCustomizationOption}
//                       className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-2 border-dashed rounded-lg transition-colors"
//                       style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//                     >
//                       <PlusCircle className="w-4 h-4" />
//                       Add Customization Option
//                     </button>
//                     <p className="text-xs text-gray-400 text-center mt-2">
//                       Add as many customization options as needed. Leave empty if not applicable.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Additional Information */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <Info className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Additional Information
//                   </h2>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Add custom fields for extra product details (e.g., GSM, tensile strength, etc.)
//                   </p>
//                 </div>
//                 <div className="p-5">
//                   <div className="space-y-4">
//                     {formData.additionalInfo.map((info, index) => (
//                       <div key={index} className="flex items-start gap-3 p-4 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
//                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               <Type className="w-3 h-3 inline mr-1" />
//                               Field Name
//                             </label>
//                             <input
//                               type="text"
//                               value={info.fieldName}
//                               onChange={(e) => handleAdditionalInfoChange(index, 'fieldName', e.target.value)}
//                               placeholder="e.g., GSM, Tensile Strength"
//                               className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-600 mb-1.5">
//                               <Hash className="w-3 h-3 inline mr-1" />
//                               Field Value
//                             </label>
//                             <input
//                               type="text"
//                               value={info.fieldValue}
//                               onChange={(e) => handleAdditionalInfoChange(index, 'fieldValue', e.target.value)}
//                               placeholder="e.g., 200 GSM, 50 kg"
//                               className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                             />
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeAdditionalInfo(index)}
//                           className="mt-6 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       type="button"
//                       onClick={addAdditionalInfo}
//                       className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-2 border-dashed rounded-lg transition-colors"
//                       style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
//                     >
//                       <PlusCircle className="w-4 h-4" />
//                       Add Additional Information
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Product Promotion */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                     <Star className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                     Product Promotion
//                   </h2>
//                 </div>
//                 <div className="p-5">
//                   <div className="mb-4">
//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={formData.isFeatured}
//                         onChange={(e) => {
//                           setFormData({ ...formData, isFeatured: e.target.checked });
//                           setShowTags(e.target.checked);
//                         }}
//                         className="w-5 h-5 rounded"
//                         style={{ accentColor: '#6B4F3A' }}
//                       />
//                       <div>
//                         <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
//                         <p className="text-xs text-gray-500">Featured products will appear in special sections</p>
//                       </div>
//                     </label>
//                   </div>

//                   <div className="mt-4">
//                     <div 
//                       className="flex items-center justify-between cursor-pointer py-2"
//                       onClick={() => setShowTags(!showTags)}
//                     >
//                       <div className="flex items-center gap-2">
//                         <Tag className="w-4 h-4" style={{ color: '#6B4F3A' }} />
//                         <h3 className="text-sm font-medium text-gray-700">Product Tags/Labels</h3>
//                       </div>
//                       <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showTags ? 'rotate-180' : ''}`} />
//                     </div>
//                     {showTags && (
//                       <div className="mt-3">
//                         <p className="text-xs text-gray-500 mb-2">Select one tag (optional)</p>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                           {AVAILABLE_TAGS.map(tag => (
//                             <label key={tag} className="flex items-center gap-2 cursor-pointer">
//                               <input
//                                 type="radio"
//                                 name="productTag"
//                                 checked={formData.tags.includes(tag)}
//                                 onChange={() => handleTagToggle(tag)}
//                                 className="w-4 h-4"
//                                 style={{ accentColor: '#6B4F3A' }}
//                               />
//                               <span className="text-sm text-gray-600">{tag}</span>
//                             </label>
//                           ))}
//                         </div>
//                         {formData.tags.length > 0 && (
//                           <div className="mt-4 flex flex-wrap gap-2">
//                             {formData.tags.map(tag => (
//                               <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>
//                                 {tag}
//                                 <button
//                                   type="button"
//                                   onClick={() => handleTagToggle(tag)}
//                                   className="ml-1.5 hover:opacity-70"
//                                 >
//                                   <X className="w-3 h-3" />
//                                 </button>
//                               </span>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Meta Settings */}
//             <div className="mb-6">
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//                 <div className="p-5 border-b border-gray-200">
//                   <div 
//                     className="flex items-center justify-between cursor-pointer"
//                     onClick={() => setShowMeta(!showMeta)}
//                   >
//                     <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
//                       <Search className="w-5 h-5" style={{ color: '#6B4F3A' }} />
//                       Meta Settings (SEO)
//                     </h2>
//                     <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
//                   </div>
//                 </div>
//                 {showMeta && (
//                   <div className="p-5">
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
//                         <input
//                           type="text"
//                           value={formData.metaSettings.metaTitle}
//                           onChange={(e) => handleMetaChange('metaTitle', e.target.value)}
//                           maxLength="70"
//                           placeholder="Enter meta title (max 70 characters)"
//                           className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
//                         />
//                         <div className="flex justify-between mt-1">
//                           <p className="text-xs text-gray-500">Appears in search engine results</p>
//                           <span className="text-xs text-gray-500">{formData.metaSettings.metaTitle?.length || 0}/70</span>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
//                         <textarea
//                           value={formData.metaSettings.metaDescription}
//                           onChange={(e) => handleMetaChange('metaDescription', e.target.value)}
//                           maxLength="160"
//                           placeholder="Enter meta description (max 160 characters)"
//                           rows="3"
//                           className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition resize-none"
//                         />
//                         <div className="flex justify-between mt-1">
//                           <p className="text-xs text-gray-500">Brief description for search results</p>
//                           <span className="text-xs text-gray-500">{formData.metaSettings.metaDescription?.length || 0}/160</span>
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
//                         {formData.metaSettings.metaKeywords?.length > 0 && (
//                           <div className="flex flex-wrap gap-2 mb-3 p-3 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
//                             {formData.metaSettings.metaKeywords.map((keyword, index) => (
//                               <span key={index} className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>
//                                 {keyword}
//                                 <button type="button" onClick={() => removeKeyword(index)} className="ml-1.5 hover:opacity-70">
//                                   <X className="w-3 h-3" />
//                                 </button>
//                               </span>
//                             ))}
//                           </div>
//                         )}
//                         <div className="relative">
//                           <input
//                             type="text"
//                             value={keywordInput}
//                             onChange={(e) => setKeywordInput(e.target.value)}
//                             onKeyDown={handleKeywordKeyDown}
//                             onBlur={handleKeywordBlur}
//                             placeholder="Type a keyword and press Enter or comma to add"
//                             className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition pr-20"
//                           />
//                           {keywordInput.trim() && (
//                             <button
//                               type="button"
//                               onClick={addKeyword}
//                               className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-white text-xs font-medium rounded transition-colors"
//                               style={{ backgroundColor: '#6B4F3A' }}
//                             >
//                               Add
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6 flex justify-end">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="flex items-center gap-2 px-6 py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                 style={{ backgroundColor: '#6B4F3A' }}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     <span>Creating Product...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4" />
//                     <span>Create Product</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </MantineProvider>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  X, 
  Save, 
  ArrowLeft,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
  Trash2,
  Upload,
  Package,
  DollarSign,
  Palette,
  Ruler,
  MinusCircle,
  PlusCircle,
  ChevronDown,
  Users,
  Info,
  Hash,
  Type,
  Star,
  Search,
  Tag,
  FolderTree,
  GripVertical,
  Scale,
  Wrench
} from 'lucide-react';
import NextLink from 'next/link';
import { toast } from 'sonner';
import { SketchPicker } from 'react-color';
import { MantineProvider } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';

// Predefined colors for quick selection
const PREDEFINED_COLORS = [
  '#FF0000', '#0000FF', '#00FF00', '#FFFF00', '#FF00FF', '#00FFFF',
  '#000000', '#FFFFFF', '#808080', '#800000', '#808000', '#008000',
  '#800080', '#008080', '#000080', '#FFA500', '#FFC0CB', '#A52A2A',
  '#6B4F3A', '#4A90E2', '#50C878', '#9B59B6', '#E74C3C', '#F39C12', '#1ABC9C'
];

// Targeted customer options
const TARGETED_CUSTOMERS = [
  { value: 'ladies', label: 'Ladies', icon: '👩' },
  { value: 'gents', label: 'Gents', icon: '👨' },
  { value: 'kids', label: 'Kids', icon: '🧒' },
  { value: 'unisex', label: 'Unisex', icon: '👤' }
];

// Available tags
const AVAILABLE_TAGS = [
  'Best Seller',
  'New Arrival',
  'Top Deal',
  'Eco-Friendly',
  'Hot Export Item',
  'Customizable',
  'Premium Quality',
  'Trending'
];

// Order unit options
const ORDER_UNITS = [
  { value: 'piece', label: 'Pieces / Units', icon: '📦', description: 'Sell by individual pieces/units', unitLabel: 'pieces' },
  { value: 'kg', label: 'Kilogram (KG)', icon: '⚖️', description: 'Sell by weight in kilograms', unitLabel: 'kg' },
  { value: 'ton', label: 'Metric Ton (MT)', icon: '🏗️', description: 'Sell by metric ton (1000 kg)', unitLabel: 'metric tons' }
];

// Cloudinary upload function
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'jute-products');
  formData.append('folder', 'jute-products');
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    if (data.secure_url) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    } else {
      throw new Error('Upload failed');
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export default function ModeratorCreateProduct() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [orderUnit, setOrderUnit] = useState('piece');

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const colorPickerRef = useRef(null);
  
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    instruction: '', 
    category: '',
    subcategory: '',
    childSubcategory: '',
    targetedCustomer: 'unisex',
    fabric: '',
    weightPerUnit: '',
    orderUnit: 'piece',
    moq: 100,
    pricePerUnit: 0,
    quantityBasedPricing: [
      { range: '100-299', price: 0 }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { code: '#6B4F3A' },
      { code: '#F5E6D3' },
      { code: '#3A7D44' }
    ],
    additionalInfo: [],
    customizationOptions: [],
    isFeatured: false,
    tags: [],
    metaSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    }
  });

  // Image state with upload status - 6 slots
  const [productImages, setProductImages] = useState([
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null },
    { file: null, preview: null, error: '', url: null, publicId: null, uploading: false, uploadAborted: false, uploadBatchId: null }
  ]);

  const fileInputRefs = useRef([]);
  const [errors, setErrors] = useState({});

  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const maxFileSize = 5 * 1024 * 1024;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColorPicker(false);
        setCurrentColorIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update pricing range labels when order unit changes
  useEffect(() => {
    if (orderUnit === 'kg') {
      setFormData(prev => ({
        ...prev,
        quantityBasedPricing: [
          { range: '100-499', price: 0 }
        ]
      }));
    } else if (orderUnit === 'ton') {
      setFormData(prev => ({
        ...prev,
        quantityBasedPricing: [
          { range: '1-4', price: 0 }
        ]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        quantityBasedPricing: [
          { range: '100-299', price: 0 }
        ]
      }));
    }
  }, [orderUnit]);

  // TipTap editors
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, description: editor.getHTML() }));
    },
    immediatelyRender: false,
    editable: true,
  });

  const instructionEditor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: formData.instruction,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, instruction: editor.getHTML() }));
    },
    immediatelyRender: false,
    editable: true,
  });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      fetchSubcategories(formData.category);
      fetchCategoryDetails(formData.category);
    } else {
      setSubcategories([]);
      setSelectedCategoryDetails(null);
      setChildSubcategories([]);
      setShowChildSubcategory(false);
      setFormData(prev => ({ ...prev, subcategory: '', childSubcategory: '' }));
    }
  }, [formData.category]);

  // Fetch child subcategories when subcategory changes
  useEffect(() => {
    if (formData.category && formData.subcategory) {
      fetchChildSubcategories(formData.category, formData.subcategory);
    } else {
      setChildSubcategories([]);
      setShowChildSubcategory(false);
      setFormData(prev => ({ ...prev, childSubcategory: '' }));
    }
  }, [formData.subcategory]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'moderator' && user.role !== 'admin') {
      router.push('/login');
    }
  }, [router]);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setSubcategories(data.data.subcategories);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubcategories([]);
    }
  };

  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.success) {
        setChildSubcategories(data.data.children);
        setShowChildSubcategory(data.data.children.length > 0);
      } else {
        setChildSubcategories([]);
        setShowChildSubcategory(false);
      }
    } catch (error) {
      console.error('Error fetching child subcategories:', error);
      setChildSubcategories([]);
      setShowChildSubcategory(false);
    }
  };

  const fetchCategoryDetails = async (categoryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/categories/${categoryId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setSelectedCategoryDetails(data.data);
      }
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  };

  const validateImageFile = (file) => {
    if (!allowedFileTypes.includes(file.type)) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      return {
        valid: false,
        message: `Invalid format: .${fileExtension}. Allowed: ${allowedExtensions.join(', ')}`
      };
    }

    if (file.size > maxFileSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      return {
        valid: false,
        message: `File too large: ${fileSizeMB}MB. Max: 5MB`
      };
    }

    return { valid: true };
  };

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear any existing image in this slot first
    if (productImages[index].preview && productImages[index].preview.startsWith('blob:')) {
      URL.revokeObjectURL(productImages[index].preview);
    }

    const validation = validateImageFile(file);
    if (!validation.valid) {
      const updatedImages = [...productImages];
      updatedImages[index] = { ...updatedImages[index], error: validation.message };
      setProductImages(updatedImages);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    
    const updatedImages = [...productImages];
    updatedImages[index] = {
      file: file,
      preview: previewUrl,
      error: '',
      uploading: true,
      url: null,
      publicId: null,
      uploadAborted: false,
      uploadBatchId: null
    };
    setProductImages(updatedImages);

    try {
      const { url, publicId } = await uploadToCloudinary(file);
      
      setProductImages(prevImages => {
        const updated = [...prevImages];
        if (updated[index] && updated[index].uploading === true && !updated[index].uploadAborted) {
          updated[index] = {
            ...updated[index],
            url: url,
            publicId: publicId,
            uploading: false,
            uploadAborted: false
          };
        }
        return updated;
      });
      
      toast.success(`Image ${index + 1} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      setProductImages(prevImages => {
        const updated = [...prevImages];
        if (updated[index] && updated[index].uploading === true && !updated[index].uploadAborted) {
          updated[index] = {
            ...updated[index],
            error: 'Failed to upload image to Cloudinary',
            uploading: false,
            uploadAborted: false
          };
        }
        return updated;
      });
      toast.error(`Failed to upload image ${index + 1}`);
    }
  };

  const handleMultipleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    const currentImages = [...productImages];
    const currentImagesCount = currentImages.filter(img => img.url !== null || img.uploading).length;
    const availableSlots = 6 - currentImagesCount;
    
    if (files.length > availableSlots) {
      toast.error(`You can only upload ${availableSlots} more image(s). Maximum 6 images total.`);
      if (fileInputRefs.current['multiple']) {
        fileInputRefs.current['multiple'].value = '';
      }
      return;
    }
    
    const validFiles = [];
    const invalidFiles = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push({ file, originalIndex: i });
      } else {
        invalidFiles.push({ index: i + 1, message: validation.message });
        toast.error(`Image ${i + 1}: ${validation.message}`);
      }
    }
    
    if (validFiles.length === 0) {
      toast.error('No valid images to upload');
      if (fileInputRefs.current['multiple']) {
        fileInputRefs.current['multiple'].value = '';
      }
      return;
    }
    
    const emptySlots = [];
    for (let i = 0; i < currentImages.length; i++) {
      if (!currentImages[i].url && !currentImages[i].uploading && !currentImages[i].preview) {
        emptySlots.push(i);
      }
    }
    
    if (validFiles.length > emptySlots.length) {
      toast.error(`Only ${emptySlots.length} slots available. Please remove some images first.`);
      if (fileInputRefs.current['multiple']) {
        fileInputRefs.current['multiple'].value = '';
      }
      return;
    }
    
    const batchId = Date.now();
    const updatedImages = [...currentImages];
    const uploadPromises = [];
    
    for (let i = 0; i < validFiles.length; i++) {
      const { file } = validFiles[i];
      const slotIndex = emptySlots[i];
      const previewUrl = URL.createObjectURL(file);
      
      updatedImages[slotIndex] = {
        file: file,
        preview: previewUrl,
        error: '',
        uploading: true,
        url: null,
        publicId: null,
        uploadAborted: false,
        uploadBatchId: batchId
      };
      
      const uploadPromise = (async () => {
        try {
          const { url, publicId } = await uploadToCloudinary(file);
          
          setProductImages(prevImages => {
            const newImages = [...prevImages];
            if (newImages[slotIndex] && 
                newImages[slotIndex].uploading === true && 
                !newImages[slotIndex].uploadAborted &&
                newImages[slotIndex].uploadBatchId === batchId) {
              newImages[slotIndex] = {
                ...newImages[slotIndex],
                url: url,
                publicId: publicId,
                uploading: false,
                uploadAborted: false
              };
            } else if (newImages[slotIndex] && newImages[slotIndex].uploadAborted) {
              if (newImages[slotIndex].preview && newImages[slotIndex].preview.startsWith('blob:')) {
                URL.revokeObjectURL(newImages[slotIndex].preview);
              }
            }
            return newImages;
          });
          
          return { success: true, slotIndex };
        } catch (error) {
          console.error('Upload error:', error);
          setProductImages(prevImages => {
            const newImages = [...prevImages];
            if (newImages[slotIndex] && 
                newImages[slotIndex].uploading === true && 
                !newImages[slotIndex].uploadAborted &&
                newImages[slotIndex].uploadBatchId === batchId) {
              newImages[slotIndex] = {
                ...newImages[slotIndex],
                error: 'Failed to upload image',
                uploading: false,
                uploadAborted: false,
                preview: null,
                file: null
              };
            }
            return newImages;
          });
          return { success: false, slotIndex, error };
        }
      })();
      
      uploadPromises.push(uploadPromise);
    }
    
    setProductImages(updatedImages);
    
    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter(r => r.success).length;
    const failedUploads = results.filter(r => !r.success).length;
    
    if (successfulUploads > 0) {
      toast.success(`${successfulUploads} image(s) uploaded successfully`);
    }
    if (failedUploads > 0) {
      toast.error(`${failedUploads} image(s) failed to upload`);
    }
    
    if (fileInputRefs.current['multiple']) {
      fileInputRefs.current['multiple'].value = '';
    }
  };

  const removeImage = (index) => {
    const imageToRemove = productImages[index];
    
    if (imageToRemove.preview && imageToRemove.preview.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    
    const updatedImages = [...productImages];
    updatedImages[index] = { 
      file: null, 
      preview: null, 
      error: '', 
      url: null, 
      publicId: null, 
      uploading: false,
      uploadAborted: true,
      uploadBatchId: null
    };
    
    setProductImages(updatedImages);
    
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = '';
    }
    
    toast.success(`Image removed from slot ${index + 1}`);
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...productImages];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setProductImages(updatedImages);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOverWithFeedback = (event, index) => {
    event.preventDefault();
    if (productImages[index].preview && !productImages[index].uploading) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDropWithFeedback = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      setDraggedIndex(null);
      return;
    }
    moveImage(draggedIndex, dropIndex);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleOrderUnitChange = (unit) => {
    setOrderUnit(unit);
    const updatedSizes = unit !== 'piece' ? [] : formData.sizes;
    
    setFormData(prev => ({ 
      ...prev, 
      orderUnit: unit,
      moq: unit === 'ton' ? 1 : 100,
      pricePerUnit: 0,
      sizes: updatedSizes
    }));
  };

  const handlePricingChange = (index, field, value) => {
    const updatedPricing = [...formData.quantityBasedPricing];
    
    if (field === 'price') {
      if (value === '') {
        updatedPricing[index] = { ...updatedPricing[index], [field]: '' };
      } else {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          updatedPricing[index] = { ...updatedPricing[index], [field]: numValue };
        }
      }
    } else {
      updatedPricing[index] = { ...updatedPricing[index], [field]: value };
    }
    
    setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
  };

  const addPricingRow = () => {
    let newRange = '5000+';
    if (orderUnit === 'ton') {
      newRange = '50+';
    } else if (orderUnit === 'kg') {
      newRange = '5000+';
    } else {
      newRange = '5000+';
    }
    setFormData(prev => ({
      ...prev,
      quantityBasedPricing: [
        ...prev.quantityBasedPricing,
        { range: newRange, price: 0 }
      ]
    }));
  };

  const removePricingRow = (index) => {
    if (formData.quantityBasedPricing.length > 1) {
      const updatedPricing = formData.quantityBasedPricing.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, quantityBasedPricing: updatedPricing }));
    }
  };

  const handleSizeChange = (index, value) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index] = value;
    setFormData(prev => ({ ...prev, sizes: updatedSizes }));
  };

  const addSize = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, '']
    }));
  };

  const removeSize = (index) => {
    if (formData.sizes.length > 1) {
      const updatedSizes = formData.sizes.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, sizes: updatedSizes }));
    }
  };

  const handleColorChange = (index, field, value) => {
    const updatedColors = [...formData.colors];
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    setFormData(prev => ({ ...prev, colors: updatedColors }));
  };

  const openColorPicker = (index, event) => {
    event.stopPropagation();
    setCurrentColorIndex(index);
    setShowColorPicker(true);
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { code: '#6B4F3A' }]
    }));
  };

  const removeColor = (index) => {
    if (formData.colors.length > 1) {
      const updatedColors = formData.colors.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, colors: updatedColors }));
    }
  };

  const handleAdditionalInfoChange = (index, field, value) => {
    const updatedInfo = [...formData.additionalInfo];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
    
    if (errors[`additionalInfo_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`additionalInfo_${index}_${field}`]: null }));
    }
  };

  const addAdditionalInfo = () => {
    setFormData(prev => ({
      ...prev,
      additionalInfo: [
        ...prev.additionalInfo,
        { fieldName: '', fieldValue: '' }
      ]
    }));
  };

  const removeAdditionalInfo = (index) => {
    const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, additionalInfo: updatedInfo }));
  };

  const handleCustomizationChange = (index, field, value) => {
    const updatedOptions = [...formData.customizationOptions];
    updatedOptions[index] = { ...updatedOptions[index], [field]: value };
    setFormData(prev => ({ ...prev, customizationOptions: updatedOptions }));
  };

  const addCustomizationOption = () => {
    setFormData(prev => ({
      ...prev,
      customizationOptions: [
        ...prev.customizationOptions,
        { title: '', value: '' }
      ]
    }));
  };

  const removeCustomizationOption = (index) => {
    const updatedOptions = formData.customizationOptions.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, customizationOptions: updatedOptions }));
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? [] : [tag]
    }));
  };

  const handleMetaChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      metaSettings: {
        ...prev.metaSettings,
        [field]: value
      }
    }));
  };

  const addKeyword = () => {
    if (!keywordInput.trim()) return;
    
    const keywordsToAdd = keywordInput
      .split(',')
      .map(k => k.trim())
      .filter(k => k !== '');
    
    setFormData(prev => ({
      ...prev,
      metaSettings: {
        ...prev.metaSettings,
        metaKeywords: [...(prev.metaSettings.metaKeywords || []), ...keywordsToAdd]
      }
    }));
    setKeywordInput('');
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleKeywordBlur = () => {
    if (keywordInput.trim()) {
      addKeyword();
    }
  };

  const removeKeyword = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      metaSettings: {
        ...prev.metaSettings,
        metaKeywords: prev.metaSettings.metaKeywords.filter((_, index) => index !== indexToRemove)
      }
    }));
  };

  const validateAdditionalInfo = () => {
    let isValid = true;
    const newErrors = {};

    formData.additionalInfo.forEach((info, index) => {
      if (!info.fieldName.trim()) {
        newErrors[`additionalInfo_${index}_fieldName`] = 'Field name is required';
        isValid = false;
      }
      if (!info.fieldValue.trim()) {
        newErrors[`additionalInfo_${index}_fieldValue`] = 'Field value is required';
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.targetedCustomer) {
      newErrors.targetedCustomer = 'Targeted customer is required';
    }

    if (!formData.fabric.trim()) {
      newErrors.fabric = 'Fabric details are required';
    }

    if (formData.moq < 1) {
      newErrors.moq = 'MOQ must be at least 1';
    }

    if (formData.pricePerUnit < 0) {
      newErrors.pricePerUnit = 'Price must be 0 or greater';
    }

    const hasImages = productImages.some(img => img.url !== null && !img.uploadAborted);
    if (!hasImages) {
      newErrors.images = 'At least one product image is required';
    }

    if (formData.colors.length === 0) {
      newErrors.colors = 'At least one color is required';
    }

    if (formData.metaSettings.metaTitle && formData.metaSettings.metaTitle.length > 70) {
      newErrors.metaTitle = 'Meta title should not exceed 70 characters';
    }

    if (formData.metaSettings.metaDescription && formData.metaSettings.metaDescription.length > 160) {
      newErrors.metaDescription = 'Meta description should not exceed 160 characters';
    }

    setErrors(newErrors);
    const isAdditionalInfoValid = validateAdditionalInfo();
    
    return Object.keys(newErrors).length === 0 && isAdditionalInfoValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploading = productImages.some(img => img.uploading === true);
    if (uploading) {
      toast.error('Please wait for all images to finish uploading');
      return;
    }

    const hasEmptyPrice = formData.quantityBasedPricing.some(tier => tier.price === '');
    if (hasEmptyPrice) {
      toast.error('Please fill in all price fields in Quantity Based Pricing');
      return;
    }

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      const imageUrls = productImages
        .filter(img => img.url !== null && img.uploading === false && !img.uploadAborted)
        .map(img => img.url);
      
      const processedPricing = formData.quantityBasedPricing.map(tier => ({
        ...tier,
        price: tier.price === '' ? 0 : parseFloat(tier.price)
      }));

      const processedAdditionalInfo = formData.additionalInfo.filter(
        info => info.fieldName.trim() !== '' && info.fieldValue.trim() !== ''
      );

      const processedCustomizationOptions = formData.customizationOptions.filter(
        option => option.title.trim() !== '' && option.value.trim() !== ''
      );

      const filteredSizes = orderUnit === 'piece' 
        ? formData.sizes.filter(s => s.trim() !== '')
        : [];

      const payload = {
        productName: formData.productName,
        description: formData.description,
        instruction: formData.instruction || '',
        category: formData.category,
        subcategory: formData.subcategory || '',
        childSubcategory: formData.childSubcategory || '',
        targetedCustomer: formData.targetedCustomer,
        fabric: formData.fabric,
        weightPerUnit: formData.weightPerUnit || '',
        orderUnit: orderUnit,
        moq: formData.moq,
        pricePerUnit: formData.pricePerUnit === 0 ? '' : formData.pricePerUnit,
        quantityBasedPricing: processedPricing,
        sizes: filteredSizes,
        colors: formData.colors,
        additionalInfo: processedAdditionalInfo,
        customizationOptions: processedCustomizationOptions,
        images: imageUrls,
        isFeatured: formData.isFeatured,
        tags: formData.tags,
        metaSettings: formData.metaSettings
      };

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Product created successfully!');
        router.push('/moderator/all-products');
      } else {
        toast.error(data.error || 'Failed to create product');
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedCustomerIcon = () => {
    const customer = TARGETED_CUSTOMERS.find(c => c.value === formData.targetedCustomer);
    return customer ? customer.icon : '👤';
  };

  const getCurrentUnitLabel = () => {
    const unit = ORDER_UNITS.find(u => u.value === orderUnit);
    return unit?.unitLabel || 'pieces';
  };

  const getPricePerLabel = () => {
    if (orderUnit === 'piece') return 'Per Piece';
    if (orderUnit === 'kg') return 'Per KG';
    return 'Per Metric Ton';
  };

  return (
    <MantineProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2' }}>
        {/* Header */}
        <div className="bg-white border-b shadow-sm sticky top-0 z-10" style={{ borderBottomColor: '#6B4F3A' }}>
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <NextLink href="/moderator/all-products" className="p-1.5 sm:p-2 hover:bg-[#F5E6D3] rounded-lg transition-colors">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                </NextLink>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-lg sm:text-2xl font-bold" style={{ color: '#2A2A2A', fontFamily: 'Playfair Display, serif' }}>Create New Product</h1>
                    <span className="px-2 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>
                      Moderator
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Add a new jute product to your catalog</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-3 sm:p-4 md:p-6">
          <form onSubmit={handleSubmit}>
            {/* Row 1: Basic Details and Product Images */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Basic Details Card */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      <Package className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                      Basic Details
                    </h2>
                  </div>
                  
                  <div className="p-4 sm:p-5 space-y-4">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition ${
                          errors.productName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Premium Jute Fiber, Jute Shopping Bag"
                      />
                      {errors.productName && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.productName}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      {isMounted && editor && (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignRight />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                              </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                    </div>

                    {/* Instruction Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Packaging / Care Instructions
                      </label>
                      {isMounted && instructionEditor && (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <RichTextEditor editor={instructionEditor}>
                            <RichTextEditor.Toolbar>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignRight />
                              </RichTextEditor.ControlsGroup>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                              </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>
                            <RichTextEditor.Content />
                          </RichTextEditor>
                        </div>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Add care instructions, washing guidelines, or any special notes for customers
                      </p>
                    </div>

                    {/* Category, Subcategory, etc. */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Category */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition ${
                            errors.category ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Choose Category</option>
                          {categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="text-xs text-red-600 mt-1">{errors.category}</p>
                        )}
                      </div>

                      {/* Subcategory */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="flex items-center gap-1">
                            <FolderTree className="w-4 h-4" />
                            Subcategory <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                          </div>
                        </label>
                        <select
                          name="subcategory"
                          value={formData.subcategory}
                          onChange={(e) => {
                            handleChange(e);
                            setFormData(prev => ({ ...prev, childSubcategory: '' }));
                          }}
                          disabled={!formData.category || subcategories.length === 0}
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed border-gray-300"
                        >
                          <option value="">-- Select Subcategory (Optional) --</option>
                          {subcategories.map(sub => (
                            <option key={sub._id} value={sub._id}>{sub.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Child Subcategory */}
                      {showChildSubcategory && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            <div className="flex items-center gap-1">
                              <FolderTree className="w-4 h-4" />
                              Child Subcategory <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                            </div>
                          </label>
                          <select
                            name="childSubcategory"
                            value={formData.childSubcategory}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition border-gray-300"
                          >
                            <option value="">-- Select Child Subcategory (Optional) --</option>
                            {childSubcategories.map(child => (
                              <option key={child._id} value={child._id}>{child.name}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Targeted Customer */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            Target Customer <span className="text-red-500">*</span>
                          </div>
                        </label>
                        <div className="relative">
                          <select
                            name="targetedCustomer"
                            value={formData.targetedCustomer}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition appearance-none ${
                              errors.targetedCustomer ? 'border-red-500' : 'border-gray-300'
                            }`}
                          >
                            {TARGETED_CUSTOMERS.map(customer => (
                              <option key={customer.value} value={customer.value}>
                                {customer.icon} {customer.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <span className="text-lg">{getSelectedCustomerIcon()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Fabric */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fabric (Material) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="fabric"
                          value={formData.fabric}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition ${
                            errors.fabric ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="e.g., 100% Natural Jute"
                        />
                      </div>

                      {/* Weight Per Unit */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <div className="flex items-center gap-1">
                            <Scale className="w-4 h-4" />
                            Weight Per Unit <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                          </div>
                        </label>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <input
                            type="number"
                            name="weightPerUnit"
                            value={formData.weightPerUnit}
                            onChange={handleChange}
                            onWheel={(e) => e.target.blur()}
                            step="0.01"
                            min="0"
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                            placeholder="e.g., 0.5"
                          />
                          <span className="text-sm text-gray-500">kg/unit</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Specify weight per piece/unit (helps with shipping calculations)
                        </p>
                      </div>
                    </div>

                    {/* Category Info Display */}
                    {selectedCategoryDetails && (
                      <div className="mt-2 p-3 rounded-lg border" style={{ backgroundColor: '#F5E6D3', borderColor: '#6B4F3A' }}>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" style={{ color: '#6B4F3A' }} />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Selected Category: {selectedCategoryDetails.name}
                            </p>
                            {formData.subcategory && subcategories.find(s => s._id === formData.subcategory) && (
                              <p className="text-xs text-gray-600 mt-1">
                                <span className="font-medium">Subcategory:</span> {subcategories.find(s => s._id === formData.subcategory)?.name}
                              </p>
                            )}
                            {formData.childSubcategory && childSubcategories.find(c => c._id === formData.childSubcategory) && (
                              <p className="text-xs text-gray-600 mt-1">
                                <span className="font-medium">Child Subcategory:</span> {childSubcategories.find(c => c._id === formData.childSubcategory)?.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Product Images Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                      Product Images <span className="text-red-500">*</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Upload up to 6 images (JPG, PNG, WebP, max 5MB each)</p>
                  </div>
                  
                  <div className="p-4 sm:p-5">
                    {errors.images && (
                      <p className="text-xs text-red-600 mb-4 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.images}
                      </p>
                    )}
                    
                    {/* Multiple Image Upload Button */}
                    <div className="mb-4">
                      <input
                        type="file"
                        id="multiple-images"
                        className="hidden"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        multiple
                        onChange={handleMultipleImageSelect}
                        ref={el => {
                          if (el) fileInputRefs.current['multiple'] = el;
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current['multiple']?.click()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg border-2 border-dashed transition-colors"
                        style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A', borderColor: '#6B4F3A' }}
                      >
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Select Multiple Images (Up to 6)</span>
                      </button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        You can select multiple images at once. Images will be uploaded automatically.
                      </p>
                    </div>

                    {/* Image Preview Grid with Drag and Drop */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {productImages.map((img, index) => (
                        <div
                          key={index}
                          draggable={img.preview !== null && !img.uploading}
                          onDragStart={() => img.preview && !img.uploading && handleDragStart(index)}
                          onDragOver={(e) => img.preview && !img.uploading && handleDragOverWithFeedback(e, index)}
                          onDragLeave={handleDragLeave}
                          onDrop={() => img.preview && !img.uploading && handleDropWithFeedback(index)}
                          onDragEnd={handleDragEnd}
                          className={`transition-all duration-200 ${
                            draggedIndex === index ? 'opacity-50 scale-95' : ''
                          } ${
                            dragOverIndex === index && draggedIndex !== index && draggedIndex !== null 
                              ? 'ring-2 ring-[#6B4F3A] ring-offset-2 rounded-lg' 
                              : ''
                          }`}
                        >
                          {img.preview ? (
                            <div className="relative rounded-lg overflow-hidden border-2 border-gray-200 h-32 sm:h-40 hover:border-[#6B4F3A] transition-colors cursor-grab active:cursor-grabbing">
                              <div className="absolute top-1 left-1 bg-black/50 rounded px-1.5 py-0.5 z-10">
                                <GripVertical className="w-3 h-3 text-white" />
                              </div>
                              
                              <img 
                                src={img.preview} 
                                alt={`Product ${index + 1}`} 
                                className="w-full h-full object-contain bg-gray-100"
                                onError={(e) => {
                                  console.error('Image failed to load');
                                  e.target.src = 'https://via.placeholder.com/150?text=Error';
                                }}
                              />
                              
                              {/* Uploading Overlay */}
                              {img.uploading && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                                  <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin" />
                                </div>
                              )}
                              
                              {/* Remove Button */}
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-20"
                                disabled={false}
                                title="Remove image"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded z-10">
                                {index + 1}
                              </span>
                            </div>
                          ) : (
                            <div 
                              className={`border-2 border-dashed rounded-lg p-3 sm:p-4 text-center h-32 sm:h-40 flex flex-col items-center justify-center cursor-pointer ${
                                img.error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:border-[#6B4F3A] hover:bg-[#F5E6D3]'
                              }`}
                              onClick={() => fileInputRefs.current[index]?.click()}
                            >
                              <input 
                                type="file" 
                                ref={el => fileInputRefs.current[index] = el}
                                className="hidden" 
                                accept="image/jpeg,image/jpg,image/png,image/webp" 
                                onChange={(e) => handleImageChange(e, index)} 
                              />
                              <ImageIcon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 ${img.error ? 'text-red-400' : 'text-gray-400'}`} />
                              <p className={`text-xs ${img.error ? 'text-red-600' : 'text-gray-600'}`}>
                                Slot {index + 1}
                              </p>
                              <p className="text-[10px] text-gray-400 mt-1">Click to upload</p>
                              {img.error && (
                                <p className="text-xs text-red-600 mt-1">{img.error}</p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Upload Progress Summary */}
                    {productImages.some(img => img.uploading) && (
                      <div className="mt-4 p-2 rounded-lg" style={{ backgroundColor: '#F5E6D3' }}>
                        <p className="text-xs" style={{ color: '#6B4F3A' }}>
                          Uploading: {productImages.filter(img => img.uploading).length} image(s) remaining...
                        </p>
                      </div>
                    )}
                    
                    {/* Image Count Info */}
                    <div className="mt-4 text-xs text-gray-500 text-center">
                      {productImages.filter(img => img.url !== null && !img.uploading && !img.uploadAborted).length} of 6 images uploaded
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sizes and Colors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {/* Sizes - Only show for 'piece' unit */}
              {orderUnit === 'piece' ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-4 sm:p-5 border-b border-gray-200">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      <Ruler className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                      Sizes <span className="text-gray-400 text-sm font-normal">(Optional)</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Sizes available only for piece-based products</p>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="space-y-2">
                      {formData.sizes.map((size, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={size}
                            onChange={(e) => handleSizeChange(index, e.target.value)}
                            placeholder={`Size ${index + 1}`}
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                          />
                          {formData.sizes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSize(index)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addSize}
                        className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium border border-dashed rounded-lg transition-colors"
                        style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Size
                      </button>
                      <p className="text-xs text-gray-400 text-center mt-2">
                        Add custom sizes for this product
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 sm:p-5 text-center">
                  <Ruler className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Sizes are not available for {orderUnit === 'kg' ? 'KG' : 'Metric Ton'} based products</p>
                  <p className="text-xs text-gray-400 mt-1">Please select "Pieces / Units" to add size options</p>
                </div>
              )}

              {/* Colors - Always show */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 sm:p-5 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    <Palette className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                    Colors <span className="text-red-500">*</span>
                  </h2>
                  {orderUnit !== 'piece' && (
                    <p className="text-xs text-gray-500 mt-1">Colors configuration for weight-based products (kg/ton)</p>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  {errors.colors && (
                    <p className="text-xs text-red-600 mb-3 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.colors}
                    </p>
                  )}
                  <div className="space-y-3">
                    {formData.colors.map((color, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center gap-2 w-full">
                          <div 
                            className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-1 cursor-pointer hover:border-[#6B4F3A] transition-colors"
                            onClick={(e) => openColorPicker(index, e)}
                          >
                            <div 
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
                              style={{ backgroundColor: color.code }}
                            />
                            <div className="flex-1 font-mono text-xs sm:text-sm text-gray-600">
                              {color.code}
                            </div>
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                          </div>
                          {formData.colors.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeColor(index)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        {showColorPicker && currentColorIndex === index && (
                          <div ref={colorPickerRef} className="absolute right-0 mt-2 z-50">
                            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3">
                              <SketchPicker
                                color={color.code}
                                onChange={(color) => handleColorChange(index, 'code', color.hex)}
                                presetColors={PREDEFINED_COLORS}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addColor}
                      className="w-full flex items-center justify-center gap-1 px-3 py-2 mt-2 text-xs font-medium border border-dashed rounded-lg transition-colors"
                      style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Color
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Unit Selection */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 sm:p-5 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    <Package className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                    Selling Unit
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Select how this product is measured and sold</p>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {ORDER_UNITS.map(unit => (
                      <button
                        key={unit.value}
                        type="button"
                        onClick={() => handleOrderUnitChange(unit.value)}
                        className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                          orderUnit === unit.value 
                            ? 'border-[#6B4F3A] bg-[#F5E6D3]' 
                            : 'border-gray-200 hover:border-[#6B4F3A]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl sm:text-2xl">{unit.icon}</span>
                          <div>
                            <p className="text-sm sm:text-base font-medium text-gray-900">{unit.label}</p>
                            <p className="text-xs text-gray-500">{unit.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 sm:p-5 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                    Pricing & MOQ
                  </h2>
                </div>
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Order Quantity (MOQ) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          name="moq"
                          value={formData.moq}
                          onChange={handleChange}
                          onWheel={(e) => e.target.blur()}
                          min="1"
                          className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                        />
                        <span className="text-sm text-gray-500 whitespace-nowrap">
                          {getCurrentUnitLabel()}
                        </span>
                      </div>
                      {errors.moq && <p className="text-xs text-red-600 mt-1">{errors.moq}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {getPricePerLabel()} ($) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          name="pricePerUnit"
                          value={formData.pricePerUnit === 0 ? '' : formData.pricePerUnit}
                          onChange={handleChange}
                          onWheel={(e) => e.target.blur()}
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          className="flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                        />
                        <span className="text-sm text-gray-500">$</span>
                      </div>
                      {errors.pricePerUnit && <p className="text-xs text-red-600 mt-1">{errors.pricePerUnit}</p>}
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Bulk Pricing (Quantity in {getCurrentUnitLabel()}):
                      </label>
                      <button
                        type="button"
                        onClick={addPricingRow}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border"
                        style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        Add Tier
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.quantityBasedPricing.map((tier, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-start gap-3">
                          <div className="w-full sm:w-1/2">
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              Quantity Range ({getCurrentUnitLabel()})
                            </label>
                            <input
                              type="text"
                              value={tier.range}
                              onChange={(e) => handlePricingChange(index, 'range', e.target.value)}
                              placeholder={
                                orderUnit === 'ton' ? "e.g., 1-4 MT" : 
                                orderUnit === 'kg' ? "e.g., 100-499 kg" : 
                                "e.g., 100-299 pcs"
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                            />
                          </div>
                          <div className="w-full sm:w-1/2">
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              Price Per {orderUnit === 'ton' ? 'MT ($)' : orderUnit === 'kg' ? 'KG ($)' : 'Unit ($)'}
                            </label>
                            <input
                              type="number"
                              value={tier.price === 0 ? '' : tier.price}
                              onChange={(e) => handlePricingChange(index, 'price', e.target.value)}
                              onWheel={(e) => e.target.blur()}
                              placeholder="0.00"
                              min="0"
                              step="0.01"
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                            />
                          </div>
                          {formData.quantityBasedPricing.length > 1 && (
                            <div className="flex items-center h-auto sm:h-[62px]">
                              <button
                                type="button"
                                onClick={() => removePricingRow(index)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <MinusCircle className="w-5 h-5" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {orderUnit === 'ton' 
                        ? 'Set pricing tiers based on order quantity in Metric Tons (1 MT = 1000 kg)' 
                        : orderUnit === 'kg'
                        ? 'Set pricing tiers based on order weight in kilograms'
                        : 'Set pricing tiers based on order quantity in pieces'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 sm:p-5 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    <Wrench className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                    Customization Options
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Add customization options available for this product (e.g., Logo Printing, Handle Type, Color Options, etc.)
                  </p>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="space-y-4">
                    {formData.customizationOptions.map((option, index) => (
                      <div key={index} className="flex flex-col sm:flex-row items-start gap-3 p-3 sm:p-4 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              <Type className="w-3 h-3 inline mr-1" />
                              Customization Title
                            </label>
                            <input
                              type="text"
                              value={option.title}
                              onChange={(e) => handleCustomizationChange(index, 'title', e.target.value)}
                              placeholder="e.g., Logo Printing, Handle Type, Material Finish"
                              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              <Hash className="w-3 h-3 inline mr-1" />
                              Options / Details
                            </label>
                            <input
                              type="text"
                              value={option.value}
                              onChange={(e) => handleCustomizationChange(index, 'value', e.target.value)}
                              placeholder="e.g., Custom logo available, Cotton handle, Matte finish"
                              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCustomizationOption(index)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addCustomizationOption}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-2 border-dashed rounded-lg transition-colors"
                      style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Customization Option
                    </button>
                    <p className="text-xs text-gray-400 text-center mt-2">
                      Add as many customization options as needed. Leave empty if not applicable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 sm:p-5 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    <Info className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                    Additional Information
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Add custom fields for extra product details (e.g., GSM, tensile strength, etc.)
                  </p>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="space-y-4">
                    {formData.additionalInfo.map((info, index) => (
                      <div key={index} className="flex flex-col sm:flex-row items-start gap-3 p-3 sm:p-4 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              <Type className="w-3 h-3 inline mr-1" />
                              Field Name
                            </label>
                            <input
                              type="text"
                              value={info.fieldName}
                              onChange={(e) => handleAdditionalInfoChange(index, 'fieldName', e.target.value)}
                              placeholder="e.g., GSM, Tensile Strength"
                              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1.5">
                              <Hash className="w-3 h-3 inline mr-1" />
                              Field Value
                            </label>
                            <input
                              type="text"
                              value={info.fieldValue}
                              onChange={(e) => handleAdditionalInfoChange(index, 'fieldValue', e.target.value)}
                              placeholder="e.g., 200 GSM, 50 kg"
                              className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAdditionalInfo(index)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addAdditionalInfo}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-2 border-dashed rounded-lg transition-colors"
                      style={{ color: '#6B4F3A', borderColor: '#6B4F3A' }}
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Additional Information
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Promotion */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 sm:p-5 border-b border-gray-200">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    <Star className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                    Product Promotion
                  </h2>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="mb-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => {
                          setFormData({ ...formData, isFeatured: e.target.checked });
                          setShowTags(e.target.checked);
                        }}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded"
                        style={{ accentColor: '#6B4F3A' }}
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-700">Mark as Featured Product</span>
                        <p className="text-xs text-gray-500">Featured products will appear in special sections</p>
                      </div>
                    </label>
                  </div>

                  <div className="mt-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer py-2"
                      onClick={() => setShowTags(!showTags)}
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" style={{ color: '#6B4F3A' }} />
                        <h3 className="text-sm font-medium text-gray-700">Product Tags/Labels</h3>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showTags ? 'rotate-180' : ''}`} />
                    </div>
                    {showTags && (
                      <div className="mt-3">
                        <p className="text-xs text-gray-500 mb-2">Select one tag (optional)</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {AVAILABLE_TAGS.map(tag => (
                            <label key={tag} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="productTag"
                                checked={formData.tags.includes(tag)}
                                onChange={() => handleTagToggle(tag)}
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                style={{ accentColor: '#6B4F3A' }}
                              />
                              <span className="text-sm text-gray-600">{tag}</span>
                            </label>
                          ))}
                        </div>
                        {formData.tags.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {formData.tags.map(tag => (
                              <span key={tag} className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => handleTagToggle(tag)}
                                  className="ml-1.5 hover:opacity-70"
                                >
                                  <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Settings */}
            <div className="mb-4 sm:mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 sm:p-5 border-b border-gray-200">
                  <div 
                    className="flex items-center justify-between cursor-pointer py-2"
                    onClick={() => setShowMeta(!showMeta)}
                  >
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      <Search className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#6B4F3A' }} />
                      Meta Settings (SEO)
                    </h2>
                    <ChevronDown className={`w-4 h-5 sm:w-5 sm:h-5 text-gray-500 transition-transform ${showMeta ? 'rotate-180' : ''}`} />
                  </div>
                </div>
                {showMeta && (
                  <div className="p-4 sm:p-5">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                        <input
                          type="text"
                          value={formData.metaSettings.metaTitle}
                          onChange={(e) => handleMetaChange('metaTitle', e.target.value)}
                          maxLength="70"
                          placeholder="Enter meta title (max 70 characters)"
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition"
                        />
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">Appears in search engine results</p>
                          <span className="text-xs text-gray-500">{formData.metaSettings.metaTitle?.length || 0}/70</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                        <textarea
                          value={formData.metaSettings.metaDescription}
                          onChange={(e) => handleMetaChange('metaDescription', e.target.value)}
                          maxLength="160"
                          placeholder="Enter meta description (max 160 characters)"
                          rows="3"
                          className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition resize-none"
                        />
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">Brief description for search results</p>
                          <span className="text-xs text-gray-500">{formData.metaSettings.metaDescription?.length || 0}/160</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                        {formData.metaSettings.metaKeywords?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3 p-3 rounded-lg border" style={{ backgroundColor: '#FAF7F2', borderColor: '#F5E6D3' }}>
                            {formData.metaSettings.metaKeywords.map((keyword, index) => (
                              <span key={index} className="inline-flex items-center px-2 sm:px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#F5E6D3', color: '#6B4F3A' }}>
                                {keyword}
                                <button type="button" onClick={() => removeKeyword(index)} className="ml-1.5 hover:opacity-70">
                                  <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="relative">
                          <input
                            type="text"
                            value={keywordInput}
                            onChange={(e) => setKeywordInput(e.target.value)}
                            onKeyDown={handleKeywordKeyDown}
                            onBlur={handleKeywordBlur}
                            placeholder="Type a keyword and press Enter or comma to add"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B4F3A] focus:border-transparent outline-none transition pr-20"
                          />
                          {keywordInput.trim() && (
                            <button
                              type="button"
                              onClick={addKeyword}
                              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-white text-xs font-medium rounded transition-colors"
                              style={{ backgroundColor: '#6B4F3A' }}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                style={{ backgroundColor: '#6B4F3A' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Product...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Create Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MantineProvider>
  );
}