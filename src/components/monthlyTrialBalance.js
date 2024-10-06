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
var msg='';
var closeStockTotal=0;
function MonthlyTrialBalance() {
  const [startDate, setStartDate] = useState(stDate.toISOString().substr(0,10));
  const [endDate, setEndDate] = useState(enDate.toISOString().substr(0,10));
  const [Columns, setColumns] = useState([])
//  const month = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
  const [Data, setData]=useState([]);
  const [headings, setHeadings] = useState('')
  const monthEnd=[0,31,28,31,30,31,30,31,31,30,31,30,31];

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
     msg='';
  };
  const onHome = async () => {
        window.location='home';

   };
  const onPrint = async () => {
     if(Data.length === 0) {
      alert(reportType+': No Op Balance or Monthly Trial Balance Report for printing');
      return false;
     }
      if (reportType==='') {
        alert('No Op Balance or Monthly Trial Balance Report for printing');
        return false;
      }
      let sDate = new Date (startDate);
      let eDate = new Date(endDate);

     ExportTrialBalancePdf(Data, reportType, totalDebit, totalCredit, format(sDate, 'dd/MM/yyyy'), format(eDate, 'dd/MM/yyyy'))


   };
  const formatInputEndDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setEndDate(dDate);

  };
  const formatInputeDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setEndDate(dDate);

  };

const onSearchMonth = async () => {
// load glList
totalDebit=0;
totalCredit=0;
let sDate = new Date (startDate);
let eDate = new Date(endDate);
let firstDay = Number(String(sDate.getFullYear())+String(sDate.getMonth()+1).padStart(2, '0')+String(sDate.getDate()).padStart(2, '0'));
let lastDay =  Number(String(eDate.getFullYear())+String(eDate.getMonth()+1).padStart(2,'0')+String(eDate.getDate()).padStart(2,'0'));

let difference = eDate.getTime() - sDate.getTime();
 let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

 if (TotalDays > 365) {
   alert('Starting and Ending date cannot more than one year');
   return false;
 }
//alert(TotalDays);

//month = props.date.toLocaleString("en-us", { month: "long" });
//const day = props.date.toLocaleString("en-us", { day: "2-digit" });
//const year = props.date.getFullYear();
//alert(lastDay-firstDay);
let month=sDate.getMonth()+1;
//alert(monthEnd[month]+' - '+month);
  //if (lastDay-firstDay > monthEnd[month]) {
  //    alert('Ending Day cannot latter than the last day of the month of Starting Date');
  //    return false;
 // }

  if (isNaN(sDate.getTime())) {
    alert('Invalid Starting Date') ;
    return false;
  }
  if (isNaN(eDate.getTime())) {
    alert('Invalid Ending Date') ;
    return false;
  }
/*
  Axios
  .get(url + `/closingStock`,
    {
      params: {
      companyID: companyID,
      startDate: format(sDate,"yyyy-MM-dd"),
      endDate: format(eDate, "yyyy-MM-dd"),
      }
    }
  ).then(res => {


     closeStockTotal =res.data[0].amount;

   //   alert(closeStockTotal)
      //  setStockData(res.data);


      })
  */
 reportType='MTB';
Axios
.get(url + `/monthlyTrialBalance`,
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
   //alert(res.data[0].companyID);
  for (let x = 0; x < res.data.length; x++) {
    if (res.data[x].debit === null){
      res.data[x].debit=0;
    }
    if (res.data[x].credit === null){
      res.data[x].credit=0;
    }
   // alert(x)
/*
     if (x === res.data.length-1 ) {
   //   alert(x)
     res.data[x].glNo ='';
     res.data[x].glSub ='';
     res.data[x].glName='Inventory Closing Balance';
     res.data[x].debit=closeStockTotal;
     res.data[x].credit=0;
     }
*/
     totalDebit+=res.data[x].debit;
     totalCredit+=res.data[x].credit;
  }
   setData(res.data);



  })
};

 const onSave = async () => {
  for (let i = 0; i < Data.length; i++) {
       Data[i].startDate = startDate;
       Data[i].endDate= endDate;
       if (Data[i].credit <0 ) {
        Data[i].credit=(Data[i].credit * -1);
       }
  }

  const eDate = new Date(endDate);
  const year = eDate.getFullYear();
  const user = {  companyID: companyID, year: year}


Axios
  .post(url + '/trialBalanceDelete', user  )
  .then(res => {
  }, []);





 Axios
 .post(url + '/trialBalanceUpdate', Data



 )

 .then(res => {


   if (res.data === 'Success') {



     //    window.location.reload(false);
     // window.location.href='journalVoucher';

   };
   //  alert(text);
 }, []);



 }; // onSave


  const onSearchOpbalance = async (e) => {
    let sDate = new Date (startDate);
    let eDate = new Date(endDate);

      //  alert(closeStockTotal)
    reportType = 'OTB';
    setData([]);
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


                  //   alert(x)







               } // for
              /*
               const newData =
               {
                  glNo: '',
                  glSub: '',
                  glName:'Inventory Opening Balance' ,
                  debit: closeStockTotal,
                  credit: 0,

               };

               data.push(newData);

               totalDebit+=closeStockTotal;
               */
              // totalCredit+=data[i].credit;



               if (Number(totalDebit.toFixed(2)) !== Number(Math.abs(totalCredit.toFixed(2)))) {
            //    alert(totalDebit.toFixed(2)+" = "+Math.abs(totalCredit.toFixed(2)));
                msg="Opening Balance Debit and Credit Amount not equal"
               }else{
                msg='';
               }
               setData(data);

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

  });

    return (







        <div>

          <div className="row">

            <div className="col-sm-12" style={{ marginTop: '1px', backgroundColor: '#93fac0', color: 'black' }}>
              <h2>Trial Balance</h2>
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

  <label style={{ paddingLeft: "100px", marginTop: '.4rem'}}>
  <a style={{  marginRight: '.8rem' }} >Report From Date : </a>
        <input
          type="date"
          maxLength={10}
          value={startDate}
          style={{ width: '10%', border: '1px solid #696969' }}
          //  defaultValue = {txnDate}
          name="startDate"
          onChange={(e) => formatInputsDate(e)}
          onBlur={(e) => formatInputStartDate(e) }
          required
     
        />


        <a style={{ marginLeft: '1rem', marginRight: '.8rem' }} >To Date : </a>
                <input
                  type="date"
                  maxLength={10}
                  value={endDate}
                  style={{ width: '10%', border: '1px solid #696969' }}
                  name="endDate"
                  onChange={(e) => formatInputeDate(e)}
                  onBlur={(e) => formatInputEndDate(e) }
                  required
 
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
                <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{parseFloat(item.debit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.credit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


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
export default MonthlyTrialBalance;
