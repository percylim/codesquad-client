import  React from 'react';
// mport validator from 'validator'
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
import Axios from "axios";
// import departmentList from './departmentList';
 import  './UserProfile.css';
 require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var taxData = [];
var lastSix = '';
const companyID = localStorage.getItem('companyID');
var taxID = localStorage.getItem('taxID');
//var userLevel = localStorage.getItem('userLevel');
// const companyName = localStorage.getItem('companyName')
// var eDate = '';
//  var sDate = '';
class GstEdit extends React.Component {
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
      this.formatInput = this.formatInput.bind(this);
   //   this.handleChange = this.handleChange.bind(this);
      this.allowOnlyNumericsOrDigits = this.allowOnlyNumericsOrDigits.bind(this);

     // this.companyIDEl = React.createRef();
      this.taxIDEl = React.createRef();
      this.taxDescriptionEl = React.createRef();
      this.taxRateEl = React.createRef();
      this.remarkEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
     this.formatInput = this.formatInput.bind(this);

    }

    componentDidMount() {
      taxID = localStorage.getItem('taxID')
      const body = {
        companyID : companyID,
         taxID: taxID,
      };

     Axios({
      method: 'post',
      url: url+'/taxData',
      data: body
    })
    .then(res => {
      console.log(res);
      taxData = res.data;
      //alert(employee.employeeName);
      this.taxIDEl.current.value = taxData[0].taxID;
      this.taxDescriptionEl.current.value = taxData[0].taxDescription;
      this.taxRateEl.current.value = taxData[0].taxRate;
      this.remarkEl.current.value = taxData[0].remark;
    })
    .catch(function (error) {
      alert(error);
    });

    };








    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
       // alert(this.sexEl.current.value);

        const data = {
          companyID: EscapeStr(companyID),
          taxID: EscapeStr(this.taxIDEl.current.value.toUpperCase()),
          taxDescription: EscapeStr(this.taxDescriptionEl.current.value),
          taxRate: EscapeStr(this.taxRateEl.current.value),
          remark: EscapeStr(this.remarkEl.current.value),

         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
       fetch(url+'/taxUpdate', {
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
         //  alert(lastSix);

           if (lastSix === 'Success') {
             localStorage.setItem('taxID', '');
            window.location.href ='gstProfile';
          //  window.location.reload(false);
           };
          });
         // reset to null value

      // this.companyIDEl.current.value = companyID;
      // this.departmentEl.current.value = "";
      // this.descriptionEl.current.value = "";
    }



  }







    validate(){

      let str = this.taxIDEl.current.value;
      let desc = this.taxDescriptionEl.current.value;
      let gRate = this.taxRateEl.current.value;
       if (str.length<3) {
         alert("Tax ID must at least 3 digits of length");
         return false;
       }
       if (desc.length === 0) {
          alert("Tax Description must not empty");
          return false;
        };
       // alert(gRate);
        if (gRate > 999 )  {
            alert("Tax Rate must not more than 999.00");
            return false
         };

         if (gRate <= 0 )  {
            alert("Tax Rate must not equal or below zero");
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

 //        const buttonStyle = {
  //        color: "black",
  //        backgroundColor: "yellow",
  //        padding: "10px 15px 10px 10px",
  //        fontFamily: "Arial",
  //        position: 'absolute',
  //        right: 350,
  //    };

   const subStyle = {
          color: "white",
          backgroundColor: "blue",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",

      };
      const logstyle = {
          color: "white",
          backgroundColor: "red",
          padding: "3px 15px 10px 20px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          width: '6em',
          height: '3em',

      };




/*
     const onCancel= () => {
        this.taxIDEl.current.value = " ";
        this.taxDescriptionEl.current.value = "";
        this.taxRateEl.current.value = 0.00;
        this.remarkEl.current.value = "";
    };

     */




      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
          <fieldset>
           <label>
           <h1>Government Tax Profile Maintenance</h1>

           </label>

           <label style={{paddingRight: '50px'}}> Government Tax ID :
           <input class="text-uppercase" minlength={3} maxLength={10} ref={this.taxIDEl} name="taxID" required readOnly= {true}/>

          </label>

          <label style={{paddingRight: '200px'}}> Government Tax Description :
          <input type="text" maxLength={100} ref={this.taxDescriptionEl} name="description" required = {true} />
          </label>

          <label style={{paddingRight: '165px'}}> Government Tax Rate (%) :
          <input type="number"  value={ this.state.number } defaultValue='0.00' onChange={ this.handleInputChange }
          onBlur={ this.formatInput } maxLength={5} placeholder="0.00" ref={this.taxRateEl}   name="taxrate" required = {true} />
          </label>

          <label style={{paddingRight: '10px'}}> Remark :
          <input type="text" maxLength={100} ref={this.remarkEl} name="remark" required = {false} />
          </label>
          </fieldset>

           <p>
           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Update" />

           <button style={subStyle} onClick={event =>  window.location.href='gstProfile'} >Back</button>
           </p>



        </form>
      )
    }
  };

export default GstEdit;
