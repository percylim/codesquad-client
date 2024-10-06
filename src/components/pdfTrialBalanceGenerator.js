import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
const companyName = localStorage.getItem('companyName');
//const companyID = localStorage.getItem('companyID');
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;

const ExportTrialBalancePDF = (data, reportType, totalDebit, totalCredit, startDate, endDate)=> {

  // initialize jsPDF
  const doc = new jsPDF('p', 'mm', 'a4') // [297, 210]); // set to A4 page size
  var page = doc.internal.getNumberOfPages();
  var todayDate = new Date();
  var invoiceTitle='';
  //format(new Date(date), "dd/MM/yyyy") ;
     todayDate = format(todayDate, "dd/MM/yyyy") ; 
  //var totalPages = 10;
// var totalPagesExp = "{total_pages_count_string}";
 // var str = "Page " + page  + " of " +  totalPagesExp;
  const pageCount = doc.internal.getNumberOfPages();
  var str = "Page " + page  + " of " +  pageCount;
  // For each page, print the page number and the total pages
//  for(var i = 1; i <= pageCount; i++) {
       // Go to page i
 //     doc.setPage(i);
       //Print Page 1 of 4 for example
 //     const str='Page ' + String(i) + ' of ' + String(pageCount),210-20,297-30,null,null,"right";
 // }
 // this is the page count
 var  addFooters = doc => {
  const pageCount = doc.internal.getNumberOfPages()

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(12)
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.text('Page ' + String(i) + ' of ' + String(pageCount), 170, 30 )
   }
  }
    let tableColumn =[];
 
     tableColumn = ["G/L No.", "G/L Sub", "G/L Name",  "Debit", "Credit"];
 
 
  // define an empty array of rows

  const tableRows = [];
  if (reportType === 'OTB') {
     invoiceTitle = 'OP Balance Report'
  }
  if (reportType === 'YTB') { 
    
     invoiceTitle = 'Yearly Trial Balance from '+startDate+' to '+endDate
  } 
  if (reportType === 'MTB')   {
    invoiceTitle = 'Monthly Trial Balance from '+startDate+' to '+endDate
  }
  
 // const  companyName = companyName;
 // const companyNo = companyInfo[0].registerNo;
 // const dueDate = data[0].dueDate;
 // const companyLogo = companyInfo[0].companyLogo;
 //  const year = data[0].year;
//  const sales = data[0].remark1;
 // const remark2 = data[0].remark2;
 // const remark3 = data[0].remark3;
 // const remark4 = data[0].remark4;
 // const remark5 = data[0].remark5;
 // const remark6 = data[0].remark6


 // var image = new Image();
  // image.src = url+'/fetchImage/'+companyLogo;    // +companyLogo;
 // image.src = companyLogo;     //  url+ dictory+ image.png;

const name = localStorage.getItem('companyName');

//totalSales=parseFloat(totalSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//totalDebit=parseFloat(totalDebit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//totalCredit=parseFloat(totalCredit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//totalNetSales=parseFloat(totalNetSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  totalDebit=0;
  totalCredit=0;
// for each ticket pass all its data into an array
   data.forEach(data => {
    totalDebit+=data.debit;
    totalCredit+=data.credit;
    const ticketData = [
      data.glNo,
      data.glSub,
      data.glName,
      parseFloat(data.debit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(data.credit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    //  parseFloat(data.netSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    //  parseFloat(data.itemTax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    //  parseFloat(data.itemNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
     


      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

   // parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

   // alert(tickets[0].txnDate);
   //const jvDate = format(tickets[0].txnDate, 'dd/MM/yyyy');

   // const jvDate = data[0].txnDate;
   // const invoiceNo= data[0].invoiceNo;

   // format((jvDate), "dd/MM/yyyy")
    // alert(jvDate);
   //let dateDMY = `${jvDate.getDate()}-${jvDate.getMonth() + 1}-${jvDate.getFullYear()}`;
 //   moment(jvDate).format("dd/mm/yyyy"); // you get "16/05/2018"
   // startY is basically margin-top
  //doc.autoTable(tableColumn, tableRows, { startY: 40 });
  totalDebit=parseFloat(totalDebit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  totalCredit=parseFloat(totalCredit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  doc.autoTable(tableColumn, tableRows, {
		startY:  40,
    theme : 'grid',
    bodyStyles: {lineColor: [0, 0, 0]},
    headerStyles: {
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
      valign: 'middle',
      halign : 'center',
  },
    margin : {
      top : 40,
      bottom: 70,
      left: 5,
      right: 5,

    },
    footStyles: {
      fillColor: [217, 217, 214],
      textColor: [0, 0, 0],
      fontSize: 12,
      halign : 'right',
      lineWidth: 0.2,
      lineColor: [0, 0, 0],
    },

    showFoot: "lastPage",

    pageBreak: 'auto',
    showHead: 'everyPage',

    tableWidth: 'auto',
    horizontalPageBreak: true,
   didDrawPage: function (data) {
  //   if (image !=='' || image !==null || image !== undefined) {
  //   doc.addImage(image, 'PNG', 5, 0.5, 20, 20); // x, y, width, height
  //   }
     doc.setFontSize(30);
     doc.text(companyName,30,10 );
     doc.setFontSize(8);
   //  doc.text('( Co. No. '+companyNo+" )",35,16);
     doc.setLineWidth(1.0);
     doc.setDrawColor(0, 0, 0);
     doc.line(3, 21, 200, 21 );
    // doc.setFontSize(22);
    // doc.text(name, 130,30)
     doc.setFontSize(18);
     doc.setTextColor(0, 0, 153);
     doc.text(invoiceTitle, 10, 30);
     doc.setTextColor(0,0,0 );
    doc.setFontSize(9);
 //   doc.text('Address:'+companyInfo[0].address1+','+companyInfo[0].address2,5 , 25);
 //   doc.text(companyInfo[0].postCode+','+companyInfo[0].city+', '+companyInfo[0].state+', '+companyInfo[0].country,5 , 28);
 //   doc.text('Tel:'+companyInfo[0].telNo1+ ', '+companyInfo[0].telNo2+', Email:'+companyInfo[0].email,5 , 31);
 //   doc.setLineWidth(.2);
  //  doc.roundedRect(5, 33, 98, 35, 5, 5, 'S');

  //  doc.text('BILL TO :',8 , 38)
  //  doc.setFontSize(16);
  //  doc.text(customerInfo[0].supplierName, 8, 45);
  //  doc.setFontSize(9);
  //  doc.text('Address:'+customerInfo[0].address1+','+customerInfo[0].address2,8 , 50);
  //  doc.text(customerInfo[0].postCode+','+customerInfo[0].city+', '+customerInfo[0].state+', '+customerInfo[0].country,8 , 55);
  //  doc.text('Tel:'+customerInfo[0].tel1+ ', '+customerInfo[0].tel2+', Email:'+customerInfo[0].email,8 ,60);

//     doc.setFontSize(12);
//      doc.text('Invoice No.',150 , 40);
//      doc.text(invoiceNo,176 , 40);
//      doc.text('Invoice Date: ', 150, 45);
//      doc.text(jvDate,176,45 )
//      doc.text('Due Date: ', 150, 50);
//      doc.text(dueDate, 176, 50);
 //     doc.text('Sales Rep.: ', 150, 55);
  //    doc.text(salesRep, 176, 55);
        let Position = doc.internal.pageSize.height
       //  doc.text(str, 98, doc.internal.pageSize.height - 10);
      //  doc.line(5, Position-10, 50, Position-10 );
    //    doc.text(str,150, 65 );
    //   doc.line(10,Position-15 , 75, Position-15 );
    //   doc.line(140,Position-15 ,  200, Position-15 );
    //   doc.text("Goods received in good condition by :",10, Position - 10 );
    //   doc.text(customerInfo[0].supplierName,10, Position - 5 );
    //   doc.text(companyInfo[0].companyName,140, Position - 10 );
  },

    columnStyles: {
      0: {halign: 'center'},
      1: {halign: 'center'},
      2: {halign: 'left'},
      3: {halign: 'right'},
      4: {halign: 'right'},

  },

  });
  //const date = Date().split(" ");
 // const str=voucherNo.slice(0, 2);

 //var voucherHead = 'Purchase Invoice Payment to messrs '+data[0].supplierName;

  // we use a date string to generate our filename.
  //const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
/*
  doc.addImage(image, 'PNG', 5, 0.5, 20, 20); // x, y, width, height
  doc.setFontSize(30);
  doc.text(companyName,30,10 );
  doc.setFontSize(8);
  doc.text('( Co. No. '+companyNo+" )",35,16);1
  doc.setLineWidth(1.0);
  doc.setDrawColor(0, 0, 0);
  doc.line(5, 21, 200, 21 );
 // doc.setFontSize(22);
 // doc.text(name, 130,30)
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 153);
  doc.text(invoiceTitle, 148, 30);
  doc.setTextColor(0,0,0 );
 doc.setFontSize(9);
 doc.text('Address:'+companyInfo[0].address1+','+companyInfo[0].address2,5 , 25);
 doc.text(companyInfo[0].postCode+','+companyInfo[0].city+', '+companyInfo[0].state+', '+companyInfo[0].country,5 , 28);
 doc.text('Tel:'+companyInfo[0].telNo1+ ', '+companyInfo[0].telNo2+', Email:'+companyInfo[0].email,5 , 31);
 doc.setLineWidth(.2);
 doc.roundedRect(5, 33, 98, 35, 5, 5, 'S');

 doc.text('BILL TO :',8 , 38)
 doc.setFontSize(16);
 doc.text(customerInfo[0].supplierName, 8, 45);
 doc.setFontSize(9);
 doc.text('Address:'+customerInfo[0].address1+','+customerInfo[0].address2,8 , 50);
 doc.text(customerInfo[0].postCode+','+customerInfo[0].city+', '+customerInfo[0].state+', '+customerInfo[0].country,8 , 55);
 doc.text('Tel:'+customerInfo[0].tel1+ ', '+customerInfo[0].tel2+', Email:'+customerInfo[0].email,8 ,60);

  doc.setFontSize(12);
   doc.text('Invoice No.',150 , 40);
   doc.text(invoiceNo,176 , 40);
   doc.text('Invoice Date: ', 150, 45);
   doc.text(jvDate,176,45 )
   doc.text('Due Date: ', 150, 50);
   doc.text(dueDate, 176, 50);
   doc.text('Sales Rep.: ', 150, 55);
   doc.text(salesRep, 176, 55);

    //  doc.text(str, 98, doc.internal.pageSize.height - 10);
     doc.text(str,150, 65 );
*/
   let finalY = doc.autoTable.previous.finalY;// The y position on the page

   doc.setFontSize(12);


   doc.text(110, finalY+5, "Report Total :");
   doc.text(170, finalY+5, totalDebit, {align: 'right'});
   doc.text(204, finalY+5, totalCredit, {align: 'right'});
   
  

   


 //  let position = doc.internal.pageSize.height
 //  doc.setFontSize(12);

   //doc.text(10, finalY+30, 'REMARKS : ');


   addFooters(doc) ;   // page count function
    let ReportName = '';
    if (reportType === 'OTB') {
       ReportName = 'OpBalance-'+todayDate;
    } 
    if (reportType === 'MTB') {
      ReportName = 'MonthTrialBalance-'+todayDate;
    }
    if (reportType === 'YTB') {
      ReportName = 'YearTrialBalance-'+todayDate;
    }  
   doc.save(ReportName);




};

export default ExportTrialBalancePDF;
