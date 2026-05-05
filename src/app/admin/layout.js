


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  UserPlus,
  Settings, 
  LogOut,
  Menu,
  ChevronDown,
  Package,
  MessageSquare,
  Home,
  ChevronRight,
  UserCog,
  FolderPlus,
  Newspaper,
  Star
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Helper function to normalize pathname (remove trailing slash)
  const normalizePath = (path) => {
    // Remove trailing slash if present and not just '/'
    if (path && path !== '/' && path.endsWith('/')) {
      return path.slice(0, -1);
    }
    return path;
  };

  // Debug logging
  useEffect(() => {
    console.log('=== ADMIN LAYOUT DEBUG ===');
    console.log('Raw pathname:', pathname);
    console.log('Normalized pathname:', normalizePath(pathname));
    console.log('Current URL:', window.location.href);
    console.log('Current search:', window.location.search);
  }, [pathname]);

  // Helper function to check if a route is active
  const isActive = (href) => {
    // Get normalized current path
    const currentPath = normalizePath(pathname);
    
    console.log(`Checking active for: ${href}, current: ${currentPath}`);
    
    // Dashboard - handle both with and without trailing slash
    if (href === '/admin/dashboard') {
      if (currentPath === '/admin/dashboard') {
        console.log(`✅ Dashboard active: ${currentPath}`);
        return true;
      }
      return false;
    }
    
    // All Products - matches list page, edit page, and view page
    if (href === '/admin/all-products') {
      const matches = [
        '/admin/all-products',
        '/admin/editProduct',
        '/admin/viewProduct',
        '/admin/product'
      ].some(route => currentPath === route);
      
      const startsWith = currentPath.startsWith('/admin/products/');
      
      if (matches || startsWith) {
        console.log(`✅ All Products active: ${currentPath}`);
        return true;
      }
      return false;
    }

      if (href === '/admin/popup-settings') {
      if (currentPath === '/admin/popup-settings' || 
          currentPath.startsWith('/admin/popup-settings/')) {
        return true;
      }
      return false;
    }

       if (href === '/admin/promotional-settings') {
      if (currentPath === '/admin/promotional-settings' || 
          currentPath.startsWith('/admin/promotional-settings/')) {
        return true;
      }
      return false;
    }
    
    // Create Products
    if (href === '/admin/create-products') {
      const matches = [
        '/admin/create-products',
        '/admin/createProduct'
      ].some(route => currentPath === route);
      
      if (matches) {
        console.log(`✅ Create Products active: ${currentPath}`);
        return true;
      }
      return false;
    }
    
    // Create Category
    if (href === '/admin/create-categories') {
      const matches = [
        '/admin/create-categories',
        '/admin/createCategory'
      ].some(route => currentPath === route);
      
      if (matches) return true;
      return false;
    }
    
    // Create Users
    if (href === '/admin/create-users') {
      const matches = [
        '/admin/create-users',
        '/admin/createUser'
      ].some(route => currentPath === route);
      
      if (matches) return true;
      return false;
    }
    
    // Manage Users
    if (href === '/admin/manage-users') {
      if (currentPath === '/admin/manage-users' || 
          currentPath === '/admin/editUser' ||
          currentPath.startsWith('/admin/manage-users/')) {
        return true;
      }
      return false;
    }
    
    // All Customers
    if (href === '/admin/all-customers') {
      if (currentPath === '/admin/all-customers' || 
          currentPath === '/admin/customer' ||
          currentPath.startsWith('/admin/all-customers/')) {
        return true;
      }
      return false;
    }
    
    // Create Blog
    if (href === '/admin/create-blog') {
      if (currentPath === '/admin/create-blog') return true;
      return false;
    }
    
    // Manage Blogs
    if (href === '/admin/all-blogs') {
      if (currentPath === '/admin/all-blogs' || 
          currentPath === '/admin/editBlog' ||
          currentPath.startsWith('/admin/all-blogs/')) {
        return true;
      }
      return false;
    }
    
    // Manage Reviews
    if (href === '/admin/manage-reviews') {
      if (currentPath === '/admin/manage-reviews' || 
          currentPath.startsWith('/admin/manage-reviews/')) {
        return true;
      }
      return false;
    }
    
    // Inquiries - matches all subpages
    if (href === '/admin/inquiries') {
      if (currentPath === '/admin/inquiries' || 
          currentPath.startsWith('/admin/inquiries/')) {
        return true;
      }
      return false;
    }
    
    // Invoices - matches all subpages
    if (href === '/admin/invoices') {
      if (currentPath === '/admin/invoices' || 
          currentPath.startsWith('/admin/invoices/')) {
        return true;
      }
      return false;
    }

     // Create Invoices / Manual Invoice
  if (href === '/admin/create-manual-invoice') {
    const matches = [
      '/admin/create-manual-invoice',
      '/admin/manual-invoice',
      '/admin/create-invoice'
    ].some(route => currentPath === route);
    
    if (matches) {
      console.log(`✅ Create Invoices active: ${currentPath}`);
      return true;
    }
    return false;
  }
    
    // Settings - matches all subpages
    if (href === '/admin/settings') {
      if (currentPath === '/admin/settings' || 
          currentPath.startsWith('/admin/settings/')) {
        return true;
      }
      return false;
    }
    
    return false;
  };

  useEffect(() => {
    // Add global style to remove any body padding/margin
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Check if user is admin
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      logout();
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      
      // IMMEDIATE LOGOUT if role is not admin
      if (parsedUser.role !== 'admin') {
        console.log('Unauthorized admin access attempt by:', parsedUser.role);
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
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Inquiries',
      href: '/admin/inquiries',
      icon: MessageSquare,
    },
    {
      name: 'Invoices',
      href: '/admin/invoices',
      icon: FileText,
    },
     {
      name: 'Create Invoice',
      href: '/admin/create-manual-invoice',
      icon: FileText,
    },
    {
      name: 'Create Products',
      href: '/admin/create-products',
      icon: Package,
    },
    {
      name: 'All Products',
      href: '/admin/all-products',
      icon: Package,
    },
       {
    name: 'Popup Settings',
    href: '/admin/popup-settings',
    icon: Star,  // Using Star icon, you can change to any icon like Bell, Megaphone, etc.
  },
     {
    name: 'Promotional Popup',
    href: '/admin/promotional-settings',
    icon: Star,  // Using Star icon, you can change to any icon like Bell, Megaphone, etc.
  },
    {
      name: 'Create Category',
      href: '/admin/create-categories',
      icon: FolderPlus,
    },
     { name: 'Manage Certifications', 
      href: '/admin/certifications',
       icon: FolderPlus 
      },
    {
      name: 'Create Users',
      href: '/admin/create-users',
      icon: UserPlus,
    },
    {
      name: 'Manage Users',
      href: '/admin/manage-users',
      icon: UserCog,
    },
    {
      name: 'Create & Manage Customers',
      href: '/admin/all-customers',
      icon: Users,
    },
    {
      name: 'Create Blog',
      href: '/admin/create-blog',
      icon: Newspaper,
    },
    {
      name: 'Manage Blogs',
      href: '/admin/all-blogs',
      icon: Newspaper,
    },
    {
      name: 'Manage Reviews',
      href: '/admin/manage-reviews',
      icon: Star,
    },
    {
      name: 'Settings',
      href: '/admin/settings',
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

          {/* User info - In sidebar below header - Updated with new accent colors */}
          {user && (
            <div className="px-4 py-4 border-b border-gray-200" style={{ backgroundColor: '#F5E6D3' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-semibold text-lg shadow-md" style={{ background: 'linear-gradient(135deg, #6B4F3A 0%, #8B6B51 100%)' }}>
                  {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {user.contactPerson || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-600 truncate mt-0.5">
                    {user.email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#3A7D44' }}></span>
                    <span className="text-xs font-medium" style={{ color: '#6B4F3A' }}>
                      Administrator
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation - Updated active state colors */}
          <nav className="px-3 py-4 h-[calc(100vh-11rem)] overflow-y-auto pb-24 custom-scroll">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">MAIN MENU</p>
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

          {/* Logout button at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-red-50 hover:text-red-600 w-full transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:ml-72 min-h-screen">
          {/* Top header - Updated colors */}
          <header className="sticky top-0 z-30 bg-white border-b shadow-sm" style={{ borderColor: '#F5E6D3', margin: 0 }}>
            <div className="px-4 sm:px-6 lg:px-8" style={{ margin: 0 }}>
              <div className="flex items-center justify-between h-20" style={{ margin: 0 }}>
                {/* Left section */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#F5E6D3]"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                  
                  {/* Welcome Message - Updated with new fonts and colors */}
                  {user && (
                    <div>
                      <span className="text-2xl font-bold" style={{ color: '#2A2A2A', fontFamily: 'Playfair Display, serif' }}>Welcome back,</span>
                      <span className="text-2xl font-bold ml-2" style={{ color: '#6B4F3A', fontFamily: 'Playfair Display, serif' }}>{user.contactPerson || 'Admin'}</span>
                    </div>
                  )}
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">
                  <Link 
                    href="/" 
                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#F5E6D3] transition-colors"
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
                          <p className="text-sm font-medium text-gray-900">{user.contactPerson || 'Admin'}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #6B4F3A 0%, #8B6B51 100%)' }}>
                          {user.contactPerson?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <ChevronDown className={`w-4 h-5 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
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
                              <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>{user.contactPerson || 'Admin'}</p>
                              <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 text-xs font-medium rounded-full" 
                                  style={{ 
                                    backgroundColor: '#F5E6D3',
                                    color: '#6B4F3A'
                                  }}>
                                  Administrator
                                </span>
                              </div>
                            </div>
                            
                            <Link
                              href="/admin/settings"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                              style={{ color: '#6B4F3A' }}
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
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left border-t mt-1 pt-2"
                              style={{ borderColor: '#F5E6D3' }}
                            >
                              <LogOut className="w-4 h-4" />
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