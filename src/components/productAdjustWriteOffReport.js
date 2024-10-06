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
//import { read, utils, writeFile } from 'xlsx';
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
   // this.handleClick = this.onSearch.bind(this);



  this.state = {
    Data: [],
    aType: [],
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
 // this.handleChangeBank = this.handleChangeType.bind(this);



  this.startDateEl = React.createRef();
  this.endDateEl = React.createRef();
 // this.selectTypeEl = React.createRef();
 // this.glNoEl = React.createRef();

};






componentDidMount() {
   this.startDateEl.current.value = moment(sDate).format("YYYY-MM-DD");
    this.endDateEl.current.value = moment(eDate).format("YYYY-MM-DD");
   //alert(this.startDate.current.value);

 txnType=aType[0].value;


};


handleChangeSelect(e) {
  txnType=e.target.value;

};
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
  sDate=moment(sDate).format("YYYY-MM-DD");
  eDate=moment(eDate).format("YYYY-MM-DD");
  let cType ='ADJUSTMENT';
  if (txnType === 'WRI') {
      cType = 'WRITEOFF';
  }
//  alert(glNo+" - "+glSub)
                   Axios.get(url+`/productAdjustWritrOffSearch`,
                    {
                     params: {
                         companyID: companyID,
                         startDate: sDate,
                         endDate: eDate,
                         txnType: cType,

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

                for (let i = 0; i < data.length; i++) {
                  let d = new Date(data[i].txnDate);
                  if (data[i].txnQtyIn === null) {
                     data[i].txnQtyIn = 0;
                  }
                  if (data[i].txnQtyOut === null) {
                    data[i].txnQtyOut = 0;
                 }

                  let drValue = parseFloat(data[i].txnQtyIn).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  let crValue = parseFloat(data[i].txnQtyOut).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                   // alert(drNum);
                  d.toLocaleDateString('en-GB');
                  data[i].txnDate=d.toLocaleDateString('en-GB');
                  data[i].txnQtyIn=drValue;
                  data[i].txnQtyOut=crValue;

               }
 

                this.setState({
                      Data: response.data
                });


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
                         style={{ 'color': 'black', marginTop: '0px', width: '1550px'}}> <h5> Product Adjustment / Write Off Report </h5>
                     </div>
                      </div>
                    <div  style={{ marginTop: 20 }}>



    
   
        <div >

        <form>

        <fieldset>

        <div className="select-container">

          </div>


          <label style={{paddingLeft: '0px'}}> Select Txn. Type:
          <select value={this.state.value} onChange={(e) => this.handleChangeSelect(e)}>
          {aType.map((items) => (
         <option value={items.value} required>({items.label})</option>
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
       data={ this.state.Data } columns={ this.state.columns }
       rowStyle = {{border: '3px solid grey' }}
       pagination={ pagination }  />
          <hr />

       <CSVLink className="downloadbtn" filename="Product_Adjust_WriteOff_Report.csv" data={this.state.Data} headers={this.state.headers}>
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

export default ProductAdjustWriteOffReport;
