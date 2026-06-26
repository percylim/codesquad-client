import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios';
import './Profile.css';
import generatePDF from "./reportGenerator";
import { format } from "date-fns";
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');

var glData = [];
var taxData = [];
var glNo = '';
var department = '';
var glDescription = '';
var glSub = '';
var glName = '';
var glType = '';
var totalDrAmt = 0;
var totalCrAmt = 0;
var acctType = 'SUPP';
var paymentTerm = 0;
var invoiceTotal = 0;
var invoiceDiscountTotal = 0;
var invoiceTaxTotal = 0;
var invoiceNetTotal = 0;
var pur_id = 0;
var vouch_id = 0;
var invEdit = false;
var vouchEdit = false;
var lDisable = false;


var purType = [
  { label: 'Purchase Item', value: 'PUR' },
  { label: 'FOC Item', value: 'FOC' },
];
var curr = new Date();
curr.setDate(curr.getDate());
var todayDate = curr.toISOString().substr(0, 10);
var vid = 0;
var glID = 0;
var iRead = false;
var VOUCHER_TYPE = 'PRV';
// JNV, PNV, SNV, PRV, SRV, PDV, SDV, PCV or SCV
function PurchaseReturnNote() {
  const [data, setData] = useState([]);
  const [id, setTax] = useState('');
  const [ID, setGlID] = useState('');
  const [voucherData, setVoucherData] = useState([]);
  const [custData, setCustData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [supplierID, setSupplierID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [productID, setProductID] = useState("");
  const [unit, setUnit] = useState("");
  const [productName, setProductName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [returnQuantity, setReturnQuantity] = useState('');
  const [itemTotal, setItemTotal] = useState('');
  const [itemTax, setItemTax] = useState(0.00);
  const [itemDiscount, setItemDiscount] = useState(0.00);
  const [itemNetTotal, setItemNetTotal] = useState(0.00);
  const [drAmt, setDrAmt] = useState('');
  const [crAmt, setCrAmt] = useState('');
  const [totalTax, setTotalTax] = useState(0);
  const [totalNetAmt, setTotalNetAmt] = useState(0);
  const [defaultQty, setDefaultQty] = useState(0);
  const [barcode, setBarcode] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [taxCode, setTaxCode] = useState('');
  const [taxID, setTaxID] = useState('');
  const [txnDate, setTxnDate] = useState(todayDate);
  const [returnParticular, setReturnParticular] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const inputReference = useRef(null);
  const inputRef = useRef(null);
  const inputRefVoucher = useRef(null);
  const [jvInit, setJvinit] = useState('');
  const [totalDrAmt, setTotalDrAmt] = useState(0);
  const [totalCrAmt, setTotalCrAmt] = useState(0);
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [invoiceTaxTotal, setInvoiceTaxTotal] = useState(0);
  const [invoiceNetTotal, setInvoiceNetTotal] = useState(0);
  
  const mystyle = { align: "left" };

  if (txnDate === null) setTxnDate(todayDate);

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
      formatter: (cellContent, row) => {
        return <button className="fa fa-check-square" onClick={() => handleSelectSupplier(row.supplierID, row.supplierName, row.glNo, row.glSub)}></button>
      },
    }
  ];

  useEffect(() => {
    setDrAmt(0);
    setCrAmt(0);

    Axios.get(`/api/glList`, { params: { companyID } })
      .then(res => {
        glData = res.data;
        setGlID(glData[0]?.id || '');
        glNo = glData[0]?.glNo || '';
        glSub = glData[0]?.glSub || '';
        glName = glData[0]?.glName || '';
        department = glData[0]?.department || '';
        glDescription = glData[0]?.glDescription || '';
        glType = glData[0]?.glType || '';
      });

    Axios.get(`/api/taxList`, { params: { companyID, taxType: 'OUTPUT' } })
      .then(res => {
        taxData = res.data;
        if (taxData.length > 0) {
          setTax(taxData[0].id);
          setTaxRate(taxData[0].taxRate);
          setTaxCode(taxData[0].taxCode);
          setTaxID(taxData[0].taxID);
        } else {
          alert('Government Tax is not defined');
        }
      });
  }, []);

  const handleSelectSupplier = (ID, name, gNo, gSub) => {
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
      }
    }
  };

  const handleSelectProduct = (ID, name, Tax, Punit, price, qty) => {
    setProductID(ID);
    setProductName(name);
    setUnit(Punit);
    setUnitPrice(Number(price).toFixed(2));
    setDefaultQty(qty);
    let foundBarcode = '';
    for (let i = 0; i < invoiceData.length; i++) {
      if (invoiceData[i].productID === ID) {
        foundBarcode = invoiceData[i].barcode;
        break;
      }
    }
    setBarcode(foundBarcode);
    for (let i = 0; i < taxData.length; i++) {
      if (taxData[i].taxID === Tax) {
        setTax(taxData[i].id);
        setTaxRate(taxData[i].taxRate);
        setTaxCode(taxData[i].taxCode);
        setTaxID(taxData[i].taxID);
        break;
      }
    }
  };

  const handleChangeTax = async (e) => {
    let selectedId = Number(e.target.value);
    for (let i = 0; i < taxData.length; i++) {
      if (taxData[i].id === selectedId) {
        setTax(taxData[i].id);
        setTaxID(taxData[i].taxID);
        setTaxRate(taxData[i].taxRate);
        setTaxCode(taxData[i].taxCode);
        break;
      }
    }
    calculateTotal();
  };

  const handleChangeGl = async (e) => {
    let selectedId = Number(e.target.value);
    for (let i = 0; i < glData.length; i++) {
      if (glData[i].id === selectedId) {
        setGlID(glData[i].id);
        glNo = glData[i].glNo;
        glSub = glData[i].glSub;
        glType = glData[i].glType;
        department = glData[i].department;
        glName = glData[i].glName;
        glDescription = glData[i].glDescription;
      }
    }
  };

  const formatInputDate = (e) => {
    setTxnDate(e.target.value);
    inputRef.current.focus();
  };

  const formatInputVoucherNo = (e) => {
    setVoucherNo(e.target.value.toUpperCase());
  };

  const formatInputSupplierID = (e) => {
    setSupplierID(e.target.value.toUpperCase());
  };

  const formatInputParticular = (e) => {
    setReturnParticular(e.target.value);
  };

  const formatInputDocumentNo = (e) => {
    setDocumentNo(e.target.value.toUpperCase());
  };

  const formatInputProductID = (e) => {
    setProductID(e.target.value.toUpperCase());
  };

  const formatInputInvoiceNo = (e) => {
    setInvoiceNo(e.target.value.toUpperCase());
  };

const handleRemove = async (id) => {
    const newData = data.filter(item => item.id !== id);
    const reindexedData = newData.map((item, idx) => ({ ...item, id: idx + 1 }));
    
    // Recalculate totals
    let total = 0;
    let taxTotal = 0;
    let netTotal = 0;
    reindexedData.forEach(item => {
        total += Number(item.itemTotal) || 0;
        taxTotal += Number(item.itemTax) || 0;
        netTotal += Number(item.itemNetTotal) || 0;
    });
    
    setData(reindexedData);
    setInvoiceTotal(total);
    setInvoiceTaxTotal(taxTotal);
    setInvoiceNetTotal(netTotal);
};

  const handleRemoveVoucher = (id) => {
    const newData = [...voucherData];
    const index = newData.findIndex(item => item.id === id);
    if (index !== -1) newData.splice(index, 1);
    totalDrAmt = 0;
    totalCrAmt = 0;
    let vID = 0;
    for (let i = 0; i < newData.length; i++) {
      totalDrAmt += Number(newData[i].drAmt);
      totalCrAmt += Number(newData[i].crAmt);
      newData[i].id = ++vID;
    }
    setVoucherData(newData);
  };

  const onAddVoucher = () => {
    if (!voucherNo) { alert("Journal Voucher No. cannot be blank"); return false; }
    if (voucherNo.includes(';')) { alert("Voucher No. cannot contain ';'"); return false; }
    if (!txnDate || txnDate === 'undefined') { alert("Transaction Date cannot be blank"); return false; }
    
    const drValue = parseFloat(drAmt) || 0;
    const crValue = parseFloat(crAmt) || 0;
    
    if (drValue === 0 && crValue === 0) { alert("Debit or Credit Amount must be non-zero"); return false; }
    if (drValue > 0 && crValue > 0) { alert("Only Debit or Credit can be entered, not both"); return false; }

    if (vouchEdit) {
        let totalDr = 0;
        let totalCr = 0;
        const newDatas = [...voucherData];
        
        for (let i = 0; i < newDatas.length; i++) {
            if (newDatas[i].id === vouch_id) {
                newDatas[i].glNo = glNo;
                newDatas[i].glSub = glSub;
                newDatas[i].glType = glType;
                newDatas[i].department = department;
                newDatas[i].glName = glName;
                newDatas[i].jeParticular = glDescription;
                // ✅ Format to 2 decimal places
                newDatas[i].drAmt = drValue.toFixed(2);
                newDatas[i].crAmt = crValue.toFixed(2);
                newDatas[i].glID = glID;
                newDatas[i].voucherNo = voucherNo;
                newDatas[i].txnDate = txnDate;
            }
            // Parse for totals (remove any formatting)
            const drNum = parseFloat(String(newDatas[i].drAmt).replace(/,/g, '')) || 0;
            const crNum = parseFloat(String(newDatas[i].crAmt).replace(/,/g, '')) || 0;
            totalDr += drNum;
            totalCr += crNum;
        }
        
        setVoucherData(newDatas);
        setTotalDrAmt(totalDr.toFixed(2));
        setTotalCrAmt(totalCr.toFixed(2));
        vouchEdit = false;
        setDrAmt(0);
        setCrAmt(0);
        
    } else {
        vid = vid + 1;
        const newData = {
            id: vid,
            glNo, glSub, glType, department, glName,
            jeParticular: glDescription,
            // ✅ Format to 2 decimal places
            drAmt: drValue.toFixed(2),
            crAmt: crValue.toFixed(2),
            glID, voucherNo, txnDate, companyID
        };
        
        const newDatas = [...voucherData, newData];
        let totalDr = 0;
        let totalCr = 0;
        
        for (let i = 0; i < newDatas.length; i++) {
            const drNum = parseFloat(String(newDatas[i].drAmt).replace(/,/g, '')) || 0;
            const crNum = parseFloat(String(newDatas[i].crAmt).replace(/,/g, '')) || 0;
            totalDr += drNum;
            totalCr += crNum;
            newDatas[i].id = i + 1;
        }
        
        setVoucherData(newDatas);
        setTotalDrAmt(totalDr.toFixed(2));
        setTotalCrAmt(totalCr.toFixed(2));
        setDrAmt(0);
        setCrAmt(0);
    }
};

const onAddReturnNote = () => {
    if (!voucherNo) { alert("Journal Voucher No. cannot be blank"); return false; }
    if (voucherNo.includes(';')) { alert("Voucher No. cannot contain ';'"); return false; }
    if (!txnDate || txnDate === 'undefined') { alert("Transaction Date cannot be blank"); return false; }
    if (!supplierID) { alert("No Supplier selected"); return false; }
    if (!productID) { alert("No Product selected"); return false; }
    if (!invoiceNo) { alert("Invoice No. cannot be blank"); return false; }
    if (returnQuantity === 0) { alert('Return Quantity cannot be ZERO'); return false; }
    if (Number(unitPrice) === 0) { alert('Unit Price cannot be ZERO'); return false; }
    if (taxRate > 0 && Number(itemTax) === 0) { alert('Tax cannot be ZERO'); return false; }
    if (defaultQty > 0 && returnQuantity > defaultQty) { alert("Return Quantity cannot exceed Purchased Quantity"); return false; }

    if (invEdit) {
        const newDatas = [...data];
        for (let i = 0; i < newDatas.length; i++) {
            if (newDatas[i].id === pur_id) {
                Object.assign(newDatas[i], {
                    voucherNo, companyID, supplierID, supplierName, invoiceNo,
                    productID, documentNo, productName, txnDate, returnQuantity,
                    unit, unitPrice, itemTotal, itemTax, itemNetTotal,
                    taxID, taxType: taxData.find(t => t.taxID === taxID)?.taxType || '',
                    taxCode, taxRate, returnParticular, defaultQty, barcode
                });
            }
        }
        setData(newDatas);
        
        // Recalculate totals after edit
        let total = 0;
        let taxTotal = 0;
        let netTotal = 0;
        for (let i = 0; i < newDatas.length; i++) {
            total += Number(newDatas[i].itemTotal) || 0;
            taxTotal += Number(newDatas[i].itemTax) || 0;
            netTotal += Number(newDatas[i].itemNetTotal) || 0;
        }
        setInvoiceTotal(total);
        setInvoiceTaxTotal(taxTotal);
        setInvoiceNetTotal(netTotal);
        
        invEdit = false;
        
    } else {
        vid = vid + 1;
        const newData = {
            id: vid, voucherNo, companyID, supplierID, supplierName, invoiceNo,
            productID, productName, txnDate, returnQuantity, unit, unitPrice,
            itemTotal, documentNo, itemTax, itemNetTotal, taxID,
            taxType: taxData.find(t => t.taxID === taxID)?.taxType || '',
            taxCode, taxRate, returnParticular, defaultQty, barcode
        };
        
        const newDatas = [...data, newData];
        
        // Recalculate totals from scratch
        let total = 0;
        let taxTotal = 0;
        let netTotal = 0;
        
        for (let i = 0; i < newDatas.length; i++) {
            total += Number(newDatas[i].itemTotal) || 0;
            taxTotal += Number(newDatas[i].itemTax) || 0;
            netTotal += Number(newDatas[i].itemNetTotal) || 0;
            newDatas[i].id = i + 1;
        }
        
        setData(newDatas);
        setInvoiceTotal(total);
        setInvoiceTaxTotal(taxTotal);
        setInvoiceNetTotal(netTotal);
    }
    
    setDefaultQty(0);
    lDisable = true;
    setUnitPrice(0);
    setItemTotal(0);
    setReturnQuantity(0);
    setItemTax(0);
    setItemNetTotal(0);
};

  const handleEdit = (e) => {
    const newData = [...data];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === e) {
        setProductID(newData[i].productID);
        setProductName(newData[i].productName);
        setUnit(newData[i].unit);
        setReturnQuantity(newData[i].returnQuantity);
        setUnitPrice(newData[i].unitPrice);
        setItemTotal(newData[i].itemTotal);
        setItemTax(newData[i].itemTax);
        setItemNetTotal(newData[i].itemNetTotal);
        setReturnParticular(newData[i].returnParticular);
        setDefaultQty(newData[i].defaultQty);
        invEdit = true;
        pur_id = e;
      }
    }
    inputReference.current.focus();
  };

  const handleEditVoucher = (e) => {
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

  const onPrint = (voucherData) => {
    if (!voucherData.length) { alert("No Voucher Data provided"); return; }
    if (!voucherNo) { alert("No Voucher No. provided"); return; }
    const printData = voucherData.map(item => ({
      ...item,
      txnDate: format(new Date(txnDate), "dd/MM/yyyy"),
      drAmt: parseFloat(item.drAmt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      crAmt: parseFloat(item.crAmt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }));
    printData[0].id = 'B';
    printData[0].totalDrAmt = totalDrAmt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    printData[0].totalCrAmt = totalCrAmt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    printData.push({
      id: printData.length + 1,
      jeParticular: 'Total:',
      drAmt: printData[0].totalDrAmt,
      crAmt: printData[0].totalCrAmt
    });
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
    generatePDF(printData, headers, 'JV.pdf');
  };

  const onSearch = () => {
  //  if (!supplierID) return;
    Axios.get(`/api/supplierSearch`, { params: { companyID, supplierID } })
      .then(res => {
        if (res.data.length) {
          setSupplierName(res.data[0].supplierName);
          for (let i = 0; i < glData.length; i++) {
            if (glData[i].glNo === res.data[0].glNo && glData[i].glSub === res.data[0].glSub) {
              setGlID(glData[i].id);
              glNo = glData[i].glNo; glSub = glData[i].glSub;
              glName = glData[i].glName; glType = glData[i].glType;
              department = glData[i].department; glDescription = glData[i].glDescription;
            }
          }
        } else {
          Axios.get(`/api/customerList`, { params: { companyID } })
            .then(res => { if (res.data.length) setCustData(res.data); alert('Please select from Supplier list below'); });
        }
      });
  };

  const onSearchInvoice = () => {
    if (!supplierID) { alert("No Supplier Selected"); return; }
    if (!invoiceNo) { alert("Purchase Invoice No. is blank"); return; }
    Axios.get(`/api/purchaseInvoiceVerify`, { params: { companyID, supplierID, invoiceNo } })
      .then(res => { if (res.data !== 'Existed') alert('Invalid Invoice No.'); });
    Axios.get(`/api/purchaseInvoiceDetail`, { params: { companyID, supplierID, invoiceNo } })
      .then(res => {
        let iData = res.data;
        let Tax = 0, Amt = 0;
         console.log('Invoice Data: ',iData);
        iData.forEach(item => {
          Tax += item.itemTaxTotal;
          Amt += item.itemNetTotal;
          item.invoiceDate = new Date(item.invoiceDate).toLocaleDateString();
        });
        setInvoiceData(iData);
        setTotalTax(Tax);
        setTotalNetAmt(Amt);
      });
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

  const onSearchProduct = () => {
    if (productID === '*') { setProductName('None Stock Item'); setUnit(''); return; }
    Axios.get(`/api/ProductSearch`, { params: { companyID, productID } })
      .then(res => {
        if (res.data.length) {
          setProductName(res.data[0].productName);
          setBarcode(res.data[0].barcode);
          setUnit(res.data[0].unit);
        } else {
          alert("Product ID invalid, please select from list");
        }
      });
  };

  const calculateTotal = () => {
    let iTotal = Number(returnQuantity) * Number(unitPrice);
    setItemTotal(parseFloat(iTotal).toFixed(2));
    setItemTax(parseFloat(iTotal * (taxRate / 100)).toFixed(2));
    setItemNetTotal(parseFloat(iTotal + iTotal * (taxRate / 100)).toFixed(2));
  };

  const handleInputChangeQty = (e) => {
    setReturnQuantity(e.target.value);
    calculateTotal();
  };
  const handleInputChangePrice = (e) => {
    setUnitPrice(e.target.value);
    calculateTotal();
  };
  const handleInputChangeTaxManual = (e) => {
    setItemTax(e.target.value);
    calculateTotal();
  };
  const formatInputQty = (e) => {
    let num = parseFloat(e.target.value);
    if (isNaN(num)) num = 0;
    setReturnQuantity(num.toFixed(3));
    calculateTotal();
  };
  const formatInputUnitPrice = (e) => {
    let num = parseFloat(e.target.value);
    if (isNaN(num)) num = 0;
    setUnitPrice(num.toFixed(2));
    calculateTotal();
  };
  const formatInputTax = (e) => {
    let num = parseFloat(e.target.value);
    if (isNaN(num)) num = 0;
    setItemTax(num.toFixed(2));
    calculateTotal();
  };

  const handleCancel = () => setCustData([]);
  const handleCancelInvoice = () => { setTotalTax(0); setTotalNetAmt(0); setInvoiceData([]); };
  const onNew = () => window.location.href = '/purchaseReturnNote';
  const handleHome = () => window.location.href = '/home';

  const defaultSorted = [{ dataField: 'supplierID', order: 'asc' }];
  const pagination = paginationFactory({
    page: 2, sizePerPage: 5, lastPageText: '>>', firstPageText: '<<',
    nextPageText: '>', prePageText: '<', showTotal: true, alwaysShowAllBtns: true,
    onPageChange: (page, sizePerPage) => console.log('page', page, 'sizePerPage', sizePerPage),
    onSizePerPageChange: (page, sizePerPage) => console.log('page', page, 'sizePerPage', sizePerPage)
  });

// Helper function to format amounts
const formatAmount = (value) => {
    if (value === undefined || value === null) return '0.00';
    const num = typeof value === 'number' ? value : parseFloat(String(value).replace(/,/g, ''));
    return isNaN(num) ? '0.00' : num.toFixed(2);
};

// on Save Purchase Invoice and Voucher *******************
  const onSave = async (voucherData, drTotal, crTotal) => {
    // e.preventDefault();
    console.log('data :',data);
     console.log('voucherData : ',voucherData);
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
     setVoucherNo(voucherData[0].voucherNo);
    if (invoiceTotal === 0) {
      alert("Purchase Invoice Amount is ZERO");
      return false;
    }


    if (totalDrAmt !== totalCrAmt) {
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
      data[i].companyID = companyID;
      data[i].jvInit = jvInit;
      //   alert(taxData[i].taxID);
      //   alert(taxID);
    }


    Axios
      .get(`/api/supplierSearch`,
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

    // verify Voucher No
    Axios
      .get(`/api/voucherVerify`,
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
      .get(`/api/purchaseNoteVerify`,
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
      .post('/api/purchaseReturnNote', data



      )

      .then(res => {


        if (res.data === 'Success') {



          //    window.location.reload(false);
          // window.location.href='journalVoucher';

        };
        //  alert(text);
      }, []);


// return false;

    /** update voucher */
    //alert(voucherData[0].glNo);
   console.log('Voucher Data to save :',voucherData);
    Axios
      .post('/api/purchaseVoucher', voucherData



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
          window.location.href = '/purchaseReturnNote';

        };
        //  alert(text);
      }, []);




  };



  return (
    <div>
      {/* Header */}
      <div className="row">
        <div className="col-sm-12 btn btn-success" style={{ marginTop: '1px' }}>
          Purchase Invoice Goods Return Note Entry
        </div>
      </div>

      {/* Supplier Section */}
      <div>
        <label style={{ paddingLeft: "10px" }}>
          <a style={{ marginRight: '2.5rem' }}> Supplier ID : </a>
          <input type="text" style={{ width: '200px', border: '1px solid #696969' }}
            value={supplierID} name="supplier" className="text-uppercase"
            onChange={formatInputSupplierID} required readOnly={lDisable} />
          <button style={{ padding: '3px', height: '38px' }} type='button' className='btn btn-primary'
            onClick={onSearch}><i className="fa fa-search"></i></button>
          <a style={{ marginLeft: '3.6rem', marginRight: '0.4rem' }}>Supplier Name : </a>
          <input type="text" style={{ width: '900px' }} value={supplierName} readOnly required />
        </label>
      </div>

      {/* Return Note No. and Date */}
      <label style={{ paddingLeft: "10px" }}>
        <a style={{ marginRight: '.2rem' }}> Return Note No. : </a>
        <input type="text" style={{ width: '200px', border: '1px solid #696969' }}
          value={documentNo} className="text-uppercase" onChange={formatInputDocumentNo}
          required readOnly={iRead} />
        <a style={{ marginLeft: '5.3rem', marginRight: '1.5rem' }}>Return Date : </a>
        <DatePicker selected={txnDate} onChange={formatInputDate}
          dateFormat="dd/MM/yyyy" placeholderText="dd/mm/yyyy"
          wrapperClassName="date-picker-wrapper" showYearDropdown scrollableYearDropdown />
      </label>

      {/* Return Items Table */}
      <div className="select-container">
        <p></p>
        <table className="table" style={{ paddingTop: '1px', border: '1px solid black', paddingLeft: '10px' }}>
          <thead className="thead-dark">
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
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ backgroundColor: '#999999' }}>{item.productID}</td>
                <td style={{ textAlign: 'left' }}>{item.productName}</td>
                <td style={{ textAlign: 'right', backgroundColor: '#999999' }}>{Number(item.returnQuantity).toFixed(3)}</td>
                <td>{item.unit}</td>
                <td style={{ backgroundColor: '#999999' }}>{item.taxType}</td>
                <td style={{textAlign: 'right'}}>{parseFloat(item.unitPrice).toFixed(3)}</td>
                <td style={{ backgroundColor: '#999999', textAlign: 'right' }}>{Number(item.itemTax).toFixed(2)}</td>
                <td style={{ textAlign: 'right' }}>{parseFloat(item.itemNetTotal).toFixed(2)}</td>
                <td style={{ backgroundColor: '#999999' }}>{item.taxID}</td>
                <td>
                  <button className="fa fa-edit" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEdit(item.id)}> </button>
                  <button className="fa fa-trash" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleRemove(item.id)}> </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="6"></td>
              <td style={{ textAlign: "right", backgroundColor: "cyan" }}>Totals :</td>
              <td style={{ textAlign: "right", color: "red" }}>{invoiceTaxTotal.toFixed(2)}</td>
              <td style={{ textAlign: "right", color: "red" }}>{invoiceNetTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        
        </table>
      </div>

      {/* Invoice No. and Product Selection */}
      <label style={{ paddingLeft: "10px", paddingTop: '40px' }}>
        <a style={{ marginRight: '.3rem' }}> Invoice No. : </a>
        <input type="text" value={invoiceNo} style={{ width: '245px' }} className="text-uppercase"
          onChange={formatInputInvoiceNo} readOnly={iRead} required />
        <button style={{ padding: '3px', height: '38px' }} type='button' className='btn btn-primary'
          onClick={onSearchInvoice}><i className="fa fa-search"></i></button>
      </label>

      <label style={{ paddingLeft: "10px" }}>
        <a style={{ marginRight: '.6rem' }}> Product ID : </a>
        <input type="text" style={{ width: '200px' }} value={productID} className="text-uppercase"
          ref={inputReference} onChange={formatInputProductID} required />
        <button style={{ padding: '3px', height: '38px' }} type='button' className='btn btn-primary'
          onClick={onSearchProduct}><i className="fa fa-search"></i></button>
        <a style={{ marginLeft: '4rem', marginRight: '.6rem' }}> Product Name : </a>
        <input type="text" style={{ width: '600px' }} value={productName} readOnly />
        <a style={{ marginLeft: '4rem', marginRight: '.6rem' }}> Unit : </a>
        <input type="text" style={{ width: '60px' }} value={unit} readOnly />
      </label>

      <div style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} />

      {/* Tax Selection and Quantity/Price */}
      <label style={{ paddingLeft: '10px' }}>
        <a style={{ marginRight: '1.8rem' }}> Tax Selection : </a>
        <select value={id} onChange={handleChangeTax}>
          {taxData.map(item => (
            <option key={item.id} value={item.id}> (ID-{item.taxID}) (Type-{item.taxType}) (Code-{item.taxCode}) (Description-{item.taxDescription}) (Rate-{item.taxRate}%)</option>
          ))}
        </select>
      </label>

      <label style={{ paddingLeft: "10px" }}>
        <a> Return Quantity : </a>
        <input type="number" style={{ width: '150px' }} value={returnQuantity}
          onBlur={formatInputQty} onChange={handleInputChangeQty} />
        <a style={{ marginRight: '.6rem' }}> Unit Price : </a>
        <input type="number" style={{ width: '100px' }} value={unitPrice}
          onBlur={formatInputUnitPrice} onChange={handleInputChangePrice} />
        <a style={{ marginRight: '.6rem' }}> Total : </a>
        <input type="number" style={{ width: '150px' }} value={itemTotal} readOnly />
        <a style={{ marginRight: '.6rem' }}> Item Tax : </a>
        <input type="number" style={{ width: '150px' }} value={itemTax}
          onBlur={formatInputTax} onChange={handleInputChangeTaxManual} />
        <a style={{ marginRight: '.6rem' }}> Item Net Total : </a>
        <input type="number" style={{ width: '200px' }} value={itemNetTotal} readOnly />
      </label>

      <label style={{ paddingLeft: "10px" }}>
        <a style={{ marginRight: '.2rem' }}> Return Particular : </a>
        <input type="text" style={{ width: '1300px' }} value={returnParticular} onChange={formatInputParticular} maxLength={255} />
      </label>

      <div style={{ flex: 1, height: '2px', backgroundColor: 'blue' }} />

      <div>
        <button class='btn btn-primary' style={{marginRight: '10px'}} onClick={onNew}>New Return Note</button>
        <button class='btn btn-secondary' style={{marginRight: '10px' }} onClick={handleHome}>Home</button>
        <button class='btn btn-warning' onClick={onAddReturnNote}>Add Return Item</button>
      </div>

      {/* Voucher Entry Table */}
      <div className="row">
        <div className="col-sx-12 btn btn-info" style={{ marginTop: '1px', border: '1px solid black' }}>Goods Return Voucher Entry</div>
      </div>

      <table className="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
        <thead className="thead-dark">
          <tr>
            <th style={{ width: '.5px', backgroundColor: 'yellow' }}>#</th>
            <th style={{backgroundColor: 'gray'}}>G/L No.</th>
            <th style={{backgroundCOlor: 'yellow'}}>G/L Sub</th>
            <th style={{backgroundColor: 'gray'}}>G/L Type</th>
            <th style={{backgroundColor: 'yellow'}}>Dep.</th>
            <th style={{backgroundColor: 'gray'}}>G/L Name</th>
            <th style={{backgroundColor: 'yellow'}}>G/L Description</th>
            <th style={{backgroundColor: 'gray'}}>Dr. Amount</th>
            <th style={{backgroundColor: 'yellow'}}>Cr. Amount</th>
            <th style={{backgroundColor: 'blue'}}>Action</th>
          
          </tr>

        </thead>
    <tbody>
    {voucherData.map(item => (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.voucherNo}</td>
            <td>{item.txnDate}</td>
            <td>{item.glNo}</td>
            <td>{item.glSub}</td>
            <td>{item.department}</td>
            <td>{item.jeParticular}</td>
            <td style={{ textAlign: "right" }}>
                {formatAmount(item.drAmt)}
            </td>
            <td style={{ textAlign: "right" }}>
                {formatAmount(item.crAmt)}
            </td>
            <td>
                <button style={{ backgroundColor: "red", color: "white"}}onClick={() => handleRemove(item.id)}>Remove</button>
            </td>
        </tr>
    ))}
    <tr>
        <td colSpan="7">Totals:</td>
        <td style={{ textAlign: "right", color: "red" }}>
            {formatAmount(totalDrAmt)}
        </td>
        <td style={{ textAlign: "right", color: "red" }}>
            {formatAmount(totalCrAmt)}
        </td>
    </tr>
</tbody>

      </table>

      {/* Voucher No., G/L Selection, Buttons */}
      <div>
        <label>
          <a style={{ marginRight: '.4rem' }}> Voucher No. : </a>
          <input type="text" value={voucherNo} style={{ width: '200px' }} className="text-uppercase"
            ref={inputRef} onChange={formatInputVoucherNo} required />
          <button type='button' className='btn btn-primary' onClick={onSearchVoucher}><i className="fa fa-download"></i></button>
         </label>
         <label>
          <a style={{ marginRight: '.8rem', marginLeft: '.3rem' }}> G/L Selection : </a>
          <select value={ID} onChange={handleChangeGl}>
            {glData.map(item => (
              <option key={item.id} value={item.id}> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
            ))}
          </select>
          <label>
            <a style={{ marginLeft: '1rem', marginRight: '0rem' }}> Debit Amount : </a>
            <input type="number" style={{ width: '200px' }} value={drAmt} ref={inputRefVoucher}
              onBlur={(e) => setDrAmt(parseFloat(e.target.value).toFixed(2))}
              onChange={(e) => setDrAmt(e.target.value)} />
            <a style={{ marginLeft: '1.5rem', marginRight: '.4rem' }}> Credit Amount : </a>
            <input type="number" style={{ width: '200px' }} value={crAmt}
              onBlur={(e) => setCrAmt(parseFloat(e.target.value).toFixed(2))}
              onChange={(e) => setCrAmt(e.target.value)} />
          </label>
          <div style={{ marginTop: '10px' }}>
            <button style={{ backgroundColor: "green", color: "white", width: '200px' }} onClick={() => onPrint(voucherData)}>
              <i className='fa fa-print'></i> Print Voucher
            </button>
            <button style={{ backgroundColor: "red", color: "white", width: '400px', marginLeft: '10px' }} onClick={() => onSave(voucherData)}>
              <i className='fa fa-save'></i> Save Return Note and Voucher
            </button>
            <button style={{ backgroundColor: "cyan", color: "black", width: '300px', marginLeft: '10px' }} onClick={onAddVoucher}>
              <i className='fa fa-plus'></i> Add Voucher Item
            </button>
          </div>
        </label>
      </div>

      {/* Invoice Detail Table */}
      <div className="row">
        <div className="col-sx-12 btn btn-secondary" style={{ marginTop: '1px' }}>Show Invoice Detail</div>
      </div>
      <table className="table table-bordered" style={{border: '1px solid black'}}>
        <thead className="thead-dark">
        
          <tr>
      
            <th style={{ backgroundColor: 'Yellow' }}>#</th>
            <th style={{ backgroundColor: 'lightgreen'}}>Product ID</th>
            <th style={{ backgroundColor: 'yellow'}}>Product Name</th>
            <th style={{ backgroundColor: 'lightgreen'}} >Date</th>
            <th style={{ backgroundColor: 'yellow'}}style={{ backgroundColor: 'yellow'}}>Unit</th>
            <th style={{ backgroundColor: 'lightgreen'}}>Quantity</th>
            <th style={{ backgroundColor: 'yellow'}} >Price</th>
            <th style={{ backgroundColor: 'lightgreen'}}>Tax ID</th>
            <th style={{ backgroundColor: 'yellow'}}>Code</th>
            <th style={{ backgroundColor: 'lightgreen'}} >Tax Amount</th>
            <th style={{ backgroundColor: 'pink'}}>Item Total</th>
            <th style={{ backgroundColor: 'blue', color: 'white'}}>Select</th>
          </tr>
        </thead>


        <tbody>
          {invoiceData.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td style={{ backgroundColor: 'lightgreen'}}>{item.productID}</td>
                <td style={{ textAlign: 'left', background: 'yellow' }}>{item.productName}</td>
                <td style={{ textAlign: 'left', backgroundColor: 'lightgreen' }}>{moment(item.invoiceDate).format('DD/MM/YYYY')}</td>
                <td style={{ textAlign: 'left', backgroundColor: 'yellow' }}>{item.unit}</td>
                <td style={{ textAlign: 'right', backgroundColor: 'lightgreen' }}>{parseFloat(item.purchaseQty).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: 'right', background: 'yellow' }}>{parseFloat(item.unitPrice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "left", backgroundColor: 'lightgreen' }}>{item.taxID}</td>
                <td style={{ textAlign: "left", backgroundColor: 'yellow' }}>{item.taxCode}</td>
                <td style={{ textAlign: "right", backgroundColor: 'lightgreen' }}>{parseFloat(item.itemTaxTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right", backgroundColor: 'cyan' }}>{parseFloat(item.itemNetTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td>
                <button className="fa fa-check-square" style={{ backgroundColor: 'blue', color: 'white' }}
                  onClick={() => handleSelectProduct(item.productID, item.productName, item.taxID, item.unit, item.unitPrice, item.purchaseQty)}>
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="8"></td>
            <td style={{ backgroundColor: "green", color: 'white' }}>Totals :</td>
            <td style={{ backgroundColor: '#0275d8', color: "white", textAlign: 'right' }}>{totalTax.toFixed(2)}</td>
            <td style={{ backgroundColor: '#D9534F', color: "white", textAlign: 'right' }}>{totalNetAmt.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="col-sx-10 btn btn-primary" style={{ marginTop: '1px' }}>Supplier Selection</div>
      <BootstrapTable bootstrap4 keyField='id' data={custData} columns={columns}
        defaultSorted={defaultSorted} pagination={pagination}
        rowStyle={{ backgroundColor: '#A9A9A9', border: '3px solid grey' }}
        className="table border border-dark" />
      <button className='btn btn-success' onClick={handleCancel}>Clear Supplier Information</button>
    </div>
  );
}

export default PurchaseReturnNote;