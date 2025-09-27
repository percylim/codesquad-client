import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import DatePicker from 'react-datepicker';
import {CSVLink, CSVDownload} from "react-csv";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap/dist/css/bootstrap.min.css';

 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');

//var customer = {};
var sDate = new Date();
 var eDate = new Date();
 var startDate='';
 var endDate = '';
 var totalDrAmt = 0;
 var totalCrAmt =0;
 var totalOpBal =0;
 var totalCurBal =0;
 var productName='';
 var curr = new Date();

 curr.setDate(curr.getDate() - 1);
// var todayDate = curr.toISOString().substr(0,10);
var todayDate = moment(new Date()).format("DD-MM-YYYY");
 var productID='';
 var barcode='';
 var sku = '';
 var Data = [];
 var productData = [];
 var locData = [];
 var locationID = '';

 // const [glData, setState] = useState([]);

 export class ProductTransactionReport extends Component {


  constructor(props) {
    super(props);
   // this.handleClick = this.onSearch.bind(this);



  this.state = {
    startDate: new Date(),
    endDate: new Date(),
    Data: [],
    productData: [],
    localData: [],
    productID: '',
    sku: '',
    barcode: '',
    productName:'',
    locationID: '',
    columns: [

        {
            dataField: 'txnDate',
            text: 'Txn. Date',
            sort: false,
            align: 'left',
            headerStyle: { backgroundColor: 'grey', color: 'white', width: '120px'}
          },
          {
            dataField: 'voucherNo',
            text: 'Voucher No.',
            sort: false,
            align: 'left',
            headerStyle: { backgroundColor: 'grey', color: 'white', width: '150px' }
          },
                {
                  dataField: 'txnParticular',
                  text: 'Txn. Particular',
                  sort: false,
                  align: 'left',
                  headerStyle: { backgroundColor: 'grey', color: 'white', width: '480px' }
                },
                {
                    dataField: 'opBal',
                    text: 'Opening Balance',
                    sort: false,
                    align: 'right',
                    headerStyle: { backgroundColor: 'blue', color: 'white', width: '200px' }

                },
                {
                  dataField: 'txnQtyIn',
                  text: 'Quantity In',
                  sort: false,
                  align: 'right',
                  headerStyle: { backgroundColor: 'yellow', color: 'black', width: '200px' }

                 },
                 {
                  dataField: 'txnQtyOut',
                  text: 'Quantity Out',
                  sort: false ,
                  align: 'right',
                  headerStyle: { backgroundColor: 'green', color: 'white', width: '200px' }

                },
                {
                    dataField: 'curBal',
                    text: 'Balance',
                    sort: false,
                    align: 'right',
                    headerStyle: { backgroundColor: 'blue', color: 'white', width: '200px' }

                   },

        ],

headers: [
     {label: 'Txn, Date', key: 'txnDate'},
      {label: 'Voucher No.', key: 'voucherNo'},
      {label: 'Txn. Particular', key: 'txnParticular'},
      {label: 'Opening Balance', key: 'opBal'},
      {label: 'Quantity In', key: 'txnQtyIn'},
      {label: 'Quantity Out', key: 'txnQtyOut'},
      {label: 'Balance', key: 'curBal'}, 
      ],


  };
 // this.handleChangeBank = this.handleChangeType.bind(this);



  this.startDateEl = React.createRef();
  this.endDateEl = React.createRef();
  this.onSearch = this.onSearch.bind(this);
 // this.glNoEl = React.createRef();

};






componentDidMount() {


     Axios
     .get(url+'/api/productList',
       {
        params: {
                companyID: companyID,
               }
       }
     )
         .then(res => {
           console.log(res);

           productData = res.data;

            productID = productData[0].productID;
            sku =  productData[0].sku;
            barcode = productData[0].barcode;
            productName=productData[0].productName;



      this.setState({ productID: productData[0].productID });

         });

         Axios
         .get(url+'/api/locationList',
           {
            params: {
                    companyID: companyID,
                   }
           }
         )
             .then(res => {
               console.log(res);

               locData = res.data;

                locationID = locData[0].locationID;




          this.setState({ locationID: locData[0].locationID });

             });



};


 handleChangeProduct= async(e) => {
    const ID = e.target.value;

     // alert(ID);
    for (let i = 0; i < productData.length; i++) {

      if (productData[i].productID === ID) {
       //   setBankID(bankData[i].bankID);
       //   setBankName(bankData[i].bankName);
       ///   setBankAcctNo(bankData[i].bankAcctNo);
        //  setBankGlNo(bankData[i].glNo);
        //  setBankGlSub(bankData[i].glSub);
        //  setBankGlType(bankData[i].glType);
        productID=productData[i].productID;
        sku= productData[i].sku;
        productName=productData[i].productName;
        barcode=productData[i].barcode;
        this.setState({ productID: productData[i].productID});
      }

    }

  }

  handleChangeLocation= async(e) => {
    const ID = e.target.value;

     // alert(ID);
    for (let i = 0; i < locData.length; i++) {

      if (locData[i].locationID === ID) {
       //   setBankID(bankData[i].bankID);
       //   setBankName(bankData[i].bankName);
       ///   setBankAcctNo(bankData[i].bankAcctNo);
        //  setBankGlNo(bankData[i].glNo);
        //  setBankGlSub(bankData[i].glSub);
        //  setBankGlType(bankData[i].glType);
        locationID=locData[i].locationID;

        this.setState({ locationID: locData[i].locationID});
      }

    }

  }






onSearch = async () => {
    try {
      const { startDate, endDate, productID } = this.state;
      
      if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
      }
      
      if (startDate > endDate) {
        alert('Start date must be before end date');
        return;
      }
      
      const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
      const formattedEndDate = moment(endDate).format("YYYY-MM-DD");
      
      const response = await Axios.get(`${url}/api/productReportSearch`, {
        params: {
          companyID: companyID,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          productID: productID
        }
      });
      
      if (!response.data || response.data.length === 0) {
        alert('No data found for the selected criteria');
        this.setState({ productData: [] });
        return;
      }
      
      // Process data
      const processedData = response.data.map(item => ({
        ...item,
        txnDate: new Date(item.txnDate).toLocaleDateString('en-GB'),
        txnQtyIn: item.txnQtyIn ? parseFloat(item.txnQtyIn).toFixed(3) : '0.000',
        txnQtyOut: item.txnQtyOut ? parseFloat(item.txnQtyOut).toFixed(3) : '0.000',
        opBal: item.opBal ? parseFloat(item.opBal).toFixed(3) : '0.000',
        curBal: item.curBal ? parseFloat(item.curBal).toFixed(3) : '0.000'
      }));
      
      // Calculate totals
      const totals = {
        txnParticular: 'Total:',
        txnQtyIn: processedData.reduce((sum, item) => sum + parseFloat(item.txnQtyIn), 0).toFixed(3),
        txnQtyOut: processedData.reduce((sum, item) => sum + parseFloat(item.txnQtyOut), 0).toFixed(3),
        opBal: processedData[0]?.opBal || '0.000',
        curBal: (parseFloat(processedData[0]?.opBal || 0) + 
                processedData.reduce((sum, item) => sum + parseFloat(item.txnQtyIn), 0) -
                processedData.reduce((sum, item) => sum + parseFloat(item.txnQtyOut), 0)
      )};
      
      this.setState({
        productData: [...processedData, totals]
      });
      
    } catch (error) {
      console.error('Search error:', error);
      alert('Error fetching data. Please try again.');
    }
  };


        render() {

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
        });





                return (
                    <div className="container" style={{ 'height': "50px", 'margin': '0px'}} >
                    <div class='row' className="hdr" >
                    <div class="col-sm-10 btn btn-info"
                         style={{ 'color': 'black', marginTop: '0px', width: '1550px'}}> <h5> Product Transaction Report </h5>
                     </div>
                      </div>
                    <div  style={{ marginTop: 20 }}>



  
   
        <div >

        <form>

        <fieldset>

        <div className="select-container">

          </div>


          <label style={{paddingLeft: '0px'}}> Select Product Item:
          <select value={this.state.productID} onChange={(e) => this.handleChangeProduct(e)}>
          {productData.map((items) => (
         <option value={items.productID} required> (Product ID-{items.productID}) (Product Name-{items.productName})</option>
          ))}
         </select>
          </label>


          <label style={{paddingLeft: '0px'}}>Product Transaction Starting Date :
         <DatePicker
           selected={this.state.startDate}
           onChange={(date) => this.setState({startDate: date})}
           dateFormat="dd/MM/yyyy"
/>
           Ending Date :
        <DatePicker
          selected={this.state.endDate}
         onChange={(date) => this.setState({endDate: date})}
         dateFormat="dd/MM/yyyy"
/>
          <button
            type='button'
            class = 'btn btn-primary fa fa-search'
            onClick={() => this.onSearch()}
            ></button>

           </label> </fieldset>


       </form>


       <BootstrapTable keyField='id'
//striped
       hover
       data={ this.state.productData } columns={ this.state.columns }
       rowStyle = {{border: '3px solid grey' }}
       pagination={ pagination }  />
          <hr />

   <CSVLink className="downloadbtn" filename="ProductTxnReport.csv" data={this.state.productData} headers={this.state.headers}>
        Export to CSV
      </CSVLink>    

            <hr />



       </div>

 

               <hr />

                </div>
                </div>



                )





        }
};

export default ProductTransactionReport;
