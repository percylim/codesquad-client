import  React from 'react';
// mport validator from 'validator'
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import { withRouter } from "react-router-dom";
import Axios from "axios";

 import  './UserProfile.css';
const fetch = require('node-fetch');

var employee=[];
//var history = useHistory(); 
const companyID = localStorage.getItem('companyID');
var employeeNo = localStorage.getItem('userNo');

  


  class ChangePassword extends React.Component {
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
        user: [],
      
      };
      employeeNo=localStorage.getItem('userNo'); 
   //  alert(employeeNo);
   //  alert(companyID);
   // const [gender, setGender] = React.useState('M');

      this.handleInputChange = this.handleInputChange.bind(this);
      this.formatInput = this.formatInput.bind(this);
    //  this.handleChange = this.handleChange.bind(this);
      
      this.handleBack = this.handleBack.bind(this);

      
      this.employeeNoEl = React.createRef();
      this.employeeNameEl = React.createRef(); 
      this.nricEl = React.createRef(); 
      this.positionEl = React.createRef();        
      this.incomeTaxNoEl = React.createRef();         
      this.epfNoEl = React.createRef();
      this.socsoNoEl = React.createRef();
      this.drivingLicenseNoEl = React.createRef();
      this.telNoEl = React.createRef();
      this.hpNoEl = React.createRef();
      this.emailEl = React.createRef();
      this.oldPasswordEl = React.createRef();
      this.newPasswordEl = React.createRef(); 
      this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    
// ***************

componentDidMount() {
  
  const body = {
    companyID : companyID, 
    employeeNo: employeeNo
  };

 Axios({
  method: 'post',
  url: 'http://localhost:9005/employeeData',
  data: body
})
.then(res => {
  console.log(res);
  employee = res.data; 
  //alert(employee.employeeName);
   this.employeeNameEl.current.value = employee[0].employeeName;  
   this.nricEl.current.value = employee[0].nric;
   this.positionEl.current.value = employee[0].position;
   this.incomeTaxNoEl.current.value = employee[0].incomeTaxNo;
   this.epfNoEl.current.value = employee[0].epfNo;
   this.socsoNoEl.current.value = employee[0].socsoNo;  
   this.drivingLicenseNoEl.current.value = employee[0].drivingLicenseNo; 
   this.telNoEl.current.value = employee[0].telNo;
   this.hpNoEl.current.value = employee[0].hpNo;
   this.emailEl.current.value = employee[0].email;
   this.oldPasswordEl.current.value = '';
   this.newPasswordEl.current.value = '';
  

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
      //  alert("old = "+this.oldPasswordEl.current.value);
      //  alert("new = "+this.newPasswordEl.current.value);

        var user = {
         companyID: EscapeStr(companyID),
          employeeNo:EscapeStr(employeeNo),
          oldPassword: this.oldPasswordEl.current.value,
          newPassword: this.newPasswordEl.current.value,
       
         };
         // alert("old = "+user.oldPassword);
         // alert("new = "+user.newPassword);
     
        
          //var name1 =  EscapeStr(user.companyName);
      //  alert(this.dateBirthEl.current.value);
      fetch('http://localhost:9005/employeeChangePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( user )
     //     // We convert the React state to JSON and send it as the POST body
         // data: JSON.stringify(user,user.ame)
        }).then(function(response) {
           return response.text()
        }).then(function(text) {
            alert(text);
          });
         // reset to null value
       
         this.oldPasswordEl.current.value = "";
         this.newPasswordEl.current.value = "";
      
     

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
  //   alert("old = "+this.oldPasswordEl.current.value);
   //  alert("new = "+this.newPasswordEl.current.value);
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
  }


  
  handleBack() {
    this.props.history.push("/Sidebar");
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
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          

      };

      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
          <fieldset>
          
           <h1>Change Employee Password</h1>
           <label>Employee No. :                  
          <input class="text-uppercase" minlength={4} maxLength={20} ref={this.employeeNoEl} placeholder={employeeNo} name="employeeNo" readOnly= {true} required />
          </label>
           <label>Employee Name : 
          <input type="text" maxLength={200} ref={this.employeeNameEl} name="employeeName" readOnly= {true} />
          </label>
  
          <label>NRIC No. : 
          <input class="text" type="text" maxLength={20} ref={this.nricEl} name="nric" readOnly= {true}/>    
          </label>


          <label>Employed Position : 
          <input type="text" maxLength={50} ref={this.positionEl} name="position" readOnly= {true} /> 
          </label>   
          

         <label>Income Tax No. :
          <input class="text-uppercase" type="text" maxLength={50} ref={this.incomeTaxNoEl} name="incomeTaxNo" readOnly= {true} />       
          </label>         
  
          <label>EPFTax No. : 
          <input class="text-uppercase" type="text" maxLength={50} ref={this.epfNoEl} name="epfno" readOnly= {true}/>   
          </label>   
          <label>SOCSO No. : 
          <input class="text-uppercase" type="text" maxLength={50} ref={this.socsoNoEl} name="socsooNo" readOnly= {true} />  
          </label>             
          <label>Driving License No. : 
          <input class="text-uppercase" type="text" maxLength={50} ref={this.drivingLicenseNoEl} name="drivingLicenseNo" readOnly= {true} />  
          </label>     
          <label>Telephone No. : 
          <input type="text" maxLength={20} ref={this.telNoEl} name="telNo" readOnly= {true}/>  
          </label>  
          <label>Hand phone No. :
          <input type="text" maxLength={20} ref={this.hpNoEl} name="hplNo" readOnly= {true} /> 
          </label>  
          <label>Email :
          <input type="email"  maxLength={100} ref={this.emailEl} name="email" readOnly= {true} />
          </label>  
           <label> Old Password :
           <input type="password"  name='oldPassword' ref={this.oldPasswordEl} required />
           </label>
           <label> New Password :
           <input type="password"  name='newPassword' ref={this.newPasswordEl} required />
           </label>  


           </fieldset>

           <p>
           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Submit" />
           <button style={subStyle} name='back' onClick={this.handleBack} >Back</button>
           </p>

    
    
        </form>
      )
    }
  };




export default ChangePassword;
