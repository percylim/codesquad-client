import jsPDF from "jspdf";
import "jspdf-autotable";
//import moment from 'react-moment';
// Date Fns is used to format the dates we receive
// from our API call
//import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = tickets => {
  // initialize jsPDF
  const doc = new jsPDF();
  const voucherNo = tickets[0].voucherNo;
  // define the columns we want and their titles
  const tableColumn = ["Id", "G/L No.", "G/L Sub", "Department", "G/L Name", "Particular", "Dr. Amount", "Cr. Amount"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  tickets.forEach(ticket => {
    const ticketData = [
      ticket.id,
      ticket.glNo,
      ticket.glSub,
      ticket.department,
      ticket.glName,
      ticket.jeParticular,
      ticket.drAmt,
      ticket.crAmt,
      ticket.txnDate,
  
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

   // alert(tickets[0].txnDate);
   //const jvDate = format(tickets[0].txnDate, 'dd/MM/yyyy'); 
   
   const jvDate = tickets[0].txnDate;
   // format((jvDate), "dd/mm/yyyy")
    // alert(jvDate);
   // let dateDMY = `${jvDate.getDate()}-${jvDate.getMonth() + 1}-${jvDate.getFullYear()}`;
 //   moment(jvDate).format("dd/mm/yyyy"); // you get "16/05/2018"
   // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 40 });
  //const date = Date().split(" ");
  const str=voucherNo.slice(0, 2);
  var voucherHead = 'Journal Voucher';
  if (str === 'PV') {   
     voucherHead = 'Payment Voucher' 
  } 
  if (str ==='RV') {
     voucherHead = 'Receiving Voucher'
  } 
  // we use a date string to generate our filename.
  //const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text(voucherHead, 80, 15);
  doc.text('Voucher No.'+ voucherNo,14 , 30);
   doc.text('Date: '+ jvDate, 150, 30);
  // we define the name of our PDF file
  doc.save(`jv${voucherNo}.pdf`);
};

export default generatePDF;
