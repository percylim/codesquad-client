import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExportInvoicePdf = (
  data,
  companyInfo,
  customerInfo,
  invoiceType,
  invoiceTotal,
  invoiceDiscountTotal,
  invoiceTaxTotal,
  invoiceNetTotal,
  salesRep,
  remark1,
  remark2,
  remark3,
  remark4,
  remark5,
  remark6
) => {
  const doc = new jsPDF();

  // ========== 1. COMPANY HEADER ==========
  const company = companyInfo?.[0] || {};
  const companyName = company.companyName || 'Company Name';

  const addressParts = [
    company.address1,
    company.address2,
    company.postCode,
    company.city,
    company.state,
    company.country
  ].filter(part => part && part.trim() !== '');
  const fullAddress = addressParts.join(', ');

  const phones = [company.telNo1, company.telNo2, company.telNo3].filter(p => p && p.trim() !== '');
  const telText = phones.length ? `Tel: ${phones.join(' / ')}` : '';

  doc.setFontSize(16);
  doc.text(companyName, 105, 20, { align: 'center' });
  doc.setFontSize(10);
  if (fullAddress) {
    doc.text(fullAddress, 105, 28, { align: 'center' });
  }
  if (telText) {
    doc.text(telText, 105, 34, { align: 'center' });
  }

  // ========== 2. CUSTOMER & INVOICE DETAILS ==========
  const customer = customerInfo?.[0] || {};
  const firstItem = data[0] || {};

  const customerName = customer.supplierName || firstItem.customerName || '';
  const customerID = customer.supplierID || firstItem.customerID || '';

  let currentY = 50;

  doc.text(`Customer ID: ${customerID}`, 14, currentY);
  currentY += 6;
  doc.text(`Customer: ${customerName}`, 14, currentY);
  currentY += 6;

  // Build customer address with multi-line support
  const custAddressParts = [
    customer.address1,
    customer.address2,
    customer.postCode,
    customer.city,
    customer.state,
    customer.country
  ].filter(part => part && part.trim() !== '');

  let addressLines = [];

  if (customer.address1) {
    let line1 = customer.address1;
    if (customer.address2) line1 += `, ${customer.address2}`;
    addressLines.push(line1);
  }

  if (customer.postCode || customer.city || customer.state) {
    let line2 = [customer.postCode, customer.city, customer.state].filter(p => p).join(', ');
    if (line2) addressLines.push(line2);
  }

  if (customer.country) {
    addressLines.push(customer.country);
  }

  if (addressLines.length > 0) {
    doc.text('Address:', 14, currentY);
    let addressY = currentY;
    for (let i = 0; i < addressLines.length; i++) {
      addressY += 6;
      doc.text(addressLines[i], 30, addressY);
    }
    currentY = addressY + 6;
  } else if (custAddressParts.length > 0) {
    const singleLineAddress = custAddressParts.join(', ');
    doc.text(`Address: ${singleLineAddress}`, 14, currentY);
    currentY += 6;
  }

  // ✅ CUSTOMER PHONE NUMBERS
  const custPhones = [
    customer.telNo1,
    customer.telNo2,
    customer.telNo3
  ].filter(p => p && p.trim() !== '');

  if (custPhones.length > 0) {
    const phoneText = `Tel: ${custPhones.join(' / ')}`;
    doc.text(phoneText, 14, currentY);
    currentY += 6;
  }

  // Invoice details (right column)
  doc.text(`Invoice No: ${firstItem.invoiceNo || ''}`, 120, 50);
  doc.text(`Date: ${firstItem.txnDate || firstItem.invoiceDate || ''}`, 120, 56);
  doc.text(`Due Date: ${firstItem.dueDate || ''}`, 120, 62);
  if (salesRep) {
    doc.text(`Sales Rep: ${salesRep}`, 120, 68);
  }

  // ========== 3. TABLE ==========
  const tableHeaders = ['#', 'Product ID', 'Product Name', 'Qty', 'Unit Price', 'Discount', 'Tax', 'Net Total'];

  const bodyRows = data.map((item, idx) => [
    idx + 1,
    item.productID || '',
    item.productName || '',
    Number(item.salesQuantity || item.salesQty || 0).toFixed(3),
    Number(item.unitPrice || 0).toFixed(2),
    Number(item.itemDiscount || 0).toFixed(2),
    Number(item.itemTax || 0).toFixed(2),
    Number(item.itemNetTotal || 0).toFixed(2)
  ]);

  bodyRows.push(['', 'Subtotal:', '', '', '', '', '', Number(invoiceTotal || 0).toFixed(2)]);
  bodyRows.push(['', 'Discount:', '', '', '', '', '', Number(invoiceDiscountTotal || 0).toFixed(2)]);
  bodyRows.push(['', 'Tax:', '', '', '', '', '', Number(invoiceTaxTotal || 0).toFixed(2)]);
  bodyRows.push(['', 'Grand Total:', '', '', '', '', '', Number(invoiceNetTotal || 0).toFixed(2)]);

  const tableStartY = currentY + 6;

  autoTable(doc, {
    startY: tableStartY,
    head: [tableHeaders],
    body: bodyRows,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' },
      1: { cellWidth: 25 },
      2: { cellWidth: 'auto' },
      3: { cellWidth: 20, halign: 'right' },
      4: { cellWidth: 25, halign: 'right' },
      5: { cellWidth: 25, halign: 'right' },
      6: { cellWidth: 25, halign: 'right' },
      7: { cellWidth: 30, halign: 'right' }
    },
  didDrawCell: (cellData) => {
  if (cellData.row.index === bodyRows.length - 1 && cellData.column.index === 7) {
    doc.setFont('helvetica', 'bold');
    doc.text(cellData.cell.text, cellData.cell.x + cellData.cell.width - 5, cellData.cell.y + 7, { align: 'right' });
    doc.setFont('helvetica', 'normal');
  }
}
  });

  // ========== 4. REMARKS ==========
  const finalY = doc.lastAutoTable.finalY + 10;
  
  // Get remarks from firstItem or from passed parameters
  const remarks = [
    firstItem.remark1 || remark1,
    firstItem.remark2 || remark2,
    firstItem.remark3 || remark3,
    firstItem.remark4 || remark4,
    firstItem.remark5 || remark5,
    firstItem.remark6 || remark6
  ].filter(r => r && r.trim() !== '');

  if (remarks.length > 0) {
    doc.setFontSize(9);
    doc.text('Remarks:', 14, finalY);
    let y = finalY + 6;
    for (const remark of remarks) {
      const splitRemark = doc.splitTextToSize(remark, 170);
      doc.text(splitRemark, 20, y);
      y += 5 * splitRemark.length;
    }
  }

  // ========== 5. SAVE PDF ==========
  const filename = `Invoice_${firstItem.invoiceNo || 'export'}.pdf`;
  doc.save(filename);
};

export default ExportInvoicePdf;