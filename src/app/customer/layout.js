

// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { 
//   LayoutDashboard, 
//   ShoppingBag, 
//   FileText,
//   MessageSquare,
//   Settings, 
//   LogOut,
//   Menu,
//   ChevronDown,
//   Home,
//   ChevronRight,
//   Star
// } from 'lucide-react';

// export default function CustomerLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Helper function to normalize pathname (remove trailing slash)
//   const normalizePath = (path) => {
//     if (path && path !== '/' && path.endsWith('/')) {
//       return path.slice(0, -1);
//     }
//     return path;
//   };

//   // Helper function to check if a route is active
//   const isActive = (href) => {
//     const currentPath = normalizePath(pathname);
    
//     // Dashboard
//     if (href === '/customer/dashboard') {
//       return currentPath === '/customer/dashboard';
//     }
    
//     // My Inquiries
//     if (href === '/customer/inquiries') {
//       return currentPath === '/customer/inquiries' || 
//              currentPath.startsWith('/customer/inquiries/');
//     }
    
//     // My Invoices
//     if (href === '/customer/invoices') {
//       return currentPath === '/customer/invoices' || 
//              currentPath.startsWith('/customer/invoices/');
//     }
    
//     // Browse Products
//     if (href === '/products') {
//       return currentPath === '/products' || 
//              currentPath.startsWith('/products/');
//     }
    
//     // My Reviews
//     if (href === '/customer/my-reviews') {
//       return currentPath === '/customer/my-reviews' || 
//              currentPath.startsWith('/customer/my-reviews/');
//     }
    
//     // Settings
//     if (href === '/customer/settings') {
//       return currentPath === '/customer/settings' || 
//              currentPath.startsWith('/customer/settings/');
//     }
    
//     return false;
//   };

//   useEffect(() => {
//     // Add global style to remove any body padding/margin
//     document.body.style.margin = '0';
//     document.body.style.padding = '0';
    
//     // Check if user is customer
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (!token || !userData) {
//       logout();
//       return;
//     }

//     try {
//       const parsedUser = JSON.parse(userData);
      
//       // IMMEDIATE LOGOUT if role is not customer
//       if (parsedUser.role !== 'customer') {
//         console.log('Unauthorized customer access attempt by:', parsedUser.role);
//         logout();
//         return;
//       }

//       setUser(parsedUser);
//     } catch (error) {
//       console.error('Error parsing user data:', error);
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   }, [router]);

//   const navigation = [
//     {
//       name: 'Dashboard',
//       href: '/customer/dashboard',
//       icon: LayoutDashboard,
//     },
//     {
//       name: 'My Inquiries',
//       href: '/customer/inquiries',
//       icon: MessageSquare,
//     },
//     {
//       name: 'My Invoices',
//       href: '/customer/invoices',
//       icon: FileText,
//     },
//     {
//       name: 'Browse Products',
//       href: '/products',
//       icon: ShoppingBag,
//     },
//     {
//       name: 'My Reviews',
//       href: '/customer/my-reviews',
//       icon: Star,
//     },
//     {
//       name: 'Settings',
//       href: '/customer/settings',
//       icon: Settings,
//     }
//   ];

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   // Show loading spinner while checking authentication
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8f8f8' }}>
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#E39A65] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Global style to ensure no extra spacing */}
//       <style jsx global>{`
//         html, body {
//           margin: 0 !important;
//           padding: 0 !important;
//           overflow-x: hidden;
//         }
//         * {
//           box-sizing: border-box;
//         }
//       `}</style>
      
//       <div className="min-h-screen" style={{ backgroundColor: '#f8f8f8', margin: 0, padding: 0 }}>
//         {/* Mobile sidebar backdrop */}
//         {sidebarOpen && (
//           <div 
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Sidebar */}
//         <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
//           sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}>
//           {/* Sidebar header with logo */}
//           <div className="h-20 flex items-center justify-center px-6 border-b border-gray-200 relative" style={{ background: 'linear-gradient(135deg, #d9884e 0%, #e6a87c 100%)' }}>
//             <div className="flex items-center justify-center w-full">
//               <Link href="/">
//                 <img 
//                   src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
//                   alt="Asian Clothify Logo" 
//                   className="h-20 w-auto object-contain drop-shadow-md cursor-pointer hover:opacity-90 transition-opacity"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.style.display = 'none';
//                     const parent = e.target.parentElement;
//                     parent.innerHTML = '<span class="text-5xl text-white drop-shadow-md">👕</span>';
//                   }}
//                 />
//               </Link>
//             </div>
//           </div>

//           {/* User info */}
//           {user && (
//             <div className="px-4 py-4 border-b border-gray-200" style={{ backgroundColor: '#faf1e9' }}>
//               <div className="flex items-center gap-3">
//                 <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-md" style={{ background: '#E39A65' }}>
//                   {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold truncate" style={{ color: '#2A2A2A' }}>
//                     {user.companyName || user.contactPerson || 'Customer'}
//                   </p>
//                   <p className="text-xs text-gray-600 truncate mt-0.5">
//                     {user.email}
//                   </p>
//                   <div className="flex items-center gap-1.5 mt-1.5">
//                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                     <span className="text-xs font-medium" style={{ color: '#E39A65' }}>
//                       Customer
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Navigation */}
//           <nav className="px-3 py-4 h-[calc(100vh-13rem)] overflow-y-auto pb-20">
//             <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">CUSTOMER MENU</p>
//             <div className="space-y-1">
//               {navigation.map((item) => {
//                 const active = isActive(item.href);
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
//                       active
//                         ? 'text-white shadow-md'
//                         : 'text-gray-700 hover:bg-orange-50'
//                     }`}
//                     style={active ? { background: '#E39A65' } : {}}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon className={`w-5 h-5 ${
//                         active ? 'text-white' : 'text-gray-400'
//                       }`} />
//                       <span>{item.name}</span>
//                     </div>
//                     {active && <ChevronRight className="w-4 h-4 text-white" />}
//                   </Link>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Logout button */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
//             <button
//               onClick={logout}
//               className="flex items-center gap-3 px-4 py-3 text-sm font-medium w-full transition-all group rounded-xl"
//               style={{ color: '#2A2A2A' }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.backgroundColor = '#fee7e0';
//                 e.currentTarget.style.color = '#E39A65';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.backgroundColor = 'transparent';
//                 e.currentTarget.style.color = '#2A2A2A';
//               }}
//             >
//               <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-orange-100 flex items-center justify-center">
//                 <LogOut className="w-4 h-4 text-gray-500 group-hover:text-[#E39A65]" />
//               </div>
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>

//         {/* Main content */}
//         <div className="lg:ml-72 min-h-screen">
//           {/* Top header */}
//           <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm" style={{ margin: 0, borderBottomColor: '#E39A65' }}>
//             <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
//               <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
//                 {/* Left section */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setSidebarOpen(true)}
//                     className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200"
//                     style={{ color: '#2A2A2A' }}
//                   >
//                     <Menu className="w-5 h-5" />
//                   </button>
                  
//                   {/* Welcome Message */}
//                   {user && (
//                     <div className="hidden sm:block">
//                       <span className="text-lg md:text-xl lg:text-2xl font-bold" style={{ color: '#2A2A2A' }}>Welcome back,</span>
//                       <span className="text-lg md:text-xl lg:text-2xl font-bold ml-1 md:ml-2" style={{ color: '#E39A65' }}>
//                         {(user.companyName || user.contactPerson || 'Customer').slice(0, 15)}
//                         {(user.companyName || user.contactPerson || 'Customer').length > 15 ? '...' : ''}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Right section */}
//                 <div className="flex items-center gap-3">
//                   <Link 
//                     href="/" 
//                     className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
//                     style={{ color: '#2A2A2A' }}
//                     title="Go to Homepage"
//                   >
//                     <Home className="w-5 h-5" />
//                   </Link>

//                   {/* User Dropdown */}
//                   {user && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setUserMenuOpen(!userMenuOpen)}
//                         className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-gray-100 transition-colors"
//                       >
//                         <div className="text-right hidden md:block">
//                           <p className="text-sm font-medium" style={{ color: '#2A2A2A' }}>{user.companyName || user.contactPerson || 'Customer'}</p>
//                           <p className="text-xs text-gray-500">{user.email}</p>
//                         </div>
//                         <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm" style={{ background: '#E39A65' }}>
//                           {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
//                         </div>
//                         <ChevronDown className={`w-4 h-5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} style={{ color: '#2A2A2A' }} />
//                       </button>

//                       {/* Dropdown Menu */}
//                       {userMenuOpen && (
//                         <>
//                           <div 
//                             className="fixed inset-0 z-40"
//                             onClick={() => setUserMenuOpen(false)}
//                           />
//                           <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
//                             <div className="px-4 py-3 border-b border-gray-200">
//                               <p className="text-sm font-semibold" style={{ color: '#2A2A2A' }}>{user.companyName || user.contactPerson || 'Customer'}</p>
//                               <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
//                               <p className="text-xs text-gray-500 mt-1">{user.phone || 'No phone'}</p>
//                               <div className="flex items-center gap-2 mt-2">
//                                 <span className="px-2 py-0.5 text-xs font-medium rounded-full" 
//                                   style={{ 
//                                     backgroundColor: '#faf1e9',
//                                     color: '#E39A65'
//                                   }}>
//                                   Customer
//                                 </span>
//                               </div>
//                             </div>
                            
//                             <Link
//                               href="/customer/settings"
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors"
//                               style={{ color: '#2A2A2A' }}
//                               onClick={() => setUserMenuOpen(false)}
//                             >
//                               <Settings className="w-4 h-4" style={{ color: '#E39A65' }} />
//                               <span>Settings</span>
//                             </Link>
                            
//                             <button
//                               onClick={() => {
//                                 setUserMenuOpen(false);
//                                 logout();
//                               }}
//                               className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors w-full text-left border-t border-gray-100 mt-1 pt-2"
//                               style={{ color: '#E39A65' }}
//                             >
//                               <LogOut className="w-4 h-4" style={{ color: '#E39A65' }} />
//                               <span>Logout</span>
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Page content */}
//           <main className="" style={{ margin: 0, padding: 0 }}>
//             {children}
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  FileText,
  MessageSquare,
  Settings, 
  LogOut,
  Menu,
  ChevronDown,
  Home,
  ChevronRight,
  Star
} from 'lucide-react';

export default function CustomerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Helper function to normalize pathname (remove trailing slash)
  const normalizePath = (path) => {
    if (path && path !== '/' && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  };

  // Helper function to check if a route is active
  const isActive = (href) => {
    const currentPath = normalizePath(pathname);
    
    // Dashboard
    if (href === '/customer/dashboard') {
      return currentPath === '/customer/dashboard';
    }
    
    // My Inquiries
    if (href === '/customer/inquiries') {
      return currentPath === '/customer/inquiries' || 
             currentPath.startsWith('/customer/inquiries/');
    }
    
    // My Invoices
    if (href === '/customer/invoices') {
      return currentPath === '/customer/invoices' || 
             currentPath.startsWith('/customer/invoices/');
    }
    
    // Browse Products
    if (href === '/products') {
      return currentPath === '/products' || 
             currentPath.startsWith('/products/');
    }
    
    // My Reviews
    if (href === '/customer/my-reviews') {
      return currentPath === '/customer/my-reviews' || 
             currentPath.startsWith('/customer/my-reviews/');
    }
    
    // Settings
    if (href === '/customer/settings') {
      return currentPath === '/customer/settings' || 
             currentPath.startsWith('/customer/settings/');
    }
    
    return false;
  };

  useEffect(() => {
    // Add global style to remove any body padding/margin
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Check if user is customer
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      logout();
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      
      // IMMEDIATE LOGOUT if role is not customer
      if (parsedUser.role !== 'customer') {
        console.log('Unauthorized customer access attempt by:', parsedUser.role);
        logout();
        return;
      }

      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/customer/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'My Inquiries',
      href: '/customer/inquiries',
      icon: MessageSquare,
    },
    {
      name: 'My Invoices',
      href: '/customer/invoices',
      icon: FileText,
    },
    {
      name: 'Browse Products',
      href: '/products',
      icon: ShoppingBag,
    },
    {
      name: 'My Reviews',
      href: '/customer/my-reviews',
      icon: Star,
    },
    {
      name: 'Settings',
      href: '/customer/settings',
      icon: Settings,
    }
  ];

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#6B4F3A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Global style to ensure no extra spacing and apply new fonts */}
      <style jsx global>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        h1, h2, h3, h4, h5, h6, .heading-font {
          font-family: 'Playfair Display', serif;
        }
      `}</style>
      
      <div className="min-h-screen" style={{ backgroundColor: '#FAF7F2', margin: 0, padding: 0 }}>
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Sidebar header with logo - Updated to Earthy Brown gradient */}
          <div className="h-20 flex items-center justify-center px-6 border-b border-gray-200 relative" style={{ background: 'linear-gradient(135deg, #6B4F3A 0%, #8B6B51 100%)' }}>
            <div className="flex items-center justify-center w-full">
              <Link href="/">
                <img 
                  src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png" 
                  alt="Jute Craftify Logo" 
                  className="h-24 w-auto object-contain drop-shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    parent.innerHTML = '<span className="text-5xl text-white drop-shadow-md">🌾</span>';
                  }}
                />
              </Link>
            </div>
          </div>

          {/* User info - Updated with Natural Beige background */}
          {user && (
            <div className="px-4 py-4 border-b border-gray-200" style={{ backgroundColor: '#F5E6D3' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-md" style={{ background: 'linear-gradient(135deg, #6B4F3A 0%, #8B6B51 100%)' }}>
                  {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: '#2A2A2A', fontFamily: 'Playfair Display, serif' }}>
                    {user.companyName || user.contactPerson || 'Customer'}
                  </p>
                  <p className="text-xs text-gray-600 truncate mt-0.5">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#3A7D44' }}></span>
                    <span className="text-xs font-medium" style={{ color: '#6B4F3A' }}>
                      Customer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation - Updated active state colors */}
          <nav className="px-3 py-4 h-[calc(100vh-13rem)] overflow-y-auto pb-20 custom-scroll">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">CUSTOMER MENU</p>
            <div className="space-y-1">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                      active
                        ? 'text-white shadow-md'
                        : 'text-gray-700 hover:bg-[#F5E6D3]'
                    }`}
                    style={active ? { background: 'linear-gradient(135deg, #6B4F3A 0%, #8B6B51 100%)' } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${
                        active ? 'text-white' : 'text-gray-400'
                      }`} />
                      <span>{item.name}</span>
                    </div>
                    {active && <ChevronRight className="w-4 h-4 text-white" />}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium w-full transition-all group rounded-xl"
              style={{ color: '#2A2A2A' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F5E6D3';
                e.currentTarget.style.color = '#6B4F3A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#2A2A2A';
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#F5E6D3] flex items-center justify-center">
                <LogOut className="w-4 h-4 text-gray-500 group-hover:text-[#6B4F3A]" />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-72 min-h-screen">
          {/* Top header - Updated with new colors */}
          <header className="sticky top-0 z-30 bg-white border-b shadow-sm" style={{ margin: 0, borderBottomColor: '#6B4F3A' }}>
            <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
              <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
                {/* Left section */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-[#F5E6D3]"
                    style={{ color: '#2A2A2A' }}
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  
                  {/* Welcome Message - Updated with new fonts and colors */}
                  {user && (
                    <div className="hidden sm:block">
                      <span className="text-lg md:text-xl lg:text-2xl font-bold" style={{ color: '#2A2A2A', fontFamily: 'Playfair Display, serif' }}>Welcome back,</span>
                      <span className="text-lg md:text-xl lg:text-2xl font-bold ml-1 md:ml-2" style={{ color: '#6B4F3A', fontFamily: 'Playfair Display, serif' }}>
                        {(user.companyName || user.contactPerson || 'Customer').slice(0, 15)}
                        {(user.companyName || user.contactPerson || 'Customer').length > 15 ? '...' : ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                  <Link 
                    href="/" 
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-[#F5E6D3] transition-colors"
                    style={{ color: '#2A2A2A' }}
                    title="Go to Homepage"
                  >
                    <Home className="w-5 h-5" />
                  </Link>

                  {/* User Dropdown - Updated colors */}
                  {user && (
                    <div className="relative">
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-lg hover:bg-[#F5E6D3] transition-colors"
                      >
                        <div className="text-right hidden md:block">
                          <p className="text-sm font-medium" style={{ color: '#2A2A2A' }}>{user.companyName || user.contactPerson || 'Customer'}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #6B4F3A 0%, #8B6B51 100%)' }}>
                          {user.companyName?.charAt(0) || user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <ChevronDown className={`w-4 h-5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} style={{ color: '#2A2A2A' }} />
                      </button>

                      {/* Dropdown Menu - Updated colors */}
                      {userMenuOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40"
                            onClick={() => setUserMenuOpen(false)}
                          />
                          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border py-2 z-50" style={{ borderColor: '#F5E6D3' }}>
                            <div className="px-4 py-3 border-b" style={{ borderColor: '#F5E6D3' }}>
                              <p className="text-sm font-semibold" style={{ color: '#2A2A2A', fontFamily: 'Playfair Display, serif' }}>{user.companyName || user.contactPerson || 'Customer'}</p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                              <p className="text-xs text-gray-500 mt-1">{user.phone || 'No phone'}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full" 
                                  style={{ 
                                    backgroundColor: '#F5E6D3',
                                    color: '#6B4F3A'
                                  }}>
                                  Customer
                                </span>
                              </div>
                            </div>
                            
                            <Link
                              href="/customer/settings"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#F5E6D3] transition-colors"
                              style={{ color: '#2A2A2A' }}
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4" style={{ color: '#6B4F3A' }} />
                              <span>Settings</span>
                            </Link>
                            
                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                logout();
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#F5E6D3] transition-colors w-full text-left border-t mt-1 pt-2"
                              style={{ color: '#6B4F3A', borderColor: '#F5E6D3' }}
                            >
                              <LogOut className="w-4 h-4" style={{ color: '#6B4F3A' }} />
                              <span>Logout</span>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="" style={{ margin: 0, padding: 0 }}>
            {children}
          </main>
        </div>
      </div>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #F5E6D3;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #6B4F3A;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}