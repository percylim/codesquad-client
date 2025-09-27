import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
import './voucher.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'font-awesome/css/font-awesome.min.css'; 
import Tooltip from "@material-ui/core/Tooltip";
import 'react-tooltip/dist/react-tooltip.css';
import ReactDOM from "react-dom";
import generatePDF from "./reportGenerator";
import { format } from "date-fns";
import moment from 'moment';
import { SelectSupplierCustomer } from "./selectSupplierCustomer";
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Tooltip as ReactTooltip } from "react-tooltip";
//import Pagination from "./Pagination";
import BootstrapTable from 'react-bootstrap-table-next';
import { SettingsBackupRestoreRounded } from '@material-ui/icons';

import ExportInvoicePdf from './pdfInvoiceGenerator';

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
var custGlNo='';
var custGlSub = '';
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

var lDisable=false;
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
// alert(format(curr.toISOString().substr(0,10)), "dd/MM/yyyy");
curr.setDate(curr.getDate());

var todayDate = curr.toISOString().substr(0, 10);
// alert(format(curr, "dd/MM/yyyy"));
var vid = 0;
var glID = 0;
var lastSix = '';
var lRead = false;
var iRead = false;
var ROnly = true;
var defaultQty = 0;
var barcode = '';
//sessionStorage.setItem('voucherNo', '');
//sessionStorage.setItem('invoiceNo','');
//sessionStorage.setItem('invData', []);

function SalesInvoicePosting() {
  const [acctType, setAcctType] = useState('SUPP');
  const [data, setData] = useState([]);
  const [id, setTax] = useState('');
  const [ID, setGlID] = useState('');
  //  const [locationID, setLocationID] = useState('');
  const [voucherData, setVoucherData] = useState([]);
  const [custData, setCustData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);

  // const [custData, setCustData] = useState([]);
  const [supplierID, setSupplierID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [productID, setProductID] = useState("");
 // const [barcode, setBarcode] = useState("");
  const [unit, setUnit] = useState("");
  const [productName, setProductName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [cost, setCost] = useState('');
  const [salesQuantity, setSalesQuantity] = useState('');
  const [itemTaxTotal, setItemTaxTotal] = useState(0);
  const [itemTotal, setItemTotal] = useState(0);
  // const [purchaseQty, setPurchaseQty] = useState(0.000);
  const [itemTax, setItemTax] = useState(0);
  const [itemDiscount, setItemDiscount] = useState(0);
  const [itemNetTotal, setItemNetTotal] = useState(0.00);
  const [invType, setInvType] = useState('SAL');

  const [drAmt, setDrAmt] = useState('');
  const [crAmt, setCrAmt] = useState('');
  const [totalTax, setTotalTax] = useState();
  const [totalNetAmt, setTotalNetAmt] = useState(0);
  const [salesRep, setSalesRep] = useState('');
  const [remark1, setRemark1] = useState('');
  const [remark2, setRemark2] = useState('');
  const [remark3, setRemark3] = useState('');
  const [remark4, setRemark4] = useState('');
  const [remark5, setRemark5] = useState('');
  const [remark6, setRemark6] = useState('');
  const escapeString = (val) => (val || '').replace(/'/g, "\\'");
  const [txnDate, setTxnDate] = useState(todayDate);
  const [dueDate, setDueDate] = useState(todayDate);
  const [salesParticular, setSalesParticular] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const inputReference = useRef(null);
  const inputRef = useRef(null);
  const inputRefQty = useRef(null);
  const inputRefVoucher = useRef(null);
  const inputRefProduct = useRef(null);
  const mystyle = {
    align: "left",

  };
  // alert(txnDate);Fon
  if (txnDate === null) {
    setTxnDate(todayDate);
  }

  const columns = [

    { dataField: 'id', text: '#', sort: false, headerStyle: { backgroundColor: 'yellow', width: '50px' } },
    { dataField: 'supplierID', text: 'Supplier ID', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey', textAlign: 'left' } },
    { dataField: 'supplierName', text: 'Supplier Name', sort: false, headerStyle: { backgroundColor: 'yellow', width: '700px' }, style: { textAlign: 'left' } },
    { dataField: 'acctType', text: 'A/C Type', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey' } },
    { dataField: 'glNo', text: 'G/L No', sort: false, headerStyle: { backgroundColor: 'yellow' } },
    { dataField: 'glSub', text: 'G/L Sub No.', align: 'center', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey' } },

    {
      dataField: "select",
      text: "Select", headerStyle: { backgroundColor: 'blue', color: 'white' },
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

        return <button className="fa fa-check-square" onClick={() => handleSelectSupplier(row.supplierID, row.supplierName, row.glNo, row.glSub, row.paymentTerm)}></button>

      },
    }

  ];
  const productColumn = [

    { dataField: 'id', text: '#', sort: false, headerStyle: { backgroundColor: 'yellow', width: '50px' } },
    { dataField: 'productID', text: 'Product ID', sort: false, headerStyle: { backgroundColor: '#999999', width: '250px' }, style: { backgroundColor: 'lightgrey', textAlign: 'left' } },
    { dataField: 'barcode', text: 'Barcode', sort: false, headerStyle: { backgroundColor: 'yellow', width: '250px' }, style: { backgroundColor: 'lightgrey', textAlign: 'left' } },
    { dataField: 'productName', text: 'Product Name', sort: false, headerStyle: { backgroundColor: '#999999', width: '700px' }, style: { textAlign: 'left' } },
    { dataField: 'unit', text: 'Unit', sort: false, headerStyle: { backgroundColor: 'yellow' }, style: { backgroundColor: 'lightgrey' } },
    { dataField: 'unitPrice', text: 'Price', sort: false, headerStyle: { backgroundColor: '#999999' }, style: {textAlign: 'right' }},
    {
      dataField: "select",
      text: "Select", headerStyle: { backgroundColor: 'blue', color: 'white' },
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

        return <button className="fa fa-check-square" onClick={() => handleSelectProduct(row.productID, row.barcode, row.productName, row.unit, row.unitPrice)}></button>

      },
    }

  ];

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
    border: '2px solid black',
    borderRadius: '14px' 
  };

  useEffect(() => {

    // setRemark1('Texting');
     setDrAmt('');
     setCrAmt('');

   Axios.get(url + `/api/companyInfo`,
       {
         params: {
           companyID: companyID,

         }
       }
     ).then(res => {

       setCompanyInfo(res.data);

     }).catch(err => {
    console.error('❌ Axios error:', err);
    alert('Error load purchase invoice Info : ' + err.message);
   return false;
  });
     //  var arr1=[];
     //  var arr2=[];
     Axios.get(url + `/api/salesGlList`,
       {
         params: {
           companyID: companyID,

         }
       }
     ).then(res => {
       console.log(res);
         //  arr1=res.data;
           glData = res.data;
           glID = res.data[0].id;
           setGlID(res.data[0].id);
           glNo = res.data[0].glNo;
          glSub = res.data[0].glSub;

           glName = res.data[0].glName;
           department = res.data[0].department;
           glDescription = res.data[0].glDescription;
           glType = res.data[0].glType;
     }).catch(function (error) {
      alert(error);
    }).catch(err => {
    console.error('❌ Axios error:', err);
    alert('Error load purchase invoice Info : ' + err.message);
   return false;
  }); 
  
    Axios.get(url + `/api/taxList`,
        {
          params: {
            companyID: companyID,
            taxType: 'INPUT',
          }
        }
      ).then(res => {
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
      }).catch(err => {
    console.error('❌ Axios error:', err);
    alert('Error load purchase invoice Info : ' + err.message);
   return false;
  });
  }, []);


  const handleSelectProduct = (ID, pBarcode, name, Punit, price) => {
    // alert(price);
   // item.productID, item.productName, item.taxID, item.unit, item.unitPrice, item.purchaseQty
    setProductID(ID);
    setProductName(name);
    setUnit(Punit);
    barcode=pBarcode;
    setUnitPrice(Number(price).toFixed(2));
    inputRefQty.current.focus();
  
  };

  const handleSelectSupplier = (ID, name, gNo, gSub, term) => {
    // alert(gNo+' - '+gSub);
    setSupplierID(ID);
    setSupplierName(name);
    setPaymentTerm(term);
    for (let i = 0; i < glData.length; i++) {
      if (glData[i].glNo === gNo && glData[i].glSub === gSub) {
        setGlID(glData[i].id);
         glNo=glData[i].glNo;
         glSub=glData[i].glSub;
         glName=glData[i].glName;
         glType=glData[i].glType;
         department=glData[i].department;
         glDescription=glData[i].glDescription;
         custGlNo =glData[i].glNo;
         custGlSub=glData[i].glSub;

           let date = new Date(txnDate); // Now
            date.setDate(date.getDate() + term);
            setDueDate(date.toISOString().substr(0, 10));

      }
    }

    Axios.get(url + `/api/companyInfo`,
      {
        params: {
          companyID: companyID,

        }
      }
    ).then(res => {

      setCompanyInfo(res.data);

    }).catch(err => {
    console.error('❌ Axios error:', err);
    alert('Error load purchase invoice Info : ' + err.message);
   return false;
  });

  };

  const handleCustChange = () => {
    //  setAcctType('CUST');
    //   alert("CUST");
    //  loadSupplier('SUPP');
  };

  const handleChangeProduct = async (e) => {
    //this.setState({ department: e.target.value });
    // setGlData({ glAcctNo: e.target.value });
    let ID = Number(e.target.value);
    // alert(ID)
    // const  cGlNo = glAcctNo.substr(8,4);
    // const  cGlSub = glAcctNo.substr(26,3);
    //  const cDep = glAcctNo.substr(43,3);
    //  const cName = glAcctNo.substr(49,glAcctNo.length-50);
    /*
    for (let i = 0; i < glData.length; i++) {

       if (glData[i].id === ID) {
           setjeNo(glData[i].glNo);
           setJeSub(glData[i].glSub);
           setJeDep(glData[i].department);
           setJeName(glData[i].glName);
           setJeType(glData[i].glType);
           setDrAmt(0.00);
           setCrAmt(0.00);
       }
   }
   */


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
      //  setItemTax(taxData[i].taxRate);
        //   alert(taxData[i].taxID);
        //   alert(taxID);
      }
    }
    // alert(typeof taxRate);
    // alert(taxRate);
    calculateTotal();
  };

  const handleChangeLoc = async (e) => {
    //  let ID = Number(e.target.value);
    // setLocationID(e.target.value);
    // alert(locationID);


  };

  const
    ndleChangeType = async (e) => {
      // alert(e.target.value);
      setInvType(e.target.value);
      //  for (let i = 0; i < purType.length; i++) {
      //        if (purType[i].inv === ID) {
      //         setTax(value: purType[i].value);
      //
      //      }
      // }
      //alert(invType);
      //   calculateTotal();

    };

  const handleChangeGl = async (e) => {
    //this.setState({ department: e.target.value });
    // setGlData({ glAcctNo: e.target.value });
    let ID = Number(e.target.value);
    // alert(ID)
    // const  cGlNo = glAcctNo.substr(8,4);
    // const  cGlSub = glAcctNo.substr(26,3);
    //  const cDep = glAcctNo.substr(43,3);
    //  const cName = glAcctNo.substr(49,glAcctNo.length-50);
    for (let i = 0; i < glData.length; i++) {

      if (glData[i].id === ID) {
        setGlID(glData[i].id);
        glNo = glData[i].glNo;
        glSub = glData[i].glSub;
        glType = glData[i].glType;
        department = glData[i].department;
        glName = glData[i].glName;
        glDescription = glData[i].glDescription;
        glID = glData[i].id;
      }
      //  alert(glNo+glSub);
    }

    //   alert(glNo+glSub) ;

  };

  const formatInputTxnDate = async (date) => {
    if (date == null) {
       setTxnDate(todayDate)
       return false;
     }
     setTxnDate(date);
     let formattedDate = moment(date).format('YYYY-MM-DD');
     setTxnDate(formattedDate);
  
  };
  const formatInputDueDate = async (date) => {
    if (date == null) {
      setDueDate(todayDate)
      return false;
    }
    setDueDate(date);
    let formattedDate = moment(date).format('YYYY-MM-DD');
    setDueDate(formattedDate);
  };
  const formatInputDiscount = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    setItemDiscount(parseFloat(num).toFixed(2));

    calculateTotal();
  };
  const formatInputRemark1 = async (e) => {
    e.preventDefault();
    setRemark1(e.target.value);
  };
  const formatInputRemark2 = async (e) => {
    e.preventDefault();
    setRemark2(e.target.value);
  };
  const formatInputRemark3 = async (e) => {
    e.preventDefault();
    setRemark3(e.target.value);
  };
  const formatInputRemark4 = async (e) => {
    e.preventDefault();
    setRemark4(e.target.value);
  };
  const formatInputRemark5 = async (e) => {
    e.preventDefault();
    setRemark5(e.target.value);
  };
  const formatInputRemark6 = async (e) => {
    e.preventDefault();
    setRemark6(e.target.value);
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

    setSalesParticular(e.target.value);


  };
  const formatInputInvoicetNo = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
    setInvoiceNo(e.target.value.toUpperCase());


  };
  const formatInputProductName = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
   // console.log(e.target.value.toUpperCase());
    setProductName(e.target.value);


  };
  const formatInputProductID = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
    setProductID(e.target.value.toUpperCase());


  };
  const formatInputRep = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
   // console.log(e.target.value.toUpperCase());
    setSalesRep(e.target.value);


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


    invoiceTotal = 0;
    invoiceDiscountTotal = 0;
    invoiceTaxTotal = 0;
    invoiceNetTotal = 0;
    let vID = 0;
    for (let i = 0; i < newData.length; i++) {
      //   alert(newDatas[i].itemTotal);
      invoiceTotal += Number(newData[i].itemTotal);
      invoiceDiscountTotal += Number(newData[i].itemDiscount);
      invoiceTaxTotal += Number(newData[i].itemTax);
      invoiceNetTotal += Number(newData[i].itemNetTotal);
      vID++;
      newData[i].id = vID;
    }
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
        newDatas[i].jeParticular= glDescription;
        newDatas[i].drAmt= drAmt;
        newDatas[i].crAmt= crAmt;
        newDatas[i].glID= glID;
        newDatas[i].voucherNo = voucherNo;
        newDatas[i].txnDate = txnDate;
        newDatas[i].companyID = companyID;
        newDatas[i].userName = userName;
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
  setDrAmt('');
  setCrAmt('');

    } else {
        //  alert(Number(drAmt));
  //        alert(crAmt);
   //   if (drAmt === '') {
     //     setDrAmt('0');
     // }
   //   if (crAmt === '') {
   //    setCrAmt(0);
   // }
   //alert(drAmt);

      vid = vid + 1;
      const newData = {
        id: vid,
        glNo: glNo,
        glSub: glSub,
        glType: glType,
        //purchaseQty: parseFloat(purchaseQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        department: department,
        glName: glName,
        jeParticular: glDescription,
         drAmt: drAmt,
        crAmt: crAmt,
        glID: glID,
        voucherNo: voucherNo,
        txnDate: txnDate,
        companyID: companyID,
        userName: userName,

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

          if (newDatas[i].drAmt === '') {
            newDatas[i].drAmt = '0.00';
          }
          if (newDatas[i].crAmt === '') {
            newDatas[i].crAmt = '0.00';
          }
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
      setDrAmt('');
      setCrAmt('');

    };





  };
  // Add Purchase Item ******************************
  const onAddSalesInvoice = () => {

    if (txnDate === '' || txnDate === 'undefined') {
      alert("transaction Date cannot be blank");
      return false;
    }

    if (supplierID === '' || supplierID === null) {
      alert("No Supplier selected");
      return false;
    };
    if (supplierName === '' || supplierName === null) {
      alert("No Supplier selected");
      return false;
    };
    //alert(productID);
    if (productID === '' || productID === null) {
      alert("No Product selected");
      return false;
    };
    if (productName === '' || productName === null) {
      alert("No Product selected");
      return false;
    };
    if (invoiceNo === '' || invoiceNo === null) {
      alert("Invoice No. cannot be blank");
      return false;
    };

    if (salesQuantity === 0) {
      alert('Sales Quantity cannot be ZERO');
      return false;
    }


    //  alert(typeof unitPrice);
    if (Number(unitPrice) === 0) {
      alert('Unit Price cannot be ZERO in purchase item');
      return false;
    }
    //  alert(taxRate);
    //  alert(itemTax);
    if (taxRate > 0) {
      if (Number(itemTax) === 0) {
        alert('Tax cannot be ZERO');
        return false;
      }

    };
//alert(cost);
if (cost === '' || cost === null) {
  setCost(0);
}

    // if purchase item edited
    if (invEdit) {
      const newDatas = [...data];
      for (let i = 0; i < newDatas.length; i++) {
        if (newDatas[i].id === pur_id) {
          newDatas[i].voucherNo = voucherNo;
          newDatas[i].companyID = companyID;
          newDatas[i].supplierID = supplierID;
          newDatas[i].supplierName = supplierName;
          newDatas[i].invoiceNo = invoiceNo;
          newDatas[i].productID = productID;
          newDatas[i].documentNo= documentNo;
          newDatas[i].productName = productName;
          newDatas[i].txnDate = txnDate;
          //purchaseQty: parseFloat(purchaseQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
          newDatas[i].salesQuantity = salesQuantity;
          newDatas[i].unit = unit;
          newDatas[i].unitPrice = unitPrice;
          newDatas[i].cost=cost;
          newDatas[i].itemTotal = itemTotal;
          newDatas[i].itemTax = itemTax;

          //   newDatas[i].invType= invType;
          newDatas[i].taxID = taxID;
          newDatas[i].taxType = taxType;
          newDatas[i].taxCode = taxCode;
          newDatas[i].taxRate = taxRate;
         // newDatas[i].salesParticular= salesParticular;
          newDatas[i].barcode = barcode;
          newDatas[i].dueDate = dueDate;
          newDatas[i].itemDiscount = itemDiscount;
          newDatas[i].paymentTerm = paymentTerm;
          newDatas[i].salesRep = salesRep;
          newDatas[i].itemTax= itemTax;
          newDatas[i].itemNetTotal = Number(newDatas[i].itemTotal)-Number(newDatas[i].itemDiscount)+Number(newDatas[i].itemTax);
          newDatas[i].remark1 = remark1;
          newDatas[i].remark2 = remark2;
          newDatas[i].remark3 = remark3;
          newDatas[i].remark4 = remark4;
          newDatas[i].remark5 = remark5;
          newDatas[i].remark6 = remark6;
        }

      }
      invoiceTotal = 0;
      invoiceDiscountTotal = 0;
      invoiceTaxTotal = 0;
      invoiceNetTotal = 0;
      for (let i = 0; i < newDatas.length; i++) {
        //   alert(newDatas[i].itemTotal);
        newDatas[i].voucherNo = voucherNo;
        newDatas[i].txnDate = txnDate;
        newDatas[i].dueDate = dueDate;
        newDatas[i].salesRep = salesRep;
       // newDatas[i].salesParticular = salesParticular;
        newDatas[i].invoiceNo = invoiceNo;
        newDatas[i].remark1 = remark1;
        newDatas[i].remark2 = remark2;
        newDatas[i].remark3 = remark3;
        newDatas[i].remark4 = remark4;
        newDatas[i].remark5 = remark5;
        newDatas[i].remark6 = remark6;
        invoiceTotal += Number(newDatas[i].itemTotal);
        invoiceDiscountTotal+=Number(newDatas[i].itemDiscount);
        invoiceTaxTotal += Number(newDatas[i].itemTax);
        invoiceNetTotal += Number(newDatas[i].itemNetTotal);
        newDatas[i].id = i + 1;
        // newDatas[i].purchaseQty=newDatas[i].purchaseQty.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        // newDatas[i].itemTotal=newDatas[i].itemTotal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        // alert(typeof  invoiceTotal);
      }
      setData(newDatas);
      invEdit = false;
    } else {
      vid = vid + 1;
      const newData = {
        id: vid,
        voucherNo: voucherNo,
        companyID: companyID,
        supplierID: supplierID,
        supplierName: supplierName,
        invoiceNo: invoiceNo,
        productID: productID,
        productName: productName,
        txnDate: txnDate,
        //purchaseQty: parseFloat(purchaseQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
        salesQuantity: salesQuantity,
        unit: unit,
        unitPrice: unitPrice,
        cost: cost,
        itemTotal: itemTotal,
        documentNo: documentNo,
        itemTax: itemTax,
        itemNetTotal: Number(itemTotal)-Number(itemDiscount)+Number(itemTax),
        taxID: taxID,
        taxType: taxType,
        taxCode: taxCode,
        taxRate: taxRate,
        itemTax: itemTax,
      //  salesParticular: salesParticular,
         barcode: barcode,
         dueDate: dueDate,
         itemDiscount: itemDiscount,
         paymentTerm: paymentTerm,
         salesRep: salesRep,
         remark1: remark1,
         remark2: remark2,
         remark3: remark3,
         remark4: remark4,
         remark5: remark5,
         remark6: remark6,

      };

      // alert(invType);

      const newDatas = [...data, newData];
      //data=e.target.value;
      //data = newDatas
      invoiceTotal = 0;
      invoiceDiscountTotal = 0;
      invoiceTaxTotal = 0;
      invoiceNetTotal = 0;

      for (let i = 0; i < newDatas.length; i++) {
        //   alert(newDatas[i].itemTotal);
        newDatas[i].voucherNo = voucherNo;
        newDatas[i].txnDate = format(new Date(txnDate), "dd/MM/yyyy") ; // txnDate;
        newDatas[i].dueDate = format(new Date(dueDate), "dd/MM/yyyy") ; // dueDate;
        newDatas[i].salesRep = salesRep;
       // newDatas[i].salesParticular = salesParticular;
        newDatas[i].remark1 = remark1;
        newDatas[i].remark2 = remark2;
        newDatas[i].remark3 = remark3;
        newDatas[i].remark4 = remark4;
        newDatas[i].remark5 = remark5;
        newDatas[i].remark6 = remark6;


        invoiceTotal += Number(newDatas[i].itemTotal);
        invoiceDiscountTotal+=Number(newDatas[i].itemDiscount);
        invoiceTaxTotal += Number(newDatas[i].itemTax);
        invoiceNetTotal += Number(newDatas[i].itemNetTotal);
        newDatas[i].id = i + 1;
        // newDatas[i].purchaseQty=newDatas[i].purchaseQty.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        // newDatas[i].itemTotal=newDatas[i].itemTotal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        // alert(typeof  invoiceTotal);
      }

      setData(newDatas);
      //   alert(typeof invoiceTotal);

      //invoiceTotal= parseFloat(invoiceTotal).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      // invoiceTotal= parseFloat(invoiceTotal).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      //lRead = true;
      // onSumDrCrAmt(newDatas)

    };
defaultQty = 0;
lDisable=true;
 ROnly = true;
setUnitPrice(0);
setCost(0);
    setProductName('')
   setProductID('');
    setItemTotal(0);
    setSalesQuantity(0);
    setItemTax(0);
     setItemDiscount(0);
    setItemNetTotal(0);
  };  // onAdd

  const handleEdit = async (e) => {
    // alert(e)

    const newData = [...data];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === e) {
        setProductID(newData[i].productID);
        setProductName(newData[i].productName);
        setInvType(newData[i].invType);
        setUnit(newData[i].unit);
        setSalesQuantity(newData[i].salesQuantity);
        setUnitPrice(newData[i].unitPrice);
        setCost(newData[i].cost);
        setItemTotal(newData[i].itemTotal);
        setItemDiscount(newData[i].itemDiscount);
        setItemTax(newData[i].itemTax);
        setItemNetTotal(newData[i].itemNetTotal);
       // setSalesParticular(newData[i].salesParticular);
        setRemark1(newData[i].remark1);
        setRemark2(newData[i].remark2);
        setRemark3(newData[i].remark3);
        setRemark4(newData[i].remark4);
        setRemark5(newData[i].remark5);
        setRemark6(newData[i].remark6);

        // alert(newData[i].returnParticular);
         defaultQty = newData[i].defaultQty;
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

  const onPrintSalesInvoice = async () => {
  //
  // alert('Print Sales Invoice');

     if (data.length === 0) {
      alert('No Sales Invoice Data for printing');
      return false;
     }
     let invoiceType = 'Sales Invoice';
     for (let i = 0; i < data.length; i++) {
          if (data[i].taxType === 'GST' ) {
            invoiceType = 'Tax Invoice';
          }
          data[0].salesRep = salesRep;
          data[0].salesParticular = salesParticular;
     }
  //   ExportInvoicePdf(data, companyInfo, customerInfo, invoiceType, invoiceTotal, invoiceDiscountTotal, invoiceTaxTotal, invoiceNetTotal)
try {
    await ExportInvoicePdf(data, companyInfo, customerInfo, invoiceType, invoiceTotal, invoiceDiscountTotal, invoiceTaxTotal, invoiceNetTotal);
    console.log("Invoice PDF generated successfully");
  } catch (err) {
    console.error("Failed to generate PDF", err);
    alert("Something went wrong while generating the PDF.");
  }
  }
  const onPrint = async (voucherData, drTotal, crTotal) => {


    console.log(voucherData);
    if (voucherData.length === 0) {
      alert("No Voucher No. provided")
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
    voucherData[0].id = 'B';

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
    generatePDF(newDatas, headers, 'SV.pdf')
    //PDF({voucherData,headers,filename})



  };

  // Add Purchase Item ******************************



  const loadProduct = async (catNo) => {
    // alert(catNo);

    Axios.get(url + `/api/productListByCategory`,
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
      }).catch(err => {
    console.error('❌ Axios error:', err);
    alert('Error load purchase invoice Info : ' + err.message);
   return false;
  });
  };

  const handleCancel = async (e) => {
    //  alert('remove');
    setCustData([]);
  };
  const handleCancelProduct = async (e) => {
    //  alert('remove'
    //setTotalTax(0);
    //setTotalNetAmt(0);
  setProductData([]);

  };

  const handleChangeSupp = async (e) => {
    let ID = Number(e.target.value);

    //  alert(ID);
    /*
    for (let i = 0; i < bankData.length; i++) {

      if (bankData[i].id === ID) {
          setBankID(bankData[i].bankID);
          setBankName(bankData[i].bankName);
          setBankAcctNo(bankData[i].bankAcctNo);
          setBankGlNo(bankData[i].glNo);
          setBankGlSub(bankData[i].glSub);
          setBankGlType(bankData[i].glType);
      }

    }
*/
  };

  const onNew = async () => {
    /*
   localStorage.removeItem('supplierID');
   localStorage.removeItem('supplierName');
   localStorage.removeItem('paymentTerm');
   localStorage.removeItem('productID');
   localStorage.removeItem('productName');
   localStorage.removeItem('barcode');
   localStorage.removeItem('unit');
   sessionStorage.removeItem('voucherNo');
   sessionStorage.removeItem('invoiceNo');
   sessionStorage.removeItem('txnDate');
   sessionStorage.removeItem('invData');
   localStorage.removeItem('invData');
*/
lDisable=false;
    setData(...data);
    window.location.href = '/salesInvoice';
  };
  const handleHome = async () => {
    /*
        localStorage.removeItem('supplierID');
        localStorage.removeItem('supplierName');
        localStorage.removeItem('paymentTerm');
        sessionStorage.removeItem('voucherNo');
        sessionStorage.removeItem('invoiceNo');
        sessionStorage.removeItem('txnDate');
        localStorage.removeItem('productID');
        localStorage.removeItem('productName');
        localStorage.removeItem('barcode');
        localStorage.removeItem('unit');
        localStorage.removeItem('invData');
    */


    window.location.href = '/home';
  };

  // on Save Purchase Invoice and Voucher *******************
  const onSave = async (voucherData, drTotal, crTotal) => {
    // e.preventDefault();
    console.log(data);
    invoiceNetTotal = Number(invoiceNetTotal.toFixed(2));
    drTotal = drTotal.toFixed(2);
    crTotal = crTotal.toFixed(2);
    // alert(data[0].taxDescription+ " = "+data[0].remark);
    //   alert(TotalCrAmt);

   try { 
    if (data.length === 0) {
      alert("No Purchase Invoice available to Save");
      return;
    }
    // alert(invoiceNetTotal+ ' = ' +(typeof invoiceNetTotal)+' = '+(typeof totalDrAmt));
   //  invoiceNetTotal=invoiceNetTotal.toFixed(2);
    if (voucherData.length === 0) {
      alert('No Voucher to save');
      return;
    }
    if (invoiceTotal === 0) {
      alert("Sales Invoice Amount is ZERO");
      return;
    }
  //     alert(invoiceNetTotal+ ' = '+totalDrAmt+ ' = '+totalCrAmt);
//       alert(typeof invoiceNetTotal);
//       alert(typeof totalDrAmt);
//       alert(typeof totalCrAmt);
    if (invoiceNetTotal !== totalDrAmt) {
      alert('Voucher Total must same as Invoice Net Total');
      return;
    }

 // alert(totalDrAmt+' = '+totalCrAmt );
    if (totalDrAmt !== totalCrAmt) {
      alert('Debit total and Credit total must equal')
      return;
    }

    if (txnDate === '' || txnDate === 'undefined') {
      alert("Sales Invoice Date cannot be blank");
      return;
    }
    
    let formattedTxnDate = moment(txnDate).format('YYYY-MM-DD');
    setTxnDate(formattedTxnDate);
    let formattedDueDate = moment(dueDate).format('YYYY-MM-DD');
    setDueDate(formattedDueDate);
    if (!voucherNo) {
      alert('Voucher No cannot be empty');
      return;
    }
    // data must update to the final changed
    for (let i = 0; i < data.length; i++) {

      //  data[i].taxID = taxID;
       let nCost = data[i].cost;
       if (nCost === '' || nCost === null) {
         nCost = 0;
       }
      data[i].voucherNo = voucherNo;
    //  data[i].invoiceNo = invoiceNo;
      data[i].supplierID = supplierID;
      data[i].supplierName = supplierName;
      data[i].txnDate = txnDate;
      data[i].dueDate = dueDate;
      data[i].salesRep = salesRep;
      data[i].voucherNo = voucherNo;
      data[i].cost = nCost;
      
     // escapeString
      data[i].remark1 = escapeString(remark1);
      data[i].remark2 = escapeString(remark2);
      data[i].remark3 = escapeString(remark3);
      data[i].remark4 = escapeString(remark4);
      data[i].remark5 = escapeString(remark5);
      data[i].remark6 = escapeString(remark6);
    }
   // alert(custGlNo+' = '+custGlSub);
    let lOk = false
    for (let i = 0; i < voucherData.length; i++) {
      //  alert(voucherData[i].glNo+" - "+voucherData[i].glSub);
      if (voucherData[i].glNo === custGlNo && voucherData[i].glSub === custGlSub) {
        lOk = true;

       }


    }
 if (lOk === false) {
   alert('Voucher G/L No and G/L Sub must at least one to match Customer G/L No and G/L Sub');
   return false;
  }

// ✅ Supplier check
    const supplierRes = await Axios.get(url + `/api/supplierSearch`, {
      params: { companyID, supplierID }
    });

    if (supplierRes.data.length === 0) {
      alert(`Customer ID: ${supplierID} is invalid`);
      return;
    }

   

      // ✅ Voucher No check
    const voucherRes = await Axios.get(url + `/api/voucherVerify`, {
      params: { companyID, voucherNo }
    });

    if (voucherRes.data === 'Existed') {
      alert(`Voucher No. ${voucherNo} already exists`);
      return;
    }

   // ✅ Sales Invoice check
    const invoiceRes = await Axios.get(url + `/api/salesInvoiceVerify`, {
      params: { companyID, supplierID, invoiceNo }
    });

    if (invoiceRes.data === 'Existed') {
      alert(`Sales Invoice No. ${invoiceNo} is existed`);
      return;
    }

    // return false;

      // ✅ Save Sales Note
    const salesInvoiceSave = await Axios.post(url + '/api/salesInvoice', data);
  // alert(salesInvoiceSave.data);
    if (salesInvoiceSave.data === 'success') {
  
    } else {
      alert('Sales Invoice Saved Failed');
      return;
    }





    const voucherSave = await Axios.post(url + '/api/purchaseVoucher', voucherData);
    if (voucherSave.data === 'Success') {
      alert('Sales Invoice and Voucher Saved Successfully');
      window.location.href = '/salesInvoice';
    } else {
       alert('Voucher Save Failed');
       return;
    }

} catch (err) { 
    console.error('❌ Axios error:', err);
    alert('Error during save: ' + err.message);
  } // try

  };

  const onClearSupplier = async () => {
    setCustData([]);

  };
  const onSearch = async () => {
    //   sessionStorage.setItem('txnDate',txnDate);
    if (supplierID !== '' || supplierID !== null) {
      Axios.get(url + `/api/SupplierSearch`,
          {
            params: {
              companyID: companyID,
              supplierID: supplierID,
            }
          }
        ).then(res => {
          if (res.data.length > 0) {

            setSupplierName(res.data[0].supplierName);
            setPaymentTerm(res.data[0].paymentTerm);
            setCustomerInfo(res.data);
            let date = new Date(txnDate); // Now
          //   alert(date);
            // alert(res.data[0].paymentTerm);
             date.setDate(date.getDate() + res.data[0].paymentTerm);
          //   alert(date);
           //  alert(date.toISOString().substr(0, 10));
           //    alert(date);
             setDueDate(date.toISOString().substr(0, 10));
           //  setDueDate(format(date, "dd/MM/yyyy"));
            for (let i = 0; i < glData.length; i++) {
              if (glData[i].glNo === res.data[0].glNo && glData[i].glSub === res.data[0].glSub) {
                setGlID(glData[i].id);
                glNo=glData[i].glNo;
                glSub=glData[i].glSub;
                glName=glData[i].glName;
                glType=glData[i].glType;
                department=glData[i].department;
                glDescription=glData[i].glDescription;
                custGlNo =glData[i].glNo;
                custGlSub=glData[i].glSub;


              }
            }

          } else {


            Axios.get(url + `/api/customerList`,
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
                  alert('Please selected from the Supplier from Supplier Selection below')


                  return false;
                }


              }).catch(err => {
    console.error('❌ Axios error:', err);
    alert('Error load purchase invoice Info : ' + err.message);
   return false;
  });







          }






        }).catch(err => {
    console.error('❌ Axios error:', err);
    alert('Error load purchase invoice Info : ' + err.message);
   return false;
  });

    };

  };
















  //  inputReference.current.focus();



  const onSearchInvoice = async () => {
    let cYear = String(new Date(txnDate).getFullYear());
    if (supplierID === '' || supplierID === null) {
      alert("No Customer Selected");
      return false;
    }

    if (supplierName === '' || supplierName === null) {
      alert("No Customer Selected");
      return false;
    }

  // alert(typeof cYear);

  //  if (invoiceNo === '' || invoiceNo === null) {
      Axios.get(url + '/api/lastSalesInvoice',
       {
         params: {
           companyID: companyID,
           jvInit: cYear,
         }
       }

      ).then(res => {
       if (res.data.length >0 ) {
         let iNo = res.data[0].jvInit + '-' + String(Number(res.data[0].invoiceNo.slice(5)) + 1);
        setInvoiceNo(iNo);
         if (res.data[0].remark1 === '' || res.data[0].remark1 === null) {
        //  alert(res.data[0].remark1);
           setRemark1('Any descripancy to notify please contact '+supplierName+'.');
         } else {
            setRemark1(res.data[0].remark1);
         }
         if (res.data[0].remark2 === '' || res.data[0].remark2 === null) {
          //  alert(res.data[0].remark1);
             setRemark2('Goods sold are not returnable.');
           } else {
            setRemark2(res.data[0].remark2);
         }

           if (res.data[0].remark3 === '' || res.data[0].remark3 === null) {
            //  alert(res.data[0].remark1);
               setRemark3("Payment should be make to "+supplierName+".");
             }  else {
              setRemark3(res.data[0].remark3);
           }

             if (res.data[0].remark4=== '' || res.data[0].remark4 === null) {
              //  alert(res.data[0].remark1);
                 setRemark4("Bank Account "+companyInfo[0].bankAccount);
               } else {
                setRemark4(res.data[0].remark4);
             }
               if (res.data[0].remark5 === '' || res.data[0].remark5 === null) {
                //  alert(res.data[0].remark1);
                   setRemark5('Please make payment on or before invoice due date');
                 }  else {
                  setRemark5(res.data[0].remark5);
               }

                if (res.data[0].remark6 !== '' || res.data[0].remark6 !== null) {
                //  alert(res.data[0].remark1);
                   setRemark6(res.data[0].remark6);
                 }

       //  alert(remark1);
      //  String(Number(res.data[0].voucherNo.slice(5)) + 1);
       } else {
         setInvoiceNo(cYear+'-'+'1');
         setRemark1('Any descripancy to notify please contact '+supplierName+'.');
         setRemark2('Goods sold are not returnable.');
         setRemark3("Payment should be make to "+supplierName+".");
         setRemark4("Bank Account "+companyInfo[0].bankAccount);
         setRemark5('Please make payment on or before invoice due date');
         setRemark6('');
        }
     }).catch(err => {
      if (err.response && err.response.status === 404) {
        console.log('User not found');
        setInvoiceNo(cYear+'-'+'1');
      } else {
        console.error('Error fetching user:', err);
      }
    });
  
  };

  // on Save Purchase Invoice and Voucher *******************


  const onSearchVoucher = async (e) => {
    if (txnDate === 'null') {
      alert('No Date Selected');
      return false;
      // setTxnDate(todayDate);
    }
    //  alert(txnDate);
    let cYear = new Date(txnDate).getFullYear();
    let cMonth = (new Date(txnDate).getMonth()) + 1;

    //     alert(String(cYear).slice(-2));
    //  alert(("0"+String(cMonth)).slice(-2));
    let jvDate = String(cYear).slice(-2) + ("0" + String(cMonth)).slice(-2);
    //  alert(jvDate);
    //  sessionStorage.setItem('invoiceNo',invoiceNo);
    //   sessionStorage.setItem('voucherNo',voucherNo);
    //   sessionStorage.setItem('txnDate',txnDate);

    Axios.get(url + `/api/lastVoucherNo`,
        {
          params: {
            companyID: companyID,
            jvInit: jvDate,
          }
        }
      )
      .then(res => {
        if (res.data.length > 0) {
         // alert(res.data[0].voucherNo);
         // alert(Number(res.data[0].voucherNo.slice(5)) );
          let vNo = res.data[0].jvInit + '-' + String(Number(res.data[0].voucherNo.slice(5)) + 1);
         if (vNo.text[0] === 'SV') {
          setVoucherNo(vNo); 
         } else {
          setVoucherNo("SV"+vNo);
          }
        } else {
          setVoucherNo("SV"+jvDate+'-'+'1');

        }

      }).catch(err => {
    console.error('❌ Axios error:', err);
    alert('Error load Last Voucher No : ' + err.message);
   return false;
  });

  };

  const onSearchProduct = async () => {
    //  alert(productID);
    if (productID === '*') {
      setProductName('');
      setUnit('unit');
      setCost(0);
      setSalesQuantity(1);
      ROnly = false;
      inputRefProduct.current.focus();
      return true;
    }


    Axios.get(url + `/api/ProductSearch`,
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
          setUnitPrice(res.data[0].unitPrice.toFixed(2));
          setCost(res.data[0].cost.toFixed(2));
          inputRefQty.current.focus();
        } else {

          Axios.get(url + `/api/ProductList`,
            {
              params: {
                companyID: companyID,

              }
            }
          )
          .then(res => {

            for (let i = 0; i < res.data.length; i++) {
                res.data[i].unitPrice=res.data[i].unitPrice.toFixed(2);

            }
            setProductData(res.data);




            alert("Product ID: "+productID+" is invalid, please select from the information below")
          } ).catch(err => {
    console.error('❌ Axios error:', err);
    alert('Error load Product List Info : ' + err.message);
   return false;
  });




        }




        }).catch(err => {
    console.error('❌ Axios error:', err);
    alert('Error search Product Info : ' + err.message);
   return false;
  });


  };

  const rightToLeftFormatter = (value: string) => {
    if (!Number(value)) return '';
    alert(value);
    let amount = '';
    if (amount.length > 2) {
      amount = parseInt(value).toFixed(2);
    } else {
      amount = (parseInt(value) / 100).toFixed(2);
    }

    return `${amount}`;
  };


  const handleInputChangeTax = async (e) => {
    // alert(event.target.value);
    let num = e.target.value; // .replace(/\+|-/ig, '');;
    //alert(num);


    setItemTax(num);
    //  calculateTotal();
  };

  const handleInputChangeDiscount = async (e) => {
    // alert(event.target.value);
    let num = e.target.value; // .replace(/\+|-/ig, '');;
    //alert(num);


    setItemDiscount(num);

  };

  const handleInputChangeTerm = async (e) => {
    // alert(event.target.value);
    let num = e.target.value; // .replace(/\+|-/ig, '');;
    //alert(num);


    setPaymentTerm(num);

  };

  const handleInputChangeQty = async (e) => {
    // alert(event.target.value);
    let num = parseFloat(e.target.value); // .replace(/\+|-/ig, '');;

    setSalesQuantity(num);

    calculateTotal();

  };

  const handleInputChangePrice = async (e) => {
    console.log(e.target.value)
    let num = e.target.value

    setUnitPrice(num);
    calculateTotal();
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


  const formatInputQty = async (e) => {
    let num = parseFloat(e.target.value);  // returnQuantity
    if (num === '') {
      num = 0;
    }
    setSalesQuantity(num.toFixed(3));
    // alert((num*unitPrice).toFixed(2));
    setItemTotal((num * unitPrice).toFixed(2));
    setItemTax((itemTotal * (taxRate / 100)).toFixed(2));
    setItemTotal((num * unitPrice).toFixed(2));

    //  alert(itemTotal);
    //   alert(itemTax);

    calculateTotal();

  };

  const formatInputUnitPrice = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    setUnitPrice(parseFloat(num).toFixed(2));
    calculateTotal();
  };
  const formatInputPrice = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    setUnitPrice(parseFloat(num).toFixed(2));
    calculateTotal();
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

  const handleInputChangeUnitPrice = async (e) => {
    console.log(e.target.value)
    let num = e.target.value

    setUnitPrice(num);
    calculateTotal();
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


  const formatInputTax = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    setItemTax(parseFloat(num).toFixed(2));
    calculateTotal();
  };

  const calculateTotal = async (e) => {
    let iTotal = Number(salesQuantity) * Number(unitPrice) ;
    let netTotal = iTotal - Number(itemDiscount) + Number(itemTax);
    //  alert(itemDiscount);
    // alert(taxRate);


    // if (invType === 'PUR') {

    setItemTotal(parseFloat(iTotal).toFixed(2));
    setItemNetTotal(parseFloat(netTotal).toFixed(2));
    setItemTax(((iTotal-Number(itemDiscount)) * (taxRate / 100)).toFixed(2))

    //} else {

    //   netTotal =0;
    // setItemTotal(parseFloat(iTotal).toFixed(2));
    //  setItemNetTotal(parseFloat(netTotal).toFixed(2));
    // }

    return true;
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
        <div className="col-sm-12 btn btn-primary" style={{ marginTop: '1px' }}>
          Sales Invoice Entry
        </div>
      </div>


      <div style={{
      display: 'inline-block',
      width: '1650px',
      height: '105px',
      margin: '6px',
      backgroundColor: 'white',
      border: '4px solid grey',
    }}
    >
       <p></p>
        <label style={{ paddingLeft: "0px"}} >
          <a style={{ marginRight: '.8rem' }}> Customer ID : </a>
     <Tooltip
                title="Enter a valid Customer ID"
                placement="top"
              >  
          <input
            type="text"
            style={{ width: '150px', border: '1px solid #696969' }}
            value={supplierID}
            name="supplier"
            className="text-uppercase"
            onChange={(e) => formatInputSupplierID(e)}
            required
            readOnly = {lDisable}
          />
</Tooltip>
   <Tooltip
              title="Click to load Customer information or Listing"
              placement="top"
            > 
         <button
    type="button"
    className="btn bg-primary text-white float-right"
    style={{ padding: '5px' }}
    onClick={() => onSearch()}
  >
    <i className="fa fa-search"></i>
  </button>
</Tooltip>
          <a style={{ marginLeft: '2.6rem', marginRight: '.7rem' }} >Customer Name : </a>

          <input
            type="text"
            style={{ width: '900px' }}
            value={supplierName}
            name="supplierName"
            readOnly={true}
            required
          />



        </label>

<p></p>

      <label style={{ paddingLeft: "0px", paddingTop: '10px' }} >

      <a style={{ marginRight: '.8rem' }} >Invoice Date : </a>
        
           <Tooltip
                title="Select a Sales Invoice Date"
                placement="top"
              >  
              <DatePicker  
                    id="txnDate"
                    selected={txnDate}
                    onChange={(date) => setTxnDate(date)}   
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    wrapperClassName="date-picker-wrapper"
                    showYearDropdown
                    scrollableYearDropdown
                   />

</Tooltip>
        <a style={{ marginLeft: '1.2rem', marginRight: '.2rem' }}> Sales Invoice No. : </a>
        <input
          type="text"
          style={{ width: '100px', border: '1px solid #696969' }}
          value={invoiceNo}
          name="invoice"
          className="text-uppercase"
          required
          readonly={true}
        />
  <Tooltip
        title="Click to load latest Sales Invoice Number"
        placement="top"
      >  
 
              <button
              style = {{padding: '6px', backgroundColor: 'blue', color: 'white'}}
              type='button'
              onClick={() => onSearchInvoice()}
              >
       <i className="fa fa-search fa-border"></i>    
              </button>
</Tooltip>
<a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Term :</a>
<Tooltip
        title="Enter credit term for this Invoice"
        placement="top"
      >  
               <input
               type='number'
               style={{width: '90px',  border: '1px solid #696969'}}
               value={paymentTerm}
               name='term'
               onChange={(e) => handleInputChangeTerm(e)}
               placeholder="0"
              step='1'
               required = {false}
               />
</Tooltip>
<a style={{ marginLeft: '1rem', marginRight: '.8rem' }} >Due Date : </a>
<Tooltip
                title="Select a Sales Invoice Due Date"
                placement="top"
              >  
<DatePicker
                    id="txnDate"
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}                
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    wrapperClassName="date-picker-wrapper"
                    showYearDropdown
                    scrollableYearDropdown
                   />
 </Tooltip>                  
<br></br>
        <a style={{ marginLeft: '0rem', marginRight: '1.8rem' }}> Sales Rep. : </a>
        <Tooltip
                title="Enter name of Sales Representative"
                placement="top"
              >   
        <input
          type="text"
          style={{ width: '150px', border: '1px solid #696969' }}
          value={salesRep}
          name="salesrep"
          maxLength={15}
          onChange={(e) => formatInputRep(e)}
          readonly={false}
        />
</Tooltip>

      </label>
      </div>





      <div className="select-container" >



        <p></p>


        <table class="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>
              <th style={{ backgroundColor: 'yellow', width: '.5px', textAlign: 'center' }}>#</th>
              <th style={{ backgroundColor: '#999999', width: '50px', textAlign: 'center' }}>Product</th>
              <th style={{ backgroundColor: 'yellow', width: '300px', textAlign: 'center' }}>Product Name</th>
              <th style={{ backgroundColor: '#999999', width: '10px', textAlign: 'center' }}>Quantity</th>
              <th style={{ backgroundColor: 'yellow', width: '1px', textAlign: 'center' }}>Unit</th>
              <th style={{ backgroundColor: '#999999', width: '5px', textAlign: 'center' }}>Type</th>
              <th style={{ backgroundColor: 'yellow', width: '100px', textAlign: 'center' }}>Item Total</th>
              <th style={{ backgroundColor: '#999999', width: '40px', textAlign: 'center' }}>Discount</th>
              <th style={{ backgroundColor: 'yellow', width: '1px', textAlign: 'center' }}>Tax</th>
              <th style={{ backgroundColor: '#999999', width: '100px', textAlign: 'center' }}>Item Net Total</th>
              <th style={{ backgroundColor: 'yellow', width: '100px', textAlign: 'center' }}>Tax ID</th>
              <th style={{ backgroundColor: 'blue', textAlign: 'left', color: 'white', width: '1px' }}>Action</th>
            </tr>
          </thead>
          <tbody style={mystyle} >
            {data.map(item => {
              return <tr key={item.id}>
                <td>{item.id}</td>

                <td style={{ backgroundColor: '#75bc7e', textAlign: 'left' }}>{item.productID}</td>
                <td style={{ textAlign: 'left' }}>{item.productName}</td>
                <td style={{ textAlign: 'right', backgroundColor: '#75bc7e' }}>{parseFloat(item.salesQuantity).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'center' }}>{item.unit}</td>
                <td style={{ textAlign: 'center', backgroundColor: '#75bc7e' }}>{item.taxType}</td>
                <td style={{ textAlign: 'right' }}>{parseFloat(item.itemTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'right', backgroundColor: '#75bc7e' }}>{parseFloat(item.itemDiscount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right" }}>{parseFloat(item.itemTax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right", color: "blue",  backgroundColor: '#75bc7e'}}>{parseFloat(item.itemNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'left'}}>{item.taxID} </td>
                <button class={'fa fa-edit'} style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEdit(item.id)}> </button>
                <button class={'fa fa-trash'} style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleRemove(item.id)}> </button>
              </tr>

            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td style={{ textAlign: "right", backgroundColor: "cyan" }}>Invoice</td>


            <td style={{ textAlign: "left", backgroundColor: "cyan" }}>Totals :</td>
            <td style={{ textAlign: "right", color: "red" }}>{parseFloat(invoiceTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <td style={{ textAlign: "right", color: "red" }}>{parseFloat(invoiceDiscountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


            <td style={{ textAlign: "right", color: "red" }}>{parseFloat(invoiceTaxTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <td style={{ textAlign: "right", color: "red" }}>{parseFloat(invoiceNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


          </tbody>
          <tfoot>


            <td></td>
            <td></td>
            <td></td>



          </tfoot>
        </table>

        <div>

        </div>




        <div style={{
      display: 'inline-block',
      width: '1650px',
      height: '420px',
      margin: '6px',
      backgroundColor: 'white',
      border: '4px solid grey',
    }}
    >



        <label style={{ paddingLeft: "10px" }} >
          <a style={{ marginRight: '1.4rem' }}> Product ID : </a>

          <Tooltip
                title="Enter a valid Product ID and press search button to load Product information"
                placement="top"
              >  
          <input
            type="text"
            style={{ width: '200px', border: '1px solid #696969' }}
            value={productID}
            name="product"
            class="text-uppercase"
            ref={inputReference}
            onChange={(e) => formatInputProductID(e)}
            required
          />
</Tooltip>
<Tooltip
                title="Click to load Product information"
                placement="top"
              >  
              <button
              style = {{padding: '6px', backgroundColor: 'blue', color: 'white'}}
              type='button'
              onClick={() => onSearchProduct()}
              >
       <i className="fa fa-search fa-border"></i>    
              </button>
</Tooltip>

          <a style={{ marginLeft: '2rem', marginRight: '.6rem' }}> Product Name : </a>

          <input
            type="text"
            style={{ width: '600px' }}
            value={productName}
            name="productName"
            readOnly={ROnly}
            ref={inputRefProduct}
            onChange={(e) => formatInputProductName(e)}
            required
          />


          <a style={{ marginLeft: '3.5rem', marginRight: '.6rem' }}> Unit : </a>
          <input
            type="text"
            style={{ width: '60px' }}
            value={unit}
            name="unit"
            readOnly={true}
            required
          />

        </label>
        <label style={{ paddingLeft: '10px' }}>
          <a style={{ marginRight: '.1rem' }}> Tax Selection : </a>
          <select value={id} onChange={(e) => handleChangeTax(e)}>
            {taxData.map((item) => (
              <option value={item.id} required> (ID-{item.taxID}) (Type-{item.taxType}) (Code-{item.taxCode}) (Description-{item.taxDescription}) (Rate-{item.taxRate}%)</option>
            ))}

          </select>


        </label>

        <label style={{ paddingLeft: "10px" }}>
          <a > Sales Quality : </a>
          <Tooltip
                title="Enter Sales Quantities"
                placement="top"
              >   
          <input
            type="number"
            style={{ width: '150px', border: '1px solid #696969'}}
            value={salesQuantity}
            name="salesQty"
            placeholder='0.00'
            ref={inputRefQty}
            onBlur={(e) => formatInputQty(e)}
            onChange={(e) => handleInputChangeQty(e)}
            maxLength={13}
          />
</Tooltip>
          <a style={{ marginLeft: '1rem', marginRight: '.6rem' }}> Unit Price : </a>
          <Tooltip
                title="Enter selling price per unit"
                placement="top"
              >  
          <input
            type="number"
            style={{ width: '100px', border: '1px solid #696969' }}
            value={unitPrice}
            name="unitPrice"
            onBlur={(e) => formatInputUnitPrice(e)}
            onChange={(e) => handleInputChangeUnitPrice(e)}
            maxLength={13}
          />
</Tooltip>
          <a style={{ marginRight: '.6rem' }}> Total : </a>
          <input
            type="number"
            style={{ width: '150px' }}
            value={itemTotal}
            name="itemTotal"
            readonly={true}
            maxLength={13}
          />

<a style={{ marginLeft: '.5rem', marginRight: '.6rem' }}>Discount :</a>

<Tooltip
                title="Enter product item discount if any"
                placement="top"
              >  
<input
  type="number"
  style={{width: '100px', border: '1px solid #696969'}}
  value={itemDiscount}
  name="itemDIscount"
  placeholder='0.00'
  step='0.001'
  onBlur={(e) => formatInputDiscount(e) }
  onChange={(e) => handleInputChangeDiscount(e)}
   maxLength={13}
/>
</Tooltip>

<br></br>


          <a style={{ marginLeft: '.1rem', marginRight: '.4rem' }}> Item Tax : </a>
          <Tooltip
                title="Enter sales item tax if any"
                placement="top"
              >   
          <input
            type="number"
            style={{ width: '100px', border: '1px solid #696969' }}
            value={itemTax}
            name="itemTax"
            onBlur={(e) => formatInputTax(e)}
            onChange={(e) => handleInputChangeTax(e)}
            maxLength={13}
          />
</Tooltip>
          <a style={{ marginRight: '.5rem', marginLeft: '.5rem' }}> Item Net Total : </a>
          <input
            type="number"
            style={{ width: '200px' }}
            value={itemNetTotal}
            name="itemNetTotal"
            placeholder='0.00'
            readonly={true}
            maxLength={13}
          />

        </label>


<p></p>
<label style={{ paddingLeft: "10px" }} >
<a style={{ marginLeft: '.1rem', marginRight: '.8rem' }}> Remark #1 : </a>
<Tooltip
                title="Enter sales item remark #1 if any"
                placement="top"
              >  
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark1}
  name="remark1"
  onChange={(e) => formatInputRemark1(e)}
  maxLength={200}
/>
</Tooltip>
<a style={{ marginLeft: '.2rem', marginRight: '.5rem' }}> Remark #2 : </a>
<Tooltip
                title="Enter sales item remark #2 if any"
                placement="top"
              >  
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark2}
  name="remark2"
  onChange={(e) => formatInputRemark2(e)}
  maxLength={200}
/>
</Tooltip>
</label>

<label style={{ paddingLeft: "10px" }} >
<a style={{ marginLeft: '.2rem', marginRight: '.8rem' }}> Remark #3 : </a>
<Tooltip
                title="Enter sales item remark #3 if any"
                placement="top"
              >  
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark3}
  name="remark3"
  onChange={(e) => formatInputRemark3(e)}
  maxLength={200}
/>
</Tooltip>
<a style={{ marginLeft: '.2rem', marginRight: '.5rem' }}> Remark #4 : </a>
<Tooltip
                title="Enter sales item remark #4 if any"
                placement="top"
              >  
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark4}
  name="remark4"
  onChange={(e) => formatInputRemark4(e)}
  maxLength={200}
/>
</Tooltip>

</label>
<label style={{ paddingLeft: "10px" }} >
<a style={{ marginLeft: '.2rem', marginRight: '.8rem' }}> Remark #5 : </a>
<Tooltip
                title="Enter sales item remark #5 if any"
                placement="top"
              >  
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark5}
  name="remark5"
  onChange={(e) => formatInputRemark5(e)}
  maxLength={200}
/>
</Tooltip>
<a style={{ marginLeft: '.2rem', marginRight: '.5rem' }}> Remark #6 : </a>
<Tooltip
                title="Enter sales item remark #6 if any"
                placement="top"
              >  
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark6}
  name="remark6"
  onChange={(e) => formatInputRemark6(e)}
  maxLength={200}
/>
</Tooltip>
</label>
</div>






        <td>
        <Tooltip
                title="Click to print Sales Invoice"
                placement="top"
              >  
        <button type="button" style={{ backgroundColor: "green", color: "white", width: '250px', marginLeft: '5rem', border: '2px solid black',borderRadius: '14px'  }} onClick={() => onPrintSalesInvoice()}>
        <i className="fa fa-print" style={{marginRight: '5px'}}></i>
        Print Sales Invoice </button>
         </Tooltip>
        </td>    
        <td>
        <Tooltip
                title="Click to restart new Sales Invoice"
                placement="top"
              >  
        <button type="button" style={{ backgroundColor: "blue", color: "white", width: '250px', border: '2px solid black',borderRadius: '14px', paddingLeft: '20px'  }} onClick={() => onNew()}>
        <i className='fa fa-folder-open-o' style={{marginRight: '5px'}}></i>
        New Sales Invoice </button>
        </Tooltip> 
        </td>
        <td>
        <Tooltip
                title="Click to return to Home Menu"
                placement="top"
              >  
        <button type="button" style={{ backgroundColor: "grey", color: "white", width: '150px', border: '2px solid black',borderRadius: '14px', paddingLeft: '50px'  }} onClick={() => handleHome()}>
        <i className="fa fa-home" style={{marginRight: '5px'}}></i>
        Home</button>
       </Tooltip>
        </td>
        <td>
        <Tooltip
                title="Click to add sales item"
                placement="top"
              >  
        <button style={buttonStyle} type="button" onClick={onAddSalesInvoice}>
        <i className="fa fa-plus-square" style={{marginRight: '5px'}}></i>
        Add Sales Item </button>
        </Tooltip>
         </td>


        <div className="row">
          <div className="col-sx-12 btn btn-info" style={{ marginTop: '1px' }}>
            Sales Invoice Voucher Entry
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






        <div style={{
      display: 'inline-block',
      width: '1650px',
      height: '115px',
      margin: '6px',
      backgroundColor: 'white',
      border: '4px solid grey',
    }}
    >

          <label style={{ paddingLeft: '10px' }}>
            <a style={{ marginLeft: '.5rem', marginRight: '.4rem' }}> Voucher No. : </a>
            <Tooltip
                title="Enter Voucher No. or click download button to load latest Voucher No."
                placement="top"
              >    
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
            />
</Tooltip>
 <Tooltip
                title="Click to load latest Voucher No."
                placement="top"
              >  
              <button
              style = {{padding: '6px', backgroundColor: 'green', color: 'white'}}
              type='button'
              onClick={() => onSearchVoucher(voucherNo)}
              >
       <i className="fa fa-download fa-border"></i>    
              </button>
</Tooltip>


            <a style={{ marginRight: '.3rem'}}> G/L Selection : </a>
            <select value={ID} onChange={(e) => handleChangeGl(e)} style={{ width: '900px' }} >
              {glData.map((item) => (
                <option value={item.id} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Depart-{item.department}) (G/L Name-{item.glName})</option>
              ))}

            </select>


<p></p>
            <label style={{ paddingLeft: '0px' }}>
              <a style={{ marginRight: '0rem' }}> Debit Amount : </a>
              <Tooltip
                title="Enter Amount to debit"
                placement="top"
              >  
              <input
                type="number"
                style={{ width: '200px', border: '1px solid #696969' }}
                value={drAmt}
                name="drAmt"
                ref={inputRefVoucher}
                onBlur={(e) => formatInputDrAmt(e)}
                onChange={(e) => handleInputChangeDrAmt(e)}
                maxLength={13}
              />
              </Tooltip>
              <a style={{ marginLeft: '2.3rem', marginRight: '.4rem' }}> Credit Amount : </a>
              <Tooltip
                title="Enter Amount to credit"
                placement="top"
              >   
              <input
                type="number"
                style={{ width: '200px', border: '1px solid #696969' }}
                value={crAmt}
                name="crAmt"
                onBlur={(e) => formatInputCrAmt(e)}
                onChange={(e) => handleInputChangeCrAmt(e)}
                maxLength={13}
              />
              </Tooltip>
            </label>

            <p></p><p></p>
            <td>
            <Tooltip
                title="Click to print Voucher"
                placement="top"
              >  
            <button style={{ backgroundColor: "green", color: "white", width: '200px', marginLeft: '10rem',  border: '2px solid black',borderRadius: '14px' }} onClick={() => onPrint(voucherData, totalDrAmt, totalCrAmt)}>
            <i className= "fa fa-print" style={{marginRight: '5px'}}></i>
            Print Voucher</button>
            </Tooltip>
            </td>
              <p></p><p></p>
            <td>
            <Tooltip
                title="Click to load Save Sales Invoice and Voucher"
                placement="top"
              >   
            <button type="submit" style={{ backgroundColor: "red", color: "white", width: '400px', border: '2px solid black',borderRadius: '14px'  }} onClick={() => onSave(voucherData, totalDrAmt, totalCrAmt)}>
            <i className="fa fa-save" style={{marginRight: '5px'}}></i>
            Save Sales Invoice and Voucher</button>
             </Tooltip> 
            </td>
            <td>
            <Tooltip
                title="Click to add Voucher item"
                placement="top"
              >  
            <button type="button" style={{ backgroundColor: "cyan", color: "black", width: '230px', border: '2px solid black',borderRadius: '14px'  }} onClick={() => onAddVoucher()}>
            <i className="fa fa-plus-square" style={{marginRight: '5px'}}></i>
            Add Voucher Item</button>
            </Tooltip>
            </td>

          </label>

        </div>
<br /><br /><br />
        <p></p><p></p><p></p><p></p>

        <div className='row' /></div>
        <p></p>
      <div className="row">

        <div className="col-sx-12 btn btn-secondary" style={{ marginTop: '1px' }}>
          Product Selection
           <a> <button type="button" style={{float: 'right', border: '2px solid black',borderRadius: '14px' }} onClick={() => handleCancelProduct()}>Clear Product</button></a>
        </div>

        <span class="square border border-dark"></span>

<BootstrapTable bootstrap4 keyField='id' data={productData} columns={productColumn}
  defaultSorted={defaultSorted} pagination={pagination}
  rowStyle={{ backgroundColor: '#A9A9A9', border: '3px solid grey' }}
  class="table border border-dark" ></BootstrapTable>













        <div className="col-sx-10 btn btn-success" style={{ marginTop: '1px', paddingLeft: '10px' }}>
          Customer Selection
         <a> <button type="button" style={{float: 'right', border: '2px solid black',borderRadius: '14px' }} onClick={() => handleCancel()}>Clear Customer</button></a>
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

export default SalesInvoicePosting;
