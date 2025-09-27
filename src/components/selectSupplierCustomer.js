import React, {useEffect, useState} from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
//import {CSVLink} from 'react-csv';
import moment from 'moment';
//require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
var gldata = [];
const companyID = localStorage.getItem('companyID');
var curr = new Date();
 //curr.setDate(curr.getDate() + 3);
 var date = curr.toISOString().substr(0,10);
 var todayDate = moment(new Date(date)).format("DD/MM/YYYY");


 const headers = [
    { label: 'Supplier/Customer ID', key: 'supplierID'},
    { label: 'Supplier/Customer Name', key: 'supplierName'},
    { label: 'A/C Type', key: 'acctType'},
     { label: 'Telephone', key: 'tel1'},
     { label: 'Term', key: 'paymentTerm'},
     { label: 'Credit Limit', key: 'creditLimit'},
     { label: 'Email', key: 'email'}

  ];

function SelectSupplierCustomer(e) {
  const [data, setData] = useState([]);


  const columns = [

    { dataField: 'id', text: '#', sort: false},
    { dataField: 'supplierID', text: 'Supplier/Customer ID', sort: true ,  headerStyle: { backgroundColor: 'cyan' }, style: { backgroundColor: 'lightgrey'}},
    { dataField: 'supplierName', text: 'Supplier/Customer Name', sort: false, headerStyle: { backgroundColor: 'yellow'}},
    { dataField: 'acctType', text: 'Type', sort: false,   headerStyle: { backgroundColor: 'cyan' }, style: { backgroundColor: 'lightgrey'}},
    { dataField: 'tel1', text: 'Telephone', sort: false,   headerStyle: { backgroundColor: 'yellow' }},
    { dataField: 'paymentTerm', text: 'Term', align: 'center', sort: false ,  headerStyle: { backgroundColor: 'cyan' }, style: { backgroundColor: 'lightgrey'}},
    { dataField: 'creditLimit', text: 'Credit Limit',  align: 'right', sort: false, headerStyle: { backgroundColor: 'yellow' }},
    {
      dataField: "edit",
      text: "Edit",
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

              return <button className="btn btn-primary btn-xs" onClick={() => handleClick(row.supplierID, row.supplierName, row.paymentTerm)}>Select</button>

      },
    }

  ];



  const history = useHistory();
  const handleClick = (supplierID, supplierName, paymentTerm) =>{
    //  this.props.onHeaderClick(this.props.value);

       //  alert(paymentTerm);
        localStorage.removeItem('supplierID');
        localStorage.removeItem('supplierName');
        localStorage.removeItem('paymentTerm');
        localStorage.setItem('supplierID',supplierID);
        localStorage.setItem('supplierName',supplierName);
        localStorage.setItem('paymentTerm',paymentTerm);

        history.goBack();
    };

    const onhandleCancel = () => {

        localStorage.removeItem('supplierID');
        localStorage.removeItem('supplierName');
        localStorage.removeItem('paymentTerm');

          history.goBack();

      // window.location='/customerNew'



   };

   useEffect(() => {
   // alert(localStorage.getItem('voucherNo'));
  //  debugger;
    Axios
        .get(url+`/customerList`,
          {
           params: {
                   companyID: companyID,
                  }
          }
        )
        .then(result => setData(result.data));
   // alert(data[0.]);
  //  debugger;
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
    <div className="col-sm-12 btn btn-info">
        Supplier/Customer Selection
     </div>
    </div>
    <span class="square border border-dark"></span>

      <BootstrapTable bootstrap4 keyField='id' data={data} columns={columns}
      defaultSorted={defaultSorted} pagination={pagination}
      rowStyle = {{backgroundColor: '#A9A9A9', border: '3px solid grey' }}
      class="table border border-dark" ></BootstrapTable> />

      <button style={{ backgroundColor: 'green', color: 'white', height: '30px', padding: '1px'}} onClick={() => onhandleCancel()}>Cancel</button>



      </div>


  );
}

export default SelectSupplierCustomer;
