import React, { useState, useEffect } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
//import ReactDOM from "react-dom";
import generatePDF from "./reportGenerator";
//import { format } from "date-fns";
import moment from 'moment';
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');
localStorage.removeItem('voucherNo')
// const userLevel = localStorage.getItem('userLevel');
 var glData = []

 var glAcctNo  = '';
 var glSubNo = ''
 var glDepart = '';
 var glName = '';
 var glType = '';
 var totalDrAmt = 0;
 var totalCrAmt = 0;
 var bankData = [];
 var bankID = '';
 var bankName = '';
 var bankAcctNo = '';
 var bankGlNo = '';
 var bankGlSub = '';
 var bankGlType = '';
 //var data = []
 var curr = new Date();
 curr.setDate(curr.getDate() + 3);
 var todayDate = curr.toISOString().substr(0,10);
  var vid =0
var lastSix = '';
var lRead = false;
var totalDrAmt = 0;
var totalCrAmt = 0;

function BankTransaction() {
    const [data, setData] = useState([]);
    const [ID, setBankGl] = useState(0);
   // const [glAcData, setGlData] = useState([]);
    const [jeNo, setjeNo] = useState("");
    const [jeSub, setJeSub] = useState("");
    const [jeDep, setJeDep] = useState("");
    const [jeType, setJeType] = useState("");

  //  const [jeParticular, setParticular] = useState("");
    const [jeName, setJeName] = useState("");
    const [drAmt, setDrAmt] = useState();
    const [crAmt, setCrAmt] = useState();
    const [txnDate, setTxnDate] = useState(todayDate);
    const [jeParticular, setPart] = useState("");
    const [voucherNo, setVoucherNo] = useState("");
    const [bankID, setBankID] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAcctNo, setBankAcctNo] = useState("");
    const [bankGlNo, setBankGlNo] = useState('');
    const [bankGlSub, setBankGlSub] = useState("");
    const [bankGlType, setBankGlType] = useState('');

    const mystyle = {
        align:"left",

    };

   //  alert(todayDate);
   // totalDrAmt = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
   // totalCrAmt = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    const [voucher, setVoucher] = useState({
        voucherNo: "",
       // txnDate: todayDate,
        glNo: "",
         glSub: "",
         department: "",
         glName: "",
         glType: '',
        //  glDescription: "",
       // jeParticular: "",
         drAmt: 0.00,
         crAmt: 0.00,
         companyID: companyID,
         userName: userName,
         bankID: '',
         bankName: '',
         bankAcctNo: '',
         bankGlNo: '',
         bankGlSub: '',
         bankGlType: '',
        });



      const onInputChange = async (e) => {
        e.preventDefault();
         console.log(e.target.value);
      setVoucher({ ...voucherNo, [e.target.name]: e.target.value });
     // setVoucher({ ...txnDate, txnDate: e.target.value });
     // setVoucher({ ...jeParticular, jeParticular: e.target.value });
     //  alert(e.target.name);
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
      var { glNo, glSub, department } = voucher;

      const buttonStyle = {
        color: "white",
        backgroundColor: "blue",
        padding: "5px 10px 2px 10px",
        fontFamily: "Arial",
        position: 'absolute',
        right: 300,
        size: 20,
    };

   // localStorage.setItem('departmentID','');

  //  const history = useHistory();



      useEffect(() => {


      //  debugger;
        Axios
        .get(url+`/glList`,
          {
           params: {
                   companyID: companyID,
                   gType: '401',
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
              glDepart = glData[0].department;
              glType = glData[0].glType;
             // glDesc = glData[0].glDescription;
            //   alert(glDesc);
               glNo = glData[0].glNo;
           //   setGlData({ glAcctNo: glAcctNo });
              setjeNo(glAcctNo);
              setJeSub(glSubNo);
              setJeDep(glDepart);
              setJeName(glName);
              setJeType(glType);
              setDrAmt(0.00);
               setCrAmt(0.00);

         ////      setParticular("");
           //   setJeDesc(glDesc);

             // this.setGlData({ glNo: glAcctNo});
              // window.alert(data[1].description);
            });
          //  this.GlData = result.data;

          Axios
          .get(url+'/bankList',
            {
             params: {
                     companyID: companyID,
                    }
            }
          )
              .then(res => {
                console.log(res);

                bankData = res.data;

                 let bkID = bankData[0].bankID;
                 let bkName =  bankData[0].bankName;
                 let bkAcctNo =  bankData[0].bankAcctNo;
                 setBankID(bkID);
                 setBankName(bkName);
                 setBankAcctNo(bkAcctNo);
                 setBankGlNo(bankData[0].glNo);
                 setBankGlSub(bankData[0].glSub);
                 setBankGlType(bankData[0].glType);

                 for (let j = 0; j < glData.length; j++) {
                  if (glData[j].glNo === bankData[0].glNo && glData[j].glSub === bankData[0].glSub) {
                      setBankGl(glData[j].id);
                 //   alert(ID);
                  }

                }

              });



    //    debugger;

      // setBankGl(16);

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

const handleChangeBank= async(e) => {
    const GID = Number(e.target.value);

     // alert(ID);
    for (let i = 0; i < bankData.length; i++) {

      if (bankData[i].id === GID) {
          setBankID(bankData[i].bankID);
          setBankName(bankData[i].bankName);
          setBankAcctNo(bankData[i].bankAcctNo);
          setBankGlNo(bankData[i].glNo);
          setBankGlSub(bankData[i].glSub);
          setBankGlType(bankData[i].glType);

          for (let j = 0; j < glData.length; j++) {
            if (glData[j].glNo === bankData[i].glNo && glData[j].glSub === bankData[i].glSub) {
                setBankGl(glData[j].id);
           //   alert(ID);
            }

          }


      }


    }



  }

const handleChangeGl= async(e) => {
  //this.setState({ department: e.target.value });
 // setGlData({ glAcctNo: e.target.value });
    let ID = Number(e.target.value);
   // alert(ID)
 // const  cGlNo = glAcctNo.substr(8,4);
 // const  cGlSub = glAcctNo.substr(26,3);
 //  const cDep = glAcctNo.substr(43,3);
 //  const cName = glAcctNo.substr(49,glAcctNo.length-50);
 for (let i = 0; i < glData.length; i++) {

    if (glData[i].id === ID) {
        setjeNo(glData[i].glNo);
        setJeSub(glData[i].glSub);
        setJeDep(glData[i].department);
        setJeName(glData[i].glName);
        setJeType(glData[i].glType);
        setDrAmt(0.00);
        setCrAmt(0.00);
    }
}



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
   let cName = e.target.value;
  console.log(e.target.name);
  console.log(e.target.value);
   setPart(e.target.value);
 //  alert(e.target.value.length);
   if (e.target.value.length > 200) {
  //  alert("maximum length is 10");
    setPart(cName.substring(0,200));
   }


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
    //  alert(drAmt);
     // alert(crAmt);




     if (typeof(drAmt)==='string') {
        // let drVal = number(drAmt);
           drVal = parseFloat(drAmt);

       };

        if (typeof(crAmt)==='string') {
      // let drVal = number(drAmt);
         crVal = parseFloat(crAmt);
        // alert(crVal);
     };




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
totalDrAmt = 0;
totalCrAmt = 0;
var vdrAmt = parseFloat(drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
var vcrAmt = parseFloat(crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
vid = vid+1
 const newData={
   id: vid,
  voucherNo: voucherNo,
  glNo: jeNo,
  glSub: jeSub,
  department: jeDep,
  glType: jeType,
  jeParticular: jeParticular,
  glName: jeName,
  drAmt: vdrAmt,
  crAmt: vcrAmt,
  companyID: companyID,
  userName: userName,
  txnDate: new Date(),
  bankID: bankID,
  txnType: '',
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
   window.location.href='bankTransaction';
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

    for (var i = voucherData.length-1; i >= 0; i--) {
      // alert(typeof voucherData[i].voucherNo);
       if (typeof voucherData[i].voucherNo==='undefined') {
        //   alert("remove");
           voucherData.splice(i, 1);
       }
       let date = voucherData[i].txnDate;
                          // alert(dlData[0].txnDate);
                         // const [txnDate, setTxnDate] = useState(date);
                          //   todayDate = curr.split("/").reverse().join("-");
        voucherData[i].txnDate = moment(new Date(date)).format("DD/MM/YYYY")
       // voucherData[i].txnDate =  format(new Date(oldDate), "dd/MM/yyyy") ;

   }
      voucherData[0].id = 'B';

      let vid = voucherData[0].length+1;
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
              {key: 'G/L Type', display: 'glType'},
              {key: 'Particular', display: 'jeParticular'},
              {key: 'Dr. Amount', display: 'drAmt'},
              {key: 'Cr. Amount', display: 'crAmt'},
            ]

            // Here's the call for our pdf function
            // Because of the placeholder code in our pdf.js file,
            // clicking on this should render a save dialog
            // and downloading should render an empty pdf
            generatePDF(newDatas, headers, 'bv.pdf')
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

const onSave = async (voucherData, drTotal, crTotal) => {
   // e.preventDefault();
       console.log(voucherData);
     //  alert(drTotal);
     //  alert(crTotal);
        if (voucherData.length === 0) {
          alert('No Voucher to save');
          return false
        }



       if (drTotal !== crTotal) {
        alert('Debit total and Credit total must equal')
        return false
       }

      let bankGlCount=0

     for (let i = 0; i < voucherData.length; i++) {

     // let event = new Date(txnDate);
      //let date = JSON.stringify(event)
       // voucherData[i].txnDate = date.slice(1,11)
       // voucher[i].txnDate = format(voucherData[i].txnDate, 'DD/MM/YYYY');
       //voucherData[i].txnDate = txnDate;
       voucherData[i].txnDate = moment(new Date(txnDate)).format("DD/MM/YYYY")
       voucherData[i].voucherNo = EscapeStr(voucherData[i].voucherNo)
       voucherData[i].jeParticular = EscapeStr(voucherData[i].jeParticular)
       voucherData[i].bankID = EscapeStr(bankID)

        // alert(bankID+bankGlNo+bankGlSub+bankGlType);
        // alert(voucherData[i].bankID+voucherData[i].glNo+voucherData[i].glSub+voucherData[i].glType);
      //  voucherData[i].txnDate =  format(new Date(voucherData[i].txnDate), "dd/MM/yyyy")
    //   alert(bankID+bankGlNo+bankGlSub+bankGlType+" : "+voucherData[i].bankID+voucherData[i].glNo+voucherData[i].glSub+voucherData[i].glType);
      if (bankID+bankGlNo+bankGlSub+bankGlType === voucherData[i].bankID+voucherData[i].glNo+voucherData[i].glSub+voucherData[i].glType) {
             bankGlCount+=1
             voucherData[i].txnType='BANK';
         }

     };
     //  alert(bankGlCount);
      if (bankGlCount === 0) {
        alert("G/L Account selected must at least match to selected Bank Account G/L No., G/L Sub No.");
        return false
      }




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
      fetch(url+'/bankTransaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( voucherData )
        // We convert the React state to JSON and send it as the POST body
       // data: JSON.stringify(user,user.ame)
        }).then(function(response) {
         return response.text()
      }).then(function(text) {


        // alert(text);
       lastSix = text.substr(text.length - 7); // => "Tabs1"
        //  poemDisplay.textContent = text;
        // alert(lastSix);
       // localStorage.setItem('voucherNo', voucherData[0].voucherNo);
      //  window.location.href='journalVoucher';
         if (lastSix === 'Success') {
          //   alert(lastSix);
       //   window.location.reload(false);
        //  window.location.href='locationList';

         };
       //  onPrint(voucherData, drTotal, crTotal)
         //    window.location.href='BankTransaction';

        });
       // localStorage.setItem('voucherNo', voucherData[0].voucherNo);
       // window.location.href='journalVoucher';

         onPrint(voucherData, drTotal, crTotal)
        //  window.location.href='bankTransaction';

    };

    const handleInputChangeDr = async (e) => {
        // alert(event.target.value);
        let num = e.target.value; // .replace(/\+|-/ig, '');;
        //alert(num);


           setDrAmt(num);

       };

     const handleInputChangeCr = async (e) => {
         console.log(e.target.value)
          let num = e.target.value

         setCrAmt(num);
       };
     const formatInputDr = async (e) => {
         let num = e.target.value
         if (num === '') {
            num=0;
        }
         setDrAmt(parseFloat(num).toFixed(2));

       };

     const formatInputCr = async (e) => {
        let num = e.target.value
        if (num === '') {
            num=0;
        }
        setCrAmt(parseFloat(num).toFixed(2));
       }


    return (
        <div>
        <div className="row" style={{ 'margin': "10px", "paddingLeft": "5px" }}>
            <div className="col-sm-12 btn btn-success">
                Bank Transaction Entry
             </div>
        </div>
        <table class="table">
            <thead class="thead-dark" >
                <tr style={mystyle}>
                <th style={{backgroundColor: 'yellow'}}>ID</th>
                <th style={{backgroundColor: 'yellow'}}>Voucher No.</th>
                <th style={{backgroundColor: 'yellow'}}>Bank ID</th>
                <th style={{backgroundColor: 'yellow'}}>G/L Account No.</th>
                <th style={{backgroundColor: 'yellow'}}>G/L Sub-No.</th>
                <th style={{backgroundColor: 'yellow'}}>Department</th>
                <th style={{backgroundColor: 'yellow'}}>G/L Type</th>
                <th style={{backgroundColor: 'yellow', width: '250px'}}>Particular</th>
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
                    <td>{item.bankID}</td>
                    <td>{item.glNo}</td>
                    <td>{item.glSub}</td>
                    <td>{item.department}</td>
                    <td>{item.glType}</td>
                    <td >{item.jeParticular}</td>
                    <td style={{
                      align:"right",

                    }}>{item.drAmt}</td>

                    <td style={{
                      align:"right",

                    }}>{item.crAmt}</td>
                    <td><button style={{backgroundColor: 'green', color: 'white'}} onClick={() => handleRemove(item.id)}>Remove </button></td>
                    </tr>

                })}
                <td></td>
                <td></td>
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
            <td><button style={{backgroundColor: "blue", color: "white"}} onClick={() => onNew() }>New Voucher </button></td>

            <td><button style={{backgroundColor: "green", color: "white"}} onClick={() => onPrint(data, totalDrAmt, totalCrAmt)}>Print Voucher</button></td>
            <td><button style={{backgroundColor: "red", color: "white"}} onClick={() => onSave(data, totalDrAmt, totalCrAmt)}>Save</button></td>

           <td></td>
           <td></td>
           <td></td>



        </tfoot>
        </table>

        <div>

        </div>


        <form>


        <center>
        <div style={{ marginTop: "40px", paddingRight: "100px" }}>
        <label style={{ paddingLeft: "0px"}} >
        Voucher No. :
        <input
          type="text"
          value={voucherNo}
          name="voucher"
          style={{width: '500px'}}
          class="text-uppercase"
          placeholder='JV'
          onChange={(e) => formatInputVoucherNo(e)}
          readOnly={lRead}
          required
        />


      Txn. Date  :
       <input
         type="date"
         maxLength={10}
         value={txnDate}
         style={{width: '20%'}}
       //  defaultValue = {txnDate}
         name="txnDate"
         onChange={(e) => formatInputDate(e)}
         required
       />
     </label>
     <p></p>
     <div className="select-container" >
     <label style={{paddingLeft: '0px'}}>Bank Selection :
     <select onChange={(e) => handleChangeBank(e)}>
       {bankData.map((items) => (
         <option style={{paddingLeft: '0px'}} value={items.id} style={{width: '25%'}} required> (Bank ID-{items.bankID}) (Bank Name-{items.bankName})</option>
      ))}
     </select>


     </label>
     </div>




      <label style={{ paddingLeft: '0px'}}>
      Bank ID :
       <input
         type="text"
         style={{width: "100px"}}
         maxLength={10}
         value={bankID}
         name="bankID"
         onChange={(e) => onInputChange(e)}
         readyOnly={true}
         required
       />



     Bank Name :
      <input
        type="text"
        style={{width: "350px"}}
        maxLength={200}
        value={bankName}
        name="bankName"
        onChange={(e) => onInputChange(e)}
        readyOnly={true}
        required
      />





    Bank A/C No. :
     <input
       type="text"
       style={{width: '250px'}}
       maxLength={30}
       value={bankAcctNo}
       name="bankID"
       onChange={(e) => onInputChange(e)}
       readyOnly={true}
       required
     />
   </label>

   <label style={{ paddingLeft: '0px'}}>
   Bank G/L No. :
    <input
      type="text"
      style={{width: "100px"}}
      maxLength={30}
      value={bankGlNo}
      name="bankGlNo"
      onChange={(e) => onInputChange(e)}
      readyOnly={true}
      required
    />


  G/L Sub No. :
   <input
     type="text"
     style={{width: "100px"}}
     maxLength={30}
     value={bankGlSub}
     name="bankGlSub"
     onChange={(e) => onInputChange(e)}
     readyOnly={true}
     required
   />



 Bank G/L Type :
  <input
    type="text"
    style={{width: "100px"}}
    maxLength={30}
    value={bankGlType}
    name="bankGlType"
    onChange={(e) => onInputChange(e)}
    readyOnly={true}
    required
  />
</label>

    <p></p>
   <div className="select-container" >
   <label style={{paddingLeft: '0px'}}>G/L Selection:
   <select value={ID} onChange={(e) => handleChangeGl(e)}>
     {glData.map((item) => (
       <option value={item.id} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
    ))}
   </select>


   </label>
   </div>

        <label style={{ paddingLeft: "0px"}}>
           G/L A/C No.  :
            <input
              type="text"
              style={{width: '60px'}}
              maxLength={4}
              value={jeNo}
              name="glNo"
              onChange={(e) => onInputChange(e)}
              readyOnly={true}
              required
            />




           G/L Sub-No.  :
            <input
              type="text"
              style={{width: '60px'}}
              maxLength={4}
              value={jeSub}
              name="glSub"
              onChange={(e) => onInputChange(e)}
              readyOnly={true}
              required
            />




          G/L Name :
          <input
            type="text"
            style={{width: '280px'}}
            value={jeName}
            name="glName"
            onChange={(e) => onInputChange(e)}
            readOnly={true}
            required
          />



            Department :
            <input
              type="text"
              style={{width: '60px'}}
              value={jeDep}
              name="department"
              onChange={(e) => onInputChange(e)}
              readOnly={true}
              required
            />

          G/L Type :
          <input
            type="text"
            style={{width: '70px'}}
            value={jeType}
            name="glType"
            onChange={(e) => onInputChange(e)}
            readOnly={true}
            required
          />
        </label>
          <p></p>

          <label style={{ paddingLeft: "0px"}}>
          Particular :

          <textarea

          Rows = '2'
          cols='100'
          value={jeParticular}
          name="Particular"
          onChange={(e) => formatInputPart(e)}
          required >
          </textarea>

          </label>



          <label style={{ paddingLeft: "0px"}}>
          Debit Amount :
          <input
            type="number"
            style={{width: '200px'}}
            value={drAmt}
            name="drAmount"
            placeholder='0.00'
            step='0.01'
            onBlur={(e) => formatInputDr(e) }
            onChange={(e) => handleInputChangeDr(e)}
         //   onChange={(e) => setDrAmt(e.target.value)}

             maxLength={10}

          />

        Credit Amount :
        <input
          type="number"
          style={{width: '200px'}}
          value={crAmt}
          name="crAmount"
          placeholder='0.00'
          onChange={(e) => handleInputChangeCr(e)}
           step='0.01'
           onBlur={(e) => formatInputCr(e)}
         //  onChange={(e) =>setCrAmt(e.target.value)}

           maxLength={10}

         />

         <button style={buttonStyle} type="button" onClick={onAddVoucher}>Add Voucher </button>

   </label>





          </div>




      </center>

      </form>





    </div>



)
}
export default BankTransaction;
