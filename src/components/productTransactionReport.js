import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';

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
 // this.glSubEl = React.createRef();
 // this.glNoEl = React.createRef();

};






componentDidMount() {


     Axios
     .get(url+'/productList',
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
         .get(url+'/locationList',
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






onSearch (e) {
  // e.preventDefault();
  sDate = this.startDateEl.current.value;
  eDate = this.endDateEl.current.value;
   if (sDate === '' ) {
     alert('Date Starting cannot be empty');
     return false
   }
   if (eDate === '' ) {
    alert('Date Ending cannot be empty');
    return false
  }
// window.alert(sDate+' - '+eDate );
  if (sDate > eDate) {
    alert('Date From must not later than Date To ');
    return false;
  }
  startDate=moment(sDate).format("DD-MM-YYYY");
  endDate=moment(eDate).format("DD-MM-YYYY");
//  alert(glNo+" - "+glSub)
                   Axios.get(url+`/productReportSearch`,
                    {
                     params: {
                         companyID: companyID,
                         startDate: sDate,
                         endDate: eDate,
                         productID: productID,

                             }
                    }
                  )

              .then(response => {
                console.log(response.data);
                let data = response.data;
               //  alert(data.length);
                 if (typeof data.length === 'undefined') {
                    return false;
                 }
                totalDrAmt = 0;
                totalCrAmt =0;
                totalOpBal= data[0].opBal;
                for (let i = 0; i < data.length; i++) {
                  let d = new Date(data[i].txnDate);
                  if (data[i].txnQtyIn === null) {
                     data[i].txnQtyIn = 0;
                  }
                  if (data[i].txnQtyOut === null) {
                    data[i].txnQtyOut = 0;
                 }
                  totalDrAmt += data[i].txnQtyIn;
                  totalCrAmt += data[i].txnQtyOut;
                  let drValue = parseFloat(data[i].txnQtyIn).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  let crValue = parseFloat(data[i].txnQtyOut).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  let opValue = parseFloat(data[i].opBal).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  let curValue = parseFloat(data[i].curBal).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  //alert(dramt);gits:2});
                  //alert(dramt);
                  // let drNum = drValue.toString();
                  // let crNum = crValue.toString();
                   // alert(drNum);
                  d.toLocaleDateString('en-GB');
                  data[i].txnDate=d.toLocaleDateString('en-GB');
                  data[i].txnQtyIn=drValue;
                  data[i].txnQtyOut=crValue;
                  data[i].opBal=opValue;
                  data[i].curBal=curValue;

               }
                  // data[0].id ='0';
                let drAmount = parseFloat(totalDrAmt).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                let crAmount = parseFloat(totalCrAmt).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                let opAmount = parseFloat(totalOpBal).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                totalCurBal=totalOpBal+totalDrAmt-totalCrAmt;
                let curAmount = parseFloat(totalCurBal).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');



                this.setState({
                      productData: response.data
                });

                const newData={
                  id: 0,
                  voucherNo: '',
                  glNo: '',
                  glSub: '',
                  department: '',
                  glName: '',
                  txnParticular: 'Total:',
                  glType: '',
                  opBal:opAmount,
                  txnQtyIn: drAmount,
                  txnQtyOut: crAmount,
                  curBal: curAmount,
                  companyID: '',
                  userName: '',
                  txnDate: '',
                  totalDrAmt: 0,
                  totalCrAmt: 0,
                  totalOpBal:0

                };

                let newDatas = [...data, newData];
                 this.setState({
                  Data: newDatas
            });
           // console.log(this.state.customer);
              //   console.log(this.state.customer[this.state.customer.length]);
              //  alert(totalCrAmt);

               })


               }


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
          <input type="date" style={{width: '16%', paddingLeft: '10px'}} ref={this.startDateEl} name="sDate" size="sm"/>

           Ending Date :


          <input type="date" id='endDate' style={{width: '15%'}} ref={this.endDateEl} name="eDate" />

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
