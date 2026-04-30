// 'use client';

// import { motion, useInView } from 'framer-motion';
// import { useRef, useState } from 'react';
// import { 
//   Trees, 
//   Factory, 
//   CheckCircle2, 
//   Package, 
//   Ship,
//   ArrowRight,
//   Leaf,
//   Truck,
//   Clock,
//   Award,
//   BarChart3
// } from 'lucide-react';

// export default function SupplyChainTimeline() {
//   const sectionRef = useRef(null);
//   const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
//   const [activeStep, setActiveStep] = useState(2);

//   const steps = [
//     {
//       id: 1,
//       title: "Sourcing",
//       subtitle: "Raw Material Procurement",
//       description: "We source premium quality raw jute fibers directly from trusted local farmers in Bangladesh, ensuring sustainable and ethical harvesting practices.",
//       icon: Trees,
//       color: "#4A7C59",
//       bgColor: "rgba(74, 124, 89, 0.1)",
//       stats: "500+ Local Farmers",
//       duration: "2-3 Days",
//       image: "https://images.unsplash.com/photo-1622398925373-1b2b2f6b1a5e?w=600&h=400&fit=crop"
//     },
//     {
//       id: 2,
//       title: "Processing",
//       subtitle: "Manufacturing & Production",
//       description: "State-of-the-art machinery processes raw jute into high-quality yarn, fabric, and finished products with precision and care.",
//       icon: Factory,
//       color: "#C6A43B",
//       bgColor: "rgba(198, 164, 59, 0.1)",
//       stats: "50K+ Sq. Ft. Facility",
//       duration: "5-7 Days",
//       image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop"
//     },
//     {
//       id: 3,
//       title: "Quality Check",
//       subtitle: "Inspection & Testing",
//       description: "Multi-stage quality control process including strength testing, color consistency, and durability checks by certified professionals.",
//       icon: CheckCircle2,
//       color: "#4A7C59",
//       bgColor: "rgba(74, 124, 89, 0.1)",
//       stats: "100% Inspected",
//       duration: "1 Day",
//       image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop"
//     },
//     {
//       id: 4,
//       title: "Packaging",
//       subtitle: "Secure & Eco-Friendly",
//       description: "Eco-friendly packaging solutions that protect products during transit while maintaining our sustainability commitment.",
//       icon: Package,
//       color: "#C6A43B",
//       bgColor: "rgba(198, 164, 59, 0.1)",
//       stats: "Biodegradable Packaging",
//       duration: "1-2 Days",
//       image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop"
//     },
//     {
//       id: 5,
//       title: "Shipping",
//       subtitle: "Global Logistics",
//       description: "Reliable sea and air freight options with real-time tracking, customs clearance support, and worldwide delivery network.",
//       icon: Ship,
//       color: "#6B4F3A",
//       bgColor: "rgba(107, 79, 58, 0.1)",
//       stats: "30+ Countries",
//       duration: "15-25 Days",
//       image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop"
//     }
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.15, delayChildren: 0.2 }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -30 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
//   };

//   return (
//     <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-[#FAF7F2] to-white overflow-hidden">
//       <div className="container mx-auto px-4 max-w-7xl">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-12 md:mb-16"
//         >
//           <div className="inline-flex items-center gap-2 bg-[#4A7C59]/10 rounded-full px-4 py-1.5 mb-4">
//             <BarChart3 className="w-4 h-4 text-[#4A7C59]" />
//             <span className="text-xs font-semibold text-[#4A7C59] tracking-wider uppercase font-sans">Our Process</span>
//           </div>
          
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2420] mb-3 font-serif">
//             Manufacturing &{' '}
//             <span className="font-semibold bg-gradient-to-r from-[#4A7C59] to-[#C6A43B] bg-clip-text text-transparent">
//               Supply Chain
//             </span>
//           </h2>
          
//           <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-sans">
//             From raw jute fields to your doorstep — complete transparency in every step
//           </p>
//         </motion.div>

//         {/* Desktop Timeline - Horizontal Scrolling */}
//         <div className="hidden lg:block relative">
//           <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A7C59] via-[#C6A43B] to-[#6B4F3A] -translate-y-1/2 rounded-full" />
          
//           <div className="relative flex justify-between">
//             {steps.map((step, idx) => {
//               const Icon = step.icon;
//               const isActive = activeStep === idx;
              
//               return (
//                 <motion.div
//                   key={step.id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={isInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ delay: idx * 0.1, duration: 0.5 }}
//                   className="relative flex flex-col items-center cursor-pointer group"
//                   onMouseEnter={() => setActiveStep(idx)}
//                 >
//                   {/* Icon Circle */}
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     className={`
//                       relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-4
//                       transition-all duration-300 shadow-lg
//                       ${isActive ? 'scale-110' : 'scale-100'}
//                     `}
//                     style={{
//                       backgroundColor: step.color,
//                       boxShadow: isActive ? `0 0 0 4px ${step.color}20, 0 0 0 8px ${step.color}10` : 'none'
//                     }}
//                   >
//                     <Icon className="w-7 h-7 text-white" />
//                   </motion.div>
                  
//                   {/* Title */}
//                   <h3 className={`text-base font-semibold transition-all duration-300 font-serif ${isActive ? 'text-[#2C2420] scale-105' : 'text-gray-500'}`}>
//                     {step.title}
//                   </h3>
//                   <p className="text-[10px] text-gray-400 font-sans mt-0.5">{step.subtitle}</p>
                  
//                   {/* Connecting Line Animation */}
//                   {idx < steps.length - 1 && (
//                     <motion.div 
//                       className="absolute top-8 left-1/2 w-full h-0.5"
//                       initial={{ scaleX: 0 }}
//                       animate={{ scaleX: isActive ? 1 : 0 }}
//                       transition={{ duration: 0.5 }}
//                       style={{ backgroundColor: step.color, transformOrigin: 'left' }}
//                     />
//                   )}
//                 </motion.div>
//               );
//             })}
//           </div>

//           {/* Active Step Details Card */}
//           <motion.div
//             key={activeStep}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="mt-12 bg-white rounded-2xl border border-[#E8D5C0] overflow-hidden shadow-lg"
//           >
//             <div className="grid md:grid-cols-2 gap-0">
//               {/* Image Side */}
//               <div className="h-64 md:h-auto relative overflow-hidden">
//                 <img
//                   src={steps[activeStep].image}
//                   alt={steps[activeStep].title}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
//               </div>
              
//               {/* Content Side */}
//               <div className="p-6 md:p-8">
//                 <div className="flex items-center gap-2 mb-3">
//                   <div 
//                     className="w-10 h-10 rounded-lg flex items-center justify-center"
//                     style={{ backgroundColor: steps[activeStep].bgColor }}
//                   >
//                     {(() => {
//                       const Icon = steps[activeStep].icon;
//                       return <Icon className="w-5 h-5" style={{ color: steps[activeStep].color }} />;
//                     })()}
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-[#2C2420] font-serif">{steps[activeStep].title}</h3>
//                     <p className="text-xs text-gray-500 font-sans">{steps[activeStep].subtitle}</p>
//                   </div>
//                 </div>
                
//                 <p className="text-gray-600 text-sm leading-relaxed mb-5 font-sans">
//                   {steps[activeStep].description}
//                 </p>
                
//                 <div className="flex gap-4 pt-3 border-t border-[#E8D5C0]">
//                   <div>
//                     <div className="flex items-center gap-1 mb-1">
//                       <Clock className="w-3.5 h-3.5 text-[#C6A43B]" />
//                       <span className="text-[10px] text-gray-500 font-sans">Lead Time</span>
//                     </div>
//                     <div className="text-sm font-semibold text-[#2C2420] font-sans">{steps[activeStep].duration}</div>
//                   </div>
//                   <div className="w-px h-10 bg-[#E8D5C0]" />
//                   <div>
//                     <div className="flex items-center gap-1 mb-1">
//                       <Award className="w-3.5 h-3.5 text-[#4A7C59]" />
//                       <span className="text-[10px] text-gray-500 font-sans">Capacity</span>
//                     </div>
//                     <div className="text-sm font-semibold text-[#2C2420] font-sans">{steps[activeStep].stats}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Mobile/Tablet Timeline - Vertical Cards */}
//         <div className="lg:hidden space-y-4">
//           {steps.map((step, idx) => {
//             const Icon = step.icon;
//             return (
//               <motion.div
//                 key={step.id}
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={isInView ? { opacity: 1, x: 0 } : {}}
//                 transition={{ delay: idx * 0.1, duration: 0.4 }}
//                 className="bg-white rounded-xl border border-[#E8D5C0] p-4 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-start gap-3">
//                   <div 
//                     className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
//                     style={{ backgroundColor: step.bgColor }}
//                   >
//                     <Icon className="w-6 h-6" style={{ color: step.color }} />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between mb-1">
//                       <h3 className="font-semibold text-[#2C2420] font-serif">{step.title}</h3>
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-3 h-3 text-gray-400" />
//                         <span className="text-[9px] text-gray-400 font-sans">{step.duration}</span>
//                       </div>
//                     </div>
//                     <p className="text-xs text-gray-500 leading-relaxed font-sans">{step.description}</p>
//                     <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#E8D5C0]">
//                       <div className="flex items-center gap-1">
//                         <Leaf className="w-3 h-3 text-[#4A7C59]" />
//                         <span className="text-[9px] text-gray-500 font-sans">{step.stats}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Stats Footer */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.6, duration: 0.5 }}
//           className="mt-12 pt-8 border-t border-[#E8D5C0] grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
//         >
//           <div>
//             <div className="text-2xl font-bold text-[#4A7C59] font-serif">500+</div>
//             <div className="text-[10px] text-gray-500 font-sans">Local Farmers</div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-[#C6A43B] font-serif">50K+</div>
//             <div className="text-[10px] text-gray-500 font-sans">Sq. Ft. Factory</div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-[#6B4F3A] font-serif">100%</div>
//             <div className="text-[10px] text-gray-500 font-sans">Quality Checked</div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-[#4A7C59] font-serif">30+</div>
//             <div className="text-[10px] text-gray-500 font-sans">Export Countries</div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Trees, 
  Factory, 
  CheckCircle2, 
  Package, 
  Ship,
  Leaf,
  Clock,
  Award,
  BarChart3,
  MapPin,
  Globe
} from 'lucide-react';

export default function SupplyChainTimeline() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      id: 1,
      title: "Sourcing",
      subtitle: "Raw Material Procurement",
      description: "We source premium quality raw jute fibers directly from trusted local farmers in Bangladesh, ensuring sustainable and ethical harvesting practices.",
      longDescription: "Partnering with over 500 local farmers across the jute-growing regions of Bangladesh to source the finest quality raw fibers. Our direct farm partnerships ensure fair trade practices and premium grade raw materials.",
      icon: Trees,
      color: "#4A7C59",
      bgColor: "rgba(74, 124, 89, 0.1)",
      stats: "500+ Local Farmers",
      duration: "2-3 Days",
      image: "https://i.ibb.co.com/77z95Qn/dibakar-roy-maat-U3u-QCIk-unsplash.jpg"
    },
    {
      id: 2,
      title: "Processing",
      subtitle: "Manufacturing & Production",
      description: "State-of-the-art machinery processes raw jute into high-quality yarn, fabric, and finished products with precision and care.",
      longDescription: "Our 50,000+ sq. ft. facility houses modern machinery for spinning, weaving, and converting jute into premium products. Advanced technology ensures consistent quality and high production capacity.",
      icon: Factory,
      color: "#C6A43B",
      bgColor: "rgba(198, 164, 59, 0.1)",
      stats: "50K+ Sq. Ft. Facility",
      duration: "5-7 Days",
      image: "https://i.ibb.co.com/rGbfjdsm/Captu.png"
    },
    {
      id: 3,
      title: "Quality Check",
      subtitle: "Inspection & Testing",
      description: "Multi-stage quality control process including strength testing, color consistency, and durability checks by certified professionals.",
      longDescription: "Every product undergoes rigorous testing at multiple checkpoints to ensure international quality standards. Our QA team conducts tensile strength, color fastness, and durability tests.",
      icon: CheckCircle2,
      color: "#4A7C59",
      bgColor: "rgba(74, 124, 89, 0.1)",
      stats: "100% Inspected",
      duration: "1 Day",
      image: "https://i.ibb.co.com/HDYbZJYd/Ca.png"
    },
    {
      id: 4,
      title: "Packaging",
      subtitle: "Secure & Eco-Friendly",
      description: "Eco-friendly packaging solutions that protect products during transit while maintaining our sustainability commitment.",
      longDescription: "Biodegradable and recyclable packaging materials that ensure product safety and environmental responsibility. Custom branding options available for bulk orders.",
      icon: Package,
      color: "#C6A43B",
      bgColor: "rgba(198, 164, 59, 0.1)",
      stats: "Biodegradable",
      duration: "1-2 Days",
      image: "https://i.ibb.co.com/6c8Cx7Dj/Cae.png"
    },
    {
      id: 5,
      title: "Shipping",
      subtitle: "Global Logistics",
      description: "Reliable sea and air freight options with real-time tracking, customs clearance support, and worldwide delivery network.",
      longDescription: "Seamless logistics covering 30+ countries with dedicated support for customs documentation and tracking. Both sea freight (LCL/FCL) and air freight options available.",
      icon: Ship,
      color: "#6B4F3A",
      bgColor: "rgba(107, 79, 58, 0.1)",
      stats: "30+ Countries",
      duration: "15-25 Days",
      image: "https://i.ibb.co.com/8DfwLRy1/Call.png"
    }
  ];

  return (
    <section ref={sectionRef} className="py-6 md:py-10 lg:py-12 bg-gradient-to-b from-white via-[#FAF7F2] to-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#4A7C59]/10 rounded-full px-4 py-1.5 mb-4">
            <BarChart3 className="w-4 h-4 text-[#4A7C59]" />
            <span className="text-xs font-semibold text-[#4A7C59] tracking-wider uppercase font-sans">Our Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2420] mb-3 font-serif">
            Manufacturing &{' '}
            <span className="font-semibold bg-gradient-to-r from-[#4A7C59] to-[#C6A43B] bg-clip-text text-transparent">
              Supply Chain
            </span>
          </h2>
          
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-sans">
            From raw jute fields to your doorstep — complete transparency in every step
          </p>
        </motion.div>

        {/* Desktop Timeline - Horizontal Steps */}
        <div className="hidden lg:block relative px-4">
          {/* Connection Line */}
          <div className="absolute top-[30px] left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A7C59] via-[#C6A43B] to-[#6B4F3A] rounded-full" />
          
          <div className="relative flex justify-between">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="relative flex flex-col items-center cursor-pointer group"
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  {/* Icon Circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`
                      relative z-10 w-[60px] h-[60px] rounded-full flex items-center justify-center mb-3
                      transition-all duration-300 shadow-lg
                      ${isActive ? 'scale-110' : 'scale-100'}
                    `}
                    style={{
                      backgroundColor: step.color,
                      boxShadow: isActive ? `0 0 0 4px ${step.color}20, 0 0 0 8px ${step.color}10` : 'none'
                    }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className={`text-sm font-semibold transition-all duration-300 font-serif ${isActive ? 'text-[#2C2420]' : 'text-gray-500'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[9px] text-gray-400 font-sans mt-0.5 text-center">{step.subtitle}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Active Step Details Card - Image on Left */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-10 bg-white rounded-2xl border border-[#E8D5C0] overflow-hidden shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side - Left */}
              <div className="relative h-64 md:h-[320px] overflow-hidden">
                <img
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                
                {/* Floating Badge */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-[#4A7C59]" />
                    <span className="text-[10px] font-semibold text-[#4A7C59] uppercase font-sans">100% Eco-Friendly</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Content Side - Right */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: steps[activeStep].bgColor }}
                  >
                    {(() => {
                      const Icon = steps[activeStep].icon;
                      return <Icon className="w-6 h-6" style={{ color: steps[activeStep].color }} />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#2C2420] font-serif">{steps[activeStep].title}</h3>
                    <p className="text-xs text-gray-500 font-sans">{steps[activeStep].subtitle}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-5 font-sans">
                  {steps[activeStep].longDescription}
                </p>
                
                <div className="flex flex-wrap gap-5 pt-4 border-t border-[#E8D5C0]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#4A7C59]/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[#4A7C59]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-sans">Lead Time</p>
                      <p className="text-sm font-semibold text-[#2C2420] font-sans">{steps[activeStep].duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#C6A43B]/10 flex items-center justify-center">
                      <Award className="w-4 h-4 text-[#C6A43B]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-sans">Capacity</p>
                      <p className="text-sm font-semibold text-[#2C2420] font-sans">{steps[activeStep].stats}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#6B4F3A]/10 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-[#6B4F3A]" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-sans">Export</p>
                      <p className="text-sm font-semibold text-[#2C2420] font-sans">Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile/Tablet Timeline - Vertical Cards */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white rounded-xl border border-[#E8D5C0] overflow-hidden shadow-sm"
              >
                <div className="h-32 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: step.bgColor }}
                    >
                      <Icon className="w-5 h-5" style={{ color: step.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C2420] font-serif">{step.title}</h3>
                      <p className="text-[9px] text-gray-500 font-sans">{step.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans mb-3">
                    {step.description}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-[#E8D5C0]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-[9px] text-gray-500 font-sans">{step.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-[#4A7C59]" />
                      <span className="text-[9px] text-gray-500 font-sans">{step.stats}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

    

        {/* Global Reach Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 pt-4 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-[#4A7C59]/5 rounded-full px-5 py-2">
            <MapPin className="w-4 h-4 text-[#4A7C59]" />
            <span className="text-xs text-gray-600 font-sans">
              From Bangladesh farms to <span className="font-semibold text-[#4A7C59]">30+ countries</span> worldwide
            </span>
            <Ship className="w-4 h-4 text-[#C6A43B]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}