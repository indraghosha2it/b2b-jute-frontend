// components/UnifiedPopupManager.jsx (Fixed for hard reload)
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
  
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  
  // Hide popups on admin/customer pages
  const hideModalPaths = ['/admin', '/moderator', '/customer', '/productDetails', '/login', '/register'];
  const shouldHide = hideModalPaths.some(path => pathname?.startsWith(path));
  
  // Detect hard reload by checking performance navigation type
  const isHardReload = () => {
    if (typeof window !== 'undefined' && performance) {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) {
        // type: 'reload' means user clicked refresh or hard reload
        // 'back_forward' means navigation
        // 'navigate' means first load or link click
        return nav.type === 'reload';
      }
    }
    // Fallback: check if page was loaded within last 2 seconds (likely a reload)
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
      localStorage.removeItem('lastShownPopup');
      sessionStorage.removeItem('popupSessionId');
      setPromotionalShowCount(0);
      setNewsletterShowCount(0);
    }
  }, []);
  
  console.log('🔍 UnifiedPopupManager - Current path:', pathname);
  console.log('🔍 Should hide:', shouldHide);
  
  // Fetch popup configuration
  useEffect(() => {
    const fetchPopupConfig = async () => {
      try {
        console.log('📡 Fetching popup config from API...');
        const response = await fetch('http://localhost:5000/api/popup-config');
        const data = await response.json();
        
        console.log('📦 Popup config response:', data);
        
        if (data.success) {
          console.log('✅ Active popup:', data.data.activePopup);
          setPopupConfig(data.data);
          
          // Get stored counts (these will be reset on hard reload)
          const storedPromotionalCount = localStorage.getItem('promotionalShowCount');
          const storedNewsletterCount = localStorage.getItem('newsletterShowCount');
          const promoCount = storedPromotionalCount ? parseInt(storedPromotionalCount) : 0;
          const newsCount = storedNewsletterCount ? parseInt(storedNewsletterCount) : 0;
          
          setPromotionalShowCount(promoCount);
          setNewsletterShowCount(newsCount);
          
          console.log(`📊 Promotional show count: ${promoCount}`);
          console.log(`📊 Newsletter show count: ${newsCount}`);
          
          if (data.data.activePopup === 'promotional' || data.data.activePopup === 'both') {
            fetchPromotionalProducts(promoCount);
          } else if (data.data.activePopup === 'newsletter') {
            setConfigLoaded(true);
            const maxShows = data.data.newsletter.maxShows || 3;
            
            if (newsCount < maxShows) {
              const delay = data.data.globalSettings?.delayBeforeFirstPopup || 5;
              console.log(`📧 Will show newsletter popup in ${delay}s (show #${newsCount + 1} of ${maxShows})`);
              setTimeout(() => {
                console.log('📧 Showing newsletter popup');
                setShowNewsletter(true);
              }, delay * 1000);
            } else {
              console.log('📧 Newsletter popup already shown maximum times');
            }
          } else {
            setConfigLoaded(true);
          }
        } else {
          console.error('❌ Failed to load popup config');
          setConfigLoaded(true);
        }
      } catch (error) {
        console.error('❌ Error fetching popup config:', error);
        setConfigLoaded(true);
      }
    };
    
    const fetchPromotionalProducts = async (currentCount) => {
      try {
        console.log('📡 Fetching promotional products...');
        const response = await fetch('http://localhost:5000/api/promotional');
        const data = await response.json();
        
        console.log('📦 Promotional products response:', data);
        
        if (data.success && data.data.isActive && data.data.products && data.data.products.length > 0) {
          console.log('✅ Found', data.data.products.length, 'promotional products');
          setPromotionalProducts(data.data.products);
          setPromotionalIntervals(data.data.intervals || [{ delay: 5 }, { delay: 15 }, { delay: 15 }]);
          setPromotionalMaxShows(data.data.maxShows || 3);
          
          if (currentCount < (data.data.maxShows || 3)) {
            const firstDelay = (data.data.intervals?.[0]?.delay || 5) * 1000;
            console.log(`🎯 Will show promotional popup in ${firstDelay/1000}s (show #${currentCount + 1} of ${data.data.maxShows})`);
            
            timerRef.current = setTimeout(() => {
              console.log('🎯 Showing promotional popup');
              setShowPromotional(true);
            }, firstDelay);
          } else {
            console.log('🎯 Promotional popup already shown maximum times');
          }
        } else {
          console.log('⚠️ No promotional products found or inactive');
        }
      } catch (error) {
        console.error('❌ Error fetching promotional products:', error);
      } finally {
        setConfigLoaded(true);
      }
    };
    
    fetchPopupConfig();
  }, []);
  
  // Handle promotional modal close
  const handlePromotionalClose = () => {
    setShowPromotional(false);
    
    const newCount = promotionalShowCount + 1;
    setPromotionalShowCount(newCount);
    localStorage.setItem('promotionalShowCount', newCount.toString());
    
    console.log(`🔚 Promotional popup closed. Show #${newCount} of ${promotionalMaxShows}`);
    
    // Schedule next popup if not reached max
    if (newCount < promotionalMaxShows && promotionalIntervals[newCount]) {
      const nextDelay = promotionalIntervals[newCount].delay * 1000;
      console.log(`⏰ Next promotional popup in ${nextDelay/1000}s`);
      
      if (intervalRef.current) clearTimeout(intervalRef.current);
      intervalRef.current = setTimeout(() => {
        console.log(`🎯 Showing promotional popup #${newCount + 1}`);
        setShowPromotional(true);
      }, nextDelay);
    } else {
      console.log('✅ All promotional popups shown for this session');
    }
  };
  
  // Handle newsletter modal close
  const handleNewsletterClose = () => {
    setShowNewsletter(false);
    
    const newCount = newsletterShowCount + 1;
    setNewsletterShowCount(newCount);
    localStorage.setItem('newsletterShowCount', newCount.toString());
    
    console.log(`🔚 Newsletter popup closed. Show #${newCount}`);
    
    // Schedule next newsletter popup if needed
    if (popupConfig?.newsletter && newCount < popupConfig.newsletter.maxShows) {
      const intervals = popupConfig.newsletter.intervals;
      const nextDelay = (intervals[newCount]?.delay || 15) * 1000;
      
      console.log(`⏰ Next newsletter popup in ${nextDelay/1000}s`);
      if (intervalRef.current) clearTimeout(intervalRef.current);
      intervalRef.current = setTimeout(() => {
        console.log('📧 Showing next newsletter popup');
        setShowNewsletter(true);
      }, nextDelay);
    } else {
      console.log('✅ All newsletter popups shown for this session');
    }
  };
  
  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);
  
  // Debug render conditions
  console.log('🔍 Render conditions:', {
    configLoaded,
    shouldHide,
    popupConfig: popupConfig?.activePopup,
    showPromotional,
    showNewsletter,
    promotionalProductsCount: promotionalProducts.length,
    promotionalShowCount,
    newsletterShowCount
  });
  
  if (!configLoaded) {
    console.log('⏳ Config not loaded yet');
    return null;
  }
  
  if (shouldHide) {
    console.log('🚫 Hiding popups on this page');
    return null;
  }
  
  // Don't render anything if no popup is configured to show
  if (popupConfig?.activePopup === 'none') {
    return null;
  }
  
  return (
    <>
      {/* Promotional Modal */}
      {showPromotional && promotionalProducts.length > 0 && (
        <PromotionalModal 
          products={promotionalProducts}
          onClose={handlePromotionalClose}
          currentProductIndex={currentProductIndex}
          onProductChange={setCurrentProductIndex}
        />
      )}
      
      {/* Newsletter Popup - Always render, parent controls visibility */}
      <NewsletterPopup 
        isExternallyControlled={true} 
        onClose={handleNewsletterClose}
        forceOpen={showNewsletter}
      />
    </>
  );
}