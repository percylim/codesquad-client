import { jsPDF }  from "jspdf";
import "jspdf-autotable";

const generatePDF = (tickets, headers, filename = 'voucher.pdf') => {
  try {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    if (!tickets || tickets.length === 0) {
      console.error("No data provided for PDF generation");
      return;
    }

    // Extract voucher info from first data row (skip totals row)
    const firstDataRow = tickets.find(t => t.id !== 0) || tickets[0];
    const voucherNo = firstDataRow.voucherNo || "Voucher";
    const voucherDate = firstDataRow.txnDate || "";
    const prefix = voucherNo.slice(0, 2).toUpperCase();

    // Determine voucher type
    let voucherHead = "Journal Voucher";
    switch (prefix) {
      case "PV": voucherHead = "Payment Voucher"; break;
      case "RV": voucherHead = "Receipt Voucher"; break;
      case "SV": voucherHead = "Sales Voucher"; break;
      case "BV": voucherHead = "Bank Voucher"; break;
      default: voucherHead = "Journal Voucher"; break;
    }

    // Prepare table data
    const tableColumn = headers.map(h => h.key);
    const tableRows = [];
    let totalDr = 0, totalCr = 0;

    tickets.forEach(ticket => {
      if (ticket.id !== 0) { // Skip totals row for now
        const drAmt = parseFloat(ticket.drAmt) || 0;
        const crAmt = parseFloat(ticket.crAmt) || 0;
        totalDr += drAmt;
        totalCr += crAmt;

        tableRows.push([
          ticket.glNo || "",
          ticket.glSub || "",
          ticket.department || "",
          ticket.glName || "",
          ticket.jeParticular || "",
          formatCurrency(drAmt),
          formatCurrency(crAmt)
        ]);
      }
    });

    // Add totals row
    tableRows.push([
      "", "", "", "", "Total:",
      formatCurrency(totalDr),
      formatCurrency(totalCr)
    ]);

    // Header
    doc.setFontSize(14);
    doc.text(voucherHead, 80, 15);
    doc.setFontSize(11);
    doc.text(`Voucher No: ${voucherNo}`, 14, 25);
    doc.text(`Date: ${voucherDate}`, 150, 25);

    // Generate table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      styles: {
        fontSize: 9,
        overflow: 'linebreak',
        cellWidth: 'wrap',
      },
      columnStyles: {
        0: { cellWidth: 20 },  // G/L No.
        1: { cellWidth: 20 },  // G/L Sub
        2: { cellWidth: 25 },  // Department
        3: { cellWidth: 30 },  // G/L Name
        4: { cellWidth: 45 },  // Particular
        5: { halign: 'right', cellWidth: 25 }, // Dr. Amt
        6: { halign: 'right', cellWidth: 25 }, // Cr. Amt
      },
      didDrawPage: function (data) {
        // Footer
        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height || doc.internal.pageSize.getHeight();
        doc.setFontSize(8);
        doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageSize.width - 20, pageHeight - 10);
        doc.text(`Printed on: ${new Date().toLocaleString()}`, 14, pageHeight - 10);
      },
      didParseCell: function (data) {
        if (data.row.index === tableRows.length - 1) {
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    // Add signature lines
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.text("Prepared by: ___________________", 20, finalY);
    doc.text("Checked by: ___________________", 100, finalY);
    doc.text("Approved by: ___________________", 160, finalY);

    // Save PDF
    doc.save(filename);

  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please check console for details.");
  }
};

const formatCurrency = (amount) => {
  return parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default generatePDF;