import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userLevel = localStorage.getItem('userLevel');
// var eDate = '';

function EmployeeList() {
    const [data, setData] = useState([]);
    const mystyle = {
        textAlign:"left",
        borderColor: '#000',

    };
    localStorage.setItem('employeeNo','');

    const history = useHistory();
    const handleClick = (e) =>{
      //  this.props.onHeaderClick(this.props.value);
         // alert(e);
         sessionStorage.setItem('employeeNo',e);
         // const employeeNo = sessionStorage.getItem('employeeNo');
         // alert(employeeNo);
         history.push("/EmployeeEdit");

      }


      useEffect(() => {
        debugger;
        Axios
            .get(url+`/employeeList`,
              {
               params: {
                       companyID: companyID,
                       userLevel: userLevel,
                      }
              }
            )
            .then(result => setData(result.data));
        //alert(data);
        debugger;
    }, []);






    const handleDelete = (e) => {
       // alert(e)
        var user = {  companyID: companyID, employeeNo: e}
        fetch(url+'/employeeDelete', {
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
            .get(url+`/employeeList`,
              {
               params: {
                       companyID: companyID,
                       userLevel: userLevel,
                      }
              }
            )
            .then(result => setData(result.data));
            // alert(data);

        });

    };

    const onhandleNew = (e) => {
       // alert(userLevel);
        if (userLevel > 4) {
             alert('you are not allow to create New Employee');
             return false;
        } else {
        window.location='/EmployeeProfile'
        }
    };
    return (
        <div>
            <div className="row" style={{ 'margin': "10px" }}>
                <div className="col-sm-12 btn btn-info">
                    Employee Listing
                 </div>
            </div>
            <table class="table">
                <thead class="thead-dark" >
                    <tr style={mystyle}>
                    <th style={{backgroundColor: 'yellow'}}>Employee No.</th>
                    <th style={{backgroundColor: 'yellow'}}>Employee Name</th>
                    <th style={{backgroundColor: 'yellow'}}>NRIC No.</th>
                    <th style={{backgroundColor: 'yellow'}}>Sex</th>
                    <th style={{backgroundColor: 'yellow'}}>Level</th>
                    <th style={{backgroundColor: 'yellow'}}>Telephone</th>
                    <th style={{backgroundColor: 'yellow'}}>Hand phone</th>
                    <button style={{ backgroundColor: 'blue', color: 'white', height: '30px', padding: '1px'}} onClick={() => onhandleNew()}>New Employee</button>
                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {data.map(item => {
                     return <tr key={item.Id}>
                        <td>{item.employeeNo}</td>
                        <td>{item.employeeName}</td>
                        <td>{item.nric}</td>
                        <td>{item.sex}</td>
                        <td>{item.level}</td>
                        <td>{item.telNo}</td>
                        <td>{item.hpNo}</td>
                        <a><button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleClick(item.employeeNo)}>Edit</button></a>
                        <a><button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(item.employeeNo)} >Delete</button></a>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    )
}


export default EmployeeList;
