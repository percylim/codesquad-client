import  React from 'react';
//import { DATE } from 'sequelize/types';
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
import  './Profile.css';
//import Nav from 'react-bootstrap/Nav';
//import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//import Axios from "axios";
// import Moment from 'react-moment';
require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var lastSix = '';
var date = new Date();
var  today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
var companyID = localStorage.getItem('companyID');
const companyName = localStorage.getItem('companyName');
 var eDate = '';
  var sDate = '';
class CompanyProfile extends React.Component {
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
      this.socsoNoEl = React.createRef();
      this.gstNoEl = React.createRef();
      this.telNo1El = React.createRef();
      this.telNo2El = React.createRef();
      this.faxNoEl = React.createRef();
      this.emailEl = React.createRef();
      this.websiteEl = React.createRef();
      this.finYearStartEl = React.createRef();
      this.finYearEndEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
         alert(this.gstNoEl.current.value);

        const user= {
          companyID: EscapeStr(companyID),
          companyName: EscapeStr(companyName),
          registerNo: EscapeStr(this.registerNoEl.current.value).toUpperCase(),
          address1: EscapeStr(this.address1El.current.value),
          address2: EscapeStr(this.address2El.current.value),
          city: EscapeStr(this.cityEl.current.value),
          state: EscapeStr(this.stateEl.current.value),
          postcode: this.postcodeEl.current.value,
          country: EscapeStr(this.countryEl.current.value),
          incomeTaxNo: EscapeStr(this.incomeTaxNoEl.current.value).toUpperCase(),
          epfNo: EscapeStr(this.epfNoEl.current.value).toUpperCase(),
          socsoNo: EscapeStr(this.socsoNoEl.current.value).toUpperCase(),
          gstNo: EscapeStr(this.gstNoEl.current.value).toUpperCase(),
          telNo1: EscapeStr(this.telNo1El.current.value),
          telNo2: EscapeStr(this.telNo2El.current.value),
          faxNo: EscapeStr(this.faxNoEl.current.value),
          email: EscapeStr(this.emailEl.current.value),
          website: EscapeStr(this.websiteEl.current.value),
          finYearStart: this.finYearStartEl.current.value,
          finYearEnd: this.finYearEndEl.current.value,
         };
         companyID = localStorage.getItem('companyID');
         //var name1 =  EscapeStr(user.companyName);
    //    alert(url);
        fetch(url+'/companyUpdate', {
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

       // this.companyNameEl.current.value = "";
        this.registerNoEl.current.value = "";
        this.address1El.current.value = "";
        this.address2El.current.value = "";
        this.cityEl.current.value = "";
        this.stateEl.current.value = "";
        this.postcodeEl.current.value = "";
        this.countryEl.current.value = "";
        this.incomeTaxNoEl.current.value = "";
        this.epfNoEl.current.value = "";
        this.socsoNoEl.current.value = "";
        this.gstNoEl.current.value = "";
        this.telNo1El.current.value = "";
        this.telNo2El.current.value = "";
        this.faxNoEl.current.value = "";
        this.emailEl.current.value = "";
        this.websiteEl.current.value = "";
        this.finYearStartEl.current.value = "";
        this.finYearEndEl.current.value = "";
    }



  }



    validate(){

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
		const charCode = e.which ? e.which : e.keyCode;

		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			this.setState({ error: 'OOPs! Only numeric values or digits allowed' });
		}
	};



 loadCompanyInfo = (e) => {
   //  alert(url);

  fetch(url+'/companyData', {

    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify( {companyID: companyID} )
   }).then(response=>response.json()).then(data=>{
      // this.finYearStart = new Date(data[0].finYearStart).toLocaleDateString('en-GB');

      // window.alert(this.finYearStart);

       this.registerNoEl.current.value = data[0].registerNo;
       this.address1El.current.value = data[0].address1;
       this.address2El.current.value = data[0].address2;
       this.cityEl.current.value = data[0].city;
       this.stateEl.current.value = data[0].state;
       this.postcodeEl.current.value = data[0].postCode;
       this.countryEl.current.value = data[0].country;
       this.incomeTaxNoEl.current.value = data[0].incomeTaxNo;
       this.epfNoEl.current.value = data[0].epfNo;
       this.socsoNoEl.current.value = data[0].socsoNo;
       this.gstNoEl.current.value = data[0].gstNo;
       this.telNo1El.current.value = data[0].telNo1;
       this.telNo2El.current.value = data[0].telNo2;
       this.faxNoEl.current.value = data[0].faxNo;
       this.emailEl.current.value = data[0].email;
       this.websiteEl.current.value = data[0].website;
      // this.finYearStartEl.current.value = data[0].finYearStart;
      // this.finYearEndEl.current.value = data[0].finYearEnd;
       //Do anything else like Toast etc.
      // alert(today);
      var cur
      var curr
       if ( data[0].finYearStart === '') {
        sDate=today;
        cur= new Date(today);

       } else {


       var cur = new Date(data[0].finYearStart);
       }
      // alert(data[0].finYearStart);

       cur.setDate(cur.getDate());
       sDate = cur.toISOString().substr(0,10);

      // alert(sDate);
       this.finYearStartEl.current.value = sDate;

       if (data[0].finYearEnd === '') {
           curr = new Date(today);

       } else {

       var curr = new Date(data[0].finYearEnd);
       }
       curr.setDate(curr.getDate());
       eDate = curr.toISOString().substr(0,10);

      // var cur = new Date(data[0].finYearEnd);

      //eDate = cur.toLocaleDateString();
      // Moment(new Date(eDate)).format('dd/mm/yyyy')
      this.finYearEndEl.current.value = eDate;

      // window.alert(eDate);
   });









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
          padding: "5px 10px 5px 10px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,


      };
     // const labelStyle = {
    //    display:'inline-block',
    //    zoom:'1',              /* for IE7*/
    //    float: 'left',
    //    paddingTop: '5px',
    //    textAlign: 'right',
    //    width: '140px',
    //  };
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
        this.socsoNoEl.current.value = "";
        this.telNo1El.current.value = "";
        this.telNo2El.current.value = "";
        this.faxNoEl.current.value = "";
        this.emailEl.current.value = "";
        this.websiteEl.current.value = "";
        this.finYearStartEl.current.value = "";
        this.finYearEndEl.current.value = "";


     };







      return (


        <form style={mystyle}>
          <fieldset>

           <h1>Company Profile Maintenance</h1>




           <label style={{paddingLeft: '0px'}}>
           Company ID :
          <input onInput={toInputLowercase} type="text"
           minlength={8} maxLength={20} pattern="^[a-z]+$" ref={companyID} name="company_id" placeholder={companyID} readOnly= {true}/>
           </label>

           <label style={{paddingLeft: '0px'}} >Company Name :
          <input type="text" maxLength={200} ref={companyName} name="company_name" placeholder={companyName} readOnly= {true}/>
            </label>
          <label style={{paddingLeft: '0px'}}>Company Register No. :
          <input class="text-uppercase" type="text" maxLength={50} ref={this.registerNoEl} name="registerNo" required/>
          </label>
          <label style={{paddingLeft: '0px'}}>Company Address #1 :
          <input type="text" maxLength={200} ref={this.address1El} name="address1" required />
          </label>
          <label style={{paddingLeft: '0px'}}>Company Address #2 :
          <input type="text" maxLength={200} ref={this.address2El} name="address2" />
          </label>
          <label style={{paddingLeft: '0px'}}>City :
          <input type="text" maxLength={50} ref={this.cityEl} name="city" required />
          </label>
          <label style={{paddingLeft: '0px'}}>State :
          <input type="text" maxLength={50} ref={this.stateEl} name="state" required />
          </label>
          <label style={{paddingLeft: '0px'}}>Post Code :
          <input type="text" maxLength={50} ref={this.postcodeEl} name="postcode" required />
          </label>
          <label style={{paddingLeft: '0px'}}>Country :
          <input type="text" maxLength={50} ref={this.countryEl} name="country" required />
          </label>
          <label style={{paddingLeft: '0px'}}>Income Tax No. :
          <input class="text-uppercase" type="text" maxLength={50} ref={this.incomeTaxNoEl} name="incomeTaxNo" />
          </label>
          <label style={{paddingLeft: '0px'}}>EPF No. :
          <input class="text-uppercase" type="text" maxLength={50} ref={this.epfNoEl} name="epfo" />
          </label>
          <label style={{paddingLeft: '0px'}}>SOCSO No. :
          <input class="text-uppercase" type="text" maxLength={50} ref={this.socsoNoEl} name="socsooNo" />
          </label>
          <label style={{paddingLeft: '0px'}}>GST/SST No. :
          <input class="text-uppercase" type="text" maxLength={50} ref={this.gstNoEl} name="gstNo" />
          </label>
          <label style={{paddingLeft: '0px'}}>Telephone No. #1 :
          <input type="text" maxLength={20} ref={this.telNo1El} name="telNo1" />
          </label>
          <label style={{paddingLeft: '0px'}}>Telephone No. #2 :
          <input type="text" maxLength={20} ref={this.telNo2El} name="telNo2" />
          </label>
          <label style={{paddingLeft: '0px'}}>Fax No.
          <input type="text" maxLength={50} ref={this.faxNoEl} name="faxNo" />
          </label>
          <label style={{paddingLeft: '0px'}}> Company Email :
          <input type="email"  maxLength={100} ref={this.emailEl} name="email"/>
          </label>
          <label style={{paddingLeft: '0px'}}> Company Website :
          <input type="text" maxLength={200} ref={this.websiteEl} name="website"/>
          </label>
           <label style={{paddingLeft: '0px'}}> Financial Starting Date :
           <input type="date" style={{width: '17%'}} ref={this.finYearStartEl} required />
           </label>
           <label style={{paddingLeft: '0px'}} maxLength={10}> Financial Ending Date :
           <input type="date" style={{width: '17%'}} maxLength={10} ref={this.finYearEndEl} defaultValue={eDate} required />
           </label>


           </fieldset>

           <p>

           <button style={logstyle} onClick={this.handleSubmit}>Submit</button>
           <button style={buttonStyle} onClick={onCancel}>Clear</button>
           <button style={subStyle} onClick={this.loadCompanyInfo} >Load Company Infomation</button>
           </p>



        </form>
      )
    }
  };

export default CompanyProfile;
