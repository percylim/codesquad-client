import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
  
export default function Dashboard() {
  return (
    <div style={{ display: 'block', 
                  width: 700, 
                  padding: 0,
                  paddingRight: 344,
                  paddingTop: 0, }}>
     
      <Dropdown>
        <Dropdown.Toggle variant="dark">
          Setting
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            Company Profile
          </Dropdown.Item>
          <Dropdown.Item href="/helpPage">
            Employee Profile
          </Dropdown.Item>
          <Dropdown.Item href="/Home">
            Home
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
      <Dropdown.Toggle variant="dark">
        Transaction
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#">
          Journal Entry
        </Dropdown.Item>
        <Dropdown.Item href="#">
          Edit Journal
        </Dropdown.Item>
        <Dropdown.Item href="/Home">
          Jornal Report
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  );
}
