'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Clock, 
  Star,
  Facebook,
  Award,
  Users,
  Package,
  Ship,
  Leaf,
  CheckCircle,
  Send,
  ExternalLink,
  Building,
  MessageCircle,
  HelpCircle,
  Headphones,
  Truck,
  ShieldCheck,
  User,
  Navigation
} from 'lucide-react';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
   
    message: '',
    productInterest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
 
  // Count animation states
  const [counts, setCounts] = useState({
    years: 0,
    clients: 0,
    projects: 0,
    countries: 0
  });
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Prevent unwanted scrollbars
  useEffect(() => {
    // Ensure no overflow on body and html
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  // Department contacts
  const departments = [
    {
      name: 'Sales & Inquiries',
      email: 'sales@jutecraftify.com',
      phone: '01871-733305',
      icon: <Package className="w-5 h-5" />
    },
    {
      name: 'Customer Support',
      email: 'info@jutecraftify.com',
      phone: '01871-733306',
      icon: <Headphones className="w-5 h-5" />
    },
    {
      name: 'Export & Shipping',
      email: 'sales@jutecraftify.com',
      phone: '01871-733307',
      icon: <Truck className="w-5 h-5" />
    },
    {
      name: 'Quality Control',
      email: 'info@jutecraftify.com',
      phone: '01871-733308',
      icon: <ShieldCheck className="w-5 h-5" />
    }
  ];

  // Stats data
  const stats = [
    { icon: Award, value: 10, label: 'Years Experience', suffix: '+' },
    { icon: Users, value: 500, label: 'Happy Clients', suffix: '+' },
    { icon: Package, value: 1000, label: 'Projects Completed', suffix: '+' },
    { icon: Ship, value: 30, label: 'Countries Exported', suffix: '+' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/jutecraftify', color: 'hover:bg-[#0077B5]' },
    { name: 'X', icon: Twitter, url: 'https://x.com/jutecraftify', color: 'hover:bg-[#000000]' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/jutecraftify5730', color: 'hover:bg-gradient-to-r from-[#833AB4] to-[#E4405F]' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@Juteccraftify', color: 'hover:bg-[#FF0000]' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/JuteCraftify', color: 'hover:bg-[#1877F2]' },
  ];

  // Count animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const step = 20;
          const targets = {
            years: 10,
            clients: 500,
            projects: 1000,
            countries: 30
          };
          
          const increments = {
            years: targets.years / (duration / step),
            clients: targets.clients / (duration / step),
            projects: targets.projects / (duration / step),
            countries: targets.countries / (duration / step)
          };
          
          let current = { years: 0, clients: 0, projects: 0, countries: 0 };
          const timer = setInterval(() => {
            let allComplete = true;
            
            if (current.years < targets.years) {
              current.years = Math.min(current.years + increments.years, targets.years);
              allComplete = false;
            }
            if (current.clients < targets.clients) {
              current.clients = Math.min(current.clients + increments.clients, targets.clients);
              allComplete = false;
            }
            if (current.projects < targets.projects) {
              current.projects = Math.min(current.projects + increments.projects, targets.projects);
              allComplete = false;
            }
            if (current.countries < targets.countries) {
              current.countries = Math.min(current.countries + increments.countries, targets.countries);
              allComplete = false;
            }
            
            setCounts({
              years: Math.floor(current.years),
              clients: Math.floor(current.clients),
              projects: Math.floor(current.projects),
              countries: Math.floor(current.countries)
            });
            
            if (allComplete) clearInterval(timer);
          }, step);
        }
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Add this to your ContactPage component
useEffect(() => {
  // Check if there's a hash in the URL
  if (window.location.hash === '#request-quote-contact') {
    // Wait a bit for the page to render
    setTimeout(() => {
      const element = document.getElementById('request-quote-contact');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 500);
  }
}, []);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
};


 const handleSubmit = async (e) => {
  e.preventDefault();
  
 
  
  setFormStatus({ submitted: true, success: false, message: 'Sending...' });
  setIsSubmitting(true);

  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        country: formData.country,
        message: formData.message,
        productInterest: formData.productInterest
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setSubmitSuccess(true);
      setFormStatus({
        submitted: true,
        success: true,
        message: data.message || 'Thank you! Your inquiry has been sent. We\'ll contact you within 2 hours.'
      });
      
      // Reset form
      setFormData({ 
        name: '', 
        company: '', 
        email: '', 
        phone: '', 
        country: '',
     
        message: '', 
        productInterest: '' 
      });
   
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormStatus({ submitted: false, success: false, message: '' });
      }, 5000);
    } else {
      throw new Error(data.error || 'Failed to send message');
    }
  } catch (error) {
    console.error('Contact form error:', error);
    setFormStatus({
      submitted: true,
      success: false,
      message: error.message || 'Failed to send message. Please try again later.'
    });
    
    // Auto-hide error message after 5 seconds
    setTimeout(() => {
      setFormStatus({ submitted: false, success: false, message: '' });
    }, 5000);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative mt-6 pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/C3z1btBc/front-view-ecological-zero-waster-concept-1.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#6B4F3A]/60 to-[#4A3222]/90" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-4 border border-white/20">
              <Leaf className="w-4 h-4 text-[#3bc24f]" />
              <span className="text-[#F5E6D3] text-sm font-medium font-sans">Sustainable Jute Solutions</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif">
              Contact <span className="text-[#3bc24f]">Jute Craftify</span>
            </h1>
            <p className="text-[#F5E6D3] text-base md:text-lg max-w-2xl mx-auto font-sans">
              Your trusted partner in premium jute products, serving global businesses with 
              sustainable, eco-friendly solutions from the heart of Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 -mt-16 sm:-mt-20 relative z-20">
            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#F5E6D3] rounded-lg sm:rounded-xl flex items-center justify-center text-[#3bc24f] mb-3 sm:mb-4 group-hover:bg-[#3bc24f] group-hover:text-white transition-all duration-300">
                <MapPin className="text-lg sm:text-xl md:text-2xl" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 font-serif">Address</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 font-sans">
                34/6, Mongla, Khulna<br />
                Bangladesh, 9100
              </p>
              <a
                href="https://maps.google.com/?q=34/6,Mongla,Khulna,Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 sm:gap-2 text-[#3bc24f] font-semibold hover:text-[#2da63f] text-xs sm:text-sm font-sans"
              >
                <span>Get Directions</span>
                <span>→</span>
              </a>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#F5E6D3] rounded-lg sm:rounded-xl flex items-center justify-center text-[#3bc24f] mb-3 sm:mb-4 group-hover:bg-[#3bc24f] group-hover:text-white transition-all duration-300">
                <Phone className="text-lg sm:text-xl md:text-2xl" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 font-serif">Phone / WhatsApp</h3>
              <a 
                href="tel:01871733305"
                className="text-xs sm:text-sm text-gray-600 hover:text-[#3bc24f] transition-colors block mb-1 sm:mb-2 font-sans"
              >
                01871-733305
              </a>
              <p className="text-[10px] sm:text-xs text-gray-500 font-sans">24/7 Support</p>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#F5E6D3] rounded-lg sm:rounded-xl flex items-center justify-center text-[#3bc24f] mb-3 sm:mb-4 group-hover:bg-[#3bc24f] group-hover:text-white transition-all duration-300">
                <Mail className="text-lg sm:text-xl md:text-2xl" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 font-serif">Email</h3>
              <a 
                href="mailto:info@jutecraftify.com"
                className="text-xs sm:text-sm text-gray-600 hover:text-[#3bc24f] transition-colors block mb-1 sm:mb-2 break-all font-sans"
              >
                info@jutecraftify.com
              </a>
              <p className="text-[10px] sm:text-xs text-gray-500 font-sans">Response within 2 hours</p>
            </motion.div>

            {/* Websites Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#F5E6D3] rounded-lg sm:rounded-xl flex items-center justify-center text-[#3bc24f] mb-3 sm:mb-4 group-hover:bg-[#3bc24f] group-hover:text-white transition-all duration-300">
                <Globe className="text-lg sm:text-xl md:text-2xl" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 font-serif">Websites</h3>
              <div className="space-y-1 mb-2 sm:mb-4">
                <a 
                  href="https://jutecraftify.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs sm:text-sm text-gray-600 hover:text-[#3bc24f] transition flex items-center gap-1 font-sans"
                >
                  jutecraftify.com <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://bd1568632076susg.trustpass.alibaba.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs sm:text-sm text-gray-600 hover:text-[#3bc24f] transition flex items-center gap-1 font-sans"
                >
                  Alibaba Store <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const countValue = 
                index === 0 ? counts.years :
                index === 1 ? counts.clients :
                index === 2 ? counts.projects : counts.countries;
              
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#F5E6D3] rounded-full mb-3 group-hover:bg-[#3bc24f] transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#6B4F3A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-[#6B4F3A] font-serif">
                    {countValue}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-600 font-sans">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content - About & Contact Form */}
      <section id="request-quote-contact" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Side - About Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Who We Are
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed font-sans">
                Jute Craftify is a premier manufacturer and exporter of high-quality jute products based in Khulna, Bangladesh. 
                With over a decade of experience, we have established ourselves as a trusted supplier to clients across the globe.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed font-sans">
                Our commitment to sustainability, quality craftsmanship, and customer satisfaction drives everything we do. 
                From raw jute fiber to finished products, we maintain the highest standards of eco-friendly production.
              </p>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#6B4F3A] mb-3 font-serif">Our Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['Raw Jute Fiber', 'Jute Yarn & Twine', 'Jute Bags', 'Home Decor', 'Industrial Jute'].map((cat, i) => (
                    <span key={i} className="px-3 py-1 bg-[#F5E6D3] text-[#6B4F3A] rounded-full text-sm font-sans">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Business Type */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#6B4F3A] mb-3 font-serif">Business Type</h3>
                <div className="flex items-center gap-2 text-gray-700 font-sans">
                  <CheckCircle className="w-5 h-5 text-[#3bc24f]" />
                  <span>Wholesale & Supply Shop - B2B Global Export</span>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h3 className="text-xl font-semibold text-[#6B4F3A] mb-3 font-serif">Business Hours</h3>
                <div className="flex items-center gap-2 text-gray-700 font-sans">
                  <Clock className="w-5 h-5 text-[#3bc24f]" />
                  <span>Always Open - 24/7 Online Support</span>
                </div>
              </div>

              {/* Department Contacts */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-[#6B4F3A] mb-3 font-serif">Department Contacts</h3>
                <div className="space-y-3">
                  {departments.map((dept, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="w-10 h-10 bg-[#F5E6D3] rounded-lg flex items-center justify-center text-[#3bc24f]">
                        {dept.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm font-sans">{dept.name}</h4>
                        <p className="text-xs text-gray-600 font-sans">{dept.email}</p>
                        <p className="text-xs text-gray-600 font-sans">{dept.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="mb-6">
                <span className="bg-[#F5E6D3] text-[#3bc24f] text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block font-sans">
                  📝 SEND INQUIRY
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#6B4F3A] mb-2 font-serif">Get in Touch</h2>
                <p className="text-gray-600 font-sans">Request a quote or ask any questions about our products</p>
              </div>
              
              {formStatus.submitted && formStatus.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                >
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-500 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">Thank You!</h3>
                  <p className="text-sm text-gray-600 mb-4 font-sans">{formStatus.message}</p>
                  <button
                    onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                    className="text-[#3bc24f] font-semibold hover:text-[#2da63f] text-sm font-sans"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 font-sans">
                        Full Name <span className="text-[#3bc24f]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent outline-none transition font-sans"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 font-sans">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent outline-none transition font-sans"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 font-sans">
                        Email Address <span className="text-[#3bc24f]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent outline-none transition font-sans"
                          placeholder="info@yourcompany.com"
                        />
                      </div>
                    </div>
                
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 font-sans">
                        Country
                      </label>
                      <select
  name="country"
  value={formData.country}
  onChange={handleChange}
  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent outline-none transition bg-white font-sans"
>
  <option value="">Select Country</option>

  <option value="Afghanistan">Afghanistan</option>
  <option value="Albania">Albania</option>
  <option value="Algeria">Algeria</option>
  <option value="Andorra">Andorra</option>
  <option value="Angola">Angola</option>
  <option value="Antigua and Barbuda">Antigua and Barbuda</option>
  <option value="Argentina">Argentina</option>
  <option value="Armenia">Armenia</option>
  <option value="Australia">Australia</option>
  <option value="Austria">Austria</option>
  <option value="Azerbaijan">Azerbaijan</option>
  <option value="Bahamas">Bahamas</option>
  <option value="Bahrain">Bahrain</option>
  <option value="Bangladesh">Bangladesh</option>
  <option value="Barbados">Barbados</option>
  <option value="Belarus">Belarus</option>
  <option value="Belgium">Belgium</option>
  <option value="Belize">Belize</option>
  <option value="Benin">Benin</option>
  <option value="Bhutan">Bhutan</option>
  <option value="Bolivia">Bolivia</option>
  <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
  <option value="Botswana">Botswana</option>
  <option value="Brazil">Brazil</option>
  <option value="Brunei">Brunei</option>
  <option value="Bulgaria">Bulgaria</option>
  <option value="Burkina Faso">Burkina Faso</option>
  <option value="Burundi">Burundi</option>
  <option value="Cabo Verde">Cabo Verde</option>
  <option value="Cambodia">Cambodia</option>
  <option value="Cameroon">Cameroon</option>
  <option value="Canada">Canada</option>
  <option value="Central African Republic">Central African Republic</option>
  <option value="Chad">Chad</option>
  <option value="Chile">Chile</option>
  <option value="China">China</option>
  <option value="Colombia">Colombia</option>
  <option value="Comoros">Comoros</option>
  <option value="Congo (Congo-Brazzaville)">Congo (Congo-Brazzaville)</option>
  <option value="Costa Rica">Costa Rica</option>
  <option value="Croatia">Croatia</option>
  <option value="Cuba">Cuba</option>
  <option value="Cyprus">Cyprus</option>
  <option value="Czechia">Czechia</option>
  <option value="Denmark">Denmark</option>
  <option value="Djibouti">Djibouti</option>
  <option value="Dominica">Dominica</option>
  <option value="Dominican Republic">Dominican Republic</option>
  <option value="Ecuador">Ecuador</option>
  <option value="Egypt">Egypt</option>
  <option value="El Salvador">El Salvador</option>
  <option value="Equatorial Guinea">Equatorial Guinea</option>
  <option value="Eritrea">Eritrea</option>
  <option value="Estonia">Estonia</option>
  <option value="Eswatini">Eswatini</option>
  <option value="Ethiopia">Ethiopia</option>
  <option value="Fiji">Fiji</option>
  <option value="Finland">Finland</option>
  <option value="France">France</option>
  <option value="Gabon">Gabon</option>
  <option value="Gambia">Gambia</option>
  <option value="Georgia">Georgia</option>
  <option value="Germany">Germany</option>
  <option value="Ghana">Ghana</option>
  <option value="Greece">Greece</option>
  <option value="Grenada">Grenada</option>
  <option value="Guatemala">Guatemala</option>
  <option value="Guinea">Guinea</option>
  <option value="Guinea-Bissau">Guinea-Bissau</option>
  <option value="Guyana">Guyana</option>
  <option value="Haiti">Haiti</option>
  <option value="Honduras">Honduras</option>
  <option value="Hungary">Hungary</option>
  <option value="Iceland">Iceland</option>
  <option value="India">India</option>
  <option value="Indonesia">Indonesia</option>
  <option value="Iran">Iran</option>
  <option value="Iraq">Iraq</option>
  <option value="Ireland">Ireland</option>
  <option value="Israel">Israel</option>
  <option value="Italy">Italy</option>
  <option value="Jamaica">Jamaica</option>
  <option value="Japan">Japan</option>
  <option value="Jordan">Jordan</option>
  <option value="Kazakhstan">Kazakhstan</option>
  <option value="Kenya">Kenya</option>
  <option value="Kiribati">Kiribati</option>
  <option value="Kuwait">Kuwait</option>
  <option value="Kyrgyzstan">Kyrgyzstan</option>
  <option value="Laos">Laos</option>
  <option value="Latvia">Latvia</option>
  <option value="Lebanon">Lebanon</option>
  <option value="Lesotho">Lesotho</option>
  <option value="Liberia">Liberia</option>
  <option value="Libya">Libya</option>
  <option value="Liechtenstein">Liechtenstein</option>
  <option value="Lithuania">Lithuania</option>
  <option value="Luxembourg">Luxembourg</option>
  <option value="Madagascar">Madagascar</option>
  <option value="Malawi">Malawi</option>
  <option value="Malaysia">Malaysia</option>
  <option value="Maldives">Maldives</option>
  <option value="Mali">Mali</option>
  <option value="Malta">Malta</option>
  <option value="Marshall Islands">Marshall Islands</option>
  <option value="Mauritania">Mauritania</option>
  <option value="Mauritius">Mauritius</option>
  <option value="Mexico">Mexico</option>
  <option value="Micronesia">Micronesia</option>
  <option value="Moldova">Moldova</option>
  <option value="Monaco">Monaco</option>
  <option value="Mongolia">Mongolia</option>
  <option value="Montenegro">Montenegro</option>
  <option value="Morocco">Morocco</option>
  <option value="Mozambique">Mozambique</option>
  <option value="Myanmar">Myanmar</option>
  <option value="Namibia">Namibia</option>
  <option value="Nauru">Nauru</option>
  <option value="Nepal">Nepal</option>
  <option value="Netherlands">Netherlands</option>
  <option value="New Zealand">New Zealand</option>
  <option value="Nicaragua">Nicaragua</option>
  <option value="Niger">Niger</option>
  <option value="Nigeria">Nigeria</option>
  <option value="North Korea">North Korea</option>
  <option value="North Macedonia">North Macedonia</option>
  <option value="Norway">Norway</option>
  <option value="Oman">Oman</option>
  <option value="Pakistan">Pakistan</option>
  <option value="Palau">Palau</option>
  <option value="Panama">Panama</option>
  <option value="Papua New Guinea">Papua New Guinea</option>
  <option value="Paraguay">Paraguay</option>
  <option value="Peru">Peru</option>
  <option value="Philippines">Philippines</option>
  <option value="Poland">Poland</option>
  <option value="Portugal">Portugal</option>
  <option value="Qatar">Qatar</option>
  <option value="Romania">Romania</option>
  <option value="Russia">Russia</option>
  <option value="Rwanda">Rwanda</option>
  <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
  <option value="Saint Lucia">Saint Lucia</option>
  <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
  <option value="Samoa">Samoa</option>
  <option value="San Marino">San Marino</option>
  <option value="Sao Tome and Principe">Sao Tome and Principe</option>
  <option value="Saudi Arabia">Saudi Arabia</option>
  <option value="Senegal">Senegal</option>
  <option value="Serbia">Serbia</option>
  <option value="Seychelles">Seychelles</option>
  <option value="Sierra Leone">Sierra Leone</option>
  <option value="Singapore">Singapore</option>
  <option value="Slovakia">Slovakia</option>
  <option value="Slovenia">Slovenia</option>
  <option value="Solomon Islands">Solomon Islands</option>
  <option value="Somalia">Somalia</option>
  <option value="South Africa">South Africa</option>
  <option value="South Korea">South Korea</option>
  <option value="South Sudan">South Sudan</option>
  <option value="Spain">Spain</option>
  <option value="Sri Lanka">Sri Lanka</option>
  <option value="Sudan">Sudan</option>
  <option value="Suriname">Suriname</option>
  <option value="Sweden">Sweden</option>
  <option value="Switzerland">Switzerland</option>
  <option value="Syria">Syria</option>
  <option value="Taiwan">Taiwan</option>
  <option value="Tajikistan">Tajikistan</option>
  <option value="Tanzania">Tanzania</option>
  <option value="Thailand">Thailand</option>
  <option value="Timor-Leste">Timor-Leste</option>
  <option value="Togo">Togo</option>
  <option value="Tonga">Tonga</option>
  <option value="Trinidad and Tobago">Trinidad and Tobago</option>
  <option value="Tunisia">Tunisia</option>
  <option value="Turkey">Turkey</option>
  <option value="Turkmenistan">Turkmenistan</option>
  <option value="Tuvalu">Tuvalu</option>
  <option value="Uganda">Uganda</option>
  <option value="Ukraine">Ukraine</option>
  <option value="United Arab Emirates">United Arab Emirates</option>
  <option value="United Kingdom">United Kingdom</option>
  <option value="United States">United States</option>
  <option value="Uruguay">Uruguay</option>
  <option value="Uzbekistan">Uzbekistan</option>
  <option value="Vanuatu">Vanuatu</option>
  <option value="Vatican City">Vatican City</option>
  <option value="Venezuela">Venezuela</option>
  <option value="Vietnam">Vietnam</option>
  <option value="Yemen">Yemen</option>
  <option value="Zambia">Zambia</option>
  <option value="Zimbabwe">Zimbabwe</option>
</select>
                    </div>
                        <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 font-sans">
                        Phone / WhatsApp <span className="text-[#3bc24f]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent outline-none transition font-sans"
                          placeholder="+880 1871-733305"
                        />
                      </div>
                    </div>
               
                  </div>

              

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 font-sans">
                      Product Interest (Optional)
                    </label>
                    <div className="relative">
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        name="productInterest"
                        value={formData.productInterest}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent outline-none transition font-sans"
                        placeholder="e.g., Jute Bags, Raw Fiber, Rugs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 font-sans">
                      Message <span className="text-[#3bc24f]">*</span>
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent outline-none transition resize-none font-sans"
                        placeholder="Tell us about your requirements, quantities, etc..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#3bc24f] to-[#2da63f] text-white font-semibold py-3 rounded-lg hover:from-[#2da63f] hover:to-[#3bc24f] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 font-sans"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center font-sans">
                    By submitting this form, you agree to our privacy policy and terms of service.
                    We'll respond within 2 hours during business hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Social Links & Rating */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="font-semibold text-[#6B4F3A] text-xl mb-4 font-serif">Follow Us</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 hover:text-white ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
       
        </div>
      </section>

      {/* Professional Map Section - No Scrollbar */}
      <section className="relative w-full overflow-hidden">
        {/* Map Container */}
        <div className="relative h-[400px] md:h-[450px] lg:h-[500px] w-full">
          {/* Loading Overlay */}
          {!mapLoaded && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#3bc24f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 text-sm font-sans">Loading map...</p>
              </div>
            </div>
          )}
          
          {/* Google Maps Iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d471274.6897589161!2d89.24113108950083!3d22.659995139637502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s34%2F6%2CMongla%2C%20Khulna%2C%20Bangladesh%2C%20Khulna%2C%20Bangladesh%2C%209100!5e0!3m2!1sen!2sbd!4v1776240603524!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Jute Craftify Location Map"
            onLoad={() => setMapLoaded(true)}
            className="w-full h-full object-cover"
          ></iframe>
        </div>

        {/* Map Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-20">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 border border-white/20"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-[#3bc24f]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#3bc24f]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm font-serif">Our Headquarters</h4>
                <p className="text-xs text-gray-600 mt-0.5 font-sans">
                  34/6, Mongla, Khulna, Bangladesh, 9100
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Navigation className="w-3.5 h-3.5 text-[#3bc24f]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-sans">Distance</p>
                  <p className="text-xs font-semibold text-gray-700 font-sans">Central Location</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-[#3bc24f]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-sans">Office Hours</p>
                  <p className="text-xs font-semibold text-gray-700 font-sans">24/7 Support</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="https://maps.google.com/?q=34/6,Mongla,Khulna,Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#3bc24f] text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-[#2da63f] transition-colors font-sans"
              >
                Get Directions
              </a>
              <button
                onClick={() => {
                  const iframe = document.querySelector('iframe');
                  if (iframe) {
                    iframe.src = iframe.src;
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors font-sans"
              >
                Refresh Map
              </button>
            </div>
          </motion.div>
        </div>

        {/* Decorative gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none"></div>
      </section>
      
      <Footer />
    </div>
  );
}