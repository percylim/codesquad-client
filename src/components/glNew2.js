import  React  from 'react';
import Axios from 'axios';  

import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
//import Axios from "axios";

 import  './UserProfile.css';
const fetch = require('node-fetch');
var lastSix = '';
var depNo = '';
//var options = [];
// var list = [];
 var data =[];
//var alert = require("alert");
// var [data, setData] = useState([]);  
const companyID = localStorage.getItem('companyID');
// var userLevel = localStorage.getItem('userLevel');
// const companyName = localStorage.getItem('companyName')
// var eDate = '';
//  var sDate = '';

class GlNew extends React.Component {
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
        department: [],
        depNo: '001',
       
        
        
      };
      
      
      this.handleInputChange = this.handleInputChange.bind(this);
      this.formatInput = this.formatInput.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    // this.handleChangeType = this.handleChangeType.bind(this);
     // this.handleChangeMarried = this.handleChangeMarried.bind(this);
      this.handleChangeDep = this.handleChangeDep.bind(this); 
      

      this.companyIDEl = React.createRef();
      this.glNoEl = React.createRef();
      this.glSubEl = React.createRef(); 
      this.departmentEl = React.createRef(); 
      this.glNameEl = React.createRef(); 
      this.glDescriptionEl = React.createRef();
      this.opBalanceEl = React.createRef(); 
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
  componentDidMount() {   
    const body = {
      companyID : companyID, 
     
    };
  
   Axios({
    method: 'post',
    url: 'http://localhost:9005/departmentInfo',
    data: body
  })
  .then(res => {
    console.log(res);
    data = res.data; 
    // window.alert(data[1].description);
  })
     
};     


  

// options = data[0];

 // alert(options);
 handleChangeDep(e) {
     
      this.setState({ level: e.target.value });
      depNo = e.target.value;
   //   alert(Level);
    }

    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
       // alert(this.sexEl.current.value);

        const user= {
          companyID: EscapeStr(companyID),
          glNo:EscapeStr(this.glNoEl.current.value.toUpperCase()),
          glSub: EscapeStr(this.glSubEl.current.value),  
          department: depNo,
          glName: EscapeStr(this.glNameEl.current.value),
          glDescription: EscapeStr(this.glDescriptionEl.current.value),
          opBalance: this.opBalanceEl.current.value, 
         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
        fetch('http://localhost:9005/glNew', {
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
       this.glNoEl.current.value = "";
       this.glSubEl.current.value = "";
       this.departmentEl.current.value = "";
       this.glNameEl.current.value = "";
       this.glDescriptionEl.current.value = "";
       this.opBalanceEl.current.value = "0.00";
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

   
 
 
//options = data.slice;
 options = data.slice(0,4);

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
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          

      };

      const onCancel= () => {
        this.glNoEl.current.value = "";
        this.glSubEl.current.value = "";
        this.departmentEl.current.value = "";
        this.glNameEl.current.value = "";
        this.glDescriptionEl.current.value = "";
        this.opBalanceEl.current.value = "0.00";      
     };


     
      
    //const options=list.slice(0,5-userLevel);
    
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
          
           <h1>General Ledger Profile Maintenance</h1>
           <label>General Ledger No. :                  
          <input class="text-uppercase" minlength={4} maxLength={10} ref={this.glNoEl} name="glNo" required />
          </label>
           <label>General Ledger Sub Name : 
          <input type="text" minLength={3} maxLength={10} ref={this.glSubEl} name="glsub" required />
          </label>
   
         
          <label>General Ledger Name : 
          <input type="text" maxLength={50} ref={this.glNameEl} name="position" required /> 
          </label>   
         

          <label>General Ledger Description: 
          <input type="text" maxLength={50} ref={this.glDescriptionEl} name="position" required /> 
          </label>   

          <label>Opening Balance: 
          <input type="number" value={ this.state.number } defaultValue='0.00' onChange={ this.handleInputChange }
          onBlur={ this.formatInput } maxLength={15} placeholder="0.00" ref={this.opBalanceEl}   name="opbalance" />
          </label>

         
          
          <label>Department :  
          <div className="select-container">
        
          <select onChange={this.handleChangeDep}>
            {data.map((item) => (
              <option ref={this.departmentEl} value={item.department} required> {item.department} {item.description} </option>
           ))}
          </select>
        </div>
         
          </label>  

           </fieldset>

           <p>
           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Add New" />
           <button style={buttonStyle} onClick={onCancel}>Clear</button>
           <button style={subStyle} onClick={event =>  window.location.href='GlList'} >Back</button>
           </p>

    
    
        </form>
      )
    }
  };

export default GlNew;
