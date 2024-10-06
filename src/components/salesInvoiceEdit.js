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
var customerID ='';
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
var allowEditProduct = true ;
var defaultQty = 0;
var barcode = '';
//sessionStorage.setItem('voucherNo', '');
//sessionStorage.setItem('invoiceNo','');
//sessionStorage.setItem('invData', []);

function SalesInvoiceEdit() {
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
  const [remark, setRemark] = useState('');
  const [remark1, setRemark1] = useState('');
  const [remark2, setRemark2] = useState('');const [remark3, setRemark3] = useState('');
  const [remark4, setRemark4] = useState('');
  const [remark5, setRemark5] = useState('');
  const [remark6, setRemark6] = useState('');
  const [txnDate, setTxnDate] = useState(todayDate);
  const [dueDate, setDueDate] = useState('');
  const [salesParticular, setSalesParticular] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const inputReference = useRef(null);
  const inputRef = useRef(null);
  const inputRefQty = useRef(null);
  const inputRefVoucher = useRef(null);
  const inputRefProductName = useRef(null);
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
  };

  useEffect(() => {

    // setRemark1('Texting');
     setDrAmt('');
     setCrAmt('');

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
     //  var arr1=[];
     //  var arr2=[];
     Axios
     .get(url + `/salesGlList`,
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
     });
     /*
     Axios
     .get(url + `/glSelectList`,
       {
         params: {
           companyID: companyID,
           gType: '201',
         }
       }
     ).then(res => {
       console.log(res);
       arr2= res.data
    //   alert(typeof res);
      // const newDatas = [...data, newData];
          glData = arr1.concat(arr2);
   //    setGlData(...glData, res.data);
   //    glData = res.data;
   //    glID = glData[0].id;
   //    setGlID(glData[0].id);
   //    glNo = glData[0].glNo;
   //    glSub = glData[0].glSub;

   //    glName = glData[0].glName;
   //    department = glData[0].department;
   //    glDescription = glData[0].glDescription;
   //    glType = glData[0].glType;
     });

*/
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

  const handleSelectProduct = (ID, pBarcode, name, Punit, price) => {
    // alert(price);
   // item.productID, item.productName, item.taxID, item.unit, item.unitPrice, item.purchaseQty
    setProductID(ID);
    setProductName(name);
    setUnit(Punit);
    barcode=pBarcode;
    setUnitPrice(Number(price).toFixed(2));
    inputRefQty.current.focus();
  //  defaultQty = qty;
  //  alert(Tax);
  /*
    // alert(barcode);
    for (let i = 0; i < taxData.length; i++) {
      if (taxData[i].taxID === Tax) {

        setTax(taxData[i].id);
        taxRate = taxData[i].taxRate;
        taxCode = taxData[i].taxCode;
        taxID = taxData[i].taxID;


      }
    }
*/
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

  };
  const handleCustChange = () => {
    //  setAcctType('CUST');
    //   alert("CUST");
    //  loadSupplier('SUPP');
  };
  const formatInputProductName = async (e) => {
   //  alert(e.target.value);
   // let ID = Number(e.target.value);
      setProductName(e.target.value);

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
    //   alert(dDate);
    // setTxnDate(dDate);
    //    alert(txnDate);
    // onSearchVoucher(setTxnDate(dDate));
   // inputRef.current.focus();
  };
  const formatInputDiscount = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    setItemDiscount(parseFloat(num).toFixed(2));

    calculateTotal();
  };
  const formatInputSalesInvoice = async (e) => {
    e.preventDefault();
    setInvoiceNo(e.target.value);
  }
  const formatInputRemark = async (e) => {
    e.preventDefault();
    setRemark(e.target.value);
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
    //  alert(drAmt);
    //  alert(typeof crAmt);
    //  if (drAmt === '') {
    //    setDrAmt(0);
    //    alert(drAmt);
    //   }
   //  if (typeof crAmt != Number) {
     // crAmt = 0;
   //}
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
      if (newDatas[i].drAmt === '') {
        newDatas[i].drAmt = '0.00';
      }
      if (newDatas[i].crAmt === '') {
        newDatas[i].crAmt = '0.00';
      }
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
    if (remark === '' || remark === null) {
      alert("Reason Edit is required");
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
          newDatas[i].salesQty = salesQuantity;
          newDatas[i].unit = unit;
          newDatas[i].unitPrice = unitPrice;
          newDatas[i].cost = cost;
          newDatas[i].itemTotal = itemTotal;
          newDatas[i].taxItemTotal = itemTax;
          // alert(newDatas[i].itemTax);

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
          newDatas[i].itemNetTotal = Number(newDatas[i].itemTotal)-Number(newDatas[i].itemDiscount)+Number(newDatas[i].taxItemTotal);
          newDatas[i].remark1 = remark1;
          newDatas[i].remark2 = remark2;
          newDatas[i].remark3 = remark3;
          newDatas[i].remark4 = remark4;
          newDatas[i].remark5 = remark5;
          newDatas[i].remark6 = remark6;
          newDatas[i].remark = remark;
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
        newDatas[i].remark = remark;
        invoiceTotal += Number(newDatas[i].itemTotal);
        invoiceDiscountTotal+=Number(newDatas[i].itemDiscount);
        invoiceTaxTotal += Number(newDatas[i].taxItemTotal);
        invoiceNetTotal += Number(newDatas[i].itemNetTotal);
        newDatas[i].id = i + 1;
        // newDatas[i].purchaseQty=newDatas[i].purchaseQty.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        // newDatas[i].itemTotal=newDatas[i].itemTotal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        // alert(typeof  invoiceTotal);
      }
      setData(newDatas);
      invEdit = false;
    } else {
  //    alert(itemTax);
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
        salesQty: salesQuantity,
        unit: unit,
        unitPrice: unitPrice,
        cost: cost,
        itemTotal: itemTotal,
        documentNo: documentNo,
        itemNetTotal: Number(itemTotal)-Number(itemDiscount)+Number(itemTax),
        taxID: taxID,
        taxType: taxType,
        taxCode: taxCode,
        taxRate: taxRate,
        taxItemTotal: itemTax,
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
         remark : remark,

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
       // newDatas[i].txnDate = format(new Date(txnDate), "dd/MM/yyyy") ; // txnDate;
        newDatas[i].txnDate = txnDate;
      //  newDatas[i].dueDate = format(new Date(dueDate), "dd/MM/yyyy") ; // dueDate;
         newDatas[i].dueDate = dueDate;
      newDatas[i].salesRep = salesRep;
       // newDatas[i].salesParticular = salesParticular;
        newDatas[i].remark1 = remark1;
        newDatas[i].remark2 = remark2;
        newDatas[i].remark3 = remark3;
        newDatas[i].remark4 = remark4;
        newDatas[i].remark5 = remark5;
        newDatas[i].remark6 = remark6;
        newDatas[i].remark= remark;


        invoiceTotal += Number(newDatas[i].itemTotal);
        invoiceDiscountTotal+=Number(newDatas[i].itemDiscount);
        invoiceTaxTotal += Number(newDatas[i].taxItemTotal);
        invoiceNetTotal += Number(newDatas[i].itemNetTotal);
        newDatas[i].id = i + 1;
     //   newDatas[i].salesQty=newDatas[i].salesQty.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        // newDatas[i].itemTotal=newDatas[i].itemTotal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

       //  alert(typeof  invoiceTaxTotal);
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
allowEditProduct = true;
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
    let cTaxID = '';
    for (let i = 0; i < newData.length; i++) {
    if (newData[i].id === e)
      {
       // alert(newData[i].salesQty);
        setProductID(newData[i].productID);
        setProductName(newData[i].productName);
        setInvType(newData[i].invType);
        setUnit(newData[i].unit);
        setSalesQuantity(newData[i].salesQty);
        setUnitPrice(newData[i].unitPrice);
        setCost(newData[i].cost);
        setItemTotal(newData[i].itemTotal);
        setItemDiscount(newData[i].itemDiscount);
        setItemTax(newData[i].taxItemTotal);
        setItemNetTotal(newData[i].itemNetTotal);
       // setSalesParticular(newData[i].salesParticular);
        setRemark1(newData[i].remark1);
        setRemark2(newData[i].remark2);
        setRemark3(newData[i].remark3);
        setRemark4(newData[i].remark4);
        setRemark5(newData[i].remark5);
        setRemark6(newData[i].remark6);
        setRemark(newData[i].remark);
        setGlID(newData[i].id);
         cTaxID = newData[i].taxID ;
        // alert(newData[i].returnParticular);
         defaultQty = newData[i].defaultQty;
        invEdit = true;
        pur_id = e;



      }
    }
    for (let i = 0; i < taxData.length; i++) {
      if (taxData[i].taxID === cTaxID) {

        setTax(taxData[i].id);

      }
    }

    inputReference.current.focus();
  };


  const handleEditVoucher = async (e) => {
    // alert(e)
      let cGlNo='';
      let cGlSub = '';
    const newData = [...voucherData];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === e) {
    //    setGlID(newData[i].glNo);
      cGlNo=newData[i].glNo;
      cGlSub=newData[i].glSub;
        setDrAmt(newData[i].drAmt);
        setCrAmt(newData[i].crAmt);
  // alert(glID);

        vouchEdit = true;
        vouch_id = e;



      }
    }
     for (let i =0; i < glData.length; i++) {
        if (glData[i].glNo === cGlNo && glData[i].glSub === cGlSub) {
            setGlID(glData[i].id);
         //   alert(glData[i].id);

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
     ExportInvoicePdf(data, companyInfo, customerInfo, invoiceType, invoiceTotal, invoiceDiscountTotal, invoiceTaxTotal, invoiceNetTotal)

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
    window.location.href = '/salesInvoiceEdit';
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
    if (data.length === 0) {
      alert("No Purchase Invoice available to Save");
      return false;
    }
    // alert(invoiceNetTotal+ ' = ' +(typeof invoiceNetTotal)+' = '+(typeof totalDrAmt));
   //  invoiceNetTotal=invoiceNetTotal.toFixed(2);
    if (voucherData.length === 0) {
      alert('No Voucher to save');
      return false
    }
    if (invoiceTotal === 0) {
      alert("Sales Invoice Amount is ZERO");
      return false;
    }
  //     alert(invoiceNetTotal+ ' = '+totalDrAmt+ ' = '+totalCrAmt);
//       alert(typeof invoiceNetTotal);
//       alert(typeof totalDrAmt);
//       alert(typeof totalCrAmt);
    if (invoiceNetTotal !== totalDrAmt) {
      alert('Voucher Total must same as Invoice Net Total');
      return false;
    }

 // alert(totalDrAmt+' = '+totalCrAmt );
    if (totalDrAmt !== totalCrAmt) {
      alert('Debit total and Credit total must equal')
      return false
    }

    if (txnDate === '' || txnDate === 'undefined') {
      alert("Sales Invoice Date cannot be blank");
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
      data[i].salesRep = salesRep;
      data[i].voucherNo = voucherNo;
      data[i].remark1 = EscapeStr(remark1);
      data[i].remark2 = EscapeStr(remark2);
      data[i].remark3 = EscapeStr(remark3);
      data[i].remark4 = EscapeStr(remark4);
      data[i].remark5 = EscapeStr(remark5);
      data[i].remark6 = EscapeStr(remark6);
      data[i].userName = userName;
      data[i].remark = EscapeStr(remark);
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
          alert('Supplier ID: ' + supplierID + ' is invalid, please re-enter or press (download) button to search the valid ID');
          return false;
        }
      }, []);
/*
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
      .get(url + `/salesInvoiceVerify`,
        {
          params: {
            companyID: companyID,
            invoiceNo: invoiceNo,

          }
        }
      )
      .then(res => {

        // alert(res.data);
        if (res.data != 'Existed') {
          alert('Sales Invoice No. ' + invoiceNo + ' not Existed, please re-enter')
          return false
        }



      }, []);

    // return false;

*/

    //alert(data[0].voucherNo);
    /** update purchase Invoice */
// return false;
    Axios
      .post(url + '/salesInvoiceEdit', data)

      .then(res => {


        if (res.data === 'Success') {



          //    window.location.reload(false);
          // window.location.href='journalVoucher';

        };
        //  alert(text);
      }, []);

//return false;


    /** update voucher */
    //alert(voucherData[0].glNo);

    Axios
      .post(url + '/voucherChange', voucherData



      )

      .then(res => {


        if (res.data === 'Success') {
          alert(res.data);
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
         window.location.href = '/salesInvoiceEdit';

        };
        //  alert(text);
      }, []);




  };

  const onClearSupplier = async () => {
    setCustData([]);

  };
  const onSearch = async (supplierID) => {

   //  alert(supplierID);
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
            custGlNo=res.data[0].glNo;
            custGlSub=res.data[0].glSub;
          //  alert(custGlNo+ ' - '+custGlSub);
        //    setSupplierName(res.data[0].supplierName);
        //    setPaymentTerm(res.data[0].paymentTerm);
            setCustomerInfo(res.data);
          }

        }, []);

    };

  };
















  //  inputReference.current.focus();



  const onSearchInvoice = async () => {

  //  if (supplierID === '' || supplierID === null) {
  //     alert("No Supplier Selected");
  //    return false;
  //  }

//    if (supplierName === '' || supplierName === null) {
 //     alert("No Supplier Selected");
 //     return false;
  //  }

  // alert(typeof cYear);

   if (invoiceNo === '' || invoiceNo === null) {
    alert('Please key in a valid Sales Invoice No.');
    return false;
   }

// load invoice Transaction
/*
//let allowEdit = true;
Axios
.get(url + `/loadInvoiceTransaction`,
{
  params: {
    companyID: companyID,
    pur_sal: 'S',
    supplierID: supplierID,
    invoiceNo: invoiceNo,
  }
}
).then(res => {
//  alert(res.data.length);
if (res.data.length >0) {
// check whether this invoice got cr/dr note or payment
for (let i = 0; i < res.data.length; i++) {
    if (res.data[i].invType === 'SCN' || res.data[i].invType === 'SDN' || res.data[i].invType === 'SPY') {
      alert('Unable to Process Editing because Sale Invoice No.'+invoiceNo+' already have Credit/Debit/Payment Transaction')
    //  allowEdit=false;
      return (window.location.href='/salesInvoiceEdit') ;

    }
}
}
})
*/
//if (!allowEdit) {
//  return false
//}
//alert(allowEdit);
      Axios.get(url + '/salesInvoiceDetail',
       {
         params: {
           companyID: companyID,
           invoiceNo: invoiceNo,
         }
       }

      )
     .then(res => {
       if (res.data.length >0 ) {
        let cur = new Date(res.data[0].invoiceDate);
        // alert(format(curr.toISOString().substr(0,10)), "dd/MM/yyyy");
        cur.setDate(cur.getDate());

        let tDate = cur.toISOString().substr(0, 10);
          let curD = new Date(res.data[0].dueDate);
          let dDate=res.data[0].dueDate; ;
        //  alert(dDate);
         if (dDate != '0000-00-00') {
          curD.setDate(curD.getDate());
          dDate=curD.toISOString().substr(0, 10);

     //      dDate = res.data[0].dueDate;
     //    } else {


         }
          // let tDate =format(new Date(res.data[0].invoiceDate), "dd/MM/yyyy");
    //      let dDate=format(new Date(res.data[0].dueDate), "dd/MM/yyyy");
     //  alert(res.data[0].dueDate);
   //       setData(res.data);
            res.data[0].userName = userName;
            setRemark('');
            setRemark1(res.data[0].remark1);
            setRemark2(res.data[0].remark2);
            setRemark3(res.data[0].remark3);
            setRemark4(res.data[0].remark4);
            setRemark5(res.data[0].remark5);
            setRemark6(res.data[0].remark6);
            setTxnDate(tDate);
            setDueDate(dDate);
            setSalesRep(res.data[0].salesRep);
            setSupplierID(res.data[0].customerID);
            setSupplierName(res.data[0].customerName);
             setVoucherNo(res.data[0].voucherNo);
             setPaymentTerm(res.data[0].term);
             invoiceTotal = 0;
             invoiceDiscountTotal = 0;
             invoiceTaxTotal = 0;
             invoiceNetTotal = 0;
             customerID = res.data[0].customerID;
          //   alert(customerID);
         //    let vID = 0;
             for (let i = 0; i < res.data.length; i++) {
               //   alert(newDatas[i].itemTotal);
               invoiceTotal += Number(res.data[i].itemTotal);
               invoiceDiscountTotal += Number(res.data[i].itemDiscount);
               invoiceTaxTotal += Number(res.data[i].taxItemTotal);
               invoiceNetTotal += Number(res.data[i].itemNetTotal);
       //        vID++;
        //       newData[i].id = vID;
             }
             setData(res.data);

              onSearchVoucher(res.data[0].voucherNo);
              onSearch(res.data[0].customerID);
            //  alert(res.data[0].voucherNo);
             //    format(curr, "dd/MM/yyyy"
       } else {
         alert("Invalid Sales Invoice No.");
         return false;

       }
      });

    // alert(customerID)
    Axios
    .get(url + `/loadInvoiceTransaction`,
    {
      params: {
        companyID: companyID,
        pur_sal: 'S',
        supplierID: supplierID,
        invoiceNo: invoiceNo,
      }
    }
    ).then(res => {
    //  alert(res.data.length);
    if (res.data.length >0) {
    // check whether this invoice got cr/dr note or payment
    for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].invType === 'SCN' || res.data[i].invType === 'SDN' || res.data[i].invType === 'SPY') {
          alert('Unable to Process Editing because Sale Invoice No.'+invoiceNo+' already have Credit/Debit/Payment Transaction')
        //  allowEdit=false;
           return (window.location.href='/salesInvoiceEdit') ;

        }
    }
    }
    })
   // alert(voucherNo);
   // onSearchVoucher(voucherNo);
 /*
     Axios
     .get(url + `/supplierSearch`,
       {
         params: {
           companyID: companyID,
           supplierID: customerID,
         }
       }
     )
     .then(res => {
       if (res.data.length > 0) {
         custGlNo = res.data[0].glNo;
         custGlSub = res.data[0].glSub;
         alert(custGlNo+ ' - '+custGlSub);
      //  setCustomerInfo(res.data);
       //  alert(customerInfo[0].supplierName);
        //  setDueDate(format(date, "dd/MM/yyyy"));
       }
      });
  */
 //}


  };

  // on Save Purchase Invoice and Voucher *******************


  const onSearchVoucher = async (e) => {

    // if (txnDate === 'null') {
   //   alert('No Date Selected');
   //   return false;
      // setTxnDate(todayDate);
   // }
 //  alert(e);
//    let cYear = new Date(txnDate).getFullYear();
 //   let cMonth = (new Date(txnDate).getMonth()) + 1;

    //     alert(String(cYear).slice(-2));
    //  alert(("0"+String(cMonth)).slice(-2));
//    let jvDate = String(cYear).slice(-2) + ("0" + String(cMonth)).slice(-2);
    //  alert(jvDate);
    //  sessionStorage.setItem('invoiceNo',invoiceNo);
    //   sessionStorage.setItem('voucherNo',voucherNo);
    //   sessionStorage.setItem('txnDate',txnDate);

    Axios
      .get(url + `/voucherList`,
        {
          params: {
            companyID: companyID,
            voucherNo: e,
          }
        }
      )
      .then(res => {
        if (res.data.length > 0) {

            totalDrAmt = 0;
            totalCrAmt = 0;
            for (let i = 0; i < res.data.length; i++) {
               totalDrAmt+=Number(res.data[i].drAmt) ;
               totalCrAmt+=Number(res.data[i].crAmt);
            }
            setVoucherData(res.data);
 //alert(totalDrAmt);
        } else {
       //    alert('Invalid Voucher No. '+voucherNo) ;
           return false;

        }

      }, []);

  };

  const onSearchProduct = async () => {
    //  alert(productID);
    if (productID === '*') {
      setProductName('');
      setUnit('unit');
      setSalesQuantity(1.000);
      allowEditProduct = false;
      inputRefProductName.current.focus();
      return true;
    }
    allowEditProduct= true;

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
          setUnitPrice(res.data[0].unitPrice.toFixed(2));
          setCost(res.data[0].cost.toFixed(2));
          inputRefQty.current.focus();
        } else {

          Axios
          .get(url + `/ProductList`,
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
          } )




        }




        }, []);


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
        <div className="col-sm-12 btn btn-success" style={{ marginTop: '1px' }}>
          Sales Invoice Editing
        </div>
      </div>


      <div style={{
        display: 'inline-block',
        width: '1520px',
        height: '90px',
        margin: '6px',
        backgroundColor: 'white',
        border: '4px solid grey',
      }}
      >
         <p></p>
        <label style={{ paddingLeft: "0px" }} >
        <a style={{ marginLeft: '.5rem', marginRight: '.2rem' }}> Sales Invoice No. : </a>
        <input
          type="text"
          style={{ width: '100px', border: '1px solid #696969' }}
          value={invoiceNo}
          name="invoice"
          class="text-uppercase"
          onChange={(e) => formatInputInvoiceNo(e)}
          required
        />

 <button
            style={{ padding: '6px' }}
            type='button'
            class='btn btn-primary fa fa-search float-right'
            onClick={() => onSearchInvoice()}
          ></button>


          <a style={{ marginLeft: '1rem', marginRight: '.7rem' }}> Customer ID : </a>
          <input
            type="text"
            style={{ width: '200px', border: '1px solid #696969' }}
            value={supplierID}
            name="supplier"
            class="text-uppercase"
            onChange={(e) => formatInputSupplierID(e)}
            required
            readOnly = {true}
          />

          <a style={{ marginLeft: '3.6rem', marginRight: '0.7rem' }} >Customer Name : </a>

          <input
            type="text"
            style={{ width: '600px' }}
            value={supplierName}
            name="supplierName"
            readOnly={true}
            required
          />



        </label>










      <label style={{ paddingLeft: "10px" }} >

      <a style={{  marginRight: '2.3rem' }} >Invoice Date : </a>
        <input
          type="date"
          maxLength={10}
          value={txnDate}
          style={{ width: '8%', border: '1px solid #696969' }}
          //  defaultValue = {txnDate}
          name="txnDate"
          onChange={(e) => formatInputDate(e)}
          required
        />


<a style={{ marginLeft: '1.7rem', marginRight: '4.5rem' }}>Term :</a>
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

<a style={{ marginLeft: '10.5rem', marginRight: '3.7rem' }} >Due Date : </a>
        <input
          type="date"
          maxLength={10}
          value={dueDate}
          style={{ width: '8%', border: '1px solid #696969' }}
          name="dueDate"
          onChange={(e) => formatInputDueDate(e)}
          required
        />

        <a style={{ marginLeft: '7rem', marginRight: '.2rem' }}> Sales Rep. : </a>
        <input
          type="text"
          style={{ width: '150px', border: '1px solid #696969' }}
          value={salesRep}
          name="salesrep"
          maxLength={15}
          onChange={(e) => formatInputRep(e)}
          readonly={false}
        />


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
                <td style={{ textAlign: 'right', backgroundColor: '#75bc7e' }}>{parseFloat(item.salesQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'center' }}>{item.unit}</td>
                <td style={{ textAlign: 'center', backgroundColor: '#75bc7e' }}>{item.taxType}</td>
                <td style={{ textAlign: 'right' }}>{parseFloat(item.itemTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'right', backgroundColor: '#75bc7e' }}>{parseFloat(item.itemDiscount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right" }}>{parseFloat(item.taxItemTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
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
             <td></td>
             <td></td>

          </tfoot>
        </table>

        <div>

        </div>


        <p></p>


        <div
        style={{
        display: 'inline-block',
        width: '1520px',
        height: '210px',
        margin: '6px',
        backgroundColor: 'white',
        border: '4px solid grey',
        }}>


        <label style={{ paddingLeft: "10px" }} >
          <a style={{ marginRight: '1.4rem' }}> Product ID : </a>


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

          <a style={{ marginLeft: '2rem', marginRight: '.6rem' }}> Product Name : </a>

          <input
            type="text"
            style={{ width: '600px' }}
            value={productName}
            name="productName"
            onChange={(e) => formatInputProductName(e)}
            ref={inputRefProductName}
            readOnly={allowEditProduct}
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





        <p></p>
        <label style={{ paddingLeft: '10px' }}>
          <a style={{ marginRight: '.05rem' }}> Tax Selection : </a>
          <select value={id} onChange={(e) => handleChangeTax(e)}>
            {taxData.map((item) => (
              <option value={item.id} required> (ID-{item.taxID}) (Type-{item.taxType}) (Code-{item.taxCode}) (Description-{item.taxDescription}) (Rate-{item.taxRate}%)</option>
            ))}

          </select>


        </label>

        <label style={{ paddingLeft: "10px" }}>
          <a > Sales Quality : </a>
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

          <a style={{ marginLeft: '1rem', marginRight: '.6rem' }}> Unit Price : </a>
          <input
            type="number"
            style={{ width: '100px', border: '1px solid #696969' }}
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

<a style={{ marginLeft: '.5rem', marginRight: '.6rem' }}>Discount :</a>


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





          <a style={{ marginLeft: '.6rem', marginRight: '.4rem' }}> Item Tax : </a>
          <input
            type="number"
            style={{ width: '100px', border: '1px solid #696969' }}
            value={itemTax}
            name="itemTax"
            onBlur={(e) => formatInputTax(e)}
            onChange={(e) => handleInputChangeTax(e)}
            maxLength={13}
          />

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



<label style={{ paddingLeft: "10px" }} >
<a style={{ marginLeft: '.2rem', marginRight: '.8rem' }}> Remark #1 : </a>
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark1}
  name="remark1"
  onChange={(e) => formatInputRemark1(e)}
  maxLength={200}
/>
<a style={{ marginLeft: '.2rem', marginRight: '.5rem' }}> Remark #2 : </a>
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark2}
  name="remark2"
  onChange={(e) => formatInputRemark2(e)}
  maxLength={200}
/>
</label>

<label style={{ paddingLeft: "10px" }} >
<a style={{ marginLeft: '.2rem', marginRight: '.8rem' }}> Remark #3 : </a>
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark3}
  name="remark3"
  onChange={(e) => formatInputRemark3(e)}
  maxLength={200}
/>
<a style={{ marginLeft: '.2rem', marginRight: '.5rem' }}> Remark #4 : </a>
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark4}
  name="remark4"
  onChange={(e) => formatInputRemark4(e)}
  maxLength={200}
/>
</label>
<label style={{ paddingLeft: "10px" }} >
<a style={{ marginLeft: '.2rem', marginRight: '.8rem' }}> Remark #5 : </a>
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark5}
  name="remark5"
  onChange={(e) => formatInputRemark5(e)}
  maxLength={200}
/>
<a style={{ marginLeft: '.2rem', marginRight: '.5rem' }}> Remark #6 : </a>
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark6}
  name="remark6"
  onChange={(e) => formatInputRemark6(e)}
  maxLength={200}
/>
</label>
<label style={{ paddingLeft: "10px" }} >
<a style={{ marginLeft: '.2rem', marginRight: '.3rem' }}> Reason Edit : </a>
<input
  type="text"
  style={{ width: '600px', border: '1px solid #696969' }}
  value={remark}
  name="remark"
  onChange={(e) => formatInputRemark(e)}
  maxLength={200}
/>
</label>

        <p></p>


        <p></p>
        <td></td>

        <td><button style={{ backgroundColor: "green", color: "white", width: '250px', marginLeft: '10rem' }} onClick={() => onPrintSalesInvoice()}>Print Sales Invoice </button></td>
        <td><button style={{ backgroundColor: "blue", color: "white", width: '250px' }} onClick={() => onNew()}>New Sales Invoice </button></td>
        <td><button style={{ backgroundColor: "grey", color: "white", width: '100px' }} onClick={() => handleHome()}>Home</button></td>
        <td><button style={buttonStyle} type="button" onClick={onAddSalesInvoice}>Add Sales Item </button> </td>
        <p></p>
        <p></p>
        <div></div>
     </div>
        <p></p>
        <p></p>

        <div className="row">
        <p></p>
        <p></p>
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





        <div
        style={{
        display: 'inline-block',
        width: '1520px',
        height: '130px',
        margin: '6px',
        backgroundColor: 'white',
        border: '4px solid grey',
        }}>
        <p></p>
          <label style={{ paddingLeft: '10px' }}>
            <a style={{ marginRight: '1rem' }}> Voucher No. : </a>
            <input
              type="text"
              value={voucherNo}
              name="voucher"
              style={{ width: '200px', border: '1px solid #696969' }}
              class="text-uppercase"
              ref={inputRef}
              onChange={(e) => formatInputVoucherNo(e)}
              readOnly={true}
              required
            />


            <a style={{ marginLeft: '2rem', marginRight: '.8rem' }}> G/L Selection : </a>
            <select value={ID} onChange={(e) => handleChangeGl(e)}>
              {glData.map((item) => (
                <option value={item.id} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
              ))}

            </select>



            <label style={{ paddingLeft: '0px' }}>
              <a style={{ marginRight: '0rem' }}> Debit Amount : </a>
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
              <a style={{ marginLeft: '2rem', marginRight: '.4rem' }}> Credit Amount : </a>
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


            <td><button style={{ backgroundColor: "green", color: "white", width: '200px', marginLeft: '10rem' }} onClick={() => onPrint(voucherData, totalDrAmt, totalCrAmt)}>Print Voucher</button></td>
            <td><button style={{ backgroundColor: "red", color: "white", width: '400px' }} onClick={() => onSave(voucherData, totalDrAmt, totalCrAmt)}>Save Sales Invoice and Voucher</button></td>
            <td><button style={{ backgroundColor: "cyan", color: "black", width: '230px' }} onClick={() => onAddVoucher()}>Add Voucher Item</button></td>

          </label>
        </div>
        <p></p>
        <p></p>

        <div className='row' style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} /></div>

      <div className="row">

        <div className="col-sx-12 btn btn-secondary" style={{ marginTop: '1px' }}>
          Product Selection
           <a> <button style={{float: 'right'}} onClick={() => handleCancelProduct()}>Clear Product</button></a>
        </div>

        <span class="square border border-dark"></span>

<BootstrapTable bootstrap4 keyField='id' data={productData} columns={productColumn}
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

export default SalesInvoiceEdit;
