import jsPDF from "jspdf";
import "jspdf-autotable";
//import moment from 'react-moment';
// Date Fns is used to format the dates we receive
// from our API call
//import { format } from "date-fns";
// define a generatePDF function that accepts a tickets argument
const bankReconPDF = tickets => {
  // initialize jsPDF
  const doc = new jsPDF();
  var refNo = tickets[1].refNo;
  var  jvDate = tickets[1].txnDate;
  var str =tickets[0].id;
  var j = tickets.length -1;
   //    console.log(tickets);
   var lStr = tickets[0].id;
   var bankID = tickets[0].bankID;
   var bankName = tickets[0].bankName;
   var totalDrAmt = tickets[j].bankBal;
   var totalCrAmt = tickets[j].glBal;
 //  alert(tickets.length);
    
  // define the columns we want and their titles
  const tableColumn = ["Particular", "Bank Balance", "G/L Balance"];

  // define an empty array of rows
  const tableRows = [];
 // const totalDrAmt = tickets[0].totalDrAmt;
 // var totalCrAmt = tickets[0].totalCrAmt;
  //totalCrAmt = totalCrAmt * -1;
   tickets[j].particular = '';
   tickets[j].bankBal = '';
   tickets[j].glBal = '';
  // for each ticket pass all its data into an array
  tickets.forEach(ticket => {
   // ticket.drAmt=Number(ticket.drAmt).toFixed(2);
    const ticketData = [
      ticket.particular,
      ticket.bankBal,
      ticket.glBal,
    
    //   ticket.drAmt = parseFloat(ticket.drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     // alert(ticket.drAmt)

      // called date-fns to format the date on the ticket
     // format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];
    // push each tickcet's info into a row
  //  alert(typeof ticket.id);
    if (typeof ticket.id !=='undefined') {
    tableRows.push(ticketData);
    }


  });

  //  alert(tickets[0].drAmt);
   //const jvDate = format(tickets[0].txnDate, 'dd/MM/yyyy');
   //const jvDate = tickets[0].txnDate;
 //  const jvDate = tickets[0].txnDate;
  // const totalDrAmt = tickets[0].totalDrAmt;
  // const totalCrAmt = tickets[0].totalCrAmt;
   // format((jvDate), "dd/mm/yyyy")
    // alert(jvDate);
   // let dateDMY = `${jvDate.getDate()}-${jvDate.getMonth() + 1}-${jvDate.getFullYear()}`;
 //   moment(jvDate).format("dd/mm/yyyy"); // you get "16/05/2018"
   // startY is basically margin-top
  // bodyStyles: { 2: { halign: 'right' }, 4: { halign: 'right' }, 5: { halign: 'right' }, 6: { halign: 'right' }, 7: { halign: 'right' } },
  // columnStyles: { 2: { halign: 'right' }, 4: { halign: 'right' }, 5: { halign: 'right' }, 6: { halign: 'right' }, 7: { halign: 'right' } },
//  didParseCell: function (cell, data) {
//    alignCol(cell, data);
//}

//function alignCol(data){

//  var col = data.column.index;
  //alert(col);
//  if(col===5 || col===6){
//      data.cell.styles.halign = 'right';
//  }
//}


  doc.autoTable(tableColumn, tableRows, {
    startY: 60,
    theme : 'grid',
    margin : {
      top : 100
    },
    columnStyles: {
      1: {halign: 'right'},    
      2: {halign: 'right'},
      3: {halign: 'right'},

   },
   footStyles: {
    fillColor: [10, 5, 5],
    textColor: 'white',
    halign: 'right'
},

   foot:[['RECONCILIATION ENDING BALANCE :', totalDrAmt, totalCrAmt]],
  });

  

  //const date = Date().split(" ");

//  for (let i = 0; i < tickets.length; i++) {
    //    tickets[j].bankBal = '';
    //    tickets[j].glBal = '';
 // if (typeof tickets[i].voucherNo !=='undefined' && tickets[i].voucherNo !=='') {
 //   str =tickets[i].voucherNo.slice(0, 2);
 //   voucherNo = tickets[i].voucherNo;

 // }
//   if (tickets[i].bankID ==='LASTROW') {
 //   jvDate = tickets[i].txnDate;
 // alert(tickets[i].bankID);
//   doc.setFillColor(239, 154, 154);

  //  tickets.cell.styles.fillColor = '#FF5783';
//  }
//}

// tableRows.styles.textColor = "#040505";

  

  // alert(str);
  var voucherHead = 'Bank Reconciliation as at '+jvDate;

// if (str  === 'P') {
//     voucherHead = 'Payment Voucher';
//  }

/*
  if (str ==='RV') {
     voucherHead = 'Receiving Voucher';
  }
  if (str ==='SI') {
    voucherHead = 'Sales Voucher';
 }
 if (str ==='PI') {
    voucherHead = 'Purchase Voucher';
 }
 // alert(typeof lStr);
  if (lStr === '0') {
    voucherHead = 'Journal Voucher Report';
    voucherNo = 'JVReport';
 }
 if (lStr === 'B') {
  voucherHead = 'Bank Voucher Report';

}
*/
 // alert(lStr);
  // we use a date string to generate our filename.
  //const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text(voucherHead, 60, 55);
  if (lStr !== '0') {

  doc.text('Reference No.'+ refNo,14 , 30);
  }
   doc.text('Date: '+ jvDate, 150, 30);
  doc.text('Bank ID :'+bankID, 14,40 );
  doc.text('Bank Name :'+bankName, 14, 45)

 //  let finalY = doc.lastAutoTable.finalY; // The y position on the page
 // doc.text(30, finalY, "Hello!")
 //doc.text("Dr/Cr Total :",100, finalY + 8)
 //let x = totalDrAmt.length;
 //let y = totalCrAmt.length;
 //alert(x);
 doc.setFontSize(12);
// doc.text("Total :",100, finalY + 8);
 doc.setFontSize(9.5);
 //  doc.text('Dr. Total:',100, finalY + 8);
 // doc.text(""+totalDrAmt,175-x, finalY + 8, {
 //    align: 'right',
 // });
 // doc.text('Cr. Total:',100, finalY + 12);
 // doc.text(""+totalCrAmt,175-y, finalY + 12, {
 //   align: 'right',
 // });
  //alert('jv${voucherNo}');
   // we define the name of our PDF file
  // doc.text('Debit:' + totalDrAmt,0,30 )
    doc.save('bankRecon'+refNo+'.pdf');
 // doc.save(`jv${voucherNo}.pdf`);
};

export default bankReconPDF;
