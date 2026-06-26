import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios';
import './Profile.css';
import { format } from "date-fns";
import moment from 'moment';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import GSTPDF from './pdfGSTGenerator';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const companyID = localStorage.getItem('companyID');
const companyName = localStorage.getItem('companyName');
const userName = localStorage.getItem('userName');

var curr = new Date();
var todayDate = curr.toISOString().substr(0, 10);
var dDate = new Date(curr.setDate(curr.getDate() - 7));
var finStartDate = '';
var finEndDate = '';
var finYear = dDate.getFullYear();
var data = [];
var outputData = [];
var inputData = [];
var companyData = [];
var totalDocumentAmount = 0;
var totalPurchaseTaxAmount = 0;
var totalSalesTaxAmount = 0;
var salesTaxAmountTotal = 0;
var salesItemAmountTotal = 0;
var purchaseTaxAmountTotal = 0;
var purchaseItemAmountTotal = 0;

var date = new Date();
var cMonth = date.getMonth() - 1;
var stDate = new Date(date.getFullYear(), cMonth, 2);
var enDate = new Date(stDate.getFullYear(), cMonth + 2, 1);
var taxCode = '';
var docAmt = 0;
var taxAmt = 0;

function GstPeriodicalReport() {
    const [startDate, setStartDate] = useState(stDate.toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState(enDate.toISOString().substr(0, 10));
    const [Data, setData] = useState([]);
    const [purchaseData, setPurchaseData] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(false);

    const headers = [
        { label: 'DOC Date', key: 'document_date' },
        { label: 'Supplier Name', key: 'suppCustID' },
        { label: 'DOC No.', key: 'documentNo' },
        { label: 'Tax Code', key: 'taxCode' },
        { label: 'Tax Type', key: 'taxType' },
        { label: 'DOC Type', key: 'documentType' },
        { label: 'Tax Description', key: 'remark' },
        { label: 'Purchase/Sales Amount', key: 'itemAmount' },
        { label: 'Purchase Tax Amount', key: 'purchaseTaxAmount' },
        { label: 'Sales Tax Amount', key: 'salesTaxAmount' },
    ];

    const columns = [
        { dataField: 'document_date', text: 'DOC Date', sort: false, headerStyle: { border: '3px solid grey' } },
        { dataField: 'suppCustID', text: 'Supplier Name', sort: false, headerStyle: { border: '3px solid grey' }, align: 'left'},
        { dataField: 'documentNo', text: 'DOC No.', sort: false, headerStyle: { border: '3px solid grey' } },
        { dataField: 'taxCode', text: 'Tax Code', sort: false, headerStyle: { border: '3px solid grey' } },
        { dataField: 'taxType', text: 'Tax Type', sort: false, headerStyle: { border: '3px solid grey' } },
        { dataField: 'documentType', text: 'DOC Type', sort: false, headerStyle: { border: '3px solid grey' } },
        { dataField: 'remark', text: 'Tax Description', sort: false, headerStyle: { border: '3px solid grey' }, align: 'left' },
        { dataField: 'itemAmount', text: 'Purchase/Sales Amount', sort: false, headerStyle: { border: '3px solid grey' }, align: 'right' },
        { dataField: 'purchaseTaxAmount', text: 'Purchase Tax Amount', sort: false, headerStyle: { border: '3px solid grey' }, align: 'right' },
        { dataField: 'salesTaxAmount', text: 'Sales Tax Amount', sort: false, headerStyle: { border: '3px solid grey' }, align: 'right' },
    ];

    const formatInputsDate = async (e) => {
        e.preventDefault();
        let dDate = e.target.value;
        setStartDate(dDate);
    };

    const formatInputeDate = async (e) => {
        e.preventDefault();
        let dDate = e.target.value;
        setEndDate(dDate);
    };

    const onClear = async () => {
        totalDocumentAmount = 0;
        totalPurchaseTaxAmount = 0;
        totalSalesTaxAmount = 0;
        salesTaxAmountTotal = 0;
        salesItemAmountTotal = 0;
        purchaseTaxAmountTotal = 0;
        purchaseItemAmountTotal = 0;
        setData([]);
        setSalesData([]);
        setPurchaseData([]);
    };

    const onLoadGST = async () => {
        setLoading(true);
        salesItemAmountTotal = 0;
        salesTaxAmountTotal = 0;
        purchaseItemAmountTotal = 0;
        purchaseTaxAmountTotal = 0;
        totalDocumentAmount = 0;
        totalPurchaseTaxAmount = 0;
        totalSalesTaxAmount = 0;
        var gstData = [];

        try {
            // 1. FETCH PERIODICAL REPORT
            const periodicalRes = await Axios.get(`/api/GSTPeriodicalReport`, {
                params: {
                    companyID: companyID,
                    startDate: startDate,
                    endDate: endDate,
                }
            });

            if (periodicalRes.data.length === 0) {
                alert('No GST Transaction Record between ' + startDate + ' and ' + endDate);
                setLoading(false);
                return;
            }

            gstData = periodicalRes.data;

            // Process periodical data
            for (let i = 0; i < gstData.length; i++) {
                if (gstData[i].taxType === 'OUTPUT') {
                    gstData[i].salesTaxAmount = gstData[i].taxAmount || 0;
                    totalSalesTaxAmount += parseFloat(gstData[i].taxAmount || 0);
                }
                if (gstData[i].taxType === 'INPUT') {
                    gstData[i].purchaseTaxAmount = gstData[i].taxAmount || 0;
                    totalPurchaseTaxAmount += parseFloat(gstData[i].taxAmount || 0);
                }

                let dateObj = new Date(gstData[i].document_date);
                gstData[i].document_date = format(dateObj, "dd/MM/yyyy");
                totalDocumentAmount += parseFloat(gstData[i].itemAmount || 0);
            }

            // Format numbers
            for (let z = 0; z < gstData.length; z++) {
                gstData[z].itemAmount = parseFloat(gstData[z].itemAmount || 0).toFixed(2);
                gstData[z].purchaseTaxAmount = parseFloat(gstData[z].purchaseTaxAmount || 0).toFixed(2);
                gstData[z].salesTaxAmount = parseFloat(gstData[z].salesTaxAmount || 0).toFixed(2);
            }

            // Add total row
            const newData = {
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

            gstData.push(newData);
            setData(gstData);

            // 2. FETCH OUTPUT TAX DATA
            const outputRes = await Axios.get(`/api/GSTInputOutputReport`, {
                params: {
                    companyID: companyID,
                    startDate: startDate,
                    endDate: endDate,
                    taxType: 'OUTPUT'
                }
            });

            const outputDataArray = outputRes.data.data || [];
            let tempOutputData = [];

            if (outputDataArray.length > 0) {
                let taxCode = outputDataArray[0].taxCode || outputDataArray[0].taxType;
                let docAmt = 0;
                let taxAmt = 0;

                for (let j = 0; j < outputDataArray.length; j++) {
                    const item = outputDataArray[j];
                    const currentTaxCode = item.taxCode || item.taxType;

                    if (taxCode === currentTaxCode) {
                        docAmt += parseFloat(item.itemAmount || 0);
                        taxAmt += parseFloat(item.taxAmount || 0);
                        salesItemAmountTotal += parseFloat(item.itemAmount || 0);
                        salesTaxAmountTotal += parseFloat(item.taxAmount || 0);
                    } else {
                        tempOutputData.push({
                            tax: taxCode,
                            docAmount: docAmt,
                            taxAmount: taxAmt
                        });

                        taxCode = currentTaxCode;
                        docAmt = parseFloat(item.itemAmount || 0);
                        taxAmt = parseFloat(item.taxAmount || 0);
                        salesItemAmountTotal += parseFloat(item.itemAmount || 0);
                        salesTaxAmountTotal += parseFloat(item.taxAmount || 0);
                    }

                    if (j === outputDataArray.length - 1) {
                        tempOutputData.push({
                            tax: taxCode,
                            docAmount: docAmt,
                            taxAmount: taxAmt
                        });
                    }
                }

                setSalesData(tempOutputData);
            }

            // 3. FETCH INPUT TAX DATA
            const inputRes = await Axios.get(`/api/GSTInputOutputReport`, {
                params: {
                    companyID: companyID,
                    startDate: startDate,
                    endDate: endDate,
                    taxType: 'INPUT'
                }
            });

            const inputDataArray = inputRes.data.data || [];
            let tempInputData = [];

            if (inputDataArray.length > 0) {
                let taxCode = inputDataArray[0].taxCode || inputDataArray[0].taxType;
                let docAmt = 0;
                let taxAmt = 0;

                for (let x = 0; x < inputDataArray.length; x++) {
                    const item = inputDataArray[x];
                    const currentTaxCode = item.taxCode || item.taxType;

                    if (taxCode === currentTaxCode) {
                        docAmt += parseFloat(item.itemAmount || 0);
                        taxAmt += parseFloat(item.taxAmount || 0);
                        purchaseItemAmountTotal += parseFloat(item.itemAmount || 0);
                        purchaseTaxAmountTotal += parseFloat(item.taxAmount || 0);
                    } else {
                        tempInputData.push({
                            tax: taxCode,
                            docAmount: docAmt,
                            taxAmount: taxAmt
                        });

                        taxCode = currentTaxCode;
                        docAmt = parseFloat(item.itemAmount || 0);
                        taxAmt = parseFloat(item.taxAmount || 0);
                        purchaseItemAmountTotal += parseFloat(item.itemAmount || 0);
                        purchaseTaxAmountTotal += parseFloat(item.taxAmount || 0);
                    }

                    if (x === inputDataArray.length - 1) {
                        tempInputData.push({
                            tax: taxCode,
                            docAmount: docAmt,
                            taxAmount: taxAmt
                        });
                    }
                }

                setPurchaseData(tempInputData);
            }

            setLoading(false);

        } catch (error) {
            console.error('Error loading GST data:', error);
            alert('Error loading GST data: ' + (error.message || 'Unknown error'));
            setLoading(false);
        }
    };

    const onHome = async () => {
        window.location = 'home';
    };

    const onPrint = async () => {
        if (Data.length === 0 || Data.length < 2) {
            alert('No GST Periodical Report for printing');
            return false;
        }

        try {
            const res = await Axios.get(`/api/companyInfo`, {
                params: { companyID: companyID }
            });
            companyData = res.data;

            let sDate = new Date(startDate);
            let eDate = new Date(endDate);

            setData([]);
            setSalesData([]);
            setPurchaseData([]);

            GSTPDF(companyData, Data, salesData, purchaseData,
                totalDocumentAmount, totalPurchaseTaxAmount, totalSalesTaxAmount,
                salesItemAmountTotal, salesTaxAmountTotal, purchaseItemAmountTotal,
                purchaseTaxAmountTotal, format(sDate, 'dd/MM/yyyy'), format(eDate, 'dd/MM/yyyy'));

        } catch (error) {
            console.error('Error printing:', error);
            alert('Error printing report');
        }
    };

    useEffect(() => {
        // Component mounted
    }, []);

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
        onPageChange: function(page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function(page, sizePerPage) {
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
                width: '1720px',
                height: '70px',
                margin: '6px',
                backgroundColor: 'white',
                border: '4px solid grey',
            }}>
                <label style={{ paddingLeft: "100px", marginTop: '.4rem' }}>
                    <a style={{ marginRight: '.8rem' }}>Date From : </a>
                <DatePicker

    selected={startDate ? new Date(startDate) : null}

    onChange={(date) =>

        setStartDate(format(date, "yyyy-MM-dd"))

    }

    dateFormat="dd/MM/yyyy"

    disabled={loading}

/>

                    <a style={{ marginLeft: '1rem', marginRight: '.8rem', width: '200px' }}>To Date : </a>
                <DatePicker

    selected={endDate ? new Date(endDate) : null}

    onChange={(date) =>

        setEndDate(format(date, "yyyy-MM-dd"))

    }

    dateFormat="dd/MM/yyyy"

    disabled={loading}

/>
                    <button
                        style={{ padding: '4px', marginLeft: '2rem' }}
                        type='button'
                        className='btn btn-info fa fa-download float-right'
                        onClick={() => onLoadGST()}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Load GST Report'}
                    </button>

                    <button
                        style={{ padding: '1px', marginLeft: '2rem' }}
                        type='button'
                        className='btn btn-danger float-right fa fa-minus'
                        onClick={() => onClear()}
                    >
                        Clear
                    </button>

                    <button
                        style={{ padding: '4px', marginLeft: '2rem' }}
                        type='button'
                        className='btn btn-warning fa fa-print float-right'
                        onClick={() => onPrint()}
                    >
                        Print
                    </button>

                    <button
                        style={{ padding: '1px', marginLeft: '2rem' }}
                        type='button'
                        className='btn btn-success fa fa-home'
                        onClick={() => onHome()}
                    >
                        Home
                    </button>
                </label>
            </div>

            <span className="square border border-dark"></span>
            <div className="App">
                <div className="row" style={{ 'margin': "12px", paddingLeft: '5px' }}>
                    <div className="col-sm-12">
                        Purchase (INPUT) And Sales (OUTPUT) Tax Periodical Report
                    </div>
                </div>
                <span className="square border border-dark"></span>

                <BootstrapTable
                    bootstrap
                    keyField='id'
                    data={Data}
                    columns={columns}
                    defaultSorted={defaultSorted}
                    pagination={pagination}
                    className="table table-bordered border-dark"
                    rowStyle={{ border: '1px solid grey' }}
                />
            </div>

            <div className="row" style={{ paddingLeft: '50px' }}>
                <div className="table-responsive col-md-3">
                    <span className="square border border-dark"></span>
                    <table className="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
                        <thead className="thead-dark">
                            <tr style={{ align: 'left' }}>
                                <th className="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Tax Code</th>
                                <th className="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Sales Document Amount</th>
                                <th className="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Sales Tax Amount</th>
                            </tr>
                        </thead>
                        <tbody style={{ align: 'left' }}>
                            {salesData.map((item, index) => {
                                return <tr key={index}>
                                    <td className="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.tax}</td>
                                    <td className="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.docAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                    <td className="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.taxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                </tr>
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td className="square border border-dark" style={{ textAlign: "right", backgroundColor: "#eae4e4", color: "red" }}>
                                    {parseFloat(salesItemAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </td>
                                <td className="square border border-dark" style={{ textAlign: "right", backgroundColor: "#eae4e4", color: "red" }}>
                                    {parseFloat(salesTaxAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="table-responsive col-md-3">
                    <table className="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
                        <thead className="thead-dark">
                            <tr style={{ align: 'left' }}>
                                <th className="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Tax Code</th>
                                <th className="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Purchase Document Amount</th>
                                <th className="square border border-dark" style={{ backgroundColor: 'white', width: '150px', textAlign: 'center' }}>Purchase Tax Amount</th>
                            </tr>
                        </thead>
                        <tbody style={{ align: 'right' }}>
                            {purchaseData.map((item, index) => {
                                return <tr key={index}>
                                    <td className="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.tax}</td>
                                    <td className="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.docAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                    <td className="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.taxAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                </tr>
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td className="square border border-dark" style={{ textAlign: "right", backgroundColor: "#eae4e4", color: "red" }}>
                                    {parseFloat(purchaseItemAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </td>
                                <td className="square border border-dark" style={{ textAlign: "right", backgroundColor: "#eae4e4", color: "red" }}>
                                    {parseFloat(purchaseTaxAmountTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default GstPeriodicalReport;