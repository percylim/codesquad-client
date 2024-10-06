import  React from 'react';
//import validator from 'validator'
import Tooltip from "@material-ui/core/Tooltip";
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
//import Axios from "axios";
import Axios from "axios";
 import  './UserProfile.css';
 //require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var lastSix = '';
 var accttype='CUST'
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
 var vID =0;
 var crLimit = 0;

const companyID = localStorage.getItem('companyID');
 const companyName = localStorage.getItem('companyName');
var supplierID = '';
var  customerData = [];
//var acct = '';
// var eDate = '';

//  var sDate = '';

class CustomerEdit extends React.Component {
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
        vID: 0,
        crLimit: 0,
      // id: this.props.match.params.id,
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
    this.glTypeEl = React.createRef();
    this.departmentEl = React.createRef();
    this.glNameEl = React.createRef();
    this.glTypeEl = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    };

      componentDidMount() {

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
               this.setState({glData: res.data});
            });


        supplierID = localStorage.getItem('supplierID');
        const body = {
          companyID : companyID,
          supplierID: supplierID,
        };



       Axios({
        method: 'post',
        url: url+'/customerData',
        data: body
      })
      .then(res => {
        console.log(res);
        customerData = res.data;
        this.setState({customerData: res.data});
       // alert(customerData[0].creditLimit);
     //   alert(customerData[0].supplierID);
        this.supplierIDEl.current.value = customerData[0].supplierID;
        this.supplierNameEl.current.value = customerData[0].supplierName;
        this.acctTypeEl.current.value = customerData[0].acctType;
        this.setState({ acct: customerData[0].acctType });
        this.tel1El.current.value = customerData[0].tel1;
        this.tel2El.current.value = customerData[0].tel2;
        this.handPhoneEl.current.value = customerData[0].handPhone;
        this.faxEl.current.value = customerData[0].fax;
        this.emailEl.current.value = customerData[0].email;
        this.websiteEl.current.value = customerData[0].website;
        this.address1El.current.value = customerData[0].address1;
        this.address2El.current.value = customerData[0].address2;
        this.cityEl.current.value = customerData[0].city;
        this.postcodeEl.current.value = customerData[0].postCode;
        this.stateEl.current.value = customerData[0].state;
        this.countryEl.current.value = customerData[0].country;
        this.paymentTermEl.current.value = customerData[0].paymentTerm;
        this.creditLimitEl.current.value = parseFloat(customerData[0].creditLimit).toFixed(2);

        this.personContactEl.current.value = customerData[0].personContact;
        this.setState({number: customerData[0].credutLimit});
      //  
      // alert(this.creditLimitEl.current.value);
      if  (glData.length ===0) {
        window.location = '/customerEdit';
   }
        for (let i = 0; i < glData.length; i++) {
        //   alert(glData[i].glNo+glData[i].glSub+" === "+customerData[0].glNo+customerData[0].glSub);
         if (customerData[0].glNo+customerData[0].glSub === glData[i].glNo+glData[i].glSub) {
             let ID = glData[i].id;
           //  vID = ID;
            // this.idEl.current.value=ID;
            //   alert(ID);
           // this.state.vID = glData[i].id;
          //   this.setState(vID: ID );
             this.setState({vID: ID});
      //    this.glNoEl.current.value = customerData[0].glNo;
       //    this.glSubEl.current.value = customerData[0].glSub;
       //   this.glTypeEl.current.value = customerData[0].glType;  
          // this.state.vID = ID;
            this.handleChangeGl(ID)
          }

        }

       })


     .catch(function (error) {
        alert(error);
      });

    };


    handleChangeType(event) {

      this.setState({acct: event.target.value});
      accttype = event.target.value;
     // this.sexEl.current.value=value;
    //  alert(sex);
   };




    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
    //    alert(this.postcodeEl.current.value);

        const user= {
          companyID: EscapeStr(companyID),
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
          glNo: this.glNoEl.current.value,
          glSub: this.glSubEl.current.value,
          glType: this.glTypeEl.current.value,
          department: EscapeStr(this.departmentEl.current.value),
          glName: EscapeStr(this.glNameEl.current.value),

         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
        fetch(url+'/customerUpdate', {
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
            window.location.href='customerList';
           };
      });
         // reset to null value

       // this.companyNameEl.current.value = "";

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
    var ID = 0;
    if (typeof e === 'object') {
    //  alert(e.target.value);
       ID = Number(e.target.value);
    } else {
       ID = e;
    }
  // let ID = Number(e.target.value);
   //  alert(ID);

     for (let i = 0; i < glData.length; i++) {

      if (glData[i].id === ID) {

        let cGlNo = glData[i].glNo;
         let cGlSub= glData[i].glSub;
         let cDep = glData[i].department;
         let cName = glData[i].glName;
         let cType = glData[i].glType
      //  alert(cGlNo+' --- '+cGlSub)
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


        <form style={mystyle} onSubmitk={this.handleSubmit}>
          <fieldset>

           <h1>Edit Supplier / Customer Profile Maintenance</h1>
           <label style={{paddingRight: '220px'}}>Supplier / Customer ID :
          <input class="text-uppercase" minlength={4} maxLength={20} ref={this.supplierIDEl} name="supplierID" readOnly= {true} required ={true} />
          </label>

          <label style={{paddingRight: '80px'}}>Supplier / Customer Name :
       <Tooltip
        title="Type and change Customer/Supplier Name maximum 200 characters if necessary"
        placement="top"
        >
      
          <input type="text" maxLength={200} ref={this.supplierNameEl} name="supplierName" required={true} />
           </Tooltip>
          </label>

          <label style={{paddingRight: '590px'}} component="accttype">Account Type :
          <div className="radio" style={{paddingLeft: '0px'}}>
          <td style={{color: 'green'}}>
              <input type="radio"  value="SUPP" name="acct"  onChange={this.handleChangeType} ref={this.acctTypeEl} checked={this.state.acct === 'SUPP'} /> Supplier
             </td>
              <td style={{color: 'red'}}>
               <input type="radio" value="CUST" name="acct" onChange={this.handleChangeType} ref={this.acctTypeEl} checked={this.state.acct === 'CUST'} /> Customer
               </td>
            </div>
            </label>


          <label style={{paddingRight: '160px'}}>Telephone No. #1 :
       <Tooltip
        title="Type and change Customer/Supplier Telephone #1 maximum 20 characters if necessary"
        placement="top"
        >
          <input type="text" ref={this.tel1El} maxLength={20} name="telephone1"  />
        </Tooltip>
          </label>
  
          <label style={{paddingRight: '160px'}}>Telephone No. #2 :
       <Tooltip
        title="Type and change Customer/Supplier Telephone #2 maximum 20 characters if necessary"
        placement="top"
        >
          <input type="text" ref={this.tel2El} maxLength={20} name="telephone2"  />
</Tooltip>
          </label>

          <label style={{paddingRight: '160px'}}>Hand Phone No. :
         <Tooltip
        title="Type and change Customer/Supplier Hand Phone No. maximum 20 characters if necessary"
        placement="top"
        >
          <input type="text" maxLength={20} ref={this.handPhoneEl}  name="handPhone" />
      </Tooltip>
          </label>

          <label style={{paddingRight: '20px'}}>Fax No. :
     <Tooltip
        title="Type and change Customer/Supplier Fax No. maximum 20 characters if necessary"
        placement="top"
        >
          <input type="text" maxLength={20} ref={this.faxEl} name="faxNo" />
          </Tooltip> 
          </label>

          <label style={{paddingRight: '140px'}}>Email Address :
       <Tooltip
        title="Type and change Customer/Supplier Email Address maximum 100 characters if necessary"
        placement="top"
        >
          <input type="text" maxLength={100} ref={this.emailEl} name="email" />
       </Tooltip>
          </label>
          <label style={{paddingRight: '20px'}}>Website :
      <Tooltip
        title="Type and change Customer/Supplier Website maximum 100 characters if necessary"
        placement="top"
        >
          <input type="text" maxLength={100} ref={this.websiteEl} name="website" />
    </Tooltip>
          </label>


          <label style={{paddingRight: '90px'}}>Address #1 :
      <Tooltip
        title="Type and change Customer/Supplier Address #1 maximum 200 characters if necessary"
        placement="top"
        >
          <input type="text" maxLength={200} ref={this.address1El} name="address1" required={true} />
   </Tooltip>
          </label>
          <label style={{paddingRight: '90px'}} >Address #2 :
     <Tooltip
        title="Type and change Customer/Supplier Address #2 maximum 200 characters if necessary"
        placement="top"
        >
          <input type="text" maxLength={200} ref={this.address2El} name="address2" />
   </Tooltip>
         </label>
          <label style={{paddingRight: '0px'}}>City :
         <Tooltip
        title="Type and change Customer/Supplier City maximum 50 characters if necessary"
        placement="top"
        >
          <input type="text" maxLength={50} ref={this.cityEl} name="city" required={true} />
 </Tooltip>
          </label>
          <label style={{paddingRight: '100px'}}>Post Code :
    <Tooltip
        title="Type and change Customer/Supplier PostCode maximum 50 characters if necessary"
        placement="top"
        >
          <input type="text" maxLength={50} ref={this.postcodeEl} name="postcode" required={true} />
  </Tooltip>
          </label>
        <label style={{paddingRight: '10px'}}>State :
          <Tooltip
        title="Type and change Customer/Supplier State maximum 50 characters if necessary"
        placement="top"
        >
          <input type="text" maxLength={50} ref={this.stateEl} name="state" required={true} />
         </Tooltip>
          </label>

          <label style={{paddingRight: '80px'}}>Country :
      <Tooltip
        title="Type and change Customer/Supplier Country Name maximum 50 characters if necessary"
        placement="top"
        >  
          <input type="text" maxLength={50} ref={this.countryEl} name="country" required={true} />
      </Tooltip>
          </label>
          <label style={{paddingRight: '170px'}}>Payment Term:
     <Tooltip
        title="Type and change Customer/Supplier Term Of Payment if necessary"
        placement="top"
        >
          <input type="number" defaultValue="0" onInput={(e)=>{
            e.target.value = Math.max(0, parseInt(e.target.value,10) ).toString().slice(0,3)
        }} min={0} ref={this.paymentTermEl}  name="paymentTerm" />
   </Tooltip>
          </label>

          <label style={{paddingRight: '160px'}}>Credit Limit :
    <Tooltip
        title="Type and change Customer/Supplier  Credit Limit if necessary"
        placement="top"
        >
          <input type="number" value={ this.state.number }
           maxLength={15} placeholder="0.00" ref={this.creditLimitEl}   name="creditLimit"

          />
   </Tooltip>
          </label>

          <label style={{paddingRight: '180px'}}>Person Contact :
    <Tooltip
        title="Type and change Customer/Supplier Personal Contact maximum 100 characters if necessary"
        placement="top"
        >
          <input type="text" maxLength={100} ref={this.personContactEl} name="contact" />
  </Tooltip>
          </label>
 
  <label style={{paddingRight: '60px'}}>G/L Account Selection :
  <Tooltip
        title="Select Customer/Supplier General Ledger Account No. for linking"
        placement="top"
        >
          <select value={this.state.vID} onChange={this.handleChangeGl}>
            {glData.map((item) => (
              <option value={item.id}  required> (ID-{item.id}) (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
           ))}

          </select>
   </Tooltip>
     </label>

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
           <input type="submit" style={logstyle} className="submit" name="submit" value="Update" onClick={this.handleSubmit}/>

           <button type="button" style={subStyle} onClick={event =>  window.location.href='customerList'} >Back</button>
           </p>



        </form>
      )
    }
  };

export default CustomerEdit;
