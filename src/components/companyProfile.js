import  React from 'react';
//import { DATE } from 'sequelize/types';
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
import  './Profile.css';
//import Nav from 'react-bootstrap/Nav';
//import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from "axios";
// import Moment from 'react-moment';
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var lastSix = '';
var date = new Date();
var  today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
var companyID = localStorage.getItem('companyID');
const companyName = localStorage.getItem('companyName');
const body = {
  companyID : companyID,
};
 var eDate = '';
  var sDate = '';
  var imgID = '';
  //var price = 0;
  var imageID = '';

   var imgData = [];
  //var loadImg = '';
   var img = '';

class CompanyProfile extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the DOM element
     // this.state = { usersCollection: [] };
      this.state = {
        input: {},
        errors: {},
        data: [],
        imgData: [],
        imgID: '',
        loadImg: [],
        img: '',
        imageID: '',

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
      this.businessCodeEl = React.createRef();
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
      this.imageIDEl = React.createRef();
      this.bankAccountEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeImg = this.handleChangeImg.bind(this);

    }
    componentDidMount() {
      Axios({
        method: 'post',
        url: url+'/imageInfo',
        data: body
      })
      .then(res => {
        console.log(res);
        imgData = res.data;
     //   let img = 'http://localhost:9005/fetchImage/'+imgData[0].imageID;
     //   imgID = imgData[0].imageID;
        this.setState({ imgID: img });
        // window.alert(data[1].description);
      });

    };

    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
      //   alert(this.gstNoEl.current.value);

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
          businessCode: EscapeStr(this.businessCodeEl.current.value).toUpperCase(),
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
          companyLogo: this.state.imageID,
          bankAccount: this.bankAccountEl.current.value,
         };
         companyID = localStorage.getItem('companyID');
         //var name1 =  EscapeStr(user.companyName);
      //  alert(this.state.imageID);
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
            localStorage.setItem('registerNo', user.registerNo);
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
        this.businessCodeEl.current.value = '';
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
        this.bankAccountEl.current.value = "";
    }



  }



    validate(){
    //  alert(this.finYearStartEl.current.value);
       if (this.registerNoEl.current.value === '') {
        alert('Company Register is blank');
        return false;

    }

         if (this.finYearStartEl.current.value === '') {
          alert('Company Starting Date must select');
          return false;
         }
         if (this.finYearEndEl.current.value === '') {
          alert('Company Ending Date must select');
          return false;
         }


      return true;
    }

 allowOnlyNumericsOrDigits(e) {
		const charCode = e.which ? e.which : e.keyCode;

		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			this.setState({ error: 'OOPs! Only numeric values or digits allowed' });
		}
	};

  handleChangeImg(e) {


    imgID = e.target.value;
    imageID = e.target.value;

    this.setState({ imageID: imgID });
    let img = url+'/fetchImage/'+imgID;
    this.setState({ imgID: img })
   // alert(imgID);
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
       this.businessCodeEl.current.value= data[0].businessCode;
       this.incomeTaxNoEl.current.value = data[0].incomeTaxNo;
       this.epfNoEl.current.value = data[0].epfNo;
       this.socsoNoEl.current.value = data[0].socsoNo;
       this.gstNoEl.current.value = data[0].gstNo;
       this.telNo1El.current.value = data[0].telNo1;
       this.telNo2El.current.value = data[0].telNo2;
       this.faxNoEl.current.value = data[0].faxNo;
       this.emailEl.current.value = data[0].email;
       this.websiteEl.current.value = data[0].website;
     //  this.imageIDEl.current.value = data[0].companyLogo;
      // this.finYearStartEl.current.value = data[0].finYearStart;
      // this.finYearEndEl.current.value = data[0].finYearEnd;
       //Do anything else like Toast etc.
      // alert(today);
      imageID=data[0].companyLogo;
      this.setState({ imageID: data[0].companyLogo });
      let img = url+'/fetchImage/'+data[0].companyLogo;
      this.setState({ imgID: img });
      this.bankAccountEl.current.value = data[0].bankAccount;

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
          display: 'flex',
          marginLeft: '550px',
      };


   const subStyle = {
          color: "white",
          backgroundColor: "blue",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",
          display: 'flex',
          marginLeft: '130px',

      };

      const logstyle = {
          color: "white",
          backgroundColor: "red",
          padding: "5px 10px 5px 10px",
          fontFamily: "Arial",
          display: 'flex',
           marginLeft : '0px',
           justifyContent: 'center',


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
        this.businessCodeEl.current.value = "";
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
           style={{marginLeft: '5.3rem', border: '1px solid #696969'}}
           minlength={8} maxLength={20} pattern="^[a-z]+$" ref={companyID} name="company_id" placeholder={companyID} readOnly= {true}/>
           </label>

           <label style={{paddingLeft: '0px'}} >Company Name :
          <input type="text" style={{marginLeft: '3.6rem', border: '1px solid #696969'}} maxLength={200} ref={companyName} name="company_name" placeholder={companyName} readOnly= {true} />

            </label>
          <label style={{paddingLeft: '0px'}}>Company Register No. :
          <input class="text-uppercase" style={{marginLeft: '.4rem', border: '1px solid #696969'}} type="text" maxLength={50} ref={this.registerNoEl} name="registerNo" required/>
          </label>
          <label style={{paddingLeft: '0px'}}>Company Address #1 :
          <input type="text" style={{marginLeft: '1rem', border: '1px solid #696969'}} maxLength={200} ref={this.address1El} name="address1" required />
          </label>
          <label style={{paddingLeft: '0px'}}>Company Address #2 :
          <input type="text" style={{marginLeft: '1rem', border: '1px solid #696969'}} maxLength={200} ref={this.address2El} name="address2" />
          </label>
          <label style={{paddingLeft: '0px'}}>City :
          <input type="text" style={{marginLeft: '9.7rem', border: '1px solid #696969'}} maxLength={50} ref={this.cityEl} name="city" required />
          </label>
          <label style={{paddingLeft: '0px'}}>State :
          <input type="text" style={{marginLeft: '9.1rem', border: '1px solid #696969'}} maxLength={50} ref={this.stateEl} name="state" required />
          </label>
          <label style={{paddingLeft: '0px'}}>Post Code :
          <input type="text" style={{marginLeft: '6.5rem', border: '1px solid #696969'}} maxLength={50} ref={this.postcodeEl} name="postcode" required />
          </label>
          <label style={{paddingLeft: '0px'}}>Country :
          <input type="text" style={{marginLeft: '7.8rem', border: '1px solid #696969'}} maxLength={50} ref={this.countryEl} name="country" required />
          </label>
          <label style={{paddingLeft: '0px'}}>Business Code :
          <input class="text-uppercase" type="text" style={{marginLeft: '4.4rem', border: '1px solid #696969'}} maxLength={50} ref={this.businessCodeEl} name="businessCode" />
          </label>
          <label style={{paddingLeft: '0px'}}>Income Tax No. :
          <input class="text-uppercase" type="text" style={{marginLeft: '4.2rem', border: '1px solid #696969'}} maxLength={50} ref={this.incomeTaxNoEl} name="incomeTaxNo" />
          </label>
          <label style={{paddingLeft: '0px'}}>EPF No. :
          <input class="text-uppercase" type="text" style={{marginLeft: '7.7rem', border: '1px solid #696969'}} maxLength={50} ref={this.epfNoEl} name="epfo" />
          </label>
          <label style={{paddingLeft: '0px'}}>SOCSO No. :
          <input class="text-uppercase" type="text" style={{marginLeft: '5.8rem', border: '1px solid #696969'}} maxLength={50} ref={this.socsoNoEl} name="socsooNo" />
          </label>
          <label style={{paddingLeft: '0px'}}>GST/SST No. :
          <input class="text-uppercase" type="text" style={{marginLeft: '5.1rem', border: '1px solid #696969'}} maxLength={50} ref={this.gstNoEl} name="gstNo" />
          </label>
          <label style={{paddingLeft: '0px'}}>Telephone No. #1 :
          <input type="text" style={{marginLeft: '3.2rem', border: '1px solid #696969'}} maxLength={20} ref={this.telNo1El} name="telNo1" />
          </label>
          <label style={{paddingLeft: '0px'}}>Telephone No. #2 :
          <input type="text" style={{marginLeft: '3.2rem', border: '1px solid #696969'}} maxLength={20} ref={this.telNo2El} name="telNo2" />
          </label>
          <label style={{paddingLeft: '0px'}}>Fax No.
          <input type="text" style={{marginLeft: '8.6rem', border: '1px solid #696969'}}  maxLength={50} ref={this.faxNoEl} name="faxNo" />
          </label>
          <label style={{paddingLeft: '0px'}}> Company Email :
          <input type="email"  style={{marginLeft: '4.1rem', border: '1px solid #696969'}} maxLength={100} ref={this.emailEl} name="email"/>
          </label>
          <label style={{paddingLeft: '0px'}}> Company Website :
          <input type="text" style={{marginLeft: '2.9rem', border: '1px solid #696969'}} maxLength={200} ref={this.websiteEl} name="website"/>
          </label>
           <label style={{paddingLeft: '0px'}}> Financial Starting Date :
           <input type="date" style={{width: '17%', marginLeft: '.8rem', border: '1px solid #696969'}} ref={this.finYearStartEl} required />
           </label>
           <label style={{paddingLeft: '0px'}} maxLength={10}> Financial Ending Date :
           <input type="date" style={{width: '17%', marginLeft: '1.3rem', border: '1px solid #696969'}} maxLength={10} ref={this.finYearEndEl} defaultValue={eDate} required />
           </label>
           <label style={{paddingLeft: '0px'}} maxLength={255}> Bank Account :
           <input class="text-uppercase" type="text" style={{ marginLeft: '5.4rem', border: '1px solid #696969'}} maxLength={150} ref={this.bankAccountEl} defaultValue={eDate} required />
           </label>
            <p></p>
           <div className="select-container" >
          <label style={{paddingLeft: '0px'}}>Company Logo :
          <select style={{marginLeft: '4.8rem'}} value={this.state.imageID} onChange={this.handleChangeImg}>
            {imgData.map((item) => (
              <option ref={this.imageIDEl} value={item.imageID} eventkey={item.imageID}  required> {item.imageID}</option>

           ))}


          </select>
          <img src={this.state.imgID} alt='Display' style={{paddingLeft: '10px'}} />

          </label>


          </div>
            <p></p>

           </fieldset>
           <p></p>
           <p></p>
           <p></p>
           <p>


           <td><button style={{ backgroundColor: "red", color: "white", width: '100px', marginLeft: '0rem' }} onClick={this.handleSubmit}>Submit</button></td>
           <td><button style={{ backgroundColor: "blue", color: "white", width: '300px' }} onClick={this.loadCompanyInfo}>Load Company Information</button></td>
            <td><button style={{ backgroundColor: "yellow", color: "black", width: '100px' }} onClick={onCancel}>Clear</button></td>

           </p>
           <p></p>
           <div >

          </div>

        </form>
      )
    }
  };

export default CompanyProfile;
