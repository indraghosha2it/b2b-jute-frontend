


'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Clock, 
  Shield, 
  Truck, 
  Headphones,
  CheckCircle,
  Send,
  User,
  Building,
  Mail,
  Phone,
  Package,
  MessageCircle,
  HelpCircle,
  Globe
} from 'lucide-react';

export default function CTASection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',

    productInterest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
 
  const benefits = [
    { icon: Clock, text: "Response within 24 hours", color: "#4A7C59" },
    { icon: Shield, text: "Verified Bangladesh Manufacturer", color: "#C6A43B" },
    { icon: Truck, text: "Global shipping to 30+ countries", color: "#6B4F3A" },
    { icon: Headphones, text: "Dedicated account manager", color: "#4A7C59" }
  ];

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
      setFormStatus({
        submitted: true,
        success: true,
        message: data.message || 'Thank you! Your inquiry has been sent. We\'ll contact you within 24 hours.'
      });
      
      // Reset form
      setFormData({ 
        name: '', 
        company: '', 
        email: '', 
        phone: '',
        country: '',
        productInterest: '', 
        message: '' 
      });
      
      // Remove these two lines:
      // setCustomInquiryText('');
      // setShowCustomInquiryField(false);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
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
    
    setTimeout(() => {
      setFormStatus({ submitted: false, success: false, message: '' });
    }, 5000);
  } finally {
    setIsSubmitting(false);
  }
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <section id="request-quote" ref={sectionRef} className="py-8 md:py-12 lg:py-14 bg-gradient-to-r from-[#6B4F3A] to-[#4A7C59] overflow-hidden relative">
      {/* Background Pattern - Simplified for mobile */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 20v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-start">
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center lg:text-left"
          >
            {/* Badge - Smaller */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-0.5 md:px-3 md:py-1 mb-3 md:mb-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                <span className="text-[9px] md:text-[10px] font-semibold text-white tracking-wider uppercase font-sans">
                  Bulk Orders Welcome
                </span>
              </div>
            </motion.div>

            {/* Heading - Smaller */}
            <motion.h2 
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 font-serif leading-tight"
            >
              Looking for a{' '}
              <span className="relative inline-block">
                Reliable Supplier?
                <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 300 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 2C100 0.5 200 0.5 299 2" stroke="#C6A43B" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4"/>
                </svg>
              </span>
            </motion.h2>

            {/* Subheading - Smaller */}
            <motion.p 
              variants={itemVariants}
              className="text-white/80 text-xs md:text-sm mb-3 md:mb-4 font-sans"
            >
              Partner with Bangladesh's leading jute manufacturer. Get competitive wholesale pricing and custom manufacturing.
            </motion.p>

            {/* Trust Badges - Compact */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 md:gap-2 mb-3 md:mb-4"
            >
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-md px-1.5 py-0.5 md:px-2 md:py-1">
                <span className="text-sm md:text-base">🇧🇩</span>
                <span className="text-[8px] md:text-[9px] text-white font-sans">Made in BD</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-md px-1.5 py-0.5 md:px-2 md:py-1">
                <CheckCircle className="w-2 h-2 md:w-2.5 md:h-2.5 text-green-400" />
                <span className="text-[8px] md:text-[9px] text-white font-sans">ISO Certified</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-md px-1.5 py-0.5 md:px-2 md:py-1">
                <CheckCircle className="w-2 h-2 md:w-2.5 md:h-2.5 text-green-400" />
                <span className="text-[8px] md:text-[9px] text-white font-sans">SGS Approved</span>
              </div>
            </motion.div>

            {/* Benefits List - Compact 2x2 grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-1.5 md:gap-2 mb-4 md:mb-5"
            >
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex items-center gap-1 md:gap-1.5">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" />
                    </div>
                    <span className="text-[8px] md:text-[9px] lg:text-[10px] text-white/80 font-sans leading-tight">{benefit.text}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* CTA Buttons - Smaller */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="group relative overflow-hidden bg-[#C6A43B] text-[#2C2420] font-bold px-3 md:px-5 py-1.5 md:py-2 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center gap-1.5 text-[10px] md:text-xs">
                    Get Quote in 24 Hours
                    <motion.div
                      animate={{ x: isHovered ? 3 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </motion.div>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-[#d4b043]"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
              
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium px-3 md:px-5 py-1.5 md:py-2 rounded-full flex items-center justify-center gap-1.5 transition-all duration-300 hover:bg-white/20 w-full sm:w-auto text-[10px] md:text-xs"
                >
                  Browse Products
                  <Package className="w-2.5 h-2.5 md:w-3 md:h-3" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form (More Compact) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-4 md:p-5 lg:p-6"
          >
            <div className="mb-2 md:mb-3">
              <span className="bg-[#F5E6D3] text-[#3bc24f] text-[9px] md:text-[10px] font-semibold px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full mb-1 md:mb-1.5 inline-block font-sans">
                📝 REQUEST QUOTE
              </span>
              <h3 className="text-base md:text-lg font-bold text-[#6B4F3A] mb-0 font-serif">Get a Quote</h3>
              <p className="text-[8px] md:text-[9px] text-gray-600 font-sans">Fill the form, get response in 24 hours</p>
            </div>
            
            {formStatus.submitted && formStatus.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-lg p-3 md:p-4 text-center"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="text-green-500 w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h4 className="text-sm md:text-base font-bold text-gray-900 mb-1 font-serif">Thank You!</h4>
                <p className="text-[9px] md:text-[10px] text-gray-600 mb-2 font-sans">{formStatus.message}</p>
                <button
                  onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                  className="text-[#3bc24f] font-semibold hover:text-[#2da63f] text-[9px] md:text-[10px] font-sans"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2 md:space-y-2.5">
                <div className="grid sm:grid-cols-2 gap-1.5 md:gap-2">
                  <div>
                    <label className="block text-[8px] md:text-[9px] font-semibold text-gray-700 mb-0.5 font-sans">
                      Full Name <span className="text-[#3bc24f]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-2 h-2 md:w-2.5 md:h-2.5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-6 md:pl-7 pr-2 py-0.5 text-[9px] md:text-[10px] border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3bc24f] focus:border-transparent outline-none transition font-sans"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[8px] md:text-[9px] font-semibold text-gray-700 mb-0.5 font-sans">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-2 h-2 md:w-2.5 md:h-2.5" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-6 md:pl-7 pr-2 py-0.5 text-[9px] md:text-[10px] border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3bc24f] focus:border-transparent outline-none transition font-sans"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-1.5 md:gap-2">
                  <div>
                    <label className="block text-[8px] md:text-[9px] font-semibold text-gray-700 mb-0.5 font-sans">
                      Email <span className="text-[#3bc24f]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-2 h-2 md:w-2.5 md:h-2.5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-6 md:pl-7 pr-2 py-0.5 text-[9px] md:text-[10px] border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3bc24f] focus:border-transparent outline-none transition font-sans"
                        placeholder="info@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[8px] md:text-[9px] font-semibold text-gray-700 mb-0.5 font-sans">
                      Phone/WhatsApp <span className="text-[#3bc24f]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-2 h-2 md:w-2.5 md:h-2.5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-6 md:pl-7 pr-2 py-0.5 text-[9px] md:text-[10px] border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3bc24f] focus:border-transparent outline-none transition font-sans"
                        placeholder="+880 1871-733305"
                      />
                    </div>
                  </div>
                </div>

                {/* Country Field */}
                <div className="grid sm:grid-cols-2 gap-1.5 md:gap-2">
                  <div>
                    <label className="block text-[8px] md:text-[9px] font-semibold text-gray-700 mb-0.5 font-sans">
                      Country <span className="text-[#3bc24f]">*</span>
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-2 h-2 md:w-2.5 md:h-2.5" />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="w-full pl-6 md:pl-7 pr-2 py-0.5 text-[9px] md:text-[10px] border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3bc24f] focus:border-transparent outline-none transition bg-white font-sans"
                      >
                        <option value="">Select Country</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="China">China</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Nepal">Nepal</option>
                        <option value="UAE">UAE</option>
                        <option value="Saudi Arabia">Saudi Arabia</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Kuwait">Kuwait</option>
                        <option value="Oman">Oman</option>
                        <option value="Bahrain">Bahrain</option>
                        <option value="Malaysia">Malaysia</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Thailand">Thailand</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="South Korea">South Korea</option>
                      </select>
                    </div>
                  </div>

                  {/* Inquiry Type */}
                    <div>
                  <label className="block text-[8px] md:text-[9px] font-semibold text-gray-700 mb-0.5 font-sans">
                    Product Interest
                  </label>
                  <div className="relative">
                    <Package className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-2 h-2 md:w-2.5 md:h-2.5" />
                    <input
                      type="text"
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      className="w-full pl-6 md:pl-7 pr-2 py-0.5 text-[9px] md:text-[10px] border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3bc24f] focus:border-transparent outline-none transition font-sans"
                      placeholder="Jute Bags, Raw Fiber"
                    />
                  </div>
                </div>
              
                </div>

              

                {/* Product Interest */}
              

                {/* Message */}
                <div>
                  <label className="block text-[8px] md:text-[9px] font-semibold text-gray-700 mb-0.5 font-sans">
                    Message <span className="text-[#3bc24f]">*</span>
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-2 top-1.5 text-gray-400 w-2 h-2 md:w-2.5 md:h-2.5" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={1}
                      className="w-full pl-6 md:pl-7 pr-2 py-0.5 text-[9px] md:text-[10px] border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3bc24f] focus:border-transparent outline-none transition resize-none font-sans"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#3bc24f] to-[#2da63f] text-white font-semibold py-1 md:py-1.5 rounded-md hover:from-[#2da63f] hover:to-[#3bc24f] transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-70 text-[9px] md:text-[10px] font-sans"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Request Quote Now
                      <Send className="w-2 h-2 md:w-2.5 md:h-2.5" />
                    </>
                  )}
                </button>

                <p className="text-[6px] md:text-[7px] text-gray-400 text-center font-sans">
                  We'll respond within 24 hours. Your info is safe with us.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}