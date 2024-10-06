import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";

const companyID = localStorage.getItem('companyID');
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
// const userLevel = localStorage.getItem('userLevel');
// var eDate = '';

function GstProfile() {
    const [data, setData] = useState([]);
    const mystyle = {
        textAlign:"left",
        borderColor: '#000',


    };
   // localStorage.setItem('departmentID','');

    const history = useHistory();
    const onhandleClick= (e) =>{
      //  this.props.onHeaderClick(this.props.value);
         // alert(e);
         localStorage.setItem('taxID',e);
         // const employeeNo = sessionStorage.getItem('employeeNo');
         // alert(employeeNo);
         history.push("/gstEdit");

      };

      const onhandleRemove= (e) =>{

       //    alert(e);

       Axios
       .get(url+`/taxVerify`,
         {
          params: {
                  companyID: companyID,
                  taxID: e,
                 }
         }
       )
       .then(res => {

      //  alert(res.data);
        if (res.data === 'Existed') {
           if (window.confirm('Tax ID '+e+' already Existed in Purchase Invoice, are you confirm to Delete')) {
              taxDelete(e);
           } else {

            return false
           }
         } else {
            taxDelete(e);
         }



       }, []);

        };

        const taxDelete= (e) =>{
         //   alert(e);


var user = {  companyID: companyID, taxID: e}
fetch(url+'/taxDelete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify( user )
  // We convert the React state to JSON and send it as the POST body
 // data: JSON.stringify(user,user.ame)
  }).then(function(response) {
   return response.text()
}).then(function(text) {

//alert(text);
// alertif (text === 'success')

         window.location='gstProfile'
        })// ;
    };

      useEffect(() => {
      //  debugger;
        Axios
        .get(url+`/taxList`,
              {
               params: {
                       companyID: companyID,
                      }
              }
            )
            .then(result => setData(result.data));
        //alert(data);
      //  debugger;
    }, []);





    const onhandleNew = (e) => {
       // alert(userLevel);
       // if (userLevel > 4) {
       //      alert('you are not allow to create New Employee');
       //      return false;
        //} else {
        window.location='/gstNew'
       // }
    };


    return (
        <div>
            <div className="row" style={{ 'margin': "10px" }}>
                <div className="col-sm-12 btn btn-success">
                    Goods And Services Tax Listing
                 </div>
            </div>
            <table class="table" >
                <thead class="thead-dark" >
                    <tr style={mystyle}>
                    <th style={{backgroundColor: 'yellow'}}> ID</th>
                    <th style={{backgroundColor: 'yellow'}}>Tax ID</th>
                    <th style={{backgroundColor: 'yellow'}}>Tax Type</th>
                    <th style={{backgroundColor: 'yellow'}}>Tax Code</th>
                    <th style={{backgroundColor: 'yellow'}}>Description</th>
                    <th style={{backgroundColor: 'yellow'}}>Tax Rate</th>
                    <th style={{backgroundColor: 'yellow'}}>Remark</th>
                    <button style={{ backgroundColor: 'blue', color: 'white', height: '30px', padding: '1px'}} onClick={() => onhandleNew()}>New Tax</button>
                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {data.map(item => {
                     return <tr key={item.Id}>
                        <td>{item.id}</td>
                        <td style={{backgroundColor: '#a6b5ff'}}>{item.taxID}</td>
                        <td>{item.taxType}</td>
                        <td style={{backgroundColor: '#a6b5ff'}}>{item.taxCode}</td>
                        <td>{item.taxDescription}</td>
                        <td style={{backgroundColor: '#a6b5ff'}}>{parseFloat(item.taxRate).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                        <td>{item.remark}</td>
                        <a><button class={'fa fa-edit'} style={{ backgroundColor: 'green', color: 'white' }} onClick={() => onhandleClick(item.taxID)}></button></a>
                        <a><button class={'fa fa-trash'} style={{ backgroundColor: 'red', color: 'white' }} onClick={() => onhandleRemove(item.taxID)}></button></a>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default GstProfile;
