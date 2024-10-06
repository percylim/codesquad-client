import  React from 'react';
import Axios from 'axios';
import fileDownload from 'js-file-download';
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min.js";
import EscapeStr from './mysqlConvertChar';
//import Select from 'react-select';
//import moment from 'moment';
//import Axios from "axios";
// Image from "http://localhost:9005/public/uploads/codesquad-barbury.png";
 import  './UserProfile.css';
const fetch = require('node-fetch');
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
var lastSix = '';
var catID = '';
var imgID = '';
//var price = 0;
var imageID = '';
// var displayImg = '';
//var options = [];
// var list = [];
 var Data =[];
 var imgData = [];
 var catData = [];
//var loadImg = '';
 var img = '';
 //var glType = [];
//var alert = require("alert");
// var [data, setData] = useState([]);
const companyID = localStorage.getItem('companyID');
const productID = localStorage.getItem('productID');
// const companyName = localStorage.getItem('companyName')
// var eDate = '';
//  var sDate = '';
//var [loadImg, setImage] = useState('');
//alert(productID);
//const body = {
//  companyID : companyID,
//  productID : productID,
//};
//var productImage = '';
class ProductEdit extends React.Component {

    constructor(props) {

      super(props);


      this.state = {
        input: {},
        errors: {},
        Data: [],
        number: 0,
        state: {},
        name: [],
        product: [],
        catID: '',
        imgData: [],
        imgID: '',
        loadImg: [],
        img: '',
        catData: [],
        imageID: '',


      };



      this.handleInputChange = this.handleInputChange.bind(this);
      this.formatInput = this.formatInput.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    // this.handleChangeType = this.handleChangeType.bind(this);
     // this.handleChangeMarried = this.handleChangeMarried.bind(this);
      this.handleChangeCat = this.handleChangeCat.bind(this);
      this.handleChangeImg = this.handleChangeImg.bind(this);
      this.handleDownload = this.handleDownload.bind(this);

      this.companyIDEl = React.createRef();
      this.productIDEl = React.createRef();
      this.skuEl = React.createRef();
      this.barcodeEl = React.createRef();
      this.productNameEl = React.createRef();
      this.descriptionEl = React.createRef();
      this.unitEl = React.createRef();
      this.unitPriceEl = React.createRef();
      this.categoryIDEl = React.createRef();
      this.imageIDEl = React.createRef();

      this.handleSubmit = this.handleSubmit.bind(this);

    }


  componentDidMount() {
    const companyID = localStorage.getItem('companyID');
    const productID = localStorage.getItem('productID');
   // alert(productID);
    const body = {
      companyID : companyID,
      productID : productID,
    };
    Axios({
        method: 'post',
        url: url+'/categoryInfo',
        data: body
      })
      .then(res => {
        console.log(res);
        catData = res.data;
        this.setState({ catData: res.data });
        if (res.data.length === 0 ) {
          alert('load fail in category Info');
          // window.location="/productEdit";
        }
      //  alert(catData.length);
       // catID = Data[0].categoryID;
        // window.alert(data[1].description);
      })
      .catch(function (error) {
        alert("server connection Fail in Product Category");
        });

      Axios({
        method: 'post',
        url: url+'/imageInfo',
        data: body
      })
      .then(res => {
        console.log(res);
        imgData = res.data;
     //   let img = 'http://localhost:9005/fetchImage/'+imgData[0].imageID;
     //   imgID = imgData[0].imageID;
        this.setState({ imgData: res.data });
        // window.alert(data[1].description);
      }).catch(function (error) {
  alert("server connection Fail on Product Image Info");

  });


     // load product record for edit

     Axios({
        method: 'post',
        url: url+'/productData',
        data: body
      })
      .then(res => {
        console.log(res);
        Data = res.data;
     //   alert(customerData[0].supplierID);
        this.productIDEl.current.value = Data[0].productID;
        this.skuEl.current.value = Data[0].sku;
        this.barcodeEl.current.value = Data[0].barcode;
        this.productNameEl.current.value = Data[0].productName;
        this.descriptionEl.current.value = Data[0].description;
        this.unitEl.current.value = Data[0].unit;
        this.unitPriceEl.current.value = Data[0].unitPrice;
       // this.categoryIDEl.current.value = Data[0].categoryID;
        // this.imageIDEl.current.value = Data[0].productImage;
        catID = Data[0].categoryID;
       this.setState({ catID: Data[0].categoryID });
       //alert(catID);
       imageID=Data[0].productImage;
        this.setState({ imageID: Data[0].productImage });
        let img = url+'/fetchImage/'+Data[0].productImage;
        this.setState({ imgID: img });
      //  imgID=Data[0].productImage;
       //  price=Data[0].unitPrice.toFixed(2);
        // alert(Data[0].productImage);

      }).catch(function (error) {
        alert("server connection Fail on Product Data Info");

        });

  };


     //  const {img} = this.state;







  handleDownload = (url, filename) => {
    alert(url);
    alert(filename);
    Axios.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }


// options = data[0];

 // alert(options);
 handleChangeCat(e) {

      this.setState({ catID: e.target.value });
      catID = e.target.value;
      //alert(this.state.categoryID);
    }

   handleChangeImg(e) {


      imgID = e.target.value;
      imageID = e.target.value;
     // this.setState({ productImage: e.target.value });
    // setImage('http://localhost:9005/fetchImage/'+imgID);
     // alert(this.loadImg);
      //alert(imgID);
      this.setState({ imageID: imgID });
      let img = url+'/fetchImage/'+imgID;
      this.setState({ imgID: img })
      // alert(img);;
     // console.info(this.state.productImage);
    // <img src="http://localhost:9005/fetchImage/codesquad-barbury.png" alt="testing display" />
    /*
     const url = `http://localhost:9005/fetchImage/${imgID}`;


     fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log( JSON.parse(data) )
      this.setState({     productImage: JSON.parse(data.response[0].files) })
      alert(this.state.productImage);
    });
    */

     /*
     Axios.get(url, {responseType: 'blod'})
     .then(res => {
       this.setState({loadImg: res.data});
      alert(this.state.loadImg);

      return(
        <div>
        <img alt="scan" src='http://localhost:9005/fetchImage/{this.lstate.oadImg}' />>

        </div>
      )

    });
  */


  };










    handleSubmit(e) {
     // alert("#0");
      e.preventDefault();

      if(this.validate()){
        console.log(this.state);
       // alert(this.sexEl.current.value);

        const user= {
          companyID: EscapeStr(companyID),
          productID:EscapeStr(this.productIDEl.current.value.toUpperCase()),
          sku: EscapeStr(this.skuEl.current.value),
          barcode: EscapeStr(this.barcodeEl.current.value),
          productName: EscapeStr(this.productNameEl.current.value),
          description: EscapeStr(this.descriptionEl.current.value),
          unit: EscapeStr(this.unitEl.current.value),
          unitPrice: EscapeStr(this.unitPriceEl.current.value),
          categoryID: catID,
          productImage: imageID

         };
         //var name1 =  EscapeStr(user.companyName);
       // alert(imageID);
        fetch(url+'/productUpdate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( user )
          // We convert the React state to JSON and send it as the POST body
         // data: JSON.stringify(user,user.ame)
          }).then(function(response) {
           return response.text()
        }).then(function(text) {


          // alert(text);
         lastSix = text.substr(text.length - 7); // => "Tabs1"
          //  poemDisplay.textContent = text;
          // alert(lastSix);

           if (lastSix === 'Success') {
            window.location.reload(false);
           };
          })
          .catch(error => alert(error.message));
         // reset to null value

       // this.companyNameEl.current.value = "";
     //  this.productIDEl.current.value = "";
     //  this.skuEl.current.value = "";
     //  this.barcodeEl.current.value = "";
     //  this.productNameEl.current.value = "";
     //  this.descriptionEl.current.value = "";
     //  this.unitEl.current.value = "";
     //  this.unitPriceEl.current.value = 0;
      // this.categoryIDEl.current.value = "";
      // this.productImageEl.current.value = "";

    }



  }



    validate(){
      if (this.productIDEl.current.value ==="") {
        alert("Product ID Must not blank");
        return false;
     };

    // if (this.skuEl.current.value ==="") {
    //    alert("General Ledger Sub No. Must not blank");
    //    return false;
    // };
    // if (this.barcodeSubEl.current.value ==="") {
    //  alert("General Ledger Sub No. Must not blank");
    //  return false;
    // };
     if (this.productNameEl.current.value ==="") {
        alert("Product Name Name Must not blank");
        return false;
     };
     if (catID ==="") {
      alert("Category not selected");
      return false;
   };




       // let errors = {};
      //  let isValid = true;
    //   if (this.companyIDEl.current.value.length < 8){
    //   alert("Company ID must be from 8 - 20 character");
     //  return false;
     //  }

      return true;
    }

 allowOnlyNumericsOrDigits(e) {
		const charCode = e.which ? e.which : e.keyCode;

		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			this.setState({ error: 'OOPs! Only numeric values or digits allowed' });
		}
	};

//  handleChange(e) {
 //   this.setState({ value: e.target.value});
 // }

//handleBlur(e) {
//  var num = parseFloat(this.state.value);
//  var cleanNum = num.toFixed(2);
//  this.setState({value: cleanNum});
//}


onValueChange = (event) => {
  this.setState({value:event.target.value})
}



  handleInputChange(event) {
    console.log(event.target.value)
    this.setState({
      number: event.target.value
    })
  }

  formatInput() {
    const num = this.state.number
    this.setState({
        number: parseFloat(num).toFixed(2)
    })
  }




//options = data.slice;
 options = Data.slice(0,4);

    render() {
        const mystyle = {
            color: "BLACK",
            backgroundColor: "#ffffff",
            padding: "5px 20px 10px 10px",
            alignItems: "left",
            fontFamily: "Arial",



        };
  //  const toInputLowercase = e => {
  //  e.target.value = ("" + e.target.value).toLowerCase();
  //  };

         const buttonStyle = {
          color: "black",
          backgroundColor: "yellow",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 350,
      };

   const subStyle = {
          color: "white",
          backgroundColor: "blue",
          padding: "10px 15px 10px 10px",
          fontFamily: "Arial",

      };
      const logstyle = {
          color: "white",
          backgroundColor: "red",
          padding: "3px 15px 10px 17px",
          fontFamily: "Arial",
          position: 'absolute',
          right: 800,
          width: '6em',
          height: '3em',

      };

      const onCancel= () => {
        this.productIDEl.current.value = "";
        this.skuEl.current.value = "";
        this.barcodeEl.current.value = "";
        this.productNameEl.current.value = "";
        this.descriptionEl.current.value = "";
        this.unitEl.current.value = "";
        this.unitPriceEl.current.value = 0;
       // this.categoryIDEl.current.value = "";
       // this.productImageEl.current.value = "";

     };




    //const options=list.slice(0,5-userLevel);

     // Defining our N

      // alert(options[1].label);
     // const [errorMessage, setErrorMessage] = useState('');
     // const validateDate = (value) => {
     //   alert("here");
     //   if (validator.isDate(value)) {
     //     setErrorMessage('Valid Date :)')
     //   } else {
     //     setErrorMessage('Enter Valid Date!')
     //   }
     // }




      return (



        <form style={mystyle}  onSubmit={this.handleSubmit}>
          <fieldset >

           <h1>Edit Product Profile</h1>
           <label style={{paddingRight: '62px'}}>Product ID:
          <input  class="text-uppercase"  maxLength={30} onBlur={ this.formatInput } ref={this.productIDEl} name="gproductID" readOnly={true} required />
          </label>
           <label style={{paddingRight: '105px'}}>Product SKU :
          <input type="text"  maxLength={30} ref={this.skuEl} name="sku" />
          </label>



          <label style={{paddingRight: '140px'}}>Product Barcode :
          <input type="text" maxLength={30} ref={this.barcodeEl}  name="barcode"/>
          </label>


          <label style={{paddingRight: '95px'}}>Product Name:
          <input type="text" maxLength={200} ref={this.productNameEl} name="position" required />
          </label>


          <label style={{paddingRight: '150px'}}>Product Description:
          <input type="text" maxLength={200} ref={this.descriptionEl} name="position"/>
          </label>

          <label style={{paddingRight: '72px'}} >Product Unit:
          <input type="text" maxLength={10} ref={this.unitEl} name="position" required />
          </label>

          <label style={{paddingRight: '200px'}}>Product Selling Price :
          <input type="number" defaultValue='0.00' onChange={ this.handleInputChange }
          onBlur={ this.formatInput } placeholder='0.00' maxLength={15} ref={this.unitPriceEl}   name="unitPrice"  />
          </label>



          <div className="select-container">
          <label style={{paddingRight: '350px'}}>Product Category :
          <select value={this.state.catID} onChange={this.handleChangeCat}>
            {catData.map((item, index) => (
              <option ref={this.categoryIDEl} value={item.categoryID} eventkey={item.catID} required> {item.categoryID} {item.categoryName} </option>
           ))}
          </select>

          </label>
          </div>


          <div className="select-container" >
          <label style={{paddingRight: '350px'}}>Product Image :
          <select value={this.state.imageID} onChange={this.handleChangeImg}>
            {imgData.map((item) => (
              <option ref={this.imageIDEl} value={item.imageID} eventkey={item.imageID}  required> {item.imageID}</option>

           ))}
          </select>


          </label>


          </div>






           </fieldset>


           <div>
          <img src={this.state.imgID} alt='Display' />
          </div>



           <p>

           <input type="submit" style={logstyle} className="Register" onClick={this.handleSubmit} name="submit" value="Update" />
           <button type="button" style={buttonStyle} onClick={onCancel}>Clear</button>
           <button type="button" style={subStyle} onClick={event =>  window.location.href='ProductList'} >Back</button>
           </p>

        </form>










      )
    }
  };




export default ProductEdit;
