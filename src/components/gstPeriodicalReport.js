import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import './Profile.css';
import ReactDOM from "react-dom";
import { format } from "date-fns";
import moment from 'moment';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
//import { Tooltip as ReactTooltip } from "react-tooltip";
//import {yearlyReport, quarterlyReport, monthlyReport} from "./salesReport";
import BootstrapTable from 'react-bootstrap-table-next';
import { AirlineSeatIndividualSuiteSharp, SettingsBackupRestoreRounded } from '@material-ui/icons';
import Moment from 'react-moment';
//import {CSVLink} from 'react-csv';
import GSTPDF from './pdfGSTGenerator';

import Blink from 'react-blink-text';

//require('dotenv').config();//

const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const companyName = localStorage.getItem('companyName');
const userName = localStorage.getItem('userName');


// const userLevel = localStorage.getItem('userLevel');


var curr = new Date();
var todayDate = curr.toISOString().substr(0, 10);
var dDate= new Date(curr.setDate(curr.getDate()-7));
var finStartDate='';
var finEndDate='';
var finYear = dDate.getFullYear();
var data = [];
//var gstData=[];
var outputData=[];
var inputData=[];
var companyData =[];
var totalDocumentAmount = 0;
var totalPurchaseTaxAmount=0;
var totalSalesTaxAmount=0;
var salesTaxAmountTotal= 0;
var salesItemAmountTotal= 0;
var purchaseTaxAmountTotal= 0;
var purchaseItemAmountTotal= 0;

 var sDate=''; //curr.toISOString().substr(0,10);
 var eDate= '';
 var date = new Date();
 var cMonth = date.getMonth()-1;
var stDate = new Date(date.getFullYear(), cMonth, 2);
var enDate = new Date(stDate.getFullYear(), cMonth+1, 1);
var taxCode = '';
var docAmt =0;
var taxAmt =0;
function GstPeriodicalReport() {
  const [startDate, setStartDate] = useState(stDate.toISOString().substr(0,10));
  const [endDate, setEndDate] = useState(enDate.toISOString().substr(0,10));
  const [Data, setData] = useState([]);
  const [purchaseData, setPurchaseData] =useState([]);
  const [salesData, setSalesData] = useState([]);

  const headers = [
    { label: 'DOC Date', key: 'document_date'},
    { label: 'Supplier Name', key: 'suppCustID'},
    { label: 'DOC No.', key: 'documentNo'},
    { label: 'Tax Code', key: 'taxCode'},
    { label: 'Tax Type', key: 'taxType'},
    { label: 'DOC Type', key: 'documentType'},
    { label: 'Tax Description', key: 'remark'},
    { label: 'Purchase/Sales Amount', key: 'itemAmount'},
    { label: 'Purchase Tax Amount', key: 'purchaseTaxAmount'},
    { label: 'Sales Tax Amount', key: 'salesTaxAmount'},
  ];

  const columns = [

    { dataField: 'document_date', text: 'DOC Date', sort: false, headerStyle: { border: '3px solid grey' }},
    { dataField: 'suppCustID', text: 'Supplier Name', sort: false, headerStyle: { border: '3px solid grey' }, align: 'left' },
    { dataField: 'documentNo', text: 'DOC No.', sort: false, headerStyle: { border: '3px solid grey' }},
    { dataField: 'taxCode', text: 'Tax Code', sort: false, headerStyle: { border: '3px solid grey' } },
    { dataField: 'taxType', text: 'Tax Type', sort: false, headerStyle: { border: '3px solid grey' }},
    { dataField: 'documentType', text: 'DOC Type', sort: false, headerStyle: { border: '3px solid grey' }  },
    { dataField: 'remark', text: 'Tax Description', sort: false, headerStyle: { border: '3px solid grey' }, align: 'left'},
    { dataField: 'itemAmount', text: 'Purchase/Sales Amount', sort: false, headerStyle: { border: '3px solid grey' }, align: 'right'},
    { dataField: 'purchaseTaxAmount', text: 'Purchase Tax Amount', sort: false , headerStyle: { border: '3px solid grey' }, align: 'right' },
    { dataField: 'salesTaxAmount', text: 'Sales Tax Amount', sort: false,  headerStyle: { border: '3px solid grey' }, align: 'right' },

  ];

  const mystyle = {
    textAlign:"left",
    borderColor: '#de2e2e',

};
 const formatInputStartDate = async (e) => {

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
  //  i
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
  const formatInputEndDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setEndDate(dDate);

  };
  const onClear = async () => {
       totalDocumentAmount =0;
       totalPurchaseTaxAmount=0;
       totalSalesTaxAmount=0;

        salesTaxAmountTotal= 0;
        salesItemAmountTotal= 0;
        purchaseTaxAmountTotal= 0;
        purchaseItemAmountTotal= 0;
      setData([]);
      setSalesData([]);
      setPurchaseData([]);

  };
  const onSave = async () => {


};
  const onLoadGST = async () => {
  salesItemAmountTotal=0;
  salesTaxAmountTotal=0;
  purchaseItemAmountTotal=0;
  purchaseTaxAmountTotal=0;

  totalDocumentAmount=0;
  totalPurchaseTaxAmount=0;
 totalSalesTaxAmount=0;
 var gstData=[];
  Axios
  .get(url + `/GSTPeriodicalReport`,
    {
      params: {
      companyID: companyID,
       startDate : startDate,
       endDate: endDate,
      }
    }
  ).then(res => {

     if (res.data.length === 0) {
       alert('No GST Transaction Record between '+startDate+' and '+endDate);
       return false;
     }
   //  format(sDate,"yyyy-MM-dd")
     gstData=res.data;
   //   alert(gstData.length);
 //    setData(res.data)
   //  });
  //   gstData=Data;
   //  alert(gstData.length)

  //  let taxCode = '';
  //  let docAmt =0;
  //  let taxAmt =0;

    for (let i = 0; i < gstData.length; i++) {
    if (gstData[i].taxType === 'OUTPUT') {
      gstData[i].salesTaxAmount=gstData[i].taxAmount;
      totalSalesTaxAmount+=gstData[i].taxAmount;
    }
    if (gstData[i].taxType === 'INPUT') {
      gstData[i].purchaseTaxAmount=gstData[i].taxAmount;
      totalPurchaseTaxAmount+=gstData[i].taxAmount;
    }
    let date = new Date (gstData[i].document_date);
    gstData[i].document_date=format(date,"dd/MM/yyyy");
    totalDocumentAmount+=gstData[i].itemAmount;
    if (taxCode === gstData[i].taxCode) {
       docAmt+=gstData[i].gstData[i].itemAmount;
       taxAmt+=gstData[i].taxAmount;
    }

   } // for i

   for (let z = 0; z < gstData.length; z++) {
   gstData[z].itemAmount=gstData[z].itemAmount.toFixed(2);
    gstData[z].purchaseTaxAmount=gstData[z].purchaseTaxAmount.toFixed(2);
    gstData[z].salesTaxAmount=gstData[z].salesTaxAmount.toFixed(2);
   }

  const newData={
    document_date: '',
    suppCustID: '',
    documentNo: '',
    taxCode: '',
    taxType: '',
    documentType: 'TOTAL:',
    remark: '',
    itemAmount: totalDocumentAmount.toFixed(2),
    purchaseTaxAmount: totalPurchaseTaxAmount.toFixed(2),
    salesTaxAmount: totalSalesTaxAmount.toFixed(2),
  }
  //  itemAmount: parseFloat(totalDocumentAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
  //  purchaseTaxAmount: parseFloat(totalPurchaseTaxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
  //  salesTaxAmount: parseFloat(totalSalesTaxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),

    gstData.push(newData);
  setData(gstData);  // setData([]);
});


   // setSalesData([]);

   // salesTaxAmountTotal=0;
   outputData=[];
   Axios
    .get(url + `/GSTInputOutputReport`,
      {
        params: {
        companyID: companyID,
         startDate : startDate,
         endDate: endDate,
         taxType: 'OUTPUT'
        }
      }
    ).then(res => {
       if (res.data.length > 0) {
       taxCode=res.data[0].taxCode;
        docAmt =0;
        taxAmt =0;
      for (let j = 0; j < res.data.length; j++) {

            if (taxCode === res.data[j].taxCode ) {
              docAmt+=res.data[j].itemAmount;
              taxAmt+=res.data[j].taxAmount;
              salesItemAmountTotal+=res.data[j].itemAmount;
              salesTaxAmountTotal+=res.data[j].taxAmount;
          //  alert(salesTaxAmountTotal);
            }
             if (taxCode !==res.data[j].taxCode || j === res.data.length-1) {

              let newData = {
                tax: taxCode,
                 docAmount: docAmt,
                 taxAmount: taxAmt,
             };

           //   alert('here')
             outputData.push(newData);
             taxCode=res.data[j].taxCode;
             docAmt=res.data[j].itemAmount;
             taxAmt=res.data[j].taxAmount;
           // alert(outputData[0].taxAmount);
            setSalesData(outputData);



            }
          } // for
        //  alert(outputData.length)
         //   setSalesData(outputData);
       } //if
    })

     inputData=[];
    Axios
    .get(url + `/GSTInputOutputReport`,
      {
        params: {
        companyID: companyID,
         startDate : startDate,
         endDate: endDate,
         taxType: 'INPUT'
        }
      }
    ).then(res => {
       if (res.data.length > 0) {
       taxCode=res.data[0].taxCode;
        docAmt =0;
        taxAmt =0;
      for (let x = 0; x < res.data.length; x++) {

            if (taxCode === res.data[x].taxCode ) {
              docAmt+=res.data[x].itemAmount;
              taxAmt+=res.data[x].taxAmount;
              purchaseItemAmountTotal+=res.data[x].itemAmount;
              purchaseTaxAmountTotal+=res.data[x].taxAmount;
          //  alert(salesTaxAmountTotal);
            }
             if (taxCode !==res.data[x].taxCode || x === res.data.length-1) {

              let newData = {
                tax: taxCode,
                 docAmount: docAmt,
                 taxAmount: taxAmt,
             };

           //   alert('here')
             inputData.push(newData);
             taxCode=res.data[x].taxCode;
             docAmt=res.data[x].itemAmount;
             taxAmt=res.data[x].taxAmount;
           // alert(outputData[0].taxAmount);

           setPurchaseData(inputData);



            }
          } // for
        //  alert(outputData.length)
         //   setSalesData(outputData);
       } //if
    }) ;



  };
  const onHome = async () => {
        window.location='home';

   };
  const onPrint = async () => {
   //  alert('totalRev: '+totalRev+' - totalCostOfSales: '+totalCostOfSales+' - totalExpenses: '+totalExpenses+' - profit: '+profit+' - taxOnYear: '+taxOnYear);
  //  alert(intangibleAssetData[0].glName);
   if(Data.length === 0 || Data.length <2 ) {
      alert('No GST Periodical Report for printing');
      return false;
      }



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
  //   reportType='PNL';
   let sDate = new Date (startDate);
   let eDate = new Date(endDate);


   // salesItemAmountTotal= 0;

   // purchaseItemAmountTotal= 0;
  setData([]);
  setSalesData([]);
  setPurchaseData([]);
  //alert(eDate);
    GSTPDF(companyData, Data, salesData, purchaseData,
       totalDocumentAmount, totalPurchaseTaxAmount, totalSalesTaxAmount,
   salesItemAmountTotal,salesTaxAmountTotal,purchaseItemAmountTotal,purchaseTaxAmountTotal,  format(sDate, 'dd/MM/yyyy'), format(eDate, 'dd/MM/yyyy'))

     });

  };

  useEffect(() => {
//alert('here');
  });

  const defaultSorted = [{
    dataField: 'document_date',
    order: 'desc'
  }];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

 return (







<div>
      <div className="row">

        <div className="col-sm-12" style={{ marginTop: '1px', backgroundColor: '#c1f8ae', color: 'black' }}>
          <h2>GST Purchases (Input Tax) And Sales (Output Tax) Periodical Report</h2>
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
<a style={{  marginRight: '.8rem' }} >Date From : </a>
    <input
      type="date"
      maxLength={10}
      value={startDate}
      style={{ width: '12%', border: '1px solid #696969' }}
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
              style={{ marginRight: '2rem', width: '12%', border: '1px solid #696969' }}
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
        onClick={() => onLoadGST()}
 
      >Load GST Report</button>



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



      <span class="square border border-dark"></span>
      <div className="App">
    <div className="row" style={{ 'margin': "12px", paddingLeft: '5px' }}>
    <div className="col-sm-12">
        Purchase (INPUT) And Sales (OUTPUT) Tax Periodical Report
     </div>
    </div>
    <span class="square border border-dark"></span>

      <BootstrapTable bootstrap keyField='id' data={Data} columns={columns} defaultSorted={defaultSorted} pagination={pagination} class="table table-bordered border-dark"
       rowStyle = {{ border: '1px solid grey' }}

      ></BootstrapTable>




  </div>








           <div className="row" style={{margin: '20px'}}>

      <div className="col-sm-12" style={{ marginTop: '1px', color: 'black' }}>


      </div>
    </div>












     <div class="row" style={{paddingLeft: '50px' }}>
     <div class="table-responsive col-md-3">
      <span class="square border border-dark"></span>
     <table class= "table" style={{ paddingTop: '1px', border: '1px solid black' }}>
             <thead class="thead-dark" >
               <tr style={{ align: 'left' }}>
               <th class="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Tax Code</th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Sales Document Amount</th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Sales Tax Amount</th>
                  </tr>
             </thead>
             <tbody style={{align:'left'}} >
               {salesData.map(item => {
                 return <tr key={item.id}>
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.tax}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right'}}>{parseFloat(item.docAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right'}}>{parseFloat(item.taxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                 </tr>

               })}
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               </tbody>
             <tfoot>

                <td></td>
                <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(salesItemAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(salesTaxAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
               <td></td>
               <td></td>
               <td></td>
             </tfoot>
             </table>
             </div>





     <div class="table-responsive col-md-3">

             <table class= "table" style={{ paddingTop: '1px', border: '1px solid black'}}>
             <thead class="thead-dark" >
               <tr style={{align: 'left'}}>

               <th class="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Tax Code</th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Purchase Document Amount</th>
              <th class="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Purchase Tax Amount</th>
                  </tr>
             </thead>
             <tbody style={{align:'right'}} >
               {purchaseData.map(item => {
                 return <tr key={item.id}>
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.tax}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right'}}>{parseFloat(item.docAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right'}}>{parseFloat(item.taxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                 </tr>

               })}
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               </tbody>
             <tfoot>

                <td></td>
                <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(purchaseItemAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(purchaseTaxAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
               <td></td>
               <td></td>
               <td></td>
             </tfoot>
           </table>


      </div>

      </div>

</div>






); // return
}; // function
export default GstPeriodicalReport;
