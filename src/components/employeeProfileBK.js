import  React, {component} from 'react';
//import { DATE } from 'sequelize/types';
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import  './Profile.css';
//import Nav from 'react-bootstrap/Nav';
//import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//import Axios from "axios";
// import Moment from 'react-moment';
const fetch = require('node-fetch');
var lastSix = '';
const companyID = localStorage.getItem('companyID');
const companyName = localStorage.getItem('companyName');
 var eDate = '';
  var sDate = '';
class EmployeeProfile extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the DOM element
     // this.state = { usersCollection: [] };
      this.state = {
        input: {},
        errors: {},
        data: [],
        
      };
      //const [myCompany, setCompany] = useState([]);

      this.companyIDEl = React.createRef();
      this.employeeNoEl = React.createRef();
      this.employeeNameEl = React.createRef(); 
      this.nricEl = React.createRef(); 
      this.sexEl = React.createRef(); 
      this.dateBirthEl = React.createRef();
      this.childsEl = React.createRef();           
      this.address1El = React.createRef();
      this.address2El = React.createRef();
      this.cityEl = React.createRef();
      this.stateEl = React.createRef();
      this.postcodeEl = React.createRef();   
      this.countryEl = React.createRef();
      this.levelEl = React.createRef(); 
      this.positionEl = React.createRef();        
      this.salaryEl = React.createRef();   
      this.otRateEl = React.createRef();
      this.payMethodEl = React.createRef();   
      this.incomeTaxNoEl = React.createRef();         
      this.epfNoEl = React.createRef();
      this.socsoNo2El = React.createRef();
      this.drivingLicenseNoEl = React.createRef();
      this.telNoEl = React.createRef();
      this.hpNoEl = React.createRef();
      this.emailEl = React.createRef();
      this.employDateEl = React.createRef();
      this.passwordEl = React.createRef();     
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
      //alert("#0");
      e.preventDefault();

    //  if(this.validate()){
        console.log(this.state);
        // alert(this.emailEl.current.value);

        const user= {
            companyID: EscapeStr(companyID),
            employeeNo:EscapeStr(this.employeeNoEl.current.value.toUpperCase()),
            employeeName: EscapeStr(this.employeeNameEl.current.value),
            nric: this.nricEl.current.value,    
            sex: EscapeStr(this.sexEl.current.value),
            dateBirth: this.dateBirthEl.current.value,
            childs: this.childsEl.current.value,
            address1: EscapeStr(this.address1El.current.value),
            address2: EscapeStr(this.address2El.current.value),
            city: EscapeStr(this.cityEl.current.value),
            state: EscapeStr(this.stateEl.current.value),
            postcode: this.postcodeEl.current.value,         
            country: EscapeStr(this.countryEl.current.value),
            level: this.levelEl.current.value,
            position: EscapeStr(this.postcodeEl.current.value),
            salary: this.salaryEl.current.value,
            otRate: this.otRateEl.current.value,
            payMethod: this.payMethodEl.current.value,
            incomeTaxNo: EscapeStr(this.incomeTaxNoEl.current.value).toUpperCase(),
            epfNo: EscapeStr(this.epfNoEl.current.value).toUpperCase(),
            socsoNo: EscapeStr(this.socsoNoEl.current.value).toUpperCase(),  
            drivingLicenseNo1: EscapeStr(this.drivingLicenseNoEl.current.value),          
            telNo: EscapeStr(this.telNoEl.current.value),
            hpNo: EscapeStr(this.hpNoEl.current.value),
            email: EscapeStr(this.emailEl.current.value),
            employDate: this.employDateEl.current.value,
            password: this.passwordEl.current.value, 
         };
         //var name1 =  EscapeStr(user.companyName);
        //alert(name1);
        fetch('http://localhost:9005/employeeNew', {
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
            //localStorage.setItem('companyName', user.employeeName);
            window.location.reload(false);
           };
          });
         // reset to null value
       
       // this.companyNameEl.current.value = "";
       this.employeeIDEl.current.value = "";
       this.employeeNameEl.current.value = "";
       this.nricEl.current.value = "";
       this.sexEl.current.value = "";
       this.dateBirthEl.current.value = "";
       this.choldsEl.current.value = "";
       this.address1El.current.value = "";
       this.address2El.current.value = ""; 
       this.cityEl.current.value = "";   
       this.stateEl.current.value = "";
       this.postcodeEl.current.value = "";
       this.countryEl.current.value = "";
       this.levelEl.current.value = 5;
       this.positionEl.current.value = "";
       this.salaryEl.current.value = 0;
       this.otRateEl.current.value = "";
       this.payMethodEl.current.value = "";
       this.incomeTaxNoEl.current.value = "";
       this.epfNoEl.current.value = ""; 
       this.socsoNoEl.current.value = "";
       this.telNoEl.current.value = "";
       this.hpNoEl.current.value = "";
       this.emailEl.current.value = "";
       this.employDateEl.current.value = "";
       this.passwordEl.current.value = "";
    }



  



  //  validate(){

       // let input = this.state.input;
       // let errors = {};
      //  let isValid = true;
    //   if (this.companyIDEl.current.value.length < 8){
    //   alert("Company ID must be from 8 - 20 character");
     //  return false;
     //  }

   //   return true;
   // }

 allowOnlyNumericsOrDigits(e) {
		const charCode = e.which ? e.which : e.keyCode;

		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			this.setState({ error: 'OOPs! Only numeric values or digits allowed' });
		}
	};



   
  
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
    
        this.employeeIDEl.current.value = "";
        this.employeeNameEl.current.value = "";
        this.nricEl.current.value = "";
        this.sexEl.current.value = "";
        this.dateBirthEl.current.value = "";
        this.choldsEl.current.value = "";
        this.address1El.current.value = "";
        this.address2El.current.value = ""; 
        this.cityEl.current.value = "";   
        this.stateEl.current.value = "";
        this.postcodeEl.current.value = "";
        this.countryEl.current.value = "";
        this.levelEl.current.value = 5;
        this.positionEl.current.value = "";
        this.salaryEl.current.value = 0;
        this.otRateEl.current.value = "";
        this.payMethodEl.current.value = "";
        this.incomeTaxNoEl.current.value = "";
        this.epfNoEl.current.value = ""; 
        this.socsoNoEl.current.value = "";
        this.telNoEl.current.value = "";
        this.hpNoEl.current.value = "";
        this.emailEl.current.value = "";
        this.employDateEl.current.value = "";
        this.passwordEl.current.value = "";
        

     };







      return (
        <form style={mystyle} onSubmit={this.handleSubmit}>
        <fieldset>

         <h1>Employee Profile Maintenance</h1>

        
        
         <label>Company ID :</label>
         
        <input onInput={toInputLowercase} type="text"
         minlength={8} maxLength={20} pattern="^[a-z]+$" ref={companyID} name="company_id" placeholder={companyID} readOnly= {true}/>
         

         <label>Company Name : </label>
        <input type="text" maxLength={200} ref={companyName} name="company_name" placeholder={companyName} readOnly= {true}/>
        <label>Company Register No. : </label>
        <input class="text-uppercase" type="text" maxLength={50} ref={this.registerNoEl} name="registerNo" required/>    
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
        <label>Income Tax No. : </label>
        <input class="text-uppercase" type="text" maxLength={50} ref={this.incomeTaxNoEl} name="incomeTaxNo" />       
        <label>EPFTax No. : </label>
        <input class="text-uppercase" type="text" maxLength={50} ref={this.epfNoEl} name="epfo" />    
        <label>SOCSO No. : </label>
        <input class="text-uppercase" type="text" maxLength={50} ref={this.socsoNoEl} name="socsooNo" />            
        <label>Telephone No. #1 : </label>
        <input class="text-uppercase" type="text" maxLength={50} ref={this.telNo1El} name="telNo1" />   
        <label>Telephone No. #2 : </label>
        <input type="text" maxLength={50} ref={this.telNo2El} name="telNo2" />   
        <label>Fax No. : </label>
        <input type="text" maxLength={50} ref={this.faxNoEl} name="faxNo" />           
        <label> Company Email :  </label>
        <input type="email"  maxLength={100} ref={this.emailEl} name="email"/>
        <label> Company Website :  </label>
        <input type="text" maxLength={200} ref={this.websiteEl} name="website"/>  
         <label> Financial Starting Date : </label>
         <input type="date" ref={this.finYearStartEl} required />
         <label> Financial Ending Date : </label>
         <input type="date" ref={this.finYearEndEl} defaultValue={employDate}required />



         </fieldset>

         <p>
         <input type="submit" style={logstyle} className="Register" name="submit" value="Submit" />
         <button style={buttonStyle} onClick={onCancel}>Clear</button>
         <button style={subStyle} onClick={this.loadCompanyInfo} >Load Company Infomation</button>
         </p>

  
  
      </form>
    
      )
    }
    }; 
  


