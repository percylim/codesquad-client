import React from 'react';

const name = localStorage.getItem('name');

function DisplayOnLine(categoryID)
{
    alert(categoryID);




const mystyle = {
				color: "white",
				backgroundColor: "DodgerBlue",
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



}
const userStyle = {
	 color: "white",
	 paddingLeft: "100px",
}


		return(


			<div>
			<body style={body}>

			<h1>
			<a style={mystyle} href="https://www.zhunionholdings.com">Golden Deer Home Page</a> <br/>
			  </h1>
	        <p style={userStyle}>
			Welcome {name}
			</p>

				</body>

			</div>


		);





}


export default DisplayOnLine;
