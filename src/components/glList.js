import React, {useEffect, useState, useRef} from 'react';
//import './App.css';
import 'react-tooltip/dist/react-tooltip.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Axios from 'axios';
import { useHistory } from "react-router-dom";
import {CSVLink} from 'react-csv';
import moment from 'moment';
import EscapeStr from './mysqlConvertChar';
//import {Tooltip as ReactTooltip} from "react-tooltip";
//import GlEdit from './glEdit';

//require('dotenv').config();//
 const url = process.env.REACT_APP_SERVER_URL;
 const fetch = require('node-fetch');
//var gldata = [];
const companyID = localStorage.getItem('companyID');
var curr = new Date();
 //curr.setDate(curr.getDate() + 3);
 var date = curr.toISOString().substr(0,10);
 var todayDate = moment(new Date(date)).format("DD/MM/YYYY");
 var lastSix = '';
  var lDisable = false;
  var lEdit =false;
  var heading='Add New / Modify Existing General Ledger Account Profile';
const headers = [
  { label: 'G/L No.', key: 'glNo'},
  { label: 'G/L Sub', key: 'glSub'},
  { label: 'G/L Type', key: 'glType'},
  { label: 'Department', key: 'department'},
  { label: 'G/L Name', key: 'glName'},
   { label: 'G/L Description', key: 'glDescription'},
];

function GlList() {
  const inputReference = useRef(null);
  const inputRefGlName = useRef(null);
  const [data, setData] = useState([]);
  const [glNo, setGlNo]=useState('');
  const [glSub, setGlSub] = useState('');
  const [glDescription, setGlDescription] = useState('');
  const [glName, setGlName] =  useState('');
  const [department, setDepartment] = useState('');
  const [glType, setGlType] = useState('');
  const [taxID, setTaxID] = useState('');
  const [taxType, setTaxType] = useState('');
  const [taxCode, setTaxCode] = useState('');
  const [taxDescription, setTaxDescription] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [remark, setRemark] = useState('');
  const [typeData, setTypeData]=useState([]);
  const [departmentData, setDepartmentData]=useState([]);


  /*const products = [
    { id: 1, name: 'George', animal: 'Monkey' },
    { id: 2, name: 'Jeffrey', animal: 'Giraffe' },
    { id: 3, name: 'Alice', animal: 'Giraffe' },
    { id: 4, name: 'Foster', animal: 'Tiger' },
    { id: 5, name: 'Tracy', animal: 'Bear' },
    { id: 6, name: 'Joesph', animal: 'Lion' },
    { id: 7, name: 'Tania', animal: 'Deer' },
    { id: 8, name: 'Chelsea', animal: 'Tiger' },
    { id: 9, name: 'Benedict', animal: 'Tiger' },
    { id: 10, name: 'Chadd', animal: 'Lion' },
    { id: 11, name: 'Delphine', animal: 'Deer' },
    { id: 12, name: 'Elinore', animal: 'Bear' },
    { id: 13, name: 'Stokes', animal: 'Tiger' },
    { id: 14, name: 'Tamara', animal: 'Lion' },
    { id: 15, name: 'Zackery', animal: 'Bear' }
  ]; */

  const columns = [

    { dataField: 'id', text: '#', sort: false},
    { dataField: 'glNo', text: 'G/L No.', sort: true ,  headerStyle: { backgroundColor: 'cyan' }, style: { backgroundColor: 'lightgrey'}},
    { dataField: 'glSub', text: 'G/L Sub', sort: false, headerStyle: { backgroundColor: 'yellow' } },
    { dataField: 'glType', text: 'G/L Type', sort: true,   headerStyle: { backgroundColor: 'cyan' }, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'department', text: 'Department', sort: false,   headerStyle: { backgroundColor: 'yellow' }},
    { dataField: 'glName', text: 'G/L Name', sort: false ,  headerStyle: { backgroundColor: 'cyan' }, style: { backgroundColor: 'lightgrey'} },
    { dataField: 'glDescription', text: 'G/L Description', sort: false,  headerStyle: { backgroundColor: 'yellow' } },
    {
      dataField: "Edit",
      text: "",
      headerStyle: { width: '70px' },
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

              return <button className="btn btn-primary fa fa-edit" onClick={() => handleClick(row.glNo, row.glSub)}>Edit</button>

      },
    },

    {
      dataField: "Delete",
      text: "",
      headerStyle: { width: '70px' },
     
      formatter: (cellContent: string, row: IMyColumnDefinition) => {

              return <button className="btn btn-danger fa fa-trash" onClick={() => handleDelete(row.glNo, row.glSub)}>Del</button>

      },

    }
  ];

  const csvReport = {
    data: data,
    headers: headers,
    filename: 'Gneral-Ledger-Report-at-'+todayDate+'.csv'
  };

  const history = useHistory();
  const handleClick = (gNo,gSub) =>{
    //  this.props.onHeaderClick(this.props.value);
  //  heading='Edit Existing General Ledger Profile'
      // alert(glno + ' - '+glsub)
        localStorage.removeItem('glNo');
        localStorage.removeItem('glSub');
        localStorage.setItem('glNo',gNo);
        localStorage.setItem('glSub',gSub);
       // sessionStorage.setItem('glSub',glSub);
       // const employeeNo = sessionStorage.getItem('employeeNo');
     //   history.push("/glEdit");
   
     //search   
   Axios
   .get(url + `/glData`,
     {
       params: {
       companyID: companyID,
       glNo: gNo,
       glSub: gSub,

       }
     }
 ).then(res => {
 console.log(res);

 if (res.data.length === 0) {
 alert('G/L No.'+gNo+' G/L Sub '+gSub+' is invalid');
 return false
 }
 // alert(glData[0].glDescription);
 //  setGlNo(res.data[0].glNo);
 //  setGlSub(res.data[0].glSub);
 // setDepartment(res.data[0].department);
//  setGlName(res.data[0].glName);
//  setGlDescription(res.data[0].glDescription);
//  setGlType(res.data[0].glType);
 // alert(glType);
 // alert(department);
 })

 // lEdit = true;
 //  lDisable=true;
 //  inputRefGlName.current.focus();

window.location='/glEdit'

  };

  const validate = () =>{
    if (glNo ==="") {
      alert("General Ledger No.Must not blank");
      return false;
   };


for (let i = 0; i < glNo.length; i++) {
    if (glNo.substr(i,1) === ';') {
      alert("G/L No. cannot contain (;) letter ");
      return false;
    }

}



for (let i = 0; i < glSub.length; i++) {
    if (glSub.substr(i,1) === ';') {
      alert("G/L Sub cannot contain (;) letter ");
      return false;
    }

}

   if (glNo.length <4) {
      alert("General Ledger No. length must at least 4");
      return false;
   };

   if (glSub ==="") {
    alert("General Ledger Sub No. Must not blank");
    return false;
   };

   if (glSub.length <3) {
    alert("General Ledger Sub No. Must least 3");
    return false;
   };

   if (glName ==="") {
      alert("General Ledger Name Must not blank");
      return false;
   };
   if (department ==="") {
    alert("Department not selected");
    return false;
 };

 if (glDescription ==="") {
  alert("General Ledger Description Must not blank");
  return false;
};

if (glType ==="") {
alert("General Ledger Account not selected");
return false;
};
// let input = this.state.input;
     // let errors = {};
    //  let isValid = true;
  //   if (this.companyIDEl.current.value.length < 8){
  //   alert("Company ID must be from 8 - 20 character");
   //  return false;
   //  }

    return true;
  }
const onClear = () => {
  setGlNo("");
  setGlSub("");
  setGlName("");
  setGlDescription("");
  lEdit=false;
  lDisable=false;
} ;
const handleDelete = (gNo, gSub) => {
  Axios
  .get(url + `/GlVoucherSearch`,
    {
      params: {
      companyID: companyID,
      glNo: gNo,
      glSub: gSub,
      }
    }
  ).then(res => {
   if (res.data.length > 0) {
    alert('This G/L Account already hve transaction, cannot delete')
    return false;
  }
   if (window.confirm('Are you sure to process G/L Account deletion')) {
    alert('process deletion')
   }
    const user ={
       companyID: companyID,
       glNo: gNo,
       glSub: gSub,
    }
    fetch(url+'/glDelete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( user )
    // We convert the React state to JSON and send it as the POST body
   // data: JSON.stringify(user,user.ame)
    }).then(function(response) {
     return response.text()
  }).then(function(text) {

    window.location.href='glList';
    })
  });

};

const allowOnlyNumericsOrDigits = (e) => {
  const charCode = e.which ? e.which : e.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    this.setState({ error: 'OOPs! Only numeric values or digits allowed' });
  }
};
const formatInputGlNo = (e) => {
  const result = e.target.value.replace(/\D/g, '');
   setGlNo(result);
};
const formatInputGlSub = (e) => {
  const result = e.target.value.replace(/\D/g, '');
   setGlSub(result);
};
const formatInputGlName = (e) => {
  setGlName(e.target.value);
};

const formatInputGlDescription = (e) => {
  setGlDescription(e.target.value);
};
const handleDepartment =(e) => {

  const  ctype = (e.target.value).substr(0,3);
setDepartment(ctype);
//   alert(glType);
}
const handleGlType =(e) => {

  const  ctype = (e.target.value).substr(0,3);
setGlType(ctype);
//   alert(glType);
}

  const handleSave = () => {
    // alert("#0");

 //   alert(glType);
  //  alert(department);
   // return
  // alert(glType);

 /*
 if (glType === '804') {
  alert(glType);
   Axios
   .get(url + `/opBalTypeSearch`,
     {
       params: {
       companyID: companyID,
       }
     }
   ).then(res => {
    alert(res.data.length);
     if (res.data.length > 0) {
      alert('Opening Stock G/L Account already existed, this account can create only one');
      return false;
     }
   });
  }
*/
     if(validate()){
      // console.log(this.state);

if (lEdit === false) {


    const user= {
          companyID: EscapeStr(companyID),
          glNo:EscapeStr(glNo),
          glSub: EscapeStr(glSub),
          department: department,
          glType: glType,
          glName: EscapeStr(glName),
          glDescription: EscapeStr(glDescription),

         };

        fetch(url+'/glNew', {
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
          });

       setGlNo("");
       setGlSub("");
       setGlName("");
       setGlDescription("");
       lEdit = false;
       lDisable=false;
           window.location.reload(false);
            window.location.href ='glList';


       } // lEdit === false

 if (lEdit === true) {
  const user= {
    companyID: EscapeStr(companyID),
    glNo: EscapeStr(glNo),
    glSub: EscapeStr(glSub),
    department: department,
    glName: EscapeStr(glName),
    glDescription: EscapeStr(glDescription),
    glType: glType,

   };
   //var name1 =  EscapeStr(user.companyName);
//  alert(this.dateBirthEl.current.value);
  fetch(url+'/glUpdate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( user )
    // We convert the React state to JSON and send it as the POST body
   // data: JSON.stringify(user,user.ame)
    }).then(function(response) {
     return response.text()
  }).then(function(text) {
    setGlNo("");
    setGlSub("");
    setGlName("");
    setGlDescription("");

    })
lEdit = false;
 lDisable=false;
     window.location.reload(false);
      window.location.href ='glList';

 }


        }// if validate



        };

    const onhandleNew = (e) => {
      // alert(userLevel);
      // if (userLevel > 4) {
      //      alert('you are not allow to create New Employee');
      //      return false;
       //} 
   window.location='/glNew'
    
  //   lEdit=false;
  //    lDisable=false;
  //    setGlNo('');
  //    setGlSub('');
  //    setGlDescription('');
   //   setGlName('');
   //   heading='Add New General Ledger Profile'
   //   inputReference.current.focus();
   };
const defaultSorted = [{
    dataField: 'glNo',
    order: 'desc'
  }];
 const pagination = paginationFactory({
    page: 1,
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
   useEffect(() => {
    // alert(url);
  //  debugger;
    Axios
        .get(url+`/glList`,
          {
           params: {
                   companyID: companyID,
                  }
          }
        )
        .then(result => setData(result.data));
    //alert(data);
  //  debugger;


  Axios
  .get(url + `/departmentInfo`,
    {
      params: {
      companyID: companyID,

      }
    }
 ).then(res => {
  console.log(res);

  setDepartment(res.data[0].department);
  setDepartmentData(res.data);

  // window.alert(data[1].description);
})

Axios
.get(url + `/glTypeInfo`,
  {
    params: {
    companyID: companyID,

    }
  }
).then(res => {
  console.log(res);
  setTypeData(res.data);

  setGlType(res.data[0].glType);

  // window.alert(data[1].description);
})





}, []);


  

 
  return (
    <div className="App">
    <div className="row" style={{ 'margin': "10px" }}>
    <div className="col-sm-12 btn btn-success" style={{width: '1500px'}}>
    General Ledger Listing
    </div>

    <button style={{paddingLeft: '1000px', backgroundColor: 'blue', color: 'white', height: '30px',width: '100px', padding: '1px', marginLeft: '1rem'}} onClick={() => onhandleNew()}>Add New G/L</button>
    <br></br><CSVLink style={{ paddingLeft: '1400px', color: 'black'}} {...csvReport}>Export to CSV</CSVLink>

    </div>



    <span class="square border border-dark"></span>

      <BootstrapTable bootstrap4 keyField='id' data={data} columns={columns} defaultSorted={defaultSorted} pagination={pagination} class="table table-bordered border-dark"
      rowStyle = {{backgroundColor: '#A9A9A9', border: '3px solid grey' }}
      ></BootstrapTable>


  </div>





  ); // return

  }


export default GlList;
