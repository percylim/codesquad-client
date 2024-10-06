import React, {useEffect, useState, useRef} from 'react';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import {CSVLink} from 'react-csv';
import moment from 'moment';
import EscapeStr from './mysqlConvertChar';
import fetch from 'node-fetch';
//import { Tooltip as ReactTooltip } from "react-tooltip";
//require('dotenv').config();
//
 const url = process.env.REACT_APP_SERVER_URL;
 var lastSix = '';
const companyID = localStorage.getItem('companyID');
const selPage = localStorage.getItem('Page');
var curPage = 1;
var curr = new Date();
 //curr.setDate(curr.getDate() + 3);
 var todayDate = curr.toISOString().substr(0,10);
// var todayDate = moment(new Date(date)).format("DD/MM/YYYY");
 var opBalance =0;
 var opBal =0;
//var nPage = 1;
var SelectedProductID='';
var SelectedOpBalance;
var EditedOpBalance=0;
var unit = '';
//var unitPrice = 0
const headers = [
  { label: 'Product ID', key: 'productID'},
  { label: 'sku', key: 'glSub'},
  { label: 'Barcode', key: 'barcode'},
  { label: 'ProductName', key: 'productName'},
  { label: 'Unit', key : 'unit'},
   { label: 'Opening Balance', key: 'opBalance'},
];

function ProductAdjustment() {
  const [data, setData] = useState([]);
  const inputReference = useRef(null);
 // const [curPage, setPage] = useState([]);

  const [adjQty, setAdjQty] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [sku, setSku] = useState('');
  const [particular, setParticular] = useState('');
  const [txnDate, setTxnDate] = useState(todayDate);
  const [description, setDescription] = useState('');
  const [nPage, setPage] = useState({nPage: localStorage.getItem('Page')});

 // const [nPage, setPage] = useState({nPage:2});
 if(localStorage.getItem('Page'))
 curPage = JSON.parse(localStorage.getItem('Page'));
 // alert(curPage);
 if (txnDate === null ) {
  setTxnDate(todayDate);
 }
  const columns = [

    { dataField: 'productID', text: 'Product ID', sort: false , align: 'left',  headerStyle: { backgroundColor: 'cyan', width: '200px', align: 'left' }, style: { backgroundColor: 'lightgrey'}},
    { dataField: 'barcode', text: 'Barcode', sort: false, align: 'left', headerStyle: { backgroundColor: '#BCAAA4', width: '200px' } },
    { dataField: 'productName', text: 'Product Name', sort: false, align: 'left',   headerStyle: { backgroundColor: 'cyan', width: '450px'}, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'description', text: 'Product Description', sort: false, align: 'left',   headerStyle: { backgroundColor: '#BCAAA4', width: '450px'}, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'unit', text: 'Unit', sort: false, align: 'left',   headerStyle: { backgroundColor: 'cyan', width: '60px'}},
    { dataField: 'unitPrice', text: 'Price', sort: false, align: 'right', headerStyle: { backgroundColor: 'yellow', width: '100px'} , style: {backgroundColor: 'lightgrey'} },
    {
      dataField: "Edit",
      text: "Select",
      headerStyle: {width: '60px'},
      attrs: {width: '25px'},
      align: 'left',
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

              return <button className={'fa fa-check-square'} onClick={() => handleClick(row.productID)}></button>

      },
    }

  ];



 // const csvReport = {
 //   data: data,
 //   headers: headers,
 //   filename: 'Gneral-Ledger-Report-at-'+todayDate+'.csv'
 // };

  const history = useHistory();

  const handleClick = (ID) =>{
   //  SelectedProductID=productID;
    //alert(ID);
   for (let i = 0; i < data.length; i++) {
     if (data[i].productID === ID) {
     setProductID(data[i].productID);
     setBarcode(data[i].barcode);
     setSku(data[i].sku);
     setParticular('');
     setAdjQty(0);
     setProductName(data[i].productName);
     setDescription(data[i].description);
     unit = data[i].unit;
     setUnitPrice(data[i].unitPrice);
    }

   }

    inputReference.current.focus();

    };
    const formatInputDate = async(e) => {
      e.preventDefault();
      //const cName = e.target.name;
      let dDate = e.target.value;
     // alert(e.target.value);
       setTxnDate(dDate);
      //   alert(dDate);
      // setTxnDate(dDate);
       //   alert(txnDate);
      // onSearchVoucher(setTxnDate(dDate));
      // inputRef.current.focus();
    };
    const onSave = async () => {
     if (productID === '' && productName === '' ) {
        alert('No Product selected');
        return false
     }
//     if (typeof adjQty === 'string') {
//        setAdjQty(Number(adjQty));
//     }
 //    alert(typeof Number(adjQty));

     if (adjQty === 0 || adjQty === '0.00') {
        alert("Product adjusted quantity cannot be ZERO")
        return false;
       }
      if (particular === '') {
         alert('Adjustment Particular must not blank');
         return false;
      }
      if (txnDate === '' || txnDate === 'undefined') {
        alert("transaction Date cannot be blank");
        return false;
      }
    // alert(txnDate);

  const data= {
        companyID: EscapeStr(companyID),
        productID: EscapeStr(productID),
        productName : EscapeStr(productName),
        sku : sku,
        barcode : barcode,
        unit : unit,
        unitPrice : unitPrice,
        adjQty : adjQty,
        txnDate : txnDate,
        txnParticular : particular,

       };

       Axios
       .post(url + '/productAdjust', data)
       .then(res => {
       // alert(res.data);

         if (res.data === 'success') {

           //alert(res.data);

               window.location.reload(false);
           window.location.href='productAdjustment';

         };
         //  alert(text);
       }, []);










    };


    const handleInputChange =(e) => {
    const num = e.target.value;
        setAdjQty(num)
};

   const formatInput = (e) => {

     e.preventDefault();
     const num = e.target.value;
  // alert(num);
 //   setState({
  //     num= parseFloat(num).toFixed(2)
   //  })
    // alert(opBal);
     setAdjQty(parseFloat(num).toFixed(2));
  };


    useEffect(() => {
      //  const curPage = JSON.parse(localStorage.getItem('Page'));
      //    setPage({nPage: localStorage.getItem('Page')});
      //   setPage({nPage:5});
       //     const curPage = localStorage.getItem('Page');
       //  curPage=5;
    //  nPage=localStorage.getItem('Page');
     //  alert(curPage);
        Axios
            .get(url+`/productList`,
              {
               params: {
                       companyID: companyID,
                      }
              }
            )
            .then(result => {

               let glData=result.data

               for (let i = 0; i < glData.length; i++) {
                   //alert(typeof glData[i].opBalance);
                   if(typeof glData[i].unitPrice !=='number') {
                       glData[i].unitPrice=0.00
                   }



                let price = parseFloat(glData[i].unitPrice).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');



                glData[i].unitPrice=price;


               }




              setData(glData)
             // setPage(curPage)
             // setState(0);
             setPage({nPage: localStorage.getItem('Page')});
              // setTxnDate(todayDate);
            }


    );

     //  alert(nPage.nPage)
    }, []);


const logstyle = {
    color: "white",
    backgroundColor: "red",
    padding: "3px 15px 10px 20px",
    fontFamily: "Arial",
    position: 'absolute',
    right: 150,
    width: '6em',
    height: '3em',

};

  const defaultSorted = [{
    dataField: 'glNo',
    order: 'desc'
  }];

  const pagination = paginationFactory({
    page: curPage,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
      localStorage.setItem('Page', page);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  return (
    <div className="App">
    <div className="row">
    <div className="col-sm-12 btn btn-success" style={{ 'height':"30px"}}>
        Product Adjustment Entry
     </div>
    </div>
    <span class="square border border-dark"></span>

      <BootstrapTable bootstrap4 keyField='id' data={data} columns={columns}
      rowStyle = {{backgroundColor: '#A9A9A9', border: '3px solid grey' }}
      defaultSorted={defaultSorted} pagination={pagination} class="table table-bordered border-dark">
      </BootstrapTable>




      <label style={{paddingLeft:'10px'}}>
      <a style={{ marginRight: '.8rem' }}> Product ID : </a>
      <input type='text' name='productID' value={productID} disabled={true} style={{width: '150px', borderColor: 'gray', borderWidth: 1, borderStyle:'outset'}}/>
      <a style={{ marginRight: '.8rem', marginLeft: '1.5rem' }}> Barcode : </a>
      <input type='text' name='barcode' value={barcode} disabled={true} style={{width: '150px', borderColor: 'gray', borderWidth: 1, borderStyle:'outset'}}/>
      <a style={{ marginRight: '2.7rem', marginLeft: '3.2rem' }}> SKU Code : </a>
      <input type='text' name='sku' value={sku} disabled={true} style={{width: '150px', borderColor: 'gray', borderWidth: 1, borderStyle:'outset'}}/>
      <a style={{ marginRight: '.8rem', marginLeft: '3.4rem' }}> Product Name : </a>
      <input type='text' name='productName' value={productName} disabled={true} style={{width: '450px', borderColor: 'gray', borderWidth: 1, borderStyle:'outset'}}/>
      </label>
      <p></p>
      <label style={{paddingLeft: '10px'}}>
      <a style={{ marginRight: '.6rem' }}> Description : </a>
      <input type='text' name='description' value={description} disabled={true} style={{width: '450px', borderColor: 'gray', borderWidth: 1, borderStyle:'outset'}}/>
   </label>
    <p></p>
   <label style={{paddingLeft:'10px'}}>
   <a style={{marginRight: '.3rem'}}> Txn. Date  : </a>
          <input
            type="date"
            maxLength={10}
            value={txnDate}
            style={{width: '10%'}}
          //  defaultValue = {txnDate}
            name="txnDate"
            onChange={(e) => formatInputDate(e)}
            required
          />

<a style={{ marginRight: '.6rem', marginLeft: '1rem' }}> Txn. Particular : </a>

<input
  type="text"
  value={particular}
  style={{paddingRight: '10px', width:'30rem', borderColor: 'gray', borderWidth: 1, borderStyle:'outset'}}
  name="txnParticular"
  onChange={(e) => setParticular(e.target.value) }
  readonly={false}
  ref={inputReference}

/>


      <a style={{ marginRight: '.6rem', marginLeft: '2.3rem' }}> Adjust Quantity : </a>
      <input type='number' name='adjQty' value={adjQty} style={{paddingRight: '10px', width:'10rem', borderColor: 'gray', borderWidth: 1, borderStyle:'outset'}}
        maxLength={15}  placeHolder='0.00'
        onChange={handleInputChange} onBlur={formatInput}
   
     />

                <button type="button" style={logstyle} onClick={onSave}
                >Update</button>
    </label>

 
    <p></p>
    <p></p>
    <br></br>
    <br></br>
    <br></br>
    </div>


  );
}

export default ProductAdjustment;
