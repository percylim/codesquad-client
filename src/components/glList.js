import React, {useEffect, useState} from 'react';
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
var curr = new Date();
 //curr.setDate(curr.getDate() + 3);
 var date = curr.toISOString().substr(0,10);
 var todayDate = moment(new Date(date)).format("DD/MM/YYYY");

const headers = [
  { label: 'G/L No.', key: 'glNo'},
  { label: 'G/L Sub', key: 'glSub'},
  { label: 'G/L Type', key: 'glType'},
  { label: 'Department', key: 'department'},
  { label: 'G/L Name', key: 'glName'},
   { label: 'G/L Description', key: 'glDescription'},
];

function glList() {
  const [data, setData] = useState([]);
  /*const products = [
    { id: 1, name: 'George', animal: 'Monkey' },
    { id: 2, name: 'Jeffrey', animal: 'Giraffe' },
    { id: 3, name: 'Alice', animal: 'Giraffe' },
    { id: 4, name: 'Foster', animal: 'Tiger' },
    { id: 5, name: 'Tracy', animal: 'Bear' },
    { id: 6, name: 'Joesph', animal: 'Lion' },
    { id: 7, name: 'Tania', animal: 'Deer' },
    { id: 8, name: 'Chelsea', animal: 'Tiger' },
    { id: 9, name: 'Benedict', animal: 'Tiger' },
    { id: 10, name: 'Chadd', animal: 'Lion' },
    { id: 11, name: 'Delphine', animal: 'Deer' },
    { id: 12, name: 'Elinore', animal: 'Bear' },
    { id: 13, name: 'Stokes', animal: 'Tiger' },
    { id: 14, name: 'Tamara', animal: 'Lion' },
    { id: 15, name: 'Zackery', animal: 'Bear' }
  ]; */

  const columns = [

    { dataField: 'id', text: '#', sort: false},
    { dataField: 'glNo', text: 'G/L No.', sort: true ,  headerStyle: { backgroundColor: 'cyan' }, style: { backgroundColor: 'lightgrey'}},
    { dataField: 'glSub', text: 'G/L Sub', sort: false, headerStyle: { backgroundColor: 'yellow' } },
    { dataField: 'glType', text: 'G/L Type', sort: false,   headerStyle: { backgroundColor: 'cyan' }, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'department', text: 'Department', sort: false,   headerStyle: { backgroundColor: 'yellow' }},
    { dataField: 'glName', text: 'G/L Name', sort: false ,  headerStyle: { backgroundColor: 'cyan' }, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'glDescription', text: 'G/L Description', sort: false,  headerStyle: { backgroundColor: 'yellow' } },
    {
      dataField: "edit",
      text: "Edit",
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

              return <button className="btn btn-primary btn-xs" onClick={() => handleClick(row.glNo, row.glSub)}>Edit</button>

      },
    }

  ];

  const csvReport = {
    data: data,
    headers: headers,
    filename: 'Gneral-Ledger-Report-at-'+todayDate+'.csv'
  };

  const history = useHistory();
  const handleClick = (glno,glsub) =>{
    //  this.props.onHeaderClick(this.props.value);

      // alert(glno + ' - '+glsub)
        localStorage.removeItem('glNo');
        localStorage.removeItem('glSub');
        localStorage.setItem('glNo',glno);
        localStorage.setItem('glSub',glsub);
       // sessionStorage.setItem('glSub',glSub);
       // const employeeNo = sessionStorage.getItem('employeeNo');
       history.push("/glEdit");
       //window.location='/GlEdit'
    };

    const onhandleNew = (e) => {
      // alert(userLevel);
      // if (userLevel > 4) {
      //      alert('you are not allow to create New Employee');
      //      return false;
       //} else {
       window.location='/glNew'
      // }
   };

   useEffect(() => {
    debugger;
    Axios
        .get(url+`/glList`,
          {
           params: {
                   companyID: companyID,
                  }
          }
        )
        .then(result => setData(result.data));
    //alert(data);
    debugger;
}, []);


  const defaultSorted = [{
    dataField: 'glNo',
    order: 'desc'
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
    <div className="App">
    <div className="row" style={{ 'margin': "10px" }}>
    <div className="col-sm-12 btn btn-success">
        General Ledger Listing
     </div>
    </div>
    <span class="square border border-dark"></span>

      <BootstrapTable bootstrap4 keyField='id' data={data} columns={columns} defaultSorted={defaultSorted} pagination={pagination} class="table table-bordered border-dark"
      rowStyle = {{backgroundColor: '#A9A9A9', border: '3px solid grey' }}
      ></BootstrapTable> />
      <button style={{ backgroundColor: 'green', color: 'white', height: '30px', padding: '1px'}} onClick={() => onhandleNew()}>Add New G/L</button>

      <br /><br /> <CSVLink {...csvReport}>Export to CSV</CSVLink>

      </div>


  );
}

export default glList;
