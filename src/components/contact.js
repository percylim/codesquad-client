import React from 'react';
import Nav from 'react-bootstrap/Nav';
const name = localStorage.getItem('name');

class Contact extends React.Component {

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
		padding: "5px 0px 50px 280px",
	  alignItems: 'center',
	  height: '500vx',
		width: '500vx',
    justifyContent: 'bottom',



}


		return(


			<div>
			<body style={body}>
        <h3>

					<p>
				Hi {name} welcome to contact us
				</p>
				<p>
				Address : No. 49, Lorong 4F1, Jalan Keranji, Tabuan Desa Commercial Centre, 93350 Kuching, Sarawak.
        </p>
				<p>
				Contact No. : +6082366604 Fax No. : +6082369604
        </p>
				<p>
				<a class="mailto" href="mailto:info@zhunionholdings.com">Email : info@zhunionholdings.com</a>

        </p>
				<p>
				​ <a href='https://www.zhunionholdings.com'>​Web : www.zhunionholdings.com</a>
         </p>
				 <p>
				<a href= 'https://www.facebook.com/zhunionholdings'>Facebook : https://www.facebook.com/zhunionholdings</a>

				</p>
			   </h3>


				</body>

			</div>


		);
	}


}


export default Contact;
