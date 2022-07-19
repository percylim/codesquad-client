import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import './navbar.css';
import { Dropdown} from "react-bootstrap";
//import axios from "axios";
//import { Link} from 'react-router-dom';

function ProductOnLine(categoryID)
{
       alert(categoryID);
  const [record,setRecord] = useState([]);


  const loadCategoryDetail = async () =>
  {
      fetch('http://localhost:9002/categoryList')
       .then(function(response){
          // console.log(response.json);
          return  response.json();
        })
       .then(function(myJson) {
          // console.log(myJson);
         setRecord(myJson);
        });
  }
  useEffect(() => {
    loadCategoryDetail();
 }, []);
    // On Page load display all records
    const loadProductDetail = async () =>
    {
      fetch('http://localhost:9002/productDetail')
         .then(function(response){
            // console.log(response.json);
            return  response.json();
          })
         .then(function(myJson) {
            // console.log(myJson);
            setRecord(myJson);
          });
    }
    useEffect(() => {
      loadProductDetail();
    }, []);

    // Insert Employee Records




  return(
    <section>
     <nav class="navbar navbar-expand-lg navbar-light bg-dark">
     <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">

        <li class="nav-item active">
          <a class="nav-link text-white" href="/home">Home <span class="sr-only">(current)</span></a>
        </li>

       <li class="nav-item">
       <div className="dropdown">
               <Dropdown>
               <Dropdown.Toggle
               variant="secondary btn-sm"
               id="dropdown-basic">
                   Categories
               </Dropdown.Toggle>
               <Dropdown.Menu style={{color: '#0a0707', backgroundColor:'#33aa7f'}}>

         {record.map((category)=>
             <Dropdown.Item eventKey={category.categoryID} onSelect={loadProductDetail} href="#">{category.categoryName}</Dropdown.Item>

         )}
         </Dropdown.Menu>
         </Dropdown>
          </div>


      </li>

      </ul>
      </div>
     </nav>
    <div class="container">
    <h4 className="mb-3 text-center mt-4">CRUD Operation in MERN</h4>
      <div class="row mt-3">
       <div class="col-sm-4">
          <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>

        </div>
      </div>
      <div class="col-sm-8">
        <h5 class="text-center  ml-4 mt-4  mb-5">View Records</h5>

        <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>Product ID</th>
                <th>Product Nname</th>
                <th>Descriptiom</th>
                <th>Brand ID</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Image</th>
            </tr>
            </thead>
            <tbody>

            {record.map((product)=>
                <tr>
                <td>{product.productID}</td>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td>{product.brandID}</td>
                <td>{product.unit}</td>
                <td>{product.price}</td>
                <td>{product.productImage}</td>

                </tr>
                )}
            </tbody>
        </table>
      </div>
      </div>
    </div>
   </section>
  )
}

export default ProductOnLine;
