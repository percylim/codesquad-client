import  React  from 'react';
import Axios from 'axios';
import Tooltip from "@material-ui/core/Tooltip";
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
//import Axios from "axios";

 import  './UserProfile.css';
 //require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var lastSix = '';
var depNo = '';
var gType= '';
//var options = [];
// var list = [];
 var data =[];
 var typeData = [];
 //var glType = [];
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
        depNo: '',
        gType: '',
        typeData: [],
        glType: [],

      };


      this.handleInputChange = this.handleInputChange.bind(this);
      this.formatInput = this.formatInput.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    // this.handleChangeType = this.handleChangeType.bind(this);
     // this.handleChangeMarried = this.handleChangeMarried.bind(this);
      this.handleChangeDep = this.handleChangeDep.bind(this);
      this.handleChangeType = this.handleChangeDep.bind(this);

      this.companyIDEl = React.createRef();
      this.glNoEl = React.createRef();
      this.glSubEl = React.createRef();
      this.departmentEl = React.createRef();
      this.glNameEl = React.createRef();
      this.glDescriptionEl = React.createRef();
      this.glTypeEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
    }


  componentDidMount() {
  //  const body = {
  //    companyID : companyID,

  //  };
    Axios
    .get(url + `/departmentInfo`,
      {
        params: {
        companyID: companyID,

        }
      }
   ).then(res => {
    console.log(res);
    data = res.data;
    depNo = data[0].department;
    this.setState({data:res.data})
   this.setState({ depNo: data[0].department });
    // window.alert(data[1].description);
  })

  Axios
  .get(url + `/glTypeInfo`,
    {
      params: {
      companyID: companyID,

      }
    }
 ).then(res => {
    console.log(res);
    typeData = res.data;
    this.setState({typeData:res.data})
    gType = typeData[0].glType;
    this.setState({ gType: typeData[0].glType });
    // window.alert(data[1].description);
  })


};




// options = data[0];

 // alert(options);
 handleChangeDep(e) {

     // this.setState({ department: e.target.value });
      depNo = e.target.value;
     // alert(depNo);
    }

    handleChangeTyp(e) {
    //  alert(e);
     // this.setState({ glType: e.target.value });
      gType = e.target.value;
    //  alert(gType);

    } ;
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
          glType: gType,
          glName: EscapeStr(this.glNameEl.current.value),
          glDescription: EscapeStr(this.glDescriptionEl.current.value),

         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
        fetch(url+'/glNew', {
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
       //this.departmentEl.current.value = "";
       //this.glTypeEl.current.value = "";
       this.glNameEl.current.value = "";
       this.glDescriptionEl.current.value = "";

    }

  };





    validate(){
      if (this.glNoEl.current.value ==="") {
        alert("General Ledger No.Must not blank");
        return false;
     };

      let  prod=this.glNoEl.current.value;
  for (let i = 0; i < prod.length; i++) {
      if (prod.substr(i,1) === ';') {
        alert("G/L No. cannot contain (;) letter ");
        return false;
      }

  }



  for (let i = 0; i < prod.length; i++) {
      if (prod.substr(i,1) === ';') {
        alert("G/L Sub cannot contain (;) letter ");
        return false;
      }

  }

     if (this.glNoEl.current.value.length <4) {
        alert("General Ledger No. length must at least 4");
        return false;
     };

     if (this.glSubEl.current.value ==="") {
      alert("General Ledger Sub No. Must not blank");
      return false;
     };

     if (this.glSubEl.current.value.length <3) {
      alert("General Ledger Sub No. Must least 3");
      return false;
     };

     if (this.glNameEl.current.value ==="") {
        alert("General Ledger Name Must not blank");
        return false;
     };
     if (depNo ==="") {
      alert("Department not selected");
      return false;
   };

   if (this.glDescriptionEl.current.value ==="") {
    alert("General Ledger Description Must not blank");
    return false;
 };

 if (gType ==="") {
  alert("General Ledger Account not selected");
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
            padding: "1px 15px 10px 10px",
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
          width: '4em',
          height: '3em',
      };

      const onCancel= () => {
        this.glNoEl.current.value = "";
        this.glSubEl.current.value = "";
       // this.departmentEl.current.value = "";
       // this.glTypeEl.current.value = "";
        this.glNameEl.current.value = "";
        this.glDescriptionEl.current.value = "";

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


        <form style={mystyle}  onSubmit={this.handleSubmit}>
          <fieldset >

           <h1>General Ledger Profile Maintenance</h1>
           <label>General Ledger No. :
           </label>
     <Tooltip
        title="Enter General Ledger Number with 4 digits"
        placement="top"
      >  
       
          <input  class="text-uppercase" minlength={4} maxLength={4} onBlur={ this.formatInput } ref={this.glNoEl} name="glNo" required />
       </Tooltip>  
         
           <label>General Ledger Sub No. :
           </label>
     <Tooltip
        title="Enter General Ledger Sub-Number with 3 digits"
        placement="top"
      >  
          <input type="text" minLength={3} maxLength={3} ref={this.glSubEl} name="glsub" required />
      </Tooltip>


          <label>General Ledger Name :
          </label>
      <Tooltip
        title="Enter General Ledger Name with maximum 250 characters"
        placement="top"
      >  
          <input type="text" maxLength={250} ref={this.glNameEl}  name="position" required />
       </Tooltip>
          <label>General Ledger Description:</label>
  <Tooltip
        title="Enter General Ledger Description with 4 digits"
        placement="top"
      >   
   
          <input type="text" maxLength={250} ref={this.glDescriptionEl} name="position" required />
   </Tooltip>
 
          <div className="select-container">
          <label style={{paddingRight: '260px'}}>G/L Account Type :
          
          <select onChange={this.handleChangeTyp}>
            {typeData.map((item) => (
              <option ref={this.glTypeEl} value={item.glType} required> {item.glType} {item.glTypeName} </option>
           ))}
          </select>
          </label> 
          </div>

          <div className="select-container" >
          <label style={{paddingRight: '200px'}}>Department :
         
          <select onChange={this.handleChangeDep}>
            {data.map((item) => (
              <option ref={this.departmentEl} value={item.department} required> {item.department} {item.description} </option>
           ))}
          </select>
          </label>
          </div>
           </fieldset>

           <p>
      <Tooltip
        title="Click to Add New General Ledger record"
        placement="top"
      > 
           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Save" />
       </Tooltip>
      
       <Tooltip
        title="Click to clear General Ledger Profile data"
        placement="top"
      >       
           <button style={buttonStyle} onClick={onCancel}>Clear</button>
       </Tooltip>
      <Tooltip
        title="Click to return to General Ledger Listing Pge"
        placement="top"
      >    

           <button style={subStyle} onClick={event =>  window.location.href='GlList'} >Back</button>
       </Tooltip>
           </p>



        </form>
      )
    }
  };

export default GlNew;
