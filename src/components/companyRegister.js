import  React from 'react';
//import { DATE } from 'sequelize/types';
// import ReactDOM from 'react-dom';
//import NavbarDisable from './navbarDisable';
//import Login from './login';
//import Nav from 'react-bootstrap/Nav';
 import './UserProfile.css';
//import Nav from 'react-bootstrap/Nav';
import EscapeStr from './mysqlConvertChar';
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var lastSix = '';

class CompanyRegister extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the DOM element

      this.state = {
        input: {},
        errors: {}
      };
      this.companyIDEl = React.createRef();
      this.companyNameEl = React.createRef();
      this.address1El = React.createRef();
      this.address2El = React.createRef();
      this.postcodeEl = React.createRef();
      this.cityEl = React.createRef();
      this.stateEl = React.createRef();
      this.countryEl = React.createRef();
      this.adminIDEl = React.createRef();
      this.adminNameEl = React.createRef();
      this.emailEl = React.createRef();
      this.phoneEl = React.createRef();
      this.passwordEl = React.createRef();
      this.confirmPasswordEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
      //alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
        // alert(this.emailEl.current.value);

        const user= {
          companyID: this.companyIDEl.current.value,
          companyName: EscapeStr(this.companyNameEl.current.value),
          address1: EscapeStr(this.address1El.current.value),
          address2: EscapeStr(this.address2El.current.value),
          postcode: this.postcodeEl.current.value,
          city: EscapeStr(this.cityEl.current.value),
          state: EscapeStr(this.stateEl.current.value),
          country: EscapeStr(this.countryEl.current.value),
          adminID: EscapeStr(this.adminIDEl.current.value),
          adminName: EscapeStr(this.adminNameEl.current.value),
          email: EscapeStr(this.emailEl.current.value),
          phone: EscapeStr(this.phoneEl.current.value),
          password: this.passwordEl.current.value,
         };
         //var name1 =  EscapeStr(user.companyName);
        //alert(name1);
        fetch(url+'/companyRegister', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( user )
          // We convert the React state to JSON and send it as the POST body
         // data: JSON.stringify(user,user.ame)
          }).then(function(response) {
           return response.text()
        }).then(function(text) {


          // alert(text);
         lastSix = text.substr(text.length - 7); // => "Tabs1"
          //  poemDisplay.textContent = text;
          // alert(lastSix);

           if (lastSix === 'Success') {
            localStorage.clear();
            localStorage.setItem('companyName', user.companyName);
            window.location.reload(false);
           };
          });
         // reset to null value
        this.companyIDEl.current.value = "";
        this.companyNameEl.current.value = "";
        this.address1El.current.value = "";
        this.address2El.current.value = "";
        this.postcodeEl.current.value = "";
        this.cityEl.current.value = "";
        this.stateEl.current.value = "";
        this.countryEl.current.value = "";
        this.adminIDEl.current.value = "";
        this.adminNameEl.current.value = "";
        this.emailEl.current.value = "";
        this.phoneEl.current.value = "";
        this.passwordEl.current.value = "";
        this.confirmPasswordEl.current.value = "";
    }


  }



    validate(){

       // let input = this.state.input;
        let errors = {};
        let isValid = true;
       if (this.companyIDEl.current.value.length < 8){
       alert("Company ID must be from 8 - 20 character");
       return false
       }
       let  prod=this.companyIDEl.current.value;
     for (let i = 0; i < prod.length; i++) {
         if (prod.substr(i,1) === ';') {
           alert("Company ID cannot contain (;) letter ");
           return false;
         }

     }


          //alert(input[this.passwordEl.current.value]);
         // alert(this.confirmPasswordEl.current.value);
        if (this.passwordEl.current.value !== "undefined" && this.confirmPasswordEl.current.value !== "undefined") {

        if (this.passwordEl.current.value !== this.confirmPasswordEl.current.value) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
          alert("Password and confirm password don't match.");
        }
      }
      this.setState({
        errors: errors
      });

      return isValid;


    }

 allowOnlyNumericsOrDigits(e) {
		const charCode = e.which ? e.which : e.keyCode;

		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			this.setState({ error: 'OOPs! Only numeric values or digits allowed' });
		}
	};

    render() {
        const mystyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "5px 15px 10px 10px",
            alignItems: "center",
            fontFamily: "Arial",

        };
    const toInputLowercase = e => {
    e.target.value = ("" + e.target.value).toLowerCase();
    };

         const buttonStyle = {
          color: "black",
          backgroundColor: "yellow",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",

      };

   const subStyle = {
          color: "white",
          backgroundColor: "black",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",

      };
      const logstyle = {
          color: "white",
          backgroundColor: "red",
          padding: "10px 15px 10px 20px",
          fontFamily: "Arial",
          width: '6em',
          height: '3em',
      };
  // const NavStyle = {
  //        color: "white",
  //        width: "20px",
  //        alignItems: "center",
  //        backgroundColor: "blue",
   //       padding: "5px",
   //       paddingLeft: "400px",
   //       paddingRight: "50px",
    //      margin: "10px",
    //      fontFamily: "Arial",

    //  };


      const onCancel= () => {
        this.companyIDEl.current.value = "";
        this.companyNameEl.current.value = "";
        this.adminIDEl.current.value = "";
        this.address1El.current.value = "";
        this.address2El.current.value = "";
        this.postcodeEl.current.value = "";
        this.cityEl.current.value = "";
        this.stateEl.current.value = "";
        this.adminNameEl.current.value = "";
        this.emailEl.current.value = "";
        this.phoneEl.current.value = "";
        this.passwordEl.current.value = "";
        this.confirmPasswordEl.current.value = "";

     };


      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
          <fieldset>

           <h1>Company Account Registration</h1>



          <label style={{color: 'black', paddingLeft: '0px'}}>
          Company ID :
          <input onInput={toInputLowercase} type="text" style={{marginLeft: "72px"}}
           minlength={8} maxLength={20} pattern="^[a-z]+$" ref={this.companyIDEl} name="company_id" required/>
           </label>
           <label style={{color: 'black', paddingLeft: '0px'}}>Company Name :
          <input type="text" style={{marginLeft: "47px"}}
            maxLength={200} ref={this.companyNameEl} name="company_name" required />
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}>Company Address #1 :
          <input type="text" style={{marginLeft: "10px"}}
          maxLength={200} ref={this.address1El} name="address1" required />
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}>Company Address #2 :
          <input type="text" style={{marginLeft: "10px"}}
          maxLength={200} ref={this.address2El} name="address2" />
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}>City :
          <input type="text" style={{marginLeft: "138px"}}
          maxLength={50} ref={this.cityEl} name="city" required />
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}>State :
          <input type="text" style={{marginLeft: "130px"}}
          maxLength={50} ref={this.stateEl} name="state" required />
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}>Postcode :
          <input type="text" style={{marginLeft: "100px"}}
          maxLength={10} ref={this.postcodeEl} name="postcode" required />
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}> Country :
          <input type="text" style={{marginLeft: "110px"}}
          maxLength={50} ref={this.countryEl} name="country" required />
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}> Company Email :
          <input type="email"  style={{marginLeft: "55px"}}
          maxLength={50} ref={this.emailEl} name="email" required />
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}> Company Phone No. :
          <input type="text" style={{marginLeft: "20px"}}
          maxLength={20} ref={this.phoneEl} name="phone" required />
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}>Admin ID :
          <input type="text" style={{marginLeft: "100px"}}
          pattern="^[a-zA-Z0-9]+$" maxLength={30} ref={this.adminIDEl} name="admin_id" required/>
          </label>
          <label style={{color: 'black', paddingLeft: '0px'}}> Admin Name :
           <input type="text" style={{marginLeft: "76px"}}
           maxLength={200} ref={this.adminNameEl} name="admin_name" required />
           </label>
           <label style={{color: 'black', paddingLeft: '0px'}}> Password :
           <input type="password" style={{marginLeft: "100px"}}
           name="password" ref={this.passwordEl} required />
           </label>
           <label style={{color: 'black', paddingLeft: '0px'}}> Confirm Password :
           <input type="password" style={{marginLeft: "40px"}}
           name="confirmPassword" ref={this.confirmPasswordEl} required />
           </label>

           </fieldset>

           <p>
           <input type="submit" style={logstyle} className="Register" name="submit" value="Submit" />
           <button style={buttonStyle} onClick={onCancel}>Clear</button>

           </p>

    <a class="btn btn-dark btn-lg" style={subStyle} href="/login" role="button">Company Account Login</a>

        </form>
      )
    }
  };

export default CompanyRegister;
