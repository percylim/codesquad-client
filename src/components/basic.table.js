// src/components/basic.table.js
import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { useTable } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import {CSVLink} from 'react-csv';
import moment from 'moment';


// var custData = [];
//var data = [];

const companyID = localStorage.getItem('companyID');
var curr = new Date();
 //curr.setDate(curr.getDate() + 3);
 var date = curr.toISOString().substr(0,10);
 var todayDate = moment(new Date(date)).format("DD/MM/YYYY");

function BasicTableComponent() {
    const [data, setData] = useState([]); 
    const columns = [
        {
            Header: 'Name',
            columns: [
                {
                    Header: 'Supplier/Customer ID',
                    accessor: 'supplierID',
                },
                {
                    Header: 'Supplier/Customer Name',
                    accessor: 'suppliertName',
                },
            ],
        },
        {
            Header: 'Info',
            columns: [
                {
                    Header: 'Type',
                    accessor: 'acctType',
                },
                {
                    Header: 'Teleohone',
                    accessor: 'tel1',
                },
                {
                    Header: 'Term',
                    accessor: 'paymentTerm',
                },
                {
                    Header: 'Credit Limit',
                    accessor: 'creditLimit',
                },
            ],
        },
    ];
    useEffect(() => {  
       
        Axios  
            .get(`http://localhost:9005/customerList`,
              {  
               params: {   
                       companyID: companyID,
                      }
              }
            )        
            .then(res => {
            let custData = res.data;
             for (let i = 0; i < custData.length; i++) { 
              let crLimit = custData[i].creditLimit;
               custData[i].creditLimit = parseFloat(crLimit).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
              // setData(custData); 
              } 
              setData(custData);
            // alert(custData[0].supplierName);
            //  data = custData;
            //  alert(data[0].supplierName);
           })  
              
                // setData(res.data);
      
      
    });  
     
/*
    const data = [
        {
            "firstName": "horn-od926",
            "lastName": "selection-gsykp",
            "age": 22,
            "visits": 20,
            "progress": 39,
            "status": "single"
        },
        {
            "firstName": "heart-nff6w",
            "lastName": "information-nyp92",
            "age": 16,
            "visits": 98,
            "progress": 40,
            "status": "complicated"
        },
        {
            "firstName": "minute-yri12",
            "lastName": "fairies-iutct",
            "age": 7,
            "visits": 77,
            "progress": 39,
            "status": "single"
        },
        {
            "firstName": "degree-jx4h0",
            "lastName": "man-u2y40",
            "age": 27,
            "visits": 54,
            "progress": 92,
            "status": "relationship"
        }
    ]
*/

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })


    return (

        <table className="table" {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default BasicTableComponent;