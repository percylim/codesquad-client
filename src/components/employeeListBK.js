import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
 //import './navbar.css';
// import { Dropdown} from "react-bootstrap";
//import axios from "axios";
//import { Link} from 'react-router-dom';

function EmployeeList()
{
    
  const [record,setRecord] = useState([]);


  const loadEmployeeListing = async () =>
  {
    const url = `http://localhost:9005/emplpoyList/${companyID}`;
    Axios.get(url)
    .then(function(response){
         // console.log(response.json);
         const myRepo = response.data;
         setEmployee(myRepo);
         return  response.json();
       })
      .then(function(myJson) {
         // console.log(myJson);

       })
      .catch((error) => {
        console.log('error',error);
      });
    }
  useEffect(() => {
    loadEmployeeListing();
 }, []);
  
    // Insert Employee Records




  return(
    <section>
    <div class="container">
    <h4 className="mb-3 text-center mt-4">CRUD Operation in MERN</h4>
      <div class="row mt-3">
       <div class="col-sm-4">
          <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>

        </div>
      </div>
      <div class="col-sm-8">
        <h5 class="text-center  ml-4 mt-4  mb-5">View Records</h5>

        <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                            <th>Employee No.</th>
                            <th>Employee Name</th>
                            <th>NRIC No.</th>
                            <th>Sex</th>
                            <th>Date Of Birth</th>
                            <th>Level</th> 
                            <th>Telephone</th>
                            <th>Hand phone</th>
            </tr>
            </thead>
            <tbody>

            {record.map((employee)=>
                <tr>
                <td>{employee.employeeNo}</td>
                <td>{employee.employeeName}</td>
                <td>{employee.nric}</td>
                <td>{employee.sex}</td>
                <td>{employee.birthDate}</td>
                <td>{employee.telNo}</td>
                <td>{employee.hpNo}</td>

                </tr>
                )}
            </tbody>
        </table>
      </div>
      </div>
    </div>
   </section>
  )
}

export default EmployeeList;
