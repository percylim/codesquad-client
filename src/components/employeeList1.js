import React, { useState, useEffect } from 'react'  
import Axios from 'axios';  
import { useHistory } from "react-router-dom";

const companyID = localStorage.getItem('companyID');

// var eDate = '';

function EmployeeList() {  
    const [data, setData] = useState([]);  
    const mystyle = {
        textAlign:"left"
       
    }; 
    localStorage.setItem('employeeNo','');

    const history = useHistory();
    const handleClick = (e) =>{ 
      //  this.props.onHeaderClick(this.props.value);
         // alert(e);
         sessionStorage.setItem('employeeNo',e);
        //  const employeeNo = localStorage.getItem('employeeNo');
         // alert(employeeNo);
         history.push("/employeeEdit");

      }
    useEffect(() => {  
        debugger;  
        Axios  
            .get(`http://localhost:9005/employeeList/${companyID}`)        
            .then(result => setData(result.data));
        //alert(data);  
        debugger;  
    }, []);  
    
       
     
       
    

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
                    <th>Employee No.</th>
                    <th>Employee Name</th>
                    <th>NRIC No.</th>
                    <th>Sex</th>
                    <th>Level</th> 
                    <th>Telephone</th>
                    <th>Hand phone</th>
                    <button style={{ backgroundColor: 'blue', color: 'white', height: '30px', padding: '1px'}} onClick={event =>  window.location.href='EmployeeProfile'}>New Employee</button>
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
                        <a><button style={{ backgroundColor: 'red', color: 'white' }} >Delete</button></a>
                        </tr>  
                    })}  
                </tbody>  
            </table>  
  
        </div>  
    )  
}  

  
export default EmployeeList;  