import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import './Profile.css';
import ReactDOM from "react-dom";
import ExportPNLPDF from "./pdfPnLGenerator";
import { format } from "date-fns";
import moment from 'moment';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Tooltip as ReactTooltip } from "react-tooltip";
//import {yearlyReport, quarterlyReport, monthlyReport} from "./salesReport";
import BootstrapTable from 'react-bootstrap-table-next';
import { AirlineSeatIndividualSuiteSharp, SettingsBackupRestoreRounded } from '@material-ui/icons';
import Moment from 'react-moment';
//import {CSVLink} from 'react-csv';
import PNLPDF from './pdfPnLGenerator';

import Blink from 'react-blink-text';

//require('dotenv').config();//

const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const companyName = localStorage.getItem('companyName');
const userName = localStorage.getItem('userName');


// const userLevel = localStorage.getItem('userLevel');


var curr = new Date();
var cYear = 'Years';
var todayDate = curr.toISOString().substr(0, 10);
var dDate= new Date(curr.setDate(curr.getDate()-7));
var finStartDate='';
var finEndDate='';
var finYear = dDate.getFullYear();
var data = [];
var gData=[];
var opData=[];
var totalDebit =0;
var totalCredit = 0;
var totalProfit =0 ;
var profit=0;
 var yearTax=0;
var drAmount=0;
var crAmount=0;
var totalDrAmount =0;
var totalCrAmount = 0;
var opBal =0 ;
var curBal = 0;
 var sDate=''; //curr.toISOString().substr(0,10);
 var eDate= '';
 var date = new Date();
 var cMonth = date.getMonth()+12;
var stDate = new Date(date.getFullYear()+1, date.getMonth()-cMonth, 2);
var enDate = new Date(stDate.getFullYear(), stDate.getMonth()+12, 1);
var reportType='';//new Date(date.getFullYear(), date.getMonth() + 1, 0);
var glNo='';
var glSub='';
var glName='';
var glData = [];
var msg='';
var PNLData = [];
var yearSelected=finYear;
var companyData = [];
//var startDate=format(stDate, "dd/MM/yyyy");
//var endDate=format(enDate, "dd/MM/yyyy");
var yearOption = [{label: finYear-2, value: finYear-2}, {label: finYear-1, value: finYear-1}, {label: finYear, value: finYear}, finYear];
function MonthlyProfitAndLoss() {
  const [startDate, setStartDate] = useState(stDate.toISOString().substr(0,10));
  const [endDate, setEndDate] = useState(enDate.toISOString().substr(0,10));
  const [Columns, setColumns] = useState([])
//  const month = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
  const [revData, setRevData]=useState([]);
  const [costData, setCostData] = useState([]);
  const [headings, setHeadings] = useState('');
  const [expData, setExpData] = useState([]);
  const [totalRev, setTotalRev] = useState(0.00);
  const [totalCostOfSales, setTotalCostOfSales] = useState(0.00);
  const [totalExpenses, setTotalExpenses] = useState(0.00);
  const [grossProfit, setGrossProfit] = useState(0.00);
  const [gpPercent, setGpPercent] = useState(0.00);
  const monthEnd=[0,31,28,31,30,31,30,31,31,30,31,30,31];
   const [netProfitAfter, setNetProfitAfter] = useState(0.00);
   const [taxOnYear, setTaxOnYear] = useState(0.00);
   const [netProfitBefore, setNetProfitBefore] = useState(0.00);
  // var companyInfo = [];
   //const [companyInfo, setCompanyInfo] = useState([]);
 //  const [profit, setProfit] = useState(0.00);
  // alert(endDate);
  //const [glData, setGlData] = useState([]);
  const formatInputStartDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
   //  alert(e.target.value);
    setStartDate(dDate);
  //  setData([]);
    // setTxnDate(dDate);
    //    alert(txnDate);
    // onSearchVoucher(setTxnDate(dDate));
  //  inputRef.current.focus();
  };
  const formatInputeDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setEndDate(dDate);
  //  setData([]);
    // setTxnDate(dDate);
    //    alert(txnDate);
    // onSearchVoucher(setTxnDate(dDate));
  //  inputRef.current.focus();
  };
  const formatInputsDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setStartDate(dDate);
    //   alert(dDate);
    // setTxnDate(dDate);
    //    alert(txnDate);
    // onSearchVoucher(setTxnDate(dDate));
   // inputRef.current.focus();
  };
  const  handleChangeYear = async (e) => {
    e.preventDefault();
   // finStartDate=sDate.toISOString().substr(0,10);
  //        finEndDate=eDate.toISOString().substr(0,10);
//eDate.setFullYear(finYear);
 //   eDate.setFullYear(finYear)
  //   finStartDate=sDate.toISOString().substr(0,10);
      yearSelected=e.target.value;
    //  alert(yearSelected);
       sDate = new Date(finStartDate);
       eDate = new Date(finEndDate);
     // setFullYear(yearValue, monthValue, dateValue)
     sDate.setFullYear(yearSelected);
     eDate.setFullYear(yearSelected);
      //s_date = moment(s_date.setFullYear(yearSelected));
       sDate=(sDate.toISOString().substr(0,10));
       eDate=(eDate.toISOString().substr(0,10));

  //  alert(sDate);
       setStartDate(sDate);
       setEndDate(eDate);
    //    alert(startDate);

     //var stDate = new Date(date.getFullYear()+1, date.getMonth()-cMonth, 2);
     //var enDate = new Date(stDate.getFullYear(), stDate.getMonth()+1, 1);
  };
   const onClear = async () => {
    totalDebit=0;
    totalCredit=0;
     setRevData([]);
     setCostData([]);
     setExpData([]);
     msg='';
     setTotalRev(0.00);
     setTotalCostOfSales(0.00);
     setTotalExpenses(0.00);
     profit=0;
     setTaxOnYear(0.00);
  };
  const onHome = async () => {
        window.location='home';

   };
  const onPrint = async () => {
   //  alert('totalRev: '+totalRev+' - totalCostOfSales: '+totalCostOfSales+' - totalExpenses: '+totalExpenses+' - profit: '+profit+' - taxOnYear: '+taxOnYear);
    if(revData.length === 0) {
      alert('P&L Revenue section is blank for printing');
      return false;
     }
     if(costData.length === 0) {
      alert('P&L Cosy Of Sales section is blank for printing');
      return false;
     }
     if(expData.length === 0) {
      alert('P&L Expenditure section is blank for printing');
      return false;
     }
     /*
     const newData1 =
     {
        addNo: ' ',
        glName: 'TOTAL REVENUE',
        totalText: ' ',
        amount: totalRev,

     };
      revData.push(newData1);

      const newData2 =
      {
         addNo: ' ',
         glName: ' ',
         totalText: ' ',
         amount: ' ',
      };
       revData.push(newData2);
       const newDatac =
       {
          addNo: 'LESS',
          glName: 'COST OF SALES',
          totalText: ' ',
          amount: 'RM',

       };
       revData.push(newDatac);


      for (let i = 0; i < costData.length; i++) {
        const newData =
        {
           addNo: costData[i].addNo,
           glName: costData[i].glName,
           totalText: costData[i].totalText,
           amount: costData[i].amount,

        };
      revData.push(newData);
      }
      const newData3 =
      {
         addNo: '',
         glName: 'TOTAL COST OF SALES',
         totalText: ' ',
         amount: totalCostOfSales,

      };
      revData.push(newData3);
*/

   //  return false;
     Axios
     .get(url + `/companyInfo`,
       {
         params: {
           companyID: companyID,

         }
       }
     ).then(res => {
         companyData=res.data;
     //  setCompanyInfo(res.data);
    //  alert(companyData.length);

    //  alert(companyData.length);
     reportType='PNL';
   let sDate = new Date (startDate);
      let eDate = new Date(endDate);
  //alert(eDate);
     PNLPDF(companyData, revData, costData, expData, totalRev, totalCostOfSales, totalExpenses, profit, taxOnYear, format(sDate, 'dd/MM/yyyy'), format(eDate, 'dd/MM/yyyy'))
    });

   };
  const formatInputEndDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setEndDate(dDate);

  };
  const onSave = async () => {
       // PNLData.push(newData)
  // alert(res.data.length);
  let lastDate = new Date(endDate) ;
  let nYear= lastDate.getFullYear();
 // alert(nYear);
 // alert(todayDate);
 PNLData=[];
 let newData1 = {
  companyID: companyID,
   year: nYear,
   startDate: startDate,
   endDate: endDate,
  PNLType: 'REV',
  addNo: '',
  glName: 'REVENUE',
  totalText: 'RM',
  amount: 0.00,
  date_close: todayDate,
}
  PNLData.push(newData1);
 // alert(PNLData.length);
 // alert(PNLData[0].totalText);
  for (let i = 0; i < revData.length; i++) {
    let newData = {
      companyID: companyID,
       year: nYear,
       startDate: startDate,
       endDate: endDate,
      PNLType: 'REV',
      addNo: revData[i].addNo,
      glName: revData[i].glName,
      totalText: revData[i].totalText, // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
      amount: revData[i].amount, // res.data[x].debit-res.data[x].credit,
      date_close: todayDate,
    }
      PNLData.push(newData);

  }
  let newDataR1 = {
    companyID: companyID,
     year: '',
     startDate: startDate,
     endDate: endDate,
    PNLType: 'REV',
    addNo: '',
    glName: '',
    totalText: 'TOTAL REVENUE :', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
    amount: totalRev, // res.data[x].debit-res.data[x].credit,
   date_close: '',
  }
    PNLData.push(newDataR1);
 //   alert(PNLData.length);
 let newData2 = {
  companyID: companyID,
   year: nYear,
   startDate: startDate,
   endDate: endDate,
  PNLType: 'COST',
  addNo: '',
  glName: 'COST OF SALES',
  totalText: 'RM', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
  amount: 0.00, // res.data[x].debit-res.data[x].credit,
  date_close: todayDate,
}
  PNLData.push(newData2);
 for (let i = 0; i < costData.length; i++) {
  let newDataCost = {
    companyID: companyID,
     year: nYear,
     startDate: startDate,
     endDate: endDate,
    PNLType: 'COST',
    addNo: costData[i].addNo,
    glName: costData[i].glName,
    totalText: costData[i].totalText, // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
    amount: costData[i].amount, // res.data[x].debit-res.data[x].credit,
    date_close: todayDate,
  }
    PNLData.push(newDataCost);

}
const newDatas = {
  companyID: companyID,
   year: '',
   startDate: startDate,
   endDate: endDate,
  PNLType: 'COST',
  addNo: '',
  glName: '',
  totalText: 'GROSS PROFIT :', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
  amount: (totalRev-totalCostOfSales), // res.data[x].debit-res.data[x].credit,
 date_close: '',
}
  PNLData.push(newDatas);
  const newDatap = {
    companyID: companyID,
     year: '',
     startDate: startDate,
     endDate: endDate,
    PNLType: 'COST',
    addNo: '',
    glName: '',
    totalText: 'GROSS PROFIT MARGIN :', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
    amount: ((totalRev-totalCostOfSales)/totalRev), // res.data[x].debit-res.data[x].credit,
   date_close: '',
  }
    PNLData.push(newDatap);
    let newData3 = {
      companyID: companyID,
       year: nYear,
       startDate: startDate,
       endDate: endDate,
      PNLType: 'EXP',
      addNo: '',
      glName: 'EXPENDITURE',
      totalText: 'RM', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
      amount: 0.00, // res.data[x].debit-res.data[x].credit,
      date_close: todayDate,
    }
      PNLData.push(newData3);
    for (let i = 0; i < expData.length; i++) {
      let newDataExp = {
        companyID: companyID,
         year: nYear,
         startDate: startDate,
         endDate: endDate,
        PNLType: 'EXP',
        addNo: expData[i].addNo,
        glName: expData[i].glName,
        totalText: expData[i].totalText, // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
        amount: expData[i].amount, // res.data[x].debit-res.data[x].credit,
        date_close: todayDate,
      }
        PNLData.push(newDataExp);

    }
    let newDataExp3 = {
      companyID: companyID,
       year: '',
       startDate: startDate,
       endDate: endDate,
      PNLType: 'EXP',
      addNo: '',
      glName: '',
      totalText: 'TOTAL EXPENSES :', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
      amount: totalRev, // res.data[x].debit-res.data[x].credit,
     date_close: '',
    }
      PNLData.push(newDataExp3);

    let newDataBFTAX = {
      companyID: companyID,
       year: '',
       startDate: startDate,
       endDate: endDate,
      PNLType: 'EXP',
      addNo: '',
      glName: '',
      totalText: 'NET PROFIT/(LOSS) BEFORE TAX :', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
      amount: profit, // res.data[x].debit-res.data[x].credit,
     date_close: '',
    }
      PNLData.push(newDataBFTAX);
      let newDataTOY = {
        companyID: companyID,
         year: '',
         startDate: startDate,
         endDate: endDate,
        PNLType: 'EXP',
        addNo: '',
        glName: '',
        totalText: 'LESS TAX FOR THE YEAR :', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
        amount: taxOnYear, // res.data[x].debit-res.data[x].credit,
       date_close: '',
      }
        PNLData.push(newDataTOY);
        let newDataPAT = {
          companyID: companyID,
           year: '',
           startDate: startDate,
           endDate: endDate,
          PNLType: 'EXP',
          addNo: '',
          glName: '',
          totalText: 'NET PROFIT AFTER TAX :', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
          amount: (profit-taxOnYear), // res.data[x].debit-res.data[x].credit,
         date_close: '',
        }
          PNLData.push(newDataPAT);
        //  alert(PNLData.length);
        const eDate = new Date(endDate);
        const year = eDate.getFullYear();
        const user = {  companyID: companyID, year: year};


          Axios
          .post(url + '/profitAndLossDelete', user  )
          .then(res => {
          }, []);

          Axios
          .post(url + '/incomeSummaryDelete', user  )
          .then(res => {

            Axios
            .post(url + '/incomeSummary', incData
            ).then(res => {
              if (res.data === 'Success') {

              };
              //  alert(text);
            }, []);



          }, []);





//alert(PNLData[0].glName);
      Axios
      .post(url + '/profitAndLossUpdate', PNLData
      ).then(res => {
        if (res.data === 'Success') {

        };
        //  alert(text);
      }, []);
      const incData = {
       companyID: companyID,
       year: year,
       startDate: startDate,
       endDate: endDate,
       beforeTax: profit,
       tax: taxOnYear,
       afterTax: profit-taxOnYear,

      };


  };

const onSearchMonth = async () => {
// load glLis
let saleData =[];
let prodData = [];
totalDebit=0;
totalCredit=0;
let sDate = new Date (startDate);
let eDate = new Date(endDate);
let firstDay = Number(String(sDate.getFullYear())+String(sDate.getMonth()+1).padStart(2, '0')+String(sDate.getDate()).padStart(2, '0'));
let lastDay =  Number(String(eDate.getFullYear())+String(eDate.getMonth()+1).padStart(2,'0')+String(eDate.getDate()).padStart(2,'0'));

let month=sDate.getMonth()+1;
//alert(monthEnd[month]+' - '+month);
 // if (lastDay-firstDay > monthEnd[month]) {
 //     alert('Ending Day cannot latter than the last day of the month');
 //     return false;
 // }

  if (isNaN(sDate.getTime())) {
    alert('Invalid Starting Date') ;
    return false;
  }
  if (isNaN(eDate.getTime())) {
    alert('Invalid Ending Date') ;
    return false;
  }
  if (eDate < sDate) {
    alert('Ending date must later than Starting date') ;
    return false;
  }
  let difference = eDate.getTime() - sDate.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

  if (TotalDays > 365) {
    alert('Starting and Ending date cannot more than one year');
    return false;
  }

 reportType='MPL';
 //alert(sDate+" = "+eDate);
Axios
.get(url + `/monthlyRevenue`,
  {
    params: {
    companyID: companyID,
    startDate: format(sDate,"yyyy-MM-dd"),
    endDate: format(eDate, "yyyy-MM-dd"),
    }
  }
).then(res => {

   if (res.data.length === 0) {
     alert('No G/L Account created');
     return false;
   }
  // alert(res.data.length);
  for (let x = 0; x < res.data.length; x++) {
    if (res.data[x].debit === null){
      res.data[x].debit=0;
    }
    if (res.data[x].credit === null){
      res.data[x].credit=0;
    }

      //  res.data[x].debit = dAmt ;//Math.abs(res.data[x].debit);
     //  }
       if (res.data[x].credit < 0) {
        res.data[x].credit = (res.data[x].credit * -1); //Math.abs(res.data[x].credit);
       }
       if (res.data[x].debit < 0) {
        res.data[x].debit = (res.data[x].debit * -1); //Math.abs(res.data[x].credit);
       }
   //     alert(res.data[x].debit+' - '+res.data[x].credit);
    // totalDebit+=res.data[x].debit;
    // totalCredit+=res.data[x].credit;
      let addNo='';
      let amt =0;
      if (res.data[x].debit > 0) {
          amt=res.data[x].debit;
      } else {
          amt = res.data[x].credit;
      }
       if (res.data[x].glType === '203') {
          addNo = 'Less :';
        //  totalDebit-= amt; //res.data[x].debit;
          totalCredit-= amt; // res.data[x].credit;
       } else {
       // totalDebit+=res.data[x].debit;
        totalCredit+= amt; //res.data[x].credit;
       }
  //   alert(totalCredit);
      // setTotalRev(totalCredit);
      if (res.data[x].debit !==0 || res.data[x].credit !==  0) {
     let newData = {
      addNo: addNo,
      glName: res.data[x].glName,
      totalText: '', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
      amount: amt, // res.data[x].debit-res.data[x].credit,
      }
      saleData.push(newData);
   } // if

  } //for
    let revAmt=0
   for (let y = 0; y < saleData.length; y++) {
      if (saleData[y].addNo === 'Less :') {
          revAmt-=saleData[y].amount;
      } else {
           revAmt+=saleData[y].amount;
      }
   }
  //  alert(revAmt);
//  setGrossProfit(revAmt);
//  alert(grossProfit);
   setTotalRev(revAmt);
  // alert(totalRev);
   setRevData(saleData);
  })
  // alert(totalRev);
  // PNLCostOfSales
  Axios
  .get(url + `/PNLCostOfSales`,
    {
      params: {
      companyID: companyID,
      startDate: format(sDate,"yyyy-MM-dd"),
      endDate: format(eDate, "yyyy-MM-dd"),
      }
    }
  ).then(res => {

     if (res.data.length === 0) {
       alert('No Product Opening Balance available');
       return false;
     }
     let cosAmt = 0;
     for (let y = 0; y < res.data.length; y++) {
      if (res.data[y].addNo === 'Less :') {
          cosAmt-=res.data[y].amount;
      } else {
           cosAmt+=res.data[y].amount;
      }
/*
      if (res.data[y].glType === '204') {
        let addNo = 'Less :';
      //  totalDebit-= amt; //res.data[x].debit;
      //  totalCredit-= amt; // res.data[x].credit;
      let newData = {
        addNo: addNo,
        glName: res.data[y].glName,
        totalText: '', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
        amount: cosAmt, // res.data[x].debit-res.data[x].credit,
        }
        res.data.push(newData);

    }
*/


   }
    //  cosAmt=convertNumber(cosAmt);
     setTotalCostOfSales(cosAmt);

      setCostData(res.data);

 //alert(totalRev);


});

Axios
.get(url + `/PNLExpenses`,
  {
    params: {
    companyID: companyID,
    startDate: format(sDate,"yyyy-MM-dd"),
    endDate: format(eDate, "yyyy-MM-dd"),
    }
  }
).then(res => {

   if (res.data.length === 0) {
     alert('No Expenses available');
     return false;
   }
    setExpData(res.data);
    let expAmt = 0;
    for (let y = 0; y < res.data.length; y++) {
         expAmt+=res.data[y].amount;
     }
         setTotalExpenses(expAmt);
      // computeTax(profit);
});
};
// ****** get incomeTax data
 //alert(totalRev-totalCostOfSales-totalExpenses);


const computeTax = (amount) => {


 //alert(amount);
 //alert(profit);

Axios
.get(url + `/loadTaxComputation`,
  {
    params: {
    companyID: companyID,
    profit: amount,
    }
  }
).then(res => {

   if (res.data.length > 0) {

        yearTax=res.data[0].tax+res.data[0].nextTax;
     setTaxOnYear(yearTax);
     // alert('year: '+yearTax);
     return yearTax;
  }
});
// if
//return profit;
};
const convertNumber = async (cNumber) => {
     // let cNumber = e.target.value;;
 //     alert(cNumber);
   let conNumber = parseFloat(cNumber).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    if (cNumber < 0) {

       let cvNumber=parseFloat(cNumber*-1).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      conNumber="("+String(cvNumber)+")";
    }
    alert(conNumber);
    return conNumber ;

};



  const onSearchOpbalance = async (e) => {
    reportType = 'OTB';
    setRevData([]);
    data = [];
  //  alert(month[1])
    Axios
    .get(url + `/glList`,
      {
        params: {
        companyID: companyID,

        }
      }
    ).then(res => {

    //  setCompanyInfo(res.data);
        if (res.data.length ===0) {  // if.1
          alert('No G/L Account Account created');
        } else {

          glData = res.data;

          data= [];

     //  setData([]);
           drAmount = 0;
           crAmount= 0;
           totalDebit=0;
           totalCredit=0;
         for (let i = 0; i < glData.length; i++) {
              if (glData[i].opBalance < 0) {
                //  crAmount=glData[i].opBalance;
                  drAmount =0;
                  if (typeof glData[i].opBalance !=='number' ) {
                     crAmount =0 ;
                   } else {
                    crAmount= glData[i].opBalance;
                   }

                } else {
                //  alert(typeof glData[i].opBalance);
                   crAmount = 0;
                   if (typeof glData[i].opBalance !=='number') {
                    drAmount =0 ;
                   } else {
                    drAmount= glData[i].opBalance;
                   }
               }
               totalDebit+=drAmount;
               totalCredit+=crAmount;
                  glNo = glData[i].glNo;
                  glSub = glData[i].glSub;
                  glName = glData[i].glName;
                const newData =
                 {
                    glNo: glNo,
                    glSub: glSub,
                    glName: glName,
                    debit: drAmount,
                    credit: crAmount,

                 };
                  data.push(newData)

                //  alert(data.length);

               } // for

               if (Number(totalDebit.toFixed(2)) !== Number(Math.abs(totalCredit.toFixed(2)))) {
            //    alert(totalDebit.toFixed(2)+" = "+Math.abs(totalCredit.toFixed(2)));
                msg="Opening Balance Debit and Credit Amount not equal"
               }else{
                msg='';
               }
               setRevData(data);

              } // else



       //    alert(sales);
          })  // .then



         //     for (let x = 0; x < Data.length; x++) {

         //       totalDebit+=Data[x].debit;
         //       totalCredit+=Data[x].credit;

      //        }

         //
          //   alert(totalDebit);


            };





  useEffect(() => {
    totalDebit=0;
    totalCredit=0;
 /*
    Axios
    .get(url + `/companyInfo`,
      {
        params: {
        companyID: companyID,
        }
      }
    ).then(res => {
        let sDate=new Date(res.data[0].finYearStart);
       // finStartDate=sDate.toISOString().substr(0,10)
        let eDate=new Date(res.data[0].finYearEnd);
          if (sDate.getMonth() >1) {
            sDate.setFullYear(finYear-1);
          } else {
          sDate.setFullYear(finYear);
          }
          eDate.setFullYear(finYear);
       //   eDate.setFullYear(finYear)
          finStartDate=sDate.toISOString().substr(0,10);
          finEndDate=eDate.toISOString().substr(0,10);
         //  alert(typeof finStartDate);
         sDate=(sDate.toISOString().substr(0,10));
         eDate=(eDate.toISOString().substr(0,10));
         //alert(sDate);
       //  setStartDate(finStartDate);
        //  setEndDate(eDate);
        //  setYearSelected(finYear);
        //  alert(yearSelected);
    });
  */
   //  alert(finYear);
  });

    return (







        <div>

          <div className="row">

            <div className="col-sm-12" style={{ marginTop: '1px', backgroundColor: '#fa93ca', color: 'black' }}>
              <h2>Profit And Loss Account</h2>
            </div>
          </div>

          <div style={{
      display: 'inline-block',
      width: '1520px',
      height: '50px',
      margin: '6px',
      backgroundColor: 'white',
      border: '4px solid grey',
    }}>
 <label style={{ paddingLeft: "100px", marginTop: '.4rem'}}>
  <a style={{  marginRight: '.8rem' }} >Profit & Loss From Date : </a>
        <input
          type="date"
          maxLength={10}
          value={startDate}
          style={{ width: '10%', border: '1px solid #696969' }}
        //  defaultValue = {sDate}
          onChange={(e) => formatInputsDate(e)}
          onBlur={(e) => formatInputStartDate(e) }
          name="startDate"
          required
          disabled={false}
     
        />


        <a style={{ marginLeft: '1rem', marginRight: '.8rem' }} >To Date : </a>
                <input
                  type="date"
                  maxLength={10}
                  value={endDate}
            //      defaultValue={eDate}
                  style={{ marginRight: '2rem', width: '10%', border: '1px solid #696969' }}
                  name="endDate"
                 onChange={(e) => formatInputeDate(e)}
                  onBlur={(e) => formatInputEndDate(e) }
                  required
                  disabled={false}
 
                />




<button
            style={{ padding: '4px', marginLeft: '2rem' }}
            type='button'
            class='btn btn-info fa fa-download float-right'
            onClick={() => onSearchMonth()}
 
          >Load Profit & Loss Report</button>


<button
            style={{ padding: '1px', marginLeft: '2rem' }}
            type='button'
            class='btn btn-danger float-right'
            onClick={() => onClear()}
  
          >Clear</button>

<button
            style={{ padding: '4px', marginLeft: '2rem' }}
            type='button'
            class='btn btn-warning fa fa-print float-right'
            onClick={() => onPrint()}
 
          >Print</button>

<button
            style={{ padding: '1px', marginLeft: '2rem' }}
            type='button'
            class='btn btn-success'
            onClick={() => onHome()}
 
          >Home</button>


<button

            style={{ backgroundColor: '#5b5959', color: 'white', height: '28px',width: '200px', marginLeft: '1rem', paddingTop: '1px'}}
            type='button'
            class='btn btn-Default'
            onClick={() => onSave()}
  
          >Save Yearly Report</button>



</label>
  </div>

  <Blink color='red' text={msg} fontSize='20'>

  </Blink>

   <div className="row" style={{margin: '20px'}}>

   <div className="col-sm-12" style={{ marginTop: '1px', color: 'black' }}>
     <h2>{headings} </h2>

   </div>

   <span class="square border border-dark"></span>
   <table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}></th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '1000px', textAlign: 'center' }}>REVENUE</th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}></th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}>RM</th>

               </tr>
          </thead>
          <tbody style={{align:'left'}} >
            {revData.map(item => {
              return <tr key={item.id}>

                <td class="square border border-dark" style={{ textAlign: 'center', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


              </tr>

            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tbody>
          <tfoot>


            <td></td><td></td>
            <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#eae4e4" }}>TOTAL REVENUE :</td>
            <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(totalRev).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

            <td></td>
            <td></td>
            <td></td>
          </tfoot>
        </table>

        <span class="square border border-dark"></span>
   <table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Less: </th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '1000px', textAlign: 'center' }}>COST OF SALES</th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}></th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}>RM</th>

               </tr>
          </thead>
          <tbody style={{align:'left'}} >
            {costData.map(item => {
              return <tr key={item.id}>

                <td class="square border border-dark" style={{ textAlign: 'center', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


              </tr>

            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tbody>
          <tfoot>


            <td></td><td></td>
            <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#eae4e4", marginLeft: '20rem' }}>TOTAL COST OF SALES :</td>
            <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(totalCostOfSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <p></p>
           <tr class="square border border-dark">
            <td></td><td></td>
            <td class="square border border-dark">GROSS PROFIT : </td>
            <td class="square border border-dark" style={{textAlign: 'right'}}>{parseFloat(profit=(totalRev-totalCostOfSales)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            </tr>

            <tr>
           <td></td><td></td>
            <td class="square border border-dark">GROSS PROFIT MARGIN : </td>
            <td class="square border border-dark" style={{textAlign: 'right'}}>{parseFloat((totalRev-totalCostOfSales)/totalRev).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
           </tr>
            </tfoot>

        </table>



        <span class="square border border-dark"></span>
   <table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Less: </th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '1000px', textAlign: 'center' }}>EXPENDITURE</th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}></th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}>RM</th>

               </tr>
          </thead>
          <tbody style={{align:'left'}} >
            {expData.map(item => {
              return <tr key={item.id}>

                <td class="square border border-dark" style={{ textAlign: 'center', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


              </tr>

            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tbody>
          <tfoot>


            <td></td><td></td>
            <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#eae4e4", marginLeft: '20rem' }}>TOTAL EXPENSES :</td>
            <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(totalExpenses).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <tr class="square border border-dark">
            <td></td><td></td>
            <td class="square border border-dark">NET PROFIT/(LOSS) BEFORE TAX : </td>
            <td class="square border border-dark" style={{textAlign: 'right'}}>{parseFloat(profit=(totalRev-totalCostOfSales-totalExpenses)).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
             </tr>



            <tr class="square border border-dark">
           <td></td><td></td>
            <td class="square border border-dark">LESS TAX FOR THE YEAR :
            <button class="btn" onClick={() => {
             computeTax(profit);
           }} data-tip data-for="taxOnYearTip"  ><i class="fa fa-download"></i></button>
            </td>

            <td class="square border border-dark" style={{textAlign: 'right'}}>{parseFloat(taxOnYear).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}

            </td>

           </tr>
           <tr class="square border border-dark">
            <td></td><td></td>
            <td class="square border border-dark">NET PROFIT/(LOSS) AFTER TAX : </td>
            <td class="square border border-dark" style={{textAlign: 'right'}}>{parseFloat(profit-taxOnYear).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            </tr>


            </tfoot>


        </table>


</div>
</div>






    ); //return
}; // function
export default MonthlyProfitAndLoss;
