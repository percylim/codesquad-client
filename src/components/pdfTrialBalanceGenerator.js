import React from 'react';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';  // ✅ THIS IS THE CORRECT IMPORT
import { format } from "date-fns";

const ExportTrialBalancePDF = (data, reportType, totalDebit, totalCredit, startDate, endDate) => {
  const companyName = localStorage.getItem('companyName');
  const doc = new jsPDF('p', 'mm', 'a4');
  const todayDate = format(new Date(), "dd/MM/yyyy");
  
  let invoiceTitle = '';
  if (reportType === 'OTB') {
    invoiceTitle = 'OP Balance Report';
  } else if (reportType === 'YTB') {
    invoiceTitle = 'Yearly Trial Balance from ' + startDate + ' to ' + endDate;
  } else if (reportType === 'MTB') {
    invoiceTitle = 'Monthly Trial Balance from ' + startDate + ' to ' + endDate;
  }

  const tableColumn = ["G/L No.", "G/L Sub", "G/L Name", "Debit", "Credit"];
  const tableRows = [];
  let totalDebitCalc = 0;
  let totalCreditCalc = 0;

  data.forEach(item => {
    totalDebitCalc += item.debit;
    totalCreditCalc += item.credit;
    tableRows.push([
      item.glNo,
      item.glSub,
      item.glName,
      parseFloat(item.debit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(item.credit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    ]);
  });

  totalDebitCalc = parseFloat(totalDebitCalc).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  totalCreditCalc = parseFloat(totalCreditCalc).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  // ✅ FIXED: Use autoTable correctly
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: 'grid',
    bodyStyles: { lineColor: [0, 0, 0] },
    headerStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
      valign: 'middle',
      halign: 'center',
    },
    margin: {
      top: 40,
      bottom: 70,
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
      0: { halign: 'center' },
      1: { halign: 'center' },
      2: { halign: 'left' },
      3: { halign: 'right' },
      4: { halign: 'right' },
    },
    didDrawPage: function(data) {
      doc.setFontSize(30);
      doc.text(companyName || 'Company Name', 30, 10);
      doc.setFontSize(8);
      doc.setLineWidth(1.0);
      doc.setDrawColor(0, 0, 0);
      doc.line(3, 21, 200, 21);
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 153);
      doc.text(invoiceTitle, 10, 30);
      doc.setTextColor(0, 0, 0);
    }
  });

  // Add totals
  const finalY = doc.lastAutoTable.finalY || 40;
  doc.setFontSize(12);
  doc.text("Report Total :", 110, finalY + 5);
  doc.text(totalDebitCalc, 178, finalY + 5, { align: 'right' });
  doc.text(totalCreditCalc, 204, finalY + 5, { align: 'right' });

  // Page numbers
  const addFooters = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), 170, 30);
    }
  };
  
  addFooters(doc);

  let ReportName = '';
  if (reportType === 'OTB') ReportName = 'OpBalance-' + todayDate;
  else if (reportType === 'MTB') ReportName = 'MonthTrialBalance-' + todayDate;
  else if (reportType === 'YTB') ReportName = 'YearTrialBalance-' + todayDate;
  
  doc.save(ReportName);
};

export default ExportTrialBalancePDF;