import React from 'react';
import { Link } from 'react-router-dom'
import FinancialMenu from '../utils/FinancialMenu.png';
import trialBalance from '../utils/trialBalance.png'; 
import trialBalance1 from '../utils/trialBalance1.png';
import profitAndLoss from '../utils/profitAndLoss.png';
import profitAndLoss1 from '../utils/profitAndLoss1.png';
import balanceSheet from '../utils/balanceSheet.png';
import balanceSheet1 from '../utils/balanceSheet1.png';
import trialBalanceReport from '../utils/trialBalanceReport.png'; 
import profitAndLossReport from '../utils/profitAndLossReport.png';
import balanceSheetReport from '../utils/balanceSheetReport.png';
import {NavLink, BrowserRouter, Switch, Route } from "react-router-dom";

//import Report from '../utils/gstPeriodReport.png';
//import renderHTML from 'react-render-html';
//import ReactDOM from 'react-dom/client';

//const container = document.getElementById('root');
//const root = ReactDOM.createRoot(container);

//const companyID = localStorage.getItem('companyID');
//require('dotenv').config();//
// const url = process.env.REACT_APP_SERVER_URL;
// var help1 = '';
//const name = localStorage.getItem('name');

class HelpFinancialReport extends React.Component {

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
		
             <h1> Financial Report</h1>
             
             <img src={FinancialMenu} width='550' height='170' className="help-main" alt="logo" />	
             <span class="square border border-dark"></span>		   
			 <h4 style={{textAlign: 'left'}}>
             <div className= 'help-main' style={{marginLeft: '0rem'}}>	
        	 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Trial Balance :</p>
			 <img src={trialBalance} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
              <ul>    
             <img src={trialBalance1} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '28rem'}}/>	
              </ul>
             <ul>  
             <li style={{color: 'blue', marginLeft: '2rem'}}>Press Report From Date and To Date, press Generate Trial Balance button, Trail Balance will be generated and display below. Pree clear button to clear current information, press Print to print Report in PDF format, press Home button to return to Main Menu. Press Save Yearly Report will save the information and can be reloaded at Previous Year Financial Report dropdown menu.</li>
			 
			  </ul>
		      </div>
              </h4>
             <ul>
			 <span class="square border border-dark"></span>		
		      <p></p>
             </ul>
             <h4 style={{textAlign: 'left'}}>
             <div className= 'help-main' style={{marginLeft: '0rem'}}>	
        	 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Profit And Loss :</p>
			 <img src={profitAndLoss} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
             <ul>  
             <img src={profitAndLoss1} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '28rem'}}/>	  
             </ul>
             <span class="square border border-dark"></span>		
              <p></p>
             <ul>  
             <li style={{color: 'blue', marginLeft: '2rem'}}>Press Report From Date and To Date, press Generate Profit And Loss button, Profit And Loss will be generated and display below. Press clear button to clear current information, press Print to print Report in PDF format, press Home button to return to Main Menu. Press Save Yearly Report will save the information and can be reloaded at Previous Year Financial Report dropdown menu. The most import this will also save the current year Gross Profit and carry forward to Balance Sheet. At the LESS TAX FOR THE YEAR section click the download button and system will generate the tax according to Income Tax table.</li>
			 </ul>
		      </div>
		
               </h4>
         
		      <p></p>
          
              <span class="square border border-dark"></span>		
		      <p></p>

              <h4 style={{textAlign: 'left'}}>
             <div className= 'help-main' style={{marginLeft: '0rem'}}>	
        	 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Balance Sheet :</p>
			 <img src={balanceSheet} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
             <ul>  
             <img src={balanceSheet1} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '28rem'}}/>	  
             </ul>
             <span class="square border border-dark"></span>		
              <p></p>
             <ul>  
             <li style={{color: 'blue', marginLeft: '2rem'}}>Press Report From Date and To Date, press Generate Balance Sheet button, Balance Sheet will be generated and display below. Press clear button to clear current information, press Print to print Report in PDF format, press Home button to return to Main Menu. Press Save Yearly Report will save the information and can be reloaded at Previous Year Financial Report dropdown menu. </li>
			 </ul>
			
		      </div>
		
               </h4>
         
		      <p></p>
          
			  <span class="square border border-dark"></span>		
		      <p></p>

              <h4 style={{textAlign: 'left'}}>
             <div className= 'help-main' style={{marginLeft: '0rem'}}>	
        	 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Balance Sheet :</p>
			 <img src={trialBalanceReport} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '3rem'}}/>	
              
             <img src={profitAndLossReport} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '3rem'}}/>	  
			 <img src={balanceSheetReport} width='300' height='170' className="help-img" alt="logo" style={{marginLeft: '3rem'}}/>	  
              <p></p>
	         <span class="square border border-dark"></span>		
              <p></p>
             <ul>  
             <li style={{color: 'blue', marginLeft: '2rem'}}>For all previous year Trial Balance, Profit And Loss and Balance Sheet, key in a valid year and press Generate button, if year valid, system will download the report for viewing. Press Clear button to clear all information, press Print button will print report in PDF format and press Home button will return to Main Menu. </li>
			 </ul>
			
		      </div>
		
               </h4>
         
		      <p></p>




			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>
		
	    
		 <NavLink to="/helpGst" style={{marginLeft: '5rem', color: 'black'}}>Back</NavLink>
         <NavLink to="/home" style={{marginLeft: '5rem', color: 'green'}}>Home</NavLink> 
		     </h4> 



			 <hr></hr>
			 </body>

	
			
 		
   
    
	
	 
    
    



  








  




	</div>		




		);
	}




}


export default HelpFinancialReport;

