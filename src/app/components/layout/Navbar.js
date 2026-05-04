// 'use client';

// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   ChevronDown, 
//   LogOut, 
//   Settings, 
//   User, 
//   LayoutDashboard, 
//   Users,
//   Search,
//   X,
//   Package,
//   FileText,
//   Tag,
//   Loader2,
//   UserPlus
// } from 'lucide-react';
// import { toast } from 'sonner';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [user, setUser] = useState(null);
//   const [cartCount, setCartCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [profileImageError, setProfileImageError] = useState(false);
//   // Add auth loading state
//   const [authLoading, setAuthLoading] = useState(true);
//   const searchRef = useRef(null);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Close search results when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Function to check and update user state
//   const checkUserState = () => {
//     if (typeof window !== 'undefined') {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//           // Reset profile image error when user changes
//           setProfileImageError(false);
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//       // Set auth loading to false after checking
//       setAuthLoading(false);
//     }
//   };

//   // Fetch cart count
//   const fetchCartCount = async () => {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       setCartCount(0);
//       return;
//     }
    
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 5000);
      
//       const response = await fetch('http://localhost:5000/api/inquiry-cart', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         signal: controller.signal,
//         mode: 'cors',
//         cache: 'no-cache'
//       }).finally(() => clearTimeout(timeoutId));
      
//       if (response.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setUser(null);
//         setCartCount(0);
//         window.dispatchEvent(new Event('auth-change'));
//         return;
//       }
      
//       if (!response.ok) {
//         setCartCount(0);
//         return;
//       }
      
//       const data = await response.json();
      
//       if (data.success) {
//         const itemCount = data.data?.items?.length || 0;
//         setCartCount(itemCount);
//       } else {
//         setCartCount(0);
//       }
//     } catch (error) {
//       console.warn('Cart fetch failed:', error.message);
//       setCartCount(0);
//     }
//   };

//   // Search function
//   const performSearch = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     setSearchLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setSearchResults(data.data);
//         setShowResults(true);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery) {
//         performSearch(searchQuery);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//     }
//   };

//   const handleResultClick = (result) => {
//     let url = '';
//     switch (result.type) {
//       case 'product':
//         url = `/productDetails?id=${result._id}`;
//         break;
//       case 'blog':
//         url = `/blog/${result._id}`;
//         break;
//       case 'category':
//         url = `/products?category=${result._id}`;
//         break;
//       default:
//         url = `/search?q=${encodeURIComponent(result.title || result.name)}`;
//     }
//     router.push(url);
//     setSearchOpen(false);
//     setSearchQuery('');
//     setShowResults(false);
//   };

//   const handleViewAllResults = () => {
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//     }
//   };

//   // Test API connection on mount
//   useEffect(() => {
//     const testConnection = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/health');
//         const data = await response.json();
//         console.log('✅ Backend connection test:', data);
//       } catch (error) {
//         console.error('❌ Backend connection failed:', error);
//       }
//     };
    
//     testConnection();
//   }, []);

//   // Initial check
//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();

//     const handleStorageChange = (e) => {
//       if (e.key === 'user' || e.key === 'token') {
//         checkUserState();
//         fetchCartCount();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     const handleAuthChange = () => {
//       checkUserState();
//       fetchCartCount();
//     };

//     window.addEventListener('auth-change', handleAuthChange);

//     const handleCartUpdate = () => {
//       fetchCartCount();
//     };

//     window.addEventListener('cart-update', handleCartUpdate);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('auth-change', handleAuthChange);
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, []);

//   // Listen for route changes - but don't reset auth state
//   useEffect(() => {
//     // Only fetch cart count, don't reset auth state
//     fetchCartCount();
//   }, [pathname]);

//   const navItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'Blog', href: '/blog' },
//   ];

//   const isActive = (path) => {
//     if (path === '/') {
//       return pathname === '/';
//     }
    
//     // Check if current path starts with the nav path
//     // This makes /blog active for /blog/123, /blog/456, etc.
//     // and /products active for /products/anything
//     return pathname.startsWith(path);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('rememberedEmail');
//     setUser(null);
//     setCartCount(0);
//     setUserMenuOpen(false);
//     setProfileImageError(false);
    
//     window.dispatchEvent(new Event('auth-change'));
    
//     toast.success('Logged out successfully');
//     router.push('/');
//   };

//   const getDashboardLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/dashboard';
//       case 'moderator':
//         return '/moderator/dashboard';
//       case 'customer':
//         return '/customer/dashboard';
//       default:
//         return '/';
//     }
//   };

//   const getSettingsLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/settings';
//       case 'moderator':
//         return '/moderator/settings';
//       case 'customer':
//         return '/customer/settings';
//       default:
//         return '/';
//     }
//   };

//   const getRoleDisplay = () => {
//     if (!user) return '';
//     switch (user.role) {
//       case 'admin':
//         return 'Administrator';
//       case 'moderator':
//         return 'Moderator';
//       case 'customer':
//         return 'Customer';
//       default:
//         return user.role;
//     }
//   };

//   const getDisplayName = () => {
//     if (!user) return '';
//     return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'User';
//   };

//   const getInitials = () => {
//     if (!user) return 'U';
//     const name = user.companyName || user.contactPerson || user.email;
//     return name?.charAt(0).toUpperCase() || 'U';
//   };

//   // Get profile picture URL from user object
//   const getProfilePicture = () => {
//     if (!user) return null;
//     return user.profilePicture || user.photoURL || null;
//   };

//   const getResultIcon = (type) => {
//     switch (type) {
//       case 'product':
//         return <Package className="w-4 h-4 text-[#3bc24f]" />;
//       case 'blog':
//         return <FileText className="w-4 h-4 text-[#3bc24f]" />;
//       case 'category':
//         return <Tag className="w-4 h-4 text-[#3bc24f]" />;
//       default:
//         return <Search className="w-4 h-4 text-[#3bc24f]" />;
//     }
//   };

//   // Handle image error
//   const handleImageError = () => {
//     setProfileImageError(true);
//   };

//   // Show nothing while auth is loading to prevent flashing
//   if (authLoading) {
//     return (
//       <div className="navbar fixed top-0 z-50 w-full shadow-md" style={{ backgroundColor: '#6B4F3A' }}>
//         <div className="navbar-start">
//           <Link href="/" className="flex items-center gap-2">
//             <div className="relative w-36 h-[54px] overflow-hidden flex items-center">
//               <img 
//                 src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
//                 alt="Jute Craftify Logo"
//                 className="w-full h-full object-contain scale-125"
//               />
//             </div>
//           </Link>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1" style={{ color: '#F5E6D3' }}>
//             {navItems.map((item) => (
//               <li key={item.name}>
//                 <Link 
//                   href={item.href}
//                   style={{
//                     color: '#F5E6D3',
//                   }}
//                   className="hover:text-[#3bc24f] transition-colors duration-200"
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="navbar-end gap-2">
//           {/* Placeholder for right side to maintain layout */}
//           <div className="w-8 h-8"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="navbar fixed top-0 z-50 w-full shadow-md" style={{ backgroundColor: '#6B4F3A' }}>
//       {/* Mobile Menu */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <label tabIndex={0} className="btn btn-ghost lg:hidden" style={{ color: '#F5E6D3' }}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </label>
//           <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-52" style={{ backgroundColor: '#6B4F3A', color: '#F5E6D3', border: '1px solid #8B6B4F' }}>
//             {navItems.map((item) => (
//               <li key={item.name} className="w-full">
//                 <Link 
//                   href={item.href}
//                   style={{
//                     color: '#F5E6D3',
//                     backgroundColor: isActive(item.href) ? '#3bc24f' : 'transparent',
//                   }}
//                   className={`hover:bg-[#3bc24f] hover:text-white block w-full rounded-md ${isActive(item.href) ? 'text-white pointer-events-none' : ''}`}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
            
//             {/* Mobile Search */}
//             <li className="border-t border-[#8B6B4F] mt-2 pt-2 w-full">
//               <form onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.target);
//                 const query = formData.get('mobileSearch');
//                 if (query) {
//                   router.push(`/search?q=${encodeURIComponent(query)}`);
//                   setIsMenuOpen(false);
//                 }
//               }} className="px-2 py-1">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     name="mobileSearch"
//                     placeholder="Search products..."
//                     className="w-full px-3 py-1.5 text-sm bg-[#F5E6D3] text-[#6B4F3A] rounded-lg border border-[#8B6B4F] focus:outline-none focus:border-[#3bc24f] focus:ring-1 focus:ring-[#3bc24f] placeholder:text-[#8B6B4F]"
//                   />
//                   <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
//                     <Search className="w-4 h-4 text-[#6B4F3A]" />
//                   </button>
//                 </div>
//               </form>
//             </li>
            
//             {/* Mobile menu user section */}
//             {user ? (
//               <>
//                 <li className="border-t border-[#8B6B4F] mt-2 pt-2 w-full">
//                   <div className="flex flex-col px-2 py-1 text-sm text-[#F5E6D3] w-full items-start">
//                     <div className="flex items-center gap-2 w-full">
//                       {/* Profile image in mobile menu */}
//                       {getProfilePicture() && !profileImageError ? (
//                         <img 
//                           src={getProfilePicture()} 
//                           alt={getDisplayName()}
//                           className="w-6 h-6 rounded-full object-cover border border-[#3bc24f]"
//                           onError={handleImageError}
//                         />
//                       ) : (
//                         <div className="w-6 h-6 rounded-full bg-[#3bc24f] flex items-center justify-center text-white text-xs font-semibold">
//                           {getInitials()}
//                         </div>
//                       )}
//                       <div className="font-semibold truncate text-left">{getDisplayName()}</div>
//                     </div>
//                     <div className="text-xs opacity-80 truncate text-left w-full mt-1">{user.email}</div>
//                     <div className="text-xs mt-1.5 text-left w-full">
//                       <span className="inline-block bg-[#3bc24f] text-white px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
//                         {getRoleDisplay()}
//                       </span>
//                     </div>
//                   </div>
//                 </li>
//                 <li className="w-full">
//                   <Link 
//                     href={getDashboardLink()} 
//                     className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-2 justify-start rounded-md"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
//                     <span>Dashboard</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <Link 
//                     href={getSettingsLink()} 
//                     className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-2 justify-start rounded-md"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Settings className="h-4 w-4 flex-shrink-0" />
//                     <span>Settings</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <button
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                       logout();
//                     }}
//                     className="flex items-center gap-2 text-red-300 hover:bg-red-500 hover:text-white w-full text-left px-2 py-2 justify-start rounded-md"
//                   >
//                     <LogOut className="h-4 w-4 flex-shrink-0" />
//                     <span>Logout</span>
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="border-t border-[#8B6B4F] mt-2 pt-2 w-full">
//                   <Link href="/login" className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-2 justify-start rounded-md">
//                     <User className="h-4 w-4 flex-shrink-0" />
//                     <span>Sign In</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <Link href="/register" className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-2 justify-start rounded-md">
//                     <Users className="h-4 w-4 flex-shrink-0" />
//                     <span>Register</span>
//                   </Link>
//                 </li>
//               </>
//             )}
            
//             <li className="border-t border-[#8B6B4F] mt-2 pt-2 w-full">
//               <Link href="/inquiry-cart" className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-2 justify-start rounded-md">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Inquiry Cart
//                 {cartCount > 0 && (
//                   <span className="badge badge-sm ml-2" style={{ backgroundColor: '#3bc24f', color: 'white', border: 'none' }}>
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </li>
//           </ul>
//         </div>
        
//         {/* Logo/Brand */}
//         <Link 
//           href="/" 
//           className="flex items-center gap-2"
//         >
//           <div className="relative w-36 h-[54px] overflow-hidden flex items-center">
//             <img 
//               src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
//               alt="Jute Craftify Logo"
//               className="w-full h-full object-contain scale-125"
//             />
//           </div>
//         </Link>
//       </div>

//       {/* Desktop Menu - Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           {navItems.map((item) => (
//             <li key={item.name}>
//               <Link 
//                 href={item.href}
//                 style={{
//                   color: isActive(item.href) ? '#3bc24f' : '#F5E6D3',
//                   fontWeight: isActive(item.href) ? '600' : '500',
//                   borderBottom: isActive(item.href) ? '2px solid #3bc24f' : 'none',
//                 }}
//                 className={`hover:text-[#3bc24f] transition-all duration-200 pb-1`}
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right side - Actions */}
//       <div className="navbar-end gap-2">
//         {/* Desktop Search */}
//         <div className="hidden lg:block relative" ref={searchRef}>
//           {searchOpen ? (
//             <form 
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 if (searchQuery.trim()) {
//                   router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//                   setSearchOpen(false);
//                   setSearchQuery('');
//                   setShowResults(false);
//                 }
//               }} 
//               className="relative flex items-center"
//             >
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search products..."
//                   className="w-80 px-4 py-2 pr-10 text-sm bg-[#F5E6D3] text-[#6B4F3A] rounded-lg border border-[#8B6B4F] focus:outline-none focus:border-[#3bc24f] focus:ring-1 focus:ring-[#3bc24f] placeholder:text-[#8B6B4F]"
//                   autoFocus
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {
//                       e.preventDefault();
//                       if (searchQuery.trim()) {
//                         router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//                         setSearchOpen(false);
//                         setSearchQuery('');
//                         setShowResults(false);
//                       }
//                     }
//                   }}
//                 />
//                 {searchLoading ? (
//                   <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3bc24f] animate-spin" />
//                 ) : (
//                   <button 
//                     type="submit" 
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     <Search className="w-4 h-4 text-[#8B6B4F] hover:text-[#3bc24f]" />
//                   </button>
//                 )}
//               </div>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearchOpen(false);
//                   setSearchQuery('');
//                   setShowResults(false);
//                 }}
//                 className="ml-2 p-1.5 hover:bg-[#8B6B4F] rounded-full transition-colors"
//                 title="Close search"
//               >
//                 <X className="w-4 h-4 text-[#F5E6D3]" />
//               </button>

//               {/* Search Results Dropdown */}
//               {showResults && searchResults.length > 0 && (
//                 <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-[#E8D5C0] max-h-96 overflow-y-auto z-50 w-full">
//                   {searchResults.map((result, index) => (
//                     <button
//                       key={`${result.type}-${result._id}`}
//                       onClick={() => handleResultClick(result)}
//                       className="w-full px-4 py-3 text-left hover:bg-[#F5E6D3] border-b border-[#E8D5C0] last:border-0 flex items-start gap-3 transition-colors"
//                     >
//                       <div className="mt-1">{getResultIcon(result.type)}</div>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-[#6B4F3A]">
//                           {result.title || result.name}
//                         </p>
//                         <p className="text-xs text-[#8B6B4F] mt-0.5 capitalize">
//                           {result.type}
//                         </p>
//                       </div>
//                     </button>
//                   ))}
//                   <button
//                     onClick={handleViewAllResults}
//                     className="w-full px-4 py-3 text-center text-sm text-[#3bc24f] hover:bg-[#F5E6D3] font-medium border-t border-[#E8D5C0] transition-colors"
//                   >
//                     View all results for "{searchQuery}"
//                   </button>
//                 </div>
//               )}
//             </form>
//           ) : (
//             <button
//               onClick={() => setSearchOpen(true)}
//               className="p-2 hover:bg-[#8B6B4F] rounded-lg transition-colors"
//               title="Open search"
//             >
//               <Search className="w-5 h-5 text-[#F5E6D3] hover:text-[#3bc24f]" />
//             </button>
//           )}
//         </div>

//         {/* Inquiry Cart - Desktop */}
//         <Link 
//           href="/inquiry-cart" 
//           className="btn btn-ghost btn-circle hidden lg:flex relative"
//           style={{ color: '#F5E6D3' }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.backgroundColor = '#3bc24f';
//             e.currentTarget.style.color = 'white';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.backgroundColor = 'transparent';
//             e.currentTarget.style.color = '#F5E6D3';
//           }}
//         >
//           <div className="indicator">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             {cartCount > 0 && (
//               <span className="badge badge-sm indicator-item" style={{ backgroundColor: '#3bc24f', color: 'white', border: 'none' }}>
//                 {cartCount}
//               </span>
//             )}
//           </div>
//         </Link>

//         {/* User Menu or Auth Buttons */}
//         {user ? (
//           <div className="relative">
//             <button
//               onClick={() => setUserMenuOpen(!userMenuOpen)}
//               className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#8B6B4F] transition-colors"
//               style={{ color: '#F5E6D3' }}
//             >
//               {/* Profile Image - Show if available */}
//               {getProfilePicture() && !profileImageError ? (
//                 <img 
//                   src={getProfilePicture()} 
//                   alt={getDisplayName()}
//                   className="w-8 h-8 rounded-full object-cover border-2 border-[#3bc24f]"
//                   onError={handleImageError}
//                 />
//               ) : (
//                 <div className="w-8 h-8 rounded-full bg-[#3bc24f] flex items-center justify-center text-white font-semibold">
//                   {getInitials()}
//                 </div>
//               )}
//               <span className="hidden lg:inline max-w-[100px] truncate font-medium">
//                 {getDisplayName()}
//               </span>
//               <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {/* Dropdown Menu */}
//             {userMenuOpen && (
//               <>
//                 <div 
//                   className="fixed inset-0 z-40"
//                   onClick={() => setUserMenuOpen(false)}
//                 />
//                 <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E8D5C0] py-2 z-50">
//                   {/* User Info */}
//                   <div className="px-4 py-3 border-b border-[#E8D5C0]">
//                     <div className="flex items-center gap-3">
//                       {/* Profile image in dropdown */}
//                       {getProfilePicture() && !profileImageError ? (
//                         <img 
//                           src={getProfilePicture()} 
//                           alt={getDisplayName()}
//                           className="w-10 h-10 rounded-full object-cover border-2 border-[#3bc24f]"
//                           onError={handleImageError}
//                         />
//                       ) : (
//                         <div className="w-10 h-10 rounded-full bg-[#3bc24f] flex items-center justify-center text-white font-semibold text-lg">
//                           {getInitials()}
//                         </div>
//                       )}
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-semibold text-[#6B4F3A] truncate">{getDisplayName()}</p>
//                         <p className="text-xs text-[#8B6B4F] truncate mt-0.5">{user.email}</p>
//                       </div>
//                     </div>
//                     <div className="mt-2">
//                       <span 
//                         className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#3bc24f] text-white"
//                       >
//                         {getRoleDisplay()}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Menu Items */}
//                   <Link
//                     href={getDashboardLink()}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
//                     onClick={() => setUserMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="w-4 h-4 text-[#3bc24f]" />
//                     <span>Dashboard</span>
//                   </Link>

//                   <Link
//                     href={getSettingsLink()}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
//                     onClick={() => setUserMenuOpen(false)}
//                   >
//                     <Settings className="w-4 h-4 text-[#3bc24f]" />
//                     <span>Settings</span>
//                   </Link>

//                   {/* Logout */}
//                   <button
//                     onClick={() => {
//                       setUserMenuOpen(false);
//                       logout();
//                     }}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left border-t border-[#E8D5C0] mt-1 pt-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           <>
//             {/* Sign In Button */}
//             <Link 
//               href="/login" 
//               className="btn btn-outline btn-sm hidden lg:flex"
//               style={{
//                 color: '#F5E6D3',
//                 borderColor: '#F5E6D3',
//                 backgroundColor: 'transparent'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#3bc24f';
//                 e.currentTarget.style.borderColor = '#3bc24f';
//                 e.currentTarget.style.color = 'white';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = 'transparent';
//                 e.currentTarget.style.borderColor = '#F5E6D3';
//                 e.currentTarget.style.color = '#F5E6D3';
//               }}
//             >
//               <User className="h-4 w-4 mr-2" />
//               Sign In
//             </Link>

//             {/* Register Button */}
//             <Link 
//               href="/register" 
//               className="btn btn-sm hidden lg:flex"
//               style={{
//                 backgroundColor: '#3bc24f',
//                 color: 'white',
//                 borderColor: '#3bc24f'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#2da63f';
//                 e.currentTarget.style.borderColor = '#2da63f';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = '#3bc24f';
//                 e.currentTarget.style.borderColor = '#3bc24f';
//               }}
//             >
//               <UserPlus className="h-4 w-4 mr-2" />
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }










// 'use client';

// import Link from 'next/link';
// import { useState, useEffect, useRef } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   ChevronDown, 
//   LogOut, 
//   Settings, 
//   User, 
//   LayoutDashboard, 
//   Users,
//   Search,
//   X,
//   Package,
//   FileText,
//   Tag,
//   Loader2,
//   UserPlus
// } from 'lucide-react';
// import { toast } from 'sonner';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [showResults, setShowResults] = useState(false);
  
//   // Mobile search states
//   const [mobileSearchQuery, setMobileSearchQuery] = useState('');
//   const [mobileSearchResults, setMobileSearchResults] = useState([]);
//   const [mobileSearchLoading, setMobileSearchLoading] = useState(false);
//   const [showMobileResults, setShowMobileResults] = useState(false);
  
//   const [user, setUser] = useState(null);
//   const [cartCount, setCartCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [profileImageError, setProfileImageError] = useState(false);
//   const [authLoading, setAuthLoading] = useState(true);
  
//   const searchRef = useRef(null);
//   const mobileSearchRef = useRef(null);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Close search results when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Close mobile search results when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
//         setShowMobileResults(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Function to check and update user state
//   const checkUserState = () => {
//     if (typeof window !== 'undefined') {
//       const userData = localStorage.getItem('user');
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           setUser(parsedUser);
//           setProfileImageError(false);
//         } catch (error) {
//           console.error('Error parsing user data:', error);
//           setUser(null);
//         }
//       } else {
//         setUser(null);
//       }
//       setAuthLoading(false);
//     }
//   };

//   // Fetch cart count
//   const fetchCartCount = async () => {
//     const token = localStorage.getItem('token');
    
//     if (!token) {
//       setCartCount(0);
//       return;
//     }
    
//     try {
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 5000);
      
//       const response = await fetch('http://localhost:5000/api/inquiry-cart', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         signal: controller.signal,
//         mode: 'cors',
//         cache: 'no-cache'
//       }).finally(() => clearTimeout(timeoutId));
      
//       if (response.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setUser(null);
//         setCartCount(0);
//         window.dispatchEvent(new Event('auth-change'));
//         return;
//       }
      
//       if (!response.ok) {
//         setCartCount(0);
//         return;
//       }
      
//       const data = await response.json();
      
//       if (data.success) {
//         const itemCount = data.data?.items?.length || 0;
//         setCartCount(itemCount);
//       } else {
//         setCartCount(0);
//       }
//     } catch (error) {
//       console.warn('Cart fetch failed:', error.message);
//       setCartCount(0);
//     }
//   };

//   // Desktop Search function
//   const performSearch = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     setSearchLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setSearchResults(data.data);
//         setShowResults(true);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   // Mobile Search function
//   const performMobileSearch = async (query) => {
//     if (!query.trim()) {
//       setMobileSearchResults([]);
//       return;
//     }

//     setMobileSearchLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setMobileSearchResults(data.data);
//         setShowMobileResults(true);
//       }
//     } catch (error) {
//       console.error('Mobile search error:', error);
//     } finally {
//       setMobileSearchLoading(false);
//     }
//   };

//   // Debounce desktop search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchQuery) {
//         performSearch(searchQuery);
//       } else {
//         setSearchResults([]);
//         setShowResults(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   // Debounce mobile search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (mobileSearchQuery) {
//         performMobileSearch(mobileSearchQuery);
//       } else {
//         setMobileSearchResults([]);
//         setShowMobileResults(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [mobileSearchQuery]);

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//     }
//   };

//   const handleMobileSearchSubmit = (e) => {
//     e.preventDefault();
//     if (mobileSearchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(mobileSearchQuery)}`);
//       setSearchOpen(false);
//       setMobileSearchQuery('');
//       setShowMobileResults(false);
//     }
//   };

//   const handleResultClick = (result) => {
//     let url = '';
//     switch (result.type) {
//       case 'product':
//         url = `/productDetails?id=${result._id}`;
//         break;
//       case 'blog':
//         url = `/blog/${result._id}`;
//         break;
//       case 'category':
//         url = `/products?category=${result._id}`;
//         break;
//       default:
//         url = `/search?q=${encodeURIComponent(result.title || result.name)}`;
//     }
//     router.push(url);
//     setSearchOpen(false);
//     setSearchQuery('');
//     setShowResults(false);
//   };

//   const handleMobileResultClick = (result) => {
//     let url = '';
//     switch (result.type) {
//       case 'product':
//         url = `/productDetails?id=${result._id}`;
//         break;
//       case 'blog':
//         url = `/blog/${result._id}`;
//         break;
//       case 'category':
//         url = `/products?category=${result._id}`;
//         break;
//       default:
//         url = `/search?q=${encodeURIComponent(result.title || result.name)}`;
//     }
//     router.push(url);
//     setSearchOpen(false);
//     setMobileSearchQuery('');
//     setShowMobileResults(false);
//   };

//   const handleViewAllResults = () => {
//     if (searchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
//       setSearchOpen(false);
//       setSearchQuery('');
//       setShowResults(false);
//     }
//   };

//   const handleMobileViewAllResults = () => {
//     if (mobileSearchQuery.trim()) {
//       router.push(`/search?q=${encodeURIComponent(mobileSearchQuery)}`);
//       setSearchOpen(false);
//       setMobileSearchQuery('');
//       setShowMobileResults(false);
//     }
//   };

//   // Test API connection on mount
//   useEffect(() => {
//     const testConnection = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/health');
//         const data = await response.json();
//         console.log('✅ Backend connection test:', data);
//       } catch (error) {
//         console.error('❌ Backend connection failed:', error);
//       }
//     };
    
//     testConnection();
//   }, []);

//   // Initial check
//   useEffect(() => {
//     checkUserState();
//     fetchCartCount();

//     const handleStorageChange = (e) => {
//       if (e.key === 'user' || e.key === 'token') {
//         checkUserState();
//         fetchCartCount();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     const handleAuthChange = () => {
//       checkUserState();
//       fetchCartCount();
//     };

//     window.addEventListener('auth-change', handleAuthChange);

//     const handleCartUpdate = () => {
//       fetchCartCount();
//     };

//     window.addEventListener('cart-update', handleCartUpdate);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('auth-change', handleAuthChange);
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, []);

//   // Listen for route changes
//   useEffect(() => {
//     fetchCartCount();
//   }, [pathname]);

//   const navItems = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'About', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'Blog', href: '/blog' },
//   ];

//   const isActive = (path) => {
//     if (path === '/') {
//       return pathname === '/';
//     }
//     return pathname.startsWith(path);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('rememberedEmail');
//     setUser(null);
//     setCartCount(0);
//     setUserMenuOpen(false);
//     setProfileImageError(false);
    
//     window.dispatchEvent(new Event('auth-change'));
    
//     toast.success('Logged out successfully');
//     router.push('/');
//   };

//   const getDashboardLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/dashboard';
//       case 'moderator':
//         return '/moderator/dashboard';
//       case 'customer':
//         return '/customer/dashboard';
//       default:
//         return '/';
//     }
//   };

//   const getSettingsLink = () => {
//     if (!user) return '/';
//     switch (user.role) {
//       case 'admin':
//         return '/admin/settings';
//       case 'moderator':
//         return '/moderator/settings';
//       case 'customer':
//         return '/customer/settings';
//       default:
//         return '/';
//     }
//   };

//   const getRoleDisplay = () => {
//     if (!user) return '';
//     switch (user.role) {
//       case 'admin':
//         return 'Administrator';
//       case 'moderator':
//         return 'Moderator';
//       case 'customer':
//         return 'Customer';
//       default:
//         return user.role;
//     }
//   };

//   const getDisplayName = () => {
//     if (!user) return '';
//     return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'User';
//   };

//   const getInitials = () => {
//     if (!user) return 'U';
//     const name = user.companyName || user.contactPerson || user.email;
//     return name?.charAt(0).toUpperCase() || 'U';
//   };

//   const getProfilePicture = () => {
//     if (!user) return null;
//     return user.profilePicture || user.photoURL || null;
//   };

//   const getResultIcon = (type) => {
//     switch (type) {
//       case 'product':
//         return <Package className="w-4 h-4 text-[#3bc24f]" />;
//       case 'blog':
//         return <FileText className="w-4 h-4 text-[#3bc24f]" />;
//       case 'category':
//         return <Tag className="w-4 h-4 text-[#3bc24f]" />;
//       default:
//         return <Search className="w-4 h-4 text-[#3bc24f]" />;
//     }
//   };

//   const handleImageError = () => {
//     setProfileImageError(true);
//   };

//   if (authLoading) {
//     return (
//       <div className="navbar fixed top-0 z-50 w-full shadow-md" style={{ backgroundColor: '#6B4F3A' }}>
//         <div className="navbar-start">
//           <Link href="/" className="flex items-center">
//            <div className="relative w-36 h-[54px] overflow-hidden flex items-center">
//               <img 
//                 src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
//                 alt="Jute Craftify Logo"
//                 className="w-full h-full object-contain"
//               />
//             </div>
//           </Link>
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1" style={{ color: '#F5E6D3' }}>
//             {navItems.map((item) => (
//               <li key={item.name}>
//                 <Link 
//                   href={item.href}
//                   style={{ color: '#F5E6D3' }}
//                   className="hover:text-[#3bc24f] transition-colors duration-200"
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="navbar-end gap-1">
//           <div className="w-8 h-8"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="navbar fixed top-0 z-50 w-full shadow-md" style={{ backgroundColor: '#6B4F3A' }}>
//       {/* Left side - Menu button and Logo */}
//       <div className="navbar-start gap-0">
//         <div className="dropdown">
//           <label tabIndex={0} className="btn btn-ghost lg:hidden p-1.5" style={{ color: '#F5E6D3' }}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </label>
//           <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-56" style={{ backgroundColor: '#6B4F3A', color: '#F5E6D3', border: '1px solid #8B6B4F' }}>
//             {navItems.map((item) => (
//               <li key={item.name} className="w-full">
//                 <Link 
//                   href={item.href}
//                   style={{
//                     color: '#F5E6D3',
//                     backgroundColor: isActive(item.href) ? '#3bc24f' : 'transparent',
//                   }}
//                   className={`hover:bg-[#3bc24f] hover:text-white block w-full rounded-md text-sm py-1.5 ${isActive(item.href) ? 'text-white pointer-events-none' : ''}`}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
            
//             {/* Mobile menu user section */}
//             {user ? (
//               <>
//                 <li className="border-t border-[#8B6B4F] mt-2 pt-2 w-full">
//                   <div className="flex flex-col px-2 py-1 text-sm text-[#F5E6D3] w-full items-start">
//                     <div className="flex items-center gap-2 w-full">
//                       {getProfilePicture() && !profileImageError ? (
//                         <img 
//                           src={getProfilePicture()} 
//                           alt={getDisplayName()}
//                           className="w-5 h-5 rounded-full object-cover border border-[#3bc24f]"
//                           onError={handleImageError}
//                         />
//                       ) : (
//                         <div className="w-5 h-5 rounded-full bg-[#3bc24f] flex items-center justify-center text-white text-[10px] font-semibold">
//                           {getInitials()}
//                         </div>
//                       )}
//                       <div className="font-semibold truncate text-left text-xs">{getDisplayName()}</div>
//                     </div>
//                     <div className="text-[10px] opacity-80 truncate text-left w-full mt-0.5">{user.email}</div>
//                     <div className="text-[9px] mt-1 text-left w-full">
//                       <span className="inline-block bg-[#3bc24f] text-white px-1.5 py-0.5 rounded-full text-[9px] whitespace-nowrap">
//                         {getRoleDisplay()}
//                       </span>
//                     </div>
//                   </div>
//                 </li>
//                 <li className="w-full">
//                   <Link 
//                     href={getDashboardLink()} 
//                     className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-1.5 justify-start rounded-md text-sm"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="h-3.5 w-3.5 flex-shrink-0" />
//                     <span>Dashboard</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <Link 
//                     href={getSettingsLink()} 
//                     className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-1.5 justify-start rounded-md text-sm"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Settings className="h-3.5 w-3.5 flex-shrink-0" />
//                     <span>Settings</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <button
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                       logout();
//                     }}
//                     className="flex items-center gap-2 text-red-300 hover:bg-red-500 hover:text-white w-full text-left px-2 py-1.5 justify-start rounded-md text-sm"
//                   >
//                     <LogOut className="h-3.5 w-3.5 flex-shrink-0" />
//                     <span>Logout</span>
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="border-t border-[#8B6B4F] mt-2 pt-2 w-full">
//                   <Link href="/login" className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-1.5 justify-start rounded-md text-sm">
//                     <User className="h-3.5 w-3.5 flex-shrink-0" />
//                     <span>Sign In</span>
//                   </Link>
//                 </li>
//                 <li className="w-full">
//                   <Link href="/register" className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-1.5 justify-start rounded-md text-sm">
//                     <Users className="h-3.5 w-3.5 flex-shrink-0" />
//                     <span>Register</span>
//                   </Link>
//                 </li>
//               </>
//             )}
            
//             <li className="border-t border-[#8B6B4F] mt-2 pt-2 w-full">
//               <Link href="/inquiry-cart" className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-1.5 justify-start rounded-md text-sm">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//                 Inquiry Cart
//                 {cartCount > 0 && (
//                   <span className="badge badge-sm ml-1" style={{ backgroundColor: '#3bc24f', color: 'white', border: 'none', fontSize: '9px', padding: '0 4px' }}>
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             </li>
//           </ul>
//         </div>
        
//         {/* Logo */}
//         <Link 
//           href="/" 
//           className="flex items-center -ml-1"
//         >
//           <div className="relative w-36 h-[54px] overflow-hidden flex items-center">
//             <img 
//               src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
//               alt="Jute Craftify Logo"
//               className="w-full h-full object-contain"
//             />
//           </div>
//         </Link>
//       </div>

//       {/* Desktop Menu - Center */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           {navItems.map((item) => (
//             <li key={item.name}>
//               <Link 
//                 href={item.href}
//                 style={{
//                   color: isActive(item.href) ? '#3bc24f' : '#F5E6D3',
//                   fontWeight: isActive(item.href) ? '600' : '500',
//                   borderBottom: isActive(item.href) ? '2px solid #3bc24f' : 'none',
//                 }}
//                 className={`hover:text-[#3bc24f] transition-all duration-200 pb-1 text-sm`}
//               >
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Right side - Actions */}
//       <div className="navbar-end gap-1 lg:gap-2">
//         {/* Mobile Search Button */}
//         <button
//           onClick={() => setSearchOpen(!searchOpen)}
//           className="lg:hidden p-1.5 hover:bg-[#8B6B4F] rounded-lg transition-colors"
//           title="Search"
//         >
//           <Search className="w-4 h-4 text-[#F5E6D3]" />
//         </button>

//         {/* Mobile Search Input with Results */}
//         {searchOpen && (
//           <div className="absolute top-14 left-0 right-0 px-3 py-2 bg-[#6B4F3A] border-t border-[#8B6B4F] z-50 lg:hidden" ref={mobileSearchRef}>
//             <form onSubmit={handleMobileSearchSubmit} className="relative">
//               <input
//                 type="text"
//                 value={mobileSearchQuery}
//                 onChange={(e) => setMobileSearchQuery(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full px-3 py-2 pr-8 text-sm bg-[#F5E6D3] text-[#6B4F3A] rounded-lg border border-[#8B6B4F] focus:outline-none focus:border-[#3bc24f] focus:ring-1 focus:ring-[#3bc24f] placeholder:text-[#8B6B4F]"
//                 autoFocus
//               />
//               {mobileSearchLoading ? (
//                 <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3bc24f] animate-spin" />
//               ) : (
//                 <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
//                   <Search className="w-4 h-4 text-[#8B6B4F]" />
//                 </button>
//               )}
//             </form>

//             {/* Mobile Search Results */}
//             {showMobileResults && mobileSearchResults.length > 0 && (
//               <div className="mt-2 bg-white rounded-xl shadow-xl border border-[#E8D5C0] max-h-80 overflow-y-auto">
//                 {mobileSearchResults.map((result, index) => (
//                   <button
//                     key={`mobile-${result.type}-${result._id}`}
//                     onClick={() => handleMobileResultClick(result)}
//                     className="w-full px-3 py-2 text-left hover:bg-[#F5E6D3] border-b border-[#E8D5C0] last:border-0 flex items-center gap-2 transition-colors"
//                   >
//                     {result.type === 'product' && result.image && (
//                       <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                         <img 
//                           src={result.image} 
//                           alt={result.title || result.name}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             e.target.src = 'https://via.placeholder.com/40?text=No+Image';
//                           }}
//                         />
//                       </div>
//                     )}
//                     {result.type !== 'product' && (
//                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                         {getResultIcon(result.type)}
//                       </div>
//                     )}
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-[#6B4F3A] truncate">
//                         {result.title || result.name}
//                       </p>
//                       <p className="text-xs text-[#8B6B4F] capitalize">
//                         {result.type}
//                       </p>
//                     </div>
//                   </button>
//                 ))}
//                 <button
//                   onClick={handleMobileViewAllResults}
//                   className="w-full px-3 py-2 text-center text-sm text-[#3bc24f] hover:bg-[#F5E6D3] font-medium border-t border-[#E8D5C0] transition-colors"
//                 >
//                   View all results for "{mobileSearchQuery}"
//                 </button>
//               </div>
//             )}
            
//             {showMobileResults && mobileSearchResults.length === 0 && mobileSearchQuery && !mobileSearchLoading && (
//               <div className="mt-2 bg-white rounded-xl shadow-xl border border-[#E8D5C0] p-4 text-center">
//                 <p className="text-sm text-gray-500">No results found for "{mobileSearchQuery}"</p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Desktop Search */}
//         <div className="hidden lg:block relative" ref={searchRef}>
//           {searchOpen ? (
//             <form 
//               onSubmit={handleSearchSubmit}
//               className="relative flex items-center"
//             >
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search products..."
//                   className="w-80 px-4 py-2 pr-10 text-sm bg-[#F5E6D3] text-[#6B4F3A] rounded-lg border border-[#8B6B4F] focus:outline-none focus:border-[#3bc24f] focus:ring-1 focus:ring-[#3bc24f] placeholder:text-[#8B6B4F]"
//                   autoFocus
//                 />
//                 {searchLoading ? (
//                   <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3bc24f] animate-spin" />
//                 ) : (
//                   <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
//                     <Search className="w-4 h-4 text-[#8B6B4F] hover:text-[#3bc24f]" />
//                   </button>
//                 )}
//               </div>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearchOpen(false);
//                   setSearchQuery('');
//                   setShowResults(false);
//                 }}
//                 className="ml-2 p-1.5 hover:bg-[#8B6B4F] rounded-full transition-colors"
//                 title="Close search"
//               >
//                 <X className="w-4 h-4 text-[#F5E6D3]" />
//               </button>

//               {/* Desktop Search Results Dropdown */}
//               {showResults && searchResults.length > 0 && (
//                 <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-[#E8D5C0] max-h-96 overflow-y-auto z-50 w-full">
//                   {searchResults.map((result, index) => (
//                     <button
//                       key={`desktop-${result.type}-${result._id}`}
//                       onClick={() => handleResultClick(result)}
//                       className="w-full px-4 py-3 text-left hover:bg-[#F5E6D3] border-b border-[#E8D5C0] last:border-0 flex items-center gap-3 transition-colors"
//                     >
//                       {result.type === 'product' && result.image && (
//                         <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                           <img 
//                             src={result.image} 
//                             alt={result.title || result.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.src = 'https://via.placeholder.com/48?text=No+Image';
//                             }}
//                           />
//                         </div>
//                       )}
//                       {result.type !== 'product' && (
//                         <div className="mt-1">{getResultIcon(result.type)}</div>
//                       )}
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-[#6B4F3A]">
//                           {result.title || result.name}
//                         </p>
//                         <p className="text-xs text-[#8B6B4F] mt-0.5 capitalize">
//                           {result.type}
//                         </p>
//                       </div>
//                     </button>
//                   ))}
//                   <button
//                     onClick={handleViewAllResults}
//                     className="w-full px-4 py-3 text-center text-sm text-[#3bc24f] hover:bg-[#F5E6D3] font-medium border-t border-[#E8D5C0] transition-colors"
//                   >
//                     View all results for "{searchQuery}"
//                   </button>
//                 </div>
//               )}
//             </form>
//           ) : (
//             <button
//               onClick={() => setSearchOpen(true)}
//               className="p-2 hover:bg-[#8B6B4F] rounded-lg transition-colors"
//               title="Open search"
//             >
//               <Search className="w-5 h-5 text-[#F5E6D3] hover:text-[#3bc24f]" />
//             </button>
//           )}
//         </div>

//         {/* Inquiry Cart - Desktop */}
//         <Link 
//           href="/inquiry-cart" 
//           className="btn btn-ghost btn-circle hidden lg:flex relative min-w-[36px]"
//           style={{ color: '#F5E6D3' }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.backgroundColor = '#3bc24f';
//             e.currentTarget.style.color = 'white';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.backgroundColor = 'transparent';
//             e.currentTarget.style.color = '#F5E6D3';
//           }}
//         >
//           <div className="indicator">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             {cartCount > 0 && (
//               <span className="badge badge-sm indicator-item" style={{ backgroundColor: '#3bc24f', color: 'white', border: 'none' }}>
//                 {cartCount}
//               </span>
//             )}
//           </div>
//         </Link>

//         {/* User Menu or Auth Buttons */}
//         {user ? (
//           <div className="relative">
//             <button
//               onClick={() => setUserMenuOpen(!userMenuOpen)}
//               className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-[#8B6B4F] transition-colors"
//               style={{ color: '#F5E6D3' }}
//             >
//               {getProfilePicture() && !profileImageError ? (
//                 <img 
//                   src={getProfilePicture()} 
//                   alt={getDisplayName()}
//                   className="w-7 h-7 rounded-full object-cover border-2 border-[#3bc24f]"
//                   onError={handleImageError}
//                 />
//               ) : (
//                 <div className="w-7 h-7 rounded-full bg-[#3bc24f] flex items-center justify-center text-white font-semibold text-sm">
//                   {getInitials()}
//                 </div>
//               )}
//               <span className="hidden lg:inline max-w-[100px] truncate font-medium text-sm">
//                 {getDisplayName()}
//               </span>
//               <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {/* Dropdown Menu */}
//             {userMenuOpen && (
//               <>
//                 <div 
//                   className="fixed inset-0 z-40"
//                   onClick={() => setUserMenuOpen(false)}
//                 />
//                 <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E8D5C0] py-2 z-50">
//                   <div className="px-4 py-3 border-b border-[#E8D5C0]">
//                     <div className="flex items-center gap-3">
//                       {getProfilePicture() && !profileImageError ? (
//                         <img 
//                           src={getProfilePicture()} 
//                           alt={getDisplayName()}
//                           className="w-10 h-10 rounded-full object-cover border-2 border-[#3bc24f]"
//                           onError={handleImageError}
//                         />
//                       ) : (
//                         <div className="w-10 h-10 rounded-full bg-[#3bc24f] flex items-center justify-center text-white font-semibold text-lg">
//                           {getInitials()}
//                         </div>
//                       )}
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-semibold text-[#6B4F3A] truncate">{getDisplayName()}</p>
//                         <p className="text-xs text-[#8B6B4F] truncate mt-0.5">{user.email}</p>
//                       </div>
//                     </div>
//                     <div className="mt-2">
//                       <span 
//                         className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#3bc24f] text-white"
//                       >
//                         {getRoleDisplay()}
//                       </span>
//                     </div>
//                   </div>

//                   <Link
//                     href={getDashboardLink()}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
//                     onClick={() => setUserMenuOpen(false)}
//                   >
//                     <LayoutDashboard className="w-4 h-4 text-[#3bc24f]" />
//                     <span>Dashboard</span>
//                   </Link>

//                   <Link
//                     href={getSettingsLink()}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
//                     onClick={() => setUserMenuOpen(false)}
//                   >
//                     <Settings className="w-4 h-4 text-[#3bc24f]" />
//                     <span>Settings</span>
//                   </Link>

//                   <button
//                     onClick={() => {
//                       setUserMenuOpen(false);
//                       logout();
//                     }}
//                     className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left border-t border-[#E8D5C0] mt-1 pt-2"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           <>
//             <Link 
//               href="/login" 
//               className="btn btn-outline btn-sm hidden lg:flex text-xs"
//               style={{
//                 color: '#F5E6D3',
//                 borderColor: '#F5E6D3',
//                 backgroundColor: 'transparent'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#3bc24f';
//                 e.currentTarget.style.borderColor = '#3bc24f';
//                 e.currentTarget.style.color = 'white';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = 'transparent';
//                 e.currentTarget.style.borderColor = '#F5E6D3';
//                 e.currentTarget.style.color = '#F5E6D3';
//               }}
//             >
//               <User className="h-3.5 w-3.5 mr-1" />
//               Sign In
//             </Link>

//             <Link 
//               href="/register" 
//               className="btn btn-sm hidden lg:flex text-xs"
//               style={{
//                 backgroundColor: '#3bc24f',
//                 color: 'white',
//                 borderColor: '#3bc24f'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#2da63f';
//                 e.currentTarget.style.borderColor = '#2da63f';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = '#3bc24f';
//                 e.currentTarget.style.borderColor = '#3bc24f';
//               }}
//             >
//               <UserPlus className="h-3.5 w-3.5 mr-1" />
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }




'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ChevronDown, 
  LogOut, 
  Settings, 
  User, 
  LayoutDashboard, 
  Users,
  Search,
  X,
  Package,
  FileText,
  Tag,
  Loader2,
  UserPlus
} from 'lucide-react';
import { toast } from 'sonner';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Mobile search states
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [mobileSearchResults, setMobileSearchResults] = useState([]);
  const [mobileSearchLoading, setMobileSearchLoading] = useState(false);
  const [showMobileResults, setShowMobileResults] = useState(false);
  
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  // Close desktop search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
        setShowMobileResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to check and update user state
  const checkUserState = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setProfileImageError(false);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    }
  };

  // Fetch cart count
  const fetchCartCount = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setCartCount(0);
      return;
    }
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('http://localhost:5000/api/inquiry-cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal,
        mode: 'cors',
        cache: 'no-cache'
      }).finally(() => clearTimeout(timeoutId));
      
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setCartCount(0);
        window.dispatchEvent(new Event('auth-change'));
        return;
      }
      
      if (!response.ok) {
        setCartCount(0);
        return;
      }
      
      const data = await response.json();
      
      if (data.success) {
        const itemCount = data.data?.items?.length || 0;
        setCartCount(itemCount);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.warn('Cart fetch failed:', error.message);
      setCartCount(0);
    }
  };

  // Desktop Search function
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  // Mobile Search function
  const performMobileSearch = async (query) => {
    if (!query.trim()) {
      setMobileSearchResults([]);
      return;
    }

    setMobileSearchLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setMobileSearchResults(data.data);
        setShowMobileResults(true);
      }
    } catch (error) {
      console.error('Mobile search error:', error);
    } finally {
      setMobileSearchLoading(false);
    }
  };

  // Debounce desktop search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        performSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Debounce mobile search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mobileSearchQuery) {
        performMobileSearch(mobileSearchQuery);
      } else {
        setMobileSearchResults([]);
        setShowMobileResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [mobileSearchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery)}`);
      setMobileSearchOpen(false);
      setMobileSearchQuery('');
      setShowMobileResults(false);
    }
  };

  const handleResultClick = (result) => {
    let url = '';
    switch (result.type) {
      case 'product':
        url = `/productDetails?id=${result._id}`;
        break;
      case 'blog':
        url = `/blog/${result._id}`;
        break;
      case 'category':
        url = `/products?category=${result._id}`;
        break;
      default:
        url = `/search?q=${encodeURIComponent(result.title || result.name)}`;
    }
    router.push(url);
    setSearchOpen(false);
    setSearchQuery('');
    setShowResults(false);
  };

  const handleMobileResultClick = (result) => {
    let url = '';
    switch (result.type) {
      case 'product':
        url = `/productDetails?id=${result._id}`;
        break;
      case 'blog':
        url = `/blog/${result._id}`;
        break;
      case 'category':
        url = `/products?category=${result._id}`;
        break;
      default:
        url = `/search?q=${encodeURIComponent(result.title || result.name)}`;
    }
    router.push(url);
    setMobileSearchOpen(false);
    setMobileSearchQuery('');
    setShowMobileResults(false);
  };

  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  const handleMobileViewAllResults = () => {
    if (mobileSearchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(mobileSearchQuery)}`);
      setMobileSearchOpen(false);
      setMobileSearchQuery('');
      setShowMobileResults(false);
    }
  };

  // Test API connection on mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health');
        const data = await response.json();
        console.log('✅ Backend connection test:', data);
      } catch (error) {
        console.error('❌ Backend connection failed:', error);
      }
    };
    
    testConnection();
  }, []);

  // Initial check
  // useEffect(() => {
  //   checkUserState();
  //   fetchCartCount();

  //   const handleStorageChange = (e) => {
  //     if (e.key === 'user' || e.key === 'token') {
  //       checkUserState();
  //       fetchCartCount();
  //     }
  //   };

  //   window.addEventListener('storage', handleStorageChange);

  //   const handleAuthChange = () => {
  //     checkUserState();
  //     fetchCartCount();
  //   };

  //   window.addEventListener('auth-change', handleAuthChange);

  //   const handleCartUpdate = () => {
  //     fetchCartCount();
  //   };

  //   window.addEventListener('cart-update', handleCartUpdate);

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //     window.removeEventListener('auth-change', handleAuthChange);
  //     window.removeEventListener('cart-update', handleCartUpdate);
  //   };
  // }, []);

  // In Navbar.js, add this to your existing useEffect
useEffect(() => {
  checkUserState();
  fetchCartCount();

  const handleStorageChange = (e) => {
    if (e.key === 'user' || e.key === 'token') {
      checkUserState();
      fetchCartCount();
    }
  };

  window.addEventListener('storage', handleStorageChange);

  const handleAuthChange = () => {
    console.log('🔄 Auth change detected, refreshing user state...');
    checkUserState();
    fetchCartCount();
  };

  window.addEventListener('auth-change', handleAuthChange);
  
  // 🔥 NEW: Listen for focus events (when user returns to tab after login)
  const handleFocus = () => {
    console.log('👁️ Tab focused, checking user state...');
    checkUserState();
    fetchCartCount();
  };
  
  window.addEventListener('focus', handleFocus);

  const handleCartUpdate = () => {
    fetchCartCount();
  };

  window.addEventListener('cart-update', handleCartUpdate);

  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('auth-change', handleAuthChange);
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('cart-update', handleCartUpdate);
  };
}, []);

  // Listen for route changes
  useEffect(() => {
    fetchCartCount();
  }, [pathname]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberedEmail');
    setUser(null);
    setCartCount(0);
    setUserMenuOpen(false);
    setProfileImageError(false);
    
    window.dispatchEvent(new Event('auth-change'));
    
    toast.success('Logged out successfully');
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'moderator':
        return '/moderator/dashboard';
      case 'customer':
        return '/customer/dashboard';
      default:
        return '/';
    }
  };

  const getSettingsLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin/settings';
      case 'moderator':
        return '/moderator/settings';
      case 'customer':
        return '/customer/settings';
      default:
        return '/';
    }
  };

  const getRoleDisplay = () => {
    if (!user) return '';
    switch (user.role) {
      case 'admin':
        return 'Administrator';
      case 'moderator':
        return 'Moderator';
      case 'customer':
        return 'Customer';
      default:
        return user.role;
    }
  };

  const getDisplayName = () => {
    if (!user) return '';
    return user.companyName || user.contactPerson || user.email?.split('@')[0] || 'User';
  };

  const getInitials = () => {
    if (!user) return 'U';
    const name = user.companyName || user.contactPerson || user.email;
    return name?.charAt(0).toUpperCase() || 'U';
  };

  const getProfilePicture = () => {
    if (!user) return null;
    return user.profilePicture || user.photoURL || null;
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'product':
        return <Package className="w-4 h-4 text-[#3bc24f]" />;
      case 'blog':
        return <FileText className="w-4 h-4 text-[#3bc24f]" />;
      case 'category':
        return <Tag className="w-4 h-4 text-[#3bc24f]" />;
      default:
        return <Search className="w-4 h-4 text-[#3bc24f]" />;
    }
  };

  const handleImageError = () => {
    setProfileImageError(true);
  };

  if (authLoading) {
    return (
      <div className="navbar fixed top-0 z-50 w-full shadow-md" style={{ backgroundColor: '#6B4F3A' }}>
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-36 h-[54px] overflow-hidden flex items-center">
              <img 
                src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
                alt="Jute Craftify Logo"
                className="w-full h-full object-contain scale-125"
              />
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1" style={{ color: '#F5E6D3' }}>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  style={{ color: '#F5E6D3' }}
                  className="hover:text-[#3bc24f] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <div className="w-8 h-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar fixed top-0 z-50 w-full shadow-md" style={{ backgroundColor: '#6B4F3A' }}>
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden" style={{ color: '#F5E6D3' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow rounded-box w-52" style={{ backgroundColor: '#6B4F3A', color: '#F5E6D3', border: '1px solid #8B6B4F' }}>
            {navItems.map((item) => (
              <li key={item.name} className="w-full">
                <Link 
                  href={item.href}
                  style={{
                    color: '#F5E6D3',
                    backgroundColor: isActive(item.href) ? '#3bc24f' : 'transparent',
                  }}
                  className={`hover:bg-[#3bc24f] hover:text-white block w-full rounded-md ${isActive(item.href) ? 'text-white pointer-events-none' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            
            {/* Mobile menu user section */}
            {user ? (
              <>
                <li className="border-t border-[#8B6B4F] mt-2 pt-2 w-full">
                  <div className="flex flex-col px-2 py-1 text-sm text-[#F5E6D3] w-full items-start">
                    <div className="flex items-center gap-2 w-full">
                      {getProfilePicture() && !profileImageError ? (
                        <img 
                          src={getProfilePicture()} 
                          alt={getDisplayName()}
                          className="w-6 h-6 rounded-full object-cover border border-[#3bc24f]"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#3bc24f] flex items-center justify-center text-white text-xs font-semibold">
                          {getInitials()}
                        </div>
                      )}
                      <div className="font-semibold truncate text-left">{getDisplayName()}</div>
                    </div>
                    <div className="text-xs opacity-80 truncate text-left w-full mt-1">{user.email}</div>
                    <div className="text-xs mt-1.5 text-left w-full">
                      <span className="inline-block bg-[#3bc24f] text-white px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                        {getRoleDisplay()}
                      </span>
                    </div>
                  </div>
                </li>
                <li className="w-full">
                  <Link 
                    href={getDashboardLink()} 
                    className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-2 justify-start rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link 
                    href={getSettingsLink()} 
                    className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-2 justify-start rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 flex-shrink-0" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 text-red-300 hover:bg-red-500 hover:text-white w-full text-left px-2 py-2 justify-start rounded-md"
                  >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="border-t border-[#8B6B4F] mt-2 pt-2 w-full">
                  <Link href="/login" className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-2 justify-start rounded-md">
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span>Sign In</span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link href="/register" className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-2 justify-start rounded-md">
                    <Users className="h-4 w-4 flex-shrink-0" />
                    <span>Register</span>
                  </Link>
                </li>
              </>
            )}
            
            <li className="border-t border-[#8B6B4F] mt-2 pt-2 w-full">
              <Link href="/inquiry-cart" className="flex items-center gap-2 text-[#F5E6D3] hover:bg-[#3bc24f] hover:text-white w-full px-2 py-2 justify-start rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Inquiry Cart
                {cartCount > 0 && (
                  <span className="badge badge-sm ml-2" style={{ backgroundColor: '#3bc24f', color: 'white', border: 'none' }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Logo/Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-2"
        >
          <div className="relative w-36 h-[54px] overflow-hidden flex items-center">
            <img 
              src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
              alt="Jute Craftify Logo"
              className="w-full h-full object-contain scale-125"
            />
          </div>
        </Link>
      </div>

      {/* Desktop Menu - Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                style={{
                  color: isActive(item.href) ? '#3bc24f' : '#F5E6D3',
                  fontWeight: isActive(item.href) ? '600' : '500',
                  borderBottom: isActive(item.href) ? '2px solid #3bc24f' : 'none',
                }}
                className={`hover:text-[#3bc24f] transition-all duration-200 pb-1`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side - Actions */}
      <div className="navbar-end gap-2">
        {/* Mobile Search Button - Now on top navbar */}
        <button
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="lg:hidden p-2 hover:bg-[#8B6B4F] rounded-lg transition-colors"
          title="Search"
        >
          <Search className="w-5 h-5 text-[#F5E6D3]" />
        </button>

        {/* Mobile Search Input - Shows below navbar when search button is clicked */}
        {mobileSearchOpen && (
          <div className="absolute top-16 left-0 right-0 px-3 py-2 bg-[#6B4F3A] border-t border-[#8B6B4F] z-50 lg:hidden" ref={mobileSearchRef}>
            <form onSubmit={handleMobileSearchSubmit} className="relative">
              <input
                type="text"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pr-10 text-sm bg-[#F5E6D3] text-[#6B4F3A] rounded-lg border border-[#8B6B4F] focus:outline-none focus:border-[#3bc24f] focus:ring-1 focus:ring-[#3bc24f] placeholder:text-[#8B6B4F]"
                autoFocus
              />
              {mobileSearchLoading ? (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3bc24f] animate-spin" />
              ) : (
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-[#8B6B4F]" />
                </button>
              )}
            </form>

            {/* Mobile Search Results with Images */}
            {showMobileResults && mobileSearchResults.length > 0 && (
              <div className="mt-2 bg-white rounded-xl shadow-xl border border-[#E8D5C0] max-h-80 overflow-y-auto">
                {mobileSearchResults.map((result) => (
                  <button
                    key={`mobile-${result.type}-${result._id}`}
                    onClick={() => handleMobileResultClick(result)}
                    className="w-full px-3 py-3 text-left hover:bg-[#F5E6D3] border-b border-[#E8D5C0] last:border-0 flex items-center gap-3 transition-colors"
                  >
                    {/* Product Image for mobile */}
                    {result.type === 'product' && result.image && (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={result.image} 
                          alt={result.title || result.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/48?text=No+Image';
                          }}
                        />
                      </div>
                    )}
                    {result.type !== 'product' && (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getResultIcon(result.type)}
                      </div>
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-[#6B4F3A] line-clamp-1">
                        {result.title || result.name}
                      </p>
                      <p className="text-xs text-[#8B6B4F] mt-0.5 capitalize">
                        {result.type}
                      </p>
                    </div>
                  </button>
                ))}
                <button
                  onClick={handleMobileViewAllResults}
                  className="w-full px-3 py-2 text-center text-sm text-[#3bc24f] hover:bg-[#F5E6D3] font-medium border-t border-[#E8D5C0] transition-colors"
                >
                  View all results for "{mobileSearchQuery}"
                </button>
              </div>
            )}
            
            {showMobileResults && mobileSearchResults.length === 0 && mobileSearchQuery && !mobileSearchLoading && (
              <div className="mt-2 bg-white rounded-xl shadow-xl border border-[#E8D5C0] p-4 text-center">
                <p className="text-sm text-gray-500">No results found for "{mobileSearchQuery}"</p>
              </div>
            )}
          </div>
        )}

        {/* Desktop Search */}
        <div className="hidden lg:block relative" ref={searchRef}>
          {searchOpen ? (
            <form 
              onSubmit={handleSearchSubmit}
              className="relative flex items-center"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-80 px-4 py-2 pr-10 text-sm bg-[#F5E6D3] text-[#6B4F3A] rounded-lg border border-[#8B6B4F] focus:outline-none focus:border-[#3bc24f] focus:ring-1 focus:ring-[#3bc24f] placeholder:text-[#8B6B4F]"
                  autoFocus
                />
                {searchLoading ? (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3bc24f] animate-spin" />
                ) : (
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Search className="w-4 h-4 text-[#8B6B4F] hover:text-[#3bc24f]" />
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                  setShowResults(false);
                }}
                className="ml-2 p-1.5 hover:bg-[#8B6B4F] rounded-full transition-colors"
                title="Close search"
              >
                <X className="w-4 h-4 text-[#F5E6D3]" />
              </button>

              {/* Desktop Search Results with Images */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-[#E8D5C0] max-h-96 overflow-y-auto z-50 w-full">
                  {searchResults.map((result) => (
                    <button
                      key={`desktop-${result.type}-${result._id}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-3 text-left hover:bg-[#F5E6D3] border-b border-[#E8D5C0] last:border-0 flex items-center gap-3 transition-colors"
                    >
                      {result.type === 'product' && result.image && (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={result.image} 
                            alt={result.title || result.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/48?text=No+Image';
                            }}
                          />
                        </div>
                      )}
                      {result.type !== 'product' && (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getResultIcon(result.type)}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#6B4F3A]">
                          {result.title || result.name}
                        </p>
                        <p className="text-xs text-[#8B6B4F] mt-0.5 capitalize">
                          {result.type}
                        </p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={handleViewAllResults}
                    className="w-full px-4 py-3 text-center text-sm text-[#3bc24f] hover:bg-[#F5E6D3] font-medium border-t border-[#E8D5C0] transition-colors"
                  >
                    View all results for "{searchQuery}"
                  </button>
                </div>
              )}
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 hover:bg-[#8B6B4F] rounded-lg transition-colors"
              title="Open search"
            >
              <Search className="w-5 h-5 text-[#F5E6D3] hover:text-[#3bc24f]" />
            </button>
          )}
        </div>

        {/* Inquiry Cart - Desktop */}
        <Link 
          href="/inquiry-cart" 
          className="btn btn-ghost btn-circle hidden lg:flex relative"
          style={{ color: '#F5E6D3' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#3bc24f';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#F5E6D3';
          }}
        >
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="badge badge-sm indicator-item" style={{ backgroundColor: '#3bc24f', color: 'white', border: 'none' }}>
                {cartCount}
              </span>
            )}
          </div>
        </Link>

        {/* User Menu or Auth Buttons */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#8B6B4F] transition-colors"
              style={{ color: '#F5E6D3' }}
            >
              {getProfilePicture() && !profileImageError ? (
                <img 
                  src={getProfilePicture()} 
                  alt={getDisplayName()}
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#3bc24f]"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#3bc24f] flex items-center justify-center text-white font-semibold">
                  {getInitials()}
                </div>
              )}
              <span className="hidden lg:inline max-w-[100px] truncate font-medium">
                {getDisplayName()}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E8D5C0] py-2 z-50">
                  <div className="px-4 py-3 border-b border-[#E8D5C0]">
                    <div className="flex items-center gap-3">
                      {getProfilePicture() && !profileImageError ? (
                        <img 
                          src={getProfilePicture()} 
                          alt={getDisplayName()}
                          className="w-10 h-10 rounded-full object-cover border-2 border-[#3bc24f]"
                          onError={handleImageError}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#3bc24f] flex items-center justify-center text-white font-semibold text-lg">
                          {getInitials()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#6B4F3A] truncate">{getDisplayName()}</p>
                        <p className="text-xs text-[#8B6B4F] truncate mt-0.5">{user.email}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#3bc24f] text-white">
                        {getRoleDisplay()}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={getDashboardLink()}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#3bc24f]" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href={getSettingsLink()}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#6B4F3A] hover:bg-[#F5E6D3] transition-colors"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-[#3bc24f]" />
                    <span>Settings</span>
                  </Link>

                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left border-t border-[#E8D5C0] mt-1 pt-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <Link 
              href="/login" 
              className="btn btn-outline btn-sm hidden lg:flex"
              style={{
                color: '#F5E6D3',
                borderColor: '#F5E6D3',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3bc24f';
                e.currentTarget.style.borderColor = '#3bc24f';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = '#F5E6D3';
                e.currentTarget.style.color = '#F5E6D3';
              }}
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Link>

            <Link 
              href="/register" 
              className="btn btn-sm hidden lg:flex"
              style={{
                backgroundColor: '#3bc24f',
                color: 'white',
                borderColor: '#3bc24f'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2da63f';
                e.currentTarget.style.borderColor = '#2da63f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3bc24f';
                e.currentTarget.style.borderColor = '#3bc24f';
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}