import React from "react";
// import ReactDOM from "react-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import './Navbar.css';

export default function navbar() {
return (

  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>


  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    <NavDropdown title="Account Setup" id="collasible-nav-dropdown">
    <NavDropdown.Item href="CompanyProfile">Company Profile</NavDropdown.Item>
    <NavDropdown.Item href="GLList">General Ledger</NavDropdown.Item>
    <NavDropdown.Item href="EmployeeList">Employee Profile</NavDropdown.Item>
    <NavDropdown.Item href="DepartmentList">Department</NavDropdown.Item>
    <NavDropdown.Item href="CustomerList">Supplier/Customer Profile</NavDropdown.Item>
    <NavDropdown.Item href="bankList">Bank Account</NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item href="gstProfile">Government Tax</NavDropdown.Item>
    <NavDropdown.Item href="epfList">EPF Rate</NavDropdown.Item>
    <NavDropdown.Item href="socsoList">SOCSO Rate</NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item href="FileUpload">Image Upload</NavDropdown.Item>


    </NavDropdown>



      <NavDropdown title="Transaction" id="collasible-nav-dropdown">
      <NavDropdown.Item href="JournalVoucher">Journal Entry</NavDropdown.Item>
      <NavDropdown.Item href="VoucherEdit">Edit/Delete Existing Journal</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="glOpenBalance">Add/Edit General Ledger Account Opening Balance</NavDropdown.Item>

      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.1">Bank Payment By Bank Cheque</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.1">Bank Online Payment</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.1">Bank Reconciliation</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.2">Salary Payment</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Overtime</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Transaction Report" id="collasible-nav-dropdown">

      <NavDropdown.Item href="JournalReport">Journal Transaction Report</NavDropdown.Item>
      <NavDropdown.Item href="JournalEditedReport">Journal Editing Report</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="glTxnReport">General Ledger Transaction Report</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.3">Salary Transaction Report</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Overtime Transaction Report</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.2">EPF Transaction Report</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">SOSCO Transaction Report</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.3">Bank Transaction Report</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Bank Reconciliation Report</NavDropdown.Item>

      </NavDropdown>



      <NavDropdown title="Purchase" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Purchase Invoice</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Purchase Debit Note</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Purchase Credit Note</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Purchase Return Note</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Purchase Payment</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Supplier Profile Report</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Supplier Transaction Report</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Supplier Payment Report</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Supplier Debit/Credit/Return Note Report</NavDropdown.Item>

        </NavDropdown>

      <NavDropdown title="Sales" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Sales Invoice</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Sales Debit Note</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Sales Credit Note</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Sales Return Note</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Sales Payment</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Customer Profile Report</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Customer Transaction Report</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.4">Customer Payment Report</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Customer Debit/Credit/Return Note Report</NavDropdown.Item>

      </NavDropdown>

      <NavDropdown title="Product Control" id="collasible-nav-dropdown">
      <NavDropdown.Item href="categoryList">Product Category</NavDropdown.Item>
      <NavDropdown.Item href="locationList">Product Location</NavDropdown.Item>
      <NavDropdown.Item href="productList">Product Profile</NavDropdown.Item>

      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.1">Product Adjustment</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Product Transfer Within Location</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Product Write Off</NavDropdown.Item>

      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Product Transaction Report</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.4">Product Write Off Report</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.4">Product Location Transfer Report</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.4">Product Adjustment Report</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Sales Analysing" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Departmental Sales</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">monthly Sales</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Yearly Sales</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Financial Report" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Department Profit And Loss Statment</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Department Balance Sheet</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.1">Monthly Profit And Loss Statment</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Monthly Balance Sheet</NavDropdown.Item>

      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.1">Yearly Trial Balance</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.1">Yearly Profit And Loss Statment</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Yearly Balance Sheet</NavDropdown.Item>

      </NavDropdown>
       </Nav>




      <NavDropdown title="Utilities" id="collasible-nav-dropdown">




      <NavDropdown.Item href="ChangePassword">Change Employee Password</NavDropdown.Item>
      <NavDropdown.Item href="Logout">Logout</NavDropdown.Item>
      <NavDropdown.Item href="Home">Home</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="HelpPage">Help</NavDropdown.Item>
      </NavDropdown>



      </Navbar.Collapse>
  </Container>
</Navbar>

);
}
