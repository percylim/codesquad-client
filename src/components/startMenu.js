import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';

export default function StartMenu() {
  return (
    <div style={{ display: 'block',
                  width: 0,
                  padding: 0,
                  paddingRight: 1000,
                  paddingTop: 0, }}>

      <Dropdown>
        <Dropdown.Toggle variant="dark">
          Getting Start
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="/Login">
            Admin Login
          </Dropdown.Item>
          <Dropdown.Item href="/userLogin">
            User Login
        </Dropdown.Item>
          <Dropdown.Item href="/helpPage">
            Help
          </Dropdown.Item>
          <Dropdown.Item href="/Home">
            Home
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
