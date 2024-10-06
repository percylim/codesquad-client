import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import './Profile.css';
import ReactDOM from "react-dom";
import PNLREPORTPDF from "./pdfPNLReport";
import { format } from "date-fns";
import moment from 'moment';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Tooltip as ReactTooltip } from "react-tooltip";
//import {yearlyReport, quarterlyReport, monthlyReport} from "./salesReport";
import BootstrapTable from 'react-bootstrap-table-next';
import { AirlineSeatIndividualSuiteSharp, SettingsBackupRestoreRounded } from '@material-ui/icons';
import Moment from 'react-moment';
//import {CSVLink} from 'react-csv';
import PNLREPORYPDF from './pdfPnLGenerator';

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
function ProfitAndLossReport() {
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
   const [year, setYear] = useState(stDate.getFullYear());
   const [Data, setData] = useState([]);
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
     setData([]);

  };
  const onHome = async () => {
        window.location='home';

   };
  const onPrint = async () => {
   //  alert('totalRev: '+totalRev+' - totalCostOfSales: '+totalCostOfSales+' - totalExpenses: '+totalExpenses+' - profit: '+profit+' - taxOnYear: '+taxOnYear);
    if(Data.length === 0) {
      alert('P&L Data is blank for printing');
      return false;
     }




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
 // alert(Data[Data.length-1].totalText);
     PNLREPORTPDF(companyData, Data, format(sDate, 'dd/MM/yyyy'), format(eDate, 'dd/MM/yyyy'))
    });

   };

const onSearchMonth = async () => {
// load glLis
let saleData =[];
let prodData = [];
totalDebit=0;
totalCredit=0;

 reportType='PNL';
 //alert(sDate+" = "+eDate);
Axios
.get(url + `/yearlyProfitAndLoss`,
  {
    params: {
    companyID: companyID,
     year : year,
    }
  }
).then(res => {

   if (res.data.length === 0) {
     alert('No Profit And Loss Record on '+year+' loaded ');
     return false;
   }
   setData(res.data);

});
// ****** get incomeTax data
 //alert(totalRev-totalCostOfSales-totalExpenses);
};

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

   if (res.data.length === 0) {




   }
  /*
    let expAmt = 0;
    for (let y = 0; y < res.data.length; y++) {
         expAmt+=res.data[y].amount;
     }
  */
   //  alert(res.data.length);
    // yearTax=res.data[0].nextTax;
    // yearTax=parseFloat(res.data[0].tax+res.data[0].nextTax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        yearTax=res.data[0].tax+res.data[0].nextTax;
     setTaxOnYear(yearTax);
     // alert('year: '+yearTax);
     return yearTax;
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





  useEffect(() => {
    totalDebit=0;
    totalCredit=0;


  });

    return (







        <div>

          <div className="row">

            <div className="col-sm-12" style={{ marginTop: '1px', backgroundColor: 'white', color: 'black' }}>
              <h2>Yearly Profit And Loss Account Report</h2>
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

 <a style={{  marginRight: '.5rem' }} >Year to download : </a>
   <input
          maxLength={4}
          type='number'
          style={{marginLeft: '.5rem', marginRight: '1rem', width: '80px'}}
          value={year}
          name={year}
          required={true}
          onChange={e => setYear(e.target.value)}
        />

  <a style={{  marginRight: '.8rem' }} >From Date : </a>
        <input
          type="date"
          maxLength={10}
          value={startDate}
          style={{ width: '10%', border: '1px solid #696969' }}
          name="startDate"
          required
          disabled={true}

        />


        <a style={{ marginLeft: '1rem', marginRight: '.8rem' }} >To Date : </a>
                <input
                  type="date"
                  maxLength={10}
                  value={endDate}
            //      defaultValue={eDate}
                  style={{ marginRight: '2rem', width: '10%', border: '1px solid #696969' }}
                  required
                  disabled={true}

                />




<button
            style={{ padding: '4px', marginLeft: '2rem' }}
            type='button'
            class='btn btn-info fa fa-download float-right'
            onClick={() => onSearchMonth()}
      
          >Load Profit & Loss Report</button>

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






</label>
  </div>



   <div className="row" style={{margin: '20px'}}>



   <span class="square border border-dark"></span>
   <table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>

          <tbody style={{align:'left'}} >
            {Data.map(item => {
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

        </table>


</div>
</div>






    ); //return
}; // function
export default ProfitAndLossReport;
