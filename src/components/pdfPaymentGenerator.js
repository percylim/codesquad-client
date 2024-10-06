import jsPDF from "jspdf";
import "jspdf-autotable";
//import moment from 'react-moment';
// Date Fns is used to format the dates we receive
// from our API call
//import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const PaymentGenerator = tickets => {
  // initialize jsPDF
  const doc = new jsPDF();
  //const voucherNo = tickets[0].voucherNo;
  // define the columns we want and their titles
  const tableColumn = ["#", "Invoice No.", "Invoice Date", "Due Date", "Amount Debited", "Amount Credited", "Balance", "Paid Amount"];
  // define an empty array of rows
  const tableRows = [];
  const paymentType = tickets[0].paymentType;
  const bankName = tickets[0].bankName;
  const receiptNo = "Receipt No. : "+tickets[0].receiptNo;
  var documentNo =  "Cash Payment";
  const paymentParticular = "Particular : "+tickets[0].paymentParticular;
  if (tickets[0].paymentType === 'BT') {
      documentNo = tickets[0].bankName+' Transafer No.'+tickets[0].documentNo;
  }
  if (tickets[0].paymentType === 'CH') {
    documentNo = 'Paid by : '+tickets[0].bankName+' Checque No.'+tickets[0].documentNo;
}

const name = localStorage.getItem('companyName');

  // for each ticket pass all its data into an array
  tickets.forEach(ticket => {
    const ticketData = [
      ticket.id,
      ticket.invoiceNo,
      ticket.invDate,
      ticket.dueDate,
      ticket.debitAmount,
      ticket.creditAmount,
      ticket.invoiceBalance,
      ticket.payAmount,
          
  

      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];
  

    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

   // alert(tickets[0].txnDate);
   //const jvDate = format(tickets[0].txnDate, 'dd/MM/yyyy');

   const jvDate = tickets[0].txnDate;
   const supp = tickets[0].supplierID;
   // format((jvDate), "dd/mm/yyyy")
    // alert(jvDate);
   // let dateDMY = `${jvDate.getDate()}-${jvDate.getMonth() + 1}-${jvDate.getFullYear()}`;
 //   moment(jvDate).format("dd/mm/yyyy"); // you get "16/05/2018"
   // startY is basically margin-top
  //doc.autoTable(tableColumn, tableRows, { startY: 40 });

  doc.autoTable(tableColumn, tableRows, {
    startY: 60,
    theme : 'grid',
    margin : {
      top : 100
    },
    columnStyles: {
  
      4: {halign: 'right'},  
      5: {halign: 'right'},
      6: {halign: 'right'},
      7: {halign: 'right'},
    
  

  },

  });
  //const date = Date().split(" ");
 // const str=voucherNo.slice(0, 2);
   
  var voucherHead = 'Purchase Invoice Payment to messrs '+tickets[0].supplierName;

  // we use a date string to generate our filename.
  //const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  
  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0);
  doc.line(10, 12, 195, 12 );  
  doc.setFontSize(22);
  doc.text(name, 10,10)
  doc.setFontSize(16);
  doc.text(voucherHead, 10, 20);
  doc.text(documentNo,10,30 );
  doc.text(receiptNo,10,40);
  doc.text(paymentParticular, 10,50);
 // doc.text('Voucher No.'+ voucherNo,14 , 30);
   doc.text('Payment Date: '+ jvDate, 130, 40);
  // we define the name of our PDF filedate.toDateString(
    doc.save(supp+'-Payment-'+receiptNo+'.pdf');
};

export default PaymentGenerator;
