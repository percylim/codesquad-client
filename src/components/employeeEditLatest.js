import  React from 'react';
// mport validator from 'validator'
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
import Axios from "axios";

 import  './UserProfile.css';
const fetch = require('node-fetch');
var lastSix = '';
var sex = 'M'; 
var paytype='M';
var married = 'M';
var Level = "";
var employee=[];

const companyID = localStorage.getItem('companyID');
const userLevel = localStorage.getItem('userLevel');
var employeeNo = sessionStorage.getItem('employeeNo');

  var eDate = '';
  var sDate = '';
  


  class employeeEdit extends React.Component {
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
        Level: [],
        gender: 'M',
        payment: 'M',
        marital: 'S',
     
        
      };
      employeeNo=sessionStorage.getItem('employeeNo'); 
     // alert(employeeNo);
   // const [gender, setGender] = React.useState('M');

      this.handleInputChange = this.handleInputChange.bind(this);
      this.formatInput = this.formatInput.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeType = this.handleChangeType.bind(this);
      this.handleChangeMarried = this.handleChangeMarried.bind(this);
      this.handleChangeLevel = this.handleChangeLevel.bind(this); 
      
      this.companyIDEl = React.createRef();
      this.employeeNoEl = React.createRef();
      this.employeeNameEl = React.createRef(); 
      this.nricEl = React.createRef(); 
      this.sexEl = React.createRef(); 
      this.dateBirthEl = React.createRef();
      this.raceEl = React.createRef();
      this.maritalStatusEl = React.createRef();
      this.childsEl = React.createRef();           
      this.address1El = React.createRef();
      this.address2El = React.createRef();
      this.cityEl = React.createRef();
      this.stateEl = React.createRef();
      this.postcodeEl = React.createRef();   
      this.countryEl = React.createRef();
      this.levelEl = React.createRef(); 
      this.positionEl = React.createRef();        
      this.salaryEl = React.createRef();   
      this.payMethodEl = React.createRef();   
      this.incomeTaxNoEl = React.createRef();         
      this.epfNoEl = React.createRef();
      this.socsoNoEl = React.createRef();
      this.drivingLicenseNoEl = React.createRef();
      this.telNoEl = React.createRef();
      this.hpNoEl = React.createRef();
      this.emailEl = React.createRef();
      this.employDateEl = React.createRef();
      this.passwordEl = React.createRef();     
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
   this.sexEl.current.value= employee[0].sex;
   this.setState({ gender: employee[0].sex });
  // this.dateBirthEl.current.value = employee[0].birthDate; 
   this.raceEl.current.value = employee[0].race;
   this.maritalStatusEl.current.value = employee[0].naritalStatus;
   this.setState({ marital: employee[0].maritalStatus });
   this.childsEl.current.value = employee[0].childs;
   this.address1El.current.value = employee[0].address1;
   this.address2El.current.value = employee[0].address2;
   this.cityEl.current.value = employee[0].city;
   this.stateEl.current.value = employee[0].state;
   this.postcodeEl.current.value = employee[0].postCode;     
   this.countryEl.current.value = employee[0].country;
   this.levelEl.current.value = employee[0].level;
   this.setState({ level: employee[0].level });
   this.positionEl.current.value = employee[0].position;
  // this.salaryEl.current.value = employee[0].salary;
   this.payMethodEl.current.value = employee[0].payMethod;
   this.setState({ payment: employee[0].payMethod });
   this.incomeTaxNoEl.current.value = employee[0].incomeTaxNo;
   this.epfNoEl.current.value = employee[0].epfNo;
   this.socsoNoEl.current.value = employee[0].socsoNo;  
   this.drivingLicenseNoEl.current.value = employee[0].drivingLicenseNo; 
   this.telNoEl.current.value = employee[0].telNo;
   this.hpNoEl.current.value = employee[0].hpNo;
   this.emailEl.current.value = employee[0].email;
   //this.employDateEl.current.value = employee[0].employDate; 
   this.salaryEl.current.value=parseFloat(employee[0].salary).toFixed(2);
   var cur = new Date(employee[0].dateBirth);
   cur.setDate(cur.getDate());
   sDate = cur.toISOString().substr(0,10);  
  // alert(sDate);
   this.dateBirthEl.current.value = sDate;  
   
   var curr = new Date(employee[0].employDate);
   curr.setDate(curr.getDate());
   eDate = curr.toISOString().substr(0,10);  
   this.employDateEl.current.value = eDate; 

})
.catch(function (error) {
  alert(error);
});
 
};
       
// alert(employeeName)
// load data

    handleChange(event) {
      
      this.setState({gender: event.target.value});
      sex = event.target.value
     // this.sexEl.current.value=value;
    //  alert(sex);
   }
   handleChangeType(event) {
      
    this.setState({gender: event.target.value});
    paytype = event.target.value
   // this.sexEl.current.value=value;
  //  alert(sex);
 }
 handleChangeMarried(event) {
      
  this.setState({gender: event.target.value});
  married = event.target.value;
 // this.sexEl.current.value=value;
//  alert(sex);
}

 handleChangeLevel(e) {
     
      this.setState({ Level: e.target.value });
      Level = e.target.value;
      //alert(Level);
    }

    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
       // alert(this.sexEl.current.value);

        const user= {
          companyID: EscapeStr(companyID),
          employeeNo:EscapeStr(employeeNo),
          employeeName: EscapeStr(this.employeeNameEl.current.value),
          nric: this.nricEl.current.value,    
          sex: sex,
          dateBirth: this.dateBirthEl.current.value,
          race: this.raceEl.current.value,
          maritalStatus: married,
          childs: this.childsEl.current.value,
          address1: EscapeStr(this.address1El.current.value),
          address2: EscapeStr(this.address2El.current.value),
          city: EscapeStr(this.cityEl.current.value),
          state: EscapeStr(this.stateEl.current.value),
          postcode: this.postcodeEl.current.value,         
          country: EscapeStr(this.countryEl.current.value),
          level: Level,
          position: EscapeStr(this.postcodeEl.current.value),
          salary: this.salaryEl.current.value,
          payMethod: paytype,
          incomeTaxNo: EscapeStr(this.incomeTaxNoEl.current.value).toUpperCase(),
          epfNo: EscapeStr(this.epfNoEl.current.value).toUpperCase(),
          socsoNo: EscapeStr(this.socsoNoEl.current.value).toUpperCase(),  
          drivingLicenseNo: EscapeStr(this.drivingLicenseNoEl.current.value),          
          telNo: EscapeStr(this.telNoEl.current.value),
          hpNo: EscapeStr(this.hpNoEl.current.value),
          email: EscapeStr(this.emailEl.current.value),
          employDate: this.employDateEl.current.value,
          password: this.passwordEl.current.value, 
         };
         //var name1 =  EscapeStr(user.companyName);
      //  alert(this.dateBirthEl.current.value);
        fetch('http://localhost:9005/employeeUpdate', {
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
       //this.employeeNoEl.current.value = employee;
       this.employeeNameEl.current.value = "";
       this.nricEl.current.value = "";
       this.sexEl.current.value = "";
       this.dateBirthEl.current.value = "";
       this.raceEl.current.value = "";
       this.maritalStatusEl.current.value = "";
       this.childsEl.current.value = 0;
       this.address1El.current.value = "";
       this.address2El.current.value = ""; 
       this.cityEl.current.value = "";   
       this.stateEl.current.value = "";
       this.postcodeEl.current.value = "";
       this.countryEl.current.value = "";
       this.levelEl.current.value = 5;
       this.positionEl.current.value = "";
       this.salaryEl.current.value = 0;
       this.payMethodEl.current.value = "";
       this.incomeTaxNoEl.current.value = "";
       this.epfNoEl.current.value = ""; 
       this.socsoNoEl.current.value = "";
       this.drivingLicenseNoEl.current.value = "";
       this.telNoEl.current.value = "";
       this.hpNoEl.current.value = "";
       this.emailEl.current.value = "";
       this.employDateEl.current.value = "";
       this.passwordEl.current.value = "";
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
/*
         const buttonStyle = {   
          color: "black",
          backgroundColor: "yellow",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 350,
      };
*/
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
/*
      const onCancel= () => {
    
      
        this.employeeNoEl.current.value = "";
        this.employeeNameEl.current.value = "";
        this.nricEl.current.value = "";
        this.sexEl.current.value = "";
        this.dateBirthEl.current.value = "";
        this.maritalStatusEl.current.value = "";
        this.childsEl.current.value = 0;
        this.address1El.current.value = "";
        this.address2El.current.value = ""; 
        this.cityEl.current.value = "";   
        this.stateEl.current.value = "";
        this.postcodeEl.current.value = "";
        this.countryEl.current.value = "";
        this.levelEl.current.value = 5;
        this.positionEl.current.value = "";
        this.salaryEl.current.value = 0;
        this.payMethodEl.current.value = "";
        this.incomeTaxNoEl.current.value = "";
        this.epfNoEl.current.value = ""; 
        this.socsoNoEl.current.value = "";
        this.telNoEl.current.value = "";
        this.hpNoEl.current.value = "";
        this.emailEl.current.value = "";
        this.employDateEl.current.value = "";
        this.passwordEl.current.value = "";
        

     };

*/
     const list = [
      {label: '5 - general staff',
      value: 5,
      },
       {label: '4 - general clerk',
       value: 4,
       },
        {label: '3 - account clerk',  
         value: 3,
        },      
        {label: '2 - accountant',   
         value: 2, 
        },
        {label: '1 - management officer', 
          value: 1,    
        }
      ];
      
     const options= list.slice(userLevel,5-userLevel);
     
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
          
           <h1>Edit Employee Profile</h1>
           <label>Employee No. :                  
          <input class="text-uppercase" minlength={4} maxLength={20} ref={this.employeeNoEl} placeholder={employeeNo} name="employeeNo" readOnly= {true} required />
          </label>
           <label>Employee Name : 
          <input type="text" maxLength={200} ref={this.employeeNameEl} name="employeeName" required />
          </label>
  
          <label>NRIC No. : 
          <input class="text" type="text" maxLength={20} ref={this.nricEl} name="nric" required/>    
          </label>
               
          <label component="legend">Gender :   
          
            <td>      
              <input type="radio"  value="M" name="gender"  onChange={this.handleChange} ref={this.sexEl} checked={this.state.gender === 'M'}/> Male
             </td> 
              <td>
        
               <input type="radio" value="F" name="gender" onChange={this.handleChange} ref={this.sexEl}  checked={this.state.gender === 'F'}/> Female
               </td>
               <td>  
               <input type="radio" value="O" name="gender"  onChange={this.handleChange} ref={this.sexEl}  checked={this.state.gender === 'O'}/> Other
        
              </td>
     
            </label>
             
         
          <label>Date of Birth : 
            
                    
          <input type="date" ref={this.dateBirthEl} name="birthDate"  />

          </label>  
         
          <label>Race : 
            
                    
          <input type="text" ref={this.raceEl} name="race"  />

          </label>  

          <label component="legend">Marital Status :   
          
          <td>      
            <input type="radio"  value="M" name="marital" onChange={this.handleChangeMarried}  ref={this.maritalStatusEl} checked={this.state.marital === 'M'}/> Married
           </td> 
            <td>
      
             <input type="radio" value="S" name="marital" onChange={this.handleChangeMarried} ref={this.maritalStatusEl} checked={this.state.marital === 'S'}/> Single
             </td>
             <td>  
             <input type="radio" value="D" name="marital" onChange={this.handleChangeMarried} ref={this.maritalStatusEl} checked={this.state.marital === 'O'}/> Other
      
            </td>
   
          </label>     
          
          <label>No. of Child : 
        
          <input type="number" maxLength={2} ref={this.childsEl} defaultValue='0' placeholder='0' name="childs" />
          </label>  
          <label>Address #1 :  
          <input type="text" maxLength={200} ref={this.address1El} name="address1" required/>
          </label> 
          <label >Address #2 :  
          <input type="text" maxLength={200} ref={this.address2El} name="address2" />
          </label> 
          <label>City : 
          <input type="text" maxLength={50} ref={this.cityEl} name="city" required />  
          </label>                               
          <label>State :
          <input type="text" maxLength={50} ref={this.stateEl} name="state" required />  
          </label> 
          <label>Post Code :
          <input type="text" maxLength={50} ref={this.postcodeEl} name="postcode" required />  
          </label>  
          <label>Country :
          <input type="text" maxLength={50} ref={this.countryEl} name="country" required />   
          </label> 
          <label>Level :  
          
          
          <div id="App">
                  <div className="select-container">
                  <select value={this.state.level} onChange={this.handleChangeLevel}>
                  {options.map((option) => (
                    <option ref={this.levelEl} value={option.value} required>{option.label} </option>
                 ))}
                </select>
                  </div>
                </div>



          </label> 
          <label>Employed Position : 
          <input type="text" maxLength={50} ref={this.positionEl} name="position" required /> 
          </label>   
          <label>Salary : 
          <input type="number" value={ this.state.number } defaultValue='0.00' onChange={ this.handleInputChange }
          onBlur={ this.formatInput } maxLength={15} placeholder="0.00" ref={this.salaryEl}   name="salary" required />
          </label>
          
             
          <label component="legend">Salary Payment Type : 
        
            <td>      
              <input type="radio" value="M" name="payment" onChange={this.handleChangeType} ref={this.payMethodEl} checked={this.state.payment === 'M'}/> Montly
             </td> 
              <td>
        
               <input type="radio" value="W" name="payment" onChange={this.handleChangeType} ref={this.payMethodEl} checked={this.state.payment === 'W'}/>Weekly
               </td>
               <td>  
               <input type="radio" value="D" name="payment" onChange={this.handleChangeType} ref={this.payMethodEl} checked={this.state.payment === 'D'}/> Daily
        
              </td>
              <td>  
              <input type="radio" value="H" name="payment" onChange={this.handleChangeType} ref={this.payMethpdEl} checked={this.state.payment === 'H'}/> Hourly
          
             </td>        
             </label>        
         <label>Income Tax No. :
          <input class="text-uppercase" type="text" maxLength={50} ref={this.incomeTaxNoEl} name="incomeTaxNo" />       
          </label>         
  
          <label>EPFTax No. : 
          <input class="text-uppercase" type="text" maxLength={50} ref={this.epfNoEl} name="epfo" />   
          </label>   
          <label>SOCSO No. : 
          <input class="text-uppercase" type="text" maxLength={50} ref={this.socsoNoEl} name="socsooNo" />  
          </label>             
          <label>Driving License No. : 
          <input class="text-uppercase" type="text" maxLength={50} ref={this.drivingLicenseNoEl} name="drivingLicenseNo" />  
          </label>     
          <label>Telephone No. : 
          <input type="text" maxLength={20} ref={this.telNoEl} name="telNo" />  
          </label>  
          <label>Hand phone No. :
          <input type="text" maxLength={20} ref={this.hpNoEl} name="hplNo" /> 
          </label>  
          <label>Fax No. :
          <input type="email"  maxLength={100} ref={this.emailEl} name="email"/>
          </label>  
           <label> Employment Date :
           <input type="date"  ref={this.employDateEl} required />
           </label>
           <label> Password: 
           <input type="password" ref={this.passwordEl} maxLength={15} />
           </label>


           </fieldset>

           <p>
           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Add New" />
           <button style={subStyle} onClick={event =>  window.location.href='EmployeeList'} >Back</button>
           </p>

    
    
        </form>
      )
    }
  };

export default employeeEdit;
