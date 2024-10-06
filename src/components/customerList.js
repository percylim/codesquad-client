import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
//import { useTable, usePagination } from "react-table";
//import paginationFactory from 'react-bootstrap-table2-paginator';
import {CSVLink} from 'react-csv';
//import AsyncCSV from './AsyncCVS';
import moment from 'moment';
//require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
//const url = 'https://www.my-codesquad.com:39005';
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
        padding: '0.5rem',
        paddingRight: '0.5rem',
        paddingRight: '1rem',
        borderBottom: '1px solid black',

    };




    const history = useHistory();
    const handleClick = (supplierID) =>{
      //  this.props.onHeaderClick(this.props.value);

        // alert(glno + ' - '+glsub)
          localStorage.removeItem('supplierID');

          localStorage.setItem('supplierID',supplierID);

         history.push("/customerEdit");
         //window.location='/GlEdit'
      }


      useEffect(() => {
      //    alert(url);
        Axios
            .get(url+`/customerList`,
              {
               params: {
                       companyID: companyID,
                      }
              }
            )
            .then(result => setData(result.data)); // {
        //alert(data);

      //    let Data = result.data;
      //    alert(Data.length);
    //      if (Data.length === 0) {
    //        alert('cuomer listing data fail');
    //         return false;
    //      }
          // parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    //     for (let i = 0; i < Data.length; i++) {
          // let crLimit = Data[i].creditLimit;
        //    Data[i].creditLimit = parseFloat(crLimit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    //     }
    //     setData(Data);
    //    })

    },[]);




   /***

    const handleDelete = (e) => {
       // alert(e)
        var user = {  companyID: companyID, department: e}
        fetch('http://localhost:9005/departmentDelete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( user )
          // We convert the React state to JSON and send it as the POST body
         // data: JSON.stringify(user,user.ame)
          }).then(function(response) {
           return response.text()
        }).then(function(text) {

        alert(text);
        // alertif (text === 'success')
        Axios
            .get(`http://localhost:9005/departmentList`,
              {
               params: {
                       companyID: companyID,
                      }
              }
            )
            .then(result => setData(result.data));


        });

    };

*/

    const onhandleNew = (e) => {
       // alert(userLevel);
       // if (userLevel > 4) {
       //      alert('you are not allow to create New Employee');
       //      return false;
        //} else {
        window.location='/customerNew'
       // }
    };

    const options = {
       page: 2,
       sizePerPageList: [ {
       text: '5', value: 5
       }, {
       text: '10', value: 10
       }, {
       text: 'All', value: data.length
      } ],
       sizePerPage: 5,
       pageStartIndex: 0,
       paginationSize: 3,
       prePage: 'Prev',
       nextPage: 'Next',
       firstPage: 'First',
       lastPage: 'Last',
      paginationPosition: 'top'
 };


 const csvReport = {
   data: data,
   headers: headers,
   filename: 'Supplier-Customer-Report-At-'+todayDate+'.csv'
 };

 return (
        <div>
            <div className="row" style={{ 'margin': "10px" }}>
                <div className="col-sm-12 btn btn-success">
                    Customer And Supplier Listing
                 </div>
            </div>
            <table class="table" >





                <thead class="thead-dark" >

                    <tr style={mystyle}>
                    <th style={{backgroundColor: 'yellow'}}>#</th>
                    <th style={{backgroundColor: 'yellow'}}>Supplier/Customer ID</th>
                    <th style={{backgroundColor: 'yellow', width: '500px'}}>Supplier/Customer Name</th>
                    <th style={{backgroundColor: 'yellow'}}>Type</th>

                    <th style={{backgroundColor: 'yellow'}}>Telephone</th>
                    <th style={{backgroundColor: 'yellow', textALign: 'right'}}>Term</th>
                    <th style={{backgroundColor: 'yellow', textAlign: 'right'}}>Cr. Limit</th>
                    <button style={{ backgroundColor: 'blue', color: 'white', height: '30px', padding: '1px'}} onClick={() => onhandleNew()}>New Supplier/Customer</button>
                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {data.map(item => {
                     return <tr key={item.Id}>
                        <td>{item.id}</td>
                        <td>{item.supplierID}</td>
                        <td>{item.supplierName}</td>
                        <td>{item.acctType}</td>
                        <td>{item.tel1}</td>
                        <td style={{textAlign: 'right'}}>{item.paymentTerm}</td>
                        <td style={{textAlign: ' right'}}>{item.creditLimit}</td>
                        <a><button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleClick(item.supplierID)}>Edit</button></a>

                        </tr>
                    })}

                </tbody>

            </table>
          <div className="App">
            <CSVLink {...csvReport}>Export to CSV</CSVLink> <br /><br />

          </div>
        </div>
    )
}


export default CustomerList;
