// // app/productDetails/MetadataUpdater.jsx
// 'use client';

// import { useEffect } from 'react';

// export default function MetadataUpdater({ product }) {
//   useEffect(() => {
//     if (!product) return;
    
//     const updateMetadata = () => {
//       try {
//         // Get SEO data from product metaSettings or generate fallback
//         const metaTitle = product.metaSettings?.metaTitle || `${product.productName} - Asian Clothify`;
//         const metaDescription = product.metaSettings?.metaDescription || 
//           `Shop ${product.productName}. ${product.fabric || 'Premium quality'} clothing. MOQ: ${product.moq} pieces.`;
        
//         const metaKeywords = product.metaSettings?.metaKeywords || [
//           product.productName,
//           product.category?.name,
//           product.fabric,
//           'clothing',
//           'fashion'
//         ].filter(Boolean);
        
//         // Get primary image
//         const primaryImage = product.images?.find(img => img.isPrimary)?.url || 
//                              product.images?.[0]?.url || 
//                              '/product-default-og.jpg';
        
//         // Update document title
//         document.title = metaTitle;
        
//         // Helper function to update or create meta tags
//         const updateOrCreateMetaTag = (name, content, isProperty = false) => {
//           if (!content) return;
          
//           let meta;
//           if (isProperty) {
//             meta = document.querySelector(`meta[property="${name}"]`);
//           } else {
//             meta = document.querySelector(`meta[name="${name}"]`);
//           }
          
//           if (meta) {
//             meta.setAttribute('content', content);
//           } else {
//             meta = document.createElement('meta');
//             if (isProperty) {
//               meta.setAttribute('property', name);
//             } else {
//               meta.setAttribute('name', name);
//             }
//             meta.setAttribute('content', content);
//             document.head.appendChild(meta);
//           }
//         };
        
//         // Update basic meta tags
//         updateOrCreateMetaTag('description', metaDescription);
//         updateOrCreateMetaTag('keywords', metaKeywords.join(', '));
        
//         // Open Graph tags
//         updateOrCreateMetaTag('og:title', metaTitle, true);
//         updateOrCreateMetaTag('og:description', metaDescription, true);
//         updateOrCreateMetaTag('og:url', `https://asianclothify.com/productDetails?id=${product._id}`, true);
//         updateOrCreateMetaTag('og:image', primaryImage, true);
//         updateOrCreateMetaTag('og:type', 'product', true);
        
//         // Twitter tags
//         updateOrCreateMetaTag('twitter:title', metaTitle);
//         updateOrCreateMetaTag('twitter:description', metaDescription);
//         updateOrCreateMetaTag('twitter:image', primaryImage);
        
//         // Canonical link
//         let canonical = document.querySelector('link[rel="canonical"]');
//         if (canonical) {
//           canonical.setAttribute('href', `https://asianclothify.com/productDetails?id=${product._id}`);
//         } else {
//           canonical = document.createElement('link');
//           canonical.setAttribute('rel', 'canonical');
//           canonical.setAttribute('href', `https://asianclothify.com/productDetails?id=${product._id}`);
//           document.head.appendChild(canonical);
//         }
        
//         // Remove existing JSON-LD if any
//         const existingJsonLd = document.querySelector('#product-json-ld');
//         if (existingJsonLd) {
//           existingJsonLd.remove();
//         }
        
//         // Add JSON-LD structured data for better SEO
//         const jsonLd = {
//           "@context": "https://schema.org",
//           "@type": "Product",
//           "name": product.productName,
//           "description": metaDescription,
//           "image": primaryImage,
//           "sku": product._id,
//           "brand": {
//             "@type": "Brand",
//             "name": "Asian Clothify"
//           },
//           "offers": {
//             "@type": "Offer",
//             "price": product.pricePerUnit,
//             "priceCurrency": "USD",
//             "availability": product.isActive !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
//             "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
//           },
//           "additionalProperty": [
//             {
//               "@type": "PropertyValue",
//               "name": "MOQ",
//               "value": product.moq
//             },
//             {
//               "@type": "PropertyValue",
//               "name": "Fabric",
//               "value": product.fabric || "Premium Quality"
//             },
//             {
//               "@type": "PropertyValue",
//               "name": "Target Audience",
//               "value": product.targetedCustomer || "Unisex"
//             }
//           ]
//         };
        
//         // Add sizes if available
//         if (product.sizes && product.sizes.length > 0) {
//           jsonLd.size = product.sizes.filter(s => s.trim());
//         }
        
//         // Add colors if available
//         if (product.colors && product.colors.length > 0) {
//           jsonLd.color = product.colors.map(c => c.code);
//         }
        
//         // Add reviews if available
//         if (product.reviewStats && product.reviewStats.totalReviews > 0) {
//           jsonLd.aggregateRating = {
//             "@type": "AggregateRating",
//             "ratingValue": product.reviewStats.averageRating,
//             "reviewCount": product.reviewStats.totalReviews
//           };
//         }
        
//         // Add price spec
//         if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
//           jsonLd.offers = product.quantityBasedPricing.map(tier => ({
//             "@type": "Offer",
//             "price": tier.price,
//             "priceCurrency": "USD",
//             "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
//             "eligibleQuantity": {
//               "@type": "QuantitativeValue",
//               "value": tier.range,
//               "unitText": "Pieces"
//             }
//           }));
//         }
        
//         // Add the JSON-LD script to head
//         const script = document.createElement('script');
//         script.id = 'product-json-ld';
//         script.type = 'application/ld+json';
//         script.textContent = JSON.stringify(jsonLd);
//         document.head.appendChild(script);
        
//         console.log('Metadata updated for product:', product.productName);
//         console.log('JSON-LD added for product:', product.productName);
        
//       } catch (error) {
//         console.error('Error updating metadata:', error);
//       }
//     };
    
//     updateMetadata();
//   }, [product]);
  
//   return null;
// }

// app/productDetails/MetadataUpdater.jsx
'use client';

import { useEffect } from 'react';

export default function MetadataUpdater({ product }) {
  useEffect(() => {
    if (!product) return;
    
    const updateMetadata = () => {
      try {
        // Get SEO data from product metaSettings or generate fallback for Jute Craftify
        const metaTitle = product.metaSettings?.metaTitle || 
          `${product.productName} - Premium Jute Product | Jute Craftify`;
        
        const metaDescription = product.metaSettings?.metaDescription || 
          `${product.productName} - Premium quality jute product from Bangladesh. ${product.description?.substring(0, 150) || 'Eco-friendly, sustainable, and perfect for bulk orders.'} MOQ: ${product.moq || 'Contact us'} units. Wholesale pricing available.`;
        
        const metaKeywords = product.metaSettings?.metaKeywords || [
          product.productName,
          product.category?.name,
          'jute products',
          'eco-friendly',
          'sustainable',
          'bulk jute order',
          'wholesale jute',
          'Bangladesh jute',
          ...(product.tags || [])
        ].filter(Boolean);
        
        // Get primary image
        const primaryImage = product.images?.find(img => img.isPrimary)?.url || 
                             product.images?.[0]?.url || 
                             '/product-default-og.jpg';
        
        // Update document title
        document.title = metaTitle;
        
        // Helper function to update or create meta tags
        const updateOrCreateMetaTag = (name, content, isProperty = false) => {
          if (!content) return;
          
          let meta;
          if (isProperty) {
            meta = document.querySelector(`meta[property="${name}"]`);
          } else {
            meta = document.querySelector(`meta[name="${name}"]`);
          }
          
          if (meta) {
            meta.setAttribute('content', content);
          } else {
            meta = document.createElement('meta');
            if (isProperty) {
              meta.setAttribute('property', name);
            } else {
              meta.setAttribute('name', name);
            }
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
          }
        };
        
        // Update basic meta tags
        updateOrCreateMetaTag('description', metaDescription);
        updateOrCreateMetaTag('keywords', metaKeywords.join(', '));
        
        // Open Graph tags
        updateOrCreateMetaTag('og:title', metaTitle, true);
        updateOrCreateMetaTag('og:description', metaDescription, true);
        updateOrCreateMetaTag('og:url', `https://jutecraftify.com/productDetails?id=${product._id}`, true);
        updateOrCreateMetaTag('og:image', primaryImage, true);
        updateOrCreateMetaTag('og:type', 'product', true);
        updateOrCreateMetaTag('og:site_name', 'Jute Craftify', true);
        updateOrCreateMetaTag('og:availability', product.isActive !== false ? 'in stock' : 'out of stock', true);
        
        // Twitter tags
        updateOrCreateMetaTag('twitter:title', metaTitle);
        updateOrCreateMetaTag('twitter:description', metaDescription);
        updateOrCreateMetaTag('twitter:image', primaryImage);
        updateOrCreateMetaTag('twitter:card', 'summary_large_image');
        updateOrCreateMetaTag('twitter:site', '@JuteCraftify');
        
        // Canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
          canonical.setAttribute('href', `https://jutecraftify.com/productDetails?id=${product._id}`);
        } else {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          canonical.setAttribute('href', `https://jutecraftify.com/productDetails?id=${product._id}`);
          document.head.appendChild(canonical);
        }
        
        // Remove existing JSON-LD if any
        const existingJsonLd = document.querySelector('#product-json-ld');
        if (existingJsonLd) {
          existingJsonLd.remove();
        }
        
        // Add JSON-LD structured data for better SEO - Jute Craftify specific
        const jsonLd = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.productName,
          "description": metaDescription,
          "image": primaryImage,
          "sku": product._id,
          "mpn": product.sku || product._id,
          "brand": {
            "@type": "Brand",
            "name": "Jute Craftify",
            "logo": "https://jutecraftify.com/logo.png"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "Jute Craftify",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BD",
              "addressLocality": "Dhaka",
              "addressRegion": "Dhaka"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": product.pricePerUnit || "Contact for pricing",
            "priceCurrency": "USD",
            "availability": product.isActive !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "availabilityStarts": new Date().toISOString().split('T')[0],
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "WW"
              }
            }
          },
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "MOQ (Minimum Order Quantity)",
              "value": product.moq || "Contact for details",
              "unitText": "Units"
            },
            {
              "@type": "PropertyValue",
              "name": "Material",
              "value": product.material || "Premium Jute Fiber"
            },
            {
              "@type": "PropertyValue",
              "name": "Origin",
              "value": "Bangladesh"
            },
            {
              "@type": "PropertyValue",
              "name": "Sustainability",
              "value": "100% Biodegradable & Eco-Friendly"
            },
            {
              "@type": "PropertyValue",
              "name": "Customization Available",
              "value": product.customizationAvailable !== false ? "Yes" : "No"
            }
          ]
        };
        
        // Add material specific info
        if (product.materialType) {
          jsonLd.material = product.materialType;
        }
        
        // Add dimensions if available
        if (product.dimensions) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Dimensions",
            "value": product.dimensions
          });
        }
        
        // Add weight if available
        if (product.weight) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Weight",
            "value": product.weight,
            "unitText": product.weightUnit || "kg"
          });
        }
        
        // Add color options if available
        if (product.colors && product.colors.length > 0) {
          jsonLd.color = product.colors.map(c => typeof c === 'string' ? c : c.name || c.code);
        }
        
        // Add sizes if available
        if (product.sizes && product.sizes.length > 0) {
          jsonLd.size = product.sizes.filter(s => s.trim());
        }
        
        // Add reviews if available
        if (product.reviewStats && product.reviewStats.totalReviews > 0) {
          jsonLd.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": product.reviewStats.averageRating,
            "reviewCount": product.reviewStats.totalReviews
          };
        }
        
        // Add quantity-based pricing if available
        if (product.quantityBasedPricing && product.quantityBasedPricing.length > 0) {
          jsonLd.offers = product.quantityBasedPricing.map(tier => ({
            "@type": "Offer",
            "price": tier.price,
            "priceCurrency": "USD",
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "eligibleQuantity": {
              "@type": "QuantitativeValue",
              "value": tier.range,
              "unitText": tier.unit || "Pieces"
            },
            "availability": tier.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability"
          }));
        }
        
        // Add lead time information
        if (product.productionLeadTime) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Production Lead Time",
            "value": product.productionLeadTime
          });
        }
        
        // Add certificate information if available
        if (product.certifications && product.certifications.length > 0) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Certifications",
            "value": product.certifications.join(', ')
          });
        }
        
        // Add export information
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Export Capability",
          "value": "Worldwide shipping available"
        });
        
        // Add the JSON-LD script to head
        const script = document.createElement('script');
        script.id = 'product-json-ld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
        
        // Add manufacturer JSON-LD if not present
        const existingManufacturerJsonLd = document.querySelector('#manufacturer-json-ld');
        if (!existingManufacturerJsonLd) {
          const manufacturerJsonLd = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Jute Craftify",
            "url": "https://jutecraftify.com",
            "logo": "https://jutecraftify.com/logo.png",
            "description": "Premium jute products supplier from Bangladesh. Eco-friendly, sustainable, handcrafted jute products for global B2B buyers.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BD",
              "addressLocality": "Dhaka",
              "addressRegion": "Dhaka",
              "postalCode": "1212"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Sales",
              "email": "info@jutecraftify.com",
              "availableLanguage": ["English", "Bengali"]
            },
            "sameAs": [
              "https://www.facebook.com/JuteCraftify"
            ]
          };
          
          const manufacturerScript = document.createElement('script');
          manufacturerScript.id = 'manufacturer-json-ld';
          manufacturerScript.type = 'application/ld+json';
          manufacturerScript.textContent = JSON.stringify(manufacturerJsonLd);
          document.head.appendChild(manufacturerScript);
        }
        
        console.log('Metadata updated for jute product:', product.productName);
        console.log('JSON-LD added for product:', product.productName);
        
      } catch (error) {
        console.error('Error updating metadata:', error);
      }
    };
    
    updateMetadata();
  }, [product]);
  
  return null;
}