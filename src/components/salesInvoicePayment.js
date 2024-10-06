import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
import ReactDOM from "react-dom";
import generatePDF from "./reportGenerator";
import { format } from "date-fns";
import moment from 'moment';
import { SelectSurpplierCustomer } from "./selectSupplierCustomer";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Tooltip as ReactTooltip } from "react-tooltip";
//import Pagination from "./Pagination";
import BootstrapTable from 'react-bootstrap-table-next';
// import {CSVLink} from 'react-csv';
import PaymentGenerator from './pdfPaymentGenerator';

//require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');


const options = ['Supplier', 'Customer'];

// const userLevel = localStorage.getItem('userLevel');
var glData = [];
var catData = [];
var stockData = [];
var taxData = [];
var locData = [];
var voucherData = [];
var supplierData = [];
var taxID = '';
var taxType = '';
var taxCode = '';
var taxRate = 0;
var glNo = '';
var department = '';
var glDescription = '';
var InvEdit = false;
var glSub = ''
var department = '';
var glName = '';
var glType = '';
var totalDrAmt = 0;
var totalCrAmt = 0;
var totalTax = 0;
var totalNetAmt = 0;
var custData = [];
var acctType = 'SUPP';
var productID = '';
var stockID = 0;
var supplierID = '';
var supplierName = '';
var paymentTerm = 0;
var taxTotal = 0;
var invoiceTotal = 0;
var invoiceDiscountTotal = 0;
var invoiceTaxTotal = 0;
var invoiceNetTotal = 0;
var TotalDrAmt = 0;
var TotalCrAmt = 0;
var pur_id = 0;
var vouch_id = 0;
var invEdit = false;
var vouchEdit = false;
var taxRemark = '';
var taxDescription = '';
var locationID = '';
var lOk = false;
var purType = [
  {
    label: 'Purchase Item',
    value: 'PUR',
  },
  {
    label: 'FOC Item',
    value: 'FOC',
  },
];
// format(new Date(date), "dd/MM/yyyy") ;
var curr = new Date();
var cAmt = 0;
var dAmt = 0;
var bal = 0;
var invDate = '';
var expDate = '';
// alert(format(curr.toISOString().substr(0,10)), "dd/MM/yyyy");
curr.setDate(curr.getDate());

var todayDate = curr.toISOString().substr(0, 10);
// alert(format(curr, "dd/MM/yyyy"));
var vid = 0;
var glID = 0;
var lastSix = '';
var lRead = false;
var iRead = false;
var defaultQty = 0;
var barcode = '';
var lDisable = false;
var gData1 = [];
var gData2 = [];
//sessionStorage.setItem('voucherNo', '');
//sessionStorage.setItem('invoiceNo','');
//sessionStorage.setItem('invData', []);

function SalesInvoicePayment() {
  const [acctType, setAcctType] = useState('SUPP');
  const [data, setData] = useState([]);
  const [id, setTax] = useState('');
  const [ID, setGlID] = useState('');
  //  const [locationID, setLocationID] = useState('');
  const [voucherData, setVoucherData] = useState([]);
  const [custData, setCustData] = useState([]);
  const [suppGlNo, setSuppGlNo] = useState('');
  const [suppGlSub, setSuppGlSub] = useState("");
  const [bankData, setBankData] = useState([]);
  const [BID, setBankID] = useState(0);


  // const [custData, setCustData] = useState([]);
  const [supplierID, setSupplierID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");

 // const [barcode, setBarcode] = useState("");
  const [unit, setUnit] = useState("");
  const [productName, setProductName] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [balanceTotal, setBalanceTotal] = useState(0.00);

  const [itemTotal, setItemTotal] = useState('');
  // const [purchaseQty, setPurchaseQty] = useState(0.000);
  const [itemTax, setItemTax] = useState(0.00);
  const [itemDiscount, setItemDiscount] = useState(0.00);
  const [itemNetTotal, setItemNetTotal] = useState(0.00);
  const [bankName, setBankName] = useState('');
  const [bankGlNo,setBankGlNo] = useState('');
  const [bankGlSub, setBankGlSub] = useState('');

  const [drAmt, setDrAmt] = useState('');
  const [crAmt, setCrAmt] = useState('');
  const [paymentTotal, setPaymentTotal] = useState(0.00);
  const [totalNetAmt, setTotalNetAmt] = useState(0.00);
  const [paymentType, setPaymentType] = useState('CH');

  const [txnDate, setTxnDate] = useState(todayDate);
  const [paymentParticular, setPaymentParticular] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const [receiptNo, setReceiptNo] = useState("");
  const inputReference = useRef(null);
  const inputRef = useRef(null);
  const inputRefVoucher = useRef(null);
  const payOption= [
       {value: 'CH', label: 'Bank Cheque'},
       {value: 'BT', label: 'Bank Transfer'},
       {value: 'CA', label: 'Cash'}
        ];
  const mystyle = {
    align: "left",

  };
  // alert(txnDate);
  if (txnDate === null) {
    setTxnDate(todayDate);
  }
/*
  // headers is for export to csv
  const headers = [
    { label: 'G/L No.', key: 'glNo'},
    { label: 'G/L Sub', key: 'glSub'},
    { label: 'G/L Type', key: 'glType'},
    { label: 'Department', key: 'department'},
    { label: 'G/L Name', key: 'glName'},
     { label: 'G/L Description', key: 'glDescription'},
  ];
*/
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

        return <button className="fa fa-check-square" onClick={() => handleSelectSupplier(row.supplierID, row.supplierName, row.glNo, row.glSub)}></button>

      },
    }

  ];
/*
  const csvReport = {
    data: data,
    headers: headers,
    filename: 'Purchase Invoice Payment at '+todayDate+'.csv'
  };
  */
  // alert(txnDate);
  const body = {
    companyID: companyID,

  };
  const [voucher, setVoucher] = useState({
    voucherNo: "",
    invoiceNo: '',
    glNo: "",
    glSub: "",
    department: "",
    glName: "",
    glType: '',
    // jeParticular: "",
    drAmt: 0.00,
    crAmt: 0.00,
    companyID: companyID,
    userName: userName,

  });




  const onInputChange = async (e) => {
    e.preventDefault();
    console.log(e.target.value);

    console.log(e.target.name);
    console.log(e.target.value);

  };


  const buttonStyle = {
    color: "black",
    backgroundColor: "yellow",
    padding: "2px 10px 2px 10px",
    fontFamily: "Arial", todayDate,
  };

  useEffect(() => {



     setDrAmt(0);
     setCrAmt(0);

    Axios
      .get(url + `/glMultiSelectList`,
        {
          params: {
            companyID: companyID,
            gType: '401',
            gType1: '501',
          }
        }
      ).then(res => {
        console.log(res);

        glData = res.data;
        glID = glData[0].id;
        setGlID(glData[0].id);
        glNo = glData[0].glNo;
        glSub = glData[0].glSub;

        glName = glData[0].glName;
        department = glData[0].department;
        glDescription = glData[0].glDescription;
        glType = glData[0].glType;
      });
/*
      Axios
      .get(url + `/glSelectList`,
        {
          params: {
            companyID: companyID,
            gType: '501',
          }
        }
      ).then(res => {
        console.log(res);

          glData.push(...res.data);


      });
*/

    Axios
      .get(url + `/taxList`,
        {
          params: {
            companyID: companyID,
            taxType: 'OUTPUT',
          }
        }
      )
      .then(res => {
        taxData = res.data;
        if (taxData.length > 0) {
          taxID = taxData[0].taxID;
          taxType = taxData[0].taxType;
          taxCode = taxData[0].taxCode;
          taxRate = taxData[0].taxRate;
          taxRemark = taxData[0].remark;
          taxDescription = taxData[0].taxDescription;
          taxRemark = taxData[0].remark;
          setTax(taxData[0].id);
          //   alert(taxRate);
        } else {
          taxID = '';
          taxType = '';
          taxCode = '';
          taxRate = 0;
          alert('Government Tax is not defined');

        }
      });

      Axios
      .get(url+'/bankList',
        {
         params: {
                 companyID: companyID,
                }
        }
      )
          .then(res => {
            console.log(res);

            setBankData(res.data);

            setBankName(res.data[0].bankName);
            setBankGlNo(res.data[0].glNo);
            setBankGlSub(res.data[0].glSub);

          });





  }, []);




  const handleSelectSupplier = (ID, name, gNo, gSub) => {
    // alert(ID);
    setSupplierID(ID);
    setSupplierName(name);
    setSuppGlNo(gNo);
    setSuppGlSub(gSub);
  //  alert(gNo+" = "+gSub);
    for (let i = 0; i < glData.length; i++) {
      if (glData[i].glNo === gNo && glData[i].glSub === gSub) {
        setGlID(glData[i].id);


      }
    }

    setCustData([]);

  };

  const handleChangeBank= async (e) => {
    const GID = Number(e.target.value);

    // alert(ID);
   for (let i = 0; i < bankData.length; i++) {

     if (bankData[i].id === GID) {
        setBankID(GID);
        setBankName(bankData[i].bankName);
     //    setBankAcctNo(bankData[i].bankAcctNo);
         setBankGlNo(bankData[i].glNo);
         setBankGlSub(bankData[i].glSub);
     //    setBankGlType(bankData[i].glType);

         for (let j = 0; j < glData.length; j++) {
           if (glData[j].glNo === bankData[i].glNo && glData[j].glSub === bankData[i].glSub) {
               setGlID(glData[j].id);
          //   alert(ID);
           }

         }


     }
};
  };

  const handleChangePayType= async (e) => {

       setPaymentType(e.target.value);
};
  const handleChangeTax = async (e) => {
    let ID = Number(e.target.value);
    // alert(ID);
    //  setTax(ID);
    //     alert(id);

    for (let i = 0; i < taxData.length; i++) {
      if (taxData[i].id === ID) {

        setTax(taxData[i].id);
        taxID = taxData[i].taxID;
        taxRate = taxData[i].taxRate;
        taxType = taxData[i].taxType;
        taxCode = taxData[i].taxCode;
        taxRemark = taxData[i].remark;
        taxDescription = taxData[i].taxDescription;

        //   alert(taxData[i].taxID);
        //   alert(taxID);
      }
    }
    // alert(typeof taxRate);
    // alert(taxRate);

  };





  const handleChangeGl = async (e) => {
    //this.setState({ department: e.target.value });
    // setGlData({ glAcctNo: e.target.value });
    let ID = Number(e.target.value);
    // alert(ID+" = ")
    // const  cGlNo = glAcctNo.substr(8,4);
    // const  cGlSub = glAcctNo.substr(26,3);
    //  const cDep = glAcctNo.substr(43,3);
    //  const cName = glAcctNo.substr(49,glAcctNo.length-50);
    for (let i = 0; i < glData.length; i++) {

      if (glData[i].id === ID) {
      //    alert(glData[i].id+" : ID: "+ID);
        setGlID(glData[i].id);
        glNo = glData[i].glNo;
        glSub = glData[i].glSub;
        glType = glData[i].glType;
        department = glData[i].department;
        glName = glData[i].glName;
        glDescription = glData[i].glDescription;
        glID = glData[i].id;
     //   alert(glNo+glSub);
      }

    }

    //   alert(glNo+glSub) ;

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
    inputRef.current.focus();
  };

  const formatInputVoucherNo = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name);
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
    setVoucherNo(e.target.value.toUpperCase());
    //alert(voucherNo);

  };
  const formatInputSupplierID = async (e) => {
    e.preventDefault();
    if (lDisable) {
      return false;
    }
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
    setSupplierID(e.target.value.toUpperCase());


  };
  const formatInputParticular = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');

    setPaymentParticular(e.target.value);


  };
  const formatInputDocumentNo = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
    setDocumentNo(e.target.value.toUpperCase());


  };
  const formatInputReceiptNo = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
    setReceiptNo(e.target.value.toUpperCase());


  };




  const formatInputInvoiceNo = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name);
    // alert(e.target.value);
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
    setInvoiceNo(e.target.value.toUpperCase());


  };
  const handleRemove = async (id) => {


    const newData = [...data];
    const index = newData.findIndex((data) => data.id === id);

    if (index !== -1) {
      newData.splice(index, 1);
      setData(newData);
    }

    // alert(newData.length);


    let nBal = 0;
    let nPay = 0;
    let vID = 0;
    for (let i = 0; i < newData.length; i++) {
      //   alert(newDatas[i].itemTotal);
      nBal += Number(newData[i].invoiceBalance);
      nPay+= Number(newData[i].payAmount);
      vID++;
      newData[i].id = vID;
    }
    setBalanceTotal(nBal);
    setPaymentTotal(nPay);
  };

  const handleRemoveVoucher = async (id) => {


    const newData = [...voucherData];
    const index = newData.findIndex((voucherData) => voucherData.id === id);

    if (index !== -1) {
      newData.splice(index, 1);
      setVoucherData(newData);
    }

    // alert(newData.length);


    totalDrAmt = 0;
    totalCrAmt = 0
    let vID = 0;
    for (let i = 0; i < newData.length; i++) {
      //   alert(newDatas[i].itemTotal);
      totalDrAmt += Number(newData[i].drAmt);
      totalCrAmt += Number(newData[i].crAmt);

      vID++;
      newData[i].id = vID;
    }
  };

  const onAddVoucher = () => {

    if (voucherNo === '' || voucherNo === null) {
      alert("Journal Voucher No. cannot be blank")
      return false;
    };

    for (let i = 0; i < voucherNo.length; i++) {
      if (voucherNo.substr(i, 1) === ';') {
        alert("Voucher No. cannot contain (;) letter ");
        return false;
      }

    }

    if (txnDate === '' || txnDate === 'undefined') {
      alert("transaction Date cannot be blank");
      return false;
    }

    if (Number(drAmt) === 0 && Number(crAmt) === 0) {
      alert("Debit or Credit Amount must at least one cannnot be ZERO");
      return false;
    }

    if (Number(drAmt) > 0 && Number(crAmt) > 0) {
      alert("Debit or Credit Amount can only key in either one");
      return false;
    }


    if (vouchEdit) {

      totalDrAmt=0;
      totalCrAmt=0;
      const newDatas = [...voucherData];
    for (let i = 0; i < newDatas.length; i++) {
      if (newDatas[i].id === vouch_id) {
        newDatas[i].glNo= glNo;
        newDatas[i].glSub= glSub;
        newDatas[i].glType= glType;
        //purchaseQty: parseFloat(purchaseQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        newDatas[i].department= department;
        newDatas[i].glName= glName;
        newDatas[i].jeParticular= paymentParticular;
        newDatas[i].drAmt= drAmt;
        newDatas[i].crAmt= crAmt;
        newDatas[i].glID= glID;
        newDatas[i].voucherNo = voucherNo;
        newDatas[i].txnDate = txnDate;
        newDatas[i].companyID = companyID;
      //  newDatas[i].jvInit =

        // alert(newDatas[i].glNo);
      }


      totalDrAmt+=Number(newDatas[i].drAmt);
      totalCrAmt+=Number(newDatas[i].crAmt);
    }

  let drTotal= parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  let crTotal= parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  setVoucherData(newDatas);
  vouchEdit = false;
 // alert(voucherData[0].glNo);
  setDrAmt(0);
  setCrAmt(0);

    } else {
//      setGlID(glData[i].id);
   for (let i = 0; i < glData.length; i++) {
      if (glData[i].id === ID) {
        glNo=glData[i].glNo;
        glSub=glData[i].glSub;
        glType=glData[i].glType;
        department=glData[i].department;
        glName=glData[i].glName;
        glID = glData[i].id;
      }
   }

  //    alert(ID+":"+glNo+" = "+glSub);
  //        alert(crAmt);
  //    if (drAmt === 'NaN' || drAmt === '') {
  //        setDrAmt(0);
  //    }
  //    if (crAmt === '') {
  //     setCrAmt(0);
  //  }

      vid = vid + 1;
      const newData = {
        id: vid,
        glNo: glNo,
        glSub: glSub,
        glType: glType,
        //purchaseQty: parseFloat(purchaseQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        department: department,
        glName: glName,
        jeParticular: paymentParticular,
        drAmt: drAmt,
        crAmt: crAmt,
        glID: glID,
        voucherNo: voucherNo,
        txnDate: txnDate,
        companyID: companyID,

      };

      // alert(newData.glNo);

      const newDatas = [...voucherData, newData];
      //data=e.target.value;
      //data = newDatas
      totalDrAmt = 0;
      totalCrAmt = 0;

      for (let i = 0; i < newDatas.length; i++) {
        // alert(newDatas[i].crAmt);
        totalDrAmt += Number(newDatas[i].drAmt);
        totalCrAmt += Number(newDatas[i].crAmt);
        //  alert(TotalCrAmt);
        newDatas[i].id = i + 1;

        newDatas[i].totalDrAmt = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        newDatas[i].totalCrAmt = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        // setVoucherData(newDatas);

        //    alert(newDatas[i].glNo);
      }
      setVoucherData(newDatas);
      setVoucherData(newDatas);
      //  alert(voucherData[0].glSub);

      let drTotal = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1,');
      let crTotal = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1,');
      // setDrAmtTotal(drTotal);
      // setCrAmtTotal(crTotal);
      // alert(voucherData[0].glNo);
      //lRead = true;
      // onSumDrCrAmt(newDatas)
      setDrAmt(0);
      setCrAmt(0);

    };





  };

  // Add Purchase Item ******************************
  const onAddPayment = () => {
    // e.preventDefault();
    //  alert(taxID);
   if (invEdit !== true) {
     alert('No Edit require, to edit please press Edit Button in selected row');
     return false;
   }

   if (voucherNo === '' || voucherNo === null) {
    alert("Journal Voucher No. cannot be blank")
    return false;
  };

    if (paymentParticular === '' || paymentParticular === null) {
      alert("Payment Particular must Enter")
      return false;
    };

    for (let i = 0; i < voucherNo.length; i++) {
      if (voucherNo.substr(i, 1) === ';') {
        alert("Voucher No. cannot contain (;) letter ");
        return false;
      }

    }
    if (txnDate === '' || txnDate === 'undefined') {
      alert("transaction Date cannot be blank");
      return false;
    }





    if (supplierID === '' || supplierID === null) {
      alert("No Customer selected");
      return false;
    };
    if (supplierName === '' || supplierName === null) {
      alert("No Customer selected");
      return false;
    };
    //alert(productID);

    if (invoiceNo === '' || invoiceNo === null) {
      alert("Invoice No. cannot be blank");
      return false;
    };




    //  alert(typeof unitPrice);




    // if purchase item edited
    let nBal =0;
    if (invEdit) {
      const newDatas = [...data];

      for (let i = 0; i < newDatas.length; i++) {
        if (newDatas[i].id === pur_id) {

          if (payAmount > Math.abs(Number(newDatas[i].invoiceBalance)) ) {
            alert('Pay Amount cannot more than Invoice Balance');
            return false;
          }

          newDatas[i].voucherNo = voucherNo;
          newDatas[i].invoiceNo = newDatas[i].invoiceNo;
          newDatas[i].invDate = newDatas[i].invDate;
          newDatas[i].dueDate = newDatas[i].dueDate;
          newDatas[i].debitAmount = newDatas[i].debitAmount;
          newDatas[i].creditAmount = newDatas[i].creditAmount;
          newDatas[i].invoiceBalance = newDatas[i].invoiceBalance;
          newDatas[i].payAmount = payAmount;
          newDatas[i].supplierID = supplierID;
          newDatas[i].supplierName = supplierName;
          newDatas[i].receiptNo = receiptNo;
          newDatas[i].documentNo = documentNo;
          newDatas[i].txnDate = txnDate;
          newDatas[i].paymentType = paymentType;
          newDatas[i].paymentParticular = paymentParticular;
          newDatas[i].voucherNo = voucherNo;
          newDatas[i].companyID = companyID;
          newDatas[i].glNo = suppGlNo;
          newDatas[i].glSub = suppGlSub;
          newDatas[i].txnDate = txnDate;
          newDatas[i].paymentTotal = paymentTotal;
          newDatas[i].bankName= bankName;



        }
          //   alert(newDatas[i].payAmount);
            nBal+=Number(newDatas[i].payAmount);
          //  alert(nBal);
            setPaymentTotal(nBal);
      }
      setPayAmount('');
      setData(newDatas);
    //  setPaymentParticular('');
     // setPaymentTotal(nBal);

    }



      invEdit = false;



  };  // onAdd

  const handleEdit = async (e) => {
    // alert(e)

    const newData = [...data];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === e) {



        setPayAmount(newData[i].payAmount);

      //  setPaymentParticular(newData[i].paymentParticular);

       //  defaultQty = newData[i].defaultQty;
        invEdit = true;
        pur_id = e;



      }
    }
    inputReference.current.focus();
  };


  const handleEditVoucher = async (e) => {
    // alert(e)

    const newData = [...voucherData];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === e) {
        setGlID(newData[i].glID);
        setDrAmt(newData[i].drAmt);
        setCrAmt(newData[i].crAmt);


        vouchEdit = true;
        vouch_id = e;



      }
    }


    inputRefVoucher.current.focus();
  };

  const onPrintPayment = async (Data) => {
    if (data.length === 0) {
      alert("No Payment provided")
      return false;
    }

    for (var i = data.length - 1; i >= 0; i--) {


      let date = txnDate;
       let iDate= data[i].invDate;
      let dDate = data[i].dueDate;
      // alert(dlData[0].txnDate);
      // const [txnDate, setTxnDate] = useState(date);
      //   todayDate = curr.split("/").reverse().join("-");
      //  let voucherDate = moment(new Date(date)).format("DD/MM/YYYY")
      data[i].txnDate = format(new Date(date), "dd/MM/yyyy");
      data[i].txnDate = format(new Date(date), "dd/MM/yyyy");
      data[i].txnDate = format(new Date(date), "dd/MM/yyyy");

      let dr = data[i].debitAmount;
      data[i].debitAmount = parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      let cr = data[i].creditAmount;
      data[i].creditAmount = parseFloat(cr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
       let bal = data[i].invoiceBalance;
       data[i].invoiceBalance = parseFloat(bal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
       let pay = data[i].payAmount;
       data[i].payAmount = parseFloat(pay).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
       let TotalPay = paymentTotal;
      data[i].paymentTotal = parseFloat(TotalPay).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
  //  voucherData[0].id = 'B';

    // let totalCr = voucherData[0].totalCrAmt;
    const newData = {
      id: '',
      voucherNo: '',
      invDate: '',
      dueDate: '',
      debitAmount: '',
      creditAmount: '',
      invoiceBalance: 'Totals:',
      payAmount: parseFloat(paymentTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') ,
      supplierID: '',
      supplierName: '',
      receiptNo: '',
      documentNo: '',
      txnDate: '',
      paymentType: '',
      paymentParticular: '',
      companyID: '',
      glNo: '',
      glSub: '',
      txnDate: '',
      paymentTotal: '',
      bankName: '',

    };


    const newDatas = [...data, newData];

    PaymentGenerator(newDatas)
    //PDF({voucherData,headers,filename})



  };


  const onPrint = async (voucherData, drTotal, crTotal) => {


    console.log(voucherData);
    if (voucherData.length === 0) {
      alert("No Voucher provided")
      return false;
    }


    if (voucherNo === null || voucherNo === '') {
      alert("No Voucher No. provided")
      return false;
    }

    // let totalDr = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // let totalCr = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    //  voucherData[0].totalDrAmt = totalDr;
    //  voucherData[0].totalCrAmt = totalCr;

    for (var i = voucherData.length - 1; i >= 0; i--) {


      let date = txnDate;
      // alert(dlData[0].txnDate);
      // const [txnDate, setTxnDate] = useState(date);
      //   todayDate = curr.split("/").reverse().join("-");
      //  let voucherDate = moment(new Date(date)).format("DD/MM/YYYY")
      voucherData[i].txnDate = format(new Date(date), "dd/MM/yyyy");
      let dr = voucherData[i].drAmt;
      voucherData[i].drAmt = parseFloat(dr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      let cr = voucherData[i].crAmt;
      voucherData[i].crAmt = parseFloat(cr).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    voucherData[0].id = 'P';

    voucherData[0].totalDrAmt = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    voucherData[0].totalCrAmt = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    let totalDr = voucherData[0].totalDrAmt;
    let totalCr = voucherData[0].totalCrAmt;
    let vid = voucherData.length + 1;
    const newData = {
      id: vid,
      voucherNo: '',
      glNo: '',
      glSub: '',
      department: '',
      jeParticular: 'Total:',
      glName: '',
      glType: '',
      drAmt: totalDr,
      crAmt: totalCr,
      companyID: '',
      userName: '',
      txnDate: '',
      totalDrAmt: 0,
      totalCrAmt: 0

    };

    const newDatas = [...voucherData, newData];

    const headers = [
      { key: 'G/L No.', display: 'glNo' },
      { key: 'G/L Sub', display: 'glSub' },
      { key: 'Department', display: 'department' },
      { key: 'G/L Name', display: 'glName' },
      { key: 'G/L Type', display: 'glType' },
      { key: 'Particular', display: 'jeParticular' },
      { key: 'Dr. Amount', display: 'drAmt' },
      { key: 'Cr. Amount', display: 'crAmt' },
    ];

    // Here's the call for our pdf function
    // Because of the placeholder code in our pdf.js file,
    // clicking on this should render a save dialog
    // and downloading should render an empty pdf
    //   alert(newDatas[0].totalDrAmt);
    //   alert(newDatas[0].totalCrAmt);
    generatePDF(newDatas, 'PV')
    //PDF({voucherData,headers,filename})



  };

  // Add Purchase Item ******************************



  const loadProduct = async (catNo) => {
    // alert(catNo);

    Axios
      .get(url + `/productListByCategory`,
        {
          params: {
            companyID: companyID,
            categoryID: catNo,
          }
        }
      )
      .then(res => {

        stockID = 0;
        stockData = res.data;
        if (stockData.length > 0) {
          stockID = stockData[0].id;
        }

        //  alert(stockData[0].productName);
      });
  };

  const handleCancel = async (e) => {
    //  alert('remove');
    setCustData([]);
  };



  const onNew = async () => {

lDisable = false;
    setData(...data);
    window.location.href = '/salesInvoicePayment';
  };
  const handleHome = async () => {



    window.location.href = '/home';
  };

  // on Save Purchase Invoice and Voucher *******************
  const onSave = async (voucherData, drTotal, crTotal) => {
    // e.preventDefault();
    console.log(data);

    // alert(data[0].taxDescription+ " = "+data[0].remark);
    //   alert(TotalCrAmt);
    if (data.length === 0) {
      alert("No Sales Invoice available to Save");
      return false;
    }

    if (voucherData.length === 0) {
      alert('No Voucher to save');
      return false
    }
    if (paymentTotal === 0) {
      alert("Sales Invoice Payment Amount is ZERO");
      return false;
    }


    if (TotalDrAmt !== TotalCrAmt) {
      alert('Debit total and Credit total must equal')
      return false
    }

    if (txnDate === '' || txnDate === 'undefined') {
      alert("transaction Date cannot be blank");
      return false;
    }
    if (voucherNo === '' || voucherNo === null) {
      alert('Voucher No cannot be empty');
      return false
    }
    // data must update to the final changed
    for (let i = 0; i < data.length; i++) {

      //  data[i].taxID = taxID;

      data[i].voucherNo = voucherNo;
    //  data[i].invoiceNo = invoiceNo;
      data[i].supplierID = supplierID;
      data[i].supplierName = supplierName;
      data[i].txnDate = txnDate;
      data[i].paymentType = paymentType;
      data[i].receiptNo = receiptNo;
      data[i].documentNo = documentNo;
      data[i].voucherNo = voucherNo;
      data[i].companyID = companyID;
      data[i].glNo = suppGlNo;
      data[i].glSub = suppGlSub;
      data[i].txnDate = txnDate;

      // alert(taxData[i].taxID);
      //   alert(taxID);
    }
 //   alert(suppGlNo+ " - "+suppGlSub);

       lOk = false
    for (let i = 0; i < voucherData.length; i++) {
      //  alert(voucherData[i].glNo+" - "+voucherData[i].glSub);
      if (voucherData[i].glNo === suppGlNo && voucherData[i].glSub === suppGlSub) {
        lOk = true;

      }


    }

    if (lOk === false) {
      alert("Voucher G/L No. and G/L Sub No. must match Customer G/L No and G/L Sub No.");
      return false
  }
/*
    lOk = false
   // alert(bankGlNo+ ' - ' +bankGlSub);
    for (let i = 0; i < voucherData.length; i++) {
       // alert(voucherData[i].glNo+" - "+voucherData[i].glSub);
      if (voucherData[i].glNo === bankGlNo && voucherData[i].glSub === bankGlSub) {
        lOk = true;

      }


    }

    if (lOk === false) {
        alert("Voucher G/L No. and G/L Sub No. must match Bank G/L No and G/L Sub No.");
        return false
    }
*/

    Axios
      .get(url + `/supplierSearch`,
        {
          params: {
            companyID: companyID,
            supplierID: supplierID,
          }
        }
      )
      .then(res => {
        if (res.data.length === 0) {
          alert('Customer ID: ' + supplierID + ' is invalid, please re-enter or press (download) button to search the valid ID');
          return false;
        }
      }, []);

    // verify Voucher No
    Axios
      .get(url + `/voucherVerify`,
        {
          params: {
            companyID: companyID,
            voucherNo: voucherNo,
          }
        }
      )
      .then(res => {

        // alert(res.data);
        if (res.data === 'Existed') {
          alert('Voucher No. ' + voucherNo + ' already Existed, please re-enter or press (download) button to get the newest running No.')
          return false
        }



      }, []);

      Axios
      .get(url+`/salesReceiptVerify`,
        {
         params: {
                 companyID: companyID,
                 receiptNo: receiptNo,
                }
        }
      )
      .then(res => {

      // alert(res.data);
       if (res.data.length >0) {
          alert('Sales Receipt No. '+receiptNo+' already existed, please re-enter')
           return false
        }



      }, []);

    //alert(data[0].voucherNo);
    /** update purchase Invoice */



    Axios
      .post(url + '/salesPayment', data



      )

      .then(res => {


        if (res.data === 'Success') {



          //    window.location.reload(false);
          // window.location.href='journalVoucher';

        };
        //  alert(text);
      }, []);

 // return false


    /** update voucher */
    //alert(voucherData[0].glNo);

    Axios
      .post(url + '/purchaseVoucher', voucherData



      )

      .then(res => {


        if (res.data === 'Success') {

          // setData(...data);
          window.location.href = '/salesInvoicePayment';

        };
        //  alert(text);
      }, []);




  };

  const onClearSupplier = async () => {
    setCustData([]);

  };
  const onSearch = async () => {


    if (supplierID !== '' || supplierID !== null) {
      Axios
        .get(url + `/supplierSearch`,
          {
            params: {
              companyID: companyID,
              supplierID: supplierID,
            }
          }
        )
        .then(res => {
          if (res.data.length > 0) {

            setSupplierName(res.data[0].supplierName);
            setSuppGlNo(res.data[0].glNo);
            setSuppGlSub(res.data[0].glSub);
            for (let i = 0; i < glData.length; i++) {
              if (glData[i].glNo === res.data[0].glNo && glData[i].glSub === res.data[0].glSub) {
                setGlID(glData[i].id);
                glNo=glData[i].glNo;
                glSub=glData[i].glSub;
                glType=glData[i].glType;
                department=glData[i].department;

              }
            }

          } else {


            Axios
              .get(url + `/customerList`,
                {
                  params: {
                    companyID: companyID,

                  }
                }
              )
              .then(res => {
                if (res.data.length > 0) {
                  //   supplierData = res.data;
                  //    alert(res.data[0].supplierID);
                  //  alert(typeof res.data);
                  setCustData(res.data);
                  alert('Please selected from the Customer from Customer Selection below')


                  return false;
                }


              });







          }






        }, []);

    };

  };
















  //  inputReference.current.focus();



  const onSearchInvoice = async () => {

    if (supplierID === '' || supplierID === null) {
      alert("No Customer Selected");
      return false;
    }

    if (supplierName === '' || supplierName === null) {
      alert("No Customer Selected");
      return false;
    }

    if (invoiceNo === '' || invoiceNo === null) {
      alert("Sales Invoice No. is blank");
      return false;
    }

    for (let i = 0; i < data.length; i++) {
       if (data[i].invoiceNo === invoiceNo) {
          alert('This Invoice already added');
          return false;
       }



    }

    Axios
      .get(url + `/salesInvoiceSummary`,
        {
          params: {
            companyID: companyID,
            supplierID: supplierID,
            invoiceNo: invoiceNo,
          }
        }
      )
      .then(res => {

        // alert(res.data);
        if (res.data.length === 0) {
          alert('Sales Invoice No. ' + invoiceNo + ' is invalid')
          return false
        } else {

         // calculating the summary
        let iData = res.data;
        dAmt = 0;
          cAmt=0;
        bal =0
        let date = res.data[0].txnDate;
        let curDate = new Date(date);
       //      invDate = curDate;
        //  invDate = curDate.toISOString().substr(0,10);
       invDate = format(curDate, 'dd/MM/yyyy');
      // alert(date);
         //  txnDate = invDate;
           curDate.setDate(curDate.getDate()+res.data[0].term);
           expDate=format(curDate, 'dd/MM/yyyy');
         //   expDate = curDate;
       //    current.setDate(current.getDate()+2);
         vid = data.length;
        for (let i = 0; i < iData.length; i++) {
             dAmt+=iData[i].drAmt;
             cAmt+=iData[i].crAmt;
             bal+=iData[i].drAmt-iData[i].crAmt;

        }


        }

         vid = vid +1;
         const newData ={
           id: vid,
           invoiceNo: invoiceNo,
           invDate: invDate,
           dueDate: expDate,
           debitAmount: dAmt,
           creditAmount: cAmt,
           invoiceBalance: bal,
           payAmount: 0.00,
           supplierID: '',
           supplierName: '',
           receiptNo: '',
           documentNo: '',
           txnDate: txnDate,
           paymentType: paymentType,
           paymentParticular: paymentParticular,
           voucherNo: voucherNo,
           companyID: companyID,
           glNo: suppGlNo,
           glSub: suppGlSub,
           txnDate: txnDate,
           paymentTotal: paymentTotal,

         }
         const newDatas = [...data, newData];
         setData(newDatas);
         // data.push(...newDatas);
          let nPay = 0;
          let nBal = 0;
         for (let i = 0; i < newDatas.length; i++) {
              nBal+=newDatas[i].invoiceBalance;
              nPay+=newDatas[i].payAmount;
         }
        // alert(data.length);
           setBalanceTotal(nBal);
           setPaymentTotal(nPay);
           lDisable = true;

      }, []);

    // load purchase Invoice Detail



  };

  // on Save Purchase Invoice and Voucher *******************
  const onSearchReceipt = async () => {

    if (txnDate === 'null') {
      alert('No Date Selected');
      return false
     // setTxnDate(todayDate);
  }
   //  alert(txnDate);
  let cYear =  new Date(txnDate).getFullYear();
    let cMonth = (new Date(txnDate).getMonth())+1;

  //     alert(String(cYear).slice(-2));
    //  alert(("0"+String(cMonth)).slice(-2));
      let jvDate= String(cYear).slice(-2)+("0"+String(cMonth)).slice(-2);
     // alert(cYear);
     // alert(invType);

  Axios
  .get(url+`/lastSalesReceipt`,
    {
     params: {
             companyID: companyID,
             jvInit: cYear,
            }
    }
  )
  .then(res => {
    let vNo ='';
   if (res.data.length > 0) {

    //  alert(res.data[0].receiptNo);
   //   let iNo = res.data[0].jvInit + '-' + String(Number(res.data[0].invoiceNo.slice(5)) + 1);
       if (Number(res.data[0].receiptNo.substring(0,4))===cYear) {
       // alert(Number(res.data[0].receiptNo.slice(9)));
         vNo = res.data[0].jvInit+'-'+String(Number(res.data[0].receiptNo.slice(5))+1);
      //   alert(vNo);
      } else {
          vNo = cYear+'-1';

      }
  //     let vNo = res.data[0].jvInit+'-'+String(Number(res.data[0].receiptNo.slice(8))+1);
      setReceiptNo(vNo);

   }else{
    let vNo = cYear+'-1';
  //  alert(vNo);
      setReceiptNo(vNo);
   }

  }, []);
  }

  const onSearchVoucher = async (e) => {
    if (txnDate === 'null') {
      alert('No Date Selected');
      return false
      // setTxnDate(todayDate);
    }
    //  alert(txnDate);
    let cYear = new Date(txnDate).getFullYear();
    let cMonth = (new Date(txnDate).getMonth()) + 1;

    //     alert(String(cYear).slice(-2));
    //  alert(("0"+String(cMonth)).slice(-2));
    let jvDate = String(cYear).slice(-2) + ("0" + String(cMonth)).slice(-2);
    //    alert(jvDate);
    //  sessionStorage.setItem('invoiceNo',invoiceNo);
    //   sessionStorage.setItem('voucherNo',voucherNo);
    //   sessionStorage.setItem('txnDate',txnDate);

    Axios
      .get(url + `/lastVoucherNo`,
        {
          params: {
            companyID: companyID,
            jvInit: jvDate,
          }
        }
      )
      .then(res => {
        if (res.data.length > 0) {
          let vNo = res.data[0].jvInit + '-' + String(Number(res.data[0].voucherNo.slice(5)) + 1);
          setVoucherNo(vNo);

        } else {
          let vNo = jvDate + '-1';
          setVoucherNo(vNo);
        }

      }, []);

  };

  const onSearchProduct = async () => {
    //  alert(productID);
    if (productID === '*') {
      setProductName('None Stock Item');
      setUnit('');
      return true;
    }
    //   localStorage.setItem('supplierID', supplierID);
    //   localStorage.setItem('supplierName', supplierName);
    //   localStorage.setItem('paymentTerm', paymentTerm);
    //     sessionStorage.setItem('invoiceNo',invoiceNo);
    //     sessionStorage.setItem('voucherNo',voucherNo);
    //     sessionStorage.setItem('txnDate',txnDate);
    //     localStorage.setItem('invData',JSON.stringify(data));

    Axios
      .get(url + `/ProductSearch`,
        {
          params: {
            companyID: companyID,
            productID: productID,
          }
        }
      )
      .then(res => {
        if (res.data.length > 0) {
          setProductName(res.data[0].productName);
          barcode=res.data[0].barcode;
          setUnit(res.data[0].unit);

        } else {
          //   localStorage.removeItem('productID');
          //   localStorage.removeItem('productName');
          //  localStorage.removeItem('barcode');
          //   localStorage.removeItem('unit');
            alert("Product ID: "+productID+" is invalid, please select from the information below")
          //  window.location.reload(false);
        //  window.location.href = '/SelectProduct';
        }
//alert(barcode);
      }, []);

  }

  const handleInputChangePay = async (e) => {
    console.log(e.target.value)
    let num = e.target.value
    if (num === '' && num === 'NaN') {
      num = 0;
    }
  //  if (num === 0) {
  //    return true;
  //  }
    setPayAmount(num);

  };

  const formatInputPayAmount = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    if (num === 0) {
      return true;
    }
    setPayAmount(parseFloat(num).toFixed(2));

  };


  const handleInputChangeDrAmt = async (e) => {
    console.log(e.target.value)
    let num = e.target.value
    if (num === '' && num === 'NaN') {
      num = 0;
    }
  //  if (num === 0) {
  //    return true;
  //  }
    setDrAmt(num);

  };
  const handleInputChangeCrAmt = async (e) => {
    console.log(e.target.value)
    let num = e.target.value
    if (num === '' && num === 'NaN') {
      num = 0;
    }
  //  if (num === 0) {
  //    return true;
  //  }
    setCrAmt(num);
  };





  const formatInputDrAmt = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    if (num === 0) {
      return true;
    }
    setDrAmt(parseFloat(num).toFixed(2));

  };



  const formatInputCrAmt = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    if (num === 0) {
      return true;
    }
    setCrAmt(parseFloat(num).toFixed(2));

  };





  const defaultSorted = [{
    dataField: 'supplierID',
    order: 'supplierID'
  }];

  const pagination = paginationFactory({
    page: 2,
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
        <div className="col-sm-12 btn btn-success" style={{ marginTop: '1px' }}>
          Sales Invoice Payment Entry
        </div>
      </div>


      <div>
         <p></p>
        <label style={{ paddingLeft: "10px" }} >
          <a style={{ marginRight: '.5rem' }}> Customer ID : </a>
          <input
            type="text"
            style={{ width: '200px', border: '1px solid #696969' }}
            value={supplierID}
            name="supplier"
            class="text-uppercase"
            onChange={(e) => formatInputSupplierID(e)}
            required
            disabled={lDisable}
            data-tip data-for="supplierTip"
          />

          <button
            style={{ padding: '6px' }}
            type='button'
            class='btn btn-primary fa fa-search float-right'
            onClick={() => onSearch()}
            data-tip data-for="supplierSearchTip"
          ></button>

<ReactTooltip id="supplierTip" place="top" effect="solid">
        Enter Customer ID
</ReactTooltip>
<ReactTooltip id="supplierSearchTip" place="top" effect="solid">
        Press to search a Customer Information
</ReactTooltip>




          <a style={{ marginLeft: '.6rem', marginRight: '0.1rem' }} >Customer Name : </a>

          <input
            type="text"
            style={{ width: '900px', border: '1px solid #696969'  }}
            value={supplierName}
            name="supplierName"
            readOnly={true}
            required
          />



        </label>






      </div>



      <label style={{ paddingLeft: "10px" }} >


        <a style={{ marginRight: '.2rem' }}> Receipt No. : </a>
        <input
          type="text"
          style={{ width: '230px', border: '1px solid #696969' }}
          value={receiptNo}
          name="document"
          maxLength={20}
          class="text-uppercase"
          onChange={(e) => formatInputReceiptNo(e)}
          required
          readOnly={true}
          data-tip data-for="receiptTip"
        />

<button
            style={{ padding: '6px' }}
            type='button'
            class='btn btn-primary fa fa-search float-right'
            onClick={() => onSearchReceipt()}
            data-tip data-for="receiptSearchTip"
          ></button>
 <ReactTooltip id="receiptSearchTip" place="top" effect="solid">
       Press To Load Latest Sales Payment Recept No.
</ReactTooltip>

<ReactTooltip id="receiptTip" place="top" effect="solid">
       Sales Payment Recept No.
</ReactTooltip>

        <a style={{ marginLeft: '.5rem', marginRight: '.5rem' }} >Receipt Date : </a>
        <input
          type="date"
          maxLength={10}
          value={txnDate}
          style={{ width: '10%', border: '1px solid #696969' }}
          //  defaultValue = {txnDate}
          name="txnDate"
          onChange={(e) => formatInputDate(e)}
          required
        />

           <a style={{marginLeft: '.5rem', marginRight: '.3rem'}} component="payment">Select Payment Type : </a>

           <select value={paymentType} onChange={(e) => handleChangePayType(e)}>
              {payOption.map((item) => (
                <option value={item.value}>({item.label}) </option>
              ))}

            </select>


            <a style={{ marginLeft: '.5rem', marginRight: '.4rem' }} >Cheque/Document Ref. : </a>
        <input
          type="text"
          maxLength={30}
          value={documentNo}
          style={{ width: '16%', border: '1px solid #696969' }}
          //  defaultValue = {txnDate}
          name="document"
          onChange={(e) => formatInputDocumentNo(e)}
          required
          data-tip data-for="documentTip"
        />
<ReactTooltip id="documentTip" place="top" effect="solid">
        Enter Bank Cheque No. / Transfer No. / CASH
</ReactTooltip>

      </label>

      <div className="select-container" >



        <p></p>


        <table class="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>
            <th style={{ backgroundColor: 'yellow', width: '1px', textAlign: 'center' }}>#</th>
              <th style={{ backgroundColor: '#999999', width: '150px', textAlign: 'center' }}>Invoice No.</th>
              <th style={{ backgroundColor: 'yellow', width: '100px', textAlign: 'center' }}>Date</th>
              <th style={{ backgroundColor: '#999999', width: '80px', textAlign: 'center' }}>Due Date</th>
              <th style={{ backgroundColor: 'yellow', width: '150px', textAlign: 'center' }}>Amount Debited</th>
              <th style={{ backgroundColor: '#999999', width: '150px', textAlign: 'center' }}>Amount Credited</th>
              <th style={{ backgroundColor: 'yellow', width: '150px', textAlign: 'center' }}>Invoice Balance</th>
              <th style={{ backgroundColor: '#999999', width: '150px', textAlign: 'center' }}>Pay Amount</th>
              <th style={{ backgroundColor: 'blue', textAlign: 'center', color: 'white', width: '1px'}}>Action</th>
            </tr>
          </thead>
          <tbody style={mystyle} >
            {data.map(item => {
              return <tr key={item.id}>
                <td style={{textAlign: 'center'}}>{item.id}</td>

                <td style={{ textAlign: 'left', backgroundColor: '#999999' }}>{item.invoiceNo}</td>
                <td style={{ textAlign: 'center'}}>{item.invDate}</td>
                <td style={{ textAlign: 'center', backgroundColor: '#999999' }}>{item.dueDate}</td>
                <td style={{ textAlign: 'right'}}>{parseFloat(item.debitAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'right', backgroundColor: '#999999' }}>{parseFloat(item.creditAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'right', width: '20px'}}>{parseFloat(item.invoiceBalance).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </td>
                <td style={{ textAlign: 'right', width: '20px', backgroundColor: 'yellow' }}>{parseFloat(item.payAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </td>
                <button class={'fa fa-edit'} style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEdit(item.id)}> </button>
                <button class={'fa fa-trash'} style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleRemove(item.id)}> </button>
              </tr>

            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td style={{ textAlign: "center", backgroundColor: "cyan" }}>Receipt Total :</td>




            <td style={{ textAlign: "right", color: "red" }}>{parseFloat(balanceTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <td style={{ textAlign: "right", color: "red" }}>{parseFloat(paymentTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


          </tbody>
          <tfoot>


            <td></td>
            <td></td>
            <td></td>



          </tfoot>
        </table>

        <div>

        </div>


        <p></p>

        <label style={{ paddingLeft: "10px" }} >


          <a style={{ marginRight: '.3rem' }}> Invoice No. : </a>
          <input
            type="text"
            value={invoiceNo}
            name="invoice"
            style={{ width: '245px', border: '1px solid #696969' }}
            class="text-uppercase"
            onChange={(e) => formatInputInvoiceNo(e)}
            readOnly={iRead}
            required
            data-tip data-for="invoiceTip"
          />

          <button
            style={{ padding: '6px' }}
            type='button'
            class='btn btn-primary fa fa-search float-right'
            onClick={() => onSearchInvoice()}
            data-tip data-for="searchInvoiceTip"
          ></button>

<ReactTooltip id="invoiceTip" place="top" effect="solid">
        Enter Sales Invoice No.
</ReactTooltip>
<ReactTooltip id="searchInvoiceTip" place="top" effect="solid">
        Press to verify Sales Invoice
</ReactTooltip>

          <a style={{ marginLeft: '1rem', marginRight: '.6rem' }}> Receipt Amount : </a>


          <input
            type="number"
            style={{ width: '200px', border: '1px solid #696969' }}
            value={payAmount}
            name="payamount"
            class="text-uppercase"
            ref={inputReference}
            onChange={(e) => handleInputChangePay(e)}
            onBlur={(e) => formatInputPayAmount(e)}
            required
            data-tip data-for="payAmountTip"
          />
<ReactTooltip id="payAmountTip" place="top" effect="solid">
        Enter Receiving Amount
</ReactTooltip>

        </label>



        <div style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} />

        <p></p>

        <label style={{ paddingLeft: "10px" }} >


<a style={{ marginRight: '.2rem' }}> Receipt Particular : </a>
<input
  type="text"
  style={{ width: '1300px', border: '1px solid #696969' }}
  value={paymentParticular}
  name="particular"
  onChange={(e) => formatInputParticular(e)}
  maxLength={255}
  required
  data-tip data-for="payParticularTip"
/>

<ReactTooltip id="payParticularTip" place="top" effect="solid">
        Enter Receiving Particular and Description
</ReactTooltip>

</label>



        <p></p>
        <div style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} />

        <p></p>
        <td></td>
        <td><button style={{ backgroundColor: "blue", color: "white", width: '200px' }} onClick={() => onNew()}>New Receipt </button></td>
        <td><button style={{ backgroundColor: "grey", color: "black", width: '100px' }} onClick={() => handleHome()}>Home</button></td>
        <td><button style={{ backgroundColor: "green", color: "white", width: '200px' }} onClick={() => onPrintPayment(data)}>Print Receipt</button></td>
        <td><button style={buttonStyle} type="button" onClick={onAddPayment}>Update Receipt</button> </td>


        <p></p>

        <div className="row">
          <div className="col-sx-12 btn btn-info" style={{ marginTop: '1px' }}>
            Sales Invoice Receiving Voucher Entry
          </div>
        </div>



        <table class="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
          <thead class="thead-dark">

            <tr style={{ align: 'left' }}>
            <th style={{ backgroundColor: 'yellow', width: '.5px', textAlign: 'cnter' }}>#</th>
              <th style={{ backgroundColor: '#999999', width: '5px', textAlign: 'center' }}>G/L No.</th>
              <th style={{ backgroundColor: 'yellow', width: '5px', textAlign: 'center' }}>G/L Sub</th>
              <th style={{ backgroundColor: '#999999', width: '.5px', textAlign: 'center' }}>G/L Type</th>
              <th style={{ backgroundColor: 'yellow', width: '.5px', textAlign: 'center' }}>Dep.</th>
              <th style={{ backgroundColor: '#999999', width: '200px', textAlign: 'center' }}>G/L Name</th>
              <th style={{ backgroundColor: 'yellow', width: '100px', textAlign: 'center' }}>G/L Description</th>
              <th style={{ backgroundColor: '#999999', width: '10px', textAlign: 'center' }}>Dr. Amount</th>
              <th style={{ backgroundColor: 'yellow', width: '10px', textAlign: 'center' }}>Cr. Amount</th>
              <th style={{ backgroundColor: 'blue', textAlign: 'center', color: 'white', width: '10px' }}>Action</th>
            </tr>

          </thead>
          <tbody style={mystyle} >
            {voucherData.map(item => {
              return <tr key={item.id}>
                <td>{item.id}</td>

                <td style={{ backgroundColor: '#999999' }}>{item.glNo}</td>
                <td>{item.glSub}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#999999' }}>{item.glType}</td>
                <td style={{ textAlign: 'left' }}>{item.department}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#999999' }}>{item.glName}</td>
                <td style={{ textAlign: 'left' }}>{item.jeParticular}</td>
                <td style={{ textAlign: "right", color: 'red', backgroundColor: 'cyan' }}>{parseFloat(item.drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right", color: "blue", backgroundColor: 'cyan' }}>{parseFloat(item.crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

                <button class={'fa fa-edit'} style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEditVoucher(item.id)}> </button>
                <button class={'fa fa-trash'} style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleRemoveVoucher(item.id)}> </button>
              </tr>

            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>


            <td style={{ textAlign: "center", backgroundColor: "green", color: 'white' }}>Voucher Totals :</td>
            <td style={{ textAlign: "right", backgroundColor: 'cyan', color: "red" }}>{parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

            <td style={{ textAlign: "right", color: "blue", backgroundColor: 'cyan' }}>{parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>




          </tbody>
          <tfoot>


            <td></td>
            <td></td>
            <td></td>



          </tfoot>




        </table>





        <div>

          <label style={{ paddingLeft: '10px' }}>
            <a style={{ marginRight: '.4rem' }}> Voucher No. : </a>
            <input
              type="text"
              value={voucherNo}
              name="voucher"
              style={{ width: '200px', border: '1px solid #696969' }}
              class="text-uppercase"
              ref={inputRef}
              onChange={(e) => formatInputVoucherNo(e)}
              readOnly={false}
              required
              data-tip data-for="voucherTip"
            />

            <button
              style={{ padding: '10px' }}
              type='button'
              class='btn btn-primary fa fa-download float-right'
              onClick={() => onSearchVoucher(voucherNo)}
              data-tip data-for="voucherSearchTip"
            ></button>

<ReactTooltip id="voucherTip" place="top" effect="solid">
        Enter Voucher No. or press to load latest No.
</ReactTooltip>
<ReactTooltip id="voucherSearchTip" place="top" effect="solid">
        Press to load latest Voucher No.
</ReactTooltip>

            <a style={{ marginRight: '.8rem' }}> G/L Selection : </a>
            <select value={ID} onChange={(e) => handleChangeGl(e)}>
              {glData.map((item) => (
                <option value={item.id} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
              ))}

            </select>



            <label style={{ paddingLeft: '0px' }}>
              <a style={{ marginLeft: '0rem', marginRight: '0rem' }}> Debit Amount : </a>
              <input
                type="number"
                style={{ width: '200px', border: '1px solid #696969' }}
                value={drAmt}
                name="drAmt"
                ref={inputRefVoucher}
                onBlur={(e) => formatInputDrAmt(e)}
                onChange={(e) => handleInputChangeDrAmt(e)}
                maxLength={13}
                data-tip data-for="debitTip"
              />


              <a style={{ marginLeft: '1.5rem', marginRight: '.4rem' }}> Credit Amount : </a>
              <input
                type="number"
                style={{ width: '200px', border: '1px solid #696969' }}
                value={crAmt}
                name="crAmt"
                onBlur={(e) => formatInputCrAmt(e)}
                onChange={(e) => handleInputChangeCrAmt(e)}
                maxLength={13}
                data-tip data-for="creditTip"
              />
<ReactTooltip id="debitTip" place="top" effect="solid">
        Enter Amount to debit
</ReactTooltip>
<ReactTooltip id="creditTip" place="top" effect="solid">
  Enter amount to credit
</ReactTooltip>

            </label>


            <p></p>


            <td><button style={{ backgroundColor: "green", color: "white", width: '200px' }} onClick={() => onPrint(voucherData, totalDrAmt, totalCrAmt)}>Print Voucher</button></td>
            <td><button style={{ backgroundColor: "red", color: "white", width: '300px' }} onClick={() => onSave(voucherData, totalDrAmt, totalCrAmt)}>Save Receipt and Voucher</button></td>
            <td><button style={{ backgroundColor: "cyan", color: "black", width: '200px' }} onClick={() => onAddVoucher()}>Add Voucher Item</button></td>

          </label>
        </div>
        <p></p>
        <p></p>

        <div className="col-sx-10 btn btn-secondary" style={{ marginTop: '1px', paddingLeft: '10px' }} >
          Customer Selection

        </div>

        <span class="square border border-dark"></span>

        <BootstrapTable bootstrap4 keyField='id' data={custData} columns={columns}
          defaultSorted={defaultSorted} pagination={pagination}
          rowStyle={{ backgroundColor: '#A9A9A9', border: '3px solid grey' }}
          class="table border border-dark" ></BootstrapTable>

      </div>

      <p></p>
      <p></p>
      <p></p>
      <p></p>




    </div>
















  ) // return
};

export default SalesInvoicePayment;
