import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const Login = () => {
    let initialValue = {
        email: " ",
        password: " ",
    };
    const [user, setUser] = useState(initialValue);
    const handlechange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();
    const userlogin = () => {
        axios
            .post(`http://3.110.131.173:4000/api/v1/login`, user)

            .then((res) => {
                console.log(res.data);
                if (res.data.success === 1) {
                    localStorage.setItem("token", res.data.token);
                    navigate("/home");
                } else if (res.data.success === 0) alert("Invalid email or password");
            })
            .catch((error) => {
                console.log(error.message);
                // console.log(error.res);
                // console.log(error.res.data.data);
            });
    };

    return (
        <div>
            <Navbar></Navbar>
            <Form>
                <Card style={{ margin: "100px 430px", width: "40%", height: "280px" }}>
                    <Card.Header
                        style={{
                            backgroundColor: "#DCDCDC",
                            width: "100%",
                            fontSize: "30px",
                            fontFamily: "arial",
                            color: "red",
                            fontWeight: "bold",
                        }}
                    >
                        Login Form
                    </Card.Header>
                    <Card.Body className="mt-3">
                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm={3}>
                                Email:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control name="email" type="text" onChange={handlechange} className="form-control" placeholder="Enter email" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-4">
                            <Form.Label column sm={3}>
                                Password:
                            </Form.Label>
                            <Col sm={8}>
                                <Form.Control name="password" type="password" onChange={handlechange} className="form-control" placeholder="Enter password" />
                            </Col>
                        </Form.Group>

                        <Button className="mb-4" onClick={userlogin}>
                            Login
                        </Button>
                    </Card.Body>
                </Card>
            </Form>
        </div>
    );
};

export default Login;
