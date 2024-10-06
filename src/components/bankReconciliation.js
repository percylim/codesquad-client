import React, { useState, useEffect, useRef} from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
//import ReactDOM from "react-dom";
import bankReconPDF from "./bankReconGenerator";
//import { format } from "date-fns";
import moment from 'moment';
//import {Tooltip as ReactTooltip} from "react-tooltip";

//require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const userName = localStorage.getItem('userName');

var glData = []
var lExit = false;
var glAcctNo = '';
var glSubNo = ''
var glDepart = '';
var glName = '';
var glType = '';
var totalDrAmt = 0;
var totalCrAmt = 0;
var bankData = [];
var vouchEdit = false;
var vouch_id = '';
var curr = new Date();
curr.setDate(curr.getDate());
var todayDate = curr.toISOString().substr(0, 10);
var tDate = moment(todayDate).format("DD/MM/YYYY")
var vid = 0
var lastSix = '';
var lRead = false;
var mRefNo='';

//var totalDrAmt = 0;
//var totalCrAmt = 0;

function BankReconciliation() {
  const [data, setData] = useState([]);
  const [ID, setBankGl] = useState(0);
  // const [glAcData, setGlData] = useState([]);
  const [jeNo, setjeNo] = useState("");
  const [jeSub, setJeSub] = useState("");
  const [jeDep, setJeDep] = useState("");
  const [jeType, setJeType] = useState("");
  const [bankAmount, setBankAmount] = useState(0);

  //  const [jeParticular, setParticular] = useState("");
  const [jeName, setJeName] = useState("");
  const [drAmt, setDrAmt] = useState();
  const [crAmt, setCrAmt] = useState();
  const [txnDate, setTxnDate] = useState(todayDate);
  const [reconDate, setReconDate] = useState(todayDate);
  const [jeParticular, setJeParticular] = useState("");
  const [voucherData, setVoucherData] = useState([]);
  const [voucherNo, setVoucherNo] = useState("");
  const [bankID, setBankID] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAcctNo, setBankAcctNo] = useState("");
  const [bankGlNo, setBankGlNo] = useState('');
  const [bankGlSub, setBankGlSub] = useState("");
  const [bankGlType, setBankGlType] = useState('');
  const [bankReconBalance, setBankReconBalance] = useState([]);
  const [bankBal, setBankBal] = useState(0);
  const [glBal, setglBal] = useState(0);
  const [reconData, setReconData] = useState([]);
  const inputRef = useRef(null);
  const inputRefVoucher = useRef(null);
  const mystyle = {
    align: "center",
    marginLeft: '10rem',
  };
  const boxStyles = {
    rectangle: {
      width: '50px',
      height: '50px',
      borderColor: 'red',
    }

  }
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

  const onSaveBankBal = async (e) => {



    // const newDatas = [...bankReconBalance];


    //
    const newDatas = [...bankReconBalance];
    for (let j = 0; j < newDatas.length; j++) {
      newDatas[0].bankBal = bankAmount;
      newDatas[0].particular = 'Balance as at ' + moment(reconDate).format('DD/MM/YYYY');
    }

    setBankReconBalance(newDatas);
    calculateBal(newDatas);
  }

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
      .get(url + `/glList`,
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
        glSubNo = glData[0].glSub;

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
      .get(url + '/bankList',
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
        let bkName = bankData[0].bankName;
        let bkAcctNo = bankData[0].bankAcctNo;
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
    //  tDate=moment().format("DD/MM/YYYY")
    const newData = {
      id: 0,
      particular: 'Balance as at ' + tDate,
      companyID: companyID,
      txnDate: reconDate,
      bankID: bankID,
      bankName: bankName,
      bankBal: 0.00,
      glBal: 0.00,


    };

    const newDatas = [...bankReconBalance, newData];
    //data=e.target.value;
    //data = newDatas
    setBankReconBalance(newDatas);

  //  let d = new Date(reconDate)
    //  mRefNo=String(d.getFullYear())+String(d.getMonth())+String(d.getDay());
    mRefNo=reconDate.substring(0,4)+reconDate.substring(5,7)+reconDate.substring(8,10);
  // alert(mRefNo);
  }, []);





  const onLoadBankGLBal = async (e) => {
    //alert(reconDate);
    //if (bankAmount === 0) {
    // alert('Bank Statement Balance cannot be ZERO');
    // return false

    //}


    Axios
      .get(url + `/loadGlBalance`,
        {
          params: {
            companyID: companyID,
            txnDate: reconDate,
            glNo: bankGlNo,
            glSub: bankGlSub,
          }
        }
      ).then(res => {
        // let bal = res.data;
        // alert(bal);
        // alert(res.data[0].sumBalance);

        const newDatas = [...bankReconBalance];
        //for (let j = 0; j < glData.length; j++) {
        newDatas[0].glBal = res.data[0].sumBalance;
        newDatas[0].particular = 'Balance as at '+moment(reconDate).format('DD/MM/YYYY');




        // }
        setBankReconBalance(newDatas);

        calculateBal(newDatas);
      })






  };



  const handleEditRecon = async (id) => {
    // alert(e)

    if (id === 0) {
      alert('This Row cannot be edited ' );
      return false;
     }
    const newData = [...bankReconBalance];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].id === id) {
           setJeParticular(newData[i].particular);
          setDrAmt(newData[i].bankBal);
        //   setCrAmt(newData[i].crAmt);

        //vouchEdit = false
        vouchEdit = true;
        vouch_id = id;



      }
    }


    // inputRefVoucher.current.focus();


  };
  const handleRemoveRecon = async (id) => {

     if (id === 0) {
      alert('This Row cannot be remove ' );
      return false;
     }
    const newData = [...bankReconBalance];
    const index = newData.findIndex((bankReconBalance) => bankReconBalance.id === id);

    if (index !== -1) {
      newData.splice(index, 1);
      setBankReconBalance(newData);
    }

    // alert(newData.length);



    let vID = 0;

    for (let i = 1; i < newData.length; i++) {
      //   alert(newDatas[i].itemTotal);
   //   bankBal += Number(newData[i].bankBal);
   //   glBal += Number(newData[i].glBal);

      vID++;
      newData[i].id = vID;
    }
      calculateBal(newData);
  };

  const handleChangeBank = async (e) => {
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

  const handleChangeGl = async (e) => {
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
  const onSearchVoucher = async (e) => {
    if (reconDate === 'null') {
      alert('No Date Selected');
      return false;
      // setTxnDate(todayDate);
    }
    //  alert(txnDate);
    let cYear = new Date(reconDate).getFullYear();
    let cMonth = (new Date(reconDate).getMonth()) + 1;

    //     alert(String(cYear).slice(-2));
    //  alert(("0"+String(cMonth)).slice(-2));
    let jvDate = String(cYear).slice(-2) + ("0" + String(cMonth)).slice(-2);
    //  alert(jvDate);
    //  sessionStorage.setItem('invoiceNo',invoiceNo);
    //   sessionStorage.setItem('voucherNo',voucherNo);
    //   sessionStorage.setItem('txnDate',txnDate);

    Axios
      .get(url + `/lastVoucherNo`,
        {
          params: {
            companyID: companyID,
            jvInit: jvDate,
          }
        }
      )
      .then(res => {
        if (res.data.length > 0) {
          // alert(res.data[0].voucherNo);
          // alert(Number(res.data[0].voucherNo.slice(5)) );
          let vNo = res.data[0].jvInit + '-' + String(Number(res.data[0].voucherNo.slice(5)) + 1);
          // alert(res.data[0].voucherNo);
          // alert(vNo);
          setVoucherNo(vNo);

        } else {
          setVoucherNo(jvDate + '-' + '1');

        }

      }, []);

  };
  //const onChangeDate = (date) => {
  //  const newDate = moment(date.timeStamp).format('YYYY-MM-DD');
  //  setValue(newDate);
  //  console.log(newDate); //always log "1970-01-01"
  //};
  const formatInputReconDate = async (e) => {
    e.preventDefault();
  //  alert(e.target.value);
    //const cName = e.target.name;
    console.log(e.target.name);
    console.log(e.target.value);
    setReconDate(e.target.value);
//    let d = new Date(e.target.value)
//    mRefNo=String(d.getFullYear())+String(d.getMonth())+String(d.getDay());
  //  alert(mRefNo);
  };

  const formatInputDate = async (e) => {
  //  alert(e.target.value);
    e.preventDefault();
    //const cName = e.target.name;
    console.log(e.target.name);
    console.log(e.target.value);
    setReconDate(e.target.value);

//    let d = new Date(e.target.value)
//    mRefNo=String(d.getFullYear())+String(d.getMonth())+String(d.getDay());
 //   alert(mRefNo);

  };
  const formatInputPart = async (e) => {
    e.preventDefault();
    let cName = e.target.value;
    console.log(e.target.name);
    console.log(e.target.value);
    setJeParticular(e.target.value);
    //  alert(e.target.value.length);
    if (e.target.value.length > 200) {
      //  alert("maximum length is 10");
      setJeParticular(cName.substring(0, 200));
    }


  };
  const calculateBal = async (sumData ) => {
 //   alert(sumData.length);
    let bBal = 0;

    let gBal = 0;

    for (let i = 0; i < sumData.length; i++) {
   //    alert(i+' -- '+bankReconBalance[i].bankBal);
      if (typeof sumData[i].bankBal === 'string') {
      bBal += Number(sumData[i].bankBal);
      } else {
      bBal += sumData[i].bankBal;
      }

      if (typeof sumData[i].glBal === 'string') {
      gBal += Number(sumData[i].glBal);
       } else {
        gBal += sumData[i].glBal;
      }
    }
//    alert(bBal);
  //   bBal+=bBalance;
  //   gBal+=gBalance
    setBankBal(bBal);
    setglBal(gBal);
 //   alert(bankBal);
    return true;
  };


  const formatInputVoucherNo = async (e) => {
    e.preventDefault();
    // const cName = e.target.name;
    console.log(e.target.name)
    // e.target.value.replace(/[^a-z0-9\s]/gi, '');
    console.log(e.target.value.toUpperCase());
    setVoucherNo(e.target.value.toUpperCase());


  };
  const formatInputDrAmt = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    if (num === 0) {
      return true;
    }
    setDrAmt(parseFloat(num).toFixed(2));

  };

  const formatInputCrAmt = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    if (num === 0) {
      return true;
    }
    setCrAmt(parseFloat(num).toFixed(2));

  };

  const handleInputChangeDrAmt = async (e) => {
    console.log(e.target.value)
    let num = e.target.value
    if (num === '' && num === 'NaN') {
      num = 0;
    }
    //  if (num === 0) {
    //    return true;
    //  }
    setDrAmt(num);

  };
  const handleInputChangeCrAmt = async (e) => {
    console.log(e.target.value)
    let num = e.target.value
    if (num === '' && num === 'NaN') {
      num = 0;
    }
    //  if (num === 0) {
    //    return true;
    //  }
    setCrAmt(num);
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
  const onAddReconcilation = async (e) => {
    //  e.preventDefault();
    // ******** add to bankReconBalance



    //***** add to voucher */
    // me = e.target.getAttribute("name");
    //******** add to bankReconBalance





    //***** add to voucher */
   /*
    for (let i = 0; i < bankReconBalance.length; i++) {
      if (voucherNo.substr(i, 1) === ';') {
        alert("Voucher No. cannot contain (;) letter ");
        return false;
      }

    }
    */
   // let crVal = 0;
   // var drVal = 0;
    //  alert(txnDate);
    if (reconDate === '') {
      alert("Bank statement ending Date cannot be blank");
      return false
    };

    if (reconDate === undefined) {
      alert("bank statement ending Date cannot be blank");
      return false
    };
    //  alert(drAmt);
    // alert(crAmt);




    if (typeof (drAmt) === 'string') {
       let drVal = Number(drAmt);
       setDrAmt(parseFloat(drVal));

    };






    if (drAmt === 0) {

      alert("Bank Reconciliation Amount cannot be all 0 value")
      return false

    };


    //alert(voucherNo);

    // alert(jeParticular);
    if (jeParticular === '') {
      alert("Particular cannot be blank")
      return false
    };
    if (jeParticular === undefined) {
      alert("Particular cannot be blank")
      return false
    };
    // alert("ready to add");

    //let {data, input} = e.target.value

      mRefNo=reconDate.substring(0,4)+reconDate.substring(5,7)+reconDate.substring(8,10);
    //var vdrAmt = parseFloat(drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 //   var vcrAmt = parseFloat(crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 //alert(drAmt+' - '+vdrAmt);
// alert(mRefNo);

 if (vouchEdit) {

  const newDatas = [...bankReconBalance];
  for (let i = 1; i < newDatas.length; i++) {
    if (newDatas[i].id === vouch_id) {
   newDatas[i].id = i;

     newDatas[i].companyID= companyID;
     newDatas[i].particular= jeParticular;
     newDatas[i].bankBal= drAmt;
     newDatas[i].glBal= 0;
     newDatas[i].txnDate= reconDate;
      newDatas[i].bankID= bankID;
       newDatas[i].bankName= bankName;
      newDatas[i].refNo = mRefNo;
      newDatas[i].bankAcctNo = bankAcctNo;



    }
  }

  for (let i = 1; i < newDatas.length; i++) {

      newDatas[i].companyID= companyID;
      newDatas[i].txnDate= reconDate;
      newDatas[i].bankID= bankID;
      newDatas[i].bankName= bankName;
      newDatas[i].bankAcctNo = bankAcctNo;
      newDatas[i].id = i + 1;

  }
  setData(newDatas);
  vouchEdit = false;
  setBankReconBalance(newDatas);
    lRead = true;
    calculateBal(newDatas);


  } else {
    vid = vid + 1
    const newData = {
      id: vid,
      companyID: companyID,
      particular: jeParticular,
      bankBal: drAmt,
      glBal: 0,
      txnDate: reconDate,
      bankID: bankID,
      bankName: bankName,
      bankAcctNo: bankAcctNo,
      refNo: mRefNo,
    };
    const newDatas = [...bankReconBalance, newData];
    setBankReconBalance(newDatas);
    lRead = true;
    calculateBal(newDatas);
  } // if vouchedit

  };
  // e.preventDefault();

  const onNew = async () => {
    window.location.href = 'bankReconciliation';
  };
  // const history = useHistory();
  const onPrint = async (bankReconData, bankTotal, glTotal) => {
    //  alert(bankReconData.length);
    //  alert(voucherData[0].txnDate);

    // console.log(voucherData);
      if (bankBal !== glBal) {
        alert('Reconciliation Ending Balance on Bank and G/L must equal' );
        return false;
      }

   mRefNo=reconDate.substring(0,4)+reconDate.substring(5,7)+reconDate.substring(8,10);


    if (bankReconData.length === 0) {

      alert("No Bank Reconciliation informstion provided")

      return false;
    }
    bankTotal=parseFloat(bankTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    glTotal=parseFloat(glTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    for (var i = bankReconData.length - 1; i >= 0; i--) {
      // alert(typeof voucherData[i].voucherNo);

      let date = bankReconData[i].txnDate;

      // alert(dlData[0].txnDate);
      // const [txnDate, setTxnDate] = useState(date);
      //   todayDate = curr.split("/").reverse().join("-");
      bankReconData[i].txnDate = moment(new Date(date)).format("DD/MM/YYYY")
      bankReconData[i].bankID =  bankID ;
      bankReconData[i].bankName =  bankName ;
      bankReconData[i].bankAcctNo =  bankAcctNo ;
      bankReconData[i].bankBal=parseFloat(bankReconData[i].bankBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      bankReconData[i].glBal=parseFloat(bankReconData[i].glBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    }
    bankReconData[0].id = 'B';

    let vid = bankReconData[0].length + 1;
    const newData = {
      id: vid,
      companyID: '',
      particular: 'RECONCILIATION ENDING BALANCE :',
      bankBal: bankTotal ,
      glBal: glTotal,
      txnDate: bankReconData[0].txnDate,
      bankID: 'LASTROW',
      bankName: '',
      bankAcctNo: '',
      refNo: mRefNo ,

    };



    const newDatas = [...bankReconData, newData];


    //  const filename = `voucher.pdf`
    // All we want for this example are:
    // Title, Release Date, Description, Vote Average
    // This is important to the function we are building
    // because it sets the order in which we will display data
    const headers = [
      { key: 'Particular', display: 'particular' },
      { key: 'Bank Balance', display: 'bankBal' },
      { key: 'G/L Balance', display: 'glBal' },

    ]

    // Here's the call for our pdf function
    // Because of the placeholder code in our pdf.js file,
    // clicking on this should render a save dialog
    // and downloading should render an empty pdf
  //  alert(reconDate);
   //let d = new Date(reconDate)
   //alert(typeof reconDate);

   // alert(mRefNo);
    bankReconPDF(newDatas, headers, 'bankrecon'+'-'+mRefNo+'.pdf')
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

  const onSave = async (reconData, drTotal, crTotal) => {
    // e.preventDefault();
 // console.log(voucherData);
    if (bankBal !== glBal) {
      alert('Reconciliation Ending Balancel on Bank and G/L must equal' );
      return false;
    }
   //
   //   alert(drTotal);
    //  alert(crTotal);
    if (reconData.length === 0) {
      alert('No Bank Reconciliation record to save');
      return false
    }
    if (bankBal !== glBal) {
      alert('Reconciliation Ending Balance for Bank and Bank G/L must equal')
      return false
    }


    let bankGlCount = 0

    for (let i = 0; i < bankReconBalance.length; i++) {


      // let event = new Date(txnDate);
      //let date = JSON.stringify(event)
      // voucherData[i].txnDate = date.slice(1,11)
      // voucher[i].txnDate = format(voucherData[i].txnDate, 'DD/MM/YYYY');
      //voucherData[i].txnDate = txnDate;
      bankReconBalance[i].txnDate = reconDate;   // moment(new Date(reconDate)).format("DD/MM/YYYY");
      bankReconBalance[i].refNo = EscapeStr(mRefNo);
     // reconData[i].particular = EscapeStr(reconData[i].particular)
     bankReconBalance[i].bankID = EscapeStr(bankID);
     bankReconBalance[i].bankName = EscapeStr(bankName);
     bankReconBalance[i].bankAcctNo = EscapeStr(bankAcctNo);
     bankReconBalance[i].companyID = companyID;
      // alert(bankID+bankGlNo+bankGlSub+bankGlType);
      // alert(voucherData[i].bankID+voucherData[i].glNo+voucherData[i].glSub+voucherData[i].glType);
      //  voucherData[i].txnDate =  format(new Date(voucherData[i].txnDate), "dd/MM/yyyy")
      //   alert(bankID+bankGlNo+bankGlSub+bankGlType+" : "+voucherData[i].bankID+voucherData[i].glNo+voucherData[i].glSub+voucherData[i].glType);
     // if (bankID + bankGlNo + bankGlSub + bankGlType === voucherData[i].bankID + voucherData[i].glNo + voucherData[i].glSub + voucherData[i].glType) {
     //   bankGlCount += 1
     //   voucherData[i].txnType = 'BANK';
     // }

    };
    //  alert(bankGlCount);
   //  return false
 /*
   setReconData([]);  // clear data first
alert(reconData.length);

   Axios
   .get(url + `/bankReconSearch`,
     {
       params: {
         companyID: companyID,
         bankID: bankID,
         txnDate: reconDate,
       }
     }
   )
    .then(res => (reconData=res.data));
  //   if (res.data.length > 0) {
       //   supplierData = res.data;
       //    alert(res.data[0].supplierID);
       //  alert(typeof res.data);
   //    setCustData(res.data);
  // alert('Bank Reconciliation on Date : ' + txnDate  + ' for Bank '+bankName+" already Existed");


//       return false;
 //    }


//   });
  alert(reconData.length);
 if (reconData.length >0) {
  alert('Bank Reconciliation on Date : ' + reconDate  + ' for Bank '+bankName+" already Existed");


         return false;

 }
*/
   Axios
      .post(url + '/bankReconciliation', bankReconBalance )
      .then(res => {


        if (res.data === 'Success') {

          window.location.href = '/bankReconciliation';

        };
        //  alert(text);
      }, []);


   // return false;

/*
    Axios
      .post(url + '/purchaseVoucher', voucherData



      )

      .then(res => {


        if (res.data === 'Success') {

          window.location.href = '/bankReconciliation';

        };
        //  alert(text);
      }, []);
*/

 };

  const handleInputChangeDr = async (e) => {
    // alert(event.target.value);
    let num = e.target.value; // .replace(/\+|-/ig, '');;
    //alert(num);


    setDrAmt(num);

  };
  const handleInputChangeBankAmt = async (e) => {
    // alert(event.target.value);
    let num = e.target.value; // .replace(/\+|-/ig, '');;
    //alert(num);


    setBankAmount(num);

  };
  const handleInputChangeCr = async (e) => {
    console.log(e.target.value)
    let num = e.target.value

    setCrAmt(num);
  };
  const formatInputDr = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    setDrAmt(parseFloat(num).toFixed(2));

  };
  const formatInputBankAmt = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    setBankAmount(parseFloat(num).toFixed(2));

  };


  const formatInputCr = async (e) => {
    let num = e.target.value
    if (num === '') {
      num = 0;
    }
    setCrAmt(parseFloat(num).toFixed(2));
  }


  return (
    <div>

      <div className="row" style={{ 'margin': "10px", "paddingLeft": "5px" }}>
        <div className="col-sm-12 btn btn-success">
          Bank Reconciliation Management
        </div>
      </div>



      <div style={{
        display: 'inline-block',
        width: '1520px',
        height: '120px',
        margin: '6px',
        backgroundColor: 'white',
        border: '4px solid grey',
      }}
      >
        <div className="select-container" >

          <label style={{ paddingLeft: '0px' }}>Bank Selection :
            <select onChange={(e) => handleChangeBank(e)}>
              {bankData.map((items) => (
                <option value={items.id} style={{ width: '25%' }} required> (Bank ID-{items.bankID}) (Bank Name-{items.bankName})</option>
              ))}
            </select>
          </label>

        </div>




        <label style={{ paddingLeft: '0px' }}>
          Bank ID :
          <input
            type="text"
            style={{ width: "150px", marginLeft: '3rem', marginRight: '1.5rem' }}
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
            style={{ width: "400px", marginLeft: '1rem', marginRight: '1rem' }}
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
            style={{ width: '250px', marginLeft: '1rem', marginRight: '1rem' }}
            maxLength={30}
            value={bankAcctNo}
            name="bankID"
            onChange={(e) => onInputChange(e)}
            readyOnly={true}
            required
          />
        </label>

        <label style={{ paddingLeft: '0px' }}>
          Bank G/L No. :
          <input
            type="text"
            style={{ width: "100px", marginLeft: '1rem', marginRight: '1rem' }}
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
            style={{ width: "100px", marginLeft: '1rem', marginRight: '2.5rem' }}
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
            style={{ width: "100px", marginLeft: '1rem', marginRight: '1rem' }}
            maxLength={30}
            value={bankGlType}
            name="bankGlType"
            onChange={(e) => onInputChange(e)}
            readyOnly={true}
            required
          />
        </label>

        <label style={{ paddingLeft: '0px' }}>
          Bank Reconciliation For Period Ending At  :
          <input
            type="date"
            maxLength={10}
            value={reconDate}
            style={{ width: '10%', marginRight: '2rem' }}
            //  defaultValue = {txnDate}
            name="reconDate"
            onBlur={(e) => formatInputDate(e)}
            onChange={(e) => formatInputReconDate(e)}
            required
          />


          Bank Balance :
          <input
            type="number"
            style={{ width: '200px', marginLeft: '1rem' }}
            value={bankAmount}
            name="bankAmount"
            placeholder='0.00'
            step='0.01'
            onBlur={(e) => formatInputBankAmt(e)}
            onChange={(e) => handleInputChangeBankAmt(e)}
            maxLength={10}
  
          />
          <button
            style={{ padding: '10px', marginRight: '2rem' }}
            type='button'
            class='btn btn-success fa fa-save float-right'
            onClick={() => onSaveBankBal()}
  
          ></button>

          <button
            style={{ padding: '10px' }}
            type='button'
            class='btn btn-primary fa fa-download float-right'
            onClick={() => onLoadBankGLBal()}
          ></button>
      


        </label>
      </div>


      <div className="row" style={{ 'margin': "0px", "marginLeft": "0rem" }}>
        <div className="col-sm-12 btn btn-warning">
          Bank Statement And General Ledger Bank Account Comparationtion
        </div>


        <table class="table table-bordered">
          <thead class="thead-dark" >
            <tr style={{ align: 'left' }}>
              <th style={{ width: '50px' }}>#</th>
              <th style={{ backgroundColor: '#010000', width: '800px', color: 'white' }}>Particular And Description</th>
              <th style={{ backgroundColor: '#64ba64', width: '300px' }}>Bank Balance</th>
              <th style={{ backgroundColor: 'grey', width: '300px' }}>G/L Balance</th>
              <th style={{ backgroundColor: 'blue', width: '100px' }}>Select</th>

            </tr>
          </thead>
          <tbody style={mystyle} >
            {bankReconBalance.map(item => {
              return <tr key={item.id}>
                <td>{item.id}</td>


                <td style={{ textAlign: 'left', color: 'white', backgroundColor: '#01000099' }}>{item.particular}</td>
                <td style={{ textAlign: "right", color: 'black', backgroundColor: '#64ba64' }}>{parseFloat(item.bankBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                <td style={{ textAlign: "right", color: "black", backgroundColor: 'grey' }}>{parseFloat(item.glBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              <button class={'fa fa-edit'} style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleEditRecon(item.id)}> </button>
              <button class={'fa fa-trash'} style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleRemoveRecon(item.id)}> </button>

              </tr>

            })}

          </tbody>


          <tfoot >
            <td></td>
            <td style={{ textAlign: 'right', color: 'white', backgroundColor: '#010000'}}>Reconciliation Ending Balance :</td>
            <td style={{ textAlign: "right", color: 'black', backgroundColor: '#64ba64'}}>{parseFloat(bankBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
            <td style={{ textAlign: "right", color: "black", backgroundColor: 'grey' }}>{parseFloat(glBal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>

          </tfoot>

        </table>

      </div>

      <div style={{
        display: 'inline-block',
        width: '1520px',
        height: '105px',
        margin: '6px',
        backgroundColor: 'white',
        border: '4px solid blue',
      }}
      >
        <p></p>
   <label style={{ paddingLeft: '0px' }}>
     <a style={{marginLeft: '.5rem', marginRight: '2.1rem'}}> Particular :</a>
            <input
              type="text"
              value={jeParticular}
              name="particular"
              style={{ width: '1000px', border: '1px solid #696969' }}
              onChange={(e) => formatInputPart(e)}
              readOnly={false}
              maxLength={255}
              required
   
            />

  
   </label>

  <p></p>
          <label style={{ paddingLeft: '0px' }}>
            <a style={{ marginRight: '0rem', marginLeft: '.5rem' }}> Amount to Reconciliation : </a>
            <input
              type="number"
              style={{ width: '200px', border: '1px solid #696969' }}
              value={drAmt}
              name="drAmt"
              ref={inputRefVoucher}
              onBlur={(e) => formatInputDrAmt(e)}
              onChange={(e) => handleInputChangeDrAmt(e)}
              maxLength={13}
              required
  
            />
     
          <a><button style={{ backgroundColor: "cyan", color: "black", width: '230px', marginLeft: '2rem' }} onClick={() => onAddReconcilation()}>Add Reconciliation Item</button></a>

          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <p></p>

          <td><button style={{ backgroundColor: "green", color: "white", width: '250px', marginLeft: '10rem' }} onClick={() => onPrint(bankReconBalance, bankBal, glBal)}>Print Reconciliation Report</button></td>
          <td><button style={{ backgroundColor: "red", color: "white", width: '250px' }} onClick={() => onSave(bankReconBalance, bankBal, glBal)}>Save Bank Reconciliation</button></td>

          <p></p>
        </label>

      </div>

      <p></p>
      <p></p>

      <tr></tr>

    </div>











  )
}
export default BankReconciliation;
