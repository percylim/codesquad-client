import React, { Component } from 'react'  
import BootstrapTable from 'react-bootstrap-table-next';  
import Axios from 'axios';  
import paginationFactory from 'react-bootstrap-table2-paginator';  
//import { Button } from 'react-bootstrap'; 
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
//import {CSVLink} from "react-csv";
//import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
// import { useHistory } from "react-router-dom";
const companyID = localStorage.getItem('companyID');
//var customer = {};
var sDate = new Date();
 var eDate = new Date();
export class JournalReport extends Component {
  
  constructor(props) {
    super(props);
   // this.handleClick = this.onSearch.bind(this);
    this.startDateEl = React.createRef();
    this.endDateEl = React.createRef();
    // const [voucher, setState] = useState([]); 

  }  
   
    


  state = {  
    customer: [],  
    columns: [
    
        {  
            dataField: 'txnDate',  
            text: 'Txn. Date',  
            sort: true,
            headerStyle: { backgroundColor: 'grey', color: 'white' }    
          }, 
          {  
            dataField: 'voucherNo',  
            text: 'Voucher No.',  
            sort: false,
            headerStyle: { backgroundColor: 'grey', color: 'white' }
          },  
               {  
                  dataField: 'glNo',  
                  text: 'G/L No.',  
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
               },  
                {  
                  dataField: 'glSub',  
                  text: 'G/L Sub No.',  
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }  
                },  
                {  
                  dataField: 'department',  
                  text: 'Department',  
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white' } 
                },  
                {  
                  dataField: 'glName',  
                  text: 'G/L Name',  
                  sort: false ,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
                },  
                {  
                  dataField: 'jeParticular',  
                  text: 'Txn. Particular',  
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
                },   
                {  
                  dataField: 'drAmt',  
                  text: 'Debit Amount',  
                  sort: false,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
                 }, 
                 {  
                  dataField: 'crAmt',  
                  text: 'Credit Amount',  
                  sort: false ,
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
                 }, 
                 {
                  dataField: "userName",
                  text: "User Created",
                  sort: true,
                  headerStyle: { backgroundColor: 'grey', color: 'white' } 
                  },
                  {
                      dataField: "voucherType",
                      text: "JE Type",
                      sort: true,
                      headerStyle: { backgroundColor: 'grey', color: 'white' } 
                  },
                  
          
        ],
       
                      
 
       
      
  }; 
        
                  
  
              
    
/*
componentDidMount() {    
    Axios.get(`http://localhost:9005/voucherSearch`,
     {  
      params: {   
          companyID: companyID,
              }
     }
   )        
.then(response => {    
 console.log(response.data); 
 let data = response.data; 
 for (let i = 0; i < data.length; i++) { 
   let d = new Date(data[i].txnDate); 
 // let dramt = data[i].drAmt.toLocaleString(undefined, {maximumFractionDigits:2}); // "1,234.57";
  // let cramt = data[i].crAmt.toLocaleString(undefined, {maximumFractionDigits:2}); 
   
   let drValue = parseFloat(data[i].drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
   let crValue = parseFloat(data[i].crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
   //alert(dramt);
   d.toLocaleDateString('en-GB');
   data[i].txnDate=d.toLocaleDateString('en-GB');
   data[i].drAmt=drValue;
   data[i].crAmt=crValue;
}
 this.setState({    
       customer: response.data    
 });   
 //alert(data[0].txnDate);

})
 

}
*/
onSearch (e) { 
  // e.preventDefault();
  sDate = this.startDateEl.current.value
  eDate = this.endDateEl.current.value
   if (sDate === '' ) {
     alert('Date From cannot be empty');
     return false
   }
   if (eDate === '' ) {
    alert('Date To cannot be empty');
    return false
  }
  
  if (eDate < sDate) {
    alert('Date From must not later than Date To ');
    return false
  }

                 
                   Axios.get(`http://localhost:9005/VoucherSearch`,
                    {  
                     params: {   
                         companyID: companyID,
                         startDate: sDate,
                         endDate: eDate,
                             }
                    }
                  ) 
                        
              .then(response => {    
                console.log(response.data); 
                let data = response.data; 
                for (let i = 0; i < data.length; i++) { 
                  let d = new Date(data[i].txnDate); 
                  let drValue = parseFloat(data[i].drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  let crValue = parseFloat(data[i].crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  //alert(dramt);gits:2}); 
                  //alert(dramt);
                  d.toLocaleDateString('en-GB');
                  data[i].txnDate=d.toLocaleDateString('en-GB');
                  data[i].drAmt=drValue;
                  data[i].crAmt=crValue;
               }
                this.setState({    
                      customer: response.data    
                });   
                //alert(data[0].txnDate);
               
               })
                
               
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

     
         
        
         const pagination = paginationFactory({
          page: 1,
          sizePerPage: 10,
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
                  <h4 style={{ 'color': 'black'}}> Journal Voucher Report Listing </h4>
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
     
        <form>
        <fieldset>
         
          <label style={{paddingLeft: '0px'}}>Date From :
          <input type="date" style={{width: '17%'}} ref={this.startDateEl} name="sDate" size="sm"/>
          </label> 
         
          <label style={{paddingLeft: '60px'}}>Date To :  
          <input type="date" id='endDate' style={{width: '18%'}} ref={this.endDateEl} name="eDate" />
    
          <button
            type='button'
            class = 'btn btn-primary fa fa-search'
            onClick={() => this.onSearch()}
            ></button>

            </label> 
           
        
            </fieldset>  
       
       </form>    

          <BootstrapTable keyField='id' data={ this.state.customer } columns={ this.state.columns }  pagination={ pagination } {...props.baseProps} />
          <hr />
          <MyExportCSV { ...props.csvProps}/>
        </div>
      )
    }
  </ToolkitProvider>
                 

               <hr />
                
                </div> 
                </div> 

                
               
                )  
                        
               
               
                  

        }  
}; 
  
export default JournalReport;
