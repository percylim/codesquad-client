import React from 'react';
import { Link } from 'react-router-dom'
import productMenu from '../utils/productMenu.png';
import categoryList from '../utils/categoryList.png';
import productList from '../utils/productList.png'; 
import productNew from '../utils/productNew.png';
import productEdit  from '../utils/productEdit.png';
import productOpBal  from '../utils/productOpBal.png';
import productAdjust  from '../utils/productAdjust.png';
import productWriteOff  from '../utils/productWriteOff.png';
import productTxnReport  from '../utils/productTxnReport.png';
import productAdjReport  from '../utils/productAdjReport.png';

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

class HelpProduct extends React.Component {

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
		
             <h1>Product Control Menu</h1>
             
             <img src={productMenu} width='550' height='170' className="help-main" alt="logo" />	
             
             <span class="square border border-dark"></span>		
	         <p></p>
    		 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '5rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Category Listing/Add/gstEdit :</a>
			 <img src={categoryList} width='400' height='1000' className="help-img" alt="logo" style={{marginLeft: '4rem'}}/>
             <p></p>		
	         <li style={{color: 'blue', marginLeft: '2rem'}}>Under Product Category Listing, key in Category ID, Product Category Name and Product Category Description and press Save button. If the Category ID already existed the Category Name and Description will changed as key in value. If the Category ID is not existing new category item will be added.</li>
			 
        	 <ul>
				<p></p>
			 <span class="square border border-dark"></span>		
		      <p></p>
			 <a style={{color: 'red', textAlign: 'left'}}>Product Profile Listing/Add/Edit :</a>
			 <img src={productList} width='350' height='1000' className="help-img" alt="logo" style={{marginLeft: '2rem'}}/>	 
             <img src={productNew} width='350' height='1000' className="help-img" alt="logo" style={{marginLeft: '2rem'}}/>
             <img src={productEdit} width='350' height='1000' className="help-img" alt="logo" style={{marginLeft: '2rem'}}/>	 	 
             </ul>
			 </div>
             <ul>    
			 
             <li style={{marginLeft: '2rem', color: 'blue'}}>To add a new product press Add New Product button, a Product Profile Maintenance will display for entry. Key Product ID and all information, select Product Category and Product Image, press Add New button to save the information. Product Image for current product must be uploaded before new product added. Press Clear button will clear all information, Back button will return back Product Listing Page.</li>
             <li style={{marginLeft: '2rem', color: 'blue'}}>Highlight the Product Profile Listing table and click Edit button on the right side, Edit Product Profile page will display for editing. Just edit required information and press Update button to save the change. </li>	
			 <li style={{marginLeft: '2rem', color: 'blue'}}>Click Export To Excel (CSV) link will print Product Listing in CSV format. </li>	
		
		      </ul>
			 
			 </h4>
			 <span class="square border border-dark"></span>		
		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Product Opening Balance :</a>      
			 <img src={productOpBal} width='350' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
		      <p></p>             
			  <li style={{color: 'blue', marginLeft: '2rem'}}>Highlight and select item from the Edit Product Opening Balance table and click Edit button on the right side of the selected item. At Modify Product Opening Balance section change Opening Balance Quantity and Product Cost, press Update button to save change.</li>
		
		</div>	
		 </h4>
		</ul>


	
			 <span class="square border border-dark"></span>		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Product Adjustment :</a>      
			 <img src={productAdjust} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '3rem'}}/>	
		      <p></p>
	             
		<li style={{marginLeft: '2rem', color: 'blue'}}>Highlight and select product item from the Product Adjustment Entry table and click Select button on right side of the selected item, change the Txn. Particular and Adjust Quantity, press Update button to save change.</li>		
		
		</div>	
		 </h4>
		</ul>

		<span class="square border border-dark"></span>		
			 <ul> 
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Product Write Off :</a>      
			 <img src={productWriteOff} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			
	
		      <p></p>
	             
		
		<li style={{marginLeft: '2rem', color: 'blue'}}>Highlight and select product item from Product Write Off Entry table, press Select button at the right side of the selected item. Change the Txn. Particular and Write Off quantity, press Update button to save change. </li>
		

		</div>	
		 </h4>
		</ul>

		<span class="square border border-dark"></span>		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Product Transaction Report :</a>      
			 <img src={productTxnReport} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			
		      <p></p>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select product item, key in Product Transaction Starting Date and Ending Date and click Search button. Product Transaction Detail will be display at table below. To export report to CSV format click Export To Excel (CSV) link.</li>	
		
		</div>	
		 </h4>
		</ul>

		<span class="square border border-dark"></span>		
			 <ul> 
				<p></p>
			 <h4 style={{textAlign: 'left'}}>
			 <div className= 'help-main' style={{marginLeft: '0rem'}}>
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Product Adjustment/Write Off Report :</a>      
			 <img src={productAdjReport} width='550' height='1000' className="help-img" alt="logo" style={{marginLeft: '1rem'}}/>	
			
		      <p></p>
		<li style={{marginLeft: '2rem', color: 'blue'}}>Select Txn. Type: Product Adjustment or Product Write Off, key in Product Transaction Starting Date and Ending Date and click Search button. Product Adjustment or Product Write Off Detail will be display at table below. To export report to CSV format click Export To Excel (CSV) link.</li>	
		
		</div>	
		 </h4>
		</ul>



		 <p></p>
         <p></p> 
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>
		
	    
		 <NavLink to="/helpSales" style={{marginLeft: '5rem', color: 'black'}}>Back</NavLink>
		 <NavLink to="/helpGst" style={{marginLeft: '5rem', color: 'red'}}>Next</NavLink>
		     </h4> 
			
			 <hr></hr>
			 </body>

	
			
 		
   
    
	
	 
    
    



  








  



	




		);
	}




}


export default HelpProduct;

