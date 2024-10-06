import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap';
import {CSVLink} from "react-csv";
// const url = process.env.REACT_APP_SERVER_URL;
 const url = process.env.REACT_APP_SERVER_URL;

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

 headers: [
     {label: 'Product ID', key: 'productID'},
      {label: 'Product SKU', key: 'sku'},
      {label: 'Product Barcode', key: 'barcode'},
      {label: 'Product Name', key: 'productName'},
      {label: 'Product Description', key: 'description'},
      {label: 'Unit Measurement', key: 'unit'},
      {label: 'Product Image', key: 'productImage'}, 
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

               <hr />
                  <Button variant="success" onClick={() => onhandleNew()}>Add New Product</Button>{' '}
                </div>
     <BootstrapTable keyField='id'
//striped
       hover
       data={ this.state.product } columns={ this.state.columns }
       rowStyle = {{border: '3px solid grey' }}
       pagination={ pagination } />
        


   <CSVLink className="downloadbtn" filename="Product.csv" data={this.state.product} headers={this.state.headers}>
        Export to CSV
      </CSVLink>
  <hr />

                </div>



                )





        }
};

export default ProductList;
