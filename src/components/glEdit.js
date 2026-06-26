import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Axios from 'axios';
import EscapeStr from './mysqlConvertChar';
import './UserProfile.css';

function GlEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get companyID from localStorage
  const companyID = localStorage.getItem('companyID');

  // Get GL No & Sub from localStorage (or from navigation state)
  const [glNo] = useState(localStorage.getItem('glNo') || '');
  const [glSub] = useState(localStorage.getItem('glSub') || '');

  // Form fields
  const glNameRef = useRef();
  const glDescriptionRef = useRef();

  // State for dropdown data and selected values
  const [departmentList, setDepartmentList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [glName, setGlName] = useState('');
  const [glDescription, setGlDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // Validation function
  const validate = () => {
    if (!glName.trim()) {
      alert('G/L Name must not be empty');
      return false;
    }
    if (!selectedDept) {
      alert('Please select a Department');
      return false;
    }
    if (!glDescription.trim()) {
      alert('G/L Description must not be empty');
      return false;
    }
    if (!selectedType) {
      alert('Please select a G/L Account Type');
      return false;
    }
    return true;
  };

  // Handle form submission (update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = {
      companyID: EscapeStr(companyID),
      glNo: EscapeStr(glNo),
      glSub: EscapeStr(glSub),
      department: selectedDept,
      glType: selectedType,
      glName: EscapeStr(glName),
      glDescription: EscapeStr(glDescription),
    };

    try {
      const res = await Axios.post('/api/glUpdate', user);
      if (res.data === 'Success' || res.data?.message === 'Success') {
        alert('G/L Account successfully updated');
        localStorage.removeItem('glNo');
        localStorage.removeItem('glSub');
        navigate('/glList');
      } else {
        alert('Update failed: ' + (res.data?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('Error updating data: ' + (error.response?.data || error.message));
    }
  };

  // Load existing GL data, departments, and GL types
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch GL data
        const glRes = await Axios.get('/api/glData', {
          params: { companyID, glNo, glSub }
        });
        if (glRes.data && glRes.data.length > 0) {
          const gl = glRes.data[0];
          setGlName(gl.glName || '');
          setGlDescription(gl.glDescription || '');
          setSelectedDept(gl.department || '');
          setSelectedType(gl.glType || '');
        } else {
          alert('GL Account not found');
          navigate('/glList');
          return;
        }

        // 2. Fetch departments
        const deptRes = await Axios.get('/api/departmentInfo', {
          params: { companyID }
        });
        if (deptRes.data && deptRes.data.length > 0) {
          setDepartmentList(deptRes.data);
        }

        // 3. Fetch GL types
        const typeRes = await Axios.get('/api/glTypeInfo', {
          params: { companyID }
        });
        if (typeRes.data && typeRes.data.length > 0) {
          setTypeList(typeRes.data);
        }
      } catch (error) {
        console.error(error);
        alert('Failed to load data');
        navigate('/glList');
      } finally {
        setLoading(false);
      }
    };

    if (companyID && glNo && glSub) {
      fetchData();
    } else {
      alert('Missing GL information');
      navigate('/glList');
    }
  }, [companyID, glNo, glSub, navigate]);

  // Back button handler
  const handleBack = () => {
    navigate('/glList');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} style={{ marginLeft: '300px' }}>
      <fieldset>
        <h1 style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
          Edit General Ledger Profile
        </h1>

        <div>
          <label>G/L No. :</label>
          <input
            type="text"
            className="text-uppercase"
            value={glNo}
            readOnly
            required
          />
        </div>

        <div>
          <label>G/L Sub No. :</label>
          <input
            type="text"
            className="text-uppercase"
            value={glSub}
            readOnly
            required
          />
        </div>

        <div>
          <label>G/L Name :</label>
          <Tooltip title="Type new general ledger name if require to make change" placement="top">
            <input
              type="text"
              maxLength={50}
              value={glName}
              onChange={(e) => setGlName(e.target.value)}
              ref={glNameRef}
              required
            />
          </Tooltip>
        </div>

        <div>
          <label>G/L Description :</label>
          <Tooltip title="Type new general ledger description if require to make change" placement="top">
            <input
              type="text"
              maxLength={50}
              value={glDescription}
              onChange={(e) => setGlDescription(e.target.value)}
              ref={glDescriptionRef}
              required
            />
          </Tooltip>
        </div>

        <div className="select-container">
          <label style={{ paddingRight: '260px' }}>
            G/L Account Type :
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} required>
              <option value="">-- Select G/L Type --</option>
              {typeList.map((item) => (
                <option key={item.glType} value={item.glType}>
                  {item.glType} {item.glTypeName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="select-container">
          <label style={{ paddingRight: '200px' }}>
            Department :
            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} required>
              <option value="">-- Select Department --</option>
              {departmentList.map((item) => (
                <option key={item.department} value={item.department}>
                  {item.department} {item.description}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      <p></p>

      <Tooltip title="Click to update all changes" placement="top">
        <button
          type="submit"
          className="btn-submit"
          style={{
            marginRight: '8em',
            backgroundColor: 'red',
            color: 'white',
            padding: '12px 15px',
            border: '2px solid #070b11ff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          <i className="fa fa-save" style={{ marginRight: '8px', color: 'white' }}></i>
          Update
        </button>
      </Tooltip>

      <Tooltip title="Click to return back to General Ledger Listing page" placement="top">
        <button
          type="button"
          style={{
            color: 'white',
            backgroundColor: 'blue',
            padding: '10px 15px 10px 10px',
            fontFamily: 'Arial',
          }}
          onClick={handleBack}
        >
          <i className="fa-solid fa-backward" style={{ marginRight: '8px', color: 'white' }}></i>
          Back
        </button>
      </Tooltip>
    </form>
  );
}

export default GlEdit;