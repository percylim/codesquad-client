import React, { Component, useState, useRef } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Button } from 'react-bootstrap';
//import ToolkitProvider from 'react-bootstrap-table2-toolkit';
//import {CSVLink, CSVDownload} from "react-csv";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment';
//import ExportCSV from "./excelGenerator";
import 'bootstrap/dist/css/bootstrap.css';
//import exportToExcel from "./excelGenerator";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CSVLink, CSVDownload} from 'react-csv';
import DatePicker from 'react-datepicker';
//import { DownloadTableExcel } from 'react-export-table-to-excel';
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');

//var customer = {};
var sDate = new Date();
 var eDate = new Date();
 var startDate='';
 var endDate = '';
 var productName='';
 var curr = new Date();
 var productID ='';
 var txnType='';


 curr.setDate(curr.getDate() - 10);
 sDate.setDate(sDate.getDate()-10);
// var todayDate = curr.toISOString().substr(0,10);
var todayDate = moment(new Date()).format("DD-MM-YYYY");
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
        {label: 'Product Adjustment', value: 'ADJ'},
        {label: 'Product Write Off', value: 'WRI'}
      ],
      startDate: moment().subtract(10, 'days').toDate(),
      endDate: new Date(),
      txnType: 'ADJ',
    columns: [

        {
            dataField: 'txnDate',
            text: 'Txn. Date',
            sort: false,
            align: 'left',
            headerStyle: { backgroundColor: 'grey', color: 'white', width: '120px'}
          },
          {
            dataField: 'txnType',
            text: 'Txn. Type',
            sort: false,
            align: 'left',
            headerStyle: { backgroundColor: 'grey', color: 'white', width: '150px' }
          },

          {
            dataField: 'productID',
            text: 'ProductID',
            sort: false,
            align: 'left',
            headerStyle: { backgroundColor: 'grey', color: 'white', width: '150px' }
          },

          {
            dataField: 'productName',
            text: 'Product Name',
            sort: false,
            align: 'left',
            headerStyle: { backgroundColor: 'grey', color: 'white', width: '350px' }
          },
          {
                  dataField: 'txnParticular',
                  text: 'Txn. Particular',
                  sort: false,
                  align: 'left',
                  headerStyle: { backgroundColor: 'grey', color: 'white', width: '450px' }
                },
                {
                  dataField: 'txnQtyIn',
                  text: 'Quantity In',
                  sort: false,
                  align: 'right',
                  headerStyle: { backgroundColor: 'yellow', color: 'black', width: '120px' }

                 },
                 {
                  dataField: 'txnQtyOut',
                  text: 'Quantity Out',
                  sort: false ,
                  align: 'right',
                  headerStyle: { backgroundColor: 'green', color: 'white', width: '120px' }

                },


        ],
headers: [
     {label: 'Txn, Date', key: 'txnDate'},
      {label: 'Txn. Type', key: 'txnType'},
      {label: 'Product ID', key: 'productID'},
     {label: 'Product Name', key: 'productName'},
      {label: 'Txn. Particular', key: 'txnParticular'},
      {label: 'Quantity In', key: 'txnQtyIn'},
      {label: 'Quantity Out', key: 'txnQtyOut'},
  
      ],
    };

    this.startDateEl = React.createRef();
    this.endDateEl = React.createRef();
  }

  componentDidMount() {
    if (this.startDateEl.current) {
      this.startDateEl.current.value = moment(this.state.startDate).format("YYYY-MM-DD");
    }
    if (this.endDateEl.current) {
      this.endDateEl.current.value = moment(this.state.endDate).format("YYYY-MM-DD");
    }
  }

  handleChangeSelect = (e) => {
    this.setState({ txnType: e.target.value });
  };

  onSearch = () => {
  const { startDate, endDate, txnType } = this.state;
    
    if (!startDate || !endDate) {
      alert('Both start and end dates are required');
      return;
    }

    if (moment(startDate).isAfter(endDate)) {
      alert('Start date must be before end date');
      return;
    }

    const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
    const formattedEndDate = moment(endDate).format("YYYY-MM-DD");
    const cType = txnType === 'WRI' ? 'WRITEOFF' : 'ADJUSTMENT';

    Axios.get(url + `/api/productAdjustWriteOffSearch`, {
      params: {
        companyID: companyID,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        txnType: cType
      }
    }).then(response => {
      if (!response.data || !Array.isArray(response.data)) {
        alert('No data returned from server');
        return;
      }

      const formattedData = response.data.map(item => ({
        ...item,
        txnDate: new Date(item.txnDate).toLocaleDateString('en-GB'),
        txnQtyIn: item.txnQtyIn ? 
          parseFloat(item.txnQtyIn).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0.000',
        txnQtyOut: item.txnQtyOut ? 
          parseFloat(item.txnQtyOut).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : '0.000'
      }));

      this.setState({ Data: formattedData });
    }).catch(error => {
      console.error('Error fetching data:', error);
      alert('Failed to load data. Please try again.');
    });
  };

 

  render() {
    const pagination = paginationFactory({
       const pagination = paginationFactory({
          page: 1,
          sizePerPage: 10,
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
        }),
  

    return (
      <div className="container" style={{ 'height': "50px", 'margin': '0px'}}>
        <div className='row hdr'>
          <div className="col-sm-10 btn btn-info" style={{ 'color': 'black', marginTop: '0px', width: '1550px'}}> 
            <h5>Product Adjustment / Write Off Report</h5>
          </div>
        </div>
        
        <div style={{ marginTop: 20 }}>
          <form>
            <fieldset>
              <div className="select-container">
                <label style={{paddingLeft: '0px'}}> 
                  Select Txn. Type:
                  <select 
                    value={this.state.txnType} 
                    onChange={this.handleChangeSelect}
                  >
                    {this.state.aType.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label style={{paddingLeft: '0px'}}>
                  Product Transaction Starting Date:
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={(date) => this.setState({startDate: date})}
                    dateFormat="dd/MM/yyyy"
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                  />
                  
                  Ending Date:
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={(date) => this.setState({endDate: date})}
                    dateFormat="dd/MM/yyyy"
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    minDate={this.state.startDate}
                  />
                  
                  <button
                    type='button'
                    className='btn btn-primary fa fa-search'
                    onClick={this.onSearch}
                  >
                    Search
                  </button>
                </label>
              </div>
            </fieldset>
          </form>

          <BootstrapTable
            keyField='id'
            hover
            data={this.state.Data}
            columns={this.state.columns}
            rowStyle={{border: '3px solid grey'}}
            pagination={pagination}
          />
          
          <hr />
          <CSVLink 
            className="downloadbtn" 
            filename="Product_Adjust_WriteOff_Report.csv" 
            data={this.state.Data} 
            headers={this.state.headers}
          >
            Export to CSV
          </CSVLink>
          <hr />
        </div>
      </div>
    );
  }
}
};

export default ProductAdjustWriteOffReport;