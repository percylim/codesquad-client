import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // if using React Router v6
import './login.css';

const UserLogin = () => {
  const companyIDRef = useRef();
  const employeeNoRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const user = {
      companyID: companyIDRef.current.value.trim(),
      employeeNo: employeeNoRef.current.value.trim(),
      password: passwordRef.current.value,
    };

    try {
      const loginRes = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/userLogin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include', // if using cookies
      });
      if (!loginRes.ok) throw new Error('Login failed');
      const loginData = await loginRes.json();
      if (!loginData || loginData.error) throw new Error(loginData.error || 'Invalid credentials');

      // Store only non‑sensitive data (session ID should be in cookie)
      localStorage.setItem('companyID', user.companyID);
      localStorage.setItem('userName', loginData.employeeName);

      // Fetch company data only if needed (consider returning it in login response)
      const companyRes = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/companyData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyID: user.companyID }),
        credentials: 'include',
      });
      if (companyRes.ok) {
        const companyData = await companyRes.json();
        if (Array.isArray(companyData) && companyData.length > 0) {
          localStorage.setItem('companyName', companyData[0].companyName);
        } else {
          console.warn('Company data not found');
        }
      } else {
        console.warn('Failed to fetch company data');
      }

      navigate('/Sidebar'); // full page reload avoided
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={loading}>
        <h1>User Login</h1>
        {errorMsg && <div className="error-message">{errorMsg}</div>}

        <label>
          Company ID:
          <input ref={companyIDRef} required />
        </label>

        <label>
          Employee No:
          <input ref={employeeNoRef} required />
        </label>

        <label>
          Password:
          <input type="password" ref={passwordRef} required />
        </label>

        <input type="submit" value={loading ? 'Logging in...' : 'Submit'} />
      </fieldset>
    </form>
  );
};

export default UserLogin;