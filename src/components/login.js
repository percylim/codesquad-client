import React from 'react';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.companyIDEl = React.createRef();
    this.adminNameEl = React.createRef();
    this.passwordEl = React.createRef();
    this.state = { loading: false, errorMsg: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
  e.preventDefault();
  this.setState({ loading: true, errorMsg: '' });

  const url = process.env.REACT_APP_SERVER_URL;
  const admin = {
    companyID: this.companyIDEl.current.value,
    adminName: this.adminNameEl.current.value,
    password: this.passwordEl.current.value,
  };
  console.log("Fetching to:", `${url}/api/adminLogin`);
  console.log("Payload:", admin);

  fetch(`/api/adminLogin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(admin),
  })
    .then(async (response) => {
      // 204 No Content – treat as success without a body
      if (response.status === 204) {
        return null; // will be handled in next .then()
      }

      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || `Request failed with status ${response.status}`);
      }
      return text;
    })
    .then((companyName) => {
      // If we got null from the 204 branch, companyName is null
      if (companyName === null) {
        // Login succeeded with no content
        localStorage.clear();
        localStorage.setItem('companyID', admin.companyID);
        localStorage.setItem('companyName', ''); // or perhaps fetch from another endpoint?
        localStorage.setItem('userName', admin.adminName);
        localStorage.setItem('userLevel', '0');
        window.location = '/Sidebar';
        return;
      }

      // Normal flow with a response body
      if (companyName === 'fail!!!') {
        throw new Error('Login failed: invalid company ID, admin name, or password');
      }
      localStorage.clear();
      localStorage.setItem('companyID', admin.companyID);
      localStorage.setItem('companyName', companyName);
      localStorage.setItem('userName', admin.adminName);
      localStorage.setItem('userLevel', '0');
      window.location = '/Sidebar';
    })
    .catch((err) => {
      console.error('Login error:', err);
      this.setState({ errorMsg: err.message });
    })
    .finally(() => {
      this.setState({ loading: false });
    });
}
  

  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "green",
      padding: "10px 45px 10px 10px",
      fontFamily: "Arial",
    };
    const substyle = {
      color: "white",
      backgroundColor: "red",
      padding: "7px 20px 10px 20px",
      fontFamily: "Arial",
      width: '6em',
      height: '3em',
    };
    const regstyle = {
      color: "white",
      backgroundColor: "blue",
      padding: "10px 10px 10px 10px",
      fontFamily: "Arial",
    };

    return (
      <form style={mystyle} onSubmit={this.handleSubmit}>
        <fieldset disabled={this.state.loading}>
          <div><h1>Company Account Login</h1></div>

          {this.state.errorMsg && (
            <div style={{ color: 'red', backgroundColor: 'white', padding: '5px', marginBottom: '10px' }}>
              {this.state.errorMsg}
            </div>
          )}

          <label style={{ color: 'white', paddingLeft: '0px' }}>
            Company Register ID :
            <input type="text" style={{ marginLeft: "1.5rem" }} maxLength={50} ref={this.companyIDEl} required />
          </label>
          <label style={{ color: 'white', paddingLeft: '0px' }}>
            Company Admin Name :
            <input type="text" style={{ marginLeft: '.7rem' }} maxLength={50} ref={this.adminNameEl} required />
          </label>
          <label style={{ color: 'white', paddingLeft: '0px' }}>
            Admin Password :
            <input type="password" style={{ marginLeft: "77px" }} ref={this.passwordEl} required />
          </label>
        </fieldset>

        <p>
          <input type="submit" style={substyle} className="login" value={this.state.loading ? "Logging..." : "Submit"} disabled={this.state.loading} />
        </p>
        <a className="btn btn-light btn-lg" style={regstyle} href="/CompanyRegister" role="button">
          Company Account Register
        </a>
      </form>
    );
  }
}

export default Login;