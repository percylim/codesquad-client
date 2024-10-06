import  React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import EscapeStr from './mysqlConvertChar';
//import { withRouter } from "react-router-dom";
import Axios from "axios";

 import  './UserProfile.css';

 //require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const fetch = require('node-fetch');
var lastSix = '';
var depNo = '';
var gType= '';
//var data =[];
var depData = [];
 var typeData = [];
var glData = [];
//var history = useHistory();
const companyID = localStorage.getItem('companyID');
var glNo = localStorage.getItem('glNo');
var glSub = localStorage.getItem('glSub');
//var companyName = localStorage.getItem('companyName')
//  var eDate = '';
//   var sDate = '';
 // alert(glNo+' = '+glSub);


  class glEdit extends React.Component {
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
        glData: [],
        depData: [],


      };
      glNo=localStorage.getItem('glNo');
      glSub=localStorage.getItem('glSub');

      //alert(glNo+' = '+glSub);




     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleInputChange = this.handleInputChange.bind(this);
     this.formatInput = this.formatInput.bind(this);
     // this.handleChange = this.handleChange.bind(this);
     this.handleChangeType = this.handleChangeType.bind(this);
     this.handleChangeDep = this.handleChangeDep.bind(this);
     this.handleBack = this.handleBack.bind(this);
   // this.companyIDEl = React.createRef();
   this.glNoEl = React.createRef();
   this.glSubEl = React.createRef();
   this.departmentEl = React.createRef();
   this.glNameEl = React.createRef();
   this.glDescriptionEl = React.createRef();
   this.glTypeEl = React.createRef();

}



// ***************

componentDidMount() {
glNo = localStorage.getItem('glNo');
 glSub = localStorage.getItem('glSub');

//  const body = {
//    companyID : companyID,
//    glNo: glNo,
//    glSub: glSub,
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
  depData = res.data;
  this.setState({depData:res.data})
  if (depData.length === 0) {
  //  window.location.href ='glEdit';
  }
  depNo = depData[0].department;

 this.setState({ depNo: depData[0].department });
  // window.alert(data[1].description);
})
.catch(function (error) {
  alert("server connection Fail in Department");

  });

 Axios
  .get(url + `/glTypeInfo`,
    {
      params: {
      companyID: companyID,
      glNo: glNo,
      glSub: glSub,

      }
    }
).then(res => {
  console.log(res);
  typeData = res.data;
 // this.setState({typeData:res.data})
  gType = res.data[0].glType;
 // alert(res.data[0].glType);
 // this.setState({ gType: typeData[0].glType });
// this.glTypeEl.current.value = res.data[0].glType;
 //  this.setState({ gType: res.data[0].glType});
  // this.setState({ gType: typeData[0].glType });
//  this.setState({ gType: e.target.value });
  // window.alert(data[1].description);
})
.catch(function (error) {
  alert("server connection Fail in G/L account Type");

  });
  Axios
  .get(url + `/glData`,
    {
      params: {
      companyID: companyID,
      glNo: glNo,
      glSub: glSub,

      }
    }
).then(res => {
console.log(res);
glData = res.data;
this.setState({glData:res.data})
if (glData.length === 0) {
//  window.location.href ='glEdit';
}
// alert(glData[0].glDescription);
  this.glNoEl.current.value = glData[0].glNo;
 this.glSubEl.current.value =  glData[0].glSub;
 this.departmentEl.current.value= glData[0].department;
 depNo = glData[0].department;
 this.setState({ depNo: glData[0].department });
   this.glNameEl.current.value = glData[0].glName;
   this.glDescriptionEl.current.value = glData[0].glDescription;
 this.glTypeEl.current.value= glData[0].glType;
 gType = glData[0].glType;
 //this.setState({ gType: glData[0].glType });
 this.glTypeEl.current.value = gType;
 this.setState({ gType: gType});
 //this.departmentEl.current.value = departmentData[0].department;
// alert(glData[0].glName);

})

.catch(function (error) {
//alert("server connection Fail in G/L Account Data");
 window.location.href ='glEdit';
});
//lert(this.glType);
//this.handleChangeType(glType);

};

handleChangeDep(e) {
  // alert(typeof e)
  // this.setState({ department: e.target.value });
   depNo = e.target.value;
   //   this.setState({ department: depNo});
   for (let i = 0; i < depData.length; i++) {
       if (depData[i].department === depNo) {
        this.departmentEl.current.value = depNo;
        this.setState({ depNo: depNo});
       }


   }

 //  alert(depNo);
 }

 handleChangeType(e) {
  // alert(e.target.value);
   this.setState({ gType: e.target.value });
   gType = e.target.value;
 //  for (let i = 0; i < typeData.length; i++) {
 // if (typeData[i].glType === gType) {
 //  this.glTypeEl.current.value = gType;
 //  this.setState({ gType: gType});
 // }


//}

 } ;




    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
       // alert(this.sexEl.current.value);

        const user= {
          companyID: EscapeStr(companyID),
          glNo: EscapeStr(this.glNoEl.current.value),
        //    glNo: '129930',
        glSub: EscapeStr(this.glSubEl.current.value),

          department: depNo,
          glName: EscapeStr(this.glNameEl.current.value),
          glDescription: EscapeStr(this.glDescriptionEl.current.value),

          glType: gType,

         };
         //var name1 =  EscapeStr(user.companyName);
      //  alert(this.dateBirthEl.current.value);
        fetch(url+'/glUpdate', {
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
           // localStorage.clear();
           localStorage.removeItem("glNo");
           localStorage.removeItem("glSub");
            window.location.reload(false);
            window.location.href ='glList';
           };
          })
            .catch(error => {
            // alert(  error.toString() );
               alert('error occured :'+error);
             })

    }



  }



    validate(){
        if (this.glNoEl.current.value ==="") {
            alert("General Ledger No.Must not blank");
            return false;

         };

         if (this.glSubEl.current.value ==="") {
            alert("General Ledger Sub No. Must not blank");
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
      alert("General Ledger Account Type not selected");
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



  handleBack() {
    this.props.history.push("/glList");
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
          padding: "2px 15px 10px 18px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          width: '6em',
          height: '3em',

      };









      return (


        <form style={mystyle} onSubmit={this.handleSubmit}>
          <fieldset>

           <h1>Edit General Ledger Profile</h1>
           <label>G/L No. :
          <input class="text-uppercase" minlength={4} maxLength={4} ref={this.glNoEl}  name="glNo" readOnly= {true} required />
          </label>
           <label>G/L Sub No. :
          <input type="text-uppercase" minLength={3} maxLength={3} ref={this.glSubEl} name="glSub" readOnly= {true} required />
          </label>
          <label> G/L Name :
      <Tooltip
        title="Type new general ledger name if require to make change"
        placement="top"
        > 
         <input type="text" maxLength={50} ref={this.glNameEl} name="glName" required />
       </Tooltip>
      
         </label>

          <label>G/L Description :
       <Tooltip
        title="Type new general ledger description if require to make change"
        placement="top"
        > 

          <input type="text" maxLength={50} ref={this.glDescriptionEl}  name="glDescription" required />
         </Tooltip>
       </label>






          <div className="select-container">
          <label style={{paddingRight: '260px'}}>G/L Account Type :
          <select value={this.state.gType} onChange={this.handleChangeType}>
            {typeData.map((item) => (
              <option ref={this.glTypeEl} value={item.glType} required> {item.glType} {item.glTypeName} </option>
           ))}
          </select>

          </label>
          </div>



          <div className="select-container" >
          <label style={{paddingRight: '200px'}}>Department :
          <select value={this.state.depNo} onChange={this.handleChangeDep}>
            {depData.map((item) => (
              <option ref={this.departmentEl} value={item.department} required> {item.department} {item.description} </option>
           ))}
          </select>


          </label>
          </div>

           </fieldset>

           <p></p>

        <Tooltip
        title="Click to update all change"
        placement="top"
        > 
           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Update" />
         </Tooltip>
     <Tooltip
        title="Click to return back to General Ledger Listing page"
        placement="top"
        >       
         
           <button style={subStyle} name='back' onClick={this.handleBack} >Back</button>
         </Tooltip>

           </form>




      )
    }
  };

export default glEdit;
