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
  PieChart,
  CreditCard,
  PlusCircle,
  FileOutput,
  Inbox,
  ChevronLeft,
  ChevronRight,
  Target,
  CalendarRange,
  Settings,
  AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

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

// Jute Theme Colors
const JUTE = {
  primary: '#6B4F3A',
  secondary: '#F5E6D3',
  accent: '#4A7C59',
  accentLight: '#C6A43B',
  background: '#FAF7F2',
  text: '#2C2420',
  textLight: '#8B7355',
  border: '#E5D5C0',
  white: '#FFFFFF'
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

const PaymentStatusBadge = ({ status, isExpired = false }) => {
  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100">
        <Clock className="w-3 h-3 text-orange-600" />
        <span className="text-xs font-medium text-orange-700">Expired</span>
      </div>
    );
  }

  const config = {
    paid: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Paid', icon: CheckCircle },
    partial: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Partial', icon: TrendingUp },
    unpaid: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Unpaid', icon: AlertCircle },
    overpaid: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Overpaid', icon: TrendingDown },
    cancelled: { bg: 'bg-rose-100', text: 'text-rose-700', label: 'Cancelled', icon: XCircle }
  };

  const statusKey = status?.toLowerCase() || 'unpaid';
  const { bg, text, label, icon: Icon } = config[statusKey] || config.unpaid;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bg}`}>
      <Icon className="w-3 h-3" />
      <span className={`text-xs font-medium ${text}`}>{label}</span>
    </div>
  );
};

// ==================== STAT CARD COMPONENT ====================

const StatCard = ({ title, value, icon: Icon, color = 'jute', trend, trendValue, subtitle, onClick, link, loading = false, badge }) => {
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
      iconBg: '#4A7C59',
      iconColor: 'text-white',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50',
      iconBg: '#C6A43B',
      iconColor: 'text-white',
      border: 'border-amber-200',
      text: 'text-amber-700',
      trendUp: 'text-emerald-600',
      trendDown: 'text-rose-600'
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-50 to-rose-100/50',
      iconBg: '#E39A65',
      iconColor: 'text-white',
      border: 'border-rose-200',
      text: 'text-rose-700',
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
    }
  };

  const theme = colors[color] || colors.jute;

  const CardWrapper = ({ children }) => {
    if (link) {
      return <Link href={link} className="block cursor-pointer h-full">{children}</Link>;
    }
    if (onClick) {
      return <button onClick={onClick} className="w-full text-left cursor-pointer h-full">{children}</button>;
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
            {badge && (
              <div className={`px-2 py-1 rounded-lg ${badge.bg} text-xs font-medium ${badge.text}`}>
                {badge.label}
              </div>
            )}
            {trend !== undefined && !badge && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-white/60 backdrop-blur-sm ${
                trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-rose-600' : 'text-gray-500'
              }`}>
                {trend > 0 ? <ArrowRight className="w-3 h-3 rotate-[-45deg]" /> : 
                 trend < 0 ? <ArrowRight className="w-3 h-3 rotate-45" /> : 
                 <Minus className="w-3 h-3" />}
                <span className="text-xs font-medium">
                  {trend > 0 ? '+' : ''}{trendValue || `${trend}%`}
                </span>
              </div>
            )}
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
      </div>
    </CardWrapper>
  );
};

// Minus icon component
const Minus = ({ className }) => <div className={className}>-</div>;

// ==================== QUICK ACTION CARD ====================

const QuickActionCard = ({ title, icon: Icon, description, href, color = 'jute' }) => {
  const colors = {
    jute: 'bg-[#F5E6D3] hover:bg-[#E5D5C0] text-[#6B4F3A]',
    emerald: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-50 hover:bg-amber-100 text-amber-600',
    purple: 'bg-purple-50 hover:bg-purple-100 text-purple-600'
  };

  return (
    <Link href={href} className="block">
      <div className={`flex items-center gap-3 p-3 rounded-xl ${colors[color]} transition-all duration-200 hover:shadow-md`}>
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Icon className="w-4 h-4" />
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

// ==================== RECENT INQUIRY ROW ====================

const RecentInquiryRow = ({ inquiry }) => {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/admin/inquiries?inquiryId=${inquiry._id}`)}
      className="flex items-center justify-between p-3 hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0" style={{ backgroundColor: JUTE.primary }}>
          <FileText className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-gray-900 truncate">{inquiry.inquiryNumber}</p>
            <InquiryStatusBadge status={inquiry.status} />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5 flex-wrap">
            <span>{inquiry.userDetails?.companyName || 'N/A'}</span>
            <span>•</span>
            <span>{inquiry.totalItems || 0} products</span>
            <span>•</span>
            <span>{getRelativeTime(inquiry.createdAt)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <span className="text-sm font-semibold" style={{ color: JUTE.primary }}>
          {formatPrice(inquiry.subtotal || 0)}
        </span>
        <Eye className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

// ==================== RECENT INVOICE ROW ====================

const isInvoiceExpired = (invoice) => {
  if (invoice.paymentStatus === 'paid' || invoice.paymentStatus === 'cancelled' || invoice.paymentStatus === 'overpaid') {
    return false;
  }
  const today = new Date();
  const dueDate = new Date(invoice.dueDate);
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  return dueDate < today;
};

const RecentInvoiceRow = ({ invoice }) => {
  const router = useRouter();
  const expired = isInvoiceExpired(invoice);

  return (
    <div 
      onClick={() => router.push(`/admin/viewInvoice?invoiceId=${invoice._id}`)}
      className="flex items-center justify-between p-3 hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer group"
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0" style={{ backgroundColor: JUTE.accentLight }}>
          <DollarSign className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-gray-900 truncate">{invoice.invoiceNumber}</p>
            {expired ? (
              <PaymentStatusBadge status="expired" isExpired={true} />
            ) : (
              <PaymentStatusBadge status={invoice.paymentStatus} />
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5 flex-wrap">
            <span>{invoice.customer?.companyName || 'N/A'}</span>
            <span>•</span>
            <span>Due {formatDate(invoice.dueDate)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <span className="text-sm font-semibold" style={{ color: JUTE.accentLight }}>
          {formatPrice(invoice.finalTotal || 0)}
        </span>
        <Eye className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

// ==================== MAIN DASHBOARD COMPONENT ====================

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterType, setFilterType] = useState('month');
  
  const [dashboardData, setDashboardData] = useState({
    overview: {
      totalInquiries: 0,
      pendingQuotations: 0,
      unpaidInvoices: 0,
      partialInvoices: 0,
      expiredInvoices: 0,
      monthlyRevenue: 0,
      revenueGrowth: 0,
      totalInvoices: 0,
      paidInvoices: 0,
      pendingValue: 0,
      invoiceStatusCounts: {
        paid: 0,
        partial: 0,
        unpaid: 0,
        expired: 0,
        overpaid: 0,
        cancelled: 0,
        total: 0
      }
    },
    recentInquiries: [],
    recentInvoices: [],
    statusBreakdown: {}
  });

  const [stats, setStats] = useState({
    totalInquiries: 0,
    submitted: 0,
    quoted: 0,
    accepted: 0,
    invoiced: 0,
    cancelled: 0,
    paid: 0,
    partial: 0,
    unpaid: 0,
    overpaid: 0,
    expired: 0
  });

  const router = useRouter();

// Add this debug function in your AdminDashboardPage component to check API response

const fetchDashboardData = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    let url = `http://localhost:5000/api/admin/inquiries/stats/dashboard`;
    
    const params = new URLSearchParams();
    
    if (filterType === 'month') {
      params.append('month', selectedMonth + 1);
      params.append('year', selectedYear);
    } else if (filterType === 'year') {
      params.append('year', selectedYear);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    console.log('=== DASHBOARD DEBUG ===');
    console.log('Fetching URL:', url);
    console.log('Filter Type:', filterType);
    console.log('Selected Month:', selectedMonth);
    console.log('Selected Year:', selectedYear);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    console.log('=== API RESPONSE ===');
    console.log('Success:', data.success);
    console.log('Full Response:', JSON.stringify(data, null, 2));
    
    if (data.success && data.data) {
      console.log('=== OVERVIEW DATA ===');
      console.log('totalInquiries:', data.data.overview?.totalInquiries);
      console.log('totalInvoices:', data.data.overview?.totalInvoices);
      console.log('monthlyRevenue:', data.data.overview?.monthlyRevenue);
      console.log('pendingQuotations:', data.data.overview?.pendingQuotations);
      console.log('invoiceStatusCounts:', data.data.overview?.invoiceStatusCounts);
      
      console.log('=== RECENT INQUIRIES ===');
      console.log('Count:', data.data.recentInquiries?.length);
      
      console.log('=== RECENT INVOICES ===');
      console.log('Count:', data.data.recentInvoices?.length);
      
      setDashboardData(data.data);
      
      const breakdown = data.data.statusBreakdown || {};
      
      setStats({
        totalInquiries: data.data.overview?.totalInquiries || 0,
        submitted: breakdown.submitted?.count || 0,
        quoted: breakdown.quoted?.count || 0,
        accepted: breakdown.accepted?.count || 0,
        invoiced: breakdown.invoiced?.count || 0,
        cancelled: breakdown.cancelled?.count || 0,
        paid: data.data.overview?.invoiceStatusCounts?.paid || 0,
        partial: data.data.overview?.invoiceStatusCounts?.partial || 0,
        unpaid: data.data.overview?.invoiceStatusCounts?.unpaid || 0,
        overpaid: data.data.overview?.invoiceStatusCounts?.overpaid || 0,
        expired: data.data.overview?.expiredInvoices || 0
      });
    } else {
      console.error('API returned success=false or no data');
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    toast.error('Failed to load dashboard data');
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

// Add this debug function right after the fetchDashboardData function

const checkDirectDatabase = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log('=== DIRECT DATABASE CHECK ===');
    
    // Check inquiries directly
    const inquiriesRes = await fetch('http://localhost:5000/api/admin/inquiries/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const inquiriesData = await inquiriesRes.json();
    console.log('Total Inquiries in DB:', inquiriesData.data?.length || 0);
    if (inquiriesData.data?.length > 0) {
      console.log('Sample inquiry:', inquiriesData.data[0]);
    }
    
    // Check invoices directly
    const invoicesRes = await fetch('http://localhost:5000/api/invoices/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const invoicesData = await invoicesRes.json();
    console.log('Total Invoices in DB:', invoicesData.data?.length || 0);
    if (invoicesData.data?.length > 0) {
      console.log('Sample invoice:', invoicesData.data[0]);
    }
  } catch (error) {
    console.error('Direct DB check error:', error);
  }
};

// Call this after fetchDashboardData or on a button click
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
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" style={{ color: JUTE.primary }} />
          <p className="text-sm text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: JUTE.background }}>
      {/* Header */}
      <div className="bg-white border-b sticky top-20 z-10" style={{ borderColor: JUTE.border }}>
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: JUTE.text, fontFamily: 'Playfair Display, serif' }}>Admin Dashboard</h1>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                <CalendarRange className="w-3 h-3" />
                Showing data for: <span className="font-medium" style={{ color: JUTE.primary }}>{getFilterDisplayText()}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 border rounded-lg overflow-hidden" style={{ borderColor: JUTE.border }}>
                <button
                  onClick={() => handleFilterTypeChange('all')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    filterType === 'all' 
                      ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  style={filterType === 'all' ? { backgroundColor: JUTE.primary } : {}}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterTypeChange('year')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    filterType === 'year' 
                      ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  style={filterType === 'year' ? { backgroundColor: JUTE.primary } : {}}
                >
                  Year
                </button>
                <button
                  onClick={() => handleFilterTypeChange('month')}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                    filterType === 'month' 
                      ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  style={filterType === 'month' ? { backgroundColor: JUTE.primary } : {}}
                >
                  Month
                </button>
              </div>

              {filterType === 'month' && (
                <div className="flex items-center gap-1 border rounded-lg overflow-hidden" style={{ borderColor: JUTE.border }}>
                  <button
                    onClick={() => handleMonthChange(-1)}
                    className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border-x whitespace-nowrap" style={{ borderColor: JUTE.border }}>
                    {getMonthName(selectedMonth)} {selectedYear}
                  </span>
                  <button
                    onClick={() => handleMonthChange(1)}
                    className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {filterType === 'year' && (
                <div className="flex items-center gap-1 border rounded-lg overflow-hidden" style={{ borderColor: JUTE.border }}>
                  <button
                    onClick={() => handleYearChange(-1)}
                    className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1.5 text-xs font-medium bg-white text-gray-700 border-x" style={{ borderColor: JUTE.border }}>
                    {selectedYear}
                  </span>
                  <button
                    onClick={() => handleYearChange(1)}
                    className="px-2 py-1.5 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button
                onClick={() => router.push('/admin/settings')}
                className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl py-6">
        {/* Key Metrics Section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" style={{ color: JUTE.primary }} />
            Key Metrics
            {filterType !== 'all' && <span className="text-xs font-normal text-gray-400">(Filtered)</span>}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              title="Total Inquiries"
              value={dashboardData.overview.totalInquiries}
              icon={ShoppingBag}
              color="jute"
              link="/admin/inquiries"
            />
            <StatCard
              title="Pending Quotations"
              value={dashboardData.overview.pendingQuotations}
              icon={Clock}
              color="amber"
              subtitle="Awaiting response"
              link="/admin/inquiries?filter=submitted"
            />
            <StatCard
              title="Unpaid Invoices"
              value={dashboardData.overview.unpaidInvoices}
              icon={AlertCircle}
              color="rose"
              subtitle={`${dashboardData.overview.partialInvoices} partial`}
              link="/admin/invoices?filter=unpaid"
            />
            <StatCard
              title="Expired Invoices"
              value={stats.expired}
              icon={Clock}
              color="amber"
              subtitle="Payment overdue"
              link="/admin/invoices?filter=expired"
            />
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              <StatCard
                title="Revenue"
                value={formatPrice(dashboardData.overview.monthlyRevenue)}
                icon={DollarSign}
                color="emerald"
                link="/admin/invoices?filter=paid"
              />
            </div>
          </div>
        </div>

        {/* Status Breakdown & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Inquiry Status Breakdown */}
          <div className="bg-white rounded-xl border p-4" style={{ borderColor: JUTE.border }}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <PieChart className="w-4 h-4" style={{ color: JUTE.primary }} />
              Inquiry Status
              {filterType !== 'all' && <span className="text-[10px] text-gray-400">(Filtered)</span>}
            </h3>
            <div className="space-y-2">
              {[
                { status: 'submitted', label: 'Submitted', color: 'bg-amber-500', count: stats.submitted },
                { status: 'quoted', label: 'Quoted', color: 'bg-blue-500', count: stats.quoted },
                { status: 'accepted', label: 'Accepted', color: 'bg-emerald-500', count: stats.accepted },
                { status: 'invoiced', label: 'Invoiced', color: 'bg-purple-500', count: stats.invoiced },
                { status: 'cancelled', label: 'Cancelled', color: 'bg-rose-500', count: stats.cancelled }
              ].map(item => (
                <div key={item.status} className="flex items-center justify-between p-2 hover:bg-[#FAF7F2] rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                    <span className="text-xs text-gray-600">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                    <span className="text-xs text-gray-400">
                      ({stats.totalInquiries > 0 ? Math.round((item.count / stats.totalInquiries) * 100) : 0}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t" style={{ borderColor: JUTE.border }}>
              <Link href="/admin/inquiries" className="text-xs font-medium flex items-center justify-between" style={{ color: JUTE.primary }}>
                View all inquiries
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Payment Status Breakdown */}
          <div className="bg-white rounded-xl border p-4" style={{ borderColor: JUTE.border }}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" style={{ color: JUTE.primary }} />
              Payment Status
              {filterType !== 'all' && <span className="text-[10px] text-gray-400">(Filtered)</span>}
            </h3>
            <div className="space-y-2">
              {[
                { status: 'paid', label: 'Paid', color: 'bg-emerald-500', count: stats.paid },
                { status: 'partial', label: 'Partial', color: 'bg-blue-500', count: stats.partial },
                { status: 'unpaid', label: 'Unpaid', color: 'bg-amber-500', count: stats.unpaid },
                { status: 'expired', label: 'Expired', color: 'bg-orange-500', count: stats.expired },
                { status: 'overpaid', label: 'Overpaid', color: 'bg-purple-500', count: stats.overpaid }
              ].map(item => {
                const totalInvoices = dashboardData.overview.totalInvoices;
                const percentage = totalInvoices > 0 ? Math.round((item.count / totalInvoices) * 100) : 0;
                return (
                  <div key={item.status} className="flex items-center justify-between p-2 hover:bg-[#FAF7F2] rounded-lg transition-colors">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                      <span className="text-xs text-gray-400">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t" style={{ borderColor: JUTE.border }}>
              <Link href="/admin/invoices" className="text-xs font-medium flex items-center justify-between" style={{ color: JUTE.primary }}>
                View all invoices
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl border p-4" style={{ borderColor: JUTE.border }}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" style={{ color: JUTE.primary }} />
              Performance Metrics
              {filterType !== 'all' && <span className="text-[10px] text-gray-400">(Filtered)</span>}
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-medium text-gray-900">
                    {stats.totalInquiries > 0 ? Math.round((stats.accepted / stats.totalInquiries) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${stats.totalInquiries > 0 ? (stats.accepted / stats.totalInquiries) * 100 : 0}%`,
                      backgroundColor: JUTE.accent
                    }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Payment Collection</span>
                  <span className="font-medium text-gray-900">
                    {dashboardData.overview.totalInvoices > 0 
                      ? Math.round((stats.paid / dashboardData.overview.totalInvoices) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${dashboardData.overview.totalInvoices > 0 ? (stats.paid / dashboardData.overview.totalInvoices) * 100 : 0}%`,
                      backgroundColor: JUTE.accentLight
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">Pending Value</span>
                  <span className="font-medium" style={{ color: JUTE.primary }}>
                    {formatPrice(dashboardData.overview.pendingValue || 0)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${dashboardData.overview.pendingValue > 0 ? Math.min((dashboardData.overview.pendingValue / (dashboardData.overview.monthlyRevenue || 1)) * 100, 100) : 0}%`,
                      backgroundColor: JUTE.primary
                    }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="rounded-lg p-3 text-center" style={{ backgroundColor: JUTE.secondary }}>
                  <p className="text-xs text-gray-500">Avg. Invoice</p>
                  <p className="text-sm font-bold" style={{ color: JUTE.primary }}>
                    {dashboardData.overview.paidInvoices > 0 
                      ? formatPrice(dashboardData.overview.monthlyRevenue / dashboardData.overview.paidInvoices)
                      : formatPrice(0)}
                  </p>
                </div>
                <div className="rounded-lg p-3 text-center" style={{ backgroundColor: JUTE.secondary }}>
                  <p className="text-xs text-gray-500">Total Invoices</p>
                  <p className="text-sm font-bold" style={{ color: JUTE.primary }}>
                    {dashboardData.overview.totalInvoices || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Inquiries */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: JUTE.border }}>
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ backgroundColor: JUTE.secondary, borderColor: JUTE.border }}>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg" style={{ backgroundColor: JUTE.primary }}>
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Recent Inquiries</h3>
                {filterType !== 'all' && <span className="text-[10px] text-gray-400">(Filtered)</span>}
              </div>
              <Link href="/admin/inquiries" className="text-xs font-medium flex items-center gap-1" style={{ color: JUTE.primary }}>
                View all
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-2">
              {dashboardData.recentInquiries && dashboardData.recentInquiries.length > 0 ? (
                dashboardData.recentInquiries.slice(0, 5).map((inquiry, index) => (
                  <RecentInquiryRow key={inquiry._id || index} inquiry={inquiry} />
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: JUTE.secondary }}>
                    <Inbox className="w-6 h-6" style={{ color: JUTE.textLight }} />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">No recent inquiries</p>
                  <p className="text-xs text-gray-400">New inquiries will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: JUTE.border }}>
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ backgroundColor: JUTE.secondary, borderColor: JUTE.border }}>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg" style={{ backgroundColor: JUTE.accentLight }}>
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Recent Invoices</h3>
                {filterType !== 'all' && <span className="text-[10px] text-gray-400">(Filtered)</span>}
              </div>
              <Link href="/admin/invoices" className="text-xs font-medium flex items-center gap-1" style={{ color: JUTE.primary }}>
                View all
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-2">
              {dashboardData.recentInvoices && dashboardData.recentInvoices.length > 0 ? (
                dashboardData.recentInvoices.slice(0, 5).map((invoice, index) => (
                  <RecentInvoiceRow key={invoice._id || index} invoice={invoice} />
                ))
              ) : (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: JUTE.secondary }}>
                    <FileText className="w-6 h-6" style={{ color: JUTE.textLight }} />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">No recent invoices</p>
                  <p className="text-xs text-gray-400">Invoices will appear here once created</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" style={{ color: JUTE.primary }} />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickActionCard
              title="Create Invoice"
              description="Convert inquiry to invoice"
              icon={FileOutput}
              href="/admin/inquiries?filter=accepted"
              color="jute"
            />
            <QuickActionCard
              title="Add Product"
              description="Add new products to catalog"
              icon={Package}
              href="/admin/create-products"
              color="emerald"
            />
            <QuickActionCard
              title="View Inquiries"
              description="Manage customer inquiries"
              icon={Inbox}
              href="/admin/inquiries"
              color="amber"
            />
            <QuickActionCard
              title="View Invoices"
              description="Manage all invoices"
              icon={FileText}
              href="/admin/invoices"
              color="purple"
            />
          </div>
     

        </div>
      </div>
    </div>
  );
}