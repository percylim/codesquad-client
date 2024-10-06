import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
import ReactDOM from "react-dom";
import generatePDF from "./reportGenerator";
import exportNotePDF from "./noteGenerator";
import { format } from "date-fns";
import moment from 'moment';
import {SelectSupplierCustomer} from "./selectSupplierCustomer";

//import Tooltip from "@material-ui/core/Tooltip";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');




// const userLevel = localStorage.getItem('userLevel');
 var glData = [];
  var voucherData = [];
  var custData = [];
  var taxData = [];
  var taxID = '';
var taxType = '';
var taxCode ='';
 var taxRate = 0;
 var taxDescription = '';
 var taxRemark = '';
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
 var supplierID = '';
 var supplierName = '';
 var invoiceTotal = 0;
 var TotalDrAmt = 0;
 var TotalCrAmt = 0;
 var vouch_id = 0;
 var note_id = 0;
 var invEdit = false;
 var vouchEdit = false;
 var TotalTxnAmount = 0;
 var TotalTaxAmount = 0;
 var netTotal = 0;
var purType = [
    {label: 'Debit Note',
     value: 'PDN',
    },
     {label: 'Credit Note',
      value: 'PCN',
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
var defaultInvType = '';
var lDisable = false;
var custGlNo = '';
var custGlSub = '';
var lSupp = false;
//sessionStorage.setItem('voucherNo', '');
//sessionStorage.setItem('invoiceNo','');
//sessionStorage.setItem('invData', []);

function PurchaseDrCrNote() {

    const [data, setData] = useState([]);


   //  const [locationID, setLocationID] = useState('');
     const [voucherData, setVoucherData] = useState([]);

  // const [custData, setCustData] = useState([]);
    const [supplierID, setSupplierID] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [invoiceTotal, setInvoiceTotal] = useState(0.00);
    const [productID, setProductID] = useState('');
    const [productName, setProductName] = useState('');
    const [custData, setCustData] = useState([]);
  //  const [txnType, setTxnType] = useState('DR');
    const [ID, setGlID] = useState('');
    const [drAmt, setDrAmt] = useState('');
    const [crAmt, setCrAmt] = useState('');
    const [id, setTax] = useState('');
    const [taxTotal, setTaxTotal] = useState('');
    const [txnDate, setTxnDate] = useState(todayDate);
    const [txnParticular, setParticular] = useState("");
    const [voucherNo, setVoucherNo] = useState("");
    const [invoiceNo, setInvoiceNo] = useState('');
    const [documentNo, setDocumentNo] = useState('');
    const [txnAmount, setTxnAmount] = useState('');
    const [txnNetTotal, setTxnNetTotal] = useState(0.00);
    const inputReference = useRef(null);
    const inputRef = useRef(null);
    const [invType, setInvType]= useState('PCN');
    const inputRefVoucher = useRef(null);
    const inputRefNote = useRef(null);
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

          { dataField: 'id', text: '#', sort: false, headerStyle: { backgroundColor: '', width: '50px' } },
          { dataField: 'supplierID', text: 'Supplier ID', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey', textAlign: 'left' } },
          { dataField: 'supplierName', text: 'Supplier Name', sort: false, headerStyle: { backgroundColor: '', width: '700px' }, style: { textAlign: 'left' } },
          { dataField: 'acctType', text: 'A/C Type', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey' } },
          { dataField: 'glNo', text: 'G/L No', sort: false, headerStyle: { backgroundColor: '' } },
          { dataField: 'glSub', text: 'G/L Sub No.', align: 'center', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey' } },

          {
            dataField: "select",
            text: "Select", headerStyle: { backgroundColor: 'blue', color: 'white' },
            formatter: (cellContent: string, row: IMyColumnDefinition) => {

              return <button className="fa fa-check-square" onClick={() => handleSelectSupplier(row.supplierID, row.supplierName, row.glNo, row.glSub, row.paymentTerm)}></button>

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
        setInvType("PCN");

      //   setSupplierID(localStorage.getItem('supplierID'));
      //  setSupplierName(localStorage.getItem('supplierName'));


      //    setVoucherNo(sessionStorage.getItem(''));
      //    setInvoiceNo(sessionStorage.getItem(''));
      //    setTxnDate(sessionStorage.getItem('txnDate'));

          Axios
          .get(url+`/taxList`,
                {
                 params: {
                         companyID: companyID,
                         taxType: 'OUTPUT',
                         taxSST: 'FOT',
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
                  taxDescription=taxData[0].taxDescription;
                  taxRemark = taxData[0].remark;
                   setTax(taxData[0].id);
               //   alert(taxRate);
              } else {
                taxID = '';
                taxType= '';
                taxCode = '';
                taxDescription = '';
                taxRate = 0;
                alert('Government Tax is not defined');

              }
              });





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
          /*
              glID = glData[0].id;
              setGlID(glData[0].id);
              glNo = glData[0].glNo;
              glSub =  glData[0].glSub;

              glName = glData[0].glName;
              department = glData[0].department;
              glDescription = glData[0].glDescription;
              glType = glData[0].glType;
*/




    });



    }, []);
    const handleSelectSupplier = (ID, name, gNo, gSub, term) => {
      // alert(gNo+' - '+gSub);
      setSupplierID(ID);
      setSupplierName(name);
    //  setPaymentTerm(term);
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
            //  setDueDate(date.toISOString().substr(0, 10));

        }
      }
  /*
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
       */
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
            //  setPaymentTerm(res.data[0].paymentTerm);
            //  setCustomerInfo(res.data);
              let date = new Date(txnDate); // Now
            //   alert(date);
              // alert(res.data[0].paymentTerm);
               date.setDate(date.getDate() + res.data[0].paymentTerm);
            //   alert(date);
             //  alert(date.toISOString().substr(0, 10));
             //    alert(date);
            //   setDueDate(date.toISOString().substr(0, 10));
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

    const handleCancel = async (e) => {
      //  alert('remove');
      setCustData([]);
    };

    const handleChangeType= async(e) => {
       //  alert(e.target.value);
     //   defaultInvType=e.target.value;
        setInvType(e.target.value);
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
               taxDescription=taxData[i].taxDescription;
               taxRemark = taxData[i].remark;

           //   alert(taxData[i].taxID);
           //   alert(taxID);
          }
       }
      // alert(typeof taxRate);
      // alert(taxRate);
       calculateTotal();
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
  //      setGlID(glData[i].id);
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

const formatInputVoucherNo = async(e) => {
  e.preventDefault();
 // const cName = e.target.name;
  console.log(e.target.name);
 // e.target.value.replace(/[^a-z0-9\s]/gi, '');
  console.log(e.target.value.toUpperCase());
   setVoucherNo(e.target.value.toUpperCase());
//alert(voucherNo);

};

const formatInputDocumentNo = async(e) => {
    e.preventDefault();
   // const cName = e.target.name;
    console.log(e.target.name);
   // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
     setDocumentNo(e.target.value.toUpperCase());
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

const formatInputInvoiceNo = async(e) => {
    e.preventDefault();
   // const cName = e.target.name;
    console.log(e.target.name);
   // alert(e.target.value);
   // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
     setInvoiceNo(e.target.value.toUpperCase());


  };

  const handleAddNote = () => {
    // e.preventDefault();
   //    alert(invType);
    //   return false;

    if (documentNo === '' || documentNo === null) {
        alert('Debit Note / Credit No cannot be blank');
        return false;
    }
    if (defaultInvType !== '') {
      if (invType !== defaultInvType) {
          alert("Transaction Type Cannot be Change after the first Note added");
          return false;
      }
    }
    //  alert(invType);
    //  alert(defaultInvType);
      defaultInvType=invType;
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

  if (supplierName === '' || supplierName === null) {
    alert("No Supplier selected");
    return false;
  };
  //alert(productID);


   if (invoiceNo === '' || invoiceNo === null) {
    alert("Invoice No. cannot be blank");
    return false;
     };

     if (txnParticular === '' || txnParticular === null) {
      alert("Transaction Particular cannot be blank");
      return false;
       };

       if (txnAmount === 0 || txnAmount === 'NaN') {
        alert("Transaction Amount is ZERO");
        return false;
         };
     lRead=true;
  // if note item edited
   if (invEdit) {
      const newDatas = [...data];
    for (let i = 0; i < newDatas.length; i++) {
      if (newDatas[i].id === note_id) {
       //  if (invType === 'DR') {
           netTotal = Number(txnAmount) + Number(taxTotal)
      //   } else {
      //    netTotal = Number(txnAmount) - Number(taxTotal)
      //   }

// alert(netTotal);
        newDatas[i].voucherNo= voucherNo;
        newDatas[i].companyID = companyID;
        newDatas[i].supplierID = supplierID;
        newDatas[i].supplierName = supplierName;
        newDatas[i].invoiceNo = invoiceNo;
        newDatas[i].taxID= taxID;
        newDatas[i].taxCode = taxCode;
        newDatas[i].taxRate= taxRate;
        newDatas[i].taxType= taxType;
        newDatas[i].documentNo = documentNo;
        newDatas[i].invType = invType;
        newDatas[i].txnDate = txnDate;
        newDatas[i].taxDescription = taxDescription;
        newDatas[i].remark = taxRemark;
        newDatas[i].txnParticular = txnParticular;
        newDatas[i].txnAmount = txnAmount;
        newDatas[i].taxTotal = taxTotal;
        newDatas[i].netTotal = netTotal;
        }

      }
  setData(newDatas);

  TotalTxnAmount = 0;
   TotalTaxAmount=0;
   let TotalNet=0;
  for (let i = 0; i < newDatas.length; i++) {
   //   alert(newDatas[i].itemTotal);
   newDatas[i].voucherNo=voucherNo;
   newDatas[i].txnDate = txnDate;
    TotalTxnAmount+=Number(newDatas[i].txnAmount);
     TotalTaxAmount+=Number(newDatas[i].taxTotal);
    TotalNet+=newDatas[i].netTotal;
 //  invoiceTaxTotal+=Number(newDatas[i].itemTax);
 //  invoiceNetTotal+=Number(newDatas[i].itemNetTotal);
    newDatas[i].id = i+1;
   // newDatas[i].purchaseQty=newDatas[i].purchaseQty.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  // newDatas[i].itemTotal=newDatas[i].itemTotal.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  // alert(typeof  invoiceTotal);
  }

  setTxnNetTotal(TotalNet) ;

  invEdit = false;
   } else {
  vid = vid+1//;
  //if (invType === 'DR') {
    netTotal =  Number(txnAmount) + Number(taxTotal);
  ////} else {
  //// netTotal =   Number(txnAmount) - Number(taxTotal);
 // }
//alert(netTotal);
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
    txnDate: txnDate,
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
   newDatas[i].txnDate = txnDate;
    TotalTxnAmount+=Number(newDatas[i].txnAmount);
     TotalTaxAmount+=Number(newDatas[i].taxTotal);
    TotalNet+=newDatas[i].netTotal;
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

  defaultInvType = invType;

   lDisable = true;

  };  // onAdd

  const handleEdit = async (e) => {
   // alert(e)
    note_id = e;
   const newData = [...data];
   for (let i = 0; i < newData.length; i++) {
     if (newData[i].id === e) {
         setInvoiceNo(newData[i].invoiceNo);
         setParticular(newData[i].txnParticular);
         setTxnAmount(newData[i].txnAmount);
         setTaxTotal(newData[i].txnTotal);




      //    setLocationID(newData[i].locationID);
       //  alert(newData[i].invType);

       invEdit = true;



     }
    }
    inputRefNote.current.focus();
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

   const handleRemove = async(id) => {


    const newData = [...data];
    const index = newData.findIndex((data) => data.id === id) ;

        if (index !==-1) {
         newData.splice(index, 1);
         setData(newData);
        }

       // alert(newData.length);


      //  invoiceTotal=0;
      //  invoiceDiscountTotal=0;
      //  invoiceTaxTotal=0;
      //  invoiceNetTotal=0;
         let vID =0;
        for (let i = 0; i < newData.length; i++) {
          //   alert(newDatas[i].itemTotal);
        //  invoiceTotal+=Number(newData[i].itemTotal);
       //   invoiceDiscountTotal+=Number(newData[i].itemDiscount);
       //   invoiceTaxTotal+=Number(newData[i].itemTax);
       //   invoiceNetTotal+=Number(newData[i].itemNetTotal);
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

    // alert(newData.glNo);

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

       let drTotal= parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
       let crTotal= parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
     // setDrAmtTotal(drTotal);
       // setCrAmtTotal(crTotal);
    // alert(voucherData[0].glNo);
      //lRead = true;
      // onSumDrCrAmt(newDatas)
      setDrAmt(0);
      setCrAmt(0);

    };





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
   // sessionStorage.removeItem('voucherNo');
  //  sessionStorage.removeItem('invoiceNo');
  //  sessionStorage.removeItem('txnDate');
  //  sessionStorage.removeItem('invData');
  //  localStorage.removeItem('invData');
    lRead=false;
    lDisable=false;
    setData(...data);
    window.location.href='/purchaseDrCrNote';
  };
  const handleHome = async() => {

  //  localStorage.removeItem('supplierID');
  //  localStorage.removeItem('supplierName');
  //  sessionStorage.removeItem('voucherNo');
  //  sessionStorage.removeItem('invoiceNo');
  //  sessionStorage.removeItem('txnDate');
  //  localStorage.removeItem('invData');



    window.location.href='/home';
  };

// on Save Purchase Invoice and Voucher *******************
const onSave = async (voucherData, drTotal, crTotal) => {
   // e.preventDefault();
       console.log(data);

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


       if (totalDrAmt != totalCrAmt) {
        alert('Debit total and Credit total must equal')
        return false;
       }
       //  alert(txnNetTotal);
       //  alert(totalDrAmt);
       //  alert(totalCrAmt);
       if (totalDrAmt != txnNetTotal && totalCrAmt != txnNetTotal) {
        alert("Debit/Credit Note Total not same as Voucher Dr/Cr Total");
        return false;
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
        data[i].invType = invType;
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
 if (res.data !== 'Existed') {
    alert('Purchase Invoice No. '+invoiceNo+' Invalid, please re-enter')
     return false
  }



}, []);

Axios
.get(url+`/purchaseNoteVerify`,
  {
   params: {
           companyID: companyID,
           supplierID: supplierID,
           documentNo: documentNo,
          }
  }
)
.then(res => {

// alert(res.data);
 if (res.data.length >0) {
    alert('Purchase Note No. '+documentNo+' already existed, please re-enter')
     return false
  }



}, []);


//alert(data[0].voucherNo);
/** update purchase Invoice */

Axios
.post(url+'/purchaseNote',data



)

.then(res => {


   if (res.data !== 'Success') {

     alert(res.data);
   return false;
   //    window.location.reload(false);
   // window.location.href='journalVoucher';

   }
  //  alert(text);
  }, []);


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
      defaultInvType = '';
    window.location.href='/purchaseDrCrNote';

   };
  //  alert(text);
  }, []);




};


// on Save Purchase Invoice and Voucher *******************
const onSearchInvoice = async (e) => {
       let invNo = e;
     //  alert(e);
      if (invNo === '' || invNo === null) {
        alert('Purchase Invoice Node. cannot be blank');
        return false;
      }

      if (supplierID === '' || supplierID === null) {
        alert('Supplier ID is empty');
         return false;
      }


      Axios
      .get(url+`/purchaseInvoiceSearch`,
        {
         params: {
                 companyID: companyID,
                 supplierID: supplierID,
                 invType: 'PUR',
                 invoiceNo: invoiceNo,
                }
        }
      )
      .then(res => {
       if (res.data.length > 0)  {

           setInvoiceTotal(res.data[0].invoiceTotal.toFixed(2));

       }else{
           alert('Purchase Invoice No. '+invoiceNo+' is invalid');
           return false
       }

}, []);

};

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
        //  alert(productID);
      if (productID === '*') {
    //     setProductName('None Stock Item');
     //    setUnit('');
        return true;
      }


        Axios
        .get(url+`/ProductSearch`,
          {
           params: {
                   companyID: companyID,
                   productID: productID,
                  }
          }
        )
        .then(res => {
         if (res.data.length > 0) {
       //     setProductName(res.data[0].productName);
        //    setBarcode(res.data[0].barcode);
        //    setUnit(res.data[0].unit);

         }else{
        //    localStorage.removeItem('productID');
        //    localStorage.removeItem('productName');
        //    localStorage.removeItem('barcode');
        //    localStorage.removeItem('unit');

         //  window.location.reload(false);
         //  window.location.href='/SelectProduct';
         }

  }, []);

      }








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

      const formatInputTaxTotal = async (e) => {
        let num = e.target.value
        if (num === '') {
            num=0;
        }
      //  alert(num);
       setTaxTotal(parseFloat(num).toFixed(2));

       };
     const formatInputQty = async (e) => {
         let num = e.target.value
         if (num === '') {
            num=0;
        }
       //  setPurchaseQty(parseFloat(num).toFixed(3));
         calculateTotal();

       };

       const formatInputTxnAmount = async (e) => {
        let num = e.target.value
        if (num === '') {
            num=0;
        }
        setTaxTotal(parseFloat(txnAmount*(taxRate/100)).toFixed(2));
        setTxnAmount(parseFloat(num).toFixed(2));

       };


     const formatInputPrice = async (e) => {
        let num = e.target.value
        if (num === '') {
            num=0;
        }
      //  setUnitPrice(parseFloat(num).toFixed(3));
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

     //   calculateTotal();
       };

       const calculateTotal = async(e) => {
     //   let iTotal = Number(purchaseQty) * Number(unitPrice);
     //   let netTotal = iTotal - Number(itemDiscount) + Number(itemTax);
      //  alert(itemDiscount);
      //  alert(itemTax);


      // if (invType === 'DR') {

   //     setItemTotal(parseFloat(iTotal).toFixed(2));
   //     setItemNetTotal(parseFloat(netTotal).toFixed(2));

//       } else {

     //    netTotal =0;
     //   setItemTotal(parseFloat(iTotal).toFixed(2));
     //   setItemNetTotal(parseFloat(netTotal).toFixed(2));
//       }

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
          <div className="col-sm-12 btn btn-success" style={{marginTop: '1px'}}>
              Purchase Invoice Debit Note / Credit Note Entry
           </div>
           </div>


           <div>












         <label style={{ paddingLeft: "10px"}} >

        <a style={{marginRight: '2rem'}}> Transaction Date  : </a>
          <input
            type="date"
            maxLength={10}
            value={txnDate}
            style={{width: '10%'}}
          //  defaultValue = {txnDate}
            name="txnDate"
            onChange={(e) => formatInputDate(e)}
            required
          />

    <a style={{marginLeft: '4.4rem'}}> Transaction Type : </a>
    <select value={invType} onChange={e => handleChangeType(e)}>
     {purType.map((item) => (
       <option  value={item.value} required> {item.label}</option>
    )) }

    </select>



      <a style={{marginLeft: '2rem'}}>  No. :  </a>
          <input
            type="text"
            value={documentNo}
            name="document"
            style={{width: '200px',border: '1px solid #696969' }}
            class="text-uppercase"
            onChange={(e) => formatInputDocumentNo(e)}
            readOnly={false}
            required
          />


    </label>


<label style={{ paddingLeft: "10px"}} >
<a style={{marginRight: '4.5rem'}}> Supplier ID : </a>

<input
  type="text"
  style={{width: '200px', border: '1px solid #696969'}}
  value={supplierID}
  name="supplier"
  class="text-uppercase"
  onChange={(e) => formatInputSupplierID(e)}
  required
  readOnly={lDisable}
   />

   <button
   style = {{padding: '6px'}}
   type='button'
   class = 'btn btn-primary fa fa-search float-right'
   onClick={() => onSearch()}
   ></button>


   <a style={{marginLeft: '1.4rem', marginRight: '0.6rem'}} >Supplier Name : </a>

   <input
   type="text"
   style={{width: '900px', border: '1px solid #696969'}}
   value={supplierName}
   name="supplierName"
   readOnly = {true}
   required
    />
</label>



<label style={{ paddingLeft: "10px"}} >
<a style={{marginRight: '0.1rem'}}> Purchase Invoice No. : </a>
<input
  type="text"
  style={{width: '200px', border: '1px solid #696969'}}
  value={invoiceNo}
  name="invoiceNo"
  class="text-uppercase"
  ref={inputRefNote}
  onChange={(e) => setInvoiceNo(e.target.value)}
  required
 
   />

   <button
   style = {{padding: '6px'}}
   type='button'
   class = 'btn btn-primary fa fa-search float-right'
   onClick={() => onSearchInvoice(invoiceNo)}
 
   ></button>


<a style={{marginLeft: '1rem', marginRight: '1.5rem'}}> Invoice Total : </a>
<input
  type="number"
  style={{width: '150px', border: '1px solid #696969'}}
  value={invoiceTotal}
  name="invoiceTotal"
  readonly={true}
/>




<a style={{marginLeft: '1rem', marginRight: '.5rem'}}> Debit/Creit Amount : </a>
<input
  type="number"
  style={{width: '150px', border: '1px solid #696969'}}
  value={txnAmount}
  onBlur={(e) => formatInputTxnAmount(e) }
  onChange={(e) => setTxnAmount(e.target.value)}
  name="txnAmount"
  readonly={false}
/>

<a style={{marginLeft: '2rem', marginRight: '.1rem'}}> Tax Amount : </a>
<input
  type="number"
  style={{width: '150px', border: '1px solid #696969'}}
  value={taxTotal}
  onBlur={(e) => formatInputTaxTotal(e) }
  onChange={(e) => setTaxTotal(e.target.value)}
  name="taxTotal"
  readonly={false}
/>
</label>

<label style={{paddingLeft: '10px'}}>
<a style={{marginRight: '3.5rem'}}> Tax Selection  : </a>
          <select value={id} onChange={(e) => handleChangeTax(e)}>
           {taxData.map((item) => (
             <option value={item.id} required> (ID-{item.taxID}) (Type-{item.taxType}) (Code-{item.taxCode}) (Description-{item.taxDescription}) (Rate-{item.taxRate}%)</option>
          )) }

          </select>
</label>


<label for='particular' style={{paddingLeft: '10px'}}> Particular :
<input
  type="text"
  style={{marginLeft: '5.6rem', width: '1300px', border: '1px solid #696969' }}
  value={txnParticular}
  name="txnParticular"
  onChange={(e) => setParticular(e.target.value) }
  readonly={false}
/>
</label>


<p></p>
<div style={{flex: 1, height: '2px', backgroundColor: 'blue'}} />


<div className="select-container" >



<p></p>


        <table class="table" style={{marginLeft: '.5rem', paddingTop: '1px', border: '1px solid black'}}>
            <thead class="thead-dark" >
                <tr style={{align: 'left'}}>
                <th style={{width: '.5px', textAlign: 'center'}}>#</th>
                <th style={{backgroundColor: '#999999', width: '130px', textAlign: 'center'}}>Invoice No</th>
                <th style={{backgroundColor: '', width: '500px', textAlign: 'center'}}>Transaction Particualar</th>
                <th style={{backgroundColor: '#999999', width: '130px', textAlign: 'center' }}>Txn. Amount</th>
                <th style={{backgroundColor: '', width: '130px', textAlign: 'center'}}>Tax Amount</th>
                <th style={{backgroundColor: '#999999', width: '130px', textAlign: 'center'}}>Net Amount</th>
                 <th style={{backgroundColor: 'blue', textAlign: 'center', color: 'white', width: '15px'}}>Select</th>
                </tr>
            </thead>
            <tbody style={mystyle} >
                {data.map(item => {
                 return <tr key={item.id}>
                    <td style={{backgroundColor: 'yellow'}}>{item.id}</td>
                    <td style={{backgroundColor: '#999999', textALign: 'left'}}>{item.invoiceNo}</td>
                    <td style={{backgroundColor: 'yellow', textAlign: 'left'}}>{item.txnParticular}</td>
                    <td style={{textAlign: 'right', backgroundColor: '#999999'}}>{parseFloat(item.txnAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                    <td style={{textAlign: 'right', backgroundColor: 'yellow'}}>{parseFloat(item.taxTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                    <td style={{textAlign: 'right', backgroundColor: '#999999'}}>{parseFloat(item.netTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                    <button class={'fa fa-edit'} style={{backgroundColor: 'green', color: 'white'}} onClick={() => handleEdit(item.id)}> </button>
                    <button class={'fa fa-trash'} style={{backgroundColor: 'red', color: 'white'}} onClick={() => handleRemove(item.id)}> </button>
                    </tr>

                })}

                 <td></td>
                 <td></td>
                <td style={{textAlign:"right", backgroundColor: "cyan"}}>Transaction Total : .</td>


                <td style={{textAlign:"right", color: "red"}}>{parseFloat(TotalTxnAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{textAlign:"right", color: "red"}}>{parseFloat(TotalTaxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{textAlign:"right", color: "red"}}>{parseFloat(txnNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


            </tbody>
            <tfoot>


           <td></td>
           <td></td>
           <td></td>



        </tfoot>
        </table>

         </div>








<p></p>
<div style={{flex: 1, height: '2px', backgroundColor: 'blue'}} />
 <p></p>


<td></td>

<td><button style={{backgroundColor: "grey", color: "black", width: '100px', marginLeft: '.5rem'}} onClick={() => handleHome()}>Home</button></td>
<td><button style={{backgroundColor: "blue", color: "white", width: '150px'}} onClick={() => onNew() }>New Note </button></td>
<td><button style={{backgroundColor: "green", color: "white", width: '200px'}} onClick={() => handleAddNote()}>Add Dr/Cr Note</button></td>

 <p></p>

 <div style={{flex: 1, height: '2px', backgroundColor: 'blue'}} />
 <p></p>
<div className="row">
<div className="col-sx-12 btn btn-secondary" style={{marginTop: '1px'}}>
    Debit Not / Credit Note Voucher Entry
 </div>
 </div>



              <table class="table" style={{paddingTop: '1px', border: '1px solid black'}}>
            <thead class="thead-dark">
                <tr style={{align: 'left'}}>

                <th style={{ width: '.5px', textAlign: 'cnter'}}>#</th>
                <th style={{backgroundColor: '#999999', width: '5px', textAlign: 'center'}}>G/L No.</th>
                <th style={{backgroundColor: '', width: '5px', textAlign: 'center'}}>G/L Sub</th>
                <th style={{backgroundColor: '#999999', width: '.5px', textAlign: 'center'}}>G/L Type</th>
                <th style={{backgroundColor: '', width: '.5px', textAlign: 'center'}}>Dep.</th>
                <th style={{backgroundColor: '#999999', width: '200px', textAlign: 'center'}}>G/L Name</th>
                <th style={{backgroundColor: '', width: '100px', textAlign: 'center'}}>G/L Description</th>
                <th style={{backgroundColor: '#999999', width: '10px', textAlign: 'center'}}>Dr. Amount</th>
                <th style={{backgroundColor: '', width: '10px', textAlign: 'center'}}>Cr. Amount</th>
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


                <td style={{textAlign:"Right", backgroundColor: "green", color: 'white'}}>Voucher Totals :</td>
                <td style={{textAlign:"right", backgroundColor: 'cyan', color: "red"}}>{parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{textAlign:"right", color: "blue", backgroundColor: 'cyan'}}>{parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>



            </tbody>

            <tfoot>


           <td></td>
           <td></td>
           <td></td>



        </tfoot>




              </table>






 <div>
 <label style={{paddingLeft: '0px'}}>
 <a style={{marginLeft: '0.5rem', marginRight: '0rem'}}> Voucher No. : </a>
          <input
            type="text"
            value={voucherNo}
            name="voucher"
            style={{marginLeft: '0.7rem', width: '200px', border: '1px solid #696969'}}
            class="text-uppercase"
            ref={inputRef}
            onChange={(e) => formatInputVoucherNo(e)}
            readOnly={false}
            required
 
          />

          <button
          style = {{padding: '10px'}}
          type='button'
          class = 'btn btn-primary fa fa-download float-right'
          onClick={() => onSearchVoucher(voucherNo)}
 
          ></button>



<a style={{marginLeft: '1rem', marginRight: '.3rem'}}> G/L Selection : </a>

          <select value={ID} onChange={(e) => handleChangeGl(e)} style={{marginLeft: '0rem',marginRight: '1rem'}}>
            {glData.map((item) => (
              <option value={item.id} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
           )) }

           </select>
           <div>
 <label style={{paddingLeft: '0px'}}>
 <a style={{marginLeft: '0rem', marginRight: '0rem'}}> Debit Amount : </a>
  <input
  type="number"
  style={{marginLeft: '.2rem', width: '200px', border: '1px solid #696969'}}
  value={drAmt}
  name="drAmt"
  step='0.01'
  ref={inputRefVoucher}
  onBlur={(e) => formatInputDrAmt(e) }
  onChange={(e) => handleInputChangeDrAmt(e)}
   maxLength={13}
/>
<a style={{marginLeft: '3rem', marginRight: '0rem'}}> Credit Amount : </a>
 <input
  type="number"
  style={{width: '200px', border: '1px solid #696969'}}
  value={crAmt}
  name="crAmt"
  step='0.01'
  onBlur={(e) => formatInputCrAmt(e) }
  onChange={(e) => handleInputChangeCrAmt(e)}
   maxLength={13}
/>

</label>
</div>
<p></p>


           <td><button style={{backgroundColor: "green", color: "white", width: '200px'}} onClick={() => onPrint(voucherData, totalDrAmt, totalCrAmt)}>Print Voucher</button></td>
           <td><button style={{backgroundColor: "red", color: "white", width: '250px'}} onClick={() => onSave(voucherData, totalDrAmt, totalCrAmt)}>Save Invoice and Voucher</button></td>
           <td><button style={{backgroundColor: "yellow", color: "black", width: '200px'}} onClick={() => onAddVoucher()}>Add Voucher Item</button></td>

          </label>
</div>
<p></p>
<div className='row' style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} /></div>

<div className="row">

       <div className="col-sx-10 btn btn-info" style={{ marginTop: '1px', paddingLeft: '10px' }}>
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

export default PurchaseDrCrNote;
