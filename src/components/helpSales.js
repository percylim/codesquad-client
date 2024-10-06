import React from 'react';
import { Link } from 'react-router-dom'
import salesMenu from '../utils/salesMenu.png';
import salesInvoice from '../utils/salesInvoice.png';
import salesInvoice1 from '../utils/salesInvoice1.png'; 
import salesInvoiceEdit from '../utils/salesInvoiceEdit.png';
import salesInvoiceEdit1 from '../utils/salesInvoiceEdit1.png';
import salesDrCr  from '../utils/salesDrCr.png';
import salesReturn  from '../utils/salesReturn.png';
import salesReturn1  from '../utils/salesReturn1.png';
import salesPayment  from '../utils/salesPayment.png';
import salesInvoiceList  from '../utils/salesInvoiceList.png';
import salePayReport  from '../utils/salePayReport.png';
import salePeriodReport  from '../utils/salesPeriodReport.png';
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

class HelpSales extends React.Component {

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
		
             <h1> Sales Menu</h1>
             
             <img src={salesMenu} width='550' height='170' className="help-main" alt="logo" />	
		
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '5rem'}}>
			 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Sales Invoice :</p>
			 <img src={salesInvoice} width='400' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>
             <img src={salesInvoice1} width='400' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			  <p></p>
			 <span class="square border border-dark"></span>		
		      <p></p>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>Sales Invoice contents 2 parts, (1) Sales Invoice Entry and Sales Invoice Voucher entry (2) Product and Customer selection.</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>(1) Key in Customer ID then click Search button and if invalid the Customer information will show in the (2) part for selection. Key in Sales Invoice date, press Search Invoice No. button, change Term and Due Date if different, key in name of Sales Rep.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Key in Product ID and click Search button, if invalid Product will show on the part (2) for selection. Select Tax if any, key in Sales Quantity and Unit Price if different from the default price, key in Discount if there is, key in Remark #1 to #6 if different from default, then press Add Sales Item below in the part and continue same step for more items of the Sales Invoice. Remember to press Download button next to the Voucher No. before you start adding sales item. Voucher No. is auto generated. </li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Press New Sales Invoice button will clear all existing sales information, Home button will back to Main Menu, print Sales Invoice will print Sales Invoice in PDF format.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Continue Sales Invoice Voucher part, select G/L Account from G/L Selection dropdown list and key in Debit or Credit Amount and press Add Voucher Item button to add to the voucher table. After complete the entry of voucher, press Save Sales Invoice And Voucher button to save the sales invoice detail. Be sure that the total debit amount and total credit amount in the voucher table must be equal value.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Voucher can be printed in PDF format by pressing Print Voucher button.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Voucher can be printed in PDF format by pressing Print Voucher button.</li>
        
 <ul>

<p></p>
<span class="square border border-dark"></span>		
<p></p>        
			 <h4 style={{textAlign: 'left'}}></h4>
			 <div className= 'help-main' style={{marginLeft: '5rem'}}>
			 <p style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Edit Sales Invoice :</p>
			 <img src={salesInvoiceEdit} width='400' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>   
	        <img src={salesInvoiceEdit1} width='400' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
		
			</div>  
			 </ul>
		 
             <ul>    
			  <p></p>
			 <span class="square border border-dark"></span>		
		      <p></p>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>Edit Sales Invoice contents 2 parts, (1) Sales Invoice Editing and Sales Invoice Voucher entry (2) Product selection.</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>(1) To Edit Sales Invoice, key in a valid Sales Invoice No., if valid all information on Sales Invoice and Sales Voucher will be displayed. Change Invoice Date, Term, Due Date and Sales Rep. if require. </li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>To edit Sales Invoice item highlight the item and click Select button at the right side. Edit fields which are required to change then press Add Sales Item button to save the change. </li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>To add new sales item just key in a valid Product ID or select from Product Selection below. Key all necessary information then press Add Sales Item button to save.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>After completed the change of Sales Invoice process to Voucher part, highlight the Voucher item require to change.After change the information press Add Voucher Item to save change. After complete the edit of voucher, press Save Sales Invoice And Voucher button to save the edited sales invoice detail. Be sure that the total debit amount and total credit amount in the voucher table must be equal value.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Voucher can be printed in PDF format by pressing Print Voucher button.</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>Both Sales Invoice Item and Sales Voucher Item can be deleted by click the Delete button on the selected item. Print Sales Invoice will print a Sales Invoice. New Sales Invoice button will clear all information. Print Voucher Button will print Voucher in PDF format. Home button will return to Main Menu. </li>
     </ul>        


		
		
		
			 <ul>

				<p></p>
			 <span class="square border border-dark"></span>		
		      <p></p>
			 <a style={{color: 'red', textAlign: 'left'}}>Sales Invoice Debit / Credit Note :</a>
			 <img src={salesDrCr} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '30rem'}}/>	 
	         </ul>
			 </div>
             <ul>    
			 
             <li style={{marginLeft: '2rem', color: 'blue'}}>Select or key in Transaction Date if different from default date, select Transaction Type : Credit Note / Debit Note. Key in Dr/Cr No. Key in Customer ID and click Search button, if invalid please select Customer Selection at the end of this page. </li>
             <li style={{marginLeft: '2rem', color: 'blue'}}>Key in a valid Sales Invoice No. and click Search button. Key in Debit/Credit Amount, select Tax, key in Particular. Click Search Voucher No. button then press Add Dr/Cr Note button. </li>	
			 <li style={{marginLeft: '2rem', color: 'blue'}}>At Debit / Credit Note Voucher Entry section select G/L Account, key in Debit Amount or Credit Amount and press Add Voucher Item button. Make sure debit and credit total is equal in the Voucher item table. Press Save Invoice And Voucher button. Press Print Voucher button will print Debit/Credit Note in PDF format. </li>	
		
		      </ul>
			 
			 </h4>
			 <span class="square border border-dark"></span>		
		
			  
				<p></p>
		
          
		
		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Sales Goods Return Note :</a>      
			 <img src={salesReturn} width='350' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			 <img src={salesReturn1} width='350' height='1000' className="help-img" alt="logo" style={{marginLeft: '3rem'}}/>	
		      <p></p>             
			  <li style={{color: 'blue', marginLeft: '2rem'}}>Sales Goods Return Note contents 3 parts, (1) Sales Invoice Goods Return Entry (2) Goods Return Voucher entry (3) Sales Invoice Detail and Customer selection.</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>(1) Key in Customer ID then click Search button and if invalid the Customer information will show in the (3) part for selection. Click Search button to get auto Return Note No., key in Date and select Tax</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>Key in a valid Sales Invoice No. and click Search button,  Product item will show in part (2) Show Invoice Detail table, select item click Select button on the right . </li>
	         <li style={{color: 'blue', marginLeft: '2rem'}}>At product ID input field click Search button, key in Return Quantity and Unit Price if different from the default value. Press Voucher No. search button to get auto generated Voucher No. then Press Add Return Item button to add the information the goods Return table. Continue same step if more goods return required. </li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Press New Return Note button will clear all existing sales Return item information, Home button will back to Main Menu.</li>
             <li style={{color: 'blue', marginLeft: '2rem'}}>Continue to Part (1), select G/L Account from G/L Selection dropdown list and key in Debit or Credit Amount and press Add Voucher Item button to add to the voucher table. After complete the entry of voucher, press Save Return Note And Voucher button to save the sales invoice detail. Be sure that the total debit amount and total credit amount in the voucher table must be equal value.</li>
			 <li style={{color: 'blue', marginLeft: '2rem'}}>Press Print Voucher button will print Voucher in PDF format.</li>
		</div>	
		 </h4>
		</ul>


	
			 <span class="square border border-dark"></span>		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Sales Invoice Payment :</a>      
			 <img src={salesPayment} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '3rem'}}/>	
		      <p></p>
	             
		<li style={{marginLeft: '2rem', color: 'blue'}}>Key in Customer ID and click Search button, if invalid system will show all customers in the Customer Selection table at the bottom of the page. highlight customer in the table and click Select button on the right side. Click Search button to get auto Receipt No., key in Payment Date, Select Payment Type : Bank Cheque / Bank Transfer / Cash. Key in Cheque/Document Ref.: e.g. Cheque or transfer reference.</li>		
		<li style={{marginLeft: '2rem', color: 'blue'}}>Key in a valid Sales Invoice No. and click Search button. Key in Pay Amount and Payment Particular. Before press Update Payment button, auto Voucher No. must be downloaded by click Download button. Then press Update Payment, payment detail will be added to table. Continue the same process if require. May be payment with partial by bank cheque and balance by cash.</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>At Sales Invoice Payment Voucher Entry, select G/L Account and key in Debit or Credit Amount then press Add Voucher Item button. Make sure that the total debit and credit amount are equal. After complete press Save Payment And Voucher button to finish the payment transaction.</li>	
		<li style={{marginLeft: '2rem', color: 'blue'}}>To print Payment Detail in PDF format just press Print Payment Detail button. Press Print Voucher button will print current Voucher in PDF format. New Payment button will clear all information and Home button will return to Main Menu.</li>

		</div>	
		 </h4>
		</ul>

		<span class="square border border-dark"></span>		
			 <ul> 
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Customer Sales Invoice Listing And Printing :</a>      
			 <img src={salesInvoiceList} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			
	
		      <p></p>
	             
		
		<li style={{marginLeft: '2rem', color: 'blue'}}>Key in Load Sales Invoice From Date and To Date and click Search button.All Sales Invoice Date matched will display in Sales Invoice Selection table. Highlight the Sales Invoice item and click Select button on the right side. The Invoice No. will be display at Sales Invoice No., click Search button to load selected Sales Detail, click Download button next will download the Sales Invoice Transaction Detail and display at Sales Invoice Transaction Detail table. </li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Press Print Sales Invoice will print the Sales Invoice, press New Listing button will clear all information, press Home button will return to Main Menu.</li>

		</div>	
		 </h4>
		</ul>

		<span class="square border border-dark"></span>		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Customer payment/Debit/Credit/Return Note Report :</a>      
			 <img src={salePayReport} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			
		      <p></p>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Sales Invoice Payment from  Date and To Date and click Download button.</li>	
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Transaction Type: Payment/Debit/Credit/Return to load. At Customer Selection table highlight Customer/Supplier and click Select Button on the right side. Detail will display at Sales Invoice Payment Transaction Detail table</li>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Report can be exported to Excel (CSV) format by click the Export To Excel (CSV) link.</li>		
		</div>	
		 </h4>
		</ul>



		<span class="square border border-dark"></span>		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Periodical Sales Report :</a>      
			 <img src={salePeriodReport} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			
		      <p></p>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Report from  Date and To Date and click Download button.</li>	
		<li style={{marginLeft: '2rem', color: 'blue'}}>Report can be print to PDF format by press the Print button, Crear button will clear all information and Home button will return to Main Menu.</li>		
		</div>	
		 </h4>
		</ul>



		 <p></p>
         <p></p> 
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>
		
	    
		 <NavLink to="/helpPurchase" style={{marginLeft: '5rem', color: 'black'}}>Back</NavLink>
		 <NavLink to="/helpProduct" style={{marginLeft: '5rem', color: 'red'}}>Next</NavLink>
		     </h4> 
			
			 <hr></hr>
			 </body>

	
			
 		
   
    
	
	 
    
    



  








  



	




		);
	}




}


export default HelpSales;

