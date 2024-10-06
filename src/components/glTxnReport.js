import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Button } from 'react-bootstrap';
//import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import {CSVLink} from "react-csv";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment';
//import ExportCSV from "./excelGenerator";

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
 
 curr.setDate(curr.getDate() - 1);
// var todayDate = curr.toISOString().substr(0,10);
var todayDate = moment(new Date()).format("DD-MM-YYYY")
 var typeData = [];
 var gType = '';
 var gNo='';
 var gSub='';
 var data = [];
 var glData = [];
 var glType = [];
 var glName='';

 // const [glData, setState] = useState([]);

 export class GlTxnReport extends Component {


  constructor(props) {
    super(props);
   // this.handleClick = this.onSearch.bind(this);



  this.state = {
    typeData: [],
    customer: [],
    data: [],
    gType: '',
    gNo: '',
    gSub: '',
    glNo: '',
    glSub: '',
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
            headerStyle: { backgroundColor: 'grey', color: 'white', width: '130px' }
          },
               {
                  dataField: 'glNo',
                  text: 'G/L No.',
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white', width: '90px' }
               },
                {
                  dataField: 'glSub',
                  text: 'G/L Sub',
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white', width: '90px' }
                },
                {
                  dataField: 'department',
                  text: 'Depart.',
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white', width: '90px' }
                },
                {
                  dataField: 'glName',
                  text: 'G/L Name',
                  sort: false ,
                  headerStyle: { backgroundColor: 'grey', color: 'white',  width: '170px'}
                },
                {
                  dataField: 'jeParticular',
                  text: 'Txn. Particular',
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white', width: '170px' }
                },
                {
                    dataField: 'opBal',
                    text: 'Opening Balance',
                    sort: false,
                    align: 'right',
                    headerStyle: { backgroundColor: 'blue', color: 'white', width: '150px' }

                },
                {
                  dataField: 'drAmt',
                  text: 'Debit Amount',
                  sort: false,
                  align: 'right',
                  headerStyle: { backgroundColor: 'yellow', color: 'blackj', width: '150px' }

                 },
                 {
                  dataField: 'crAmt',
                  text: 'Credit Amount',
                  sort: false ,
                  align: 'right',
                  headerStyle: { backgroundColor: 'green', color: 'white', width: '150px' }

                },
                {
                    dataField: 'curBal',
                    text: 'Balance',
                    sort: false,
                    align: 'right',
                    headerStyle: { backgroundColor: 'blue', color: 'white', width: '150px' }

                   },

        ],

   headers: [
     {label: 'Txn. Date', key: 'txnDate'},
      {label: 'Voucher No.', key: 'voucherNo'},
      {label: 'G/L No.', key: 'glNo'},
      {label: 'G/L Sub No.', key: 'glSub'},
      {label: 'Department', key: 'department'},
      {label: 'G/L Name', key: 'glName'},
      {label: 'JE Particular', key: 'jsParticular'},
      {label: 'Opening Balance', key: 'opBal'},
      {label: 'Debit Amount', key: 'drAmt'},
      {label: 'Credit Amount', key: 'crAmt'},
      {label: 'Balance', key: 'curBal'}, 
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
 //  alert(companyID);
 //this.setState({glData: []});
    const body = {
        companyID : companyID,

      };
      Axios.get(url + `/glTypeInfo`,
      {
        params: {
        companyID: companyID,

        }
      })
      .then(res => {
        console.log(res);
      // alert(res.data.length);
        typeData = res.data;
      //  alert(typeData.length);
        gType = typeData[2].glType;
        alert(gType);
        this.setState({ gType: typeData[2].glType });
       // alert(this.glTypeEl.current.value);
       // this.glTypeEl.current.value=gType;
      // alert(this.glTypeEl.current.value);
     // alert(gType);
     //  this.handleChangeType(typeData[2].glType);
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
 // alert(e);
 // return true;
   if(typeof e !== 'object') {
   this.setState({ gType: e });
   gType=e;
   } else {
  this.setState({ gType: e.target.value });
  gType = e.target.value;
   }
 //  this.setState({ gType: gType});
//  alert(gType);
   for (let i = 0; i < typeData.length; i++) {
 //   alert(typeData[i].glType);
  if (typeData[i].glType === gType) {
  //  this.glTypeEl.current.value=typeData[i].glType;
   this.setState({ gType: typeData[i].glType});
   this.glTypeEl.current.value=gType;
 //  alert(gType);
  }

}

//alert(gType);

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
          this.setState({glData: res.data});
            if (glData.length === 0 ) {
                alert('No G/L Account Record in G/L Type: '+gType);
            } else {
                    gNo = glData[0].glNo;
                    gSub = glData[0].glSub;
                   this.setState({ gNo: glData[0].glNo });
            };

          });

       // });



 } ;



    handleChangeGl(e) {
       let ID = '';

        if (typeof e === 'object') {
        //  alert(e.target.value);
         //  gNo = Number(e.target.value);
           ID = e.target.value
        } else {
           ID = e;
        }
      //
     //   alert(ID);
           gNo = ID.substr(0,4);
           gSub =ID.substr(4,3);
        //   alert(gNo+" - "+gSub);

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
  // alert(gNo+" - "+gSub)
                   Axios.get(url+`/glReportSearch`,
                    {
                     params: {
                         companyID: companyID,
                         startDate: sDate,
                         endDate: eDate,
                         glNo: gNo,
                         glSub: gSub,
                             }
                    }
                  )

              .then(response => {
                console.log(response.data);
                let data = response.data;
                // if(typeof data === 'string');

                 if (typeof data.length === 'undefined') {
                    return false;
                 }
               //  alert(data);

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

                  if (Number.isNaN(opValue)) {
                     opValue=0;
                  }
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
                  <div className="container" style={{ 'height': "50px", 'margin': '15px'}} >
                  <div class='row' className="hdr" >
                  <div class="col-sm-12 btn btn-info"
                       style={{ 'color': 'black'}}> <h2> General Ledger Account Transaction Report </h2>
                   </div>
                    </div>
                  <div  style={{ marginTop: 20 }}>



  
        <div >

        <form>

        <fieldset>

        <div className="select-container">
          <label style={{paddingLeft: '0px'}}>G/L Account Type :
          <select value={this.state.gType} onChange={this.handleChangeType}>
            {typeData.map((item) => (
              <option ref={this.glTypeEl} value={item.glType} required> {item.glType} {item.glTypeName} </option>
           ))}
          </select>

          </label>
          </div>

          <label style={{paddingLeft: '0px'}}> Select General Ledger Account:
          <select  onChange={(e) => this.handleChangeGl(e)}>>
          {glData.map((item) => (
            <option ref={this.glNoEl} value={item.glNo+item.glSub} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
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

     <CSVLink className="downloadbtn" filename="GLTxnRep.csv" data={this.state.customer} headers={this.state.headers}>
        Export to CSV
      </CSVLink>      



       </div>
 
 


               <hr />

                </div>
                </div>



                )





        }
};

export default GlTxnReport;
