'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  Users,
  Eye,
  ArrowRight,
  RefreshCw,
  Loader2,
  Calendar,
  MessageCircle,
  PieChart,
  CreditCard,
  PlusCircle,
  FileOutput,
  Download,
  Mail,
  Phone,
  Building2,
  User,
  MapPin,
  Filter,
  Search,
  AlertTriangle,
  CheckSquare,
  XSquare,
  Inbox,
  Send,
  Settings,
  Star,
  Award,
  Target,
  Zap,
  Shield,
  Truck,
  Globe,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Layers,
  UploadCloud,
  Link as LinkIcon,
  ExternalLink,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Tag,
  Grid,
  List,
  Plus,
  Filter as FilterIcon,
  BarChart3,
  Edit
} from 'lucide-react';
import { toast } from 'sonner';

// ==================== JUTE THEME COLORS ====================
const JUTE = {
  primary: '#6B4F3A',
  secondary: '#F5E6D3',
  accent: '#4A7C59',
  accentLight: '#C6A43B',
  background: '#FAF7F2',
  text: '#2C2420',
  textLight: '#8B7355',
  border: '#E5D5C0',
  white: '#FFFFFF',
  warning: '#E39A65'
};

// ==================== HELPER FUNCTIONS ====================

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price || 0);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
};

const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
};

const getMonthName = (monthIndex) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
};

// ==================== STATUS BADGES ====================

const InquiryStatusBadge = ({ status }) => {
  const config = {
    submitted: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Submitted', dot: 'bg-amber-500' },
    quoted: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Quoted', dot: 'bg-blue-500' },
    accepted: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Accepted', dot: 'bg-emerald-500' },
    invoiced: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Invoiced', dot: 'bg-purple-500' },
    paid: { bg: 'bg-green-100', text: 'text-green-700', label: 'Paid', dot: 'bg-green-500' },
    cancelled: { bg: 'bg-rose-100', text: 'text-rose-700', label: 'Cancelled', dot: 'bg-rose-500' }
  };

  const statusKey = status?.toLowerCase() || 'submitted';
  const { bg, text, label, dot } = config[statusKey] || config.submitted;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
      <span className={`text-xs font-medium ${text}`}>{label}</span>
    </div>
  );
};

// ==================== STAT CARD COMPONENT ====================

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'jute', 
  subtitle,
  onClick,
  link,
  loading = false
}) => {
  const colors = {
    jute: {
      bg: `bg-gradient-to-br from-[${JUTE.secondary}] to-[${JUTE.background}]`,
      iconBg: JUTE.primary,
      iconColor: 'text-white',
      border: `border-[${JUTE.border}]`,
      text: `text-[${JUTE.primary}]`
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
      iconBg: JUTE.accent,
      iconColor: 'text-white',
      border: 'border-emerald-200',
      text: 'text-emerald-700'
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50',
      iconBg: JUTE.accentLight,
      iconColor: 'text-white',
      border: 'border-amber-200',
      text: 'text-amber-700'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50',
      iconBg: '#8B6B51',
      iconColor: 'text-white',
      border: 'border-purple-200',
      text: 'text-purple-700'
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-50 to-rose-100/50',
      iconBg: JUTE.warning,
      iconColor: 'text-white',
      border: 'border-rose-200',
      text: 'text-rose-700'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50',
      iconBg: '#4A7C59',
      iconColor: 'text-white',
      border: 'border-blue-200',
      text: 'text-blue-700'
    }
  };

  const theme = colors[color] || colors.jute;

  const CardWrapper = ({ children }) => {
    if (link) {
      return (
        <Link href={link} className="block cursor-pointer h-full">
          {children}
        </Link>
      );
    }
    if (onClick) {
      return (
        <button onClick={onClick} className="w-full text-left cursor-pointer h-full">
          {children}
        </button>
      );
    }
    return <div className="h-full">{children}</div>;
  };

  return (
    <CardWrapper>
      <div className={`relative overflow-hidden rounded-xl border ${theme.border} ${theme.bg} p-4 hover:shadow-lg transition-all duration-300 group h-full flex flex-col ${(link || onClick) ? 'hover:scale-[1.02]' : ''}`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-xl shadow-lg`} style={{ backgroundColor: theme.iconBg }}>
              <Icon className={`w-4 h-4 ${theme.iconColor}`} />
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-2 flex-1">
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
              <p className={`text-xs font-medium ${theme.text} uppercase tracking-wider`}>{title}</p>
              {subtitle && <p className="text-[10px] text-gray-400 mt-2">{subtitle}</p>}
            </>
          )}
        </div>

        {(link || onClick) && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

// ==================== QUICK ACTION CARD ====================

const QuickActionCard = ({ title, icon: Icon, description, href, color = 'jute' }) => {
  const colors = {
    jute: `bg-[${JUTE.secondary}] hover:bg-[${JUTE.border}] text-[${JUTE.primary}]`,
    emerald: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-50 hover:bg-amber-100 text-amber-600',
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-600'
  };

  return (
    <Link href={href} className="block">
      <div className={`flex items-center gap-3 p-3 rounded-xl bg-[${JUTE.secondary}] hover:bg-[${JUTE.border}] transition-all duration-200 hover:shadow-md`} style={{ backgroundColor: JUTE.secondary }}>
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Icon className="w-4 h-4" style={{ color: JUTE.primary }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 truncate">{description}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-400" />
      </div>
    </Link>
  );
};

// ==================== PRODUCT CARD ====================

const ProductCard = ({ product, onEdit }) => {
  const getProductName = () => {
    return product.productName || 'Unnamed Product';
  };

  const getProductCategory = () => {
    if (product.category && typeof product.category === 'object') {
      return product.category.name || 'Uncategorized';
    }
    return 'Uncategorized';
  };

  const getProductImage = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0].url || product.images[0];
    }
    return null;
  };

  const getProductPrice = () => {
    return product.pricePerUnit || 0;
  };

  const getProductMOQ = () => {
    return product.moq || 100;
  };

  const productName = getProductName();
  const productCategory = getProductCategory();
  const productImage = getProductImage();
  const productPrice = getProductPrice();
  const productMOQ = getProductMOQ();

  return (
    <div className="bg-white rounded-xl border hover:shadow-md transition-all duration-300" style={{ borderColor: JUTE.border }}>
      <div className="aspect-square bg-[#FAF7F2] relative rounded-t-xl overflow-hidden">
        {productImage ? (
          <img 
            src={productImage} 
            alt={productName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/200?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-12 h-12" style={{ color: JUTE.textLight }} />
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate" style={{ fontFamily: 'Playfair Display, serif' }} title={productName}>
          {productName}
        </h3>
        <p className="text-xs text-gray-500 mt-1 truncate" title={productCategory}>
          {productCategory}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="font-semibold" style={{ color: JUTE.primary }}>{formatPrice(productPrice)}</p>
          </div>
          <p className="text-xs text-gray-500">MOQ: {productMOQ} pcs</p>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs rounded-lg transition-colors"
            style={{ backgroundColor: JUTE.secondary, color: JUTE.primary }}
          >
            <Edit className="w-3 h-3" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== INQUIRY CARD (MODERATOR VIEW) ====================

// ==================== INQUIRY CARD (MODERATOR VIEW) ====================

const ModeratorInquiryCard = ({ inquiry }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getCompanyName = () => {
    return inquiry.userDetails?.companyName || 
           inquiry.customer?.companyName || 
           'N/A';
  };

  const getContactPerson = () => {
    return inquiry.userDetails?.contactPerson || 
           inquiry.customer?.contactPerson || 
           'N/A';
  };

  const getWhatsApp = () => {
    return inquiry.userDetails?.whatsapp || 
           inquiry.customer?.whatsapp || 
           null;
  };

  const getItems = () => {
    return inquiry.items || [];
  };

  // Helper function to get unit label
  const getUnitLabel = (orderUnit) => {
    switch(orderUnit) {
      case 'kg': return 'kg';
      case 'ton': return 'MT';
      default: return 'pcs';
    }
  };

  // Format quantity with its unit
  const formatQuantity = (item) => {
    const unit = getUnitLabel(item.orderUnit);
    const quantity = item.totalQuantity || 0;
    return `${quantity} ${unit}`;
  };

  // Calculate total quantity with proper unit display (if all items have same unit)
  const getTotalQuantityDisplay = () => {
    const items = getItems();
    if (items.length === 0) return '0 pcs';
    
    // Check if all items have the same unit
    const firstUnit = items[0]?.orderUnit;
    const allSameUnit = items.every(item => item.orderUnit === firstUnit);
    
    if (allSameUnit && firstUnit) {
      const totalQty = items.reduce((sum, item) => sum + (item.totalQuantity || 0), 0);
      const unitLabel = getUnitLabel(firstUnit);
      return `${totalQty} ${unitLabel}`;
    }
    
    // If different units, show as "X items"
    return `${items.length} items`;
  };

  const getSubtotal = () => {
    return inquiry.subtotal || 0;
  };

  const items = getItems();
  const totalQuantityDisplay = getTotalQuantityDisplay();

  return (
    <div className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow" style={{ borderColor: JUTE.border }}>
      <div className="px-4 py-3 border-b" style={{ backgroundColor: JUTE.secondary, borderColor: JUTE.border }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md" style={{ backgroundColor: JUTE.primary }}>
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>{inquiry.inquiryNumber || 'N/A'}</h3>
                <InquiryStatusBadge status={inquiry.status} />
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mt-0.5">
                <span>{formatDate(inquiry.createdAt)}</span>
                <span>•</span>
                <span>{items.length} products</span>
                <span>•</span>
                <span>{totalQuantityDisplay}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors"
            style={{ backgroundColor: JUTE.background, color: JUTE.text }}
          >
            <Eye className="w-3.5 h-3.5" />
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
          <div className="flex items-center gap-1.5" style={{ color: JUTE.text }}>
            <Building2 className="w-3.5 h-3.5" style={{ color: JUTE.primary }} />
            <span className="truncate">{getCompanyName()}</span>
          </div>
          <div className="flex items-center gap-1.5" style={{ color: JUTE.text }}>
            <User className="w-3.5 h-3.5" style={{ color: JUTE.primary }} />
            <span className="truncate">{getContactPerson()}</span>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="p-4 border-b" style={{ borderColor: JUTE.border, backgroundColor: JUTE.background }}>
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-700 mb-2">Products</h4>
            <div className="space-y-2">
              {items.map((product, idx) => {
                const unitLabel = getUnitLabel(product.orderUnit);
                const quantity = product.totalQuantity || 0;
                const isWeightBased = product.orderUnit === 'kg' || product.orderUnit === 'ton';
                
                return (
                  <div key={idx} className="bg-white rounded-lg p-3 border" style={{ borderColor: JUTE.border }}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium text-gray-900">
                          {product.productName || 'Product'}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Unit: {unitLabel === 'pcs' ? 'Pieces' : unitLabel.toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold" style={{ color: JUTE.primary }}>
                          {quantity} {unitLabel}
                        </p>
                      </div>
                    </div>
                    
                    {/* Show color details if available */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="mt-2 pt-2 border-t" style={{ borderColor: JUTE.border }}>
                        <p className="text-[10px] text-gray-500 mb-1">Color Details:</p>
                        <div className="space-y-1">
                          {product.colors.map((color, cIdx) => {
                            let colorQuantity = 0;
                            if (isWeightBased) {
                              colorQuantity = color.quantity || color.totalQuantity || color.totalForColor || 0;
                            } else {
                              colorQuantity = color.sizeQuantities?.reduce((sum, sq) => sum + (sq.quantity || 0), 0) || 0;
                            }
                            
                            if (colorQuantity === 0) return null;
                            
                            return (
                              <div key={cIdx} className="flex items-center gap-2 text-[10px]">
                                <div 
                                  className="w-3 h-3 rounded-full border border-gray-200"
                                  style={{ backgroundColor: color.color?.code || '#CCCCCC' }}
                                />
                                <span className="text-gray-600">
                              {colorQuantity} {unitLabel}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-2" style={{ backgroundColor: JUTE.background }}>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-gray-500">Total Value:</span>
          <span className="font-semibold" style={{ color: JUTE.primary }}>{formatPrice(getSubtotal())}</span>
        </div>
        
        {getWhatsApp() && (
          <button
            onClick={() => window.open(`https://wa.me/${getWhatsApp().replace(/[^0-9+]/g, '')}`, '_blank')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors"
            style={{ backgroundColor: '#25D366', color: 'white' }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Customer
          </button>
        )}
      </div>
    </div>
  );
};
// ==================== MAIN MODERATOR DASHBOARD ====================

export default function ModeratorDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterType, setFilterType] = useState('month');
  
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInquiries: 0,
    pendingQuotations: 0,
    pendingInvoices: 0,
    submitted: 0,
    quoted: 0,
    accepted: 0,
    invoiced: 0,
    cancelled: 0
  });

  const router = useRouter();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      let statsUrl = 'http://localhost:5000/api/moderator/inquiries?limit=10000';
      let recentUrl = 'http://localhost:5000/api/moderator/inquiries?limit=10';
      
      if (filterType === 'month') {
        statsUrl += `&year=${selectedYear}&month=${selectedMonth + 1}`;
        recentUrl += `&year=${selectedYear}&month=${selectedMonth + 1}`;
      } else if (filterType === 'year') {
        statsUrl += `&year=${selectedYear}`;
        recentUrl += `&year=${selectedYear}`;
      }

      const statsResponse = await fetch(statsUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const statsData = await statsResponse.json();

      const recentResponse = await fetch(recentUrl, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const recentData = await recentResponse.json();
      
      const productsResponse = await fetch('http://localhost:5000/api/products?limit=1000&includeInactive=true', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const productsData = await productsResponse.json();

      if (statsData.success) {
        const apiStats = statsData.data?.stats || [];
        
        const submittedCount = apiStats.find(s => s._id === 'submitted')?.count || 0;
        const quotedCount = apiStats.find(s => s._id === 'quoted')?.count || 0;
        const acceptedCount = apiStats.find(s => s._id === 'accepted')?.count || 0;
        const invoicedCount = apiStats.find(s => s._id === 'invoiced')?.count || 0;
        const paidCount = apiStats.find(s => s._id === 'paid')?.count || 0;
        const cancelledCount = apiStats.find(s => s._id === 'cancelled')?.count || 0;
        
        const totalInquiries = statsData.data?.pagination?.total || 0;
        const pendingQuotations = submittedCount;
        const pendingInvoices = acceptedCount;

        setStats({
          totalProducts: productsData.pagination?.total || productsData.data?.length || 0,
          totalInquiries,
          pendingQuotations,
          pendingInvoices,
          submitted: submittedCount,
          quoted: quotedCount,
          accepted: acceptedCount,
          invoiced: invoicedCount,
          paid: paidCount,
          cancelled: cancelledCount
        });
      }

      if (recentData.success) {
        setInquiries(recentData.data?.inquiries || []);
      }

      if (productsData.success) {
        setProducts(productsData.data || []);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [filterType, selectedMonth, selectedYear]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const handleMonthChange = (increment) => {
    let newMonth = selectedMonth + increment;
    let newYear = selectedYear;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear = selectedYear - 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear = selectedYear + 1;
    }
    
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setFilterType('month');
  };

  const handleYearChange = (increment) => {
    setSelectedYear(selectedYear + increment);
    setFilterType('year');
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
  };

  const handleEditProduct = (product) => {
    router.push(`/moderator/editProduct?id=${product._id}`);
  };

  const handleAddProduct = () => {
    router.push('/moderator/products/new');
  };

  const getFilterDisplayText = () => {
    if (filterType === 'all') {
      return 'All Time';
    } else if (filterType === 'year') {
      return `Year: ${selectedYear}`;
    } else {
      return `${getMonthName(selectedMonth)} ${selectedYear}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: JUTE.background }}>
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: JUTE.primary }} />
          <p className="text-sm text-gray-500">Loading moderator dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: JUTE.background }}>
      {/* Header */}
      <div className="bg-white border-b sticky top-20 z-10" style={{ borderColor: JUTE.border }}>
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: JUTE.text, fontFamily: 'Playfair Display, serif' }}>Moderator Dashboard</h1>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-0.5">
                Manage products and view inquiries
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <div className="flex items-center gap-0.5 sm:gap-1 border rounded-lg overflow-hidden" style={{ borderColor: JUTE.border }}>
                <button
                  onClick={() => handleFilterTypeChange('all')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors ${
                    filterType === 'all' 
                      ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  style={filterType === 'all' ? { backgroundColor: JUTE.primary } : {}}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterTypeChange('year')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors ${
                    filterType === 'year' 
                      ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  style={filterType === 'year' ? { backgroundColor: JUTE.primary } : {}}
                >
                  Year
                </button>
                <button
                  onClick={() => handleFilterTypeChange('month')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium transition-colors ${
                    filterType === 'month' 
                      ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  style={filterType === 'month' ? { backgroundColor: JUTE.primary } : {}}
                >
                  Month
                </button>
              </div>

              {filterType === 'month' && (
                <div className="flex items-center gap-0.5 sm:gap-1 border rounded-lg overflow-hidden" style={{ borderColor: JUTE.border }}>
                  <button
                    onClick={() => handleMonthChange(-1)}
                    className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium bg-white text-gray-700 border-x whitespace-nowrap" style={{ borderColor: JUTE.border }}>
                    {getMonthName(selectedMonth)} {selectedYear}
                  </span>
                  <button
                    onClick={() => handleMonthChange(1)}
                    className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              )}

              {filterType === 'year' && (
                <div className="flex items-center gap-0.5 sm:gap-1 border rounded-lg overflow-hidden" style={{ borderColor: JUTE.border }}>
                  <button
                    onClick={() => handleYearChange(-1)}
                    className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <span className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium bg-white text-gray-700 border-x" style={{ borderColor: JUTE.border }}>
                    {selectedYear}
                  </span>
                  <button
                    onClick={() => handleYearChange(1)}
                    className="px-1.5 sm:px-2 py-1 sm:py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              )}

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-sm rounded-lg transition-colors"
                style={{ backgroundColor: JUTE.secondary, color: JUTE.text }}
              >
                <RefreshCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden xs:inline">Refresh</span>
              </button>
              
              <button
                onClick={() => router.push('/moderator/settings')}
                className="p-1.5 sm:p-2 rounded-lg transition-colors"
                style={{ color: JUTE.text }}
              >
                <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500 mt-2 flex items-center gap-1">
            <CalendarRange className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Showing data for: <span className="font-medium" style={{ color: JUTE.primary }}>{getFilterDisplayText()}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={Package}
            color="blue"
            subtitle="In catalog"
            link="/moderator/all-products"
          />
          <StatCard
            title="Total Inquiries"
            value={stats.totalInquiries}
            icon={Inbox}
            color="purple"
            subtitle={`${filterType !== 'all' ? getFilterDisplayText() : 'All time'}`}
            link="/moderator/inquiries"
          />
          <StatCard
            title="Pending Quotations"
            value={stats.pendingQuotations}
            icon={Clock}
            color="amber"
            subtitle="Awaiting quote"
            link="/moderator/inquiries?filter=submitted"
          />
          <StatCard
            title="Quoted"
            value={stats.quoted}
            icon={FileText}
            color="blue"
            subtitle="Awaiting customer"
            link="/moderator/inquiries?filter=quoted"
          />
          <StatCard
            title="Pending Invoices"
            value={stats.pendingInvoices}
            icon={CreditCard}
            color="rose"
            subtitle="Ready to invoice"
            link="/moderator/inquiries?filter=accepted"
          />
          <StatCard
            title="Invoiced"
            value={stats.invoiced}
            icon={CheckCircle}
            color="emerald"
            subtitle="Invoices sent"
            link="/moderator/inquiries?filter=invoiced"
          />
        </div>

        {/* Recent Products */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              <Package className="w-4 h-4" style={{ color: JUTE.primary }} />
              Recent Products
            </h2>
            <Link 
              href="/moderator/all-products" 
              className="text-xs font-medium flex items-center gap-1" 
              style={{ color: JUTE.primary }}
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {products.slice(0, 5).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleEditProduct}
              />
            ))}
            {products.length === 0 && (
              <div className="col-span-full p-8 text-center bg-white rounded-xl border" style={{ borderColor: JUTE.border }}>
                <Package className="w-12 h-12 mx-auto mb-3" style={{ color: JUTE.textLight }} />
                <p className="text-sm text-gray-500">No products yet</p>
                <button
                  onClick={handleAddProduct}
                  className="mt-2 text-xs font-medium"
                  style={{ color: JUTE.primary }}
                >
                  Add your first product
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              <Inbox className="w-4 h-4" style={{ color: JUTE.primary }} />
              Recent Inquiries
            </h2>
            <Link 
              href="/moderator/inquiries" 
              className="text-xs font-medium flex items-center gap-1" 
              style={{ color: JUTE.primary }}
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {inquiries.slice(0, 5).map((inquiry) => (
              <ModeratorInquiryCard
                key={inquiry._id}
                inquiry={inquiry}
              />
            ))}
            {inquiries.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border" style={{ borderColor: JUTE.border }}>
                <Inbox className="w-12 h-12 mx-auto mb-3" style={{ color: JUTE.textLight }} />
                <p className="text-sm text-gray-500">No inquiries yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            <Zap className="w-4 h-4" style={{ color: JUTE.primary }} />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickActionCard
              title="Add New Product"
              description="Create product listing"
              icon={PlusCircle}
              href="/moderator/create-products"
              color="jute"
            />
            <QuickActionCard
              title="Manage Products"
              description="Edit or update products"
              icon={Package}
              href="/moderator/all-products"
              color="jute"
            />
            <QuickActionCard
              title="View Inquiries"
              description="Check customer requests"
              icon={Inbox}
              href="/moderator/inquiries"
              color="jute"
            />
            <QuickActionCard
              title="Create Blog"
              description="Create blog posts"
              icon={FileText}
              href="/moderator/create-blog"
              color="jute"
            />
          </div>
        </div>
      </div>
    </div>
  );
}