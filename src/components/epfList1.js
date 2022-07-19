import React, { Component } from 'react'  
import BootstrapTable from 'react-bootstrap-table-next';  
import Axios from 'axios';  
import paginationFactory from 'react-bootstrap-table2-paginator';  
import { Button } from 'react-bootstrap'; 
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
//import './customer.css';
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import { useHistory } from "react-router-dom";
const companyID = localStorage.getItem('companyID');


export class EPFList extends Component {
  
   
    


  state = {  
    epf: [],  
    columns: [
     
    {  
      dataField: 'startSalary',  
      text: 'Income From',  
      sort: true,
      headerStyle: { backgroundColor: 'yellow' }
    },  
         {  
            dataField: 'endSalary',  
            text: 'Income To',  
            sort: false,
            headerStyle: { backgroundColor: 'yellow' }
         },  
          {  
            dataField: 'companyRate',  
            text: 'Employer Payment Rate',  
            sort: false,
            headerStyle: { backgroundColor: 'yellow' }  
          },  
          {  
            dataField: 'employeeRate',  
            text: 'Employee Payment Rate',  
            sort: false,
            headerStyle: { backgroundColor: 'yellow' } 
          },  
          {  
            dataField: 'remark',  
            text: 'Remark',  
            sort: false ,
            headerStyle: { backgroundColor: 'yellow' }
          },  
          {
            dataField: "edit",
            text: "Edit",
            formatter: (cellContent: string, row: IMyColumnDefinition) => {
               
                    return <button className="btn btn-primary btn-xs" onClick={() => this.editEPF(row.startSalary)}>Edit</button>
               
            },
        },
          
        ],
       
                      
 
       
      
  }; 
        
                  
  editCustomer(id){
    //alert(id);
    
    localStorage.setItem('epfID',id);
    // const employeeNo = sessionStorage.getItem('employeeNo');
    // alert(employeeNo);
    this.props.history.push("/epfEdit");
    
}         
              
    

              componentDidMount() {    
                     Axios.get(`http://localhost:9005/epfList`,
                      {  
                       params: {   
                           companyID: companyID,
                               }
                      }
                    )        
                .then(response => {    
                  console.log(response.data);    
                  this.setState({    
                        epf: response.data    
                  });    
                })
                 // alert(customer);

              }
               
              
                   
        render() {  
         
         
         // const options = {  
         //   page: 2,   
         //   sizePerPageList: [ {  
         //     text: '5', value: 5  
         //   }, {  
         //     text: '10', value: 10  
         //   }, {  
         //     text: 'All', value: this.state.customer.length  
         //   } ],   
         //   sizePerPage: 5,   
         //   pageStartIndex: 0,   
         //   paginationSize: 3,    
         //   prePage: 'Prev',   
         //   nextPage: 'Next',   
         //   firstPage: 'First',   
         //   lastPage: 'Last',   
           
         // };  

         
        

         const MyExportCSV = (props) => {
          const handleClick = () => {
            props.onExport();
          };
          return (
            <div>
              <button className="btn btn-info" onClick={ handleClick }>Export To Excel (CSV)</button>
            </div>
          );
        };

     
          const onhandleNew = (e) => {
            // alert(userLevel);
            // if (userLevel > 4) {   
            //      alert('you are not allow to create New Employee');
            //      return false;
             //} else {  
             window.location='/epfNew'
            // }
         };

        
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
      
       // const { SearchBar, ClearSearchButton } = Search;
      
       

        
      
           
      
                return (  
                  <div className="container">  
                  <div class="row" className="hdr">    
                  <div class="col-sm-12 btn btn-info" style={{ 'height': "50px"}}>     
                  <h4 style={{ 'color': 'white'}}> EPF Payment Rate Listing </h4>
                   </div>    
                    </div>    
                  <div  style={{ marginTop: 20 }}>  



                  <ToolkitProvider
    keyField="id"
    data={ this.state.epf }
    columns={ this.state.columns }
    pagination={ pagination } 
    exportCSV
    
  >
    {
      props => (
        <div>
          
          <BootstrapTable keyField='id' data={ this.state.epf } columns={ this.state.columns }  pagination={ pagination } {...props.baseProps} />
          <hr />
          <MyExportCSV { ...props.csvProps } />
        </div>
      )
    }
  </ToolkitProvider>
                 

               <hr />
                  <Button variant="success" onClick={() => onhandleNew()}>Add New EPF Rate</Button>{' '} 
                </div>
                </div> 

                
               
                )  
                        
               
               
                  

        }  
}; 
  
export default EPFList;
