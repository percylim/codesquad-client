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

var custData = [];
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

function CustomerList() {
  const [data, setData] = useState([]); 
  const mystyle = {
    textAlign:"left",
    borderCollapse: 'collapse',
    border: '1px solid #ccc',
   
}; 

  const columns = [
  
    { dataField: 'supplierID', text: 'Supplier/Customr ID', sort: true, headerStyle: { backgroundColor: 'yellow'}},
    { dataField: 'supplierName', text: 'Supplier/Customer Name', sort: true ,  headerStyle: { backgroundColor: 'cyan'}},
    { dataField: 'acctType', text: 'Type', sort: true, headerStyle: { backgroundColor: 'yellow' } },
    { dataField: 'tel1', text: 'Telephone', sort: false,   headerStyle: { backgroundColor: 'cyan' }},
    { dataField: 'city', text: 'City', sort: false,   headerStyle: { backgroundColor: 'yellow' }}, 
    { dataField: 'paymentTerm', text: 'Term', sort: false ,  headerStyle: { backgroundColor: 'cyan', textAlign: 'right' }},
    { dataField: 'creditLimit', text: 'Credit Limit', sort: false,  headerStyle: { backgroundColor: 'yellow', textAlign: 'right' } },
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
    filename: 'Supplier-CUstomer-Report-at-'+todayDate+'.csv'
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
       
          //  const data = { companyID }
            fetch('http://localhost:9005/customerList')
              {  
                params: {   
                        companyID: companyID,
                        
                       }
               }
            
            }).then(response=>response.json())
             .then(data=>{
              let Data = data;
              // parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
               for (let i = 0; i < Data.length; i++) { 
                 let crLimit = Data[i].creditLimit;
                  Data[i].creditLimit = parseFloat(crLimit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
               }  
                 setData(Data);
             });
  });          
     
     

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
        Supplier and Customer Listing
     </div>  
    </div>  
     
      <BootstrapTable bootstrap4 keyField='id' data={data} columns={columns} defaultSorted={defaultSorted} pagination={pagination} class="table table-dark table-hover"></BootstrapTable> />
      
      <button style={{ backgroundColor: 'green', color: 'white', height: '30px', padding: '1px'}} onClick={() => onhandleNew()}>Add New G/L</button>
      
      <br /><br /> <CSVLink {...csvReport}>Export to CSV</CSVLink> 
    
      </div>
    
    
  );
}

export default CustomerList;