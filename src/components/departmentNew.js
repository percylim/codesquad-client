import  React from 'react';
// mport validator from 'validator'
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
//import Axios from "axios";
// import departmentList from './departmentList';
 import  './UserProfile.css';
 require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var lastSix = '';
const companyID = localStorage.getItem('companyID');
//var userLevel = localStorage.getItem('userLevel');
// const companyName = localStorage.getItem('companyName')
// var eDate = '';
//  var sDate = '';
class DepartmentNew extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the DOM element
     // this.state = { usersCollection: [] };
      this.state = {
        input: {},
        errors: {},
        data: [],
        number: 0,
        state: {},
        name: [],

      };


      this.handleInputChange = this.handleInputChange.bind(this);
   //   this.formatInput = this.formatInput.bind(this);
   //   this.handleChange = this.handleChange.bind(this);
      this.allowOnlyNumericsOrDigits = this.allowOnlyNumericsOrDigits.bind(this);

      this.companyIDEl = React.createRef();
      this.departmentEl = React.createRef();
      this.descriptionEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
    }






    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
       // alert(this.sexEl.current.value);

        const data = {
          companyID: EscapeStr(companyID),
          department: EscapeStr(this.departmentEl.current.value),
          description: EscapeStr(this.descriptionEl.current.value),
         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
        fetch(url+'/departmentNew', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( data )
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

            window.location.reload(false);
           };
          });
         // reset to null value

      // this.companyIDEl.current.value = companyID;
       this.departmentEl.current.value = "";
       this.descriptionEl.current.value = "";
    }



  }



    validate(){

      let str = this.departmentEl.current.value;
      let desc = this.descriptionEl.current.value;
       if (str.length<3) {
         alert("department ID must at least 3 digits of length");
         return false;
       }
       let  prod=this.departmentEl.current.value;
     for (let i = 0; i < prod.length; i++) {
         if (prod.substr(i,1) === ';') {
           alert("Department cannot contain (;) letter ");
           return false;
         }

     }

       if (desc.length === 0) {
          alert("Department Description must not empty");
          return false;
        }
       // Returns 12
       // let input = this.state.input;
       // let errors = {};
      //  let isValid = true;
    //   if (this.companyIDEl.current.value.length < 8){
    //   alert("Company ID must be from 8 - 20 character");
     //  return false;
     //  }

      return true;
    }

 allowOnlyNumericsOrDigits(e) {
         e = (e) ? e : window.event;
		const charCode = e.which ? e.which : e.keyCode;
        alert(charCode);
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			this.setState({ error: 'OOPs! Only numeric values or digits allowed' });
		}
	};

//  handleChange(e) {
 //   this.setState({ value: e.target.value});
 // }

//handleBlur(e) {
//  var num = parseFloat(this.state.value);
//  var cleanNum = num.toFixed(2);
//  this.setState({value: cleanNum});
//}


onValueChange = (event) => {
  this.setState({value:event.target.value})
}



  handleInputChange(event) {
    console.log(event.target.value)
    this.setState({
      number: event.target.value
    })
  }








    render() {
        const mystyle = {
            color: "BLACK",
            backgroundColor: "#ffffff",
            padding: "5px 15px 10px 10px",
            alignItems: "left",
            fontFamily: "Arial",



        };
  //  const toInputLowercase = e => {
  //  e.target.value = ("" + e.target.value).toLowerCase();
  //  };

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
          padding: "20px 15px 10px 10px",
          fontFamily: "Arial",

      };
      const logstyle = {
          color: "white",
          backgroundColor: "red",
          padding: "2px 15px 10px 10px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          width: '6em',
          height: '3em',

      };

      const onCancel= () => {
        this.departmentEl.current.value = "000";
        this.descriptionEl.current.value = "";
     };








      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
          <fieldset>

           <h1>Department Profile Maintenance</h1>
           <label>Company ID:
           <input type="text" ref={companyID} name="company_id" placeholder={companyID} readOnly= {true} required />

           </label>
           <label>Department ID :
           <input type="text" ref={this.departmentEl} name="department"
             onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
            }} maxLength={3} placeholder="000" className="smaller-input" required = {true} />

          </label>

           <label>Department Description :
          <input type="text" maxLength={100} ref={this.descriptionEl} name="description" required = {true} />
          </label>


          </fieldset>

           <p>
           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Add New" />
           <button style={buttonStyle} onClick={onCancel}>Clear</button>
           <button style={subStyle} onClick={event =>  window.location.href='DepartmentList'} >Back</button>
           </p>



        </form>
      )
    }
  };

export default DepartmentNew;
