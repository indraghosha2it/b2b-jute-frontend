'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, ExternalLink, CheckCircle, Shield, Leaf, Globe, 
  Sparkles, Users, Truck, Loader2, Eye, X, Calendar, 
  MapPin, Hash, FileText, Clock, Verified, 
  TrendingUp, Star, Building, AlertCircle,
  Tag, BadgeCheck, Flag, Layers, Medal, Crown, Gem, Rocket, ThumbsUp,
  BarChart3, Activity, Target, Compass, ChevronLeft, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function TrustCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({
    total: 0,
    types: {},
    featured: 0,
    countries: []
  });

  const cardsPerPage = 3;

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/certifications?limit=50');
      
      if (!response.ok) throw new Error('Failed to fetch certifications');
      
      const data = await response.json();
      console.log('Fetched data:', data);
      
      if (data.success && data.data) {
        setCertifications(data.data);
        
        const typeCount = {};
        const uniqueCountries = new Set();
        let featuredCount = 0;
        
        data.data.forEach(cert => {
          typeCount[cert.type] = (typeCount[cert.type] || 0) + 1;
          if (cert.isFeatured) featuredCount++;
          if (cert.country) uniqueCountries.add(cert.country);
        });
        
        setStats({
          total: data.data.length,
          types: typeCount,
          featured: featuredCount,
          countries: Array.from(uniqueCountries)
        });
      } else {
        setError('No certifications found');
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
      setError('Unable to load certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      Quality: '#4A7C59',
      Organic: '#4A7C59',
      Ethical: '#6B4F3A',
      Environmental: '#4A7C59',
      Safety: '#6B4F3A',
      Trade: '#C6A43B',
      Sustainability: '#4A7C59',
      Other: '#A8947A'
    };
    return colors[type] || '#6B4F3A';
  };

  // Calculate pagination
  const totalPages = Math.ceil(certifications.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCertifications = certifications.slice(startIndex, endIndex);

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-[#6B4F3A]" />
            <p className="mt-3 text-gray-500 text-sm">Loading certifications...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-gray-500 text-sm">{error}</p>
            <button 
              onClick={fetchCertifications}
              className="mt-4 px-4 py-2 bg-[#6B4F3A] text-white rounded-lg text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-gray-500">No certifications found.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#FAF7F2]">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-[#4A7C59]/10 rounded-full px-3 py-1.5 mb-3">
              <Award className="w-3.5 h-3.5 text-[#4A7C59]" />
              <span className="text-[10px] font-semibold text-[#4A7C59] tracking-wider uppercase">Certifications & Compliance</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2C2420] mb-2 font-serif">
              Our Global{' '}
              <span className="font-semibold bg-gradient-to-r from-[#4A7C59] to-[#C6A43B] bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            
            <p className="text-gray-500 max-w-2xl mx-auto text-sm font-sans">
              Quality and sustainability certified by leading global authorities
            </p>
          </div>

       

          {/* Certification List with Pagination Arrows */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-[#2C2420] font-serif">All Certifications</h3>
             
            </div>
            
            {/* Cards Container with Arrows */}
            <div className="relative">
              {/* Left Arrow */}
              {totalPages > 1 && (
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white rounded-full p-2 shadow-lg border border-[#E5D5C0] transition-all duration-300 ${
                    currentPage === 1 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-[#4A7C59] hover:text-white hover:border-[#4A7C59]'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                {currentCertifications.map((cert) => (
                  <div
                    key={cert._id}
                    onClick={() => setSelectedCert(cert)}
                    className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative bg-gradient-to-br from-white via-[#F5E6D3]/20 to-[#FAF7F2] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#E5D5C0] h-full">
                      
                      <div className="h-1.5 bg-gradient-to-r from-[#4A7C59] via-[#C6A43B] to-[#6B4F3A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                      
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-white to-[#FAF7F2] rounded-xl flex items-center justify-center p-2 border border-[#E5D5C0] shadow-sm group-hover:shadow-md transition-all duration-300">
                              <img
                                src={cert.logo}
                                alt={cert.name}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cert.name)}&background=6B4F3A&color=fff&size=64`;
                                }}
                              />
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#4A7C59] rounded-full flex items-center justify-center shadow-md">
                              <CheckCircle className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          
                          <div 
                            className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-sm whitespace-nowrap"
                            style={{ 
                              background: `linear-gradient(135deg, ${getTypeColor(cert.type)}10, ${getTypeColor(cert.type)}20)`,
                              color: getTypeColor(cert.type),
                              border: `1px solid ${getTypeColor(cert.type)}20`
                            }}
                          >
                            {cert.type}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 
                            className="font-bold text-[#2C2420] text-base font-serif leading-tight truncate group-hover:text-[#4A7C59] transition-colors duration-300"
                            title={cert.name}
                          >
                            {cert.name}
                          </h4>
                          
                          <div className="flex items-center gap-2 text-gray-500">
                            <Building className="w-3.5 h-3.5 text-[#6B4F3A] flex-shrink-0" />
                            <p className="text-xs font-medium text-gray-600 truncate" title={cert.issuingAuthority}>
                              {cert.issuingAuthority}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <div className="flex items-center gap-1 px-2 py-1 bg-[#F5E6D3] rounded-lg flex-shrink-0">
                                <Award className="w-3 h-3 text-[#6B4F3A]" />
                                <span className="text-[9px] font-semibold text-[#6B4F3A] uppercase tracking-wide">
                                  {cert.badgeText || 'Certified'}
                                </span>
                              </div>
                              
                              {cert.isFeatured && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-[#C6A43B]/10 rounded-lg border border-[#C6A43B]/20 flex-shrink-0">
                                  <Star className="w-3 h-3 text-[#C6A43B]" />
                                  <span className="text-[9px] font-semibold text-[#C6A43B]">Featured</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                              <div className="flex items-center gap-1 text-[#4A7C59] text-[10px] font-semibold whitespace-nowrap">
                                <span>Details</span>
                                <Eye className="w-3 h-3" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-[#E5D5C0]">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C6A43B]"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-[#6B4F3A]"></div>
                              <span className="text-[9px] text-gray-400 ml-1">Verified Certificate</span>
                            </div>
                            <Shield className="w-3 h-3 text-gray-300 group-hover:text-[#4A7C59] transition-colors flex-shrink-0" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              {totalPages > 1 && (
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white rounded-full p-2 shadow-lg border border-[#E5D5C0] transition-all duration-300 ${
                    currentPage === totalPages 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-[#4A7C59] hover:text-white hover:border-[#4A7C59]'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Page Indicator */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentPage === index + 1
                          ? 'w-6 bg-[#4A7C59]'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 pt-6 border-t border-[#F5E6D3]">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#4A7C59]" />
                <span className="text-xs text-gray-600 font-sans">100% Verified</span>
              </div>
              
              <div className="w-px h-4 bg-[#E8D5C0]" />
              
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C6A43B]" />
                <span className="text-xs text-gray-600 font-sans">Internationally Recognized</span>
              </div>
              
              <div className="w-px h-4 bg-[#E8D5C0]" />
              
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#4A7C59]" />
                <span className="text-xs text-gray-600 font-sans">Eco-Certified</span>
              </div>
              
              <div className="w-px h-4 bg-[#E8D5C0]" />
              
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#6B4F3A]" />
                <span className="text-xs text-gray-600 font-sans">Ethical Sourcing</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <div className="bg-[#FAF7F2] rounded-xl p-4 border border-[#E5D5C0]">
              <p className="text-xs text-gray-500">
                All certifications are regularly updated and verified by independent third parties.
                <br />
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-1 text-[#6B4F3A] hover:text-[#4A7C59] transition-all duration-300 mt-2 font-medium group"
                >
                  Request certification documents 
                  <Sparkles className="w-3 h-3 transition-transform group-hover:rotate-12" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Detailed View */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="relative h-48 bg-[#FAF7F2] rounded-t-2xl overflow-hidden border-b border-[#E5D5C0]">
                <img
                  src={selectedCert.logo}
                  alt={selectedCert.name}
                  className="w-full h-full object-contain p-6"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCert.name)}&background=6B4F3A&color=fff&size=200&length=2`;
                  }}
                />
                <div className="absolute top-4 right-16 bg-gradient-to-r from-[#4A7C59] to-[#C6A43B] text-white px-3 py-1 rounded-lg shadow-md">
                  <span className="text-xs font-bold">{selectedCert.badgeText || 'Certified'}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-5">
                  <div className="inline-flex items-center gap-1.5 bg-[#FAF7F2] px-2 py-1 rounded-full mb-3 border border-[#E5D5C0]">
                    <Tag className="w-3 h-3 text-[#6B4F3A]" />
                    <span className="text-[10px] font-medium text-gray-600">{selectedCert.type}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#2C2420] mb-2 font-serif">
                    {selectedCert.name}
                  </h2>
                  <p className="text-gray-500 text-sm">{selectedCert.issuingAuthority}</p>
                </div>

                {selectedCert.description && (
                  <div className="mb-5 p-4 bg-[#FAF7F2] rounded-xl border border-[#E5D5C0]">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {selectedCert.description}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {selectedCert.issueDate && (
                    <div className="flex items-start gap-2 p-3 bg-[#FAF7F2] rounded-lg border border-[#E5D5C0]">
                      <Calendar className="w-4 h-4 text-[#4A7C59] mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Issue Date</p>
                        <p className="font-semibold text-gray-800 text-sm">{formatDate(selectedCert.issueDate)}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedCert.expiryDate && (
                    <div className="flex items-start gap-2 p-3 bg-[#FAF7F2] rounded-lg border border-[#E5D5C0]">
                      <Clock className="w-4 h-4 text-[#C6A43B] mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Expiry Date</p>
                        <p className="font-semibold text-gray-800 text-sm">{formatDate(selectedCert.expiryDate)}</p>
                      </div>
                    </div>
                  )}

                  {selectedCert.certificateNumber && (
                    <div className="flex items-start gap-2 p-3 bg-[#FAF7F2] rounded-lg border border-[#E5D5C0]">
                      <Hash className="w-4 h-4 text-[#6B4F3A] mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Certificate Number</p>
                        <p className="font-mono text-xs font-semibold text-gray-800">{selectedCert.certificateNumber}</p>
                      </div>
                    </div>
                  )}

                  {selectedCert.country && (
                    <div className="flex items-start gap-2 p-3 bg-[#FAF7F2] rounded-lg border border-[#E5D5C0]">
                      <MapPin className="w-4 h-4 text-[#4A7C59] mt-0.5" />
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Country</p>
                        <p className="font-semibold text-gray-800 text-sm">{selectedCert.country}</p>
                      </div>
                    </div>
                  )}
                </div>

                {selectedCert.verificationLink && (
                  <div className="mb-5 p-4 bg-[#4A7C59]/5 rounded-xl border border-[#4A7C59]/20">
                    <div className="flex items-start gap-2">
                      <Verified className="w-4 h-4 text-[#4A7C59] mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm mb-1">Verify Authenticity</p>
                        <a
                          href={selectedCert.verificationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#4A7C59] hover:text-[#C6A43B] text-sm font-medium transition-colors group"
                        >
                          Check certificate online
                          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {selectedCert.certificateFile && (
                  <div className="flex gap-3">
                    <a
                      href={selectedCert.certificateFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-[#6B4F3A] to-[#8B6B51] text-white px-4 py-2 rounded-lg font-medium text-sm text-center transition-all duration-300 hover:shadow-md hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Download Certificate
                    </a>
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-600 text-sm hover:bg-gray-50 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}