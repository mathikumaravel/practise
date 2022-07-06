import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
function Navigationbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <div>
            {localStorage.getItem("token") == null ? (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <Link to="/" style={{ margin: "1rem", textDecoration: "none", color: "white" }}>
                                Dashboard
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link>
                                    <NavLink to="/Todo" style={{ margin: "1rem", textDecoration: "none", color: "white" }}>
                                        Todo
                                    </NavLink>
                                </Nav.Link>
                                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item>
                                        <Link to="/Todo" style={{ margin: "1rem", textDecoration: "none", color: "black" }}>
                                            Todo
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <Link to="#action/3.4" style={{ margin: "1rem", textDecoration: "none", color: "black" }}>
                                            Separated link
                                        </Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav.Link>
                                    <NavLink to="/login" style={{ margin: "1rem", textDecoration: "none", color: "white" }}>
                                        <AiIcons.AiOutlineLogout />
                                        Login
                                    </NavLink>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            ) : (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <Link to="/" style={{ margin: "1rem", textDecoration: "none", color: "white" }}>
                                Dashboard
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link>
                                    <Link to="/Create" style={{ margin: "1rem", textDecoration: "none", color: "white" }}>
                                        New Admission
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/home" style={{ margin: "1rem", textDecoration: "none", color: "white" }}>
                                        List Of Student
                                    </Link>
                                </Nav.Link>
                                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                    <NavDropdown.Item>
                                        <Link to="/home" style={{ margin: "1rem", textDecoration: "none", color: "black" }}>
                                            List Of Student
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        <Link to="/Create" style={{ margin: "1rem", textDecoration: "none", color: "black" }}>
                                            New Admission
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <Link to="/Todo" style={{ margin: "1rem", textDecoration: "none", color: "black" }}>
                                            Todo
                                        </Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav.Link>
                                    <NavLink
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                        }}
                                        to="/"
                                        style={{ margin: "1rem", textDecoration: "none", color: "white" }}
                                    >
                                        <AiIcons.AiOutlineLogout onClick={showSidebar} />
                                        Logout
                                    </NavLink>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
        </div>
    );
}

export default Navigationbar;
