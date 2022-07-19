import React from 'react';
const name = localStorage.getItem('name');

class ShoppingCart extends React.Component {

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

const mystyle = {
				color: "white",
				backgroundColor: "DodgerBlue",
				padding: "50px",
				fontFamily: "Arial",
				alignmentItems: "center",
				width: "1000%",
				height: "30%",
				textAlign: 'center',

			  };
const body = {
		padding: "5px 0px 50px 280px",
	  alignItems: 'center',
	  height: '500vx',
		width: '500vx',
    justifyContent: 'bottom',



}
const userStyle = {
	 color: "white",
	 paddingLeft: "100px",
}


		return(


			<div>
			<body style={body}>
        <h3>

					<p>
				Welcome {name} to your Shopping Cart
				</p>
			   </h3>


				</body>

			</div>


		);
	}


}


export default ShoppingCart;
