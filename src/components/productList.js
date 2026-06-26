import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap';
import { CSVLink } from "react-csv";
import { useNavigate } from 'react-router-dom';

const companyID = localStorage.getItem('companyID');

// 创建一个包装器组件来传递 navigate
function withNavigate(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class ProductList extends Component {

  state = {
    product: [],
    columns: [
      {
        dataField: 'productID',
        text: 'Product ID',
        sort: true,
        headerStyle: { backgroundColor: 'yellow' },
        style: { backgroundColor: 'lightgrey', textAlign: 'left' },
        width: '10%'  // ✅ Changed to percentage
      },
      {
        dataField: 'sku',
        text: 'Product SKU',
        sort: true,
        headerStyle: { backgroundColor: 'lightgreen' },
        style: { textAlign: 'left' },
        width: '10%'  // ✅ Changed to percentage
      },
      {
        dataField: 'barcode',
        text: 'Product Barcode',
        sort: false,
        headerStyle: { backgroundColor: 'yellow' },
        style: { backgroundColor: 'lightgrey', textAlign: 'left' },
        width: '12%'  // ✅ Changed to percentage
      },
      {
        dataField: 'productName',
        text: 'Product Name',
        sort: false,
        headerStyle: { backgroundColor: 'lightgreen' },
        style: { textAlign: 'left' },
        width: '18%'  // ✅ Changed to percentage
      },
      {
        dataField: 'description',
        text: 'Product Description',
        sort: false,
        headerStyle: { backgroundColor: 'yellow' },
        style: { backgroundColor: 'lightgrey', textAlign: 'left' },
        width: '20%'  // ✅ Changed to percentage
      },
      {
        dataField: 'unit',
        text: 'Unit',
        sort: false,
        headerStyle: { backgroundColor: 'lightgreen' },
        style: { textAlign: 'left' },
        width: '8%'  // ✅ Changed to percentage
      },
      {
        dataField: 'productImage',
        text: 'Product Image',
        sort: false,
        headerStyle: { backgroundColor: 'yellow' },
        style: { backgroundColor: 'lightgrey', textAlign: 'center' },
        width: '12%',  // ✅ Changed to percentage
        formatter: (cell) => {
          if (cell) {
            const imageUrl = `/uploads/${cell}`;
            return (
              <img 
                src={imageUrl} 
                alt="product" 
                style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-image.png';
                  e.target.alt = 'Image not found';
                }}
              />
            );
          }
          return 'No Image';
        }
      },
      {
        dataField: "edit",
        text: "Edit",
        headerStyle: { backgroundColor: 'blue', color: 'white' },
        width: '8%',  // ✅ Changed to percentage
        formatter: (cellContent, row) => {
          return (
            <button 
              className="btn btn-primary btn-xs fas fa-edit" 
              onClick={() => this.editProduct(row.productID)}
              style={{ cursor: 'pointer', padding: '5px 10px' }}
            >
            </button>
          );
        },
      },
    ],
    headers: [
      { label: 'Product ID', key: 'productID' },
      { label: 'Product SKU', key: 'sku' },
      { label: 'Product Barcode', key: 'barcode' },
      { label: 'Product Name', key: 'productName' },
      { label: 'Product Description', key: 'description' },
      { label: 'Unit Measurement', key: 'unit' },
      { label: 'Product Image', key: 'productImage' },
    ],
  };

  editProduct(id) {
    localStorage.removeItem('productID');
    localStorage.setItem('productID', id);
    this.props.navigate('/ProductEdit');
  }

  componentDidMount() {
    Axios.get('/api/productList', {
      params: {
        companyID: companyID,
      }
    })
    .then(response => {
      console.log('Product data:', response.data);
      if (response.data && response.data.length > 0) {
        console.log('First product image value:', response.data[0].productImage);
      }
      this.setState({
        product: response.data
      });
    })
    .catch(error => {
      console.error('Error loading products:', error);
    });
  }

  onhandleNew = () => {
    window.location = '/ProductNew';
  }

  render() {
    const pagination = paginationFactory({
      page: 1,
      sizePerPage: 5,
      sizePerPageList: [5, 10, 20, 50],
      lastPageText: '>>',
      firstPageText: '<<',
      nextPageText: '>',
      prePageText: '<',
      showTotal: true,
      alwaysShowAllBtns: true,
    });

    return (
      <div className="container-fluid" style={{ padding: '0 15px', margin: 0 }}>
        <div className="row hdr" style={{ margin: "10px", paddingLeft: "5px" }}>
          <div className="col-sm-12 btn btn-info" style={{ height: "50px", width: '100%' }}>
            <h4 style={{ color: 'black' }}> Product Listing </h4>
          </div>
        </div>
        
        <div style={{ marginTop: 20, padding: '10px' }}>
          <Button variant="success" onClick={this.onhandleNew}>
            Add New Product
          </Button>
        </div>
        
        <div className="table-responsive">
          <BootstrapTable 
            keyField='id'
            hover
            data={this.state.product} 
            columns={this.state.columns}
            rowStyle={{ border: '3px solid grey' }}
            pagination={pagination}
            noDataIndication="No products found"
            wrapperClasses="table-responsive"
            bordered={false}
            striped={false}
          />
        </div>
        
        <div style={{ marginTop: 20, padding: '10px' }}>
          <CSVLink 
            className="btn btn-primary" 
            filename="Product.csv" 
            data={this.state.product} 
            headers={this.state.headers}
          >
            Export to CSV
          </CSVLink>
        </div>
        <hr />
      </div>
    );
  }
}

export default withNavigate(ProductList);