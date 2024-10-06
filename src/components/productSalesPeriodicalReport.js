import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import './Profile.css';
import ReactDOM from "react-dom";
import generatePDF from "./reportGenerator";
import { format } from "date-fns";
import moment from 'moment';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Tooltip as ReactTooltip } from "react-tooltip";
//import {yearlyReport, quarterlyReport, monthlyReport} from "./salesReport";
import BootstrapTable from 'react-bootstrap-table-next';
import { AirlineSeatIndividualSuiteSharp, SettingsBackupRestoreRounded } from '@material-ui/icons';
import Moment from 'react-moment';
//import {CSVLink} from 'react-csv';
import ExportSalesAnalysisPdf from './pdfSalesAnalysisGenerator';
//import glList from './glList';
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
var year = '';
var nYear = '';
var sales = 0;
var debit = 0;
var credit = 0;
var netSales = 0;
var tax = 0;
var data = [];
var totalSales=0;
var totalDebit =0;
var totalCredit = 0;
var totalNetSales =0;
var totalTax =0;
var reportType='';
 var sDate=curr.toISOString().substr(0,10);
 var date = new Date();
 var cMonth = date.getMonth()+12;
var stDate = new Date(date.getFullYear()+1, date.getMonth()-cMonth, 2);
var enDate = new Date(date.getFullYear()-1, date.getMonth() + 12, 1);
var nMonth = '';
var cMonth = '';
function ProductSalesPeriodicalReport() {
  const [startDate, setStartDate] = useState(stDate.toISOString().substr(0,10));
  const [endDate, setEndDate] = useState(enDate.toISOString().substr(0,10));
  const [Columns, setColumns] = useState([])
  const month = ["","January","February","March","April","May","June","July","August","September","October","November","December"];
  const [Data, setData]=useState([]);
  const [headings, setHeadings] = useState('')

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
    totalSales =0;
    totalDebit=0;
    totalCredit=0;
    totalNetSales=0;
    totalTax=0;
   setData([]);
   data = [];

  };
  const onHome = async () => {
        window.location='home';

   };
  const onPrint = async () => {
     if(data.length === 0) {
      alert('No Product Sales Analysis Report for printing');
      return false;
     }
  /*
     let invoiceType = 'Sales Invoice';
     for (let i = 0; i < data.length; i++) {
          if (data[i].taxType === 'GST' ) {
            invoiceType = 'Tax Invoice';
          }
          data[0].salesRep = salesRep;
          data[0].salesParticular = salesParticular;
     }
    */
     ExportSalesAnalysisPdf(data, reportType, totalSales, totalDebit, totalCredit, totalNetSales)







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
  const onSearchYear = async (e) => {
    let sDate = new Date (startDate);
     let eDate = new Date(endDate);
    let months = (eDate.getFullYear() - sDate.getFullYear())*12 + (eDate.getMonth() - sDate.getMonth());
    //  alert(new Date(endDate).getFullYear()+new Date(endDate).getMonth());
   //  alert(months);
   reportType='YEAR';
    if (endDate < startDate) {
      alert('To Date must be later than From Date');
      return false;
    }
    cYear='Years';
    setHeadings ('Yearly Sales Analysis Report') ;




    setData([]);
    data = [];
    Axios
    .get(url + `/salesYearlyReport`,
      {
        params: {
          companyID: companyID,
          startDate: startDate,
          endDate: endDate,
        }
      }
    ).then(res => {

    //  setCompanyInfo(res.data);
        if (res.data.length ===0) {  // if.1
          alert('No Sales Record from '+startDate+' to '+endDate);
        } else {

           let invData = res.data;
            sales = 0;
            debit =0;
            credit =0 ;
            tax = 0;
            data= [];
             let nPass = 0;
              let cDate='';
         //   setData([]);
          //   alert(Data.length);
            cDate = new Date(invData[0].txnDate);
            year = cDate.getFullYear();

         setData([]);
            for (let i = 0; i < invData.length; i++) {
             cDate = new Date(invData[i].txnDate)
              nYear = cDate.getFullYear();

              if (year !== nYear) {
                //   alert(year+'#### '+nYear+ '*** '+i);
                   nPass =0;
                   for (let x = 0; x < data.length; x++) {
                      if (data[x].year === year) {
                       nPass++
                      }
                   }
                   if (nPass === 0 ) {
                  //   alert(year+' == '+nYear+' > '+ sales);
                   const newData =
                   {
                      year: year,
                      sales: sales,
                      debit: debit,
                      credit: credit,
                      netSales: netSales,
                      tax: tax,
                   };
                    data.push(newData)

                    cDate = new Date(invData[i].txnDate)
                    year = cDate.getFullYear();

                      sales=0;
                      debit=0;
                      credit=0;
                      netSales=0;
                      tax = 0;

                 }}


           if (nYear === year) {

            if (invData[i].invType === 'SAL') {
              sales += invData[i].invoiceTotal;
             }
            if (invData[i].invType === 'SDN') {
              debit += invData[i].invoiceTotal;
             }
            if (invData[i].invType === 'SCN' || invData[i].invType === 'SRN' ) {
              credit += invData[i].invoiceTotal;
             }
             tax += invData[i].taxTotal;
             netSales=(sales+debit-credit);
         //    alert(sales);
            }



     //         alert(sales);
            //   alert(i+' = '+invData.length);



              if (i === invData.length-1) {
                const newData =
                {
                   year: year,
                   sales: sales,
                   debit: debit,
                   credit: credit,
                   netSales: netSales,
                   tax: tax,
                };
                 data.push(newData)



              // alert(sales);
                }
                }

                } // for
                totalSales =0;
                totalDebit=0;
                totalCredit=0;
                totalNetSales=0;
                totalTax=0;
                for (let x = 0; x < data.length; x++) {
                  totalSales+=data[x].sales;
                  totalDebit+=data[x].debit;
                  totalCredit+=data[x].credit;
                  totalNetSales+=data[x].netSales;
                  totalTax+=data[x].tax;
                }
             //   for (let x = 0; x < data.length; x++) {
             //     data[x].sales = parseFloat(data[x].sales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
             //     data[x].debit = parseFloat(data[x].debit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
             //     data[x].credit = parseFloat(data[x].credit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
             //     data[x].tax = parseFloat(data[x].tax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
             //     data[x].netSales = parseFloat(data[x].netSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    //            }


            //    const newData =
           //     {
           //        year: 'Total:',
          //         sales: parseFloat(totalSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          //         debit: parseFloat(totalDebit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          //         credit:parseFloat(totalCredit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          //         netSales: parseFloat(totalNetSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          //         tax: parseFloat(totalTax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          //      };
           //      data.push(newData)

               setData(data);



 }); // aXios

}; // onSearchYear

  const onSearchMonth = async (e) => {
      setHeadings ('Monthly Sales Analysis Report') ;
      cYear = 'Month';
      reportType='MONTH';
    setData([]);
    data = [];
  //  alert(month[1])
    Axios
    .get(url + `/salesYearlyReport`,
      {
        params: {
          companyID: companyID,
          startDate: startDate,
          endDate: endDate,
        }
      }
    ).then(res => {

    //  setCompanyInfo(res.data);
        if (res.data.length ===0) {  // if.1
          alert('No Product Sales Record from '+startDate+' to '+endDate);
        } else {

          let invData = res.data;
          sales = 0;
          debit =0;
          credit =0 ;
          tax = 0;
          data= [];
           let nPass = 0;
            let cDate='';
       //   setData([]);
        //   alert(Data.length);
       //   cDate = new Date(invData[0].txnDate)
          cDate = invData[0].txnDate;
       //    alert(cDate)
          year = Number(cDate.substr(0, 4));
          cMonth = Number(cDate.substr(5,2));
         //alert(year+' - '+cMonth);

       setData([]);
          for (let i = 0; i < invData.length; i++) {
           cDate = invData[i].txnDate;
            nYear = Number(cDate.substr(0, 4));
            nMonth =Number(cDate.substr(5, 2));
          //  alert((year+cMonth)+' --- '+(nYear+nMonth)+' xxx '+cMonth);
            if ( (year+cMonth) !== (nYear+nMonth) ) {
             //    alert(year+'#### '+nYear+ '*** '+i);
                 nPass =0;
              //   alert(month[nMonth]+' ## '+nYear);
                 for (let x = 0; x < data.length; x++) {
                 //  alert(data[x].year+ '**'+month[nMonth]+'-'+nYear);
                  if (data[x].year === (month[nMonth]+'-'+nYear) ) {
                     nPass++
                    }
                 }
                 if (nPass === 0 ) {
                //   alert(year+' == '+nYear+' > '+ sales);
             //   cDate = invData[i-1].txnDate;
             //   nYear = Number(cDate.substr(0, 4));
             //   nMonth =Number(cDate.substr(5, 2));

                const newData =
                 {
                    year: month[cMonth]+'-'+year,
                    sales: sales,
                    debit: debit,
                    credit: credit,
                    netSales: netSales,

                 };
                  data.push(newData)

                  cDate = invData[i].txnDate;
                  year = Number(cDate.substr(0, 4));
                   cMonth = Number(cDate.substr(5, 2));
                    sales=0;
                    debit=0;
                    credit=0;
                    netSales=0;
                    tax = 0;

               }}


         if ((nYear+nMonth) === (year+cMonth)) {
          //   alert((nYear+nMonth)+" @ "+(year+cMonth));
          if (invData[i].invType === 'SAL') {
            sales += invData[i].invoiceTotal;
           }
          if (invData[i].invType === 'SDN') {
            debit += invData[i].invoiceTotal;
           }
          if (invData[i].invType === 'SCN' || invData[i].invType === 'SRN' ) {
            credit += invData[i].invoiceTotal;
           }
           tax += invData[i].taxTotal;
           netSales=(sales+debit-credit);
       //    alert(sales);
          }



   //         alert(sales);
          //   alert(i+' = '+invData.length);



            if (i === invData.length-1) {

                    cDate=invData[invData.length-1].txnDate;
                 //   alert(i+ " &&& "+invData.length+" && "+cDate );
                    nMonth=Number(cDate.substr(5,2));
                    nYear=Number(cDate.substr(0,4));
                   let n=data.length;
                //   data.filter(data => data.year === 'test words')
                //   console.log(data);



              const newData =
              {
                 year: month[nMonth]+'-'+nYear,
                 sales: sales,
                 debit: debit,
                 credit: credit,
                 netSales: netSales,

              };

               data.push(newData)



            // alert(sales);
              }
              }

              } // for
              totalSales =0;
              totalDebit=0;
              totalCredit=0;
              totalNetSales=0;
              totalTax=0;
              for (let x = 0; x < data.length; x++) {
                totalSales+=data[x].sales;
                totalDebit+=data[x].debit;
                totalCredit+=data[x].credit;
                totalNetSales+=data[x].netSales;
                totalTax+=data[x].tax;
              }
           //   for (let x = 0; x < data.length; x++) {
           //     data[x].sales = parseFloat(data[x].sales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
           //     data[x].debit = parseFloat(data[x].debit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
           //     data[x].credit = parseFloat(data[x].credit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
           //     data[x].tax = parseFloat(data[x].tax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
           //     data[x].netSales = parseFloat(data[x].netSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  //            }


          //    const newData =
         //     {
         //        year: 'Total:',
        //         sales: parseFloat(totalSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        //         debit: parseFloat(totalDebit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        //         credit:parseFloat(totalCredit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        //         netSales: parseFloat(totalNetSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        //         tax: parseFloat(totalTax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        //      };
         //      data.push(newData)

             setData(data);



}); // aXios


  } ;



  useEffect(() => {


  });

    return (







        <div>

          <div className="row">

            <div className="col-sm-12" style={{ marginTop: '1px', backgroundColor: '#939afa', color: 'black' }}>
              <h2>Product Periodical Sales Analysis Report</h2>
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
          data-tip data-for="sDateTip"
        />
<ReactTooltip id="sDateTip" place="top" effect="solid">
        Select Periodical Sales Analysis Starting Date
</ReactTooltip>

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
                  data-tip data-for="eDateTip"
                />


<ReactTooltip id="eDateTip" place="top" effect="solid">
        Select Periodical Sales Analysis Report Ending Date
</ReactTooltip>

<button
            style={{ padding: '4px', marginLeft: '1rem' }}
            type='button'
            class='btn btn-primary fa fa-search float-right'
            onClick={() => onSearchYear()}
            data-tip data-for="yearlyTip"
          >Yearly Report</button>
<ReactTooltip id="yearlyTip" place="top" effect="solid">
        Press to generate Yearly Sales Analysis Report
</ReactTooltip>
<button
            style={{ padding: '4px', marginLeft: '2rem' }}
            type='button'
            class='btn btn-info fa fa-search float-right'
            onClick={() => onSearchMonth()}
            data-tip data-for="monthTip"
          >Monthly Report</button>
<ReactTooltip id="monthTip" place="top" effect="solid">
        Press to generate Monthly Sales Analysis Report
</ReactTooltip>

<button
            style={{ padding: '1px', marginLeft: '2rem' }}
            type='button'
            class='btn btn-danger float-right'
            onClick={() => onClear()}
            data-tip data-for="clearTip"
          >Clear</button>
<ReactTooltip id="clearTip" place="top" effect="solid">
        Press to Clear Report Listing
</ReactTooltip>
<button
            style={{ padding: '4px', marginLeft: '2rem' }}
            type='button'
            class='btn btn-warning fa fa-print float-right'
            onClick={() => onPrint()}
            data-tip data-for="printTip"
          >Print</button>
<ReactTooltip id="printTip" place="top" effect="solid">
        Press to sales analysis report
</ReactTooltip>
<button
            style={{ padding: '1px', marginLeft: '2rem' }}
            type='button'
            class='btn btn-success'
            onClick={() => onHome()}
            data-tip data-for="homeTip"
          >Home</button>
<ReactTooltip id="homeTip" place="top" effect="solid">
        Press to return Home
</ReactTooltip>


</label>
  </div>



   <div className="row" style={{margin: '20px'}}>

   <div className="col-sm-12" style={{ marginTop: '1px', color: 'black' }}>
     <h2>{headings} </h2>

   </div>

   <span class="square border border-dark"></span>
   <table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>

              <th style={{ backgroundColor: '#999999', width: '300px', textAlign: 'center' }}>{cYear}</th>
              <th style={{ backgroundColor: 'yellow', width: '400px', textAlign: 'center' }}>Sales</th>
              <th style={{ backgroundColor: '#999999', width: '400px', textAlign: 'center' }}>Debit</th>
              <th style={{ backgroundColor: 'yellow', width: '400px', textAlign: 'center' }}>Credit</th>
              <th style={{ backgroundColor: '#999999', width: '400px', textAlign: 'center' }}>Net Sales</th>

               </tr>
          </thead>
          <tbody style={{align:'left'}} >
            {data.map(item => {
              return <tr key={item.id}>

                <td class="square border border-dark" style={{ textAlign: 'center', backgroundColor: '#f5f0f0' }}>{item.year}</td>
                <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.sales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{parseFloat(item.debit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.credit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{parseFloat(item.netSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


              </tr>

            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tbody>
          <tfoot>



            <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "cyan" }}>Analysis Totals :</td>
            <td class="square border border-dark" style={{ textAlign: "right", backgroundColor: "cyan" , color: "red" }}>{parseFloat(totalSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "cyan" , color: "red" }}>{parseFloat(totalDebit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "cyan" , color: "red" }}>{parseFloat(totalCredit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "cyan" , color: "red" }}>{parseFloat(totalNetSales).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>





            <td></td>
            <td></td>
            <td></td>



          </tfoot>
        </table>
</div>
</div>






    ); //return
}; // function
export default ProductSalesPeriodicalReport;
