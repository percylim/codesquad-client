import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import Moment from "moment";
//const companyName = localStorage.getItem('companyName');
//const companyID = localStorage.getItem('companyID');
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;


const GSTPDF = (companyInfo, Data, salesData, purchaseData,
    totalDocumentAmount, totalPurchaseTaxAmount, totalSalesTaxAmount,
    salesItemAmountTotal,salesTaxAmountTotal,purchaseItemAmountTotal,
    purchaseTaxAmountTotal,  startDate, endDate) => { 
  // initialize jsPDF
  const doc = new jsPDF('p', 'mm', 'a4') // [297, 210]); // set to A4 page size
  var page = doc.internal.getNumberOfPages();
  const months = [
    '','JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];
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


  const tableColumn = ["DOC Date", "Supplier Name", "DOC No.","Tax Code",
                       "Tax Type","DOC Type","DOC RM",
                       "PUR Tax RM","SAL Tax RM"];
const tableColumn1 = ["Tax Code", "Sales Document Amount", "Sales Tax Amount"];
const tableColumn2 = ["Tax Code", "Purchase Document Amount", "Purchase Tax Amount"];
  // define an empty array of rows
  const tableRows = [];
  const tableRows1 = [];
  const tableRows2 = [];
  //const  invoiceTitle = invoiceType;
  const  companyName = companyInfo[0].companyName;
  var companyNo = companyInfo[0].registerNo;
  var incomeTaxNo = companyInfo[0].incomeTaxNo;
  var address =companyInfo[0].address1+' '+companyInfo[0].address2+', '+companyInfo[0].postCode+', '+companyInfo[0].city+', '+companyInfo[0].state+', '+companyInfo[0].country
  var businessCode = companyInfo[0].businessCode;
  if(businessCode === null) {businessCode =''} 
  if(companyNo === null) {companyNo =''}
  if(address === null) {address =''} 
  if(incomeTaxNo === null) {incomeTaxNo =''} 
  //const companyLogo = companyInfo[0].companyLogo;
  


 // var image = new Image();
 //  image.src = url+'/fetchImage/'+companyLogo;    // +companyLogo;
 // image.src = companyLogo;     //  url+ dictory+ image.png;

const name = companyName;

// for each ticket pass all its revData into an array
  
   Data.forEach(Data => {
     
    const ticketData = [
      Data.document_date,
      Data.suppCustID,
      Data.documentNo,
      Data.taxCode,
      Data.taxType,
      Data.documentType,
      parseFloat(Data.itemAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(Data.purchaseTaxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(Data.salesTaxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),  
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

   // parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

  salesData.forEach(salesData => {
     
    const ticketData = [
      salesData.tax,
      parseFloat(salesData.docAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(salesData.taxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    ];

    tableRows1.push(ticketData);
  });
  const ticketData1 = [
    '',
    parseFloat(salesItemAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    parseFloat(salesTaxAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
  ];
  tableRows1.push(ticketData1);

  purchaseData.forEach(purchaseData => {
     
    const ticketData = [
      purchaseData.tax,
      parseFloat(purchaseData.docAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      parseFloat(purchaseData.taxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    ];
    tableRows2.push(ticketData);
  });
  
  const ticketData2 = [
    '',
    parseFloat(purchaseItemAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    parseFloat(purchaseTaxAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
  ];
  tableRows2.push(ticketData2);

  doc.autoTable(tableColumn, tableRows, {
	startY:  42,
    theme : 'grid',
    bodyStyles: {lineColor: [0, 0, 0]},
    headerStyles: {
      fillColor: [255, 255, 255],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
      valign: 'middle',
      halign : 'center',
  },
    margin : {
      top : 50,
      bottom: 50,
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
     var adjLeft=(62-companyName.length)
     doc.setFontSize(30);
     doc.text(companyName,adjLeft,10 );
     doc.setFontSize(8);
      adjLeft=(90-companyNo.length); 
     doc.text('( Co. No. '+companyNo+" )",adjLeft,16);
     adjLeft=(120-address.length);
     if(address.length === 0) {adjLeft=0} 
     doc.text(address,adjLeft,20);
     adjLeft=(95-incomeTaxNo.length); 
     doc.text(incomeTaxNo,adjLeft,25);
     
     
     adjLeft=(80-businessCode.length); 
     doc.text('( KODE PERNIAGAAN: '+businessCode+" )",adjLeft,30);
     doc.setLineWidth(1.0);
     doc.setDrawColor(0, 0, 0);
     doc.line(10, 32, 200, 32 );
     doc.setFontSize(10);
  //  Moment("01-07-1994").format('YYYY-MM-DD')
     var month=endDate.slice(0,2)+' '+months[endDate.slice(3,5)]+' '+endDate.slice(6,10);
    //var month=new Date(endDate).getMonth();  // .toLocaleString('en-us', {day: 'numeric', month: "long", year: 'numeric' })
     doc.text('GST PURCHASE (INPUT TAX) AND SALES (OUTPUT TAX) AS AT '+endDate, 50,37)
    doc.line(5, 32, 205, 32 );
    doc.line(5, 40, 205, 40 );
   //  doc.setFontSize(22);
     doc.setTextColor(0, 0, 153);
   //  doc.text(invoiceTitle, 148, 30);
     doc.setTextColor(0,0,0 );
    doc.setFontSize(9);
  //  doc.text('Address:'+companyInfo[0].address1+','+companyInfo[0].address2,5 , 25);
 //   doc.text(companyInfo[0].postCode+','+companyInfo[0].city+', '+companyInfo[0].state+', '+companyInfo[0].country,5 , 28);
 //   doc.text('Tel:'+companyInfo[0].telNo1+ ', '+companyInfo[0].telNo2+', Email:'+companyInfo[0].email,5 , 31);
    doc.setLineWidth(.2);
   
     doc.setFontSize(12);
  
        let Position = doc.internal.pageSize.height
  
  },

  columnStyles: {
    0: {halign: 'left'},
    1: {halign: 'left'}, 
    2: {halign: 'left'},     
    3: {halign: 'left'},
    4: {halign: 'left'},
    5: {halign: 'left'}, 
    6: {halign: 'right'},     
    7: {halign: 'right'},
    8: {halign: 'right'},   

},
  });
 


  //const date = Date().split(" ");
 // const str=voucherNo.slice(0, 2);

// var voucherHead = 'Purchase Invoice Payment to messrs '+data[0].supplierName;

  // we use a date string to generate our filename.
  //const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left

//  doc.addImage(image, 'PNG', 5, 0.5, 20, 20); // x, y, width, height
  
  doc.setFontSize(12);

  doc.autoTable(tableColumn1, tableRows1, {
    startY:  42+(tableRows.length*10),
    theme : 'grid',
    bodyStyles: {lineColor: [0, 0, 0]},
    headerStyles: {
      fillColor: [255, 255, 255],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
      valign: 'middle',
      halign : 'center',
  },
    margin : {
      top : 50,
      bottom: 50,
      left: 5,
      right: 5,

    },  columnStyles: {
      0: {halign: 'center', columnWidth: 15},
      1: {halign: 'right', columnWidth: 50},
      2: {halign: 'right', columnWidth: 50},
  },
    footStyles: {
      fillColor: [217, 217, 214],
      textColor: [0, 0, 0],
      fontSize: 12,
      halign : 'right',
      lineWidth: 0.2,
      lineColor: [0, 0, 0],
    },
  

   }); 
   doc.setFontSize(12);  

doc.autoTable(tableColumn2, tableRows2, {
    startY:  42+(tableRows.length*10)+(tableRows1.length*14),
    theme : 'grid',
    bodyStyles: {lineColor: [0, 0, 0]},
    headerStyles: {
      fillColor: [255, 255, 255],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      textColor: [0, 0, 0],
      valign: 'middle',
      halign : 'center',
  },
    margin : {
      top : 50,
      bottom: 50,
      left: 5,
      right: 5,

    },  columnStyles: {
      0: {halign: 'center', columnWidth: 15},
      1: {halign: 'right', columnWidth: 50},
      2: {halign: 'right', columnWidth: 50},
  },
    footStyles: {
      fillColor: [217, 217, 214],
      textColor: [0, 0, 0],
      fontSize: 12,
      halign : 'right',
      lineWidth: 0.2,
      lineColor: [0, 0, 0],
    },
  

   });  


   let finalY = doc.autoTable.previous.finalY;// The y position on the page

   doc.setFontSize(12);


  

 //  doc.text(150, finalY+10, "Discount :");
 //  doc.text(203, finalY+10, totalDiscount, {align: 'right'});
  // doc.text(150, finalY+15, "GST/SST :");
 //  doc.text(203, finalY+15, totalTax, {align: 'right'});
 //  doc.text(150, finalY+20, "Net Total :");
 //  doc.text(203, finalY+20, totalNet, {align: 'right'})
  // let position = doc.internal.pageSize.height;
   

   


   


   addFooters(doc) ;   // page count function
    doc.save('GSTReport-'+endDate+'.pdf');




};

export default GSTPDF;
