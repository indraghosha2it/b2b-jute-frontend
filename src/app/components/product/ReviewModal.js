


// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Star, 
//   X, 
//   Loader2, 
//   AlertCircle, 
//   CheckCircle,
//   ArrowRight,
//   Award,
//   Shield,
//   Heart,
//   Mail,
//   Lock,
//   User,
//   Building,
//   Phone,
//   MapPin,
//   Eye,
//   EyeOff,
//   Search,
//   ChevronDown,
//   MessageCircle
// } from 'lucide-react';
// import { toast } from 'sonner';
// import OTPVerification from '../auth/OTPVerification';
// import ForgotPassword from '../auth/ForgotPassword';
// import ResetOTPVerification from '../auth/ResetOTPVerification';
// import ModalResetPassword from '../auth/ModalResetPassword';
// import GoogleLoginButtonPopUp from '../GoogleLoginButtonPopUp';

// export default function ReviewModal({ isOpen, onClose, onReviewSubmitted, productId, productName }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [userRole, setUserRole] = useState(null); // ADDED: State for user role
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loadingProducts, setLoadingProducts] = useState(false);
//   const [activeTab, setActiveTab] = useState('login');
//   const [authStep, setAuthStep] = useState('form'); // 'form', 'otp', 'forgot', 'reset-otp', 'new-password'
//   const [registeredEmail, setRegisteredEmail] = useState('');
//   const [forgotEmail, setForgotEmail] = useState('');
//   const [resetOTP, setResetOTP] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dropdownRef = useRef(null);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     rating: 0,
//     title: '',
//     comment: '',
//     productId: productId || '',
//     productName: productName || '',
//     anonymous: false
//   });
  
//   const [errors, setErrors] = useState({});
//   const [hoveredRating, setHoveredRating] = useState(0);

//   // Login form state
//   const [loginData, setLoginData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });

//   // Register form state
//   const [registerData, setRegisterData] = useState({
//     companyName: '',
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     country: '',
//     address: '',
//     city: '',
//     zipCode: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Benefits for left panel
//   const benefits = [
//     { icon: <Award className="w-4 h-4" />, text: 'Help others make informed decisions' },
//     { icon: <Heart className="w-4 h-4" />, text: 'Share your experience with the community' },
//     { icon: <Shield className="w-4 h-4" />, text: 'Verified reviews only' },
//     { icon: <Star className="w-4 h-4" />, text: 'Earn reviewer badges' },
//   ];

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Filter products based on search term
//   useEffect(() => {
//     if (searchTerm.trim() === '') {
//       setFilteredProducts(products);
//     } else {
//       const filtered = products.filter(product =>
//         product.productName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     }
//   }, [searchTerm, products]);

//   // Check authentication status
//   useEffect(() => {
//     if (isOpen) {
//       checkAuth();
//       // Reset auth step when modal opens
//       setAuthStep('form');
//       setActiveTab('login');
//     }
//   }, [isOpen]);

//   // Fetch products for dropdown when authenticated
//   useEffect(() => {
//     if (isAuthenticated && isOpen) {
//       fetchProducts();
//     }
//   }, [isAuthenticated, isOpen]);

//   // Update form when productId/productName props change
//   useEffect(() => {
//     if (productId && productName) {
//       setFormData(prev => ({
//         ...prev,
//         productId,
//         productName
//       }));
//     }
//   }, [productId, productName]);

//   const checkAuth = () => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setIsAuthenticated(true);
//         setUser(parsedUser);
//         setUserRole(parsedUser.role); // ADDED: Set user role
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         setIsAuthenticated(false);
//         setUser(null);
//         setUserRole(null);
//       }
//     } else {
//       setIsAuthenticated(false);
//       setUser(null);
//       setUserRole(null);
//     }
//   };

//   const fetchProducts = async () => {
//     setLoadingProducts(true);
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/products?limit=100&includeInactive=false', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.data || []);
//         setFilteredProducts(data.data || []);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setProducts([]);
//       setFilteredProducts([]);
//     } finally {
//       setLoadingProducts(false);
//     }
//   };

//   const handleLoginChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setLoginData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleRegisterChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setRegisterData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Google Auth Success Handler
//   const handleGoogleSuccess = (data) => {
//     const { token, user, requiresAdditionalInfo } = data;
    
//     // Store user data
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
    
//     // Update state
//     setIsAuthenticated(true);
//     setUser(user);
//     setUserRole(user.role); // ADDED: Set user role
    
//     toast.success('Google sign in successful!', {
//       description: `Welcome ${user.contactPerson || user.companyName}!`,
//     });
    
//     // Dispatch auth change event
//     window.dispatchEvent(new Event('auth-change'));
    
//     // Reset auth step
//     setAuthStep('form');
//     setActiveTab('login');
//   };

//   // Google Auth Error Handler
//   const handleGoogleError = (error) => {
//     toast.error(error);
//   };

//   // Forgot Password Handlers
//   const handleForgotPassword = () => {
//     setAuthStep('forgot');
//   };

//   const handleForgotBack = () => {
//     setAuthStep('form');
//     setActiveTab('login');
//   };

//   const handleForgotOTPSent = (email) => {
//     setForgotEmail(email);
//     setAuthStep('reset-otp');
//   };

//   const handleResetOTPVerified = (otp) => {
//     setResetOTP(otp);
//     setAuthStep('new-password');
//   };

//   const handleResetBack = () => {
//     if (authStep === 'reset-otp') {
//       setAuthStep('forgot');
//     } else if (authStep === 'new-password') {
//       setAuthStep('reset-otp');
//     }
//   };

//   const handleResetSuccess = () => {
//     toast.success('Password Reset Successful!', {
//       description: 'You can now login with your new password.',
//       icon: '🔐',
//     });
    
//     // Return to login form
//     setAuthStep('form');
//     setActiveTab('login');
    
//     // Clear forgot password states
//     setForgotEmail('');
//     setResetOTP('');
    
//     // Pre-fill the email in login form
//     if (forgotEmail) {
//       setLoginData(prev => ({
//         ...prev,
//         email: forgotEmail
//       }));
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: loginData.email,
//           password: loginData.password
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // Check if the error is due to unverified email
//         if (data.requiresVerification) {
//           setRegisteredEmail(loginData.email);
//           setAuthStep('otp');
//           toast.info('Please verify your email first', {
//             description: 'We\'ve sent a verification code to your email.'
//           });
//           setLoading(false);
//           return;
//         }
        
//         toast.error(data.error || 'Login failed');
//         setLoading(false);
//         return;
//       }

//       // Store remember me preference
//       if (loginData.rememberMe) {
//         localStorage.setItem('rememberedEmail', loginData.email);
//       } else {
//         localStorage.removeItem('rememberedEmail');
//       }

//       // Store user data and token
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
      
//       // Update state
//       setIsAuthenticated(true);
//       setUser(data.user);
//       setUserRole(data.user.role); // ADDED: Set user role
      
//       // Clear form
//       setLoginData({
//         email: '',
//         password: '',
//         rememberMe: false
//       });
      
//       toast.success('Welcome back!', {
//         description: `Successfully signed in as ${data.user.contactPerson || data.user.companyName}`,
//       });
      
//       // Dispatch custom event to notify other components (like Navbar)
//       window.dispatchEvent(new Event('auth-change'));
      
//     } catch (error) {
//       console.error('Login error:', error);
//       toast.error('Connection error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Validate passwords match
//     if (registerData.password !== registerData.confirmPassword) {
//       toast.error('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     // Validate password strength
//     if (registerData.password.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       setLoading(false);
//       return;
//     }

//     // Validate terms agreement
//     if (!registerData.agreeToTerms) {
//       toast.error('Please agree to the terms');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           companyName: registerData.companyName,
//           contactPerson: registerData.contactPerson,
//           email: registerData.email,
//           phone: registerData.phone,
//           whatsapp: registerData.whatsapp || '',
//           country: registerData.country,
//           address: registerData.address,
//           city: registerData.city,
//           zipCode: registerData.zipCode,
//           password: registerData.password,
//           role: 'customer'
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         toast.error(data.error || 'Registration failed');
//         setLoading(false);
//         return;
//       }

//       toast.success('OTP Sent!', {
//         description: 'Please check your email for verification code.',
//         icon: '📧',
//       });
      
//       // Move to OTP verification
//       setRegisteredEmail(registerData.email);
//       setAuthStep('otp');
      
//     } catch (error) {
//       console.error('Registration error:', error);
//       toast.error('Connection error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerificationSuccess = (user, token) => {
//     console.log('✅ ReviewModal - Verification success:', { user, token });
    
//     if (!token) {
//       console.error('❌ No token received from verification');
//       toast.error('Verification failed - no token received');
//       return;
//     }

//     // Store token and user data
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
    
//     // Update state
//     setIsAuthenticated(true);
//     setUser(user);
//     setUserRole(user.role); // ADDED: Set user role
    
//     toast.success('Email Verified!', {
//       description: `Welcome to Asian Clothify, ${user.companyName || user.contactPerson || 'User'}!`,
//       icon: '🎉',
//     });
    
//     // Dispatch auth change event
//     window.dispatchEvent(new Event('auth-change'));
    
//     // Reset auth step to form (so review form shows)
//     setAuthStep('form');
//     setActiveTab('login');
    
//     // Clear registration data
//     setRegisterData({
//       companyName: '',
//       contactPerson: '',
//       email: '',
//       phone: '',
//       whatsapp: '',
//       country: '',
//       address: '',
//       city: '',
//       zipCode: '',
//       password: '',
//       confirmPassword: '',
//       agreeToTerms: false
//     });
//   };

//   const handleBackToForm = () => {
//     setAuthStep('form');
//   };

//   const validateReviewForm = () => {
//     const newErrors = {};
    
//     if (formData.rating === 0) {
//       newErrors.rating = 'Please select a rating';
//     }
    
//     if (!formData.comment.trim()) {
//       newErrors.comment = 'Please write your review';
//     } else if (formData.comment.length < 10) {
//       newErrors.comment = 'Review must be at least 10 characters';
//     } else if (formData.comment.length > 500) {
//       newErrors.comment = 'Review must be less than 500 characters';
//     }
    
//     if (formData.title && formData.title.length > 100) {
//       newErrors.title = 'Title must be less than 100 characters';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateReviewForm()) return;
    
//     setLoading(true);
    
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch('http://localhost:5000/api/reviews', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           rating: formData.rating,
//           title: formData.title || undefined,
//           comment: formData.comment,
//           productId: formData.productId || undefined,
//           isAnonymous: formData.anonymous
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         toast.success('Thank you for your review!', {
//           description: 'It will be published after moderation.',
//         });
        
//         // Clear form
//         setFormData({
//           rating: 0,
//           title: '',
//           comment: '',
//           productId: productId || '',
//           productName: productName || '',
//           anonymous: false
//         });
//         setSearchTerm('');
        
//         // Refresh reviews in parent component
//         onReviewSubmitted?.();
        
//         // Close modal
//         onClose();
//       } else {
//         setErrors({ submit: data.error || 'Failed to submit review' });
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       setErrors({ submit: 'Failed to submit review. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReviewChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleRatingClick = (rating) => {
//     setFormData(prev => ({ ...prev, rating }));
//     if (errors.rating) {
//       setErrors(prev => ({ ...prev, rating: null }));
//     }
//   };

//   const handleProductSelect = (product) => {
//     setFormData(prev => ({
//       ...prev,
//       productId: product._id,
//       productName: product.productName
//     }));
//     setIsDropdownOpen(false);
//     setSearchTerm('');
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           {/* Blurred Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm"
//           />

//           {/* Modal */}
//           <div className="flex min-h-full items-center justify-center p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               transition={{ type: "spring", duration: 0.5 }}
//               className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
//             >
//               {/* Close button */}
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20 bg-white/80 backdrop-blur-sm"
//               >
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>

//               <div className="flex flex-col md:flex-row">
//                 {/* Left Side - Branding & Benefits */}
//                 <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-[#E39A65] to-[#d48b54] p-8 text-white relative overflow-hidden">
//                   {/* Decorative Pattern */}
//                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
//                   <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
                  
//                   <div className="relative z-10">
//                     {/* Logo/Brand */}
//                     <div className="flex items-center justify-center gap-2 mb-6">
//                       <div className="relative w-48 h-16 overflow-hidden" style={{ background: 'transparent' }}>
//                         <img 
//                           src="https://i.ibb.co.com/fzkq5JRV/favicon.png" 
//                           alt="Asian Clothify Logo"
//                           className="w-full h-full object-contain"
//                         />
//                       </div>
//                     </div>

//                     {authStep === 'form' && !isAuthenticated && (
//                       <>
//                         <h3 className="text-2xl font-bold mb-2">
//                           {activeTab === 'login' ? 'Welcome Back!' : 'Join Our Community'}
//                         </h3>
//                         <p className="text-white/90 mb-8">
//                           {activeTab === 'login' 
//                             ? 'Sign in to share your experience with the community.'
//                             : 'Create an account to start writing reviews.'}
//                         </p>
//                       </>
//                     )}

//                     {authStep === 'form' && isAuthenticated && (
//                       <>
//                         <h3 className="text-2xl font-bold mb-2">Share Your Experience</h3>
//                         <p className="text-white/90 mb-8">
//                           Your feedback helps us improve and helps other buyers make informed decisions.
//                         </p>
//                       </>
//                     )}

//                     {authStep === 'otp' && (
//                       <>
//                         <h3 className="text-2xl font-bold mb-2">Verify Your Email</h3>
//                         <p className="text-white/90 mb-8">
//                           We've sent a verification code to your email address. Please check your inbox.
//                         </p>
//                       </>
//                     )}

//                     {(authStep === 'forgot' || authStep === 'reset-otp' || authStep === 'new-password') && (
//                       <>
//                         <h3 className="text-2xl font-bold mb-2">Reset Password</h3>
//                         <p className="text-white/90 mb-8">
//                           Follow the steps to reset your password securely.
//                         </p>
//                       </>
//                     )}

//                     {/* Benefits List (Always Visible) */}
//                     <div className="space-y-4">
//                       {benefits.map((benefit, index) => (
//                         <motion.div
//                           key={index}
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           className="flex items-center gap-3"
//                         >
//                           <div className="p-2 bg-white/20 rounded-lg">
//                             {benefit.icon}
//                           </div>
//                           <span className="text-sm">{benefit.text}</span>
//                         </motion.div>
//                       ))}
//                     </div>

//                     {/* Stats */}
//                     <div className="mt-8 grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-2xl font-bold">500+</p>
//                         <p className="text-xs text-white/80">Verified Reviews</p>
//                       </div>
//                       <div>
//                         <p className="text-2xl font-bold">4.8</p>
//                         <p className="text-xs text-white/80">Average Rating</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Side - Forms */}
//                 <div className="md:w-3/5 p-8 max-h-[600px] overflow-y-auto custom-scrollbar">
//                   {!isAuthenticated ? (
//                     <>
//                       {/* Login/Register Forms */}
//                       {authStep === 'form' && (
//                         <>
//                           {/* Tabs */}
//                           <div className="flex gap-4 mb-6">
//                             <button
//                               onClick={() => setActiveTab('login')}
//                               className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-all ${
//                                 activeTab === 'login'
//                                   ? 'border-[#E39A65] text-[#E39A65]'
//                                   : 'border-transparent text-gray-400 hover:text-gray-600'
//                               }`}
//                             >
//                               Sign In
//                             </button>
//                             <button
//                               onClick={() => setActiveTab('register')}
//                               className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-all ${
//                                 activeTab === 'register'
//                                   ? 'border-[#E39A65] text-[#E39A65]'
//                                   : 'border-transparent text-gray-400 hover:text-gray-600'
//                               }`}
//                             >
//                               Create Account
//                             </button>
//                           </div>

//                           {/* Login Form */}
//                           {activeTab === 'login' ? (
//                             <>
//                               <motion.form
//                                 key="login"
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -20 }}
//                                 onSubmit={handleLogin}
//                                 className="space-y-4"
//                               >
//                                 <div>
//                                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Email Address
//                                   </label>
//                                   <div className="relative group">
//                                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
//                                     <input
//                                       type="email"
//                                       name="email"
//                                       value={loginData.email}
//                                       onChange={handleLoginChange}
//                                       required
//                                       className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                       placeholder="your@company.com"
//                                     />
//                                   </div>
//                                 </div>

//                                 <div>
//                                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Password
//                                   </label>
//                                   <div className="relative group">
//                                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
//                                     <input
//                                       type={showPassword ? "text" : "password"}
//                                       name="password"
//                                       value={loginData.password}
//                                       onChange={handleLoginChange}
//                                       required
//                                       className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                       placeholder="••••••••"
//                                     />
//                                     <button
//                                       type="button"
//                                       onClick={() => setShowPassword(!showPassword)}
//                                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                     >
//                                       {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                     </button>
//                                   </div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                   <label className="flex items-center cursor-pointer">
//                                     <input
//                                       type="checkbox"
//                                       name="rememberMe"
//                                       checked={loginData.rememberMe}
//                                       onChange={handleLoginChange}
//                                       className="rounded border-gray-300 text-[#E39A65] focus:ring-[#E39A65] cursor-pointer"
//                                     />
//                                     <span className="ml-2 text-sm text-gray-600">Remember me</span>
//                                   </label>
//                                   <button
//                                     type="button"
//                                     onClick={handleForgotPassword}
//                                     className="text-sm text-[#E39A65] hover:underline font-medium"
//                                   >
//                                     Forgot password?
//                                   </button>
//                                 </div>

//                                 <button
//                                   type="submit"
//                                   disabled={loading}
//                                   className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
//                                 >
//                                   {loading ? (
//                                     <>
//                                       <Loader2 className="w-5 h-5 animate-spin" />
//                                       Signing in...
//                                     </>
//                                   ) : (
//                                     <>
//                                       Sign In
//                                       <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                                     </>
//                                   )}
//                                 </button>
//                               </motion.form>
//                               {/* Add Google Login Button */}
//                               <div className="mt-4">
//                                 <div className="relative my-4">
//                                   <div className="absolute inset-0 flex items-center">
//                                     <div className="w-full border-t border-gray-300" />
//                                   </div>
//                                   <div className="relative flex justify-center text-xs">
//                                     <span className="px-2 bg-white text-gray-500">Or continue with</span>
//                                   </div>
//                                 </div>
//                                 <GoogleLoginButtonPopUp 
//                                   mode="login"
//                                   onSuccess={handleGoogleSuccess}
//                                   onError={handleGoogleError}
//                                 />
//                               </div>
//                             </>
//                           ) : (
//                             <>
//                               <motion.form
//                                 key="register"
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -20 }}
//                                 onSubmit={handleRegister}
//                                 className="space-y-4"
//                               >
//                                 <div className="grid grid-cols-2 gap-3">
//                                   <div className="col-span-1">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       Company Name <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <div className="relative group">
//                                       <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
//                                       <input
//                                         type="text"
//                                         name="companyName"
//                                         value={registerData.companyName}
//                                         onChange={handleRegisterChange}
//                                         required
//                                         className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                         placeholder="Your company name"
//                                       />
//                                     </div>
//                                   </div>

//                                   <div className="col-span-1 md:col-span-1">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       Contact Person <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <div className="relative group">
//                                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
//                                       <input
//                                         type="text"
//                                         name="contactPerson"
//                                         value={registerData.contactPerson}
//                                         onChange={handleRegisterChange}
//                                         required
//                                         className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                         placeholder="Full name"
//                                       />
//                                     </div>
//                                   </div>

//                                   <div className="col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       Email Address <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <div className="relative group">
//                                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
//                                       <input
//                                         type="email"
//                                         name="email"
//                                         value={registerData.email}
//                                         onChange={handleRegisterChange}
//                                         required
//                                         className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                         placeholder="your@company.com"
//                                       />
//                                     </div>
//                                   </div>

//                                   <div className="col-span-2 md:col-span-1">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       Phone <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <div className="relative group">
//                                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
//                                       <input
//                                         type="tel"
//                                         name="phone"
//                                         value={registerData.phone}
//                                         onChange={handleRegisterChange}
//                                         required
//                                         className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                         placeholder="+1 234 567 8900"
//                                       />
//                                     </div>
//                                   </div>

//                                   <div className="col-span-2 md:col-span-1">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       WhatsApp <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <div className="relative group">
//                                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
//                                       <input
//                                         type="tel"
//                                         name="whatsapp"
//                                         value={registerData.whatsapp}
//                                         onChange={handleRegisterChange}
//                                         required
//                                         className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                         placeholder="+1 234 567 8900"
//                                       />
//                                     </div>
//                                   </div>

//                                   <div className="col-span-2 md:col-span-1">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       Country <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <div className="relative group">
//                                       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
//                                       <input
//                                         type="text"
//                                         name="country"
//                                         value={registerData.country}
//                                         onChange={handleRegisterChange}
//                                         required
//                                         className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                         placeholder="Your country"
//                                       />
//                                     </div>
//                                   </div>

//                                   <div className="col-span-2 md:col-span-1">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       City <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="city"
//                                       value={registerData.city}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                       placeholder="City"
//                                     />
//                                   </div>

//                                   <div className="col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       Address <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="address"
//                                       value={registerData.address}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                       placeholder="Street address"
//                                     />
//                                   </div>

//                                   <div className="col-span-2 md:col-span-1">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       ZIP Code <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <input
//                                       type="text"
//                                       name="zipCode"
//                                       value={registerData.zipCode}
//                                       onChange={handleRegisterChange}
//                                       required
//                                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                       placeholder="ZIP code"
//                                     />
//                                   </div>

//                                   <div className="col-span-2 md:col-span-1">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       Password <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <div className="relative group">
//                                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
//                                       <input
//                                         type={showPassword ? "text" : "password"}
//                                         name="password"
//                                         value={registerData.password}
//                                         onChange={handleRegisterChange}
//                                         required
//                                         className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                         placeholder="Min. 8 characters"
//                                       />
//                                       <button
//                                         type="button"
//                                         onClick={() => setShowPassword(!showPassword)}
//                                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                       >
//                                         {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                       </button>
//                                     </div>
//                                   </div>

//                                   <div className="col-span-2 md:col-span-1">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                       Confirm Password <span className="text-[#E39A65]">*</span>
//                                     </label>
//                                     <div className="relative group">
//                                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E39A65] transition-colors" />
//                                       <input
//                                         type={showConfirmPassword ? "text" : "password"}
//                                         name="confirmPassword"
//                                         value={registerData.confirmPassword}
//                                         onChange={handleRegisterChange}
//                                         required
//                                         className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white"
//                                         placeholder="Re-enter password"
//                                       />
//                                       <button
//                                         type="button"
//                                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                       >
//                                         {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                       </button>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 <div className="flex items-start">
//                                   <input
//                                     type="checkbox"
//                                     name="agreeToTerms"
//                                     id="agreeToTerms"
//                                     checked={registerData.agreeToTerms}
//                                     onChange={handleRegisterChange}
//                                     required
//                                     className="mt-1 rounded border-gray-300 text-[#E39A65] focus:ring-[#E39A65] cursor-pointer"
//                                   />
//                                   <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
//                                     I agree to the <span className="text-[#E39A65] hover:underline">Terms of Service</span> and <span className="text-[#E39A65] hover:underline">Privacy Policy</span>
//                                   </label>
//                                 </div>

//                                 <button
//                                   type="submit"
//                                   disabled={loading || !registerData.agreeToTerms}
//                                   className="w-full py-3.5 px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
//                                 >
//                                   {loading ? (
//                                     <>
//                                       <Loader2 className="w-5 h-5 animate-spin" />
//                                       Creating Account...
//                                     </>
//                                   ) : (
//                                     <>
//                                       Create Account
//                                       <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                                     </>
//                                   )}
//                                 </button>
//                               </motion.form>
//                               {/* Google Sign Up Button */}
//                               <div className="mt-4">
//                                 <div className="relative my-4">
//                                   <div className="absolute inset-0 flex items-center">
//                                     <div className="w-full border-t border-gray-300" />
//                                   </div>
//                                   <div className="relative flex justify-center text-xs">
//                                     <span className="px-2 bg-white text-gray-500">Or sign up with</span>
//                                   </div>
//                                 </div>
//                                 <GoogleLoginButtonPopUp 
//                                   mode="signup"
//                                   onSuccess={handleGoogleSuccess}
//                                   onError={handleGoogleError}
//                                 />
//                               </div>
//                             </>
//                           )}
//                         </>
//                       )}

//                       {/* Email Verification OTP */}
//                       {authStep === 'otp' && (
//                         <div className="py-4">
//                           <div className="text-center mb-6">
//                             <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                               <svg className="w-10 h-10" style={{ color: '#d9884e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                               </svg>
//                             </div>
//                             <p className="text-gray-600">
//                               We've sent a 6-digit code to<br />
//                               <span className="font-semibold" style={{ color: '#d9884e' }}>{registeredEmail}</span>
//                             </p>
//                           </div>
//                           <OTPVerification 
//                             email={registeredEmail}
//                             onBack={handleBackToForm}
//                             onSuccess={(user, token) => {
//                               console.log('📞 OTPVerification onSuccess called with:', { user, token });
//                               handleVerificationSuccess(user, token);
//                             }}
//                           />
//                         </div>
//                       )}

//                       {/* Forgot Password - Email Input */}
//                       {authStep === 'forgot' && (
//                         <ForgotPassword 
//                           onOTPSent={handleForgotOTPSent} 
//                           onBack={handleForgotBack} 
//                         />
//                       )}

//                       {/* Reset Password OTP Verification */}
//                       {authStep === 'reset-otp' && (
//                         <ResetOTPVerification 
//                           email={forgotEmail}
//                           onBack={handleResetBack}
//                           onSuccess={handleResetOTPVerified}
//                         />
//                       )}

//                       {/* New Password Form */}
//                       {authStep === 'new-password' && (
//                         <ModalResetPassword 
//                           email={forgotEmail}
//                           otp={resetOTP}
//                           onBack={handleResetBack}
//                           onSuccess={handleResetSuccess}
//                         />
//                       )}
//                     </>
//                   ) : (
//                     /* Review Form - With role check */
//                     userRole === 'admin' || userRole === 'moderator' ? (
//                       /* Message for Admin/Moderator - Cannot write reviews */
//                       <motion.div
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -20 }}
//                         className="text-center py-8"
//                       >
//                         <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                           <Shield className="w-10 h-10 text-gray-400" />
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                           Review Access Restricted
//                         </h3>
//                         <p className="text-gray-600 mb-4">
//                           {userRole === 'admin' ? 'Admins' : 'Moderators'} cannot write product reviews.
//                         </p>
//                         <p className="text-sm text-gray-500">
//                           This feature is available for wholesale customers only.
//                         </p>
//                       </motion.div>
//                     ) : (
//                       /* Review Form for regular customers */
//                       <motion.form
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -20 }}
//                         onSubmit={handleReviewSubmit}
//                         className="space-y-4"
//                       >
//                         <h3 className="text-xl font-semibold text-gray-900 mb-4">Write a Review</h3>
                        
//                         {/* Product Info - Read-only if from product page */}
//                         {productId && productName && (
//                           <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
//                             <p className="text-xs text-orange-600 mb-1">Reviewing Product</p>
//                             <p className="font-medium text-gray-900">{productName}</p>
//                           </div>
//                         )}

//                         {/* Rating Selection */}
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Your Rating <span className="text-[#E39A65]">*</span>
//                           </label>
//                           <div className="flex gap-2">
//                             {[1, 2, 3, 4, 5].map((rating) => (
//                               <motion.button
//                                 key={rating}
//                                 type="button"
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => handleRatingClick(rating)}
//                                 onMouseEnter={() => setHoveredRating(rating)}
//                                 onMouseLeave={() => setHoveredRating(0)}
//                                 className={`p-2 rounded-lg transition-all ${
//                                   rating <= (hoveredRating || formData.rating)
//                                     ? 'bg-yellow-50'
//                                     : 'hover:bg-gray-50'
//                                 }`}
//                               >
//                                 <Star
//                                   className={`w-8 h-8 transition-all ${
//                                     rating <= (hoveredRating || formData.rating)
//                                       ? 'fill-yellow-400 text-yellow-400 scale-110'
//                                       : 'text-gray-300 hover:text-gray-400'
//                                   }`}
//                                 />
//                               </motion.button>
//                             ))}
//                           </div>
//                           {errors.rating && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                               <AlertCircle className="w-3 h-3" />
//                               {errors.rating}
//                             </p>
//                           )}
//                         </div>

//                         {/* Product Selection - Only show if no productId provided */}
//                         {!productId && (
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Select Product <span className="text-gray-400 text-xs">(Optional)</span>
//                             </label>
                            
//                             {loadingProducts ? (
//                               <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl">
//                                 <Loader2 className="w-4 h-4 animate-spin text-[#E39A65]" />
//                                 <span className="text-sm text-gray-500">Loading products...</span>
//                               </div>
//                             ) : (
//                               <div className="relative" ref={dropdownRef}>
//                                 <div
//                                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                                   className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#E39A65] focus:border-transparent cursor-pointer flex items-center justify-between"
//                                 >
//                                   <span className={`text-sm ${formData.productName ? 'text-gray-900' : 'text-gray-400'}`}>
//                                     {formData.productName || 'Search and select a product...'}
//                                   </span>
//                                   <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
//                                 </div>

//                                 {isDropdownOpen && (
//                                   <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-hidden">
//                                     <div className="p-2 border-b border-gray-200">
//                                       <div className="relative">
//                                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                                         <input
//                                           type="text"
//                                           value={searchTerm}
//                                           onChange={(e) => setSearchTerm(e.target.value)}
//                                           placeholder="Search products..."
//                                           className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E39A65] focus:border-transparent outline-none"
//                                           autoFocus
//                                         />
//                                       </div>
//                                     </div>

//                                     <div className="overflow-y-auto max-h-48">
//                                       {filteredProducts.length > 0 ? (
//                                         filteredProducts.map((product) => (
//                                           <div
//                                             key={product._id}
//                                             onClick={() => handleProductSelect(product)}
//                                             className="px-4 py-2.5 hover:bg-orange-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
//                                           >
//                                             <p className="text-sm text-gray-700">{product.productName}</p>
//                                           </div>
//                                         ))
//                                       ) : (
//                                         <div className="px-4 py-8 text-center">
//                                           <p className="text-sm text-gray-400">No products found</p>
//                                         </div>
//                                       )}
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
//                             )}
//                             <p className="text-xs text-gray-400 mt-1">
//                               Choose a product to help others find relevant reviews
//                             </p>
//                           </div>
//                         )}

//                         {/* Review Title - Optional */}
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Review Title <span className="text-gray-400 text-xs">(Optional)</span>
//                           </label>
//                           <input
//                             type="text"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleReviewChange}
//                             placeholder="Summarize your experience"
//                             maxLength="100"
//                             className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white transition-all"
//                           />
//                           {errors.title && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                               <AlertCircle className="w-3 h-3" />
//                               {errors.title}
//                             </p>
//                           )}
//                           <p className="text-xs text-gray-400 mt-1 text-right">
//                             {formData.title.length}/100
//                           </p>
//                         </div>

//                         {/* Review Comment */}
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Your Review <span className="text-[#E39A65]">*</span>
//                           </label>
//                           <textarea
//                             name="comment"
//                             value={formData.comment}
//                             onChange={handleReviewChange}
//                             placeholder="Share details about your experience with this product..."
//                             rows="4"
//                             maxLength="500"
//                             className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E39A65] focus:border-transparent bg-gray-50 focus:bg-white transition-all resize-none"
//                           />
//                           {errors.comment && (
//                             <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//                               <AlertCircle className="w-3 h-3" />
//                               {errors.comment}
//                             </p>
//                           )}
//                           <p className="text-xs text-gray-400 mt-1 text-right">
//                             {formData.comment.length}/500
//                           </p>
//                         </div>

//                         {/* Anonymous Option */}
//                         <label className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                           <input
//                             type="checkbox"
//                             name="anonymous"
//                             checked={formData.anonymous}
//                             onChange={handleReviewChange}
//                             className="rounded border-gray-300 text-[#E39A65] focus:ring-[#E39A65] cursor-pointer"
//                           />
//                           <span className="ml-2 text-sm text-gray-600">
//                             Post as anonymous (your name won't be displayed)
//                           </span>
//                         </label>

//                         {/* Submit Error */}
//                         {errors.submit && (
//                           <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//                             <p className="text-red-600 text-sm flex items-center gap-2">
//                               <AlertCircle className="w-4 h-4" />
//                               {errors.submit}
//                             </p>
//                           </div>
//                         )}

//                         {/* Action Buttons */}
//                         <div className="flex gap-3 pt-4">
//                           <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             type="button"
//                             onClick={onClose}
//                             className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
//                           >
//                             Cancel
//                           </motion.button>
//                           <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             type="submit"
//                             disabled={loading}
//                             className="flex-1 py-3 px-4 bg-gradient-to-r from-[#E39A65] to-[#d48b54] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#E39A65]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
//                           >
//                             {loading ? (
//                               <>
//                                 <Loader2 className="w-5 h-5 animate-spin" />
//                                 Submitting...
//                               </>
//                             ) : (
//                               <>
//                                 Submit Review
//                                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                               </>
//                             )}
//                           </motion.button>
//                         </div>

//                         <p className="text-xs text-gray-400 text-center mt-4">
//                           Your review will be published after moderation to ensure quality
//                         </p>
//                       </motion.form>
//                     )
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  X, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  ArrowRight,
  Award,
  Shield,
  Heart,
  Mail,
  Lock,
  User,
  Building,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Search,
  ChevronDown,
  Leaf,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import OTPVerification from '../auth/OTPVerification';
import ForgotPassword from '../auth/ForgotPassword';
import ResetOTPVerification from '../auth/ResetOTPVerification';
import ModalResetPassword from '../auth/ModalResetPassword';
import GoogleLoginButtonPopUp from '../GoogleLoginButtonPopUp';

// Jute Craftify Theme Colors
const JUTE_COLORS = {
  primary: '#6B4F3A',
  secondary: '#F5E6D3',
  accent: '#3A7D44',
  gold: '#C6A43B',
  text: '#2C2420',
  textLight: '#8B7355',
  border: '#E5D5C0',
  lightBg: '#FAF7F2',
  white: '#FFFFFF'
};

export default function ReviewModal({ isOpen, onClose, onReviewSubmitted, productId, productName }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [authStep, setAuthStep] = useState('form');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetOTP, setResetOTP] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    productId: productId || '',
    productName: productName || '',
    anonymous: false
  });
  
  const [errors, setErrors] = useState({});
  const [hoveredRating, setHoveredRating] = useState(0);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerData, setRegisterData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const benefits = [
    { icon: <Award className="w-3.5 h-3.5" />, text: 'Help others make informed decisions' },
    { icon: <Heart className="w-3.5 h-3.5" />, text: 'Share your experience with the community' },
    { icon: <Shield className="w-3.5 h-3.5" />, text: 'Verified reviews only' },
    { icon: <Star className="w-3.5 h-3.5" />, text: 'Earn reviewer badges' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    if (isOpen) {
      checkAuth();
      checkUserRole();
      setAuthStep('form');
      setActiveTab('login');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchProducts();
    }
  }, [isAuthenticated, isOpen]);

  useEffect(() => {
    if (productId && productName) {
      setFormData(prev => ({
        ...prev,
        productId,
        productName
      }));
    }
  }, [productId, productName]);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const checkUserRole = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserRole(user.role);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/products?limit=100&includeInactive=false', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
        setFilteredProducts(data.data || []);
      } else {
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.requiresVerification) {
          setRegisteredEmail(loginData.email);
          setAuthStep('otp');
          toast.info('Please verify your email first', {
            description: 'We\'ve sent a verification code to your email.'
          });
          setLoading(false);
          return;
        }
        
        toast.error(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      if (loginData.rememberMe) {
        localStorage.setItem('rememberedEmail', loginData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setIsAuthenticated(true);
      setUser(data.user);
      setUserRole(data.user.role);
      
      setLoginData({
        email: '',
        password: '',
        rememberMe: false
      });
      
      toast.success('Welcome back!', {
        description: `Successfully signed in as ${data.user.contactPerson || data.user.companyName}`,
      });
      
      window.dispatchEvent(new Event('auth-change'));
      setAuthStep('form');
      
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    if (registerData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    if (!registerData.agreeToTerms) {
      toast.error('Please agree to the terms');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: registerData.companyName,
          contactPerson: registerData.contactPerson,
          email: registerData.email,
          phone: registerData.phone,
          whatsapp: registerData.whatsapp || '',
          country: registerData.country,
          address: registerData.address,
          city: registerData.city,
          zipCode: registerData.zipCode,
          password: registerData.password,
          role: 'customer'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      toast.success('OTP Sent!', {
        description: 'Please check your email for verification code.',
      });
      
      setRegisteredEmail(registerData.email);
      setAuthStep('otp');
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = (data) => {
    const { token, user } = data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    setIsAuthenticated(true);
    setUser(user);
    setUserRole(user.role);
    
    toast.success('Google sign in successful!', {
      description: `Welcome ${user.contactPerson || user.companyName}!`,
    });
    
    window.dispatchEvent(new Event('auth-change'));
    setAuthStep('form');
    setActiveTab('login');
  };

  const handleGoogleError = (error) => {
    toast.error(error);
  };

  const handleVerificationSuccess = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    setIsAuthenticated(true);
    setUser(user);
    setUserRole(user.role);
    
    toast.success('Email Verified!', {
      description: `Welcome to Jute Craftify, ${user.companyName || user.contactPerson || 'User'}!`,
    });
    
    window.dispatchEvent(new Event('auth-change'));
    setAuthStep('form');
    setActiveTab('login');
    
    setRegisterData({
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      whatsapp: '',
      country: '',
      address: '',
      city: '',
      zipCode: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
  };

  const handleForgotPassword = () => {
    setAuthStep('forgot');
  };

  const handleForgotBack = () => {
    setAuthStep('form');
    setActiveTab('login');
  };

  const handleForgotOTPSent = (email) => {
    setForgotEmail(email);
    setAuthStep('reset-otp');
  };

  const handleResetOTPVerified = (otp) => {
    setResetOTP(otp);
    setAuthStep('new-password');
  };

  const handleResetBack = () => {
    if (authStep === 'reset-otp') {
      setAuthStep('forgot');
    } else if (authStep === 'new-password') {
      setAuthStep('reset-otp');
    }
  };

  const handleResetSuccess = () => {
    toast.success('Password Reset Successful!', {
      description: 'You can now login with your new password.',
    });
    
    setAuthStep('form');
    setActiveTab('login');
    setForgotEmail('');
    setResetOTP('');
    
    if (forgotEmail) {
      setLoginData(prev => ({
        ...prev,
        email: forgotEmail
      }));
    }
  };

  const validateReviewForm = () => {
    const newErrors = {};
    
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!formData.comment.trim()) {
      newErrors.comment = 'Please write your review';
    } else if (formData.comment.length < 10) {
      newErrors.comment = 'Review must be at least 10 characters';
    } else if (formData.comment.length > 500) {
      newErrors.comment = 'Review must be less than 500 characters';
    }
    
    if (formData.title && formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateReviewForm()) return;
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: formData.rating,
          title: formData.title || undefined,
          comment: formData.comment,
          productId: formData.productId || undefined,
          isAnonymous: formData.anonymous
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Thank you for your review!', {
          description: 'It will be published after moderation.',
        });
        
        setFormData({
          rating: 0,
          title: '',
          comment: '',
          productId: productId || '',
          productName: productName || '',
          anonymous: false
        });
        setSearchTerm('');
        
        onReviewSubmitted?.();
        onClose();
      } else {
        setErrors({ submit: data.error || 'Failed to submit review' });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: null }));
    }
  };

  const handleProductSelect = (product) => {
    setFormData(prev => ({
      ...prev,
      productId: product._id,
      productName: product.productName
    }));
    setIsDropdownOpen(false);
    setSearchTerm('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-20 bg-white/80 backdrop-blur-sm"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left Side - Jute Craftify Branding */}
                <div className="hidden md:block md:w-2/5 bg-gradient-to-br from-[#6B4F3A] to-[#8B6B51] p-5 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-24"></div>
                  <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="relative w-40 h-12 overflow-hidden">
                        <img 
                          src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
                          alt="Jute Craftify Logo"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <div className="text-center mb-3">
                      <div className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-0.5 mb-2">
                        <Leaf className="w-3 h-3 text-[#C6A43B]" />
                        <span className="text-[10px] font-medium">Premium Jute Products</span>
                      </div>
                      <h3 className="text-lg font-bold mb-1 font-serif">
                        {isAuthenticated ? 'Share Your Experience' : 'Join Our Community'}
                      </h3>
                      <p className="text-white/75 text-[11px]">
                        {isAuthenticated 
                          ? 'Your feedback helps us improve and helps other buyers.'
                          : 'Sign in to share your experience and help other wholesale buyers.'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div className="p-1 bg-[#C6A43B]/20 rounded-lg text-[#C6A43B]">
                            {benefit.icon}
                          </div>
                          <span className="text-[11px]">{benefit.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/20">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div>
                          <p className="text-xl font-bold text-[#C6A43B]">500+</p>
                          <p className="text-[9px] text-white/70">Verified Reviews</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-[#C6A43B]">4.8</p>
                          <p className="text-[9px] text-white/70">Average Rating</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Forms */}
                <div className="md:w-3/5 p-5 max-h-[520px] overflow-y-auto custom-scrollbar" style={{ backgroundColor: JUTE_COLORS.white }}>
                  {!isAuthenticated ? (
                    <>
                      {authStep === 'form' && (
                        <>
                          <div className="flex gap-4 mb-4">
                            <button
                              onClick={() => setActiveTab('login')}
                              className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-all ${
                                activeTab === 'login'
                                  ? 'border-[#C6A43B] text-[#6B4F3A]'
                                  : 'border-transparent text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              Sign In
                            </button>
                            <button
                              onClick={() => setActiveTab('register')}
                              className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-all ${
                                activeTab === 'register'
                                  ? 'border-[#C6A43B] text-[#6B4F3A]'
                                  : 'border-transparent text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              Create Account
                            </button>
                          </div>

                          {activeTab === 'login' ? (
                            <form onSubmit={handleLogin} className="space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Email Address
                                </label>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <input
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                    className="w-full pl-9 pr-3 py-2 text-sm border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white transition-all"
                                    placeholder="your@company.com"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Password
                                </label>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                    className="w-full pl-9 pr-10 py-2 text-sm border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white transition-all"
                                    placeholder="••••••••"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                  >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </button>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <button
                                  type="button"
                                  onClick={handleForgotPassword}
                                  className="text-[11px] text-[#6B4F3A] hover:underline font-medium"
                                >
                                  Forgot password?
                                </button>
                              </div>

                              <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 px-3 bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm"
                              >
                                {loading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Signing in...
                                  </>
                                ) : (
                                  <>
                                    Sign In
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                  </>
                                )}
                              </button>

                              <div className="relative my-3">
                                <div className="absolute inset-0 flex items-center">
                                  <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-[10px]">
                                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                              </div>
                              <GoogleLoginButtonPopUp
                                mode="login"
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                              />
                            </form>
                          ) : (
                            <form onSubmit={handleRegister} className="space-y-3 overflow-y-visible">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-2 md:col-span-1">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    Company Name <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <div className="relative">
                                    <Building className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                    <input
                                      type="text"
                                      name="companyName"
                                      value={registerData.companyName}
                                      onChange={handleRegisterChange}
                                      required
                                      className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                      placeholder="Company name"
                                    />
                                  </div>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    Contact Person <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <div className="relative">
                                    <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                    <input
                                      type="text"
                                      name="contactPerson"
                                      value={registerData.contactPerson}
                                      onChange={handleRegisterChange}
                                      required
                                      className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                      placeholder="Full name"
                                    />
                                  </div>
                                </div>

                                <div className="col-span-2">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    Email Address <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <div className="relative">
                                    <Mail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                    <input
                                      type="email"
                                      name="email"
                                      value={registerData.email}
                                      onChange={handleRegisterChange}
                                      required
                                      className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                      placeholder="your@company.com"
                                    />
                                  </div>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    Phone <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <div className="relative">
                                    <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                    <input
                                      type="tel"
                                      name="phone"
                                      value={registerData.phone}
                                      onChange={handleRegisterChange}
                                      required
                                      className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                      placeholder="+1 234 567 8900"
                                    />
                                  </div>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    WhatsApp <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <div className="relative">
                                    <Phone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                    <input
                                      type="tel"
                                      name="whatsapp"
                                      value={registerData.whatsapp}
                                      onChange={handleRegisterChange}
                                      required
                                      className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                      placeholder="+1 234 567 8900"
                                    />
                                  </div>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    Country <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <div className="relative">
                                    <MapPin className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                    <input
                                      type="text"
                                      name="country"
                                      value={registerData.country}
                                      onChange={handleRegisterChange}
                                      required
                                      className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                      placeholder="Country"
                                    />
                                  </div>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    City <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="city"
                                    value={registerData.city}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full px-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="City"
                                  />
                                </div>

                                <div className="col-span-1">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    Address <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="address"
                                    value={registerData.address}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full px-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="Street address"
                                  />
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    ZIP Code <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    name="zipCode"
                                    value={registerData.zipCode}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full px-2 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                    placeholder="ZIP code"
                                  />
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    Password <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <div className="relative">
                                    <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      name="password"
                                      value={registerData.password}
                                      onChange={handleRegisterChange}
                                      required
                                      className="w-full pl-8 pr-8 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                      placeholder="Min. 8 characters"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowPassword(!showPassword)}
                                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                  <label className="block text-[11px] font-medium text-gray-700 mb-0.5">
                                    Confirm Password <span className="text-[#6B4F3A]">*</span>
                                  </label>
                                  <div className="relative">
                                    <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                    <input
                                      type={showConfirmPassword ? "text" : "password"}
                                      name="confirmPassword"
                                      value={registerData.confirmPassword}
                                      onChange={handleRegisterChange}
                                      required
                                      className="w-full pl-8 pr-8 py-1.5 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white"
                                      placeholder="Re-enter password"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-start">
                                <input
                                  type="checkbox"
                                  name="agreeToTerms"
                                  id="agreeToTerms"
                                  checked={registerData.agreeToTerms}
                                  onChange={handleRegisterChange}
                                  required
                                  className="mt-0.5 rounded border-gray-300 text-[#6B4F3A] focus:ring-[#C6A43B] cursor-pointer w-3 h-3"
                                />
                                <label htmlFor="agreeToTerms" className="ml-1.5 text-[10px] text-gray-600">
                                  I agree to the <span className="text-[#6B4F3A] hover:underline">Terms</span> & <span className="text-[#6B4F3A] hover:underline">Privacy</span>
                                </label>
                              </div>

                              <button
                                type="submit"
                                disabled={loading || !registerData.agreeToTerms}
                                className="w-full py-2 px-3 bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm"
                              >
                                {loading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating...
                                  </>
                                ) : (
                                  <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                  </>
                                )}
                              </button>

                              <div className="relative my-3">
                                <div className="absolute inset-0 flex items-center">
                                  <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-[10px]">
                                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                </div>
                              </div>
                              <GoogleLoginButtonPopUp 
                                mode="signup"
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                              />
                            </form>
                          )}
                        </>
                      )}

                      {authStep === 'otp' && (
                        <div className="py-2">
                          <div className="text-center mb-3">
                            <div className="w-14 h-14 bg-[#F5E6D3] rounded-full flex items-center justify-center mx-auto mb-2">
                              <Mail className="w-6 h-6 text-[#6B4F3A]" />
                            </div>
                            <p className="text-xs text-gray-600">
                              We've sent a 6-digit code to<br />
                              <span className="font-semibold text-[#6B4F3A]">{registeredEmail}</span>
                            </p>
                          </div>
                          <OTPVerification 
                            email={registeredEmail}
                            onBack={() => setAuthStep('form')}
                            onSuccess={handleVerificationSuccess}
                          />
                        </div>
                      )}

                      {authStep === 'forgot' && (
                        <ForgotPassword 
                          onOTPSent={handleForgotOTPSent} 
                          onBack={handleForgotBack} 
                        />
                      )}

                      {authStep === 'reset-otp' && (
                        <ResetOTPVerification 
                          email={forgotEmail}
                          onBack={handleResetBack}
                          onSuccess={handleResetOTPVerified}
                        />
                      )}

                      {authStep === 'new-password' && (
                        <ModalResetPassword 
                          email={forgotEmail}
                          otp={resetOTP}
                          onBack={handleResetBack}
                          onSuccess={handleResetSuccess}
                        />
                      )}
                    </>
                  ) : (
                    userRole === 'admin' || userRole === 'moderator' ? (
                      <div className="text-center py-6">
                        <div className="w-14 h-14 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 mb-1 font-serif">
                          Review Access Restricted
                        </h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {userRole === 'admin' ? 'Admins' : 'Moderators'} cannot write product reviews.
                        </p>
                        <p className="text-[10px] text-gray-500">
                          This feature is available for wholesale customers only.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleReviewSubmit} className="space-y-3">
                        {/* Product Info - Read-only if from product page */}
                        {productId && productName && (
                          <div className="mb-2 p-2 bg-[#F5E6D3] rounded-lg border border-[#E5D5C0]">
                            <p className="text-[9px] text-[#6B4F3A] mb-0.5">Reviewing Product</p>
                            <p className="font-medium text-gray-900 text-xs">{productName}</p>
                          </div>
                        )}

                        <div className="text-center mb-2">
                          <div className="inline-flex items-center gap-1.5 bg-[#F5E6D3] rounded-full px-2.5 py-0.5 mb-2">
                            <Star className="w-3 h-3 text-[#C6A43B] fill-[#C6A43B]" />
                            <span className="text-[10px] font-medium text-[#6B4F3A]">Share Your Experience</span>
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 font-serif">Write a Review</h3>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Your Rating <span className="text-[#6B4F3A]">*</span>
                          </label>
                          <div className="flex gap-1.5 justify-center">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <motion.button
                                key={rating}
                                type="button"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleRatingClick(rating)}
                                onMouseEnter={() => setHoveredRating(rating)}
                                onMouseLeave={() => setHoveredRating(0)}
                                className="p-1 rounded-lg transition-all"
                              >
                                <Star
                                  className={`w-6 h-6 transition-all ${
                                    rating <= (hoveredRating || formData.rating)
                                      ? 'fill-[#C6A43B] text-[#C6A43B] scale-110'
                                      : 'text-gray-300 hover:text-gray-400'
                                  }`}
                                />
                              </motion.button>
                            ))}
                          </div>
                          {errors.rating && (
                            <p className="text-red-500 text-[10px] mt-1 flex items-center justify-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.rating}
                            </p>
                          )}
                        </div>

                        {/* Product Selection - Only show if no productId provided */}
                        {!productId && (
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Select Product <span className="text-gray-400 text-[10px]">(Optional)</span>
                            </label>
                            
                            {loadingProducts ? (
                              <div className="flex items-center justify-center gap-2 p-2 bg-[#FAF7F2] rounded-lg">
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C6A43B]" />
                                <span className="text-[10px] text-gray-500">Loading products...</span>
                              </div>
                            ) : (
                              <div className="relative" ref={dropdownRef}>
                                <div
                                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                  className="w-full px-3 py-2 text-sm border border-[#E5D5C0] rounded-lg bg-[#FAF7F2] cursor-pointer flex items-center justify-between hover:border-[#C6A43B] transition-colors"
                                >
                                  <span className={`text-xs ${formData.productName ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {formData.productName || 'Search and select a product...'}
                                  </span>
                                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {isDropdownOpen && (
                                  <div className="absolute z-10 w-full mt-1 bg-white border border-[#E5D5C0] rounded-lg shadow-lg max-h-48 overflow-hidden">
                                    <div className="p-1.5 border-b border-[#E5D5C0] bg-[#FAF7F2]">
                                      <div className="relative">
                                        <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                        <input
                                          type="text"
                                          value={searchTerm}
                                          onChange={(e) => setSearchTerm(e.target.value)}
                                          placeholder="Search products..."
                                          className="w-full pl-8 pr-2 py-1.5 text-xs border border-[#E5D5C0] rounded-md focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent outline-none bg-white"
                                          autoFocus
                                        />
                                      </div>
                                    </div>

                                    <div className="overflow-y-auto max-h-36">
                                      {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                          <div
                                            key={product._id}
                                            onClick={() => handleProductSelect(product)}
                                            className="px-3 py-1.5 hover:bg-[#F5E6D3] cursor-pointer transition-colors border-b border-[#E5D5C0] last:border-0"
                                          >
                                            <p className="text-xs text-gray-700">{product.productName}</p>
                                          </div>
                                        ))
                                      ) : (
                                        <div className="px-3 py-4 text-center">
                                          <p className="text-xs text-gray-400">No products found</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Review Title <span className="text-gray-400 text-[10px]">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleReviewChange}
                            placeholder="Summarize your experience"
                            maxLength="100"
                            className="w-full px-3 py-2 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white transition-all"
                          />
                          <p className="text-[9px] text-gray-400 mt-0.5 text-right">
                            {formData.title.length}/100
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Your Review <span className="text-[#6B4F3A]">*</span>
                          </label>
                          <textarea
                            name="comment"
                            value={formData.comment}
                            onChange={handleReviewChange}
                            placeholder="Share details about your experience..."
                            rows="3"
                            maxLength="500"
                            className="w-full px-3 py-2 text-xs border border-[#E5D5C0] rounded-lg focus:ring-2 focus:ring-[#C6A43B] focus:border-transparent bg-[#FAF7F2] focus:bg-white transition-all resize-none"
                          />
                          <p className="text-[9px] text-gray-400 mt-0.5 text-right">
                            {formData.comment.length}/500
                          </p>
                        </div>

                        <label className="flex items-center cursor-pointer p-2 bg-[#FAF7F2] rounded-lg hover:bg-[#F5E6D3] transition-colors">
                          <input
                            type="checkbox"
                            name="anonymous"
                            checked={formData.anonymous}
                            onChange={handleReviewChange}
                            className="rounded border-gray-300 text-[#6B4F3A] focus:ring-[#C6A43B] cursor-pointer w-3 h-3"
                          />
                          <span className="ml-2 text-[10px] text-gray-600">
                            Post as anonymous (your name won't be displayed)
                          </span>
                        </label>

                        {errors.submit && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                            <p className="text-red-600 text-[10px] flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.submit}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 px-3 border-2 border-[#E5D5C0] text-gray-700 font-semibold rounded-lg hover:bg-[#FAF7F2] transition-all text-xs"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2 px-3 bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 group text-xs"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Submit Review
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>
                        </div>

                        <p className="text-[9px] text-gray-400 text-center mt-2">
                          Your review will be published after moderation to ensure quality
                        </p>
                      </form>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}