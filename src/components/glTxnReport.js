import React, { Component, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Button } from 'react-bootstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
//import {CSVLink} from "react-csv";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment';
import generatePDF from "./reportGenerator";
//import 'bootstrap/dist/css/bootstrap.min.css';
// import { useHistory } from "react-router-dom";
require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
//var customer = {};
var sDate = new Date();
 var eDate = new Date();
 var totalDrAmt = 0;
 var totalCrAmt =0;

 var curr = new Date();
 curr.setDate(curr.getDate() - 1);
 var todayDate = curr.toISOString().substr(0,10);
 var typeData = [];
 var gType = '';
 var gNo='';
 var data = [];
 var glData = [];
 var glType = [];

 // const [glData, setState] = useState([]);

 export class JournalReport extends Component {


  constructor(props) {
    super(props);
   // this.handleClick = this.onSearch.bind(this);



  this.state = {
    typeData: [],
    customer: [],
    data: [],
    gType: '',
    gNo: '',
    glType: [],
    glData: [],
    columns: [

        {
            dataField: 'txnDate',
            text: 'Txn. Date',
            sort: false,
            headerStyle: { backgroundColor: 'grey', color: 'white' }
          },
          {
            dataField: 'voucherNo',
            text: 'Voucher No.',
            sort: false,
            headerStyle: { backgroundColor: 'grey', color: 'white' }
          },
               {
                  dataField: 'glNo',
                  text: 'G/L No.',
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
               },
                {
                  dataField: 'glSub',
                  text: 'G/L Sub No.',
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
                },
                {
                  dataField: 'department',
                  text: 'Department',
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
                },
                {
                  dataField: 'glName',
                  text: 'G/L Name',
                  sort: false ,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
                },
                {
                  dataField: 'jeParticular',
                  text: 'Txn. Particular',
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
                },
                {
                  dataField: 'drAmt',
                  text: 'Debit Amount',
                  sort: false,
                  align: 'right',
                  headerStyle: { backgroundColor: 'yellow', color: 'blackj' }

                 },
                 {
                  dataField: 'crAmt',
                  text: 'Credit Amount',
                  sort: false ,
                  align: 'right',
                  headerStyle: { backgroundColor: 'green', color: 'white' }

                },



        ],




  };
  this.handleChangeType = this.handleChangeType.bind(this);
  this.handleChangeGl = this.handleChangeGl.bind(this);

  this.startDateEl = React.createRef();
  this.endDateEl = React.createRef();
  this.glTypeEl = React.createRef();
  this.glNoEl = React.createRef();

};






componentDidMount() {

    const body = {
        companyID : companyID,

      };
    Axios({
        method: 'post',
        url: url+'/glTypeInfo',
        data: body
      })
      .then(res => {
        console.log(res);
        typeData = res.data;
        gType = typeData[2].glType;
        this.setState({ gType: typeData[2].glType });
        this.glTypeEl.current.value=gType;
      //  alert(this.glTypeEl.current.value);
       this.handleChangeType(gType);
     });


/*
     Axios
     .get(url+`/glSelectList`,
       {
        params: {
                companyID: companyID,
                gType: gType,
               }
       }
     )
         .then(res => {
         //  console.log(res);
           glData = res.data;
            alert(glData.length);
           if (glData.length === 0 ) {
               alert('No G/L Account Record in G/L Type: '+gType);
               } else {
                   gNo = glData[0].glNo;
                   alert(gNo);
                   this.setState({ gNo: glData[0].glNo });
               //    gType = typeData[2].glType;
               //    this.setState({ gType: typeData[2].glType });
               }

       });

*/





};





handleChangeType(e) {

   if(typeof e !== 'object') {
 //  this.setState({ gType: e });
   gType=e;
   } else {
 // this.setState({ gType: e.target.value });
  gType = e.target.value;
   }

  //alert(gType);
   for (let i = 0; i < typeData.length; i++) {
  if (typeData[i].glType === gType) {
    this.glTypeEl.current.value=typeData[i].glType;
   this.setState({ gType: typeData[i].glType});
  // alert(typeData[i].glType);
  }

}



      Axios
      .get(url+`/glSelectList`,
        {
         params: {
                 companyID: companyID,
                 gType: gType,
                }
        }
      )
          .then(res => {
          //  console.log(res);
             glData = res.data;
          //   alert(glData.length);
            if (glData.length === 0 ) {
                alert('No G/L Account Record in G/L Type: '+gType);
            } else {
                    gNo = glData[0].glNo;
                   this.setState({ gNo: glData[0].glNo });
            };

          });

       // });



 } ;



    handleChangeGl(e) {
      //  var ID = 0;
        if (typeof e === 'object') {
        //  alert(e.target.value);
         //  gNo = Number(e.target.value);
           gNo = e.target.value
        } else {
           gNo = e;
        }
       // alert(glID);
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

  voucherData[0].totalDrAmt = totalDrAmt;
  voucherData[0].totalCrAmt = totalCrAmt;
  //alert(totalDrAmt);
  /*
  let vid = voucherData.length+1;
  const newData={
   id: vid,
   voucherNo: 'JP0',
   glNo: '',
   glSub: '',
   department: '',
   jeParticular: 'Total:',
   glName: '',
   glType: '',
   drAmt: totalDrAmt,
   crAmt: totalCrAmt,
   companyID: '',
   userName: '',
   txnDate: todayDate,
   totalDrAmt: 0,
   totalCrAmt: 0

 };
 */
 //const newDatas = [...this.state.customer, newData];

         const headers = [
           {key: 'G/L No.', display: 'glNo'},
           {key: 'G/L Sub', display: 'glSub'},
           {key: 'Department', display: 'department'},
           {key: 'G/L Name', display: 'glName'},
           {key: 'Particular', display: 'jeParticular'},
           {key: 'Dr. Amount', display: 'drAmt'},
           {key: 'Cr. Amount', display: 'crAmt'},
         ]
// lert(this.state.customer[this.state.customer.length].voucherNo);
         generatePDF(this.state.customer, headers, 'JVRepoet.pdf')
         //PDF({voucherData,headers,filename})

};

onSearch (e) {
  // e.preventDefault();
  sDate = this.startDateEl.current.value
  eDate = this.endDateEl.current.value
   if (sDate === '' ) {
     alert('Date Starting cannot be empty');
     return false
   }
   if (eDate === '' ) {
    alert('Date Ending cannot be empty');
    return false
  }

  if (eDate < sDate) {
    alert('Date From must not later than Date To ');
    return false
  }


                   Axios.get(url+`/VoucherSearch`,
                    {
                     params: {
                         companyID: companyID,
                         startDate: sDate,
                         endDate: eDate,
                             }
                    }
                  )

              .then(response => {
                console.log(response.data);
                let data = response.data;
                totalDrAmt = 0;
                totalCrAmt =0;
                for (let i = 0; i < data.length; i++) {
                  let d = new Date(data[i].txnDate);
                  totalDrAmt += data[i].drAmt;
                  totalCrAmt += data[i].crAmt;
                  let drValue = parseFloat(data[i].drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  let crValue = parseFloat(data[i].crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  //alert(dramt);gits:2});
                  //alert(dramt);
                  // let drNum = drValue.toString();
                  // let crNum = crValue.toString();
                   // alert(drNum);
                  d.toLocaleDateString('en-GB');
                  data[i].txnDate=d.toLocaleDateString('en-GB');
                  data[i].drAmt=drValue;
                  data[i].crAmt=crValue;

               }
                  // data[0].id ='0';
                let drAmount = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                let crAmount = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//data[nLength].jeParticular = 'Total :';
//data[nLength].drAmt = totalDrAmt;
//data[nLength].crAmt = totalCrAmt;



                this.setState({
                      customer: response.data
                });

                const newData={
                  id: 0,
                  voucherNo: '',
                  glNo: '',
                  glSub: '',
                  department: '',
                  glName: '',
                  jeParticular: 'Total:',
                  glType: '',
                  drAmt: drAmount,
                  crAmt: crAmount,
                  companyID: '',
                  userName: '',
                  txnDate: '',
                  totalDrAmt: 0,
                  totalCrAmt: 0

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
              <button className="btn btn-info" onClick={ handleClick }>Export To Excel (CSV)</button>
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
                  <div className="container">
                  <div class="row" className="hdr">
                  <div class="col-sm-12 btn btn-info" style={{ 'height': "50px"}}>
                  <h4 style={{ 'color': 'black'}}>General Ledger Account Transaction Report </h4>
                   </div>
                    </div>
                  <div  style={{ marginTop: 20 }}>



                  <ToolkitProvider
    keyField="id"
    data={ this.state.customer }
    columns={ this.state.columns }
    pagination={ pagination }
    exportCSV={ {
      fileName: 'JV Report At '+todayDate+'.CSV',

    } }
  >
    {
      props => (
        <div >

        <form>

        <fieldset>

        <div className="select-container">
          <label style={{paddingRight: '260px'}}>G/L Account Type :
          <select value={this.state.gType} onChange={this.handleChangeType}>
            {typeData.map((item) => (
              <option ref={this.glTypeEl} value={item.glType} required> {item.glType} {item.glTypeName} </option>
           ))}
          </select>

          </label>
          </div>

          <label style={{paddingLeft: '0px'}}> Select General Ledger Account:
          <select >
          {glData.map((item) => (
            <option ref={this.glNoEl} value={item.glNo} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
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


       <BootstrapTable keyField='id' data={ this.state.customer } columns={ this.state.columns }  pagination={ pagination } {...props.baseProps} />
          <hr />

          <MyExportCSV { ...props.csvProps}/>



       </div>
     )
     }

  </ToolkitProvider>


               <hr />

                </div>
                </div>



                )





        }
};

export default JournalReport;
