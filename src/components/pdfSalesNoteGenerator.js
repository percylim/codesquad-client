import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
//const companyName = localStorage.getItem('companyName');
//const companyID = localStorage.getItem('companyID');
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;

// ExportSalesNotePDF(data, companyInfo, customerInfo, noteType, totalTxnAmount, totalTaxAmount, txnNetTotal)
const ExportSalesNotePDF = (data, companyInfo, customerInfo, noteType, noteTotal,  noteTaxTotal, noteNetTotal)=> {

  // initialize jsPDF
  const doc = new jsPDF('p', 'mm', 'a4') // [297, 210]); // set to A4 page size
  var page = doc.internal.getNumberOfPages();
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
    doc.text('Page ' + String(i) + ' of ' + String(pageCount), 150, 65 )
   }
  }
   

  const tableColumn = ["INVOICE NO.","DESCRIPTION", "AMOUNT", "TAX", "NET AMT"];
  // define an empty array of rows
  const tableRows = [];
  const  invoiceTitle = noteType;
  const noteNo = data[0].documentNo;
  const  companyName = companyInfo[0].companyName;
  const companyNo = companyInfo[0].registerNo;
 // const dueDate = data[0].dueDate;
  const companyLogo = companyInfo[0].companyLogo;
  const NoteType = data[0].noteType;
  const noteN0 = data[0].documentNo;
  const txnParticular = data[0].txnParticular;
  const  txnAmount = data[0].txnAmount;
  const taxTotal = data[0].taxTotal;
  const netTotal = data[0].netTotal;
  const txnTotal = data[0].txnTotal;
/*
  newDatas[i].voucherNo= voucherNo;
  newDatas[i].companyID = companyID;
  newDatas[i].supplierID = supplierID;
  newDatas[i].supplierName = supplierName;
  newDatas[i].invoiceNo = invoiceNo;
  newDatas[i].taxID= taxID;
  newDatas[i].taxCode = taxCode;
  newDatas[i].taxRate= taxRate;
  newDatas[i].taxType= taxType;
  newDatas[i].documentNo = documentNo;
  newDatas[i].invType = invType;
  newDatas[i].txnDate = txnDate;
  newDatas[i].taxDescription = taxDescription;
  newDatas[i].remark = taxRemark;
  newDatas[i].txnParticular = txnParticular;
  newDatas[i].txnAmount = txnAmount;
  newDatas[i].taxTotal = taxTotal;
  newDatas[i].netTotal = netTotal;
*/


  var image = new Image();
   image.src = url+'/fetchImage/'+companyLogo;    // +companyLogo;
 // image.src = companyLogo;     //  url+ dictory+ image.png;

const name = localStorage.getItem('companyName');

const totalNote=parseFloat(noteTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
// const totalDiscount=parseFloat(invoiceDiscountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
const totalTax=parseFloat(noteTaxTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
const totalNet=parseFloat(noteNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

// for each ticket pass all its data into an array
   data.forEach(data => {
    const ticketData = [
      data.id,
      data.invoiceNo,
     // parseFloat(data.salesQuantity).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      data.txnParticular,
      parseFloat(data.txnAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(data.taxTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(data.netTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
     // parseFloat(data.itemTax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
     // parseFloat(data.itemNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),



      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

   // parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });
// src/components/pdfSalesNoteGenerator.js
   // alert(tickets[0].txnDate);
   //const jvDate = format(tickets[0].txnDate, 'dd/MM/yyyy');

   // const jvDate =  format(data[0].txnDate, "dd/MM/yyyy");
   const jvDate = data[0].txnDate;
    const invoiceNo= data[0].invoiceNo;

   // format((jvDate), "dd/MM/yyyy")
    // alert(jvDate);
   //let dateDMY = `${jvDate.getDate()}-${jvDate.getMonth() + 1}-${jvDate.getFullYear()}`;
 //   moment(jvDate).format("dd/mm/yyyy"); // you get "16/05/2018"
   // startY is basically margin-top
  //doc.autoTable(tableColumn, tableRows, { startY: 40 });

  doc.autoTable(tableColumn, tableRows, {
		startY:  70,
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
      top : 70,
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
     if (image !=='' || image !==null || image !== undefined) {
     doc.addImage(image, 'PNG', 5, 0.5, 20, 20); // x, y, width, height
     }
     doc.setFontSize(30);
     doc.text(companyName,30,10 );
     doc.setFontSize(8);
     doc.text('( Co. No. '+companyNo+" )",35,16);
     doc.setLineWidth(1.0);
     doc.setDrawColor(0, 0, 0);
     doc.line(5, 21, 200, 21 );
    // doc.setFontSize(22);
    // doc.text(name, 130,30)
     doc.setFontSize(22);
     doc.setTextColor(0, 0, 153);
     doc.text(NoteType, 148, 30);
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
      doc.text(NoteType+" No. :",140 , 40);
      doc.text(noteNo,175 , 40);
      doc.text('Transaction Date : ', 140, 45);
      doc.text(jvDate,175,45 );
     // doc.text('Due Date: ', 150, 5);
      
        let Position = doc.internal.pageSize.height
       //  doc.text(str, 98, doc.internal.pageSize.height - 10);
      //  doc.line(5, Position-10, 50, Position-10 );
    //    doc.text(str,150, 65 );
    //  doc.line(10,Position-15 , 75, Position-15 );
       doc.line(140,Position-15 ,  200, Position-15 );
    //   doc.text("Goods received in good condition by :",10, Position - 10 );
     //  doc.text(customerInfo[0].supplierName,10, Position - 5 );
       doc.text(companyInfo[0].companyName,140, Position - 10 );
  },

    columnStyles: {

      2: {halign: 'left'},
      3: {halign: 'right'},
      4: {halign: 'right'},
      5: {halign: 'right'},
      5: {halign: 'right'},
     



  },

  });
  //const date = Date().split(" ");
 // const str=voucherNo.slice(0, 2);

 var voucherHead = 'Purchase Invoice Payment to messrs '+data[0].supplierName;

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
  // data, companyInfo, customerInfo, noteType, noteTotal,  noteTaxTotal, noteNetTotal

   doc.text(150, finalY+5, "Sub-Total :");
   doc.text(203, finalY+5, totalNote, {align: 'right'});
  
   doc.text(150, finalY+15, "GST :");
   doc.text(203, finalY+15, totalTax, {align: 'right'});
   doc.text(150, finalY+20, "Net Total :");
   doc.text(203, finalY+20, totalNet, {align: 'right'})
   let position = doc.internal.pageSize.height
   doc.setFontSize(12);

   //doc.text(10, finalY+30, 'REMARKS : ');
  // doc.text('REMARK : ', 10, position-70 );
  // doc.setFontSize(10);

   //doc.text(remark1, 10, position-65);
   //doc.text(remark2, 10, position-60);
  // doc.text(remark3, 10, position-55);
  // doc.text(remark4, 10, position-50);
  // doc.text(remark5, 10, position-45);
  // doc.text(remark6, 10, position-40);

   //doc.text(10, finalY+35, remark1);
   //doc.text(10, finalY+40, remark2);
   //doc.text(10, finalY+45, remark3);
   //doc.text(10, finalY+50, remark4);
   //doc.text(10, finalY+55, remark5);
   //doc.text(10, finalY+60, remark6);


   //  doc.text(str, 98, doc.internal.pageSize.height - 10);
  //  doc.line(5, Position-10, 50, Position-10 );
//    doc.text(str,150, 65 );
 //  doc.line(10,Position-15 , 75, Position-15 );
 //  doc.line(140,Position-15 ,  200, Position-15 );
 //  doc.text("Goods received in good condition by :",10, Position - 10 );
 //  doc.text(companyInfo[0].companyName,10, Position - 5 );
 //  doc.text(companyInfo[0].companyName,140, Position - 10 );


   addFooters(doc) ;   // page count function
    doc.save(noteType+'-'+invoiceNo+'.pdf');




};

export default ExportSalesNotePDF;
