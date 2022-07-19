import  React from 'react';
// mport validator from 'validator'
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
//import Axios from "axios";
// import PropTypes from "prop-types";

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
class EpfNew extends React.Component {
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
        value: '',
        value1: '',
      };


      this.handleInputChange = this.handleInputChange.bind(this);
      this.formatInput = this.formatInput.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.allowOnlyNumericsOrDigits = this.allowOnlyNumericsOrDigits.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
    //   this.countDecimals = this.countDecimals.bind(this);
     //  this.updateValue = this.updateValue.bind(this);
    //  this.handleBlur = this.handleBlur.bind(this);
    //  this.handleBlur1 = this.handleBlur1.bind(this);
    //  this.handleChange1 = this.handleChange1.bind(this);
    //  this.handleChange = this.handleChange.bind(this);


     // this.companyIDEl = React.createRef();
      this.startSalaryEl = React.createRef();
      this.endSalaryEl = React.createRef();
      this.companyRateEl = React.createRef();
      this.employeeRateEl = React.createRef();
      this.remarkEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
     this.formatInput = this.formatInput.bind(this);


    }






    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
       // alert(this.sexEl.current.value);

        const data = {

          companyID: EscapeStr(companyID),
          startSalary: this.startSalaryEl.current.value,
          endSalary: this.endSalaryEl.current.value,
          companyRate: this.companyRateEl.current.value,
          employeeRate: this.employeeRateEl.current.value,
          remark: EscapeStr(this.remarkEl.current.value),

         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
        fetch(url+'/epfNew', {
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
    this.startSalaryEl.current.value = 0.00;
    this.endSalaryEl.current.value = 0.00;
    this.companyRateEl.current.value = 0.00;
    this.employeeRateEl.current.value = 0.00;
    this.remarkEl.current.value = "";

    }



  }



    validate(){

      let sRate = this.startSalaryEl.current.value;
      let eRate = this.endSalaryEl.current.value;
      let comRate = this.companyRateEl.current.value;
      let empRate = this.employeeRateEl.current.value;

         if (sRate <= 0 )  {
            alert("Salary From  Rate must not equal or less than zero");
            return false
         };

         if (eRate <= 0 )  {
          alert("Salary To  Rate must not equal or less than zero");
          return false
       };

       if (comRate <= 0 )  {
        alert("Employer Pay Rate must not equal or less than zero");
        return false
     };
     if (empRate <= 0 )  {
      alert("Employee Pay Rate must not equal or less than zero");
      return false
   };

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

  formatInput() {
    const num = this.state.number
    this.setState({
        number: parseFloat(num).toFixed(2)
    })
  }


  handleCancel() {
    this.startSalaryEl.current.value = 0.00;
    this.endSalaryEl.current.value = 0.00;
    this.companyRateEl.current.value = 0.00;
    this.employeeRateEl.current.value = 0.00;
    this.remarkEl.current.value = "";

  };
/*
  countDecimals(value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
}

updateValue(e) {
    if(this.countDecimals(e.target.value) > 2) {
        //prevent user from inputting into box after the decimal place...
    }
}

  handleChange(e) {
    this.setState({ value: e.target.value });
  };


   handleBlur(e) {
  var num = parseFloat(this.state.value);
  var clearNum = num.toFixed(2);
  this.setState({value: clearNum});
};

handleBlur1(e) {
  var num = parseFloat(this.state.value1);
  var clearNum = num.toFixed(2);
  this.setState({value: clearNum});
};
*/
handleChange(e) {
  let num = e.target.value;
  let mynum = parseFloat(num).toFixed(2);
 //  alert(mynum);
   e.target.value = mynum;
};

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

//         const buttonStyle = {
 //         color: "black",
  //        backgroundColor: "yellow",
   //       padding: "10px 15px 10px 10px",
    //      fontFamily: "Arial",
     //     position: 'absolute',
     //     right: 350,
    //  };

   const subStyle = {
          color: "white",
          backgroundColor: "blue",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",

      };
      const logstyle = {
          color: "white",
          backgroundColor: "red",
          padding: "3px 15px 10px 17px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          width: '6em',
          height: '3em',

      };







      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
        <fieldset>

         <h1>Edit EPF Rate Maintenance</h1>

          <label style={{paddingRight: '100px'}}>Income From  :
        <input class="number"  maxLength={15}  ref={this.startSalaryEl}
        onBlur={ this.handleChange}  defaultValue='0.00' placeholder='0.00'   name="startSalary" required />
        </label>
         <label style={{paddingRight: '60px'}}>To Income :
        <input type="number"  maxLength={15} ref={this.endSalaryEl}
        onBlur={ this.handleChange} defaultValue='0.00' name="endSalary" placeholder='0.00'  required />
        </label>


        <label style={{paddingRight: '210px'}}>Employer Pay Rate :
        <input type="number" maxLength={15} ref={this.companyRateEl} onBlur={ this.handleChange} name="companyRate" placeholder='0.00' required />
        </label>



        <label style={{paddingRight: '210px'}}>Employee Pay Rate :
        <input type="number" maxLength={15} ref={this.employeeRateEl} onBlur={ this.handleChange} name="companyRate" placeholder='0.00' required />
        </label>

        <label style={{paddingRight: '0px'}}>Remark:
        <input type="text" maxLength={100} ref={this.remarkEl} name="remark"  />
        </label>

         </fieldset>


           <p>
           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Add New" />

           <button style={subStyle} onClick={event =>  window.location.href='epfList'} >Back</button>
           </p>



        </form>
      )
    }
  };

export default EpfNew;
