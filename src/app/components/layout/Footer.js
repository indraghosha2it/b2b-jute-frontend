// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { 
//   FaFacebookF, 
//   FaInstagram, 
//   FaTwitter, 
//   FaWhatsapp,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaClock,
//   FaShieldAlt,
//   FaStar,
//   FaCheckCircle,
//   FaBuilding,
//   FaGlobe,
//   FaBox,
//   FaArrowRight,
//   FaIndustry,
//   FaShip,
//   FaHeadset,
//   FaPinterest,
//   FaYoutube,
//   FaLinkedinIn
// } from 'react-icons/fa';
// import { HiOutlineBadgeCheck } from 'react-icons/hi';

// export default function Footer() {
//   const router = useRouter();
//   const currentYear = new Date().getFullYear();

//   const companyInfo = {
//     name: "Jute Craftify",
//     tagline: "Premium Jute Products Supplier from Bangladesh",
//     address: "34/6, Mongla, Khulna, Bangladesh, 9100",
//     phone: "+8801871-733305",
//     email: "info@jutecraftify.com",
//     whatsapp: "8801871733305",
//     hours: "Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM | Sun: Closed",
//     social: {
//       facebook: "https://facebook.com/JuteCraftify",
//       instagram: "https://instagram.com/jutecraftify5730",
//       twitter: "https://x.com/jutecraftify",
//       linkedin: "https://linkedin.com/company/jutecraftify",
//       youtube: "https://youtube.com/@Juteccraftify",
//     }
//   };

//   // Handle FAQ click with smooth scroll
//   const handleFaqClick = (e) => {
//     e.preventDefault();
    
//     if (window.location.pathname === '/contact') {
//       const faqSection = document.getElementById('faq-section');
//       if (faqSection) {
//         const offset = 100;
//         const elementPosition = faqSection.getBoundingClientRect().top;
//         const offsetPosition = elementPosition + window.pageYOffset - offset;
//         window.scrollTo({
//           top: offsetPosition,
//           behavior: 'smooth'
//         });
//       }
//     } else {
//       router.push('/contact#faq-section');
//       setTimeout(() => {
//         const faqSection = document.getElementById('faq-section');
//         if (faqSection) {
//           const offset = 100;
//           const elementPosition = faqSection.getBoundingClientRect().top;
//           const offsetPosition = elementPosition + window.pageYOffset - offset;
//           window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
//         }
//       }, 100);
//     }
//   };

//   const quickLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Products', href: '/products' },
//     { name: 'About Us', href: '/about' },
//     { name: 'Contact', href: '/contact' },
//     { name: 'Blog', href: '/blog' },
//   ];

//   const supportLinks = [
//     { name: 'Shipping & Delivery',  href: '/shipping' },
//     { name: 'Privacy Policy', href: '/privacy' },
//     { name: 'Terms of Service', href: '/terms' },
//   ];

//   const openGmail = (email) => {
//     window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
//   };

//   return (
//     <footer className="relative text-white overflow-hidden">
//       {/* Premium Background Image with Overlay */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url('https://i.ibb.co.com/hxw8yckb/fabric-fir-leaves.jpg')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         {/* Dark Gradient Overlay for better text readability */}
//         <div className="absolute inset-0 bg-gradient-to-t from-[#4a2e20] via-[#2A1B14]/75 to-[#2A1B14]/90"></div>
        
//         {/* Secondary Overlay for depth */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
//       </div>
      
//       {/* Top Gradient Bar - Premium Gold/Green */}
//       <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#3bc24f] via-[#F5E6D3] to-[#3bc24f] z-20"></div>
      
//       {/* Decorative Jute Pattern Overlay */}
      
      
//       {/* Main Footer Content */}
//       <div className="container mx-auto px-4 py-10 lg:py-8 relative z-10">
        
//         {/* Main Grid */}
//      <div className="lg:grid lg:grid-cols-12 lg:gap-4 flex flex-col space-y-6 lg:space-y-0 mb-4">
  
//   {/* Column 1: Company Info - Wider (5 columns) */}
//   <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:col-span-4">
//     <div className="flex flex-col items-center lg:items-start gap-1 mb-3">
//       <div className="relative mb-1">
//         <div className="absolute inset-0 rounded-full blur-xl bg-[#3bc24f]/20"></div>
//         <img 
//           src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
//           alt="Jute Craftify"
//           className="h-12 w-auto relative z-10"
//         />
//       </div>
//       <div>
//         <h2 className="text-xl font-bold bg-gradient-to-r from-[#3bc24f] to-[#F5E6D3] bg-clip-text text-transparent">
//           {companyInfo.name}
//         </h2>
//         <p className="text-xs text-[#F5E6D3]/60">Premium Jute Products · Since 2010</p>
//       </div>
//     </div>
    
//     <p className="text-[#F5E6D3]/80 text-xs mb-3 leading-relaxed max-w-xs">
//       {companyInfo.tagline}
//     </p>

//     {/* Verified Badges - All in one row */}
//     <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3">
//       <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
//         <HiOutlineBadgeCheck className="text-[#3bc24f] text-[10px] sm:text-xs" />
//         <span className="text-[10px] sm:text-xs font-medium text-[#F5E6D3]/90 whitespace-nowrap">Verified Supplier</span>
//       </div>
//       <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
//         <FaShieldAlt className="text-[#3bc24f] text-[10px] sm:text-xs" />
//         <span className="text-[10px] sm:text-xs font-medium text-[#F5E6D3]/90 whitespace-nowrap">Trade Assurance</span>
//       </div>
//       <div className="flex items-center gap-1 bg-[#3bc24f]/20 backdrop-blur-sm rounded-full px-2 py-1 border border-[#3bc24f]/30">
//         <FaCheckCircle className="text-[#3bc24f] text-[10px] sm:text-xs" />
//         <span className="text-[10px] sm:text-xs font-medium text-[#F5E6D3] whitespace-nowrap">100% Eco-Friendly</span>
//       </div>
//     </div>
//   </div>

//   {/* Column 2: Quick Links (2 columns) */}
//   <div className="hidden lg:block lg:col-span-2">
//     <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//       Quick Links
//       <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
//     </h3>
//     <ul className="space-y-2">
//       {quickLinks.map((link) => (
//         <li key={link.name}>
//           <Link 
//             href={link.href}
//             className="text-[#F5E6D3]/60 hover:text-[#3bc24f] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//           >
//             <span className="w-1 h-1 rounded-full bg-[#F5E6D3]/30 group-hover:bg-[#3bc24f] transition-colors"></span>
//             {link.name}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </div>

//   {/* Column 3: Support (2 columns) */}
//   <div className="hidden lg:block lg:col-span-3">
//     <div>
//       <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//         Support
//         <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
//       </h3>
//       <ul className="space-y-2">
//         {supportLinks.map((link) => (
//           <li key={link.name}>
//             <Link 
//               href={link.href}
//               className="text-[#F5E6D3]/60 hover:text-[#3bc24f] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
//             >
//               <span className="w-1 h-1 rounded-full bg-[#F5E6D3]/30 group-hover:bg-[#3bc24f] transition-colors"></span>
//               {link.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>

//     {/* Connect With Us */}
//     <div className="mt-4 pt-0">
//       <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//         Connect With Us
//         <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
//       </h3>
      
//       <div className="flex flex-wrap gap-1.5">
//         {[
//           { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
//           { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
//           { icon: <FaTwitter />, href: companyInfo.social.twitter, label: 'Twitter' },
//           { icon: <FaLinkedinIn />, href: companyInfo.social.linkedin, label: 'LinkedIn' },
//           { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
//           { icon: <FaWhatsapp />, href: `https://wa.me/${companyInfo.whatsapp}?text=Hi%20Jute%20Craftify%2C%20I'm%20interested%20in%20your%20jute%20products`, label: 'WhatsApp', target: '_blank', rel: 'noopener noreferrer' },
//           { icon: <FaEnvelope />, onClick: () => openGmail(companyInfo.email), isButton: true, label: 'Gmail' },
//         ].map((social, index) => (
//           social.isButton ? (
//             <motion.button
//               key={index}
//               onClick={social.onClick}
//               className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#3bc24f]/20 transition-all duration-300 group"
//               whileHover={{ y: -1 }}
//               title={social.label}
//             >
//               <span className="text-[#F5E6D3]/70 group-hover:text-[#3bc24f] transition-colors text-xs">
//                 {social.icon}
//               </span>
//             </motion.button>
//           ) : (
//             <motion.a
//               key={index}
//               href={social.href}
//               target={social.target || "_blank"}
//               rel={social.rel || "noopener noreferrer"}
//               className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#3bc24f]/20 transition-all duration-300 group"
//               whileHover={{ y: -1 }}
//               title={social.label}
//             >
//               <span className="text-[#F5E6D3]/70 group-hover:text-[#3bc24f] transition-colors text-xs">
//                 {social.icon}
//               </span>
//             </motion.a>
//           )
//         ))}
//       </div>
//     </div>
//   </div>

//   {/* Column 4: Contact Us (3 columns) */}
//   <div className="hidden lg:block lg:col-span-3">
//     <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
//       Contact Us
//       <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
//     </h3>
    
//     <div className="space-y-2">
//       <motion.a 
//         href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-start gap-2 text-[#F5E6D3]/70 hover:text-[#3bc24f] transition-colors group text-xs"
//         whileHover={{ x: 2 }}
//       >
//         <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#3bc24f]/30 transition-colors">
//           <FaMapMarkerAlt className="text-[#3bc24f] text-xs" />
//         </div>
//         <span className="text-xs leading-tight">{companyInfo.address}</span>
//       </motion.a>
      
//       <motion.a 
//         href={`tel:${companyInfo.phone}`}
//         className="flex items-center gap-2 text-[#F5E6D3]/70 hover:text-[#3bc24f] transition-colors group text-xs"
//         whileHover={{ x: 2 }}
//       >
//         <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#3bc24f]/30 transition-colors">
//           <FaPhone className="text-[#3bc24f] text-xs" />
//         </div>
//         <span className="text-xs">{companyInfo.phone}</span>
//       </motion.a>
      
//       <motion.button 
//         onClick={() => openGmail(companyInfo.email)}
//         className="flex items-center gap-2 text-[#F5E6D3]/70 hover:text-[#3bc24f] transition-colors group w-full text-left text-xs"
//         whileHover={{ x: 2 }}
//       >
//         <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#3bc24f]/30 transition-colors">
//           <FaEnvelope className="text-[#3bc24f] text-xs" />
//         </div>
//         <span className="text-xs">{companyInfo.email}</span>
//       </motion.button>
      
//       <div className="flex items-start gap-2 text-[#F5E6D3]/70 text-xs">
//         <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
//           <FaClock className="text-[#3bc24f] text-xs" />
//         </div>
//         <span className="text-xs leading-tight">{companyInfo.hours}</span>
//       </div>
//     </div>
//   </div>
// </div>

//         {/* Bottom Bar */}
//         <div className="pt-4 mt-2 border-t border-white/10">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
//             <p className="text-[#F5E6D3]/40 text-xs">
//               © {currentYear} <span className="text-[#F5E6D3]/60 font-medium">Jute Craftify</span>. All rights reserved.
//             </p>
            
//             {/* Trust Badges */}
//             <div className="flex items-center gap-3">
//               <span className="text-[#F5E6D3]/40 text-xs">Certified:</span>
//               <div className="flex gap-1">
//                 <div className="px-1.5 py-0.5 bg-white/10 backdrop-blur-sm rounded text-[9px] font-medium text-[#F5E6D3]/70 border border-white/20">
//                   ISO 9001
//                 </div>
//                 <div className="px-1.5 py-0.5 bg-white/10 backdrop-blur-sm rounded text-[9px] font-medium text-[#F5E6D3]/70 border border-white/20">
//                   GOTS
//                 </div>
//                 <div className="px-1.5 py-0.5 bg-white/10 backdrop-blur-sm rounded text-[9px] font-medium text-[#F5E6D3]/70 border border-white/20">
//                   Fair Trade
//                 </div>
//                 <div className="px-1.5 py-0.5 bg-white/10 backdrop-blur-sm rounded text-[9px] font-medium text-[#F5E6D3]/70 border border-white/20">
//                   OEKO-TEX
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }


'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaStar,
  FaCheckCircle,
  FaBuilding,
  FaGlobe,
  FaBox,
  FaArrowRight,
  FaIndustry,
  FaShip,
  FaHeadset,
  FaPinterest,
  FaYoutube,
  FaLinkedinIn
} from 'react-icons/fa';
import { HiOutlineBadgeCheck } from 'react-icons/hi';

export default function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const companyInfo = {
    name: "Jute Craftify",
    tagline: "Premium Jute Products Supplier from Bangladesh",
    address: "34/6, Mongla, Khulna, Bangladesh, 9100",
    phone: "+8801871-733305",
    email: "info@jutecraftify.com",
    whatsapp: "8801871733305",
    hours: "Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM | Sun: Closed",
    social: {
      facebook: "https://facebook.com/JuteCraftify",
      instagram: "https://instagram.com/jutecraftify5730",
      twitter: "https://x.com/jutecraftify",
      linkedin: "https://linkedin.com/company/jutecraftify",
      youtube: "https://youtube.com/@Juteccraftify",
    }
  };

  // Handle FAQ click with smooth scroll
  const handleFaqClick = (e) => {
    e.preventDefault();
    
    if (window.location.pathname === '/contact') {
      const faqSection = document.getElementById('faq-section');
      if (faqSection) {
        const offset = 100;
        const elementPosition = faqSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      router.push('/contact#faq-section');
      setTimeout(() => {
        const faqSection = document.getElementById('faq-section');
        if (faqSection) {
          const offset = 100;
          const elementPosition = faqSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ];

  const supportLinks = [
    { name: 'Shipping & Delivery', href: '/shipping' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  const openGmail = (email) => {
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
  };

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Premium Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.ibb.co.com/hxw8yckb/fabric-fir-leaves.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a2e20] via-[#2A1B14]/75 to-[#2A1B14]/90"></div>
        
        {/* Secondary Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>
      
      {/* Top Gradient Bar - Premium Gold/Green */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#3bc24f] via-[#F5E6D3] to-[#3bc24f] z-20"></div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10 lg:py-8 relative z-10">
        
        {/* Main Grid - Desktop (lg and above) */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-4 mb-4">
          
          {/* Column 1: Company Info - Wider (4 columns) */}
          <div className="flex flex-col items-start text-left w-full lg:col-span-4">
            <div className="flex flex-col items-start gap-1 mb-3">
              <div className="relative mb-1">
                <div className="absolute inset-0 rounded-full blur-xl bg-[#3bc24f]/20"></div>
                <img 
                  src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
                  alt="Jute Craftify"
                  className="h-12 w-auto relative z-10"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#3bc24f] to-[#F5E6D3] bg-clip-text text-transparent">
                  {companyInfo.name}
                </h2>
                <p className="text-xs text-[#F5E6D3]/60">Premium Jute Products · Since 2010</p>
              </div>
            </div>
            
            <p className="text-[#F5E6D3]/80 text-xs mb-3 leading-relaxed max-w-xs">
              {companyInfo.tagline}
            </p>

            {/* Verified Badges - All in one row */}
            <div className="flex flex-wrap items-center justify-start gap-2 mb-3">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
                <HiOutlineBadgeCheck className="text-[#3bc24f] text-[10px] sm:text-xs" />
                <span className="text-[10px] sm:text-xs font-medium text-[#F5E6D3]/90 whitespace-nowrap">Verified Supplier</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
                <FaShieldAlt className="text-[#3bc24f] text-[10px] sm:text-xs" />
                <span className="text-[10px] sm:text-xs font-medium text-[#F5E6D3]/90 whitespace-nowrap">Trade Assurance</span>
              </div>
              <div className="flex items-center gap-1 bg-[#3bc24f]/20 backdrop-blur-sm rounded-full px-2 py-1 border border-[#3bc24f]/30">
                <FaCheckCircle className="text-[#3bc24f] text-[10px] sm:text-xs" />
                <span className="text-[10px] sm:text-xs font-medium text-[#F5E6D3] whitespace-nowrap">100% Eco-Friendly</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 columns) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-[#F5E6D3]/60 hover:text-[#3bc24f] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#F5E6D3]/30 group-hover:bg-[#3bc24f] transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support (3 columns) */}
          <div className="lg:col-span-3">
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-[#F5E6D3]/60 hover:text-[#3bc24f] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#F5E6D3]/30 group-hover:bg-[#3bc24f] transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect With Us */}
            <div className="mt-4 pt-0">
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Connect With Us
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
              </h3>
              
              <div className="flex flex-wrap gap-1.5">
                {[
                  { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
                  { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
                  { icon: <FaTwitter />, href: companyInfo.social.twitter, label: 'Twitter' },
                  { icon: <FaLinkedinIn />, href: companyInfo.social.linkedin, label: 'LinkedIn' },
                  { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
                  { icon: <FaWhatsapp />, href: `https://wa.me/${companyInfo.whatsapp}?text=Hi%20Jute%20Craftify%2C%20I'm%20interested%20in%20your%20jute%20products`, label: 'WhatsApp', target: '_blank', rel: 'noopener noreferrer' },
                  { icon: <FaEnvelope />, onClick: () => openGmail(companyInfo.email), isButton: true, label: 'Gmail' },
                ].map((social, index) => (
                  social.isButton ? (
                    <motion.button
                      key={index}
                      onClick={social.onClick}
                      className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#3bc24f]/20 transition-all duration-300 group"
                      whileHover={{ y: -1 }}
                      title={social.label}
                    >
                      <span className="text-[#F5E6D3]/70 group-hover:text-[#3bc24f] transition-colors text-xs">
                        {social.icon}
                      </span>
                    </motion.button>
                  ) : (
                    <motion.a
                      key={index}
                      href={social.href}
                      target={social.target || "_blank"}
                      rel={social.rel || "noopener noreferrer"}
                      className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#3bc24f]/20 transition-all duration-300 group"
                      whileHover={{ y: -1 }}
                      title={social.label}
                    >
                      <span className="text-[#F5E6D3]/70 group-hover:text-[#3bc24f] transition-colors text-xs">
                        {social.icon}
                      </span>
                    </motion.a>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Contact Us (3 columns) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
            </h3>
            
            <div className="space-y-2">
              <motion.a 
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-[#F5E6D3]/70 hover:text-[#3bc24f] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#3bc24f]/30 transition-colors">
                  <FaMapMarkerAlt className="text-[#3bc24f] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.address}</span>
              </motion.a>
              
              <motion.a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-[#F5E6D3]/70 hover:text-[#3bc24f] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#3bc24f]/30 transition-colors">
                  <FaPhone className="text-[#3bc24f] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.phone}</span>
              </motion.a>
              
              <motion.button 
                onClick={() => openGmail(companyInfo.email)}
                className="flex items-center gap-2 text-[#F5E6D3]/70 hover:text-[#3bc24f] transition-colors group w-full text-left text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#3bc24f]/30 transition-colors">
                  <FaEnvelope className="text-[#3bc24f] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.email}</span>
              </motion.button>
              
              <div className="flex items-start gap-2 text-[#F5E6D3]/70 text-xs">
                <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-[#3bc24f] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Visible on small devices */}
        <div className="lg:hidden flex flex-col space-y-6 mb-4">
          
          {/* Company Info - Centered on mobile */}
          <div className="flex flex-col items-center text-center w-full">
            <div className="flex flex-col items-center gap-1 mb-3">
              <div className="relative mb-1">
                <div className="absolute inset-0 rounded-full blur-xl bg-[#3bc24f]/20"></div>
                <img 
                  src="https://i.ibb.co.com/YBG2DF6f/Chat-GPT-Image-Feb-26-2026-09-57-28-AM-removebg-preview.png"
                  alt="Jute Craftify"
                  className="h-12 w-auto relative z-10"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#3bc24f] to-[#F5E6D3] bg-clip-text text-transparent">
                  {companyInfo.name}
                </h2>
                <p className="text-xs text-[#F5E6D3]/60">Premium Jute Products · Since 2010</p>
              </div>
            </div>
            
            <p className="text-[#F5E6D3]/80 text-xs mb-3 leading-relaxed max-w-xs">
              {companyInfo.tagline}
            </p>

            {/* Verified Badges - Center on mobile */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
                <HiOutlineBadgeCheck className="text-[#3bc24f] text-[10px] sm:text-xs" />
                <span className="text-[10px] sm:text-xs font-medium text-[#F5E6D3]/90 whitespace-nowrap">Verified Supplier</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
                <FaShieldAlt className="text-[#3bc24f] text-[10px] sm:text-xs" />
                <span className="text-[10px] sm:text-xs font-medium text-[#F5E6D3]/90 whitespace-nowrap">Trade Assurance</span>
              </div>
              <div className="flex items-center gap-1 bg-[#3bc24f]/20 backdrop-blur-sm rounded-full px-2 py-1 border border-[#3bc24f]/30">
                <FaCheckCircle className="text-[#3bc24f] text-[10px] sm:text-xs" />
                <span className="text-[10px] sm:text-xs font-medium text-[#F5E6D3] whitespace-nowrap">100% Eco-Friendly</span>
              </div>
            </div>
          </div>

          {/* Mobile Links Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-6">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-[#F5E6D3]/60 hover:text-[#3bc24f] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#F5E6D3]/30 group-hover:bg-[#3bc24f] transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
              </h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-[#F5E6D3]/60 hover:text-[#3bc24f] transition-colors duration-200 text-xs flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#F5E6D3]/30 group-hover:bg-[#3bc24f] transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Contact Section */}
          <div className="w-full">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
            </h3>
            
            <div className="space-y-2">
              <motion.a 
                href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-[#F5E6D3]/70 hover:text-[#3bc24f] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#3bc24f]/30 transition-colors">
                  <FaMapMarkerAlt className="text-[#3bc24f] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.address}</span>
              </motion.a>
              
              <motion.a 
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-[#F5E6D3]/70 hover:text-[#3bc24f] transition-colors group text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#3bc24f]/30 transition-colors">
                  <FaPhone className="text-[#3bc24f] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.phone}</span>
              </motion.a>
              
              <motion.button 
                onClick={() => openGmail(companyInfo.email)}
                className="flex items-center gap-2 text-[#F5E6D3]/70 hover:text-[#3bc24f] transition-colors group w-full text-left text-xs"
                whileHover={{ x: 2 }}
              >
                <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#3bc24f]/30 transition-colors">
                  <FaEnvelope className="text-[#3bc24f] text-xs" />
                </div>
                <span className="text-xs">{companyInfo.email}</span>
              </motion.button>
              
              <div className="flex items-start gap-2 text-[#F5E6D3]/70 text-xs">
                <div className="w-5 h-5 rounded-lg bg-[#3bc24f]/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <FaClock className="text-[#3bc24f] text-xs" />
                </div>
                <span className="text-xs leading-tight">{companyInfo.hours}</span>
              </div>
            </div>
          </div>

          {/* Mobile Connect Section */}
          <div className="w-full">
            <h3 className="text-sm font-semibold text-white mb-3 relative inline-block">
              Connect With Us
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-[#3bc24f] to-transparent"></span>
            </h3>
            
            <div className="flex flex-wrap gap-1.5">
              {[
                { icon: <FaFacebookF />, href: companyInfo.social.facebook, label: 'Facebook' },
                { icon: <FaInstagram />, href: companyInfo.social.instagram, label: 'Instagram' },
                { icon: <FaTwitter />, href: companyInfo.social.twitter, label: 'Twitter' },
                { icon: <FaLinkedinIn />, href: companyInfo.social.linkedin, label: 'LinkedIn' },
                { icon: <FaYoutube />, href: companyInfo.social.youtube, label: 'YouTube' },
                { icon: <FaWhatsapp />, href: `https://wa.me/${companyInfo.whatsapp}?text=Hi%20Jute%20Craftify%2C%20I'm%20interested%20in%20your%20jute%20products`, label: 'WhatsApp', target: '_blank', rel: 'noopener noreferrer' },
                { icon: <FaEnvelope />, onClick: () => openGmail(companyInfo.email), isButton: true, label: 'Gmail' },
              ].map((social, index) => (
                social.isButton ? (
                  <motion.button
                    key={index}
                    onClick={social.onClick}
                    className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#3bc24f]/20 transition-all duration-300 group"
                    whileHover={{ y: -1 }}
                    title={social.label}
                  >
                    <span className="text-[#F5E6D3]/70 group-hover:text-[#3bc24f] transition-colors text-xs">
                      {social.icon}
                    </span>
                  </motion.button>
                ) : (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.target || "_blank"}
                    rel={social.rel || "noopener noreferrer"}
                    className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-[#3bc24f]/20 transition-all duration-300 group"
                    whileHover={{ y: -1 }}
                    title={social.label}
                  >
                    <span className="text-[#F5E6D3]/70 group-hover:text-[#3bc24f] transition-colors text-xs">
                      {social.icon}
                    </span>
                  </motion.a>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 mt-2 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
            <p className="text-[#F5E6D3]/40 text-xs">
              © {currentYear} <span className="text-[#F5E6D3]/60 font-medium">Jute Craftify</span>. All rights reserved.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-3">
              <span className="text-[#F5E6D3]/40 text-xs">Certified:</span>
              <div className="flex flex-wrap gap-1">
                <div className="px-1.5 py-0.5 bg-white/10 backdrop-blur-sm rounded text-[9px] font-medium text-[#F5E6D3]/70 border border-white/20">
                  ISO 9001
                </div>
                <div className="px-1.5 py-0.5 bg-white/10 backdrop-blur-sm rounded text-[9px] font-medium text-[#F5E6D3]/70 border border-white/20">
                  GOTS
                </div>
                <div className="px-1.5 py-0.5 bg-white/10 backdrop-blur-sm rounded text-[9px] font-medium text-[#F5E6D3]/70 border border-white/20">
                  Fair Trade
                </div>
                <div className="px-1.5 py-0.5 bg-white/10 backdrop-blur-sm rounded text-[9px] font-medium text-[#F5E6D3]/70 border border-white/20">
                  OEKO-TEX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}