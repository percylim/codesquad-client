import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
//import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
//import {CSVLink} from "react-csv";
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import { useHistory } from "react-router-dom";
require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
//var sumDrAmt = 0.00;
//var sumCrAmt = 0.00;
const companyID = localStorage.getItem('companyID');
const voucherNo = sessionStorage.getItem('voucherNo');
console.log(voucherNo);
export class VoucherList extends Component {





  state = {
    voucher: [],
    columns: [

    {
      dataField: 'glNo',
      text: 'G/L No.',
      sort: false,
      headerStyle: { backgroundColor: 'yellow' },
      footer: ''
    },
    {
      dataField: 'glSub',
      text: 'G/L Sub-No.',
      sort: false,
      headerStyle: { backgroundColor: 'yellow' },
      footer: ''
    },
         {
            dataField: 'department',
            text: 'Department',
            sort: false,
            headerStyle: { backgroundColor: 'yellow' },
            footer: ''
         },
          {
            dataField: 'glName',
            text: 'G/L Name',
            sort: false,
            headerStyle: { backgroundColor: 'yellow' },
            footer: ''
          },
          {
            dataField: 'jeParticular',
            text: 'Transaction Particular',
            sort: true,
            headerStyle: { backgroundColor: 'yellow' },
            footer: 'Total :'
          },
          {
            dataField: 'drAmt',
            text: 'Dr. Amount',
            sort: false ,
            headerStyle: { backgroundColor: 'yellow' },
            footer: columnData => columnData.reduce((acc, item) => acc + item, 0)

          },
          {
            dataField: 'crAmt',
            text: 'Cr. Amount',
            sort: false,
            headerStyle: { backgroundColor: 'yellow' },
            footer: columnData => columnData.reduce((acc, item) => acc + item, 0)
          },




        ],


  };






              componentDidMount() {
                     Axios.get(url+`/voucherList`,
                      {
                       params: {
                           companyID: companyID,
                           voucherNo: voucherNo,
                               }
                      }
                    )
                .then(response => {
                  console.log(response.data);

   //               let newData = response.data;
     //             for (let i = 0; i < newData.length; i++) {
       //              newData[i].drAmt = newData[i].drAmt.toFixed(2);
         //            newData[i].crAmt = newData[i].crAmt.toFixed(2);
           //       }

                  this.setState({
                        voucher: response.data
                  });
                });
                 // alert(customer);

              }





        render() {


         // const options = {
         //   page: 2,
         //   sizePerPageList: [ {
         //     text: '5', value: 5
         //   }, {
         //     text: '10', value: 10
         //   }, {
         //     text: 'All', value: this.state.customer.length
         //   } ],
         //   sizePerPage: 5,
         //   pageStartIndex: 0,
         //   paginationSize: 3,
         //   prePage: 'Prev',
         //   nextPage: 'Next',
         //   firstPage: 'First',
         //   lastPage: 'Last',

         // };




         const MyExportCSV = (props) => {
          const handleClick = () => {
            props.onExport();
          };
          return (
            <div>
              <button className="btn btn-info" onClick={ handleClick }>Export To Excel (CSV)</button>
            </div>
          );
        };

        const onPrint= (e) => {
          // alert("ready to Print");
          window.print();
          // if (userLevel > 4) {
          //      alert('you are not allow to create New Employee');
          //      return false;
           //} else {
         //  window.location='/CustomerNew'
          // }
       };

       /*
       const footerData = [
      [
        {
          label: 'Total',
          columnIndex: 0
        },
        {
          label: 'Total value',
          columnIndex: 2,
          align: 'right',
          formatter: (tableData) => {
            let label = 0;
            for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
              label += tableData[i].price;
            }
            return (
              <strong>{ label }</strong>
            );
          }
        }
      ]
    ];
    */







                return (
                  <div className="container">
                  <div class="row" className="hdr">
                  <div class="col-sm-12 btn btn-info" style={{ 'height': "50px"}}>
                  <h4 style={{ 'color': 'black'}}> Jornal Voucher Downloaded </h4>



                  </div>

                    </div>

                  <div  style={{ marginTop: 20 }}>

                 <div>

                 </div>


                  <ToolkitProvider
    keyField="id"
    data={ this.state.voucher }
    columns={ this.state.columns }

    exportCSV>
    {
      props => (



        <div>

          <BootstrapTable keyField='id' data={ this.state.voucher } columns={ this.state.columns } {...props.baseProps} />
          <hr />
          <MyExportCSV { ...props.csvProps } />
        </div>
      )
    }
  </ToolkitProvider>


               <hr />
                  <Button variant="success" onClick={() => onPrint()}>Print Journal Voucher</Button>{' '}
                  <Button variant="success" onClick={event =>  window.location.href='journalVoucher'}>Back</Button>{' '}
                  </div>

                </div>



                )


        }
};

export default VoucherList;
