import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import Moment from "moment";
//const companyName = localStorage.getItem('companyName');
//const companyID = localStorage.getItem('companyID');
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;

const BSPDF = (companyInfo, fixedAssetData, currentAssetData, ARReceivableData,stockData,
     accountPayableData, intangibleAssetData, otherAssetData, currentLiabilityData,
     longTermLiabilityData, equityData, ownerEquityData, incomeSummaryData,
     totalFixedAsset, totalCurrentAsset, totalArAmt, closeStockTotal,intTotal,otherTotal, 
     totalCurrentLiability,totalAccountPayable,totalLongTermLiability, totalOwnerEquity,totalIncomeSummary, startDate, endDate) => { 
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


  const tableColumn = [" ", "FIXED ASSET", "RM"];
  const tableColumn1 = [" ", "CURRENT ASSETS", "RM"];
  const tableColumn2 = [" ", "INTANGIBLE ASSETS", "RM"];
  const tableColumn3 = [" ", "OTHER ASSETS", "RM"];
  const tableColumn4 = [" ", "CURRENT LIABILITIES", "RM"];
  const tableColumn5 = [" ", "LONG TERM LIABILITIES", "RM"];
  const tableColumn6 = [" ", "OWNER EQUITIES", "RM"];
  // define an empty array of rows
  const tableRows = [];
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
var totalLiabilityOwnerEquity = parseFloat(totalCurrentLiability+totalLongTermLiability+totalOwnerEquity+totalIncomeSummary).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
var CurrentAssetTotal= parseFloat(totalCurrentAsset+totalArAmt+closeStockTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
var TotalAsset = parseFloat(totalCurrentAsset+totalArAmt+closeStockTotal+totalFixedAsset+intTotal+otherTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
var totalCurrentLiability = parseFloat(totalCurrentLiability+totalAccountPayable).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
var totalOwnerEquity=parseFloat(totalOwnerEquity+totalIncomeSummary).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
totalFixedAsset = parseFloat(totalFixedAsset).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
totalCurrentAsset = parseFloat(totalCurrentAsset).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
totalArAmt = parseFloat(totalArAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
closeStockTotal=parseFloat(closeStockTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
intTotal=parseFloat(intTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
otherTotal=parseFloat(otherTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//totalCurrentLiability=parseFloat(totalCurrentLiability).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
totalAccountPayable=parseFloat(totalAccountPayable).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
totalLongTermLiability=parseFloat(totalLongTermLiability).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');





// for each ticket pass all its revData into an array

   fixedAssetData.forEach(fixedAssetData => {
    const ticketData = [
      fixedAssetData.addNo,
      fixedAssetData.glName,
      parseFloat(fixedAssetData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
     
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

   // parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });
  const tableRows1 =[];
  currentAssetData.forEach(currentAssetData => {
    const ticketData = [
      currentAssetData.addNo,
      currentAssetData.glName,
      parseFloat(currentAssetData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
     
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

    tableRows1.push(ticketData);
  
  });
  /*
  const ticketData = [
    ARReceivableData.addNo,
    ARReceivableData.glName,
    parseFloat(ARReceivableData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
   
    // called date-fns to format the date on the ticket
 //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
  ];
  tableRows1.push(ticketData);
*/
 // const tableRows2 =[];
  ARReceivableData.forEach(ARReceivableData => {
    const ticketData = [
      ARReceivableData.addNo,
      ARReceivableData.glName,
      parseFloat(ARReceivableData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
     
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

   // parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // push each tickcet's info into a row
    tableRows1.push(ticketData);
  });
  const tableRows3 =[];
  stockData.forEach(stockData => {
    const ticketData = [
      stockData.addNo,
      stockData.glName,
      parseFloat(stockData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
     
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

   // parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // push each tickcet's info into a row
    tableRows1.push(ticketData);
  });
  const tableRows4 =[];
  intangibleAssetData.forEach(intangibleAssetData => {
    const ticketData = [
      intangibleAssetData.addNo,
      intangibleAssetData.glName,
      parseFloat(intangibleAssetData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

   // parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // push each tickcet's info into a row
    tableRows4.push(ticketData);
  });
  const tableRows5 =[];
  otherAssetData.forEach(otherAssetData => {
    const ticketData = [
      otherAssetData.addNo,
      otherAssetData.glName,
      parseFloat(otherAssetData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

   // parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // push each tickcet's info into a row
    tableRows5.push(ticketData);
  });

  const tableRows6 =[];
  currentLiabilityData.forEach(currentLiabilityData => {
    const ticketData = [
      currentLiabilityData.addNo,
      currentLiabilityData.glName,
      parseFloat(currentLiabilityData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

   // parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // push each tickcet's info into a row
    tableRows6.push(ticketData);
  });
  
  accountPayableData.forEach(accountPayableData => {
    const ticketData = [
      accountPayableData.addNo,
      accountPayableData.glName,
      parseFloat(accountPayableData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
     
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];

   // parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // push each tickcet's info into a row
    tableRows6.push(ticketData);
  });


  const tableRows7 =[];
  longTermLiabilityData.forEach(longTermLiabilityData => {
    const ticketData = [
      longTermLiabilityData.addNo,
      longTermLiabilityData.glName,
      parseFloat(longTermLiabilityData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];
  
    tableRows7.push(ticketData);
  });
  const tableRows8 =[];
  equityData.forEach(equityData => {
    const ticketData = [
      equityData.addNo,
      equityData.glName,
      parseFloat(equityData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];
   tableRows8.push(ticketData);
  });
  ownerEquityData.forEach(ownerEquityData => {
    const ticketData = [
      ownerEquityData.addNo,
      ownerEquityData.glName,
      parseFloat(ownerEquityData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];
   tableRows8.push(ticketData);
  });
  incomeSummaryData.forEach(incomeSummaryData => {
    const ticketData = [
      incomeSummaryData.addNo,
      incomeSummaryData.glName,
      parseFloat(incomeSummaryData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      // called date-fns to format the date on the ticket
   //   format(new Date(ticket.txnDate), "dd/mm/yyyy")
    ];
   tableRows8.push(ticketData);
  });
 // equityData, ownerEquityData, incomeSummaryData
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
     doc.text('BALANCE SHEET AS AT '+month, 50,37)
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
    0: {halign: 'right', columnWidth: 15},
    1: {halign: 'left', columnWidth: 130},
    2: {halign: 'right', columnWidth: 55},
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
  // doc.text('Invoice No.',150 , 40);
  // doc.text(invoiceNo,176 , 40);
  // doc.text('Invoice Date: ', 150, 45);
  // doc.text(jvDate,176,45 )
  // doc.text('Due Date: ', 150, 50);
  // doc.text(dueDate, 176, 50);
  // doc.text('Sales Rep.: ', 150, 55);
  // doc.text(salesRep, 176, 55);

    //  doc.text(str, 98, doc.internal.pageSize.height - 10);
    // doc.text(str,150, 65 );

   let finalY = doc.autoTable.previous.finalY;// The y position on the page

   doc.setFontSize(12);


  // doc.text(90, finalY+5, "TOTAL FiXED ASSET :");
  // doc.text(203, finalY+5, totalFixedAsset, {align: 'right'});

  // alert(tableRows.length);
   doc.autoTable(tableColumn1, tableRows1, {
    startY:  47+(tableRows.length*10),
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
      0: {halign: 'right', columnWidth: 15},
      1: {halign: 'left', columnWidth: 130},
      2: {halign: 'right', columnWidth: 55},
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

   doc.autoTable(tableColumn2, tableRows4, {
    startY:  33+(tableRows.length*10)+(tableRows1.length*10),
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
      0: {halign: 'right', columnWidth: 15},
      1: {halign: 'left', columnWidth: 130},
      2: {halign: 'right', columnWidth: 55},
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

   doc.autoTable(tableColumn3, tableRows5, {
    startY:  38+(tableRows.length*10)+(tableRows1.length*10)+(tableRows4.length*10),
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
    0: {halign: 'right', columnWidth: 15},
    1: {halign: 'left', columnWidth: 130},
    2: {halign: 'right', columnWidth: 55},
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

 //  doc.text(150, finalY+10, "Discount :");intangibleAssetData
 //  doc.text(203, finalY+10, totalDiscount, {align: 'right'});
  // doc.text(150, finalY+15, "GST/SST :");
 //  doc.text(203, finalY+15, totalTax, {align: 'right'});
 //  doc.text(150, finalY+20, "Net Total :");
 //  doc.text(203, finalY+20, totalNet, {align: 'right'})
  // let position = doc.internal.pageSize.height;
   doc.setFontSize(12);
  // doc.text('TOTAL FIXED ASSETS :',80 , 10);
   doc.text(80,finalY+fixedAssetData.length, "TOTAL FIXED ASSETS :");
   doc.text(203,finalY+fixedAssetData.length, totalFixedAsset, {align: 'right'});
   doc.text(80, finalY+97+currentAssetData.length+fixedAssetData.length, "TOTAL CURRENT ASSETS :");
   doc.text(203, finalY+97+currentAssetData.length+fixedAssetData.length, CurrentAssetTotal, {align: 'right'});
   doc.text(80, finalY+132+currentAssetData.length+fixedAssetData.length+intangibleAssetData.length+otherAssetData.length, "TOTAL ASSETS:");
   doc.text(203, finalY+132+currentAssetData.length+fixedAssetData.length+intangibleAssetData.length+otherAssetData.length, TotalAsset, {align: 'right'});


   doc.autoTable(tableColumn4, tableRows6, {
    startY:  256,
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
    0: {halign: 'right', columnWidth: 15},
    1: {halign: 'left', columnWidth: 130},
    2: {halign: 'right', columnWidth: 55},
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
  doc.autoTable(tableColumn5, tableRows7, {
    startY:  74+(tableRows7.length*13),
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
    0: {halign: 'right', columnWidth: 15},
    1: {halign: 'left', columnWidth: 130},
    2: {halign: 'right', columnWidth: 55},
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
  doc.autoTable(tableColumn6, tableRows8, {
    startY:  74+(tableRows7.length*13)+(tableRows8.length*12),
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
    0: {halign: 'right', columnWidth: 15},
    1: {halign: 'left', columnWidth: 130},
    2: {halign: 'right', columnWidth: 55},
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
   doc.text(80, finalY+3+currentLiabilityData.length, "TOTAL CURRENT LIABILITIES :");
   doc.text(203, finalY+3+currentLiabilityData.length, totalCurrentLiability, {align: 'right'});
   doc.text(80, finalY+25+(currentLiabilityData.length+longTermLiabilityData.length), "TOTAL LONG TERM LIABILITIES :");
   doc.text(203,finalY+25+(currentLiabilityData.length+longTermLiabilityData.length), totalLongTermLiability, {align: 'right'});   
   //totalLiabilityOwnerEquity
   //doc.setFontSize(12);
   doc.text(80, finalY+60, "TOTAL OWNER EQUITIES :");
   doc.text(203, finalY+60, totalOwnerEquity, {align: 'right'});  
   doc.text(57, finalY+65, "TOTAL LIABILITIES AND OWNER EQUITIES :");
   doc.text(203, finalY+65, totalLiabilityOwnerEquity, {align: 'right'});   
   
   let position = doc.internal.pageSize.height
   //doc.setFontSize(12);

  


 
   //  let position = doc.internal.pageSize.height



   addFooters(doc) ;   // page count function
    doc.save('BalanceSheet-'+endDate+'.pdf');




};

export default BSPDF;