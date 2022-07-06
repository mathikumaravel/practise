import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Create = () => {
    let initialValue = {
        admission_no: "",
        student_name: "",
        from_grade: "",
        DOB: "",
        gender: "",
        email: "",
        admission_date: "",
        year_id: 0,
        grade_id: "",
        grade_section_id: "",
        previous_school_info: "",
        father_name: "",
        father_occupation: "",
        address: "",
        phone_number: "",
        alt_phone_number: "",
        student_type: "",
    };
    console.log(initialValue);
    const token = localStorage.getItem("token");
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const [newAdmission, setNewAdmission] = useState(initialValue);
    const [academicYear, setAcademicYear] = useState([]);
    const [fromGrade, setFromGrade] = useState([]);
    const [fromSection, setFromSection] = useState([]);

    const getInitialState = () => {
        const value = "please select the year";
        return value;
    };

    const [value, setValue] = useState(getInitialState);

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    const handlechange = (e) => {
        setNewAdmission({ ...newAdmission, [e.target.name]: e.target.value });
    };
    const fetchYear = () => {
        axios
            .get(`http://3.110.131.173:4000/api/v1/year`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setAcademicYear(response.data.data);
                console.log(response.data);
            });
    };
    const fetchFromGrade = () => {
        axios
            .get(`http://3.110.131.173:4000/api/v1/grademaster`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setFromGrade(response.data.data);
                console.log(response.data);
            });
    };
    const fetchFromSection = () => {
        axios
            .get(`http://3.110.131.173:4000/api/v1/gradeSection`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setFromSection(response.data.data);
                console.log(response.data);
            });
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
                if (res.data.status === true && res.data.message === "NewAdmission inserted 🥳 🥳") {
                    // navigate("/home");
                    toast.success("Successfully Added");
                } else if (res.data.status === true && res.data.message === "NewAdmission already present ⛔ ⛔") {
                    toast.warning("Data already added");
                } else if (res.data.status === true && res.data.message === "Please fill The Year of Fee") {
                    toast.error("Please fill The Year of Fee");
                }
            })
            .catch((error) => {
                console.log(error);
                console.log(error.res);
                console.log(error.res.data.data);
            });
    };
    const handleSubmit = () => {
        setFormErrors(validate(newAdmission));
    };
    const validate = (newAdmission) => {
        const errors = {};
        if (!newAdmission.student_name) {
            errors.student_name = "Student name is required!";
        }
        if (!newAdmission.DOB) {
            errors.DOB = "Date of birth is required!";
        }
        if (!newAdmission.gender) {
            errors.gender = "Gender is required!";
        }
        if (!newAdmission.email) {
            errors.email = "Email address is required!";
        } else if (!/\S+@\S+\.\S+/.test(newAdmission.email)) {
            errors.email = "Email address is invalid!";
        }
        if (!newAdmission.admission_date) {
            errors.admission_date = "Admission Date is required!";
        }
        if (!newAdmission.previous_school_info) {
            errors.previous_school_info = "Previous School Info is required!";
        }
        if (!newAdmission.father_name) {
            errors.father_name = "Father Name is required!";
        }
        if (!newAdmission.father_occupation) {
            errors.father_occupation = "Father Occupation is required!";
        }
        if (!newAdmission.address) {
            errors.address = "Address is required!";
        }
        if (!newAdmission.admission_no) {
            errors.admission_no = "Admission No is required!";
        }

        // if (!newAdmission.year_id) {
        //   errors.year = "year is required!";
        // }
        if (!newAdmission.student_type) {
            errors.student_type = "Student Type is required!";
        }
        if (!newAdmission.phone_number) {
            errors.phone_number = "Mobile No is required!";
        } else if (newAdmission.phone_number.trim().length !== 10) {
            errors.phone_number = "Please enter a valid Mobile number!";
        }
        if (!newAdmission.alt_phone_number) {
            errors.alt_phone_number = "Mobile No is required!";
        } else if (newAdmission.alt_phone_number.trim().length !== 10) {
            errors.alt_phone_number = "Please enter a valid Mobile number!";
        }

        return errors;
    };
    useEffect(() => {
        fetchYear();
    }, []);
    useEffect(() => {
        fetchFromGrade();
    }, []);
    useEffect(() => {
        fetchFromSection();
    }, []);
    return (
        <div>
            <div>
                <Navbar></Navbar>
                <ToastContainer draggable={false} autoClose={3000}></ToastContainer>
                <div class="container">
                    <Card style={{ margin: "80px 230px", width: "60%", marginTop: "6%" }}>
                        <Card.Header>New Admission Form</Card.Header>
                        <Card.Body>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm={3}>
                                    Admission No
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control name="admission_no" type="text" onChange={handlechange} />
                                </Col>
                            </Form.Group>
                            <p>{formErrors.admission_no}</p>
                            <Form>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Student Name
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control name="student_name" type="text" onChange={handlechange} />
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.student_name}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        DOB
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control name="DOB" type="date" onChange={handlechange} />
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.DOB}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        From Grade
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Select value={newAdmission.value} name="from_grade" id="inputState" class="form-control" onChange={handlechange}>
                                            <option value={value}>Select</option>
                                            {fromGrade &&
                                                fromGrade.map((data) => {
                                                    return <option value={data.grade_master_id}>{data.grade_master}</option>;
                                                })}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.from_grade}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Gender
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Select name="gender" id="inputState" class="form-control" onChange={handlechange}>
                                            <option selected>--select the gender--</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.gender}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Email
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control name="email" type="text" onChange={handlechange} />
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.email}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Admission Date
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control name="admission_date" type="date" onChange={handlechange} />
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.admission_date}</p>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Academic Year
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Select value={newAdmission.value} name="year_id" id="inputState" class="form-control" onChange={handlechange}>
                                            <option value={value}>Select the year</option>
                                            {academicYear &&
                                                academicYear.map((data) => {
                                                    return <option value={data.year_id}>{data.academic_year}</option>;
                                                })}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.year}</p>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        To Grade
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Select value={newAdmission.value} name="grade_id" id="inputState" class="form-control" onChange={handlechange}>
                                            <option value={value}>Select</option>
                                            {fromGrade &&
                                                fromGrade.map((data) => {
                                                    return <option value={data.grade_master_id}>{data.grade_master}</option>;
                                                })}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.to_grade}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Section
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Select value={newAdmission.value} name="grade_section_id" id="inputState" class="form-control" onChange={handlechange}>
                                            <option value={value}>Select the section</option>
                                            {fromSection &&
                                                fromSection.map((data) => {
                                                    return <option value={data.grade_section_id}>{data.section}</option>;
                                                })}
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.year}</p>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Previous School Info
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control name="previous_school_info" type="text" onChange={handlechange} />
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.previous_school_info}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Father Name
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control name="father_name" type="text" onChange={handlechange} />
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.father_name}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Father Occupation
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control name="father_occupation" type="text" onChange={handlechange} />
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.father_occupation}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Address
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control name="address" type="text" onChange={handlechange} />
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.address}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Phone Number
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control name="phone_number" type="text" onChange={handlechange} />
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.phone_number}</p>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Alt Phone Number
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Control name="alt_phone_number" type="text" onChange={handlechange} />
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.alt_phone_number}</p>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>
                                        Student type
                                    </Form.Label>
                                    <Col sm={8}>
                                        <Form.Select name="student_type" id="inputState" class="form-control" onChange={handlechange}>
                                            <option selected>--select the student type--</option>
                                            <option value="Days Scholar">Days Scholar</option>

                                            <option value="Hostel">Hostel</option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <p>{formErrors.student_type}</p>

                                <Button
                                    variant="primary"
                                    onClick={function () {
                                        {
                                            addNewAdmission();
                                        }
                                        {
                                            handleSubmit();
                                        }
                                    }}
                                >
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
