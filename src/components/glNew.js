import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';
import EscapeStr from './mysqlConvertChar';

function GlNew() {
  // Refs for form inputs
  const glNoEl = useRef();
  const glSubEl = useRef();
  const glNameEl = useRef();
  const glDescriptionEl = useRef();

  // State for dropdowns
  const [department, setDepartment] = useState('');
  const [glType, setGlType] = useState('');
  const [typeData, setTypeData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const companyID = localStorage.getItem('companyID');

  // Validation function
  const validate = () => {
    const glNo = glNoEl.current?.value || '';
    const glSub = glSubEl.current?.value || '';
    const glName = glNameEl.current?.value || '';
    const glDesc = glDescriptionEl.current?.value || '';

    if (!glNo || glNo.length < 4) {
      alert('G/L No. must be at least 4 digits');
      return false;
    }
    if (glNo.includes(';')) {
      alert('G/L No. cannot contain semicolon (;)');
      return false;
    }
    if (!glSub || glSub.length < 3) {
      alert('G/L Sub must be at least 3 digits');
      return false;
    }
    if (glSub.includes(';')) {
      alert('G/L Sub cannot contain semicolon (;)');
      return false;
    }
    if (!glName) {
      alert('G/L Name is required');
      return false;
    }
    if (!department) {
      alert('Please select a Department');
      return false;
    }
    if (!glDesc) {
      alert('G/L Description is required');
      return false;
    }
    if (!glType) {
      alert('Please select a G/L Type');
      return false;
    }
    return true;
  };

  const clearForm = () => {
    if (glNoEl.current) glNoEl.current.value = '';
    if (glSubEl.current) glSubEl.current.value = '';
    if (glNameEl.current) glNameEl.current.value = '';
    if (glDescriptionEl.current) glDescriptionEl.current.value = '';
    setDepartment('');
    setGlType('');
  };

  const loadData = () => {
    // Option: refresh the GL list page or stay on same page
    // Redirect to listing page
    window.location.href = '/glList';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validate()) return;

      const user = {
        companyID: EscapeStr(companyID),
        glNo: EscapeStr(glNoEl.current.value.toUpperCase()),
        glSub: EscapeStr(glSubEl.current.value),
        department: department,
        glType: glType,
        glName: EscapeStr(glNameEl.current.value),
        glDescription: EscapeStr(glDescriptionEl.current.value),
      };

      const res = await Axios.post('/api/glNew', user);
      if (res.data === 'Success' || res.data?.message === 'Success') {
        alert('G/L Account Successfully Saved');
        clearForm();
        loadData();
      } else {
        alert('Save failed: ' + (res.data?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('Error saving data: ' + (error.response?.data || error.message));
    }
  };

  // Load department and GL type dropdowns
  useEffect(() => {
    Axios.get(`/api/departmentInfo`, { params: { companyID } })
      .then(res => {
        setDepartmentData(res.data);
        if (res.data.length > 0) setDepartment(res.data[0].department);
      })
      .catch(err => console.error('Error loading departments:', err));

    Axios.get(`/api/glTypeInfo`, { params: { companyID } })
      .then(res => {
        setTypeData(res.data);
        if (res.data.length > 0) setGlType(res.data[0].glType);
      })
      .catch(err => console.error('Error loading GL types:', err));
  }, [companyID]);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      <h1 style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>Add New General Ledger Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>G/L No. (4 digits)</label>
          <input ref={glNoEl} type="text" className="form-control" maxLength="4" required />
        </div>
        <div className="mb-3">
          <label>G/L Sub (3 digits)</label>
          <input ref={glSubEl} type="text" className="form-control" maxLength="3" required />
        </div>
        <div className="mb-3">
          <label>Department</label>
          <select className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} required>
            <option value="">Select Department</option>
            {departmentData.map(item => (
              <option key={item.department} value={item.department}>
                {item.department} - {item.description}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>G/L Type</label>
          <select className="form-control" value={glType} onChange={(e) => setGlType(e.target.value)} required>
            <option value="">Select GL Type</option>
            {typeData.map(item => (
              <option key={item.glType} value={item.glType}>
                {item.glType} - {item.glTypeName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>G/L Name</label>
          <input ref={glNameEl} type="text" className="form-control" required />
        </div>
        <div className="mb-3">
          <label>G/L Description</label>
          <input ref={glDescriptionEl} type="text" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={clearForm}>Clear</button>
        <button type ="button" className="btn btn-success ms-2" onClick={() => (window.location.href = '/glList')}>
          Back to List
        </button>
      </form>
    </div>
  );
}

export default GlNew;