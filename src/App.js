import React, { Component } from "react";
import logo from './favicon.ico';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/login';
import Logout from './components/logout';
import CompanyRegister from './components/companyRegister';
import CompanyProfile from './components/companyProfile';
import Home from './components/home';
import HelpPage from './components/helpPage';
import EmployeeList from './components/employeeList';
import EmployeeProfile from './components/employeeProfile';
import EmployeeEdit from './components/employeeEdit';
import ChangePassword from './components/changePassword';
import UserLogin from './components/userLogin';
import DepartmentList from './components/departmentList';
import DepartmentNew from './components/departmentNew';
import DepartmentEdit from './components/departmentEdit';
import CustomerList from './components/customerList';
import CustomerNew from './components/customerNew';
import CustomerEdit from './components/customerEdit';
import BankList from './components/bankList';
import BankNew from './components/bankNew';
import BankEdit from './components/bankEdit';
import GlList from './components/glList'
import GlEdit from './components/glEdit';
import GlNew from './components/glNew';
import FileUpload from './components/fileUpload';
import GstProfile from './components/gstProfile';
import GstNew from './components/gstNew';
import GstEdit from './components/gstEdit';
import EpfList from './components/epfList';
import EpfNew from './components/epfNew';
import EpfEdit from './components/epfEdit';
import SocsoList from './components/socsoList';
import SocsoNew from './components/socsoNew';
import SocsoEdit from './components/socsoEdit';
import LocationList from './components/locationList';//
import CategoryList from './components/categoryList';
import ProductList from './components/productList';
import ProductNew from './components/productNew';
import ProductEdit from './components/productEdit';
import JournalVoucher from './components/journalVoucher';
import VoucherList from './components/voucherList';
import ReportGenerator from './components/reportGenerator';
import VoucherEdit from './components/voucherEdit';
import JournalReport from './components/journalReport';
import JournalEditedReport from './components/journalEditedReport';
import BankTransaction from './components/bankTransaction';
import GlTxnReport from './components/glTxnReport';
import GlOpenBalance from './components/glOpenBalance';
import GlOpenBalanceEdit from './components/glOpenBalanceEdit';

// import Sidebar from './components/sidebar';
const name = localStorage.getItem('companyName');
const userName = localStorage.getItem('userName');
const userLevel = localStorage.getItem('userLevel');

var appName = "Welcome to Code Squad Accounting System v1.0";
//var express = require("express");
//var ejs = require("ejs");
//var path = require("path");
//var app = express();
if (name !== null && name !== '')
    appName = name;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }



    render() {
 //     app.set("views", path.join(__dirname, "views"));
  //    app.set('view engine', 'ejs');
   ////   app.set('view engine', 'ejs');
  return (

    <div className="App">
      <header className="App-header">
      <a>

        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-user">{userName} -> level: {userLevel}</p>

        <h1> {appName} </h1>

       </a>
          <Router>
                <Home />
                <Switch>
                 <Route path="/Login" exact component={Login} />
                 <Route path="/CompanyRegister" exact component={CompanyRegister} />
                 <Route path="/CompanyProfile" exact component={CompanyProfile} />
                 <Route path="/HelpPage" exact component={HelpPage} />
                 <Route path="/Logout" exact component={Logout} />
                 <Route path="/EmployeeList" exact component={EmployeeList} />
                 <Route path="/EmployeeProfile" exact component={EmployeeProfile} />
                 <Route path="/EmployeeEdit" exact component={EmployeeEdit} />
                 <Route path="/UserLogin" exact component={UserLogin} />
                 <Route path="/ChangePassword" exact component={ChangePassword} />
                 <Route path="/DepartmentList" exact component={DepartmentList} />
                 <Route path="/DepartmentNew" exact component={DepartmentNew} />
                 <Route path="/DepartmentEdit" exact component={DepartmentEdit} />
                 <Route path="/CustomerList" exact component={CustomerList} />
                 <Route path="/CustomerNew" exact component={CustomerNew} />
                 <Route path="/CustomerEdit" exact component={CustomerEdit} />
                 <Route path="/BankList" exact component={BankList} />
                 <Route path="/BankNew" exact component={BankNew} />
                 <Route path="/BankEdit" exact component={BankEdit} />
                 <Route path="/GlList" exact component={GlList} />
                 <Route path="/GlNew" exact component={GlNew} />
                 <Route path="/GlEdit" exact component={GlEdit} />
                 <Route path="/GlOpenBalance" exact component={GlOpenBalance} />
                 <Route path="/GlOpenBalanceEdit" exact component={GlOpenBalanceEdit} />
                 <Route path="/FileUpload" exact component={FileUpload} />
                 <Route path="/GstProfile" exact component={GstProfile} />
                 <Route path="/GstNew" exact component={GstNew} />
                 <Route path="/GstEdit" exact component={GstEdit} />
                 <Route path="/EpfList" exact component={EpfList} />
                 <Route path="/EpfNew" exact component={EpfNew} />
                 <Route path="/EpfEdit" exact component={EpfEdit} />
                 <Route path="/SocsoList" exact component={SocsoList} />
                 <Route path="/SocsoNew" exact component={SocsoNew} />
                 <Route path="/SocsoEdit" exact component={SocsoEdit} />
                 <Route path="/LocationList" exact component={LocationList} />
                 <Route path="/CategoryList" exact component={CategoryList} />
                 <Route path="/ProductList" exact component={ProductList} />
                 <Route path="/ProductNew" exact component={ProductNew} />
                 <Route path="/ProductEdit" exact component={ProductEdit} />
                 <Route path="/JournalVoucher" exact component={JournalVoucher} />
                 <Route path="/VoucherList" exact component={VoucherList} />
                 <Route path="/ReportGenerator" exact component={ReportGenerator} />
                 <Route path="/VoucherEdit" exact component={VoucherEdit} />
                 <Route path="/JournalReport" exact component={JournalReport} />
                 <Route path="/JournalEditedReport" exact component={JournalEditedReport} />
                 <Route path="/BankTransaction" exact component={BankTransaction} />
                 <Route path="/GlTxnReport" exact component={GlTxnReport} />

                 </Switch>
          </Router>


      </header>

    </div>









  );
}
};
export default App;
