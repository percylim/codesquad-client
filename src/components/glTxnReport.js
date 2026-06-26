import React, { useState, useEffect, useRef } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { CSVLink } from 'react-csv';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

//const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');

const GlTxnReport = () => {
  const [glType, setGlType] = useState('');
  const [glNo, setGlNo] = useState('');
  const [glSub, setGlSub] = useState('');
  const [glData, setGlData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    Axios.get(`/api/glTypeInfo`, { params: { companyID } })
      .then(res => {
        setTypeData(res.data);
        if (res.data.length > 0) {
          const defaultType = res.data[2]?.glType || res.data[0].glType;
          setGlType(defaultType);
        }
      });
  }, []);

  useEffect(() => {
    if (glType) {
      Axios.get(`/api/glSelectList`, { params: { companyID, gType: glType } })
        .then(res => {
          setGlData(res.data);
          if (res.data.length > 0) {
            setGlNo(res.data[0].glNo);
            setGlSub(res.data[0].glSub);
          }
        });
    }
  }, [glType]);

  const onSearch = () => {
    if (!startDate || !endDate) return alert('Both dates must be selected.');
    if (startDate > endDate) return alert('Start date must be before end date.');

    const sDate = moment(startDate).format('YYYY-MM-DD');
    const eDate = moment(endDate).format('YYYY-MM-DD');

    Axios.get(`/api/glReportSearch`, {
      params: { companyID, startDate: sDate, endDate: eDate, glNo, glSub }
    })
      .then(res => {
        const data = res.data.map(item => {
          const d = new Date(item.txnDate);
          return {
            ...item,
            txnDate: d.toLocaleDateString('en-GB'),
            drAmt: parseFloat(item.drAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            crAmt: parseFloat(item.crAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            opBal: parseFloat(item.opBal).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            curBal: parseFloat(item.curBal).toLocaleString(undefined, { minimumFractionDigits: 2 })
          };
        });

        let totals = data.reduce((acc, curr) => {
          acc.dr += parseFloat(curr.drAmt.replace(/,/g, ''));
          acc.cr += parseFloat(curr.crAmt.replace(/,/g, ''));
          return acc;
        }, { dr: 0, cr: 0 });

        const totalOpBal = parseFloat(data[0]?.opBal.replace(/,/g, '')) || 0;
        const totalCurBal = totalOpBal + totals.dr - totals.cr;

        data.push({
          id: 0,
          voucherNo: '',
          glNo: '',
          glSub: '',
          department: '',
          glName: '',
          jeParticular: 'Total:',
          glType: '',
          opBal: totalOpBal.toLocaleString(undefined, { minimumFractionDigits: 2 }),
          drAmt: totals.dr.toLocaleString(undefined, { minimumFractionDigits: 2 }),
          crAmt: totals.cr.toLocaleString(undefined, { minimumFractionDigits: 2 }),
          curBal: totalCurBal.toLocaleString(undefined, { minimumFractionDigits: 2 }),
          companyID: '',
          userName: '',
          txnDate: ''
        });

        setCustomer(data);
      });
  };

  const columns = [
    { dataField: 'txnDate', text: 'Txn. Date', headerStyle: { backgroundColor: 'grey', color: 'white' } },
    { dataField: 'voucherNo', text: 'Voucher No.', headerStyle: { backgroundColor: 'grey', color: 'white' } },
    { dataField: 'glNo', text: 'G/L No.', headerStyle: { backgroundColor: 'grey', color: 'white' } },
    { dataField: 'glSub', text: 'G/L Sub', headerStyle: { backgroundColor: 'grey', color: 'white' } },
    { dataField: 'department', text: 'Depart.', headerStyle: { backgroundColor: 'grey', color: 'white' } },
    { dataField: 'glName', text: 'G/L Name', headerStyle: { backgroundColor: 'grey', color: 'white' } },
    { dataField: 'jeParticular', text: 'Txn. Particular', headerStyle: { backgroundColor: 'grey', color: 'white' } },
    { dataField: 'opBal', text: 'Opening Balance', headerStyle: { backgroundColor: 'blue', color: 'white' }, align: 'right' },
    { dataField: 'drAmt', text: 'Debit Amount', headerStyle: { backgroundColor: 'yellow', color: 'black' }, align: 'right' },
    { dataField: 'crAmt', text: 'Credit Amount', headerStyle: { backgroundColor: 'green', color: 'white' }, align: 'right' },
    { dataField: 'curBal', text: 'Balance', headerStyle: { backgroundColor: 'blue', color: 'white' }, align: 'right' }
  ];

  const headers = columns.map(col => ({ label: col.text, key: col.dataField }));

  return (
    <div className="container-fluid" style={{ 'height': "50px", 'margin': '0px'}} >
     <div class='row' className="hdr" >
     <div class="col-sm-10 btn btn-info" style={{ 'color': 'black', marginTop: '0px', width: '1700px'}}>
     <h5> General Ledger Transaction Report </h5>   
       </div>
       </div> 
       <p></p>
      <div>
        <label>G/L Type:
          <select value={glType} onChange={e => setGlType(e.target.value)}>
            {typeData.map(item => (
              <option key={item.glType} value={item.glType}>{item.glType} - {item.glTypeName}</option>
            ))}
          </select>
        </label>

        <label>G/L Account:
          <select onChange={e => {
            const ID = e.target.value;
            setGlNo(ID.substr(0, 4));
            setGlSub(ID.substr(4, 3));
          }}>
            {glData.map(item => (
              <option key={item.glNo + item.glSub} value={item.glNo + item.glSub}>
                (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) ({item.glName})
              </option>
            ))}
          </select>
        </label>

        <label>Start Date:
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="dd/MM/yyyy" />
        
          End Date:
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat="dd/MM/yyyy" />
          <button onClick={onSearch} className="btn btn-primary" style={{ height: '50px'}}>Search</button>
        </label>

      </div>

      <BootstrapTable
        keyField='id'
        data={customer}
        columns={columns}
        hover
        pagination={paginationFactory()}
      />

      <CSVLink filename="GLTxnReport.csv" data={customer} headers={headers} className="btn btn-success mt-3">
        Export to CSV
      </CSVLink>
    </div>
  );
};

export default GlTxnReport;
