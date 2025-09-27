import React from 'react';
import { Link } from 'react-router-dom'
import user from '../utils/userLogin.png';
import admin from '../utils/adminLogin.png';
import register from '../utils/companyRegister.png';
import {NavLink, BrowserRouter, Switch, Route } from "react-router-dom";

//import home from './home';
//import renderHTML from 'react-render-html';
//import ReactDOM from 'react-dom/client';

//const container = document.getElementById('root');
//const root = ReactDOM.createRoot(container);

//const companyID = localStorage.getItem('companyID');
//require('dotenv').config();//
// const url = process.env.REACT_APP_SERVER_URL;
// var help1 = '';
//const name = localStorage.getItem('name');

class HelpCompanyRegister extends React.Component {

	constructor(props){
		super(props);

		this.state = {val: "awesome"};
	}


	changeValue = () => {
		this.setState(
			{val: "wonderful"}
			);
		}
		
	render(){
       // window.location='HelpCompanyRegister';
		const body = {
		padding: "0px 200px 100px 0px",
	   	  height: '500vx',
			width: '500vx',
		justifyContent: 'bottom',
		};
		const text = {
         color: 'red',
		 
		};
		


		return(
			<div>
	
			<body style={body}>	 
		
             <h1> Company Register / Admin Login / User Login</h1>
             
		


			 <h4 style={{textAlign: 'left'}}>
			
			 <ul style={{width: '1700px'}}>
			 <a>If Company already registered, please process to Company Account / Admin Login to access to the system.</a>
			 <a>After successful Login In to system, new user can be added.</a>
             <a>To register the Company, please enter all necessary information and press submit button to save the information. If company already register, press Company Account Login button to process login.  </a>
             <a>When in Company Account / Admin Login page. If Company not being register, press Company Account Register button to process the registration. Once Login verifying successful system will redirect to startup the system.
		      User can be login after added by Admin.</a>
			 </ul>
			 </h4>
			
			  <img src={register} width='500' height='170' className="help-start" alt="logo" />	

             <ul>
			 <img src={admin} width='500' height='70' className="help-start" alt="logo" />	
			 <img src={user} width='500' height='70' className="help-start" alt="logo" />	
              </ul>
		      <p></p>
          
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>
		
	    
		 <NavLink to="/HelpMain" style={{marginLeft: '5rem'}}>Continue Next</NavLink>
       
		     </h4> 
			
			 <hr></hr>
			 </body>

	
			
 		
   
    
	
	 
    
    



  








  




	</div>		




		);
	}




}


export default HelpCompanyRegister;

