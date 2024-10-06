import React, {useEffect, useState, useRef} from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import {CSVLink} from 'react-csv';
import moment from 'moment';
import EscapeStr from './mysqlConvertChar';
import fetch from 'node-fetch';
//require('dotenv').config();
//
 const url = process.env.REACT_APP_SERVER_URL;
 var lastSix = '';
var gldata = [];
const companyID = localStorage.getItem('companyID');
const selPage = localStorage.getItem('Page');
var curPage = 1;
var curr = new Date();
 //curr.setDate(curr.getDate() + 3);
 var date = curr.toISOString().substr(0,10);
 var todayDate = moment(new Date(date)).format("DD/MM/YYYY");
var opBalance =0;
 var opBal =0;
//var nPage = 1;
var SelectedGlNo='';
var SelectedGlSub='';
var SelectedOpBalance;
var EditedOpBalance=0;
var debitAmt =0;
var creditAmt =0;

const headers = [
  { label: 'G/L No.', key: 'glNo'},
  { label: 'G/L Sub', key: 'glSub'},
  { label: 'G/L Type', key: 'glType'},
  { label: 'Department', key: 'department'},
  { label: 'G/L Name', key: 'glName'},
   { label: 'G/L Description', key: 'glDescription'},
   { label: 'Current Balance', key: 'glAmount'},
   { label: 'Opening Balance', key: 'opBalance'},
];

function GlOpenBalance() {
  const [data, setData] = useState([]);
  const inputReference = useRef(null);
 // const [curPage, setPage] = useState([]);

  const [opBalance, setState] = useState({opbalance:0,});
  const [nPage, setPage] = useState({nPage: localStorage.getItem('Page')});
 // const [nPage, setPage] = useState({nPage:2});
 if(localStorage.getItem('Page'))
 curPage = JSON.parse(localStorage.getItem('Page'));
 // alert(curPage);

  const columns = [

    { dataField: 'glNo', text: 'G/L No.', sort: true ,  headerStyle: { backgroundColor: 'cyan', width: '60px' }, style: { backgroundColor: 'lightgrey'}},
    { dataField: 'glSub', text: 'G/L Sub', sort: false, headerStyle: { backgroundColor: '#BCAAA4', width: '60px' } },
    { dataField: 'glType', text: 'G/L Type', sort: true,   headerStyle: { backgroundColor: 'cyan', width: '65px' }, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'department', text: 'Depart.', sort: false,   headerStyle: { backgroundColor: '#BCAAA4', width: '65px' }},
    { dataField: 'glName', text: 'G/L Name', sort: false , align: 'left', headerStyle: { backgroundColor: 'cyan', width: '200px' }, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'glDescription', text: 'G/L Description', sort: false, align: 'left', headerStyle: { backgroundColor: '#BCAAA4', width: '200px'} },
    { dataField: 'glAmount', text: 'Current Bal.', sort: false, align: 'right', headerStyle: { backgroundColor: 'green', width: '150px' } },
    { dataField: 'opBalance', text: 'Opening Bal.', sort: false, align: 'right', headerStyle: { backgroundColor: 'yellow', width: '150px' } },
    {
      dataField: "Edit",
      text: "",
      headerStyle: {width: '60px'},
      attrs: {width: '25px'},
      align: 'left',
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

              return <button className="btn btn-primary btn-sm" onClick={() => handleClick(row.glNo, row.glSub, row.opBalance)}>Edit</button>

      },
    }

  ];



  const csvReport = {
    data: data,
    headers: headers,
    filename: 'Gneral-Ledger-Report-at-'+todayDate+'.csv'
  };

  const history = useHistory();

  const handleClick = (glno,glsub, OpenBal) =>{
     SelectedGlNo=glno;
     SelectedGlSub=glsub;
     SelectedOpBalance = OpenBal
   //  alert(selectedGlNo+" - "+selectedGlSub);
     EditedOpBalance = Number(opBalance.opBalance);
      setState({opBalance: ''});
    //  alert(opBalance);
    inputReference.current.focus();

    };

    const onhandleUpdate = (e) => {

        if (SelectedGlNo === '') {
            alert('No G/L Account Se;ected');
            return false
        };
        if (SelectedGlSub === '') {
            alert('No G/L Account Se;ected');
            return false
        };

        EditedOpBalance = Number(opBalance.opBalance).toFixed(2);
     //    alert(SelectedOpBalance+" - "+EditedOpBalance);
        if (SelectedOpBalance === EditedOpBalance) {
            alert('No Change Make');
            return false
        };

     //   alert(SelectedGlNo+"-"+SelectedGlSub+"-"+EditedOpBalance);
     const data= {
        companyID: EscapeStr(companyID),
        glNo: EscapeStr(SelectedGlNo),
       //  glNo:'19911',
         glSub: EscapeStr(SelectedGlSub),
          opBalance: EditedOpBalance,
       };

       fetch(url+'/glOpenBalance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
           },

        body: JSON.stringify( data )
        // We convert the React state to JSON and send it as the POST body
       // data: JSON.stringify(user,user.ame)
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))




     // alert(curPage);
      localStorage.setItem('Page', curPage);
       window.location='/glOpenBalance';
    };


   const handleInputChange =(event) => {

    setState({
      opBalance: event.target.value

  });
};

   const formatInput = e => {

     e.preventDefault();
    const num = e.target.value;
  // alert(num);
 //   setState({
        opBal= parseFloat(num).toFixed(2)
   //  })
    // alert(opBal);
     setState({opBalance: opBal});
  };


    useEffect(() => {
      //  const curPage = JSON.parse(localStorage.getItem('Page'));
      //    setPage({nPage: localStorage.getItem('Page')});
      //   setPage({nPage:5});
       //     const curPage = localStorage.getItem('Page');
       //  curPage=5;
    //  nPage=localStorage.getItem('Page');
     //  alert(curPage);
        Axios
            .get(url+`/glList`,
              {
               params: {
                       companyID: companyID,
                      }
              }
            )
            .then(result => {

               let glData=result.data

               for (let i = 0; i < glData.length; i++) {
                   //alert(typeof glData[i].opBalance);
                   if(typeof glData[i].opBalance !=='number') {
                       glData[i].opBalance=0.00
                   }
                 if (glData[i].opBalance < 0 ){
                     creditAmt+=glData[i].opBalance;
                 } else {
                  debitAmt+=glData[i].opBalance;
                 }

                let curValue = parseFloat(glData[i].glAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                let opValue = parseFloat(glData[i].opBalance).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');


               glData[i].glAmount=curValue;
                glData[i].opBalance=opValue;


               }

               debitAmt=parseFloat(debitAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
               creditAmt=parseFloat(creditAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

              setData(glData)
             // setPage(curPage)
             // setState(0);
             setPage({nPage: localStorage.getItem('Page')});

            }


    );

     //  alert(nPage.nPage)
    }, []);



const logstyle = {
    color: "white",
    backgroundColor: "red",
    padding: "3px 15px 10px 20px",
    fontFamily: "Arial",
    position: 'absolute',
    right: 300,
    width: '6em',
    height: '3em',

};

  const defaultSorted = [{
    dataField: 'glNo',
    order: 'desc'
  }];

  const pagination = paginationFactory({
    page: curPage,
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
      localStorage.setItem('Page', page);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  return (
    <div className="App">
    <div className="row">
    <div className="col-sm-10 btn btn-primary" style={{ 'height':"50px"}}>
        General Ledger Account Opening Balance Listing
     </div>
    </div>
    <span class="square border border-dark"></span>

      <BootstrapTable bootstrap4 keyField='id' data={data} columns={columns}
      rowStyle = {{backgroundColor: '#A9A9A9', border: '3px solid grey' }}
      defaultSorted={defaultSorted} pagination={pagination} class="table table-bordered border-dark">
      </BootstrapTable>
      <label style={{paddingLeft: '5px', color: 'red'}}>
      Opening Balance Debit Balance : {debitAmt}
      </label>
      <label style={{paddingLeft: '5px', color: 'red'}}>
      Opening Balance Credit Balance : {creditAmt}
      </label>


      <h4> Modify General Ledger Opening Balance </h4>


      <form onSubmit={onhandleUpdate}>
      <label style={{ align: "right"}}>
      Opening Balance Amount :
      <input type='number' name='opBalance' value={opBalance.opBalance} style={{paddingRight: '10px', width:'10em'}}
        maxLength={15} ref={inputReference} placeHolder='0.00'
                onChange={handleInputChange} onBlur={formatInput} />

                <button type="submit" style={logstyle}>Update</button>
    </label>
    </form>

    <br></br>
    <br></br>
    <br></br>
    </div>


  );
}

export default GlOpenBalance;
