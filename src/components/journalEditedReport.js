import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap';//
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from 'moment';
import generatePDF from "./reportGenerator";
 const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
//var customer = {};
var sDate = new Date();
 var eDate = new Date();
 var startDate='';
 var endDate='';
export class JournalEditedReport extends Component {

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
            dataField: 'dateChange',
            text: 'Date Edited',
            sort: true,
            headerStyle: { backgroundColor: 'yellow', color: 'black' }
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
                  text: 'Dep.',
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
                  align: 'right',
                  headerStyle: { backgroundColor: 'grey', color: 'white' }

                 },
                 {
                  dataField: 'crAmt',
                  text: 'Credit Amount',
                  sort: false ,
                  align: 'right',
                  headerStyle: { backgroundColor: 'grey', color: 'white' }
                 },
                 {
                  dataField: "userName",
                  text: "User Created",
                  sort: true,
                  headerStyle: { backgroundColor: 'yellow', color: 'black' }
                  },
                  {
                    dataField: "userChange",
                    text: "User Edited",
                    sort: true,
                    headerStyle: { backgroundColor: 'yellow', color: 'black' }
                    },
                    {
                        dataField: "reasons",
                        text: "Edit Status",
                        sort: false,
                        headerStyle: { backgroundColor: 'blue', color: 'white' }
                        },
                    {
                        dataField: "search",
                        text: "Action",
                        formatter: (cellContent: string, row: IMyColumnDefinition) => {

                                return <button class = 'btn btn-primary fa fa-search' onClick={() => this.searchVoucher(row.voucherNo)}></button>

                        },
                    }

        ],



        voucher: [],
        column: [

            {
                dataField: 'txnDate',
                text: 'Txn. Date',
                sort: false,
                headerStyle: { backgroundColor: 'green', color: 'white' }
              },
              {
                dataField: 'voucherNo',
                text: 'Voucher No.',
                sort: false,
                headerStyle: { backgroundColor: 'green', color: 'white' },
                style: { backgroundColor: 'lightgrey'}
              },
                   {
                      dataField: 'glNo',
                      text: 'G/L No.',
                      sort: false,
                      headerStyle: { backgroundColor: 'green', color: 'white' }
                   },
                    {
                      dataField: 'glSub',
                      text: 'G/L Sub No.',
                      sort: false,
                      headerStyle: { backgroundColor: 'green', color: 'white' }
                    },
                    {
                      dataField: 'department',
                      text: 'Department',
                      sort: false,
                      headerStyle: { backgroundColor: 'green', color: 'white' }
                    },
                    {
                      dataField: 'glName',
                      text: 'G/L Name',
                      sort: false ,
                      headerStyle: { backgroundColor: 'green', color: 'white' }
                    },
                    {
                      dataField: 'jeParticular',
                      text: 'Txn. Particular',
                      sort: false,
                      headerStyle: { backgroundColor: 'green', color: 'white' }
                    },
                    {
                      dataField: 'drAmt',
                      text: 'Debit Amount',
                      sort: false,
                      align: 'right',
                      headerStyle: { backgroundColor: 'green', color: 'white' }

                     },
                     {
                      dataField: 'crAmt',
                      text: 'Credit Amount',
                      sort: false ,
                      align: 'right',
                      headerStyle: { backgroundColor: 'green', color: 'white' }
                     },
                     {
                      dataField: "userName",
                      text: "User Created",
                      sort: false,
                      headerStyle: { backgroundColor: 'green', color: 'white' }
                      },

                      {
                          dataField: "voucherType",
                          text: "JE Type",
                          sort: false,
                          headerStyle: { backgroundColor: 'green', color: 'white' }
                      },


            ],



  };






searchVoucher(e) {

 //alert(e);

Axios.get(url+`/voucherCurrentList`,
{
 params: {
     companyID: companyID,
     voucherNo: e,
         }
}
)

.then(response => {
console.log(response.data);
let data = response.data;
if (data.length >0) {
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
  voucher: response.data
});
//alert(data[0].txnDate);
} // if
})


};


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

  startDate = moment(sDate).format("DD-MM-YYYY");
  endDate = moment(eDate).format("DD-MM-YYYY");

                   Axios.get(url+`/VoucherEditSearch`,
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
               // alert(response.data.length); 
                let data = response.data;
              if (typeof data.length === 'undefined') {
     alert("No Journal Voucher Edited Record available within selected date");           
                return false;
                 }
           
              for (let i = 0; i < data.length; i++) {
                  let d = new Date(data[i].dateChange);
                  let drValue = parseFloat(data[i].drAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  let crValue = parseFloat(data[i].crAmt).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  //alert(dramt);gits:2});
                  //alert(dramt);
                  d.toLocaleDateString('en-GB');
                  data[i].dateChange=d.toLocaleDateString('en-GB');
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

                return (
                  <div className="container">
                  <div class="row" className="hdr">
                  <div class="col-sm-12 btn btn-info" style={{ 'height': "50px", width: '1100px', align: 'left'}}>
                  <h4 style={{ 'color': 'black'}}> Journal Voucher Edited Report Listing </h4>
                   </div>
                    </div>
                  <div  style={{ marginTop: 20 }}>



   
    
        <div>

        <form>
        <fieldset>

          <label style={{paddingLeft: '0px'}}>Date From :
          <input type="date" style={{width: '17%'}} ref={this.startDateEl} name="sDate" size="sm"/>
              Date To :
          <input type="date" id='endDate' style={{width: '18%'}} ref={this.endDateEl} name="eDate" />

          <button
            type='button'
            class = 'btn btn-primary fa fa-search'
            onClick={() => this.onSearch()}
            ></button>

            </label>


            </fieldset>

       </form>
          <h4 style={{color: "blue"}}>Journal Voucher Before Editing</h4>
          <BootstrapTable keyField='id' data={ this.state.customer } columns={ this.state.columns }  pagination={ pagination } />
          <hr />
       
          <hr />
        </div>

  <h4>Original Journal Voucher After Edited</h4>
  <BootstrapTable keyField='id' data={ this.state.voucher } columns={ this.state.column } />

         <hr />
      </div>
                </div>

                )

        }
};

export default JournalEditedReport;
