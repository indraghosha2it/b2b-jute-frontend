'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Globe, Truck, Shield, Award } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Load remembered email on component mount (client-side only)
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Signing in...');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        if (data.requiresVerification) {
          toast.info('Please verify your email first', {
            description: 'Please check your email for verification code.',
            duration: 5000,
          });
          setIsSubmitting(false);
          return;
        }
        
        toast.error(data.error || 'Login failed', {
          description: 'Please check your credentials and try again.',
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      toast.success('Login successful!', {
        description: `Welcome back, ${data.user.contactPerson || data.user.companyName}!`,
        duration: 4000,
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        if (formData.rememberMe) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
      }

      setTimeout(() => {
        switch(data.user.role) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'moderator':
            router.push('/moderator/dashboard');
            break;
          default:
            router.push('/customer/dashboard');
        }
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please try again.',
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  const features = [
    { icon: Leaf, title: '100% Eco-Friendly', desc: 'Sustainable jute products', color: '#3bc24f' },
    { icon: Globe, title: 'Global Export', desc: 'Serving 35+ countries', color: '#6B4F3A' },
    { icon: Shield, title: 'Trade Assurance', desc: 'Secure payments', color: '#3bc24f' },
    { icon: Truck, title: 'Fast Shipping', desc: 'Reliable delivery', color: '#6B4F3A' },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-16 pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Brand Header - Reduced spacing */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center  mt-6 gap-2 bg-[#F5E6D3] rounded-full px-3 py-1 mb-3">
              <Leaf className="w-3.5 h-3.5 text-[#3bc24f]" />
              <span className="text-[#6B4F3A] text-xs font-medium">Premium Jute Products Supplier</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#6B4F3A] font-serif">
              Welcome to <span className="text-[#3bc24f]">Jute Craftify</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-sans">Sign in to access your wholesale dashboard</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Left Side - Hero Visual Section - Reduced Height */}
           <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="relative rounded-2xl overflow-hidden min-h-[480px] flex items-center"
>
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url('https://i.ibb.co.com/G4RJnfg0/nuts-glass-autumn-leaves.jpg')`,
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#6B4F3A]/60 to-[#2A1B14]/95"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 p-6 text-white w-full">
    {/* Rotating Feature Badge */}
    <motion.div
      key={activeFeature}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-3"
    >
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/30">
        {(() => {
          const FeatureIcon = features[activeFeature].icon;
          return <FeatureIcon className="w-3.5 h-3.5 text-[#3bc24f]" />;
        })()}
        <span className="text-xs font-medium">{features[activeFeature].title}</span>
      </div>
    </motion.div>

    {/* Main Quote */}
    <motion.h2
      key={activeFeature + '-title'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-2xl md:text-3xl font-bold font-serif mb-2"
    >
      {features[activeFeature].title}
    </motion.h2>
    
    <motion.p
      key={activeFeature + '-desc'}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-white/80 text-sm mb-3 font-sans max-w-sm"
    >
      {features[activeFeature].desc}
    </motion.p>

    {/* Additional Text Block 1 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mb-3"
    >
      <p className="text-white/70 text-xs leading-relaxed font-sans max-w-sm">
        🌿 <span className="font-semibold">100% Natural Jute:</span> Our products are made from 
        sustainably sourced, biodegradable jute fiber.
      </p>
    </motion.div>

    {/* Additional Text Block 2 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="mb-3"
    >
      <p className="text-white/70 text-xs leading-relaxed font-sans max-w-sm">
        🏭 <span className="font-semibold">Direct Manufacturing:</span> No middlemen - factory direct 
        pricing for bulk orders.
      </p>
    </motion.div>

    {/* Additional Text Block 3 */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mb-4"
    >
      <p className="text-white/70 text-xs leading-relaxed font-sans max-w-sm">
        🤝 <span className="font-semibold">24/7 Customer Support:</span> Dedicated team to assist 
        with your inquiries and orders.
      </p>
    </motion.div>

    {/* Trust Indicators */}
    <div className="flex flex-wrap gap-3 mt-2 pt-3 border-t border-white/20">
      <div className="flex items-center gap-1.5">
        <Award className="w-4 h-4 text-[#3bc24f]" />
        <div>
          <p className="text-[10px] text-white/60">Experience</p>
          <p className="font-semibold text-xs">12+ Years</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Globe className="w-4 h-4 text-[#3bc24f]" />
        <div>
          <p className="text-[10px] text-white/60">Countries</p>
          <p className="font-semibold text-xs">35+</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <CheckCircle className="w-4 h-4 text-[#3bc24f]" />
        <div>
          <p className="text-[10px] text-white/60">Happy Clients</p>
          <p className="font-semibold text-xs">500+</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Truck className="w-4 h-4 text-[#3bc24f]" />
        <div>
          <p className="text-[10px] text-white/60">Orders Shipped</p>
          <p className="font-semibold text-xs">10K+</p>
        </div>
      </div>
    </div>

    {/* Feature Dots */}
    <div className="flex gap-1.5 mt-4">
      {features.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setActiveFeature(idx)}
          className={`h-1 rounded-full transition-all duration-300 ${
            activeFeature === idx ? 'w-5 bg-[#3bc24f]' : 'w-1.5 bg-white/40 hover:bg-white/60'
          }`}
        />
      ))}
    </div>
  </div>
</motion.div>

            {/* Right Side - Modern Login Form - Reduced Height */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            >
              {/* Form Header - Reduced */}
              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#F5E6D3] flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-6 h-6 text-[#3bc24f]" />
                </div>
                <h2 className="text-xl font-bold text-[#6B4F3A] font-serif">Account Login</h2>
                <p className="text-gray-500 text-xs mt-0.5 font-sans">Access your wholesale account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5 font-sans">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#3bc24f] transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent transition-all font-sans bg-gray-50 focus:bg-white"
                      placeholder="your@company.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5 font-sans">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#3bc24f] transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3bc24f] focus:border-transparent transition-all font-sans bg-gray-50 focus:bg-white"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-400 hover:text-[#3bc24f] transition-colors" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-400 hover:text-[#3bc24f] transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Options Row - Compact */}
                <div className="flex items-center justify-between">
                 
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs text-[#3bc24f] hover:underline font-medium font-sans"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button - Compact */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#3bc24f] text-white py-2.5 rounded-lg font-semibold hover:bg-[#2da63f] transition-all duration-300 flex items-center justify-center gap-2 font-sans disabled:opacity-70 text-sm mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Divider - Compact */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500 font-sans">Or continue with</span>
                  </div>
                </div>

                {/* Google Login */}
                <GoogleLoginButton mode="login" />

                {/* Register Link - Compact */}
                <div className="text-center mt-4">
                  <p className="text-xs text-gray-600 font-sans">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold text-[#3bc24f] hover:underline">
                      Create account
                    </Link>
                  </p>
                </div>

                {/* Terms - Compact */}
                <p className="text-[10px] text-gray-400 text-center font-sans pt-3 border-t border-gray-100">
                  By signing in, you agree to our{' '}
                  <Link href="/terms" className="hover:text-[#3bc24f]">Terms</Link> and{' '}
                  <Link href="/privacy" className="hover:text-[#3bc24f]">Privacy Policy</Link>
                </p>
              </form>
            </motion.div>
          </div>

          {/* Trust Bar - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 pt-4 border-t border-gray-200"
          >
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#3bc24f]" />
                <span className="text-[10px] text-gray-500 font-sans">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#3bc24f]" />
                <span className="text-[10px] text-gray-500 font-sans">GOTS Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#3bc24f]" />
                <span className="text-[10px] text-gray-500 font-sans">Fair Trade Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#3bc24f]" />
                <span className="text-[10px] text-gray-500 font-sans">OEKO-TEX Certified</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />

      <Footer />
    </>
  );
}