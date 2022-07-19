import React, { useState, useEffect } from 'react'  
import Axios from 'axios';  
import { useHistory } from "react-router-dom";


import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
//import Axios from "axios";

 import  './UserProfile.css';
const fetch = require('node-fetch');
var lastSix = '';
var depNo = '';
var gType= '';
 var data =[];
 var typeData = [];
//var glData = [];
var state = {};
const companyID = localStorage.getItem('companyID');
function GlEdit(glNo,glSub) {  
    const [gldata, setData] = useState([]);  


   
/*
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
       // glData: [],
      };
    */  
    //  this.handleInputChange = this.handleInputChange.bind(this);
    //  this.formatInput = this.formatInput.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    // this.handleChangeType = this.handleChangeType.bind(this);
     // this.handleChangeMarried = this.handleChangeMarried.bind(this);
    //  this.handleChangeDep = this.handleChangeDep.bind(this); 
     // this.handleChangeType = this.handleChangeType.bind(this); 

    //  this.companyIDEl = React.createRef();
      this.glNoEl = React.createRef();
      this.glSubEl = React.createRef(); 
      this.departmentEl = React.createRef(); 
      this.glNameEl = React.createRef(); 
      this.glDescriptionEl = React.createRef();
      this.glTypeEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);


    const history = useHistory();
    
      
      useEffect(() => {  
        const body = {
            companyID : companyID, 
            glNo: glNo, 
            glSub: glSub,     
          };
        
         Axios({
          method: 'post',
          url: 'http://localhost:9005/glData',
          data: body
        })
        .then(res => {
          console.log(res);
         const glData = res.data; 
         this.glNoEl.current.value = glData[0].glNo; 
         this.glSubEl.current.value = glData[0].glSub;
         this.departmentEl.current.value = glData[0].department;
         depNo = glData[0].department;
         this.setState({ depNo: glData[0].department });
         this.glNameEl.current.value = glData[0].glName;
         this.glDescriptionEl.current.value = glData[0].glDescription;
         this.glTypeEl.current.value = glData[0].glType; 
         gType = glData[0].glType;
         this.setState({  gType: glData[0].glType });

        })
        .catch(function (error) {
            alert(error);
          });
  
  
  
  
  
  
    }); 
   
    const handleChangeDep = (e) => {
     
        this.setState({ department: e.target.value });
        depNo = e.target.value;
      };

      const handleChangeType = (e) => {
        //  alert(e);
         // this.setState({ glType: e.target.value });
          gType = e.target.value;
        //  alert(gType);
        }; 

        const handleSubmit = (e) => {
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
               fetch('http://localhost:9005/glupdate', {
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
              this.glTypeEl.current.value = "";
              this.glNameEl.current.value = "";
              this.glDescriptionEl.current.value = "";
           
           }
       
       
       
         };
       
         const validate = () => {
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
        alert("General Ledger Account not selected");
        return false;
      };

    };

    const allowOnlyNumericsOrDigits = (e) => {
		const charCode = e.which ? e.which : e.keyCode;

		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			this.setState({ error: 'OOPs! Only numeric values or digits allowed' });
		}
	};
    const onValueChange = (event) => {
        this.setState({value:event.target.value})
      };
      
      
      
        const handleInputChange = (event) => {
          console.log(event.target.value)
          this.setState({
            number: event.target.value
          });
        };

        const formatInput = () => {
            const num = this.state.number
            this.setState({
                number: parseFloat(num).toFixed(2)
            });
          };

         
            const mystyle = {
                color: "BLACK",
                backgroundColor: "#ffffff",
                padding: "5px 15px 10px 10px",
                alignItems: "left",
                fontFamily: "Arial",
                textAlign: "left",
              
              
               
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
              padding: "10px 15px 10px 10px",
              fontFamily: "Arial",
              position: 'absolute',
              right: 800,
              
    
          };
    
         
    
         
          
       

     
    return (  
        <form style={mystyle} onSubmit={this.handleSubmit}>
        <fieldset>
        
         <h1>Edit General Ledger Profile</h1>
         <label>General Ledger No. :                  
        <input class="text-uppercase" minlength={4} maxLength={10} ref={this.glNoEl} name="glNo" required readOnly= {true}/>
        </label>
         <label>General Ledger Sub No. : 
        <input type="text" minLength={3} maxLength={10} ref={this.glSubEl} name="glsub" required readOnly= {true}/>
        </label>
 
       
        <label>General Ledger Name : 
        <input type="text" onBlur={ this.handleChange} maxLength={50} ref={this.glNameEl} onBlur={ this.formatInput }  name="glname" required /> 
        </label>   

    

        <label>General Ledger Description: 
        <input type="text" maxLength={50} ref={this.glDescriptionEl} name="description" required /> 
        </label>   

        <label>G/L Account Type :  
        <div className="select-container">
      
        <select value={this.state.gType} onChange={this.handleChangeTyp}>
          {typeData.map((item) => (
            <option ref={this.glTypeEl} value={typeData.value} required> {item.glType} {item.glTypeName} </option>
         ))}
        </select>
      </div>
       
        </label>    
         
        
        <label>Department :  
        <div className="select-container">
      
        <select value={this.state.fepNo} onChange={this.handleChangeDep}>
          {data.map((item) => (
            <option ref={this.departmentEl} value={data.value} required> {item.department} {item.description} </option>
         ))}
        </select>
      </div>
       
        </label>  

         </fieldset>

         <p>
         <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Add New" />
         
         <button style={subStyle} onClick={event =>  window.location.href='GlList'} >Back</button>
         </p>

  
  
      </form>
    )

}  

  
export default GlEdit;  
