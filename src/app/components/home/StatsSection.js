'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Building2,
  Globe,
  Package,
  TrendingUp,
  Award,
  MessagesSquare
} from 'lucide-react';

export default function Testimonials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Michael Rodriguez",
      position: "Procurement Director",
      company: "EcoPack Solutions",
      country: "USA",
      flag: "🇺🇸",
      quote: "Jute Craftify has been our go-to supplier for sustainable packaging. Their product quality is exceptional and delivery is always on time.",
      rating: 5,
      product: "Jute Shopping Bags",
      orderSize: "50,000+ units/year",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Sarah Williams",
      position: "Supply Chain Manager",
      company: "GreenLife Imports",
      country: "United Kingdom",
      flag: "🇬🇧",
      quote: "The customization options and bulk order capacity from Jute Craftify are unmatched. Highly recommend for European importers.",
      rating: 5,
      product: "Jute Rugs & Mats",
      orderSize: "20,000+ units/year",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Hans Mueller",
      position: "CEO",
      company: "EcoHome Germany",
      country: "Germany",
      flag: "🇩🇪",
      quote: "Reliable partner with excellent communication. Their jute products meet all our sustainability standards.",
      rating: 5,
      product: "Home Decor Items",
      orderSize: "15,000+ units/year",
      image: "https://randomuser.me/api/portraits/men/56.jpg"
    },
    {
      id: 4,
      name: "James O'Brien",
      position: "Director of Sourcing",
      company: "GreenRetail Australia",
      country: "Australia",
      flag: "🇦🇺",
      quote: "The quality consistency across large orders is impressive. Jute Craftify is a trusted partner for our eco-friendly retail chain.",
      rating: 5,
      product: "Jute Bags & Totes",
      orderSize: "100,000+ units/year",
      image: "https://randomuser.me/api/portraits/men/78.jpg"
    },
    {
      id: 5,
      name: "Emma Laurent",
      position: "Purchasing Manager",
      company: "BioPack France",
      country: "France",
      flag: "🇫🇷",
      quote: "Professional team, premium quality, and competitive pricing. Best jute supplier we've worked with.",
      rating: 5,
      product: "Industrial Jute",
      orderSize: "30,000+ units/year",
      image: "https://randomuser.me/api/portraits/women/28.jpg"
    },
    {
      id: 6,
      name: "Luca Bianchi",
      position: "Import Manager",
      company: "EcoItalia Trading",
      country: "Italy",
      flag: "🇮🇹",
      quote: "Fast response and smooth logistics. They handle customs documentation perfectly for EU imports.",
      rating: 5,
      product: "Jute Yarn & Twine",
      orderSize: "25,000+ kg/year",
      image: "https://randomuser.me/api/portraits/men/91.jpg"
    }
  ];

  // Featured testimonials for grid
  const featuredTestimonials = testimonials.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#4A7C59]/10 rounded-full px-4 py-1.5 mb-4">
            <MessagesSquare className="w-4 h-4 text-[#4A7C59]" />
            <span className="text-xs font-semibold text-[#4A7C59] tracking-wider uppercase font-sans">Client Testimonials</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#2C2420] mb-3 font-serif">
            Trusted by{' '}
            <span className="font-bold bg-gradient-to-r from-[#4A7C59] to-[#C6A43B] bg-clip-text text-transparent">
              Global Importers
            </span>
          </h2>
          
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-sans">
            What wholesale buyers and importers say about their experience with Jute Craftify
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: Building2, label: "Happy Clients", value: "800+", color: "#4A7C59" },
            { icon: Globe, label: "Countries Served", value: "30+", color: "#C6A43B" },
            { icon: Package, label: "Orders Completed", value: "2,500+", color: "#6B4F3A" },
            { icon: TrendingUp, label: "Retention Rate", value: "95%", color: "#4A7C59" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div key={idx} variants={itemVariants} className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-xl font-bold text-[#2C2420] font-serif">{stat.value}</div>
                <div className="text-[10px] text-gray-500 font-sans">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative mb-16">
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-10">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-[#4A7C59] hover:text-white transition-all duration-300 -ml-4 md:-ml-5"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:bg-[#4A7C59] hover:text-white transition-all duration-300 -mr-4 md:-mr-5"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#E8D5C0] p-6 md:p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Left - Client Info */}
              <div className="md:w-1/3 text-center md:text-left">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full mx-auto md:mx-0 overflow-hidden border-4 border-[#C6A43B]/30 mb-4">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 md:left-4 -translate-x-1/2 md:translate-x-0 text-2xl">
                    {testimonials[activeIndex].flag}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-[#2C2420] font-serif mt-3">
                  {testimonials[activeIndex].name}
                </h3>
                <p className="text-sm text-[#C6A43B] font-medium font-sans">
                  {testimonials[activeIndex].position}
                </p>
                <p className="text-sm font-semibold text-gray-700 font-sans mt-1">
                  {testimonials[activeIndex].company}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1 mt-2">
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-500 font-sans">{testimonials[activeIndex].country}</span>
                </div>
              </div>

              {/* Right - Testimonial Content */}
              <div className="md:w-2/3">
                <Quote className="w-10 h-10 text-[#C6A43B]/30 mb-3" />
                <p className="text-gray-700 text-base md:text-lg leading-relaxed font-serif italic mb-5">
                  "{testimonials[activeIndex].quote}"
                </p>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C6A43B] text-[#C6A43B]" />
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-[#E8D5C0]">
                  <div>
                    <p className="text-[10px] text-gray-400 font-sans">Product</p>
                    <p className="text-sm font-semibold text-[#2C2420] font-sans">{testimonials[activeIndex].product}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-sans">Annual Order</p>
                    <p className="text-sm font-semibold text-[#2C2420] font-sans">{testimonials[activeIndex].orderSize}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx 
                    ? 'w-8 bg-[#4A7C59]' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Featured Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {featuredTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white border border-[#E8D5C0] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#C6A43B]/30">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 text-sm">
                    {testimonial.flag}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <h4 className="font-semibold text-[#2C2420] font-serif">{testimonial.name}</h4>
                    <div className="flex items-center gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#C6A43B] text-[#C6A43B]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#C6A43B] font-medium font-sans mb-0.5">{testimonial.position}</p>
                  <p className="text-xs text-gray-500 font-sans mb-2">{testimonial.company}, {testimonial.country}</p>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans italic">
                    "{testimonial.quote.substring(0, 100)}..."
                  </p>
                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#E8D5C0]">
                    <div className="flex items-center gap-1">
                      <Package className="w-3 h-3 text-gray-400" />
                      <span className="text-[9px] text-gray-500 font-sans">{testimonial.product}</span>
                    </div>
                    <div className="w-px h-3 bg-[#E8D5C0]" />
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-gray-400" />
                      <span className="text-[9px] text-gray-500 font-sans">{testimonial.orderSize}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-[#4A7C59]/5 rounded-full px-5 py-2">
            <Award className="w-4 h-4 text-[#4A7C59]" />
            <span className="text-xs text-gray-600 font-sans">
              Join <span className="font-semibold text-[#4A7C59]">800+ satisfied businesses</span> worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}