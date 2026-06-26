import React from 'react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

const PNLPDF = (companyInfo, revData, costData, expData, totalRev, totalCostOfSales, totalExpenses, profit, taxOnYear, startDate, endDate) => {
    // ✅ CORRECT: Use 'new' keyword
    const doc = new jsPDF('p', 'mm', 'a4');
    const months = [
        '', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

    const addFooters = doc => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(12);
        for (var i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.text('Page ' + String(i) + ' of ' + String(pageCount), 170, 30);
        }
    };

    const tableColumn = [" ", "REVENUE", "RM"];
    const tableColumn1 = ["Less: ", "COST OF SALES", "RM"];
    const tableColumn2 = ["Less: ", "EXPENDITURE", "RM"];

    const companyName = companyInfo[0]?.companyName || '';
    var companyNo = companyInfo[0]?.registerNo || '';
    var incomeTaxNo = companyInfo[0]?.incomeTaxNo || '';
    var address = (companyInfo[0]?.address1 || '') + ' ' + (companyInfo[0]?.address2 || '') + ', ' + (companyInfo[0]?.postCode || '') + ', ' + (companyInfo[0]?.city || '') + ', ' + (companyInfo[0]?.state || '') + ', ' + (companyInfo[0]?.country || '');
    var businessCode = companyInfo[0]?.businessCode || '';

    // Format numbers
    const grossProfit = parseFloat(totalRev - totalCostOfSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const gpMargin = parseFloat((totalRev - totalCostOfSales) / totalRev).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const netProfit = parseFloat((profit - taxOnYear)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    const formattedTotalRev = parseFloat(totalRev).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const formattedTotalCost = parseFloat(totalCostOfSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const formattedProfit = parseFloat(profit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const formattedTax = parseFloat(taxOnYear).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    // Build table rows
    const tableRows = revData.map(item => [
        item.addNo || '',
        item.glName || '',
        parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    ]);

    const tableRows1 = costData.map(item => [
        item.addNo || '',
        item.glName || '',
        parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    ]);

    const tableRows2 = expData.map(item => [
        item.addNo || '',
        item.glName || '',
        parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    ]);

    // TABLE 1: REVENUE
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
        margin: { top: 50, bottom: 50, left: 5, right: 5 },
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
            var adjLeft = (62 - companyName.length);
            doc.setFontSize(30);
            doc.text(companyName, adjLeft, 10);
            doc.setFontSize(8);
            adjLeft = (90 - companyNo.length);
            doc.text('( Co. No. ' + companyNo + " )", adjLeft, 16);
            adjLeft = (120 - address.length);
            if (address.length === 0) { adjLeft = 0; }
            doc.text(address, adjLeft, 20);
            adjLeft = (95 - incomeTaxNo.length);
            doc.text(incomeTaxNo, adjLeft, 25);
            adjLeft = (80 - businessCode.length);
            doc.text('( KODE PERNIAGAAN: ' + businessCode + " )", adjLeft, 30);
            doc.setLineWidth(1.0);
            doc.setDrawColor(0, 0, 0);
            doc.line(10, 32, 200, 32);
            doc.setFontSize(10);    
            var month = endDate.slice(0, 2) + ' ' + months[parseInt(endDate.slice(3, 5))] + ' ' + endDate.slice(6, 10);
            doc.text('PROFIT & LOSS ACCOUNT AS FROM ' + startDate+ ' TO '+endDate, 50, 37);
            doc.line(5, 32, 205, 32);
            doc.line(5, 40, 205, 40);
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
            doc.setLineWidth(.2);
            doc.setFontSize(12);
        },
        columnStyles: {
            0: { halign: 'right', columnWidth: 15 },
            1: { halign: 'left', columnWidth: 130 },
            2: { halign: 'right', columnWidth: 55 },
        },
    });

    let finalY = doc.lastAutoTable.finalY || 42;

    doc.setFontSize(12);
    doc.text("TOTAL REVENUE :", 90, finalY + 5);
    doc.text(String(formattedTotalRev), 203, finalY + 5, { align: 'right' });

    // TABLE 2: COST OF SALES
    autoTable(doc, {
        head: [tableColumn1],
        body: tableRows1,
        startY: finalY + 10,
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
        margin: { top: 50, bottom: 50, left: 5, right: 5 },
        columnStyles: {
            0: { halign: 'right', columnWidth: 15 },
            1: { halign: 'left', columnWidth: 130 },
            2: { halign: 'right', columnWidth: 55 },
        },
        footStyles: {
            fillColor: [217, 217, 214],
            textColor: [0, 0, 0],
            fontSize: 12,
            halign: 'right',
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
        },
    });

    let finalY2 = doc.lastAutoTable.finalY || finalY + 10;

    doc.setFontSize(12);
    doc.text("TOTAL COST OF SALES :", 90, finalY2 + 5);
    doc.text(String(formattedTotalCost), 203, finalY2 + 5, { align: 'right' });
    doc.text("GROSS PROFIT :", 90, finalY2 + 10);
    doc.text(String(grossProfit), 203, finalY2 + 10, { align: 'right' });
    doc.text("GROSS PROFIT MARGIN :", 90, finalY2 + 15);
    doc.text(String(gpMargin), 203, finalY2 + 15, { align: 'right' });

    // TABLE 3: EXPENDITURE
    autoTable(doc, {
        head: [tableColumn2],
        body: tableRows2,
        startY: finalY2 + 20,
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
        margin: { top: 50, bottom: 50, left: 5, right: 5 },
        columnStyles: {
            0: { halign: 'right', columnWidth: 15 },
            1: { halign: 'left', columnWidth: 130 },
            2: { halign: 'right', columnWidth: 55 },
        },
        footStyles: {
            fillColor: [217, 217, 214],
            textColor: [0, 0, 0],
            fontSize: 12,
            halign: 'right',
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
        },
    });

    let finalY3 = doc.lastAutoTable.finalY || finalY2 + 20;

    doc.setFontSize(12);
    doc.text("CURRENT YEAR NET PROFIT/(LOSS) BEFORE TAX :", 40, finalY3 + 10);
    doc.text(String(formattedProfit), 203, finalY3 + 10, { align: 'right' });
    doc.text("LESS TAX FOR THE YEAR :", 40, finalY3 + 15);
    doc.text(String(formattedTax), 203, finalY3 + 15, { align: 'right' });
    doc.text("NET PROFIT/(LOSS) AFTER TAX :", 40, finalY3 + 20);
    doc.text(String(netProfit), 203, finalY3 + 20, { align: 'right' });

    addFooters(doc);
    doc.save('ProfitNLoss-' + endDate + '.pdf');
};

export default PNLPDF;