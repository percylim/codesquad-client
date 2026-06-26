import React from 'react';
import Axios from 'axios';
import EscapeStr from './mysqlConvertChar';
import './UserProfile.css';

const companyID = localStorage.getItem('companyID');
const productID = localStorage.getItem('productID');

class ProductEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Data: [],
      catData: [],
      imgData: [],
      catID: '',
      imageID: '',
      imageUrl: '',
      loadingImages: true,
      imageError: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.formatInput = this.formatInput.bind(this);
    this.handleChangeCat = this.handleChangeCat.bind(this);
    this.handleChangeImg = this.handleChangeImg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageError = this.handleImageError.bind(this);

    // Refs
    this.productIDEl = React.createRef();
    this.skuEl = React.createRef();
    this.barcodeEl = React.createRef();
    this.productNameEl = React.createRef();
    this.descriptionEl = React.createRef();
    this.unitEl = React.createRef();
    this.unitPriceEl = React.createRef();
  }

  componentDidMount() {
    const body = {
      companyID: companyID,
      productID: productID,
    };

    // 加载分类信息
    Axios.post('/api/categoryInfo', body)
      .then(res => {
        console.log('Category response:', res.data);
        this.setState({ catData: res.data || [] });
      })
      .catch(error => {
        console.error('Error loading categories:', error);
        alert("Failed to load categories");
      });

    // 加载图片信息
    Axios.post('/api/imageInfo', body)
      .then(res => {
        console.log('Image response:', res.data);
        const receivedData = Array.isArray(res.data) ? res.data : [];
        
        // 检查图片数据中是否有路径信息
        if (receivedData.length > 0) {
          console.log('First image item:', receivedData[0]);
          console.log('Image item keys:', Object.keys(receivedData[0]));
        }
        
        this.setState({ 
          imgData: receivedData,
          loadingImages: false,
        });
      })
      .catch(error => {
        console.error('Error loading images:', error);
        this.setState({ loadingImages: false });
      });

    // 加载产品数据
    Axios.post('/api/productData', body)
      .then(res => {
        console.log('Product data:', res.data);
        const productData = res.data;
        if (productData && productData.length > 0) {
          const product = productData[0];
          this.productIDEl.current.value = product.productID || '';
          this.skuEl.current.value = product.sku || '';
          this.barcodeEl.current.value = product.barcode || '';
          this.productNameEl.current.value = product.productName || '';
          this.descriptionEl.current.value = product.description || '';
          this.unitEl.current.value = product.unit || '';
          this.unitPriceEl.current.value = product.unitPrice || 0;
          
          // 尝试多种可能的图片路径
          const imageFileName = product.productImage || '';
          let imageUrl = '';
          
          if (imageFileName) {
            // 根据你的服务器结构尝试不同的路径
            // proxy 会代理到 https://centralsoft.com.my
            const possiblePaths = [
              `/uploads/${imageFileName}`,
              `/api/uploads/${imageFileName}`,
              `/public/uploads/${imageFileName}`,
              `/images/${imageFileName}`,
              `/storage/${imageFileName}`,
              `/fetchImage/${imageFileName}`,
              `/api/fetchImage/${imageFileName}`,
            ];
            // 使用第一个路径
            imageUrl = possiblePaths[0];
          }
          
          this.setState({ 
            catID: product.categoryID || '',
            imageID: imageFileName,
            imageUrl: imageUrl,
            imageError: false,
          });
          
          console.log('Product image filename:', imageFileName);
          console.log('Attempting to load image from:', imageUrl);
        }
      })
      .catch(error => {
        console.error('Error loading product:', error);
        alert("Failed to load product data");
      });
  }

  handleChangeCat(e) {
    this.setState({ catID: e.target.value });
  }

  handleChangeImg(e) {
    const imageID = e.target.value;
    const possiblePaths = [
      `/uploads/${imageID}`,
      `/api/uploads/${imageID}`,
      `/public/uploads/${imageID}`,
      `/images/${imageID}`,
      `/storage/${imageID}`,
      `/fetchImage/${imageID}`,
      `/api/fetchImage/${imageID}`,
    ];
    
    console.log('Selected image ID:', imageID);
    console.log('Trying path:', possiblePaths[0]);
    
    this.setState({ 
      imageID: imageID,
      imageUrl: possiblePaths[0], // 使用第一个路径
      imageError: false,
    });
    
    // 测试图片是否存在
    if (imageID) {
      const testUrl = possiblePaths[0];
      fetch(testUrl, { method: 'HEAD' })
        .then(response => {
          console.log(`Image check for ${testUrl}:`, response.status);
          if (!response.ok) {
            this.setState({ imageError: true });
          }
        })
        .catch(err => {
          console.error('Image fetch error:', err);
          this.setState({ imageError: true });
        });
    }
  }

  handleImageError() {
    console.log('Image failed to load:', this.state.imageUrl);
    this.setState({ imageError: true });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      const user = {
        companyID: EscapeStr(companyID),
        productID: EscapeStr(this.productIDEl.current.value.toUpperCase()),
        sku: EscapeStr(this.skuEl.current.value),
        barcode: EscapeStr(this.barcodeEl.current.value),
        productName: EscapeStr(this.productNameEl.current.value),
        description: EscapeStr(this.descriptionEl.current.value),
        unit: EscapeStr(this.unitEl.current.value),
        unitPrice: EscapeStr(this.unitPriceEl.current.value),
        categoryID: this.state.catID,
        productImage: this.state.imageID
      };

      fetch('/api/productUpdate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      .then(response => response.text())
      .then(text => {
        if (text.includes('Success')) {
          alert('Product updated successfully!');
          window.location.href = '/ProductList';
        } else {
          alert('Update failed: ' + text);
        }
      })
      .catch(error => {
        console.error('Update error:', error);
        alert('Error updating product: ' + error.message);
      });
    }
  }

  validate() {
    if (this.productIDEl.current.value === "") {
      alert("Product ID must not be blank");
      return false;
    }
    if (this.productNameEl.current.value === "") {
      alert("Product Name must not be blank");
      return false;
    }
    if (this.state.catID === "") {
      alert("Category not selected");
      return false;
    }
    return true;
  }

  handleInputChange(event) {
    this.setState({ number: event.target.value });
  }

  formatInput() {
    const num = this.state.number;
    if (num) {
      this.setState({ number: parseFloat(num).toFixed(2) });
    }
  }

  onCancel = () => {
    this.productIDEl.current.value = "";
    this.skuEl.current.value = "";
    this.barcodeEl.current.value = "";
    this.productNameEl.current.value = "";
    this.descriptionEl.current.value = "";
    this.unitEl.current.value = "";
    this.unitPriceEl.current.value = 0;
  }

  render() {
    const mystyle = {
      color: "BLACK",
      backgroundColor: "#ffffff",
      padding: "5px 20px 10px 10px",
      alignItems: "left",
      fontFamily: "Arial",
      marginLeft: '750px'
    };

    const buttonStyle = {
      color: "black",
      backgroundColor: "yellow",
      padding: "10px 15px 10px 10px",
      fontFamily: "Arial",
      border: '2px solid black',
      borderRadius: '14px',
      margin: '5px',
      cursor: 'pointer'
    };

    const subStyle = {
      color: "white",
      backgroundColor: "blue",
      padding: "10px 15px 10px 10px",
      fontFamily: "Arial",
      border: '2px solid black',
      borderRadius: '14px',
      margin: '5px',
      cursor: 'pointer'
    };

    const logstyle = {
      color: "white",
      backgroundColor: "red",
      padding: "10px 15px 10px 10px",
      fontFamily: "Arial",
      border: '2px solid black',
      borderRadius: '14px',
      margin: '5px',
      cursor: 'pointer'
    };

    const { imgData, imageID, imageUrl, catData, catID, loadingImages, imageError } = this.state;

    return (
      <form style={mystyle} onSubmit={this.handleSubmit}>
        <fieldset>
          <h1 style={{marginLeft: '-250px'}}>Edit Product Profile</h1>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ paddingRight: '62px' }}>Product ID:
              <input className="text-uppercase" maxLength={30} ref={this.productIDEl} name="productID" readOnly required />
            </label>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ paddingRight: '105px' }}>Product SKU:
              <input type="text" maxLength={30} ref={this.skuEl} name="sku" />
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ paddingRight: '140px' }}>Product Barcode:
              <input type="text" maxLength={30} ref={this.barcodeEl} name="barcode" />
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ paddingRight: '95px' }}>Product Name:
              <input type="text" maxLength={200} ref={this.productNameEl} name="productName" required />
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ paddingRight: '150px' }}>Product Description:
              <input type="text" maxLength={200} ref={this.descriptionEl} name="description" />
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ paddingRight: '72px' }}>Product Unit:
              <input type="text" maxLength={10} ref={this.unitEl} name="unit" required />
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ paddingRight: '200px' }}>Product Selling Price:
              <input type="number" defaultValue='0.00' onChange={this.handleInputChange}
                onBlur={this.formatInput} placeholder='0.00' maxLength={15} ref={this.unitPriceEl} name="unitPrice" />
            </label>
          </div>

          <div className="select-container" style={{ marginBottom: '10px' }}>
            <label style={{ paddingRight: '350px' }}>Product Category:
              <select value={catID} onChange={this.handleChangeCat}>
                <option value="">Select Category</option>
                {catData.map((item, index) => (
                  <option key={index} value={item.categoryID}>
                    {item.categoryID} - {item.categoryName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="select-container" style={{ marginBottom: '10px' }}>
            <label style={{ paddingLeft: '30px' }}>
              <span style={{marginLeft: '0px'}}>Select Image:
              
            <select
              value={imageID}
              onChange={this.handleChangeImg}
              style={{ marginLeft: '5px', width: '500px' }}
            >
              <option value=""> </option>
              {imgData.map((item, index) => (
                <option key={index} value={item.imageID}>
                  {item.imageID}
                </option>
              ))}
              
            </select>
                
              </span>
            </label>
          </div>

          {/* 图片预览 */}
          {imageUrl && (
            <div style={{ marginTop: '20px', marginLeft: '35px' }}>
              <label>Image Preview:</label>
              <div>
                <img 
                  src={imageUrl} 
                  alt="Product" 
                  style={{ 
                    maxWidth: '200px', 
                    maxHeight: '200px', 
                    border: '1px solid #ccc',
                    marginTop: '10px',
                    display: imageError ? 'none' : 'block'
                  }} 
                  onError={this.handleImageError}
                  onLoad={() => {
                    console.log('Image loaded successfully:', imageUrl);
                    this.setState({ imageError: false });
                  }}
                />
                {imageError && (
                  <div style={{ marginTop: '10px' }}>
                    <p style={{ color: 'red' }}>
                      Image not found: {imageID}
                    </p>
                    <p style={{ color: 'gray', fontSize: '12px' }}>
                      Tried URL: {imageUrl}
                    </p>
                    <p style={{ color: 'gray', fontSize: '12px' }}>
                      Server: https://centralsoft.com.my
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {loadingImages && (
            <div style={{ marginLeft: '40px', color: 'gray' }}>
              Loading images...
            </div>
          )}

          {!imageUrl && !loadingImages && (
            <div style={{ marginLeft: '40px', color: 'gray' }}>
              No image selected
            </div>
          )}
        </fieldset>
        
        <p>
          <button type="submit" style={logstyle}>
            <i className="fa fa-save"></i> Update
          </button>
          <button type="button" style={buttonStyle} onClick={this.onCancel}>
            <i className="fa fa-eraser"></i> Clear
          </button>
          <button type="button" style={subStyle} onClick={() => window.location.href = '/ProductList'}>
            <i className="fa fa-backward"></i> Back
          </button>
        </p>
      </form>
    );
  }
}

export default ProductEdit;