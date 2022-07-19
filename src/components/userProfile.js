import  React from 'react';
//import { DATE } from 'sequelize/types';
// import ReactDOM from 'react-dom';
//import saveData from './userData';
import './UserProfile.css';


class UserProfile extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the DOM element

      this.state = {
        input: {},
        errors: {}
      };
      this.nameEl = React.createRef();
      this.phoneEl = React.createRef();
      this.addressEl = React.createRef();
      this.emailEl = React.createRef();
      this.passwordEl = React.createRef();
      this.confirmPasswordEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
        // alert(this.emailEl.current.value);

        const user= {
          userName: this.nameEl.current.value,
          email: this.emailEl.current.value,
          phone: this.phoneEl.current.value,
          address: this.addressEl.current.value,
          password: this.passwordEl.current.value,

        };
        //alert(user);
        fetch('http://localhost:9002/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify( user )
          // We convert the React state to JSON and send it as the POST body
         // data: JSON.stringify(user,user.ame)
        }).then(function(response) {
          console.log(response);
        //  alert(response);
          return response.json();
        }).then(function(body){
          console.log(body);
          }).then(res => this.setState({ apiResponse: res }
            
          )).catch(err => err);
        
      

       // let input = this.state.input;
        //let input = {};
       // this.nameEl.current.value = "";
       // this.emailEl.current.value = "";
       // this.phoneEl.current.value = "";
       // this.addressEl.current.value = "";
       // this.passwordEl.current.value = "";
       // this.confirmPasswordEl.current.value = "";
       // this.setState({input:input});
       // alert('A form was submitted: ' + this.state);
      //  alert('Registration Form is submitted '+this.emailEl.current.value);
        
    }

  
  }  

  

    validate(){

       // let input = this.state.input;
        let errors = {};
        let isValid = true;

        // alert(input[this.passwordEl.current.value]);
        // alert(this.confirmPasswordEl.current.value);
        if (this.passwordEl.current.value !== "undefined" && this.confirmPasswordEl.current.value !== "undefined") {
        
        if (this.passwordEl.current.value !== this.confirmPasswordEl.current.value) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
          alert("Password and confirm password don't match.");
        }
      }
      this.setState({
        errors: errors
      });
  
      return isValid;

    }
  
   
    render() {
        const mystyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial",
        
        };

        const formStyle = {
          textArea: {
          border: 5,
          boxShadow: 'none',
          margin: 5,
          overflow: 'hidden',
          resize: 'none',
          ariaHidden: 'true',

        
  },
};

        const buttonStyle = {
          color: "black",
          backgroundColor: "yellow",
          padding: "1px",
          paddingLeft: "10px",
          paddingRight: "10px",
          margin: "20px",
          fontFamily: "Arial",
      
      };
     
      
  

      const onCancel= () => {
        this.nameEl.current.value = "";
        this.emailEl.current.value = "";
        this.phoneEl.current.value = "";
        this.addressEl.current.value = "";
        this.passwordEl.current.value = "";
        this.confirmPasswordEl.current.value = "";
    
     };
    
      
      return (

        

        <form style={mystyle} onSubmit={this.handleSubmit}>
          <fieldset>
          
           <h1>User Registration</h1>
          
           
          
          <label>
          User Name : 
          </label>
          <input type="text" ref={this.nameEl} name="username" required/>
          
        
          
          <label>User Email : </label>
          <input type="email" maxLength={100} ref={this.emailEl} name="email" required/>
    
        
           <label> User Telephone : </label>
           <input type="text" maxLength={20} ref={this.phoneEl} name="phone" required />
    

           <label> Shipping Address :  </label>
           <textarea style={formStyle} rows="3" cols="85" maxLength={255} id="multiLineInput" ref={this.addressEl} name="address" required></textarea>
          
           <label> Password : </label>
           <input type="password" name="password" ref={this.passwordEl} required />
           
           
           <label> Confirm Password : </label>
           <input type="password" name="confirmPassword" ref={this.confirmPasswordEl} required />
          
           
           </fieldset>
           
           <p>
           <input type="submit" name="Submit" />   
           <button style={buttonStyle} onClick={onCancel}>Clear</button>
           </p>
          
          
      
          
        </form>
      )
    }
  };

export default UserProfile;
