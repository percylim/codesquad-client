import React from 'react';
import { Link } from 'react-router-dom'
import mainMenu from '../utils/mainMenu.png';
import user from '../utils/user.png'; 
//import admin from '../utils/adminLogin.png';
//import register from '../utils/companyRegister.png';
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

class HelpMain extends React.Component {

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
		
             <h1> Main System</h1>
             
             <img src={mainMenu} width='550' height='170' className="help-main" alt="logo" />	
            
			 <h4 style={{textAlign: 'left'}}>
			 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Add / Edit / Delete User :</p>
			 <img src={user} width='500' height='170' className="help-user" alt="logo" style={{marginLeft: '30rem'}}/>	
	         <p style={{color: 'black', marginLeft: '10rem'}}>NOTE : To create a new user or edit the existing user, require to login as admin or higher level of user.</p>
			 <li style={{color: 'black', marginLeft: '16.5rem'}}>Only Admin or upper level user can add, edit or delete lower level user. Admin is 0 level and following down level 1 - 5.</li>
			 <li style={{color: 'black', marginLeft: '16.5rem'}}>The add new user press New User button, press Save button to save all new or edited information</li>
             <li style={{color: 'black', marginLeft: '16.5rem'}}>To edit or delete existing user, key in User ID and press Download Button next to User ID input field, when all information downloaded then process editing or deleting.</li>
		     <ul>
			 <span class="square border border-dark"></span>		
			 <a>At the main Setup dropdown menu contents all profile setup and maintenance.</a>
			 <a>At the last item of Main dropdown menu content Utility sub-menu and user can be created, edited and deleted. Logout sub-menu item will logout from the System and required to login again in order to start using the system.</a>
             </ul>
             <ul>    
             <p style={{color: 'red', paddingLeft: '10px'}}>Setup dropdown menu :</p>
             <p style={{marginLeft: '27rem', color: 'blue'}}>Company Profile.</p>
             <p style={{marginLeft: '27rem', color: 'blue'}}>General Ledger Listing/Add/Edit.</p>	
             <p style={{marginLeft: '27rem', color: 'blue'}}>Department Listing/Add/Edit.</p>	
             <p style={{marginLeft: '27rem', color: 'blue'}}>Supplier/Customer Profile Listing/Add/Edit.</p>	
             <p style={{marginLeft: '27rem', color: 'blue'}}>Bank Account Listing/Add/Edit.</p>	
             <p style={{marginLeft: '27rem', color: 'blue'}}>Income Tax Rate.</p>	
             <p style={{marginLeft: '27rem', color: 'blue'}}>Image Upload.</p>	
        	 </ul>
			 </h4>
			
		

         
		      <p></p>
          
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>
		
	    
		 <NavLink to="/helpCompanyRegister" style={{marginLeft: '5rem', color: 'black'}}>Back</NavLink>
		 <NavLink to="/helpSetup" style={{color: 'red', marginLeft: '10rem'}}>Next</NavLink>   
		     </h4> 



			 <hr></hr>
			 </body>

	
			
 		
   
    
	
	 
    
    



  








  




	</div>		




		);
	}




}


export default HelpMain;

