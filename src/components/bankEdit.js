import  React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
import Axios from "axios";

 import  './UserProfile.css';
 //require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var lastSix = '';
var  bankData = [];
var glData = [];
var jeNo = ''
var jeSub = '';
var jeDep = '';
var jeName = '';
var jeType = '';
var glNo = '';
var glAcctNo  = '';
 var glSubNo = '';
 var glDepart = '';
 var glName = '';
 var glType = '';
 var vID = 0;
const companyID = localStorage.getItem('companyID');
// var userLevel = localStorage.getItem('userLevel');
var bankID = localStorage.getItem('bankID')
// var eDate = '';
//  var sDate = '';
class BankEdit extends React.Component {
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
        glData: [],
        jeNo: '',
        jeSub: '',
        jeDep: '',
        jeName: '',
        jeType: '',
        vID: 0,
      };


      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleChangeGl = this.handleChangeGl.bind(this);
      //   this.formatInput = this.formatInput.bind(this);
   //   this.handleChange = this.handleChange.bind(this);
      this.allowOnlyNumericsOrDigits = this.allowOnlyNumericsOrDigits.bind(this);


      this.bankIDEl = React.createRef();
      this.bankNameEl = React.createRef();
      this.bankAcctNoEl = React.createRef();
      this.address1El = React.createRef();
      this.address2El = React.createRef();
      this.postcodeEl = React.createRef();
      this.cityEl = React.createRef();
      this.stateEl = React.createRef();
      this.countryEl = React.createRef();
      this.tel1El = React.createRef();
      this.tel2El = React.createRef();
      this.faxEl = React.createRef();
      this.emailEl = React.createRef();
      this.idEl = React.createRef();
      this.glNoEl = React.createRef();
      this.glSubEl = React.createRef();
      this.departmentEl = React.createRef();
      this.glNameEl = React.createRef();
      this.glTypeEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);


    }


    componentDidMount() {
        bankID = localStorage.getItem('bankID');
      Axios
      .get(url+`/assetGlList`,
        {
         params: {
                 companyID: companyID,
                }
        }
      )
          .then(res => {
            console.log(res);

            glData = res.data;
             this.setState({glData: res.data});
            glAcctNo = glData[0].glNo;
            glSubNo =  glData[0].glSub;

        //    glDepart = glData[0].department;
            glName = glData[0].glName;
            glDepart = glData[0].department;
            glType = glData[0].glType;         // glDesc = glData[0].glDescription;
            // alert(glName);
             glNo = glData[0].glNo;

           //  vID = glData[0].id;
             // vID = 2;
          //   alert(vID);
          //   setGlData({ glAcctNo: glAcctNo });

            this.setState({jeNo:glAcctNo});
            this.setState({jeSub:glSubNo});
            this.setState({jeDep:glDepart});
            this.setState({jeName:glName});
            this.setState({jeType:glType});
        //   alert(this.jeName)
            //  this.setState({vID:0});
        //    this.idEl.current.value = vID;
          //   this.glNoEl.current.value = glData[0].glNo;
          //   this.glSubEl.current.value = glData[0].glSub;
          //   this.departmentEl.current.value = glData[0].department;
          //   this.glNameEl.current.value = glData[0].glName;
          //   this.glTypeEl.current.value = glData[0].glType;
       ///  setState(vID: glData[0].id)
                 //  setParticular("");
         //   setJeDesc(glDesc);

           // this.setGlData({ glNo: glAcctNo});
            // window.alert(data[1].description);
          });
        //  this.GlData = result.data;







        bankID = localStorage.getItem('bankID');
        //alert(bankID);
        const body = {
          companyID : companyID,
          bankID: bankID,
        };

       Axios({
        method: 'post',
        url: url+'/bankData',
        data: body
      })
      .then(res => {
        console.log(res.data);
        bankData = res.data;
        this.setState({bankData: res.data});
        //alert(employee.employeeName);
        this.bankIDEl.current.value = bankData[0].bankID;
        this.bankNameEl.current.value = bankData[0].bankName;
        this.bankAcctNoEl.current.value = bankData[0].bankAcctNo;
        this.address1El.current.value = bankData[0].address1;
        this.address2El.current.value = bankData[0].address2;
        this.postcodeEl.current.value = bankData[0].postcode;
        this.cityEl.current.value = bankData[0].city;
        this.stateEl.current.value = bankData[0].state;
        this.countryEl.current.value = bankData[0].country;
        this.tel1El.current.value = bankData[0].tel1;
        this.tel2El.current.value = bankData[0].tel2;
        this.faxEl.current.value = bankData[0].fax;
        this.emailEl.current.value = bankData[0].email;

          // Level = employee[0].level;
      //  alert(glData.length);
      if  (glData.length ===0) {
           window.location = '/bankEdit';
      }
       // require to check the glNo and glSub match and assign vID with select id
       for (let i = 0; i < glData.length; i++) {
          // alert(glData[i].glNo+glData[i].glSub+" === "+bankData[0].glNo+bankData[0].glSub);
         if (bankData[0].glNo+bankData[0].glSub === glData[i].glNo+glData[i].glSub) {
             let ID = glData[i].id;
             vID = ID;
            // this.idEl.current.value=ID;
              // alert(ID);
           // this.state.vID = glData[i].id;
          //   this.setState(vID: ID );
             this.setState({vID: ID});
           this.setState({jeNo:glData[i].glNo});
            this.setState({jeSub:glData[i].glSub});
            this.setState({jeDep:glData[i].department});
            this.setState({jeName:glData[i].glName});
            this.setState({jeType:glData[i].glType});


          // this.state.vID = ID;
           this.handleChangeGl(ID);

         }

       }

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
            bankID: EscapeStr(this.bankIDEl.current.value.toUpperCase()),
            bankName: EscapeStr(this.bankNameEl.current.value),
            bankAcctNo:EscapeStr(this.bankAcctNoEl.current.value.toUpperCase()),
            address1: EscapeStr(this.address1El.current.value),
            address2: EscapeStr(this.address2El.current.value),
            postcode: this.postcodeEl.current.value,
            city: EscapeStr(this.cityEl.current.value),
            state: EscapeStr(this.stateEl.current.value),
            country: EscapeStr(this.countryEl.current.value),
            tel1: EscapeStr(this.tel1El.current.value),
            tel2: EscapeStr(this.tel2El.current.value),
            fax: EscapeStr(this.faxEl.current.value),
            email: EscapeStr(this.emailEl.current.value),
            glNo: EscapeStr(this.glNoEl.current.value),
            glSub: EscapeStr(this.glSubEl.current.value),
            department: EscapeStr(this.departmentEl.current.value),
            glName: EscapeStr(this.glNameEl.current.value),
             glType: EscapeStr(this.glTypeEl.current.value),



         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
        fetch(url+'/bankUpdate', {
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
             localStorage.setItem('bankID', '');
            window.location.href ='bankList';
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

        if (this.bankNameEl.current.value ==="") {
            alert("BankN ame Must not blank");
            return false;
         };

         if (this.bankAcctNoEl.current.value ==="") {
            alert("Bank Account No. Must not blank");
            return false;
         };

         if (this.glNoEl.current.value ==="") {
          alert("No Bank G/L Account selected");
          return false;
        };

        if (this.glSubEl.current.value ==="") {
          alert("Bank G/L Account Sub is blank");
          return false;
        };


         if (this.glTypeEl.current.value !=="401") {
          alert("Bank G/L Account Type must be 401");
          return false;
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





handleChangeGl(e) {
  var ID = 0;
  if (typeof e === 'object') {
  //  alert(e.target.value);
     ID = Number(e.target.value);
  } else {
     ID = e;
  }


  // alert(typeof ID);
   // glAcctNo = e.target.value;

   // const  cGlNo = glAcctNo.substr(8,4);
   // const  cGlSub = glAcctNo.substr(26,3);
   //  const cDep = glAcctNo.substr(43,3);
   //  const cName = glAcctNo.substr(49,glAcctNo.length-50);

    // this.setState({jeName:glName});
    // this.setState({jeNo:cGlNo});
    // this.setState({jeSub:cGlSub});
    // this.setState({jeDep:cDep});
    // this.setState({jeName:cName});
     for (let i = 0; i < glData.length; i++) {
       //  alert(glData[i].id);
       //  alert(ID);
      if (glData[i].id === ID) {
         //  alert(" Here "+glData[i].glName);
        let cGlNo = glData[i].glNo;
         let cGlSub= glData[i].glSub;
         let cDep = glData[i].department;
         let cName = glData[i].glName;
         let cType = glData[i].glType
       //  this.setState({jeNo:cGlNo});
       // this.setState({jeSub:cGlSub});
       // this.setState({jeDep:cDep});
       // this.setState({jeName:cName});
          this.glNoEl.current.value = cGlNo;
          this.glSubEl.current.value = cGlSub;
          this.glNameEl.current.value = cName;
          this.departmentEl.current.value = cDep;
          this.glTypeEl.current.value = cType;
      }
    }
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

    //     const buttonStyle = {
    //      color: "black",
    //      backgroundColor: "yellow",
     //     padding: "10px 15px 10px 10px",
      //    fontFamily: "Arial",
      //    position: 'absolute',
      //    right: 350,
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
          padding: "2px 15px 10px 20px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          width: '6em',
          height: '3em',

      };
/*
      const onCancel= () => {


        this.bankNameEl.current.value = "";
        this.address1El.current.value = "";
        this.address2El.current.value = "";
        this.postcodeEl.current.value = "";
        this.cityEl.current.value = "";
        this.stateEl.current.value = "";
        this.countryEl.current.value = "";
        this.tel1El.current.value = "";
        this.tel2El.current.value = "";
        this.faxEl.current.value = "";
        this.emailEl.current.value = "";
        this.gl_acctEl.current.value = "";;
        this.gl_subEl.current.value = "";
     };

*/





      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
          <fieldset>

          <h1>Edit Bank Profile </h1>
         <label style={{paddingRight: '60px'}}>Bank ID :
        <input class="text-uppercase" minlength={4} maxLength={20} ref={this.bankIDEl} name="bamkID" required readOnly= {true}/>
        </label>

        <label style={{paddingRight: '120px'}}>Bank Name :
   <Tooltip
        title="Type new or change Bank Name with maximum 200 characters"
        placement="top"
        >  
        <input type="text" maxLength={200} ref={this.bankNameEl} name="bankName" required/>
   </Tooltip>
        </label>

        <label style={{paddingRight: '220px'}}>Bank Account No. :    
  <Tooltip
        title="Type new pr change Bank Account No. with maximum 200 characters"
        placement="top"
        >  
        <input class="text-uppercase" maxLength={200} ref={this.bankAcctNoEl} name="bankAcctNo"  required />     
  </Tooltip>
        </label>

        <label style={{paddingRight: '90px'}}>Address #1 :
      
        <Tooltip
        title="Type new or change Bank Address #1 with maximum 200 characters"
        placement="top"
        >  
        <input type="text" maxLength={200} ref={this.address1El} name="address1" />
     </Tooltip>
        </label>
     
        <label style={{paddingRight: '90px'}}>Address #2 :
       
  <Tooltip
        title="Type new or change Bank Address #2 with maximum 200 characters"
        placement="top"
        >  
        <input type="text" maxLength={200} ref={this.address2El} name="address2" />
</Tooltip>
        </label>

            <label style={{paddingRight: '60px'}}>Post Code :
  <Tooltip
        title="Type new or change Bank Postcode"
        placement="top"
        >  
        <input type="text" maxLength={50} ref={this.postcodeEl} name="postcode"/>
  </Tooltip>
        </label>
        <label style={{paddingRight: '10px'}}>City :
 <Tooltip
        title="Type new or change Bank City with maximum 50 characters"
        placement="top"
        >  
        <input type="text" maxLength={50} ref={this.cityEl} name="city"/>
 </Tooltip>
        </label>

        <label style={{paddingRight: '10px'}} >State :
   <Tooltip
        title="Type new or change Bank State name with maximum 50 characters"
        placement="top"
        >   
        <input type="text" maxLength={50} ref={this.stateEl} name="state" />
    </Tooltip>
        </label>

        <label style={{paddingRight: '20px'}}>Country :
 <Tooltip
        title="Type new or change Bank Country name with maximum 50 characters"
        placement="top"
        >  
        <input type="text" maxLength={50} ref={this.countryEl} name="country" />
 </Tooltip>
        </label>

        <label style={{paddingRight: '160px'}}>Telephone No. #1 :
 <Tooltip
        title="Type new or change Bank Telephone No. #1 with maximum 20 digits"
        placement="top"
        >  
        <input type="text" ref={this.tel1El} maxLength={20} name="telephone1"  />
 </Tooltip>
        </label>

        <label style={{paddingRight: '160px'}}>Telephone No. #2 :
     <Tooltip
        title="Type new or change Bank Telephone No. #2 with maximum 20 digits"
        placement="top"
        >  
        <input type="text" ref={this.tel2El} maxLength={20} name="telephone2"  />
      </Tooltip>
        </label>

        <label style={{paddingRight: '0px'}}>Fax No. :
  <Tooltip
        title="Type new or change Bank Fax No. with maximum 20 digitss"
        placement="top"
        >  
        <input type="text" maxLength={20} ref={this.faxEl} name="faxNo" />
  </Tooltip>
        </label>

        <label style={{paddingRight: '100px'}}>Email Address :
   <Tooltip
        title="Type new or change Bank Email Address with maximum 100 characters"
        placement="top"
        >  
        <input type="text" maxLength={100} ref={this.emailEl} name="email" />
   </Tooltip>
        </label>






          <label style={{paddingRight: '200px'}}>
             G/L Account No.  :
              <input
                type="text"
                value={this.jeNo}
                name="glNo"
                ref={this.glNoEl}
                readOnly = {true}
                required = {true}
              />
            </label>


            <label style={{ paddingRight: '160px'}}>
             G/L Sub-No.  :
              <input
                type="text"
                value={this.jeSub}
                name="glSub"
                ref={this.glSubEl}
                readOnly={true}
                required
              />
            </label>


            <label style={{paddingRight: '150px'}} >
            G/L Name :
            <input
              type="text"
              value={this.jeName}
              name="glName"
              ref={this.glNameEl}
              readOnly={true}
              required
            />
          </label>

            <label style={{paddingRight: '200px'}} >
              G/L Department :
              <input
                type="text"
                value={this.jeDep}
                name="department"
                ref={this.departmentEl}
                readOnly={true}
                required
              />
            </label>

            <label style={{paddingRight: '200px'}} >
            G/L Account Type :
            <input
              type="text"
              value={this.jeType}
              name="glType"
              ref={this.glTypeEl}
              readOnly={true}
              required
            />
          </label>


          </fieldset>

           <p>
           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Update" />

           <button style={subStyle} onClick={event =>  window.location.href='BankList'} >Back</button>
           </p>



        </form>
      )
    }
  };

export default BankEdit;
