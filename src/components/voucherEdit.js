import React, { useState, useEffect } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
//import ReactDOM from "react-dom";
import generatePDF from "./reportGenerator";
import 'font-awesome/css/font-awesome.min.css';
// import { IconName } from "react-icons/fa";
//import { format } from "date-fns";
import moment from 'moment';
//require('dotenv').config();//
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
 var totalDrAmt = 0.00;
 var totalCrAmt = 0.00;
  var oldDate;
 var ChangeData = false;
 //var data = []
 var curr = new Date();
 curr.setDate(curr.getDate());
 var todayDate = curr.toISOString().substr(0,10);
  var vid =0
var lastSix = '';
var lRead = false;
var lSave = true
//var loadLength = 0;
function VoucherEdit(exVoucherNo) {
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
        //  glDescription: "",
       // jeParticular: "",
         drAmt: 0.00,
         crAmt: 0.00,
         companyID: companyID,
         userName: userName,
        });



      const onInputChange = async (e) => {
        e.preventDefault();
         console.log(e.target.value);
      setVoucher({ ...voucherNo, [e.target.name]: e.target.value });
     // setVoucher({ ...txnDate, txnDate: e.target.value });
     // setVoucher({ ...jeParticular, jeParticular: e.target.value });
    //   alert(e.target.name);
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
        right: 350,
    };

   // localStorage.setItem('departmentID','');

  //  const history = useHistory();



      useEffect(() => {



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
               glType= glData[0].glType;
           //   setGlData({ glAcctNo: glAcctNo });
              setjeNo(glAcctNo);
              setJeSub(glSubNo);
              setJeDep(glDepart);
              setJeName(glName);
             // setDrAmt(0.00);
             //  setCrAmt(0.00);

         ////      setParticular("");
           //   setJeDesc(glDesc);

             // this.setGlData({ glNo: glAcctNo});
              // window.alert(data[1].description);
            }).catch(err => {
                console.log("error:", err);
                alert(err);
              });
          //  this.GlData = result.data;



        //alert(data);




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
   const cName = glAcctNo.substr(58,glAcctNo.length);
   setjeNo(cGlNo);
   setJeSub(cGlSub);
   setJeDep(cDep);
   setJeName(cName.substr(0,cName.length-1));
   setDrAmt(0);
   setCrAmt(0);
   // const str = glAcctNo;
  // const cglNo = str.slice(8,4)
  //alert(glAcctNo);
  //alert(cGlNo+"/"+cGlSub+"/"+cDep+"/"+cName);
}
const formatInputDrAmt = async(e) => {
  e.preventDefault();
  //// const cName = e.target.name;

   var num=Number(e.target.value).toFixed(2)
  // var num = parseFloat(e.target.value).toFixed(2);
   //   if (num === 'NaN' or num==='0' or num==='0.00')
   //   { return true }

    setDrAmt(num);


};

const formatInputCrAmt = async(e) => {
  e.preventDefault();
 // const cName = e.target.name;
  var num = parseFloat(e.target.value).toFixed(2);
     if (num === 'NaN')
     { return true }

   setCrAmt(num);


};

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
const onCancel = async(id) => {

  window.location.href='voucherEdit';
};

const onDelete = async(id) => {
  if (voucherNo ==='') {
    alert("No Voucher No.");
    return false
  }

  const voucher = {
    companyID: companyID,
    userName: userName,
    voucherNo: voucherNo
  };
  if (window.confirm("Are you sure to Delete whole Voucher")) {

  fetch(url+'/voucherDelete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( voucher )
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
   // window.location.href='voucherEdit';
     if (lastSix === 'Success') {
       //  alert(lastSix);
   //   window.location.reload(false);
       alert("Voucher No. "+voucherNo+ " successfully Deleted")
       window.location.href='voucherEdit';
     };
    });
    alert("Voucher No. "+voucherNo+ " successfully Deleted")
    window.location.href='voucherEdit';
}
};
const onSearch = async(vid) => {
    if (vid === '') {
        alert("No Voucher to search");
        return false;
    }
   Axios.get(url+`/voucherList`,
                      {
                       params: {
                           companyID: companyID,
                           voucherNo: vid,
                               }
                      }
                    )
                .then(response => {
                  console.log(response.data);
                    //  alert(response.data.length);
                     if (response.data === 'fail' || typeof response.data.length === 'undefined'){
                      lRead = false;

                        alert("Invalid Voucher No "+vid);


                       } else {

                         if (response.data[0].voucherType !== 'JV') {
                          lRead = false;
                             alert("Sorry this is not journal voucher transaction cannot edit");

                            } else {
                              lRead = true;
                          setData(
                            response.data
                         );
                         }
                          let dlData = response.data;
                           // alert(dlData.length);
                       //   let newDatas =[];
                        //  let newData={};
                        //alert(dlData.length);
                          let drSum =0;
                          let crSum =0;
                         // let date = format(new Date(dlData[0].txnDate), "yyyy-MM-dd") ;
                          let date = dlData[0].txnDate;
                          var curr = new Date(date);
                            if(date==='0000-00-00') {
                                 curr = new Date();

                            }



                          curr.setDate(curr.getDate());
                            oldDate= curr.toISOString().substr(0,10);

                         setTxnDate(oldDate);
                          // alert(oldDate);
                         for (let i = 0; i < dlData.length; i++) {
                        // onAddVoucher(dlData[i].drAmt);
                             dlData[i].txnDate=oldDate.split("-").reverse().join("/");
                        var drValue = parseFloat(dlData[i].drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                        var crValue = parseFloat(dlData[i].crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                          //   alert(i);
                          // if (typeof(dlData[i].drAmt)==='string') {
                         //     let drVal = dlData[i].drAmt;

                         //     let crVal = dlData[i].crAmt;

                          //    dlData[i].drAmt = new Intl.NumberFormat().format(drVal);
                                 dlData[i].drAmt = drValue;

                             //  dlData[i].txnDate =  format(new Date(dlData[i].txnDate), "dd/MM/yyyy") ;
                             //  let vDate = dlData[i].txnDate;
                              // setTxnDate(vDate);
                               // oldDate = dlData[0].txnDate;
                               // setTxnDate(txnDate: oldDate);
                            //  alert(oldDate);                             // dlData[i].drAmt = parseFloat(drVal.replace(/[^\d\.\-]/g, ""));

                           //   dlData[i].drAmt = parseFloat((dlData[i].drAmt).replace(/[^\d\.\-]/g, ""));
                             // dlData[i].drAmt = parseFloat((dlData[i].drAmt).replace(/[^\d\.\-]/g, ""));
                            //    dlData[i].drAmt= parseFloat((dlData[i].drAmt).replace(/[^\d\.\-]/g, ""));
                         //   dlData[i].crAmt = new Intl.NumberFormat().format(crVal);
                             dlData[i].crAmt = crValue;
                            dlData[i].id = i+1;
                          //   alert(i);
                           //  alert(dlData[i].crAmt);
                               drSum += parseFloat((dlData[i].drAmt).replace(/[^\d\.\-]/g, ""));
                              crSum += parseFloat((dlData[i].crAmt).replace(/[^\d\.\-]/g, ""));
                              // onSumDrCrAmt(dlData)
                           //   alert(drSum);
                        //   dlData[i].drAmt = parseFloat((dlData[i].drAmt).replace(/[^\d\.\-]/g, ""));
                        //   alert(dlData[i].drAmt);


                        } // for
                           // setTxnDate(dlData[0].txnDate);
                             totalDrAmt = drSum;
                             totalCrAmt = crSum;

                             totalDrAmt = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                             totalCrAmt = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                           //  newDatas = [...data, dlData];
                            // alert(dlData[0].drAmt);
                           //  setData(newDatas);
                             if (typeof dlData[dlData.length]==='undefined') {
                             // let newData = [...data];
                             // let index = dlData.findIndex((data) => data.id === id) ;

                              //    if (index !==-1) {
                              //     newData.splice(index, 1);
                              //     setData(newData);
                               //   }
                              // alert(dlData[dlData.length].id);
                             // dlData.pop();
                             }

                             setData(data => [...data,dlData] );
                            //  setData([...data,dlData]);
                           // loadLength = dlData.length;
                           // alert(dlData.length);
                           // alert(data.length);
                            // console.log(data);

                   } //else

                }); // .then(response{})

}; // onSearch

const handleRemove = async(id) => {

    //  alert(id);
  const newData = [...data];
  const index = newData.findIndex((data) => data.id === id) ;

      if (index !==-1) {
      //  alert(index);
       newData.splice(index, 1);

       setData(newData);
      }

   // if (newData.length <= 1) {

   //    setData(newData);
   // }
   // alert(newData.length);
   // alert(data.length);
  console.log(newData);
  onSumDrCrAmt(newData)
  ChangeData = true;
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
  //  alert(sumData[i].voucherNo);
   if (sumData[i].voucherNo !== undefined) {    //  || sumData[i].voucherNo !== null || sumData[i].voucherNo !==''){
   // drSum += parseFloat((sumData[i].drAmt).replace(/[^\d\.\-]/g, ""));
    drSum += parseFloat((sumData[i].drAmt).replace(/[^\d\.\-]/g, ""));
    crSum += parseFloat((sumData[i].crAmt).replace(/[^\d\.\-]/g, ""));
   }
  }
   // alert(drSum);
   // alert(crSum);
    totalDrAmt = drSum;
    totalCrAmt = crSum;
  totalDrAmt = parseFloat(totalDrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  totalCrAmt = parseFloat(totalCrAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  setDrAmt(0);
   setCrAmt(0);

};
 // alert(totalDrAmt);
 // setCrAmt(num)
 const onAddVoucher = async (e) => {
  e.preventDefault();
  //alert(txnDate);
 //   econst fieldName = e.target.getAttribute("name");
    //alert(txnDate);
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
// '2020-08-09'.split('-').reverse().join('/'ƒ
let date = txnDate;
//alert(date);
let newDate = date.split("-").reverse().join("/");
// var todayDate = curr.toISOString().substr(0,10);
  //let newDate = date.toISOString().substr(0,10);
//alert(newDate);
  var vdrAmt = parseFloat(drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
var vcrAmt = parseFloat(crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//vid = vid+1
  vid=data.length;
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
  txnDate: newDate,
  totalDrAmt: 0,
  totalCrAmt: 0

};
const newDatas = [...data, newData];
//data=e.target.value;
//data = newDatas
 setData(newDatas);
// setData(newDatas);
// console.log(e.target.value);
//console.log(newDatas);
//alert(newData[newData.length].voucherNo);
//setData(voucherNo, jeNo, jeSub, jeDep, jeParticular, drAmt, crAmt)
lRead = true;
ChangeData = true;
onSumDrCrAmt(newDatas)
};
   // e.preventDefault();



  // const history = useHistory();

  const onPrint = async (voucherData, drTotal, crTotal) => {
    //alert(voucherData.length);
    for (var i = voucherData.length-1; i >= 0; i--) {
     // alert(typeof voucherData[i].voucherNo);
      if (typeof voucherData[i].voucherNo==='undefined') {
       //   alert("remove");
          voucherData.splice(i, 1);
      }
  }

    // alert(data.length);
     if (voucherData.length === 1) {
     if (typeof voucherData[0].voucherNo === 'undefined') {
      alert("No Voucher No. provided")
      return false;
    }
  }
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
    //alert(voucherData[0].voucherNo);
    // voucherData[0].txnDate = oldDate;
    console.log(data);
     var newDatas = [];
    voucherData[0].totalDrAmt = totalDrAmt;
     voucherData[0].totalCrAmt = totalCrAmt;

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

     newDatas = [...data, newData];

    // console.log(newDatas);
    //data=e.target.value;
    //data = newDatas
     //setData(newDatas);







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


};


const onSave = async (voucherData, drTotal, crTotal) => {
   // e.preventDefault();
      if (ChangeData === false) {
        alert("No Data Change cannot be save");
        return false
      }
     // alert(lSave);
      if (lSave === false) {
          alert("already Update Changed, press <New Voucher> to load New Voucher or press <Print Voucher> to print PDF voucher")
          return false
      }
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


     // alert(voucherData[0].companyID);
      //  alert(txnDate);
     for (let i = 0; i < voucherData.length; i++) {
       // alert(voucherData[i].companyID);
       if (voucherData[i].voucherNo !==undefined) {
      voucherData[i].voucherNo = EscapeStr(voucherData[i].voucherNo.toUpperCase())
       voucherData[i].jeParticular = EscapeStr(voucherData[i].jeParticular)
     //  voucherData[i].txnDate = txnDate;
       voucherData[i].companyID = companyID;
       voucherData[i].userName = userName;

      // voucherData[i].txnDate = moment(new Date(txnDate)).format("DD/MM/YYYY")
       voucherData[i].txnDate = moment(new Date(txnDate)).format("DD/MM/YYYY")
       } else {
        voucherData.splice(i, 1);
       // setData(newData);
     //   alert(voucherData[i].id);
       // alert(i);
         // alert("Data has some Error please reload the Voucher")

         // return false
      //  voucherData.splice(voucherData[i].id, 1);
       }


     };

     //alert(voucherData.length);




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
     // alert(url+"/voucherChange");


        fetch(url+'/voucherChange', {
            method: 'POST',
            headers: { 'Content-type' : 'application/json'},
            body: JSON.stringify( voucherData )
        // We convert the React state to JSON and send it as the POST body
       // data: JSON.stringify(user,user.ame)
        }).then(function(response) {
            lSave = false;
         return response.text()
      }).then(function(text) {
        lSave = false;

        // alert(text);


       lastSix = text.substr(text.length - 7); // => "Tabs1"
        //  poemDisplay.textContent = text;
        // alert(lastSix);
       // localStorage.setItem('voucherNo', voucherData[0].voucherNo);
      //  window.location.href='journalVoucher';
         if (text === 'Success') {

           //    alert("Update Success, press <New Voucher></New> to load new voucher or preee <Print Voucher> to print Voucher in PDF format ");
          window.location.reload(false);
          window.location.href='voucherEdit';
         };
        })//.catch(err => {
       //     console.log("error:", err);
        //    alert(err);
       //  });
       // localStorage.setItem('voucherNo', voucherData[0].voucherNo);
       // window.location.href='journalVoucher';

         // onPrint(voucherData, drTotal, crTotal)
         // window.location.href='VoucherEdit';


    };



    return (
        <div>
            <div className="row" style={{ 'margin': "10px", "paddingLeft": "5px" }}>
                <div className="col-sm-12 btn btn-success">
                Edit/Delete Existing Journal Voucher
                 </div>
            </div>
            <table class="table">
                <thead class="thead-dark" >
                    <tr style={mystyle}>
                    <th style={{backgroundColor: 'yellow'}}>#</th>
                    <th style={{backgroundColor: 'yellow'}}>Voucher No.</th>
                    <th style={{backgroundColor: 'yellow'}}>Txn. Date</th>
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
                        if (item.id === undefined) { return false}
                       return <tr key={item.id}>

                       <td>{item.id}</td>
                        <td>{item.voucherNo}</td>
                        <td>{item.txnDate}</td>
                        <td>{item.glNo}</td>
                        <td>{item.glSub}</td>
                        <td>{item.department}</td>
                        <td >{item.jeParticular}</td>
                        <td style={{
                          textAlign:"right"
                        }}>{item.drAmt}</td>

                        <td style={{
                          textAlign:"right"
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
                  <td></td>
                  <td style={{align:"right", color: "red"}}>Dr/Cr Totals:</td>
                  <td style={{textAlign:"right", color: "red"}}>{totalDrAmt}</td>

                  <td style={{textAlign:"right", color: "red"}}>{totalCrAmt}</td>


                </tbody>
                <tfoot>
                <td></td>
                <td></td>
                <td></td>
                <td><button class='btn btn-warning' onClick={() => onPrint(data, totalDrAmt, totalCrAmt)}>Print Voucher</button></td>
                <td><button style={{backgroundColor: "green", color: "white"}} onClick={() => onSave(data, totalDrAmt, totalCrAmt)}>Update Edited Voucher</button></td>

                <td></td>
               <td></td>



            </tfoot>

            </table>

            <div>

            </div>




            <form>
            <h4> Edit Journal Voucher   </h4>

            <center>

            <div  style={{ marginTop: "40px", paddingRight: "600px" }}>


            <div class="row">
            <label style={{ paddingLeft: "242px"}} >
            Voucher #:
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

               <button
               style = {{padding: '10px'}}
               type='button'
               class = 'btn btn-primary fa fa-download float-right'
               onClick={() => onSearch(voucherNo)}
               ></button>



            </label>

               </div>



          <div className="select-container" >
          <label style={{paddingRight: '200px'}}>G/L Selection
          <select onChange={(e) => handleChangeGl(e)}>
            {glData.map((item) => (
              <option value={item.glAcctNo} required> (G/L No-{item.glNo}) (G/L Sub No-{item.glSub}) (Department-{item.department}) (G/L Name-{item.glName})</option>
           ))}
          </select>


          </label>
          </div>


            <label style={{ align: "right"}}>
               G/L No.  :
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
              Txn. Date  :
               <input
                 type="date"
                 maxLength={10}
                 value={txnDate}
                 placeholder = {txnDate}
               //  defaultValue = {txnDate}
                 name="txnDate"
                 onChange={(e) => formatInputDate(e)}
                 required
               />
             </label>
              <label style={{ align: "left"}}>
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


              <label style={{ align: "left"}} >
              G/L Name :
              <input
                type="text"
                value={jeName}
                name="glName"
                onChange={(e) => onInputChange(e)}
                style={{width: '70%'}}
                readOnly={true}
                required
              />
            </label>

              <label style={{ align: "left"}} >
                Department :
                <input
                  type="text"
                  value={jeDep}
                  name="department"
                  onChange={(e) => onInputChange(e)}
                  readOnly={true}
                  required
                />
              </label>

              <label style={{ align: "left"}}>
              Particular :
              <input
              type="text"
              value={jeParticular}
              name="Particular"
              onChange={(e) => formatInputPart(e)}
              required
            />
            </label>

              <label style={{ align: "left"}}>
              Debit Amount :
              <input
                type="number"
                value={drAmt}
                name="drAmount"
                step='0.01'
                style= {{align:'right'}}
              //  onChange={(e) => onInputChange(e)}
                onChange={(e) => setDrAmt(e.target.value)}
                onBlur={(e) => formatInputDrAmt(e)}
                 maxLength={10}

              />
            </label>
            <label style={{ align: "left"}}>
            Credit Amount :
            <input
              type="number"
              value={crAmt}
              name="crAmount"
               step='0.01'
               style= {{align:'right'}}
               onChange={(e) =>setCrAmt(e.target.value)}
               onBlur={(e) => formatInputCrAmt(e)}
               maxLength={10}

             />
             </label>
             <br />
             <br />
             <td><button class= 'btn btn-info' style={{marginRight: '150px'}} type="button" onClick={() => onCancel()}>New Voucher</button></td>
             <td><button style={buttonStyle} class = 'btn btn-success' type="button" onClick={() => onDelete()}>Delete This Voucher </button></td>

             <td><button style={{paddingRight: '20px'}} class = 'btn btn-success' type="button" onClick={onAddVoucher}>Add Voucher </button></td>





              </div>




          </center>


          </form>

        </div>



    )
}


export default VoucherEdit
