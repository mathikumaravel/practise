import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import * as SiIcons from "react-icons/si";
const Todo = () => {
  const [input, setInput] = useState("");
  const handlechange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Navbar></Navbar>
      <Container>
        <div>Welcome!</div>

        <Card style={{ margin: "200px 200px" }}>
          <div>
            <Card.Title
              style={{
                backgroundColor: "#DCDCDC",
                width: "100%",
                height: "100px",
                fontSize: "30px",
                fontFamily: "arial",
                fontWeight: "bold",
              }}
            >
              <p>
                <FaIcons.FaListAlt></FaIcons.FaListAlt> Just Another Todo App
              </p>
            </Card.Title>
          </div>
          <Card.Body>
            <Card.Title>Welcome!</Card.Title>
            <Card.Text>To get started,add some items to your list:</Card.Text>
            <InputGroup style={{ marginTop: "2%", marginLeft: "15%" }}>
              <Col sm={8}>
                <Form.Control
                  placeholder="Recipient's email"
                  aria-label=""
                  aria-describedby="basic-addon2"
                  onChange={handlechange}
                />
              </Col>
              <Button id="button-addon2" style={{ backgroundColor: "gray" }}>
                <SiIcons.SiAddthis
                  style={{
                    fontSize: "30px",
                    fontFamily: "arial",
                    fontWeight: "bold",
                  }}
                ></SiIcons.SiAddthis>
              </Button>
            </InputGroup>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Todo;
