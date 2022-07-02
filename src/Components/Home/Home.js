import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  InputGroup,
  Table,
  ToastContainer,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const params = useParams();
  const token = localStorage.getItem("token");
  const [student, setStudent] = useState([]);
  const [academicYear, setAcademicYear] = useState([]);
  const [academicYearApi, setAcademicYearApi] = useState([]);

  const getInitialState = () => {
    const value = "please select the year";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const fetchStudent = () => {
    axios
      .get(`http://3.110.131.173:4000/api/v1/year`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setStudent(response.data.data);
        console.log(response.data);
      });
  };
  const fetchStudentByYear = () => {
    axios
      .post(`http://3.110.131.173:4000/api/v1/autoSearch`, {
        headers: { Authorization: `Bearer ${token}` },
        academic_year: academicYear,
      })
      .then((response) => {
        setAcademicYearApi(response.data.data);
        console.log(response.data);
      });
  };

  useEffect(() => {
    fetchStudentByYear();
  }, [academicYear]);
  useEffect(() => {
    fetchStudent();
  }, []);
  console.log(academicYearApi, "academicYearApi");

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <Card style={{ width: "200", marginTop: "4%" }}>
          <Card.Header>List of students</Card.Header>
          <Card.Body>
            <select
              value={value}
              // onChange={
              //   }
              onChange={(e) => {
                setAcademicYear(e.target.options[e.target.selectedIndex].text);
                // handleGradeFilter(gradeSectionList, e.target.value);
                // setAcademicYear(e.target.value)
              }}
            >
              <option value="none">Select the Year</option>
              {student.map((data) => {
                // {console.log(data.academic_year)}

                return (
                  <option value={data.year_id}>{data.academic_year}</option>
                );
              })}
            </select>

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
              {/* {Object.keys(academicYearApi).map((key) => {
                return (
                  <div key={key}>
                    <h1>{key}</h1>
                  </div>
                );
              })} */}
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
