import React from 'react';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { format } from "date-fns";

const companyName = localStorage.getItem('companyName');

const ExportSalesAnalysisPDF = (data, reportType, totalSales, totalDebit, totalCredit, totalNetSales) => {
  // 初始化 jsPDF
  const doc = new jsPDF('p', 'mm', 'a4');
  var todayDate = new Date();
  var invoiceTitle = '';
  
  // 格式化今天日期
  todayDate = format(todayDate, "dd/MM/yyyy");
  
  // 添加页脚函数
  const addFooters = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), 170, 30);
    }
  };
  
  // 设置表格列和标题
  let tableColumn = [];
  if (reportType === 'YEAR') {
    tableColumn = ["Year", "Sales", "Debit", "Credit", "Net Sales"];
    invoiceTitle = 'Yearly Sales Analysis Report';
  } else {
    tableColumn = ["Month", "Sales", "Debit", "Credit", "Net Sales"];
    invoiceTitle = 'Monthly Sales Analysis Report';
  }

  // 构建表格行数据
  const tableRows = [];
  
  // 格式化总计金额
  totalSales = parseFloat(totalSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  totalDebit = parseFloat(totalDebit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  totalCredit = parseFloat(totalCredit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  totalNetSales = parseFloat(totalNetSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  // 遍历数据填充表格行
  data.forEach(item => {
    const ticketData = [
      item.year || item.month || '',
      parseFloat(item.sales || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(item.debit || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(item.credit || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(item.netSales || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    ];
    tableRows.push(ticketData);
  });

  // 使用 autoTable 生成表格
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: 'grid',
    headStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
      valign: 'middle',
      halign: 'center',
      fillColor: [240, 240, 240],
    },
    bodyStyles: { 
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
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
    didDrawPage: function(data) {
      // 页眉 - 公司名称
      doc.setFontSize(30);
      doc.setTextColor(0, 0, 0);
      doc.text(companyName || '', 30, 10);
      
      // 分隔线
      doc.setLineWidth(1.0);
      doc.setDrawColor(0, 0, 0);
      doc.line(3, 21, 200, 21);
      
      // 报告标题
      doc.setFontSize(22);
      doc.setTextColor(0, 0, 153);
      doc.text(invoiceTitle, 10, 30);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
    },
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right' },
    },
  });
  
  // 获取表格结束位置
  let finalY = doc.lastAutoTable.finalY || 80;
  
  // 添加总计行
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Report Total :", 10, finalY + 10);
  
  if (reportType === 'MONTH') {
    doc.text(totalSales, 102, finalY + 10, { align: 'right' });
    doc.text(totalDebit, 129, finalY + 10, { align: 'right' });
    doc.text(totalCredit, 160, finalY + 10, { align: 'right' });
    doc.text(totalNetSales, 203, finalY + 10, { align: 'right' });
  } else {
    doc.text(totalSales, 81, finalY + 10, { align: 'right' });
    doc.text(totalDebit, 114, finalY + 10, { align: 'right' });
    doc.text(totalCredit, 151, finalY + 10, { align: 'right' });
    doc.text(totalNetSales, 203, finalY + 10, { align: 'right' });
  }

  // 添加页脚
  addFooters(doc);
  
  // 生成文件名并保存
  let ReportName = (reportType === 'YEAR') ? 'YearlySalesAnalysis-' + todayDate : 'MonthlySalesAnalysis-' + todayDate;
  doc.save(ReportName);
};

export default ExportSalesAnalysisPDF;