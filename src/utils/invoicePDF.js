

// import jsPDF from 'jspdf';

// // Helper function to format currency
// const formatPrice = (price) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2
//   }).format(price || 0);
// };

// // Helper function to get unit label
// const getUnitLabel = (orderUnit) => {
//   switch(orderUnit) {
//     case 'kg': return 'kg';
//     case 'ton': return 'MT';
//     default: return 'pcs';
//   }
// };

// // Helper function to format date
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });
// };

// // Helper function to convert image to base64
// const imageToBase64 = async (imageUrl) => {
//   try {
//     if (imageUrl?.startsWith('data:image')) {
//       return imageUrl;
//     }
//     if (!imageUrl) return null;
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (error) {
//     console.error('Error converting image to base64:', error);
//     return null;
//   }
// };

// // Get company initials for logo fallback
// const getCompanyInitials = (companyName) => {
//   if (!companyName) return 'AC';
//   return companyName
//     .split(' ')
//     .map(word => word[0])
//     .join('')
//     .toUpperCase()
//     .substring(0, 2);
// };

// // Function to draw a color circle
// const drawColorCircle = (doc, x, y, radius, colorCode) => {
//   doc.setFillColor(colorCode);
//   doc.circle(x, y, radius, 'F');
//   doc.setDrawColor(100, 100, 100);
//   doc.setLineWidth(0.1);
//   doc.circle(x, y, radius, 'S');
// };

// // Jute Theme Colors
// const COLORS = {
//   primary: '#6B4F3A',      // Earthy Brown
//   secondary: '#F5E6D3',    // Natural Beige
//   accent: '#3A7D44',       // Green
//   neutral: '#FFFFFF',      // White
//   lightGray: '#F9F9F9',
//   border: '#E5E5E5',
//   text: '#333333',
//   textLight: '#666666',
//   paid: '#3A7D44',         // Green for paid
//   unpaid: '#CD5C5C',       // Muted red for unpaid
//   partial: '#E6A017'       // Golden for partial
// };

// export const generateInvoicePDF = async (invoice) => {
//   try {
//     const doc = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 15;
//     const contentWidth = pageWidth - (2 * margin);
//     let yPos = margin;

//     // Load company logo
//     let companyLogoBase64 = null;
//     if (invoice.company?.logo) {
//       try {
//         companyLogoBase64 = await imageToBase64(invoice.company.logo);
//       } catch (error) {
//         console.error('Failed to load company logo:', error);
//       }
//     }

//     // ==================== HEADER ====================
//     // Top header bar with Primary color
//     doc.setFillColor(COLORS.primary);
//     doc.rect(0, 0, pageWidth, 32, 'F');
    
//     // White rounded rectangle for header content
//     doc.setFillColor(COLORS.neutral);
//     doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'F');

//     // Logo section
//     const logoSize = 16;
//     const logoMaxWidth = 20;
//     const logoMaxHeight = 16;
//     const logoX = margin + 5;
//     const logoY = yPos + 5;

//     if (companyLogoBase64) {
//       try {
//         // Get image dimensions
//         const img = new Image();
//         img.src = companyLogoBase64;
        
//         await new Promise((resolve) => {
//           img.onload = resolve;
//         });
        
//         let imgWidth = img.width;
//         let imgHeight = img.height;
//         let finalWidth = logoSize;
//         let finalHeight = logoSize;
        
//         const aspectRatio = imgWidth / imgHeight;
        
//         if (aspectRatio > 1) {
//           finalWidth = logoSize;
//           finalHeight = logoSize / aspectRatio;
//         } else {
//           finalHeight = logoSize;
//           finalWidth = logoSize * aspectRatio;
//         }
        
//         if (finalWidth > logoMaxWidth) {
//           finalWidth = logoMaxWidth;
//           finalHeight = finalWidth / aspectRatio;
//         }
//         if (finalHeight > logoMaxHeight) {
//           finalHeight = logoMaxHeight;
//           finalWidth = finalHeight * aspectRatio;
//         }
        
//         const offsetX = (logoSize - finalWidth) / 2;
//         const offsetY = (logoSize - finalHeight) / 2;
        
//         doc.addImage(companyLogoBase64, 'PNG', logoX + offsetX, logoY + offsetY, finalWidth, finalHeight);
//       } catch (error) {
//         const companyName = invoice.company?.companyName || 'Asian Clothify';
//         const initials = getCompanyInitials(companyName);
//         doc.setFillColor(COLORS.primary);
//         doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
//         doc.setFontSize(9);
//         doc.setFont('helvetica', 'bold');
//         doc.setTextColor(COLORS.neutral);
//         doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
//       }
//     } else {
//       const companyName = invoice.company?.companyName || 'Asian Clothify';
//       const initials = getCompanyInitials(companyName);
//       doc.setFillColor(COLORS.primary);
//       doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
//       doc.setFontSize(9);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.neutral);
//       doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
//     }

//     // Company Info
//     const companyX = logoX + logoSize + 8;
    
//     doc.setFontSize(12);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.text);
//     doc.text(invoice.company?.companyName || 'Asian Clothify', companyX, logoY + 5);

//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textLight);
//     if (invoice.company?.contactPerson) {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Contact: ', companyX, logoY + 10);
//       const contactLabelWidth = doc.getTextWidth('Contact: ');
//       doc.setFont('helvetica', 'normal');
//       doc.text(invoice.company.contactPerson, companyX + contactLabelWidth, logoY + 10);
//     } else {
//       doc.setFont('helvetica', 'bold');
//       doc.text('Contact: ', companyX, logoY + 10);
//       doc.setFont('helvetica', 'normal');
//       doc.text('N/A', companyX + doc.getTextWidth('Contact: '), logoY + 10);
//     }

//     doc.setFontSize(6.5);
//     const emailPhone = `${invoice.company?.email || 'info@asianclothify.com'} | ${invoice.company?.phone || '+8801305-785685'}`;
//     doc.text(emailPhone, companyX, logoY + 14);

//     if (invoice.company?.address) {
//       doc.setFontSize(6);
//       const addressLines = doc.splitTextToSize(invoice.company.address, 70);
//       doc.text(addressLines, companyX, logoY + 18);
//     }

//     // Invoice Number and Details
//     const rightAlignX = pageWidth - margin - 5;
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     const invoiceNoText = `INVOICE NO: `;
//     doc.text(invoiceNoText, rightAlignX - doc.getTextWidth(invoiceNoText + (invoice.invoiceNumber || '')), yPos + 8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.text);
//     doc.text(invoice.invoiceNumber || '', rightAlignX, yPos + 8, { align: 'right' });

//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textLight);
    
//     const invoiceDate = formatDate(invoice.invoiceDate);
//     const dueDate = formatDate(invoice.dueDate);
//     const status = invoice.paymentStatus?.toUpperCase() || 'UNPAID';
//     const inquiryRef = invoice.inquiryNumber || 'N/A';
    
//     doc.text(`Date: ${invoiceDate}`, rightAlignX, yPos + 11.5, { align: 'right' });
//     doc.text(`Due: ${dueDate}`, rightAlignX, yPos + 15.5, { align: 'right' });
    
//     // Status color coding
//     let statusColor = COLORS.unpaid;
//     if (status === 'PAID') statusColor = COLORS.paid;
//     else if (status === 'PARTIAL') statusColor = COLORS.partial;
//     doc.setTextColor(statusColor);
//     doc.text(`Status: ${status}`, rightAlignX, yPos + 19.5, { align: 'right' });
//     doc.setTextColor(COLORS.textLight);
    
//     doc.text(`Ref: ${inquiryRef}`, rightAlignX, yPos + 23.5, { align: 'right' });

//     // ==================== CUSTOMER INFO SECTION ====================
//     yPos += 34;
    
//     const billingAddress = [
//       invoice.customer?.billingAddress,
//       invoice.customer?.billingCity,
//       invoice.customer?.billingZipCode,
//       invoice.customer?.billingCountry
//     ].filter(Boolean).join(', ');
    
//     const shippingAddress = [
//       invoice.customer?.shippingAddress,
//       invoice.customer?.shippingCity,
//       invoice.customer?.shippingZipCode,
//       invoice.customer?.shippingCountry
//     ].filter(Boolean).join(', ');
    
//     const addressesAreSame = billingAddress === shippingAddress && billingAddress !== '';

//     let leftColHeight = 20;
//     let rightColHeight = 20;
    
//     if (billingAddress) {
//       const billingLines = doc.splitTextToSize(billingAddress, (contentWidth / 2) - 10);
//       rightColHeight += 4 + (billingLines.length * 3.5);
//     }
    
//     if (!addressesAreSame && shippingAddress) {
//       const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth / 2) - 10);
//       rightColHeight += 4 + (shippingLines.length * 3.5);
//     } else if (addressesAreSame && billingAddress) {
//       rightColHeight += 4 + 3.5;
//     }
    
//     const colHeight = Math.max(leftColHeight, rightColHeight);
    
//     // Left Column - Customer Info
//     doc.setFillColor(COLORS.lightGray);
//     doc.roundedRect(margin, yPos, (contentWidth / 2) - 3, colHeight, 2, 2, 'F');
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('CUSTOMER INFO', margin + 5, yPos + 5);
    
//     let leftY = yPos + 10;
//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.text);
//     doc.text(invoice.customer?.companyName || 'N/A', margin + 5, leftY);
//     leftY += 4.5;
    
//     doc.setFont('helvetica', 'normal');
//     if (invoice.customer?.contactPerson) {
//       doc.text(invoice.customer.contactPerson, margin + 5, leftY);
//       leftY += 4.5;
//     }
    
//     if (invoice.customer?.email) {
//       doc.text(invoice.customer.email, margin + 5, leftY);
//       leftY += 4.5;
//     }
    
//     if (invoice.customer?.phone) {
//       doc.text(invoice.customer.phone, margin + 5, leftY);
//     }
    
//     // Right Column - Address
//     const addressColX = margin + (contentWidth / 2) + 3;
//     doc.setFillColor(COLORS.lightGray);
//     doc.roundedRect(addressColX, yPos, (contentWidth / 2) - 3, colHeight, 2, 2, 'F');
    
//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('ADDRESS', addressColX + 5, yPos + 5);
    
//     let rightY = yPos + 10;
//     let lineSpacing = 3.5;
    
//     if (billingAddress) {
//       doc.setFontSize(6.5);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.textLight);
//       doc.text('Billing Address:', addressColX + 5, rightY);
//       rightY += lineSpacing;
//       doc.setFont('helvetica', 'normal');
//       const billingLines = doc.splitTextToSize(billingAddress, (contentWidth / 2) - 15);
//       for (let i = 0; i < billingLines.length; i++) {
//         doc.text(billingLines[i], addressColX + 5, rightY + (i * lineSpacing));
//       }
//       rightY += (billingLines.length * lineSpacing);
//     }
    
//     if (!addressesAreSame && shippingAddress) {
//       rightY += 1.5;
//       doc.setFont('helvetica', 'bold');
//       doc.text('Shipping Address:', addressColX + 5, rightY);
//       rightY += lineSpacing;
//       doc.setFont('helvetica', 'normal');
//       const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth / 2) - 15);
//       for (let i = 0; i < shippingLines.length; i++) {
//         doc.text(shippingLines[i], addressColX + 5, rightY + (i * lineSpacing));
//       }
//     } else if (addressesAreSame && billingAddress) {
//       rightY += 1.5;
//       doc.setFont('helvetica', 'italic');
//       doc.setTextColor(COLORS.textLight);
//       doc.text('Shipping Address: Same as billing', addressColX + 5, rightY);
//     } else if (!billingAddress) {
//       doc.text('N/A', addressColX + 5, rightY);
//     }
    
//     yPos += colHeight + 10;

//     // ==================== ITEMS TABLE ====================
//     const colPositions = {
//       item: margin + 3,
//       product: margin + 10,
//       color: margin + 45,
//       details: margin + 60,  // For sizes or weight quantity
//       qty: margin + contentWidth - 52,
//       unitPrice: margin + contentWidth - 38,
//       total: margin + contentWidth - 10
//     };

//     // Table Header
//     doc.setFillColor(COLORS.primary);
//     doc.rect(margin, yPos, contentWidth, 7, 'F');

//     doc.setFontSize(7);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.neutral);

//     doc.text('#', colPositions.item, yPos + 4.5);
//     doc.text('Product', colPositions.product, yPos + 4.5);
//     doc.text('Color', colPositions.color, yPos + 4.5);
//     doc.text('Details', colPositions.details, yPos + 4.5);
//     doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//     doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
//     doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

//     yPos += 10;

//     let rowsUsed = 0;
//     let itemNumber = 1;
    
//     if (invoice.items && invoice.items.length > 0) {
//       for (const item of invoice.items) {
//         const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
//         const unitLabel = getUnitLabel(item.orderUnit);
        
//         let firstColor = true;
        
//         if (item.colors && item.colors.length > 0) {
//           const colorRows = [];
          
//           for (const color of item.colors) {
//             let colorQty = 0;
//             let detailsLines = [];
            
//             if (isWeightBased) {
//               // Weight-based product - show quantity directly
//               colorQty = color.quantity || color.totalQuantity || color.totalForColor || 0;
//               detailsLines = [`${colorQty} ${unitLabel}`];
//             } else {
//               // Piece-based product - show size breakdown
//               const activeSizes = color.sizeQuantities?.filter(sq => sq.quantity > 0) || [];
//               colorQty = activeSizes.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
              
//               if (activeSizes.length > 0) {
//                 const allSizesText = activeSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
//                 doc.setFontSize(5.0);
//                 const maxWidth = 55;
//                 const textWidth = doc.getTextWidth(allSizesText);
                
//                 if (textWidth <= maxWidth) {
//                   detailsLines = [allSizesText];
//                 } else {
//                   let currentLine = '';
//                   let remainingSizes = [...activeSizes];
                  
//                   for (let i = 0; i < activeSizes.length; i++) {
//                     const sq = activeSizes[i];
//                     const sizeText = `${sq.size}:${sq.quantity}`;
//                     const testLine = currentLine ? `${currentLine}, ${sizeText}` : sizeText;
//                     const testWidth = doc.getTextWidth(testLine);
                    
//                     if (testWidth <= maxWidth) {
//                       currentLine = testLine;
//                       remainingSizes.shift();
//                     } else {
//                       if (currentLine) detailsLines.push(currentLine);
//                       currentLine = sizeText;
//                     }
//                   }
//                   if (currentLine) detailsLines.push(currentLine);
                  
//                   if (detailsLines.length > 2) {
//                     detailsLines = [];
//                     const sizesPerLine = Math.ceil(activeSizes.length / 2);
//                     for (let i = 0; i < activeSizes.length; i += sizesPerLine) {
//                       const lineSizes = activeSizes.slice(i, i + sizesPerLine);
//                       const lineText = lineSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
//                       detailsLines.push(lineText);
//                     }
//                   }
//                 }
//                 doc.setFontSize(6);
//               } else {
//                 detailsLines = ['-'];
//               }
//             }
            
//             const colorUnitPrice = color.unitPrice || item.unitPrice || 0;
//             const rowHeight = Math.max(4.5, detailsLines.length * 3.2);
            
//             colorRows.push({
//               color: color,
//               detailsLines: detailsLines,
//               rowHeight: rowHeight,
//               colorQty: colorQty,
//               colorUnitPrice: colorUnitPrice,
//               colorTotal: colorQty * colorUnitPrice
//             });
//           }
          
//           // Render each color row
//           for (let colorIndex = 0; colorIndex < colorRows.length; colorIndex++) {
//             const row = colorRows[colorIndex];
//             const rowStartY = yPos;
//             const rowHeight = row.rowHeight;
            
//             // Check page break
//             if (yPos + rowHeight > pageHeight - 55) {
//               doc.addPage();
//               yPos = margin + 10;
//               rowsUsed = 0;
              
//               doc.setFillColor(COLORS.primary);
//               doc.rect(margin, yPos, contentWidth, 7, 'F');
//               doc.setFontSize(7);
//               doc.setFont('helvetica', 'bold');
//               doc.setTextColor(COLORS.neutral);
//               doc.text('#', colPositions.item, yPos + 4.5);
//               doc.text('Product', colPositions.product, yPos + 4.5);
//               doc.text('Color', colPositions.color, yPos + 4.5);
//               doc.text('Details', colPositions.details, yPos + 4.5);
//               doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//               doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
//               doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
//               yPos += 10;
//             }

//             // Background for alternating rows
//             if (rowsUsed % 2 === 0) {
//               doc.setFillColor(COLORS.lightGray);
//               doc.rect(margin, rowStartY - 2, contentWidth, rowHeight, 'F');
//             }

//             doc.setFontSize(6);
//             doc.setFont('helvetica', 'normal');
//             doc.setTextColor(COLORS.text);

//             const textY = rowStartY + 1.2;
//             const circleY = rowStartY + 1.5;
//             const circleRadius = 0.9;

//             // Item number
//             if (colorIndex === 0) {
//               doc.text(itemNumber.toString(), colPositions.item, textY);
//             }

//             // Product name
//             if (colorIndex === 0) {
//               let productName = item.productName || '';
//               const maxProductWidth = 30;
//               doc.setFontSize(5.5);
//               while (doc.getTextWidth(productName) > maxProductWidth && productName.length > 3) {
//                 productName = productName.substring(0, productName.length - 1);
//               }
//               if (productName !== (item.productName || '')) {
//                 productName = productName.substring(0, productName.length - 3) + '...';
//               }
//               doc.text(productName, colPositions.product, textY);
//               doc.setFontSize(6);
//             }

//             // Color circle and name
//             const colorCode = row.color.color?.code || '#CCCCCC';
//             drawColorCircle(doc, colPositions.color + 2, circleY, circleRadius, colorCode);
            
//             let colorName = row.color.color?.name || row.color.color?.code || 'Color';
//             if (colorName.startsWith('#')) colorName = '';
//             if (colorName.length > 10) colorName = colorName.substring(0, 8) + '..';
//             doc.setFontSize(5.5);
//             doc.text(colorName, colPositions.color + 6, textY);
//             doc.setFontSize(6);

//             // Details (Sizes or Weight)
//             if (row.detailsLines.length > 0 && row.detailsLines[0] !== '-') {
//               doc.setFontSize(5.0);
//               for (let i = 0; i < row.detailsLines.length; i++) {
//                 doc.text(row.detailsLines[i], colPositions.details, textY + (i * 3.2));
//               }
//               doc.setFontSize(6);
//             } else {
//               doc.text('-', colPositions.details, textY);
//             }

//             // Unit display next to quantity
//             doc.setFontSize(5.5);
//             doc.text(`${row.colorQty} ${unitLabel}`, colPositions.qty, textY, { align: 'right' });

//             // Unit Price
//             doc.text(formatPrice(row.colorUnitPrice), colPositions.unitPrice, textY, { align: 'right' });

//             // Total
//             doc.setFont('helvetica', 'bold');
//             doc.setFontSize(5.5);
//             doc.setTextColor(COLORS.primary);
//             doc.text(formatPrice(row.colorTotal), colPositions.total, textY, { align: 'right' });
//             doc.setFont('helvetica', 'normal');
//             doc.setFontSize(6);
//             doc.setTextColor(COLORS.text);

//             yPos += rowHeight;
//             rowsUsed++;
//           }
//         } else {
//           // Simple product
//           const rowHeight = 4.5;
          
//           if (yPos + rowHeight > pageHeight - 55) {
//             doc.addPage();
//             yPos = margin + 10;
//             rowsUsed = 0;
            
//             doc.setFillColor(COLORS.primary);
//             doc.rect(margin, yPos, contentWidth, 7, 'F');
//             doc.setFontSize(7);
//             doc.setFont('helvetica', 'bold');
//             doc.setTextColor(COLORS.neutral);
//             doc.text('#', colPositions.item, yPos + 4.5);
//             doc.text('Product', colPositions.product, yPos + 4.5);
//             doc.text('Color', colPositions.color, yPos + 4.5);
//             doc.text('Details', colPositions.details, yPos + 4.5);
//             doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
//             doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
//             doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
//             yPos += 10;
//           }

//           if (rowsUsed % 2 === 0) {
//             doc.setFillColor(COLORS.lightGray);
//             doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
//           }

//           doc.setFontSize(5.5);
//           doc.setFont('helvetica', 'normal');
          
//           const textY = yPos + 1.2;
//           const circleY = yPos + 1.5;
//           const circleRadius = 0.9;
          
//           doc.text(itemNumber.toString(), colPositions.item, textY);
          
//           let productName = item.productName || '';
//           const maxProductWidth = 30;
//           while (doc.getTextWidth(productName) > maxProductWidth && productName.length > 3) {
//             productName = productName.substring(0, productName.length - 1);
//           }
//           if (productName !== (item.productName || '')) {
//             productName = productName.substring(0, productName.length - 3) + '...';
//           }
//           doc.text(productName, colPositions.product, textY);
          
//           drawColorCircle(doc, colPositions.color + 2, circleY, circleRadius, '#CCCCCC');
//           doc.text('-', colPositions.details, textY);
          
//           const totalQty = item.totalQuantity || 0;
//           const unitLabel = getUnitLabel(item.orderUnit || 'piece');
//           doc.text(`${totalQty} ${unitLabel}`, colPositions.qty, textY, { align: 'right' });
//           doc.text(formatPrice(item.unitPrice || 0), colPositions.unitPrice, textY, { align: 'right' });
          
//           doc.setFont('helvetica', 'bold');
//           doc.setTextColor(COLORS.primary);
//           doc.text(formatPrice(item.total || 0), colPositions.total, textY, { align: 'right' });

//           yPos += rowHeight;
//           rowsUsed++;
//         }
//         itemNumber++;
//       }
//     }

//     // ==================== SUMMARY SECTION ====================
//     const summaryWidth = 85;
//     const summaryX = pageWidth - margin - summaryWidth;
    
//     doc.setFillColor(COLORS.lightGray);
//     doc.roundedRect(summaryX, yPos, summaryWidth, 38, 2, 2, 'F');

//     doc.setFontSize(8);
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('SUMMARY', summaryX + 3, yPos + 5);

//     let summaryY = yPos + 9;
//     doc.setFontSize(6.5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.text);

//     const subtotal = invoice.subtotal || 0;
//     const vatPercentage = invoice.vatPercentage || 0;
//     const vatAmount = invoice.vatAmount || 0;
//     const discountPercentage = invoice.discountPercentage || 0;
//     const discountAmount = invoice.discountAmount || 0;
//     const shippingCost = invoice.shippingCost || 0;
//     const finalTotal = invoice.finalTotal || 0;
//     const amountPaid = invoice.amountPaid || 0;
//     const dueAmount = invoice.dueAmount || 0;

//     doc.text('Subtotal:', summaryX + 3, summaryY);
//     doc.text(formatPrice(subtotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//     summaryY += 3.5;

//     if (vatPercentage > 0) {
//       doc.text(`VAT ${vatPercentage}%:`, summaryX + 3, summaryY);
//       doc.text(formatPrice(vatAmount), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       summaryY += 3.5;
//     }

//     if (discountPercentage > 0) {
//       doc.text(`Discount ${discountPercentage}%:`, summaryX + 3, summaryY);
//       doc.text(`-${formatPrice(discountAmount)}`, summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       summaryY += 3.5;
//     }

//     if (shippingCost > 0) {
//       doc.text('Shipping:', summaryX + 3, summaryY);
//       doc.text(formatPrice(shippingCost), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
//       summaryY += 3.5;
//     }

//     doc.setDrawColor(COLORS.border);
//     doc.line(summaryX + 3, summaryY - 1, summaryX + summaryWidth - 3, summaryY - 1);
    
//     summaryY += 2;
    
//     doc.setFont('helvetica', 'bold');
//     doc.setTextColor(COLORS.primary);
//     doc.text('TOTAL:', summaryX + 3, summaryY);
//     doc.text(formatPrice(finalTotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });

//     const paymentY = summaryY + 4;
    
//     doc.setFontSize(5.5);
//     doc.setFont('helvetica', 'normal');
    
//     doc.setTextColor(COLORS.paid);
//     doc.text(`Paid: ${formatPrice(amountPaid)} (${finalTotal > 0 ? ((amountPaid / finalTotal) * 100).toFixed(1) : '0'}%)`, summaryX + 3, paymentY);
    
//     doc.setTextColor(COLORS.unpaid);
//     doc.text(`Due: ${formatPrice(dueAmount)} (${finalTotal > 0 ? ((dueAmount / finalTotal) * 100).toFixed(1) : '0'}%)`, summaryX + 3, paymentY + 3.5);

//     // ==================== BANK DETAILS & BANKING TERMS ====================
//     yPos += 48;
    
//     if (yPos > pageHeight - 45) {
//       doc.addPage();
//       yPos = margin + 10;
//     }
    
//     const leftColWidth = (contentWidth / 2) - 3;
//     const bankingTermsColX = margin + (contentWidth / 2) + 3;
    
//     // Left Column - Bank Details
//     if (invoice.bankDetails && Object.values(invoice.bankDetails).some(v => v)) {
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.primary);
//       doc.text('BANK DETAILS', margin, yPos);

//       doc.setFontSize(5.5);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(COLORS.textLight);

//       const bankLines = [];
//       if (invoice.bankDetails.bankName) bankLines.push(`Bank: ${invoice.bankDetails.bankName}`);
//       if (invoice.bankDetails.accountName) bankLines.push(`A/C Name: ${invoice.bankDetails.accountName}`);
//       if (invoice.bankDetails.accountNumber) bankLines.push(`A/C No: ${invoice.bankDetails.accountNumber}`);
//       if (invoice.bankDetails.accountType) bankLines.push(`Account Type: ${invoice.bankDetails.accountType}`);
//       if (invoice.bankDetails.routingNumber) bankLines.push(`Routing No: ${invoice.bankDetails.routingNumber}`);
//       if (invoice.bankDetails.swiftCode) bankLines.push(`SWIFT: ${invoice.bankDetails.swiftCode}`);
//       if (invoice.bankDetails.iban) bankLines.push(`IBAN: ${invoice.bankDetails.iban}`);
//       if (invoice.bankDetails.bankAddress) {
//         const addressLines = doc.splitTextToSize(`Address: ${invoice.bankDetails.bankAddress}`, leftColWidth - 5);
//         bankLines.push(...addressLines);
//       }

//       bankLines.forEach((line, index) => {
//         doc.text(line, margin, yPos + 4 + (index * 3));
//       });
      
//       const bankLinesCount = bankLines.length;
//       const bankDetailsHeight = bankLinesCount * 3 + 8;
      
//       // Right Column - Banking Terms
//       if (invoice.bankingTerms && invoice.bankingTerms.length > 0) {
//         doc.setFontSize(7);
//         doc.setFont('helvetica', 'bold');
//         doc.setTextColor(COLORS.primary);
//         doc.text('BANKING TERMS', bankingTermsColX, yPos);
        
//         doc.setFontSize(5.5);
//         doc.setFont('helvetica', 'normal');
//         doc.setTextColor(COLORS.textLight);
        
//         let termsY = yPos + 4;
//         const bulletPoint = '• ';
//         const termWidth = (contentWidth / 2) - 15;
        
//         const termsWithValue = invoice.bankingTerms.filter(term => term.value && term.value.trim() !== '');
//         const termsWithoutValue = invoice.bankingTerms.filter(term => !term.value || term.value.trim() === '');
        
//         for (const term of termsWithValue) {
//           if (term.title) {
//             const titleLines = doc.splitTextToSize(term.title, termWidth);
//             for (let i = 0; i < titleLines.length; i++) {
//               const prefix = i === 0 ? bulletPoint : '  ';
//               doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
//               termsY += 2.8;
//             }
            
//             if (term.value) {
//               const valueLines = doc.splitTextToSize(term.value, termWidth);
//               for (const line of valueLines) {
//                 doc.text('  ' + line, bankingTermsColX, termsY);
//                 termsY += 2.5;
//               }
//             }
//             termsY += 1.5;
//           } else if (term.value) {
//             const valueLines = doc.splitTextToSize(term.value, termWidth);
//             for (const line of valueLines) {
//               doc.text(bulletPoint + line, bankingTermsColX, termsY);
//               termsY += 2.8;
//             }
//             termsY += 1.5;
//           }
//         }
        
//         for (const term of termsWithoutValue) {
//           if (term.title) {
//             const titleLines = doc.splitTextToSize(term.title, termWidth);
//             for (let i = 0; i < titleLines.length; i++) {
//               const prefix = i === 0 ? bulletPoint : '  ';
//               doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
//               termsY += 2.8;
//             }
//             termsY += 1;
//           }
//         }
//       }
      
//       yPos += Math.max(bankDetailsHeight, 25);
//     } else if (invoice.bankingTerms && invoice.bankingTerms.length > 0) {
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.primary);
//       doc.text('BANKING TERMS', bankingTermsColX, yPos);
      
//       doc.setFontSize(5.5);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(COLORS.textLight);
      
//       let termsY = yPos + 4;
//       const bulletPoint = '• ';
//       const termWidth = (contentWidth / 2) - 15;
      
//       const termsWithValue = invoice.bankingTerms.filter(term => term.value && term.value.trim() !== '');
//       const termsWithoutValue = invoice.bankingTerms.filter(term => !term.value || term.value.trim() === '');
      
//       for (const term of termsWithValue) {
//         if (term.title) {
//           const titleLines = doc.splitTextToSize(term.title, termWidth);
//           for (let i = 0; i < titleLines.length; i++) {
//             const prefix = i === 0 ? bulletPoint : '  ';
//             doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
//             termsY += 2.8;
//           }
          
//           if (term.value) {
//             const valueLines = doc.splitTextToSize(term.value, termWidth);
//             for (const line of valueLines) {
//               doc.text('  ' + line, bankingTermsColX, termsY);
//               termsY += 2.5;
//             }
//           }
//           termsY += 1.5;
//         } else if (term.value) {
//           const valueLines = doc.splitTextToSize(term.value, termWidth);
//           for (const line of valueLines) {
//             doc.text(bulletPoint + line, bankingTermsColX, termsY);
//             termsY += 2.8;
//           }
//           termsY += 1.5;
//         }
//       }
      
//       for (const term of termsWithoutValue) {
//         if (term.title) {
//           const titleLines = doc.splitTextToSize(term.title, termWidth);
//           for (let i = 0; i < titleLines.length; i++) {
//             const prefix = i === 0 ? bulletPoint : '  ';
//             doc.text(prefix + titleLines[i], bankingTermsColX, termsY);
//             termsY += 2.8;
//           }
//           termsY += 1;
//         }
//       }
      
//       yPos += 25;
//     } else {
//       yPos += 15;
//     }

//     // ==================== NOTES & TERMS ====================
//     yPos += 5;
    
//     if (yPos > pageHeight - 35) {
//       doc.addPage();
//       yPos = margin + 10;
//     }

//     doc.setDrawColor(COLORS.border);
//     doc.line(margin, yPos, pageWidth - margin, yPos);
//     yPos += 5;

//     if (invoice.notes) {
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.primary);
//       doc.text('NOTES:', margin, yPos);
      
//       doc.setFontSize(6);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(COLORS.textLight);
      
//       const noteLines = doc.splitTextToSize(invoice.notes, contentWidth);
//       doc.text(noteLines, margin, yPos + 3.5);
//       yPos += (noteLines.length * 3.5) + 5;
//     }

//     if (invoice.terms) {
//       doc.setFontSize(7);
//       doc.setFont('helvetica', 'bold');
//       doc.setTextColor(COLORS.primary);
//       doc.text('TERMS & CONDITIONS:', margin, yPos);
      
//       doc.setFontSize(6);
//       doc.setFont('helvetica', 'normal');
//       doc.setTextColor(COLORS.textLight);
      
//       const termsLines = doc.splitTextToSize(invoice.terms, contentWidth);
//       doc.text(termsLines, margin, yPos + 3.5);
//     }

//     // ==================== FOOTER ====================
//     const footerY = pageHeight - 5;
    
//     doc.setDrawColor(COLORS.border);
//     doc.setLineWidth(0.2);
//     doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);
    
//     doc.setFontSize(5);
//     doc.setFont('helvetica', 'normal');
//     doc.setTextColor(COLORS.textLight);
    
//     const today = new Date();
//     const dateString = today.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     }).replace(/,/g, '');
    
//     doc.text(`Invoice #${invoice.invoiceNumber} | Generated ${dateString}`, margin, footerY);
//     doc.text(invoice.company?.companyName || 'Asian Clothify', pageWidth - margin, footerY, { align: 'right' });

//     // Generate and download PDF
//     const pdfBlob = doc.output('blob');
//     const url = URL.createObjectURL(pdfBlob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Invoice_${invoice.invoiceNumber}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     return { success: true, fileName: `Invoice_${invoice.invoiceNumber}.pdf` };
    
//   } catch (error) {
//     console.error('PDF Generation Error:', error);
//     throw error;
//   }
// };

import jsPDF from 'jspdf';

// Helper function to format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price || 0);
};

// Helper function to get unit label
const getUnitLabel = (orderUnit) => {
  switch(orderUnit) {
    case 'kg': return 'kg';
    case 'ton': return 'MT';
    default: return 'pcs';
  }
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function to convert image to base64
const imageToBase64 = async (imageUrl) => {
  try {
    if (imageUrl?.startsWith('data:image')) {
      return imageUrl;
    }
    if (!imageUrl) return null;
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return null;
  }
};

// Get company initials for logo fallback
const getCompanyInitials = (companyName) => {
  if (!companyName) return 'JC';
  return companyName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Function to draw a color circle
const drawColorCircle = (doc, x, y, radius, colorCode) => {
  doc.setFillColor(colorCode);
  doc.circle(x, y, radius, 'F');
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.1);
  doc.circle(x, y, radius, 'S');
};

// Jute Theme Colors
const COLORS = {
  primary: '#6B4F3A',
  secondary: '#F5E6D3',
  accent: '#3A7D44',
  neutral: '#FFFFFF',
  lightGray: '#F9F9FC',
  border: '#E5E5E5',
  text: '#333333',
  textLight: '#666666',
  paid: '#3A7D44',
  unpaid: '#CD5C5C',
  partial: '#E6A017'
};

export const generateInvoicePDF = async (invoice) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (2 * margin);
    let yPos = margin;

    // Load company logo
    let companyLogoBase64 = null;
    if (invoice.company?.logo) {
      try {
        companyLogoBase64 = await imageToBase64(invoice.company.logo);
      } catch (error) {
        console.error('Failed to load company logo:', error);
      }
    }

    // ==================== HEADER ====================
    doc.setFillColor(COLORS.primary);
    doc.rect(0, 0, pageWidth, 32, 'F');
    
    doc.setFillColor(COLORS.neutral);
    doc.roundedRect(margin, yPos, contentWidth, 26, 2, 2, 'F');

    const logoSize = 16;
    const logoMaxWidth = 20;
    const logoMaxHeight = 16;
    const logoX = margin + 5;
    const logoY = yPos + 5;

    if (companyLogoBase64) {
      try {
        const img = new Image();
        img.src = companyLogoBase64;
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        let imgWidth = img.width;
        let imgHeight = img.height;
        let finalWidth = logoSize;
        let finalHeight = logoSize;
        
        const aspectRatio = imgWidth / imgHeight;
        
        if (aspectRatio > 1) {
          finalWidth = logoSize;
          finalHeight = logoSize / aspectRatio;
        } else {
          finalHeight = logoSize;
          finalWidth = logoSize * aspectRatio;
        }
        
        if (finalWidth > logoMaxWidth) {
          finalWidth = logoMaxWidth;
          finalHeight = finalWidth / aspectRatio;
        }
        if (finalHeight > logoMaxHeight) {
          finalHeight = logoMaxHeight;
          finalWidth = finalHeight * aspectRatio;
        }
        
        const offsetX = (logoSize - finalWidth) / 2;
        const offsetY = (logoSize - finalHeight) / 2;
        
        doc.addImage(companyLogoBase64, 'PNG', logoX + offsetX, logoY + offsetY, finalWidth, finalHeight);
      } catch (error) {
        const companyName = invoice.company?.companyName || 'Jute Craftify';
        const initials = getCompanyInitials(companyName);
        doc.setFillColor(COLORS.primary);
        doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.neutral);
        doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
      }
    } else {
      const companyName = invoice.company?.companyName || 'Jute Craftify';
      const initials = getCompanyInitials(companyName);
      doc.setFillColor(COLORS.primary);
      doc.roundedRect(logoX, logoY, logoSize, logoSize, 2, 2, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.neutral);
      doc.text(initials, logoX + logoSize/2, logoY + logoSize/2 + 1, { align: 'center' });
    }

    const companyX = logoX + logoSize + 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.text);
    doc.text(invoice.company?.companyName || 'Jute Craftify', companyX, logoY + 5);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textLight);
    if (invoice.company?.contactPerson) {
      doc.setFont('helvetica', 'bold');
      doc.text('Contact: ', companyX, logoY + 10);
      const contactLabelWidth = doc.getTextWidth('Contact: ');
      doc.setFont('helvetica', 'normal');
      doc.text(invoice.company.contactPerson, companyX + contactLabelWidth, logoY + 10);
    } else {
      doc.setFont('helvetica', 'bold');
      doc.text('Contact: ', companyX, logoY + 10);
      doc.setFont('helvetica', 'normal');
      doc.text('N/A', companyX + doc.getTextWidth('Contact: '), logoY + 10);
    }

    doc.setFontSize(6.5);
    const emailPhone = `${invoice.company?.email || 'info@jutecraftify.com'} | ${invoice.company?.phone || '+8801305-785685'}`;
    doc.text(emailPhone, companyX, logoY + 14);

    if (invoice.company?.address) {
      doc.setFontSize(6);
      const addressLines = doc.splitTextToSize(invoice.company.address, 70);
      doc.text(addressLines, companyX, logoY + 18);
    }

    const rightAlignX = pageWidth - margin - 5;
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    const invoiceNoText = `INVOICE NO: `;
    doc.text(invoiceNoText, rightAlignX - doc.getTextWidth(invoiceNoText + (invoice.invoiceNumber || '')), yPos + 8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.text);
    doc.text(invoice.invoiceNumber || '', rightAlignX, yPos + 8, { align: 'right' });

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textLight);
    
    const invoiceDate = formatDate(invoice.invoiceDate);
    const dueDate = formatDate(invoice.dueDate);
    const status = invoice.paymentStatus?.toUpperCase() || 'UNPAID';
    const inquiryRef = invoice.inquiryNumber || 'N/A';
    
    doc.text(`Date: ${invoiceDate}`, rightAlignX, yPos + 11.5, { align: 'right' });
    doc.text(`Due: ${dueDate}`, rightAlignX, yPos + 15.5, { align: 'right' });
    
    let statusColor = COLORS.unpaid;
    if (status === 'PAID') statusColor = COLORS.paid;
    else if (status === 'PARTIAL') statusColor = COLORS.partial;
    doc.setTextColor(statusColor);
    doc.text(`Status: ${status}`, rightAlignX, yPos + 19.5, { align: 'right' });
    doc.setTextColor(COLORS.textLight);
    
    doc.text(`Ref: ${inquiryRef}`, rightAlignX, yPos + 23.5, { align: 'right' });

    // ==================== CUSTOMER INFO SECTION ====================
    yPos += 34;
    
    const billingAddress = [
      invoice.customer?.billingAddress,
      invoice.customer?.billingCity,
      invoice.customer?.billingZipCode,
      invoice.customer?.billingCountry
    ].filter(Boolean).join(', ');
    
    const shippingAddress = [
      invoice.customer?.shippingAddress,
      invoice.customer?.shippingCity,
      invoice.customer?.shippingZipCode,
      invoice.customer?.shippingCountry
    ].filter(Boolean).join(', ');
    
    const addressesAreSame = billingAddress === shippingAddress && billingAddress !== '';

    let leftColHeight = 20;
    let rightColHeight = 20;
    
    if (billingAddress) {
      const billingLines = doc.splitTextToSize(billingAddress, (contentWidth / 2) - 10);
      rightColHeight += 4 + (billingLines.length * 3.5);
    }
    
    if (!addressesAreSame && shippingAddress) {
      const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth / 2) - 10);
      rightColHeight += 4 + (shippingLines.length * 3.5);
    } else if (addressesAreSame && billingAddress) {
      rightColHeight += 4 + 3.5;
    }
    
    const colHeight = Math.max(leftColHeight, rightColHeight);
    
    // Left Column - Customer Info
    doc.setFillColor(COLORS.lightGray);
    doc.roundedRect(margin, yPos, (contentWidth / 2) - 3, colHeight, 2, 2, 'F');
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('CUSTOMER INFO', margin + 5, yPos + 5);
    
    let leftY = yPos + 10;
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.text);
    doc.text(invoice.customer?.companyName || 'N/A', margin + 5, leftY);
    leftY += 4.5;
    
    doc.setFont('helvetica', 'normal');
    if (invoice.customer?.contactPerson) {
      doc.text(invoice.customer.contactPerson, margin + 5, leftY);
      leftY += 4.5;
    }
    
    if (invoice.customer?.email) {
      doc.text(invoice.customer.email, margin + 5, leftY);
      leftY += 4.5;
    }
    
    if (invoice.customer?.phone) {
      doc.text(invoice.customer.phone, margin + 5, leftY);
    }
    
    // Right Column - Address
    const addressColX = margin + (contentWidth / 2) + 3;
    doc.setFillColor(COLORS.lightGray);
    doc.roundedRect(addressColX, yPos, (contentWidth / 2) - 3, colHeight, 2, 2, 'F');
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('ADDRESS', addressColX + 5, yPos + 5);
    
    let rightY = yPos + 10;
    let lineSpacing = 3.5;
    
    if (billingAddress) {
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.textLight);
      doc.text('Billing Address:', addressColX + 5, rightY);
      rightY += lineSpacing;
      doc.setFont('helvetica', 'normal');
      const billingLines = doc.splitTextToSize(billingAddress, (contentWidth / 2) - 15);
      for (let i = 0; i < billingLines.length; i++) {
        doc.text(billingLines[i], addressColX + 5, rightY + (i * lineSpacing));
      }
      rightY += (billingLines.length * lineSpacing);
    }
    
    if (!addressesAreSame && shippingAddress) {
      rightY += 1.5;
      doc.setFont('helvetica', 'bold');
      doc.text('Shipping Address:', addressColX + 5, rightY);
      rightY += lineSpacing;
      doc.setFont('helvetica', 'normal');
      const shippingLines = doc.splitTextToSize(shippingAddress, (contentWidth / 2) - 15);
      for (let i = 0; i < shippingLines.length; i++) {
        doc.text(shippingLines[i], addressColX + 5, rightY + (i * lineSpacing));
      }
    } else if (addressesAreSame && billingAddress) {
      rightY += 1.5;
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(COLORS.textLight);
      doc.text('Shipping Address: Same as billing', addressColX + 5, rightY);
    } else if (!billingAddress) {
      doc.text('N/A', addressColX + 5, rightY);
    }
    
    yPos += colHeight + 10;

    // ==================== ITEMS TABLE ====================
    const colPositions = {
      item: margin + 3,
      product: margin + 10,
      color: margin + 45,
      details: margin + 60,
      qty: margin + contentWidth - 52,
      unitPrice: margin + contentWidth - 38,
      total: margin + contentWidth - 10
    };

    // Table Header
    doc.setFillColor(COLORS.primary);
    doc.rect(margin, yPos, contentWidth, 7, 'F');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.neutral);

    doc.text('#', colPositions.item, yPos + 4.5);
    doc.text('Product', colPositions.product, yPos + 4.5);
    doc.text('Color', colPositions.color, yPos + 4.5);
    doc.text('Details', colPositions.details, yPos + 4.5);
    doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
    doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
    doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });

    yPos += 10;

    let rowsUsed = 0;
    let itemNumber = 1;
    
    if (invoice.items && invoice.items.length > 0) {
      for (const item of invoice.items) {
        const isWeightBased = item.orderUnit === 'kg' || item.orderUnit === 'ton';
        const unitLabel = getUnitLabel(item.orderUnit);
        
        if (item.colors && item.colors.length > 0) {
          const colorRows = [];
          
          for (const color of item.colors) {
            let colorQty = 0;
            let detailsLines = [];
            
            if (isWeightBased) {
              colorQty = color.quantity || color.totalQuantity || color.totalForColor || 0;
              detailsLines = [`${colorQty} ${unitLabel}`];
            } else {
              const activeSizes = color.sizeQuantities?.filter(sq => sq.quantity > 0) || [];
              colorQty = activeSizes.reduce((sum, sq) => sum + (sq.quantity || 0), 0);
              
              if (activeSizes.length > 0) {
                const allSizesText = activeSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
                doc.setFontSize(5.0);
                const maxWidth = 55;
                const textWidth = doc.getTextWidth(allSizesText);
                
                if (textWidth <= maxWidth) {
                  detailsLines = [allSizesText];
                } else {
                  let currentLine = '';
                  for (let i = 0; i < activeSizes.length; i++) {
                    const sq = activeSizes[i];
                    const sizeText = `${sq.size}:${sq.quantity}`;
                    const testLine = currentLine ? `${currentLine}, ${sizeText}` : sizeText;
                    const testWidth = doc.getTextWidth(testLine);
                    
                    if (testWidth <= maxWidth) {
                      currentLine = testLine;
                    } else {
                      if (currentLine) detailsLines.push(currentLine);
                      currentLine = sizeText;
                    }
                  }
                  if (currentLine) detailsLines.push(currentLine);
                  
                  if (detailsLines.length > 2) {
                    detailsLines = [];
                    const sizesPerLine = Math.ceil(activeSizes.length / 2);
                    for (let i = 0; i < activeSizes.length; i += sizesPerLine) {
                      const lineSizes = activeSizes.slice(i, i + sizesPerLine);
                      const lineText = lineSizes.map(sq => `${sq.size}:${sq.quantity}`).join(', ');
                      detailsLines.push(lineText);
                    }
                  }
                }
                doc.setFontSize(6);
              } else {
                detailsLines = ['-'];
              }
            }
            
            const colorUnitPrice = color.unitPrice || item.unitPrice || 0;
            const rowHeight = Math.max(4.5, detailsLines.length * 3.2);
            
            colorRows.push({
              color: color,
              detailsLines: detailsLines,
              rowHeight: rowHeight,
              colorQty: colorQty,
              colorUnitPrice: colorUnitPrice,
              colorTotal: colorQty * colorUnitPrice
            });
          }
          
          for (let colorIndex = 0; colorIndex < colorRows.length; colorIndex++) {
            const row = colorRows[colorIndex];
            const rowStartY = yPos;
            const rowHeight = row.rowHeight;
            
            if (yPos + rowHeight > pageHeight - 55) {
              doc.addPage();
              yPos = margin + 10;
              rowsUsed = 0;
              
              doc.setFillColor(COLORS.primary);
              doc.rect(margin, yPos, contentWidth, 7, 'F');
              doc.setFontSize(7);
              doc.setFont('helvetica', 'bold');
              doc.setTextColor(COLORS.neutral);
              doc.text('#', colPositions.item, yPos + 4.5);
              doc.text('Product', colPositions.product, yPos + 4.5);
              doc.text('Color', colPositions.color, yPos + 4.5);
              doc.text('Details', colPositions.details, yPos + 4.5);
              doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
              doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
              doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
              yPos += 10;
            }

            if (rowsUsed % 2 === 0) {
              doc.setFillColor(COLORS.lightGray);
              doc.rect(margin, rowStartY - 2, contentWidth, rowHeight, 'F');
            }

            doc.setFontSize(6);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(COLORS.text);

            const textY = rowStartY + 1.2;
            const circleY = rowStartY + 1.5;
            const circleRadius = 0.9;

            if (colorIndex === 0) {
              doc.text(itemNumber.toString(), colPositions.item, textY);
            }

            if (colorIndex === 0) {
              let productName = item.productName || '';
              const maxProductWidth = 30;
              doc.setFontSize(5.5);
              while (doc.getTextWidth(productName) > maxProductWidth && productName.length > 3) {
                productName = productName.substring(0, productName.length - 1);
              }
              if (productName !== (item.productName || '')) {
                productName = productName.substring(0, productName.length - 3) + '...';
              }
              doc.text(productName, colPositions.product, textY);
              doc.setFontSize(6);
            }

            const colorCode = row.color.color?.code || '#CCCCCC';
            drawColorCircle(doc, colPositions.color + 2, circleY, circleRadius, colorCode);
            
            let colorName = row.color.color?.name || row.color.color?.code || 'Color';
            if (colorName.startsWith('#')) colorName = '';
            if (colorName.length > 10) colorName = colorName.substring(0, 8) + '..';
            doc.setFontSize(5.5);
            doc.text(colorName, colPositions.color + 6, textY);
            doc.setFontSize(6);

            if (row.detailsLines.length > 0 && row.detailsLines[0] !== '-') {
              doc.setFontSize(5.0);
              for (let i = 0; i < row.detailsLines.length; i++) {
                doc.text(row.detailsLines[i], colPositions.details, textY + (i * 3.2));
              }
              doc.setFontSize(6);
            } else {
              doc.text('-', colPositions.details, textY);
            }

            doc.setFontSize(5.5);
            doc.text(`${row.colorQty} ${unitLabel}`, colPositions.qty, textY, { align: 'right' });
            doc.text(formatPrice(row.colorUnitPrice), colPositions.unitPrice, textY, { align: 'right' });

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(5.5);
            doc.setTextColor(COLORS.primary);
            doc.text(formatPrice(row.colorTotal), colPositions.total, textY, { align: 'right' });
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(6);
            doc.setTextColor(COLORS.text);

            yPos += rowHeight;
            rowsUsed++;
          }
        } else {
          const rowHeight = 4.5;
          
          if (yPos + rowHeight > pageHeight - 55) {
            doc.addPage();
            yPos = margin + 10;
            rowsUsed = 0;
            
            doc.setFillColor(COLORS.primary);
            doc.rect(margin, yPos, contentWidth, 7, 'F');
            doc.setFontSize(7);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(COLORS.neutral);
            doc.text('#', colPositions.item, yPos + 4.5);
            doc.text('Product', colPositions.product, yPos + 4.5);
            doc.text('Color', colPositions.color, yPos + 4.5);
            doc.text('Details', colPositions.details, yPos + 4.5);
            doc.text('Qty', colPositions.qty, yPos + 4.5, { align: 'right' });
            doc.text('Unit Price', colPositions.unitPrice, yPos + 4.5, { align: 'right' });
            doc.text('Total', colPositions.total, yPos + 4.5, { align: 'right' });
            yPos += 10;
          }

          if (rowsUsed % 2 === 0) {
            doc.setFillColor(COLORS.lightGray);
            doc.rect(margin, yPos - 2, contentWidth, rowHeight, 'F');
          }

          doc.setFontSize(5.5);
          doc.setFont('helvetica', 'normal');
          
          const textY = yPos + 1.2;
          const circleY = yPos + 1.5;
          const circleRadius = 0.9;
          
          doc.text(itemNumber.toString(), colPositions.item, textY);
          
          let productName = item.productName || '';
          const maxProductWidth = 30;
          while (doc.getTextWidth(productName) > maxProductWidth && productName.length > 3) {
            productName = productName.substring(0, productName.length - 1);
          }
          if (productName !== (item.productName || '')) {
            productName = productName.substring(0, productName.length - 3) + '...';
          }
          doc.text(productName, colPositions.product, textY);
          
          drawColorCircle(doc, colPositions.color + 2, circleY, circleRadius, '#CCCCCC');
          doc.text('-', colPositions.details, textY);
          
          const totalQty = item.totalQuantity || 0;
          const unitLabel = getUnitLabel(item.orderUnit || 'piece');
          doc.text(`${totalQty} ${unitLabel}`, colPositions.qty, textY, { align: 'right' });
          doc.text(formatPrice(item.unitPrice || 0), colPositions.unitPrice, textY, { align: 'right' });
          
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(COLORS.primary);
          doc.text(formatPrice(item.total || 0), colPositions.total, textY, { align: 'right' });

          yPos += rowHeight;
          rowsUsed++;
        }
        itemNumber++;
      }
    }

    // ==================== SUMMARY SECTION ====================
    const summaryWidth = 85;
    const summaryX = pageWidth - margin - summaryWidth;
    
    doc.setFillColor(COLORS.lightGray);
    doc.roundedRect(summaryX, yPos, summaryWidth, 38, 2, 2, 'F');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('SUMMARY', summaryX + 3, yPos + 5);

    let summaryY = yPos + 9;
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.text);

    const subtotal = invoice.subtotal || 0;
    const vatPercentage = invoice.vatPercentage || 0;
    const vatAmount = invoice.vatAmount || 0;
    const discountPercentage = invoice.discountPercentage || 0;
    const discountAmount = invoice.discountAmount || 0;
    const shippingCost = invoice.shippingCost || 0;
    const finalTotal = invoice.finalTotal || 0;
    const amountPaid = invoice.amountPaid || 0;
    const dueAmount = invoice.dueAmount || 0;

    doc.text('Subtotal:', summaryX + 3, summaryY);
    doc.text(formatPrice(subtotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
    summaryY += 3.5;

    if (vatPercentage > 0) {
      doc.text(`VAT ${vatPercentage}%:`, summaryX + 3, summaryY);
      doc.text(formatPrice(vatAmount), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
      summaryY += 3.5;
    }

    if (discountPercentage > 0) {
      doc.text(`Discount ${discountPercentage}%:`, summaryX + 3, summaryY);
      doc.text(`-${formatPrice(discountAmount)}`, summaryX + summaryWidth - 3, summaryY, { align: 'right' });
      summaryY += 3.5;
    }

    if (shippingCost > 0) {
      doc.text('Shipping:', summaryX + 3, summaryY);
      doc.text(formatPrice(shippingCost), summaryX + summaryWidth - 3, summaryY, { align: 'right' });
      summaryY += 3.5;
    }

    doc.setDrawColor(COLORS.border);
    doc.line(summaryX + 3, summaryY - 1, summaryX + summaryWidth - 3, summaryY - 1);
    
    summaryY += 2;
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLORS.primary);
    doc.text('TOTAL:', summaryX + 3, summaryY);
    doc.text(formatPrice(finalTotal), summaryX + summaryWidth - 3, summaryY, { align: 'right' });

    const paymentY = summaryY + 4;
    
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    
    doc.setTextColor(COLORS.paid);
    doc.text(`Paid: ${formatPrice(amountPaid)} (${finalTotal > 0 ? ((amountPaid / finalTotal) * 100).toFixed(1) : '0'}%)`, summaryX + 3, paymentY);
    
    doc.setTextColor(COLORS.unpaid);
    doc.text(`Due: ${formatPrice(dueAmount)} (${finalTotal > 0 ? ((dueAmount / finalTotal) * 100).toFixed(1) : '0'}%)`, summaryX + 3, paymentY + 3.5);

    // ==================== REDESIGNED BANK DETAILS & BANKING TERMS SECTION ====================
    yPos += 48;
    
    if (yPos > pageHeight - 65) {
      doc.addPage();
      yPos = margin + 10;
    }
    
    const hasBankDetails = invoice.bankDetails && Object.values(invoice.bankDetails).some(v => v && v.toString().trim());
    const hasBankingTerms = invoice.bankingTerms && invoice.bankingTerms.length > 0 && 
                            invoice.bankingTerms.some(term => term.title?.trim() || term.value?.trim());
    
    if (hasBankDetails || hasBankingTerms) {
      const bankingBoxX = margin;
      const bankingBoxY = yPos;
      const bankingBoxWidth = contentWidth;
      
      let leftColumnHeight = 25;
      let rightColumnHeight = 25;
      
      if (hasBankDetails) {
        const bankDetails = invoice.bankDetails;
        let lineCount = 0;
        if (bankDetails.bankName && bankDetails.bankName.toString().trim()) lineCount++;
        if (bankDetails.accountName && bankDetails.accountName.toString().trim()) lineCount++;
        if (bankDetails.accountNumber && bankDetails.accountNumber.toString().trim()) lineCount++;
        if (bankDetails.accountType && bankDetails.accountType.toString().trim()) lineCount++;
        if (bankDetails.routingNumber && bankDetails.routingNumber.toString().trim()) lineCount++;
        if (bankDetails.swiftCode && bankDetails.swiftCode.toString().trim()) lineCount++;
        if (bankDetails.iban && bankDetails.iban.toString().trim()) lineCount++;
        if (bankDetails.bankAddress && bankDetails.bankAddress.toString().trim()) lineCount++;
        leftColumnHeight = Math.max(leftColumnHeight, (lineCount * 4) + 20);
      }
      
      if (hasBankingTerms) {
        const validTerms = invoice.bankingTerms.filter(term => term.title?.trim() || term.value?.trim());
        let totalHeight = 0;
        
        const measureTextHeight = (text, width, fontSize = 5.5) => {
          const charsPerLine = Math.floor(width / 3.5);
          const lines = Math.ceil(text.length / charsPerLine);
          return lines * 3.5;
        };
        
        validTerms.forEach(term => {
          if (term.title && term.value) {
            const titleText = `${term.title}: `;
            const fullText = titleText + term.value;
            const textHeight = measureTextHeight(fullText, (contentWidth / 2) - 15, 5.5);
            totalHeight += Math.max(textHeight, 5);
          } else if (term.title) {
            const textHeight = measureTextHeight(term.title, (contentWidth / 2) - 15, 5.5);
            totalHeight += Math.max(textHeight, 5);
          } else if (term.value) {
            const textHeight = measureTextHeight(term.value, (contentWidth / 2) - 15, 5.5);
            totalHeight += Math.max(textHeight, 5);
          }
          totalHeight += 3;
        });
        
        rightColumnHeight = Math.max(rightColumnHeight, totalHeight + 20);
      }
      
      const boxHeight = Math.max(leftColumnHeight, rightColumnHeight, 50) + 10;
      
      doc.setFillColor(COLORS.lightGray);
      doc.roundedRect(bankingBoxX, bankingBoxY, bankingBoxWidth, boxHeight, 2, 2, 'F');
      
      // doc.setDrawColor(COLORS.primary);
      // doc.setLineWidth(0.3);
      // doc.roundedRect(bankingBoxX, bankingBoxY, bankingBoxWidth, boxHeight, 2, 2, 'S');
      
      const separatorX = bankingBoxX + (contentWidth / 2);
      doc.setDrawColor(COLORS.border);
      doc.setLineWidth(0.2);
      doc.line(separatorX, bankingBoxY + 8, separatorX, bankingBoxY + boxHeight - 8);
      
      const leftX = bankingBoxX + 8;
      let leftY = bankingBoxY + 8;
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.primary);
      doc.text('BANK DETAILS', leftX, leftY);
      
      leftY += 6;
      
      if (hasBankDetails) {
        doc.setFontSize(6);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(COLORS.text);
        
        const bankDetails = invoice.bankDetails;
        const maxWidth = (contentWidth / 2) - 15;
        
        const drawBankLine = (label, value, y) => {
          if (value && value.toString().trim()) {
            const labelText = `${label}: `;
            doc.setFont('helvetica', 'bold');
            doc.text(labelText, leftX, y);
            
            const labelWidth = doc.getTextWidth(labelText);
            doc.setFont('helvetica', 'normal');
            
            const remainingWidth = maxWidth - labelWidth;
            const valueStr = value.toString();
            const valueWidth = doc.getTextWidth(valueStr);
            
            if (valueWidth <= remainingWidth) {
              doc.text(valueStr, leftX + labelWidth, y);
              return 4.5;
            } else {
              const wrappedLines = doc.splitTextToSize(valueStr, maxWidth);
              for (let i = 0; i < wrappedLines.length; i++) {
                const lineX = i === 0 ? leftX + labelWidth : leftX + 3;
                doc.text(wrappedLines[i], lineX, y + (i * 3.2));
              }
              return 4.5 + ((wrappedLines.length - 1) * 3.2);
            }
          }
          return 0;
        };
        
        if (bankDetails.bankName && bankDetails.bankName.toString().trim()) {
          const height = drawBankLine('Bank Name', bankDetails.bankName, leftY);
          leftY += height;
        }
        if (bankDetails.accountName && bankDetails.accountName.toString().trim()) {
          const height = drawBankLine('Account Name', bankDetails.accountName, leftY);
          leftY += height;
        }
        if (bankDetails.accountNumber && bankDetails.accountNumber.toString().trim()) {
          const height = drawBankLine('Account Number', bankDetails.accountNumber, leftY);
          leftY += height;
        }
        if (bankDetails.accountType && bankDetails.accountType.toString().trim()) {
          const height = drawBankLine('Account Type', bankDetails.accountType, leftY);
          leftY += height;
        }
        if (bankDetails.routingNumber && bankDetails.routingNumber.toString().trim()) {
          const height = drawBankLine('Routing Number', bankDetails.routingNumber, leftY);
          leftY += height;
        }
        if (bankDetails.swiftCode && bankDetails.swiftCode.toString().trim()) {
          const height = drawBankLine('SWIFT Code', bankDetails.swiftCode, leftY);
          leftY += height;
        }
        if (bankDetails.iban && bankDetails.iban.toString().trim()) {
          const height = drawBankLine('IBAN', bankDetails.iban, leftY);
          leftY += height;
        }
        if (bankDetails.bankAddress && bankDetails.bankAddress.toString().trim()) {
          const height = drawBankLine('Bank Address', bankDetails.bankAddress, leftY);
          leftY += height;
        }
      } else {
        doc.setFontSize(6);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(COLORS.textLight);
        doc.text('No bank details provided', leftX, leftY);
      }
      
      const rightX = separatorX + 8;
      let rightY = bankingBoxY + 8;
      
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.primary);
      doc.text('BANKING TERMS', rightX, rightY);
      
      rightY += 6;
      
      if (hasBankingTerms) {
        doc.setFontSize(5.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(COLORS.text);
        
        const validTerms = invoice.bankingTerms.filter(term => term.title?.trim() || term.value?.trim());
        const termWidth = (contentWidth / 2) - 20;
        const bulletPoint = '• ';
        
        for (const term of validTerms) {
          if (term.title && term.value) {
            const titleText = `${term.title}: `;
            doc.setFont('helvetica', 'bold');
            doc.text(titleText, rightX, rightY);
            
            const titleWidth = doc.getTextWidth(titleText);
            doc.setFont('helvetica', 'normal');
            
            const valueLines = doc.splitTextToSize(term.value, termWidth - titleWidth);
            for (let i = 0; i < valueLines.length; i++) {
              const lineX = i === 0 ? rightX + titleWidth : rightX + 3;
              doc.text(valueLines[i], lineX, rightY + (i * 3.2));
            }
            rightY += 3.2 * Math.max(1, valueLines.length) + 2;
          } else if (term.title) {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(COLORS.primary);
            doc.text(bulletPoint + term.title, rightX, rightY);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(COLORS.text);
            rightY += 5;
          } else if (term.value) {
            const valueLines = doc.splitTextToSize(term.value, termWidth);
            for (const line of valueLines) {
              doc.text(bulletPoint + line, rightX, rightY);
              rightY += 3.5;
            }
            rightY += 1.5;
          }
        }
      } else {
        doc.setFontSize(6);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(COLORS.textLight);
        doc.text('No banking terms provided', rightX, rightY);
      }
      
      yPos += boxHeight + 10;
    } else {
      yPos += 15;
    }

    // ==================== NOTES & TERMS ====================
    yPos += 5;
    
    if (yPos > pageHeight - 35) {
      doc.addPage();
      yPos = margin + 10;
    }

    doc.setDrawColor(COLORS.border);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 5;

    if (invoice.notes) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.primary);
      doc.text('NOTES:', margin, yPos);
      
      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.textLight);
      
      const noteLines = doc.splitTextToSize(invoice.notes, contentWidth);
      doc.text(noteLines, margin, yPos + 3.5);
      yPos += (noteLines.length * 3.5) + 5;
    }

    if (invoice.terms) {
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLORS.primary);
      doc.text('TERMS & CONDITIONS:', margin, yPos);
      
      doc.setFontSize(6);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLORS.textLight);
      
      const termsLines = doc.splitTextToSize(invoice.terms, contentWidth);
      doc.text(termsLines, margin, yPos + 3.5);
    }

    // ==================== FOOTER ====================
    const footerY = pageHeight - 5;
    
    doc.setDrawColor(COLORS.border);
    doc.setLineWidth(0.2);
    doc.line(margin, footerY - 2, pageWidth - margin, footerY - 2);
    
    doc.setFontSize(5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.textLight);
    
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).replace(/,/g, '');
    
    doc.text(`Invoice #${invoice.invoiceNumber} | Generated ${dateString}`, margin, footerY);
    doc.text(invoice.company?.companyName || 'Jute Craftify', pageWidth - margin, footerY, { align: 'right' });

    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, fileName: `Invoice_${invoice.invoiceNumber}.pdf` };
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};