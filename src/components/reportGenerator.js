import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";   // ✅ import as a function

const generatePDF = tickets => {
  const doc = new jsPDF();
  
  // Extract header info
  const voucherNo = tickets[1]?.voucherNo || '';
  const jvDate = tickets[1]?.txnDate || '';
  const firstId = tickets[0]?.id || '';
  
  // Define columns and rows for autoTable
  const tableColumn = ["G/L No.", "G/L Sub", "Department", "G/L Name", "Particular", "Dr. Amount", "Cr. Amount"];
  const tableRows = [];
  
  tickets.forEach(ticket => {
    if (typeof ticket.id !== 'undefined') {
      tableRows.push([
        ticket.glNo,
        ticket.glSub,
        ticket.department,
        ticket.glName,
        ticket.jeParticular,
        ticket.drAmt,
        ticket.crAmt,
      ]);
    }
  });
  
  // Determine voucher title
  let voucherHead = 'Journal Voucher';
  if (firstId === 'P') voucherHead = 'Payment Voucher';
  else if (firstId === 'R') voucherHead = 'Receiving Voucher';
  else if (firstId === 'S') voucherHead = 'Sales Voucher';
  
  // Add header text
  doc.text(voucherHead, 80, 15);
  if (firstId !== '0') {
    doc.text('Voucher No. ' + voucherNo, 14, 30);
  }
  doc.text('Date: ' + jvDate, 150, 30);
  
  // ✅ Use autoTable(doc, options) with modern syntax
  autoTable(doc, {
    startY: 40,
    theme: 'grid',
    head: [tableColumn],
    body: tableRows,
    columnStyles: {
      5: { halign: 'right' },  // Dr. Amount
      6: { halign: 'right' },  // Cr. Amount
    },
    margin: { top: 100 },
  });
  
  doc.setFontSize(9.5);
  doc.save(voucherNo + '.pdf');
};

export default generatePDF;