import React, { useState } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
} from "reactstrap";

const CNavbar = ({ title, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar style={{ backgroundColor: "#202b3d" }} dark expand="md">
      <NavbarBrand href="/">
        <i className={icon}></i> {title}
      </NavbarBrand>
      <NavbarToggler
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink className="text-light" href="/about">
              About
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

CNavbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

CNavbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default CNavbar;
