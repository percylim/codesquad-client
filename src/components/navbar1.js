import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
  
export default function Navbar() {
  return (
    <div style={{ display: 'block', 
                  width: 0, 
                  padding: 0,
                  paddingRight: 1000,
                  paddingTop: 0, }}>
     
      <Dropdown>
        <Dropdown.Toggle variant="dark">
          Account Setup
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            Company Profile
          </Dropdown.Item>
          <Dropdown.Item href="#">
           Employee Profile
          </Dropdown.Item>





          <Dropdown.Item href="/helpPage">
            Help
          </Dropdown.Item>
          <Dropdown.Item href="/Logout">
          Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <li>
      <Dropdown>
      <Dropdown.Toggle variant="dark">
       Transaction
    </Dropdown.Toggle>
       </Dropdown> 
      </li>
    
   
    </div>

  
  );
}