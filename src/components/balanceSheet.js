import React, { useState, useEffect, RadioButton, useRef } from 'react'
import Axios from 'axios';
//import { useHistory } from "react-router-dom";
import './Profile.css';
import ReactDOM from "react-dom";
import ExportPNLPDF from "./pdfPnLGenerator";
import { format } from "date-fns";
import moment from 'moment';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import { Tooltip as ReactTooltip } from "react-tooltip";
//import {yearlyReport, quarterlyReport, monthlyReport} from "./salesReport";
import BootstrapTable from 'react-bootstrap-table-next';
import { AirlineSeatIndividualSuiteSharp, SettingsBackupRestoreRounded } from '@material-ui/icons';
import Moment from 'react-moment';
//import {CSVLink} from 'react-csv';
import BSPDF from './pdfBSGenerator';

import Blink from 'react-blink-text';

//require('dotenv').config();//

const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
const companyName = localStorage.getItem('companyName');
const userName = localStorage.getItem('userName');


// const userLevel = localStorage.getItem('userLevel');


var curr = new Date();
var todayDate = curr.toISOString().substr(0, 10);
var dDate= new Date(curr.setDate(curr.getDate()-7));
var finStartDate='';
var finEndDate='';
var finYear = dDate.getFullYear(); 
var data = [];
var gData=[];
var opData=[];
var companyData =[];
var totalArAmt =0 ;
var totalApAmt=0;
var intGlName = '';
var intTotalText ='';
var intTotal=0;
var curLiaGlName='';
var curLiaTotalText='';
var curLiaTotal=0;
var otherTotal=0;
var otherTotalText='';
var otherGlName = ''
 var sDate=''; //curr.toISOString().substr(0,10);
 var eDate= '';
 var date = new Date();
 var cMonth = date.getMonth()+12;
var stDate = new Date(date.getFullYear()+1, date.getMonth()-cMonth, 2);
var enDate = new Date(stDate.getFullYear(), stDate.getMonth()+12, 1);
var totalDebit=0;
var totalCredit =0;
var msg='';
var reportType='';
var closeStockTotal =0 ;
var totalLongTermLiability = 0;
var totalOwnerEquity = 0;
var totalIncomeSummary=0;
var BSData=[];
//var startDate=format(stDate, "dd/MM/yyyy");
//var endDate=format(enDate, "dd/MM/yyyy");

function BalanceSheet() {
  const [startDate, setStartDate] = useState(stDate.toISOString().substr(0,10));
  const [endDate, setEndDate] = useState(enDate.toISOString().substr(0,10)); 
  const [fixedAssetData, setFixedAssetData]= useState([]);
  const [currentAssetData, setCurrentAssetData]= useState([]);
  const [ARReceivableData, setARReceivableData]= useState([]);
  const [accountPayableData, setAccountPayableData] = useState([]);
  const [intangibleAssetData, setIntangibleAssetData]= useState([]);
  const [otherAssetData, setOtherAssetData]= useState([]);
  const [currentLiabilityData, setCurrentLiabilityData]= useState([]);
  const [longTermLiabilityData, setLongTermLiabilityData]= useState([]);
  const [equityData, setEquityData]= useState([]);
  const [ownerEquityData, setOwnerEquityData] = useState([]);
  const [incomeSummaryData, setIncomeSummaryData] = useState([]);
  const [totalFixedAsset, setTotalFixedAsset]=useState(0.00);
  const [totalCurrentAsset, setTotalCurrentAsset]=useState(0.00);
  const [stockData, setStockData] = useState([]) ;
  const [totalCurrentLiability, setTotalCurrentLiability] = useState(0.00);
  const [totalAccountPayable, setTotalAccountPayable] = useState(0.00);
  
  
 const negativeDisplay = async(amount) => {
  if (amount >= 0) { return amount;}
  return  '('+parseFloat(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+')';  
 };
 const onSearchBalanceSheet = async() => {
  let FASData =[];
  let CASData = [];
  let prodData = [];
  let ARData =[];
  totalDebit=0;
  totalCredit=0;
  let sDate = new Date (startDate);
  let eDate = new Date(endDate);
  let firstDay = Number(String(sDate.getFullYear())+String(sDate.getMonth()+1).padStart(2, '0')+String(sDate.getDate()).padStart(2, '0'));
  let lastDay =  Number(String(eDate.getFullYear())+String(eDate.getMonth()+1).padStart(2,'0')+String(eDate.getDate()).padStart(2,'0'));
  
  let month=sDate.getMonth()+12;
  let totalFAS =0;
  //alert(monthEnd[month]+' - '+month);
   // if (lastDay-firstDay > monthEnd[month]) {
   //     alert('Ending Day cannot latter than the last day of the month');
   //     return false;
   // }
    
    if (isNaN(sDate.getTime())) {
      alert('Invalid Starting Date') ;
      return false;
    } 
    if (isNaN(eDate.getTime())) {
      alert('Invalid Ending Date') ;
      return false;
    } 
    if (eDate < sDate) {
      alert('Ending date must later than Starting date') ;
      return false;
    }
    let difference = eDate.getTime() - sDate.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    
    if (TotalDays > 365) {
      alert('Starting and Ending date cannot more than one year');
      return false;
    }
   // if (TotalDays < 365) {
   //   alert('Starting and Ending date must be one year');
  //    return false;
  //  }
   reportType='BAL'; 
   //alert(sDate+" = "+eDate);
   // get fixed Asset data
  Axios
  .get(url + `/fixedAsset`,
    {
      params: {
      companyID: companyID, 
      startDate: format(sDate,"yyyy-MM-dd"),
      endDate: format(eDate, "yyyy-MM-dd"),
      }
    }
  ).then(res => {
     
     if (res.data.length === 0) {
       alert('No G/L Account Selected');
       return false;
     } 
    // alert(res.data.length);
    for (let x = 0; x < res.data.length; x++) {   
      if (res.data[x].debit === null){
        res.data[x].debit=0;
      }    
      if (res.data[x].credit === null){
        res.data[x].credit=0;
      }  
     
        //  res.data[x].debit = dAmt ;//Math.abs(res.data[x].debit);
       //  }
         if (res.data[x].credit < 0) {
       //   res.data[x].credit = (res.data[x].credit * -1); //Math.abs(res.data[x].credit);
         } 
         if (res.data[x].debit < 0) {
          res.data[x].debit = (res.data[x].debit * -1); //Math.abs(res.data[x].credit);
          
          } 
     //     alert(res.data[x].debit+' - '+res.data[x].credit);
      // totalDebit+=res.data[x].debit;
      // totalCredit+=res.data[x].credit; 
        let addNo='';
        let amt =0;
        if (res.data[x].debit > 0) {
            amt=res.data[x].debit;   
        } else {
            amt = res.data[x].credit;
        }
         if (res.data[x].glType === '406') {
            addNo = 'Less :';
          //  totalDebit-= amt; //res.data[x].debit;
            totalCredit-= amt; // res.data[x].credit; 
         } else {
         // totalDebit+=res.data[x].debit;
          totalCredit+= amt; //res.data[x].credit; 
         }
         //  totalFAS+=amt;
    //   alert(totalCredit); 
        // setTotalRev(totalCredit);
        if (res.data[x].debit !==0 || res.data[x].credit !==  0) {  
       let newData = {
        addNo: addNo,
        glName: res.data[x].glName,
        totalText: '', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
        amount: amt, // res.data[x].debit-res.data[x].credit,
        }
        FASData.push(newData); 
     } // if 
  
    } //for
      let FASAmt=0  
      setFixedAssetData(FASData);
     for (let y = 0; y < FASData.length; y++) {   
       // if (fixedAssetData[y].addNo === 'Less :') {
       //     FASAmt-=fixedAssetData[y].amount;
       // } else {
             FASAmt+=FASData[y].amount;
       // }
     } 
      
      setTotalFixedAsset(FASAmt);
    //  alert(FASAmt);
    })

     //  load current assets information;
     Axios
     .get(url + `/currentAsset`,
       {
         params: {
         companyID: companyID, 
         startDate: format(sDate,"yyyy-MM-dd"),
         endDate: format(eDate, "yyyy-MM-dd"),
         }
       }
     ).then(res => {
        
        if (res.data.length === 0) {
          alert('No G/L Account Selected');
          return false;
        } 
       // alert(res.data.length);
       for (let x = 0; x < res.data.length; x++) {   
         if (res.data[x].debit === null){
           res.data[x].debit=0;
         }    
         if (res.data[x].credit === null){
           res.data[x].credit=0;
         }  
        
           //  res.data[x].debit = dAmt ;//Math.abs(res.data[x].debit);
          //  }
            if (res.data[x].credit < 0) {
          //   res.data[x].credit = (res.data[x].credit * -1); //Math.abs(res.data[x].credit);
            } 
            if (res.data[x].debit < 0) {
             res.data[x].debit = (res.data[x].debit * -1); //Math.abs(res.data[x].credit);
             
             } 
        //     alert(res.data[x].debit+' - '+res.data[x].credit);
         // totalDebit+=res.data[x].debit;
         // totalCredit+=res.data[x].credit; 
           let addNo='';
           let amt =0;
           if (res.data[x].debit > 0) {
               amt=res.data[x].debit;   
           } else {
               amt = res.data[x].credit;
           }
          
            //  totalFAS+=amt;
       //   alert(totalCredit); 
           // setTotalRev(totalCredit);
           if (amt < 0 ) {addNo =' Less :'}
           if (res.data[x].debit !==0 || res.data[x].credit !==  0) {  
          let newData = {
           addNo: addNo,
           glName: res.data[x].glName,
           totalText: '', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
           amount: amt, // res.data[x].debit-res.data[x].credit,
           }
           CASData.push(newData); 
        } // if 
     
       } //for
         let CASAmt=0  
       //  setCurrentAssetData(CASData);
        for (let y = 0; y < CASData.length; y++) {   
          // if (fixedAssetData[y].addNo === 'Less :') {
          //     FASAmt-=fixedAssetData[y].amount;
          // } else {
                CASAmt+=CASData[y].amount;
          // }
        }
         setTotalCurrentAsset(CASAmt);
       //  alert(FASAmt);
       })
      // load account receivable
 
        
          let CASAmt=0  
          setCurrentAssetData(CASData);
         for (let y = 0; y < CASData.length; y++) {   
           // if (fixedAssetData[y].addNo === 'Less :') {
           //     FASAmt-=fixedAssetData[y].amount;
           // } else {
                 CASAmt+=CASData[y].amount;
           // }
         } 
      //   alert(CASAmt);
          setTotalCurrentAsset(CASAmt);
       //   alert(CASAmt);
    //    })
     // alert('here');
     totalArAmt=0;
      Axios
      .get(url + `/accountReceivable`,
        {
          params: {
          companyID: companyID, 
          startDate: format(sDate,"yyyy-MM-dd"),
          endDate: format(eDate, "yyyy-MM-dd"),
          }
        }
      ).then(res => {
         let arAmt =0;
      //   if (res.data.length === 0) {
      //     alert('No Account Receivable Selected');
      //     return false;
      //   } 
     //    alert(res.data.length);
        for (let x = 0; x < res.data.length; x++) {   
          if (res.data[x].debit === null){
            res.data[x].debit=0;
          }    
          if (res.data[x].credit === null){
            res.data[x].credit=0;
          }  
         
            //  res.data[x].debit = dAmt ;//Math.abs(res.data[x].debit);
           //  }
             if (res.data[x].credit < 0) {
              res.data[x].credit = (res.data[x].credit * -1); //Math.abs(res.data[x].credit);
             } 
             if (res.data[x].debit < 0) {
              res.data[x].debit = (res.data[x].debit * -1); //Math.abs(res.data[x].credit);
              
              } 
         //     alert(res.data[x].debit+' - '+res.data[x].credit);
          // totalDebit+=res.data[x].debit;
          // totalCredit+=res.data[x].credit; 
            // alert(res.data[x].debit+ ' = '+res.data[x].credit);
                arAmt+=res.data[x].debit-res.data[x].credit;
         //    alert('arAmt='+arAmt);  
         } //for   
              
         let newData = {
          addNo: '',
          glName: 'Account Receivable',
          totalText: '', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
          amount: arAmt, // res.data[x].debit-res.data[x].credit,
          }
       
            ARData.push(newData); 
            setARReceivableData(ARData);
            totalArAmt=arAmt;
          //  alert(totalArAmt);
           // CASAmt=CASAmt+arAmt;
          // setTotalCurrentAsset(arAmt);
          //  setOtherAssetData(ARData);
        // } // if 
          })  
          
          
          Axios
          .get(url + `/closingStock`,
            {
              params: {
              companyID: companyID, 
              startDate: format(sDate,"yyyy-MM-dd"),
              endDate: format(eDate, "yyyy-MM-dd"),
              }
            }
          ).then(res => {
            
             
             closeStockTotal =res.data[0].amount;
                   
               
                setStockData(res.data);
        

              })
              
             
              Axios
              .get(url + `/intangibleAsset`,
                {
                  params: {
                  companyID: companyID, 
                  startDate: format(sDate,"yyyy-MM-dd"),
                  endDate: format(eDate, "yyyy-MM-dd"),
                  }
                }
              ).then(res => {
                  intGlName='';
                  intTotalText='';
                  intTotal=0;
                  let addNo='';
                      let inData=[];
                   for (let x = 0; x < res.data.length; x++) { 
                     let amt=res.data[x].debit - res.data[x].credit;
                      intGlName='INTANGIBLE ASSET';
                      intTotalText='RM';
                      if (amt < 0) {
                        addNo='Less :';
                      }  
                      intTotal+=amt;
                     let newData = {  
                      addNo: addNo,
                      glName: res.data[x].glName,
                      totalText: '',
                      amount: amt, 
                     }  
                     inData.push(newData); 
                   } // for x
                   setIntangibleAssetData(inData); 
            
                  }) 
                  
                  Axios
                  .get(url + `/otherAsset`,
                    {
                      params: {
                      companyID: companyID, 
                      startDate: format(sDate,"yyyy-MM-dd"),
                      endDate: format(eDate, "yyyy-MM-dd"),
                      }
                    }
                  ).then(res => {
                      otherGlName='';
                      otherTotalText='';
                      otherTotal=0;
                      let addNo='';
                          let otherData=[];
                       for (let x = 0; x < res.data.length; x++) { 
                         let amt=res.data[x].debit - res.data[x].credit;
                          otherGlName='OTHER ASSET';
                          otherTotalText='RM';
                          if (amt < 0) {
                            addNo='Less :';
                          }  
                          otherTotal+=amt;
                         let newData = {  
                          addNo: addNo,
                          glName: res.data[x].glName,
                          totalText: '',
                          amount: amt, 
                         }  
                         otherData.push(newData); 
                       } // for x
                       setOtherAssetData(otherData); 
                
                      })  

                      Axios
                      .get(url + `/currentLiability`,
                        {
                          params: {
                          companyID: companyID, 
                          startDate: format(sDate,"yyyy-MM-dd"),
                          endDate: format(eDate, "yyyy-MM-dd"),
                          }
                        }
                      ).then(res => {
                          curLiaGlName='';
                          curLiaTotalText='';
                        //  totalCurrentLiability=0;
                          curLiaTotal=0; 
                          let addNo='';
                              let curLiaData=[];
                           for (let x = 0; x < res.data.length; x++) { 
                             let amt=res.data[x].debit - res.data[x].credit;
                             // totalCurrentLiability+=amt;
                               curLiaGlName='';
                              curLiaTotalText='RM';
                              if (amt < 0) {
                                addNo='Less :';
                              }  
                              curLiaTotal+=amt;
                              if (amt !==0) {   
                             let newData = {  
                              addNo: addNo,
                              glName: res.data[x].glName,
                              totalText: '',
                              amount: amt, 
                             }  
                             curLiaData.push(newData); 
                              }
                           } // for x
                           setTotalCurrentLiability(curLiaTotal);
                           setCurrentLiabilityData(curLiaData); 
                    
                          })                      
                      
                          totalApAmt=0;
                          Axios
                          .get(url + `/accountPayable`,
                            {
                              params: {
                              companyID: companyID, 
                              startDate: format(sDate,"yyyy-MM-dd"),
                              endDate: format(eDate, "yyyy-MM-dd"),
                              }
                            }
                          ).then(res => {
                             let apAmt =0;
                             let APData =[];
                          //   if (res.data.length === 0) {
                          //     alert('No Account Receivable Selected');
                          //     return false;
                          //   } 
                         //    alert(res.data.length);
                            for (let x = 0; x < res.data.length; x++) {   
                              if (res.data[x].debit === null){
                                res.data[x].debit=0;
                              }    
                              if (res.data[x].credit === null){
                                res.data[x].credit=0;
                              }  
                             
                                //  res.data[x].debit = dAmt ;//Math.abs(res.data[x].debit);
                               //  }
                                 if (res.data[x].credit < 0) {
                                  res.data[x].credit = (res.data[x].credit * -1); //Math.abs(res.data[x].credit);
                                 } 
                                 if (res.data[x].debit < 0) {
                                  res.data[x].debit = (res.data[x].debit * -1); //Math.abs(res.data[x].credit);
                                  
                                  } 
                             //     alert(res.data[x].debit+' - '+res.data[x].credit);
                              // totalDebit+=res.data[x].debit;
                              // totalCredit+=res.data[x].credit; 
                              
                                    apAmt+=res.data[x].credit;
                                    
                             } //for   
                                   
                             let newData = {
                              addNo: '',
                              glName: 'Account Payable',
                              totalText: '', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
                              amount: apAmt, // res.data[x].debit-res.data[x].credit,
                              }
                           
                                APData.push(newData); 
                                setAccountPayableData(APData);
                                totalApAmt=apAmt;
                                setTotalAccountPayable(apAmt);  //  setOtherAssetData(ARData);
                            // } // if 
                              })  

                              Axios
                              .get(url + `/longTermLiability`,
                                {
                                  params: {
                                  companyID: companyID, 
                                  startDate: format(sDate,"yyyy-MM-dd"),
                                  endDate: format(eDate, "yyyy-MM-dd"),
                                  }
                                }
                              ).then(res => {
                                 let llAmt =0;
                                 let LLData =[];
                              //   if (res.data.length === 0) {
                              //     alert('No Account Receivable Selected');
                              //     return false;
                              //   } 
                             //    alert(res.data.length);
                                for (let x = 0; x < res.data.length; x++) {   
                                  if (res.data[x].debit === null){
                                    res.data[x].debit=0;
                                  }    
                                  if (res.data[x].credit === null){
                                    res.data[x].credit=0;
                                  }  
                                 
                                    //  res.data[x].debit = dAmt ;//Math.abs(res.data[x].debit);
                                   //  }
                                     if (res.data[x].credit < 0) {
                                      res.data[x].credit = (res.data[x].credit * -1); //Math.abs(res.data[x].credit);
                                     } 
                                     if (res.data[x].debit < 0) {
                                      res.data[x].debit = (res.data[x].debit * -1); //Math.abs(res.data[x].credit);
                                      
                                      } 
                                 //     alert(res.data[x].debit+' - '+res.data[x].credit);
                                  // totalDebit+=res.data[x].debit;
                                  // totalCredit+=res.data[x].credit; 
                                  
                                        llAmt+=res.data[x].debit-res.data[x].credit;
                                        
                                 } //for   
                                  if (llAmt < 0) {
                                    llAmt=llAmt*-1;
                                  }     
                                 let newData = {
                                  addNo: '',
                                  glName: 'Long Term Liability',
                                  totalText: '', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
                                  amount: llAmt, // res.data[x].debit-res.data[x].credit,
                                  }
                               
                                    LLData.push(newData); 
                                    setLongTermLiabilityData(LLData);
                                    totalLongTermLiability=llAmt;
                                   // setTotalLongTermLiability(llAmt);  //  setOtherAssetData(ARData);
                                // } // if 
                                  })  
                                  
                                  Axios
                                  .get(url + `/ownerEquity`,
                                    {
                                      params: {
                                      companyID: companyID, 
                                      startDate: format(sDate,"yyyy-MM-dd"),
                                      endDate: format(eDate, "yyyy-MM-dd"),
                                      }
                                    }
                                  ).then(res => {
                                     let oeAmt =0;
                                     let OEData =[];
                                  //   if (res.data.length === 0) {
                                  //     alert('No Account Receivable Selected');
                                  //     return false;
                                  //   } 
                                 //    alert(res.data.length);
                                    for (let x = 0; x < res.data.length; x++) {   
                                      if (res.data[x].debit === null){
                                        res.data[x].debit=0;
                                      }    
                                      if (res.data[x].credit === null){
                                        res.data[x].credit=0;
                                      }  
                                     
                                        //  res.data[x].debit = dAmt ;//Math.abs(res.data[x].debit);
                                       //  }
                                         if (res.data[x].credit < 0) {
                                          res.data[x].credit = (res.data[x].credit * -1); //Math.abs(res.data[x].credit);
                                         } 
                                         if (res.data[x].debit < 0) {
                                          res.data[x].debit = (res.data[x].debit * -1); //Math.abs(res.data[x].credit);
                                          
                                          } 
                                     //     alert(res.data[x].debit+' - '+res.data[x].credit);
                                      // totalDebit+=res.data[x].debit;
                                      // totalCredit+=res.data[x].credit; 
                                      
                                            oeAmt+=res.data[x].debit-res.data[x].credit;
                                            
                                     } //for   
                                      if (oeAmt < 0) {
                                        oeAmt=oeAmt*-1;
                                      }     
                                     let newData = {
                                      addNo: '',
                                      glName: 'Owner Equities / Capital Account',
                                      totalText: '', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
                                      amount: oeAmt, // res.data[x].debit-res.data[x].credit,
                                      }
                                   
                                        OEData.push(newData); 
                                        setOwnerEquityData(OEData);
                                        totalOwnerEquity=oeAmt;
                                       // setTotalLongTermLiability(llAmt);  //  setOtherAssetData(ARData);
                                    // } // if 
                                      })                                    
                                const etDate = new Date(endDate);
                                const year = etDate.getFullYear(); 
                                
                                  Axios
                                  .get(url + `/loadIncomeSummary`,
                                    {
                                      params: {
                                      companyID: companyID, 
                                      year: year,
                                      }
                                    }
                                  ).then(res => {
                                    if (res.data.length > 0) { 
                                  //    if (res.data[0].afterTax < 0) {
                                  //      res.data[0].afterTax=(res.data[0].afterTax*-1);                                
                                  //   }   
                                        
                                     let incAmt =0;
                                     let INCData = [];
                                     let newData = {
                                      addNo: '',
                                      glName: 'Retain Earning for the year',
                                      totalText: '', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
                                      amount: res.data[0].afterTax, // res.data[x].debit-res.data[x].credit,
                                      }
                                              
                                        INCData.push(newData); 
                                      

                                    
                                      //  if (res.data[0].afterTax < 0) {
                                      //     res.data[0].afterTax=(res.data[0].afterTax*-1);
                                    
                                   //     }   
                               
                                        setIncomeSummaryData(INCData);
                                        totalIncomeSummary=res.data[0].afterTax;
                                       // totalOwnerEquity+=totalIncomeSummary;
                                       // setTotalLongTermLiability(llAmt);  //  setOtherAssetData(ARData);
                                       } // if 
                                      })   
                          


 }

 const formatInputStartDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
   //  alert(e.target.value);
    setStartDate(dDate);
  //  setData([]);
    // setTxnDate(dDate);
    //    alert(txnDate);
    // onSearchVoucher(setTxnDate(dDate));
  //  inputRef.current.focus();
  };
  const formatInputeDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setEndDate(dDate);
  //  setData([]);
    // setTxnDate(dDate);
    //    alert(txnDate);
    // onSearchVoucher(setTxnDate(dDate));
  //  inputRef.current.focus();
  };
  const formatInputsDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setStartDate(dDate);
    //   alert(dDate);
    // setTxnDate(dDate);
    //    alert(txnDate);
    // onSearchVoucher(setTxnDate(dDate));
   // inputRef.current.focus();
  };
  const formatInputEndDate = async (e) => {
    e.preventDefault();
    //const cName = e.target.name;
    let dDate = e.target.value;
    // alert(e.target.value);
    setEndDate(dDate);
  
  };
  const onSave = async () => {
    let lastDate = new Date(endDate) ;
    let nYear= lastDate.getFullYear();
   // alert(nYear);
   // alert(todayDate);
   BSData=[];
   let newData1 = {
    companyID: companyID,
     year: nYear,
     startDate: startDate,
     endDate: endDate,
    PNLType: 'FAS',
    addNo: '',
    glName: 'FIXED ASSETS :',
    totalText: 'RM', 
    amount: 0.00,
    date_close: todayDate,
  }
    BSData.push(newData1);  
   // alert(PNLData.length);
   // alert(PNLData[0].totalText);
    for (let i = 0; i < fixedAssetData.length; i++) { 
      let newData = {
        companyID: companyID,
         year: nYear,
         startDate: startDate,
         endDate: endDate,
        PNLType: 'FAS',
        addNo: fixedAssetData[i].addNo,
        glName: fixedAssetData[i].glName,
        totalText: fixedAssetData[i].totalText, // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
        amount: fixedAssetData[i].amount, // res.data[x].debit-res.data[x].credit,
        date_close: todayDate,
      }
        BSData.push(newData);  
      
    }
    let newDataR1 = {
      companyID: companyID,
       year: '',
       startDate: startDate,
       endDate: endDate,
      PNLType: 'FAS',
      addNo: '',
      glName: '',
      totalText: 'TOTAL FIXED ASSETS :', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
      amount: totalFixedAsset, // res.data[x].debit-res.data[x].credit,
     date_close: '', 
    }
      BSData.push(newDataR1);  
   //   alert(PNLData.length);
   let newData2 = {
    companyID: companyID,
     year: nYear,
     startDate: startDate,
     endDate: endDate,
    PNLType: 'CAS',
    addNo: '',
    glName: 'CURRENT ASSETS :',
    totalText: 'RM', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
    amount: 0.00, // res.data[x].debit-res.data[x].credit,
    date_close: todayDate,
  }
    BSData.push(newData2);  
   for (let i = 0; i < currentAssetData.length; i++) { 
    let newDataCAS = {
      companyID: companyID,
       year: nYear,
       startDate: startDate,
       endDate: endDate,
      PNLType: 'CAS',
      addNo: currentAssetData[i].addNo,
      glName: currentAssetData[i].glName,
      totalText: currentAssetData[i].totalText, // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
      amount: currentAssetData[i].amount, // res.data[x].debit-res.data[x].credit,
      date_close: todayDate,
    }
      BSData.push(newDataCAS);  
    
  }
  const newDatas = {
    companyID: companyID,
     year: '',
     startDate: startDate,
     endDate: endDate,
    PNLType: 'CAS',
    addNo: '',
    glName: '',
    totalText: 'TOTAL CURRENT ASSETS :', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
    amount: (totalCurrentAsset), // res.data[x].debit-res.data[x].credit,
   date_close: '', 
  }
    BSData.push(newDatas);
  // Account Receivable Data

    const newDatap = {
      companyID: companyID,
       year: '',
       startDate: startDate,
       endDate: endDate,
      PNLType: 'CAS',
      addNo: '',
      glName: '',
      totalText: 'Account Receivable :', 
      amount: totalArAmt, 
     date_close: '', 
    }
    // 
      BSData.push(newDatap); 
      
      let newData3 = {
        companyID: companyID,
         year: nYear,
         startDate: startDate,
         endDate: endDate,
        PNLType: 'CAS',
        addNo: '',
        glName: 'Inventory Closing Balance',
        totalText: 'RM', 
        amount: 0.00, 
        date_close: todayDate,
      }
        BSData.push(newData3);  
      for (let i = 0; i < stockData.length; i++) { 
        let newDataExp = {
          companyID: companyID,
           year: nYear,
           startDate: startDate,
           endDate: endDate,
          PNLType: 'CAS',
          addNo: stockData[i].addNo,
          glName: stockData[i].glName,
          totalText: stockData[i].totalText, // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
          amount: stockData[i].amount, // res.data[x].debit-res.data[x].credit,
          date_close: todayDate,
        }
          BSData.push(newDataExp);  
        
      }
    
      let newDataExp3 = {
        companyID: companyID,
         year: '',
         startDate: startDate,
         endDate: endDate,
        PNLType: 'INT',
        addNo: '',
        glName: '',
        totalText: 'INTANGIBLE ASSETS', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
        amount: intTotal, // res.data[x].debit-res.data[x].credit,
       date_close: '', 
      }
        BSData.push(newDataExp3);  
      
      let newDataOAS = {
        companyID: companyID,
         year: '',
         startDate: startDate,
         endDate: endDate,
        PNLType: 'OAS',
        addNo: '',
        glName: '',
        totalText: 'OTHER ASSETS', 
        amount: otherTotal, 
       date_close: '', 
      }
        BSData.push(newDataOAS);
       
        let newDataTAS = {
          companyID: companyID,
           year: '',
           startDate: startDate,
           endDate: endDate,
          PNLType: 'OAS',
          addNo: '',
          glName: '',
          totalText: 'TOTAL ASSETS :',
          amount: (totalFixedAsset+totalCurrentAsset+totalArAmt+closeStockTotal+intTotal+otherTotal), 
         date_close: '', 
        }
          BSData.push(newDataTAS);
          
          let newDataCUL = {
            companyID: companyID,
             year: '',
             startDate: startDate,
             endDate: endDate,
            PNLType: 'CUL',
            addNo: '',
            glName: '',
            totalText: 'CURRENT LIABILITIES', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
            amount: 0.00, // res.data[x].debit-res.data[x].credit,
           date_close: '', 
          }
            BSData.push(newDataCUL);

 for (let i = 0; i < currentLiabilityData.length; i++) { 
        let newDataCULP = {
          companyID: companyID,
           year: nYear,
           startDate: startDate,
           endDate: endDate,
          PNLType: 'CUL',
          addNo: currentLiabilityData[i].addNo,
          glName: currentLiabilityData[i].glName,
          totalText: currentLiabilityData[i].totalText, // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
          amount: currentLiabilityData[i].amount, // res.data[x].debit-res.data[x].credit,
          date_close: todayDate,
        }
          BSData.push(newDataCULP);  
      }; 
      
      const newDatap1 = {
        companyID: companyID,
         year: '',
         startDate: startDate,
         endDate: endDate,
        PNLType: 'CUL',
        addNo: '',
        glName: '',
        totalText: 'Account Payable', 
        amount: totalApAmt, 
       date_close: '', 
      }
      // 
        BSData.push(newDatap1);    





          let newDataLTL = {
            companyID: companyID,
             year: '',
             startDate: startDate,
             endDate: endDate,
            PNLType: 'LTL',
            addNo: '',
            glName: '',
            totalText: 'LONG TERM LIABILITIES', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
            amount: 0.00, // res.data[x].debit-res.data[x].credit,
           date_close: '', 
          }
            BSData.push(newDataLTL);

 for (let i = 0; i < longTermLiabilityData.length; i++) { 
        let newDataLTLP = {
          companyID: companyID,
           year: nYear,
           startDate: startDate,
           endDate: endDate,
          PNLType: 'LTL',
          addNo: longTermLiabilityData[i].addNo,
          glName: longTermLiabilityData[i].glName,
          totalText: longTermLiabilityData[i].totalText, // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
          amount: longTermLiabilityData[i].amount, // res.data[x].debit-res.data[x].credit,
          date_close: todayDate,
        }
          BSData.push(newDataLTLP);  
      };      

 
 //     const [ownerEquityData, setOwnerEquityData] = useState([]);

 let newDataOEQ = {
  companyID: companyID,
   year: '',
   startDate: startDate,
   endDate: endDate,
  PNLType: 'OEQ',
  addNo: '',
  glName: '',
  totalText: 'OWNER EQUITIES', // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
  amount: 0.00, // res.data[x].debit-res.data[x].credit,
 date_close: '', 
}
  BSData.push(newDataOEQ);

for (let i = 0; i < ownerEquityData.length; i++) { 
let newDataOEQP = {
companyID: companyID,
 year: nYear,
 startDate: startDate,
 endDate: endDate,
PNLType: 'OEQ',
addNo: ownerEquityData[i].addNo,
glName: ownerEquityData[i].glName,
totalText: ownerEquityData[i].totalText, // res.data[x].glType+' - '+res.data[x].glNo+' - '+res.data[x].glSub,
amount: ownerEquityData[i].amount, // res.data[x].debit-res.data[x].credit,
date_close: todayDate,
}
BSData.push(newDataOEQP);  
}; 

const newDatOEQ1 = {
  companyID: companyID,
   year: '',
   startDate: startDate,
   endDate: endDate,
  PNLType: 'OEQ',
  addNo: '',
  glName: '',
  totalText: 'Retained Earning for the year', 
  amount: totalIncomeSummary, 
 date_close: '', 
}
// 
  BSData.push(newDatOEQ1);    

  const newDatOEQ2 = {
    companyID: companyID,
     year: '',
     startDate: startDate,
     endDate: endDate,
    PNLType: 'OEQ',
    addNo: '',
    glName: '',
    totalText: 'TOTAL OWNER EQUITIES :', 
    amount: (totalOwnerEquity+totalIncomeSummary), 
   date_close: '', 
  }
  // 
    BSData.push(newDatOEQ2);    


    const newDatOEQ3 = {
      companyID: companyID,
       year: '',
       startDate: startDate,
       endDate: endDate,
      PNLType: 'OEQ',
      addNo: '',
      glName: '',
      totalText: 'TOTAL LIABILITIES AND OWNER EQUITIES :', 
      amount: (totalCurrentLiability+totalAccountPayable+totalLongTermLiability+totalOwnerEquity+totalIncomeSummary), 
     date_close: '', 
    }
    // 
      BSData.push(newDatOEQ3);    

          //  alert(BSData.length);
          const eDate = new Date(endDate);
          const year = eDate.getFullYear(); 
          const user = {  companyID: companyID, year: year};  
             
       
            Axios
            .post(url + '/balanceSheetDelete', user  )
            .then(res => {
            }, []);
  
        Axios
        .post(url + '/balanceSheetUpdate', BSData
        ).then(res => {
          if (res.data === 'Success') {
       
          };
          //  alert(text);
        }, []);
    
    
    };   

   const onClear = async () => {
    closeStockTotal =0 ;
    totalLongTermLiability = 0;
    totalOwnerEquity = 0;
     totalIncomeSummary=0;
     totalDebit=0;
     totalCredit=0;
      setFixedAssetData([]);
      setCurrentAssetData([]);
     setARReceivableData([]);
     setAccountPayableData([]);
     setIntangibleAssetData([]);
     setOtherAssetData([]);
     setCurrentLiabilityData([]);
     setLongTermLiabilityData([]);
     setEquityData([]);
     setOwnerEquityData([]);
     setIncomeSummaryData([]);
     setTotalFixedAsset(0.00);
     setTotalCurrentAsset(0.00);
     setStockData([]) ;
     setTotalCurrentLiability(0.00);
     setTotalAccountPayable(0.00);
        
    
  };  
  const onHome = async () => {
        window.location='home';
   
   };
  const onPrint = async () => {
   //  alert('totalRev: '+totalRev+' - totalCostOfSales: '+totalCostOfSales+' - totalExpenses: '+totalExpenses+' - profit: '+profit+' - taxOnYear: '+taxOnYear);
  //  alert(intangibleAssetData[0].glName);
 
 
   if(totalFixedAsset === 0) {
      alert('Fixed Asset section is blank for printing');
      return false; 
      }
       if(totalCurrentAsset === 0) {
       alert('Current Asset section is blank for printing');
      return false;
      }  
    
    //   if(ARReceivableData.length === 0) {
    //  alert('Account Receivable section is blank for printing');
    //  return false;
    // }
    // if(accountPayableData.length === 0) {
    //  alert('Account Payable section is blank for printing');
    //  return false;
    // }  
     if(totalCurrentLiability === 0) {
      alert('Current Liability section is blank for printing');
      return false;
     }    
  //   if(ownerEquityData.length === 0) {
  //    alert('Owner Equities  section is blank for printing');
  //    return false;
  //   }

     Axios
     .get(url + `/companyInfo`,
       {
         params: {
           companyID: companyID,

         }
       }
     ).then(res => {
         companyData=res.data;  
     //  setCompanyInfo(res.data);
    //  alert(companyData.length);
     
    //  alert(companyData.length);
     reportType='PNL';
   let sDate = new Date (startDate);
   let eDate = new Date(endDate);
  //alert(eDate);
     BSPDF(companyData, fixedAssetData, currentAssetData, ARReceivableData,stockData,
      accountPayableData, intangibleAssetData, otherAssetData, currentLiabilityData,
       longTermLiabilityData, equityData, ownerEquityData, incomeSummaryData,
       totalFixedAsset, totalCurrentAsset, totalArAmt, closeStockTotal,intTotal,otherTotal, 
       totalCurrentLiability,totalAccountPayable,totalLongTermLiability,totalOwnerEquity,
       totalIncomeSummary, format(sDate, 'dd/MM/yyyy'), format(eDate, 'dd/MM/yyyy'))
  
     });

  };

  useEffect(() => {
//alert('here');
  });   


 return (


    
        
      

   
<div>
      <div className="row">
      
        <div className="col-sm-12" style={{ marginTop: '1px', backgroundColor: '#c1f8ae', color: 'black' }}>
          <h2>Balance Sheet</h2>
        </div>
      </div>
 
      <div style={{
  display: 'inline-block',
  width: '1520px',
  height: '50px',
  margin: '6px',
  backgroundColor: 'white',
  border: '4px solid grey',
}}>
<label style={{ paddingLeft: "100px", marginTop: '.4rem'}}>
<a style={{  marginRight: '.8rem' }} >Balance Sheet From Date : </a>
    <input
      type="date"
      maxLength={10}
      value={startDate}
      style={{ width: '10%', border: '1px solid #696969' }}
    //  defaultValue = {sDate}
      onChange={(e) => formatInputsDate(e)}   
      onBlur={(e) => formatInputStartDate(e) }
      name="startDate"
      required
      disabled={false}
 
    />


    <a style={{ marginLeft: '1rem', marginRight: '.8rem' }} >To Date : </a>
            <input
              type="date"
              maxLength={10}
              value={endDate}
        //      defaultValue={eDate}
              style={{ marginRight: '2rem', width: '10%', border: '1px solid #696969' }}
              name="endDate"
             onChange={(e) => formatInputeDate(e)}
              onBlur={(e) => formatInputEndDate(e) }
              required
              disabled={false}
   
            />

     


<button
        style={{ padding: '4px', marginLeft: '2rem' }}
        type='button'
        class='btn btn-info fa fa-download float-right'
        onClick={() => onSearchBalanceSheet()}
    
      >Load Balance Sheet Report</button>


<button
        style={{ padding: '1px', marginLeft: '2rem' }}
        type='button'
        class='btn btn-danger float-right'
        onClick={() => onClear()}
 
      >Clear</button>

<button
        style={{ padding: '4px', marginLeft: '2rem' }}
        type='button'
        class='btn btn-warning fa fa-print float-right'
        onClick={() => onPrint()}
     
      >Print</button>

<button
        style={{ padding: '1px', marginLeft: '2rem' }}
        type='button'
        class='btn btn-success'
        onClick={() => onHome()}
 
      >Home</button>

<button

            style={{ backgroundColor: '#5b5959', color: 'white', height: '28px',width: '200px', marginLeft: '1rem', paddingTop: '1px'}}
            type='button'
            class='btn btn-Default'
            onClick={() => onSave()}
 
          >Save Yearly Report</button>


</label>

</div> 

<div className="row" style={{margin: '20px'}}>
      
      <div className="col-sm-12" style={{ marginTop: '1px', color: 'black' }}>
      
     
      </div>
    </div> 
       
      <span class="square border border-dark"></span>
      <table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>
             <thead class="thead-dark" >
               <tr style={{ align: 'left' }}>          
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '70px', textAlign: 'center' }}></th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '900px', textAlign: 'center' }}>FIXED ASSETS</th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}></th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}>RM</th>
             
                  </tr>
             </thead>
             <tbody style={{align:'left'}} >
               {fixedAssetData.map(item => {
                 return <tr key={item.id}>
   
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              
           
                 </tr>
   
               })}
               <td></td>
               <td></td>
               <td></td>
               <td></td>
               </tbody>
             <tfoot>
              
   
               <td></td><td></td> 
               <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#eae4e4" }}>TOTAL FIXED ASSETS :</td>           
               <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(totalFixedAsset).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
        
               <td></td>
               <td></td>
               <td></td>
             </tfoot>
           </table>

 
   

<table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>
             <thead class="thead-dark" >
               <tr style={{ align: 'left' }}>          
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '70px', textAlign: 'center' }}></th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '900px', textAlign: 'center' }}>CUREENT ASSETS</th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}></th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}>RM</th>
             
                  </tr>
             </thead>
             <tbody style={{align:'left'}} >
               {currentAssetData.map(item => {
                 return <tr key={item.id}>
   
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              
           
                 </tr>
   
               })}
    
        
               </tbody>

               <tfoot>
              <td></td><td></td>
              <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#0df18e" }}>TOTAL ASSETS :</td>           
               <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#0df18e" , color: "red" }}>{parseFloat(totalFixedAsset+totalCurrentAsset+totalArAmt+closeStockTotal+intTotal+otherTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              </tfoot>







            
             <tbody style={{align:'left'}} >
               {ARReceivableData.map(item =>{ 
                 return <tr key={item.id}>
   
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              
           
                 </tr>
   
               })}
             </tbody>
          
                 <tbody style={{align:'left'}} >
                   {stockData.map(item => {
                     return <tr key={item.id}>
       
                       <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                       <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                       <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                       <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                  
               
                     </tr>
       
                   })}


               </tbody>
              

               <tfoot>
              <td></td><td></td>
          
               <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#eae4e4" }}>TOTAL CURRENT ASSETS :</td>           
               <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(totalCurrentAsset+totalArAmt+closeStockTotal).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
          
               <td></td>
               <td></td>
               <td></td>
              </tfoot>     




               <thead class="thead-dark" >
               <tr style={{ align: 'left' }}>          
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '70px', textAlign: 'center' }}></th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '900px', textAlign: 'center' }}>{intGlName}</th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}></th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}>{intTotalText}</th>
             
                  </tr>
             </thead>
             <tbody style={{align:'left'}} >
               {intangibleAssetData.map(item => {
                 return <tr key={item.id}>
   
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              
           
                 </tr>
   
               })}

               </tbody>

               <thead class="thead-dark" >
               <tr style={{ align: 'left' }}>          
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '70px', textAlign: 'center' }}></th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '900px', textAlign: 'center' }}>{otherGlName}</th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}></th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}>{otherTotalText}</th>
             
                  </tr>
             </thead>
             <tbody style={{align:'left'}} >
               {otherAssetData.map(item => {
                 return <tr key={item.id}>
   
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              
           
                 </tr>
   
               })}

               </tbody>


            
            
      

           </table>
    <p></p>      
       
    <span class="square border border-dark"></span>
      <table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>
             <thead class="thead-dark" >
               <tr style={{ align: 'left' }}>          
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '70px', textAlign: 'center' }}></th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '900px', textAlign: 'center' }}>CURRENT LIABILITIES</th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}></th>
                 <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}>RM</th>
             
                  </tr>
             </thead>
             <tbody style={{align:'left'}} >
               {currentLiabilityData.map(item => {
                 return <tr key={item.id}>
   
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              
           
                 </tr>
   
               })}
          
               </tbody>
               <tbody style={{align:'left'}} >
               {accountPayableData.map(item =>{ 
                 return <tr key={item.id}>
   
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                   <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                   <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
              
           
                 </tr>
   
               })}
             </tbody>



             <tfoot>
              
   
               <td></td><td></td> 
               <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#eae4e4" }}>TOTAL CURRENT LIABILITIES :</td>           
               <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(totalCurrentLiability+totalAccountPayable).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
        
               <td></td>ˆ
               <td></td>
               <td></td>
             </tfoot>
           </table>           

           <p></p>      
       
       <span class="square border border-dark"></span>
         <table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>
                <thead class="thead-dark" >
                  <tr style={{ align: 'left' }}>          
                    <th class="square border border-dark" style={{ backgroundColor: 'white', width: '70px', textAlign: 'center' }}></th>
                    <th class="square border border-dark" style={{ backgroundColor: 'white', width: '900px', textAlign: 'center' }}>LONG TERM LIABILITIES</th>
                    <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}></th>
                    <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}>RM</th>
                
                     </tr>
                </thead>
                <tbody style={{align:'left'}} >
                  {longTermLiabilityData.map(item => {
                    return <tr key={item.id}>
      
                      <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                      <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                      <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                      <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                 
              
                    </tr>
      
                  })}
             
                  </tbody>
            
   
   
   
    
                 <tfoot>
                  <td></td><td></td>              
                  <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#cef979" }}>TOTAL LIABILITIES :</td>           
                  <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#cef979" , color: "red" }}>{parseFloat(totalCurrentLiability+totalAccountPayable+totalLongTermLiability).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  </tfoot>
                  <tfoot>
                 
      
                 <td></td><td></td> 
                 <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#eae4e4" }}>TOTAL LONG TERM LIABILITIES :</td>           
                 <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(totalLongTermLiability).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                </tfoot>             
        
              </table>           

              <span class="square border border-dark"></span>
         <table class="table" style={{ paddingTop: '1px', paddingLeft: '50px', border: '1px solid black' }}>
                <thead class="thead-dark" >
                  <tr style={{ align: 'left' }}>          
                    <th class="square border border-dark" style={{ backgroundColor: 'white', width: '70px', textAlign: 'center' }}></th>
                    <th class="square border border-dark" style={{ backgroundColor: 'white', width: '900px', textAlign: 'center' }}>OWNER EQUITIES</th>
                    <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}></th>
                    <th class="square border border-dark" style={{ backgroundColor: 'white', width: '400px', textAlign: 'center' }}>RM</th>
                
                     </tr>
                </thead>
                <tbody style={{align:'left'}} >
                  {ownerEquityData.map(item => {
                    return <tr key={item.id}>
      
                      <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                      <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                      <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                      <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                 
              
                    </tr>
      
                  })}
             
                  </tbody>

                  <tbody style={{align:'left'}} >
                  {incomeSummaryData.map(item => {
                    return <tr key={item.id}>
      
                      <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.addNo}</td>
                      <td class="square border border-dark" style={{ textAlign: 'left', backgroundColor: '#f5f0f0' }}>{item.glName}</td>
                      <td class="square border border-dark" style={{ textAlign: 'right', backgroundColor: '#f5f0f0' }}>{item.totalText}</td>
                      <td class="square border border-dark" style={{ textAlign: 'right' }}>{parseFloat(item.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                 
              
                    </tr>
      
                  })}
             
                  </tbody>

                  <tfoot>
                  <td></td><td></td>              
                  <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#0df18e" }}>TOTAL LIABILITIES AND OWNER EQUITIES :</td>           
                  <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#0df18e" , color: "red" }}>{parseFloat(totalCurrentLiability+totalAccountPayable+totalLongTermLiability+totalOwnerEquity+totalIncomeSummary).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  </tfoot>
                  <tfoot>
                 
      
                 <td></td><td></td> 
                 <td class="square border border-dark" style={{ textAlign: "center",  backgroundColor: "#eae4e4" }}>TOTAL OWNER EQUITIES :</td>           
                 <td class="square border border-dark" style={{ textAlign: "right",backgroundColor: "#eae4e4" , color: "red" }}>{parseFloat(totalOwnerEquity+totalIncomeSummary).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                </tfoot>             

                </table>

</div>

); // return
}; // function
export default BalanceSheet;
   