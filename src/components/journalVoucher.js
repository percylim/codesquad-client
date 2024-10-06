import React, { useState, useEffect } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
//import ReactDOM from "react-dom";
import generatePDF from "./reportGenerator";
// import { format } from "date-fns";
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
 var todayDate = curr.toISOString().substr(0,10);
  var vid =0
 var lastSix = '';
var lRead = false;
 var lSave = true;

function JournalVoucher() {
    const [data, setData] = useState([]);

   // const [glAcData, setGlData] = useState([]);
    const [jeNo, setjeNo] = useState("");
    const [jeSub, setJeSub] = useState("");
    const [jeDep, setJeDep] = useState("");
  //  const [jeParticular, setParticular] = useState("");
    const [jeName, setJeName] = useState("");
    const [drAmt, setDrAmt] = useState('');
    const [crAmt, setCrAmt] = useState('');
    const [txnDate, setTxnDate] = useState(todayDate);
    const [jeParticular, setPart] = useState("");
    const [voucherNo, setVoucherNo] = useState("");
    const mystyle = {
        textAlign:"left",

    };

    // alert(todayDate);
   // totalDrAmt = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
   // totalCrAmt = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const [voucher, setVoucher] = useState({
        voucherNo: "",
       // txnDate: todayDate,
        glNo: "",
         glSub: "",
         department: "",
         glName: "",
        //  glDescription: "",
       // jeParticular: "",
         drAmt: 0.00,
         crAmt: 0.00,
         companyID: companyID,
         userName: userName,
        });

     //   const onInputChangeDr = async (e) => {
      //    e.preventDefault();
      //     alert(e.target.value);


      //  };

      //  const rightToLeftFormatter = (value: string) => {
      //    if (!Number(value)) return '';

     //     let amount = '';
      //    if (amount.length > 2) {
      //      amount = parseInt(value).toFixed(2);
      //    } else {
      //      amount = (parseInt(value) / 100).toFixed(2);
      //    }

      //    return `${amount}`;
      //  };

      const onInputChange = async (e) => {
        e.preventDefault();
         console.log(e.target.value);
      setVoucher({ ...voucherNo, [e.target.name]: e.target.value });
     // setVoucher({ ...txnDate, txnDate: e.target.value });
     // setVoucher({ ...jeParticular, jeParticular: e.target.value });
       alert(e.target.name);
     console.log(e.target.name);
      console.log(e.target.value);
      //if (e.target.name === 'jeParticular') {
      //       setParticular({jeParticular: e.target.value});
      //}
    //const num = parseFloat(e.target.value).toFixed(2);
    //alert(num);
    // if (e.target.name === 'drAmount') {
    //     setDrAmt(num);
    //  }
    //  if (e.target.name === 'crAmount') {
    //     setCrAmt(num)
    // } else {

     // setVoucher({[ e.target.name]: e.target.value })
    // };
  };
      //var { glNo, glSub, department } = voucher;

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
        .get(url+`/glList`,
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
              setjeNo(glAcctNo);
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
   setjeNo(cGlNo);
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
  e.preventDefault();
 // const cName = e.target.name;
  console.log(e.target.name)
 // e.target.value.replace(/[^a-z0-9\s]/gi, '');
  console.log(e.target.value.toUpperCase());
   setVoucherNo(e.target.value.toUpperCase());


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

     //  alert(voucherData[0].txnDate);
       console.log(voucherData);
       if (voucherData.length === 0) {
        alert("No Voucher No. provided")
        return false;
       }
      let voucher = voucherData[0].voucherNo;
  //  alert(voucher);
      if(voucher === null){
          alert("No Voucher No. provided")
       return false;
      }
      if(voucher === ''){
        alert("No Voucher No. provided")
     return false;
    }

   // const [txnDate, setTxnDate] = useState(date);
    //   todayDate = curr.split("/").reverse().join("-");
    for (let i = 0; i < voucherData.length; i++) {
      let date = voucherData[i].txnDate;
      //alert(date);
      let oldDate = moment(new Date(date)).format("DD/MM/YYYY");
     //alert(oldDate);

    voucherData[i].txnDate = oldDate;
    }
     voucherData[0].totalDrAmt = totalDrAmt;
     voucherData[0].totalCrAmt = totalCrAmt;
     let vid = voucherData.length+1;
     const newData={
      id: vid,
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
      txnDate: '',
      totalDrAmt: 0,
      totalCrAmt: 0

    };
    const newDatas = [...data, newData];



    //  alert(oldDate);
  //  const filename = `voucher.pdf`
            // All we want for this example are:
            // Title, Release Date, Description, Vote Average
            // This is important to the function we are building
            // because it sets the order in which we will display data
            const headers = [
              {key: 'G/L No.', display: 'glNo'},
              {key: 'G/L Sub', display: 'glSub'},
              {key: 'Department', display: 'department'},
              {key: 'G/L Name', display: 'glName'},
              {key: 'Particular', display: 'jeParticular'},
              {key: 'Dr. Amount', display: 'drAmt'},
              {key: 'Cr. Amount', display: 'crAmt'},
            ]

            // Here's the call for our pdf function
            // Because of the placeholder code in our pdf.js file,
            // clicking on this should render a save dialog
            // and downloading should render an empty pdf
            generatePDF(newDatas, headers, 'jv.pdf')
            //PDF({voucherData,headers,filename})
   // history.push("/PDF(voucherData,'Journal Voucher', 'jv.pdf");
   // window.location.href="PDF(voucherData,'Journal Voucher', 'pv.pdf' )";
   /*
    sessionStorage.setItem('voucherNo',voucher);
  if (window.confirm("Print Journal Voucher ?")) {


   // localStorage.setItem('voucherNo',voucher);
    // window.location.href='journalVouher';
  //  alert('ready to print');
  //  window.print();
    window.location.href='voucherList';
  };
*/

};
const onCancel = async(id) => {

  window.location.href='voucherEdit';
};

const onDelete = async(id) => {
  if (voucherNo ==='') {
    alert("No Voucher No.");
    return false
  }
};
const onSave = async (voucherData, drTotal, crTotal) => {
   // e.preventDefault();
       console.log(voucherData);
     //  alert(drTotal);
     //  alert(crTotal);
      if (lSave === false){
          return false;
      }
        if (voucherData.length === 0) {
          alert('No Voucher to save');
          return false
        }



       if (drTotal !== crTotal) {
        alert('Debit total and Credit total must equal')
        return false
       }


    //  alert(voucherData[0].txnDate);
     for (let i = 0; i < voucherData.length; i++) {
      voucherData[i].voucherNo = EscapeStr(voucherData[i].voucherNo);
       voucherData[i].jeParticular = EscapeStr(voucherData[i].jeParticular);


       // alert(voucherData[i].txnDate);
        voucherData[i].txnDate = moment(new Date(txnDate)).format("DD/MM/YYYY")
       // alert(voucherData[i].txnDate);
        voucherData[i].totalDrAmt = totalDrAmt
        voucherData[i].totalCrAmt = totalCrAmt

       //  voucherData[i].txnDate = moment(voucherData[i].txnDate, 'dd/MM/yyyy')
       // let today = voucherData[i].txnDate;
       //  voucherData[i].then=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+today.getFullYear();
       // voucherData[i].txnDate = txnDate;
      // voucherData[i].txnDate = format(txnDate, 'dd/MM/yyyy');
    //   var event = new Date(voucherData[i].txnDate);
    //   let date = JSON.stringify(event);
        //   voucherData[i].txnDate = date.slice(1,11)

//alert(voucherData[i].glName);
     };

     // alert(voucherData[0].txnDate);



   // const Data = {
      //id: nanoid(),
    //    companyID: EscapeStr(companyID),
     //   voucherNo: EscapeStr(voucherNo),
    //    txnDate: txnDate,
     //   glNo: glNo,
     //   glSub: glSub,
     //   department: EscapeStr(department),
     //   glName: EscapeStr(glName),

    //    glDescription: EscapeStr(glDescription),
     //   jeParticular: EscapeStr(jeParticular),
     //   drAmt: drAmt,
     //   crAmt: crAmt,
     // };
       //var name1 =  EscapeStr(user.companyName);
     // alert(Level);
     fetch(url+'/voucherNew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( voucherData )
        // We convert the React state to JSON and send it as the POST body
       // data: JSON.stringify(user,user.ame)
        }).then(function(response) {
         return response.text()
      }).then(function(text) {

        lSave=false;
       //  alert(text);
       lastSix = text.substr(text.length - 7); // => "Tabs1"
        //  poemDisplay.textContent = text;
        // alert(lastSix);
       // localStorage.setItem('voucherNo', voucherData[0].voucherNo);
      //  window.location.href='journalVoucher';
      // alert(lastSix);
         if (text === 'Success') {


           lSave=false;
             window.location.reload(false);
          window.location.href='journalVoucher';

         };
        //  alert(text);
        });
       // localStorage.setItem('voucherNo', voucherData[0].voucherNo);
       // window.location.href='journalVoucher';

        //  onPrint(voucherData, drTotal, crTotal)
        //window.location.href='journalVoucher';

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
                        <td><button style={{backgroundColor: 'green', color: 'white'}} onClick={() => handleRemove(item.id)}>Remove </button></td>
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
                <td><button style={{backgroundColor: "green", color: "white"}} onClick={() => onNew() }>New Voucher </button></td>
 </Tooltip>
  <Tooltip
        title="Click to Print Voucher in PDF format"
        placement="top"
        >   
                <td><button style={{backgroundColor: "green", color: "white"}} onClick={() => onPrint(data, totalDrAmt, totalCrAmt)}>Print Voucher</button></td>
 </Tooltip>
  <Tooltip
        title="Click to Save current Voucher"
        placement="top"
        >   
                <td><button style={{backgroundColor: "green", color: "white"}} onClick={() => onSave(data, totalDrAmt, totalCrAmt)}>Save</button></td>
</Tooltip>

               <td></td>



            </tfoot>
            </table>

            <div>

            </div>




            <form>
            <h4> Journal Voucher Entry   </h4>

            <center>
            <div style={{ marginTop: "40px", paddingRight: "600px" }}>
            <label style={{ align: "right"}}>
            Transaction Date  :
    <Tooltip
        title="Enter or select Voucher Entry Date"
        placement="top"
        >     
             <input
               type="date"
               maxLength={10}
               value={txnDate}
               style={{width: '40%'}}
             //  defaultValue = {txnDate}
               name="txnDate"
               onChange={(e) => formatInputDate(e)}
               required
             />
     </Tooltip>
           </label>

            <label style={{ align: "right"}} >
            Voucher No. :
   <Tooltip
        title="Enter Voucher No. starting with (JV) or (PV) or (RV) initial character"
        placement="top"
        >  
            <input
              type="text"
              value={voucherNo}
              name="voucher"
              class="text-uppercase"
              placeholder='JV/PV/RV'
              onChange={(e) => formatInputVoucherNo(e)}
              readOnly={lRead}
              required
            />
    </Tooltip>
          </label>



          <div className="select-container" >
          <label style={{align: 'right'}}>G/L Account Selection
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



            <label style={{ align: "right"}}>
            G/L No.:
               <input
               type="text"
               maxLength={4}
               value={jeNo}
               name="glNo"
               onChange={(e) => onInputChange(e)}
               readyOnly={true}
               required
             />
              </label>


              <label style={{ align: "right"}}>
               G/L Sub-No.  :
                <input
                  type="text"
                  maxLength={4}
                  value={jeSub}
                  name="glSub"
                  onChange={(e) => onInputChange(e)}
                  readyOnly={true}
                  required
                />
              </label>


              <label style={{ align: "right"}} >
              G/L Name :
              <input
                type="text"
                value={jeName}
                name="glName"
                onChange={(e) => onInputChange(e)}
                readOnly={true}
                style={{width: '70%'}}
                required
              />
            </label>

              <label style={{ align: "right"}} >
               Department:
                <input
                  type="text"
                  value={jeDep}
                  name="department"
                  onChange={(e) => onInputChange(e)}
                  readOnly={true}
                  required
                />
              </label>

              <label style={{ align: "right"}}>
              Particular :
    <Tooltip
        title="Enter Voucher Particular"
        placement="top"
        >    
              <input
              type="text"
              value={jeParticular}
              name="Particular"
              onChange={(e) => formatInputPart(e)}
              required
            />
     </Tooltip>
            </label>

              <label style={{ align: "right"}}>
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

                //format={rightToLeftFormatter}
               /// onChange={(e) => onInputChangeDr(e)}
                onChange={(e) => setDrAmt(e.target.value)}

                 maxLength={15}

              />
    </Tooltip>
            </label>
            <label style={{ align: "right"}}>
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

            //  onChange={(e) => onInputChange(e)}
               step='0.01'

               onChange={(e) =>setCrAmt(e.target.value)}

               maxLength={15}

             />
  </Tooltip>           
             </label>
             <br />
             <td><button style={{paddingRight: '20px', backgroundColor: 'lightblue', color: 'black'}} class = 'btn btn-success' type="button" onClick={onAddVoucher}>Add Voucher </button></td>
              </div>




          </center>

          </form>

        </div>



    )
}


export default JournalVoucher;
