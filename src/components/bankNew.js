import  React from 'react';
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
import Axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
 import  './UserProfile.css';
 //require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var lastSix = '';
var glData = [];
var glNo = '';
var glAcctNo  = '';
 var glSubNo = '';
 var glDepart = '';
 var glName = '';
 var jeNo = '';
 var jeSub = '';
 var jeName= '';
 var jeDep = '';
 var jeType = '';
 var glType = '';

const companyID = localStorage.getItem('companyID');


//const companyName = localStorage.getItem('companyName')
// var eDate = '';
//  var sDate = '';
class BankNew extends React.Component {

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





    };


      this.handleInputChange = this.handleInputChange.bind(this);
      this.formatInput = this.formatInput.bind(this);
      this.handleChangeGl = this.handleChangeGl.bind(this);
      this.onInputChange = this.onInputChange.bind(this);

     // this.companyIDEl = React.createRef();
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
      this.glNoEl = React.createRef();
      this.glSubEl = React.createRef();
      this.departmentEl = React.createRef();
      this.glNameEl = React.createRef();
      this.glTypeEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {


  //  debugger;
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
          if (glData.length === 0) {
            alert('G/L Account in connection with Bank Account No created')
          } else {
           this.setState({glData: res.data})
          glAcctNo = glData[0].glNo;
          glSubNo =  glData[0].glSub;

      //    glDepart = glData[0].department;
          glName = glData[0].glName;
          glDepart = glData[0].department;
          glType = glData[0].glType;         // glDesc = glData[0].glDescription;
        //   alert(glDesc);
           glNo = glData[0].glNo;
        //   setGlData({ glAcctNo: glAcctNo });
          this.setState({jeNo:glAcctNo});
          this.setState({jeSub:glSubNo});
          this.setState({jeDep:glDepart});
          this.setState({jeName:glName});
          this.setState({jeType:glType});
           this.glNoEl.current.value = glData[0].glNo;
           this.glSubEl.current.value = glData[0].glSub;
           this.departmentEl.current.value = glData[0].department;
           this.glNameEl.current.value = glData[0].glName;
           this.glTypeEl.current.value = glData[0].glType;
          }
        });
      //  this.GlData = result.data;



    //alert(data);
    //debugger;

      };

      onInputChange(e) {

      };


    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
       // alert(this.sexEl.current.value);

        const user= {
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
         // alert(user.bankName);
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
        fetch(url+'/bankNew', {
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
         //   localStorage.setItem('companyName', user.companyName);
            window.location.reload(false);
           };
          });
         // reset to null value

       // this.companyNameEl.current.value = "";
       this.bankIDEl.current.value = "";
       this.bankNameEl.current.value = "";
       this.bankAcctNoEl.current.value = "";
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
       this.glNoEl.current.value = '';
       this.glSubEl.current.value = '';
       this.departmentEl.current.value = '';
       this.glNameEl.current.value = '';
       this.glTypeEl.current.value = '';



    }



  }



    validate(){
      let  prod=this.bankIDEl.current.value;
      for (let i = 0; i < prod.length; i++) {
          if (prod.substr(i,1) === ';') {
            alert("Bank ID cannot contain (;) letter ");
            return false;
          }

      }

if (this.bankIDEl.current.value ==="") {
    alert("Bank ID Must not blank");
    return false;
 };

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


 if (this.glTypeEl.current.value !=="401") {
  alert("Bank G/L Account Type must be 401");
  return false;
};

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
  };


   handleChangeGl(e) {
    //this.setState({ department: e.target.value });
   // setGlData({ glAcctNo: e.target.value });
   let ID = Number(e.target.value);
  
     for (let i = 0; i < glData.length; i++) {

      if (glData[i].id === ID) {

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
          padding: "2px 15px 10px 13px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          width: '4em',
          height: '3em',

      };

      const onCancel= () => {


        this.bankIDEl.current.value = "";
        this.bankNameEl.current.value = "";
        this.bankAcctNoEl.current.value = "";
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


     };




      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
        <fieldset>

         <h1>Bank Profile Maintenance</h1>
         <label style={{paddingRight: '60px'}}>Bank ID :
       <Tooltip
        title="Type New Bank Account ID with maximum 4 characters"
        placement="top"
        >
   
        <input class="text-uppercase" minlength={4} maxLength={20} 
        ref={this.bankIDEl} name="bamkID" required 
        />
   </Tooltip>
        </label>

        <label style={{paddingRight: '120px'}}>Bank Name :
       <Tooltip
        title="Type New Bank Account Name with maximum 200 characters"
        placement="top"
        >
        <input type="text" maxLength={200} ref={this.bankNameEl} name="bankName" required/>
 </Tooltip>
        </label>

        <label style={{paddingRight: '220px'}}>Bank Account No. :
        <Tooltip
        title="Type New Bank Account No. with maximum 200 characters"
        placement="top"
        >
        <input class="text-uppercase" maxLength={200} ref={this.bankAcctNoEl} name="bankAcctNo"  required />
  </Tooltip> 
        </label>

        <label style={{paddingRight: '90px'}}>Address #1 :
  
       <Tooltip
        title="Type New Bank Address #1 with maximum 200 characters"
        placement="top"
        >   
         <input type="text" maxLength={200} ref={this.address1El} name="address1" />
  </Tooltip>
        </label>
        <label style={{paddingRight: '90px'}}>Address #2 :
       <Tooltip
        title="Type New Bank Address #2 with maximum 200 characters"
        placement="top"
        >
        <input type="text" maxLength={200} ref={this.address2El} name="address2" />
</Tooltip>
        </label>

        <label style={{paddingRight: '60px'}}>Post Code :
        <Tooltip
        title="Type New Bank Postcode  with maximum 50 digits"
        placement="top"
        >
        <input type="text" maxLength={50} ref={this.postcodeEl} name="postcode"/>
 </Tooltip>
        </label>
        <label style={{paddingRight: '10px'}}>City :
        <Tooltip
        title="Type New Bank City Name with maximum 50 characters"
        placement="top"
        >
        <input type="text" maxLength={50} ref={this.cityEl} name="city"/>
 </Tooltip>
        </label>

        <label style={{paddingRight: '10px'}} >State :
        <Tooltip
        title="Type New Bank State name with maximum 50 characters"
        placement="top"
        >
        <input type="text" maxLength={50} ref={this.stateEl} name="state" />
 </Tooltip>
        </label>

        <label style={{paddingRight: '20px'}}>Country :
        <Tooltip
        title="Type New Bank Country name with maximum 50 characters"
        placement="top"
        >
        <input type="text" maxLength={50} ref={this.countryEl} name="country" />
 </Tooltip>
        </label>

        <label style={{paddingRight: '160px'}}>Telephone No. #1 :
        <Tooltip
        title="Type New Bank Telephone No. with maximum 20 digits"
        placement="top"
        >
        <input type="text" ref={this.tel1El} maxLength={20} name="telephone1"  />
 </Tooltip>
        </label>

        <label style={{paddingRight: '160px'}}>Telephone No. #2 :
       <Tooltip
        title="Type New Bank Telephone #2 with maximum 20 digits"
        placement="top"
        >
        <input type="text" ref={this.tel2El} maxLength={20} name="telephone2"  />
</Tooltip>
        </label>

        <label style={{paddingRight: '0px'}}>Fax No. :
       <Tooltip
        title="Type New Bank Fax No. with maximum 20 digits"
        placement="top"
        >
        <input type="text" maxLength={20} ref={this.faxEl} name="faxNo" />
   </Tooltip>
        </label>

        <label style={{paddingRight: '100px'}}>Email Address :
        <Tooltip
        title="Type New Bank Email Address with maximum 100 characters"
        placement="top"
        >
        <input type="text" maxLength={100} ref={this.emailEl} name="email" />
 </Tooltip>
        </label>

        <div className="select-container" >
        <label style={{paddingRight: '60px'}}>G/L Account Selection :
          <Tooltip
        title="Select General Ledger Account No. to link with Bank"
        placement="top"
        >
        <select onChange={this.handleChangeGl}>
 
          {glData.map((item) => (
            <option value={item.id} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
         ))}
  
        </select>
</Tooltip>

        </label>
        </div>


          <label style={{paddingRight: '200px'}}>
             G/L Account No.  :
              <input
                type="text"
                maxLength={4}
                value={jeNo}
                name="glNo"
                ref={this.glNoEl}
                readOnly={true}
                required
              />
            </label>


            <label style={{ paddingRight: '160px'}}>
             G/L Sub-No.  :
              <input
                type="text"
                maxLength={4}
                value={jeSub}
                name="glSub"ref={this.glSubEl}
                readOnly={true}
                required
              />
            </label>


            <label style={{paddingRight: '150px'}} >
            G/L Name :
            <input
              type="text"
              value={jeName}
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
                value={jeDep}
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
              value={jeType}
              name="glType"
              ref={this.glTypeEl}
              readOnly={true}
              required
            />
          </label>

         </fieldset>

         <p>
         <input type="submit" style={logstyle} className="submit" onClick={this.handleSubmit} name="submit" value="Save" />
         <button style={buttonStyle} onClick={onCancel}>Clear</button>
         <button style={subStyle} onClick={event =>  window.location.href='BankList'} >Back</button>
         </p>


        </form>
      )
    }
  };

export default BankNew;
