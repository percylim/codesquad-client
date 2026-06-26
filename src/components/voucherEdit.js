import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
import generatePDF from "./reportGenerator";
import 'font-awesome/css/font-awesome.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');
localStorage.removeItem('voucherNo')

var glData = []
var glNo = '';
var glAcctNo = '';
var glSubNo = ''
var glDepart = '';
var glName = '';
var glType = '';
var oldDate;
var ChangeData = false;
var curr = new Date();
curr.setDate(curr.getDate());
var todayDate = curr.toISOString().substr(0, 10);
var vid = 0;
var lastSix = '';
var lSave = true;

function VoucherEdit() {
    // State declarations
    const [voucherData, setVoucherData] = useState([]);
    const [jeNo, setjeNo] = useState("");
    const [jeSub, setJeSub] = useState("");
    const [jeDep, setJeDep] = useState("");
    const [jeName, setJeName] = useState("");
    const [drAmt, setDrAmt] = useState('');
    const [crAmt, setCrAmt] = useState('');
    const [txnDate, setTxnDate] = useState(todayDate);
    const [jeParticular, setPart] = useState("");
    const [voucherNo, setVoucherNo] = useState("");
    const [lRead, setLRead] = useState(false);
    const [totalDrAmt, setTotalDrAmt] = useState('0.00');
    const [totalCrAmt, setTotalCrAmt] = useState('0.00');
    const [jvInit, setJvInit] = useState("");
    const [voucherType, setVoucherType] = useState("");

    const mystyle = { align: "left" };

    const buttonStyle = {
        color: "white",
        backgroundColor: "blue",
        padding: "5px 10px 2px 10px",
        fontFamily: "Arial",
        position: 'absolute',
        right: 500,
    };

    // Load GL list on mount
    useEffect(() => {
        Axios.get(`/api/glList`, {
            params: { companyID: companyID }
        }).then(res => {
            console.log(res);
            glData = res.data;
            glAcctNo = glData[0].glNo;
            glSubNo = glData[0].glSub;
            glName = glData[0].glName;
            glDepart = glData[0].department;
            glNo = glData[0].glNo;
            glType = glData[0].glType;
            setjeNo(glAcctNo);
            setJeSub(glSubNo);
            setJeDep(glDepart);
            setJeName(glName);
        }).catch(err => {
            console.log("error:", err);
            alert(err);
        });
    }, []);

    const handleChangeGl = async (e) => {
        glAcctNo = e.target.value;
        const cGlNo = glAcctNo.substr(8, 4);
        const cGlSub = glAcctNo.substr(26, 3);
        const cDep = glAcctNo.substr(43, 3);
        const cName = glAcctNo.substr(58, glAcctNo.length);
        setjeNo(cGlNo);
        setJeSub(cGlSub);
        setJeDep(cDep);
        setJeName(cName.substr(0, cName.length - 1));
        setDrAmt(0);
        setCrAmt(0);
    }

    const formatInputDrAmt = async (e) => {
        e.preventDefault();
        var num = Number(e.target.value).toFixed(2);
        setDrAmt(num);
    }

    const formatInputCrAmt = async (e) => {
        e.preventDefault();
        var num = parseFloat(e.target.value).toFixed(2);
        if (num === 'NaN') { return true }
        setCrAmt(num);
    }

    const formatInputPart = async (e) => {
        e.preventDefault();
        setPart(e.target.value);
    }

    const formatInputVoucherNo = async (e) => {
        e.preventDefault();
        setVoucherNo(e.target.value.toUpperCase());
    }

    const onCancel = async () => {
        window.location.href = 'voucherEdit';
    }

    const onDelete = async () => {
        if (voucherNo === '') {
            alert("No Voucher No.");
            return false
        }

        const voucher = {
            companyID: companyID,
            userName: userName,
            voucherNo: voucherNo
        };
        
        if (window.confirm("Are you sure to Delete whole Voucher")) {
            fetch('/api/voucherDelete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(voucher)
            }).then(function (response) {
                return response.text()
            }).then(function (text) {
                lastSix = text.substr(text.length - 7);
                if (lastSix === 'Success') {
                    alert("Voucher No. " + voucherNo + " successfully Deleted")
                    window.location.href = 'voucherEdit';
                }
            });
        }
    }

const onSearch = async (vid) => {
    if (vid === '') {
        alert("No Voucher to search");
        return false;
    }

    try {
        const response = await Axios.get(`/api/voucherList`, {
            params: {
                companyID: companyID,
                voucherNo: vid,
            }
        });

    console.log('API Response:', response.data);
console.log('Response length:', response.data?.length);

// Check if response has data
if (!response.data || !Array.isArray(response.data) || response.data.length === 0) {
    setLRead(false);
    alert("Invalid Voucher No " + vid + " - No journal records found");
    return false;
}const dlData = response.data;
const firstItem = dlData[0];

console.log('First item:', firstItem);
console.log('jvInit from DB:', firstItem.jvInit);

// Check if jvInit exists and is not empty
let jvInitValue;
if (firstItem.jvInit && firstItem.jvInit !== 'undefined') {
    jvInitValue = firstItem.jvInit;
} else {
    // Generate from txnDate if jvInit is missing
    jvInitValue = moment(firstItem.txnDate).format("YYMM");
}

console.log('Final jvInit value:', jvInitValue);
setJvInit(jvInitValue);
setVoucherType(firstItem.voucherType || '');

// Alert will show the value after state updates (use useEffect or just show the variable)
//alert("jvInit: " + jvInit);  

// Use the variable, not the state
        let date = dlData[0].txnDate;
        let currDate = new Date(date);
        if (date === '0000-00-00' || !date) {
            currDate = new Date();
        }
        currDate.setDate(currDate.getDate());
        const oldDateStr = currDate.toISOString().substr(0, 10);
        setTxnDate(oldDateStr);

        let drSum = 0;
        let crSum = 0;

        const processedData = dlData.map((item, index) => {
            const formattedDate = oldDateStr.split("-").reverse().join("/");
            const drAmount = parseFloat(item.drAmt) || 0;
            const crAmount = parseFloat(item.crAmt) || 0;

            drSum += drAmount;
            crSum += crAmount;

            return {
                id: index + 1,
                voucherNo: item.voucherNo,
                txnDate: formattedDate,
                glNo: item.glNo,
                glSub: item.glSub,
                department: item.department,
                jeParticular: item.jeParticular,
                glName: item.glName,
                glType: item.glType,
                drAmt: drAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                crAmt: crAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                companyID: item.companyID,
                userName: item.userName,
            };
        });

        setTotalDrAmt(drSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setTotalCrAmt(crSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setVoucherData(processedData);
        setLRead(true);
        ChangeData = false;

    } catch (err) {
        console.error('Error searching voucher:', err);
        alert('Error searching voucher: ' + err.message);
        setLRead(false);
    }
};

    const handleRemove = async (id) => {
        const newData = voucherData.filter(item => item.id !== id);
        const reindexedData = newData.map((item, idx) => ({ ...item, id: idx + 1 }));
        setVoucherData(reindexedData);
        
        let drSum = 0;
        let crSum = 0;
        reindexedData.forEach(item => {
            drSum += parseFloat(String(item.drAmt).replace(/,/g, '')) || 0;
            crSum += parseFloat(String(item.crAmt).replace(/,/g, '')) || 0;
        });
        setTotalDrAmt(drSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setTotalCrAmt(crSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        ChangeData = true;
    }

    const onAddVoucher = async (e) => {
        e.preventDefault();

        if (txnDate === '' || txnDate === undefined) {
            alert("Transaction Date cannot be blank");
            return false;
        }

        const drVal = parseFloat(drAmt) || 0;
        const crVal = parseFloat(crAmt) || 0;

        if (drVal === 0 && crVal === 0) {
            alert("Debit Amount and Credit Amount cannot both be 0");
            return false;
        }

        if (drVal !== 0 && crVal !== 0) {
            alert("Debit Amount and Credit Amount can only input either one");
            return false;
        }

        if (voucherNo === '') {
            alert("Journal Voucher No. cannot be blank");
            return false;
        }

        if (jeParticular === '' || jeParticular === undefined) {
            alert("Journal Particular cannot be blank");
            return false;
        }

        const newData = {
            id: voucherData.length + 1,
            voucherNo: voucherNo,
            glNo: jeNo,
            glSub: jeSub,
            department: jeDep,
            jeParticular: jeParticular,
            glName: jeName,
            glType: glType,
            drAmt: drVal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
            crAmt: crVal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
            companyID: companyID,
            userName: userName,
            txnDate: txnDate,
        };

        const newDatas = [...voucherData, newData];
        setVoucherData(newDatas);
        
        let drSum = 0;
        let crSum = 0;
        newDatas.forEach(item => {
            drSum += parseFloat(String(item.drAmt).replace(/,/g, '')) || 0;
            crSum += parseFloat(String(item.crAmt).replace(/,/g, '')) || 0;
        });
        setTotalDrAmt(drSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setTotalCrAmt(crSum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        
        setDrAmt(0);
        setCrAmt(0);
        setPart("");
        ChangeData = true;
    };

    const onPrint = async (printData, drTotal, crTotal) => {
        if (!printData || printData.length === 0) {
            alert("No Voucher data to print");
            return false;
        }

        const printCopy = [...printData];
        const totalRow = {
            id: printCopy.length + 1,
            voucherNo: '',
            glNo: '',
            glSub: '',
            department: '',
            jeParticular: 'Total:',
            glName: '',
            glType: '',
            drAmt: drTotal,
            crAmt: crTotal,
        };
        printCopy.push(totalRow);

        const headers = [
            { key: 'G/L No.', display: 'glNo' },
            { key: 'G/L Sub', display: 'glSub' },
            { key: 'Department', display: 'department' },
            { key: 'G/L Name', display: 'glName' },
            { key: 'Particular', display: 'jeParticular' },
            { key: 'Dr. Amount', display: 'drAmt' },
            { key: 'Cr. Amount', display: 'crAmt' },
        ];

        generatePDF(printCopy, headers, 'jv.pdf');
    }

    const onSave = async (saveData, drTotal, crTotal) => {
        if (ChangeData === false) {
            alert("No Data Change cannot be saved");
            return false;
        }

        if (lSave === false) {
            alert("Already Updated, press <New Voucher> to load New Voucher or press <Print Voucher> to print PDF");
            return false;
        }

        if (!saveData || saveData.length === 0) {
            alert('No Voucher to save');
            return false;
        }

        const formattedData = saveData.map(item => {
            let formattedDate;
            if (item.txnDate) {
                if (typeof item.txnDate === 'object' && item.txnDate instanceof Date) {
                    formattedDate = moment(item.txnDate).format('YYYY-MM-DD');
                } else if (typeof item.txnDate === 'string') {
                    if (item.txnDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
                        formattedDate = item.txnDate;
                    } else {
                        const parsed = moment(item.txnDate, 'DD/MM/YYYY');
                        if (parsed.isValid()) {
                            formattedDate = parsed.format('YYYY-MM-DD');
                        } else {
                            formattedDate = moment().format('YYYY-MM-DD');
                        }
                    }
                } else {
                    formattedDate = moment().format('YYYY-MM-DD');
                }
            } else {
                formattedDate = moment().format('YYYY-MM-DD');
            }
            
            return {
                companyID: companyID,
                userName: userName,
                voucherNo: item.voucherNo,
                glNo: item.glNo,
                glSub: item.glSub,
                department: item.department,
                glName: item.glName,
                jeParticular: item.jeParticular,
                drAmt: parseFloat(String(item.drAmt).replace(/,/g, '')) || 0,
                crAmt: parseFloat(String(item.crAmt).replace(/,/g, '')) || 0,
                txnDate: moment(item.txnDate).format('YYYY-MM-DD'),
                voucherType: voucherType || 'JNV',
                jvInit: jvInit,
            };
        });

        console.log("Sending to backend:", JSON.stringify(formattedData, null, 2));

        try {
            const response = await fetch('/api/voucherChange', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedData)
            });

            const text = await response.text();
            
            if (text === 'Success') {
                alert("Voucher updated successfully!");
                window.location.href = 'voucherEdit';
            } else {
                alert("Save failed: " + text);
            }
        } catch (err) {
            console.error("Save error:", err);
            alert("Error saving voucher: " + err.message);
        }
    };

    return (
        <div>
            <div className="row" style={{ margin: "10px", paddingLeft: "5px" }}>
                <div className="col-sm-12 btn btn-success">
                    Edit/Delete Existing Journal Voucher
                </div>
            </div>
            
            <table className="table" style={{ paddingTop: '1px', border: '1px solid black' }}>
                <thead className="thead-dark">
                    <tr style={mystyle}>
                        <th style={{ backgroundColor: 'yellow' }}>#</th>
                        <th style={{ backgroundColor: 'yellow' }}>Voucher No.</th>
                        <th style={{ backgroundColor: 'yellow' }}>Txn. Date</th>
                        <th style={{ backgroundColor: 'yellow' }}>G/L Account No.</th>
                        <th style={{ backgroundColor: 'yellow' }}>G/L Sub-No.</th>
                        <th style={{ backgroundColor: 'yellow' }}>Department</th>
                        <th style={{ backgroundColor: 'yellow' }}>Particular</th>
                        <th style={{ backgroundColor: 'yellow', textAlign: 'right' }}>Debit Amount</th>
                        <th style={{ backgroundColor: 'yellow', textAlign: 'right' }}>Credit Amount</th>
                        <th style={{ backgroundColor: 'blue', textAlign: 'center', color: 'white' }}>Action</th>
                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {voucherData.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.voucherNo}</td>
                            <td>{moment(item.txnDate).format('DD/MM/YYYY')}</td>
                            <td>{item.glNo}</td>
                            <td>{item.glSub}</td>
                            <td>{item.department}</td>
                            <td>{item.jeParticular}</td>
                            <td style={{ textAlign: "right" }}>{item.drAmt}</td>
                            <td style={{ textAlign: "right" }}>{item.crAmt}</td>
                            <td>
                                <button type="button" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleRemove(item.id)}>
                                    <i className="fa fa-trash"></i> Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr style={{ borderBottom: '1px solid black' }}>
                        <td colSpan="6" />
                        <td style={{ textAlign: "right", color: "red" }}>Dr/Cr Totals:</td>
                        <td style={{ textAlign: "right", color: "red" }}>{totalDrAmt}</td>
                        <td style={{ textAlign: "right", color: "red" }}>{totalCrAmt}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            <button type="button" style={{ backgroundColor: "yellow", color: "black", border: '2px solid black', borderRadius: '14px' }} onClick={() => onPrint(voucherData, totalDrAmt, totalCrAmt)}>
                                <i className="fa fa-print"></i> Print Voucher
                            </button>
                        </td>
                        <td colSpan="3">
                            <button type="submit" style={{ backgroundColor: "green", color: "white", border: '2px solid white', borderRadius: '14px' }} onClick={() => onSave(voucherData, totalDrAmt, totalCrAmt)}>
                                <i className="fa fa-save"></i> Update Edited Voucher
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <form style={{ margin: "20px", paddingLeft: "10px", color: 'red' }}>
                <h3>Edit Journal Voucher</h3>
                <center>
                    <div style={{ marginTop: "40px", paddingRight: "500px" }}>
                        <div className="row">
                            <label style={{ paddingLeft: "15px", marginRight: '1rem' }}>
                                Voucher No.:
                                <input
                                    type="text"
                                    value={voucherNo}
                                    name="voucher"
                                    className="text-uppercase"
                                    placeholder="Enter Voucher No. to Edit"
                                    onChange={(e) => formatInputVoucherNo(e)}
                                    readOnly={lRead}
                                    required
                                />
                                <button
                                    style={{ paddingLeft: '10px', width: '70px' }}
                                    type="button"
                                    className="btn btn-primary fa fa-download float-right"
                                    onClick={() => onSearch(voucherNo)}
                                />
                            </label>
                        </div>

                        <div className="select-container">
                            <label style={{ paddingLeft: "15px", marginRight: '1rem' }}>
                                G/L Selection
                                <select onChange={(e) => handleChangeGl(e)}>
                                    {glData.map((item, idx) => (
                                        <option key={idx} value={item.glAcctNo}> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <label style={{ paddingLeft: "15px", marginRight: '1rem' }}>
                            G/L No.:
                            <input
                                type="text"
                                maxLength={4}
                                value={jeNo}
                                name="glNo"
                                readOnly={true}
                                required
                            />
                        </label>

                        <label style={{ paddingLeft: "15px", marginRight: '1rem' }}>
                            Txn. Date:
                            <DatePicker
                                id="txnDate"
                                selected={new Date(txnDate)}
                                onChange={(date) => setTxnDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="dd/mm/yyyy"
                                wrapperClassName="date-picker-wrapper"
                                required
                            />
                        </label>

                        <label style={{ paddingLeft: "15px", marginRight: '1rem' }}>
                            G/L Sub-No.:
                            <input
                                type="text"
                                maxLength={4}
                                value={jeSub}
                                name="glSub"
                                readOnly={true}
                                required
                            />
                        </label>

                        <label style={{ paddingLeft: "15px", marginRight: '1rem' }}>
                            G/L Name:
                            <input
                                type="text"
                                value={jeName}
                                name="glName"
                                style={{ width: '70%' }}
                                readOnly={true}
                                required
                            />
                        </label>

                        <label style={{ paddingLeft: "15px", marginRight: '1rem' }}>
                            Department:
                            <input
                                type="text"
                                value={jeDep}
                                name="department"
                                readOnly={true}
                                required
                            />
                        </label>

                        <label style={{ paddingLeft: "15px", marginRight: '1rem' }}>
                            Particular:
                            <input
                                type="text"
                                value={jeParticular}
                                name="Particular"
                                onChange={(e) => formatInputPart(e)}
                                required
                            />
                        </label>

                        <label style={{ paddingLeft: "15px", marginRight: '1rem' }}>
                            Debit Amount:
                            <input
                                type="number"
                                value={drAmt}
                                name="drAmount"
                                step="0.01"
                                style={{ textAlign: 'right' }}
                                onChange={(e) => setDrAmt(e.target.value)}
                                onBlur={(e) => formatInputDrAmt(e)}
                                maxLength={10}
                            />
                        </label>

                        <label style={{ paddingLeft: "15px", marginRight: '1rem' }}>
                            Credit Amount:
                            <input
                                type="number"
                                value={crAmt}
                                name="crAmount"
                                step="0.01"
                                style={{ textAlign: 'right' }}
                                onChange={(e) => setCrAmt(e.target.value)}
                                onBlur={(e) => formatInputCrAmt(e)}
                                maxLength={10}
                            />
                        </label>
                        <br />
                        <br />
                        <button className="btn btn-info" style={{ marginRight: '20px' }} type="button" onClick={() => onCancel()}>
                            <i className="fa fa-book"></i> New Voucher
                        </button>
                        <button style={buttonStyle} className="btn btn-warning" type="button" onClick={() => onDelete()}>
                            <i className="fa fa-trash"></i> Delete This Voucher
                        </button>
                        <button style={{ paddingRight: '20px' }} className="btn btn-success" type="button" onClick={onAddVoucher}>
                            <i className="fa fa-plus"></i> Add Voucher
                        </button>
                    </div>
                </center>
            </form>
        </div>
    )
}

export default VoucherEdit;