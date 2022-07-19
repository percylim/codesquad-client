import  React, {useState} from 'react';
// mport validator from 'validator'
// import ReactDOM from 'react-dom';
import EscapeStr from './mysqlConvertChar';
//import moment from 'moment';
import Axios from "axios";

 import  './UserProfile.css';
// import CustomerNew from './customerNew';
const fetch = require('node-fetch');
var lastSix = '';
// var glNo = '';
const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');
// var eDate = '';
//  var sDate = '';
var curr = new Date();
curr.setDate(curr.getDate() + 3);
var todayDate = curr.toISOString().substr(0,10);
var glData = [];
var bankData = [];    
var glNo ='';
var bankID = '';

class BankTransaction extends React.Component {
    constructor(props) {
      super(props);
      // create a ref to store the DOM element
     // this.state = { usersCollection: [] };
     
     // const [glAcData, setGlData] = useState([]);
     
      this.state = {
        input: {},
        errors: {},
        data: [],
        glData: [],
        bankData: [],
        state: {},
        number: 0,
        drAmt: 0.00,
        crAmt: 0.00, 
        glSel: 1,
       
        voucher: [],  
        columns: [
         
            {    
                dataField: 'id', 
                text: '#',  
                sort: false,
                headerStyle: { backgroundColor: 'yellow' }    
              }, 
        {  
          dataField: 'voucherNo',  
          text: 'voucher No.',  
          sort: false,
          headerStyle: { backgroundColor: 'yellow' }    
        }, 
        {  
            dataField: 'txnDate',  
            text: 'Txn. Date',  
            sort: false,
            headerStyle: { backgroundColor: 'yellow' }    
          }, 
        {  
          dataField: 'BankID',  
          text: 'Bank ID',  
          sort: true,
          headerStyle: { backgroundColor: 'yellow' }
        },  
        {  
            dataField: 'bankName',  
            text: 'Bank Name',
            headerStyle: { backgroundColor: 'yellow' }    
          }, 
             {  
                dataField: 'glNo',  
                text: 'G/L No.',  
                sort: false,
                headerStyle: { backgroundColor: 'yellow' }
             },  
              {  
                dataField: 'glSub',  
                text: 'G/L Sub',  
                sort: false,
                headerStyle: { backgroundColor: 'yellow' }  
              },  
              {  
                dataField: 'department',  
                text: 'Department',  
                sort: false,
                headerStyle: { backgroundColor: 'yellow' } 
              },  
              {  
                dataField: 'glName',  
                text: 'G/L Name',  
                sort: false ,
                headerStyle: { backgroundColor: 'yellow' }
              },  
              {  
                dataField: 'jeParticular',  
                text: 'Transaction Particular',  
                sort: false,
                headerStyle: { backgroundColor: 'yellow' }
              },   
              {  
                dataField: 'drAmt',  
                text: 'Dr. Amount',  
                sort: false,
                headerStyle: { backgroundColor: 'yellow' }
               }, 
               {  
                dataField: 'crAmt',  
                text: 'Cr. Amount',  
                sort: false ,
                headerStyle: { backgroundColor: 'yellow' }
               }, 
               {
                dataField: "remove",
                text: "Remove",
                formatter: (cellContent: string, row: IMyColumnDefinition) => {
                   
                        return <button class="btn btn-primary fa fa-trash-o fa-2x" onClick={this.onRemove(this.row.id)}></button>
                   
                },
            },
              
            ],
           
                          
           
          
      }; 
      
      this.handleInputChangeDr = this.handleInputChangeDr.bind(this);
      this.handleInputChangeCr = this.handleInputChangeCr.bind(this);
      
      this.formatInputDr = this.formatInputDr.bind(this);
      this.formatInputCr = this.formatInputCr.bind(this); 
     // this.handleChange = this.handleChange.bind(this);
    //  this.handleChangeType = this.handleChangeType.bind(this);
      this.addTransaction = this.addTransaction.bind(this);
      this.handleChangeGl = this.handleChangeGl.bind(this);
      this.handleChangeBank = this.handleChangeBank.bind(this); 
      this.handleSubmit = this.handleSubmit.bind(this);
     // this.onCancel = this.onCancel.bind(this);


     // this.companyIDEl = React.createRef();
      this.bankIDEl = React.createRef();
      this.bankNameEl = React.createRef(); 
      this.bankAcctNoEl = React.createRef();
      this.voucherNoEl = React.createRef();
      this.txnDateEl = React.createRef(); 
      this.glNoEl = React.createRef(); 
      this.glSubEl = React.createRef();
      this.departmentEl = React.createRef();
      this.glNameEl = React.createRef();
      this.jeParticularEl = React.createRef();  
      this.crAmtEl = React.createRef();           
      this.drAmtEl = React.createRef();
      this.handleSubmit = this.handleSubmit.bind(this);

    }
     
    componentDidMount() {   
        debugger;  
  
        Axios  
        .get(`http://localhost:9005/glList`,
          {  
           params: {   
                   companyID: companyID,
                  }
          }
        )        
            .then(res => {
              console.log(res);
              
              glData = res.data; 
                
              this.glNoEl.current.value = glData[0].glNo;
              this.glSubEl.current.value =  glData[0].glSub;
  
          //    glDepart = glData[0].department; 
              this.glNameEl.current.value = glData[0].glName; 
              this.departmentEl.current.value = glData[0].department;
             // glDesc = glData[0].glDescription;
            //   alert(glDesc);
               glNo = glData[0].glNo;
               this.setState({ glNo: glData[0].glNo }); 
    // window.alert(data[1].description);
             
               
         ////      setParticular("");
           //   setJeDesc(glDesc);
  
            //  this.setGlData({ glNo: glNo});  
              // window.alert(data[1].description);
            });
      
      
        Axios  
        .get(`http://localhost:9005/bankList`,
          {  
           params: {   
                   companyID: companyID,
                  }
          }
        )        
            .then(res => {
              console.log(res);
              
              bankData = res.data; 
                
              this.bankIDEl.current.value = bankData[0].bankID;
              this.bankNameEl.current.value =  bankData[0].bankName;
              this.bankAcctNoEl.current.value =  bankData[0].bankAcctNo;
          
               
               bankID = bankData[0].bankID;
               this.setState({ bankID: bankData[0].bankID }); 
        //  window.alert(bankData[0].bankName);
             
               
         ////      setParticular("");
           //   setJeDesc(glDesc);
  
            //  this.setGlData({ glNo: glNo});  
              // window.alert(data[1].description);
            });
          //  this.GlData = result.data; 
           
            
           
        //alert(data);  
        debugger;   
  
  
      }; 
    
  
      addTransaction(e) {
        e.preventDefault();
       //   econst fieldName = e.target.getAttribute("name");
          alert(e);

/*            var crVal = 0;
            var drVal = 0;
          //  alert(txnDate);
            if (txnDate === '') {
              alert("transaction Date cannot be blank");
              return false
            };
      
            if (txnDate === undefined) {
              alert("transaction Date cannot be blank");
              return false
            };
           if (typeof(drAmt)==='string') {
            // let drVal = number(drAmt); 
             drVal = parseFloat(drAmt);
              // alert(drVal);
           };
           if (typeof(crAmt)==='string') {
            // let drVal = number(drAmt); 
               crVal = parseFloat(crAmt);
              // alert(crVal);
           };
           // alert(typeof(drAmt));
           // alert(typeof(crAmt));
        if (drVal === 0 && crVal === 0) {   
      
           alert("Debit Amount and Credit Amount cannot be all 0 value" )
            return false
      
       };
      
       if (drVal  !==0 && crVal !== 0) {   
      
        alert("Debit Amount and Credit Amount can only input either one" )
          return false
      
      };
      //alert(voucherNo);
      if (voucherNo === '') {
        alert("Journal Voucher No. cannot be blank")
        return false
      };
       // alert(jeParticular);
      if (jeParticular === '') {
        alert("Journal Particular cannot be blank")
        return false
      };
      if (jeParticular === undefined) {
        alert("Journal Particular cannot be blank")
        return false
      };
      // alert("ready to add");
      
      //let {data, input} = e.target.value
      
      var vdrAmt = parseFloat(drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      var vcrAmt = parseFloat(crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      vid = vid+1
       const newData={
         id: vid,
        voucherNo: voucherNo,
        glNo: jeNo,
        glSub: jeSub,
        department: jeDep,
        jeParticular: jeParticular,
        glName: jeName,
        drAmt: vdrAmt,
        crAmt: vcrAmt,
        companyID: companyID,
        userName: userName,
        txnDate: new Date(),
      
      };

  */    
 };  

 handleChangeBank(e){
    const bankNo = e.target.value;
   // alert(bankNo);
    for (let i = 0; i < bankData.length; i++) { 
         
      if (bankData[i].bankID === bankNo) {
          this.bankIDEl.current.value = bankData[i].bankID;
          this.bankNameEl.current.value = bankData[i].bankName; 
          this.bankAcctNoEl.current.value = bankData[i].bankAcctNo;  
      }
   
    }   

  }

 handleChangeGl(e){
    const ID = Number(e.target.value);
    
   //  alert(typeof ID);
   //  alert(typeof glData[0].id);
     for (let i = 0; i < glData.length; i++) { 
      //  alert(glData[i].id);  
      if (glData[i].id === ID) {  
       // alert(glData[i].id);        
    this.glNoEl.current.value = glData[i].glNo; 
    this.glSubEl.current.value = glData[i].glSub;
    this.departmentEl.current.value = glData[i].department;
     this.glNameEl.current.value = glData[i].glName;
      }
     } 
   //  alert(glNo);
   // this.glNoEl.current.value = glData
  }

    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
       // alert(this.sexEl.current.value);

        const bank= {
          companyID: EscapeStr(companyID),
          userName: EscapeStr(userName),
          bankID:EscapeStr(this.bankIDEl.current.value.toUpperCase()),
          bankName: EscapeStr(this.bankNameEl.current.value),
          bankAcctNo: EscapeStr(this.bankAcctNoEl.current.value),
          voucherNo:  EscapeStr(this.voucherNoEl.current.value), 
          txnDate:  this.txnDateEl.current.value,  
          glNo: this.glNoEl.current.value,
          glSub: this.glSubEl.current.value,
          department: this.departmentEl.current.value,
          glName: EscapeStr(this.glNameEl.current.value), 
          jeParticular: EscapeStr(this.jeParticularEl.current.value),
          drAMt: this.drAmtEl.current.value,
          crAmt: this.crAmtEl.current.value,
          
         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(Level);
        fetch('http://localhost:9005/bankTransaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( bank )
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
       this.bankIDEl.current.value = '';
      this.bankNameEl.current.value = '';
      this.bankNameEl.current.value = '';
      this.bankAcctNoEl.current.value = '';
      this.voucherNoEl.current.value = '';
      this.txnDateEl.current.value = '';
      this.glNoEl.current.value = '';
      this.glSubEl.current.value = '';
      this.departmentEl.current.value = '';
      this.glNameEl.current.value = '';
      this.jeParticularEl.current.value = '';
      this.crAmtEl.current.value = 0.00;
      this.drAmtEl.current.value = 0.00;
      this.handleSubmit = this.handleSubmit.bind(this);
    }



  }



    validate(){
       if (this.voucherNoEl.current.value === '') {
           alert("Voucher No. cannot be Blank");
           return false
       }
       if (this.jeParticulatEl.current.value === '') {
        alert("Transaction Particular cannot be Blank");
        return false
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
/*
onCancel (e) {
    
      
    this.voucherNoEl.current.value = '';
   
    this.jeParticularEl.current.value = ''; 
    this.crAmtEl.current.value = '0.00';
    this.drAmtEl.current.value = '0.00';
   
 }
*/
  handleInputChangeDr(event) {
   // alert(event.target.value);
   let num = event.target.value
   // this.drAmtEl.current.value = num;
    this.setState({
      drAmt: event.target.value
    })
  }

  handleInputChangeCr(event) {
    console.log(event.target.value)
 //   this.crAmtEl.current.value = event.target.value;
    this.setState({
     crAmt: event.target.value
     })
  }; 
  formatInputDr() {
    const num = this.state.drAmt;
    this.setState({
        drAmt: parseFloat(num).toFixed(2)
    })
  };

  formatInputCr() {
    const num = this.state.crAmt;
    this.setState({
        crAmt: parseFloat(num).toFixed(2)
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
      const backStyle = { 
        color: "white",
        backgroundColor: "green",
        padding: "10px 15px 10px 10px",
        fontFamily: "Arial",
        left: 1000,
    };  
      const logstyle = {
          color: "white",
          backgroundColor: "red",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          

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
          
           <h1>Bank Transaction Entry</h1>
           <label style={{paddingRight: '280px'}}>Voucher No. :                  
           <input class="text-uppercase" minlength={4} maxLength={20} placeholder="JV" ref={this.voucherNoEl} name="VoucherNo" required ={true} />
           </label>   

           <label style={{paddingRight: '520px'}}> Transaction Date :       
          <input type="date" style={{width: '45%'}} ref={this.txnDateEl} maxLength={10} name="TxnDate"  />
          </label>  

           <div className="select-container" >
          <label style={{paddingRight: '380px'}}>Bank Account Selection :  
          <select onChange={this.handleChangeBank}>
            {bankData.map((items) => (
              <option value={items.bankID} required> (Bank ID-{items.bankID}) (Bank Name-{items.bankName})</option>
           ))}
          </select>
       
         
          </label>  
          </div> 
           <label style={{paddingRight: '200px'}}>Bank ID :                  
          <input class="text-uppercase" minlength={4} maxLength={10} ref={this.bankIDEl} name="BankID" readonly ={true} />
          </label>
         
          <label style={{paddingRight: '280px'}}>Bank Name : 
          <input type="text" maxLength={200} ref={this.bankNameEl} name="BankName" readonly={true} />
          </label>

          <label style={{paddingRight: '395px'}}> Bank Account No. :                
          <input type="text" ref={this.bankAcctNoEl} maxLength={30} name="bankAccount" readyonly={true}  />
          </label>  

          <div className="select-container" >
          <label style={{paddingRight: '750px'}}>G/L Account Selection : 
          <select onChange={this.handleChangeGl}>
            {glData.map((item) => (
              <option value={item.id} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
           ))}
          </select>
       
         
          </label>  
          </div>

        

          <label style={{paddingRight: '290px'}}>G/L No. : 
          <input type="text" maxLength={10} ref={this.glNoEl}  name="GlNo" readonly={true}/>
          </label>  

          <label style={{paddingRight: '320px'}}>G/L Sub No. :
          <input type="text" maxLength={10} ref={this.glSubEl} name="GlSub" readonly={true} />       
          </label>         
  
          <label style={{paddingRight: '320px'}}>Department : 
          <input type="text" maxLength={10} ref={this.departmentEl} name="Department" readonly={true}/>   
          </label>   
          <label style={{paddingRight: '300px'}}>G/L Name : 
          <input type="text" maxLength={50} ref={this.glNameEl} name="GlName" readonly={true}/>  
          </label>             


          <label style={{paddingRight: '500px'}}>Transaction Particular :  
          <input type="text" maxLength={200} ref={this.jeParticularEl} name="Particular" required={true} />
          </label> 
          
        

          <label style={{paddingRight: '340px'}}>Debit Amount : 
          <input type="number" value={ this.state.drAmt } defaultValue='0.00' onChange={ this.handleInputChangeDr }
          onBlur={ this.formatInputDr } maxLength={15} placeholder="0.00" ref={this.drAmtEl} name="DrAmt" 
          
          />
          </label>
          
          <label style={{paddingRight: '340px'}}>Credit Amount : 
          <input type="number" value={ this.state.crAmt } defaultValue='0.00' onChange={ this.handleInputChangeCr }
          onBlur={ this.formatInputCr } maxLength={15} placeholder="0.00" ref={this.crAmtEl} name="CrAmt" 
          
          />
          </label>
          
           </fieldset>

           <p>
           <button class="btn btn-danger btn-md" onClick={this.handleSubmit} >Save Transaction </button>
           <button class="btn btn-primary btn-md" onClick={this.addTransaction} >Add Transaction</button>
           <button class="btn btn-success btn-md" onClick={event =>  window.location.href='bankTransaction'} >Back</button>
           </p>

    
    
        </form>
      )
    }
  };

export default BankTransaction;
