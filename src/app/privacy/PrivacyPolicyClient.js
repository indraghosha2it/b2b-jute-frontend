'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Headset,
  Send,
  FileText,
  UserCheck,
  Trash2,
  Share2,
  Bell,
  Server,
  Clock,
  ArrowUp,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Heart,
  FileKey,
  Fingerprint,
  Building2,
  Briefcase,
  Scale,
  Award,
  Radio,
  Settings,
  Network,
  Cloud,
  Smartphone,
  CalendarDays,
  FileSignature,
  ShieldCheck,
  UserX,
  MessageSquare,
  Video,
  CreditCard,
  Truck,
  Package,
  BarChart3,
  TrendingUp,
  Users,
  Sparkles
} from 'lucide-react';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import WhatsAppButton from '../components/layout/WhatsAppButton';

export default function PrivacyPolicyPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Detailed Data Collection Categories
  const dataCategories = [
    {
      icon: Building2,
      title: 'Business Information',
      items: ['Company Legal Name', 'Trade License Number', 'VAT/GST Registration', 'Business Type (Importer/Wholesaler/Manufacturer)', 'Years in Operation', 'Annual Purchase Volume'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Contact & Account Data',
      items: ['Primary Contact Name & Title', 'Alternative Contact Person', 'Email Addresses (Corporate & Personal)', 'Phone Numbers (Office & Mobile)', 'Billing & Shipping Addresses', 'Language Preferences'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Package,
      title: 'Transaction & Order Data',
      items: ['Purchase History & Frequency', 'Product Categories Interested', 'Custom Specifications & Samples', 'Order Quantities & MOQ Preferences', 'Shipping & Delivery Preferences', 'Payment Terms & Credit History'],
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Technical & Usage Data',
      items: ['IP Address & Geographic Location', 'Browser Type & Device Information', 'Pages Visited & Time Spent', 'RFQ Form Submissions History', 'PDF Catalog Downloads', 'Newsletter Engagement Metrics'],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  // Legal Basis for Processing
  const legalBasis = [
    {
      icon: FileSignature,
      title: 'Contractual Necessity',
      description: 'Processing required to fulfill RFQs, orders, and service agreements',
      examples: ['Processing quotations', 'Order fulfillment', 'Shipping coordination']
    },
    {
      icon: ShieldCheck,
      title: 'Legitimate Interest',
      description: 'Processing necessary for our business operations and improvement',
      examples: ['Website analytics', 'Customer service', 'Fraud prevention']
    },
    {
      icon: Scale,
      title: 'Legal Compliance',
      description: 'Processing required to comply with applicable laws and regulations',
      examples: ['Tax reporting', 'Customs declarations', 'Audit trails']
    },
    {
      icon: UserCheck,
      title: 'Consent',
      description: 'Processing based on your explicit agreement',
      examples: ['Marketing communications', 'Cookie preferences', 'Testimonials']
    }
  ];

  // Data Sharing & Third Parties
  const thirdParties = [
    {
      category: 'Logistics & Shipping Partners',
      companies: ['DHL', 'FedEx', 'Maersk', 'Local Freight Forwarders'],
      purpose: 'Order delivery, tracking, and customs clearance',
      dataShared: ['Shipping addresses', 'Contact details', 'Package contents']
    },
    {
      category: 'Payment Processors',
      companies: ['Stripe', 'PayPal', 'Bank Transfer Services', 'Letter of Credit Banks'],
      purpose: 'Secure payment processing and fraud detection',
      dataShared: ['Billing information', 'Transaction amounts', 'Payment confirmation']
    },
    {
      category: 'Service Providers',
      companies: ['CRM Platform', 'Email Marketing Tools', 'Analytics Services', 'Cloud Hosting'],
      purpose: 'Business operations, communication, and analytics',
      dataShared: ['Contact information', 'Usage data', 'Communication history']
    },
    {
      category: 'Compliance & Legal',
      companies: ['Customs Authorities', 'Tax Departments', 'Legal Advisors', 'Auditors'],
      purpose: 'Regulatory compliance and legal obligations',
      dataShared: ['Transaction records', 'Business registration', 'Export documentation']
    }
  ];

  // Data Retention Schedule
  const retentionSchedule = [
    { dataType: 'Active Client Records', retention: 'Duration of business relationship + 2 years', reason: 'Service continuity and relationship management' },
    { dataType: 'RFQ & Inquiry Data', retention: '24 months from last interaction', reason: 'Sales follow-up and lead nurturing' },
    { dataType: 'Transaction & Invoice Records', retention: '7 years', reason: 'Tax and accounting legal requirements' },
    { dataType: 'Website Analytics Data', retention: '14 months', reason: 'Performance analysis and improvement' },
    { dataType: 'Marketing Preferences', retention: 'Until opt-out or 3 years of inactivity', reason: 'Communication consent management' },
    { dataType: 'Chat & Support Tickets', retention: '12 months', reason: 'Quality assurance and training' }
  ];

  // Security Measures
  const securityMeasures = [
    { icon: Lock, title: 'Encryption', description: 'AES-256 for data at rest, TLS 1.3 for data in transit' },
    { icon: Fingerprint, title: 'Access Control', description: 'Role-based access with multi-factor authentication' },
    { icon: Shield, title: 'Regular Audits', description: 'Quarterly security assessments and penetration testing' },
    { icon: Network, title: 'Network Security', description: 'Firewalls, IDS/IPS, and DDoS protection' },
    { icon: Cloud, title: 'Backup & Recovery', description: 'Daily encrypted backups with offsite storage' },
    { icon: Radio, title: 'Monitoring', description: '24/7 real-time threat detection and alerting' }
  ];

  // International Data Transfers
  const internationalTransfers = [
    { from: 'Bangladesh', to: 'European Union', safeguard: 'Standard Contractual Clauses (SCCs)' },
    { from: 'Bangladesh', to: 'United States', safeguard: 'Data Processing Agreement + SCCs' },
    { from: 'Bangladesh', to: 'United Kingdom', safeguard: 'UK Addendum to SCCs' },
    { from: 'Bangladesh', to: 'UAE, Singapore, India', safeguard: 'Adequacy decisions and contractual protections' }
  ];

  // Children's Privacy (B2B specific but included for compliance)
  const childrenPrivacy = {
    statement: 'Jute Craftify services are strictly for business-to-business transactions. We do not knowingly collect information from individuals under 18 years of age. Our products and services are intended for commercial entities, business owners, and authorized representatives only.',
    verification: 'If we become aware of any data collected from minors, we will take immediate steps to delete such information.'
  };

  // Policy Updates History
  const updateHistory = [
    { version: '2.0', date: 'April 15, 2026', changes: 'Major update: GDPR compliance, enhanced security measures, new data retention policy' },
    { version: '1.5', date: 'January 10, 2026', changes: 'Added cookie preference center, updated third-party sharing disclosures' },
    { version: '1.0', date: 'September 1, 2025', changes: 'Initial privacy policy published' }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white overflow-x-hidden">
        
        {/* HERO SECTION - Enhanced */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/G4RJnfg0/nuts-glass-autumn-leaves.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6B4F3A]/95 to-[#2d5a35]/90" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
               
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
                  Privacy <span className="text-[#3bc24f]">Policy</span>
                </h1>
                <p className="text-[#F5E6D3] text-lg md:text-xl max-w-2xl mx-auto font-sans">
                  Your trust is our priority. Learn how we protect, manage, and respect your business data.
                </p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-2xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-[#3bc24f]">256-bit</div>
                    <div className="text-xs text-white/80">SSL Encryption</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-[#3bc24f]">ISO 27001</div>
                    <div className="text-xs text-white/80">Certified</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-[#3bc24f]">24/7</div>
                    <div className="text-xs text-white/80">Security Monitoring</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-[#3bc24f]">GDPR</div>
                    <div className="text-xs text-white/80">Compliant</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* QUICK NAVIGATION TABS */}
        <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-1 py-3 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: Eye },
                { id: 'collection', label: 'Data Collection', icon: Database },
                { id: 'legal', label: 'Legal Basis', icon: Scale },
                { id: 'sharing', label: 'Data Sharing', icon: Share2 },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'rights', label: 'Your Rights', icon: UserCheck },
                { id: 'retention', label: 'Retention', icon: Clock },
                { id: 'international', label: 'International', icon: Globe }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      const element = document.getElementById(tab.id);
                      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setActiveTab(tab.id);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id 
                        ? 'bg-[#3A7D44] text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* INTRODUCTION CARD - Enhanced */}
        <section id="overview" className="py-12 bg-gray-50 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6B4F3A] via-[#3A7D44] to-[#6B4F3A]"></div>
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
                    <div className="w-16 h-16 bg-[#F5E6D3] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Heart className="w-8 h-8 text-[#3A7D44]" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#6B4F3A] mb-3 font-serif">
                        Your Privacy Matters to Us
                      </h2>
                      <p className="text-gray-700 leading-relaxed font-sans">
                        At Jute Craftify, we are committed to protecting the privacy and security of our B2B clients, 
                        partners, and website visitors. This comprehensive Privacy Policy explains how we collect, use, disclose, 
                        and safeguard your information when you use our website and services. As a trusted global 
                        supplier of premium jute products, we adhere to strict data protection standards and international 
                        privacy regulations including GDPR (General Data Protection Regulation), CCPA (California Consumer Privacy Act), 
                        and the Bangladesh Data Protection Act.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                          <CheckCircle className="w-4 h-4 text-[#3A7D44]" />
                          <span>GDPR Compliant</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                          <CheckCircle className="w-4 h-4 text-[#3A7D44]" />
                          <span>CCPA Ready</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                          <CheckCircle className="w-4 h-4 text-[#3A7D44]" />
                          <span>ISO 27001 Certified</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full">
                          <CheckCircle className="w-4 h-4 text-[#3A7D44]" />
                          <span>Bangladesh Data Protection Act</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DATA COLLECTION CATEGORIES - Detailed */}
        <section id="collection" className="py-16 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                DATA COLLECTION
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Information We Collect
              </h2>
              <p className="text-gray-600 font-sans">
                We collect various types of business information to provide and improve our B2B jute sourcing services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {dataCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-10 rounded-bl-full`}></div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 font-serif">{category.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 font-sans">
                            <CheckCircle className="w-4 h-4 text-[#3A7D44] mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Special Note on Sensitive Data */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-semibold font-sans">Sensitive Information Notice</p>
                  <p className="text-sm text-amber-700 font-sans mt-1">
                    We do not collect sensitive personal data such as government IDs, financial account passwords, 
                    health information, or biometric data. All collected information is strictly business-related 
                    and necessary for our B2B operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEGAL BASIS FOR PROCESSING */}
        <section id="legal" className="py-16 bg-gray-50 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                LEGAL COMPLIANCE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Legal Basis for Processing
              </h2>
              <p className="text-gray-600 font-sans">
                We process your data only when we have a valid legal basis under applicable privacy laws
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {legalBasis.map((basis, index) => {
                const Icon = basis.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#3A7D44]/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#F5E6D3] rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#3A7D44]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 font-serif">{basis.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 font-sans">{basis.description}</p>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-semibold mb-1">Examples:</p>
                      <ul className="space-y-1">
                        {basis.examples.map((ex, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                            <div className="w-1 h-1 bg-[#3A7D44] rounded-full"></div>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DATA SHARING & THIRD PARTIES */}
        <section id="sharing" className="py-16 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                TRANSPARENCY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Information Sharing & Third Parties
              </h2>
              <p className="text-gray-600 font-sans">
                We share data only when necessary and always under strict confidentiality agreements
              </p>
            </div>

            <div className="space-y-4">
              {thirdParties.map((party, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                >
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#6B4F3A] font-serif">{party.category}</h3>
                      <p className="text-sm text-gray-500 mt-1">Purpose: {party.purpose}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {party.companies.map((company, idx) => (
                          <span key={idx} className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 border border-gray-200">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 min-w-[200px]">
                      <p className="text-xs text-gray-500 font-semibold">Data Shared:</p>
                      <ul className="mt-1 space-y-0.5">
                        {party.dataShared.map((data, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                            <div className="w-1 h-1 bg-[#3A7D44] rounded-full"></div>
                            <span>{data}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-sm text-green-800 font-sans">
                  <strong>Our Commitment:</strong> We never sell your personal data to third parties. All data sharing is strictly for business operations, legal compliance, or with your explicit consent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY MEASURES - Detailed */}
        <section id="security" className="py-16 bg-gradient-to-br from-[#6B4F3A] to-[#4A3222] text-white scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-4">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium font-sans">SECURITY INFRASTRUCTURE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
                How We Protect Your Data
              </h2>
              <p className="text-[#F5E6D3] font-sans">
                Enterprise-grade security measures to ensure your business information remains safe
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityMeasures.map((measure, index) => {
                const Icon = measure.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#3bc24f]/20 rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-[#3bc24f]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 font-serif">{measure.title}</h3>
                    <p className="text-sm text-[#F5E6D3] font-sans">{measure.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Award className="w-4 h-4 text-[#3bc24f]" />
                <span className="text-sm font-sans">ISO 27001:2022 Certified Information Security Management System</span>
              </div>
            </div>
          </div>
        </section>

        {/* YOUR RIGHTS SECTION - Enhanced */}
        <section id="rights" className="py-16 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                DATA SUBJECT RIGHTS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Your Privacy Rights
              </h2>
              <p className="text-gray-600 font-sans">
                You have control over your personal data. Here are the rights you can exercise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Eye, title: 'Right to Access', description: 'Request a copy of all personal data we hold about you', timeframe: 'Within 30 days', fee: 'Free for first request' },
                { icon: Trash2, title: 'Right to Deletion', description: 'Request deletion of your personal information', timeframe: 'Within 30 days', fee: 'Free', exception: 'Subject to legal retention' },
                { icon: RefreshCw, title: 'Right to Rectification', description: 'Correct inaccurate or incomplete data', timeframe: 'Within 15 days', fee: 'Free' },
                { icon: Database, title: 'Right to Portability', description: 'Receive your data in a structured, machine-readable format', timeframe: 'Within 30 days', fee: 'Free' },
                { icon: UserX, title: 'Right to Object', description: 'Object to processing based on legitimate interests', timeframe: 'Within 30 days', fee: 'Free' },
                { icon: Settings, title: 'Right to Restrict', description: 'Limit how we use your data', timeframe: 'Within 15 days', fee: 'Free' }
              ].map((right, index) => {
                const Icon = right.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 bg-[#F5E6D3] rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-[#3A7D44]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 font-serif">{right.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 font-sans">{right.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-200">
                      <span>⏱ {right.timeframe}</span>
                      <span>💰 {right.fee}</span>
                    </div>
                    {right.exception && <p className="text-xs text-amber-600 mt-2">{right.exception}</p>}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-semibold font-sans">To Exercise Your Rights:</p>
                  <p className="text-sm text-blue-700 font-sans mt-1">
                    Contact our Data Protection Officer at <strong>info@jutecraftify.com</strong> or call <strong>+880 
1871-733305</strong>. 
                    We will verify your identity before processing any request to protect your data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DATA RETENTION SCHEDULE */}
        <section id="retention" className="py-16 bg-gray-50 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                DATA LIFECYCLE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Data Retention Schedule
              </h2>
              <p className="text-gray-600 font-sans">
                We retain your data only as long as necessary for business and legal purposes
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-md">
                <thead className="bg-[#6B4F3A] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold font-sans">Data Type</th>
                    <th className="px-4 py-3 text-left font-semibold font-sans">Retention Period</th>
                    <th className="px-4 py-3 text-left font-semibold font-sans">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {retentionSchedule.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800 font-sans font-medium">{item.dataType}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-sans">{item.retention}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 font-sans">{item.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* INTERNATIONAL DATA TRANSFERS */}
        <section id="international" className="py-16 bg-white scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#F5E6D3] rounded-full px-4 py-1.5 mb-4">
                  <Globe className="w-4 h-4 text-[#3A7D44]" />
                  <span className="text-sm font-semibold text-[#6B4F3A] font-sans">INTERNATIONAL COMPLIANCE</span>
                </div>
                <h2 className="text-3xl font-bold text-[#6B4F3A] mb-4 font-serif">International Data Transfers</h2>
                <p className="text-gray-700 mb-6 leading-relaxed font-sans">
                  As a global exporter serving clients worldwide, your data may be transferred to and processed in countries 
                  outside your residence. We ensure appropriate safeguards are in place for all international data transfers.
                </p>
                <div className="space-y-3">
                  {internationalTransfers.map((transfer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700">{transfer.from}</span>
                        <span className="text-gray-400">→</span>
                        <span className="font-semibold text-gray-700">{transfer.to}</span>
                      </div>
                      <span className="text-xs text-[#3A7D44] bg-white px-2 py-1 rounded-full">{transfer.safeguard}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#6B4F3A] to-[#4A3222] rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4 font-serif">GDPR & CCPA Compliance</h3>
                <p className="text-sm text-[#F5E6D3] mb-4">
                  We have appointed a Data Protection Officer (DPO) and comply with GDPR requirements for EU clients, 
                  as well as CCPA provisions for California residents.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    Standard Contractual Clauses (SCCs) in place
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    Data Processing Agreements (DPAs) with all vendors
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                    Privacy Shield framework adherence
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CHILDREN'S PRIVACY */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 font-serif">Children's Privacy</h3>
                  <p className="text-gray-600 text-sm mt-1 font-sans">{childrenPrivacy.statement}</p>
                  <p className="text-gray-500 text-xs mt-2 font-sans">{childrenPrivacy.verification}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POLICY UPDATE HISTORY */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-[#6B4F3A] font-serif">Policy Update History</h3>
              <p className="text-sm text-gray-500">Track changes to our Privacy Policy over time</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-3">
              {updateHistory.map((update, index) => (
                <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-16 text-center">
                    <span className="text-xs font-bold text-[#3A7D44]">{update.version}</span>
                    <p className="text-xs text-gray-500">{update.date}</p>
                  </div>
                  <p className="text-sm text-gray-600 flex-1 font-sans">{update.changes}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT INFORMATION - Enhanced */}
        <section className="py-16 bg-gradient-to-r from-[#6B4F3A] to-[#4A3222] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headset className="w-10 h-10 text-[#3bc24f]" />
              </div>
              <h2 className="text-3xl font-bold mb-4 font-serif">Have Questions About Our Privacy Practices?</h2>
              <p className="text-[#F5E6D3] mb-8 font-sans">
                Our Data Protection Team is available Monday-Friday, 9 AM - 6 PM BST to address your privacy concerns.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-3">
                  <Mail className="w-5 h-5 mx-auto mb-2 text-[#3bc24f]" />
                  <p className="text-sm font-sans">info@jutecraftify.com</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <Phone className="w-5 h-5 mx-auto mb-2 text-[#3bc24f]" />
                  <p className="text-sm font-sans">+880 1871-733305</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <MapPin className="w-5 h-5 mx-auto mb-2 text-[#3bc24f]" />
                  <p className="text-sm font-sans">Khulna, Bangladesh</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#3A7D44] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2d6336] transition-all duration-300 font-sans"
              >
                <Send className="w-4 h-4" />
                Contact Privacy Team
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-12 h-12 text-[#3A7D44] mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Ready to Partner With a Trusted Supplier?
              </h2>
              <p className="text-gray-600 text-lg mb-8 font-sans">
                Join hundreds of global businesses that trust Jute Craftify for sustainable jute solutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-[#3A7D44] text-white rounded-lg font-semibold hover:bg-[#2d6336] transition-all duration-300 transform hover:scale-105 font-sans"
                >
                  Browse Products
                </Link>
                <Link
                  href="/contact#request-quote-contact"
                  className="px-8 py-3 border-2 border-[#6B4F3A] text-[#6B4F3A] rounded-lg font-semibold hover:bg-[#6B4F3A] hover:text-white transition-all duration-300 font-sans"
                >
                  Request a Quote
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

    <WhatsAppButton />
    </>
  );
}