import React from 'react';
import { Button } from 'react-bootstrap';
// import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'bootstrap/dist/css/bootstrap.css';
//const [isOk, action] = await alertConfirm('Content');
//if (isOk) {
  // some event
//}
const name = localStorage.getItem('companyName');

class Logout extends React.Component {



	constructor(props){

		super(props);

		this.state = {


		};

		this.handleConfirm = this.handleConfirm.bind(this);
		this.refreshPage = this.refreshPage.bind(this);
	}


	handleConfirm() {
	//	console.log('Customer confirmation!');
		localStorage.clear();
		localStorage.setItem('companyName', 'Welcome to Code Squad Accounting System v1.0');


		this.props.history.push('Home');
		this.refreshPage()
      //   Alert.close(this.props.id);
	};

	handleCancel() {
		this.props.history.push('Home');
};

	refreshPage() {
		window.location.reload(false);
	  }

	render(){

const mystyle = {
				color: "white",
				backgroundColor: "#1f11a1",
				padding: "100px",
				fontFamily: "Arial",
				alignmentItems: "center",
				width: "100%",
				height: "100%",
				textAlign: 'center',

			  };
const body = {
		padding: "100px 0px 70px 280px",
	  alignItems: 'center',
	  height: '100px',
		width: '500vx',
    justifyContent: 'bottonm',



};
const userStyle = {
	 color: "white",
	 paddingLeft: "100px",
};



		return(


			<div>
			<body style={body}>

			<h1>
			<a style={mystyle} >Click Confirm Button to Confirm Logout</a> <br/>
			  </h1>
	        <p style={userStyle}>
			 {name}
			</p>
				</body>

            <br></br>
			<div class="d-grid gap-2 d-md-flex justify-content-md-center">
			<Button  type="button" variant="danger" onClick={this.handleConfirm.bind(this)} active>confirm</Button>

			<Button  type="button" variant="outline-success" onClick={this.handleCancel.bind(this)} active>cancel</Button>
			 </div>
			</div>


		);
	}




}


export default Logout;
