import React from 'react';
import { Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Fragment>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
           
           
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Setting
                </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
              
                  <NavLink href="#">Company Profile</NavLink>
                  </DropdownItem>
                <DropdownItem>
                  Employee Profile
                  </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Department
                  </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </Fragment>
  }
}