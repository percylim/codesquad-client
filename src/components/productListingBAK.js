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
        style: { backgroundColor: 'lightgrey', textAlign: 'left' }
      },
      {
        dataField: 'sku',
        text: 'Product SKU',
        sort: true,
        headerStyle: { backgroundColor: 'lightgreen', width: '300px' },
        style: { textAlign: 'left' }
      },
      {
        dataField: 'barcode',
        text: 'Product Barcode',
        sort: false,
        headerStyle: { backgroundColor: 'yellow', width: '300px' },
        style: { backgroundColor: 'lightgrey', textAlign: 'left' }
      },
      {
        dataField: 'productName',
        text: 'Product Name',
        sort: false,
        headerStyle: { backgroundColor: 'lightgreen', width: '700px' },
        style: { textAlign: 'left' }
      },
      {
        dataField: 'description',
        text: 'Product Description',
        sort: false,
        headerStyle: { backgroundColor: 'yellow', width: '500px' },
        style: { backgroundColor: 'lightgrey', textAlign: 'left' }
      },
      {
        dataField: 'unit',
        text: 'Unit',
        sort: false,
        headerStyle: { backgroundColor: 'lightgreen', width: '100px' },
        style: { textAlign: 'left' }
      },
      {
        dataField: 'productImage',
        text: 'Product Image',
        sort: false,
        headerStyle: { backgroundColor: 'yellow' },
        style: { backgroundColor: 'lightgrey', textAlign: 'center' },
        formatter: (cell) => {
          // 构建完整的图片 URL
          // 根据你的服务器配置选择正确的路径
          if (cell) {
            // 尝试不同的路径格式
            const imageUrl = `/uploads/${cell}`;
            // 或者
            // const imageUrl = `/api/uploads/${cell}`;
            // const imageUrl = `/fetchImage/${cell}`;
            
            return (
              <img 
                src={imageUrl} 
                alt="product" 
                style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
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
        headerStyle: { backgroundColor: 'blue', color: 'white', width: '100px' },
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
      // 查看第一条数据的 productImage 值
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
      sizePerPage: 10,
      sizePerPageList: [5, 10, 20, 50],
      lastPageText: '>>',
      firstPageText: '<<',
      nextPageText: '>',
      prePageText: '<',
      showTotal: true,
      alwaysShowAllBtns: true,
    });

    return (
      <div className="container-fluid" style={{ padding: 0, margin: 0 }}>
        <div className="row hdr" style={{ margin: "10px", paddingLeft: "5px" }}>
          <div className="col-sm-12 btn btn-info" style={{ height: "50px" }}>
            <h4 style={{ color: 'black' }}> Product Listing </h4>
          </div>
        </div>
        
        <div style={{ marginTop: 20, padding: '10px' }}>
          <Button variant="success" onClick={this.onhandleNew}>
            Add New Product
          </Button>
        </div>
        
        <BootstrapTable 
          keyField='id'
          hover
          data={this.state.product} 
          columns={this.state.columns}
          rowStyle={{ border: '3px solid grey' }}
          pagination={pagination}
          noDataIndication="No products found"
        />
        
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