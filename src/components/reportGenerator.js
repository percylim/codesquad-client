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
  var voucherNo = tickets[1].voucherNo;
  var  jvDate = tickets[1].txnDate;
  var str =tickets[0].id;
   //    console.log(tickets);
   var lStr = tickets[0].id;
   //alert(lcText);

  // define the columns we want and their titles
  const tableColumn = ["G/L No.", "G/L Sub", "Department", "G/L Name", "Particular", "Dr. Amount", "Cr. Amount"];

  // define an empty array of rows
  const tableRows = [];
 // const totalDrAmt = tickets[0].totalDrAmt;
 // var totalCrAmt = tickets[0].totalCrAmt;
  //totalCrAmt = totalCrAmt * -1;

  // for each ticket pass all its data into an array
  tickets.forEach(ticket => {
   // ticket.drAmt=Number(ticket.drAmt).toFixed(2);
    const ticketData = [
      ticket.glNo,
      ticket.glSub,
      ticket.department,
      ticket.glName,
      ticket.jeParticular,
      ticket.drAmt,
      ticket.crAmt,
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
    startY: 40,
    theme : 'grid',
    margin : {
      top : 100
    },
    columnStyles: {
      5: {halign: 'right'},
      6: {halign: 'right'},
  },

  });

  //const date = Date().split(" ");

 // for (let i = 0; i < tickets.length; i++) {
//     voucherNo = '';
 //    jvDate = '';
//  alert(tickets[i].drAmt) ;
 // alert(typeof tickets[i].txnDate);
 // if (typeof tickets[i].voucherNo !=='undefined' && tickets[i].voucherNo !=='') {
 //   str =tickets[i].voucherNo.slice(0, 2);
 //   voucherNo = tickets[i].voucherNo;

 // }
 // if (typeof tickets[i].txnDate !=='undefined'  && tickets[i].txnDate !=='') {
 //   jvDate = tickets[i].txnDate;

 //   }

//}


  // alert(str);
  var voucherHead = 'Journal Voucher';

  if (str  === 'P') {
     voucherHead = 'Payment Voucher';
  }

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
  doc.text(voucherHead, 80, 15);
  if (lStr !== '0') {

  doc.text('Voucher No.'+ voucherNo,14 , 30);
  }
   doc.text('Date: '+ jvDate, 150, 30);

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
    doc.save(voucherNo+'.pdf');
 // doc.save(`jv${voucherNo}.pdf`);
};

export default generatePDF;
