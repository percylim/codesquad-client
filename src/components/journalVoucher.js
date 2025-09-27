import React, { useState, useEffect } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import generatePDF from "./reportGenerator";
import moment from 'moment';
import Tooltip from "@material-ui/core/Tooltip";

 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');
localStorage.removeItem('voucherNo')
// const userLevel = localStorage.getItem('userLevel');
 var glData = []
 //var voucher=[];
 var glAcctNo  = '';
 var glSubNo = ''
 var glDepart = '';
 var glName = '';
 var glType = '';
 var totalDrAmt = 0;
 var totalCrAmt = 0;
 var glNo='';


 //var data = []
 var curr = new Date();
 curr.setDate(curr.getDate() - 1);
 var todayDate = curr;
  var vid =0
 var lastSix = '';
var lRead = false;
 var lSave = true;

function JournalVoucher() {
    const [data, setData] = useState([]);

   // const [glAcData, setGlData] = useState([]);
    const [jeNo, setJeNo] = useState("");
    const [jeSub, setJeSub] = useState("");
    const [jeDep, setJeDep] = useState("");
    const [txnDate, setTxnDate] = useState(todayDate);
    const [jeName, setJeName] = useState("");
    const [drAmt, setDrAmt] = useState('');
    const [crAmt, setCrAmt] = useState('');
    const [jeParticular, setPart] = useState("");
    const [voucherNo, setVoucherNo] = useState("");
    const mystyle = {
        textAlign:"left",

    };
   
   
      const buttonStyle = {
        color: "white",
        backgroundColor: "blue",
        padding: "5px 10px 2px 10px",
        fontFamily: "Arial",
        position: 'absolute',
        right: 550,
        size: 20,
    };

   // localStorage.setItem('departmentID','');

  //  const history = useHistory();



      useEffect(() => {


        //debugger;
        Axios
        .get(url+`/api/glList`,
          {
           params: {
                   companyID: companyID,
                  }
          }
        )
            .then(res => {
              console.log(res);

              glData = res.data;

              glAcctNo = glData[0].glNo;
              glSubNo =  glData[0].glSub;

          //    glDepart = glData[0].department;
              glName = glData[0].glName;
              glDepart = glData[0].department
             // glDesc = glData[0].glDescription;
            //   alert(glDesc);
               glNo = glData[0].glNo;
               glType = glData[0].glType;
           //   setGlData({ glAcctNo: glAcctNo });
              setJeNo(glAcctNo);
              setJeSub(glSubNo);
              setJeDep(glDepart);
              setJeName(glName);
              setDrAmt(0.00);
               setCrAmt(0.00);

         ////      setParticular("");
           //   setJeDesc(glDesc);

             // this.setGlData({ glNo: glAcctNo});
              // window.alert(data[1].description);
            });
          //  this.GlData = result.data;



        //alert(data);
        //debugger;



    }, []);




   /***

    const handleDelete = (e) => {
       // alert(e)
        var user = {  companyID: companyID, department: e}
        fetch(url+'/departmentDelete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( user )
          // We convert the React state to JSON and send it as the POST body
         // data: JSON.stringify(user,user.ame)
          }).then(function(response) {
           return response.text()
        }).then(function(text) {

        alert(text);
        // alertif (text === 'success')
        Axios
            .get(url+`/departmentList`,
              {
               params: {
                       companyID: companyID,
                      }
              }
            )
            .then(result => setData(result.data));


        });

    };


const handleChange = async(e) => {
  let num = e.target.value;
  let mynum = parseFloat(num).toFixed(2);
 //  alert(mynum);
   e.target.value = mynum;
};
*/
const handleChangeGl= async(e) => {
  //this.setState({ department: e.target.value });
 // setGlData({ glAcctNo: e.target.value });
  glAcctNo = e.target.value;
  const  cGlNo = glAcctNo.substr(8,4);
  const  cGlSub = glAcctNo.substr(26,3);
   const cDep = glAcctNo.substr(43,3);
   const cName = glAcctNo.substr(58,glAcctNo.length-58);
  // alert(cName);
   setJeNo(cGlNo);
   setJeSub(cGlSub);
   setJeDep(cDep);
   setJeName(cName.substr(0,cName.length-1));
   setDrAmt(0.00);
   setCrAmt(0.00);
   // const str = glAcctNo;
  // const cglNo = str.slice(8,4)
  //alert(glAcctNo);
  //alert(cGlNo+"/"+cGlSub+"/"+cDep+"/"+cName);
};
/*
const formatInputDr = async(e) => {
  e.preventDefault();
  //// const cName = e.target.name;

   var num=Number(e.target.value).toFixed(2)
  // var num = parseFloat(e.target.value).toFixed(2);
   //   if (num === 'NaN' or num==='0' or num==='0.00')
   //   { return true }

    setDrAmt(num);


};

const formatInputCr = async(e) => {
  e.preventDefault();
 // const cName = e.target.name;
  var num = parseFloat(e.target.value).toFixed(2);
     if (num === 'NaN')
     { return true }

   setCrAmt(num);


};
*/
const formatInputDate = async(e) => {
  e.preventDefault();
  //const cName = e.target.name;
  console.log(e.target.name);
  console.log(e.target.value);
   setTxnDate(e.target.value);


};
const formatInputPart = async(e) => {
  e.preventDefault();
  //const cName = e.target.name;
  console.log(e.target.name);
  console.log(e.target.value);
   setPart(e.target.value);


};
const formatInputVoucherNo = async(e) => {
 const inputValue = e.target.value.toUpperCase();
  
  // Allow empty input for backspace/delete
  if (inputValue === '') {
    setVoucherNo(inputValue);
    return;
  }

  // Validate first characters
  const validPrefixes = ['JV', 'PV', 'RV', 'SV'];
  const hasValidPrefix = validPrefixes.some(prefix => 
    inputValue.startsWith(prefix)
  );

  if (!hasValidPrefix && inputValue.length >= 2) {
    alert("Voucher No. must start with JV, PV, RV or SV");
    return;
  }

  // Update state with formatted value
  setVoucherNo(inputValue);
};


const handleRemove = async(id) => {


  const newData = [...data];
  const index = newData.findIndex((data) => data.id === id) ;

      if (index !==-1) {
       newData.splice(index, 1);
       setData(newData);
      }

  console.log(newData);
  onSumDrCrAmt(newData)
};

const onSumDrCrAmt = async (sumData) => {
  //  e.preventDefault();
  //const sumData = [...data];
    console.log(sumData);
   // alert(sumData[0].drAmt);
    // alert()
   let drSum = 0;
   let crSum = 0;
  for (let i = 0; i < sumData.length; i++) {
   // alert(i);
   // drSum += parseFloat((sumData[i].drAmt).replace(/[^\d\.\-]/g, ""));
    drSum += parseFloat((sumData[i].drAmt).replace(/[^\d\.\-]/g, ""));
    crSum += parseFloat((sumData[i].crAmt).replace(/[^\d\.\-]/g, ""));
  }
   // alert(drSum);
   // alert(crSum);
    totalDrAmt = drSum;
    totalCrAmt = crSum;
  totalDrAmt = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  totalCrAmt = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  setDrAmt(0.00);
   setCrAmt(0.00);
};
 // alert(totalDrAmt);
 // setCrAmt(num)
 const onAddVoucher = async (e) => {
  e.preventDefault();
 //   econst fieldName = e.target.getAttribute("name");
    //alert(txnDate);

    for (let i = 0; i < voucherNo.length; i++) {
        if (voucherNo.substr(i,1) === ';') {
          alert("Voucher No. cannot contain (;) letter ");
          return false;
        }

    }
 //for (let i = 0; i < data.length; i++) {
 // 
 //}
      var crVal = 0;
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
  glType: glType,
  drAmt: vdrAmt,
  crAmt: vcrAmt,
  companyID: companyID,
  userName: userName,
  txnDate: new Date(),
  totalDrAmt: 0,
  totalCrAmt: 0,

};
const newDatas = [...data, newData];
//data=e.target.value;
//data = newDatas
 setData(newDatas);
 //setData(newDatas);
// console.log(e.target.value);
//console.log(newDatas);
//console.log(data);
//setData(voucherNo, jeNo, jeSub, jeDep, jeParticular, drAmt, crAmt)
lRead = true;
onSumDrCrAmt(newDatas)
};
   // e.preventDefault();

const onNew = async () => {
   window.location.href='journalVoucher';
};
  // const history = useHistory();
const onPrint = async (voucherData, drTotal, crTotal) => {
  try {
    console.log('Printing data:', voucherData);
    
    if (!voucherData || voucherData.length === 0) {
      alert("No voucher data provided");
      return;
    }

    
    const voucher = voucherData[0]?.voucherNo || voucherNo; // fallback to current input
    if (!voucher) {
      alert("No Voucher No. provided");
      return;
    }

    // Validate voucher prefix
    const validPrefixes = ['JV', 'PV', 'RV', 'SV'];
    const prefix = voucher.slice(0, 2).toUpperCase();
    if (!validPrefixes.includes(prefix)) {
      alert("Voucher No. must start with JV, PV, RV or SV");
      return;
    }

    // Format dates
    const formattedData = voucherData.map(item => ({
      ...item,
      txnDate: moment(item.txnDate).format("DD/MM/YYYY")
    }));

    // Add totals row
    const totalsRow = {
      id: 0,
      voucherNo: '',
      glNo: '',
      glSub: '',
      department: '',
      jeParticular: 'Total:',
      glName: '',
      glType: '',
      drAmt: totalDrAmt,
      crAmt: totalCrAmt,
      companyID: '',
      userName: '',
      txnDate: ''
    };

    const dataForPdf = [...formattedData, totalsRow];
    
    // Define headers for PDF
    const headers = [
      { key: 'G/L No.', display: 'glNo' },
      { key: 'G/L Sub', display: 'glSub' },
      { key: 'Department', display: 'department' },
      { key: 'G/L Name', display: 'glName' },
      { key: 'Particular', display: 'jeParticular' },
      { key: 'Dr. Amount', display: 'drAmt' },
      { key: 'Cr. Amount', display: 'crAmt' }
    ];

    // Generate PDF filename
    const pdfFilename = `${voucher}.pdf`;
    
    // Call PDF generator
    generatePDF(dataForPdf, headers, pdfFilename);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert("Failed to generate PDF. Please check console for details.");
  }
};

const onCancel = async(id) => {

  window.location.href='voucherEdit';
};

const onSave = async (voucherData, drTotal, crTotal) => {
  if (lSave === false) return;

  if (voucherData.length === 0) {
    alert('No Voucher to save');
    return;
  }
  if (!voucherNo || voucherNo === '') {
    alert("No Voucher No. provided");
    return;
  }
 for (let i = 0; i < voucherData.length; i++) {
  voucherData[i].voucherNo = voucherNo; 
}
  // ✅ check prefix
  const firstTwo = voucherNo.slice(0, 2).toUpperCase();
  //const allowed = ['JV', 'PV', 'RV', 'SV'];
  //if (!allowed.includes(firstTwo)) {
  //  alert("Voucher No. must start with JV, PV, RV or SV");
  //  return;
  //}
if (firstTwo !== "JV" && firstTwo !== "PV" && firstTwo !== "RV" && firstTwo !== "SV") {
  alert("Voucher No. must start with JV, PV, RV or SV");
  return false;
}
  if (drTotal !== crTotal) {
    alert('Debit total and Credit total must equal');
    return;
  }

  // ✅ sanitize + normalize dates before sending
  const payload = voucherData.map(v => ({
    ...v,
    voucherNo: EscapeStr(v.voucherNo),
    jeParticular: EscapeStr(v.jeParticular),
    txnDate: moment(new Date(txnDate)).format("DD/MM/YYYY"),
    totalDrAmt: drTotal,
    totalCrAmt: crTotal
  }));

  try {
    const response = await fetch(`${url}/api/voucherNew`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
 console.log("📥 backend response (stringified):", JSON.stringify(result, null, 2));
if (!response.ok) {
      // backend returned error (400 or 500)
      alert(result.error || 'Save failed');
      setVoucherNo('');
      return;
    }

    if (result.status === 'Success') {
      lSave = false;
      alert("Voucher saved successfully");
      window.location.href = 'journalVoucher';
    } else {
      alert(result.error || 'Save failed');
    }

  } catch (err) {
    console.error("❌ onSave error:", err);
    alert("An unexpected error occurred while saving voucher.");
  }
};



  

  return (
        <div>
            <div className="row" style={{ 'margin': "10px", "paddingLeft": "5px" }}>
                <div className="col-sm-12 btn btn-success">
                Journal Voucher Transaction Listing
                 </div>
            </div>
            <table class="table">
                <thead class="thead-dark" >
                    <tr style={mystyle}>
                    <th style={{backgroundColor: 'yellow'}}>ID</th>
                    <th style={{backgroundColor: 'yellow'}}>Voucher No.</th>
                    <th style={{backgroundColor: 'yellow'}}>G/L Account No.</th>
                    <th style={{backgroundColor: 'yellow'}}>G/L Sub-No.</th>
                    <th style={{backgroundColor: 'yellow'}}>Department</th>
                    <th style={{backgroundColor: 'yellow'}}>Particular</th>
                    <th style={{backgroundColor: 'yellow', textAlign: 'right'}}>Debit Amount</th>
                    <th style={{backgroundColor: 'yellow', textAlign: 'right'}}>Credit Amount</th>
                    <th style={{backgroundColor: 'blue', textAlign: 'center', color: 'white'}}>Action</th>
                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {data.map(item => {
                     return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.voucherNo}</td>
                        <td>{item.glNo}</td>
                        <td>{item.glSub}</td>
                        <td>{item.department}</td>
                        <td >{item.jeParticular}</td>
                        <td style={{
                          textAlign:"right",
                          align: 'right'
                        }}>{item.drAmt}</td>

                        <td style={{
                          textAlign:"right",
                          align: 'right'
                        }}>{item.crAmt}</td>
                                <td><button type="button" style={{backgroundColor: 'green', color: 'white'}} onClick={() => handleRemove(item.id)}>
                          <i className="fa fa-trash" style={{ marginRight: '8px', border: '2px solid white',}}></i>
                        Remove 
                        </button></td>
                       </tr>
                      })}



                      <tr style={{borderBottom:'1px solid black'}}>
                      <td colspan="100%"></td>
                      </tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    <td style={{textAlign:"right", color: "red"}}>Dr/Cr Totals:</td>
                    <td style={{textAlign:"right", color: "red"}}>{totalDrAmt}</td>

                    <td style={{textAlign:"right", color: "red"}}>{totalCrAmt}</td>


                </tbody>
                <tfoot>

                <td></td>
    <Tooltip
        title="Click to start New Voucher Entry"
        placement="top"
        >      
        <td><button type="button" style={{backgroundColor: "green", color: "white", border: '2px solid black',borderRadius: '14px'}} onClick={() => onNew() }>
        <i className="fa fa-file-text" style={{ marginRight: '8px', border: '2px solid black'}}></i> 
          New Voucher 
        </button></td>
 </Tooltip>
  <Tooltip
        title="Click to Print Voucher in PDF format"
        placement="top"
        >   
        <td><button type="button" style={{backgroundColor: "yellow", color: "black", border: '2px solid black',borderRadius: '14px'}} onClick={() => onPrint(data, totalDrAmt, totalCrAmt)}>
        <i className="fa fa-print" style={{ marginRight: '8px', border: '2px solid black',}}></i> 
         Print Voucher
        </button></td>
 </Tooltip>
  <Tooltip
        title="Click to Save current Voucher"
        placement="top"
        >   
                <td><button style={{backgroundColor: "green", color: "white", border: '2px solid black',borderRadius: '14px' }} onClick={() => onSave(data, totalDrAmt, totalCrAmt)}>
              <i className="fa fa-save" style={{ marginRight: '8px', border: '2px solid black',}}></i>   
                Save</button></td>
</Tooltip>

               <td></td>



            </tfoot>
            </table>

            <div>

            </div>




            <form style={{ 'margin': "20px", "paddingLeft": "10px" }}>
            <h4> Journal Voucher Entry   </h4>

            <center>
            <div style={{ marginTop: "40px", paddingRight: "600px" }}>
            <label style={{ paddingLeft: "15px", marginRight: '1rem'}}>
            Transaction Date  :
    <Tooltip
        title="Enter or select Voucher Entry Date"
        placement="top"
        >     
         <DatePicker
    id="txnDate"
    selected={txnDate}
    onChange={(date) => setTxnDate(date)}
    dateFormat="dd/MM/yyyy"
    placeholderText="dd/mm/yyyy"
    wrapperClassName="date-picker-wrapper"
    showYearDropdown
    scrollableYearDropdown
  />
     </Tooltip>
           </label>

            <label style={{ paddingLeft: '15px', marginRight: '1rem'}} >
            Voucher No. :
   <Tooltip
        title="Enter Voucher No. starting with (JV) or (PV) or (RV) initial character"
        placement="top"
        >  
            <input
              type="text"
              value={voucherNo}
              name="voucher"
              className="text-uppercase"
              placeholder='JV/PV/RV/SV'
              onChange={(e) => {
              const value = e.target.value.toUpperCase();// Immediate update
               formatInputVoucherNo(e); // Validation
              }}
              required
            />
    </Tooltip>
          </label>



          <div className="select-container" >
          <label style={{paddingLeft: '15px', marginRight: '1rem'}}>G/L Account Selection
  <Tooltip
        title="select Voucher General Ledger Account No."
        placement="top"
        >    
          <select onChange={(e) => handleChangeGl(e)}>
            {glData.map((item) => (
              <option value={item.glAcctNo} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
           ))}
    
          </select>
  </Tooltip>
          </label>
          </div>



            <label style={{ paddingLeft: '15px', marginRight: '1rem'}}>
            G/L No.:
               <input
               type="text"
               maxLength={4}
               value={jeNo}
               name="jeNo"
               onChange={(e) => setJeNo(e.target.value)}
               readyOnly={true}
               required
             />
              </label>


              <label style={{ paddingLeft: '15px', marginRight: '1rem'}}>
               G/L Sub-No.  :
                <input
                  type="text"
                  maxLength={4}
                  value={jeSub}
                  name="jeSub"
                  onChange={(e) => setJeSub(e.target.value)}
                  readyOnly={true}
                  required
                />
              </label>


              <label style={{ paddingLeft: '15px', marginRight: '1rem'}} >
              G/L Name :
              <input
                type="text"
                value={jeName}
                name="jeName"
                onChange={(e) => setJeName(e.target.value)}
                readOnly={true}
                style={{width: '70%'}}
                required
              />
            </label>

              <label style={{ paddingLeft: '15px', marginRight: '1rem'}} >
               Department:
                <input
                  type="text"
                  value={jeDep}
                  name="jeDep"
                  onChange={(e) => setJeDep(e.target.value)}
                  readOnly={true}
                  required
                />
              </label>

              <label style={{ paddingLeft: '15px', marginRight: '1rem'}}>
              Particular :
    <Tooltip
        title="Enter Voucher Particular"
        placement="top"
        >    
              <input
              type="text"
              value={jeParticular}
              name="jeParticular"
              onChange={(e) => setPart(e.target.value)}
              required
            />
     </Tooltip>
            </label>

              <label style={{ paddingLeft: '15px', marginRight: '1rem'}}>
              Debit Amount :
     <Tooltip
        title="Enter Voucher Debit Amount"
        placement="top"
        >  
              <input
                type="number"
                value={Number(drAmt).toFixed(2)}
                name="drAmount"
                placeholder='0.00'
                step='0.01'
                onChange={(e) => setDrAmt(e.target.value)}
                maxLength={15}
              />
    </Tooltip>
            </label>
            <label style={{ paddingLeft: '15px', marginRight: '1rem'}}>
            Credit Amount :
  <Tooltip
        title="Enter Voucher Credit Amount"
        placement="top"
        >  
            <input
              type="number"
              value={Number(crAmt).toFixed(2)}
              name="crAmount"
              placeholder='0.00'
               step='0.01'
               onChange={(e) =>setCrAmt(e.target.value)}
               maxLength={15}
             />
  </Tooltip>           
             </label>
             <br />
             <td><button style={{paddingRight: '20px', backgroundColor: 'lightblue', color: 'black', border: '2px solid black',borderRadius: '14px'}} class = 'btn btn-success' type="button" onClick={onAddVoucher}>
                <i className="fa fa-plus" style={{ marginRight: '8px', border: '2px solid black',}}></i>
             Add Voucher </button></td>
              </div>




          </center>

          </form>

        </div>



    )
}


export default JournalVoucher;
