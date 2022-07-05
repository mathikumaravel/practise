import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      {localStorage.getItem("token") == null ? (
        <Container>
          <Card
            style={{ margin: "200px 380px", width: "40%", height: "280px" }}
          >
            <Card.Body>
              <Card.Title>Welcome</Card.Title>
              <Card.Link href="/Todo">Todo</Card.Link>
              <Card.Link href="/login">New Admission</Card.Link>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <Container>
          <Card
            style={{ margin: "200px 380px", width: "40%", height: "280px" }}
          >
            <Card.Body>
              <Card.Title>Welcome</Card.Title>
              <Card.Text>
                You can see the list of student and New admission form
              </Card.Text>
              <Card.Link href="/home">Todo</Card.Link>
              <Card.Link href="/Create">New Admission Form</Card.Link>
            </Card.Body>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default Dashboard;
