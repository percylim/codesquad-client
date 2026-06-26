import React, { useState, useEffect } from 'react'
import Axios from 'axios';
// import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
//import ReactDOM from "react-dom";
//require('dotenv').config();//
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
            .get(`/api/categoryList`,
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




     const handleClick = (catID, catName, desc) =>{
       //alert(desc);
    //    navigate("/DepartmentEdit");
  //    setDepartment(depNo);
//      setDescription(desc);
      setCategory({
  categoryID: catID,
  categoryName: catName,
  catDescription: desc
});

//
//      lEdit = true;
//      lDisable = true;
//      inputRefDescription.current.focus();     
      }


const onhandleSubmit = async (e) => {

//   alert(catDescription);
    e.preventDefault();
//return
/*
let  prod=e.current.value;
    for (let i = 0; i < prod.length; i++) {
        if (prod.substr(i,1) === ';') {
          alert("Category ID cannot contain (;) letter ");
          return false;
        }

    }
*/

    const data = {
        companyID: EscapeStr(companyID),
        categoryID: EscapeStr(categoryID),
        categoryName: EscapeStr(categoryName),
        catDescription: EscapeStr(catDescription),

       };
       //var name1 =  EscapeStr(user.companyName);
     // alert(Level);
      fetch('/api/categoryUpdate', {
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
            <table className="table table-bordered" style={{ border: '1px solid black' }}>
                <thead class="thead-dark" >
                    <tr style={mystyle}>
                    <th style={{backgroundColor: 'yellow'}}> #</th>
                    <th style={{backgroundColor: 'green', color: 'white'}}>Product Category ID</th>
                    <th style={{backgroundColor: 'yellow'}}>Product Category Name</th>
                    <th style={{backgroundColor: 'green', color: 'white'}}>Product Category Description</th>
                    <th style={{backgroundColor: 'blue', color: 'white', width: '100px'}}>Active</th> 

                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {data.map(item => {
                     return <tr key={item.Id}>
                        <td>{item.id}</td>
                        <td style={{backgroundColor: '#d3d3d3'}}>{item.categoryID}</td>
                        <td>{item.categoryName}</td>
                        <td style={{backgroundColor: '#d3d3d3'}}>{item.catDescription}</td>
                        <a><button class = 'fas fa-edit' style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleClick(item.categoryID, item.categoryName, item.catDescription)}></button>
                         </a>

                        </tr>
                    })}
                </tbody>
            </table>

 <form onSubmit={(e) => onhandleSubmit(e)}
         style={{
    textAlign: 'left',
    marginRight: 'auto',
    width: '500px',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '8px'
  }} 
  >
   <h4 style={{ marginBottom: '20px', width: '100%',backgroundColor: 'blue', color: 'white', textAlign: 'center' }}>Add / Edit Product Category</h4>

      

<div style={{
  position: 'absolute',
  left: '400px',
  width: '1500px',
  height: '200px',
  margin: '6px',
  backgroundColor: 'white',
  border: '4px solid grey',
  paddingLeft: '10px',
}}>
    {/* 你的内容 */}

              <label style={{ display: 'block', marginBottom: '5px' }}>
               Product Category ID :
                <input
                  type="text"
                  maxLength={10}
                  value={categoryID}
                  name="categoryID"
                  onChange={(e) => onInputChange(e)}
                  disabled={true}
                  required
                />
              </label>


              <label style={{ display: 'block', marginBottom: '5px' }}>
                Product Category Name :
                <input
                  type="text"
                  value={categoryName}
                  name="categoryName"
                  onChange={(e) => onInputChange(e)}
                />
              </label>


              <label style={{ display: 'block', marginBottom: '5px' }} >
                Product Category Description :
                <input
                  type="text"
                  value={catDescription}
                  name="catDescription"
                  onChange={(e) => onInputChange(e)}

                />
              </label>


              <br />
  
<button 
  type="submit"
  style={{
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px'
  }}
>
  <i className="fas fa-save"></i>
  Save Category
</button>

            </div>
  

          </form>

        </div>

  
    )
  
}


export default CategoryList;
