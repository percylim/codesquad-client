import  React from 'react';
// mport validator from 'validator'
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
//import Axios from "axios";
// import departmentList from './departmentList';
 import  './UserProfile.css';
 //require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var lastSix = '';
const companyID = localStorage.getItem('companyID');
//var userLevel = localStorage.getItem('userLevel');
// const companyName = localStorage.getItem('companyName')
// var eDate = '';
//  var sDate = '';
var taxtype = 'INPUT';
class GstNew extends React.Component {
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
        taxtype: 'INPUT',


      };


      this.handleInputChange = this.handleInputChange.bind(this);
      this.formatInput = this.formatInput.bind(this);
   //   this.handleChange = this.handleChange.bind(this);
      this.allowOnlyNumericsOrDigits = this.allowOnlyNumericsOrDigits.bind(this);

     // this.companyIDEl = React.createRef();
      this.taxIDEl = React.createRef();
      this.taxTypeEl = React.createRef();
      this.taxCodeEl = React.createRef();
      this.taxDescriptionEl = React.createRef();
      this.taxRateEl = React.createRef();
      this.remarkEl = React.createRef();
      this.taxCodeEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
     this.formatInput = this.formatInput.bind(this);
     this.handleChangeType = this.handleChangeType.bind(this);

    }


    handleChangeType(event) {

      this.setState({taxtype: event.target.value});
      taxtype = event.target.value;
     // alert(taxtype);
      if (taxtype === 'FOT') {
        this.setState({number: 0.00});
       // alert(number);
      }
    //  alert(taxtype);
     // this.sexEl.current.value=value;
    //  alert(sex);
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
          taxType: EscapeStr(taxtype),
          taxCode: EscapeStr(this.taxCodeEl.current.value.toUpperCase()),
          taxDescription: EscapeStr(this.taxDescriptionEl.current.value),
          taxRate: EscapeStr(this.taxRateEl.current.value),
          remark: EscapeStr(this.remarkEl.current.value),

         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
        fetch(url+'/taxNew', {
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
    this.taxIDEl.current.value = " ";
    this.taxCodeEl.current.value = '';
    this.taxDescriptionEl.current.value = "";
    this.taxRateEl.current.value = 0.00;
    this.remarkEl.current.value = "";

    }



  }



    validate(){

      let str = this.taxIDEl.current.value;
      let tcode = this.taxCodeEl.current.value;
      let desc = this.taxDescriptionEl.current.value;
      let gRate = this.taxRateEl.current.value;
       if (str.length<3) {
         alert("Tax ID must at least 3 digits of length");
         return false;
       }
    //   if (tcode.length<1) {
    //    alert("Tax Code must at least 1 character of length");
    //    return false;
    //  }
       if (desc.length === 0) {
          alert("Tax Description must not empty");
          return false;
        };
       // alert(gRate);
        if (gRate > 999 )  {
            alert("Tax Rate must not more than 999.00");
            return false
         };


         if (gRate < 0 )  {
            alert("Tax Rate must not Negative");
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
          padding: "3px 15px 10px 12px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          width: '6em',
          height: '3em',

      };





     const onCancel= () => {
        this.taxIDEl.current.value = "";
        this.taxCodeEl.current.value='';
        this.taxDescriptionEl.current.value = "";
        this.taxRateEl.current.value = 0.00;
        this.remarkEl.current.value = "";
    };






      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
          <fieldset>
           <label>
           <h1>Goods And Services Tax Profile Maintenance</h1>

           </label>

           <label style={{paddingRight: '50px'}}>GST ID :
           <input class="text-uppercase" minlength={3} maxLength={10} ref={this.taxIDEl} name="taxID" required ={true} />

          </label>

           <label style={{paddingRight: '200px'}}> GST Description :
          <input type="text" maxLength={100} ref={this.taxDescriptionEl} name="description" required = {true} />
          </label>


          <label className='radio' style={{paddingRight: '590px'}} component="accttype">Tax Type :

              <td style={{color: 'black'}}>
              <input type="radio"  value="INPUT" name="taxtype"  onChange={this.handleChangeType} ref={this.taxTypeEl} checked={this.state.taxtype === 'INPUT'} />GST Input Tax
              </td>
              <td style={{color: 'red'}}>
               <input style={{color: 'red'}} type="radio" value="OUTPUT" name="taxtype" onChange={this.handleChangeType} ref={this.taxTypeEl} checked={this.state.taxtype === 'OUTPUT'} />GST Output Tax
               </td>
              <td style={{color: 'blue', paddingLeft: '20px' }}>
               <input type="radio" value="FOT" name="taxtype" onChange={this.handleChangeType} ref={this.taxTypeEl} checked={this.state.taxtype === 'FOT'} />Free Tax
               </td>

            </label>
            <p></p>
            <label style={{paddingRight: '10px'}}> Tax Code :
          <input class="text-uppercase" style={{width: '250px'}} type="text" minLength={2} maxLength={20} ref={this.taxCodeEl} name="taxcode" required = {true} />
          </label>

          <label style={{paddingRight: '165px'}}> Tax Rate (%) :
          <input type="number"  value={ this.state.number } defaultValue='0.00' onChange={ this.handleInputChange }
          onBlur={ this.formatInput } maxLength={5} placeholder="0.00" ref={this.taxRateEl}   name="taxrate" required = {false} />
          </label>

          <label style={{paddingRight: '10px'}}> Remark :
          <input type="text" maxLength={100} ref={this.remarkEl} name="remark" required = {false} />
          </label>
          </fieldset>

           <p>
           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Add New" />
           <button style={buttonStyle} onClick={onCancel}>Clear</button>
           <button style={subStyle} onClick={event =>  window.location.href='gstProfile'} >Back</button>
           </p>



        </form>
      )
    }
  };

export default GstNew;
