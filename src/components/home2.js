import React from 'react';
//import CompanyRegister from './components/companyRegister';
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from 'react-bootstrap/Nav';
//import Register from './companyRegister';
export default function UserPage() {



return (

 <div style={{ display: 'block', width: 700, padding: 30 }}>

           <Nav activeKey="/homeLink">

        <Nav.Item>
          <Nav.Link href="/Login">Account Login</Nav.Link>
        </Nav.Item>
          <Nav.Item>
          <Nav.Link href="/HelpPage">Help</Nav.Link>
        </Nav.Item>

      </Nav>


    </div>

);
}
