import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
import ReactDOM from "react-dom";
import generatePDF from "./reportGenerator";
import { format } from "date-fns";
import moment from 'moment';
import {SelectSupplierCustomer} from "./selectSupplierCustomer";


import Tooltip from "@material-ui/core/Tooltip";
//import Pagination from "./Pagination";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { SettingsBackupRestoreRounded } from '@material-ui/icons';

//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');


const options= ['Supplier','Customer'];

// const userLevel = localStorage.getItem('userLevel');
 var glData = [];
 var catData = [];
  var stockData = [];
  var taxData = [];
  var locData = [];
  var voucherData = [];
var taxID = '';
var taxType = '';
var taxCode ='';
 var taxRate = 0;
 var glNo='';
 var department = '';
 var glDescription = '';
 var InvEdit = false;
 var glSub= ''
 var department = '';
 var glName = '';
 var glType = '';
 var totalDrAmt = 0;
 var totalCrAmt = 0;
 var custData = [];
 var acctType='SUPP';
 var productID = '';
 var stockID = 0 ;
 var supplierID = '';
 var supplierName = '';
 var paymentTerm = 0;
 var taxTotal = 0;
 var invoiceTotal = 0;
 var invoiceDiscountTotal = 0;
 var invoiceTaxTotal= 0;
 var invoiceNetTotal =0;
 var TotalDrAmt = 0;
 var TotalCrAmt = 0;
 var pur_id = 0;
 var vouch_id = 0;
 var invEdit = false;
 var lEdit = true;
 var vouchEdit = false;
 var lEdit = true;
 var taxRemark = '';
 var productEdit = true;
 var taxDescription = '';
 var locationID = '';
 var custGlNo='';
var custGlSub = '';
var purType = [
    {label: 'Purchase Item',
     value: 'PUR',
    },
     {label: 'FOC Item',
      value: 'FOC',
     },
];

 var curr = new Date();
 curr.setDate(curr.getDate());
 var todayDate = curr.toISOString().substr(0,10);
  var vid =0 ;
  var glID=0;
var lastSix = '';
var lRead = false;

var iRead = false;
//sessionStorage.setItem('voucherNo', '');
//sessionStorage.setItem('invoiceNo','');
//sessionStorage.setItem('invData', []);

function PurchaseInvoice() {
    const [acctType, setAcctType] = useState('SUPP');
    const [data, setData] = useState([]);
    const [id, setTax] = useState('');
     const [ID, setGlID] = useState('');
     const inputRefQty = useRef(null);
     const [voucherData, setVoucherData] = useState([]);
     const [custData, setCustData] = useState([]);
     const [productData, setProductData] = useState([]);

  // const [custData, setCustData] = useState([]);
    const [supplierID, setSupplierID] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [paymentTerm, setPaymentTerm] = useState("");
    const [productID, setProductID] = useState("");
    const [barcode, setBarcode] = useState("");
    const [unit, setUnit] = useState("");
    const [productName, setProductName] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [purchaseQuantity, setQuantity] = useState(0.000);
    const [itemTaxTotal, setItemTaxTotal] = useState(0.00);
    const [itemTotal, setItemTotal] = useState(0.00);
    const [purchaseQty, setPurchaseQty] = useState(0.000);
    const [itemTax, setItemTax] = useState(0.00);
    const [itemDiscount, setItemDiscount] = useState(0.00);
    const [itemNetTotal, setItemNetTotal] = useState(0.00);
    const [invType, setInvType] = useState('PUR');
    const [companyInfo, setCompanyInfo] = useState([]);
    const [customerInfo, setCustomerInfo] = useState([]);

    const [dueDate, setDueDate] = useState('');
    const [drAmt, setDrAmt] = useState('');
    const [crAmt, setCrAmt] = useState('');

    //const [TotalDrAmt, setDrAmtTotal] = useState();
   // const [TotalCrAmt, setCrAmtTotal] = useState();


  const [txnDate, setTxnDate] = useState(todayDate);
    const [jeParticular, setPart] = useState("");
    const [voucherNo, setVoucherNo] = useState("");
    const [invoiceNo, setInvoiceNo] = useState('');
    const inputReference = useRef(null);
    const inputRef = useRef(null);
    const inputProductName = useRef(null);
    const inputRefVoucher = useRef(null);
    const mystyle = {
        align:"left",

    };
   // alert(txnDate);
   if (txnDate === null ) {
    setTxnDate(todayDate);
   }
  // alert(txnDate);
    const body = {
        companyID : companyID,

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
        fontFamily: "Arial",todayDate,
      };

      useEffect(() => {

      //  ReactTooltip.show(inputRef.current);

    //    setSupplierID(localStorage.getItem('supplierID'));
     //   setSupplierName(localStorage.getItem('supplierName'));
     //   setPaymentTerm(localStorage.getItem('paymentTerm'));
     //   setProductID(localStorage.getItem('productID'));
     //   setProductName(localStorage.getItem('productName'));
     //   setBarcode(localStorage.getItem('barcode'));
     //   setUnit(localStorage.getItem('unit'));

      //    setVoucherNo(sessionStorage.getItem('voucherNo'));
      //    setInvoiceNo(sessionStorage.getItem('invoiceNo'));
      //    setTxnDate(sessionStorage.getItem('txnDate'));
      //     const newData= JSON.parse(localStorage.getItem('invData'));
       //   setData(sessionStorage.getItem('invData'));
        //  alert(newData);
      //    if (newData) {
     //        setData(newData);
     //     }
       // alert(txnDate);
      //  loadSupplier('SUPP');
     // setInvType('FOC');
     // alert(invType);

            Axios
        .get(url+`/glList`,
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
              glSub =  glData[0].glSub;

              glName = glData[0].glName;
              department = glData[0].department;
              glDescription = glData[0].glDescription;
              glType = glData[0].glType;





    });

    Axios
    .get(url+`/taxList`,
          {
           params: {
                   companyID: companyID,
                   taxType: 'OUTPUT',
                   taxSST: 'SST',
                  }
          }
        )
        .then(res => {
            taxData = res.data;
            if (taxData.length > 0) {
            taxID=taxData[0].taxID;
            taxType=taxData[0].taxType;
            taxCode=taxData[0].taxCode;
            taxRate=taxData[0].taxRate;
            taxRemark=taxData[0].remark;
            taxDescription = taxData[0].taxDescription;
            taxRemark = taxData[0].remark;
             setTax(taxData[0].id);
         //   alert(taxRate);
        } else {
          taxID = '';
          taxType= '';
          taxCode = '';
          taxRate = 0;
          alert('Government Tax is not defined');

        }
        });

    }, []);

    const handleSelectProduct = (ID, pBarcode, name, Punit, price) => {
      // alert(price);
     // item.productID, item.productName, item.taxID, item.unit, item.unitPrice, item.purchaseQty
      setProductID(ID);
      setProductName(name);
      setUnit(Punit);
      setBarcode(pBarcode);
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


           setCustData(res.data);

       });
    };

 const handleSuppChange= () => {
      setAcctType('SUPP');
  //    alert("SUPP");
      loadSupplier('CUST');
 };
 const handleCustChange= () => {
    setAcctType('CUST');
 //   alert("CUST");
    loadSupplier('SUPP');
};

const handleChangeProduct= async(e) => {
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

const handleChangeTax= async(e) => {
    let ID = Number(e.target.value);
  // alert(ID);
 //  setTax(ID);
 //     alert(id);

     for (let i = 0; i < taxData.length; i++) {
        if (taxData[i].id === ID) {

            setTax(taxData[i].id);
            taxID=taxData[i].taxID;
             taxRate=taxData[i].taxRate;
             taxType=taxData[i].taxType;
             taxCode=taxData[i].taxCode;
             taxRemark=taxData[i].remark;
             taxDescription=taxData[i].taxDescription;

         //   alert(taxData[i].taxID);
         //   alert(taxID);
        }
     }
    // alert(typeof taxRate);
    // alert(taxRate);
     calculateTotal();
};

const handleChangeLoc= async(e) => {
  //  let ID = Number(e.target.value);
   // setLocationID(e.target.value);
   // alert(locationID);


};

const handleChangeType= async(e) => {
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

const handleChangeGl= async(e) => {
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
        glNo=glData[i].glNo;
        glSub=glData[i].glSub;
        glType=glData[i].glType;
        department=glData[i].department;
        glName=glData[i].glName;
        glDescription= glData[i].glDescription;
        glID=glData[i].id;
    }
  //  alert(glNo+glSub);
}

//   alert(glNo+glSub) ;

};

const formatInputDate = async(e) => {
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
const formatInputDiscount = async(e) => {
    let num = e.target.value
    if (num === '') {
       num=0;
   }
    setItemDiscount(parseFloat(num).toFixed(3));

calculateTotal();
};
const formatInputVoucherNo = async(e) => {
  e.preventDefault();
 // const cName = e.target.name;
  console.log(e.target.name);
 // e.target.value.replace(/[^a-z0-9\s]/gi, '');
  console.log(e.target.value.toUpperCase());
   setVoucherNo(e.target.value.toUpperCase());
//alert(voucherNo);

};
const formatInputSupplierID = async(e) => {
    e.preventDefault();
   // const cName = e.target.name;
    console.log(e.target.name)
   // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
     setSupplierID(e.target.value.toUpperCase());


  };

  const formatInputProductID = async(e) => {
    e.preventDefault();
   // const cName = e.target.name;
    console.log(e.target.name)
   // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
     setProductID(e.target.value.toUpperCase());


  };

  const formatInputProductName = async(e) => {
    e.preventDefault();
   // const cName = e.target.name;
    console.log(e.target.name)
   // e.target.value.replace(/[^a-z0-9\s]/gi, '');
  //  alert(e.target.value);
     setProductName(e.target.value);


  };

const formatInputInvoiceNo = async(e) => {
    e.preventDefault();
   // const cName = e.target.name;
    console.log(e.target.name);
   // alert(e.target.value);
   // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
     setInvoiceNo(e.target.value.toUpperCase());


  };
const handleRemove = async(id) => {


  const newData = [...data];
  const index = newData.findIndex((data) => data.id === id) ;

      if (index !==-1) {
       newData.splice(index, 1);
       setData(newData);
      }

     // alert(newData.length);


      invoiceTotal=0;
      invoiceDiscountTotal=0;
      invoiceTaxTotal=0;
      invoiceNetTotal=0;
       let vID =0;
      for (let i = 0; i < newData.length; i++) {
        //   alert(newDatas[i].itemTotal);
        invoiceTotal+=Number(newData[i].itemTotal);
        invoiceDiscountTotal+=Number(newData[i].itemDiscount);
        invoiceTaxTotal+=Number(newData[i].itemTax);
        invoiceNetTotal+=Number(newData[i].itemNetTotal);
        vID++;
        newData[i].id = vID;
      }
    };

    const handleRemoveVoucher = async(id) => {


      const newData = [...voucherData];
      const index = newData.findIndex((voucherData) => voucherData.id === id) ;

          if (index !==-1) {
           newData.splice(index, 1);
           setVoucherData(newData);
          }

         // alert(newData.length);


          totalDrAmt=0;
          totalCrAmt=0
           let vID =0;
          for (let i = 0; i < newData.length; i++) {
            //   alert(newDatas[i].itemTotal);
            totalDrAmt+=Number(newData[i].drAmt);
            totalCrAmt+=Number(newData[i].crAmt);

            vID++;
            newData[i].id = vID;
          }
        };

    const onAddVoucher = () => {

      if (voucherNo === '' || voucherNo === null)  {
        alert("Journal Voucher No. cannot be blank")
        return false;
      };

        for (let i = 0; i < voucherNo.length; i++) {
            if (voucherNo.substr(i,1) === ';') {
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

        if (Number(drAmt) >0 && Number(crAmt) > 0) {
          alert("Debit or Credit Amount can only key in either one");
          return false;
        }
       //  setDrAmt('0.00');
        // alert(drAmt) ;


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
    //    alert(glNo);
      vid = vid+1;
       const newData={
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
       if (newData.drAmt === '') {
          newData.drAmt = '0.00';
       }
       if (newData.crAmt === '') {
        newData.crAmt = '0.00';
     }

      const newDatas = [...voucherData, newData];
      //data=e.target.value;
      //data = newDatas
       totalDrAmt=0;
       totalCrAmt=0;

      for (let i = 0; i < newDatas.length; i++) {
         // alert(newDatas[i].crAmt);
       totalDrAmt+=Number(newDatas[i].drAmt);
       totalCrAmt+=Number(newDatas[i].crAmt);
      //  alert(TotalCrAmt);
        newDatas[i].id = i+1;

        newDatas[i].totalDrAmt=parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        newDatas[i].totalCrAmt=parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
       // setVoucherData(newDatas);

   //    alert(newDatas[i].glNo);
      }
      setVoucherData(newDatas);
      setVoucherData(newDatas);
        //  alert(voucherData[0].glSub);

       let drTotal= parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1,');
       let crTotal= parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1,');
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
 const onAddPurchaseItem = () => {
  // e.preventDefault();
//  alert(voucherNo);
  if (voucherNo === '' || voucherNo === null)  {
    alert("Journal Voucher No. cannot be blank")
    return false;
  };

    for (let i = 0; i < voucherNo.length; i++) {
        if (voucherNo.substr(i,1) === ';') {
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
//alert(productID);
if (productID === '' || productID === null) {
alert("No Product selected");
return false;
 };

 if (invoiceNo === '' || invoiceNo === null) {
  alert("Invoice No. cannot be blank");
  return false;
   };

 if (purchaseQty === 0) {
    alert('Purchase Quantity cannot be ZERO');
    return false;
 }

 if (invType === 'PUR') {
    calculateTotal();
  //  alert(typeof unitPrice);
    if (Number(unitPrice) === 0) {
        alert('Unit Price cannot be ZERO in purchase item');
        return false;
    }
   //  alert(taxRate);
    if (taxRate > 0) {
        if (Number(itemTax) ===0) {
            alert('Tax cannot be ZERO');
            return false
        }

    };

 }
// if purchase item edited
 if (invEdit) {
    const newDatas = [...data];
  for (let i = 0; i < newDatas.length; i++) {
    if (newDatas[i].id === pur_id) {
      newDatas[i].voucherNo= voucherNo;
      newDatas[i].companyID = companyID;
      newDatas[i].supplierID = supplierID;
      newDatas[i].supplierName = supplierName;
      newDatas[i].invoiceNo = invoiceNo;
      newDatas[i].productID= productID;
      newDatas[i].barcode= barcode;
      newDatas[i].productName= productName;
      newDatas[i].txnDate = txnDate;
      //purchaseQty: parseFloat(purchaseQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      newDatas[i].purchaseQty= purchaseQty;
      newDatas[i].unit= unit;
      newDatas[i].unitPrice= unitPrice;
      newDatas[i].itemTotal= itemTotal;
      newDatas[i].itemDiscount= itemDiscount;
      newDatas[i].itemTax= itemTax;
      newDatas[i].itemNetTotal= itemNetTotal;
      newDatas[i].invType= invType;
      newDatas[i].taxID= taxID;
      newDatas[i].taxType= taxType;
      newDatas[i].taxCode= taxCode;
      newDatas[i].taxRate = taxRate;
      newDatas[i].locationID= locationID;
      newDatas[i].remark = taxRemark;
      newDatas[i].taxDescription = taxDescription;
      newDatas[i].paymentTerm = paymentTerm;
      newDatas[i].dueDate=dueDate;

     //  alert(newDatas[i].id);

    }

}


setData(newDatas);
invEdit = false;
 } else {
vid = vid+1;
 const newData={
  id: vid,
  voucherNo: voucherNo,
  companyID: companyID,
  supplierID: supplierID,
  supplierName: supplierName,
  invoiceNo: invoiceNo,
  productID: productID,
  barcode: barcode,
  productName: productName,
  txnDate: txnDate,
  //purchaseQty: parseFloat(purchaseQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
  purchaseQty: purchaseQty,
  unit: unit,
  unitPrice: unitPrice,
  itemTotal: itemTotal,
  itemDiscount: itemDiscount,
  itemTax: itemTax,
  itemNetTotal: itemNetTotal,
  invType: invType,
  taxID: taxID,
  taxType: taxType,
  taxCode: taxCode,
  taxRate: taxRate,
  locationID: locationID,
  remark: taxRemark,
  taxDescription: taxDescription,
  paymentTerm: paymentTerm,
  dueDate: dueDate,
 };

// alert(invType);

const newDatas = [...data, newData];
//data=e.target.value;
//data = newDatas
 invoiceTotal=0;
 invoiceDiscountTotal=0;
 invoiceTaxTotal=0;
 invoiceNetTotal=0;

for (let i = 0; i < newDatas.length; i++) {
 //   alert(newDatas[i].itemTotal);
 newDatas[i].voucherNo=voucherNo;
 newDatas[i].txnDate = txnDate;
 invoiceTotal+=Number(newDatas[i].itemTotal);
 invoiceDiscountTotal+=Number(newDatas[i].itemDiscount);
 invoiceTaxTotal+=Number(newDatas[i].itemTax);
 invoiceNetTotal+=Number(newDatas[i].itemNetTotal);
  newDatas[i].id = i+1;
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

  setUnitPrice(0);
 // setQuantity(0);
 // setItemTaxTotal(0);
  setItemTotal(0);
  setPurchaseQty(0);
  setItemTax(0);
  setItemDiscount(0);
  setItemNetTotal(0);
  setProductID('');
  setProductName('');
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
       setPurchaseQty(newData[i].purchaseQty);
       setUnitPrice(newData[i].unitPrice);
       setItemTotal(newData[i].itemTotal);
       setItemDiscount(newData[i].itemDiscount);
       setItemTax(newData[i].itemTax);
        setItemNetTotal(newData[i].itemNetTotal);
    //    setLocationID(newData[i].locationID);
     //  alert(newData[i].invType);

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


const onPrint = async (voucherData, drTotal, crTotal) => {


       console.log(voucherData);
       if (voucherData.length === 0) {
        alert("No Voucher No. provided")
        return false;
       }


      if(voucherNo === null || voucherNo === ''){
          alert("No Voucher No. provided")
       return false;
      }

     // let totalDr = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
     // let totalCr = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

     //  voucherData[0].totalDrAmt = totalDr;
     //  voucherData[0].totalCrAmt = totalCr;

    for (var i = voucherData.length-1; i >= 0; i--) {


       let date = txnDate;
                          // alert(dlData[0].txnDate);
                         // const [txnDate, setTxnDate] = useState(date);
                          //   todayDate = curr.split("/").reverse().join("-");
     //  let voucherDate = moment(new Date(date)).format("DD/MM/YYYY")
       voucherData[i].txnDate = format(new Date(date), "dd/MM/yyyy") ;
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
      let vid = voucherData.length+1;
      const newData={
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
              {key: 'G/L No.', display: 'glNo'},
              {key: 'G/L Sub', display: 'glSub'},
              {key: 'Department', display: 'department'},
              {key: 'G/L Name', display: 'glName'},
              {key: 'G/L Type', display: 'glType'},
              {key: 'Particular', display: 'jeParticular'},
              {key: 'Dr. Amount', display: 'drAmt'},
              {key: 'Cr. Amount', display: 'crAmt'},
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



  const loadProduct = async(catNo) => {
 // alert(catNo);

      Axios
      .get(url+`/productListByCategory`,
        {
         params: {
                 companyID: companyID,
                 categoryID: catNo,
                }
        }
      )
      .then(res => {

         stockID=0;
         stockData = res.data;
         if (stockData.length > 0) {
            stockID = stockData[0].id;
         }

        //  alert(stockData[0].productName);
     });
  };

const handleChangeSupp= async(e) => {
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

  const onNew = async() => {

   // localStorage.removeItem('supplierID');
   // localStorage.removeItem('supplierName');
   // localStorage.removeItem('paymentTerm');
  //  localStorage.removeItem('productID');
  //  localStorage.removeItem('productName');
  //  localStorage.removeItem('barcode');
  //  localStorage.removeItem('unit');
  //  sessionStorage.removeItem('voucherNo');
  //  sessionStorage.removeItem('invoiceNo');
  //  sessionStorage.removeItem('txnDate');
  //  sessionStorage.removeItem('invData');
  //  localStorage.removeItem('invData');

    setData(...data);
    window.location.href='/purchaseInvoice';
  };
  const handleHome = async() => {

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



    window.location.href='/home';
  };

// on Save Purchase Invoice and Voucher *******************
const onSave = async (voucherData, drTotal, crTotal) => {
   // e.preventDefault();
       console.log(data);

        //  let dueDate=new Date(txnDate);
       //  alert(dueDate);
       //  return false;
        // alert(data[0].taxDescription+ " = "+data[0].remark);
    //   alert(TotalCrAmt);
         if (data.length === 0) {
             alert("No Purchase Invoice available to Save");
             return false;
         }

        if (voucherData.length === 0) {
          alert('No Voucher to save');
          return false
        }
        if (invoiceTotal === 0 ) {
          alert("Purchase Invoice Amount is ZERO");
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
        data[i].taxRate = taxRate;
        data[i].voucherNo = voucherNo;
        data[i].invoiceNo = invoiceNo;
        data[i].supplierID = supplierID;
        data[i].supplierName = supplierName;
        data[i].txnDate = txnDate;
   //   alert(taxData[i].taxID);
   //   alert(taxID);
  }


Axios
  .get(url+`/supplierSearch`,
    {
     params: {
             companyID: companyID,
             supplierID: supplierID,
            }
    }
  )
  .then(res => {
   if (res.data.length === 0) {
        alert('Supplier ID: '+supplierID+' is invalid, please re-enter or press (download) button to search the valid ID');
      return false;
   }
  }, []);

// verify Voucher No
Axios
.get(url+`/voucherVerify`,
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
    alert('Voucher No. '+voucherNo+' already Existed, please re-enter or press (download) button to get the newest running No.')
     return false
  }



}, []);

Axios
.get(url+`/purchaseInvoiceVerify`,
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
 if (res.data === 'Existed') {
    alert('Purchase Invoice No. '+invoiceNo+' already Existed, please re-enter')
     return false
  }



}, []);



//alert(data[0].voucherNo);
/** update purchase Invoice */

Axios
.post(url+'/purchaseInvoice',data



)

.then(res => {


   if (res.data === 'Success') {



   //    window.location.reload(false);
   // window.location.href='journalVoucher';

   };
  //  alert(text);
  }, []);

//alert("here");
//return false;
/** update voucher */
//alert(voucherData[0].glNo);

Axios
.post(url+'/purchaseVoucher', voucherData



)

.then(res => {


   if (res.data === 'Success') {

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

   // setData(...data);
    window.location.href='/purchaseInvoice';

   };
  //  alert(text);
  }, []);




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

// on Save Purchase Invoice and Voucher *******************


    const onSearchVoucher = async (e) => {
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
        //    alert(jvDate);
          sessionStorage.setItem('invoiceNo',invoiceNo);
           sessionStorage.setItem('voucherNo',voucherNo);
           sessionStorage.setItem('txnDate',txnDate);

        Axios
        .get(url+`/lastVoucherNo`,
          {
           params: {
                   companyID: companyID,
                   jvInit: jvDate,
                  }
          }
        )
        .then(res => {
         if (res.data.length > 0) {
             let vNo = res.data[0].jvInit+'-'+String(Number(res.data[0].voucherNo.slice(5))+1);
            setVoucherNo(vNo);

         }else{
          let vNo = jvDate+'-1';
            setVoucherNo(vNo);
         }

  }, []);

      };

    const onSearchProduct = async () => {
      if (productID === '*') {
        setProductName('None Stock Item');
        setUnit('unit');
        productEdit = false;
        inputProductName.current.focus();
        return true;
      }


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
            setBarcode(res.data[0].barcode);
            setUnit(res.data[0].unit);
            setUnitPrice(res.data[0].unitPrice.toFixed(2));
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

      const handleInputChangeTax = async (e) => {
        // alert(event.target.value);
        let num = e.target.value; // .replace(/\+|-/ig, '');;
        //alert(num);


           setItemTax(num);

       };

       const handleInputChangeDiscount= async (e) => {
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


           setPurchaseQty(num);

       };

     const handleInputChangePrice = async (e) => {
         console.log(e.target.value)
          let num = e.target.value

         setUnitPrice(num);
       };

       const handleInputChangeDrAmt = async (e) => {
        console.log(e.target.value)
         let num = e.target.value
         if (num === '' && num === 'NaN') {
          num=0;
      }
        setDrAmt(num);

      };
      const handleInputChangeCrAmt = async (e) => {
        console.log(e.target.value)
         let num = e.target.value
         if (num === '' && num === 'NaN') {
             num=0;
         }
        setCrAmt(num);
      };


     const formatInputQty = async (e) => {
         let num = e.target.value
         if (num === '') {
            num=0;
        }
         setPurchaseQty(parseFloat(num).toFixed(3));
         calculateTotal();

       };

     const formatInputPrice = async (e) => {
        let num = e.target.value
        if (num === '') {
            num=0;
        }
        setUnitPrice(parseFloat(num).toFixed(3));
        calculateTotal();
       };
       const formatInputDrAmt = async (e) => {
        let num = e.target.value
        if (num === '') {
            num=0;
        }
        setDrAmt(parseFloat(num).toFixed(2));

       };

       const formatInputCrAmt = async (e) => {
        let num = e.target.value
        if (num === '') {
            num=0;
        }
        setCrAmt(parseFloat(num).toFixed(2));

       };
       const formatInputTax = async (e) => {
        let num = e.target.value
        if (num === '') {
            num=0;
        }
        setItemTax(parseFloat(num).toFixed(2));
        calculateTotal();
       };

       const calculateTotal = async(e) => {
        let iTotal = Number(purchaseQty) * Number(unitPrice);
        let netTotal = iTotal - Number(itemDiscount) + Number(itemTax);
      //  alert(itemDiscount);
      //  alert(itemTax);


       if (invType === 'PUR') {

        setItemTotal(parseFloat(iTotal).toFixed(2));
        setItemNetTotal(parseFloat(netTotal).toFixed(2));

       } else {

         netTotal =0;
        setItemTotal(parseFloat(iTotal).toFixed(2));
        setItemNetTotal(parseFloat(netTotal).toFixed(2));
       }

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

        <p></p>
          <div className="row">
          <div className="col-sm-12 btn btn-success" style={{marginTop: '1px'}}>
              Purchase Invoice Entry
           </div>
           </div>


           <div style={{
        display: 'inline-block',
        width: '1520px',
        height: '120px',
        margin: '6px',
        backgroundColor: 'white',
        border: '4px solid grey',
      }}
      >
         <p></p>
           <label style={{ paddingLeft: "10px"}} >
           <a style={{ marginRight: '.7rem' }}> Supplier ID : </a>
      <Tooltip
        title="Key in a valid Supplier ID"
        placement="top"
      >   
           <input
             type="text"
             style={{width: '200px', border: '1px solid #696969' }}
             value={supplierID}
             name="supplier"
             class="text-uppercase"
             onChange={(e) => formatInputSupplierID(e)}
             required
              />
</Tooltip>
    <Tooltip
        title="Click to load Supplier information"
        placement="top"
      >  
 
              <button
              style = {{padding: '6px'}}
              type='button'
              onClick={() => onSearch()}
              >
       <i class="btn btn-primary fa fa-search"></i>    
              </button>
</Tooltip>



              <a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Supplier Name :</a>

              <input
              type="text"
              style={{width: '800px', border: '1px solid #696969' }}
              value={supplierName}
              name="supplierName"
              readOnly = {true}
              required
               />
               <a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Term :</a>
               <input
               type='number'
               style={{width: '90px',  border: '1px solid #696969'}}
               value={paymentTerm}
               name='term'
               onChange={(e) => handleInputChangeTerm(e)}
               placeholder="0"
              step='1'
               required
               />


           </label>










         <label style={{ paddingLeft: "10px"}} >

         <a style={{ marginRight: '.9rem' }}>Invoice No. :</a>

           <input
             type="text"
             value={invoiceNo}
             name="invoice"
             style={{width: '245px', border: '1px solid #696969'}}
             class="text-uppercase"
             onChange={(e) => formatInputInvoiceNo(e)}
             readOnly={iRead}
             required
           />


         <a style={{ marginLeft: '.5rem', marginRight: '1.6rem' }}>Invoice Date :</a>
          <input
            type="date"
            maxLength={10}
            value={txnDate}
            style={{width: '10%', border: '1px solid #696969'}}
          //  defaultValue = {txnDate}
            name="txnDate"
            onChange={(e) => formatInputDate(e)}
            required
          />
          </label >
           <label style={{paddingLeft: '10px'}}>
          Tax Selection :
          <select value={id} onChange={(e) => handleChangeTax(e)}>
           {taxData.map((item) => (
             <option value={item.id} required> (ID-{item.taxID}) (Type-{item.taxType}) (Code-{item.taxCode}) (Description-{item.taxDescription}) (Rate-{item.taxRate}%)</option>
          )) }

          </select>


        </label>
       </div>


   <div className="select-container" >



<p></p>


        <table class="table" style={{paddingTop: '1px', border: '1px solid black'}}>
            <thead class="thead-dark" >
                <tr style={{align: 'left'}}>
                <th style={{backgroundColor: 'yellow', width: '.5px', textAlign: 'left'}}>#</th>
                <th style={{backgroundColor: '#999999', width: '1px', textAlign: 'left'}}>Product</th>
                <th style={{backgroundColor: 'yellow', width: '300px', textAlign: 'left' }}>Product Name</th>
                <th style={{backgroundColor: '#999999', width: '20px', textAlign: 'right'}}>Quantity</th>
                <th style={{backgroundColor: 'yellow', width: '1px', textAlign: 'left'}}>Unit</th>
                <th style={{backgroundColor: '#999999', width: '40px', textAlign: 'left'}}>Type</th>
                <th style={{backgroundColor: 'yellow', width: '40px', textAlign: 'right'}}>Cost</th>
                <th style={{backgroundColor: '#999999',width: '160px', textAlign: 'right'}}>Item Amount</th>
                <th style={{backgroundColor: 'yellow',width: '50px', textAlign: 'right'}}>Discount</th>
                <th style={{backgroundColor: '#999999',width: '1px', textAlign:'right'}}>Tax</th>
                <th style={{backgroundColor: 'yellow', width: '130px', textAlign: 'right'}}>Item Total</th>
                <th style={{backgroundColor: '#999999', width: '20px', textAlign: 'left'}}>Tax ID</th>
                <th style={{backgroundColor: 'blue', textAlign: 'center', color: 'white', width: '10px'}}>Select</th>
                </tr>
            </thead>
            <tbody style={mystyle} >
                {data.map(item => {
                 return <tr key={item.id}>
                    <td>{item.id}</td>

                    <td style={{backgroundColor: '#999999'}}>{item.productID}</td>
                    <td style={{textAlign: 'left'}}>{item.productName}</td>
                    <td style={{textAlign: 'right', backgroundColor: '#999999'}}>{parseFloat(item.purchaseQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                    <td style={{textAlign: 'left'}}>{item.unit}</td>
                    <td style={{textAlign: 'left', backgroundColor: '#999999'}}>{item.invType}</td>
                    <td style={{textAlign: 'right'}}>{parseFloat(item.unitPrice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                    <td style={{textAlign: 'right', backgroundColor: '#999999'}}>{parseFloat(item.itemTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                    <td style={{textAlign: 'right'}}>{parseFloat(item.itemDiscount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                    <td style={{textAlign:"right", backgroundColor: '#999999' }}>{parseFloat(item.itemTax).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                   <td style={{textAlign:"right",  color: "blue"}}>{parseFloat(item.itemNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                   <td style={{textAlign: 'left', backgroundColor: '#999999', width: '20px'}}>{item.taxID} </td>
                    <button class={'fa fa-edit'} style={{backgroundColor: 'green', color: 'white'}} onClick={() => handleEdit(item.id)}> </button>
                    <button class={'fa fa-trash'} style={{backgroundColor: 'red', color: 'white'}} onClick={() => handleRemove(item.id)}> </button>
                    </tr>

                })}
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td style={{textAlign:"right", backgroundColor: "cyan"}}>Invoice</td>


                <td style={{textAlign:"left", backgroundColor: "cyan"}}>Totals :</td>
                <td style={{textAlign:"right", color: "red"}}>{parseFloat(invoiceTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

                <td style={{textAlign:"right", color: "red"}}>{parseFloat(invoiceDiscountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

                <td style={{textAlign:"right", color: "red"}}>{parseFloat(invoiceTaxTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{textAlign:"right", color: "red"}}>{parseFloat(invoiceNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


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
      width: '1520px',
      height: '105px',
      margin: '6px',
      backgroundColor: 'white',
      border: '4px solid grey',
    }}
    >
    <p></p>


<label style={{ paddingLeft: "10px"}} >

<a style={{ marginRight: '.9rem' }}>Product ID :</a>

<input
  type="text"
  style={{width: '200px', border: '1px solid #696969' }}
  value={productID}
  name="product"
  class="text-uppercase"
  ref={inputReference}
  onChange={(e) => formatInputProductID(e)}
  required
   />



    <Tooltip
        title="Click to search production information"
        placement="top"
      >  

   <button
   style = {{padding: '6px'}}
   type='button'
   onClick={() => onSearchProduct()}
>
<i class="btn btn-primary fa fa-search"></i>

</button>

</Tooltip>

 <a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Product Name :</a>




   <input
   type="text"
   style={{width: '600px', border: '1px solid #696969'}}
   value={productName}
   name="productName"
   ref={inputProductName}
   onChange={(e) => formatInputProductName(e)}
   readOnly = {productEdit}
   required
    />

<a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Item Type :</a>

    <select value={invType} onChange={e => setInvType(e.target.value)}>
     {purType.map((item) => (
       <option  value={item.value} required> {item.label}</option>
    )) }

    </select>


    <a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Unit:</a>


    <input
    type="text"
    style={{width: '60px', border: '1px solid #696969'}}
    value={unit}
    name="unit"
    readOnly = {true}
    required
     />

</label>



<div />



<label style={{ paddingLeft: "10px"}}>
<a style={{ marginRight: '.6rem' }}>Purchase Quantity :</a>

<input
  type="number"
  style={{width: '100px', border: '1px solid #696969'}}
  value={purchaseQty}
  name="purQty"
  placeholder='0.000'
  step='0.001'
  ref={inputRefQty}
  onBlur={(e) => formatInputQty(e) }
  onChange={(e) => handleInputChangeQty(e)}
   maxLength={13}
/>
<a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Unit Price :</a>

<input
  type="number"
  style={{width: '100px', border: '1px solid #696969'}}
  value={unitPrice}
  name="unitPrice"
  placeholder='0.00'
  step='0.001'
  onBlur={(e) => formatInputPrice(e) }
  onChange={(e) => handleInputChangePrice(e)}
   maxLength={13}
/>
<a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Total :</a>

<input
  type="number"
  style={{width: '150px', border: '1px solid #696969'}}
  value={itemTotal}
  name="itemTotal"
  placeholder='0.00'
   readonly = {true}
   maxLength={13}
/>


<a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Discount :</a>


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

<a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Tax :</a>

<input
  type="number"
  style={{width: '100px', border: '1px solid #696969'}}
  value={itemTax}
  name="itemTax"
  placeholder='0.00'
  step='0.001'
  onBlur={(e) => formatInputTax(e) }
  onChange={(e) => handleInputChangeTax(e)}
   maxLength={13}
/>
<a style={{ marginLeft: '1rem', marginRight: '.6rem' }}>Item Net Total :</a>

<input
  type="number"
  style={{width: '200px', border: '1px solid #696969'}}
  value={itemNetTotal}
  name="itemNetTotal"
  placeholder='0.00'
   readonly = {true}
   maxLength={13}
/>

</label>
</div>
<p></p>
<div />

 <p></p>
<td></td>
<td><button style={{backgroundColor: "blue", color: "white", width: '200px', marginLeft: '20rem'}} onClick={() => onNew() }>New Invoice </button></td>
<td><button style={{backgroundColor: "grey", color: "black", width: '100px'}} onClick={() => handleHome()}>Home</button></td>
<td><button style={buttonStyle} type="button" onClick={onAddPurchaseItem}>Add Purchase Item </button> </td>

 <p></p>

<div className="row">
<div className="col-sx-12 btn btn-info" style={{marginTop: '1px'}}>
    Purchase Voucher Entry
 </div>
 </div>



              <table class="table" style={{paddingTop: '1px', border: '1px solid black'}}>
            <thead class="thead-dark">
                <tr style={{align: 'left'}}>

                <th style={{backgroundColor: 'yellow', width: '.5px', textAlign: 'left'}}>#</th>
                <th style={{backgroundColor: '#999999', width: '5px', textAlign: 'left'}}>G/L No.</th>
                <th style={{backgroundColor: 'yellow', width: '5px', textAlign: 'left'}}>G/L Sub</th>
                <th style={{backgroundColor: '#999999', width: '.5px', textAlign: 'left'}}>G/L Type</th>
                <th style={{backgroundColor: 'yellow', width: '.5px', textAlign: 'left'}}>Dep.</th>
                <th style={{backgroundColor: '#999999', width: '200px', textAlign: 'left'}}>G/L Name</th>
                <th style={{backgroundColor: 'yellow', width: '100px', textAlign: 'left'}}>G/L Description</th>
                <th style={{backgroundColor: '#999999', width: '10px', textAlign: 'right'}}>Dr. Amount</th>
                <th style={{backgroundColor: 'yellow', width: '10px', textAlign: 'right'}}>Cr. Amount</th>
                <th style={{backgroundColor: 'blue', textAlign: 'center', color: 'white', width: '10px'}}>Select</th>
                </tr>
             </thead>
             <tbody style={mystyle} >
                {voucherData.map(item => {
                 return <tr key={item.id}>
                    <td>{item.id}</td>

                    <td style={{backgroundColor: '#999999'}}>{item.glNo}</td>
                    <td>{item.glSub}</td>
                    <td style={{textAlign: 'left', backgroundColor: '#999999'}}>{item.glType}</td>
                    <td style={{textAlign: 'left'}}>{item.department}</td>
                    <td style={{textAlign: 'left', backgroundColor: '#999999'}}>{item.glName}</td>
                    <td style={{textAlign: 'left'}}>{item.jeParticular}</td>
                    <td style={{textAlign:"right", color: 'red', backgroundColor: 'cyan'}}>{parseFloat(item.drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                   <td style={{textAlign:"right",  color: "blue", backgroundColor: 'cyan'}}>{parseFloat(item.crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

                    <button class={'fa fa-edit'} style={{backgroundColor: 'green', color: 'white'}} onClick={() => handleEditVoucher(item.id)}> </button>
                    <button class={'fa fa-trash'} style={{backgroundColor: 'red', color: 'white'}} onClick={() => handleRemoveVoucher(item.id)}> </button>
                    </tr>

                })}
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>


                <td style={{textAlign:"left", backgroundColor: "green"}}>Voucher Totals :</td>
                <td style={{textAlign:"right", backgroundColor: 'cyan', color: "red"}}>{parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

                <td style={{textAlign:"right", color: "blue", backgroundColor: 'cyan'}}>{parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>




            </tbody>
            <tfoot>


           <td></td>
           <td></td>
           <td></td>



        </tfoot>




              </table>

              <div style={{
      display: 'inline-block',
      width: '1520px',
      height: '105px',
      margin: '6px',
      backgroundColor: 'white',
      border: '4px solid grey',
    }}
    >
    <p></p>





 <label style={{paddingLeft: '10px'}}>
 <a style={{ marginLeft: '1rem', marginRight: '1.1rem' }}>Voucher No. :</a>

          <input
            type="text"
            value={voucherNo}
            name="voucher"
            style={{width: '200px', border: '1px solid #696969'}}
            class="text-uppercase"
            ref={inputRef}
            onChange={(e) => formatInputVoucherNo(e)}
            readOnly={false}
            required
            data-tip data-for="voucherTip"
          />
    <Tooltip
        title="Click to search Voucher No."
        placement="top"
      >  
          <button
          style = {{padding: '10px'}}
          type='button'
          onClick={() => onSearchVoucher(voucherNo)}
          >
         <i class="btn btn-primary fa fa-download"></i>   
          </button>
</Tooltip>

<a style={{ marginLeft: '1rem', marginRight: '.8rem' }}>G/L Selection :</a>

          <select value={ID} onChange={(e) => handleChangeGl(e)}>
            {glData.map((item) => (
              <option value={item.id} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
           )) }

           </select>
           <div>


 <label style={{paddingLeft: '10px'}} >
  <a style={{ marginRight: '.6rem' }}>Debit Amount :</a>
  <input
  type="number"
  style={{width: '200px', border: '1px solid #696969'}}
  value={drAmt}
  name="drAmt"
  placeholder='0.00'
  step='0.001'
  ref={inputRefVoucher}
  onBlur={(e) => formatInputDrAmt(e) }
  onChange={(e) => handleInputChangeDrAmt(e)}
   maxLength={13}
/>
<a style={{ marginLeft: '3rem', marginRight: '.6rem' }}>Credit Amount :</a>

 <input
  type="number"
  style={{width: '200px', border: '1px solid #696969'}}
  value={crAmt}
  name="crAmt"
  placeholder='0.00'
  step='0.001'
  onBlur={(e) => formatInputCrAmt(e) }
  onChange={(e) => handleInputChangeCrAmt(e)}
   maxLength={13}
/>
<p></p>
</label>
</div>
<p></p>

           <td><button style={{backgroundColor: "green", color: "white", width: '200px', marginLeft: '7rem'}} onClick={() => onPrint(voucherData, totalDrAmt, totalCrAmt)}>Print Voucher</button></td>
           <td><button style={{backgroundColor: "red", color: "white", width: '250px'}} onClick={() => onSave(voucherData, totalDrAmt, totalCrAmt)}>Save Invoice and Voucher</button></td>
           <td><button style={{backgroundColor: "cyan", color: "black", width: '200px'}} onClick={() => onAddVoucher()}>Add Voucher Item</button></td>

          </label>
</div>
<p></p>
        <p></p>

        <div className='row' /></div>

      <div className="row">
       <p></p>
       <p></p>
        <div className="col-sx-12 btn btn-secondary" style={{ marginTop: '1px' }}>
          Product Selection
           <a> <button style={{float: 'right'}} onClick={() => handleCancelProduct()}>Clear Product</button></a>
        </div>

        <span class="square border border-dark"></span>

<BootstrapTable bootstrap4 keyField='id' data={productData} columns={productColumn}
  defaultSorted={defaultSorted} pagination={pagination}
  rowStyle={{ backgroundColor: '#A9A9A9', border: '3px solid grey' }}
  class="table border border-dark" ></BootstrapTable>


<div className="col-sx-10 btn btn-success" style={{ marginTop: '1px', paddingLeft: '10px' }}>
          Supplier Selection
         <a> <button style={{float: 'right'}} onClick={() => handleCancel()}>Clear Customer</button></a>
        </div>

        <span class="square border border-dark"></span>

        <BootstrapTable bootstrap4 keyField='id' data={custData} columns={columns}
          defaultSorted={defaultSorted} pagination={pagination}
          rowStyle={{ backgroundColor: '#A9A9A9', border: '3px solid grey' }}
          class="table border border-dark" ></BootstrapTable>



     </div>




      </div>














    ) // return
  };

export default PurchaseInvoice;
