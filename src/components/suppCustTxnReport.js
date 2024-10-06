import React, { Component, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Button } from 'react-bootstrap';

import {CSVLink} from "react-csv";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment';
//import ExportCSV from "./excelGenerator";
import generatePDF from "./reportGenerator";
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import { useHistory } from "react-router-dom";
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
//var customer = {};
var sDate = new Date();
 var eDate = new Date();
 var totalDrAmt = 0;
 var totalCrAmt =0;
 var totalOpBal =0;
 var totalCurBal =0;
 var startDate = '';
 var endDate = '';
 var curr = new Date();
 var acctTypeName = '';
// const reportType = {'Supplier', 'Customer'};
 curr.setDate(curr.getDate() - 1);
// var todayDate = curr.toISOString().substr(0,10);
var todayDate = moment(new Date()).format("DD-MM-YYYY")
 var typeData = [];
 var glType = '';
 var glNo='';
 var glSub='';
 var data = [];
 var custData = [];
 var headers =[];
 var glName='';
 var accttype = 'SUPP';
 // const [glData, setState] = useState([]);
  // const headers = [
   //        {label: 'G/L No.', key: 'glNo'},
   //        {label: 'G/L Sub', key: 'glSub'},
   //        {label: 'Department', key: 'department'},
   //        {label: 'G/L Name', key: 'glName'},
   //        {label: 'Particular', key: 'jeParticular'},
   //       {label: 'Open Balance', key: 'opBal'},
   //        {label: 'Dr. Amount', key: 'drAmt'},
   //        {label: 'Cr. Amount', key: 'crAmt'},
   //        {label: 'Balance', key: 'curBal'},
    //     ]
 export class SuppCustTxnReport extends Component {


  constructor(props) {
    super(props);
   // this.handleClick = this.onSearch.bind(this);



  this.state = {
    typeData: [],
    customer: [],
    data: [],
    headers: [],
    acct: 'SUPP',
    gType: '',
    gNo: '',
    gSub: '',
    glType: [],
    glData: [],
    glName: '',
    columns: [

        {
            dataField: 'txnDate',
            text: 'Txn. Date',
            sort: false,
            headerStyle: { backgroundColor: 'grey', color: 'white', width: '115px'}
          },
          {
            dataField: 'voucherNo',
            text: 'Voucher No.',
            sort: false,
            align: 'left',
            headerStyle: { backgroundColor: 'grey', color: 'white', width: '150px' }
          },
          {
                  dataField: 'jeParticular',
                  text: 'Transaction Particular',
                  sort: false,
                  align: 'left',
                  headerStyle: { backgroundColor: 'grey', color: 'white', width: '500px' }
          },
                {
                    dataField: 'opBal',
                    text: 'Opening Balance',
                    sort: false,
                    align: 'right',
                    headerStyle: { backgroundColor: 'blue', color: 'white', width: '200px' }

                },
                {
                  dataField: 'drAmt',
                  text: 'Debit Amount',
                  sort: false,
                  align: 'right',
                  headerStyle: { backgroundColor: 'yellow', color: 'blackj', width: '200px' }

                 },
                 {
                  dataField: 'crAmt',
                  text: 'Credit Amount',
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

headers : [
           {label: 'G/L No.', key: 'glNo'},
           {label: 'G/L Sub', key: 'glSub'},
           {label: 'Department', key: 'department'},
           {label: 'G/L Name', key: 'glName'},
           {label: 'Particular', key: 'jeParticular'},
          {label: 'Open Balance', key: 'opBal'},
           {label: 'Dr. Amount', key: 'drAmt'},
           {label: 'Cr. Amount', key: 'crAmt'},
           {label: 'Balance', key: 'curBal'},
         ],


  };
  this.handleChangeType = this.handleChangeType.bind(this);
  this.handleChangeSupp = this.handleChangeSupp.bind(this);

  this.startDateEl = React.createRef();
  this.endDateEl = React.createRef();
  this.accttypeEl = React.createRef();
  this.supplierIDEl = React.createRef();

};






componentDidMount() {

    const body = {
        companyID : companyID,

      };

    acctTypeName = "Supplier";










      Axios
      .get(url+`/suppCustAcctList`,
        {
         params: {
                 companyID: companyID,
                acctType: accttype,
                }
        }
      )
          .then(res => {
          //  console.log(res);
             custData = res.data;
          //   alert(glData.length);
            if (custData.length === 0 ) {
                alert('No Account Record in SUpplier/Customer Type: '+accttype);
            } else {
                glNo =custData[0].glNo;
                glSub=custData[0].glSub;
                glType=custData[0].glType;
                   this.setState({ supplierID: custData[0].supplierID });
            };

          });

       // });



 } ;


 handleChangeType(event) {

  this.setState({acct: event.target.value});
  accttype = event.target.value;
 // alert(accttype);
  if (accttype === 'CUST') {
      acctTypeName='Customer';
  } else {
    acctTypeName='Supplier';
  }

  Axios
      .get(url+`/suppCustAcctList`,
        {
         params: {
                 companyID: companyID,
                acctType: accttype,
                }
        }
      )
          .then(res => {
          //  console.log(res);
             custData = res.data;
          //   alert(glData.length);
            if (custData.length === 0 ) {
                alert('No Account Record in SUpplier/Customer Type: '+accttype);
            } else {

                   this.setState({ supplierID: custData[0].supplierID });
            };

          });

 // this.sexEl.current.value=value;
//  alert(sex);
};

handleChangeSupp(e) {
       let ID = '';

        if (typeof e === 'object') {
        //  alert(e.target.value);
         //  gNo = Number(e.target.value);
           ID = e.target.value
        } else {
           ID = e;
        }
      //
     //  alert(ID);
       for (let i = 0; i < custData.length; i++) {
           if (custData[i].supplierID === ID) {
              glNo = custData[i].glNo;
              glSub = custData[i].glSub;
              glType = custData[i].glType;
           }


      }
      //   alert(glNo+" - "+glSub);

    };




onPrint () {

  //  alert(voucherData[0].txnDate);
    var voucherData = this.state.customer;
    console.log(voucherData);
    if (voucherData.length === 0) {
     alert("No Voucher No. provided")
     return false;
    }
   let voucher = voucherData[0].voucherNo;
//  alert(voucher);
   if(voucher === null){
       alert("No Voucher No. provided")
    return false;
   }
   if(voucher === ''){
     alert("No Voucher No. provided")
  return false;
 }

// const [txnDate, setTxnDate] = useState(date);
 //   todayDate = curr.split("/").reverse().join("-");
 for (let i = 0; i < voucherData.length; i++) {
   let date = voucherData[i].txnDate;
   //alert(date);
   let oldDate = moment(new Date(date)).format("DD/MM/YYYY");
  //alert(oldDate);


   voucherData[i].txnDate = oldDate;
 }
 totalDrAmt = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 totalCrAmt = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 totalOpBal = parseFloat(totalOpBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  voucherData[0].totalDrAmt = totalDrAmt;
  voucherData[0].totalCrAmt = totalCrAmt;
  voucherData[0].totalOpBal = totalOpBal;
 
 //const newDatas = [...this.state.customer, newData];
/*
         const headers = [
           {key: 'G/L No.', display: 'glNo'},
           {key: 'G/L Sub', display: 'glSub'},
           {key: 'Department', display: 'department'},
           {key: 'G/L Name', display: 'glName'},
           {key: 'Particular', display: 'jeParticular'},
           {key: 'Dr. Amount', display: 'drAmt'},
           {key: 'Cr. Amount', display: 'crAmt'},
         ]
    */     
// lert(this.state.customer[this.state.customer.length].voucherNo);
         generatePDF(this.state.customer, headers, 'SuppCustTaxRepoet.pdf')
         //PDF({voucherData,headers,filename})

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
  startDate = moment(sDate).format("DD-MM-YYYY");
  endDate = moment(eDate).format("DD-MM-YYYY");
 //  alert(glNo+" - "+glSub)
                   Axios.get(url+`/glReportSearch`,
                    {
                     params: {
                         companyID: companyID,
                         startDate: sDate,
                         endDate: eDate,
                         glNo: glNo,
                         glSub: glSub,
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
                glName=data[0].glName;
                for (let i = 0; i < data.length; i++) {
                  let d = new Date(data[i].txnDate);
                  totalDrAmt += data[i].drAmt;
                  totalCrAmt += data[i].crAmt;
                  let drValue = parseFloat(data[i].drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  let crValue = parseFloat(data[i].crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  let opValue = parseFloat(data[i].opBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  let curValue = parseFloat(data[i].curBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  //alert(dramt);gits:2});
                  //alert(dramt);
                  // let drNum = drValue.toString();
                  // let crNum = crValue.toString();
                   // alert(drNum);
                  d.toLocaleDateString('en-GB');
                  data[i].txnDate=d.toLocaleDateString('en-GB');
                  data[i].drAmt=drValue;
                  data[i].crAmt=crValue;
                  data[i].opBal=opValue;
                  data[i].curBal=curValue;

               }
                  // data[0].id ='0';
                let drAmount = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                let crAmount = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                let opAmount = parseFloat(totalOpBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                totalCurBal=totalOpBal+totalDrAmt-totalCrAmt;
                let curAmount = parseFloat(totalCurBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

//data[nLength].jeParticular = 'Total :';
//data[nLength].drAmt = totalDrAmt;
//data[nLength].crAmt = totalCrAmt;
               // alert(typeof curAmount);
               // alert(curAmount);


                this.setState({
                      customer: response.data
                });

                const newData={
                  id: 0,
                  voucherNo: '',
                  jeParticular: 'Total:',
                  opBal:opAmount,
                  drAmt: drAmount,
                  crAmt: crAmount,
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
                  customer: newDatas
            });
           // console.log(this.state.customer);
              //   console.log(this.state.customer[this.state.customer.length]);
              //  alert(totalCrAmt);

               })


               }


        render() {

       //   const headings = [
        //    'Journal Voucher Report',
        //    'Date',
        //  ];

         // const options = {
         //   page: 2,
         //   sizePerPageList: [ {
         //     text: '5', value: 5
         //   }, {
         //     text: '10', value: 10
         //   }, {
         //     text: 'All', value: this.state.customer.length
         //   } ],
         //   sizePerPage: 5,
         //   pageStartIndex: 0,
         //   paginationSize: 3,
         //   prePage: 'Prev',
         //   nextPage: 'Next',
         //   firstPage: 'First',
         //   lastPage: 'Last',

         // };





         const MyExportCSV = (props) => {
          const handleClick = () => {
            props.onExport();
          };
          return (
            <div>
              <button className="btn btn-info" onClick={ handleClick }>Export To Excel (xls)</button>
            </div>
          );
        };




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

       // const { SearchBar, ClearSearchButton } = Search;







                return (
                  <div className="container" style={{ 'height': "50px", 'margin': '0px'}} >
                  <div class='row' className="hdr" >
                  <div class="col-sm-10 btn btn-info"
                       style={{ 'color': 'black', marginTop: '0px', width: '1550px'}}> <h5> Supplier/Customer Account Transaction Report </h5>
                   </div>
                    </div>
                  <div  style={{ marginTop: 20 }}>



   
   
        <div >

        <form>

        <fieldset>

        <div className="select-container">
        <label style={{paddingLeft: '5px'}} component="accttype">Account Type :
          <div className="radio" style={{paddingLeft: '200px'}}>
          <td>
              <input type="radio"  value="SUPP" name="acct"  onChange={this.handleChangeType} ref={this.acctTypeEl} checked={this.state.acct === 'SUPP'} /> Supplier
             </td>
              <td style={{color: 'red'}} >
               <input type="radio" value="CUST" name="acct" onChange={this.handleChangeType} ref={this.acctTypeEl} checked={this.state.acct === 'CUST'} /> Customer
               </td>
            </div>
            </label>
          </div>

          <label style={{paddingLeft: '0px'}}> Select Supplier/Customer Account:
          <select  onChange={(e) => this.handleChangeSupp(e)}>>
          {custData.map((item) => (
            <option ref={this.supplierIDEl} value={item.supplierID} required> ({acctTypeName} : {item.supplierID+" - "+item.supplierName}) </option>
         ))}
         </select>
          </label>


          <label style={{paddingLeft: '0px'}}>G/L Transaction Starting Date :
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
       data={ this.state.customer } columns={ this.state.columns }
       rowStyle = {{border: '3px solid grey' }}
       pagination={ pagination } />
          <hr />

     <CSVLink className="downloadbtn" filename="GLTxn.csv" data={this.state.customer} headers={this.state.headers}>
        Export to CSV
      </CSVLink>

       </div>
  

 


               <hr />

                </div>
                </div>



                )





        }
};

export default SuppCustTxnReport;
