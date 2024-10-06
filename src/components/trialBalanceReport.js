import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import './Profile.css';
import ReactDOM from "react-dom";
import generatePDF from "./reportGenerator";
import { format } from "date-fns";
import moment from 'moment';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Tooltip as ReactTooltip } from "react-tooltip";
//import {yearlyReport, quarterlyReport, monthlyReport} from "./salesReport";
import BootstrapTable from 'react-bootstrap-table-next';
import { AirlineSeatIndividualSuiteSharp, SettingsBackupRestoreRounded } from '@material-ui/icons';
import Moment from 'react-moment';
//import {CSVLink} from 'react-csv';
import ExportTrialBalancePdf from './pdfTrialBalanceGenerator';
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
// format(new Date(date), "dd/MM/yyyy") ;

// alert(format(curr.toISOString().substr(0,10)), "dd/MM/yyyy");
//curr.setDate(curr.getDate());
var dDate= new Date(curr.setDate(curr.getDate()-7));

var data = [];
var gData=[];
var opData=[];
var totalDebit =0;
var totalCredit = 0;
var drAmount=0;
var crAmount=0;
var totalDrAmount =0;
var totalCrAmount = 0;
var opBal =0 ;
var curBal = 0;
 var sDate=curr.toISOString().substr(0,10);
 var date = new Date();
 var cMonth = date.getMonth()+12;
var stDate = new Date(date.getFullYear()+1, date.getMonth()-cMonth, 2);
var enDate = new Date(stDate.getFullYear(), stDate.getMonth()+12, 1);
var reportType='';//new Date(date.getFullYear(), date.getMonth() + 1, 0);
var glNo='';
var glSub='';
var glName='';
var glData = [];


function TrialBalanceReport() {
  const [startDate, setStartDate] = useState(stDate.toISOString().substr(0,10));
  const [endDate, setEndDate] = useState(enDate.toISOString().substr(0,10));
  const [Columns, setColumns] = useState([])
//  const month = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
  const [Data, setData]=useState([]);
  const [headings, setHeadings] = useState('Yearly Trial Balance')
  const monthEnd=[0,31,28,31,30,31,30,31,31,30,31,30,31];
  const [year, setYear] = useState(stDate.getFullYear());
  // alert(endDate);
  //const [glData, setGlData] = useState([]);
  const formatInputStartDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setStartDate(dDate);
    setData([]);
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
  const onClear = async () => {
    totalDebit=0;
    totalCredit=0;
     setData([]);
  //   msg='';
  };
  const onHome = async () => {
        window.location='home';

   };
  const onPrint = async () => {
     if(Data.length === 0) {
      alert(reportType+': No Yearly Trial Balance Report for printing');
      return false;
     }
     reportType='MTB'
      let sDate = new Date (startDate);
      let eDate = new Date(endDate);
      let TBData = [];
      for (let x = 0; x < Data.length; x++) {
        const newData =
        {
           glNo: Data[x].glNo,
           glSub: Data[x].glSub,
           glName:Data[x].glName,
           debit: Data[x].drAmt,
           credit: Data[x].crAmt,

        };
          TBData.push(newData);


          }


     ExportTrialBalancePdf(TBData, reportType, totalDebit, totalCredit, format(sDate, 'dd/MM/yyyy'), format(eDate, 'dd/MM/yyyy'))


   };


const onSearchMonth = async () => {
// load glList
totalDebit=0;
totalCredit=0;

Axios
.get(url + `/yearlyTrialBalance`,
  {
    params: {
    companyID: companyID,
    year: year,
    }
  }
).then(res => {

   if (res.data.length === 0) {
     alert('No Trial Balance existed on YEAR : '+year);
     return false;
   }
   //alert(res.data[0].companyID);
  for (let x = 0; x < res.data.length; x++) {
    if (res.data[x].drAmt === null){
      res.data[x].drAmt=0;
    }
    if (res.data[x].crAmt === null){
      res.data[x].crAmt=0;
    }
     totalDebit+=res.data[x].drAmt;
     totalCredit+=res.data[x].crAmt;
  }
 // format(sDate,"yyyy-MM-dd")
     let sDate= new Date(res.data[0].startDate) ;
     let eDate= new Date(res.data[0].endDate) ;
    setStartDate(format(sDate,"yyyy-MM-dd"));
    setEndDate(format(eDate,"yyyy-MM-dd"));
   setData(res.data);
  })
};

  useEffect(() => {
    totalDebit=0;
    totalCredit=0;

  });

    return (







        <div>

          <div className="row">

          <div className="col-sm-12" style={{ marginTop: '1px', backgroundColor: 'white', color: 'black' }}>
              <h2>{headings}</h2>
            </div>
           </div>

          <div style={{
      display: 'inline-block',
      width: '1520px',
      height: '47px',
      margin: '6px',
      backgroundColor: 'white',
      border: '4px solid grey',
    }}>





   <label style={{paddingLeft: '10px', paddingTop:'5px'}}>
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

 <a style={{ marginLeft: '1rem', marginRight: '.8rem' }} >From Date : </a>
        <input
          type="date"
          maxLength={10}
          value={startDate}
          style={{ width: '10%', border: '1px solid #696969'}}
          //  defaultValue = {txnDate}
          name="startDate"
          required
          disabled={true}
        />


        <a style={{ marginLeft: '1rem', marginRight: '.8rem' }} >To Date : </a>
                <input
                  type="date"
                  maxLength={10}
                  value={endDate}
                  style={{ width: '10%', border: '1px solid #696969' }}
                  name="endDate"
                  required
                  disabled={true}
                />




<button
            style={{ padding: '4px', marginLeft: '2rem' }}
            type='button'
            class='btn btn-info fa fa-search float-right'
            onClick={() => onSearchMonth()}
 
            >Generate Trial Balance</button>


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



</label>
  </div>





   <div className="row" style={{margin: '20px'}}>



   <span class="square border border-dark"></span>
   <table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>

              <th style={{ backgroundColor: '#999999', width: '300px', textAlign: 'center' }}>G/L No.</th>
              <th style={{ backgroundColor: 'yellow', width: '400px', textAlign: 'center' }}>G/L Sub No.</th>
              <th style={{ backgroundColor: '#999999', width: '400px', textAlign: 'center' }}>G/L Name</th>
              <th style={{ backgroundColor: 'yellow', width: '400px', textAlign: 'center' }}>Debit</th>
              <th style={{ backgroundColor: '#999999', width: '400px', textAlign: 'center' }}>Credit</th>

               </tr>
          </thead>
          <tbody style={{align:'left'}} >
            {Data.map(item => {
              return <tr key={item.id}>

                <td class="square border border-dark" style={{ textAlign: 'center', backgroundColor: '#f5f0f0' }}>{item.glNo}</td>
                <td class="square border border-dark" style={{ textAlign: 'center', backgroundColor: '#f5f0f0' }}>{item.glSub}</td>
                <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{parseFloat(item.drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


              </tr>

            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tbody>
          <tfoot>


            <td></td><td></td>
            <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "cyan" }}>Trial Balance Totals :</td>
            <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "cyan" , color: "red" }}>{parseFloat(totalDebit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "cyan" , color: "red" }}>{parseFloat(totalCredit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>





            <td></td>
            <td></td>
            <td></td>



          </tfoot>
        </table>
</div>
</div>






    ); //return
}; // function
export default TrialBalanceReport;
