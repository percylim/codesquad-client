import React, { useState, useEffect } from 'react'
import Axios from 'axios';
// import { useHistory } from "react-router-dom";
import EscapeStr from './mysqlConvertChar';
import './Profile.css';
//import ReactDOM from "react-dom";
require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
// const userLevel = localStorage.getItem('userLevel');
// var Data = [];
var lastSix = '';
function LocationList() {
    const [data, setData] = useState([]);

    const mystyle = {
        textAlign:"left",

    };


    const [location, setLocation] = useState({
        locationID: "",
        locationName: "",
        locationAddress: "",
        remark: "",
      });

      const onInputChange = async (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
      };
      const { locationID, locationName, locationAddress, remark } = location;

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
        debugger;
        Axios
            .get(url+`/locationList`,
              {
               params: {
                       companyID: companyID,
                      }
              }
            )
            .then(result => setData(result.data));
        //alert(data);
        debugger;
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




const onhandleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        companyID: EscapeStr(companyID),
        locationID: EscapeStr(locationID),
        locationName: EscapeStr(locationName),
        locationAddress: EscapeStr(locationAddress),
        remark: EscapeStr(remark),
       };
       //var name1 =  EscapeStr(user.companyName);
     // alert(Level);
      fetch(url+'/locationUpdate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data )
        // We convert the React state to JSON and send it as the POST body
       // data: JSON.stringify(user,user.ame)
        }).then(function(response) {
         return response.text()
      }).then(function(text) {


         alert(text);
       lastSix = text.substr(text.length - 7); // => "Tabs1"
        //  poemDisplay.textContent = text;
        // alert(lastSix);

         if (lastSix === 'Success') {
           //  alert(lastSix);
          window.location.reload(false);
          window.location.href='locationList';
         };
        });
        window.location.href='locationList';
    };






    return (
        <div>
            <div className="row" style={{ 'margin': "10px", "paddingLeft": "5px" }}>
                <div className="col-sm-12 btn btn-success">
                Product Location Listing
                 </div>
            </div>
            <table class="table">
                <thead class="thead-dark" >
                    <tr style={mystyle}>
                    <th style={{backgroundColor: 'yellow'}}> #</th>
                    <th style={{backgroundColor: 'yellow'}}>Product Location ID</th>
                    <th style={{backgroundColor: 'yellow'}}>Product Location Name</th>
                    <th style={{backgroundColor: 'yellow'}}>Product Location Address</th>
                    <th style={{backgroundColor: 'yellow'}}>Remark</th>

                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {data.map(item => {
                     return <tr key={item.Id}>
                        <td>{item.id}</td>
                        <td>{item.locationID}</td>
                        <td>{item.locationName}</td>
                        <td>{item.locationAddress}</td>
                        <td>{item.remark}</td>

                        </tr>
                    })}
                </tbody>
            </table>

            <form onSubmit={(e) => onhandleSubmit(e)}>
            <h4> Add / Edit Product Location    </h4>

            <center>
            <div style={{ marginTop: "40px", paddingRight: "600px" }}>
              <label style={{ textAlign: "right"}}>
               Location ID :
                <input
                  type="text"
                  maxLength={4}
                  value={locationID}
                  name="locationID"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </label>


              <label style={{ textAlign: "right"}}>
                Location Name:
                <input
                  type="text"
                  value={locationName}
                  name="locationName"
                  onChange={(e) => onInputChange(e)}
                />
              </label>


              <label style={{ textAlign: "right"}} >
                Location Address :
                <input
                  type="text"
                  value={locationAddress}
                  name="locationAddress"
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </label>

              <label style={{ textAlign: "right"}}>
                Remark :
                <input
                  type="text"
                  value={remark}
                  name="remark"
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


export default LocationList;
