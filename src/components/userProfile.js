import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import EscapeStr from './mysqlConvertChar';
import Tooltip from "@material-ui/core/Tooltip";
import './UserProfile.css';

const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userLevel = localStorage.getItem('userLevel');

function UserProfile() {
  const [data, setData] = useState([]);
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sex, setSex] = useState('');
  const [nric, setNric] = useState('');
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [lEdit, setLEdit] = useState(false);
  const [lDisable, setLDisable] = useState(false);

  const inputReference = useRef(null);
  const inputRefUserName = useRef(null);

  const mystyle = {
    textAlign: "left",
    borderColor: '#000',
    paddingLeft: '20px'
  };

  useEffect(() => {
    Axios.get(`${url}/api/userList`, { params: { companyID } })
      .then(result => setData(result.data))
      .catch(err => console.error(err));
  }, []);

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
      if (res.data?.message) alert(res.data.message);

      const result = await Axios.get(`${url}/api/userList`, { params: { companyID } });
      setData(result.data);
    } catch (err) {
      console.error("❌ Error saving user:", err.response?.data || err.message);
      alert("Error saving user profile.");
    }
  };

  const handleDelete = async (userID) => {
    if (userLevel > 0 || userLevel === null) {
      alert('You are not allowed to delete user');
      return;
    }
    if (!userID) {
      alert('Please select a user to delete');
      return;
    }
    if (!window.confirm("Are you sure you want to Delete this User?")) return;

    try {
      const res = await Axios.post(`${url}/api/userDelete`, {
        companyID,
        employeeNo: userID,
      });

      if (res.data.message === 'Success') {
        alert('User deleted successfully');
        setData(data.filter(item => item.employeeNo !== userID));
      } else {
        alert('Failed to delete user');
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Error deleting user profile.");
    }
  };

  const handleNew = () => {
    if (userLevel > 0) {
      alert('You are not allowed to create or edit new user');
      return;
    }

    setLEdit(false);
    setLDisable(false);
    setUserID('');
    setUserName('');
    setPassword('');
    setConfirmPassword('');
    setNric('');
    setSex('');
    inputReference.current?.focus();
  };

  const handleClick = (userID, userName, nric, sex) => {
    setUserID(userID);
    setUserName(userName);
    setNric(nric);
    setSex(sex === 'M' ? 'MALE' : 'FEMALE');
    setLEdit(true);
    setLDisable(true);
    inputRefUserName.current?.focus();
  };

  return (
    <div>
      <div className="row" style={{ margin: "10px" }}>
        <div className="col-sm-12 btn btn-success">User Listing</div>
      </div>

      <button
        className='fa fa-plus btn btn-primary'
        style={{ marginBottom: '10px' }}
        onClick={handleNew}
      >
        Add New User
      </button>

      <table className="table">
        <thead className="thead-dark" style={mystyle}>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>User NRIC</th>
            <th>Sex</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={mystyle}>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td style={{ backgroundColor: '#a6b5ff' }}>{item.employeeNo}</td>
              <td>{item.employeeName}</td>
              <td style={{ backgroundColor: '#a6b5ff' }}>{item.nric}</td>
              <td>{item.sex}</td>
              <td>
                <button
                  className="fa fa-edit btn btn-success"
                  onClick={() => handleClick(item.employeeNo, item.employeeName, item.nric, item.sex)}
                >
                  Edit
                </button>
                <button
                  className="fa fa-trash btn btn-danger"
                  onClick={() => handleDelete(item.employeeNo)}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ paddingLeft: '20px' }}>Add and Edit User Profile</h2>

      <div style={{
        display: "inline-block",
        width: "100%",
        maxWidth: "1600px",
        margin: "1px",
        backgroundColor: "white",
        border: "4px solid grey",
        padding: "20px",
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', marginRight: '10px' }}>
          <label style={{ paddingLeft: '20px', marginRight: '1px' }}>User ID:</label>
          <input type="text" value={userID} onChange={e => setUserID(e.target.value)} ref={inputReference} style={{ width: '100px' }} />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', marginRight: '10px' }}>
          <label style={{ marginRight: '1px' }}>User Name:</label>
          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} ref={inputRefUserName} style={{ width: '250px' }} />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', marginRight: '10px' }}>
          <label style={{ marginRight: '1px' }}>NRIC:</label>
          <input type="text" value={nric} onChange={e => setNric(e.target.value)} style={{ width: '120px' }} />
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', marginRight: '10px' }}>
          <label style={{ marginRight: '1px' }}>Gender:</label>
          <label style={{ marginRight: '5px' }}>
            <input type="radio" value="MALE" checked={sex === 'MALE'} onChange={e => setSex(e.target.value)} />
            Male
          </label>
          <label>
            <input type="radio" value="FEMALE" checked={sex === 'FEMALE'} onChange={e => setSex(e.target.value)} />
            Female
          </label>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', marginTop: '10px' }}>
          <label style={{ marginRight: '1px' }}>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '120px', marginRight: '10px' }} />
          <label style={{ marginRight: '1px' }}>Confirm:</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ width: '120px' }} />
        </div>
      </div>

      <button
        style={{ padding: "6px", marginLeft: "5rem", width: "300px" }}
        className="btn btn-danger fa fa-save"
        onClick={onSave}
      >
        Update New Or Edited User Profile
      </button>
    </div>
  );
}

export default UserProfile;
