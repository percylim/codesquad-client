import React from "react";
// import ReactDOM from "react-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu} from "react-bootstrap-submenu";
import './Navbar.css';
import "react-bootstrap-submenu/dist/index.css";
const userLevel = localStorage.getItem('userLevel');
export default function navbar() {
const glList = 'glList';
  return (

  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
  <Container>


  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
    <NavDropdownMenu title="Setup" id="collasible-nav-dropdown">
    <NavDropdown.Item href="CompanyProfile">Company Profile</NavDropdown.Item>
    <NavDropdown.Item href={glList}>General Ledger Listing / Add / Edit</NavDropdown.Item>
    <NavDropdown.Item href="DepartmentList">Department Listing / Add / Edit</NavDropdown.Item>
    <NavDropdown.Item href="CustomerList">Supplier/Customer Profile Listing / Add / Edit</NavDropdown.Item>
    <NavDropdown.Item href="bankList">Bank Account Listing / Add /Edit</NavDropdown.Item>
    <NavDropdown.Divider/>
    <NavDropdown.Item href="IncomeTax">Income Tax Rate</NavDropdown.Item>  
    <NavDropdown.Divider/>
    <NavDropdown.Item href="FileUpload">Image Upload</NavDropdown.Item>  
    <NavDropdown.Divider/> 
    <DropdownSubmenu href="#action/3.7" title="Utilities">

     <NavDropdown.Item href="userProfile">Add / Edit / Delete User</NavDropdown.Item>
      <NavDropdown.Item href="Logout">Logout</NavDropdown.Item>
      <NavDropdown.Item href="Home">Home</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="HelpPage">Help</NavDropdown.Item>
     </DropdownSubmenu>
    </NavDropdownMenu>



      <NavDropdown title="Transaction" id="collasible-nav-dropdown">
      <NavDropdown.Item href="JournalVoucher">Journal Entry</NavDropdown.Item>
      <NavDropdown.Item href="VoucherEdit">Edit/Delete Existing Journal</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="glOpenBalance">Add/Edit General Ledger Account Opening Balance</NavDropdown.Item>

      <NavDropdown.Divider />
      <NavDropdown.Item href="bankReconciliation">Bank Reconciliation</NavDropdown.Item>
      <NavDropdown.Divider />



      </NavDropdown>

      <NavDropdown title="Transaction Report" id="collasible-nav-dropdown">

      <NavDropdown.Item href="JournalReport">Journal Transaction Report</NavDropdown.Item>
      <NavDropdown.Item href="JournalEditedReport">Journal Editing Report</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="glTxnReport">General Ledger Transaction Report</NavDropdown.Item>


      <NavDropdown.Divider />
      <NavDropdown.Item href="suppCustTxnReport">Supplier/Customer Transaction Report</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="bankTxnReport">Bank Transaction Report</NavDropdown.Item>
      <NavDropdown.Item href="bankReconciliationEdit">Bank Reconciliation Report</NavDropdown.Item>

      </NavDropdown>



      <NavDropdown title="Purchase" id="collasible-nav-dropdown">
        <NavDropdown.Item href="purchaseInvoice">Purchase Invoice</NavDropdown.Item>
        <NavDropdown.Item href="purchaseDrCrNote">Purchase Debit Note/Credit Note</NavDropdown.Item>
        <NavDropdown.Item href="purchaseReturnNote">Purchase Goods Return Note</NavDropdown.Item>
        <NavDropdown.Item href="purchaseInvoicePayment">Purchase Payment</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="purchaseInvoiceListing">Supplier Purchase Invoice Listing</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="supplierPaymentReport">Supplier Payment/Debit/Credit/Return Report</NavDropdown.Item>

        </NavDropdown>

      <NavDropdown title="Sales" id="collasible-nav-dropdown">
      <NavDropdown.Item href="salesInvoice">Sales Invoice</NavDropdown.Item>
      <NavDropdown.Item href="salesInvoiceEdit">Edit Sales Invoice</NavDropdown.Item>
      <NavDropdown.Item href="salesDrCrNote">Sales Debit/Credit Note</NavDropdown.Item>
      <NavDropdown.Item href="salesReturnNote">Sales Goods Return Note</NavDropdown.Item>
      <NavDropdown.Item href="salesInvoicePayment">Sales Invoice Payment Receipt</NavDropdown.Item>
      <NavDropdown.Divider />
        <NavDropdown.Item href="SalesInvoiceListing">Customer Sales Invoice Listing And Printing</NavDropdown.Item>
        <NavDropdown.Divider />
      <NavDropdown.Divider />
      <NavDropdown.Item href="customerPaymentReport">Customer Payment/Debit/Credit/Return Report</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="salesPeriodicalReport">Periodical Sales Report</NavDropdown.Item> 
      </NavDropdown>

      <NavDropdown title="Product Control" id="collasible-nav-dropdown">
      <NavDropdown.Item href="categoryList">Product Category</NavDropdown.Item>
      <NavDropdown.Item href="productList">Product Profile</NavDropdown.Item>

      <NavDropdown.Divider />
      <NavDropdown.Item href="productOpeningBalance">Product Opening Balance</NavDropdown.Item>
      <NavDropdown.Item href="productAdjustment">Product Adjustment</NavDropdown.Item>
      <NavDropdown.Item href="productWriteOff">Product Write Off</NavDropdown.Item>

      <NavDropdown.Divider />
      <NavDropdown.Item href="productTransactionReport">Product Transaction Report</NavDropdown.Item>
      <NavDropdown.Item href="productAdjustWriteOffReport">Product Adjustment / Write Off Report</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="GST Management" id="collasible-nav-dropdown">
    
      <NavDropdown.Item href="gstProfile">Goods And Service Tax (GST) Listing / Add / Edit</NavDropdown.Item>
      <NavDropdown.Item href="gstPeriodicalReport">GST Input And Output Tax Periodical Report</NavDropdown.Item>
      
      </NavDropdown>

     
      <NavDropdown title="Financial Report" id="collasible-nav-dropdown">
      <NavDropdown.Item href="MonthlyTrialBalance">Trail Balance</NavDropdown.Item> 
      <NavDropdown.Item href="MonthlyProfitAndLoss">Profit And Loss Statement</NavDropdown.Item>
      <NavDropdown.Item href="MonthlyBalanceSheet">Balance Sheet</NavDropdown.Item>
      <NavDropdown.Divider /> 
<DropdownSubmenu title="Previous Year Financial Report">

<NavDropdown.Item href="TrialBalanceReport">Trial Balance</NavDropdown.Item>
 <NavDropdown.Item href="ProfitAndLossReport">Profit And Loss Statement</NavDropdown.Item>
 <NavDropdown.Item href="YearlyBalanceSheetReport">Balance Sheet</NavDropdown.Item>
 
</DropdownSubmenu>   
      </NavDropdown> 
       </Nav>

      </Navbar.Collapse>
  </Container>
</Navbar>

);
}
