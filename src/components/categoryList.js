import React, { useState, useEffect } from 'react'
import Axios from 'axios';
// import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
//import ReactDOM from "react-dom";
//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
// const userLevel = localStorage.getItem('userLevel');
// var Data = [];
var lastSix = '';
function CategoryList() {
    const [data, setData] = useState([]);

    const mystyle = {
        textAlign:"left",

    };


    const [category, setCategory] = useState({
        categoryID: "",
        categoryName: "",
        catDescription: "",

      });

      const onInputChange = async (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
      };
      const { categoryID, categoryName, catDescription } =category;

      const buttonStyle = {
        color: "white",
        backgroundColor: "blue",
        padding: "5px 10px 2px 10px",
        fontFamily: "Arial",
        position: 'absolute',
        right: 550,
    };

   // localStorage.setItem('departmentID','');

  //  const history = useHistory();



      useEffect(() => {
      //  debugger;
        Axios
            .get(url+`/categoryList`,
              {
               params: {
                       companyID: companyID,
                      }
              }
            )
            .then(result => setData(result.data));
        //alert(data);
      //  debugger;
    }, []);




   /***

    const handleDelete = (e) => {
       // alert(e)
        var user = {  companyID: companyID, department: e}
        fetch(url+'/departmentDelete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( user )
          // We convert the React state to JSON and send it as the POST body
         // data: JSON.stringify(user,user.ame)
          }).then(function(response) {
           return response.text()
        }).then(function(text) {

        alert(text);
        // alertif (text === 'success')
        Axios
            .get(url+`/departmentList`,
              {
               params: {
                       companyID: companyID,
                      }
              }
            )
            .then(result => setData(result.data));


        });

    };

*/
/*
validate(){
  let  prod=this.categoryDEl.current.value;
  for (let i = 0; i < prod.length; i++) {
      if (prod.substr(i,1) === ';') {
        alert("Category ID cannot contain (;) letter ");
        return false;
      }

  }

 */

const onhandleSubmit = async (e) => {


    e.preventDefault();

    let  prod=this.categoryIDEl.current.value;
    for (let i = 0; i < prod.length; i++) {
        if (prod.substr(i,1) === ';') {
          alert("Category ID cannot contain (;) letter ");
          return false;
        }

    }


    const data = {
        companyID: EscapeStr(companyID),
        categoryID: EscapeStr(categoryID),
        categoryName: EscapeStr(categoryName),
        catDescription: EscapeStr(catDescription),

       };
       //var name1 =  EscapeStr(user.companyName);
     // alert(Level);
      fetch(url+'/categoryUpdate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data )
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
           //  alert(lastSix);
          window.location.reload(false);
          window.location.href='categoryList';
         };
        });
        window.location.href='categoryList';


  };




    return (
        <div>
            <div className="row" style={{ 'margin': "10px", "paddingLeft": "5px" }}>
                <div className="col-sm-12 btn btn-info">
                Product Category Listing
                 </div>
            </div>
            <table class="table">
                <thead class="thead-dark" >
                    <tr style={mystyle}>
                    <th style={{backgroundColor: 'yellow'}}> #</th>
                    <th style={{backgroundColor: 'yellow'}}>Product Category ID</th>
                    <th style={{backgroundColor: 'yellow'}}>Product Category Name</th>
                    <th style={{backgroundColor: 'yellow'}}>Product Category Description</th>


                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {data.map(item => {
                     return <tr key={item.Id}>
                        <td>{item.id}</td>
                        <td>{item.categoryID}</td>
                        <td>{item.categoryName}</td>
                        <td>{item.catDescription}</td>


                        </tr>
                    })}
                </tbody>
            </table>

            <form onSubmit={(e) => onhandleSubmit(e)}>
            <h4> Add / Edit Product Category   </h4>

            <center>
            <div style={{ marginTop: "40px", paddingRight: "400px" }}>
              <label style={{ textAlign: "right"}}>
               Product Category ID :
                <input
                  type="text"
                  maxLength={10}
                  value={categoryID}
                  name="categoryID"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </label>


              <label style={{ textAlign: "right"}}>
                Product Category Name :
                <input
                  type="text"
                  value={categoryName}
                  name="categoryName"
                  onChange={(e) => onInputChange(e)}
                />
              </label>


              <label style={{ textAlign: "right"}} >
                Product Category Description :
                <input
                  type="text"
                  value={catDescription}
                  name="catDescription"
                  onChange={(e) => onInputChange(e)}

                />
              </label>


              <br />
              <button style={buttonStyle} type="submit">Save </button>
            </div>
          </center>

          </form>

        </div>



    )
}


export default CategoryList;
