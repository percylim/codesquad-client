import React from 'react';
import { Link } from 'react-router-dom'
import start from '../utils/start.png';
import {NavLink, BrowserRouter, Switch, Route } from "react-router-dom";
 import HelpCompanyRegister from './helpCompanyRegister';
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

class HelpPage extends React.Component {

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
		
             <h1> Help Page</h1>
             <h3 style={text}>Getting start</h3> 
			 <hr></hr>
		


			 <h4 style={{textAlign: 'left'}}>
			
			 <ul>
			 <li> Step 1: Register an Account with System include Company ID, Company Name, Admin Login ID and Password. <br/>
			              After register success System will create a database for the registered Company.</li>
			 <li> Step 2: After Register user will be able to login with admin ID and Password and allow to setup all account and profile, user password then to start the account.</li>
			 <li> Step 3: Admin will classified as 0 level a top level personnel be able
			 to add or remove user login account and to define module access permission.</li>
			 <li> Step 4: Create users login password and access permission</li>
			 </ul>
			 </h4>
			 <img src={start} width='1170' height='70' className="help-start" alt="logo" />	
	       
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>Getting Start :
		
	    
		 <NavLink to="/HelpCompanyRegister" style={{marginLeft: '5rem'}}>Admin Login and User Login</NavLink>
       
		     </h4> 

			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>Get Next Help Page :
		
	    
		 <NavLink to="/helpSetup" style={{marginLeft: '6rem'}}>System Setup</NavLink>
	      <ul>     
		 <NavLink to="/helpTransaction" style={{marginLeft: '20.3rem'}}>Transaction Help</NavLink>
	      </ul>
		  <ul>     
		 <NavLink to="/helpTxnReport" style={{marginLeft: '20.3rem'}}>Transaction Report Help</NavLink>
	      </ul>
	
	      <ul>    
		 <NavLink to="/helpPurchase" style={{marginLeft: '20.4rem'}}>Purchase Help</NavLink>
	      </ul>
	       <ul>      
		 <NavLink to="/helpSales" style={{marginLeft: '20.4rem'}}>Sales Help</NavLink>
		   </ul>
		   <ul>      
		 <NavLink to="/helpProduct" style={{marginLeft: '20.4rem'}}>Product Control Help</NavLink>
		   </ul>

		   <ul>      
		 <NavLink to="/helpGst" style={{marginLeft: '20.4rem'}}>GST Management Help</NavLink>
		   </ul>
		   <ul>      
		 <NavLink to="/HelpFinancialReport" style={{marginLeft: '20.4rem'}}>Financial Report Help</NavLink>
		   </ul>



		     </h4> 

			 <hr></hr>
			 </body>

	
			
 		
   
    
	
	 
    
    



  








  




	</div>		




		);
	}




}


export default HelpPage;
