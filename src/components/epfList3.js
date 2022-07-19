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
    customer: [],  
    columns: [
     
    {  
      dataField: 'supplierID',  
      text: 'Supplier/Customer ID',  
      sort: true,
      headerStyle: { backgroundColor: 'yellow' }    
    }, 
    {  
      dataField: 'supplierName',  
      text: 'Supplier/Customer Name',  
      sort: true,
      headerStyle: { backgroundColor: 'yellow' }
    },  
         {  
            dataField: 'acctType',  
            text: 'Account Type',  
            sort: true,
            headerStyle: { backgroundColor: 'yellow' }
         },  
          {  
            dataField: 'city',  
            text: 'City',  
            sort: true,
            headerStyle: { backgroundColor: 'yellow' }  
          },  
          {  
            dataField: 'country',  
            text: 'Country',  
            sort: true,
            headerStyle: { backgroundColor: 'yellow' } 
          },  
          {  
            dataField: 'tel1',  
            text: 'Telephone',  
            sort: false ,
            headerStyle: { backgroundColor: 'yellow' }
          },  
          {  
            dataField: 'email',  
            text: 'Email',  
            sort: false,
            headerStyle: { backgroundColor: 'yellow' }
          },   
          {  
            dataField: 'paymentTerm',  
            text: 'Term Of Payment',  
            sort: false,
            headerStyle: { backgroundColor: 'yellow' }
           }, 
           {  
            dataField: 'creditLimit',  
            text: 'Credit Limit',  
            sort: false ,
            headerStyle: { backgroundColor: 'yellow' }
           }, 
           {
            dataField: "edit",
            text: "Edit",
            formatter: (cellContent: string, row: IMyColumnDefinition) => {
               
                    return <button className="btn btn-primary btn-xs" onClick={() => this.editCustomer(row.id)}>Edit</button>
               
            },
        },
          
        ],
       
                      
 
       
      
  }; 
        
                  
  editCustomer(id){
    //alert(id);
    
    localStorage.setItem('supplierID',id);
    // const employeeNo = sessionStorage.getItem('employeeNo');
    // alert(employeeNo);
    this.props.history.push("/CustomerEdit");
    
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
                        customer: response.data    
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
             window.location='/CustomerNew'
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
                  <h4 style={{ 'color': 'black'}}> Supplier / Customer Listing </h4>
                   </div>    
                    </div>    
                  <div  style={{ marginTop: 20 }}>  



                  <ToolkitProvider
    keyField="id"
    data={ this.state.customer }
    columns={ this.state.columns }
    pagination={ pagination } 
    exportCSV
    
  >
    {
      props => (
        <div>
          
          <BootstrapTable keyField='id' data={ this.state.customer } columns={ this.state.columns }  pagination={ pagination } {...props.baseProps} />
          <hr />
          <MyExportCSV { ...props.csvProps } />
        </div>
      )
    }
  </ToolkitProvider>
                 

               <hr />
                  <Button variant="success" onClick={() => onhandleNew()}>Add New Supplier/Customer</Button>{' '} 
                </div>
                </div> 

                
               
                )  
                        
               
               
                  

        }  
}; 
  
export default EPFList;
