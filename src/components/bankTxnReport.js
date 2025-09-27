import React, { Component, useState, useRef } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Button } from 'react-bootstrap';
import Tooltip from "@material-ui/core/Tooltip";
import {CSVLink} from "react-csv";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment';
//import ExportCSV from "./excelGenerator";
import 'bootstrap/dist/css/bootstrap.css';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {CSVLink, CSVDownload} from 'react-csv';
//import  { Tooltip as ReactTooltip }from "react-tooltip";
//import { DownloadTableExcel } from 'react-export-table-to-excel';
//require('dotenv').config();//
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
 var bankName='';
 var curr = new Date();
 curr.setDate(curr.getDate() - 1);
 var todayDate = curr;
 var glNo='';
 var glSub='';
 var Data = [];
 var bankData = [];
var bankID = '';
 // const [glData, setState] = useState([]);

 export class BankTxnReport extends Component {


  constructor(props) {
    super(props);
   // this.handleClick = this.onSearch.bind(this);

 this.startDateEl = React.createRef();
  this.endDateEl = React.createRef();

  this.state = {
    Data: [],
    bankData: [],
    glNo: '',
    glSub: '',
    startDate: todayDate,
    endDate: todayDate,
    bankName:'',
    bankID: '',
    headers: [],
    columns: [

        {
            dataField: 'txnDate',
            text: 'Txn. Date',
            sort: false,
            align: 'left',
            headerStyle: { backgroundColor: 'grey', color: 'white', width: '125px'}
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

  headers: [
     {label: 'Txn. Date', key: 'txnDate'},
      {label: 'Voucher No.', key: 'voucherNo'},
      {label: 'JE Particular', key: 'jsParticular'},
      {label: 'Opening Balance', key: 'opBal'},
      {label: 'Debit Amount', key: 'drAmt'},
      {label: 'Credit Amount', key: 'crAmt'},
      {label: 'Balance', key: 'curBal'}, 
      ],


  };
 // this.handleChangeBank = this.handleChangeType.bind(this);
 // this.glSubEl = React.createRef();
 // this.glNoEl = React.createRef();

};






componentDidMount() {


     Axios
     .get(url+'/api/bankList',
       {
        params: {
                companyID: companyID,
               }
       }
     )
         .then(res => {
           console.log(res);
           if (res.data.length === 0) {
            alert('No Bank Account created') ;
            return false;
           }
           bankData = res.data;

        //   alert(bankData[0].opBal);
          //  alert(bankData.length);
         //   let bkID = bankData[0].bankID;
         //   let bkName =  bankData[0].bankName;
         //   let bkAcctNo =  bankData[0].bankAcctNo;
            glNo = bankData[0].glNo;
            glSub =  bankData[0].glSub;
            bankName=bankData[0].bankName;
            bankID=bankData[0].bankID;
    //        setBankGlNo(bankData[0].glNo);
      //      setBankGlSub(bankData[0].glSub);


      this.setState({ bankID: bankData[0].bankID });

         });





};


 handleChangeBank= async(e) => {
    const ID = e.target.value;

     // alert(ID);
    for (let i = 0; i < bankData.length; i++) {

      if (bankData[i].bankID === ID) {
       //   setBankID(bankData[i].bankID);
       //   setBankName(bankData[i].bankName);
       ///   setBankAcctNo(bankData[i].bankAcctNo);
        //  setBankGlNo(bankData[i].glNo);
        //  setBankGlSub(bankData[i].glSub);
        //  setBankGlType(bankData[i].glType);
        glNo=bankData[i].glNo;
        glSub= bankData[i].glSub;
        bankName=bankData[i].bankName;
        bankID=bankData[i].bankID;
        this.setState({ bankID: bankData[i].bankID});
      }

    }

  }






onPrint () {

  //  alert(voucherData[0].txnDate);
    var voucherData = this.state.bankData;
    console.log(voucherData);
    if (voucherData.length === 0) {
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
 //  alert(voucherData[i].drAmt);

   voucherData[i].txnDate = oldDate;
 }
 totalDrAmt = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 totalCrAmt = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 totalOpBal = parseFloat(totalOpBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  voucherData[0].totalDrAmt = totalDrAmt;
  voucherData[0].totalCrAmt = totalCrAmt;
  voucherData[0].totalOpBal = totalOpBal;
  //window.alert(totalDrAmt);

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
// alert(this.state.customer[this.state.customer.length].voucherNo);
         //ExportCSV(this.state.customer, headers, 'BankTxnRepoet.xls')
         //PDF({voucherData,headers,filename})

};

onSearch = () => {
  const { startDate, endDate } = this.state;

  if (!startDate) {
    alert("Date Starting cannot be empty");
    return;
  }
  if (!endDate) {
    alert("Date Ending cannot be empty");
    return;
  }
  if (startDate > endDate) {
    alert("Date From must not be later than Date To");
    return;
  }

  // Format dates for backend (MySQL wants YYYY-MM-DD)
  const sDate = moment(startDate).format("YYYY-MM-DD");
  const eDate = moment(endDate).format("YYYY-MM-DD");

  Axios.get(`${url}/api/glReportSearch`, {
    params: {
      companyID,
      startDate: sDate,
      endDate: eDate,
      glNo,
      glSub,
    }
  })
    .then((response) => {
      let data = response.data || [];

      if (!Array.isArray(data) || data.length === 0) {
        this.setState({ bankData: [] });
        return;
      }

      let totalDrAmt = 0;
      let totalCrAmt = 0;
      let totalOpBal = data[0].opBal || 0;

      // format rows
      data = data.map((row) => {
        totalDrAmt += row.drAmt;
        totalCrAmt += row.crAmt;

        const d = new Date(row.txnDate);
        return {
          ...row,
          txnDate: d.toLocaleDateString("en-GB"),
          drAmt: parseFloat(row.drAmt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          crAmt: parseFloat(row.crAmt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          opBal: parseFloat(row.opBal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          curBal: parseFloat(row.curBal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        };
      });

      const totalCurBal = totalOpBal + totalDrAmt - totalCrAmt;

      const newData = {
        id: 0,
        voucherNo: "",
        glNo: "",
        glSub: "",
        department: "",
        glName: "",
        jeParticular: "Total:",
        glType: "",
        opBal: parseFloat(totalOpBal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        drAmt: parseFloat(totalDrAmt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        crAmt: parseFloat(totalCrAmt).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        curBal: parseFloat(totalCurBal).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        companyID: "",
        userName: "",
        txnDate: "",
      };

      this.setState({
        bankData: [...data, newData],
      });
    })
    .catch((err) => {
      console.error("❌ onSearch error:", err);
      alert("Search failed. Please try again.");
    });
};


        render() {

   




         const MyExportCSV = (props) => {
          const handleClick = () => {
           // alert(this.state.Data[0].curBal);
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
                  <div className="container" style={{ 'height': "50px", 'margin': '15px'}} >
                  <div class='row' className="hdr" >
                  <div class="col-sm-12 btn btn-info"
                       style={{ 'color': 'black'}}> <h2> Bank Transaction Report </h2>
                   </div>
                    </div>
                  <div  style={{ marginTop: 20 }}>



 
   
        <div >

        <form>

        <fieldset>

        <div className="select-container">

          </div>

          <label style={{paddingLeft: '0px'}}> Select Bank Account:
          <select value={this.state.bankID} onChange={(e) => this.handleChangeBank(e)}>
          {bankData.map((items) => (
         <option value={items.bankID} required> (Bank ID-{items.bankID}) (Bank Name-{items.bankName}) (Bank Account No.-{items.bankAcctNo})</option>
          ))}
         </select>
          </label>


       <label style={{ paddingLeft: '0px' }}>
     Starting Date :
  <DatePicker
    selected={this.state.startDate}
    onChange={date => this.setState({ startDate: date })}
    dateFormat="dd/MM/yyyy"
  />

  Ending Date :
  <DatePicker
    selected={this.state.endDate}
    onChange={date => this.setState({ endDate: date })}
    dateFormat="dd/MM/yyyy"
  />
</label>     

      <Tooltip
        title="Press to load bank transaction on selected date"
        placement="top"
      >
          <button
            type='button'
            style={{backgroundColor: 'blue'}}
            onClick={() => this.onSearch()}
            ><i class="btn btn-primary fa fa-search"></i></button>
</Tooltip>


           </fieldset>


       </form>


       <BootstrapTable keyField='id'
//striped
       hover
       data={ this.state.bankData } columns={ this.state.columns }
       rowStyle = {{border: '3px solid grey' }}
       pagination={ pagination } />
          <hr />

         

            <hr />
 
<CSVLink className="downloadbtn" filename="BankTxnReport.csv" data={this.state.bankData} headers={this.state.headers}>
        Export to CSV
      </CSVLink>

       </div>
  

 

               <hr />




                </div>
                </div>



                )





        }
};

export default BankTxnReport;
