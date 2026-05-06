'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  Ship,
  FileText,
  Microchip,
  CreditCard,
  Scale,
  Leaf,
  Calendar,
  Gavel,
  Info,
  Download,
  Headset,
  FileSignature,
  ClipboardList,
  Globe,
  Truck,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Instagram,
  ArrowUp,
  Send,
  FileCheck
} from 'lucide-react';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import WhatsAppButton from '../components/layout/WhatsAppButton';

export default function TermsPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  // Policy sections data
  const policySections = [
    {
      icon: Gavel,
      title: 'Terms of Use',
      description: 'By using our website and services, you agree to provide accurate business information, use the platform for lawful B2B purposes only, respect our intellectual property, and not interfere with website security.',
      list: [
        'Provide accurate, current, and complete information during RFQ and contact forms',
        'Use the website only for lawful B2B purposes and not for unauthorized reselling',
        'Respect intellectual property – all product images, catalogs, and specifications belong to Jute Craftify',
        'Not interfere with website security or attempt to access restricted areas'
      ],
      iconBg: '#F5E6D3'
    },
    {
      icon: Lock,
      title: 'Privacy Policy',
      description: 'Your privacy is a priority. We collect business information to process RFQs, provide quotes, and improve our services. We do not sell or share personal data with third parties except logistics partners, legal compliance, or with your consent.',
      list: [
        'Information collected: Name, Company, Email, Phone, Product interests, Quantity requirements',
        'Data shared only with shipping partners and customs authorities when required',
        'You may request data deletion by contacting privacy@jutecraftify.com',
        'We use secure SSL encryption for all form submissions'
      ],
      iconBg: '#F5E6D3'
    },
    {
      icon: Ship,
      title: 'Shipping & Export Policy',
      description: 'We offer worldwide shipping from Bangladesh via sea freight, air freight, and express courier for samples. Lead times depend on order volume and customization requirements.',
      list: [
        'MOQ: Minimum Order Quantity varies by product (typically 500 pieces for jute bags, 1 ton for raw fiber)',
        'Production Time: 15–30 working days after order confirmation and deposit',
        'Incoterms: EXW (Khulna), FOB (Mongla/Chittagong), or CIF based on agreement',
        'Documentation: Commercial invoice, packing list, bill of lading, and certificate of origin provided'
      ],
      iconBg: '#F5E6D3'
    },
    {
      icon: ClipboardList,
      title: 'Quality & Claims Policy',
      description: 'Jute Craftify ensures strict quality control (ISO 9001:2015 certified). Due to natural jute variations, minor color/shade differences are acceptable.',
      list: [
        'Claims must be reported within 7 days of delivery with photographic evidence',
        'We offer replacement, refund, or credit note for verified manufacturing defects',
        'No returns accepted for custom-made/OEM products unless agreed beforehand',
        'Pre-shipment samples recommended for bulk orders to ensure satisfaction'
      ],
      iconBg: '#F5E6D3'
    },
    {
      icon: Microchip,
      title: 'OEM/ODM & Custom Manufacturing',
      description: 'We offer private labeling, custom sizes, logo printing, and packaging design for bulk buyers seeking unique jute products.',
      list: [
        'Artwork approval and mold/die charges (if any) are non-refundable after production begins',
        'Lead time for custom development: +5–10 working days for sampling',
        'Minimum Order Quantity for custom branding: negotiable based on complexity',
        'Confidentiality: Your designs and specifications are protected under NDA upon request'
      ],
      iconBg: '#F5E6D3'
    },
    {
      icon: CreditCard,
      title: 'Payment Policy',
      description: 'Standard payment terms for international B2B orders ensure secure and transparent transactions for both parties.',
      list: [
        '30%–50% advance payment via TT (Telegraphic Transfer), LC (Letter of Credit), or Escrow',
        'Balance payment against copy of Bill of Lading or before shipment',
        'For established partners, net 30 days after invoice (subject to credit approval)',
        'All bank charges to be borne by respective parties as per agreed incoterms'
      ],
      iconBg: '#F5E6D3'
    }
  ];

  const trustBadges = [
    { icon: Shield, text: 'ISO 9001:2015 Certified' },
    { icon: Leaf, text: 'GOTS Certified' },
    { icon: CheckCircle, text: 'Fair Trade Certified' },
    { icon: Globe, text: 'Export to 35+ Countries' }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/Kz38PVmX/vanilla-powder-coated-cookie-black-tray-marble-background.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6B4F3A]/85 to-[#3A7D44]/55" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
             
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif">
                Terms & <span className="text-[#3bc24f]">Policies</span>
              </h1>
              <p className="text-[#F5E6D3] text-base md:text-lg max-w-2xl mx-auto font-sans">
                Our commitment to transparency, fair trade, and global compliance. 
                Read our guidelines for partnerships, orders, and sustainable cooperation.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {trustBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                      <Icon className="w-3.5 h-3.5 text-[#3bc24f]" />
                      <span className="text-xs text-white font-sans">{badge.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW CARD */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-[#6B4F3A]/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#F5E6D3] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-7 h-7 text-[#3A7D44]" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#6B4F3A] mb-3 font-serif">Overview</h2>
                  <p className="text-gray-700 leading-relaxed font-sans">
                    Welcome to Jute Craftify. These Terms and Policies govern your use of our B2B platform, 
                    product inquiries, quotations, and any business relationship between Jute Craftify and 
                    our clients, suppliers, and buyers. By accessing our website or submitting a Request for 
                    Quotation (RFQ), you agree to comply with the following terms. Our goal is to provide a 
                    reliable, transparent, and sustainable sourcing experience for bulk buyers worldwide.
                  </p>
                  <div className="mt-4 bg-[#F5E6D3] rounded-xl p-3 inline-flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#3A7D44]" />
                    <span className="text-sm text-[#6B4F3A] font-semibold font-sans">
                      For B2B Transactions Only – Casual retail purchases are not supported
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* POLICY SECTIONS GRID */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3A7D44] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                OUR POLICIES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Business Terms & Guidelines
              </h2>
              <p className="text-gray-600 font-sans">
                Clear, transparent policies designed for long-term B2B partnerships
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {policySections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                  >
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: section.iconBg }}>
                        <Icon className="w-6 h-6 text-[#3A7D44]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#6B4F3A] mb-3 font-serif">{section.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 font-sans leading-relaxed">{section.description}</p>
                      <ul className="space-y-2">
                        {section.list.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 font-sans">
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
          </div>
        </section>

        {/* SUSTAINABILITY & ETHICAL COMPLIANCE SECTION */}
        <section className="py-16 bg-gradient-to-r from-[#6B4F3A] to-[#4A3222] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-4">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm font-medium font-sans">SUSTAINABILITY COMMITMENT</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
                  Ethical & Eco-Compliance
                </h2>
                <p className="text-[#F5E6D3] mb-6 leading-relaxed font-sans">
                  Jute Craftify aligns with global sustainability standards. Our operations adhere to strict 
                  ethical guidelines and environmental responsibilities.
                </p>
                <ul className="space-y-3">
                  {[
                    'No child labor, forced labor, or unsafe working conditions',
                    'Biodegradable raw materials and reduced carbon footprint',
                    'GOTS, Fair Trade, OEKO-TEX, ISO 14001 certifications',
                    'Regular audits by third-party bodies (SGS, Intertek)'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#3bc24f]" />
                      <span className="font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold mb-4 font-serif">Our Certifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['ISO 9001:2015', 'GOTS Certified', 'Fair Trade', 'OEKO-TEX', 'ISO 14001', 'SGS Verified'].map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#3bc24f]" />
                      <span className="text-sm font-sans">{cert}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-[#F5E6D3] font-sans">
                    By sourcing from us, you contribute to responsible production and UN SDGs 
                    (Goal 12: Responsible Consumption & Production)
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* GOVERNING LAW & DISPUTE RESOLUTION */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#F5E6D3] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Scale className="w-7 h-7 text-[#3A7D44]" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#6B4F3A] mb-3 font-serif">Governing Law & Arbitration</h2>
                  <p className="text-gray-700 mb-4 leading-relaxed font-sans">
                    These Terms shall be governed by and construed in accordance with the laws of Bangladesh. 
                    Any dispute arising from business transactions or website usage shall be first attempted 
                    to resolve through good-faith negotiation. If unresolved, disputes will be settled by 
                    arbitration in Khulna, Bangladesh, under the Bangladesh Arbitration Act, and the language 
                    shall be English. Both parties agree to waive class-action lawsuits.
                  </p>
                  <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#3A7D44]" />
                      <span className="text-sm text-gray-600 font-sans">legal@jutecraftify.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#3A7D44]" />
                      <span className="text-sm text-gray-600 font-sans">+880 1234 567890</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#3A7D44]" />
                      <span className="text-sm text-gray-600 font-sans">Khulna, Bangladesh</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* RFQ ACKNOWLEDGMENT & CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-[#F5E6D3] rounded-2xl p-6 md:p-8 text-center"
            >
              <div className="w-16 h-16 bg-[#3A7D44]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSignature className="w-8 h-8 text-[#3A7D44]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#6B4F3A] mb-3 font-serif">Request for Quotation (RFQ) Acknowledgment</h2>
              <p className="text-gray-700 max-w-2xl mx-auto mb-6 font-sans">
                All RFQs submitted through our website, WhatsApp, or email are considered genuine business inquiries. 
                By submitting an RFQ, you confirm that you are a business entity or authorized representative. 
                Quotes are valid for 15 days unless otherwise stated.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact#request-quote-contact"
                  className="inline-flex items-center gap-2 bg-[#3A7D44] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2d6336] transition-all duration-300 font-sans"
                >
                  <Send className="w-4 h-4" />
                  Request a Quote Now
                </Link>
              
              </div>
            
            </motion.div>
          </div>
        </section>

        {/* POLICY UPDATES */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
             
              <p className="text-sm text-gray-400 mt-2 font-sans">
                We may update these Terms & Policies from time to time. The latest version will always be posted on this page.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-16 bg-[#6B4F3A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
                Have questions about our policies?
              </h2>
              <p className="text-[#F5E6D3] text-lg mb-8 font-sans">
                Our compliance and legal team is ready to assist B2B buyers with any terms, 
                export documentation, or partnership agreements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-[#3A7D44] text-white rounded-lg font-semibold hover:bg-[#2d6336] transition-all duration-300 transform hover:scale-105 font-sans inline-flex items-center gap-2 justify-center"
                >
                  <Headset className="w-4 h-4" />
                  Contact Legal Team
                </Link>
                <Link
                  href="/products"
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#6B4F3A] transition-all duration-300 font-sans inline-flex items-center gap-2 justify-center"
                >
                  <Globe className="w-4 h-4" />
                  Browse Products
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