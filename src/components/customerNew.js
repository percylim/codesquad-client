import  React from 'react';
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
import Axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
 import  './UserProfile.css';
 //require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
// import CustomerNew from './customerNew';
const fetch = require('node-fetch');
var lastSix = '';
var accttype='CUST';
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
 var glID= null;
 var vID=null;
const companyID = localStorage.getItem('companyID');
const companyName = localStorage.getItem('companyName')

//  var sDate = '';
class CustomerNew extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the DOM element
     // this.state = { usersCollection: [] };
      this.state = {
        input: {},
        errors: {},
        data: [],
        state: {},
        number: 0,
        acct: 'CUST',
        glData: [],
        jeNo: '',
        jeSub: '',
        jeDep: '',
        jeName: '',
        jeType: '',
        vID: null,
      };


      this.handleInputChange = this.handleInputChange.bind(this);
      this.formatInput = this.formatInput.bind(this);
     // this.handleChange = this.handleChange.bind(this);
      this.handleChangeType = this.handleChangeType.bind(this);
      this.handleChangeGl = this.handleChangeGl.bind(this);


      this.companyIDEl = React.createRef();
      this.supplierIDEl = React.createRef();
      this.supplierNameEl = React.createRef();
      this.acctTypeEl = React.createRef();
      this.tel1El = React.createRef();
      this.tel2El = React.createRef();
      this.handPhoneEl = React.createRef();
      this.faxEl = React.createRef();
      this.emailEl = React.createRef();
      this.websiteEl = React.createRef();
      this.address1El = React.createRef();
      this.address2El = React.createRef();
      this.cityEl = React.createRef();
      this.postcodeEl = React.createRef();
      this.stateEl = React.createRef();
      this.countryEl = React.createRef();
      this.paymentTermEl = React.createRef();
      this.creditLimitEl = React.createRef();
      this.personContactEl = React.createRef();
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
      .get(url+`/ApArGlList`,
        {
         params: {
                 companyID: companyID,
                }
        }
      )
          .then(res => {
            console.log(res);

            glData = res.data;
            if (glData.length > 0) {
             this.setState({glData: res.data});
            glAcctNo = glData[0].glNo;
            glSubNo =  glData[0].glSub;

        //    glDepart = glData[0].department;
            glName = glData[0].glName;
            glDepart = glData[0].department;
            glType = glData[0].glType;         // glDesc = glData[0].glDescription;
          //   alert(glDesc);
             glNo = glData[0].glNo;
            // alert(glID=glData[2].id) 
          ///   setGlData({ glAcctNo: glAcctNo });
            this.setState({jeNo:glAcctNo});
            this.setState({jeSub:glSubNo});
            this.setState({jeDep:glDepart});
            this.setState({jeName:glName});
            this.setState({jeType:glType});
           //  this.setState({vID:glData[2].id});
           //  this.setState({value: 19});
             this.glNoEl.current.value = glData[0].glNo;
             this.glSubEl.current.value = glData[0].glSub;
             this.departmentEl.current.value = glData[0].department;
             this.glNameEl.current.value = glData[0].glName;
             this.glTypeEl.current.value = glData[0].glType;
       ////      setParticular("");
         //   setJeDesc(glDesc);
           // this.setState({vID: 19});
          //  alert(vID);
           // this.setGlData({ glNo: glAcctNo});
            // window.alert(data[1].description);
            } else {
              alert('G/L Account in connection with Supplier/Customer Account not created');
            }
          });
        //  this.GlData = result.data;



      //alert(data);
    //  debugger;

        };

   handleChangeType(event) {

    this.setState({acct: event.target.value});
    accttype = event.target.value;
   // this.sexEl.current.value=value;
  //  alert(sex);
 };


    handleSubmit(e) {
    //  alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
       // alert(this.sexEl.current.value);

        const user= {
          companyID: EscapeStr(companyID),
          companyName: EscapeStr(companyName),
          supplierID:EscapeStr(this.supplierIDEl.current.value.toUpperCase()),
          supplierName: EscapeStr(this.supplierNameEl.current.value),
          acctType: accttype,
          tel1: this.tel1El.current.value,
          tel2: this.tel2El.current.value,
          handPhone: this.handPhoneEl.current.value,
          fax: this.faxEl.current.value,
          email: EscapeStr(this.emailEl.current.value),
          website: EscapeStr(this.websiteEl.current.value),
          address1: EscapeStr(this.address1El.current.value),
          address2: EscapeStr(this.address2El.current.value),
          city: EscapeStr(this.cityEl.current.value),
          postcode: this.postcodeEl.current.value,
          state: EscapeStr(this.stateEl.current.value),
          country: EscapeStr(this.countryEl.current.value),
          paymentTerm: EscapeStr(this.paymentTermEl.current.value),
          creditLimit: this.creditLimitEl.current.value,
          personContact: EscapeStr(this.personContactEl.current.value),
          glNo: EscapeStr(this.glNoEl.current.value),
          glSub: EscapeStr(this.glSubEl.current.value),
          department: EscapeStr(this.departmentEl.current.value),
          glName: EscapeStr(this.glNameEl.current.value),
          glType: EscapeStr(this.glTypeEl.current.value),


         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
        fetch(url+'/customerNew', {
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
            window.location.reload(false);
           };
          });
         // reset to null value

       // this.companyNameEl.current.value = "";
       this.supplierIDEl.current.value = "";
       this.supplierNameEl.current.value = "";
       this.acctTypeEl.current.value = "";
       this.tel1El.current.value = "";
       this.tel2El.current.value = "";
       this.handPhoneEl.current.value = "";
       this.faxEl.current.value = "";
       this.emailEl.current.value = "";
       this.websiteEl.current.value = "";
       this.address1El.current.value = "";
       this.address2El.current.value = "";
       this.cityEl.current.value = "";
       this.postcodeEl.current.value = "";
       this.stateEl.current.value = "";
       this.countryEl.current.value = "";
       this.paymentTermEl.current.value = "0";
       this.creditLimitEl.current.value = "0.00";
       this.personContactEl.current.value = "";
    }



  }



    validate(){
      let  prod=this.supplierIDEl.current.value;
      for (let i = 0; i < prod.length; i++) {
          if (prod.substr(i,1) === ';') {
            alert("Customer ID cannot contain (;) letter ");
            return false;
          }

      }

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


  handleChangeGl(e) {
    //this.setState({ department: e.target.value });
   // setGlData({ glAcctNo: e.target.value });
   let ID = Number(e.target.value);
   //alert(ID);
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
          padding: "3px 15px 10px 10px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          width: '4em',
          height: '3em',

      };

      const onCancel= () => {


        this.supplierIDEl.current.value = "";
        this.supplierNameEl.current.value = "";
        this.acctTypeEl.current.value = "";
        this.tel1El.current.value = "";
        this.tel2El.current.value = "";
        this.handPhoneEl.current.value = "";
        this.faxEl.current.value = "";
        this.emailEl.current.value = "";
        this.websiteEl.current.value = "";
        this.address1El.current.value = "";
        this.address2El.current.value = "";
        this.cityEl.current.value = "";
        this.postcodeEl.current.value = "";
        this.stateEl.current.value = "";
        this.countryEl.current.value = "";
        this.paymentTermEl.current.value = "0";
        this.creditLimitEl.current.value = "0.00";
        this.personContactEl.current.value = "";


     };





     // Defining our N

      // alert(options[1].label);
     // const [errorMessage, setErrorMessage] = useState('');
     // const validateDate = (value) => {
     //   alert("here");
     //   if (validator.isDate(value)) {
     //     setErrorMessage('Valid Date :)')
     //   } else {
     //     setErrorMessage('Enter Valid Date!')
     //   }
     // }



      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
          <fieldset>

           <h1>Supplier / Customer Profile Maintenance</h1>
           <label style={{paddingRight: '220px'}}>Supplier / Customer ID :
     <Tooltip
        title="Type Customer/Supplier ID from 4 - 20 characters"
        placement="top"
        >
          <input class="text-uppercase" minlength={4} maxLength={20} ref={this.supplierIDEl} name="supplierID" required ={true} />
        </Tooltip>
          </label>

          <label style={{paddingRight: '220px'}}>Supplier / Customer Name :
    <Tooltip
        title="Type Customer/Supplier Name maximum 200 characters"
        placement="top"
        >
          <input type="text" maxLength={200} ref={this.supplierNameEl} name="supplierName" required={true} />
       </Tooltip>
          </label>

          <label style={{paddingRight: '0px'}} component="accttype">Account Type :
          <div className="radio" style={{paddingLeft: '0px'}}>
              <td style={{color: 'green'}}>  
              <input type="radio"  value="SUPP" name="acct"  onChange={this.handleChangeType} ref={this.acctTypeEl} checked={this.state.acct === 'SUPP'} /> Supplier
              </td>
              <td style={{color: 'red'}} >
               <input type="radio" value="CUST" name="acct" onChange={this.handleChangeType} ref={this.acctTypeEl} checked={this.state.acct === 'CUST'} /> Customer
               </td>
            </div>
            </label>


          <label style={{paddingRight: '160px'}}>Telephone No. #1 :
    <Tooltip
        title="Type Customer/Supplier  Telephone #1 with maximum 29 digits"
        placement="top"
        >
          <input type="text" ref={this.tel1El} maxLength={29} name="telephone1"  />
     </Tooltip>
          </label>

          <label style={{paddingRight: '160px'}}>Telephone No. #2 :
     <Tooltip
        title="Type Customer/Supplier Telephone #2 at maximum 29 digits"
        placement="top"
        >
          <input type="text" ref={this.tel2El} maxLength={20} name="telephone2"  />
     </Tooltip>
          </label>
          <label style={{paddingRight: '160px'}}>Hand Phone No. :
      <Tooltip
        title="Type Customer/Supplier Hand Phone number with maximum 20 digits"
        placement="top"
        >
          <input type="text" maxLength={20} ref={this.handPhoneEl}  name="handPhone" />
      </Tooltip>
          </label>

          <label style={{paddingRight: '20px'}}>Fax No. :
     <Tooltip
        title="Type Customer/Supplier Fax Number with maximum 20 digits"
        placement="top"
        >
          <input type="text" maxLength={20} ref={this.faxEl} name="faxNo" />
      </Tooltip>
          </label>

          <label style={{paddingRight: '140px'}}>Email Address :
   <Tooltip
        title="Type Customer/Supplier Email Address with maximum 100 characters"
        placement="top"
        >
          <input type="text" maxLength={100} ref={this.emailEl} name="email" />
   </Tooltip>
          </label>
          <label style={{paddingRight: '20px'}}>Website :
     <Tooltip
        title="Type Customer/Supplier Website with maximum 100 characters"
        placement="top"
        >
          <input type="text" maxLength={100} ref={this.websiteEl} name="website" />
      </Tooltip>
          </label>


          <label style={{paddingRight: '90px'}}>Address #1 :
      <Tooltip
        title="Type Customer/Supplier Address #1 with maximum 200 characters"
        placement="top"
        >
          <input type="text" maxLength={200} ref={this.address1El} name="address1" required={true} />
   </Tooltip>
          </label>
          <label style={{paddingRight: '90px'}} >Address #2 :
  <Tooltip
        title="Type Customer/Supplier Address #2 with maximum 200 characters"
        placement="top"
        >
          <input type="text" maxLength={200} ref={this.address2El} name="address2" />
     </Tooltip>
          </label>
          <label style={{paddingRight: '0px'}}>City :
  <Tooltip
        title="Type Customer/Supplier City with maximum 50 characters"
        placement="top"
        >
          <input type="text" maxLength={50} ref={this.cityEl} name="city" required={true} />
    </Tooltip>
          </label>
          <label style={{paddingRight: '100px'}}>Post Code :
     <Tooltip
        title="Type Customer/Supplier Post Code with maximum 10 characters"
        placement="top"
        >
          <input type="text" maxLength={10} ref={this.postcodeEl} name="postcode" required={true} />
     </Tooltip>
          </label>
          <label style={{paddingRight: '10px'}}>State :
  <Tooltip
        title="Type Customer/Supplier State with maximum 50 characters"
        placement="top"
        >
          <input type="text" maxLength={50} ref={this.stateEl} name="state" required={true} />
     </Tooltip>
          </label>

          <label style={{paddingRight: '80px'}}>Country :
      <Tooltip
        title="Type Customer/Supplier Country with maximum 50 characters"
        placement="top"
        >
          <input type="text" maxLength={50} ref={this.countryEl} name="country" required={true} />
     </Tooltip>
          </label>
          <label style={{paddingRight: '170px'}}>Payment Term:
  <Tooltip
        title="Type Customer/Supplier Payment Term"
        placement="top"
        >
          <input type="number" defaultValue="0" onInput={(e)=>{
            e.target.value = Math.max(0, parseInt(e.target.value,10) ).toString().slice(0,3)
        }} min={0} ref={this.paymentTermEl}  name="paymentTerm" />
     </Tooltip>


          </label>

          <label style={{paddingRight: '160px'}}>Credit Limit :
   <Tooltip
        title="Type Customer/Supplier Credit Limit"
        placement="top"
        >
          <input type="number" value={ this.state.number } defaultValue='0.00' onChange={ this.handleInputChange }
          onBlur={ this.formatInput } maxLength={15} placeholder="0.00" ref={this.creditLimitEl}   name="creditLimit"

          />
     </Tooltip>
          </label>

          <label style={{paddingRight: '180px'}}>Person Contact :
  <Tooltip
        title="Type Customer/Supplier Personal Contact with maximum 100 characters"
        placement="top"
        >
          <input type="text" maxLength={100} ref={this.personContactEl} name="contact" />
    </Tooltip>
          </label>

          <div className="select-container" >
          <label style={{paddingRight: '60px'}}>G/L Account Selection :
       <Tooltip
        title="Select Customer/Supplier General Ledger Account No. for linking"
        placement="top"
        >
          <select value={vID} onChange={this.handleChangeGl}>
            {glData.map((item) => (
              <option value={item.id}  required> (ID-{item.id}) (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
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
                  value={this.jeNo}
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
           <input type="submit" style={logstyle} className="submit" onClick={this.handleSubmit} name="submit" value="Save" />
           <button style={buttonStyle} onClick={onCancel}>Clear</button>
           <button style={subStyle} onClick={event =>  window.location.href='customerList'} >Back</button>
           </p>



        </form>
      )
    }
  };

export default CustomerNew;
