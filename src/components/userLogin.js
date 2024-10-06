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
      this.employeeNameEl = React.createRef();
      this.passwordEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
      //this.refreshPage = this.refreshPage.bind(this);

    }



    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();


        console.log(this.state);
        // alert(this.emailEl.current.value);

        const user= {
          companyID: this.companyIDEl.current.value,
          employeeNo: this.employeeNameEl.current.value,
     //     employeeNo: '',
      //    level: 5,
          password: this.passwordEl.current.value,

        };

//alert(url+'/employeeLogin');

        fetch(url+'/employeeLogin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify( user )

          // We convert the React state to JSON and send it as the POST body
         // data: JSON.stringify(user,user.ame)
        }).then(response=>response.json())
        .then(data=>{

         //  alert(data);
         if( data.length !== 0) {
            // foo could get resolved and it's defined

         // alert(data[0].employeeName);
          localStorage.clear();
          localStorage.setItem('companyID', user.companyID);
          localStorage.setItem('companyName', data[0].companyName); // companyName
          localStorage.setItem('userName', data[0].employeeName);
          localStorage.setItem('userLevel', data[0].level);
          localStorage.setItem('userNo', data[0].employeeNo);
            //alert(data[0].employeeNo);
           window.location = "/Sidebar";
         } else {
              alert('login fail due to Company not register ot login employee No. or password is invalid');
         }
        });





      //   alert(lastSix);

         this.companyIDEl.current.value='';
         this.employeeNameEl.current.value='';
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

}






    render() {
        const mystyle = {
            color: "black",
            backgroundColor: "#04ffac",
            padding: "10px 45px 10px 10px",
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

     //   const regstyle = {
     //         color: "white",
     //        backgroundColor: "white",
     //     padding: "10px 10px 10px 10px",
     //     fontFamily: "Arial",

     //    };
      return (



        <form style={mystyle} onSubmit={this.handleSubmit}>

          <fieldset>

           <p><h1>Employee Login</h1></p>



          <label style={{color: 'black', paddingLeft: '0px'}}>
          Company Register ID :
          <input type="text" maxLength={50} ref={this.companyIDEl} style={{marginLeft: '1rem'}} name="companyname" required/>
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}>Employee No : 
          <input type="text" style={{marginLeft: "72px"}}
          maxLength={100} ref={this.employeeNameEl} name="employeeNo" required/>
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
