import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
import ReactDOM from "react-dom";
import generatePDF from "./reportGenerator";
import { format } from "date-fns";
import moment from 'moment';
import { SelectSupplierCustomer } from "./selectSupplierCustomer";
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Tooltip as ReactTooltip } from "react-tooltip";
//import Pagination from "./Pagination";
import BootstrapTable from 'react-bootstrap-table-next';
import { LabelImportantTwoTone, SettingsBackupRestoreRounded } from '@material-ui/icons';
import {CSVLink} from 'react-csv';
import ExportInvoicePdf from './pdfInvoiceGenerator';

//require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');
const headers = [
  { label: 'Txn. Date', key: 'txnDate'},
  { label: 'Invoice No.', key: 'invoiceNo'},
  { label: 'Txn. Type', key: 'txnType'},
  { label: 'Document No.', key: 'documentNo'},
  { label: 'Receipt No.', key: 'receiptNo'},
   { label: 'Txn. Particular', key: 'txnParticular'},
   { label: 'Txn. Amount', key: 'invoiceTotal'},

];



// const userLevel = localStorage.getItem('userLevel');


var invoiceData = [];
var  payData = [];
var newDatas = [];
var fName = "Customer payment Report for ";
//var invoiceDiscountTotal = 0;
//var invoiceTaxTotal = 0;
var curr = new Date();
var todayDate = curr.toISOString().substr(0, 10);
// format(new Date(date), "dd/MM/yyyy") ;
//var supplierID = '';

// alert(format(curr.toISOString().substr(0,10)), "dd/MM/yyyy");
//curr.setDate(curr.getDate());
var dDate= new Date(curr.setDate(curr.getDate()-7));

 var sDate=curr.toISOString().substr(0,10);
 var startDate ='';
 var endDate = '';
 var txnType = 'SPY';
 var purType = [
  {label: 'Payment',
  value: 'SPY'
  },
  {label: 'Debit Note',
   value: 'SDN',
  },
   {label: 'Credit Note',
    value: 'SCN',
  },
   {label: 'Return Note',
    value: 'SRN'
   },
];
function CustomerPaymentReport() {

  const [data, setData] = useState([]);
  const [payData, setPayData] = useState([]);

  const [companyInfo, setCompanyInfo] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);

  const [txnTotal, setTxnTotal] = useState();

  // const [supplierID, setSupplierID] = useState('');

  const [txnDate, setTxnDate] = useState(sDate);
  const [dueDate, setDueDate] = useState(todayDate);

  const [supplierID, setSupplierID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [invoiceDiscountTotal, setInvoiceDiscountTotal] = useState(0);
  const [invoiceTaxTotal, setInvoiceTaxTotal] = useState(0);
  const [invoiceNetTotal, setInvoiceNetTotal] = useState(0);
  const [invoiceTxn, setInvoiceTxn ] = useState([]);
  const [custData, setCustData] = useState([]);
  const [invType, setInvType]= useState('SPY');
  const mystyle = {
    align: "left",

  };

  // alert(txnDate);
  if (txnDate === null) {
    setTxnDate(todayDate);
  }

  const columns = [

    { dataField: 'id', text: '#', sort: false, headerStyle: { backgroundColor: 'yellow', width: '50px' } },
    { dataField: 'supplierID', text: 'Customer ID', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey', textAlign: 'left' } },
    { dataField: 'supplierName', text: 'Customer Name', sort: false, headerStyle: { backgroundColor: 'yellow', width: '700px' }, style: { textAlign: 'left' } },
    { dataField: 'acctType', text: 'A/C Type', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey' } },
    { dataField: 'glNo', text: 'G/L No', sort: false, headerStyle: { backgroundColor: 'yellow' } },
    { dataField: 'glSub', text: 'G/L Sub No.', align: 'center', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey' } },

    {
      dataField: "select",
      text: "Select", headerStyle: { backgroundColor: 'blue', color: 'white' },
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

        return <button className="fa fa-check-square" onClick={() => handleSelectSupplier(row.supplierID)}></button>

      },
    }

  ];
  const handleChangeType= async(e) => {
     //   alert(e.target.value);
   //   defaultInvType=e.target.value;
      // noteType = 'Credit Note';
       if (e.target.value === 'SPY') {
        fName = "Customer payment Report for " ;
       }
       if (e.target.value === 'SCN') {
        fName = "Customer Credit Note Report for " ;
       }
       if (e.target.value === 'SDN') {
        fName = "Customer Debit Note Report for " ;
       }
       if (e.target.value === 'SRN') {
        fName = "Customer Return Note Report for " ;
       }
     txnType=e.target.value;
      setInvType(e.target.value);
    //  alert(txnType);
  };




  const onInputChange = async (e) => {
    e.preventDefault();
    console.log(e.target.value);

    console.log(e.target.name);
    console.log(e.target.value);

  };


  const buttonStyle = {
      color: "black",
      textColor: "black",
      backgroundColor: "yellow",
      padding: "10px 15px 10px 10px",
      fontFamily: "Arial",

  };


  useEffect(() => {



   Axios
     .get(url + `/companyInfo`,
       {
         params: {
           companyID: companyID,

         }
       }
     ).then(res => {

       setCompanyInfo(res.data);

     });

     Axios
     .get(url+`/customerList`,
       {
        params: {
                companyID: companyID,
               }
       }
     )
     .then(res => {


        setCustData(res.data);

    });




  }, []);









  const formatInputtxnDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setTxnDate(dDate);
    startDate= dDate ;

    //   alert(dDate);
    // setTxnDate(dDate);
    //    alert(txnDate);
    // onSearchVoucher(setTxnDate(dDate));
  //  inputRef.current.focus();
  };
  const formatInputdueDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setDueDate(dDate);
    endDate=dDate ;
    //   alert(dDate);
    // setTxnDate(dDate);
    //    alert(txnDate);
    // onSearchVoucher(setTxnDate(dDate));
  //  inputRef.current.focus();
  };

  const formatInputDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setTxnDate(dDate);
    //   alert(dDate);
    // setTxnDate(dDate);
    //    alert(txnDate);
    // onSearchVoucher(setTxnDate(dDate));
  //  inputRef.current.focus();
  };
  const formatInputDueDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setDueDate(dDate);

  };





  // Add Purchase Item ******************************

  const handleNew = async () => {

    window.location.href = '/customerPaymentReport';


  };

  const handleHome = async () => {


    window.location.href = '/home';
  };

  const handleCancel = async (e) => {
    //  alert('remsove');
    setInvoiceData([]);
  };

const handleSelectSupplier = async (e) => {
// alert(e);
//return false;
//alert(sDate);
//alert(eDate);
 setSupplierID(e);
  Axios
  .get(url + `/invoiceTxnSearch`,
    {
      params: {
        companyID: companyID,
        supplierID: e,
        invType: txnType,
        pur_sal: 'S',
        txnDate: startDate,
        dueDate: endDate,
      }
    }
  ).then(res => {

  //  setCompanyInfo(res.data);
      if (res.data.length ===0) {
        alert('No Sales Invoice transaction between '+moment(startDate).format("DD/MM/YYYY")+' and '+moment(endDate).format("DD/MM/YYYY"));
      } else {



       //  setData(res.data);




           setSupplierName(res.data[0].suppCustName);
           //  alert(supplierID);
           let invTotal = 0;
           let invData = [];
          for (let i = 0; i < res.data.length; i++) {
               invTotal+=res.data[i].invoiceTotal;
               res.data[i].invoiceTotal=String(parseFloat(res.data[i].invoiceTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
               res.data[i].txnDate = moment(res.data[i].txnDate).format("DD/MM/YYYY")
               const newData = {
                  txnDate: res.data[i].txnDate,
                  invoiceNo: res.data[i].invoiceNo,
                  txnType: res.data[i].txnType,
                  documentNo: res.data[i].documentNo,
                  receiptNo: res.data[i].receiptNo,
                  txnParticular: res.data[i].txnParticular,
                  invoiceTotal: res.data[i].invoiceTotal,
               }
             //  invData.push(...newData);
               const newDatas = [...data, newData];
                invData.push(...newDatas);
             //  setInvoiceTxn(invData);
              }
               invTotal=String(parseFloat(invTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
               const newData = {
                txnDate: '',
                invoiceNo: '',
                txnType: '',
                documentNo:'',
                receiptNo: '',
                txnParticular: 'Totals :',
                invoiceTotal: invTotal,
             }
             const newDatas = [...data, newData];
             invData.push(...newDatas);
               setTxnTotal(invTotal);
              setInvoiceTxn(invData);
      //     payData = invData;



//           setPayData(invData);
       // let newData = [...data, newDatas];

    //     payData = newData;
       //     invData.push(...newData);
       //    invData.push(...newDatas);
       //    setData(invData);
        //   alert(invData.length);

    //     alert(payData[2].purchaseQty);
        //  alert(supplierID);
      }

//  });

// supplierID=data[0].customerID;
//  alert(supplierID);
/*
 const newData={
    id: vid,
    voucherNo: voucherNo,
    companyID: companyID,
    supplierID: supplierID,
    supplierName: supplierName,
    invoiceNo: invoiceNo,
    taxID: taxID,
    taxCode: taxCode,
    taxRate: taxRate,
    documentNo: documentNo,
    invType: invType,
    txnDate: noteDate,
    taxType: taxType,
    taxDescription: taxDescription,
    txnParticular: txnParticular,
    remark: taxRemark,
    txnAmount: txnAmount,
    taxTotal: taxTotal,
    netTotal: netTotal,
    //purchaseQty: parseFloat(purchaseQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),

   };


  // alert(invType);

  const newDatas = [...data, newData];
  //data=e.target.value;
  //data = newDatas

   TotalTxnAmount = 0;
   TotalTaxAmount=0;
   let TotalNet=0;
  for (let i = 0; i < newDatas.length; i++) {
   //   alert(newDatas[i].itemTotal);
   newDatas[i].voucherNo=voucherNo;
   newDatas[i].txnDate = noteDate;
    TotalTxnAmount+=Number(newDatas[i].txnAmount);
     TotalTaxAmount+=Number(newDatas[i].taxTotal);
    TotalNet+=Number(newDatas[i].netTotal);
 //  invoiceTaxTotal+=Number(newDatas[i].itemTax);
 //  invoiceNetTotal+=Number(newDatas[i].itemNetTotal);
    newDatas[i].id = i+1;
   // newDatas[i].purchaseQty=newDatas[i].purchaseQty.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  // newDatas[i].itemTotal=newDatas[i].itemTotal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  // alert(typeof  invoiceTotal);
  }
   //   if (invType === 'DR') {
   //      setTxnNetTotal(TotalTxnAmount-TotalTaxAmount);
  //    } else {
  //      setTxnNetTotal(TotalTxnAmount+TotalTaxAmount);
  //    }

  setData(newDatas);
     setTxnNetTotal(TotalNet) ;

}
*/

});

};
//moment(sDate).format("DD-MM-YYYY");
const csvReport = {

  data: invoiceTxn,
  headers: headers,
  filename: 'Sales-payment-report-'+supplierID+'-from-'+txnDate+'-to-'+dueDate+'.csv',
  ignoreFooter: false
};
/*
const csvData = [
  ["txn. Date", "Invoice No.", "Txn. Type", "Document No.", "Receipt No.", "Txn. Particular", "Txn. AMount"],
  ...invoiceTxn.map(({ txnDate, invoiceNo, txnType, documentNo, receiptNo, txnParticular, invoiceTotal }) => [
    txnDate,
    invoiceNo,
    txnType,
    documentNo,
    receiptNo,
    txnParticular,
    invoiceTotal,
  ]),
];
*/
  // on Save Purchase Invoice and Voucher *******************




  const defaultSorted = [{
    dataField: 'supplierID',
    order: 'supplierID'
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
        <div className="col-sm-12" style={{backgroundColor: 'magenta', color: 'white', marginTop: '1px' }}>
          Customer Invoice Payment/Debit/Credit/Goods Return Report
        </div>
      </div>


      <div style={{
      display: 'inline-block',
      width: '1520px',
      height: '100px',
      margin: '6px',
      backgroundColor: 'white',
      border: '4px solid grey',
    }}
    >
     <p></p>

      <label style={{ paddingLeft: "10px" }} >

      <a style={{  marginRight: '.8rem' }} >Sales Invoice Payment From Date : </a>
        <input
          type="date"
          maxLength={10}
          value={txnDate}
          style={{ width: '10%', border: '1px solid #696969' }}
          //  defaultValue = {txnDate}
          name="txnDate"
          onChange={(e) => formatInputDate(e)}
          onBlur={(e) => formatInputtxnDate(e) }
          required
 
        />


        <a style={{ marginLeft: '1rem', marginRight: '.8rem' }} >To Date : </a>
                <input
                  type="date"
                  maxLength={10}
                  value={dueDate}
                  style={{ width: '10%', border: '1px solid #696969' }}
                  name="dueDate"
                  onChange={(e) => formatInputDueDate(e)}
                  onBlur={(e) => formatInputdueDate(e) }
                  required
  
                />




<a style={{marginLeft: '4.4rem'}}> Transaction Type : </a>
    <select value={invType} onChange={e => handleChangeType(e)}>
     {purType.map((item) => (
       <option  value={item.value} required> {item.label}</option>
    )) }

    </select>

</label>
<div>
<label style={{ paddingLeft: "10px" }} >
<a style={{ marginRight: '.2rem' }}> Customer ID : </a>
        <input
          type="text"
          style={{ width: '100px', border: '1px solid #696969' }}
          value={supplierID}
          name="supplierID"
          class="text-uppercase"
          required
          readonly={true}
        />

<a style={{ marginLeft: '3.2rem', marginRight: '.2rem' }}> Customer Name : </a>
        <input
          type="text"
          style={{ width: '800px', border: '1px solid #696969' }}
          value={supplierName}
          name="supplierName"
          required
          readonly={true}
        />
</label>
</div>

</div>



<div className="row">

<div className="col-sx-12 btn btn-success" style={{ marginTop: '1px', paddingLeft: '0px' }}>
          Customer Selection
        </div>
 </div>
        <span class="square border border-dark"></span>

        <BootstrapTable bootstrap4 keyField='id' data={custData} columns={columns}
          defaultSorted={defaultSorted} pagination={pagination}
          rowStyle={{ backgroundColor: '#A9A9A9', border: '3px solid grey' }}
          class="table border border-dark" ></BootstrapTable>




        <CSVLink filename={fName+supplierID+" from "+moment(startDate).format("DD-MM-YYYY")+" to "+moment(endDate).format("DD-MM-YYYY")} ignoreFooter={false}  data={invoiceTxn} >Export To Excel (CSV)</CSVLink>

<div className="row">
<div className="col-sx-10 btn btn-warning" style={{ marginTop: '1px', paddingLeft: '10px' }}>
  Sales Invoice Payment Transaction Details
</div>
</div>
<table class="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>

              <th style={{ backgroundColor: '#999999', width: '100px', textAlign: 'center' }}>Txn. Date</th>
              <th style={{ backgroundColor: 'yellow', width: '200px', textAlign: 'center' }}>Invoice No.</th>
              <th style={{ backgroundColor: '#999999', width: '200px', textAlign: 'center' }}>Txn. Type</th>
              <th style={{ backgroundColor: 'yellow', width: '150px', textAlign: 'center' }}>Document No.</th>
              <th style={{ backgroundColor: '#999999', width: '150px', textAlign: 'center' }}>Receipt No.</th>
              <th style={{ backgroundColor: 'yellow', width: '550px', textAlign: 'center' }}>Txn. Particular</th>
              <th style={{ backgroundColor: '#999999', width: '150px', textAlign: 'center' }}>Txn. Amount</th>




               </tr>
          </thead>
          <tbody style={mystyle} >
            {invoiceTxn.map(item => {
              return <tr key={item.id}>

                <td style={{ backgroundColor: '#75bc7e', textAlign: 'center' }}>{item.txnDate}</td>
                <td style={{ textAlign: 'left' }}>{item.invoiceNo}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#75bc7e' }}>{item.txnType}</td>
                <td style={{ textAlign: 'left' }}>{item.documentNo}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#75bc7e' }}>{item.receiptNo}</td>
                <td style={{ textAlign: 'left' }}>{item.txnParticular}</td>
                <td style={{ textAlign: 'right', backgroundColor: '#75bc7e' }}>{item.invoiceTotal}</td>





              </tr>

            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>

          </tbody>
          <tfoot>







          </tfoot>

        </table>
 <p></p>
</div>

  ) // return
};

export default CustomerPaymentReport;
