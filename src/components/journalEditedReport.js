import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');

const styles = {
  header: { backgroundColor: 'grey', color: 'white' }
};

const JournalEditedReport = () => {
  const [customer, setCustomer] = useState([]);
  const [voucher, setVoucher] = useState([]); // FIXED from null
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const columns = [
    { dataField: 'dateChange', text: 'Date Edited', headerStyle: styles.header },
    { dataField: 'voucherNo', text: 'Voucher No.', headerStyle: styles.header },
    { dataField: 'glNo', text: 'G/L No.', headerStyle: styles.header },
    { dataField: 'glSub', text: 'G/L Sub No.', headerStyle: styles.header },
    { dataField: 'department', text: 'Department', headerStyle: styles.header },
    { dataField: 'glName', text: 'G/L Name', headerStyle: styles.header },
    { dataField: 'jeParticular', text: 'Txn. Particular', headerStyle: styles.header },
    { dataField: 'drAmt', text: 'Debit Amount', align: 'right', headerStyle: styles.header },
    { dataField: 'crAmt', text: 'Credit Amount', align: 'right', headerStyle: styles.header },
    { dataField: 'userName', text: 'User Created', headerStyle: styles.header },
    { dataField: 'userChange', text: 'User Edited', headerStyle: styles.header },
    { dataField: 'reasons', text: 'Edit Status', headerStyle: styles.header },
    {
      dataField: "search",
      text: "Action",
      formatter: (cellContent, row) => (
        <button className='btn btn-primary fa fa-search' onClick={() => searchVoucher(row.voucherNo)} />
      )
    }
  ];

  const voucherColumns = [
    { dataField: 'txnDate', text: 'Txn. Date', headerStyle: styles.header },
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

  const onSearch = async () => {
    if (!startDate || !endDate) return alert('Both dates must be selected');
    if (endDate < startDate) return alert('Date From must not be later than Date To');

    try {
      const res = await Axios.get(`${url}/api/voucherEditSearch`, {
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
        id: 0, voucherNo: '', glNo: '', glSub: '', department: '', glName: '',
        jeParticular: 'Total:', drAmt: formatCurrency(totalDrAmt), crAmt: formatCurrency(totalCrAmt)
      };

      setCustomer([...formattedData, summary]);
    } catch (err) {
      alert('Error fetching data');
      console.error(err);
    }
  };

  const searchVoucher = async (voucherNo) => {
    try {
      const res = await Axios.get(`${url}/api/voucherCurrentList`, {
        params: { companyID, voucherNo }
      });

      const data = res.data;
      if (data.length) {
        const formatted = data.map(row => ({
          ...row,
          txnDate: moment(row.txnDate).format('DD/MM/YYYY'),
          drAmt: formatCurrency(row.drAmt),
          crAmt: formatCurrency(row.crAmt)
        }));
        setVoucher(formatted);
      }
    } catch (err) {
      alert('Error fetching voucher data');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row hdr">
        <div className="col-sm-12 btn btn-info">
          <h4 style={{ color: 'black' }}>Journal Voucher Report Listing</h4>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <form>
          <fieldset>
            <label>Date From: 
            <DatePicker selected={startDate} onChange={setStartDate} dateFormat="dd/MM/yyyy" placeholderText="dd/mm/yyyy" />
           </label>
            <label style={{ marginLeft: 10 }}>Date To: 
            <DatePicker selected={endDate} onChange={setEndDate} dateFormat="dd/MM/yyyy" placeholderText="dd/mm/yyyy" />
          </label>
            <Button variant="primary" style={{ marginLeft: 15 }} onClick={onSearch}>Search</Button>
          </fieldset>
        </form>

        <BootstrapTable keyField='id' data={customer} columns={columns} pagination={paginationFactory()} />
        <hr />

        <h4>Original Journal Voucher After Edited</h4>
        <BootstrapTable keyField='id' data={voucher} columns={voucherColumns} />
        <hr />
      </div>
    </div>
  );
};

const formatCurrency = (val) => parseFloat(val).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default JournalEditedReport;