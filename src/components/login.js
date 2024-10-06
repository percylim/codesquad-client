import React from 'react';
//import CompanyRegister from './companyRegister';
// import {Redirect} from 'react-router-dom';
 //import  React, { useState } from 'react';
//import { DATE } from 'sequelize/types';
// import ReactDOM from 'react-dom';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import HelpPage from "./helpPage";
// import Axios from 'axios';
 import './login.css';
 // import alert from 'alert';
// import Button from 'react-bootstrap/Button';
const fetch = require('node-fetch');
//const history = useHistory();
// var [name, setName] = useState('');
// var lastSix = '';
//require('dotenv').config();//
//import 'dotenv/config';
const url = process.env.REACT_APP_SERVER_URL;

class Login extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the DOM element
      // this.state = { apiResponse: "Login" };
      this.state = {
        input: {},
        errors: {}
      };
      this.companyIDEl = React.createRef();
      this.adminNameEl = React.createRef();
      this.passwordEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.refreshPage = this.refreshPage.bind(this);

    }



    handleSubmit(e) {
    //  alert(url);
      e.preventDefault();


        console.log(this.state);
        // alert(this.emailEl.current.value);

        const admin= {
          companyID: this.companyIDEl.current.value,
          adminName: this.adminNameEl.current.value,
          password: this.passwordEl.current.value,

        };
// alert(url+admin.companyID);
//fetch(url+'/api/connection')
//  .then(response => response.json())
//  .then(data => alert(data.message))
//  .catch(error => alert(error));



    //    fetch(url+'/adminLogin', {
  //        method: 'GET',
  //        headers: {
  //          'Content-Type': 'application/json',
  //          'Access-Control-Allow-Method': '*',
  //      },
    //       body: JSON.stringify( admin )

  

    fetch(url+'/adminLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Method': '*',
    },
       body: JSON.stringify( admin )

      // We convert the React state to JSON and send it as the POST body
     // data: JSON.stringify(user,user.ame)
    }).then(function(response) {
    //  alert(response.text);
       return response.text()
    }).then(function(text) {
     // alert(text);

      if (text === 'fail!!!') {
       alert("Login Failed do to company not register or login admin ID and password invalid");
      // window.location="/login";
      } else {
      localStorage.clear();
      localStorage.setItem('companyID', admin.companyID);
      localStorage.setItem('companyName', text); // companyName
      localStorage.setItem('userName', admin.adminName);
      localStorage.setItem('userLevel', 0);
        alert(text);

       window.location = "/Sidebar";

      };


          })
          .catch(error => {
           console.error(error);
           alert(error);
          })
      
      //   alert(lastSix);

         this.companyIDEl.current.value='';
         this.adminNameEl.current.value='';
         this.passwordEl.current.value='';
       //  this.props.history.push('/login');
         //localStorage.clear();
         //alert(lastSix);
       //    if (lastSix === 'Success') {
         //   localStorage.clear();
       //     localStorage.setItem('name', user.userName);
          //  alert('Name');
              //    setName(this.nameEl.current.value)
              //    handle()
             // localStorage.clear();
              //localStorage.setItem('name', user.userName);
              // const cat = localStorage.getItem('name'); // this will read the storage value
                // localStorage.clear(); // c;ear storage value
             //   alert(localStorage.getItem('name'));
              //  this.props.history.push('/about');

         //  }

           //this.refreshPage();
           //alert(localStorage.getItem('Name'));


         // this.props.history.push('Login');
         // window.location.reload(false);

};






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

          <fieldset>

           <p><h1>Company Account Login</h1></p>



          <label style={{color: 'white', paddingLeft: '0px'}}>
          Company Register ID :
          <input type="text" style={{marginLeft: "1.5rem"}} maxLength={50} ref={this.companyIDEl} name="companyname" required/>
          </label>
          <label style={{color: 'white', paddingLeft: '0px'}}>Company Admin Name :
          <input type="text" style={{marginLeft: '.7rem'}} maxLength={50} ref={this.adminNameEl} name="adminname" required/>
          </label>
           <label style={{color: 'white', paddingLeft: '0px'}}> Admin Password :
           <input type="password" style={{marginLeft: "77px"}} name="password" ref={this.passwordEl} required />
           </label>
           </fieldset>

           <p>

           <input type="submit" style={substyle} className="login" name="Submit" value="Submit" />
            </p>
           <a class="btn btn-light btn-lg" style={regstyle} href="/CompanyRegister" role="button">Company Account Register</a>

        </form>
      )
    }


  };


export default Login;
