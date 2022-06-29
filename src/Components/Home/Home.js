import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Table, ToastContainer } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const params = useParams();
  const token = localStorage.getItem("token");
  const [student, setStudent] = useState([]);

  const fetchStudent = () => {
    axios
      .get(`http://3.110.131.173:4000/api/v1/studentProfile/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setStudent(response.data.data);
        console.log(response.data);
      });
  };
  useEffect(() => {
    fetchStudent();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div class="container">
        <Card style={{ width: "200", marginTop: "4%" }}>
          <Card.Header>List of students</Card.Header>
          <Card.Body>
            <Link to="/Create">
              <Button variant="primary">add</Button>
            </Link>

            <Table striped bordered hover style={{ marginTop: "2%" }}>
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">DOB</th>
                  <th scope="col">Gender</th>
                  <th scopa="col">Email</th>
                  <th scope="col">Admission Date</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Admission No</th>
                  <th scope="col">Year Id</th>
                  <th scope="col">Student Type</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th scope="row"></th>
                  <td>{student.student_name}</td>
                  <td>{student.DOB}</td>
                  <td>{student.gender}</td>
                  <td>{student.email}</td>
                  <td>{student.admission_date}</td>
                  <td>{student.address}</td>
                  <td>{student.phone_number}</td>
                  <td>{student.admission_no}</td>
                  <td>{student.year_id}</td>
                  <td>{student.student_type}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
