import React from 'react';
import { Link } from 'react-router-dom'
import glProfile from '../utils/GLProfile.png';
import company from '../utils/companyProfile.png';
import department from '../utils/department.png';
import suppList from '../utils/suppList.png';
import suppNew from '../utils/suppNew.png';
import suppEdit from '../utils/suppEdit.png';
import bankList from '../utils/bankList.png';
import bankNew from '../utils/bankNew.png';
import bankEdit from '../utils/bankEdit.png';
import incomeTax from '../utils/incomeTax.png';
import imgUpload from '../utils/imgUpload.png';
//import Zoom from 'react-medium-image-zoom';
//import register from '../utils/companyRegister.png';
import {NavLink, BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles.css";
//import home from './home';
//import renderHTML from 'react-render-html';
//import ReactDOM from 'react-dom/client';

//const container = document.getElementById('root');
//const root = ReactDOM.createRoot(container);

//const companyID = localStorage.getItem('companyID');
//requircomdotenv').config();//
// const url = process.env.REACT_APP_SERVER_URL;
// var help1 = '';
//const name = localStorage.getItem('name');

class HelpSetup extends React.Component {

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

             <h1> System Setup</h1>


			 <div className="app">
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Company Profile :
             <div className="img-container" style={{marginLeft: '10rem'}}>
			 <img src={company} width='400' height='750' className="help-img" alt="logo" style={{marginLeft: '2rem'}}/>
		
			 </div>
			 

			  <li style={{marginLeft: '1rem', color: 'blue'}}>Edit Company profile information must register first.</li>
			  <li style={{marginLeft: '1rem', color: 'blue'}}>To load Company profile information press Load Company Information Button.</li>
			  <li style={{marginLeft: '1rem', color: 'blue'}}>To clear the information press Clear Button.</li>
			  <li style={{marginLeft: '1rem', color: 'blue'}}>To change or add Company Logo click Company Logo select option. Logo must be created as PNG file first </li>
			  <a style={{marginLeft: '3.2rem', color: 'blue'}}> and use Image Upload function to upload the Logo.</a>
			  <li style={{marginLeft: '1rem', color: 'blue'}}>To save Company profile information press Submit Button.</li>
			  </h4>
			 
			 
			 <h4 style={{textAlign: 'left', color: 'red', paddingLeft: '10px'}}>List / Add / Edit General Ledger Profile :
              <a style={{marginLeft: '5rem'}}>Department List / Add / Edit :</a>		
		     <div className="imgGl-container" style={{marginLeft: '5rem'}}>
			 <img src={glProfile} width='400' height='750' className="help-imgGl" alt="logo" style={{marginLeft: '0rem'}}/>
			 <img src={department} width='400' height='750' className="help-imgGl" alt="logo" style={{marginLeft: '2rem'}}/>
			 </div>
			 <ul>  
			 <li style={{marginLeft: '1rem', color: 'blue'}}>At General Ledger Listing, new G/L Account can be added by pressing Add New button. Press Export To CSV link will print G/L Information in CSV format.</li>
			 <li style={{marginLeft: '1rem', color: 'blue'}}>To add new G/L Account press Add New button, form below listing table can be enter all information. Press Save button to save the new information.</li>
			 <li style={{marginLeft: '1rem', color: 'blue'}}>To edit existing G/L Account press Edit button on the right side of selected item on the table. Once Edit button pressed all information will display at the form below, just edit change and press Save button to update.</li>
			 <p></p>
			 <li style={{marginLeft: '1rem', color: 'blue'}}>Add or Edit Department Profile, just follow the same steps as add and edit G/L Account.</li>
			 </ul>
			 <ul> 
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>List / Add / Delete Supplier and Customer Profile :</h4>
		     <div className="imgCS-container" style={{marginLeft: '5rem'}}>
			 <img src={suppList} width='200' height='550' className="help-imgOT" alt="logo" style={{marginLeft: '0rem'}}/>
			 <img src={suppNew} width='200' height='550' className="help-imgCS" alt="logo" style={{marginLeft: '2rem'}}/>
			 <img src={suppEdit} width='200' height='550' className="help-imgCS" alt="logo" style={{marginLeft: '2rem'}}/>
			 </div>
			 <li style={{marginLeft: '1rem', color: 'blue'}}>At Supplier / Customer Listing, new Account can be added by pressing New Supplier/Customer button, Supplier / Customer Profile Maintenance will be loaded for information entry. At the listing table select the existing item and press Edit button on the right side Edit Supplier / Customer Profile Maintenance will be loaded for editing. Press Export To CSV link will print Supplier and Customer  Information in CSV format.</li>
			 <li style={{marginLeft: '1rem', color: 'blue'}}>At Supplier / Customer Profile Maintenance select Supplier or Customer radio button and key in all required information. The most important is to select the related General Ledger Account which was previously created in General Ledger Account Profile Maintenance. Then press Add New button to save the information.</li>
			 <li style={{marginLeft: '1rem', color: 'blue'}}>At Edit Supplier / Customer Profile Maintenance, make change on any field accept Supplier/Customer ID and G/L Account section. Then press Update button to save all change.</li>
		     </ul>
			 <ul> 
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '2rem'}}>Bank Account Listing / Add / Edit :</h4>
			 <div className="imgCS-container" style={{marginLeft: '5rem'}}>
			 <img src={bankList} width='200' height='550' className="help-imgOT" alt="logo" style={{marginLeft: '0rem'}}/>	
			 <img src={bankNew} width='200' height='550' className="help-imgCS" alt="logo" style={{marginLeft: '2rem'}}/>
			 <img src={bankEdit} width='200' height='550' className="help-imgCS" alt="logo" style={{marginLeft: '2rem'}}/>
			 </div>
		
			 <li style={{marginLeft: '1rem', color: 'blue'}}>At Bank Listing, new Account can be added by pressing New Account button, Bank Profile Maintenance will be loaded for information entry. At the listing table select the existing item and press Edit button on the right side Edit Bank Profile will be loaded for editing. Press Export To CSV link will print Supplier and Customer  Information in CSV format.</li>
			 <li style={{marginLeft: '1rem', color: 'blue'}}>At Bank Profile Maintenance key in all required information. The most important is to select the related General Ledger Account which was previously created in General Ledger Account Profile Maintenance. Then press Add New button to save the information.</li>
			 <li style={{marginLeft: '1rem', color: 'blue'}}>At Edit Bank Profile, make change on any field accept Bank ID and G/L Account section. Then press Update button to save all change.</li>
			 </ul>	
			 
	         
		     <ul>    
			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '0rem'}}>Income Tax Rate :
			 <a style={{textAlign: 'left', color: 'red', marginLeft: '26rem'}}>Image Upload :</a>
			 <div className="imgCS-container" style={{marginLeft: '5rem'}}>
			 <img src={incomeTax} width='200' height='550' className="help-imgCS" alt="logo" style={{marginLeft: '0rem'}}/>	
			 <img src={imgUpload} width='200' height='550' className="help-imgCS" alt="logo" style={{marginLeft: '10rem'}}/>	
		     </div>
			 <li style={{marginLeft: '1rem', color: 'blue'}}>At Income Tax Chargeable Listing, new Income Tax can be added by pressing New Tax button, Tax information can be added below the Income Tax Chargeable Listing table. At the listing table select the existing item and press Edit button on the right side all information will appear below the table for editing. Press Add Income Tax Info to save the new information or press Update Income Tax Info to save all change after edited. To delete the selected item just select and press the Dust Bin button.</li>
			 <li style={{marginLeft: '1rem', color: 'blue'}}>Image Upload can upload selected PNG, JPG or ICON by pressing Choose File button and when the image displayed press Update button to upload.</li>
			
			 </h4>
			  </ul>

			
			  </h4>
	
		      <p></p>

			 <h4 style={{textAlign: 'left', color: 'red', marginLeft: '8rem'}}>


		 <NavLink to="/helpMain" style={{marginLeft: '5rem', color: 'black'}}>Back</NavLink>
		 <NavLink to="/helpTransaction" style={{marginLeft: '5rem', color: 'red'}}>Next</NavLink>

		     </h4>
			
			 </div> 

			 <hr></hr>
			 </body>
            


























	</div>




		);
	}




}


export default HelpSetup;
