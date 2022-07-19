import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
// const userLevel = localStorage.getItem('userLevel');
// var eDate = '';

function DepartmentList() {
    const [data, setData] = useState([]);
    const mystyle = {
        textAlign:"left",
        borderColor: '#000',

    };
   // localStorage.setItem('departmentID','');

    const history = useHistory();
    const handleClick = (e) =>{
      //  this.props.onHeaderClick(this.props.value);
         // alert(e);
         localStorage.setItem('departmentID',e);
         // const employeeNo = sessionStorage.getItem('employeeNo');
         // alert(employeeNo);
         history.push("/DepartmentEdit");

      }


      useEffect(() => {
        debugger;
        Axios
            .get(url+`/departmentList`,
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




   /***

    const handleDelete = (e) => {
       // alert(e)
        var user = {  companyID: companyID, department: e}
        fetch(url+'/departmentDelete', {
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
            .get(url+`/departmentList`,
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
        window.location='/DepartmentNew'
       // }
    };


    return (
        <div>
            <div className="row" style={{ 'margin': "10px" }}>
                <div className="col-sm-12 btn btn-success">
                    Department Listing
                 </div>
            </div>
            <table class="table" >
                <thead class="thead-dark" >
                    <tr style={mystyle}>
                    <th style={{backgroundColor: 'yellow'}}> ID</th>
                    <th style={{backgroundColor: 'yellow'}}>Department ID</th>
                    <th style={{backgroundColor: 'yellow'}}>Department Description</th>
                    <button style={{ backgroundColor: 'blue', color: 'white', height: '30px', padding: '1px'}} onClick={() => onhandleNew()}>New Department</button>
                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {data.map(item => {
                     return <tr key={item.Id}>
                        <td>{item.id}</td>
                        <td>{item.department}</td>
                        <td>{item.Description}</td>

                        <a><button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleClick(item.department)}>Edit</button></a>

                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    )
}


export default DepartmentList;
