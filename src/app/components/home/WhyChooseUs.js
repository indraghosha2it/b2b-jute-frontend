'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Leaf, 
  Globe, 
  Factory, 
  Package, 
  Clock, 
  ShieldCheck,
  Zap,
  Truck,
  Medal
} from 'lucide-react';

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [animatedStats, setAnimatedStats] = useState({
    eco: 0,
    countries: 0,
    delivery: 0
  });

  // Features for grid - only 3 in a row to keep compact
  const features = [
    {
      icon: Leaf,
      title: "100% Eco-Friendly Materials",
      description: "Premium jute products that are 100% biodegradable and sustainable.",
      stat: "100%",
      statLabel: "Biodegradable",
      color: "#4A7C59"
    },
    {
      icon: Globe,
      title: "Export to 30+ Countries",
      description: "Trusted by importers across USA, Europe, Middle East, and Asia.",
      stat: "30+",
      statLabel: "Countries",
      color: "#C6A43B"
    },
    {
      icon: Factory,
      title: "Direct Manufacturer Network",
      description: "Factory-direct pricing with complete quality control from source to shipping.",
      stat: "500+",
      statLabel: "Happy Clients",
      color: "#6B4F3A"
    },
    {
      icon: Package,
      title: "Bulk Order Capacity",
      description: "Handle orders from 500 to 500,000+ units with flexible MOQ.",
      stat: "500K+",
      statLabel: "Monthly Capacity",
      color: "#4A7C59"
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "98% on-time delivery rate with real-time tracking worldwide.",
      stat: "98%",
      statLabel: "On-Time Rate",
      color: "#C6A43B"
    },
    {
      icon: ShieldCheck,
      title: "Premium Quality Certified",
      description: "ISO, SGS, and Fair Trade certified products meeting global standards.",
      stat: "100%",
      statLabel: "Quality Assured",
      color: "#6B4F3A"
    }
  ];

  // Stats row - compact
  const stats = [
    { icon: Leaf, value: 100, suffix: "%", label: "Eco-Friendly", color: "#4A7C59" },
    { icon: Globe, value: 30, suffix: "+", label: "Export Countries", color: "#C6A43B" },
    { icon: Clock, value: 98, suffix: "%", label: "On-Time Delivery", color: "#4A7C59" },
    { icon: Package, value: 500, suffix: "T+", label: "Monthly Capacity", color: "#C6A43B" },
  ];

  // Animated counter effect
  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      const interval = 20;
      const steps = duration / interval;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedStats({
          eco: Math.min(Math.floor(100 * progress), 100),
          countries: Math.min(Math.floor(30 * progress), 30),
          delivery: Math.min(Math.floor(98 * progress), 98)
        });
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-gradient-to-b from-white to-[#FAF7F2]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-[#4A7C59]/10 rounded-full px-3 py-1 mb-3">
            <Zap className="w-3.5 h-3.5 text-[#C6A43B]" />
            <span className="text-[10px] font-semibold text-[#4A7C59] tracking-wider uppercase">Why Choose Us</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2C2420] mb-2 font-serif">
            Why Global Importers{' '}
            <span className="font-semibold bg-gradient-to-r from-[#4A7C59] to-[#C6A43B] bg-clip-text text-transparent">
              Trust Jute Craftify
            </span>
          </h2>
          
          <p className="text-gray-500 max-w-2xl mx-auto text-sm font-sans">
            Your end-to-end sustainable jute supply partner for bulk orders and global export
          </p>
        </motion.div>

        {/* Stats Row - Compact Banner */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            let displayValue = stat.value;
            if (stat.label === "Eco-Friendly") displayValue = animatedStats.eco;
            if (stat.label === "Export Countries") displayValue = animatedStats.countries;
            if (stat.label === "On-Time Delivery") displayValue = animatedStats.delivery;
            
            return (
              <motion.div
                key={index}
                variants={statVariants}
                whileHover={{ y: -2 }}
                className="bg-white rounded-xl p-3 text-center border border-[#F5E6D3] shadow-sm hover:shadow-md transition-all"
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <div className="text-xl md:text-2xl font-bold text-[#2C2420] font-serif">
                  {displayValue}{stat.suffix}
                </div>
                <div className="text-[10px] text-gray-500 font-sans mt-0.5">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Grid - 3x2 Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-xl p-4 border border-[#F5E6D3] hover:border-[#4A7C59]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: feature.color }} />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#2C2420] mb-1 font-serif">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-sans">
                      {feature.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-xs font-bold" style={{ color: feature.color }}>
                        {feature.stat}
                      </span>
                      <span className="text-[10px] text-gray-400">•</span>
                      <span className="text-[10px] text-gray-400">{feature.statLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Badges - Compact Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-8 pt-6 border-t border-[#F5E6D3]"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Medal className="w-4 h-4 text-[#4A7C59]" />
              <span className="text-xs text-gray-600 font-sans">ISO Certified</span>
            </div>
            
            <div className="w-px h-4 bg-[#E8D5C0]" />
            
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C6A43B]" />
              <span className="text-xs text-gray-600 font-sans">SGS Tested</span>
            </div>
            
            <div className="w-px h-4 bg-[#E8D5C0]" />
            
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#6B4F3A]" />
              <span className="text-xs text-gray-600 font-sans">Global Shipping</span>
            </div>
            
            <div className="w-px h-4 bg-[#E8D5C0]" />
            
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#4A7C59]" />
              <span className="text-xs text-gray-600 font-sans">Fair Trade</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Individual stat item animation
const statVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, type: "spring", stiffness: 150 }
  }
};