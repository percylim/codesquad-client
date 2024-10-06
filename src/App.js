import React, { Component } from "react";
//import logo from './favicon.ico';
import logo from './codesqaud.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import Login from './components/login';
import Logout from './components/logout';
import CompanyRegister from './components/companyRegister';
import CompanyProfile from './components/companyProfile';
import Home from './components/home';
import HelpPage from './components/helpPage';
//import EmployeeList from './components/employeeList';
//import EmployeeProfile from './components/employeeProfile';
//import EmployeeEdit from './components/employeeEdit';
//import UserProfile from './components/userProfile';
//import ChangePassword from './components/changePassword';
import UserLogin from './components/userLogin';
import DepartmentList from './components/departmentList';
//import DepartmentNew from './components/departmentNew';
//import DepartmentEdit from './components/departmentEdit';
import CustomerList from './components/customerList';
import CustomerNew from './components/customerNew';
import CustomerEdit from './components/customerEdit';
import BankList from './components/bankList';
import BankNew from './components/bankNew';
import BankEdit from './components/bankEdit';
import GlList from './components/glList';
import GlNew from './components/glNew';
import GlEdit from './components/glEdit';
import FileUpload from './components/fileUpload';
import GstProfile from './components/gstProfile';
import GstNew from './components/gstNew';
import GstEdit from './components/gstEdit';
//import EpfList from './components/epfList';
//import EpfNew from './components/epfNew';
//import EpfEdit from './components/epfEdit';
//import SocsoList from './components/socsoList';
//import SocsoNew from './components/socsoNew';
//import SocsoEdit from './components/socsoEdit';
//import LocationList from './components/locationList';//
import CategoryList from './components/categoryList';
import ProductList from './components/productList';
import ProductNew from './components/productNew';
import ProductEdit from './components/productEdit';
import ProductAdjustment from './components/productAdjustment';
import JournalVoucher from './components/journalVoucher';
//import VoucherList from './components/voucherList';
import ReportGenerator from './components/reportGenerator';
import VoucherEdit from './components/voucherEdit';
import JournalReport from './components/journalReport';
import JournalEditedReport from './components/journalEditedReport';
import BankTransaction from './components/bankTransaction';
import BankReconciliation from './components/bankReconciliation';
import BankReconciliationEdit from './components/bankReconciliationEdit';
import GlTxnReport from './components/glTxnReport';
import GlOpenBalance from './components/glOpenBalance';
//import GlOpenBalanceEdit from './components/glOpenBalanceEdit';
import BankTxnReport from './components/bankTxnReport';
import PurchaseInvoice from './components/purchaseInvoice';
import SelectSupplierCustomer from './components/selectSupplierCustomer';
//import SelectProduct from './components/selectProduct';
//import VoucherSetup from './components/voucherSetup';
import SuppCustTxnReport from './components/suppCustTxnReport';
import ProductTransactionReport from './components/productTransactionReport';
import ProductOpeningBalance from './components/productOpeningBalance';
import PurchaseDrCrNote from './components/purchaseDrCrNote';
import PurchaseReturnNote from './components/purchaseReturnNote';
import PurchaseInvoicePayment from './components/purchaseInvoicePayment';
import SalesInvoice from './components/salesInvoice';
import SalesInvoiceEdit from './components/salesInvoiceEdit';
import SalesDrCrNote from './components/salesDrCrNote';
import SalesReturnNote from './components/salesReturnNote';
import SalesInvoiceListing from './components/salesInvoiceListing';
import SalesInvoicePayment from './components/salesInvoicePayment';
import PurchaseInvoiceListing from './components/purchaseInvoiceListing';
import ProductWriteOff from './components/productWriteOff';
import SupplierPaymentReport from './components/supplierPaymentReport';
import ProductAdjustWriteOffReport from './components/productAdjustWriteOffReport';
import CustomerPaymentReport from './components/customerPaymentReport';
import SalesPeriodicalReport from './components/salesPeriodicalReport';
//import ProductSalesPeriodicalReport from './components/productSalesPeriodicalReport';
import MonthlyTrialBalance from './components/monthlyTrialBalance';
//import YearlyTrialBalance from './components/yearlyTrialBalance';
import MonthlyProfitAndLoss from './components/monthlyProfitAndLoss';
import IncomeTax from './components/incomeTax';
//import IncomeTaxComputation from './components/incomeTaxComputation';
import BalanceSheet from './components/balanceSheet';
import TrialBalanceReport from './components/trialBalanceReport';
import ProfitAndLossReport from './components/profitAndLossReport';
import YearlyBalanceSheetReport from './components/yearlyBalanceSheetReport';
import GstPeriodicalReport from './components/gstPeriodicalReport';
import HelpCompanyRegister from './components/helpCompanyRegister';
import HelpMain from './components/helpMain';
import HelpSetup from './components/helpSetup';
import HelpTransaction from './components/helpTransaction';
import HelpTxnReport from './components/helpTxnReport';
import HelpPurchase from './components/helpPurchase';
import HelpSales from './components/helpSales';
import HelpProduct from './components/helpProduct';
import HelpGst from './components/helpGst';
import HelpFinancialReport from './components/helpFinancialReport'
 

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

      <img src={logo} width='70' height='70' style={{marginLeft: '25rem'}} className="App-logo" alt="logo" />

      <h style={{paddingLeft: '1000px'}}> Login as : {userName} -> level: {userLevel} </h>
      <h1> {appName} </h1>

     </a>
          <Router>
                <Home />
                <Switch>
                 <Route path="/Login" exact component={Login} />
                 <Route path="/HelpCompanyRegister" exact component={HelpCompanyRegister} />
                 <Route path="/HelpMain" exact component={HelpMain} />
                 <Route path="/HelpSetup" exact component={HelpSetup} />
                 <Route path="/HelpTransaction" exact component={HelpTransaction} />
                 <Route path="/HelpTxnReport" exact component={HelpTxnReport} />
                 <Route path="/HelpPurchase" exact component={HelpPurchase} />
                 <Route path="/HelpSales" exact component={HelpSales} />
                 <Route path="/HelpProduct" exact component={HelpProduct} />
                 <Route path="/HelpGst" exact component={HelpGst} />
                 <Route path="/HelpFinancialReport" exact component={HelpFinancialReport} />              
                 <Route path="/HelpPage" exact component={HelpPage} />
                 <Route path="/FileUpload" exact component={FileUpload} />
                 <Route path="/CompanyProfile" exact component={CompanyProfile} />         
                 <Route path="/Logout" exact component={Logout} />           
                 <Route path="/CompanyRegister" exact component={CompanyRegister} />           
                 <Route path="/UserLogin" exact component={UserLogin} />           
                 <Route path="/GlList" exact component={GlList} />           
                 <Route path="/GlNew" exact component={GlNew} />           
                 <Route path="/GlEdit" exact component={GlEdit} />           
                 <Route path="/DepartmentList" exact component={DepartmentList} />           
                 <Route path="/CustomerList" exact component={CustomerList} />           
                <Route path="/CustomerNew" exact component={CustomerNew} />           
                <Route path="/CustomerEdit" exact component={CustomerEdit} />           
                <Route path="/BankList" exact component={BankList} />           
                <Route path="/BankNew" exact component={BankNew} />           
                <Route path="/BankEdit" exact component={BankEdit} />   
                <Route path="/JournalVoucher" exact component={JournalVoucher} />         
                <Route path="/VoucherEdit" exact component={VoucherEdit} />         
                <Route path="/GlOpenBalance" exact component={GlOpenBalance} />   
                <Route path="/BankReconciliation" exact component={BankReconciliation} />         
                <Route path="/ReportGenerator" exact component={ReportGenerator} />  
                <Route path="/IncomeTax" exact component={IncomeTax} />            
                 <Route path="/JournalReport" exact component={JournalReport} />      
                 <Route path="/JournalEditedReport" exact component={JournalEditedReport} />      
                 <Route path="/GlTxnReport" exact component={GlTxnReport} />
                <Route path="/SuppCustTxnReport" exact component={SuppCustTxnReport} />
                 <Route path="/BankTxnReport" exact component={BankTxnReport} />
                <Route path="/BankReconciliationEdit" exact component={BankReconciliationEdit} />
                <Route path="/PurchaseInvoice" exact component={PurchaseInvoice} />
                <Route path="/SelectSupplierCustomer" exact component={SelectSupplierCustomer} />
                <Route path="/PurchaseDrCrNote" exact component={PurchaseDrCrNote} />
                <Route path="/PurchaseInvoicePayment" exact component={PurchaseInvoicePayment} />
                <Route path="/PurchaseReturnNote" exact component={PurchaseReturnNote} />
               <Route path="/PurchaseInvoiceListing" exact component={PurchaseInvoiceListing} />
                <Route path="/SupplierPaymentReport" exact component={SupplierPaymentReport} />
               <Route path="/SalesInvoice" exact component={SalesInvoice} />
                <Route path="/SalesInvoiceEdit" exact component={SalesInvoiceEdit} />
               <Route path="/SalesDrCrNote" exact component={SalesDrCrNote} />
               <Route path="/SalesReturnNote" exact component={SalesReturnNote} />
                <Route path="/SalesInvoicePayment" exact component={SalesInvoicePayment} />
               <Route path="/CustomerPaymentReport" exact component={CustomerPaymentReport} />
               <Route path="/SalesInvoiceListing" exact component={SalesInvoiceListing} />
              <Route path="/SalesPeriodicalReport" exact component={SalesPeriodicalReport} />
              <Route path="/CategoryList" exact component={CategoryList} />
               <Route path="/ProductList" exact component={ProductList} />
                 <Route path="/ProductNew" exact component={ProductNew} />
                 <Route path="/ProductEdit" exact component={ProductEdit} />
                 <Route path="/ProductOpeningBalance" exact component={ProductOpeningBalance} />
                  <Route path="/ProductAdjustment" exact component={ProductAdjustment} />
                  <Route path="/ProductWriteOff" exact component={ProductWriteOff} />
                   <Route path="/ProductTransactionReport" exact component={ProductTransactionReport} />
                    <Route path="/ProductAdjustWriteOffReport" exact component={ProductAdjustWriteOffReport} />
                  <Route path="/GstProfile" exact component={GstProfile} />
                  <Route path="/GstNew" exact component={GstNew} />
                   <Route path="/GstEdit" exact component={GstEdit} />
                    <Route path="/GstPeriodicalReport" exact component={GstPeriodicalReport} />
                   <Route path="/MonthlyTrialBalance" exact component={MonthlyTrialBalance} />
                    <Route path="/MonthlyBalanceSheet" exact component={BalanceSheet} />
                   <Route path="/MonthlyProfitAndLoss" exact component={MonthlyProfitAndLoss} />
                   <Route path="/TrialBalanceReport" exact component={TrialBalanceReport} />
                    <Route path="/ProfitAndLossReport" exact component={ProfitAndLossReport} />
                   <Route path="/YearlyBalanceSheetReport" exact component={YearlyBalanceSheetReport} />
 




                </Switch>


          </Router>


      </header>

    </div>









  );
}
};
export default App;
