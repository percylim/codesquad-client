import React, { Component } from "react";
//import logo from './favicon.ico';
import logo from './codesqaud.png';
import './App.css';
//import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/login';
import Logout from './components/logout';
import CompanyRegister from './components/companyRegister';
import CompanyProfile from './components/companyProfile';
import Home from './components/home';
import HelpPage from './components/helpPage';
//import EmployeeList from './components/employeeList';
import UserProfile from './components/userProfile';
//import EmployeeEdit from './components/employeeEdit';
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
import HelpFinancialReport from './components/helpFinancialReport';
import SalesOrderListing from './components/salesOrderListing'; 

// import Sidebar from './components/sidebar';
const name = localStorage.getItem('companyName');
const userName = localStorage.getItem('userName');
const userLevel = localStorage.getItem('userLevel');

var appName = "Welcome to Code Squad Accounting System v2.12";
//var express = require("express");
//var ejs = require("ejs");
//var path = require("path");
//var app = express();
if (name !== null && name !== '')
    appName = name+' (v2.12)';

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
     <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <div className="App">
      <header className="App-header">
      <div>

      <img src={logo} width='70' height='70' style={{marginLeft: '1rem'}} className="App-logo" alt="logo" />
       <h1 style = {{ padding: 'center'}}>
        {name}
        </h1>
     <h5 style={{ padding: 'center' }}>
        Login as : {userName} -> level: {userLevel}
       </h5>
      
     </div>
     
          
                <Home />
                <Routes>
                 <Route path="/Login" element={<Login />} />
                 <Route path="/HelpCompanyRegister"  element={<HelpCompanyRegister />} />
                 <Route path="/HelpMain"  element={<HelpMain />} />
                 <Route path="/HelpSetup"  element={<HelpSetup />} />
                 <Route path="/HelpTransaction" element={<HelpTransaction />} />
                 <Route path="/HelpTxnReport" element={<HelpTxnReport />} />
                 <Route path="/HelpPurchase" element={<HelpPurchase />} />
                 <Route path="/HelpSales" element={<HelpSales />} />
                 <Route path="/HelpProduct" element={<HelpProduct />} />
                 <Route path="/HelpGst" element={<HelpGst />} />
                 <Route path="/HelpFinancialReport" element={<HelpFinancialReport />} />              
                 <Route path="/HelpPage" element={<HelpPage />} />
                 <Route path="/FileUpload" element={<FileUpload />} />
                 <Route path="/CompanyProfile" element={<CompanyProfile />} />         
                 <Route path="/Logout" element={<Logout />} />           
                 <Route path="/CompanyRegister" element={<CompanyRegister />} />           
                <Route path="/UserProfile" element={<UserProfile />} />    
                 <Route path="/UserLogin" element={<UserLogin />} />           
                 <Route path="/GlList" element={<GlList />} />           
                 <Route path="/GlNew" element={<GlNew />} />           
                 <Route path="/GlEdit" element={<GlEdit />} />           
                 <Route path="/DepartmentList" element={<DepartmentList />} />           
                 <Route path="/CustomerList" element={<CustomerList />} />           
                <Route path="/CustomerNew" element={<CustomerNew />} />           
                <Route path="/CustomerEdit" element={<CustomerEdit />} />           
                <Route path="/BankList" element={<BankList />} />           
                <Route path="/BankNew" element={<BankNew />} />           
                <Route path="/BankEdit" element={<BankEdit />} />   
                <Route path="/JournalVoucher" element={<JournalVoucher />} />         
                <Route path="/VoucherEdit" element={<VoucherEdit />} />         
                <Route path="/GlOpenBalance" element={<GlOpenBalance />} />   
                <Route path="/BankReconciliation" element={<BankReconciliation />} />         
                <Route path="/ReportGenerator" element={<ReportGenerator />} />  
                <Route path="/IncomeTax" element={<IncomeTax />} />            
                 <Route path="/JournalReport" element={<JournalReport />} />      
                 <Route path="/JournalEditedReport" element={<JournalEditedReport />} />      
                 <Route path="/GlTxnReport" element={<GlTxnReport />} />
                <Route path="/SuppCustTxnReport" element={<SuppCustTxnReport />} />
                 <Route path="/BankTxnReport" element={<BankTxnReport />} />
                <Route path="/BankReconciliationEdit" element={<BankReconciliationEdit />} />
                <Route path="/PurchaseInvoice" element={<PurchaseInvoice />} />
                <Route path="/SelectSupplierCustomer" element={<SelectSupplierCustomer />} />
                <Route path="/PurchaseDrCrNote" element={<PurchaseDrCrNote />} />
                <Route path="/PurchaseInvoicePayment" element={<PurchaseInvoicePayment />} />
                <Route path="/PurchaseReturnNote" element={<PurchaseReturnNote />} />
               <Route path="/PurchaseInvoiceListing" element={<PurchaseInvoiceListing />} />
                <Route path="/SupplierPaymentReport" element={<SupplierPaymentReport />} />
               <Route path="/SalesInvoice" element={<SalesInvoice />} />
                <Route path="/SalesInvoiceEdit" element={<SalesInvoiceEdit />} />
               <Route path="/SalesDrCrNote" element={<SalesDrCrNote />} />
               <Route path="/SalesReturnNote" element={<SalesReturnNote />} />
                <Route path="/SalesInvoicePayment" element={<SalesInvoicePayment />} />
               <Route path="/CustomerPaymentReport" element={<CustomerPaymentReport />} />
               <Route path="/SalesInvoiceListing" element={<SalesInvoiceListing />} />
              <Route path="/SalesPeriodicalReport" element={<SalesPeriodicalReport />} />
              <Route path="/CategoryList" element={<CategoryList />} />
               <Route path="/ProductList" element={<ProductList />} />
                 <Route path="/ProductNew" element={<ProductNew />} />
                 <Route path="/ProductEdit" element={<ProductEdit />} />
                 <Route path="/ProductOpeningBalance" element={<ProductOpeningBalance />} />
                  <Route path="/ProductAdjustment" element={<ProductAdjustment />} />
                  <Route path="/ProductWriteOff" element={<ProductWriteOff />} />
                   <Route path="/ProductTransactionReport" element={<ProductTransactionReport />} />
                    <Route path="/ProductAdjustWriteOffReport" element={<ProductAdjustWriteOffReport />} />
                  <Route path="/GstProfile" element={<GstProfile />} />
                  <Route path="/GstNew" element={<GstNew />} />
                   <Route path="/GstEdit" element={<GstEdit />} />
                    <Route path="/GstPeriodicalReport" element={<GstPeriodicalReport />} />
                   <Route path="/MonthlyTrialBalance" element={<MonthlyTrialBalance />} />
                    <Route path="/MonthlyBalanceSheet" element={<BalanceSheet />} />
                   <Route path="/MonthlyProfitAndLoss" element={<MonthlyProfitAndLoss />} />
                   <Route path="/TrialBalanceReport" element={<TrialBalanceReport />} />
                    <Route path="/ProfitAndLossReport" element={<ProfitAndLossReport />} />
                   <Route path="/YearlyBalanceSheetReport" element={<YearlyBalanceSheetReport />} />
                    <Route path="/SalesOrderListing" element={<SalesOrderListing />} />




                </Routes>


         


      </header>

    </div>

</BrowserRouter>





  );
}
};
export default App;
