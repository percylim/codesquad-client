import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import Tooltip from "@material-ui/core/Tooltip";
const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const fetch = require('node-fetch');
// const userLevel = localStorage.getItem('userLevel');
// var eDate = '';
var lEdit = false;
var lDisable = false;
function DepartmentList() {
    const [data, setData] = useState([]);
    const inputReference = useRef(null);
    const inputRefDescription = useRef(null); 
    const [department, setDepartment]=useState('')
    const [description, setDescription] = useState('');

    const mystyle = {
        textAlign:"left",
        borderColor: '#000',

    };
   // localStorage.setItem('departmentID','');

    const history = useHistory();
    const handleClick = (depNo, desc) =>{
     //  alert(desc);
       //  history.push("/DepartmentEdit");
      setDepartment(depNo);
      setDescription(desc);



      lEdit = true;
      lDisable = true;
      inputRefDescription.current.focus();     
      }


      useEffect(() => {
      //  debugger;
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
    //    debugger;
    }, []);



    const formatInputDescription = (e) => {
       // const result = e.target.value.replace(/\D/g, '');
         setDescription(e.target.value);
      };

    const onhandleNew = (e) => {
       // alert(userLevel);
       // if (userLevel > 4) {
       //      alert('you are not allow to create New Employee');
       //      return false;
        //} else {
            lEdit=false;
            lDisable= false;
            setDepartment('');
            setDescription('');
            inputReference.current.focus();    
       // window.location='/DepartmentNew'
       // }
    };
    const formatInputDepartment= (e) => {
        const result = e.target.value.replace(/\D/g, '');
         setDepartment(result);
      };

const  onSave =() => {
    if (department === '') {
        alert('Department cannot be blank');
        return false;
    }
    if (description === '') {
        alert('Description cannot be blank');
        return false;
    }  
  //  alert(lEdit)

  if (lEdit === false) {  
  //  alert('Add New')
    const data = {
        companyID: EscapeStr(companyID),
        department: EscapeStr(department),
        description: EscapeStr(description),
       };
       
       //var name1 =  EscapeStr(user.companyName);
     // alert(Level);
      fetch(url+'/departmentNew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data )
        // We convert the React state to JSON and send it as the POST body
       // data: JSON.stringify(user,user.ame)
        }).then(function(response) {
         return response.text()
      }).then(function(text) {
          setDepartment('');
          setDescription('');
        lEdit=false;
        lDisable=false;

          window.location.reload(false);
          window.location.href='departmentList'
        });
      }
        if (lEdit === true) {
        //    alert('edit')
            const data = {
                companyID: EscapeStr(companyID),
                department: EscapeStr(department),
                description: EscapeStr(description),
               };


            fetch(url+'/departmentUpdate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( data )
                // We convert the React state to JSON and send it as the POST body
               // data: JSON.stringify(user,user.ame)
                }).then(function(response) {
                 return response.text()
              }).then(function(text) {
      
                setDepartment('');
                setDescription('');
              lEdit=false;
              lDisable=false;
             
         
                  window.location.href ='DepartmentList';
                //  window.location.reload(false);
            
                });



        




    }

}

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
                        <td style={{backgroundColor: '#a6b5ff'}}>{item.department}</td>
                        <td>{item.Description}</td>

                        <a><button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleClick(item.department, item.Description)}>Edit</button></a>

                        </tr>
                    })}
                </tbody>
            </table>
            <div style={{
      display: 'inline-block',
      width: '1550px',
      height: '100px',
      margin: '6px',
      backgroundColor: 'white',
      border: '4px solid grey',
    }}>   
          <label style={{paddingLeft: '500px', paddingTop: '2px'}}><h2>Add and Modify Department Profile</h2></label>
     
  
        <label style={{paddingLeft: '20px'}}>Department ID :
        <Tooltip
        title="Type new Department ID with 3 characters"
        placement="top"
        >   
           <input type="text" ref={inputReference} name="department"
            maxLength={3}  value ={department} placeholder="000" className="smaller-input" required = {true}
             onChange={(e) => formatInputDepartment(e)}
            disabled={lDisable} 
            style={{width: '60px', marginRight: '5rem'}}
            />   
       </Tooltip>
  

           Department Description :
    
          <Tooltip
        title="Type new or edit Department Description with maximum 100 charters"
        placement="top"
        >  
          <input type="text" maxLength={100} value={description} name="description" required = {true}
          ref = {inputRefDescription} 
         onChange={(e) => formatInputDescription(e)}  
          
          />
           </Tooltip>
<button
        style={{ padding: '4px', marginLeft: '1rem' }}
        type='button'
        class='btn btn-danger fa fa-save'
        onClick={() => onSave()}
      >Update</button>


          </label>

          </div>
       <br></br><br></br>
      </div> 
      
    )
}


export default DepartmentList;
