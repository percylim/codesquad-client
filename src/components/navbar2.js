import React from "react";
// import ReactDOM from "react-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";


export default function navbar() {
return (

  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  
  
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
     
    
    <NavDropdown title="Account Setup" id="collasible-nav-dropdown">
    <NavDropdown.Item href="#action/3.1">Company Profile</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.2">Employee Profile</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.3">Department</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.3">Stock Location</NavDropdown.Item> 
    <NavDropdown.Item href="#action/3.3">Supplier/Customer Profile</NavDropdown.Item> 
   
    <NavDropdown.Divider />
    <NavDropdown.Item href="Logout">Logout</NavDropdown.Item>
   
    </NavDropdown>
     
     
    
      <NavDropdown title="Transaction" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Journal Entry</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">other Transaction 1</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.3">Others 2</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    </NavDropdown>



      <NavDropdown title="Purchase" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Purchase Invoice</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Purchase Debit Note</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Purchase Credit Note</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Purchase Return Note</NavDropdown.Item>  
        <NavDropdown.Item href="#action/3.3">Purchase Payment</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Supplier Transaction Report</NavDropdown.Item>
      </NavDropdown>
   
      <NavDropdown title="Sales" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Sales Invoice</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Sales Debit Note</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Sales Credit Note</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Sales Return Note</NavDropdown.Item>  
      <NavDropdown.Item href="#action/3.3">Sales Payment</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Customer Transaction Report</NavDropdown.Item>
      </NavDropdown> 

      <NavDropdown title="Stock Control" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3.1">Stock Adjustment</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Stock Transfer Within Location</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Stock Write Off</NavDropdown.Item>
    
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">Stock Transaction Report</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.4">Stock Write Off Report</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.4">Stock Location Transfer Report</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.4">Stock Adjustment Report</NavDropdown.Item>
   
      </NavDropdown> 
      </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

);
}
