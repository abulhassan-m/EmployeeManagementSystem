import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const UpdateEmployee = () => {
    const { id } = useParams();
    const [employeeData, setEmployeeData] = useState({});
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        api.get(`/employees/${id}/`).then(response => setEmployeeData(response.data));
    }, [id]);

    const handleChange = e => setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        api.put(`/employees/${id}/`, employeeData)
            .then(() => setSuccess("Employee updated successfully!"))
            .catch(() => setSuccess("Failed to update employee"));
    };

    return (
        <Container className="my-4">
            <h2>Update Employee</h2>
            {success && <Alert variant={success.startsWith("Failed") ? "danger" : "success"}>{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" value={employeeData.first_name || ''} onChange={handleChange} required />
                </Form.Group>
                {/* Repeat Form.Group for other fields */}
                <Button type="submit">Update Employee</Button>
            </Form>
        </Container>
    );
};

export default UpdateEmployee;