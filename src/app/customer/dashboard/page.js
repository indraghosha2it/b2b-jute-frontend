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
  Edit,
  ShoppingCart,
  Receipt,
  Bell,
  HelpCircle,
  LogOut,
  Home,
  Copy,
  Check,
  X,
  AlertOctagon,
  TrendingUp as TrendUp,
  TrendingDown as TrendDown,
  Clock as ClockIcon,
  FileCheck,
  FileClock,
  FileSearch,
  BadgeCheck,
  BadgeX,
  Banknote,
  CalendarDays,
  Sparkles,
  Hash,
  ChevronsLeft,
  ChevronsRight,
  Paperclip
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
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price || 0);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
};

const getMonthName = (monthIndex) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[monthIndex];
};

const isInvoiceExpired = (invoice) => {
  if (invoice.paymentStatus === 'paid' || invoice.paymentStatus === 'cancelled') {
    return false;
  }
  const today = new Date();
  const dueDate = new Date(invoice.dueDate);
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < today;
};

const getDueAmount = (invoice) => {
  return (invoice.finalTotal || 0) - (invoice.amountPaid || 0);
};

const getOverdueDays = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  const diffTime = today - due;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Helper function to get unit label
const getUnitLabel = (orderUnit) => {
  switch(orderUnit) {
    case 'kg': return 'kg';
    case 'ton': return 'MT';
    default: return 'pcs';
  }
};

// ==================== STATUS BADGES ====================

const InquiryStatusBadge = ({ status }) => {
  const config = {
    submitted: { 
      bg: 'bg-amber-100', 
      text: 'text-amber-700', 
      label: 'New', 
      icon: Clock,
      iconColor: 'text-amber-600',
      dot: 'bg-amber-500'
    },
    quoted: { 
      bg: 'bg-blue-100', 
      text: 'text-blue-700', 
      label: 'Quoted', 
      icon: FileText,
      iconColor: 'text-blue-600',
      dot: 'bg-blue-500'
    },
    accepted: { 
      bg: 'bg-emerald-100', 
      text: 'text-emerald-700', 
      label: 'Accepted', 
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      dot: 'bg-emerald-500'
    },
    invoiced: { 
      bg: 'bg-purple-100', 
      text: 'text-purple-700', 
      label: 'Invoiced', 
      icon: Receipt,
      iconColor: 'text-purple-600',
      dot: 'bg-purple-500'
    },
    paid: { 
      bg: 'bg-green-100', 
      text: 'text-green-700', 
      label: 'Paid', 
      icon: CheckCircle,
      iconColor: 'text-green-600',
      dot: 'bg-green-500'
    },
    cancelled: { 
      bg: 'bg-rose-100', 
      text: 'text-rose-700', 
      label: 'Cancelled', 
      icon: XCircle,
      iconColor: 'text-rose-600',
      dot: 'bg-rose-500'
    }
  };

  const statusKey = status?.toLowerCase() || 'submitted';
  const { bg, text, label, dot } = config[statusKey] || config.submitted;

  return (
    <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full ${bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`}></span>
      <span className={`text-[8px] sm:text-[10px] font-medium ${text}`}>{label}</span>
    </div>
  );
};

const PaymentStatusBadge = ({ status, isExpired = false }) => {
  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-orange-100">
        <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-600" />
        <span className="text-[8px] sm:text-[10px] font-medium text-orange-700">Overdue</span>
      </div>
    );
  }

  const config = {
    paid: { 
      bg: 'bg-emerald-100', 
      text: 'text-emerald-700', 
      label: 'Paid', 
      icon: CheckCircle,
      iconColor: 'text-emerald-600'
    },
    partial: { 
      bg: 'bg-blue-100', 
      text: 'text-blue-700', 
      label: 'Partial', 
      icon: TrendingUp,
      iconColor: 'text-blue-600'
    },
    unpaid: { 
      bg: 'bg-amber-100', 
      text: 'text-amber-700', 
      label: 'Unpaid', 
      icon: AlertCircle,
      iconColor: 'text-amber-600'
    },
    overpaid: { 
      bg: 'bg-purple-100', 
      text: 'text-purple-700', 
      label: 'Overpaid', 
      icon: TrendingDown,
      iconColor: 'text-purple-600'
    },
    cancelled: { 
      bg: 'bg-rose-100', 
      text: 'text-rose-700', 
      label: 'Cancelled', 
      icon: XCircle,
      iconColor: 'text-rose-600'
    }
  };

  const statusKey = status?.toLowerCase() || 'unpaid';
  const { bg, text, label, icon: Icon, iconColor } = config[statusKey] || config.unpaid;

  return (
    <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full ${bg}`}>
      <Icon className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${iconColor}`} />
      <span className={`text-[8px] sm:text-[10px] font-medium ${text}`}>{label}</span>
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
  trend,
  trendValue,
  onClick,
  link,
  loading = false
}) => {
  const colors = {
    jute: {
      bg: 'bg-gradient-to-br from-amber-50/80 to-[#FAF7F2]',
      iconBg: JUTE.primary,
      iconColor: 'text-white',
      border: 'border-[#E5D5C0]',
      text: 'text-[#6B4F3A]',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
      iconBg: JUTE.accent,
      iconColor: 'text-white',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50',
      iconBg: JUTE.accentLight,
      iconColor: 'text-white',
      border: 'border-amber-200',
      text: 'text-amber-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100/50',
      iconBg: '#8B6B51',
      iconColor: 'text-white',
      border: 'border-purple-200',
      text: 'text-purple-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-50 to-rose-100/50',
      iconBg: JUTE.warning,
      iconColor: 'text-white',
      border: 'border-rose-200',
      text: 'text-rose-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100/50',
      iconBg: JUTE.accent,
      iconColor: 'text-white',
      border: 'border-blue-200',
      text: 'text-blue-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
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
      <div className={`relative overflow-hidden rounded-xl sm:rounded-2xl border ${theme.border} ${theme.bg} p-3 sm:p-5 hover:shadow-md sm:hover:shadow-lg transition-all duration-300 group h-full flex flex-col ${(link || onClick) ? 'hover:scale-[1.01] sm:hover:scale-[1.02]' : ''}`}>
        <div className="absolute top-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-12 sm:w-16 h-12 sm:h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl shadow-md sm:shadow-lg`} style={{ backgroundColor: theme.iconBg }}>
              <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${theme.iconColor}`} />
            </div>
            {trend !== undefined && (
              <div className={`flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg bg-white/60 backdrop-blur-sm ${
                trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-rose-600' : 'text-gray-500'
              }`}>
                {trend > 0 ? <ArrowUpRight className="w-2 h-2 sm:w-3 sm:h-3" /> : 
                 trend < 0 ? <ArrowDownRight className="w-2 h-2 sm:w-3 sm:h-3" /> : 
                 <Minus className="w-2 h-2 sm:w-3 sm:h-3" />}
                <span className="text-[8px] sm:text-xs font-medium">
                  {trend > 0 ? '+' : ''}{trendValue || `${trend}%`}
                </span>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="space-y-1 sm:space-y-2 flex-1">
              <div className="h-5 sm:h-8 w-16 sm:w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-3 sm:h-4 w-20 sm:w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : (
            <>
              <p className="text-lg sm:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-1">{value}</p>
              <p className={`text-[8px] sm:text-xs font-medium uppercase tracking-wider`} style={{ color: JUTE.primary }}>{title}</p>
              {subtitle && <p className="text-[8px] text-gray-400 mt-1 sm:mt-2">{subtitle}</p>}
            </>
          )}
        </div>

        {(link || onClick) && (
          <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

// ==================== QUICK ACTION CARD ====================

const QuickActionCard = ({ title, icon: Icon, description, href }) => {
  return (
    <Link href={href} className="block">
      <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-200 hover:shadow-sm sm:hover:shadow-md" style={{ backgroundColor: JUTE.secondary }}>
        <div className="p-1.5 sm:p-2 bg-white rounded-md sm:rounded-lg shadow-sm">
          <Icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: JUTE.primary }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{title}</p>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate">{description}</p>
        </div>
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
      </div>
    </Link>
  );
};

// ==================== MAIN CUSTOMER DASHBOARD ====================

export default function CustomerDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState(null);
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterType, setFilterType] = useState('month');
  
  const [inquiries, setInquiries] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [stats, setStats] = useState({
    totalInquiries: 0,
    submitted: 0,
    quoted: 0,
    accepted: 0,
    invoiced: 0,
    paid: 0,
    cancelled: 0,
    totalInvoices: 0,
    paidInvoices: 0,
    unpaidInvoices: 0,
    partialInvoices: 0,
    overdueInvoices: 0,
    totalSpent: 0,
    expiredInvoices: 0,
    pendingAmount: 0
  });

  const router = useRouter();

  const filterDataByDate = (items, type) => {
    if (filterType === 'all') return items;
    
    return items.filter(item => {
      const itemDate = new Date(type === 'inquiry' ? item.createdAt : item.invoiceDate);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth();
      
      if (filterType === 'year') {
        return itemYear === selectedYear;
      } else if (filterType === 'month') {
        return itemYear === selectedYear && itemMonth === selectedMonth;
      }
      return true;
    });
  };

  const calculateStats = (inquiriesList, invoicesList) => {
    const submitted = inquiriesList.filter(i => i.status === 'submitted').length;
    const quoted = inquiriesList.filter(i => i.status === 'quoted').length;
    const accepted = inquiriesList.filter(i => i.status === 'accepted').length;
    const invoiced = inquiriesList.filter(i => i.status === 'invoiced').length;
    const paid = inquiriesList.filter(i => i.status === 'paid').length;
    const cancelled = inquiriesList.filter(i => i.status === 'cancelled').length;

    const paidInvoices = invoicesList.filter(i => i.paymentStatus === 'paid').length;
    const unpaidInvoices = invoicesList.filter(i => i.paymentStatus === 'unpaid').length;
    const partialInvoices = invoicesList.filter(i => i.paymentStatus === 'partial').length;
    const overdueInvoices = invoicesList.filter(i => {
      if (i.paymentStatus === 'paid' || i.paymentStatus === 'cancelled') return false;
      const today = new Date();
      const dueDate = new Date(i.dueDate);
      today.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    }).length;

    const totalSpent = invoicesList
      .filter(i => i.paymentStatus === 'paid')
      .reduce((sum, i) => sum + (i.finalTotal || 0), 0);

    const pendingAmount = invoicesList
      .filter(i => i.paymentStatus === 'unpaid' || i.paymentStatus === 'partial')
      .reduce((sum, i) => {
        const dueAmount = (i.finalTotal || 0) - (i.amountPaid || 0);
        return sum + dueAmount;
      }, 0);
    
    const expiredInvoices = invoicesList.filter(inv => {
      if (inv.paymentStatus === 'paid' || 
          inv.paymentStatus === 'cancelled' || 
          inv.paymentStatus === 'overpaid') {
        return false;
      }
      const today = new Date();
      const dueDate = new Date(inv.dueDate);
      today.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today;
    }).length;

    setStats({
      totalInquiries: inquiriesList.length,
      submitted,
      quoted,
      accepted,
      invoiced,
      paid,
      cancelled,
      totalInvoices: invoicesList.length,
      paidInvoices,
      unpaidInvoices,
      partialInvoices,
      overdueInvoices,
      totalSpent,
      expiredInvoices,
      pendingAmount
    });
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const userStr = localStorage.getItem('user');
      if (userStr) {
        setUser(JSON.parse(userStr));
      }

      const inquiriesResponse = await fetch('http://localhost:5000/api/inquiries/my-inquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const inquiriesData = await inquiriesResponse.json();
      
      const invoicesResponse = await fetch('http://localhost:5000/api/invoices/my-invoices', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const invoicesData = await invoicesResponse.json();

      let inquiriesList = [];
      let invoicesList = [];

      if (inquiriesData.success) {
        inquiriesList = inquiriesData.data || [];
        setInquiries(inquiriesList);
        setFilteredInquiries(filterDataByDate(inquiriesList, 'inquiry'));
      }

      if (invoicesData.success) {
        invoicesList = invoicesData.data || [];
        setInvoices(invoicesList);
        setFilteredInvoices(filterDataByDate(invoicesList, 'invoice'));
      }

      calculateStats(
        filterDataByDate(inquiriesList, 'inquiry'),
        filterDataByDate(invoicesList, 'invoice')
      );

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
  }, []);

  useEffect(() => {
    const filteredInq = filterDataByDate(inquiries, 'inquiry');
    const filteredInv = filterDataByDate(invoices, 'invoice');
    
    setFilteredInquiries(filteredInq);
    setFilteredInvoices(filteredInv);
    calculateStats(filteredInq, filteredInv);
  }, [filterType, selectedMonth, selectedYear, inquiries, invoices]);

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

  const handleCancelInquiry = async (inquiryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/inquiries/${inquiryId}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Inquiry cancelled successfully');
        fetchDashboardData();
      } else {
        toast.error(data.error || 'Failed to cancel inquiry');
      }
    } catch (error) {
      toast.error('Failed to cancel inquiry');
    }
  };

  const handleAcceptQuote = async (inquiryId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/inquiries/${inquiryId}/accept`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Quote accepted successfully');
        fetchDashboardData();
      } else {
        toast.error(data.error || 'Failed to accept quote');
      }
    } catch (error) {
      toast.error('Failed to accept quote');
    }
  };

  const handleViewInvoice = (invoiceId) => {
    router.push(`/customer/viewInvoice?invoiceId=${invoiceId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
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
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: JUTE.background }}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin mx-auto mb-3 sm:mb-4" style={{ color: JUTE.primary }} />
          <p className="text-xs sm:text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: JUTE.background }}>
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10" style={{ borderColor: JUTE.border }}>
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-2 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm sm:shadow-md flex-shrink-0" style={{ backgroundColor: JUTE.primary }}>
                <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-2xl font-bold" style={{ color: JUTE.text, fontFamily: 'Playfair Display, serif' }}>My Dashboard</h1>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0 sm:mt-0.5 truncate max-w-[150px] sm:max-w-none">
                  Welcome back, {user?.companyName || user?.contactPerson || 'Customer'}!
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
              <div className="flex items-center gap-px sm:gap-1 border rounded-lg overflow-hidden flex-shrink-0" style={{ borderColor: JUTE.border }}>
                <button
                  onClick={() => handleFilterTypeChange('all')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors ${
                    filterType === 'all' 
                      ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  style={filterType === 'all' ? { backgroundColor: JUTE.primary } : {}}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterTypeChange('year')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors ${
                    filterType === 'year' 
                      ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  style={filterType === 'year' ? { backgroundColor: JUTE.primary } : {}}
                >
                  Year
                </button>
                <button
                  onClick={() => handleFilterTypeChange('month')}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors ${
                    filterType === 'month' 
                      ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  style={filterType === 'month' ? { backgroundColor: JUTE.primary } : {}}
                >
                  Month
                </button>
              </div>

              {filterType === 'month' && (
                <div className="flex items-center gap-px sm:gap-1 border rounded-lg overflow-hidden flex-shrink-0" style={{ borderColor: JUTE.border }}>
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
                <div className="flex items-center gap-px sm:gap-1 border rounded-lg overflow-hidden flex-shrink-0" style={{ borderColor: JUTE.border }}>
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
                className="flex items-center gap-1 px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-sm rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
                style={{ backgroundColor: JUTE.secondary, color: JUTE.text }}
              >
                <RefreshCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button
                onClick={handleLogout}
                className="p-1 sm:p-2 rounded-lg transition-colors flex-shrink-0"
                style={{ color: JUTE.text }}
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 flex items-center gap-1">
            <CalendarRange className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            Showing: <span className="font-medium" style={{ color: JUTE.primary }}>{getFilterDisplayText()}</span>
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-3 mt-2 sm:mt-4">
            <div className="rounded-lg sm:rounded-xl p-2 sm:p-3 border" style={{ backgroundColor: JUTE.secondary, borderColor: JUTE.border }}>
              <p className="text-[8px] sm:text-xs mb-0.5 sm:mb-1" style={{ color: JUTE.primary }}>Inquiries</p>
              <p className="text-sm sm:text-2xl font-bold text-gray-900">{stats.totalInquiries}</p>
              <p className="text-[8px] text-gray-500 mt-0.5 sm:mt-1">{stats.submitted} new</p>
            </div>
            <div className="rounded-lg sm:rounded-xl p-2 sm:p-3 border" style={{ backgroundColor: JUTE.secondary, borderColor: JUTE.border }}>
              <p className="text-[8px] sm:text-xs mb-0.5 sm:mb-1" style={{ color: JUTE.primary }}>Quotes</p>
              <p className="text-sm sm:text-2xl font-bold text-gray-900">{stats.quoted}</p>
              <p className="text-[8px] text-gray-500 mt-0.5 sm:mt-1">{stats.accepted} accepted</p>
            </div>
            <div className="rounded-lg sm:rounded-xl p-2 sm:p-3 border" style={{ backgroundColor: JUTE.secondary, borderColor: JUTE.border }}>
              <p className="text-[8px] sm:text-xs mb-0.5 sm:mb-1" style={{ color: JUTE.primary }}>Invoices</p>
              <p className="text-sm sm:text-2xl font-bold text-gray-900">{stats.totalInvoices}</p>
              <p className="text-[8px] text-gray-500 mt-0.5 sm:mt-1">{stats.paidInvoices} paid</p>
            </div>
            <div className="rounded-lg sm:rounded-xl p-2 sm:p-3 border" style={{ backgroundColor: JUTE.secondary, borderColor: JUTE.border }}>
              <p className="text-[8px] sm:text-xs mb-0.5 sm:mb-1" style={{ color: JUTE.primary }}>Spent</p>
              <p className="text-sm sm:text-2xl font-bold text-gray-900">{formatPrice(stats.totalSpent)}</p>
              <p className="text-[8px] text-gray-500 mt-0.5 sm:mt-1">Due: {formatPrice(stats.pendingAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-3 sm:py-6">
        {/* Activity Summary Section */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg" style={{ backgroundColor: `${JUTE.primary}10` }}>
              <Activity className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: JUTE.primary }} />
            </div>
            <h2 className="text-xs sm:text-sm font-semibold text-gray-700">Activity Summary</h2>
            {filterType !== 'all' && (
              <span className="text-[8px] sm:text-[10px] text-gray-400 bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded-full">
                Filtered
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {/* Inquiry Status Card */}
            <div className="bg-white rounded-lg sm:rounded-xl border overflow-hidden hover:shadow-sm transition-shadow" style={{ borderColor: JUTE.border }}>
              <div className="px-3 sm:px-4 py-2 sm:py-3 border-b" style={{ backgroundColor: JUTE.secondary, borderColor: JUTE.border }}>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg" style={{ backgroundColor: JUTE.accentLight }}>
                    <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Inquiry Status</h3>
                </div>
              </div>
              <div className="p-2 sm:p-4">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
                  <div className="rounded-lg p-2 sm:p-3 border" style={{ backgroundColor: JUTE.background, borderColor: JUTE.border }}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" style={{ color: JUTE.accentLight }} />
                      <span className="text-[8px] sm:text-xs text-gray-600">New</span>
                    </div>
                    <p className="text-sm sm:text-xl font-bold" style={{ color: JUTE.accentLight }}>{stats.submitted}</p>
                  </div>
                  <div className="rounded-lg p-2 sm:p-3 border" style={{ backgroundColor: JUTE.background, borderColor: JUTE.border }}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <FileText className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-blue-600" />
                      <span className="text-[8px] sm:text-xs text-gray-600">Quoted</span>
                    </div>
                    <p className="text-sm sm:text-xl font-bold text-blue-600">{stats.quoted}</p>
                  </div>
                  <div className="col-span-2 rounded-lg p-2 sm:p-3 border" style={{ backgroundColor: JUTE.background, borderColor: JUTE.border }}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <CheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" style={{ color: JUTE.accent }} />
                      <span className="text-[8px] sm:text-xs text-gray-600">Accepted</span>
                    </div>
                    <p className="text-sm sm:text-xl font-bold" style={{ color: JUTE.accent }}>{stats.accepted}</p>
                  </div>
                  <div className="col-span-2 rounded-lg p-2 sm:p-3 border" style={{ backgroundColor: JUTE.background, borderColor: JUTE.border }}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <Receipt className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-purple-600" />
                      <span className="text-[8px] sm:text-xs text-gray-600">Invoiced</span>
                    </div>
                    <p className="text-sm sm:text-xl font-bold text-purple-600">{stats.invoiced}</p>
                  </div>
                  <div className="col-span-2 rounded-lg p-2 sm:p-3 border" style={{ backgroundColor: JUTE.background, borderColor: JUTE.border }}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <XCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-rose-600" />
                      <span className="text-[8px] sm:text-xs text-gray-600">Cancelled</span>
                    </div>
                    <p className="text-sm sm:text-xl font-bold text-rose-600">{stats.cancelled}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Status Card */}
            <div className="bg-white rounded-lg sm:rounded-xl border overflow-hidden hover:shadow-sm transition-shadow" style={{ borderColor: JUTE.border }}>
              <div className="px-3 sm:px-4 py-2 sm:py-3 border-b" style={{ backgroundColor: JUTE.secondary, borderColor: JUTE.border }}>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg" style={{ backgroundColor: JUTE.primary }}>
                    <CreditCard className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900">Payment Status</h3>
                </div>
              </div>
              <div className="p-2 sm:p-4">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
                  <div className="rounded-lg p-2 sm:p-3 border" style={{ backgroundColor: JUTE.background, borderColor: JUTE.border }}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <CheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" style={{ color: JUTE.accent }} />
                      <span className="text-[8px] sm:text-xs text-gray-600">Paid</span>
                    </div>
                    <p className="text-sm sm:text-xl font-bold" style={{ color: JUTE.accent }}>{stats.paidInvoices}</p>
                  </div>
                  <div className="rounded-lg p-2 sm:p-3 border" style={{ backgroundColor: JUTE.background, borderColor: JUTE.border }}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <TrendingUp className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-blue-600" />
                      <span className="text-[8px] sm:text-xs text-gray-600">Partial</span>
                    </div>
                    <p className="text-sm sm:text-xl font-bold text-blue-600">{stats.partialInvoices}</p>
                  </div>
                  <div className="rounded-lg p-2 sm:p-3 border" style={{ backgroundColor: JUTE.background, borderColor: JUTE.border }}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <AlertCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-600" />
                      <span className="text-[8px] sm:text-xs text-gray-600">Unpaid</span>
                    </div>
                    <p className="text-sm sm:text-xl font-bold text-amber-600">{stats.unpaidInvoices}</p>
                  </div>
                  <div className="rounded-lg p-2 sm:p-3 border" style={{ backgroundColor: JUTE.background, borderColor: JUTE.border }}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
                      <Clock className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-orange-600" />
                      <span className="text-[8px] sm:text-xs text-gray-600">Overdue</span>
                    </div>
                    <p className="text-sm sm:text-xl font-bold text-orange-600">{stats.overdueInvoices}</p>
                  </div>
                  <div className="col-span-2 rounded-lg p-2 sm:p-3 border" style={{ backgroundColor: JUTE.background, borderColor: JUTE.border }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="p-1 sm:p-1.5 rounded-full" style={{ backgroundColor: `${JUTE.warning}20` }}>
                          <AlertOctagon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: JUTE.warning }} />
                        </div>
                        <div>
                          <p className="text-[8px] sm:text-xs font-semibold text-gray-700">Expired</p>
                          <p className="text-[6px] sm:text-[10px] text-gray-500">Past due</p>
                        </div>
                      </div>
                      <p className="text-base sm:text-2xl font-bold" style={{ color: JUTE.warning }}>{stats.expiredInvoices}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="mt-2 sm:mt-4 pt-2 border-t" style={{ borderColor: JUTE.border }}>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
                    <div className="rounded-lg p-1.5 sm:p-3" style={{ backgroundColor: JUTE.background }}>
                      <p className="text-[8px] sm:text-xs text-gray-500 mb-0.5">Paid</p>
                      <p className="text-xs sm:text-lg font-bold" style={{ color: JUTE.accent }}>{formatPrice(stats.totalSpent)}</p>
                    </div>
                    <div className="rounded-lg p-1.5 sm:p-3" style={{ backgroundColor: JUTE.background }}>
                      <p className="text-[8px] sm:text-xs text-gray-500 mb-0.5">Pending</p>
                      <p className="text-xs sm:text-lg font-bold" style={{ color: JUTE.warning }}>{formatPrice(stats.pendingAmount)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg" style={{ backgroundColor: `${JUTE.accentLight}20` }}>
                <FileText className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: JUTE.accentLight }} />
              </div>
              <h2 className="text-xs sm:text-sm font-semibold text-gray-700">Recent Inquiries</h2>
            </div>
            <Link 
              href="/customer/inquiries" 
              className="text-[10px] sm:text-xs font-medium flex items-center gap-0.5 sm:gap-1" 
              style={{ color: JUTE.primary }}
            >
              View all ({stats.totalInquiries})
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            </Link>
          </div>
          
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-8 text-center" style={{ borderColor: JUTE.border }}>
              <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4" style={{ backgroundColor: JUTE.background }}>
                <Inbox className="w-5 h-5 sm:w-8 sm:h-8" style={{ color: JUTE.textLight }} />
              </div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">No inquiries</h3>
              <p className="text-[10px] sm:text-sm text-gray-500 mb-2 sm:mb-4">
                {filterType !== 'all' 
                  ? `None found for ${getFilterDisplayText().toLowerCase()}`
                  : 'Start browsing products'}
              </p>
              {filterType !== 'all' ? (
                <button
                  onClick={() => handleFilterTypeChange('all')}
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm text-white rounded-lg transition-colors"
                  style={{ backgroundColor: JUTE.primary }}
                >
                  <CalendarRange className="w-3 h-3 sm:w-4 sm:h-4" />
                  View All
                </button>
              ) : (
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm text-white rounded-lg transition-colors"
                  style={{ backgroundColor: JUTE.primary }}
                >
                  <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
                  Browse Products
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {filteredInquiries.slice(0, 3).map((inquiry) => {
                const getStatusConfig = (status) => {
                  const config = {
                    submitted: { 
                      bg: 'bg-amber-100', 
                      text: 'text-amber-700', 
                      label: 'Submitted',
                      dot: 'bg-amber-500'
                    },
                    quoted: { 
                      bg: 'bg-blue-100', 
                      text: 'text-blue-700', 
                      label: 'Quoted',
                      dot: 'bg-blue-500'
                    },
                    accepted: { 
                      bg: 'bg-emerald-100', 
                      text: 'text-emerald-700', 
                      label: 'Accepted',
                      dot: 'bg-emerald-500'
                    },
                    invoiced: { 
                      bg: 'bg-purple-100', 
                      text: 'text-purple-700', 
                      label: 'Invoiced',
                      dot: 'bg-purple-500'
                    },
                    paid: { 
                      bg: 'bg-green-100', 
                      text: 'text-green-700', 
                      label: 'Paid',
                      dot: 'bg-green-500'
                    },
                    cancelled: { 
                      bg: 'bg-rose-100', 
                      text: 'text-rose-700', 
                      label: 'Cancelled',
                      dot: 'bg-rose-500'
                    }
                  };
                  return config[status] || config.submitted;
                };

                const statusConfig = getStatusConfig(inquiry.status);
                
                return (
                  <div key={inquiry._id} className="bg-white rounded-lg sm:rounded-xl border overflow-hidden hover:shadow-sm transition-shadow" style={{ borderColor: JUTE.border }}>
                    <div className="px-3 sm:px-4 py-2 sm:py-3 border-b" style={{ backgroundColor: JUTE.secondary, borderColor: JUTE.border }}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center shadow-sm sm:shadow-md flex-shrink-0" style={{ backgroundColor: JUTE.primary }}>
                            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate max-w-[100px] sm:max-w-none">
                                {inquiry.inquiryNumber}
                              </h3>
                              <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full ${statusConfig.bg}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}></span>
                                <span className={`text-[8px] sm:text-[10px] font-medium ${statusConfig.text}`}>
                                  {statusConfig.label}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-3 text-[8px] sm:text-xs text-gray-500 mt-0.5">
                              <span className="whitespace-nowrap">{formatDate(inquiry.createdAt)}</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="whitespace-nowrap">{inquiry.items?.length || 0} products</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 sm:gap-2 ml-auto sm:ml-0">
                          {inquiry.status === 'quoted' && (
                            <button
                              onClick={() => handleAcceptQuote(inquiry._id)}
                              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-xs rounded-md sm:rounded-lg transition-colors whitespace-nowrap"
                              style={{ backgroundColor: JUTE.accent, color: 'white' }}
                            >
                              <CheckCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                              <span className="hidden sm:inline">Accept</span>
                            </button>
                          )}
                          
                          {(inquiry.status === 'submitted' || inquiry.status === 'quoted') && (
                            <button
                              onClick={() => handleCancelInquiry(inquiry._id)}
                              className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-xs bg-rose-50 text-rose-700 rounded-md sm:rounded-lg hover:bg-rose-100 transition-colors whitespace-nowrap"
                            >
                              <XCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                              <span className="hidden sm:inline">Cancel</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="px-3 sm:px-4 py-2" style={{ backgroundColor: JUTE.background }}>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 overflow-x-auto flex-1">
                          {inquiry.items?.slice(0, 2).map((item, idx) => {
                            const unitLabel = getUnitLabel(item.orderUnit);
                            const quantity = item.totalQuantity || 0;
                            
                            return (
                              <div key={idx} className="flex items-center gap-1 bg-white rounded-full px-2 py-0.5 border whitespace-nowrap" style={{ borderColor: JUTE.border }}>
                                {item.productImage && (
                                  <img 
                                    src={item.productImage} 
                                    alt="" 
                                    className="w-4 h-4 rounded-full object-cover"
                                  />
                                )}
                                <span className="text-[8px] sm:text-[10px] text-gray-600">
                                  {item.productName} ({quantity} {unitLabel})
                                </span>
                              </div>
                            );
                          })}
                          {inquiry.items?.length > 2 && (
                            <span className="text-[8px] sm:text-[10px] text-gray-400">
                              +{inquiry.items.length - 2} more
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] sm:text-xs text-gray-500">Total:</span>
                          <span className="text-xs sm:text-sm font-semibold whitespace-nowrap" style={{ color: JUTE.primary }}>
                            {formatPrice(inquiry.subtotal || 0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-3 sm:px-4 py-1.5 sm:py-2 flex justify-end border-t" style={{ borderColor: JUTE.border }}>
                      <button
                        onClick={() => {
                          let message = `*Inquiry #${inquiry.inquiryNumber}*\n\n`;
                          inquiry.items?.forEach((product) => {
                            const unitLabel = getUnitLabel(product.orderUnit);
                            message += `*${product.productName}*\n`;
                            message += `Quantity: ${product.totalQuantity || 0} ${unitLabel}\n`;
                          });
                          message += `\nTotal Value: ${formatPrice(inquiry.subtotal || 0)}`;
                          window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '8801305785685'}?text=${encodeURIComponent(message)}`, '_blank');
                        }}
                        className="flex items-center gap-1 px-2 sm:px-3 py-1 text-[8px] sm:text-xs rounded-md sm:rounded-lg transition-colors"
                        style={{ backgroundColor: '#25D366', color: 'white' }}
                      >
                        <MessageCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <div className="sm:hidden flex justify-center py-2">
                <Link 
                  href="/customer/inquiries" 
                  className="text-[10px] font-medium flex items-center gap-1" 
                  style={{ color: JUTE.primary }}
                >
                  View all {stats.totalInquiries} inquiries
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Recent Invoices */}
    {/* Recent Invoices */}
<div className="mb-4 sm:mb-6">
  <div className="flex items-center justify-between mb-2 sm:mb-3">
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg" style={{ backgroundColor: `${JUTE.primary}20` }}>
        <Receipt className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: JUTE.primary }} />
      </div>
      <h2 className="text-xs sm:text-sm font-semibold text-gray-700">Recent Invoices</h2>
    </div>
    <Link 
      href="/customer/invoices" 
      className="text-[10px] sm:text-xs font-medium flex items-center gap-0.5 sm:gap-1" 
      style={{ color: JUTE.primary }}
    >
      View all ({stats.totalInvoices})
      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
    </Link>
  </div>
  
  {filteredInvoices.length === 0 ? (
    <div className="bg-white rounded-lg sm:rounded-xl border p-4 sm:p-8 text-center" style={{ borderColor: JUTE.border }}>
      <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4" style={{ backgroundColor: JUTE.background }}>
        <Receipt className="w-5 h-5 sm:w-8 sm:h-8" style={{ color: JUTE.textLight }} />
      </div>
      <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">No invoices</h3>
      <p className="text-[10px] sm:text-sm text-gray-500">
        {filterType !== 'all' 
          ? `None found for ${getFilterDisplayText().toLowerCase()}`
          : 'Invoices will appear once inquiries are processed'}
      </p>
      {filterType !== 'all' && (
        <button
          onClick={() => handleFilterTypeChange('all')}
          className="mt-2 sm:mt-4 inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm text-white rounded-lg transition-colors"
          style={{ backgroundColor: JUTE.primary }}
        >
          <CalendarRange className="w-3 h-3 sm:w-4 sm:h-4" />
          View All
        </button>
      )}
    </div>
  ) : (
    <div className="bg-white rounded-lg sm:rounded-xl border overflow-hidden" style={{ borderColor: JUTE.border }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: JUTE.secondary, borderBottomColor: JUTE.border }}>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: JUTE.text }}>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Hash className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  Invoice #
                </div>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: JUTE.text }}>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Calendar className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  Date
                </div>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider hidden sm:table-cell" style={{ color: JUTE.text }}>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Package className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  Items
                </div>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: JUTE.text }}>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <DollarSign className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  Amount
                </div>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: JUTE.text }}>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <CreditCard className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                  Status
                </div>
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: JUTE.text }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: JUTE.border }}>
            {filteredInvoices.slice(0, 3).map((invoice) => {
              const dueAmount = getDueAmount(invoice);
              const isExpired = isInvoiceExpired(invoice);
              const overdueDays = isExpired ? getOverdueDays(invoice.dueDate) : 0;
              
              return (
                <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[80px] sm:max-w-none">
                      {invoice.invoiceNumber}
                    </div>
                    {isExpired && (
                      <div className="mt-0.5 sm:mt-1 inline-flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-[8px] sm:text-xs">
                        <Clock className="w-2 h-2 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">{overdueDays}d overdue</span>
                        <span className="sm:hidden">{overdueDays}d</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <div className="text-[10px] sm:text-sm text-gray-900 whitespace-nowrap">
                      {formatDate(invoice.invoiceDate)}
                    </div>
                    <div className="text-[8px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 whitespace-nowrap">
                      Due: {formatDate(invoice.dueDate)}
                    </div>
                  </td>
                  
                  <td className="px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                    <div className="text-xs sm:text-sm text-gray-900">{invoice.items?.length || 0}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      {invoice.items?.reduce((sum, item) => sum + (item.totalQuantity || 0), 0) || 0} {getUnitLabel(invoice.items?.[0]?.orderUnit)}
                    </div>
                  </td>
                  
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <div className="text-xs sm:text-sm font-bold text-gray-900 whitespace-nowrap">
                      {formatPrice(invoice.finalTotal)}
                    </div>
                    {dueAmount > 0 && invoice.paymentStatus !== 'cancelled' && (
                      <div className={`text-[8px] sm:text-xs font-medium ${isExpired ? 'text-red-600' : 'text-orange-600'} whitespace-nowrap`}>
                        Due: {formatPrice(dueAmount)}
                      </div>
                    )}
                  </td>
                  
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <PaymentStatusBadge status={invoice.paymentStatus} isExpired={isExpired} />
                  </td>
                  
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <button
                      onClick={() => handleViewInvoice(invoice._id)}
                      className="p-1 sm:p-1.5 rounded-lg transition-colors"
                      style={{ color: JUTE.text }}
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="sm:hidden flex justify-center py-2 border-t" style={{ borderColor: JUTE.border }}>
        <Link 
          href="/customer/invoices" 
          className="text-[10px] font-medium flex items-center gap-1" 
          style={{ color: JUTE.primary }}
        >
          View all {stats.totalInvoices} invoices
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )}
</div>

        {/* Quick Actions */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <div className="p-1 sm:p-1.5 rounded-md sm:rounded-lg" style={{ backgroundColor: `${JUTE.accent}20` }}>
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: JUTE.accent }} />
            </div>
            <h2 className="text-xs sm:text-sm font-semibold text-gray-700">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-3">
            <QuickActionCard
              title="Browse Products"
              description="Shop our catalog"
              icon={ShoppingBag}
              href="/products"
            />
            <QuickActionCard
              title="My Inquiries"
              description="Track requests"
              icon={ShoppingCart}
              href="/customer/inquiries"
            />
            <QuickActionCard
              title="My Invoices"
              description="View payments"
              icon={Package}
              href="/customer/invoices"
            />
            <QuickActionCard
              title="Contact Support"
              description="Get help"
              icon={MessageCircle}
              href="/contact"
            />
          </div>
        </div>
      </div>
    </div>
  );
}