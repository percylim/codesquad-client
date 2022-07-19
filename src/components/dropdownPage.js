import React from "react";
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

const DropdownPage = () => {
  return (
    <MDBDropdown>
      <MDBDropdownToggle caret color="primary">
        MDBDropdown
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <MDBDropdownItem>Action</MDBDropdownItem>
        <MDBDropdownItem>Another Action</MDBDropdownItem>
        <MDBDropdownItem>Something else here</MDBDropdownItem>
        <MDBDropdownItem divider />
        <MDBDropdownItem>Separated link</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}

export default DropdownPage;
