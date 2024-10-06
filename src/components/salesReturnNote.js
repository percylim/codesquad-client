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
import ExportSalesReturnNotePDF from "./pdfSalesRetNoteGenerator";



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
var noteType='Sales Return Note';
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
var defaultQty = 0;
var barcode = '';
//sessionStorage.setItem('voucherNo', '');
//sessionStorage.setItem('invoiceNo','');
//sessionStorage.setItem('invData', []);

function SalesReturnNote() {
  const [acctType, setAcctType] = useState('SUPP');
  const [data, setData] = useState([]);
  const [id, setTax] = useState('');
  const [ID, setGlID] = useState('');
  //  const [locationID, setLocationID] = useState('');
  const [voucherData, setVoucherData] = useState([]);
  const [custData, setCustData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
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
  const [returnQuantity, setReturnQuantity] = useState('');
  const [itemTaxTotal, setItemTaxTotal] = useState('');
  const [itemTotal, setItemTotal] = useState('');
  // const [purchaseQty, setPurchaseQty] = useState(0.000);
  const [itemTax, setItemTax] = useState(0.00);
  const [itemDiscount, setItemDiscount] = useState(0.00);
  const [itemNetTotal, setItemNetTotal] = useState(0.00);
  const [invType, setInvType] = useState('SRN');

  const [drAmt, setDrAmt] = useState('');
  const [crAmt, setCrAmt] = useState('');
  const [totalTax, setTotalTax] = useState();
  const [totalNetAmt, setTotalNetAmt] = useState();


  const [txnDate, setTxnDate] = useState(todayDate);
  const [returnParticular, setReturnParticular] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const inputReference = useRef(null);
  const inputRef = useRef(null);
  const inputRefVoucher = useRef(null);
  const mystyle = {
    align: "left",

  };
  // alert(txnDate);
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

        return <button className="fa fa-check-square" onClick={() => handleSelectSupplier(row.supplierID, row.supplierName, row.glNo, row.glSub)}></button>

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

     setDrAmt(0);
     setCrAmt(0);

    Axios
      .get(url + `/glList`,
        {
          params: {
            companyID: companyID,
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

    Axios
      .get(url + `/taxList`,
        {
          params: {
            companyID: companyID,
            taxType: 'INPUT',
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
    /*
            Axios
            .get(url+`/locationList`,
                  {
                   params: {
                           companyID: companyID,
                          }
                  }
                )
                .then(res => {
                    locData = res.data;
                     setLocationID(locData[0].locationID);
                   //  alert(locationID);
                });
    */
  }, []);

  /*
      const loadSupplier= (SuppCust) => {
          Axios
          .get(url+`/custSuppList`,
            {
             params: {
                     companyID: companyID,
                     acctType: SuppCust,
                    }
            }
          )
          .then(res => {


             custData = res.data;

         });
      };
  */

  const handleSelectProduct = (ID, name, Tax, Punit, price, qty) => {
    // alert(ID);
   // item.productID, item.productName, item.taxID, item.unit, item.unitPrice, item.purchaseQty
    setProductID(ID);
    setProductName(name);
    setUnit(Punit);
    setUnitPrice(price.toFixed(2));
    defaultQty = qty;
  //  alert(Tax);
  for (let i = 0; i < invoiceData.length; i++) {
      if (invoiceData[i].productID === ID) {
        barcode=invoiceData[i].barcode;
      }

  }
    // alert(barcode);
    for (let i = 0; i < taxData.length; i++) {
      if (taxData[i].taxID === Tax) {

        setTax(taxData[i].id);
        taxRate = taxData[i].taxRate;
        taxCode = taxData[i].taxCode;
        taxID = taxData[i].taxID;


      }
    }

  };

  const handleSelectSupplier = (ID, name, gNo, gSub) => {
    // alert(ID);
    setSupplierID(ID);
    setSupplierName(name);
    for (let i = 0; i < glData.length; i++) {
      if (glData[i].glNo === gNo && glData[i].glSub === gSub) {
        setGlID(glData[i].id);
         glNo=glData[i].glNo;
         glSub=glData[i].glSub;
         glName=glData[i].glName;
         glType=glData[i].glType;
         department=glData[i].department;
         glDescription=glData[i].glDescription;

      }
    }

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
  const formatInputDiscount = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    setItemDiscount(parseFloat(num).toFixed(3));

    calculateTotal();
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

    setReturnParticular(e.target.value);


  };
  const formatInputDocumentNo = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
    setDocumentNo(e.target.value.toUpperCase());


  };

  const formatInputProductID = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
    setProductID(e.target.value.toUpperCase());


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
   //       alert(drAmt);
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
        jeParticular: glDescription,
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
  const onSearchNote = async () => {

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
  .get(url+`/lastSalesNote`,
    {
     params: {
             companyID: companyID,
             jvInit: cYear,
             invType: invType,
            }
    }
  )
  .then(res => {
   if (res.data.length > 0) {
    //  alert(res.data[0].documentNo.substring(3,7)+" = "+cYear);
       if (Number(res.data[0].documentNo.substring(3,7))===cYear) {
     //   alert(Number(res.data[0].documentNo.slice(8))+1);
       }
       let vNo = invType+res.data[0].jvInit+'-'+String(Number(res.data[0].documentNo.slice(8))+1);
      setDocumentNo(vNo);

   }else{
    let vNo = invType+cYear+'-1';
   //  alert(vNo);
      setDocumentNo(vNo);
   }

  }, []);
  }
  // Add Purchase Item ******************************
  const onAddReturnNote = () => {
    // e.preventDefault();
    //  alert(taxID);
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

    if (returnQuantity === 0) {
      alert('Purchase Quantity cannot be ZERO');
      return false;
    }


    //  alert(typeof unitPrice);
    if (Number(unitPrice) === 0) {
      alert('Unit Price cannot be ZERO in purchase item');
      return false;
    }
    //  alert(taxRate);
    if (taxRate > 0) {
      if (Number(itemTax) === 0) {
        alert('Tax cannot be ZERO');
        return false;
      }

    };

    if (defaultQty > 0 && returnQuantity > defaultQty) {
      alert("Return Quantity cannot be more than Purchased Quantity");
      return false;
    }

    // if purchase item edited
    if (invEdit) {
      const newDatas = [...data];
      invoiceTotal =0;
      // invoiceDiscountTotal+=Number(newDatas[i].itemDiscount);
      invoiceTaxTotal =0;
      invoiceNetTotal = 0;
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
          newDatas[i].returnQuantity = returnQuantity;
          newDatas[i].unit = unit;
          newDatas[i].unitPrice = unitPrice;
          newDatas[i].itemTotal = itemTotal;
          newDatas[i].itemTax = itemTax;
          newDatas[i].itemNetTotal = itemNetTotal;
          //   newDatas[i].invType= invType;
          newDatas[i].taxID = taxID;
          newDatas[i].taxType = taxType;
          newDatas[i].taxCode = taxCode;
          newDatas[i].taxRate = taxRate;
          newDatas[i].returnParticular= returnParticular;
          newDatas[i].defaultQty = defaultQty;
          newDatas[i].barcode = barcode;
          //     newDatas[i].locationID= locationID;
          //     newDatas[i].remark = taxRemark;
          //      newDatas[i].taxDescription = taxDescription;

          //  alert(returnParticular);

        }

        invoiceTotal += Number(newDatas[i].itemTotal);
        // invoiceDiscountTotal+=Number(newDatas[i].itemDiscount);
        invoiceTaxTotal += Number(newDatas[i].itemTax);
        invoiceNetTotal += Number(newDatas[i].itemNetTotal);


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
        returnQuantity: returnQuantity,
        unit: unit,
        unitPrice: unitPrice,
        itemTotal: itemTotal,
        documentNo: documentNo,
        itemTax: itemTax,
        itemNetTotal: itemNetTotal,
        taxID: taxID,
        taxType: taxType,
        taxCode: taxCode,
        taxRate: taxRate,
        returnParticular: returnParticular,
         defaultQty: defaultQty,
         barcode: barcode,
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
        newDatas[i].txnDate = txnDate;
        invoiceTotal += Number(newDatas[i].itemTotal);
        // invoiceDiscountTotal+=Number(newDatas[i].itemDiscount);
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
    setUnitPrice(0);
    // setReturnQuantity(0);
    // setItemTaxTotal(0);
    setItemTotal(0);
    setReturnQuantity(0);
    setItemTax(0);
    // setItemDiscount(0);
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
        setReturnQuantity(newData[i].returnQuantity);
        setUnitPrice(newData[i].unitPrice);
        setItemTotal(newData[i].itemTotal);
        setItemDiscount(newData[i].itemDiscount);
        setItemTax(newData[i].itemTax);
        setItemNetTotal(newData[i].itemNetTotal);
        setReturnParticular(newData[i].returnParticular);
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
  const onPrintNote = async () => {
    noteType = "Sales Return Note";

if (data.length === 0) {
alert('No '+noteType+' Data for printing');
return false;
}

// let invoiceType = 'Tax Invoice';
for (let i = 0; i < data.length; i++) {
   data[i].noteType = noteType ; //salesRep;
//   data[0].salesParticular = '' ; //salesParticular;
}

// (data, companyInfo, customerInfo, invoiceType, noteTotal,  DiscountTotal, TaxTotal, NetTotal
//  alert(data[0].txnDate);
ExportSalesReturnNotePDF(data, companyInfo, customerInfo, noteType, invoiceTaxTotal, invoiceNetTotal)
//  TotalTxnAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
//  <td style={{textAlign:"right", color: "red"}}>{parseFloat(TotalTaxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
//  <td style={{textAlign:"right", color: "red"}}>{parseFloat(txnNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

};


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
    generatePDF(newDatas, headers, 'JV.pdf')
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
  const handleCancelInvoice = async (e) => {
    //  alert('remove');
    setTotalTax(0);
    setTotalNetAmt(0);

    setInvoiceData([]);
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
    window.location.href = '/purchaseReturnNote';
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

    // alert(data[0].taxDescription+ " = "+data[0].remark);
    //   alert(TotalCrAmt);
    if (data.length === 0) {
      alert("No Sales Invoice Return Note available to Save");
      return false;
    }

    if (voucherData.length === 0) {
      alert('No Voucher to save');
      return false
    }
    if (invoiceTotal === 0) {
      alert("Sales Invoice Amount is ZERO");
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
      //   alert(taxData[i].taxID);
      //   alert(taxID);
    }


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
      .get(url+`/salesNoteVerify`,
        {
         params: {
                 companyID: companyID,
                 documentNo: documentNo,
                }
        }
      )
      .then(res => {

      // alert(res.data);
       if (res.data.length >0) {
          alert('Sales Note No. '+documentNo+' already existed, please re-enter')
           return false
        }



      }, []);

    //alert(data[0].voucherNo);
    /** update purchase Invoice */
   // *****************************
//    return false;
   // *****************************
    Axios
      .post(url + '/salesReturnNote', data



      )

      .then(res => {


        if (res.data === 'Success') {



          //    window.location.reload(false);
          // window.location.href='journalVoucher';

        } else {
           alert("Update Failed") ;
           return false;
        };
        //  alert(text);
      }, []);


// return false;

    /** update voucher */
    //alert(voucherData[0].glNo);

    Axios
      .post(url + '/purchaseVoucher', voucherData



      )

      .then(res => {


        if (res.data === 'Success') {
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
          // setData(...data);
          window.location.href = '/salesReturnNote';

        } else {
          alert('Update Voucher Failed');
          return false;
        };
        //  alert(text);
      }, []);




  };

  const onClearSupplier = async () => {
    setCustData([]);

  };
  const onSearch = async () => {

    // alert(e.target.value);
    //  sessionStorage.setItem('invoiceNo',invoiceNo);
    //   sessionStorage.setItem('voucherNo',voucherNo);
    //   sessionStorage.setItem('txnDate',txnDate);
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
            setCustomerInfo(res.data);
            setSupplierName(res.data[0].supplierName);
            for (let i = 0; i < glData.length; i++) {
              if (glData[i].glNo === res.data[0].glNo && glData[i].glSub === res.data[0].glSub) {
                setGlID(glData[i].id);
                glNo=glData[i].glNo;
                glSub=glData[i].glSub;
                glName=glData[i].glName;
                glType=glData[i].glType;
                department=glData[i].department;
                glDescription=glData[i].glDescription;


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
                  alert('Please selected from the Supplier from Supplier Selection below')


                  return false;
                }


              });







          }






        }, []);

    };

  };
















  //  inputReference.current.focus();



  const onSearchInvoice = async () => {
    //  alert(voucherNo);
    //   sessionStorage.setItem('invoiceNo',invoiceNo);
    //   sessionStorage.setItem('voucherNo',voucherNo);
    //   sessionStorage.setItem('txnDate',txnDate);
    // alert(supplierID);
    //alert(supplierID);
    if (supplierID === '' || supplierID === null) {
      alert("No Cuctomer Selected");
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

    Axios
      .get(url + `/salesInvoiceVerify`,
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
        if (res.data != 'Existed') {
          alert('Sales Invoice No. ' + invoiceNo + ' is invalid')
          return false
        }



      }, []);

    // load purchase Invoice Detail

    Axios
      .get(url + `/salesInvoiceDetail`,
        {
          params: {
            companyID: companyID,
            supplierID: supplierID,
            invoiceNo: invoiceNo,
          }
        }
      )
      .then(res => {

        let iData = res.data;
        // setInvoiceData(iData);
      // alert(iData[0].invoiceNo);
      invoiceTaxTotal = 0;
      invoiceNetTotal = 0;
        let Tax = 0;
        let Amt = 0;
        for (let i = 0; i < iData.length; i++) {
          Tax += iData[i].itemTaxTotal;
          Amt += iData[i].itemNetTotal;
          //  let curr = iData[i].invoiceDate;
          let curr = new Date(iData[i].invoiceDate).toLocaleDateString();
          iData[i].invoiceDate = curr;
          invoiceTaxTotal += Number(iData[i].taxItemTotal);
          invoiceNetTotal += Number(iData[i].itemNetTotal);

        }

        setInvoiceData(iData);
        setTotalTax(Tax);
        setTotalNetAmt(Amt);
      }, []);



  };

  // on Save Purchase Invoice and Voucher *******************


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
         // alert(res.data[0].voucherNo);
         // alert(Number(res.data[0].voucherNo.slice(5)) );
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
    let num = e.target.value; // .replace(/\+|-/ig, '');;
    //alert(num);


    setReturnQuantity(num);

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
    setReturnQuantity(num.toFixed(3));
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
    let iTotal = Number(returnQuantity) * Number(unitPrice);
    let netTotal = iTotal + Number(itemTax);
    //  alert(itemDiscount);
    // alert(taxRate);


    // if (invType === 'PUR') {

    setItemTotal(parseFloat(iTotal).toFixed(2));
    setItemNetTotal(parseFloat(netTotal).toFixed(2));
    setItemTax((iTotal * (taxRate / 100)).toFixed(2))

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
        <div className="col-sm-12 btn btn-info" style={{ marginTop: '1px' }}>
          Sales Invoice Goods Return Note Entry
        </div>
      </div>


      <div>

        <label style={{ paddingLeft: "10px" }} >
          <a style={{ marginRight: '2.5rem' }}> Customer ID : </a>
          <input
            type="text"
            style={{ width: '200px', border: '1px solid #696969' }}
            value={supplierID}
            name="supplier"
            class="text-uppercase"
            onChange={(e) => formatInputSupplierID(e)}
            required
            readOnly = {lDisable}
 
          />

          <button
            style={{ padding: '6px' }}
            type='button'
            class='btn btn-primary fa fa-search float-right'
            onClick={() => onSearch()}
  
          ></button>

          <a style={{ marginLeft: '3.6rem', marginRight: '0.4rem' }} >Customer Name : </a>

          <input
            type="text"
            style={{ width: '900px' }}
            value={supplierName}
            name="supplierName"
            readOnly={true}
            required
          />



        </label>






      </div>



      <label style={{ paddingLeft: "10px" }} >


        <a style={{ marginRight: '1rem' }}> Return Note No. : </a>
        <input
          type="text"
          style={{ width: '200px', border: '1px solid #696969' }}
          value={documentNo}
          name="document"
          class="text-uppercase"
          onChange={(e) => formatInputDocumentNo(e)}
          required
          readonly={true}
        />

          <button
            style={{ padding: '6px' }}
            type='button'
            class='btn btn-primary fa fa-search float-right'
            onClick={() => onSearchNote()}
 
          ></button>

        <a style={{ marginLeft: '5.3rem', marginRight: '1.5rem' }} >Return Date : </a>
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
      </label>






      <div className="select-container" >



        <p></p>


        <table class="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>
              <th style={{ backgroundColor: 'yellow', width: '.5px', textAlign: 'center' }}>#</th>
              <th style={{ backgroundColor: '#999999', width: '1px', textAlign: 'center' }}>Product</th>
              <th style={{ backgroundColor: 'yellow', width: '280px', textAlign: 'center' }}>Product Name</th>
              <th style={{ backgroundColor: '#999999', width: '20px', textAlign: 'center' }}>Quantity</th>
              <th style={{ backgroundColor: 'yellow', width: '1px', textAlign: 'center' }}>Unit</th>
              <th style={{ backgroundColor: '#999999', width: '40px', textAlign: 'center' }}>Type</th>
              <th style={{ backgroundColor: 'yellow', width: '40px', textAlign: 'center' }}>Cost</th>
              <th style={{ backgroundColor: '#999999', width: '1px', textAlign: 'center' }}>Tax</th>
              <th style={{ backgroundColor: 'yellow', width: '130px', textAlign: 'center' }}>Item Total</th>
              <th style={{ backgroundColor: '#999999', width: '20px', textAlign: 'center' }}>Tax ID</th>
              <th style={{ backgroundColor: 'blue', textAlign: 'left', color: 'white', width: '10px' }}>Action</th>
            </tr>
          </thead>
          <tbody style={mystyle} >
            {data.map(item => {
              return <tr key={item.id}>
                <td>{item.id}</td>

                <td style={{ backgroundColor: '#999999' }}>{item.productID}</td>
                <td style={{ textAlign: 'left' }}>{item.productName}</td>
                <td style={{ textAlign: 'right', backgroundColor: '#999999' }}>{parseFloat(item.returnQuantity).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'left' }}>{item.unit}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#999999' }}>{item.taxType}</td>
                <td style={{ textAlign: 'right' }}>{parseFloat(item.unitPrice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

                <td style={{ textAlign: "right", backgroundColor: '#999999' }}>{parseFloat(item.itemTax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right", color: "blue" }}>{parseFloat(item.itemNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#999999', width: '20px' }}>{item.taxID} </td>
                <button class={'fa fa-edit'} style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEdit(item.id)}> </button>
                <button class={'fa fa-trash'} style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleRemove(item.id)}> </button>
              </tr>

            })}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td style={{ textAlign: "right", backgroundColor: "cyan" }}>Invoice</td>


            <td style={{ textAlign: "left", backgroundColor: "cyan" }}>Totals :</td>


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
            
          />

          <button
            style={{ padding: '6px' }}
            type='button'
            class='btn btn-primary fa fa-search float-right'
            onClick={() => onSearchInvoice()}
            
          ></button>


        </label>

        <label style={{ paddingLeft: "10px" }} >
          <a style={{ marginRight: '.6rem' }}> Product ID : </a>


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

          <button
            style={{ padding: '6px' }}
            type='button'
            data-toggle="tooltip" data-placement="bottom" title="Type * for none stock product item: Fixed Assets/Expenses etc."
            class='btn btn-primary fa fa-search float-right'
            onClick={() => onSearchProduct()}
  
          ></button>

          <a style={{ marginLeft: '4rem', marginRight: '.6rem' }}> Product Name : </a>

          <input
            type="text"
            style={{ width: '600px' }}
            value={productName}
            name="productName"
            readOnly={true}
            required
          />






          <a style={{ marginLeft: '4rem', marginRight: '.6rem' }}> Unit : </a>
          <input
            type="text"
            style={{ width: '60px' }}
            value={unit}
            name="unit"
            readOnly={true}
            required
          />

        </label>



        <div style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} />

        <p></p>
        <label style={{ paddingLeft: '10px' }}>
          <a style={{ marginRight: '1.8rem' }}> Tax Selection : </a>
          <select value={id} onChange={(e) => handleChangeTax(e)}>
            {taxData.map((item) => (
              <option value={item.id} required> (ID-{item.taxID}) (Type-{item.taxType}) (Code-{item.taxCode}) (Description-{item.taxDescription}) (Rate-{item.taxRate}%)</option>
            ))}

          </select>


        </label>

        <label style={{ paddingLeft: "10px" }}>
          <a > Return Quality : </a>
          <input
            type="number"
            style={{ width: '150px', border: '1px solid #696969' }}
            value={returnQuantity}
            name="retQty"
            onBlur={(e) => formatInputQty(e)}
            onChange={(e) => handleInputChangeQty(e)}
            maxLength={13}
          />

          <a style={{ marginRight: '.6rem' }}> Unit Price : </a>
          <input
            type="number"
            style={{ width: '100px' }}
            value={unitPrice}
            name="unitPrice"
            onBlur={(e) => formatInputUnitPrice(e)}
            onChange={(e) => handleInputChangeUnitPrice(e)}
            maxLength={13}
          />

          <a style={{ marginRight: '.6rem' }}> Total : </a>
          <input
            type="number"
            style={{ width: '150px' }}
            value={itemTotal}
            name="itemTotal"
            readonly={true}
            maxLength={13}
          />







          <a style={{ marginRight: '.6rem' }}> Item Tax : </a>
          <input
            type="number"
            style={{ width: '150px', border: '1px solid #696969' }}
            value={itemTax}
            name="itemTax"
            onBlur={(e) => formatInputTax(e)}
            onChange={(e) => handleInputChangeTax(e)}
            maxLength={13}
          />

          <a style={{ marginRight: '.6rem' }}> Item Net Total : </a>
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

        <label style={{ paddingLeft: "10px" }} >


<a style={{ marginRight: '.2rem' }}> Return Particular : </a>
<input
  type="text"
  style={{ width: '1300px', border: '1px solid #696969' }}
  value={returnParticular}
  name="particular"
  onChange={(e) => formatInputParticular(e)}
  maxLength={255}

/>

</label>



        <p></p>
        <div style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} />

        <p></p>
        <td></td>
        <td><button style={{ backgroundColor: "green", color: "white", width: '200px' }} onClick={() => onPrintNote()}>Print Sales Return Note</button></td>
        <td><button style={{ backgroundColor: "blue", color: "white", width: '200px' }} onClick={() => onNew()}>New Return Note </button></td>
        <td><button style={{ backgroundColor: "grey", color: "black", width: '100px' }} onClick={() => handleHome()}>Home</button></td>
        <td><button style={buttonStyle} type="button" onClick={onAddReturnNote}>Add Return Item </button> </td>

        <p></p>

        <div className="row">
          <div className="col-sx-12 btn btn-success" style={{ marginTop: '1px' }}>
            Goods Return Voucher Entry
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
  
            />

            <button
              style={{ padding: '10px' }}
              type='button'
              class='btn btn-primary fa fa-download float-right'
              onClick={() => onSearchVoucher(voucherNo)}
 
            ></button>


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
              />
            </label>


            <p></p>


            <td><button style={{ backgroundColor: "green", color: "white", width: '200px' }} onClick={() => onPrint(voucherData, totalDrAmt, totalCrAmt)}>Print Voucher</button></td>
            <td><button style={{ backgroundColor: "red", color: "white", width: '300px' }} onClick={() => onSave(voucherData, totalDrAmt, totalCrAmt)}>Save Return Note and Voucher</button></td>
            <td><button style={{ backgroundColor: "cyan", color: "black", width: '200px' }} onClick={() => onAddVoucher()}>Add Voucher Item</button></td>

          </label>
        </div>
        <p></p>
        <p></p>

        <div className='row' style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} /></div>

      <div className="row">

        <div className="col-sx-12 btn btn-secondary" style={{ marginTop: '1px' }}>
          Show Invoice Detail
        </div>

        <table class="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
          <thead class="thead-dark">

            <tr style={{ align: 'left' }}>

              <th style={{ backgroundColor: 'yellow', width: '20px', textAlign: 'right' }}>#</th>
              <th style={{ backgroundColor: '#999999', width: '200px', textAlign: 'center' }}>Product ID</th>
              <th style={{ backgroundColor: 'yellow', width: '540px', textAlign: 'center' }}>Product Name</th>
              <th style={{ backgroundColor: '#999999', width: '5px', textAlign: 'center' }}>Date</th>
              <th style={{ backgroundColor: 'yellow', width: '5px', textAlign: 'center' }}>Unit</th>
              <th style={{ backgroundColor: '#999999', width: '100px', textAlign: 'center' }}>Quantity</th>
              <th style={{ backgroundColor: 'yellow', width: '100px', textAlign: 'center' }}>Price</th>
              <th style={{ backgroundColor: '#999999', width: '50px', textAlign: 'center' }}>Tax ID</th>
              <th style={{ backgroundColor: 'yellow', width: '50px', textAlign: 'center' }}>Code</th>
              <th style={{ backgroundColor: '#999999', width: '150px', textAlign: 'center' }}>Tax Amount</th>
              <th style={{ backgroundColor: 'yellow', width: '150px', textAlign: 'center' }}>Item Total</th>
              <th style={{ backgroundColor: 'blue', width: '20px', textAlign: 'center', color: 'white' }}>Select</th>
              <th></th>
            </tr>

          </thead>
          <tbody style={mystyle} >
            {invoiceData.map(item => {
              return <tr key={item.id}>
                <td>{item.id}</td>

                <td style={{ backgroundColor: '#999999', textAlign: 'left' }}>{item.productID}</td>
                <td style={{ textAlign: 'left' }}>{item.productName}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#999999' }}>{item.invoiceDate}</td>
                <td style={{ textAlign: 'left' }}>{item.unit}</td>
                <td style={{ textAlign: 'right', backgroundColor: '#999999' }}>{parseFloat(item.salesQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'right' }}>{parseFloat(item.unitPrice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "left", backgroundColor: '#999999' }}>{item.taxID}</td>
                <td style={{ textAlign: "left" }}>{item.taxCode}</td>
                <td style={{ textAlign: "right", backgroundColor: '#999999' }}>{parseFloat(item.taxItemTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right", backgroundColor: 'cyan' }}>{parseFloat(item.itemNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <button className={'fa fa-check-square'} style={{ backgroundColor: 'green', color: 'white', border: "3px solid black", align: 'left' }} onClick={() => handleSelectProduct(item.productID, item.productName, item.taxID, item.unit, item.unitPrice, item.salesQty)}> </button>

              </tr>

            })}
            <td></td>

            <td></td>
            <button style={{ backgroundColor: 'blue', color: 'white', height: '30px', padding: '1px' }} onClick={() => handleCancelInvoice()}>Clear Invoice Detail</button>

            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>

            <td style={{ textAlign: "center", backgroundColor: "green", color: 'white' }}>Totals :</td>
            <td style={{ textAlign: "right", backgroundColor: 'cyan', color: "red" }}>{parseFloat(invoiceTaxTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

            <td style={{ textAlign: "right", color: "blue", backgroundColor: 'cyan' }}>{parseFloat(invoiceNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>



          </tbody>



        </table>


        <div className="col-sx-10 btn btn-primary" style={{ marginTop: '1px', paddingLeft: '10px' }}>
          Customer Selection

        </div>

        <span class="square border border-dark"></span>

        <BootstrapTable bootstrap4 keyField='id' data={custData} columns={columns}
          defaultSorted={defaultSorted} pagination={pagination}
          rowStyle={{ backgroundColor: '#A9A9A9', border: '3px solid grey' }}
          class="table border border-dark" ></BootstrapTable>

      </div>
      <button
        style={{ padding: '6px' }}
        type='button'
        class='btn btn-success'
        onClick={() => handleCancel()}
      >Clear Supplier Infomation</button>
      <p></p>
      <p></p>
      <p></p>
      <p></p>




    </div>
















  ) // return
};

export default SalesReturnNote;
