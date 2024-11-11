import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../api/axios';

const AddEmployee = () => {
    // State to store employee data
    const [employeeData, setEmployeeData] = useState({
        first_name: '', last_name: '', date_of_birth: '', age: '',
        blood_group: '', height: '', weight: '', department: '',
        date_of_join: '', date_of_resign: '', no_of_leaves: 0,
        salary: '', education: '', experience: '', father_name: '',
        mother_name: '', spouse_name: '', no_of_children: 0, children_names: ''
    });

    // State to handle success or error message
    const [message, setMessage] = useState({ type: '', text: '' });

    // State to store departments for dropdown
    const [departments, setDepartments] = useState([]);

    // Fetch department options on component mount
    useEffect(() => {
        api.get('/departments/')
            .then(response => setDepartments(response.data))
            .catch(() => setMessage({ type: 'danger', text: "Failed to load departments." }));
    }, []);

    // Handle form input changes
    const handleChange = e => {
        const { name, value } = e.target;
        setEmployeeData(prevState => ({ ...prevState, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = e => {
        e.preventDefault();
        // Perform validation if needed
        if (!employeeData.first_name || !employeeData.last_name || !employeeData.date_of_birth) {
            setMessage({ type: 'danger', text: "First Name, Last Name, and Date of Birth are required." });
            return;
        }

        api.post('/employees/', employeeData)
            .then(() => setMessage({ type: 'success', text: "Employee added successfully!" }))
            .catch(() => setMessage({ type: 'danger', text: "Failed to add employee." }));
    };

    return (
        <Container className="my-4">
            <h2>Add Employee</h2>
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={employeeData.first_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={employeeData.last_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_of_birth"
                        value={employeeData.date_of_birth}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Blood Group</Form.Label>
                    <Form.Control
                        type="text"
                        name="blood_group"
                        value={employeeData.blood_group}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Height (cm)</Form.Label>
                    <Form.Control
                        type="number"
                        name="height"
                        value={employeeData.height}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Weight (kg)</Form.Label>
                    <Form.Control
                        type="number"
                        name="weight"
                        value={employeeData.weight}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Department</Form.Label>
                    <Form.Select name="department" onChange={handleChange}>
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date of Joining</Form.Label>
                    <Form.Control
                        type="date"
                        name="date_of_join"
                        value={employeeData.date_of_join}
                        onChange={handleChange}
                        
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control
                        type="number"
                        name="salary"
                        value={employeeData.salary}
                        onChange={handleChange}
                        
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Education</Form.Label>
                    <Form.Control
                        type="text"
                        name="education"
                        value={employeeData.education}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="experience"
                        value={employeeData.experience}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Father's Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="father_name"
                        value={employeeData.father_name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mother's Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="mother_name"
                        value={employeeData.mother_name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Spouse's Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="spouse_name"
                        value={employeeData.spouse_name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Number of Children</Form.Label>
                    <Form.Control
                        type="number"
                        name="no_of_children"
                        value={employeeData.no_of_children}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Children's Names</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="children_names"
                        value={employeeData.children_names}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit">Add Employee</Button>
            </Form>
        </Container>
    );
};

export default AddEmployee;
