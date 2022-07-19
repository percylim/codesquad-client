import React, {useEffect, useState} from 'react';
import { useTable, usePagination } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
//import  './index.css';
import Axios from 'axios';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import {CSVLink} from 'react-csv';
import DeviceSettingsSystemDaydream from 'material-ui/svg-icons/device/settings-system-daydream';

 //var data = [];
 var custData = [];
 const companyID = localStorage.getItem('companyID');
 var curr = new Date();
  //curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString().substr(0,10);
  var todayDate = moment(new Date(date)).format("DD/MM/YYYY");


function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
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
    );
  //  alert(data[0].lastName);

    // Render the UI for your table

   

    return (
        <div>
     
        <div className="row" style={{ 'margin': "10px" }}>  
        <div className="col-sm-12 btn btn-success">  
            Supplier and Customer Listing
         </div>  
        </div>  


            <table className="table" {...getTableProps()} style={{border: '2px solid black', borderLeft: '2px solid black'}}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} >
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                      }} >{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
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
        </div >
    )
}

function PaginationTableComponent() {
    const [data, setData] = useState([]);  
  
  
    useEffect(() => {  
        debugger;  
        Axios  
            .get(`http://localhost:9005/customerList`,
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
        
         
     /*   // Converting to JSON
        .then(response => response.json())
         
        // Displaying results to console
        .then(json => console.log(json));
             custData = res.data;
             for (let i = 0; i < custData.length; i++) { 
              let crLimit = custData[i].creditLimit;
               custData[i].creditLimit = parseFloat(crLimit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
              // setData(custData); 
              } 
            //  data = custData;
            // alert(custData[0].supplierName);
              setData(custData); 
           })  
          */    
                // setData(res.data);                                                                  
          
                // alert(data[0].supplierName);               
                                                              
     function handleEdit (row ) {                                                                                                                                              
      alert(row.value);                                                                               
     };   
                                                                         
    const history = useHistory();
    const handleClick = (e) =>{ 
      //  this.props.onHeaderClick(this.props.value);
         // alert(e);
         sessionStorage.setItem('supplierID',e);
         // const employeeNo = sessionStorage.getItem('employeeNo');
         // alert(employeeNo);
         history.push("/customerEdit");

      }




    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'ID',
                        accessor: 'id',
                        Cell: row => <div style={{ textAlign: "left" }}>{row.value}</div>
                    }, 
                    {
                        Header: 'Supplier/Customer ID',
                        accessor: 'supplierID',
                        Cell: row => <div style={{ textAlign: "left" }}>{row.value}</div>
                    },
                    {
                        Header: 'Supplier/Customer Name',
                        accessor: 'supplierName',
                        Cell: row => <div style={{ textAlign: "left" }}>{row.value}</div>
                    },
                    {
                        Header: 'Type',
                        accessor: 'acctType',
                        Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                   
                    {
                        Header: 'Telephone',
                        accessor: 'tel1',
                        Cell: row => <div style={{ textAlign: "left" }}>{row.value}</div>   
                    },
                    {
                        Header: 'Term',
                        accessor: 'paymentTerm',
                         Cell: row => <div style={{ textAlign: "right" }}>{row.value}</div>   
                    
                    },
                    {
                        Header: 'Credit Limit',
                        accessor: 'creditLimit',
                        Cell: row => <div style={{ textAlign: "right" }}>{row.value}</div>   
                    },
                    {
                        Header: 'Edit',
                        accessor: 'edit',
                        Cell: row => (
                            <div>
                               <button onClick={() => handleEdit(row)}>Edit</button>
                            </div>
                        ),  
                    },
                ],
            },
        ],
        []
    )

  function MyCell({value}) {
      return <a href='#'>{value}</a>; 
  }
                                                                                                                                                      
    // data = custData;
/*
     data = [
        {
            "firstName": "committee-c15dw",
            "lastName": "editor-ktsjo",
            "age": 3,
            "visits": 46,
            "progress": 75,
            "status": "relationship"
        },
        {
            "firstName": "midnight-wad0y",
            "lastName": "data-7h4xf",
            "age": 1,
            "visits": 56,
            "progress": 15,
            "status": "complicated"
        },
        {
            "firstName": "tree-sbdb0",
            "lastName": "friendship-w8535",
            "age": 1,
            "visits": 45,
            "progress": 66,
            "status": "single"
        },
        {
            "firstName": "chin-borr8",
            "lastName": "shirt-zox8m",
            "age": 0,
            "visits": 25,
            "progress": 67,
            "status": "complicated"
        },
        {
            "firstName": "women-83ef0",
            "lastName": "chalk-e8xbk",
            "age": 9,
            "visits": 28,
            "progress": 23,
            "status": "relationship"
        },
        {
            "firstName": "testing1",
            "lastName": "chalk-test",
            "age": 9,
            "visits": 28,
            "progress": 23,
            "status": "relationship"
        },
        {
            "firstName": "test20",
            "lastName": "chalk-test2",
            "age": 9,
            "visits": 28,
            "progress": 23,
            "status": "relationship"
        } 
    
    
    ]
*/

    console.log(JSON.stringify(data));


    return (
        <Table columns={columns} data={data} />
    )
}

export default PaginationTableComponent;
