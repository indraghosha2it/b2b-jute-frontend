'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Building2, 
  Clock, 
  Globe, 
  Star, 
  Shield, 
  Truck, 
  CheckCircle2,
  ArrowUpRight,
  Medal,
  Users,
  MessageCircle,
  Package,
  TrendingUp,
  Zap,
  Crown
} from 'lucide-react';

export default function AlibabaTrustSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section ref={sectionRef} className=" bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B12] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#4A7C59] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header - Serif Heading */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-[#4A7C59] text-white rounded-full px-4 py-1.5 mb-5"
          >
            <Crown className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-wide font-sans">Official Alibaba Partner</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl sm:text-4xl font-light text-[#1A1A1A] mb-3 font-serif"
          >
            <span className="font-semibold text-[#FF6B12]">Alibaba</span> Verified Excellence
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-500 max-w-lg mx-auto text-sm font-sans"
          >
            Join 800+ global buyers who trust our verified Alibaba store for premium jute products
          </motion.p>
        </div>

     

        {/* Two Column Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Alibaba Store Showcase */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-5"
          >
            {/* Featured Product Showcase with Background Image */}
            <motion.div 
              variants={itemVariants} 
              className="relative rounded-2xl overflow-hidden"
              style={{
                backgroundImage: `url('https://i.ibb.co.com/k2XKP2vv/Hf2a86c0186e2470f94378884ba070de4-U.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
              
              <div className="relative z-10 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-[#FF6B12]" />
                  <span className="text-[#FF6B12] text-xs font-semibold tracking-wide font-sans">BESTSELLER</span>
                </div>
                <h3 className="text-white text-xl font-semibold mb-1 font-serif">Premium Jute Shopping Bags</h3>
                <p className="text-gray-300 text-xs mb-4 font-sans">Eco-friendly | Customizable | Bulk Ready</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <div className="text-[#FF6B12] text-lg font-bold font-serif">$0.85-1.50</div>
                    <div className="text-gray-400 text-[9px] font-sans">per piece</div>
                  </div>
                  <div className="w-px h-8 bg-gray-600" />
                  <div>
                    <div className="text-white text-sm font-semibold font-sans">500 pcs</div>
                    <div className="text-gray-400 text-[9px] font-sans">Minimum order</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3 fill-[#FF6B12] text-[#FF6B12]" />
                    ))}
                  </div>
                  <span className="text-gray-400 text-[10px] font-sans">(2,150+ orders)</span>
                </div>
              </div>
              
              <div className="relative z-10 h-20 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-end px-6">
                <Link href="https://bd1568632076susg.trustpass.alibaba.com/" target="_blank" className="flex items-center gap-2 text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-[#FF6B12] hover:bg-opacity-80 transition-all duration-300 font-sans">
                  View on Alibaba <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Trust Indicators Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, label: "Trade Assurance", desc: "Payment protected" },
                { icon: Clock, label: "Fast Response", desc: "Within 2 hours" },
                { icon: CheckCircle2, label: "Onsite Checked", desc: "Factory verified" },
                { icon: Truck, label: "Global Shipping", desc: "Sea & Air freight" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4 text-[#FF6B12]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-800 font-sans">{item.label}</div>
                      <div className="text-[9px] text-gray-400 font-sans">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right: Product Grid & CTA */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-5"
          >
            {/* Product Categories Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              {[
                { name: "Raw Jute Fiber", price: "$450-550/Ton", icon: "🌾" },
                { name: "Jute Bags", price: "$0.85-2.50/pc", icon: "🛍️" },
                { name: "Jute Rugs", price: "$2.50-8.00/pc", icon: "🏠" },
                { name: "Jute Yarn", price: "$1.20-3.80/kg", icon: "🧵" },
              ].map((cat, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-3 hover:shadow-md transition-shadow">
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="font-semibold text-gray-800 text-sm font-sans">{cat.name}</div>
                  <div className="text-[#FF6B12] text-xs font-medium mt-1 font-sans">{cat.price}</div>
                  <div className="text-[9px] text-gray-400 mt-0.5 font-sans">Bulk orders only</div>
                </div>
              ))}
            </motion.div>

            {/* Call to Action Card */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-[#FFA624] to-[#FF6501] rounded-2xl p-5 text-center">
              <div className="inline-flex items-center gap-1 bg-white/20 rounded-full px-3 py-1 mb-3">
                <TrendingUp className="w-3 h-3 text-white" />
                <span className="text-white text-[10px] font-semibold font-sans">BEST PRICE GUARANTEE</span>
              </div>
              <h4 className="text-white font-semibold text-lg mb-1 font-serif">Get Better Price Directly</h4>
              <p className="text-white/80 text-xs mb-4 font-sans">Skip the platform fees — contact us directly for wholesale rates</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#FF6B12] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all duration-300 font-sans"
              >
                Request Direct Quote
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap justify-center items-center gap-6 text-center"
        >
          <div className="flex items-center gap-2">
            <Medal className="w-4 h-4 text-[#FF6B12]" />
            <span className="text-xs text-gray-500 font-sans">ISO 9001 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#4A7C59]" />
            <span className="text-xs text-gray-500 font-sans">30+ Countries Served</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#6B4F3A]" />
            <span className="text-xs text-gray-500 font-sans">Direct from Bangladesh</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}