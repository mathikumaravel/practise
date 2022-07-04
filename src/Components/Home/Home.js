import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Table, ToastContainer } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
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
      <ToastContainer draggable={false} autoClose={3000}></ToastContainer>
      <Navbar></Navbar>
      <div className="container">
        <Card style={{ width: "200", marginTop: "4%" }}>
          <Card.Header>List of students</Card.Header>
          <Card.Body>
            <select
              value={student.value}
              // onChange={
              //   }
              onChange={(e) => {
                setAcademicYear(e.target.options[e.target.selectedIndex].text);
                // handleGradeFilter(gradeSectionList, e.target.value);
                // setAcademicYear(e.target.value)
              }}
            >
              <option value={value}>Select the Year</option>
              {student.map((data) => {
                // {console.log(data.academic_year)}

                return (
                  <option value={data.year_id}>{data.academic_year}</option>
                );
              })}
            </select>

            <Link to="/Create">
              <Button
                variant="primary"
                style={{
                  marginLeft: "5%",
                }}
              >
                add
              </Button>
            </Link>

            <Table striped bordered hover style={{ marginTop: "2%" }}>
              <thead>
                <tr>
                  <th scope="col">Student Name</th>
                  <th scope="col">Email Id</th>
                  <th scope="col">Admission No</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Grade</th>
                  <th scope="col">Section</th>
                  <th scopa="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {academicYearApi.map((key) => {
                  console.log(key[1][1].studentData);
                  return (
                    <tr>
                      <th scope="row">{key[1][1].studentData.student_name}</th>
                      <td>{key[1][1].studentData.email}</td>
                      <td>{key[1][1].studentData.admission_no}</td>
                      <td>{key[1][1].studentData.phone_number}</td>
                      <td>{key[1][1].studentData.grade_master}</td>
                      <td>{key[1][1].studentData.section}</td>
                      <td>{key[1][1].studentData.status}</td>
                    </tr>
                  );
                })}
                {academicYearApi && academicYearApi.length > 0 ? (
                  academicYearApi.map((item) => (
                    <div key={item.year_id}>{item.academic_year}</div>
                  ))
                ) : (
                  <p
                    style={{
                      fontSize: "32",
                      marginTop: "6%",
                      width: "400%",
                      marginLeft: "50%",
                    }}
                  >
                    No data
                  </p>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Home;
