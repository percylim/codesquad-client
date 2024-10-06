import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
//import ReactDOM from "react-dom";
import bankReconPDF from "./bankReconGenerator";
import { format } from "date-fns";
import moment from 'moment';
import Tooltip from "@material-ui/core/Tooltip";
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

//require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');


var curr = new Date();
curr.setDate(curr.getDate());
var todayDate = curr.toISOString().substr(0, 10);
var tDate = moment(todayDate).format("DD/MM/YYYY");
var cDate = new Date();
      cDate.setDate(cDate.getDate() -60 );
var eDate = cDate.toISOString().substr(0, 10);
var sDate = moment(cDate).format("DD/MM/YYYY");

var bankID ='';
var bankName = '';
var bankAcctNo = '';
var mRefNo='';
//var bankBal=0;
//var glBal=0;
// var bankReconBalance =[];
var startDate=sDate;
var endDate = tDate;

function BankReconciliationEdit() {
 const [startDate, setStartDate]=useState(eDate);
 const [endDate, setEndDate]=useState(todayDate);
 const [bankReconBalance, setBankReconBalance] = useState([]);
 const [bankSumData, setBankSumData] = useState([]);
 const [bankBal, setBankBal] = useState(0);
 const [glBal, setGlBal] = useState(0);
 const mystyle = {
  align: "center",
  marginLeft: '10rem',
};
const boxStyles = {
  rectangle: {
    width: '50px',
    height: '50px',
    borderColor: 'red',
  }

}

const columns = [

  { dataField: 'rowNo', text: '#', sort: false, headerStyle: { backgroundColor: 'yellow', width: '50px' } },
  { dataField: 'txnDate', text: 'Txn. Date', sort: false, headerStyle: { backgroundColor: 'yellow', width: '120px' }, style: { textAlign: 'center' } },
  { dataField: 'bankID', text: 'Bank ID', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey', textAlign: 'left' } },
  { dataField: 'bankName', text: 'Bank Name', align: 'left', sort: false, headerStyle: { backgroundColor: 'yellow', width: '200px'} },
  { dataField: 'bankAcctNo', text: 'Bank A/C No.', align: 'left', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey' , textAlign: 'left'} },
  { dataField: 'particular', text: 'Reconciliation Particular', align: 'left', sort: false, headerStyle: { backgroundColor: 'yellow', width:'500px', textAlign: 'left' } },
  { dataField: 'bankBal', text: 'Bank Balance', align: 'right', sort: false, headerStyle: { backgroundColor: '#999999' }, style: { backgroundColor: 'lightgrey', textAlign: 'right' } },
  { dataField: 'glBal', text: 'G/L Balance', align: 'right', sort: false, headerStyle: { backgroundColor: 'yellow', textAlign: 'right' } },
  {
    dataField: "select",
    text: "SEL", headerStyle: { backgroundColor: 'blue', color: 'white', width: '50px' },
    formatter: (cellContent: string, row: IMyColumnDefinition) => {

      return <button className="fa fa-check-square" onClick={() => handleSelectBankReconciliation(row.bankID, row.txnDate)}></button>

    },
  }

];



  const onPrint = async (bankReconData, bankTotal, glTotal) => {
    //  alert(bankReconData.length);
    //  alert(voucherData[0].txnDate);
      if (bankReconData.length ===0 ) {
        alert('No Bank Reconciliation Record available');
        return false;
      }
    // console.log(voucherData);
      if (bankBal !== glBal) {
        alert('Reconciliation Ending Balance on Bank and G/L must equal' );
        return false;
      }

   mRefNo=bankReconData[0].txnDate.substring(0,4)+bankReconData[0].txnDate.substring(5,7)+bankReconData[0].txnDate.substring(8,10);


    if (bankReconData.length === 0) {

      alert("No Bank Reconciliation information provided")

      return false;
    }
    bankTotal=parseFloat(bankTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    glTotal=parseFloat(glTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    for (var i = bankReconData.length - 1; i >= 0; i--) {
      // alert(typeof voucherData[i].voucherNo);

      let date = bankReconData[i].txnDate;


    //  alert(bankReconData[i].txnDate);
      // const [txnDate, setTxnDate] = useState(date);
      //   todayDate = curr.split("/").reverse().join("-");
    //  bankReconData[i].txnDate = moment(new Date(date)).format("DD/MM/YYYY")
     // bankReconData[i].bankID =  bankID ;
    //  bankReconData[i].bankName =  bankName ;
    //  bankReconData[i].bankAcctNo =  bankAcctNo ;
      bankReconData[i].bankBal=parseFloat(bankReconData[i].bankBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      bankReconData[i].glBal=parseFloat(bankReconData[i].glBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    }
    bankReconData[0].id = 'B';

    let vid = bankReconData[0].length + 1;
    const newData = {
      id: vid,
      companyID: '',
      particular: 'RECONCILIATION ENDING BALANCE :',
      bankBal: bankTotal ,
      glBal: glTotal,
      txnDate: bankReconData[0].txnDate,
      bankID: 'LASTROW',
      bankName: '',
      bankAcctNo: '',
      refNo: mRefNo ,

    };



    const newDatas = [...bankReconData, newData];


    //  const filename = `voucher.pdf`
    // All we want for this example are:
    // Title, Release Date, Description, Vote Average
    // This is important to the function we are building
    // because it sets the order in which we will display data
    const headers = [
      { key: 'Particular', display: 'particular' },
      { key: 'Bank Balance', display: 'bankBal' },
      { key: 'G/L Balance', display: 'glBal' },

    ]


    bankReconPDF(newDatas, headers, 'bankrecon'+'-'+mRefNo+'.pdf')



}

const onDelete = async () => {
 // moment(res.data[i].txnDate).format('DD/MM/YYYY')
  let cDate=bankReconBalance[0].txnDate.split("/").reverse().join("-");
// alert(moment(bankReconBalance[0].txnDate).format('YYYY-MM-DD'));
 // bankReconDelete
 //return false;
  if (bankReconBalance.length ===0 ) {
    alert('No Bank Reconciliation Record available for Deletion');  return false;
  }
if (window.confirm('Are you sure to DELETE this Bank Reconciliation Record ?') ===true ) {

  var user = {  companyID: companyID,  bankID: bankReconBalance[0].bankID, txnDate:cDate}
  fetch(url+'/bankReconDelete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( user )
    // We convert the React state to JSON and send it as the POST body
   // data: JSON.stringify(user,user.ame)
    }).then(function(response) {
     return response.text()
  }).then(function(text) {

      alert(text);
      window.location='/bankReconciliationEdit';
  // alertif (text === 'success')

  });



   // alert('Record Successfully Deleted');
// window.location='/bankReconciliationEdit';
} else {
//  window.location='/home';
 // return false;
}

}

const onHome = async () => {
  window.location='/home' ;
}

const handleSelectBankReconciliation = async (selectBank, reconDate) => {

// alert(reconDate);
//  reconDate = moment(reconDate).format('YYYY-MM-DD') ;
       reconDate=reconDate.split("/").reverse().join("-");
//  alert(reconDate);
  Axios
   .get(url + `/bankReconSearch`,
     {
       params: {
         companyID: companyID,
         bankID: selectBank,
         txnDate: reconDate,
       }
     }
   )
    .then(res => {
   let bBal =0;
   let gBal =0;
      for (let i = 0; i < res.data.length; i++) {

        if (typeof res.data[i].bankBal === 'string') {
          bBal += Number(res.data[i].bankBal);
          } else {
          bBal += res.data[i].bankBal;
          }

          if (typeof res.data[i].glBal === 'string') {
          gBal += Number(res.data[i].glBal);
           } else {
            gBal += res.data[i].glBal;
          }

        res.data[i].txnDate = moment(res.data[i].txnDate).format('DD/MM/YYYY') ;
     //   res.data[i].bankBal =  parseFloat(res.data[i].bankBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
     //   res.data[i].glBal =  parseFloat(res.data[i].glBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');



    //    alert(bBal);



    //    bBal+=res.data[i].bankBal;
    //     gBal+=res.data[i].glBal;

  }

      setBankReconBalance(res.data);
      setBankBal(bBal);
      setGlBal(gBal);

    })


  };

  const onLoadBankReconSummary = async () => {
/*
    const newData = {
      id: 0,
      particular: '',
      companyID: companyID,
      txnDate: '',
      bankID: '',
      bankName: '',
      bankAcctNo: '',
      particular: '',
      bankBal: 0.00,
      glBal: 0.00,


    };

    const newDatas = [...bankSumData, newData];
*/
setBankSumData([]);
 Axios
      .get(url + `/bankReconSummary`,
        {
          params: {
            companyID: companyID,
            startDate: startDate,
            endDate: endDate,
          }
        }
      ).then(res => {
     //   alert(res.data[0].id);
       if (res.data.length === 0) {
          alert('No Bank Reconciliation record on '+startDate+' to '+endDate);
          setBankSumData([]);
          } else {
        for (let i = 0; i < res.data.length; i++) {
              res.data[i].txnDate = moment(res.data[i].txnDate).format('DD/MM/YYYY') ;
              res.data[i].bankBal =  parseFloat(res.data[i].bankBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
              res.data[i].glBal =  parseFloat(res.data[i].glBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');


        }
   //     alert(res.data[0].bankID);
        setBankSumData(res.data);
        }

    //   setBankSumData(res.data);

      })


  };

  const formatInputStartDate = async (e) => {
    //  alert(e.target.value);
      e.preventDefault();
      //const cName = e.target.name;
      console.log(e.target.name);
      console.log(e.target.value);
      setStartDate(e.target.value);

  //    let d = new Date(e.target.value)
  //    mRefNo=String(d.getFullYear())+String(d.getMonth())+String(d.getDay());
   //   alert(mRefNo);

    };

    const formatBurStartDate = async (e) => {
      e.preventDefault();
    //  alert(e.target.value);
      //const cName = e.target.name;
      console.log(e.target.name);
      console.log(e.target.value);
      setStartDate(e.target.value);
  //    let d = new Date(e.target.value)
  //    mRefNo=String(d.getFullYear())+String(d.getMonth())+String(d.getDay());
    //  alert(mRefNo);
    };
     const formatInputEndDate = async (e) => {
      //  alert(e.target.value);
        e.preventDefault();
        //const cName = e.target.name;
        console.log(e.target.name);
        console.log(e.target.value);
        setEndDate(e.target.value);


      };

      const formatBurEndDate = async (e) => {
        e.preventDefault();
      //  alert(e.target.value);
        //const cName = e.target.name;
        console.log(e.target.name);
        console.log(e.target.value);
        setEndDate(e.target.value);
    //    let d = new Date(e.target.value)
    //    mRefNo=String(d.getFullYear())+String(d.getMonth())+String(d.getDay());
      //  alert(mRefNo);
      }; ;
      const defaultSorted = [{
        dataField: 'txnDate',
        order: 'refNo'
      }];
      const pagination = paginationFactory({
        page: 2,
        sizePerPage: 5,
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

  <div>

      <div className="row" style={{ 'margin': "10px", "paddingLeft": "5px" }}>
        <div className="col-sm-12 btn btn-success">
          Bank Reconciliation Listing
        </div>
      </div>

      <label style={{ paddingLeft: '0px' }}>
          Bank Reconciliation For Period Starting From  :
          <input
            type="date"
            maxLength={10}
            value={startDate}
            style={{ width: '10%', marginRight: '2rem' }}
            //  defaultValue = {txnDate}
            name="startDate"
            onBlur={(e) => formatInputStartDate(e)}
            onChange={(e) => formatBurStartDate(e)}
            required
          />

           Ending To  :
          <input
            type="date"
            maxLength={10}
            value={endDate}
            style={{ width: '10%', marginRight: '2rem' }}
            //  defaultValue = {txnDate}
            name="startDate"
            onBlur={(e) => formatInputEndDate(e)}
            onChange={(e) => formatBurEndDate(e)}
            required
          />
     <Tooltip
        title="Press to load bank Reconciliation on selected date"
        placement="top"
      >

          <button
            style={{ padding: '10px' }}
            type='button'
            onClick={() => onLoadBankReconSummary()}   
          >
<i class="btn btn-primary fa fa-download float-right"></i>
</button>
  </Tooltip>

    <Tooltip
        title="Click to print bank Reconciliation report"
        placement="top"
      >
          <button
            style={{ padding: '10px', marginLeft: '1rem'}}
            type='button'
            onClick={() => onPrint(bankReconBalance, bankBal, glBal)}
          >
<i class="btn btn-info fa fa-print"></i>
</button>
</Tooltip>
     <Tooltip
        title="Click to delete bank Reconciliation report"
        placement="top"
      >
          <button
            style={{ padding: '10px', marginLeft: '1rem'}}
            type='button'
            onClick={() => onDelete()}
          >
<i class="btn btn-danger fa fa-trash-o"></i>
</button>
</Tooltip>
 
     <Tooltip
        title="Click to return Home"
        placement="top"
      >
          <button
            style={{ padding: '10px', marginLeft: '1rem'}}
            type='button'
            onClick={() => onHome()}
          >
<i class="btn btn-warning fa fa-home"></i>
</button>
</Tooltip>

  </label>




        <div className="col-sx-10 btn btn-success" style={{ marginTop: '1px', paddingLeft: '10px' }}>
          Bank Reconciliation Summary
        </div>

        <span class="square border border-dark"></span>

        <BootstrapTable bootstrap4 keyField='id' data={bankSumData} columns={columns}
          defaultSorted={defaultSorted} pagination={pagination}
          rowStyle={{ backgroundColor: '#A9A9A9', border: '3px solid grey' }}
          class="table border border-dark" ></BootstrapTable>



<div className="row" style={{ 'margin': "0px", "marginLeft": "0rem" }}>
        <div className="col-sm-12 btn btn-warning">
          Bank Statement And Bank General Ledger Account Listing
        </div>


        <table class="table table-bordered">
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ backgroundColor: '#010000', width: '800px', color: 'white' }}>Particular And Description</th>
              <th style={{ backgroundColor: '#64ba64', width: '300px' }}>Bank Balance</th>
              <th style={{ backgroundColor: 'grey', width: '300px' }}>G/L Balance</th>


            </tr>
          </thead>
          <tbody style={mystyle} >
            {bankReconBalance.map(item => {
              return <tr key={item.id}>
                <td>{item.rowNo}</td>


                <td style={{ textAlign: 'left', color: 'white', backgroundColor: '#01000099' }}>{item.particular}</td>
                <td style={{ textAlign: "right", color: 'black', backgroundColor: '#64ba64' }}>{parseFloat(item.bankBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right", color: "black", backgroundColor: 'grey' }}>{parseFloat(item.glBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>


              </tr>

            })}

          </tbody>


          <tfoot >
            <td></td>
            <td style={{ textAlign: 'right', color: 'white', backgroundColor: '#010000'}}>Reconciliation Ending Balance :</td>
            <td style={{ textAlign: "right", color: 'black', backgroundColor: '#64ba64'}}>{parseFloat(bankBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <td style={{ textAlign: "right", color: "black", backgroundColor: 'grey' }}>{parseFloat(glBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

          </tfoot>

        </table>

      </div>






      </div>
); // return
}; // function

export default BankReconciliationEdit;
