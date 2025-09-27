import React, { Component, useState, useRef } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Button } from 'react-bootstrap';
//import ToolkitProvider from 'react-bootstrap-table2-toolkit';
//import {CSVLink, CSVDownload} from "react-csv";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment';
import './voucher.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'font-awesome/css/font-awesome.min.css'; 
import Tooltip from "@material-ui/core/Tooltip";
import 'bootstrap/dist/css/bootstrap.css';
//import exportToExcel from "./excelGenerator";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CSVLink, CSVDownload} from 'react-csv';
//import { read, utils, writeFile } from 'xlsx';
//import { DownloadTableExcel } from 'react-export-table-to-excel';
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');

//var customer = {};
var sDate = new Date();
 var eDate = new Date();
 //var startDate='';
 //var endDate = '';
 var productName='';
 var curr = new Date();
 var productID ='';
 var txnType='';


 curr.setDate(curr.getDate());
 sDate.setDate(sDate.getDate());
// var todayDate = curr.toISOString().substr(0,10);
var todayDate = curr.toISOString().substr(0,10);
 var productID='';
 var data = [];
 var aType = [
  {label: 'Product Adjustment',
   value: 'ADJ',
  },
   {label: 'Product Write Off',
    value: 'WRI',
   },
];


 // const [glData, setState] = useState([]);

 export class ProductAdjustWriteOffReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      aType: [
        { label: 'Product Adjustment', value: 'ADJ' },
        { label: 'Product Write Off', value: 'WRI' }
      ],
      startDate: moment().subtract(10, 'days').toDate(),
      endDate: new Date(),
      txnType: 'ADJ',
      columns: [
        { dataField: 'txnDate', text: 'Txn. Date', headerStyle: { backgroundColor: 'grey', color: 'white', width: '130px' } },
        { dataField: 'txnType', text: 'Txn. Type', headerStyle: { backgroundColor: 'grey', color: 'white', width: '160px' } },
        { dataField: 'productID', text: 'Product ID', headerStyle: { backgroundColor: 'grey', color: 'white', width: '150px' } },
        { dataField: 'productName', text: 'Product Name', headerStyle: { backgroundColor: 'grey', color: 'white', width: '350px' } },
        { dataField: 'txnParticular', text: 'Txn. Particular', headerStyle: { backgroundColor: 'grey', color: 'white', width: '450px' } },
        { dataField: 'txnQtyIn', text: 'Quantity In', align: 'right', headerStyle: { backgroundColor: 'yellow', color: 'black', width: '120px' } },
        { dataField: 'txnQtyOut', text: 'Quantity Out', align: 'right', headerStyle: { backgroundColor: 'green', color: 'white', width: '120px' } }
      ],
      headers: [
        { label: 'Txn. Date', key: 'txnDate' },
        { label: 'Txn. Type', key: 'txnType' },
        { label: 'Product ID', key: 'productID' },
        { label: 'Product Name', key: 'productName' },
        { label: 'Txn. Particular', key: 'txnParticular' },
        { label: 'Quantity In', key: 'txnQtyIn' },
        { label: 'Quantity Out', key: 'txnQtyOut' }
      ]
    };
  }

  componentDidMount() {
    this.startDateEl = React.createRef();
    this.endDateEl = React.createRef();
  }

  handleChangeSelect = (e) => {
    this.setState({ txnType: e.target.value });
  };

  formatInputStartDate = (date) => {
    this.setState({ startDate: date || new Date() });
  };

  formatInputEndDate = (date) => {
    this.setState({ endDate: date || new Date() });
  };

  onSearch = () => {
    const { startDate, endDate, txnType } = this.state;
    if (!startDate || !endDate) return alert('Both dates required');
    if (moment(startDate).isAfter(endDate)) return alert('Start must be before end');

    Axios.get(`${url}/api/productAdjustWriteOffSearch`, {
      params: {
        companyID,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        txnType: txnType === 'WRI' ? 'WRITEOFF' : 'ADJUSTMENT'
      }
    })
      .then(res => {
        if (!Array.isArray(res.data) || res.data.length === 0) return alert('No data found');
        const formatted = res.data.map(item => ({
          ...item,
          txnDate: new Date(item.txnDate).toLocaleDateString('en-GB'),
          txnQtyIn: parseFloat(item.txnQtyIn || 0).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          txnQtyOut: parseFloat(item.txnQtyOut || 0).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }));
        this.setState({ Data: formatted });
      })
      .catch(err => {
        console.error(err);
        alert('Error loading data');
      });
  };

  render() {
    const pagination = paginationFactory({ page: 1, sizePerPage: 10, showTotal: true });

    return (
      <div className="container">
        <div className="row hdr">
          <div className="col-sm-10 btn btn-info" style={{ color: 'black', width: '100%' }}>
            <h5>Product Adjustment / Write Off Report</h5>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <form>
            <fieldset>
              <label>
                Select Txn. Type:
                <select value={this.state.txnType} onChange={this.handleChangeSelect}>
                  {this.state.aType.map((item, idx) => (
                    <option key={idx} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </label>

              <label>
                Product Transaction Starting Date:
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.formatInputStartDate}
                  dateFormat="dd/MM/yyyy"
                />
              </label>

              <label>
                Ending Date:
                <DatePicker
                  selected={this.state.endDate}
                  onChange={this.formatInputEndDate}
                  dateFormat="dd/MM/yyyy"
                />
              </label>

              <button type="button" onClick={this.onSearch}>
                <i className="btn btn-primary fa fa-search fa-border"></i>
              </button>
            </fieldset>
          </form>

          <BootstrapTable
            keyField="id"
            hover
            data={this.state.Data}
            columns={this.state.columns}
            pagination={pagination}
          />

          <CSVLink
            className="downloadbtn"
            filename="Product_Adjust_WriteOff_Report.csv"
            data={this.state.Data}
            headers={this.state.headers}
          >
            Export to CSV
          </CSVLink>
        </div>
      </div>
    );
  }
}

export default ProductAdjustWriteOffReport;