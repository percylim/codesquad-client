import React from 'react';
//import CompanyRegister from './companyRegister';
// import {Redirect} from 'react-router-dom';
 //import  React, { useState } from 'react';
//import { DATE } from 'sequelize/types';
// import ReactDOM from 'react-dom';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import HelpPage from "./helpPage";

 import './login.css';
// import Button from 'react-bootstrap/Button';
const fetch = require('node-fetch');
//const history = useHistory();
// var [name, setName] = useState('');
// var lastSix = '';
// require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;

class userLogin extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the DOM element
      // this.state = { apiResponse: "Login" };
      this.state = {
        input: {},
        errors: {}
      };
      this.companyIDEl = React.createRef();
      this.employeeNoEl = React.createRef();
      this.passwordEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.refreshPage = this.refreshPage.bind(this);

    }



    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();


        //console.log(this.state);
        // alert(this.emailEl.current.value);

        const user= {
          companyID: this.companyIDEl.current.value,
          employeeNo: this.employeeNoEl.current.value,
          password: this.passwordEl.current.value,

        };

//alert(url+'/employeeLogin');
    //      alert(user.companyID+" == "+user.employeeNo );
          
  fetch(url + '/api/userLogin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user)
})
  .then(response => {
    if (!response.ok) {
      throw new Error("Login failed: " + response.statusText);
    }
    return response.json(); // ✅ parse JSON body
  })
  .then(data => {
    console.log("Login response:", data);

    if (!data || data.error) {
      alert('Login failed: invalid credentials');
      return;
    }

    // ✅ Save login info
    localStorage.clear();
    localStorage.setItem('companyID', user.companyID);
    localStorage.setItem('userName', data.employeeName);
    localStorage.setItem('userLevel', data.level);
    localStorage.setItem('userNo', data.employeeNo);

    // fetch company data
    return fetch(url + '/api/companyData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ companyID: user.companyID })
    });
  })
  .then(res => res.json())
  .then(companyData => {
    if (companyData && companyData.length > 0) {
      localStorage.setItem('companyName', companyData[0].companyName);
    }

    window.location = "/Sidebar";
  })
  .catch(err => {
    console.error("Login error:", err);
    alert("Login failed: " + err.message);
  });
}






    render() {
        const mystyle = {
            color: "black",
            backgroundColor: "#04ffac",
            padding: "10px 45px 10px 0px",
            fontFamily: "Arial",
            
        };

         const substyle = {
            color: "white",
            backgroundColor: "blue",
            padding: "10px 20px 10px 20px",
            fontFamily: "Arial",
            width: '6em',
            height: '3em',     
        };
   
  return (



        <form style={mystyle} onSubmit={this.handleSubmit}>

          <fieldset>

           <p><h1>User Login</h1></p>



          <label style={{color: 'black', paddingLeft: '0px'}}>
          Company Register ID :
          <input type="text" maxLength={50} ref={this.companyIDEl} style={{marginLeft: '1rem'}} name="companyname" required/>
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}>Employee No : 
          <input type="text" style={{marginLeft: "72px"}}
          maxLength={100} ref={this.employeeNoEl} name="employeeNo" required/>
          </label>
           <label style={{color: 'black', paddingLeft: '0px'}}> Password : 
           <input type="password" style={{marginLeft: "100px"}}
           name="password" ref={this.passwordEl} required />
           </label>
           </fieldset>

           <p>

           <input type="submit" style={substyle} className="login" name="Submit" value="Submit" />
          
            </p>



        </form>
      )
    }


  };


export default userLogin;
