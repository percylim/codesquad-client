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
//require('dotenv').config();
//
 const url = process.env.REACT_APP_SERVER_URL;
 var lastSix = '';
var gldata = [];
const companyID = localStorage.getItem('companyID');
const selPage = localStorage.getItem('Page');
var curPage = 1;
var curr = new Date();
 //curr.setDate(curr.getDate() + 3);
 var date = curr.toISOString().substr(0,10);
 var todayDate = moment(new Date(date)).format("DD/MM/YYYY");
var opBalance =0;
 var opBal =0;
 //var cost=0;
//var nPage = 1;
var SelectedProductID='';
var SelectedOpBalance;
var EditedOpBalance=0;
var editedCost =0 ;

const headers = [
  { label: 'Product ID', key: 'productID'},
  { label: 'sku', key: 'glSub'},
  { label: 'Barcode', key: 'barcode'},
  { label: 'ProductName', key: 'productName'},
  { label: 'Unit', key : 'unit'},
   { label: 'Opening Balance', key: 'opBalance'},
   {label: 'Cost', key: 'cost'},
];

function ProductOpenBalance() {
  const [data, setData] = useState([]);
  const inputReference = useRef(null);
 // const [curPage, setPage] = useState([]);
  const [cost, setCost] = useState({cost: 0});
  const [opBalance, setState] = useState({opbalance:0});
  const [nPage, setPage] = useState({nPage: localStorage.getItem('Page')});
 // const [nPage, setPage] = useState({nPage:2});
 if(localStorage.getItem('Page'))
 curPage = JSON.parse(localStorage.getItem('Page'));
 // alert(curPage);

  const columns = [

    { dataField: 'productID', text: 'ProductID', sort: false , align: 'left',  headerStyle: { backgroundColor: 'cyan', width: '200px', align: 'left' }, style: { backgroundColor: 'lightgrey'}},
    { dataField: 'barcode', text: 'Barcode', sort: false, align: 'left', headerStyle: { backgroundColor: '#BCAAA4', width: '200px' } },
    { dataField: 'productName', text: 'Product Name', sort: false, align: 'left',   headerStyle: { backgroundColor: 'cyan', width: '600px'}, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'unit', text: 'Unit', sort: false, align: 'left',   headerStyle: { backgroundColor: '#BCAAA4', width: '60px'}},
    { dataField: 'opBalance', text: 'Opening Balance', sort: false, align: 'right', headerStyle: { backgroundColor: 'yellow', width: '300px'} , style: {backgroundColor: 'lightgrey'} },
    { dataField: 'cost', text: 'Product Cost', sort: false, align: 'right', headerStyle: { backgroundColor: 'cyan', width: '300px'} , style: {backgroundColor: 'lightgrey'} },
    {
      dataField: "Edit",
      text: "",
      headerStyle: {width: '60px'},
      attrs: {width: '25px'},
      align: 'left',
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

              return <button className="btn btn-primary btn-sm" onClick={() => handleClick(row.productID, row.opBalance, row.cost)}>Edit</button>

      },
    }

  ];



 // const csvReport = {
 //   data: data,
 //   headers: headers,
 //   filename: 'Gneral-Ledger-Report-at-'+todayDate+'.csv'
 // };

  const history = useHistory();

  const handleClick = (productID,OpenBal,productCost) =>{
     SelectedProductID=productID;
     SelectedOpBalance = OpenBal
   //  alert(selectedGlNo+" - "+selectedGlSub);
     EditedOpBalance = Number(opBalance.opBalance);
      setState({opBalance: OpenBal});
    //  alert(productCost);
      setCost({cost: productCost});
    inputReference.current.focus();

    };

    const onhandleUpdate = (e) => {

        if (SelectedProductID === '') {
            alert('No Product Selected');
            return false
        };

        EditedOpBalance = Number(opBalance.opBalance).toFixed(3);
        editedCost=Number(cost.cost).toFixed(2)
      //  alert(SelectedOpBalance+" - "+EditedOpBalance);
        if (isNaN(EditedOpBalance)) {
          alert("No Product Opening Balance edited");
          return false;
        }
     //   if (SelectedOpBalance === EditedOpBalance) {
     //       alert('No Change Make');
     //       return false
     //   };
      //  if (editedCost === 0 || isNaN(editedCost)) {
      //    alert('Product Cost must enter');
      //    return false;
      //  }
   //     alert(EditedOpBalance+" - "+cost.cost);
     const Data= {
        companyID: EscapeStr(companyID),
        productID: EscapeStr(SelectedProductID),
       //  glNo:'19911',
          opBalance: EditedOpBalance,
          cost: editedCost,
       };

       fetch(url+'/ProductOpenBalance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
           },

        body: JSON.stringify( Data )
        // We convert the React state to JSON and send it as the POST body
       // data: JSON.stringify(user,user.ame)
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))




     // alert(curPage);
      localStorage.setItem('Page', curPage);
       window.location='/productOpenBalance';
    };


   const handleInputChange =(event) => {

    setState({
      opBalance: event.target.value

  });
};
const handleInputChangeCost =(event) => {

  setCost({
    cost: event.target.value

});
 //  alert(cost.cost)
};
   const formatInput = e => {

     e.preventDefault();
    const num = e.target.value;
  // alert(num);
 //   setState({
        opBal= parseFloat(num).toFixed(3)
   //  })
    // alert(opBal);
     setState({opBalance: opBal});
  };
  const formatInputCost = e => {

    e.preventDefault();
   const num = e.target.value;
 // alert(num);
//   setState({
      let nCost= parseFloat(num).toFixed(2)
  //  })
   // alert(opBal);
    setCost({cost: nCost});
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
                   if(typeof glData[i].opBalance !=='number') {
                       glData[i].opBalance=0.00
                   }
                   if(typeof glData[i].cost !=='number') {
                    glData[i].cost=0.00
                }


                let opValue = parseFloat(glData[i].opBalance).toFixed(3).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                let costValue = parseFloat(glData[i].cost).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');


                glData[i].opBalance=opValue;
                glData[i].cost=costValue;

               }


//alert(glData.length);

              setData(glData)
             // setPage(curPage)
             // setState(0);
             setPage({nPage: localStorage.getItem('Page')});

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
    right: 300,
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
    <div className="col-sm-12 btn btn-primary" style={{ 'height':"50px"}}>
        Edit Product Opening Balance
     </div>
    </div>
    <span class="square border border-dark"></span>

      <BootstrapTable bootstrap4 keyField='id' data={data} columns={columns}
      rowStyle = {{backgroundColor: '#A9A9A9', border: '3px solid grey' }}
      defaultSorted={defaultSorted} pagination={pagination} class="table table-bordered border-dark">
      </BootstrapTable>





      <h4> Modify Product Opening Balance </h4>


      <form onSubmit={onhandleUpdate}>
      <label style={{ align: "right"}}>
      Opening Balance Quantity :
      <input type='number' name='opBalance' value={opBalance.opBalance} style={{paddingRight: '10px', width:'10em'}}
        maxLength={15} ref={inputReference} placeHolder='0.00'
                onChange={handleInputChange} onBlur={formatInput} />


    </label>
    <label style={{ align: "right"}}>
      Product Cost :
      <input type='number' name='cost' value={cost.cost} style={{paddingRight: '10px', width:'10em'}}
        maxLength={15} placeHolder='0.00'
                onChange={handleInputChangeCost} onBlur={formatInputCost} />

                <button type="submit" style={logstyle}>Update</button>
    </label>
    </form>

    <br></br>
    <br></br>
    <br></br>
    </div>


  );
}

export default ProductOpenBalance;
