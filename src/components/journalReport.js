import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment';
import generatePDF from './reportGenerator';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv';


const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');

const JournalReport = () => {
  const [customer, setCustomer] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const columns = [
    { dataField: 'txnDate', text: 'Txn. Date', sort: true, headerStyle: styles.header },
    { dataField: 'voucherNo', text: 'Voucher No.', headerStyle: styles.header },
    { dataField: 'glNo', text: 'G/L No.', headerStyle: styles.header },
    { dataField: 'glSub', text: 'G/L Sub No.', headerStyle: styles.header },
    { dataField: 'department', text: 'Department', headerStyle: styles.header },
    { dataField: 'glName', text: 'G/L Name', headerStyle: styles.header },
    { dataField: 'jeParticular', text: 'Txn. Particular', headerStyle: styles.header },
    { dataField: 'drAmt', text: 'Debit Amount', align: 'right', headerStyle: styles.header },
    { dataField: 'crAmt', text: 'Credit Amount', align: 'right', headerStyle: styles.header },
    { dataField: 'userName', text: 'User Created', headerStyle: styles.header },
    { dataField: 'voucherType', text: 'JE Type', headerStyle: styles.header }
  ];

  const headers = [
    { label: 'Txn. Date', key: 'txnDate' },
    { label: 'G/L No.', key: 'glNo' },
    { label: 'G/L Sub No.', key: 'glSub' },
    { label: 'Department', key: 'department' },
    { label: 'G/L Name', key: 'glName' },
    { label: 'Txn. Particular', key: 'jeParticular' },
    { label: 'Debit Amount', key: 'drAmt' },
    { label: 'Credit Amount', key: 'crAmt' },
    { label: 'User Created', key: 'userName' },
    { label: 'JE Type', key: 'voucherType' },
  ];

  const onSearch = async () => {
    if (!startDate || !endDate) return alert('Both dates must be selected');
    if (endDate < startDate) return alert('Date From must not be later than Date To');

    try {
      const res = await Axios.get(`${url}/api/voucherSearch`, {
        params: {
          companyID,
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD')
        }
      });

      const data = res.data;
      if (!data.length) return alert("No voucher transactions in this range");

      let totalDrAmt = 0;
      let totalCrAmt = 0;

      const formattedData = data.map(row => {
        totalDrAmt += row.drAmt;
        totalCrAmt += row.crAmt;
        return {
          ...row,
          txnDate: moment(row.txnDate).format('DD/MM/YYYY'),
          drAmt: formatCurrency(row.drAmt),
          crAmt: formatCurrency(row.crAmt)
        };
      });

      const summary = {
        id: 0,
        voucherNo: '', glNo: '', glSub: '', department: '', glName: '',
        jeParticular: 'Total:', glType: '',
        drAmt: formatCurrency(totalDrAmt),
        crAmt: formatCurrency(totalCrAmt),
        companyID: '', userName: '', txnDate: '',
        totalDrAmt, totalCrAmt
      };

      setCustomer([...formattedData, summary]);
    } catch (err) {
      alert('Error fetching data');
      console.error(err);
    }
  };

  const onPrint = () => {
    if (!customer.length) return alert("No Voucher No. provided");
    generatePDF(customer, headers, 'JVReport.pdf');
  };

  return (
    <div className="container-fluid">
      <div className="hdr row">
        <div className="col-sm-12 btn btn-info" style={{ height: 50 }}>
          <h4 style={{ color: 'black' }}>Journal Voucher Report Listing</h4>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <form>
          <fieldset>
            <label style={{paddingLeft: '0px'}}
            >Date From: 
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              showYearDropdown
              scrollableYearDropdown
            />
              Date To:
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              showYearDropdown
              scrollableYearDropdown
            />
          
            <Button variant="primary" style={{ marginLeft: '15px' }} onClick={onSearch}>
              Search
            </Button>
  </label>
          </fieldset>
        </form>

        <BootstrapTable keyField='id' data={customer} columns={columns} pagination={paginationFactory()} />

        <hr />

        <CSVLink filename="JNTxn.csv" data={customer} headers={headers} className="btn btn-success">
          Export to CSV
        </CSVLink>
        <Button variant="secondary" onClick={onPrint} style={{ marginLeft: '15px' }}>Print PDF</Button>
      </div>
    </div>
  );
};

const formatCurrency = (val) => parseFloat(val).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const styles = {
  header: { backgroundColor: 'grey', color: 'white' }
};

export default JournalReport;
