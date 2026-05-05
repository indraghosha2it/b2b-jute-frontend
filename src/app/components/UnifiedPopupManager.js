

// // components/UnifiedPopupManager.jsx
// 'use client';

// import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// import { usePathname } from 'next/navigation';
// import PromotionalModal from './PromotionalModal';
// import NewsletterPopup from './NewsletterPopup';

// export default function UnifiedPopupManager() {
//   const pathname = usePathname();
//   const [popupConfig, setPopupConfig] = useState(null);
//   const [configLoaded, setConfigLoaded] = useState(false);
//   const [showPromotional, setShowPromotional] = useState(false);
//   const [showNewsletter, setShowNewsletter] = useState(false);
//   const [promotionalProducts, setPromotionalProducts] = useState([]);
//   const [currentProductIndex, setCurrentProductIndex] = useState(0);
//   const [promotionalShowCount, setPromotionalShowCount] = useState(0);
//   const [newsletterShowCount, setNewsletterShowCount] = useState(0);
//   const [promotionalIntervals, setPromotionalIntervals] = useState([]);
//   const [promotionalMaxShows, setPromotionalMaxShows] = useState(3);
  
//   const timerRef = useRef(null);
//   const intervalRef = useRef(null);
  
//   // ✅ Use useMemo to stabilize these values
//   const hidePaths = useMemo(() => {
//     const hideAllPaths = ['/admin', '/moderator', '/customer'];
//     const hideNewsletterOnlyPaths = ['/login', '/register'];
    
//     const shouldHideAll = hideAllPaths.some(path => pathname?.startsWith(path));
//     const shouldHideNewsletter = shouldHideAll || hideNewsletterOnlyPaths.some(path => pathname?.startsWith(path));
    
//     return { shouldHideAll, shouldHideNewsletter };
//   }, [pathname]);
  
//   const { shouldHideAll, shouldHideNewsletter } = hidePaths;
  
//   console.log('🔍 UnifiedPopupManager - Current path:', pathname);
//   console.log('🔍 Should hide all popups:', shouldHideAll);
//   console.log('🔍 Should hide newsletter only:', shouldHideNewsletter);
  
//   // Detect hard reload by checking performance navigation type
//   const isHardReload = () => {
//     if (typeof window !== 'undefined' && performance) {
//       const nav = performance.getEntriesByType('navigation')[0];
//       if (nav) {
//         return nav.type === 'reload';
//       }
//     }
//     const lastLoadTime = sessionStorage.getItem('lastLoadTime');
//     const now = Date.now();
//     if (lastLoadTime && (now - parseInt(lastLoadTime)) < 2000) {
//       return true;
//     }
//     sessionStorage.setItem('lastLoadTime', now.toString());
//     return false;
//   };
  
//   // Reset counters on hard reload
//   useEffect(() => {
//     if (isHardReload()) {
//       console.log('🔄 Hard reload detected! Resetting all popup counters...');
//       localStorage.removeItem('promotionalShowCount');
//       localStorage.removeItem('newsletterShowCount');
//       localStorage.removeItem('lastShownPopup');
//       sessionStorage.removeItem('popupSessionId');
//       setPromotionalShowCount(0);
//       setNewsletterShowCount(0);
//     }
//   }, []);
  
//   // Fetch popup configuration - ✅ use useRef to avoid dependency issues
//   useEffect(() => {
//     const fetchPopupConfig = async () => {
//       try {
//         console.log('📡 Fetching popup config from API...');
//         const response = await fetch('http://localhost:5000/api/popup-config');
//         const data = await response.json();
        
//         console.log('📦 Popup config response:', data);
        
//         if (data.success) {
//           console.log('✅ Active popup:', data.data.activePopup);
//           setPopupConfig(data.data);
          
//           const storedPromotionalCount = localStorage.getItem('promotionalShowCount');
//           const storedNewsletterCount = localStorage.getItem('newsletterShowCount');
//           const promoCount = storedPromotionalCount ? parseInt(storedPromotionalCount) : 0;
//           const newsCount = storedNewsletterCount ? parseInt(storedNewsletterCount) : 0;
          
//           setPromotionalShowCount(promoCount);
//           setNewsletterShowCount(newsCount);
          
//           console.log(`📊 Promotional show count: ${promoCount}`);
//           console.log(`📊 Newsletter show count: ${newsCount}`);
          
//           // Check if we should show based on current page
//           if (data.data.activePopup === 'promotional') {
//             if (!shouldHideAll) {
//               fetchPromotionalProducts(promoCount);
//             } else {
//               console.log('🚫 Promotional popup hidden on this page');
//               setConfigLoaded(true);
//             }
//           } else if (data.data.activePopup === 'newsletter') {
//             if (!shouldHideNewsletter) {
//               setConfigLoaded(true);
//               const maxShows = data.data.newsletter.maxShows || 3;
              
//               if (newsCount < maxShows) {
//                 const delay = data.data.globalSettings?.delayBeforeFirstPopup || 5;
//                 console.log(`📧 Will show newsletter popup in ${delay}s (show #${newsCount + 1} of ${maxShows})`);
//                 timerRef.current = setTimeout(() => {
//                   console.log('📧 Showing newsletter popup');
//                   setShowNewsletter(true);
//                 }, delay * 1000);
//               } else {
//                 console.log('📧 Newsletter popup already shown maximum times');
//               }
//             } else {
//               console.log('🚫 Newsletter popup hidden on this page');
//               setConfigLoaded(true);
//             }
//           } else {
//             setConfigLoaded(true);
//           }
//         } else {
//           console.error('❌ Failed to load popup config');
//           setConfigLoaded(true);
//         }
//       } catch (error) {
//         console.error('❌ Error fetching popup config:', error);
//         setConfigLoaded(true);
//       }
//     };
    
//     const fetchPromotionalProducts = async (currentCount) => {
//       try {
//         console.log('📡 Fetching promotional products...');
//         const response = await fetch('http://localhost:5000/api/promotional');
//         const data = await response.json();
        
//         console.log('📦 Promotional products response:', data);
        
//         if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
//           console.log('✅ Found', data.data.products.length, 'promotional products');
//           setPromotionalProducts(data.data.products);
//           setPromotionalIntervals(data.data.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }]);
//           setPromotionalMaxShows(data.data.maxShows || 3);
          
//           if (currentCount < (data.data.maxShows || 3)) {
//             const firstDelay = (data.data.intervals?.[0]?.delay || 5) * 1000;
//             console.log(`🎯 Will show promotional popup in ${firstDelay/1000}s (show #${currentCount + 1} of ${data.data.maxShows})`);
            
//             timerRef.current = setTimeout(() => {
//               console.log('🎯 Showing promotional popup');
//               setShowPromotional(true);
//             }, firstDelay);
//           } else {
//             console.log('🎯 Promotional popup already shown maximum times');
//           }
//         } else {
//           console.log('⚠️ No promotional products found or inactive');
//         }
//       } catch (error) {
//         console.error('❌ Error fetching promotional products:', error);
//       } finally {
//         setConfigLoaded(true);
//       }
//     };
    
//     fetchPopupConfig();
    
//     // Cleanup timeouts
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, [shouldHideAll, shouldHideNewsletter]); // ✅ Now these are stable from useMemo
  
//   // Handle promotional modal close
//   const handlePromotionalClose = () => {
//     setShowPromotional(false);
    
//     const newCount = promotionalShowCount + 1;
//     setPromotionalShowCount(newCount);
//     localStorage.setItem('promotionalShowCount', newCount.toString());
    
//     console.log(`🔚 Promotional popup closed. Show #${newCount} of ${promotionalMaxShows}`);
    
//     if (newCount < promotionalMaxShows && promotionalIntervals[newCount]) {
//       const nextDelay = promotionalIntervals[newCount].delay * 1000;
//       console.log(`⏰ Next promotional popup in ${nextDelay/1000}s`);
      
//       if (intervalRef.current) clearTimeout(intervalRef.current);
//       intervalRef.current = setTimeout(() => {
//         console.log(`🎯 Showing promotional popup #${newCount + 1}`);
//         setShowPromotional(true);
//       }, nextDelay);
//     } else {
//       console.log('✅ All promotional popups shown for this session');
//     }
//   };
  
//   // Handle newsletter modal close
//   const handleNewsletterClose = () => {
//     setShowNewsletter(false);
    
//     const newCount = newsletterShowCount + 1;
//     setNewsletterShowCount(newCount);
//     localStorage.setItem('newsletterShowCount', newCount.toString());
    
//     console.log(`🔚 Newsletter popup closed. Show #${newCount}`);
    
//     if (popupConfig?.newsletter && newCount < popupConfig.newsletter.maxShows) {
//       const intervals = popupConfig.newsletter.intervals;
//       const nextDelay = (intervals[newCount]?.delay || 15) * 1000;
      
//       console.log(`⏰ Next newsletter popup in ${nextDelay/1000}s`);
//       if (intervalRef.current) clearTimeout(intervalRef.current);
//       intervalRef.current = setTimeout(() => {
//         console.log('📧 Showing next newsletter popup');
//         setShowNewsletter(true);
//       }, nextDelay);
//     } else {
//       console.log('✅ All newsletter popups shown for this session');
//     }
//   };
  
//   // Cleanup intervals on unmount
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       if (intervalRef.current) clearTimeout(intervalRef.current);
//     };
//   }, []);
  
//   // Debug render conditions
//   console.log('🔍 Render conditions:', {
//     configLoaded,
//     shouldHideAll,
//     shouldHideNewsletter,
//     popupConfig: popupConfig?.activePopup,
//     showPromotional,
//     showNewsletter,
//     promotionalProductsCount: promotionalProducts.length,
//     promotionalShowCount,
//     newsletterShowCount
//   });
  
//   if (!configLoaded) {
//     console.log('⏳ Config not loaded yet');
//     return null;
//   }
  
//   // Don't show ANY popup on admin/moderator/customer pages
//   if (shouldHideAll) {
//     console.log('🚫 Hiding all popups on this page');
//     return null;
//   }
  
//   // Don't render anything if no popup is configured to show
//   if (popupConfig?.activePopup === 'none') {
//     return null;
//   }
  
//   return (
//     <>
//       {/* Promotional Modal - shows on all pages except admin/mod/customer */}
//       {showPromotional && promotionalProducts.length > 0 && (
//         <PromotionalModal 
//           products={promotionalProducts}
//           onClose={handlePromotionalClose}
//           currentProductIndex={currentProductIndex}
//           onProductChange={setCurrentProductIndex}
//         />
//       )}
      
//       {/* Newsletter Popup - hides on login/register pages as well */}
//       {!shouldHideNewsletter && (
//         <NewsletterPopup 
//           isExternallyControlled={true} 
//           onClose={handleNewsletterClose}
//           forceOpen={showNewsletter}
//         />
//       )}
//     </>
//   );
// }








// // components/UnifiedPopupManager.jsx ( fixed version for promotional)
// 'use client';

// import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// import { usePathname } from 'next/navigation';
// import PromotionalModal from './PromotionalModal';
// import NewsletterPopup from './NewsletterPopup';

// export default function UnifiedPopupManager() {
//   const pathname = usePathname();
//   const [popupConfig, setPopupConfig] = useState(null);
//   const [configLoaded, setConfigLoaded] = useState(false);
//   const [showPromotional, setShowPromotional] = useState(false);
//   const [showNewsletter, setShowNewsletter] = useState(false);
//   const [promotionalProducts, setPromotionalProducts] = useState([]);
//   const [currentProductIndex, setCurrentProductIndex] = useState(0);
//   const [promotionalShowCount, setPromotionalShowCount] = useState(0);
//   const [newsletterShowCount, setNewsletterShowCount] = useState(0);
//   const [promotionalIntervals, setPromotionalIntervals] = useState([]);
//   const [promotionalMaxShows, setPromotionalMaxShows] = useState(3);
//   const [currentPathFilteredProducts, setCurrentPathFilteredProducts] = useState([]);
  
//   const timerRef = useRef(null);
//   const intervalRef = useRef(null);
  
//   // Different hide paths for different popups
//   const hideAllPaths = ['/admin', '/moderator', '/customer'];
//   const hideNewsletterOnlyPaths = ['/login', '/register', '/productDetails'];
  
//   const shouldHideAll = hideAllPaths.some(path => pathname?.startsWith(path));
//   const shouldHideNewsletter = shouldHideAll || hideNewsletterOnlyPaths.some(path => pathname?.startsWith(path));
  
//   console.log('🔍 UnifiedPopupManager - Current path:', pathname);
//   console.log('🔍 Should hide all popups:', shouldHideAll);
//   console.log('🔍 Should hide newsletter only:', shouldHideNewsletter);
  
//   // Helper function to normalize paths
//   const normalizePath = (path) => {
//     if (!path) return '/';
//     let normalized = path === '/' ? '/' : path.replace(/\/$/, '');
//     normalized = normalized.split('?')[0];
//     return normalized;
//   };
  
//   // Detect hard reload by checking performance navigation type
//   const isHardReload = () => {
//     if (typeof window !== 'undefined' && performance) {
//       const nav = performance.getEntriesByType('navigation')[0];
//       if (nav) {
//         return nav.type === 'reload';
//       }
//     }
//     const lastLoadTime = sessionStorage.getItem('lastLoadTime');
//     const now = Date.now();
//     if (lastLoadTime && (now - parseInt(lastLoadTime)) < 2000) {
//       return true;
//     }
//     sessionStorage.setItem('lastLoadTime', now.toString());
//     return false;
//   };
  
//   // Reset counters on hard reload
//   useEffect(() => {
//     if (isHardReload()) {
//       console.log('🔄 Hard reload detected! Resetting all popup counters...');
//       localStorage.removeItem('promotionalShowCount');
//       localStorage.removeItem('newsletterShowCount');
//       localStorage.removeItem('lastShownPopup');
//       sessionStorage.removeItem('popupSessionId');
//       setPromotionalShowCount(0);
//       setNewsletterShowCount(0);
//     }
//   }, []);
  
//   // Cancel scheduled popup
//   const cancelScheduledPopup = () => {
//     if (timerRef.current) {
//       console.log('❌ Cancelling scheduled popup due to page change');
//       clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }
//     if (intervalRef.current) {
//       clearTimeout(intervalRef.current);
//       intervalRef.current = null;
//     }
//   };
  
//   // Check if current page should show popup
//   const shouldShowOnCurrentPage = useCallback((products) => {
//     const currentPath = normalizePath(pathname);
//     const hasProductsForPage = products.some(product => {
//       if (product.showOnPages && Array.isArray(product.showOnPages) && product.showOnPages.length > 0) {
//         const normalizedShowOnPages = product.showOnPages.map(page => normalizePath(page));
//         return normalizedShowOnPages.includes(currentPath);
//       }
//       return false;
//     });
//     return hasProductsForPage;
//   }, [pathname]);
  
//   // Fetch popup configuration
//   useEffect(() => {
//     // Cancel any pending popup when pathname changes
//     cancelScheduledPopup();
//     setShowPromotional(false);
    
//     const fetchPopupConfig = async () => {
//       try {
//         console.log('📡 Fetching popup config from API...');
//         const response = await fetch('http://localhost:5000/api/popup-config');
//         const data = await response.json();
        
//         console.log('📦 Popup config response:', data);
        
//         if (data.success) {
//           console.log('✅ Active popup:', data.data.activePopup);
//           setPopupConfig(data.data);
          
//           const storedPromotionalCount = localStorage.getItem('promotionalShowCount');
//           const storedNewsletterCount = localStorage.getItem('newsletterShowCount');
//           const promoCount = storedPromotionalCount ? parseInt(storedPromotionalCount) : 0;
//           const newsCount = storedNewsletterCount ? parseInt(storedNewsletterCount) : 0;
          
//           setPromotionalShowCount(promoCount);
//           setNewsletterShowCount(newsCount);
          
//           console.log(`📊 Promotional show count: ${promoCount}`);
//           console.log(`📊 Newsletter show count: ${newsCount}`);
          
//           if (data.data.activePopup === 'promotional') {
//             if (!shouldHideAll) {
//               await fetchPromotionalProducts(promoCount);
//             } else {
//               console.log('🚫 Promotional popup hidden on this page');
//               setConfigLoaded(true);
//             }
//           } else if (data.data.activePopup === 'newsletter') {
//             if (!shouldHideNewsletter) {
//               setConfigLoaded(true);
//               const maxShows = data.data.newsletter.maxShows || 3;
              
//               if (newsCount < maxShows) {
//                 const delay = data.data.globalSettings?.delayBeforeFirstPopup || 5;
//                 console.log(`📧 Will show newsletter popup in ${delay}s (show #${newsCount + 1} of ${maxShows})`);
//                 timerRef.current = setTimeout(() => {
//                   console.log('📧 Showing newsletter popup');
//                   setShowNewsletter(true);
//                 }, delay * 1000);
//               } else {
//                 console.log('📧 Newsletter popup already shown maximum times');
//               }
//             } else {
//               console.log('🚫 Newsletter popup hidden on this page');
//               setConfigLoaded(true);
//             }
//           } else {
//             setConfigLoaded(true);
//           }
//         } else {
//           console.error('❌ Failed to load popup config');
//           setConfigLoaded(true);
//         }
//       } catch (error) {
//         console.error('❌ Error fetching popup config:', error);
//         setConfigLoaded(true);
//       }
//     };
    
//     const fetchPromotionalProducts = async (currentCount) => {
//       try {
//         console.log('📡 Fetching promotional products...');
//         const response = await fetch('http://localhost:5000/api/promotional');
//         const data = await response.json();
        
//         console.log('📦 Promotional products response:', data);
        
//         if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
//           console.log('✅ Total products from API:', data.data.products.length);
          
//           const currentPath = normalizePath(pathname);
//           console.log('📍 Current page path (normalized):', currentPath);
          
//           // Filter products by current page
//           const filteredProducts = data.data.products.filter(product => {
//             if (product.showOnPages && Array.isArray(product.showOnPages) && product.showOnPages.length > 0) {
//               const normalizedShowOnPages = product.showOnPages.map(page => normalizePath(page));
//               console.log(`📌 Product "${product.productName}" allowed on:`, normalizedShowOnPages);
//               const isAllowed = normalizedShowOnPages.includes(currentPath);
//               console.log(`📌 Product "${product.productName}" is ${isAllowed ? '✅ ALLOWED' : '❌ HIDDEN'} on page: ${currentPath}`);
//               return isAllowed;
//             }
//             console.log(`⚠️ Product "${product.productName}" has no page restrictions - NOT SHOWING`);
//             return false;
//           });
          
//           console.log(`📊 Filtered products for current page: ${filteredProducts.length} of ${data.data.products.length}`);
          
//           setCurrentPathFilteredProducts(filteredProducts);
          
//           // ONLY proceed if there are filtered products for current page
//           if (filteredProducts.length === 0) {
//             console.log('⚠️ No products available for current page - Skipping promotional popup');
//             setConfigLoaded(true);
//             return;
//           }
          
//           setPromotionalProducts(filteredProducts);
//           setPromotionalIntervals(data.data.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }]);
//           setPromotionalMaxShows(data.data.maxShows || 3);
          
//           // Check if we've already shown the maximum number of times
//           if (currentCount >= (data.data.maxShows || 3)) {
//             console.log('🎯 Promotional popup already shown maximum times');
//             setConfigLoaded(true);
//             return;
//           }
          
//           // Schedule the popup
//           const firstDelay = (data.data.intervals?.[0]?.delay || 5) * 1000;
//           console.log(`🎯 Will show promotional popup in ${firstDelay/1000}s (show #${currentCount + 1} of ${data.data.maxShows})`);
          
//           if (timerRef.current) clearTimeout(timerRef.current);
//           timerRef.current = setTimeout(() => {
//             // Double-check that current page still should show popup before showing
//             const stillShouldShow = shouldShowOnCurrentPage(filteredProducts);
//             if (stillShouldShow) {
//               console.log('🎯 Showing promotional popup');
//               setShowPromotional(true);
//             } else {
//               console.log('❌ Popup cancelled - current page no longer should show popup');
//             }
//           }, firstDelay);
          
//         } else {
//           console.log('⚠️ No promotional products found or inactive');
//         }
//       } catch (error) {
//         console.error('❌ Error fetching promotional products:', error);
//       } finally {
//         setConfigLoaded(true);
//       }
//     };
    
//     fetchPopupConfig();
    
//     // Cleanup timeouts on unmount or path change
//     return () => {
//       cancelScheduledPopup();
//     };
//   }, [pathname, shouldHideAll, shouldHideNewsletter]);
  
//   // Handle promotional modal close
//   const handlePromotionalClose = () => {
//     setShowPromotional(false);
    
//     const newCount = promotionalShowCount + 1;
//     setPromotionalShowCount(newCount);
//     localStorage.setItem('promotionalShowCount', newCount.toString());
    
//     console.log(`🔚 Promotional popup closed. Show #${newCount} of ${promotionalMaxShows}`);
    
//     // Only schedule next popup if current page still should show popup
//     const stillShouldShow = shouldShowOnCurrentPage(promotionalProducts);
    
//     if (stillShouldShow && newCount < promotionalMaxShows && promotionalIntervals[newCount]) {
//       const nextDelay = promotionalIntervals[newCount].delay * 1000;
//       console.log(`⏰ Next promotional popup in ${nextDelay/1000}s`);
      
//       if (intervalRef.current) clearTimeout(intervalRef.current);
//       intervalRef.current = setTimeout(() => {
//         // Double-check before showing next popup
//         if (shouldShowOnCurrentPage(promotionalProducts)) {
//           console.log(`🎯 Showing promotional popup #${newCount + 1}`);
//           setShowPromotional(true);
//         } else {
//           console.log('❌ Next popup cancelled - current page no longer should show popup');
//         }
//       }, nextDelay);
//     } else {
//       console.log('✅ All promotional popups shown for this session or page changed');
//     }
//   };
  
//   // Handle newsletter modal close
//   const handleNewsletterClose = () => {
//     setShowNewsletter(false);
    
//     const newCount = newsletterShowCount + 1;
//     setNewsletterShowCount(newCount);
//     localStorage.setItem('newsletterShowCount', newCount.toString());
    
//     console.log(`🔚 Newsletter popup closed. Show #${newCount}`);
    
//     if (popupConfig?.newsletter && newCount < popupConfig.newsletter.maxShows) {
//       const intervals = popupConfig.newsletter.intervals;
//       const nextDelay = (intervals[newCount]?.delay || 15) * 1000;
      
//       console.log(`⏰ Next newsletter popup in ${nextDelay/1000}s`);
//       if (intervalRef.current) clearTimeout(intervalRef.current);
//       intervalRef.current = setTimeout(() => {
//         console.log('📧 Showing next newsletter popup');
//         setShowNewsletter(true);
//       }, nextDelay);
//     } else {
//       console.log('✅ All newsletter popups shown for this session');
//     }
//   };
  
//   // Cleanup intervals on unmount
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//       if (intervalRef.current) clearTimeout(intervalRef.current);
//     };
//   }, []);
  
//   // Debug render conditions
//   console.log('🔍 Render conditions:', {
//     configLoaded,
//     shouldHideAll,
//     shouldHideNewsletter,
//     popupConfig: popupConfig?.activePopup,
//     showPromotional,
//     showNewsletter,
//     promotionalProductsCount: promotionalProducts.length,
//     promotionalShowCount,
//     newsletterShowCount
//   });
  
//   if (!configLoaded) {
//     console.log('⏳ Config not loaded yet');
//     return null;
//   }
  
//   // Don't show ANY popup on admin/moderator/customer pages
//   if (shouldHideAll) {
//     console.log('🚫 Hiding all popups on this page');
//     return null;
//   }
  
//   // Don't render anything if no popup is configured to show
//   if (popupConfig?.activePopup === 'none') {
//     return null;
//   }
  
//   return (
//     <>
//       {/* Promotional Modal - shows only on allowed pages */}
//       {showPromotional && promotionalProducts.length > 0 && shouldShowOnCurrentPage(promotionalProducts) && (
//         <PromotionalModal 
//           products={promotionalProducts}
//           onClose={handlePromotionalClose}
//           currentProductIndex={currentProductIndex}
//           onProductChange={setCurrentProductIndex}
//         />
//       )}
      
//       {/* Newsletter Popup - hides on login/register pages as well */}
//       {!shouldHideNewsletter && (
//         <NewsletterPopup 
//           isExternallyControlled={true} 
//           onClose={handleNewsletterClose}
//           forceOpen={showNewsletter}
//         />
//       )}
//     </>
//   );
// }




// 2components/UnifiedPopupManager.js only showing promotional
// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { usePathname } from 'next/navigation';
// import PromotionalModal from './PromotionalModal';
// import NewsletterPopup from './NewsletterPopup';

// export default function UnifiedPopupManager() {
//   const pathname = usePathname();
//   const [popupConfig, setPopupConfig] = useState(null);
//   const [configLoaded, setConfigLoaded] = useState(false);
//   const [showPromotional, setShowPromotional] = useState(false);
//   const [showNewsletter, setShowNewsletter] = useState(false);
//   const [promotionalProducts, setPromotionalProducts] = useState([]);
//   const [currentProductIndex, setCurrentProductIndex] = useState(0);
//   const [promotionalShowCount, setPromotionalShowCount] = useState(0);
//   const [newsletterShowCount, setNewsletterShowCount] = useState(0);
//   const [promotionalIntervals, setPromotionalIntervals] = useState([]);
//   const [promotionalMaxShows, setPromotionalMaxShows] = useState(3);
//   const [isUserSubscribed, setIsUserSubscribed] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [subscriptionChecked, setSubscriptionChecked] = useState(false);
//   const [shouldHideAll, setShouldHideAll] = useState(false);
//   const [shouldHideNewsletter, setShouldHideNewsletter] = useState(false);
  
//   const timerRef = useRef(null);
//   const intervalRef = useRef(null);
//   const isMountedRef = useRef(true);
//   const lastPathnameRef = useRef(pathname);
  
//   // Different hide paths for different popups
//   const hideAllPaths = ['/admin', '/moderator', '/customer'];
//   const hideNewsletterOnlyPaths = ['/login', '/register', '/productDetails'];
  
//   // Helper function to normalize paths
//   const normalizePath = (path) => {
//     if (!path) return '/';
//     let normalized = path === '/' ? '/' : path.replace(/\/$/, '');
//     normalized = normalized.split('?')[0];
//     return normalized;
//   };
  
//   // Update hide states when pathname changes
//   useEffect(() => {
//     const hideAll = hideAllPaths.some(path => pathname?.startsWith(path));
//     const hideNewsletter = hideAll || hideNewsletterOnlyPaths.some(path => pathname?.startsWith(path));
    
//     setShouldHideAll(hideAll);
//     setShouldHideNewsletter(hideNewsletter);
    
//     console.log('🔍 Path updated - Current path:', pathname);
//     console.log('🔍 Should hide all popups:', hideAll);
//     console.log('🔍 Should hide newsletter only:', hideNewsletter);
//   }, [pathname]);
  
//   // Check if user is subscribed to newsletter
//   const checkUserSubscription = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');
      
//       if (token && userData) {
//         setIsLoggedIn(true);
//         const response = await fetch('http://localhost:5000/api/auth/subscription-status', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const data = await response.json();
//         if (data.success) {
//           setIsUserSubscribed(data.isSubscribed);
//           console.log('📧 User subscription status:', data.isSubscribed);
//         }
//       } else {
//         setIsLoggedIn(false);
//         setIsUserSubscribed(false);
//       }
//     } catch (error) {
//       console.error('Error checking subscription:', error);
//       setIsUserSubscribed(false);
//     } finally {
//       setSubscriptionChecked(true);
//     }
//   };
  
//   // Detect hard reload
//   const isHardReload = () => {
//     if (typeof window !== 'undefined' && performance) {
//       const nav = performance.getEntriesByType('navigation')[0];
//       if (nav) {
//         return nav.type === 'reload';
//       }
//     }
//     const lastLoadTime = sessionStorage.getItem('lastLoadTime');
//     const now = Date.now();
//     if (lastLoadTime && (now - parseInt(lastLoadTime)) < 2000) {
//       return true;
//     }
//     sessionStorage.setItem('lastLoadTime', now.toString());
//     return false;
//   };
  
//   // Reset counters on hard reload
//   useEffect(() => {
//     if (isHardReload()) {
//       console.log('🔄 Hard reload detected! Resetting all popup counters...');
//       localStorage.removeItem('promotionalShowCount');
//       localStorage.removeItem('newsletterShowCount');
//       setPromotionalShowCount(0);
//       setNewsletterShowCount(0);
//     }
//   }, []);
  
//   // Check subscription status on mount and auth change
//   useEffect(() => {
//     checkUserSubscription();
    
//     const handleAuthChange = () => {
//       console.log('🔄 Auth change detected, checking subscription...');
//       checkUserSubscription();
//     };
    
//     window.addEventListener('auth-change', handleAuthChange);
//     return () => window.removeEventListener('auth-change', handleAuthChange);
//   }, []);
  
//   // Cleanup on unmount
//   useEffect(() => {
//     isMountedRef.current = true;
//     return () => {
//       isMountedRef.current = false;
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//         timerRef.current = null;
//       }
//       if (intervalRef.current) {
//         clearTimeout(intervalRef.current);
//         intervalRef.current = null;
//       }
//     };
//   }, []);
  
//   // Schedule next popup after close
//   const scheduleNextPopup = useCallback((currentCount, intervals, maxShows, products, currentPath) => {
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }
    
//     console.log(`📅 Scheduling next popup - Current count: ${currentCount}, Max shows: ${maxShows}`);
    
//     if (currentCount < maxShows && intervals[currentCount]) {
//       const nextDelay = intervals[currentCount].delay * 1000;
//       console.log(`⏰ Next popup scheduled in ${nextDelay/1000}s (interval ${currentCount})`);
      
//       timerRef.current = setTimeout(() => {
//         if (!isMountedRef.current) return;
        
//         // Check if current page should show popup
//         const currentPagePath = normalizePath(pathname);
//         const hasAllowedProducts = products.some(product => {
//           if (product.showOnPages && Array.isArray(product.showOnPages) && product.showOnPages.length > 0) {
//             const normalizedShowOnPages = product.showOnPages.map(page => normalizePath(page));
//             return normalizedShowOnPages.includes(currentPagePath);
//           }
//           return false;
//         });
        
//         if (hasAllowedProducts) {
//           console.log(`🎯 Showing popup #${currentCount + 1}`);
//           setShowPromotional(true);
//         } else {
//           console.log('❌ Popup cancelled - current page not allowed');
//           // Recursively schedule next if still have intervals left
//           if (currentCount + 1 < maxShows && intervals[currentCount + 1]) {
//             scheduleNextPopup(currentCount + 1, intervals, maxShows, products, currentPagePath);
//           }
//         }
//         timerRef.current = null;
//       }, nextDelay);
//     } else {
//       console.log('📅 No more popups to schedule');
//     }
//   }, [pathname]);
  
//   // Handle promotional modal close
//   const handlePromotionalClose = () => {
//     console.log('🔚 Promotional popup closed');
//     setShowPromotional(false);
    
//     const newCount = promotionalShowCount + 1;
//     setPromotionalShowCount(newCount);
//     localStorage.setItem('promotionalShowCount', newCount.toString());
    
//     // Schedule next popup
//     scheduleNextPopup(newCount, promotionalIntervals, promotionalMaxShows, promotionalProducts, pathname);
//   };
  
//   // Handle newsletter modal close
//   const handleNewsletterClose = () => {
//     setShowNewsletter(false);
    
//     const newCount = newsletterShowCount + 1;
//     setNewsletterShowCount(newCount);
//     localStorage.setItem('newsletterShowCount', newCount.toString());
    
//     if (isUserSubscribed) {
//       console.log('📧 User already subscribed - no more popups');
//       return;
//     }
    
//     if (popupConfig?.newsletter && newCount < popupConfig.newsletter.maxShows) {
//       const intervals = popupConfig.newsletter.intervals;
//       const nextDelay = (intervals[newCount]?.delay || 15) * 1000;
      
//       console.log(`⏰ Next newsletter popup in ${nextDelay/1000}s`);
//       timerRef.current = setTimeout(() => {
//         if (isMountedRef.current) {
//           console.log('📧 Showing next newsletter popup');
//           setShowNewsletter(true);
//         }
//         timerRef.current = null;
//       }, nextDelay);
//     }
//   };
  
//   // Initialize popup system on page load/navigation
//   const initializePopupSystem = useCallback(async (currentPathname, currentShowCount) => {
//     try {
//       console.log('📡 Initializing popup system for path:', currentPathname);
      
//       // Fetch promotional products
//       const response = await fetch('http://localhost:5000/api/promotional');
//       const data = await response.json();
      
//       console.log('📦 Promotional products response:', data);
      
//       if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
//         const currentPath = normalizePath(currentPathname);
        
//         const filteredProducts = data.data.products.filter(product => {
//           if (product.showOnPages && Array.isArray(product.showOnPages) && product.showOnPages.length > 0) {
//             const normalizedShowOnPages = product.showOnPages.map(page => normalizePath(page));
//             return normalizedShowOnPages.includes(currentPath);
//           }
//           return false;
//         });
        
//         console.log(`📊 Filtered products for ${currentPath}: ${filteredProducts.length} of ${data.data.products.length}`);
        
//         if (filteredProducts.length === 0) {
//           console.log('⚠️ No products available for current page');
//           return;
//         }
        
//         setPromotionalProducts(filteredProducts);
//         setPromotionalIntervals(data.data.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }]);
//         setPromotionalMaxShows(data.data.maxShows || 3);
        
//         // Check if we should show initial popup or schedule next
//         if (currentShowCount < (data.data.maxShows || 3)) {
//           // If we're at count 0, show first popup after delay
//           // If we're at count > 0, schedule next popup
//           if (currentShowCount === 0) {
//             const firstDelay = (data.data.intervals?.[0]?.delay || 5) * 1000;
//             console.log(`🎯 Will show first popup in ${firstDelay/1000}s`);
            
//             timerRef.current = setTimeout(() => {
//               if (isMountedRef.current) {
//                 console.log('🎯 SHOWING PROMOTIONAL POPUP!');
//                 setShowPromotional(true);
//               }
//               timerRef.current = null;
//             }, firstDelay);
//           } else {
//             // Schedule next popup based on current count
//             scheduleNextPopup(currentShowCount, data.data.intervals, data.data.maxShows, filteredProducts, currentPathname);
//           }
//         } else {
//           console.log('🎯 Already reached maximum shows');
//         }
//       }
//     } catch (error) {
//       console.error('❌ Error initializing popup system:', error);
//     }
//   }, [scheduleNextPopup]);
  
//   // Handle page navigation - re-initialize when pathname changes
//   useEffect(() => {
//     if (!configLoaded || !subscriptionChecked) return;
    
//     // Clear any existing timers
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//       timerRef.current = null;
//     }
    
//     // Reset show state
//     setShowPromotional(false);
    
//     // Get current show count from localStorage
//     const storedCount = localStorage.getItem('promotionalShowCount');
//     const currentCount = storedCount ? parseInt(storedCount) : 0;
//     setPromotionalShowCount(currentCount);
    
//     console.log(`🔄 Page changed to: ${pathname}, Current show count: ${currentCount}`);
    
//     // Initialize popup system for new page
//     if (!shouldHideAll) {
//       initializePopupSystem(pathname, currentCount);
//     }
    
//     lastPathnameRef.current = pathname;
//   }, [pathname, configLoaded, subscriptionChecked, shouldHideAll, initializePopupSystem]);
  
//   // Fetch popup configuration - only once
//   useEffect(() => {
//     let isActive = true;
    
//     const fetchPopupConfig = async () => {
//       if (!isActive) return;
      
//       try {
//         console.log('📡 Fetching popup config from API...');
//         const response = await fetch('http://localhost:5000/api/popup-config');
//         const data = await response.json();
        
//         if (data.success && isActive) {
//           console.log('✅ Active popup:', data.data.activePopup);
//           setPopupConfig(data.data);
          
//           const storedPromotionalCount = localStorage.getItem('promotionalShowCount');
//           const storedNewsletterCount = localStorage.getItem('newsletterShowCount');
//           const promoCount = storedPromotionalCount ? parseInt(storedPromotionalCount) : 0;
//           const newsCount = storedNewsletterCount ? parseInt(storedNewsletterCount) : 0;
          
//           setPromotionalShowCount(promoCount);
//           setNewsletterShowCount(newsCount);
          
//           console.log(`📊 Initial show counts - Promotional: ${promoCount}, Newsletter: ${newsCount}`);
          
//           setConfigLoaded(true);
//         } else if (isActive) {
//           console.error('❌ Failed to load popup config');
//           setConfigLoaded(true);
//         }
//       } catch (error) {
//         console.error('❌ Error fetching popup config:', error);
//         if (isActive) {
//           setConfigLoaded(true);
//         }
//       }
//     };
    
//     if (subscriptionChecked) {
//       fetchPopupConfig();
//     }
    
//     return () => {
//       isActive = false;
//     };
//   }, [subscriptionChecked]);
  
//   // Log render conditions
//   console.log('🟢 RENDERING - Config loaded:', configLoaded);
//   console.log('🟢 RENDERING - showPromotional:', showPromotional);
//   console.log('🟢 RENDERING - promotionalProducts length:', promotionalProducts.length);
//   console.log('🟢 RENDERING - promotionalShowCount:', promotionalShowCount);
  
//   if (!configLoaded || !subscriptionChecked) {
//     console.log('⏳ Waiting for config or subscription to load...');
//     return null;
//   }
  
//   if (shouldHideAll) {
//     console.log('🚫 All popups hidden on this page');
//     return null;
//   }
  
//   if (popupConfig?.activePopup === 'none') {
//     console.log('🚫 Popups disabled globally');
//     return null;
//   }
  
//   if (popupConfig?.activePopup === 'newsletter' && isUserSubscribed) {
//     console.log('📧 User subscribed - newsletter popups disabled');
//     return null;
//   }
  
//   return (
//     <>
//       {/* Debug indicator */}
//       {/* {showPromotional && promotionalProducts.length > 0 && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           background: 'red',
//           color: 'white',
//           zIndex: 999999,
//           padding: '10px',
//           fontSize: '12px',
//           fontWeight: 'bold'
//         }}>
//           🔥 DEBUG: Modal should be showing! Products: {promotionalProducts.length}
//         </div>
//       )} */}
      
//       {/* Promotional Modal */}
//       {showPromotional && promotionalProducts.length > 0 && (
//         <PromotionalModal 
//           key={`promo-${Date.now()}`}
//           products={promotionalProducts}
//           onClose={handlePromotionalClose}
//           currentProductIndex={currentProductIndex}
//           onProductChange={setCurrentProductIndex}
//         />
//       )}
      
//       {/* Newsletter Popup */}
//       {popupConfig?.activePopup === 'newsletter' && !shouldHideNewsletter && !isUserSubscribed && (
//         <NewsletterPopup 
//           isExternallyControlled={true} 
//           onClose={handleNewsletterClose}
//           forceOpen={showNewsletter}
//         />
//       )}
//     </>
//   );
// }

// components/UnifiedPopupManager.js
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import PromotionalModal from './PromotionalModal';
import NewsletterPopup from './NewsletterPopup';

export default function UnifiedPopupManager() {
  const pathname = usePathname();
  const [popupConfig, setPopupConfig] = useState(null);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [showPromotional, setShowPromotional] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [promotionalProducts, setPromotionalProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [promotionalShowCount, setPromotionalShowCount] = useState(0);
  const [newsletterShowCount, setNewsletterShowCount] = useState(0);
  const [promotionalIntervals, setPromotionalIntervals] = useState([]);
  const [promotionalMaxShows, setPromotionalMaxShows] = useState(3);
  const [isUserSubscribed, setIsUserSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriptionChecked, setSubscriptionChecked] = useState(false);
  const [shouldHideAll, setShouldHideAll] = useState(false);
  const [shouldHideNewsletter, setShouldHideNewsletter] = useState(false);
  
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const isMountedRef = useRef(true);
  const lastPathnameRef = useRef(pathname);
  
  // Different hide paths for different popups
  const hideAllPaths = ['/admin', '/moderator', '/customer'];
  const hideNewsletterOnlyPaths = ['/login', '/register', '/productDetails'];
  
  // Helper function to normalize paths
  const normalizePath = (path) => {
    if (!path) return '/';
    let normalized = path === '/' ? '/' : path.replace(/\/$/, '');
    normalized = normalized.split('?')[0];
    return normalized;
  };
  
  // Update hide states when pathname changes
  useEffect(() => {
    const hideAll = hideAllPaths.some(path => pathname?.startsWith(path));
    const hideNewsletter = hideAll || hideNewsletterOnlyPaths.some(path => pathname?.startsWith(path));
    
    setShouldHideAll(hideAll);
    setShouldHideNewsletter(hideNewsletter);
    
    console.log('🔍 Path updated - Current path:', pathname);
    console.log('🔍 Should hide all popups:', hideAll);
    console.log('🔍 Should hide newsletter only:', hideNewsletter);
  }, [pathname]);
  
  // Check if user is subscribed to newsletter
  const checkUserSubscription = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setIsLoggedIn(true);
        const response = await fetch('http://localhost:5000/api/auth/subscription-status', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) {
          setIsUserSubscribed(data.isSubscribed);
          console.log('📧 User subscription status:', data.isSubscribed);
        }
      } else {
        setIsLoggedIn(false);
        setIsUserSubscribed(false);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      setIsUserSubscribed(false);
    } finally {
      setSubscriptionChecked(true);
    }
  };
  
  // Detect hard reload
  const isHardReload = () => {
    if (typeof window !== 'undefined' && performance) {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) {
        return nav.type === 'reload';
      }
    }
    const lastLoadTime = sessionStorage.getItem('lastLoadTime');
    const now = Date.now();
    if (lastLoadTime && (now - parseInt(lastLoadTime)) < 2000) {
      return true;
    }
    sessionStorage.setItem('lastLoadTime', now.toString());
    return false;
  };
  
  // Reset counters on hard reload
  useEffect(() => {
    if (isHardReload()) {
      console.log('🔄 Hard reload detected! Resetting all popup counters...');
      localStorage.removeItem('promotionalShowCount');
      localStorage.removeItem('newsletterShowCount');
      setPromotionalShowCount(0);
      setNewsletterShowCount(0);
    }
  }, []);
  
  // Check subscription status on mount and auth change
  useEffect(() => {
    checkUserSubscription();
    
    const handleAuthChange = () => {
      console.log('🔄 Auth change detected, checking subscription...');
      checkUserSubscription();
    };
    
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
  
  // Handle promotional modal close
  const handlePromotionalClose = () => {
    console.log('🔚 Promotional popup closed');
    setShowPromotional(false);
    
    const newCount = promotionalShowCount + 1;
    setPromotionalShowCount(newCount);
    localStorage.setItem('promotionalShowCount', newCount.toString());
    
    // Schedule next promotional popup
    if (newCount < promotionalMaxShows && promotionalIntervals[newCount]) {
      const nextDelay = promotionalIntervals[newCount].delay * 1000;
      console.log(`⏰ Next promotional popup in ${nextDelay/1000}s`);
      
      timerRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        
        // Check if current page should show popup
        const currentPagePath = normalizePath(pathname);
        const hasAllowedProducts = promotionalProducts.some(product => {
          if (product.showOnPages && Array.isArray(product.showOnPages) && product.showOnPages.length > 0) {
            const normalizedShowOnPages = product.showOnPages.map(page => normalizePath(page));
            return normalizedShowOnPages.includes(currentPagePath);
          }
          return false;
        });
        
        if (hasAllowedProducts) {
          console.log(`🎯 Showing promotional popup #${newCount + 1}`);
          setShowPromotional(true);
        } else {
          console.log('❌ Promotional popup cancelled - current page not allowed');
        }
        timerRef.current = null;
      }, nextDelay);
    } else {
      console.log('📅 No more promotional popups to schedule');
    }
  };
  
  // Handle newsletter modal close
  const handleNewsletterClose = () => {
    console.log('📧 Newsletter popup closed');
    setShowNewsletter(false);
    
    const newCount = newsletterShowCount + 1;
    setNewsletterShowCount(newCount);
    localStorage.setItem('newsletterShowCount', newCount.toString());
    
    if (isUserSubscribed) {
      console.log('📧 User already subscribed - no more popups');
      return;
    }
    
    if (popupConfig?.newsletter && newCount < popupConfig.newsletter.maxShows) {
      const intervals = popupConfig.newsletter.intervals;
      const nextDelay = (intervals[newCount]?.delay || 15) * 1000;
      
      console.log(`⏰ Next newsletter popup in ${nextDelay/1000}s`);
      timerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          console.log('📧 Showing next newsletter popup');
          setShowNewsletter(true);
        }
        timerRef.current = null;
      }, nextDelay);
    }
  };
  
  // Initialize promotional popup system
  const initializePromotionalPopup = useCallback(async (currentPathname, currentShowCount) => {
    try {
      console.log('📡 Initializing promotional popup for path:', currentPathname);
      
      const response = await fetch('http://localhost:5000/api/promotional');
      const data = await response.json();
      
      console.log('📦 Promotional products response:', data);
      
      if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
        const currentPath = normalizePath(currentPathname);
        
        const filteredProducts = data.data.products.filter(product => {
          if (product.showOnPages && Array.isArray(product.showOnPages) && product.showOnPages.length > 0) {
            const normalizedShowOnPages = product.showOnPages.map(page => normalizePath(page));
            return normalizedShowOnPages.includes(currentPath);
          }
          return false;
        });
        
        console.log(`📊 Filtered products for ${currentPath}: ${filteredProducts.length} of ${data.data.products.length}`);
        
        if (filteredProducts.length === 0) {
          console.log('⚠️ No products available for current page');
          return;
        }
        
        setPromotionalProducts(filteredProducts);
        setPromotionalIntervals(data.data.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }]);
        setPromotionalMaxShows(data.data.maxShows || 3);
        
        if (currentShowCount < (data.data.maxShows || 3)) {
          if (currentShowCount === 0) {
            const firstDelay = (data.data.intervals?.[0]?.delay || 5) * 1000;
            console.log(`🎯 Will show first promotional popup in ${firstDelay/1000}s`);
            
            timerRef.current = setTimeout(() => {
              if (isMountedRef.current) {
                console.log('🎯 SHOWING PROMOTIONAL POPUP!');
                setShowPromotional(true);
              }
              timerRef.current = null;
            }, firstDelay);
          } else {
            // Schedule next popup based on current count
            const nextDelay = (data.data.intervals?.[currentShowCount]?.delay || 15) * 1000;
            console.log(`🎯 Will show next promotional popup in ${nextDelay/1000}s`);
            
            timerRef.current = setTimeout(() => {
              if (!isMountedRef.current) return;
              
              const currentPagePath = normalizePath(currentPathname);
              const hasAllowedProducts = filteredProducts.some(product => {
                if (product.showOnPages && Array.isArray(product.showOnPages) && product.showOnPages.length > 0) {
                  const normalizedShowOnPages = product.showOnPages.map(page => normalizePath(page));
                  return normalizedShowOnPages.includes(currentPagePath);
                }
                return false;
              });
              
              if (hasAllowedProducts) {
                console.log(`🎯 Showing promotional popup #${currentShowCount + 1}`);
                setShowPromotional(true);
              } else {
                console.log('❌ Promotional popup cancelled - current page not allowed');
              }
              timerRef.current = null;
            }, nextDelay);
          }
        }
      }
    } catch (error) {
      console.error('❌ Error initializing promotional popup:', error);
    }
  }, []);
  
  // Initialize newsletter popup system
  const initializeNewsletterPopup = useCallback(async (currentShowCount) => {
    if (isUserSubscribed) {
      console.log('📧 User already subscribed - not showing newsletter popup');
      return;
    }
    
    if (!popupConfig?.newsletter?.isActive) {
      console.log('📧 Newsletter popup is disabled in settings');
      return;
    }
    
    console.log('📡 Initializing newsletter popup');
    console.log(`📊 Current show count: ${currentShowCount}, Max shows: ${popupConfig.newsletter.maxShows}`);
    
    if (currentShowCount < popupConfig.newsletter.maxShows) {
      if (currentShowCount === 0) {
        const firstDelay = (popupConfig.newsletter.intervals?.[0]?.delay || 5) * 1000;
        console.log(`📧 Will show first newsletter popup in ${firstDelay/1000}s`);
        
        timerRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            console.log('📧 SHOWING NEWSLETTER POPUP!');
            setShowNewsletter(true);
          }
          timerRef.current = null;
        }, firstDelay);
      } else {
        const nextDelay = (popupConfig.newsletter.intervals?.[currentShowCount]?.delay || 15) * 1000;
        console.log(`📧 Will show next newsletter popup in ${nextDelay/1000}s`);
        
        timerRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            console.log('📧 SHOWING NEXT NEWSLETTER POPUP!');
            setShowNewsletter(true);
          }
          timerRef.current = null;
        }, nextDelay);
      }
    }
  }, [isUserSubscribed, popupConfig]);
  
  // Handle page navigation - re-initialize based on active popup
  useEffect(() => {
    if (!configLoaded || !subscriptionChecked) return;
    
    // Clear any existing timers
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    // Reset show states
    setShowPromotional(false);
    setShowNewsletter(false);
    
    // Get current show counts from localStorage
    const storedPromoCount = localStorage.getItem('promotionalShowCount');
    const promoCount = storedPromoCount ? parseInt(storedPromoCount) : 0;
    setPromotionalShowCount(promoCount);
    
    const storedNewsCount = localStorage.getItem('newsletterShowCount');
    const newsCount = storedNewsCount ? parseInt(storedNewsCount) : 0;
    setNewsletterShowCount(newsCount);
    
    console.log(`🔄 Page changed to: ${pathname}`);
    console.log(`📊 Show counts - Promotional: ${promoCount}, Newsletter: ${newsCount}`);
    console.log(`🎯 Active popup from config: ${popupConfig?.activePopup}`);
    
    if (shouldHideAll) {
      console.log('🚫 Popups hidden on this page');
      return;
    }
    
    // Initialize based on which popup is active
    if (popupConfig?.activePopup === 'promotional') {
      console.log('🎯 Initializing promotional popup (active popup)');
      initializePromotionalPopup(pathname, promoCount);
    } else if (popupConfig?.activePopup === 'newsletter') {
      console.log('🎯 Initializing newsletter popup (active popup)');
      initializeNewsletterPopup(newsCount);
    } else if (popupConfig?.activePopup === 'none') {
      console.log('🚫 All popups disabled');
    }
    
    lastPathnameRef.current = pathname;
  }, [pathname, configLoaded, subscriptionChecked, shouldHideAll, popupConfig, initializePromotionalPopup, initializeNewsletterPopup]);
  
  // Fetch popup configuration - only once
  useEffect(() => {
    let isActive = true;
    
    const fetchPopupConfig = async () => {
      if (!isActive) return;
      
      try {
        console.log('📡 Fetching popup config from API...');
        const response = await fetch('http://localhost:5000/api/popup-config');
        const data = await response.json();
        
        if (data.success && isActive) {
          console.log('✅ Active popup from API:', data.data.activePopup);
          setPopupConfig(data.data);
          setConfigLoaded(true);
        } else if (isActive) {
          console.error('❌ Failed to load popup config');
          setConfigLoaded(true);
        }
      } catch (error) {
        console.error('❌ Error fetching popup config:', error);
        if (isActive) {
          setConfigLoaded(true);
        }
      }
    };
    
    if (subscriptionChecked) {
      fetchPopupConfig();
    }
    
    return () => {
      isActive = false;
    };
  }, [subscriptionChecked]);
  
  // Log render conditions
  console.log('🟢 RENDERING - Config loaded:', configLoaded);
  console.log('🟢 RENDERING - showPromotional:', showPromotional);
  console.log('🟢 RENDERING - showNewsletter:', showNewsletter);
  console.log('🟢 RENDERING - promotionalProducts length:', promotionalProducts.length);
  console.log('🟢 RENDERING - activePopup:', popupConfig?.activePopup);
  
  if (!configLoaded || !subscriptionChecked) {
    console.log('⏳ Waiting for config or subscription to load...');
    return null;
  }
  
  if (shouldHideAll) {
    console.log('🚫 All popups hidden on this page');
    return null;
  }
  
  if (popupConfig?.activePopup === 'none') {
    console.log('🚫 Popups disabled globally');
    return null;
  }
  
  return (
    <>
    
      
      {/* Promotional Modal - Only show when promotional is active */}
      {popupConfig?.activePopup === 'promotional' && showPromotional && promotionalProducts.length > 0 && (
        <PromotionalModal 
          key={`promo-${Date.now()}`}
          products={promotionalProducts}
          onClose={handlePromotionalClose}
          currentProductIndex={currentProductIndex}
          onProductChange={setCurrentProductIndex}
        />
      )}
      
      {/* Newsletter Popup - Only show when newsletter is active */}
      {popupConfig?.activePopup === 'newsletter' && !shouldHideNewsletter && !isUserSubscribed && (
        <NewsletterPopup 
          isExternallyControlled={true} 
          onClose={handleNewsletterClose}
          forceOpen={showNewsletter}
        />
      )}
    </>
  );
}