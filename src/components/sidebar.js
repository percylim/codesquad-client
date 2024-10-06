import React from 'react';
// import { CDBIcon } from "cdbreact";
// import { Link } from 'react-router-dom';
//const userProfile = require('./components/user.js');
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
//import Logout from './logout';
// const name = localStorage.getItem('companyID');
const Sidebar = () => {
 // var name = localStorage.getItem('name');
  return (
    <div
      style={{ display: 'flex', position: 'absolute', top: '0px', height: '50vh', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a
        href="/"
        className="text-decoration-none"
        style={{ color: 'inherit' }}
      >
    

      </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

            <NavLink exact to="#" activeClassName="activeClicked">
    
            <CDBSidebarMenuItem icon="th-large" style={{backgroundColor:'red', color: 'white'}}>Getting Start</CDBSidebarMenuItem>
            </NavLink>

             <NavLink exact to="/Login" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-portrait'>Admin Login</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="UserLogin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fa fa-id-badge'>User Login</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="HelpPage" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa fa-question">Help</CDBSidebarMenuItem>
             </NavLink>

            <NavLink link to="/logout"  activeClassName="activeClicked">

            <CDBSidebarMenuItem icon='sign-out-alt'>User Logout</CDBSidebarMenuItem>
           </NavLink>


          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
          @2024 CopyRight by Code Squad Technology
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>

  );

};

export default Sidebar;
