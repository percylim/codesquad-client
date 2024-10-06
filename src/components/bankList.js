import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
// const userLevel = localStorage.getItem('userLevel');
// var eDate = '';

function BankList() {
    const [data, setData] = useState([]);
    const mystyle = {
        textAlign:"left",
        borderColor: '#000',

    };
   // localStorage.setItem('departmentID','');

    const history = useHistory();
    const handleClick = (e) =>{
      //  this.props.onHeaderClick(this.props.value);
         // alert(e);
         localStorage.setItem('bankID',e);
         // const employeeNo = sessionStorage.getItem('employeeNo');
         // alert(employeeNo);
         history.push("/BankEdit");

      }


      useEffect(() => {
      //  debugger;
        Axios
            .get(url+`/BankList`,
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
            .get(url+'/departmentList`,
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

    const onhandleNew = (e) => {
       // alert(userLevel);
       // if (userLevel > 4) {
       //      alert('you are not allow to create New Employee');
       //      return false;
        //} else {
        window.location='/BankNew'
       // }
    };

    return (
        <div>
            <div className="row" style={{ 'margin': "10px", padding: '0px' }}>
                <div className="col-sm-12 btn btn-warning">
                    Bank Listing
                 </div>
            </div>
            <table class="table" >
                <thead class="thead-dark" >
                    <tr style={mystyle}>
                    <th style={{backgroundColor: '#47ccde'}}> #</th>
                    <th style={{backgroundColor: '#47ccde'}}>Bank ID</th>
                    <th style={{backgroundColor: '#47ccde'}}>Bank Name</th>
                    <th style={{backgroundColor: '#47ccde'}}>Bank Account No.</th>
                    <th style={{backgroundColor: '#47ccde'}}>Telephone No,</th>
                    <th style={{backgroundColor: '#47ccde'}}>Fax No.</th>


        <Tooltip
        title="Click to add new Bank Profile"
        placement="top"
        > 


                    <button style={{ backgroundColor: 'blue', color: 'white', height: '30px', padding: '1px'}} onClick={() => onhandleNew()}>New Account</button>
          </Tooltip>      
                    </tr>
                </thead>
                <tbody style={mystyle}>
                    {data.map(item => {
                     return <tr key={item.Id}>
                        <td>{item.id}</td>
                        <td style={{backgroundColor: '#a6b5ff'}}>{item.bankID}</td>
                        <td>{item.bankName}</td>
                        <td style={{backgroundColor: '#a6b5ff'}}>{item.bankAcctNo}</td>
                        <td>{item.tel1}</td>
                        <td style={{backgroundColor: '#a6b5ff'}}>{item.fax}</td>
       <Tooltip
        title="Click to process selected Bank Profile editing"
        placement="top"
        >
                        <a><button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleClick(item.bankID)}>Edit</button></a>
           </Tooltip>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    )
}


export default BankList;
