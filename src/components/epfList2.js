import React, { useState, useEffect } from 'react'  
import Axios from 'axios';  
import { useHistory } from "react-router-dom";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const companyID = localStorage.getItem('companyID');

function App() {
  const [data, setData] = useState([]);  
  useEffect(() => {  
    debugger;  
    Axios  
        .get(`http://localhost:9005/epfList`,
          {  
           params: {   
                   companyID: companyID,
                  }
          }
        )        
        .then(result => setData(result.data));
   // alert(data);  
    debugger;  
}, []);  
// alert(customer);

/*
  const products = [
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
  ];
*/
const products = data;

  const columns = [
    { dataField: 'id', text: '#', sort: true },
    { dataField: 'startSalary', text: 'Salary From', sort: true },
    { dataField: 'endSalary', text: 'To Salary ', sort: false },
    { dataField: 'companyRate', text: 'Employer Pay Rate', sort: false},
    { dataField: 'employeeRate', text: 'Employee Pay Rate', sort: false },
    { dataField: 'remark', text: 'Remark', sort: false },
    {
      dataField: "edit",
      text: "Edit",
      formatter: (cellContent: string, row: IMyColumnDefinition) => {
         
              return <button className="btn btn-primary btn-xs" onClick={() => this.editEPF(row.id)}>Edit</button>
         
      },
  },

  ];



  const defaultSorted = [{
    dataField: 'startSalary',
    order: 'desc'
  }];

  const pagination = paginationFactory({
    page: 2,
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

  const { SearchBar, ClearSearchButton } = Search;

  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn btn-success" onClick={handleClick}>Export to CSV</button>
      </div>
    );
  };

  const editEPF = (e) => { 
    //alert(id);
    
    localStorage.setItem('epfID',e);
    // const employeeNo = sessionStorage.getItem('employeeNo');
    // alert(employeeNo);
    this.props.history.push("/epfEdit");
    
}         
              
    

          


  return (
    <div className="App">
      <h5>EPF Rate Listing</h5>

      <ToolkitProvider
        bootstrap4
        keyField='id'
        data={products}
        columns={columns}
        search
        exportCSV
      >
        {
          props => (
            <div>
              <h6>Input something at below input field:</h6>
              <SearchBar  {...props.searchProps} />
              <ClearSearchButton  {...props.searchProps} />
              <hr />
              <MyExportCSV {...props.csvProps} />
              <BootstrapTable
                defaultSorted={defaultSorted}
                pagination={pagination}
                {...props.baseProps}
              />

            </div>
          )
        }
      </ToolkitProvider>

    </div>
  );
}

export default App;
