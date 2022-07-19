import React from 'react';
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
			 <h4>
			 <ul>
			 <li>Step 1 : Register an Account with System include Company ID, Company Name, Admin Login ID and Password. After register success System will create a database for the registered Company.</li>
			 <li><p> Step 2: A confirmation email will send to user to request for payment. After payment a login password will be provided and user can change the password.</p></li>
			 <li><p> Step 3: After Register user will be able to login with admin ID and Password and allow to setup all account and profile, employee password then to start the account.</p></li>
			 </ul>
			 </h4>
			 <h3 style={text}>Profile setting and maintenance</h3> 
			</body>
             </div>
    








  




			




		);
	}




}


export default HelpPage;
