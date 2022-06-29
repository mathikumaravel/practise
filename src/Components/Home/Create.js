import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Create = () => {
  let initialValue = {
    student_name: " ",
    DOB: " ",
    gender: " ",
    email: " ",
    admission_date: " ",
    grade_id: " ",
    grade_section_id: " ",
    previous_school_info: " ",
    father_name: " ",
    father_occupation: " ",
    address: " ",
    phone_number: " ",
    alt_phone_number: " ",
    admission_no: " ",
    from_grade: " ",
    year_id: " ",
    student_type: " ",
  };
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [newAdmission, setNewAdmission] = useState(initialValue);
  const handlechange = (e) => {
    setNewAdmission({ ...newAdmission, [e.target.name]: e.target.value });
  };
  const addNewAdmission = () => {
    axios
      .post(`http://3.110.131.173:4000/api/v1/newAdmission`, newAdmission, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (
          res.data.status === true &&
          res.data.message === "NewAdmission inserted 🥳 🥳"
        ) {
          toast.success("Successfully Added");
          navigate("/home");
        } else if (
          res.data.status === true &&
          res.data.message === "NewAdmission already present ⛔ ⛔"
        ) {
          toast("Data already added");
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.res);
        console.log(error.res.data.data);
      });
  };
  return (
    <div>
      <div>
        <Navbar></Navbar>
        <ToastContainer draggable={false} autoClose={3000}></ToastContainer>
        <div class="container">
          <Card
            style={{ margin: "100px 300px", width: "60%", marginTop: "6%" }}
          >
            <Card.Header>New Admission Form</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Student Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="student_name"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    DOB
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="DOB"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Gender
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Select
                      name="gender"
                      id="inputState"
                      class="form-control"
                      onChange={handlechange}
                    >
                      <option selected>--select the gender--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Email
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="email"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Admission Date
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="admission_date"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Grade Id
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="grade_id"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Grade Section Id
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="grade_section_id"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Previous School Info
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="previous_school_info"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Father Name
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="father_name"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Father Occupation
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="father_occupation"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Address
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="address"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Phone Number
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="phone_number"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Alt Phone Number
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="alt_phone_number"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Admission No
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="admission_no"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    From Grade
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="from_grade"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Year Id
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="year_id"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Student Type
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      name="student_type"
                      type="text"
                      onChange={handlechange}
                    />
                  </Col>
                </Form.Group>
                <Button variant="primary" onClick={addNewAdmission}>
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Create;
