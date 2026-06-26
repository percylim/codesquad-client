import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";   // ✅ import the plugin function

const bankReconGenerator = tickets => {
  const doc = new jsPDF();

  // Ensure tickets array has data
  if (!tickets || tickets.length === 0) return;

  const lastIndex = tickets.length - 1;
  const refNo = tickets[1]?.refNo || '';
  const jvDate = tickets[1]?.txnDate || '';
  const lStr = tickets[0]?.id || '';
  const bankID = tickets[0]?.bankID || '';
  const bankName = tickets[0]?.bankName || '';
  
  // Get totals from last row (before we blank it)
  let totalDrAmt = tickets[lastIndex]?.bankBal || 0;
  let totalCrAmt = tickets[lastIndex]?.glBal || 0;

  // Build table rows
  const tableRows = [];
  tickets.forEach(ticket => {
    if (typeof ticket.id !== 'undefined') {
      tableRows.push([
        ticket.particular || '',
        ticket.bankBal ?? '',
        ticket.glBal ?? ''
      ]);
    }
  });

  // (Optional) Remove the last row from body if it's just totals – you already added it as footer
  // But your code added an empty row, then footer. I'll keep the body as is and add footer.

  // Use autoTable with modern syntax
  autoTable(doc, {
    startY: 60,
    theme: 'grid',
    head: [["Particular", "Bank Balance", "G/L Balance"]],
    body: tableRows,
    foot: [['RECONCILIATION ENDING BALANCE :', totalDrAmt, totalCrAmt]],
    columnStyles: {
      1: { halign: 'right' },
      2: { halign: 'right' }
    },
    footStyles: {
      fillColor: [10, 5, 5],
      textColor: 'white',
      halign: 'right'
    }
  });

  // Add header texts
  const voucherHead = `Bank Reconciliation as at ${jvDate}`;
  doc.text(voucherHead, 60, 55);
  if (lStr !== '0') {
    doc.text(`Reference No. ${refNo}`, 14, 30);
  }
  doc.text(`Date: ${jvDate}`, 150, 30);
  doc.text(`Bank ID : ${bankID}`, 14, 40);
  doc.text(`Bank Name : ${bankName}`, 14, 45);

  doc.save(`bankRecon${refNo}.pdf`);
};

export default bankReconGenerator;