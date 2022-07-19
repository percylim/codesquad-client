import React, { useState, useEffect, useMemo} from 'react'  
import Axios from 'axios';  
import { useHistory } from "react-router-dom";
import paginationFactory from 'react-bootstrap-table2-paginator';
import {CSVLink} from 'react-csv';
import moment from 'moment';
import Pagination from "react-js-pagination";
import { useTable, usePagination } from "react-table";
//import Pagination from './Pagination';
import './style.scss';


const companyID = localStorage.getItem('companyID');

var curr = new Date();
 //curr.setDate(curr.getDate() + 3);
 var date = curr.toISOString().substr(0,10);
 var todayDate = moment(new Date(date)).format("DD/MM/YYYY");
// const userLevel = localStorage.getItem('userLevel');
// var eDate = '';
const PageSize = 5;
const PageIndex = 1;
//const data = [];
const columns = [];


const headers = [ 
    { label: 'G/L No.', key: 'glNo'},
    { label: 'G/L Sub', key: 'glSub'},
    { label: 'G/L Type', key: 'glType'},
    { label: 'Department', key: 'department'},  
    { label: 'G/L Name', key: 'glName'},
     { label: 'G/L Description', key: 'glDescription'},
 
  ];
  
function GlList() {  
    const [data, setData] = useState([]);  
    const mystyle = {
        textAlign:"left",
        padding: '0.5rem',
        borderBottom: '1px solid black',
        borderRight: '1px solid black',
       
    }; 
   // localStorage.setItem('departmentID','');
  
  
  
  
    const history = useHistory();
    const handleClick = (glno,glsub) =>{ 
      //  this.props.onHeaderClick(this.props.value);
        
        // alert(glno + ' - '+glsub)
          localStorage.removeItem('glNo');
          localStorage.removeItem('glSub');    
          localStorage.setItem('glNo',glno);
          localStorage.setItem('glSub',glsub);
         // sessionStorage.setItem('glSub',glSub);
         // const employeeNo = sessionStorage.getItem('employeeNo');
         history.push("/glEdit");
         //window.location='/GlEdit'
      };

      
      useEffect(() => {  
        debugger;  
        Axios  
            .get(`http://localhost:9005/glList`,
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
     

    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        usePagination
    )




    const onhandleNew = (e) => {
       // alert(userLevel);
       // if (userLevel > 4) {   
       //      alert('you are not allow to create New Employee');
       //      return false;
        //} else {  
        window.location='/glNew'
       // }
    };
    const csvReport = {
        data: data,
        headers: headers,
        filename: 'Gneral-Ledger-Report-at-'+todayDate+'.csv'
      };
    
    return (  
        <div>  

  
       

            <div className="row" style={{ 'margin': "10px" }}>  
                <div className="col-sm-12 btn btn-success">  
                    General Ledger Listing
                 </div>  
            </div>  
            <table class="table" {...getTableProps()}>  
                 
                <thead class="thead-dark" > 
                    
                    <tr style={mystyle}> 
                    <th style={{backgroundColor: 'yellow'}}>#</th>
                    <th style={{backgroundColor: 'yellow'}}>G/L No.</th>
                    <th style={{backgroundColor: 'yellow'}}>G/L Sub No.</th>
                    <th style={{backgroundColor: 'yellow'}}>G/L Name</th>
                    
                    <th style={{backgroundColor: 'yellow'}}>G/L Description</th>  
                    <th style={{backgroundColor: 'yellow'}}>G/L Account Type</th>   
                    <th style={{backgroundColor: 'yellow'}}>Department</th>         
                    <button style={{ backgroundColor: 'blue', color: 'white', height: '30px', padding: '1px'}} onClick={() => onhandleNew()}>New G/L</button>
                    </tr>  
                </thead>  
                <tbody style={mystyle} {...getTableBodyProps()} >  
                    {data.map(item => {        
                     return <tr key={item.Id}>  
                        <td>{item.id}</td>
                        <td>{item.glNo}</td>
                        <td>{item.glSub}</td>
                        <td>{item.glName}</td> 
                        <td>{item.glDescription}</td>
                        <td>{item.glType}</td>
                        <td>{item.department}</td>
                        <a><button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => handleClick(item.glNo, item.glSub)}>Edit</button></a>
                       
                        </tr>  
                    })}  
                </tbody>  
            </table>  
            
            <ul className="pagination">
            <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                <a className="page-link">First</a>
            </li>
            <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                <a className="page-link">{'<'}</a>
            </li>
            <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                <a className="page-link">{'>'}</a>
            </li>
            <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                <a className="page-link">Last</a>
            </li>
            <li>
                <a className="page-link">
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </a>
            </li>
            <li>
                <a className="page-link">
                    <input
                        className="form-control"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px', height: '20px' }}
                    />
                </a>
            </li>{' '}
            <select
                className="form-control"
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
                style={{ width: '120px', height: '38px' }}
            >
                {[5, 10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </ul>
      

     <CSVLink {...csvReport}>Export to CSV</CSVLink> <br /><br />

     <pre>
     <code>
         {JSON.stringify(
             {
                 pageIndex,
                 pageSize,
                 pageCount,
                 canNextPage,
                 canPreviousPage,
             },
             null,
             2
         )}
     </code>
 </pre> 


          </div> // top
    
     
    ) 
   
    
}  

  
export default GlList;  
