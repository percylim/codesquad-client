import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import Tooltip from "@material-ui/core/Tooltip";
import './UserProfile.css';

const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userLevel = localStorage.getItem('userLevel');
const fetch = require('node-fetch');

var lEdit = false;
var lDisable = false;
function UserProfile() {

    const [data, setData] = useState([]);
    const inputReference = useRef(null);
    const inputRefUserName = useRef(null); 
    const [userID, setUserID]=useState('')
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState(''); 
    const [sex, setSex] = useState('');
    const [nric, setNric]=useState('');


 const mystyle = {
        textAlign:"left",
        borderColor: '#000',
        paddingLeft: '20px'
    };

 const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

const onSave = async () => {
  if (!userLevel || userLevel > 0) {
    alert('You are not allowed to create or edit user');
    return;
  }

  if (!userID || !userName || !nric || !sex || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    alert('Passwords do not match');
    return;
  }

  const cSex = sex === "MALE" ? "M" : "F";

  const payload = {
    companyID: EscapeStr(companyID),
    employeeNo: EscapeStr(userID),
    employeeName: EscapeStr(userName),
    nric,
    sex: cSex,
    password,
  };

  try {
    const res = await Axios.post(`${url}/api/userUpdate`, payload);

    if (res.data && res.data.message) {
      alert(res.data.message);
    }

    // Refresh list
    const result = await Axios.get(`${url}/api/userList`, {
      params: { companyID },
    });
    setData(result.data);

  } catch (err) {
    console.error("❌ Error saving user:", err.response?.data || err.message);
    alert("Error saving user profile.");
  }
};

const handleDelete = async (userID) => {
  if (userLevel > 0 || userLevel === null) {
    alert('you are not allowed to delete user');
    return;
  }
  if (!userID) {
    alert('Please select a user to delete');
    return;
  }
  if (!window.confirm("Are you sure you want to Delete this User?")) {
    return;
  }

  try {
    const res = await Axios.post(`${url}/api/userDelete`, {
      companyID: companyID,
      employeeNo: userID,
    });

    if (res.data.message === 'Success') {
      alert('User deleted successfully');
      const updatedData = data.filter(item => item.employeeNo !== userID);
      setData(updatedData);
    } else {
      alert('Failed to delete user');
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    alert("Error deleting user profile.");
  }
};


  const onhandleNew = (e) => {
       // alert(userLevel);
        if (userLevel > 0) {
             alert('you are not allow to create or Edit New User');
             return false;
        } 
            lEdit=false;
            lDisable= false;
            setUserID('');
            setUserName('');
            setPassword('');
            setConfirmPassword('');
            //setSex('');
            setNric('');

            inputReference.current.focus();    
       // window.location='/DepartmentNew'
       // }
    };   
const handleClick = (userID, userName, nric) =>{
     //  alert(desc);
       //  history.push("/DepartmentEdit");
      setUserID(userID);
      setUserName(userName);
      setNric(nric);
      lEdit = true;
      lDisable = true;
      inputRefUserName.current.focus();     
      }

    useEffect(() => {
      //  debugger;
        Axios
            .get(url+`/api/userList`,
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



 return (

    <div>
            <div className="row" style={{ 'margin': "10px" }}>
                <div className="col-sm-12 btn btn-success">
                    User Listing
                 </div>
            </div>
            <table class="table" >
                <thead class="thead-dark" >
                    <tr style={mystyle}>
                    <th style={{backgroundColor: 'yellow'}}> ID</th>
                    <th style={{backgroundColor: 'yellow'}}>User ID</th>
                    <th style={{backgroundColor: 'yellow'}}>User Name</th>
                    <th style={{backgroundColor: 'yellow'}}>User NRIC</th>
                    <th style={{backgroundColor: 'yellow'}}>Sex</th>              
                    
                    <button className= 'fa fa-plus' style={{ backgroundColor: 'blue', color: 'white', height: '30px', padding: '1px'}} onClick={() => onhandleNew()}>Add New User</button>
                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {data.map(item => {
                     return <tr key={item.Id}>
                        <td>{item.id}</td>
                        <td style={{backgroundColor: '#a6b5ff'}}>{item.employeeNo}</td>
                        <td>{item.employeeName}</td>
                        <td style={{backgroundColor: '#a6b5ff'}}>{item.nric}</td>
                        <td>{item.sex}</td> 

                        <a><button className="fa fa-edit" style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleClick(item.employeeNo, item.employeeName,item.nric,)}>Edit</button></a>
                         <a><button className="fa fa-trash" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(item.employeeNo)}>Del</button></a>
                        </tr>
                    })}
                </tbody>
            </table>

    <label style={{paddingLeft: '500px', paddingTop: '2px'}}><h2>Add and Modify User Profile</h2></label>          
 <div
  style={{
    display: "inline-block",
    width: "100%",
    maxWidth: "1600px",
    height: '200px',
    margin: "6px",
    backgroundColor: "white",
    border: "4px solid grey",
    padding: "20px",
  }}
>

  {/* Row 1: User ID + User Name */}
  <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
    <label style={{ paddingLeft: "20px" }}>User ID:
    <Tooltip title="Type new User ID with 3 characters" placement="top">
      <input
        type="text"
        ref={inputReference}
        maxLength={30}
        value={userID}
        required
        disabled={lDisable}
        onChange={(e) => setUserID(e.target.value)}
        style={{ width: "100px", marginRight: "5rem", textTransform: "uppercase" }}
      />
    </Tooltip>

    User Name:
    <Tooltip title="Type new or edit User Name (max 30 chars)" placement="top">
      <input
        type="text"
        maxLength={300}
        value={userName}
        required
        ref={inputRefUserName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ width: '500px'}}
      />
    </Tooltip>
    </label>
  </div>

  {/* Row 2: NRIC + Gender */}
  <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
    <label style={{ paddingLeft: '20px' }}>
    User NRIC :
    <Tooltip title="Enter User NRIC with max 12 characters" placement="top">
      <input
        type="text"
        maxLength={16}
        value={nric}
        name = 'user'
        required
        onChange={(e) => setNric(e.target.value)}
        style={{ width: "150px", marginRight: "5rem"}}
      />
    </Tooltip>
</label>
    <label style={{ paddingLeft: "100px" }}>Gender:</label>
    <label style={{ paddingLeft: "105px", color: "green" }}>
      <input
        type="radio"
        value="MALE"
        name="gender"
        checked={sex === "MALE"}
        onChange={(e) => setSex(e.targstyle={{ marginLeft: "1px" }}
      />
      Male
    </label>
    <label style={{ color: "red" }}>
      <input
        type="radio"
        value="FEMALE"
        name="gender"
        checked={sex === "FEMALE"}
        onChange={(e) => setSex(e.target.value)}
        style={{ paddingLeft: "110px" }}
      />
      Female
    </label>
  </div>

  {/* Row 3: Password + Confirm Password */}
  <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
    <label style={{ paddingLeft: '20px' }}>Password:
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{ width: "180px", marginRight: "20px" }}
    />

    Confirm Password:
    <input
      type="password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      style={{ width: "180px" }}
    />
    </label>
  </div>
</div>

{/* Save button */}
<button
  style={{ padding: "6px", marginLeft: "5rem", width: "300px" }}
  type="button"
  className="btn btn-danger fa fa-save"
  onClick={() => onSave()}
>
  Update New Or Edited User Profile
</button>

         

         
       <br></br><br></br>
      
 </div> 



 )

} //useProfile
export default UserProfile;