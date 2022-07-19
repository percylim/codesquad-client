import  React, { useState, useEffect } from 'react';
//import { DATE } from 'sequelize/types';
import ReactDOM from 'react-dom';
//import NavbarDisable from './navbarDisable';
//import Login from './login';
//import Nav from 'react-bootstrap/Nav';
//import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from "axios";
import EscapeStr from './mysqlConvertChar';
const fetch = require('node-fetch');
var lastSix = '';
const companyID = localStorage.getItem('companyID');
const companyName = localStorage.getItem('companyName');

class CompanyRegister extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the DOM element
      const [repo, setRepo] = useState([]); 
      this.state = {
        input: {},
        errors: {}
      };
      this.companyIDEl = React.createRef();
      this.companyNameEl = React.createRef();
      this.registerNoEl = React.createRef();    
      this.address1El = React.createRef();
      this.address2El = React.createRef();
      this.cityEl = React.createRef();
      this.stateEl = React.createRef();
      this.postcodeEl = React.createRef();   
      this.countryEl = React.createRef();
      this.incomeTaxNoEl = React.createRef();   
      this.epfNoEl = React.createRef();
      this.soscoNoEl = React.createRef();   
      this.telNo1El = React.createRef();
      this.telNo2El = React.createRef();
      this.faxNoEl = React.createRef();
      this.emailEl = React.createRef();
      this.webSiteEl = React.createRef();
      this.finYearStartEl = React.createRef();
      this.finYearEndEl = React.createRef();
    };
// check compoany profile whether company already ref]gisyer
        


  
const loadCompanyInfo = () => {    
    const getCompany = () => {
       const url = `http://localhost:9002/companyData/${companyID}`;
       Axios.get(url)
       .then(function(response){
            // console.log(response.json);
            const myRepo = response.data;
            setProduct(myRepo);
            return  response.json();
          })
         .then(function(myJson) {
            // console.log(myJson);
   
          })
         .catch((error) => {
           console.log('error',error);
         });
     };
     getCompany();
       
   };










    handleSubmit(e) {
      //alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
        // alert(this.emailEl.current.value);

        const user= {
          companyID: EscapeStr(companyID),
          companyName: EscapeStr(this.companyNameEl.current.value),
          registerNo: EscapeStr(this.registerNoEl.current.value),        
          address1: EscapeStr(this.address1El.current.value),
          address2: EscapeStr(this.address2El.current.value),
          city: EscapeStr(this.cityEl.current.value),
          state: EscapeStr(this.stateEl.current.value),
          postcode: this.postcodeEl.current.value,         
          country: EscapeStr(this.countryEl.current.value),
          incomeTaxNo: EscapeStr(this.incomTaxNoEl.current.value),
          epfNo: EscapeStr(this.epfNoEl.current.value),
          socsoNo: EscapeStr(this.socsoNoEl.current.value),  
          telNo1: EscapeStr(this.telNo1El.current.value),          
          telNo2: EscapeStr(this.telNo2El.current.value),
          faxNo: EscapeStr(this.faxNoEl.current.value),
          email: EscapeStr(this.emailEl.current.value),
          webSite: EscapeStr(this.webSiteEl.current.value),
          finYearStart: this.finYearStartEl.current.value,
          finYearEnd: this.finYearEndEl.current.value, 
         };
         //var name1 =  EscapeStr(user.companyName);
        //alert(name1);
        fetch('http://localhost:9005/companyProfile', {
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
          //  localStorage.setItem('companyName', user.companyName);
            window.location.reload(false);
           };
          });
         // reset to null value
       
        
        this.registerNoEl.current.value = "";
        this.address1El.current.value = "";
        this.address2El.current.value = ""; 
        this.cityEl.current.value = "";   
        this.stateEl.current.value = "";
        this.postcodeEl.current.value = "";
        this.countryEl.current.value = "";
        this.incomeTaxNoEl.current.value = "";
        this.epfNoEl.current.value = ""; 
        this.soscoEl.current.value = "";
        this.telNo1El.current.value = "";
        this.telNo2El.current.value = "";
        this.faxNoEl.current.value = "";
        this.emailEl.current.value = "";
        this.webSiteEl.current.value = "";
        this.finYearStartEl.current.value = "";
        this.finYearEndEl.current.value = "";
    }


  }



    validate(){

       // let input = this.state.input;
       // let errors = {};
      //  let isValid = true;
       if (this.companyIDEl.current.value.length < 8){
       alert("Company ID must be from 8 - 20 character");
       return false;
       }


    }

 allowOnlyNumericsOrDigits(e) {
		const charCode = e.which ? e.which : e.keyCode;

		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			this.setState({ error: 'OOPs! Only numeric values or digits allowed' });
		}
	};

    render() {
        const mystyle = {
            color: "BLACK",
            backgroundColor: "#ffffff",
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
          position: 'absolute',
          right: 350,
      };

   const subStyle = { 
          color: "white",
          backgroundColor: "blue",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",
  
      };
      const logstyle = {
          color: "white",
          backgroundColor: "red",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          

      };

      const onCancel= () => {
        this.registerNoEl.current.value = "";
        this.address1El.current.value = "";
        this.address2El.current.value = ""; 
        this.cityEl.current.value = "";   
        this.stateEl.current.value = "";
        this.postcodeEl.current.value = "";
        this.countryEl.current.value = "";
        this.incomeTaxNoEl.current.value = "";
        this.epfNoEl.current.value = "";
        this.soscoNoEl.current.value = "";
        this.telNo1El.current.value = "";
        this.telNo2El.current.value = "";
        this.faxNoEl.current.value = "";
        this.emailEl.current.value = "";
        this.webSiteEl.current.value = "";
        this.finYearStartEl.current.value = "";
        this.finYearEndEl.current.value = "";
        

     };


      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
          <fieldset>

           <h1>Company Profile Maintenance</h1>

          
          
           <label>Company ID :</label>
           
          <input onInput={toInputLowercase} type="text"
           minlength={8} maxLength={20} pattern="^[a-z]+$" ref={companyID} name="company_id" placeholder={companyID} readOnly= {true}/>
           

           <label>Company Name : </label>
          <input type="text" maxLength={200} ref={companyName} name="company_name" placeholder={companyName} readOnly={true}/>
          <label>Company Address #1 : </label>
          <input type="text" maxLength={200} ref={this.address1El} name="address1" required />
          <label>Company Address #2 : </label>  
          <input type="text" maxLength={200} ref={this.address2El} name="address2" />
          <label>City : </label>
          <input type="text" maxLength={50} ref={this.cityEl} name="city" required />                                 
          <label>State : </label> 
          <input type="text" maxLength={50} ref={this.stateEl} name="state" required />    
          <label>Post Code : </label> 
          <input type="text" maxLength={50} ref={this.postcodeEl} name="postcode" required />    
          <label>Country : </label>
          <input type="text" maxLength={50} ref={this.countryEl} name="country" required />       
          <label>Company Register No. : </label>
          <input type="text" maxLength={50} ref={this.registerNoEl} name="registerNo" />     
          <label>Income Tax No. : </label>
          <input type="text" maxLength={50} ref={this.incomeTaxNoEl} name="incomeTaxNo" />       
          <label>EPFTax No. : </label>
          <input type="text" maxLength={50} ref={this.epfNoEl} name="epfo" />    
          <label>SOCSO No. : </label>
          <input type="text" maxLength={50} ref={this.soscoNoEl} name="soscoNo" />            
          <label>Telephone No. #1 : </label>
          <input type="text" maxLength={50} ref={this.telNo1El} name="faxNo" />   
          <label>Telephone No. #2 : </label>
          <input type="text" maxLength={50} ref={this.telNo2El} name="faxNo" />   
          <label>Fax No. : </label>
          <input type="text" maxLength={50} ref={this.faxNoEl} name="faxNo" />           
          <label> Company Email :  </label>
          <input type="email"  maxLength={100} ref={this.emailEl} name="email"/>
          <label> Company Website :  </label>
          <input type="text" maxLength={200} ref={this.webSiteEl} name="website"/>  
           <label> Financial Starting Date : </label>
           <input type="date" ref={this.finYearStartEl} required />
           <label> Financial Endind Date : </label>
           <input type="date" ref={this.finYearEndEl} required />


           </fieldset>

           <p>
           <input type="submit" style={logstyle} className="Register" name="submit" value="Update" />
           <button style={buttonStyle} onClick={loadCompanyInfo}>Clear</button>
           <a class="btn btn-dark btn-lg" style={subStyle} href="/Home" role="button">Load Company Information</a>
           </p>

    
    
        </form>

        
      )
    }
  };

export default CompanyProfile;
