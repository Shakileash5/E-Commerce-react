import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { AiOutlineUser,AiOutlineShoppingCart } from 'react-icons/ai';

const Styles = styled.div`
  .navbar { background-color: #008ECC; }
  a, .navbar-nav, .navbar-light .nav-link {
    font-size: 1.1em;
    color: white;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.6em;
    color: white;
    font-type:bold;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
export const NavigationBar = () => (
  
  <Styles>
    <Navbar expand="lg">

      <Navbar.Brand href="/"><img
          src="https://cdn.iconscout.com/icon/free/png-256/ecommerce-1742874-1479711.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
          style={{marginRight:10+'px',marginTop:5}}
        />OFE</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          
          <Nav.Item>
          <Nav.Link href="/"><AiOutlineUser style={{marginBottom:5}} /> Account</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/about"><AiOutlineShoppingCart style={{marginBottom:5}} /> Cart</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)
