import React from 'react';
import { Link } from 'react-router-dom'
import reportMenu from '../utils/reportMenu.png';
import journalReport from '../utils/journalReport.png';
import editJournal from '../utils/editJournal.png'; 
import glTxnReport from '../utils/glTxnReport.png';
import suppCustTxnReport  from '../utils/suppCustTxnReport.png';
import bankTxnReport  from '../utils/bankTxnReport.png';
import bankReconReport  from '../utils/bankReconReport.png';
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

class HelpTxnReport extends React.Component {

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
		
             <h1> Transaction Report Menu</h1>
             
             <img src={reportMenu} width='550' height='170' className="help-main" alt="logo" />	
            
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '5rem'}}>
			 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Journal Transaction Report :</p>
			 <img src={journalReport} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
	         <li style={{color: 'blue', marginLeft: '2rem'}}>Select Starting and Ending Date  and click Search button on the right side to load and print report.</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>Journal Voucher Report can be printed as PDF format by press Print Voucher button or export as CSV format by pressing Export To Excel (CSV) format.</li>
			 <ul>
				<p></p>
			 <span class="square border border-dark"></span>		
		      <p></p>
			 <a style={{color: 'red', textAlign: 'left'}}>Journal Editing Report :</a>
			 <img src={editJournal} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	 
	         </ul>
			 </div>
             <ul>    
			 
             <li style={{marginLeft: '2rem', color: 'blue'}}>Select Starting and Ending Date and press Search button on the right side to load Information.</li>
             <li style={{marginLeft: '2rem', color: 'blue'}}>Press Export To Excel (CSV) to print report in CSV format.</li>	
              </ul>
			 
			 </h4>
			 <span class="square border border-dark"></span>		
			 <ul> 
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>General Ledger Account Transaction Report :</a>      
			 <img src={glTxnReport} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
		      <p></p>
	             
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select G/l Account and G/: Account No.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Starting and Ending Date and press Search button on the right side.</li>	
		<li style={{marginLeft: '2rem', color: 'blue'}}>To print G/L Account Transaction report in CSV format just press Export To Excel (CSV) link.</li>	
		
		
		</div>	
		 </h4>
		</ul>


	
			 <span class="square border border-dark"></span>		
			 <ul> 
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Supplier / Customer Transaction Account Report :</a>      
			 <img src={suppCustTxnReport} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
		      <p></p>
	             
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Supplier or Customer radio button then select Supplier or Customer.</li>		
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Starting and Ending Date and click Search button.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>To print Report in CSV format just click Export To Excel (CSV) link.</li>

		</div>	
		 </h4>
		</ul>

		<span class="square border border-dark"></span>		
			 <ul> 
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Bank Transaction Report :</a>      
			 <img src={bankTxnReport} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
		      <p></p>
	             
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Bank Account.</li>		
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select G/L Transaction Starting and Ending Date and click Search button.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>To print Report in CSV format just click Export To Excel (CSV) link.</li>

		</div>	
		 </h4>
		</ul>

		<span class="square border border-dark"></span>		
			 <ul> 
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Bank Reconciliation Report :</a>      
			 <img src={bankReconReport} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
		      <p></p>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Starting and Ending Date and click Download button.</li>	
		<li style={{marginLeft: '2rem', color: 'blue'}}>At right side next to download button. Print button will print Report in PDF format and Delete button will delete current selected date summary, Home button will return to main menu.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>After Bank Reconciliation Summary load, select the Transaction Date from the Summary table and click Select button to load Bank Statement And Bank General Ledger Listing detail. .</li>		
		</div>	
		 </h4>
		</ul>




		 <p></p>
         <p></p> 
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>
		
	    
		 <NavLink to="/helpTransaction" style={{marginLeft: '5rem', color: 'black'}}>Back</NavLink>
		 <NavLink to="/helpPurchase" style={{marginLeft: '5rem', color: 'red'}}>Next</NavLink>
		     </h4> 
			
			 <hr></hr>
			 </body>

	
			
 		
   
    
	
	 
    
    



  








  




	</div>		




		);
	}




}


export default HelpTxnReport;

