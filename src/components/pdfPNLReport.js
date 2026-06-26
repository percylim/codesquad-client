import React from 'react';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';  // ← CHANGED: import as function
import { format } from "date-fns";
import Moment from "moment";

const url = process.env.REACT_APP_SERVER_URL;

const PNLREPORTPDF = (companyInfo, Data, startDate, endDate) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const months = ['', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  // Safe company info
  const companyName = companyInfo[0]?.companyName || '';
  const companyNo = companyInfo[0]?.registerNo || '';
  const incomeTaxNo = companyInfo[0]?.incomeTaxNo || '';
  const address = (companyInfo[0]?.address1 || '') + ' ' + (companyInfo[0]?.address2 || '') + ', ' + (companyInfo[0]?.postCode || '') + ', ' + (companyInfo[0]?.city || '') + ', ' + (companyInfo[0]?.state || '') + ', ' + (companyInfo[0]?.country || '');
  const businessCode = companyInfo[0]?.businessCode || '';

  const tableColumn = ["", "", "", "RM"];
  const tableRows = [];

  Data.forEach(item => {
    if (item.totalText === 'RM') {
      item.totalText = '';
    }
    tableRows.push([
      item.addNo || '',
      item.glName || '',
      item.totalText || '',
      parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    ]);
  });

  // ============================================
  // ✅ FIXED: Using autoTable function
  // ============================================
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 42,
    theme: 'grid',
    bodyStyles: { lineColor: [0, 0, 0] },
    headerStyles: {
      fillColor: [255, 255, 255],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
      valign: 'middle',
      halign: 'center',
    },
    margin: {
      top: 50,
      bottom: 50,
      left: 5,
      right: 5,
    },
    footStyles: {
      fillColor: [217, 217, 214],
      textColor: [0, 0, 0],
      fontSize: 12,
      halign: 'right',
      lineWidth: 0.2,
      lineColor: [0, 0, 0],
    },
    showFoot: "lastPage",
    pageBreak: 'auto',
    showHead: 'everyPage',
    tableWidth: 'auto',
    horizontalPageBreak: true,
    columnStyles: {
      0: { halign: 'right' },
      1: { halign: 'left' },
      2: { halign: 'left' },
      3: { halign: 'right' },
    },
    didDrawPage: function(data) {
      var adjLeft = (62 - companyName.length);
      doc.setFontSize(30);
      doc.text(companyName, adjLeft, 10);
      doc.setFontSize(8);
      adjLeft = (90 - companyNo.length);
      doc.text('( Co. No. ' + companyNo + " )", adjLeft, 16);
      adjLeft = (120 - address.length);
      if (address.length === 0) { adjLeft = 0 }
      doc.text(address, adjLeft, 20);
      adjLeft = (95 - incomeTaxNo.length);
      doc.text(incomeTaxNo, adjLeft, 25);
      adjLeft = (80 - businessCode.length);
      doc.text('( KODE PERNIAGAAN: ' + businessCode + " )", adjLeft, 30);
      doc.setLineWidth(1.0);
      doc.setDrawColor(0, 0, 0);
      doc.line(10, 32, 200, 32);
      doc.setFontSize(10);
      var month = endDate.slice(0, 2) + ' ' + months[endDate.slice(3, 5)] + ' ' + endDate.slice(6, 10);
      doc.text('PROFIT & LOSS ACCOUNT AS AT ' + month, 50, 37);
      doc.line(5, 32, 205, 32);
      doc.line(5, 40, 205, 40);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setLineWidth(.2);
      doc.setFontSize(12);
    }
  });

  // ============================================
  // ✅ FIXED: Getting final Y position
  // ============================================
  const finalY = doc.lastAutoTable?.finalY || 42;
  doc.setFontSize(12);

  // ============================================
  // PAGE NUMBERS
  // ============================================
  const addFooters = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), 170, 30);
    }
  };
  addFooters(doc);

  // ============================================
  // SAVE
  // ============================================
  doc.save('ProfitNLoss-' + endDate + '.pdf');
};

export default PNLREPORTPDF;