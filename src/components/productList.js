import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
require('dotenv').config();//
//const url = 'http://centralsoft.com.my';
 const url = process.env.REACT_APP_SERVER_URL;
//import {CSVLink} from "react-csv";
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import { useHistory } from "react-router-dom";
const companyID = localStorage.getItem('companyID');


export class ProductList extends Component {





  state = {
    product: [],
    columns: [

      {
      dataField: 'productID',
      text: 'Product ID',
      sort: true,
      headerStyle: { backgroundColor: 'yellow' },
      style: { backgroundColor: 'lightgrey'}
    },
    {
      dataField: 'sku',
      text: 'Product SKU',
      sort: true,
      headerStyle: { backgroundColor: 'lightgreen' }
    },
         {
            dataField: 'barcode',
            text: 'Product Barcode',
            sort: false,
            headerStyle: { backgroundColor: 'yellow' },
            style: { backgroundColor: 'lightgrey'}
         },
          {
            dataField: 'productName',
            text: 'Product Name',
            sort: false,
            headerStyle: { backgroundColor: 'lightgreen' }
          },
          {
            dataField: 'description',
            text: 'Product Description',
            sort: false,
            headerStyle: { backgroundColor: 'yellow' },
            style: { backgroundColor: 'lightgrey'}
          },
          {
            dataField: 'unit',
            text: 'Unit Measurement',
            sort: false ,
            headerStyle: { backgroundColor: 'lightgreen' }
          },
          {
            dataField: 'productImage',
            text: 'Product Image',
            sort: false,
            headerStyle: { backgroundColor: 'yellow' },
            style: { backgroundColor: 'lightgrey'}
          },

           {
            dataField: "edit",
            text: "Edit",
            formatter: (cellContent: string, row: IMyColumnDefinition) => {

                    return <button className="btn btn-primary btn-xs" onClick={() => this.editProduct(row.productID)}>Edit</button>

            },
        },

        ],





  };


  editProduct(id){
   // alert(id);
    localStorage.removeItem('productID');
    localStorage.setItem('productID',id);
   //    sessionStorage.setItem('productID',id);
    // alert(employeeNo);
    this.props.history.push("/ProductEdit");

}



              componentDidMount() {
              //  const env = dotenv.config().parsed;
              //  const url=process.env.SERVER_URL;
              //  alert(process.env.SERVER_URL);
             // alert(url);
                     Axios.get(url+'/productList',
                      {
                       params: {
                           companyID: companyID,
                               }
                      }
                    )
                .then(response => {
                  console.log(response.data);
                  this.setState({
                        product: response.data
                  });
                })
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


          const onhandleNew = (e) => {
            // alert(userLevel);
            // if (userLevel > 4) {
            //      alert('you are not allow to create New Employee');
            //      return false;
             //} else {
             window.location='/ProductNew'
            // }
         };


         const pagination = paginationFactory({
          page: 2,
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
          },
          onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
          }
        });

       // const { SearchBar, ClearSearchButton } = Search;







                return (
                  <div className="container">
                  <div class="row" className="hdr">
                  <div class="col-sm-12 btn btn-info" style={{ 'height': "50px"}}>
                  <h4 style={{ 'color': 'black'}}> Product Listing </h4>
                   </div>
                    </div>
                  <div  style={{ marginTop: 20 }}>



                  <ToolkitProvider
    keyField="id"
    data={ this.state.product }
    columns={ this.state.columns }
    pagination={ pagination }
    exportCSV

  >
    {
      props => (
        <div>
        <span class="square border border-dark"></span>
          <BootstrapTable keyField='id' data={ this.state.product } columns={ this.state.columns }  pagination={ pagination } {...props.baseProps} class="table table-bordered border-dark"/>
          <hr />
          <MyExportCSV { ...props.csvProps } />
        </div>
      )
    }
  </ToolkitProvider>


               <hr />
                  <Button variant="success" onClick={() => onhandleNew()}>Add New Product</Button>{' '}
                </div>

                </div>



                )





        }
};

export default ProductList;
