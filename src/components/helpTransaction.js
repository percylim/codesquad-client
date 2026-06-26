import React from 'react';
import { Link } from 'react-router-dom'
import txnMenu from '../utils/txnMenu.png';
import voucher from '../utils/voucher.png';
import editVoucher from '../utils/editVoucher.png'; 
import glOpenBalance from '../utils/glOpenBalance.png';
import bankReconciliation  from '../utils/bankReconciliation.png';
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

class HelpTransaction extends React.Component {

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
		
             <h1> Transaction Menu</h1>
             
             <img src={txnMenu} width='550' height='170' className="help-main" alt="logo" />	
            
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '5rem'}}>
			 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Voucher Entry :</p>
			 <img src={voucher} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
	         <p style={{color: 'blue', marginLeft: '2rem'}}>NOTE : Journal Entry is the main for all account transaction.</p>
			 <li style={{color: 'blue', marginLeft: '8rem'}}>Voucher No. is recommended to use JV/PV/RV before the number. JV represent Journal Voucher, PV represent Payment Voucher and RV represent Receiving Voucher.</li>
			 <li style={{color: 'blue', marginLeft: '8rem'}}>G/L Account Selection allow to select related G/L Account for amount to debit or credit.</li>
			 <li style={{color: 'blue', marginLeft: '8rem'}}>Press Add Voucher button to add voucher information to voucher table.</li> 
		     <li style={{color: 'blue', marginLeft: '8rem'}}>To edit or delete existing voucher information, select the item on the table and click Edit or Delete button on the right hand side of the item for editing or deleting.</li>
			 <li style={{color: 'blue', marginLeft: '8rem'}}>Add New Button will clear all information on table and voucher entry.</li>
			 <li style={{color: 'blue', marginLeft: '8rem'}}>Print Voucher Button will print the voucher in PDF format.</li>
			 <li style={{color: 'blue', marginLeft: '8rem'}}>Save Button will save all information on the Journal Voucher table.</li>	
			 <li style={{color: 'blue', marginLeft: '8rem'}}>Delete This Voucher Button will delete all information on the Journal Voucher. This deletion available only before save.</li>	
			 <li style={{color: 'red', marginLeft: '8rem'}}>Important : Debit and Credit Amount must equal for Saving.</li>
		     <ul>
				<p></p>
			 <span class="square border border-dark"></span>		
		      <p></p>
			 <a style={{color: 'red', textAlign: 'left'}}>Edit / Delete Existing Voucher :</a>
			 <img src={editVoucher} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	 
	         </ul>
			 </div>
             <ul>    
			 
             <li style={{marginLeft: '2rem', color: 'blue'}}>To edit existing journal voucher first need to key in a valid existing Voucher No. and click DownLoad button on the right side of Voucher No. and all information will be display in the table. To print Voucher in PDF format press Print Voucher button.</li>
             <li style={{marginLeft: '2rem', color: 'blue'}}>Select item from the table and click edit then make change of the information and press Add Voucher button to add change in the table item.</li>	
             <li style={{marginLeft: '2rem', color: 'blue'}}>To delete select item from the table and click Delete Button and item will be remove from the table.</li>	
             <li style={{marginLeft: '2rem', color: 'blue'}}>To add deleted item or new voucher item just key in all required information and press Add Voucher Button to add to Voucher Table Item.</li>	
             <li style={{marginLeft: '2rem', color: 'blue'}}>To save the edited Voucher press Update Edited Voucher, make sure that the debit and credit amount in the voucher table must be equal.</li>	
             <li style={{marginLeft: '2rem', color: 'blue'}}>To delete download voucher just press Delete This Voucher button.</li>	
             <li style={{marginLeft: '2rem', color: 'blue'}}>Press New Voucher button will clear all information in the form and table. </li>	
        	 </ul>
			 
			 </h4>
			 <span class="square border border-dark"></span>		
			 <ul> 
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Add/Edit General Ledger Account Opening Balance :</a>      
			 <img src={glOpenBalance} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
		      <p></p>
	             
		<li style={{marginLeft: '2rem', color: 'blue'}}>To add or change the General Ledger Account Opening Balance just select G/L item in the table and click Edit Button on the right side of the selected item. Opening Balance Amount will displayed and ready for changing</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Press Update button and the changed amount will be updated.</li>	
		<li style={{marginLeft: '2rem', color: 'blue'}}>After updated Opening Balance Debit and Credit Amount will update too. Make sure that the Debit and Credit Amount must be equal otherwise some G/L Opening Balance Amount must be incorrect.</li>	
		
		
		</div>	
		 </h4>
		</ul>


	
			 <span class="square border border-dark"></span>		
			 <ul> 
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Bank Reconciliation :</a>      
			 <img src={bankReconciliation} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	
		      <p></p>
	             
		<li style={{marginLeft: '2rem', color: 'blue'}}>Bank reconciliation is the record keeping when the transaction record in monthly bank statement is different from company Bank G/L Account. Adjustment of transaction is required to record in bank monthly reconciliation and be able to retrieve for checking later.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>The Bank Reconciliation Period Ending At shall be the end of the month.</li>	
		<li style={{marginLeft: '2rem', color: 'blue'}}>There are two parts of information entry, the upper part is from bank statement, lower part is from Company Bank G/L Account. Only different transaction between bank statement and G/L Account require to reconciliate.</li>	
		<li style={{marginLeft: '2rem', color: 'blue'}}>To process first to select Ending Date and press Download button on the right side of Bank Balance at the upper part.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>To change in Bank statement just key in the Amount in Bank Balance : field either positive or negative amount. Press the Save Bank Balance button at the right side and amount add to Bank Statement And General Ledger Bank Account table.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Next key in the Particular and Amount to Reconciliate and press Add To Reconciliation Item. The different will add and show in the table.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>After all changes completed press Save Bank Reconciliation button to save. ANy new bank reconciliation transaction will be replaced according to the ending date selected.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Bank Reconciliation Report can be printed in PDF format by pressing the Print Reconciliation Report button.</li>
		</div>	
		 </h4>
		</ul>

		 <p></p>
         <p></p> 
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>
		
	    
		 <NavLink to="/helpSetup" style={{marginLeft: '5rem', color: 'black'}}>Back</NavLink>
		 <NavLink to="/helpTxnReport" style={{marginLeft: '5rem', color: 'red'}}>Next</NavLink>
		     </h4> 
			
			 <hr></hr>
			 </body>

	
			
 		
   
    
	
	 
    
    



  








  




	</div>		




		);
	}




}


export default HelpTransaction;

