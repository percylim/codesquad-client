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

require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;

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
 var glOpBalance = 0;
//var nPage = 1;
var selectedGlNo='';
var selectedGlSub='';
var selectedOpBalance =0;


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

function glOpenBalance() {
  const [data, setData] = useState([]);
  const inputReference = useRef(null);
 // const [curPage, setPage] = useState([]);

  const [opBalance, setState] = useState({opbalance:0,});
  const [nPage, setPage] = useState({nPage: localStorage.getItem('Page')});
 // const [nPage, setPage] = useState({nPage:2});
 if(localStorage.getItem('Page'))
 curPage = JSON.parse(localStorage.getItem('Page'));
 // alert(url);

  const columns = [

    { dataField: 'glNo', text: 'G/L No.', sort: false ,  headerStyle: { backgroundColor: 'cyan', width: '80px' }, style: { backgroundColor: 'lightgrey'}},
    { dataField: 'glSub', text: 'G/L Sub', sort: false, headerStyle: { backgroundColor: '#BCAAA4', width: '80px' } },
    { dataField: 'glType', text: 'G/L Type', sort: false,   headerStyle: { backgroundColor: 'cyan', width: '80px' }, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'department', text: 'Depart.', sort: false,   headerStyle: { backgroundColor: '#BCAAA4', width: '80px' }},
    { dataField: 'glName', text: 'G/L Name', sort: false , align: 'left', headerStyle: { backgroundColor: 'cyan', width: '200px' }, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'glDescription', text: 'G/L Description', sort: false, align: 'left', headerStyle: { backgroundColor: '#BCAAA4', width: '200px'} },
    { dataField: 'glAmount', text: 'Current Balance', sort: false, align: 'right', headerStyle: { backgroundColor: 'green', width: '150px' } },
    { dataField: 'opBalance', text: 'Opening Balance', sort: false, align: 'right', headerStyle: { backgroundColor: 'yellow', width: '150px' } },
    {
      dataField: "Edit",
      text: "Add/Edit",
      headerStyle: {width: '70px'},
      attrs: {width: '30px'},
      align: 'right',
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

  const handleClick = (glno,glsub, opB) =>{
     selectedGlNo=glno;
     selectedGlSub=glsub;
     selectedOpBalance = opB;
     localStorage.removeItem('glNo');
     localStorage.removeItem('glSub');
     localStorage.removeItem('glOpenBalance');
     localStorage.setItem('glNo',selectedGlNo);
     localStorage.setItem('glSub',selectedGlSub);
     localStorage.setItem('glOpenBalance',selectedOpBalance);
     alert(selectedGlNo+" - "+selectedGlSub);
    // sessionStorage.setItem('glSub',glSub);
    // const employeeNo = sessionStorage.getItem('employeeNo');
    history.push("/glOpenBalanceEdit");
           //   window.location='/glOpenBalance'


   // opBalance=0
  //    setState({opBalance: ''});
    //  alert(opBalance);
  //  inputReference.current.focus();

    };

    const onhandleUpdate = (e) => {

        localStorage.removeItem('glNo');
        localStorage.removeItem('glSub');
        localStorage.removeItem('glOpenBalance');
        localStorage.setItem('glNo',selectedGlNo);
        localStorage.setItem('glSub',selectedGlSub);
        localStorage.setItem('glOpenBalance',selectedOpBalance);

       // sessionStorage.setItem('glSub',glSub);
       // const employeeNo = sessionStorage.getItem('employeeNo');
       history.push("/glOpenBalanceEdit");
                 window.location='/glOpenBalance'




   };

   const handleInputChange =(event) => {

    setState({
      opBalance: event.target.value
    })

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


                let curValue = parseFloat(glData[i].glAmount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                let opValue = parseFloat(glData[i].opBalance).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');


               glData[i].glAmount=curValue;
                glData[i].opBalance=opValue;


               }




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
      localStorage.setItem('Page', page);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  return (
    <div className="App">
    <div className="row" style={{ 'margin': "10px" }}>
    <div className="col-sm-12 btn btn-primary">
        General Ledger Account Opening Balance Listing
     </div>
    </div>
    <span class="square border border-dark"></span>

      <BootstrapTable bootstrap4 keyField='id' data={data} columns={columns}
      rowStyle = {{backgroundColor: '#A9A9A9', border: '3px solid grey' }}
      defaultSorted={defaultSorted} pagination={pagination} class="table table-bordered border-dark">
      </BootstrapTable>










    </div>


  );
}

export default glOpenBalance;
