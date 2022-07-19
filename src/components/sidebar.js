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
      style={{ display: 'flex', position: 'absolute', top: '0px', height: '130vh', overflow: 'scroll initial' }}
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
    
            <CDBSidebarMenuItem icon="th-large">Account Setting</CDBSidebarMenuItem>
            </NavLink>

             <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="shopping-basket">Transaction</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="shopping-cart">Purchase</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="truck">Sales</CDBSidebarMenuItem>
             </NavLink>

            <NavLink exact to="#"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="server">Stock Control</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='th'>
                Analysing
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sticky-note">
               Financial Report 
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink link to="/logout"  activeClassName="activeClicked">

            <CDBSidebarMenuItem icon="sign-out-alt">User Logout</CDBSidebarMenuItem>
           </NavLink>


          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
          @2021 CopyRight by Code Squad Technology
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>

  );

};

export default Sidebar;
