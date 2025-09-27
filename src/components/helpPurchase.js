import React from 'react';
import { Link } from 'react-router-dom'
import purchaseMenu from '../utils/purchaseMenu.png';
import purchaseInvoice from '../utils/purchaseInvoice.png';
import purchaseInvoice1 from '../utils/purchaseInvoice1.png'; 
import purchaseInvoice2 from '../utils/purchaseInvoice2.png';
import purchaseDrCr  from '../utils/purchaseDrCr.png';
import purchaseReturn  from '../utils/purchaseReturn.png';
import purchaseReturn1  from '../utils/purchaseReturn1.png';
import purchasePayment  from '../utils/purchasePayment.png';
import purchaseInvoiceList  from '../utils/purchaseInvoiceList.png';
import purPayReport  from '../utils/PurPayReport.png';

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

class HelpPurchase extends React.Component {

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
	
			<body style={body}>	 
		
             <h1> Purchase Menu</h1>
             
             <img src={purchaseMenu} width='550' height='170' className="help-main" alt="logo" />	
            
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '5rem'}}>
			 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Purchase Invoice :</p>
			 <img src={purchaseInvoice} width='400' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>
             <img src={purchaseInvoice1} width='400' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
             <img src={purchaseInvoice2} width='400' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>		
	         <li style={{color: 'blue', marginLeft: '2rem'}}>Purchase Invoice contents 3 parts, (1) Purchase Invoice Entry (2) Purchase Voucher entry (3) Product and Supplier selection.</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>(1) Key in Supplier ID then click Search button and if invalid the Supplier information will show in the (3) part for selection. Key in Invoice No. and Date and select Tax.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Key in Product ID and click Search button, if invalid Product will show on the part (3) for selection. Select Purchase or FOC item, key in Purchase Quantity and Purchase Price if different from the default price, key in item Discount if there is, then press Add Purchase Item below in the part and continue same step for more items of the Purchase Invoice. Remember to press Download button next to the Voucher No. before you start adding purchase item. Voucher No. is auto generated. </li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Press New Invoice button will clear all existing purchase information, Home button will back to Main Menu.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Continue to Part (2), select G/L Account from G/L Selection dropdown list and key in Debit or Credit Amount and press Add Voucher Item button to add to the voucher table. After complete the entry of voucher, press Save Invoice And Voucher button to save the purchase invoice detail. Be sure that the total debit amount and total credit amount in the voucher table must be equal value.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Voucher can be printed in PDF format by pressing Print Voucher button.</li>
        	 <ul>
				<p></p>
			 <span class="square border border-dark"></span>		
		      <p></p>
			 <a style={{color: 'red', textAlign: 'left'}}>Purchase Invoice Debit / Credit Note :</a>
			 <img src={purchaseDrCr} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	 
	         </ul>
			 </div>
             <ul>    
			 
             <li style={{marginLeft: '2rem', color: 'blue'}}>Select or key in Transaction Date if different from default date, select Transaction Type : Credit Note / Debit Note. Key in Dr/Cr No. Key in Supplier ID and click Search button, if invalid please select Supplier Selection at the end of this page. </li>
             <li style={{marginLeft: '2rem', color: 'blue'}}>Key in a valid Purchase Invoice No. and click Search button. Key in Debit/Credit Amount, select Tax, key in Particular. Click Search Voucher No. button then press Add Dr/Cr Note button. </li>	
			 <li style={{marginLeft: '2rem', color: 'blue'}}>At Debit / Credit Note Voucher Entry section select G/L Account, key in Debit Amount or Credit Amount and press Add Voucher Item button. Make sure debit and credit total is equal in the Voucher item table. Press Save Invoice And Voucher button. Press Print Voucher button will print Debit/Credit Note in PDF format. </li>	
		
		      </ul>
			 
			 </h4>
			 <span class="square border border-dark"></span>		
		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Purchase Goods Return Note :</a>      
			 <img src={purchaseReturn} width='350' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			 <img src={purchaseReturn1} width='350' height='1000' className="help-img" alt="logo" style={{marginLeft: '3rem'}}/>	
		      <p></p>             
			  <li style={{color: 'blue', marginLeft: '2rem'}}>Purchase Goods Return Note contents 3 parts, (1) Purchase Invoice Goods Return Entry (2) Goods Return Voucher entry (3) Purchase Invoice Detail and Supplier selection.</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>(1) Key in Supplier ID then click Search button and if invalid the Supplier information will show in the (3) part for selection. Key in Return Note No. and Date and select Tax</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>Key in a valid Purchase Invoice No. and click Search button,  Product item will show in part (3) Show Invoice Detail table, select item click Select button on the right . </li>
	         <li style={{color: 'blue', marginLeft: '2rem'}}>At product ID input field click Search button, key in Return Quantity and Unit Price if different from the default value. Press Voucher No. search button to get auto generated Voucher No. then Press Add Return Item button to add the information the goods Return table. Continue same step if more goods return required. </li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Press New Return Note button will clear all existing purchase Return item information, Home button will back to Main Menu.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Continue to Part (2), select G/L Account from G/L Selection dropdown list and key in Debit or Credit Amount and press Add Voucher Item button to add to the voucher table. After complete the entry of voucher, press Save Return Note And Voucher button to save the purchase invoice detail. Be sure that the total debit amount and total credit amount in the voucher table must be equal value.</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>Press Print Voucher button will print Voucher in PDF format.</li>
		</div>	
		 </h4>
		</ul>


	
			 <span class="square border border-dark"></span>		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Purchase Invoice Payment :</a>      
			 <img src={purchasePayment} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '3rem'}}/>	
		      <p></p>
	             
		<li style={{marginLeft: '2rem', color: 'blue'}}>Key in Supplier ID and click Search button, if invalid system will show all supplier in the Supplier Selection table at the bottom of the page. highlight supplier in the table and click Select button on the right side. Key in the Receipt No. and Payment Date, Select Payment Type : Bank Cheque / Bank Transfer / Cash. Key in Cheque/Document Ref.: e.g. Cheque or transfer reference.</li>		
		<li style={{marginLeft: '2rem', color: 'blue'}}>Key in Purchase Invoice No. and click Search button. Key in Pay Amount and Payment Particular. Before press Update Payment button, auto Voucher No. must be downloaded by click Download button. Then press Update Payment, payment detail will be added to table. Continue the same process if require. May be payment with partial by bank cheque and balance by cash.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>At Purchase Invoice Payment Voucher Entry, select G/L Account and key in Debit or Credit Amount then press Add Voucher Item button. Make sure that the total debit and credit amount are equal. After complete press Save Payment And Voucher button to finish the payment transaction.</li>	
		<li style={{marginLeft: '2rem', color: 'blue'}}>To print Payment Detail in PDF format just press Print Payment Detail button. Press Print Voucher button will print current Voucher in PDF format. New Payment button will clear all information and Hom button will return to Main Menu.</li>

		</div>	
		 </h4>
		</ul>

		<span class="square border border-dark"></span>		
			 <ul> 
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Supplier Purchase Invoice Listing :</a>      
			 <img src={purchaseInvoiceList} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			
	
		      <p></p>
	             
		
		<li style={{marginLeft: '2rem', color: 'blue'}}>Key in Load Purchase Invoice From Date and To Date and click Search button.All Purchase Invoice Date matched will display in Purchase Invoice Selection table. Highlight the Purchase Invoice item and click Select button on the right side. The Invoice No. will be display at Purchase Invoice No., click Search button to load selected Purchase Detail, click Download button next will download the Purchase Invoice Transaction Detail and display at Purchase Invoice Transaction Detail table. </li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Press New Listing button will clear all information, press Home button will return to Main Menu.</li>

		</div>	
		 </h4>
		</ul>

		<span class="square border border-dark"></span>		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Supplier payment/Debit/Credit/Return Note Report :</a>      
			 <img src={purPayReport} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			
		      <p></p>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Purchase Invoice Payment from  Date and To Date and click Download button.</li>	
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Transaction Type: Payment/Debit/Credit/Return to load. At Supplier Selection table highlight Supplier and click Select Button on the right side. Detail will display at Purchase Invoice Payment Transaction Detail table</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Report can be exported to Excel (CSV) format by click the Export To Excel (CSV) link.</li>		
		</div>	
		 </h4>
		</ul>




		 <p></p>
         <p></p> 
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>
		
	    
		 <NavLink to="/helpTxnReport" style={{marginLeft: '5rem', color: 'black'}}>Back</NavLink>
		 <NavLink to="/helpSales" style={{marginLeft: '5rem', color: 'red'}}>Next</NavLink>
		     </h4> 
			
			 <hr></hr>
			 </body>

	
			
 		
   
    
	
	 
    
    



  








  



	




		);
	}




}


export default HelpPurchase;

