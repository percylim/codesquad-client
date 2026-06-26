import React from 'react';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import Moment from "moment";

const url = process.env.REACT_APP_SERVER_URL;

const BSPDF = (companyInfo, fixedAssetData, currentAssetData, ARReceivableData, stockData,
    accountPayableData, intangibleAssetData, otherAssetData, currentLiabilityData,
    longTermLiabilityData, equityData, ownerEquityData, incomeSummaryData,
    totalFixedAsset, totalCurrentAsset, totalArAmt, closeStockTotal, intTotal, otherTotal,
    totalCurrentLiability, totalAccountPayable, totalLongTermLiability, totalOwnerEquity, totalIncomeSummary, startDate, endDate) => {

    const doc = new jsPDF('p', 'mm', 'a4');
    const months = ['', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

    const companyName = companyInfo[0]?.companyName || '';
    var companyNo = companyInfo[0]?.registerNo || '';
    var incomeTaxNo = companyInfo[0]?.incomeTaxNo || '';
    var address = (companyInfo[0]?.address1 || '') + ' ' + (companyInfo[0]?.address2 || '') + ', ' + (companyInfo[0]?.postCode || '') + ', ' + (companyInfo[0]?.city || '') + ', ' + (companyInfo[0]?.state || '') + ', ' + (companyInfo[0]?.country || '');
    var businessCode = companyInfo[0]?.businessCode || '';

    const tableColumn = [" ", "FIXED ASSET", "RM"];
    const tableColumn1 = [" ", "CURRENT ASSETS", "RM"];
    const tableColumn2 = [" ", "INTANGIBLE ASSETS", "RM"];
    const tableColumn3 = [" ", "OTHER ASSETS", "RM"];
    const tableColumn4 = [" ", "CURRENT LIABILITIES", "RM"];
    const tableColumn5 = [" ", "LONG TERM LIABILITIES", "RM"];
    const tableColumn6 = [" ", "OWNER EQUITIES", "RM"];

    // Build table rows
    const tableRows = fixedAssetData.map(item => [
        item.addNo || '',
        item.glName || '',
        parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    ]);

    const tableRows1 = [];
    currentAssetData.forEach(item => {
        tableRows1.push([
            item.addNo || '',
            item.glName || '',
            parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        ]);
    });
    ARReceivableData.forEach(item => {
        tableRows1.push([
            item.addNo || '',
            item.glName || '',
            parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        ]);
    });
    stockData.forEach(item => {
        tableRows1.push([
            item.addNo || '',
            item.glName || '',
            parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        ]);
    });

    const tableRows4 = intangibleAssetData.map(item => [
        item.addNo || '',
        item.glName || '',
        parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    ]);

    const tableRows5 = otherAssetData.map(item => [
        item.addNo || '',
        item.glName || '',
        parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    ]);

    const tableRows6 = [];
    currentLiabilityData.forEach(item => {
        tableRows6.push([
            item.addNo || '',
            item.glName || '',
            parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        ]);
    });
    accountPayableData.forEach(item => {
        tableRows6.push([
            item.addNo || '',
            item.glName || '',
            parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        ]);
    });

    const tableRows7 = longTermLiabilityData.map(item => [
        item.addNo || '',
        item.glName || '',
        parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    ]);

    const tableRows8 = [];
    equityData.forEach(item => {
        tableRows8.push([
            item.addNo || '',
            item.glName || '',
            parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        ]);
    });
    ownerEquityData.forEach(item => {
        tableRows8.push([
            item.addNo || '',
            item.glName || '',
            parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        ]);
    });
    incomeSummaryData.forEach(item => {
        tableRows8.push([
            item.addNo || '',
            item.glName || '',
            parseFloat(item.amount || 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        ]);
    });

    // Format totals
    var totalLiabilityOwnerEquity = parseFloat(totalCurrentLiability + totalLongTermLiability + totalOwnerEquity + totalIncomeSummary).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    var CurrentAssetTotal = parseFloat(totalCurrentAsset + totalArAmt + closeStockTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    var TotalAsset = parseFloat(totalCurrentAsset + totalArAmt + closeStockTotal + totalFixedAsset + intTotal + otherTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    var totalCurrentLiabilityFormatted = parseFloat(totalCurrentLiability + totalAccountPayable).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    var totalOwnerEquityFormatted = parseFloat(totalOwnerEquity + totalIncomeSummary).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    const addFooters = doc => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(12);
        for (var i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.text('Page ' + String(i) + ' of ' + String(pageCount), 170, 30);
        }
    };

    // TABLE 1: FIXED ASSETS
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
        columnStyles: {
            0: { halign: 'right', columnWidth: 15 },
            1: { halign: 'left', columnWidth: 130 },
            2: { halign: 'right', columnWidth: 55 },
        },
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
            doc.text('BALANCE SHEET AS FROM ' + startDate+ ' TO '+endDate, 50, 37);
            doc.line(5, 32, 205, 32);
            doc.line(5, 40, 205, 40);
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
            doc.setLineWidth(.2);
            doc.setFontSize(12);
        }
    });

    let finalY = doc.lastAutoTable.finalY || 42;

    // TABLE 2: CURRENT ASSETS
    autoTable(doc, {
        head: [tableColumn1],
        body: tableRows1,
        startY: finalY + 5,
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

    let finalY2 = doc.lastAutoTable.finalY || finalY + 5;

    // TABLE 3: INTANGIBLE ASSETS
    autoTable(doc, {
        head: [tableColumn2],
        body: tableRows4,
        startY: finalY2 + 5,
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

    let finalY3 = doc.lastAutoTable.finalY || finalY2 + 5;

    // TABLE 4: OTHER ASSETS
    autoTable(doc, {
        head: [tableColumn3],
        body: tableRows5,
        startY: finalY3 + 5,
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

    let finalY4 = doc.lastAutoTable.finalY || finalY3 + 5;

    // ✅ FIXED: Asset totals (text, x, y)
    doc.setFontSize(12);
    doc.text("TOTAL FIXED ASSETS :", 80, finalY4 + 8);
    doc.text(String(totalFixedAsset), 203, finalY4 + 8, { align: 'right' });
    doc.text("TOTAL CURRENT ASSETS :", 80, finalY4 + 13);
    doc.text(String(CurrentAssetTotal), 203, finalY4 + 13, { align: 'right' });
    doc.text("TOTAL ASSETS:", 80, finalY4 + 18);
    doc.text(String(TotalAsset), 203, finalY4 + 18, { align: 'right' });

    // TABLE 5: CURRENT LIABILITIES
    autoTable(doc, {
        head: [tableColumn4],
        body: tableRows6,
        startY: finalY4 + 28,
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

    let finalY5 = doc.lastAutoTable.finalY || finalY4 + 28;

    // TABLE 6: LONG TERM LIABILITIES
    autoTable(doc, {
        head: [tableColumn5],
        body: tableRows7,
        startY: finalY5 + 5,
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

    let finalY6 = doc.lastAutoTable.finalY || finalY5 + 5;

    // TABLE 7: OWNER EQUITIES
    autoTable(doc, {
        head: [tableColumn6],
        body: tableRows8,
        startY: finalY6 + 5,
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

    let finalY7 = doc.lastAutoTable.finalY || finalY6 + 5;

    // ✅ FIXED: Liability totals (text, x, y)
    doc.setFontSize(12);
    doc.text("TOTAL CURRENT LIABILITIES :", 80, finalY7 + 8);
    doc.text(String(totalCurrentLiabilityFormatted), 203, finalY7 + 8, { align: 'right' });
    doc.text("TOTAL LONG TERM LIABILITIES :", 80, finalY7 + 13);
    doc.text(String(totalLongTermLiability), 203, finalY7 + 13, { align: 'right' });
    doc.text("TOTAL OWNER EQUITIES :", 80, finalY7 + 18);
    doc.text(String(totalOwnerEquityFormatted), 203, finalY7 + 18, { align: 'right' });
    doc.text("TOTAL LIABILITIES AND OWNER EQUITIES :", 57, finalY7 + 23);
    doc.text(String(totalLiabilityOwnerEquity), 203, finalY7 + 23, { align: 'right' });

    addFooters(doc);
    doc.save('BalanceSheet-' + endDate + '.pdf');
};

export default BSPDF;