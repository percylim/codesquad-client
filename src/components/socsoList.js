import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import paginationFactory from 'react-bootstrap-table2-paginator';
require('dotenv').config();//
const url = process.env.REACT_APP_SERVER_URL;
const companyID = localStorage.getItem('companyID');
export class SocsoList extends Component {

            state = {
                    employee: [],
                    columns: [{
                      dataField: 'id',
                      text: '#',
                      sort: false,
                      headerStyle: { backgroundColor: 'yellow' },

                    },
                    {
                      dataField: 'startSalary',
                      text: 'Salary From',
                      sort: false ,
                      headerStyle: { backgroundColor: 'yellow' },
                      textAlign: 'right',
                      align: 'right',

                  },
                    {
                      dataField: 'endSalary',
                      text: 'To Salary',
                      sort: false,
                      headerStyle: { backgroundColor: 'yellow' },
                      textAlign: 'right',
                      align: 'right',
                    },
                    {
                            dataField: 'companyRate',
                            text: 'Employer Pay Rate',
                            sort: false ,
                            headerStyle: { backgroundColor: 'yellow' },
                            align: 'right',
                    },
                    {
                            dataField: 'employeeRate',
                            text: 'Employee Pay Rate',
                            sort: false,
                            headerStyle: { backgroundColor: 'yellow' },
                            align: 'right',
                    },
                    {
                            dataField: 'remark',
                            text: 'Remark',
                            sort: false,
                            headerStyle: { backgroundColor: 'yellow' },
                            align: 'left',
                    },
                    {
                            dataField: "edit",
                            text: "Edit",
                            formatter: (cellContent: string, row: IMyColumnDefinition) => {

                                    return <button className="btn btn-primary btn-xs" onClick={() => this.handleClickEdit(row.id)}>Edit</button>

                            },

                    },

                        {
                          dataField: "delete",
                          text: "Delete",
                          formatter: (cellContent: string, row: IMyColumnDefinition) => {

                                  return <button className="btn btn-danger btn-xs" onClick={() => this.handleClickDelete(row.id)}>Delete</button>

                          },

                      },
                        ]
                  }
                  handleClickEdit(id) {
                    //  this.props.onHeaderClick(this.props.value);
                       // alert(id);
                       localStorage.setItem('epfID',id);
                       // const employeeNo = sessionStorage.getItem('employeeNo');
                       // alert(employeeNo);
                      // window.location=("/EpfEdit");
                       this.props.history.push("/socsoEdit");
                    };

                    handleClickDelete(id) {
                      //  this.props.onHeaderClick(this.props.value);
                         // alert(id);
                        // localStorage.setItem('epfID',id);

                         var r = window.confirm("Press a button!");
                         if (r === true) {
                           // process delete
                         //  alert('delete');
                           var user = {  companyID: companyID, ID: id}
                           fetch(url+'/socsoDelete', {
                             method: 'POST',
                             headers: { 'Content-Type': 'application/json' },
                             body: JSON.stringify( user )
                             // We convert the React state to JSON and send it as the POST body
                            // data: JSON.stringify(user,user.ame)
                             }).then(function(response) {
                              return response.text()
                           }).then(function(text) {

                          //alert(text);
                            if (text === 'success')
                            window.location='/SocsoList'
                            else
                            alert('delete fail');

                         });

                        }


                      };
                  componentDidMount() {

                    Axios.get(url+'/socsoList' ,

                    {
                        params: {
                            companyID: companyID,
                                }
                       }

                    )


                    .then(response => {

                      console.log(response.data);

                      this.setState({
                            employee: response.data
                      });

                    });
                  }

                   NumFormatter (data) {
                    return parseFloat(data).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    });
                  };


            render() {


                const onhandleNew = (e) => {
                    // alert(userLevel);
                    // if (userLevel > 4) {
                    //      alert('you are not allow to create New Employee');
                    //      return false;
                     //} else {
                     window.location='/SocsoNew'
                    // }
                 };


                    return (
                            <div className="container">
                            <div class="row" className="hdr">
                            <div class="col-sm-12 btn btn-info">
                            SOCSO Rate Listing
                             </div>
                              </div>
                            <div  style={{ marginTop: 20 }}>
                            <BootstrapTable
                            striped
                            hover
                            keyField='id'
                            data={ this.state.employee }
                            columns={ this.state.columns }
                            rowStyle = {{backgroundColor: '#A9A9A9', border: '3px solid grey' }}
                            pagination={ paginationFactory() } />

                            <Button variant="success" onClick={onhandleNew}>Add New SOCSO Rate</Button>

                            </div>

                         </div>





                    )


            }


    }

    export default SocsoList;
