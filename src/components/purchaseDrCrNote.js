import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios';
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
import generatePDF from "./reportGenerator";
import { format } from "date-fns";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');

var glData = [];
var custData = [];
var taxData = [];
var taxID = '';
var taxType = '';
var taxCode = '';
var taxRate = 0;
var taxDescription = '';
var taxRemark = '';
var glNo = '';
var department = '';
var glDescription = '';
var glSub = '';
var glName = '';
var glType = '';
var totalDrAmt = 0;
var totalCrAmt = 0;
var supplierID = '';
var supplierName = '';
var invoiceTotal = 0;
var vouch_id = 0;
var note_id = 0;
var invEdit = false;
var vouchEdit = false;
var TotalTxnAmount = 0;
var TotalTaxAmount = 0;
var netTotal = 0;

var purType = [
  { label: 'Debit Note', value: 'PDN' },
  { label: 'Credit Note', value: 'PCN' },
];

var curr = new Date();
curr.setDate(curr.getDate());
var todayDate = curr.toISOString().substr(0, 10);
var vid = 0;
var glID = 0;
var defaultInvType = '';
var lDisable = false;
var custGlNo = '';
var custGlSub = '';
var VOUCHER_TYPE = 'PCN';


function PurchaseDrCrNote() {
  const [data, setData] = useState([]);
  const [voucherData,setVoucherData] = useState([]);
  const [supplierID, setSupplierID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [invoiceTotal, setInvoiceTotal] = useState(0.00);
  const [productID, setProductID] = useState('');
  const [productName,setProductName] = useState('');
  const [custData, setCustData] = useState([]);
  const [ID, setGlID]= useState('');
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
  const inputRef = useRef(null);
  const [invType, setInvType] = useState('PCN');
  const inputRefVoucher = useRef(null);
  const inputRefNote = useRef(null);
  const [jvInit, setJvinit] = useState('');
  const mystyle = { align: "left" };

  if (txnDate === null) setTxnDate(todayDate);

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
      formatter: (cellContent, row) => {
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

  useEffect(() => {
    setInvType("PCN");

    Axios.get(`/api/taxList`, {
      params: { companyID: companyID, taxType: 'OUTPUT', taxSST: 'FOT' }
    }).then(res => {
      taxData = res.data;
      if (taxData.length > 0) {
        taxID = taxData[0].taxID;
        taxType = taxData[0].taxType;
        taxCode = taxData[0].taxCode;
        taxRate = taxData[0].taxRate;
        taxDescription = taxData[0].taxDescription;
        taxRemark = taxData[0].remark;
        setTax(taxData[0].id);
      } else {
        taxID = '';
        taxType = '';
        taxCode = '';
        taxDescription = '';
        taxRate = 0;
        alert('Government Tax is not defined');
      }
    });

    Axios.get(`/api/glList`, { params: { companyID: companyID } }).then(res => {
      glData = res.data;
      console.log('fetch glData:', glData);
    });
  }, []);

  const handleSelectSupplier = (ID, name, gNo, gSub, term) => {
    setSupplierID(ID);
    setSupplierName(name);
    for (let i = 0; i < glData.length; i++) {
      if (glData[i].glNo === gNo && glData[i].glSub === gSub) {
        setGlID(glData[i].id);
        glNo = glData[i].glNo;
        glSub = glData[i].glSub;
        glName = glData[i].glName;
        glType = glData[i].glType;
        department = glData[i].department;
        glDescription = glData[i].glDescription;
        custGlNo = glData[i].glNo;
        custGlSub = glData[i].glSub;
        let date = new Date(txnDate);
        date.setDate(date.getDate() + term);
      }
    }
  };

  const onSearch = async () => {
    if (supplierID !== '' || supplierID !== null) {
      Axios.get(`/api/supplierSearch`, {
        params: { companyID: companyID, supplierID: supplierID }
      }).then(res => {
        if (res.data.length > 0) {
          setSupplierName(res.data[0].supplierName);
          let date = new Date(txnDate);
          date.setDate(date.getDate() + res.data[0].paymentTerm);
          for (let i = 0; i < glData.length; i++) {
            if (glData[i].glNo === res.data[0].glNo && glData[i].glSub === res.data[0].glSub) {
              setGlID(glData[i].id);
              glNo = glData[i].glNo;
              glSub = glData[i].glSub;
              glName = glData[i].glName;
              glType = glData[i].glType;
              department = glData[i].department;
              glDescription = glData[i].glDescription;
              custGlNo = glData[i].glNo;
              custGlSub = glData[i].glSub;
            }
          }
        } else {
          Axios.get(`/api/customerList`, { params: { companyID: companyID } }).then(res => {
            if (res.data.length > 0) {
              setCustData(res.data);
              alert('Please select a Supplier from the Supplier Selection below');
              return false;
            }
          });
        }
      });
    }
  };

  const handleCancel = async (e) => {
    setCustData([]);
  };

  const handleChangeType = async (e) => {
    setInvType(e.target.value);
    if (e.target.value === 'PDN') {
      VOUCHER_TYPE = 'PDV';
    } else {
      VOUCHER_TYPE = 'PCV';
    }
      alert('Transaction Type changed to ' + e.target.value + ', please re-select Voucher No. ');
  //  alert(VOUCHER_TYPE);
  };

  const handleChangeTax = async (e) => {
    let ID = Number(e.target.value);
    for (let i = 0; i < taxData.length; i++) {
      if (taxData[i].id === ID) {
        setTax(taxData[i].id);
        taxID = taxData[i].taxID;
        taxRate = taxData[i].taxRate;
        taxType = taxData[i].taxType;
        taxCode = taxData[i].taxCode;
        taxDescription = taxData[i].taxDescription;
        taxRemark = taxData[i].remark;
      }
    }
    calculateTotal();
  };

 const handleChangeGl = async (e) => {
  let selectedId = Number(e.target.value);
  for (let i = 0; i < glData.length; i++) {
    if (glData[i].id === selectedId) {
      glNo = glData[i].glNo;
      glSub = glData[i].glSub;
      glType = glData[i].glType;
      department = glData[i].department;
      glName = glData[i].glName;
      glDescription = glData[i].glDescription;
      glID = glData[i].id;
      
      // ✅ Update the state so the select shows the chosen item
      setGlID(glData[i].id);
    }
  }
};
  const formatInputDate = async (data) => {
  //  e.preventDefault();
    setTxnDate(data);
    inputRef.current.focus();
  };

  const formatInputVoucherNo = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    console.log(e.target.value.toUpperCase());
    setVoucherNo(e.target.value.toUpperCase());
  };

  const formatInputDocumentNo = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    console.log(e.target.value.toUpperCase());
    setDocumentNo(e.target.value.toUpperCase());
  };

  const formatInputSupplierID = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    console.log(e.target.value.toUpperCase());
    setSupplierID(e.target.value.toUpperCase());
  };

  const formatInputInvoiceNo = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    console.log(e.target.value.toUpperCase());
    setInvoiceNo(e.target.value.toUpperCase());
  };

  const handleAddNote = () => {
    if (documentNo === '' || documentNo === null) {
      alert('Debit Note / Credit No cannot be blank');
      return false;
    }
    if (defaultInvType !== '') {
      if (invType !== defaultInvType) {
        alert("Transaction Type Cannot be changed after the first Note added");
        return false;
      }
    }
    defaultInvType = invType;
    if (voucherNo === '' || voucherNo === null) {
      alert("Journal Voucher No. cannot be blank");
      return false;
    }
    for (let i = 0; i < voucherNo.length; i++) {
      if (voucherNo.substr(i, 1) === ';') {
        alert("Voucher No. cannot contain ';'");
        return false;
      }
    }
    if (txnDate === '' || txnDate === 'undefined') {
      alert("Transaction Date cannot be blank");
      return false;
    }
    if (supplierID === '' || supplierID === null) {
      alert("No Supplier selected");
      return false;
    }
    if (supplierName === '' || supplierName === null) {
      alert("No Supplier selected");
      return false;
    }
    if (invoiceNo === '' || invoiceNo === null) {
      alert("Invoice No. cannot be blank");
      return false;
    }
    if (txnParticular === '' || txnParticular === null) {
      alert("Transaction Particular cannot be blank");
      return false;
    }
    if (txnAmount === 0 || txnAmount === 'NaN') {
      alert("Transaction Amount is ZERO");
      return false;
    }

    if (invEdit) {
      const newDatas = [...data];
      for (let i = 0; i < newDatas.length; i++) {
        if (newDatas[i].id === note_id) {
          netTotal = Number(txnAmount) + Number(taxTotal);
          newDatas[i].voucherNo = voucherNo;
          newDatas[i].companyID = companyID;
          newDatas[i].supplierID = supplierID;
          newDatas[i].supplierName = supplierName;
          newDatas[i].invoiceNo = invoiceNo;
          newDatas[i].taxID = taxID;
          newDatas[i].taxCode = taxCode;
          newDatas[i].taxRate = taxRate;
          newDatas[i].taxType = taxType;
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
      TotalTaxAmount = 0;
      let TotalNet = 0;
      for (let i = 0; i < newDatas.length; i++) {
        newDatas[i].voucherNo = voucherNo;
        newDatas[i].txnDate = txnDate;
        TotalTxnAmount += Number(newDatas[i].txnAmount);
        TotalTaxAmount += Number(newDatas[i].taxTotal);
        TotalNet += newDatas[i].netTotal;
        newDatas[i].id = i + 1;
      }
      setTxnNetTotal(TotalNet);
      invEdit = false;
    } else {
      vid = vid + 1;
      netTotal = Number(txnAmount) + Number(taxTotal);
      const newData = {
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
      };
      const newDatas = [...data, newData];
      TotalTxnAmount = 0;
      TotalTaxAmount = 0;
      let TotalNet = 0;
      for (let i = 0; i < newDatas.length; i++) {
        newDatas[i].voucherNo = voucherNo;
        newDatas[i].txnDate = txnDate;
        TotalTxnAmount += Number(newDatas[i].txnAmount);
        TotalTaxAmount += Number(newDatas[i].taxTotal);
        TotalNet += newDatas[i].netTotal;
        newDatas[i].id = i + 1;
      }
      setData(newDatas);
      setTxnNetTotal(TotalNet);
    }
    lDisable = true;
  };

  const handleEdit = async (e) => {
    note_id = e;
    const newData = [...data];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === e) {
        setInvoiceNo(newData[i].invoiceNo);
        setParticular(newData[i].txnParticular);
        setTxnAmount(newData[i].txnAmount);
        setTaxTotal(newData[i].taxTotal);
        invEdit = true;
      }
    }
    inputRefNote.current.focus();
  };

  const handleEditVoucher = async (e) => {
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

  const handleRemove = async (id) => {
    const newData = [...data];
    const index = newData.findIndex((data) => data.id === id);
    if (index !== -1) {
      newData.splice(index, 1);
      setData(newData);
    }
    let vID = 0;
    for (let i = 0; i < newData.length; i++) {
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
    totalDrAmt = 0;
    totalCrAmt = 0;
    let vID = 0;
    for (let i = 0; i < newData.length; i++) {
      totalDrAmt += Number(newData[i].drAmt);
      totalCrAmt += Number(newData[i].crAmt);
      vID++;
      newData[i].id = vID;
    }
  };

  const onAddVoucher = () => {
    if (voucherNo === '' || voucherNo === null) {
      alert("Journal Voucher No. cannot be blank");
      return false;
    }
    let ctype = voucherNo.substr(0,3);
    if (VOUCHER_TYPE !== ctype) {
      alert("Invalid Voucher No. please seacr a valid Voucher No.");
      return false;
    }
    for (let i = 0; i < voucherNo.length; i++) {
      if (voucherNo.substr(i, 1) === ';') {
        alert("Voucher No. cannot contain ';'");
        return false;
      }
    }
    if (txnDate === '' || txnDate === 'undefined') {
      alert("Transaction Date cannot be blank");
      return false;
    }
    if (Number(drAmt) === 0 && Number(crAmt) === 0) {
      alert("Debit or Credit Amount must be non-zero");
      return false;
    }
    if (Number(drAmt) > 0 && Number(crAmt) > 0) {
      alert("Only Debit or Credit can be entered, not both");
      return false;
    }

    if (vouchEdit) {
      totalDrAmt = 0;
      totalCrAmt = 0;
      const newDatas = [...voucherData];
      for (let i = 0; i < newDatas.length; i++) {
        if (newDatas[i].id === vouch_id) {
          newDatas[i].glNo = glNo;
          newDatas[i].glSub = glSub;
          newDatas[i].glType = glType;
          newDatas[i].department = department;
          newDatas[i].glName = glName;
          newDatas[i].jeParticular = glDescription;
          newDatas[i].drAmt = drAmt;
          newDatas[i].crAmt = crAmt;
          newDatas[i].glID = glID;
          newDatas[i].voucherNo = voucherNo;
          newDatas[i].txnDate = txnDate;
          newDatas[i].companyID = companyID;
        }
        totalDrAmt += Number(newDatas[i].drAmt);
        totalCrAmt += Number(newDatas[i].crAmt);
      }
      setVoucherData(newDatas);
      vouchEdit = false;
      setDrAmt(0);
      setCrAmt(0);
    } else {
      vid = vid + 1;
      const newData = {
        id: vid,
        glNo: glNo,
        glSub: glSub,
        glType: glType,
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
      const newDatas = [...voucherData, newData];
      totalDrAmt = 0;
      totalCrAmt = 0;
      for (let i = 0; i < newDatas.length; i++) {
        totalDrAmt += Number(newDatas[i].drAmt);
        totalCrAmt += Number(newDatas[i].crAmt);
        newDatas[i].id = i + 1;
        newDatas[i].totalDrAmt = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        newDatas[i].totalCrAmt = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }
      setVoucherData(newDatas);
      setDrAmt(0);
      setCrAmt(0);
    }
  };

  const onPrint = async (voucherData, drTotal, crTotal) => {
    console.log(voucherData);
    if (voucherData.length === 0) {
      alert("No Voucher Data provided");
      return false;
    }
    if (voucherNo === null || voucherNo === '') {
      alert("No Voucher No. provided");
      return false;
    }
    for (var i = voucherData.length - 1; i >= 0; i--) {
      let date = txnDate;
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
    generatePDF(newDatas, headers, 'JV.pdf');
  };

  const onNew = async () => {
    window.location.href = '/purchaseDrCrNote';
  };

  const handleHome = async () => {
    window.location.href = '/home';
  };

  const onSave = async (voucherData, drTotal, crTotal) => {
    console.log(data);
    if (data.length === 0) {
      alert("No Purchase Invoice data to save");
      return false;
    }
    if (voucherData.length === 0) {
      alert('No Voucher to save');
      return false;
    }
    if (invoiceTotal === 0) {
      alert("Purchase Invoice Amount is ZERO");
      return false;
    }
    if (totalDrAmt !== totalCrAmt) {
      alert('Debit total and Credit total must equal');
      return false;
    }
    if (totalDrAmt !== txnNetTotal && totalCrAmt !== txnNetTotal) {
      alert("Debit/Credit Note Total not same as Voucher Dr/Cr Total");
      return false;
    }
    if (txnDate === '' || txnDate === 'undefined') {
      alert("Transaction Date cannot be blank");
      return false;
    }
    if (voucherNo === '' || voucherNo === null) {
      alert('Voucher No cannot be empty');
      return false;
    }
    for (let i = 0; i < data.length; i++) {
      data[i].voucherNo = voucherNo;
      data[i].companyID = companyID;
      data[i].invoiceNo = invoiceNo;
      data[i].supplierID = supplierID;
      data[i].supplierName = supplierName;
      data[i].txnDate = txnDate;
      data[i].jvInit = jvInit;
    }

    // Verify supplier
    const supplierCheck = await Axios.get(`/api/supplierSearch`, { params: { companyID: companyID, supplierID: supplierID } });
    if (supplierCheck.data.length === 0) {
      alert('Supplier ID: ' + supplierID + ' is invalid');
      return false;
    }

    // Verify voucher uniqueness
    const voucherCheck = await Axios.get(`/api/voucherVerify`, { params: { companyID: companyID, voucherNo: voucherNo } });
    if (voucherCheck.data === 'Existed') {
      alert('Voucher No. ' + voucherNo + ' already exists');
      return false;
    }

    // Verify purchase invoice
    const invoiceCheck = await Axios.get(`/api/purchaseInvoiceVerify`, { params: { companyID: companyID, supplierID: supplierID, invoiceNo: invoiceNo } });
    if (invoiceCheck.data !== 'Existed') {
      alert('Purchase Invoice No. ' + invoiceNo + ' Invalid');
      return false;
    }

    // Verify note uniqueness
    const noteCheck = await Axios.get(`/api/purchaseNoteVerify`, { params: { companyID: companyID, supplierID: supplierID, documentNo: documentNo } });
    if (noteCheck.data.length > 0) {
      alert('Purchase Note No. ' + documentNo + ' already exists');
      return false;
    }

    // Save note
    const noteRes = await Axios.post('/api/purchaseNote', data);
    if (noteRes.data !== 'Success') {
      alert(noteRes.data);
      return false;
    }
    console.log('voucheData to save: ',voucherData);
    // Save voucher
    const voucherRes = await Axios.post('/api/purchaseVoucher', voucherData);
    if (voucherRes.data === 'Success') {
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
      defaultInvType = '';
      window.location.href = '/purchaseDrCrNote';
    }
  };

  const onSearchInvoice = async (e) => {
    let invNo = e;
    if (invNo === '' || invNo === null) {
      alert('Purchase Invoice No. cannot be blank');
      return false;
    }
    if (supplierID === '' || supplierID === null) {
      alert('Supplier ID is empty');
      return false;
    }
    const res = await Axios.get(`/api/purchaseInvoiceSearch`, {
      params: { companyID: companyID, supplierID: supplierID, invType: 'PUR', invoiceNo: invoiceNo }
    });
    if (res.data.length > 0) {
      setInvoiceTotal(res.data[0].invoiceTotal.toFixed(2));
    } else {
      alert('Purchase Invoice No. ' + invoiceNo + ' is invalid');
      return false;
    }
  };
//const VOUCHER_TYPE = 'PDV';  
const onSearchVoucher = async () => {
    if (!txnDate || txnDate === 'null') {
        alert('No Date Selected');
        return false;
    }

    const dateObj = new Date(txnDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const yearSuffix = String(year).slice(-2);
    const monthPadded = String(month).padStart(2, '0');
    const prefix = `${VOUCHER_TYPE}${yearSuffix}${monthPadded}-`;
    const jvInitValue = `${yearSuffix}${monthPadded}`;

    try {
        const res = await Axios.get('/api/lastVoucherNo', {
            params: {
                companyID: companyID,
                prefix: prefix
            }
        });

        let nextVoucherNo;
        if (res.data && res.data.nextVoucherNo) {
            nextVoucherNo = res.data.nextVoucherNo;
        } else {
            nextVoucherNo = `${prefix}1`;
        }

        setVoucherNo(nextVoucherNo);
        setJvinit(jvInitValue);
    //    alert('Last Voucher No. fetched: '+nextVoucherNo+' === '+ jvInit);
        
    } catch (err) {
        console.error('Error fetching last voucher:', err);
        setVoucherNo(`${prefix}1`);
    }
};

  const handleInputChangeDrAmt = async (e) => {
    let num = e.target.value;
    if (num === '' || num === 'NaN') num = 0;
    setDrAmt(num);
  };

  const handleInputChangeCrAmt = async (e) => {
    let num = e.target.value;
    if (num === '' || num === 'NaN') num = 0;
    setCrAmt(num);
  };

  const formatInputTaxTotal = async (e) => {
    let num = e.target.value;
    if (num === '') num = 0;
    setTaxTotal(parseFloat(num).toFixed(2));
  };

  const formatInputTxnAmount = async (e) => {
    let num = e.target.value;
    if (num === '') num = 0;
    setTaxTotal(parseFloat(txnAmount * (taxRate / 100)).toFixed(2));
    setTxnAmount(parseFloat(num).toFixed(2));
  };

  const formatInputDrAmt = async (e) => {
    let num = e.target.value;
    if (num === '') num = 0;
    setDrAmt(parseFloat(num).toFixed(2));
  };

  const formatInputCrAmt = async (e) => {
    let num = e.target.value;
    if (num === '') num = 0;
    setCrAmt(parseFloat(num).toFixed(2));
  };

  const calculateTotal = async () => {
    return true;
  };

  const defaultSorted = [{
    dataField: 'supplierID',
    order: 'asc'
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
          Purchase Invoice Debit Note / Credit Note Entry
        </div>
      </div>

      <div>
        <label style={{ paddingLeft: "10px" }}>
          <a style={{ marginRight: '2rem' }}> Transaction Date : </a>
          <DatePicker
            id="txnDate"
            selected={txnDate}
            onChange={formatInputDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            wrapperClassName="date-picker-wrapper"
            showYearDropdown
            scrollableYearDropdown
          />
          <a style={{ marginLeft: '4.4rem' }}> Transaction Type : </a>
          <select value={invType} onChange={e => handleChangeType(e)}>
            {purType.map((item, idx) => (
              <option key={idx} value={item.value} required> {item.label}</option>
            ))}
          </select>
          <a style={{ marginLeft: '2rem' }}> No. : </a>
          <input
            type="text"
            value={documentNo}
            name="document"
            style={{ width: '200px', border: '1px solid #696969' }}
            className="text-uppercase"
            onChange={(e) => formatInputDocumentNo(e)}
            readOnly={false}
            required
          />
        </label>

        <label style={{ paddingLeft: "10px" }}>
          <a style={{ marginRight: '4.5rem' }}> Supplier ID : </a>
          <input
            type="text"
            style={{ width: '200px', border: '1px solid #696969' }}
            value={supplierID}
            name="supplier"
            className="text-uppercase"
            onChange={(e) => formatInputSupplierID(e)}
            required
            readOnly={lDisable}
          />
          <button
            style={{ padding: '6px' }}
            type='button'
            className='btn btn-primary fa fa-search float-right'
            onClick={() => onSearch()}
          ></button>
          <a style={{ marginLeft: '1.4rem', marginRight: '0.6rem' }}>Supplier Name : </a>
          <input
            type="text"
            style={{ width: '900px', border: '1px solid #696969' }}
            value={supplierName}
            name="supplierName"
            readOnly={true}
            required
          />
        </label>

        <label style={{ paddingLeft: "10px" }}>
          <a style={{ marginRight: '0.1rem' }}> Purchase Invoice No. : </a>
          <input
            type="text"
            style={{ width: '250px', border: '1px solid #696969' }}
            value={invoiceNo}
            name="invoiceNo"
            className="text-uppercase"
            ref={inputRefNote}
            onChange={(e) => setInvoiceNo(e.target.value)}
            required
          />
          <button
            style={{ padding: '6px' }}
            type='button'
            className='btn btn-primary fa fa-search float-right'
            onClick={() => onSearchInvoice(invoiceNo)}
          ></button>
          <a style={{ marginLeft: '1rem', marginRight: '1.5rem' }}> Invoice Total : </a>
          <input
            type="number"
            style={{ width: '150px', border: '1px solid #696969' }}
            value={invoiceTotal}
            name="invoiceTotal"
            readOnly={true}
          />
          <a style={{ marginLeft: '1rem', marginRight: '.5rem' }}> Debit/Credit Amount : </a>
          <input
            type="number"
            style={{ width: '150px', border: '1px solid #696969' }}
            value={txnAmount}
            onBlur={(e) => formatInputTxnAmount(e)}
            onChange={(e) => setTxnAmount(e.target.value)}
            name="txnAmount"
            readOnly={false}
          />
          <a style={{ marginLeft: '2rem', marginRight: '.1rem' }}> Tax Amount : </a>
          <input
            type="number"
            style={{ width: '150px', border: '1px solid #696969' }}
            value={taxTotal}
            onBlur={(e) => formatInputTaxTotal(e)}
            onChange={(e) => setTaxTotal(e.target.value)}
            name="taxTotal"
            readOnly={false}
          />
        </label>

        <label style={{ paddingLeft: '10px' }}>
          <a style={{ marginRight: '3.5rem' }}> Tax Selection : </a>
          <select value={id} onChange={(e) => handleChangeTax(e)}>
            {taxData.map((item, idx) => (
              <option key={idx} value={item.id} required>
                (ID-{item.taxID}) (Type-{item.taxType}) (Code-{item.taxCode}) (Description-{item.taxDescription}) (Rate-{item.taxRate}%)
              </option>
            ))}
          </select>
        </label>

        <label htmlFor='particular' style={{ paddingLeft: '10px' }}>
          Particular :
          <input
            type="text"
            style={{ marginLeft: '5.6rem', width: '1300px', border: '1px solid #696969' }}
            value={txnParticular}
            name="txnParticular"
            onChange={(e) => setParticular(e.target.value)}
            readOnly={false}
          />
        </label>

        <p></p>
        <div style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} />

        <div className="select-container">
          <p></p>
          <table className="table" style={{ marginLeft: '.5rem', paddingTop: '1px', border: '1px solid black' }}>
            <thead className="thead-dark">
              <tr style={{ align: 'left' }}>
                <th style={{ width: '.5px', textAlign: 'center' }}>#</th>
                <th style={{ backgroundColor: '#999999', width: '130px', textAlign: 'center' }}>Invoice No</th>
                <th style={{ backgroundColor: '', width: '500px', textAlign: 'center' }}>Transaction Particular</th>
                <th style={{ backgroundColor: '#999999', width: '130px', textAlign: 'center' }}>Txn. Amount</th>
                <th style={{ backgroundColor: '', width: '130px', textAlign: 'center' }}>Tax Amount</th>
                <th style={{ backgroundColor: '#999999', width: '130px', textAlign: 'center' }}>Net Amount</th>
                <th style={{ backgroundColor: 'blue', textAlign: 'center', color: 'white', width: '15px' }}>Select</th>
              </tr>
            </thead>
            <tbody style={mystyle}>
              {data.map(item => (
                <tr key={item.id}>
                  <td style={{ backgroundColor: 'yellow' }}>{item.id}</td>
                  <td style={{ backgroundColor: '#999999', textAlign: 'left' }}>{item.invoiceNo}</td>
                  <td style={{ backgroundColor: 'yellow', textAlign: 'left' }}>{item.txnParticular}</td>
                  <td style={{ textAlign: 'right', backgroundColor: '#999999' }}>{parseFloat(item.txnAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                  <td style={{ textAlign: 'right', backgroundColor: 'yellow' }}>{parseFloat(item.taxTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                  <td style={{ textAlign: 'right', backgroundColor: '#999999' }}>{parseFloat(item.netTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                  <td>
                    <button className="fa fa-edit" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEdit(item.id)}> </button>
                    <button className="fa fa-trash" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleRemove(item.id)}> </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td style={{ textAlign: "right", backgroundColor: "cyan" }}>Transaction Total :</td>
                <td style={{ textAlign: "right", color: "red" }}>{parseFloat(TotalTxnAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right", color: "red" }}>{parseFloat(TotalTaxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right", color: "red" }}>{parseFloat(txnNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p></p>
        <div style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} />
        <p></p>

        <div style={{ display: 'flex', gap: '10px', marginLeft: '0.5rem' }}>
          <button className="fa fa-home btn btn-secondary" onClick={() => handleHome()}>Home</button>
          <button className="fa fa-book btn btn-primary"  onClick={() => onNew()}>New Note</button>
          <button className="fa fa-file btn btn-success" onClick={() => handleAddNote()}>Add Dr/Cr Note</button>
        </div>

        <p></p>
        <div style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} />
        <p></p>

        <div className="row">
          <div className="col-sx-12 btn btn-secondary" style={{ marginTop: '1px' }}>
            Debit Note / Credit Note Voucher Entry
          </div>
        </div>

        <table className="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
          <thead className="thead-dark">
            <tr style={{ align: 'left' }}>
              <th style={{ width: '.5px', textAlign: 'center' }}>#</th>
              <th style={{ backgroundColor: '#999999', width: '5px', textAlign: 'center' }}>G/L No.</th>
              <th style={{ backgroundColor: '', width: '5px', textAlign: 'center' }}>G/L Sub</th>
              <th style={{ backgroundColor: '#999999', width: '.5px', textAlign: 'center' }}>G/L Type</th>
              <th style={{ backgroundColor: '', width: '.5px', textAlign: 'center' }}>Dep.</th>
              <th style={{ backgroundColor: '#999999', width: '200px', textAlign: 'center' }}>G/L Name</th>
              <th style={{ backgroundColor: '', width: '100px', textAlign: 'center' }}>G/L Description</th>
              <th style={{ backgroundColor: '#999999', width: '10px', textAlign: 'center' }}>Dr. Amount</th>
              <th style={{ backgroundColor: '', width: '10px', textAlign: 'center' }}>Cr. Amount</th>
              <th style={{ backgroundColor: 'blue', textAlign: 'center', color: 'white', width: '10px' }}>Select</th>
            </tr>
          </thead>
          <tbody style={mystyle}>
            {voucherData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ backgroundColor: '#999999' }}>{item.glNo}</td>
                <td>{item.glSub}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#999999' }}>{item.glType}</td>
                <td style={{ textAlign: 'left' }}>{item.department}</td>
                <td style={{ textAlign: 'left', backgroundColor: '#999999' }}>{item.glName}</td>
                <td style={{ textAlign: 'left' }}>{item.jeParticular}</td>
                <td style={{ textAlign: "right", color: 'red', backgroundColor: 'cyan' }}>{parseFloat(item.drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right", color: "blue", backgroundColor: 'cyan' }}>{parseFloat(item.crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td>
                  <button className="fa fa-edit" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEditVoucher(item.id)}> </button>
                  <button className="fa fa-trash" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleRemoveVoucher(item.id)}> </button>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ textAlign: "Right", backgroundColor: "green", color: 'white' }}>Voucher Totals :</td>
              <td style={{ textAlign: "right", backgroundColor: 'cyan', color: "red" }}>{parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              <td style={{ textAlign: "right", color: "blue", backgroundColor: 'cyan' }}>{parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="9"></td>
            </tr>
          </tfoot>
        </table>

        <div>
          <label style={{ paddingLeft: '0px' }}>
            <a style={{ marginLeft: '0.5rem', marginRight: '0rem' }}> Voucher No. : </a>
            <input
              type="text"
              value={voucherNo}
              name="voucher"
              style={{ marginLeft: '0.7rem', width: '200px', border: '1px solid #696969' }}
              className="text-uppercase"
              ref={inputRef}
              onChange={(e) => formatInputVoucherNo(e)}
              readOnly={false}
              required
            />
            <button
              style={{ padding: '10px' }}
              type='button'
              className='btn btn-primary fa fa-download float-right'
              onClick={() => onSearchVoucher(voucherNo)}
            ></button>
            <div></div>

            <a style={{ marginLeft: '0.5rem', marginRight: '.3rem' }}> G/L Selection : </a>
            <select value={ID} onChange={(e) => handleChangeGl(e)} style={{ marginLeft: '0rem', marginRight: '1rem' }}>
              {glData.map((item, idx) => (
                <option key={idx} value={item.id} required>
                  (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})
                </option>
              ))}
            </select>

            <div>
              <label style={{ paddingLeft: '0px' }}>
                <a style={{ marginLeft: '0rem', marginRight: '0rem' }}> Debit Amount : </a>
                <input
                  type="number"
                  style={{ marginLeft: '.2rem', width: '200px', border: '1px solid #696969' }}
                  value={drAmt}
                  name="drAmt"
                  step='0.01'
                  ref={inputRefVoucher}
                  onBlur={(e) => formatInputDrAmt(e)}
                  onChange={(e) => handleInputChangeDrAmt(e)}
                  maxLength={13}
                />
                <a style={{ marginLeft: '3rem', marginRight: '0rem' }}> Credit Amount : </a>
                <input
                  type="number"
                  style={{ width: '200px', border: '1px solid #696969' }}
                  value={crAmt}
                  name="crAmt"
                  step='0.01'
                  onBlur={(e) => formatInputCrAmt(e)}
                  onChange={(e) => handleInputChangeCrAmt(e)}
                  maxLength={13}
                />
              </label>
            </div>
            <p></p>

            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <button class = 'btn btn-success' style={{marginRight: '10px'}} onClick={() => onPrint(voucherData, totalDrAmt, totalCrAmt)}>
                <i className='fa fa-print' style={{ marginRight: '5px' }}></i> Print Voucher
              </button>
              <button class='btn btn-danger' style={{marginRight: '10px'}} onClick={() => onSave(voucherData, totalDrAmt, totalCrAmt)}>
                <i className='fa fa-save' style={{ marginRight: '5px' }}></i> Save Invoice and Voucher
              </button>
              <button class='btn btn-warning' onClick={() => onAddVoucher()}>
                <i className='fa fa-plus' style={{ marginRight: '5px' }}></i> Add Voucher Item
              </button>
            </div>
          </label>
        </div>

        <p></p>
        <div className='row' style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} />

        <div className="row">
          <div className="col-sx-10 btn btn-info" style={{ marginTop: '1px', paddingLeft: '10px' }}>
            Supplier Selection
            <a> <button style={{ float: 'right', backgroundColor: 'black', color: 'white'}} onClick={() => handleCancel()}>Clear Customer</button></a>
          </div>
          <span className="square border border-dark"></span>
          <BootstrapTable
            bootstrap4
            keyField='id'
            data={custData}
            columns={columns}
            defaultSorted={defaultSorted}
            pagination={pagination}
            rowStyle={{ backgroundColor: '#A9A9A9', border: '3px solid grey' }}
            className="table border border-dark"
          />
        </div>
      </div>
    </div>
  );
}

export default PurchaseDrCrNote;