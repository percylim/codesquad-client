import React from 'react';
import { Link } from 'react-router-dom'
import gstMenu from '../utils/gstMenu.png';
import gstList from '../utils/gstList.png'; 
import gstNew from '../utils/gstNew.png';
import gstEdit from '../utils/gstEdit.png';
import {NavLink, BrowserRouter, Switch, Route } from "react-router-dom";

import gstPeriodReport from '../utils/gstPeriodReport.png';
//import renderHTML from 'react-render-html';
//import ReactDOM from 'react-dom/client';

//const container = document.getElementById('root');
//const root = ReactDOM.createRoot(container);

//const companyID = localStorage.getItem('companyID');
//require('dotenv').config();//
// const url = process.env.REACT_APP_SERVER_URL;
// var help1 = '';
//const name = localStorage.getItem('name');

class HelpGst extends React.Component {

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
		
             <h1> GST Management</h1>
             
             <img src={gstMenu} width='550' height='170' className="help-main" alt="logo" />	
             <span class="square border border-dark"></span>		   
			 <h4 style={{textAlign: 'left'}}>
             <div className= 'help-main' style={{marginLeft: '0rem'}}>	
        	 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Add / Edit / Delete GST :</p>
			 <img src={gstList} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
             <img src={gstNew} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '3rem'}}/>	
             <img src={gstEdit} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '3rem'}}/>	 
             <ul>  
             <li style={{color: 'blue', marginLeft: '2rem'}}>To add new tax click New Tax button on the top right conner of the Goods And Service Tax Listing table, Goods And Service Tax Profile Maintenance will display for further entry, key in all required information and press Add New button to save the new GST information. Press Clear button will clear all information, pres Back button will return to the Listing table.</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>Highlight and select GST item in the table and click Delete button will remove ths selected GST record. Click Edit button, Edit Goods ANd Service Tax (GST) Profile Maintenance will display for editing. Just edit the required fields and press Update button to save change.</li>
			  </ul>
		      </div>
              </h4>
             <ul>
			 <span class="square border border-dark"></span>		
		      <p></p>
             </ul>
             <h4 style={{textAlign: 'left'}}>
             <div className= 'help-main' style={{marginLeft: '0rem'}}>	
        	 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>GST Input Tax And Output Tax Periodical Report :</p>
			 <img src={gstPeriodReport} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
             <span class="square border border-dark"></span>		
              <p></p>
             <ul>  
             <li style={{color: 'blue', marginLeft: '2rem'}}>Key in Date From and Date To, press Load GST Report button. If record match information will display in the table under. Press Print button to print report in PDF format, press Clear button will clear all information. </li>
			 </ul>
		      </div>
		
               </h4>
         
		      <p></p>
          
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>
		
	    
		 <NavLink to="/helpProduct" style={{marginLeft: '5rem', color: 'black'}}>Back</NavLink>
		 <NavLink to="/HelpFinancialReport" style={{color: 'red', marginLeft: '10rem'}}>Next</NavLink>   
		     </h4> 



			 <hr></hr>
			 </body>

	
			
 		
   
    
	
	 
    
    



  








  




	</div>		




		);
	}




}


export default HelpGst;

