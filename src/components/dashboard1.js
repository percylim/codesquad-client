import React from 'react';
//import CompanyRegister from './components/companyRegister';
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
// import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
export default function UserPage() {



return (

  <div style={{ display: 'block', 
                  width: 10, 
                  padding: 0 }}>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark float-right">
      <Dropdown>
        <Dropdown.Toggle variant="dark">
          Setting
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            Company Profile
          </Dropdown.Item>
          <Dropdown.Item href="#">
            Employee Profile
          </Dropdown.Item>
          <Dropdown.Item href="#">
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </nav>
    </div>

);
}
