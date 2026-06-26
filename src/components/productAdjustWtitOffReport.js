import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment';
import './voucher.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVLink } from 'react-csv';

const companyID = localStorage.getItem('companyID');

// Create axios instance with better error handling
const api = axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log('🚀 Request URL:', config.url);
    console.log('📝 Params:', config.params);
    console.log('🌐 Full URL:', `${config.baseURL || ''}${config.url}`);
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('✅ Response Status:', response.status);
    console.log('📦 Response Data Length:', response.data?.length || 0);
    return response;
  },
  error => {
    console.error('❌ Response Error:', error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Check CORS or proxy.');
    }
    return Promise.reject(error);
  }
);

export class ProductAdjustWriteOffReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      loading: false,
      error: null,
      aType: [
        { label: 'Product Adjustment', value: 'ADJ' },
        { label: 'Product Write Off', value: 'WRI' }
      ],
      startDate: moment().subtract(10, 'days').toDate(),
      endDate: new Date(),
      txnType: 'ADJ',
      columns: [
        { 
          dataField: 'txnDate', 
          text: 'Txn. Date', 
          headerStyle: { backgroundColor: 'grey', color: 'white', width: '180px', align: 'center' } 
        },
        { 
          dataField: 'txnType', 
          text: 'Txn. Type', 
          headerStyle: { backgroundColor: 'grey', color: 'white', width: '160px' } 
        },
        { 
          dataField: 'productID', 
          text: 'Product ID', 
          headerStyle: { backgroundColor: 'grey', color: 'white', width: '200px' } 
        },
        { 
          dataField: 'productName', 
          text: 'Product Name', 
          headerStyle: { backgroundColor: 'grey', color: 'white', width: '600px' } 
        },
        { 
          dataField: 'txnParticular', 
          text: 'Txn. Particular', 
          headerStyle: { backgroundColor: 'grey', color: 'white', width: '600px' } 
        },
        { 
          dataField: 'txnQtyIn', 
          text: 'Quantity In', 
          align: 'right', 
          headerStyle: { backgroundColor: 'yellow', color: 'black', width: '200px' } 
        },
        { 
          dataField: 'txnQtyOut', 
          text: 'Quantity Out', 
          align: 'right', 
          headerStyle: { backgroundColor: 'green', color: 'white', width: '200px' } 
        }
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
    
    if (!startDate || !endDate) {
      alert('Both dates are required');
      return;
    }
    
    if (moment(startDate).isAfter(endDate)) {
      alert('Start date must be before end date');
      return;
    }

    this.setState({ loading: true, error: null });

    // Use the API instance with interceptor
    api.get('/api/productAdjustWriteOffSearch', {
      params: {
        companyID,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
        txnType: txnType === 'WRI' ? 'WRITEOFF' : 'ADJUSTMENT'
      }
    })
    .then(res => {
      console.log('✅ Success! Data received:', res.data);
      
      let responseData = res.data;
      
      // Handle different response formats
      if (res.data && res.data.data && Array.isArray(res.data.data)) {
        responseData = res.data.data;
      }
      
      if (!Array.isArray(responseData)) {
        this.setState({ 
          Data: [], 
          loading: false,
          error: 'Unexpected data format'
        });
        alert('Unexpected data format received');
        return;
      }
      
      if (responseData.length === 0) {
        this.setState({ 
          Data: [], 
          loading: false 
        });
        alert('No data found for the selected criteria');
        return;
      }
      
      // Format data with proper null/undefined handling
      const formatted = responseData.map((item, index) => ({
        id: item.id || index + 1,
        txnDate: item.txnDate ? moment(item.txnDate).format('DD/MM/YYYY') : '-',
        txnType: item.txnType || '-',
        productID: item.productID || '-',
        productName: item.productName || '-',
        txnParticular: item.txnParticular || '-',
        txnQtyIn: item.txnQtyIn ? Number(item.txnQtyIn).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.000',
        txnQtyOut: item.txnQtyOut ? Number(item.txnQtyOut).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0.000'
      }));
      
      this.setState({ 
        Data: formatted, 
        loading: false,
        error: null 
      });
    })
    .catch(err => {
      console.error('❌ Error details:', err);
      
      let errorMessage = '';
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (err.response) {
        // Server responded with error
        const status = err.response.status;
        errorMessage = `Server error (${status}). Please try again.`;
        
        // Check for CORS
        if (status === 0 || status === -1) {
          errorMessage = 'CORS error or network issue. Please check:\n' +
                        '• Backend CORS configuration\n' +
                        '• Proxy settings in package.json\n' +
                        '• Network connectivity';
        }
      } else if (err.request) {
        // No response received
        errorMessage = 'Cannot connect to server. Please check:\n' +
                      '• Is the backend server running?\n' +
                      '• Check proxy configuration in package.json\n' +
                      '• Check CORS settings on backend\n' +
                      '• Network connectivity';
      } else {
        errorMessage = err.message || 'Unknown error occurred';
      }
      
      this.setState({ 
        loading: false,
        error: errorMessage 
      });
      
      alert(errorMessage);
    });
  };

  render() {
    const { Data, loading, error, startDate, endDate, txnType } = this.state;
    
    const pagination = paginationFactory({ 
      page: 1, 
      sizePerPage: 10, 
      showTotal: true,
      totalSize: Data.length
    });

    return (
      <div className="container" style={{ marginLeft: '0px' }}>
        <div className="row hdr">
          <div className="col-sm-12 btn btn-info" style={{ color: 'black', width: '100%', marginTop: '18px' }}>
            <h5>Product Adjustment / Write Off Report</h5>
          </div>
        </div>

        <div style={{ marginTop: 20, marginLeft: 100 }}>
          <form>
            <fieldset>
              <label>
                Select Txn. Type:
                <select value={txnType} onChange={this.handleChangeSelect}>
                  {this.state.aType.map((item, idx) => (
                    <option key={idx} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </label>

              <label>
                Product Transaction Starting Date:
                <DatePicker
                  selected={startDate}
                  onChange={this.formatInputStartDate}
                  dateFormat="dd/MM/yyyy"
                />
              </label>

              <label>
                Ending Date:
                <DatePicker
                  selected={endDate}
                  onChange={this.formatInputEndDate}
                  dateFormat="dd/MM/yyyy"
                />
              </label>

              <button type="button" onClick={this.onSearch} disabled={loading}>
                <i className={`btn btn-primary fa fa-search fa-border ${loading ? 'disabled' : ''}`}>
                  {loading ? ' Searching...' : ' Search'}
                </i>
              </button>
            </fieldset>
          </form>

          {error && (
            <div className="alert alert-danger" style={{ marginTop: '20px', whiteSpace: 'pre-line' }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {loading && (
            <div className="text-center" style={{ margin: '20px 0' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p>Loading data...</p>
            </div>
          )}

          {!loading && Data.length > 0 && (
            <>
              <BootstrapTable
                keyField="id"
                hover
                data={Data}
                columns={this.state.columns}
                pagination={pagination}
              />

              <CSVLink
                className="downloadbtn"
                filename="Product_Adjust_WriteOff_Report.csv"
                data={Data}
                headers={this.state.headers}
              >
                Export to CSV
              </CSVLink>
            </>
          )}

          {!loading && Data.length === 0 && !error && (
            <div className="alert alert-info" style={{ marginTop: '20px' }}>
              No data to display. Please adjust your search criteria and click Search.
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProductAdjustWriteOffReport;