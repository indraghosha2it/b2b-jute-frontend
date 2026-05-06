'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Award, 
  Users, 
  Package, 
  Ship, 
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Clock,
  Star,
  Shield,
  Recycle,
  Droplets,
  Sun,
  Trees,
  Heart,
  MessageCircle,
  User,
  Send,
  ExternalLink,
  Target,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import CountUp from 'react-countup';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
    const [categories, setCategories] = useState([]); // ADD THIS
  const [isLoadingCategories, setIsLoadingCategories] = useState(true); // ADD THI
    const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const categoriesScrollRef = useRef(null);
  const statsRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Fetch categories from API
useEffect(() => {
  fetchCategories();
}, []);

// Set up scroll listeners for categories
useEffect(() => {
  const container = categoriesScrollRef.current;
  if (container && categories.length > 0) {
    container.addEventListener('scroll', checkCategoriesScroll);
    checkCategoriesScroll();
    window.addEventListener('resize', checkCategoriesScroll);
    return () => {
      container.removeEventListener('scroll', checkCategoriesScroll);
      window.removeEventListener('resize', checkCategoriesScroll);
    };
  }
}, [categories]);

const fetchCategories = async () => {
  setIsLoadingCategories(true);
  try {
    const response = await fetch('http://localhost:5000/api/categories');
    const data = await response.json();
    
    if (data.success) {
      // REMOVE .slice(0, 5) - show ALL categories
      const formattedCategories = data.data.map(cat => ({
        _id: cat._id,
        name: cat.name,
        slug: cat.slug,
      }));
      setCategories(formattedCategories);
      // Show right arrow if more than 5 categories
      setShowRightArrow(formattedCategories.length > 5);
    } else {
      // Fallback categories
      setCategories([
        { _id: '1', name: 'Raw Jute Fiber', slug: 'raw-jute-fiber' },
        { _id: '2', name: 'Jute Yarn & Twine', slug: 'jute-yarn-twine' },
        { _id: '3', name: 'Jute Bags', slug: 'jute-bags' },
        { _id: '4', name: 'Home Decor', slug: 'home-decor' },
        { _id: '5', name: 'Industrial Jute', slug: 'industrial-jute' },
        { _id: '6', name: 'Jute Rugs', slug: 'jute-rugs' },
        { _id: '7', name: 'Jute Ropes', slug: 'jute-ropes' },
      ]);
      setShowRightArrow(true);
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    setCategories([
      { _id: '1', name: 'Raw Jute Fiber', slug: 'raw-jute-fiber' },
      { _id: '2', name: 'Jute Yarn & Twine', slug: 'jute-yarn-twine' },
      { _id: '3', name: 'Jute Bags', slug: 'jute-bags' },
      { _id: '4', name: 'Home Decor', slug: 'home-decor' },
      { _id: '5', name: 'Industrial Jute', slug: 'industrial-jute' },
      { _id: '6', name: 'Jute Rugs', slug: 'jute-rugs' },
      { _id: '7', name: 'Jute Ropes', slug: 'jute-ropes' },
    ]);
    setShowRightArrow(true);
  } finally {
    setIsLoadingCategories(false);
  }
};

// Check scroll position to show/hide arrows
// Check scroll position to show/hide arrows
const checkCategoriesScroll = () => {
  if (categoriesScrollRef.current) {
    const { scrollLeft, scrollWidth, clientWidth } = categoriesScrollRef.current;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  }
};

// Scroll categories left or right
// Scroll categories left or right
const scrollCategories = (direction) => {
  if (categoriesScrollRef.current) {
    const scrollAmount = 300;
    const currentScroll = categoriesScrollRef.current.scrollLeft;
    const newScrollLeft = direction === 'left' 
      ? currentScroll - scrollAmount
      : currentScroll + scrollAmount;
    
    categoriesScrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  // Company Stats
  const stats = [
    { icon: Award, value: 12, label: 'Years Experience', suffix: '+' },
    { icon: Users, value: 500, label: 'Happy Clients', suffix: '+' },
    { icon: Package, value: 2000, label: 'Projects Completed', suffix: '+' },
    { icon: Ship, value: 35, label: 'Countries Exported', suffix: '+' },
  ];

  // Certifications
  const certifications = [
    { name: 'ISO 9001:2015', description: 'Quality Management System', icon: Shield },
    { name: 'GOTS Certified', description: 'Global Organic Textile Standard', icon: Leaf },
    { name: 'Fair Trade', description: 'Ethical Trade Certified', icon: Heart },
    { name: 'OEKO-TEX', description: 'Eco-Friendly Textile', icon: Recycle },
  ];

  // Sustainability Initiatives
  const sustainabilityInitiatives = [
    { icon: Droplets, title: 'Water Conservation', description: 'Zero liquid discharge system reducing water waste by 60%' },
    { icon: Sun, title: 'Solar Energy', description: '30% of factory energy from solar panels' },
    { icon: Recycle, title: 'Waste Management', description: '95% production waste recycled or upcycled' },
    { icon: Trees, title: 'Tree Plantation', description: 'Planted 10,000+ trees in local communities' },
  ];

  // Core Values
  const values = [
    { icon: Leaf, title: 'Sustainability First', description: 'Eco-friendly practices in every step' },
    { icon: Heart, title: 'Ethical Sourcing', description: 'Fair wages and safe working conditions' },
    { icon: Target, title: 'Quality Excellence', description: 'Premium products with strict quality control' },
    { icon: Users, title: 'Customer Partnership', description: 'Long-term relationships with global buyers' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/JuteCraftify', color: 'hover:bg-[#1877F2]' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/jutecraftify5730', color: 'hover:bg-gradient-to-r from-[#833AB4] to-[#E4405F]' },
    { name: 'Twitter', icon: Twitter, url: 'https://x.com/jutecraftify', color: 'hover:bg-[#000000]' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/jutecraftify', color: 'hover:bg-[#0077B5]' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@Juteccraftify', color: 'hover:bg-[#FF0000]' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white mt-6 overflow-x-hidden">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/G4RJnfg0/nuts-glass-autumn-leaves.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#6B4F3A]/40 to-[#4A3222]/85" />
          </div>
          
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-4 border border-white/20">
                <Leaf className="w-4 h-4 text-[#3bc24f]" />
                <span className="text-[#F5E6D3] text-sm font-medium font-sans">Sustainable Jute Solutions</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif">
                About <span className="text-[#3bc24f]">Jute Craftify</span>
              </h1>
              <p className="text-[#F5E6D3] text-base md:text-lg max-w-2xl mx-auto font-sans">
                Your trusted partner in premium jute products, serving global businesses with 
                sustainable, eco-friendly solutions from the heart of Bangladesh.
              </p>
            </div>
          </div>
        </section>

        {/* STATS SECTION WITH COUNT ANIMATION */}
        <section ref={statsRef} className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[#F5E6D3] rounded-full mb-3 group-hover:bg-[#3bc24f] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#6B4F3A] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-[#6B4F3A] font-serif">
                      {statsInView ? (
                        <CountUp start={0} end={stat.value} duration={2.5} delay={0.2} />
                      ) : '0'}
                      {stat.suffix}
                    </div>
                    <div className="text-sm text-gray-600 font-sans">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHO WE ARE SECTION */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="bg-[#F5E6D3] text-[#3bc24f] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                  OUR STORY
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
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
                
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#3bc24f]" />
                    <span className="text-sm text-gray-700 font-sans">100% Eco-Friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#3bc24f]" />
                    <span className="text-sm text-gray-700 font-sans">B2B Global Export</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#3bc24f]" />
                    <span className="text-sm text-gray-700 font-sans">Custom Manufacturing</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://i.ibb.co.com/7d7RNNCW/668726540-122168849006403420-928130145174392799-n.jpg"
                    alt="Jute Factory"
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#6B4F3A]/60 to-transparent"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 max-w-[200px]">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-[#3bc24f]" />
                    <span className="font-semibold text-sm font-sans">Made in Bangladesh</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-sans">Premium quality jute products</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

{/* OUR PRODUCT CATEGORIES */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <span className="bg-[#F5E6D3] text-[#3bc24f] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
        WHAT WE OFFER
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
        Our Product Categories
      </h2>
      <p className="text-gray-600 font-sans">
        We offer a comprehensive range of jute products to meet diverse business needs
      </p>
      {categories.length > 5 && (
        <p className="text-xs text-[#8B7355] mt-2 font-sans">
          ← Scroll horizontally to see all categories →
        </p>
      )}
    </div>

    {isLoadingCategories ? (
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex-shrink-0 w-28 sm:w-32 md:w-36">
            <div className="bg-gray-100 rounded-xl p-4 text-center animate-pulse h-32 flex flex-col items-center justify-center">
              <div className="w-8 h-8 mx-auto mb-2 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="relative group">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scrollCategories('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 hover:bg-gray-50 -ml-3 md:-ml-4 transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-[#6B4F3A]" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scrollCategories('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 border border-gray-200 hover:bg-gray-50 -mr-3 md:-mr-4 transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-[#6B4F3A]" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={categoriesScrollRef}
          className="flex overflow-x-auto gap-4 pb-4 scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {categories.map((category, index) => (
            <Link
              key={category._id}
              href={`/products?category=${category._id}`}
              className="flex-shrink-0 w-28 sm:w-32 md:w-52"
            >
             <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: Math.min(index * 0.05, 0.5) }}
  viewport={{ once: true }}
  className="bg-[#F5E6D3] rounded-xl p-4 text-center hover:bg-[#2f963f] transition-all duration-300 cursor-pointer h-32 flex flex-col items-center justify-center"
  style={{ transition: 'all 0.3s ease' }}
  onMouseEnter={(e) => {
    const icon = e.currentTarget.querySelector('.category-icon');
    const text = e.currentTarget.querySelector('.category-text');
    if (icon) icon.style.color = 'white';
    if (text) text.style.color = 'white';
  }}
  onMouseLeave={(e) => {
    const icon = e.currentTarget.querySelector('.category-icon');
    const text = e.currentTarget.querySelector('.category-text');
    if (icon) icon.style.color = '#6B4F3A';
    if (text) text.style.color = '#6B4F3A';
  }}
>
  <Package className="category-icon w-8 h-8 mx-auto mb-2 text-[#6B4F3A] transition-colors duration-300" />
  <p className="category-text font-semibold text-xs sm:text-sm text-[#6B4F3A] transition-colors duration-300 font-sans line-clamp-2 text-center px-1">
    {category.name}
  </p>
</motion.div>
            </Link>
          ))}
        </div>
      </div>
    )}
  </div>
</section>

        {/* SUSTAINABILITY SECTION */}
        <section className="py-16 bg-gradient-to-r from-[#6B4F3A] to-[#4A3222] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 mb-4">
                <Leaf className="w-4 h-4" />
                <span className="text-sm font-medium font-sans">SUSTAINABILITY</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
                Our Commitment to a Greener Planet
              </h2>
              <p className="text-[#F5E6D3] font-sans">
                We believe in creating a sustainable future through eco-friendly practices and responsible manufacturing
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sustainabilityInitiatives.map((initiative, index) => {
                const Icon = initiative.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#3bc24f]/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#3bc24f]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 font-serif">{initiative.title}</h3>
                    <p className="text-sm text-[#F5E6D3] font-sans">{initiative.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Sustainability Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3bc24f] font-serif">60%</div>
                <p className="text-sm text-[#F5E6D3] mt-1 font-sans">Less Water Usage</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3bc24f] font-serif">95%</div>
                <p className="text-sm text-[#F5E6D3] mt-1 font-sans">Waste Recycled</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3bc24f] font-serif">30%</div>
                <p className="text-sm text-[#F5E6D3] mt-1 font-sans">Solar Energy</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3bc24f] font-serif">10K+</div>
                <p className="text-sm text-[#F5E6D3] mt-1 font-sans">Trees Planted</p>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3bc24f] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                CERTIFICATIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                Our Accreditations
              </h2>
              <p className="text-gray-600 font-sans">
                We are proud to be certified by leading global organizations for quality and sustainability
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-16 h-16 bg-[#F5E6D3] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-[#3bc24f]" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 font-serif">{cert.name}</h3>
                    <p className="text-sm text-gray-600 font-sans">{cert.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <Shield className="w-4 h-4 text-[#3bc24f]" />
                <span className="text-sm text-gray-700 font-sans">Trade Assurance</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
                <span className="text-sm text-gray-700 font-sans">Onsite Checked</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <Clock className="w-4 h-4 text-[#3bc24f]" />
                <span className="text-sm text-gray-700 font-sans">Quick Responder</span>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES SECTION */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="bg-[#F5E6D3] text-[#3bc24f] text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 font-sans">
                OUR VALUES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#6B4F3A] mb-4 font-serif">
                What Drives Us
              </h2>
              <p className="text-gray-600 font-sans">
                These core principles guide everything we do at Jute Craftify
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-[#F5E6D3] rounded-xl flex items-center justify-center mx-auto mb-4 text-[#3bc24f]">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">{value.title}</h3>
                    <p className="text-sm text-gray-600 font-sans">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BUSINESS HOURS & SOCIAL LINKS */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Business Hours */}
              <div className="bg-[#F5E6D3] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-[#3bc24f]" />
                  <h3 className="text-2xl font-bold text-[#6B4F3A] font-serif">Business Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-[#6B4F3A]/20">
                    <span className="font-semibold text-[#6B4F3A] font-sans">Monday - Friday</span>
                    <span className="text-gray-700 font-sans">9:00 AM - 6:00 PM (BST)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#6B4F3A]/20">
                    <span className="font-semibold text-[#6B4F3A] font-sans">Saturday</span>
                    <span className="text-gray-700 font-sans">10:00 AM - 4:00 PM (BST)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-semibold text-[#6B4F3A] font-sans">Sunday</span>
                    <span className="text-red-500 font-semibold font-sans">Closed</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-600 flex items-center gap-2 font-sans">
                    <Globe className="w-4 h-4" />
                    Online Support Available 24/7 via WhatsApp & Email
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-[#3bc24f]" />
                  <h3 className="text-2xl font-bold text-[#6B4F3A] font-serif">Connect With Us</h3>
                </div>
                <p className="text-gray-600 mb-6 font-sans">Follow us on social media for updates and news</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 hover:text-white ${social.color} shadow-md`}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              
              </div>
            </div>
          </div>
        </section>

    

        {/* MAP SECTION */}
        <section className="h-96 md:h-[450px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d471274.6897589161!2d89.24113108950083!3d22.659995139637502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s34%2F6%2CMongla%2C%20Khulna%2C%20Bangladesh%2C%20Khulna%2C%20Bangladesh%2C%209100!5e0!3m2!1sen!2sbd!4v1776240603524!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Jute Craftify Location Map"
            className="w-full h-full object-cover"
          ></iframe>
          
          {/* Map Overlay Card */}
          <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-4 max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#3bc24f]/10 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#3bc24f]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm font-serif">Our Headquarters</h4>
                <p className="text-xs text-gray-600 mt-0.5 font-sans">
                  34/6, Mongla, Khulna, Bangladesh, 9100
                </p>
                <a 
                  href="https://maps.google.com/?q=34/6,Mongla,Khulna,Bangladesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#3bc24f] text-xs font-semibold mt-2 inline-block hover:underline font-sans"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 bg-[#6B4F3A] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
                Ready to Partner With Us?
              </h2>
              <p className="text-[#F5E6D3] text-lg mb-8 font-sans">
                Join hundreds of satisfied global buyers who trust Jute Craftify for premium jute products
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-[#3bc24f] text-white rounded-lg font-semibold hover:bg-[#2da63f] transition-all duration-300 transform hover:scale-105 font-sans"
                >
                  Browse Products
                </Link>
             <Link
  href="/contact#request-quote-contact"
  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#6B4F3A] transition-all duration-300 font-sans"
>
  Request a Quote
</Link>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-[#F5E6D3] font-sans">
                <span>✓ Quick Response</span>
                <span>•</span>
                <span>✓ Secure Payments</span>
                <span>•</span>
                <span>✓ Global Shipping</span>
                <span>•</span>
                <span>✓ Quality Guaranteed</span>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
<style jsx global>{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>