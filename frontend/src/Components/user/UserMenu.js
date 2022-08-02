import React, { useState } from "react";
import { NavDropdown, DropdownButton, Dropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import CreateGroupBtn from "../Button/CreateGroupBtn"


function UserMenu() {
  const navigate = useNavigate();

  const logMeOut = () => {
    navigate("/");
  };

  return (
    <>
      <CreateGroupBtn />

      <Dropdown align="end" autoClose="outside">
        <Dropdown.Toggle id="dropdown-basic">IC</Dropdown.Toggle>

        <Dropdown.Menu>
          <NavDropdown.Item href="/settings/profile">
            Account settings
          </NavDropdown.Item>
          {/* <Dropdown.Divider /> */}
          <NavDropdown.Item href="/settings/my-groups">
            My groups
          </NavDropdown.Item>
          {/* <NavDropdown.Item onClick={CreatGroup}>Create group</NavDropdown.Item> */}
          {/* <NavDropdown.Divider /> */}
          <NavDropdown.Item onClick={logMeOut}>Sign out</NavDropdown.Item>
          {/* <NestedDropdown title="Item 3">
          <Dropdown.Item>Item 3.1</Dropdown.Item>
          <Dropdown.Item>Item 3.2</Dropdown.Item>
          <Dropdown.Item>Item 3.3</Dropdown.Item>
        </NestedDropdown> */}
        </Dropdown.Menu>
      </Dropdown>
    </>

    // <DropdownButton
    //   // title={
    //   //   <span>
    //   //     <i className="fad fa-newspaper"></i> IC
    //   //   </span>
    //   // }
    //   title="IC"
    //   id="basic-nav-dropdown"
    //   align="end"
    // >
    //   <NavDropdown.Item href="/settings/profile">Settings</NavDropdown.Item>
    //   <NavDropdown.Item href="settings">Groups</NavDropdown.Item>
    //   <NavDropdown.Divider />
    //   <NavDropdown.Item onClick={logMeOut}>Sign out</NavDropdown.Item>
    // </DropdownButton>
  );
}

export default UserMenu;
