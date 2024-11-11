import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const UpdateDepartment = () => {
    const { id } = useParams();
    const [departmentData, setDepartmentData] = useState({ name: '' });
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        api.get(`/departments/${id}/`)
            .then(response => setDepartmentData(response.data))
            .catch(() => setMessage({ type: 'danger', text: "Failed to load department data." }));
    }, [id]);

    const handleChange = e => {
        setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        api.put(`/departments/${id}/`, departmentData)
            .then(() => setMessage({ type: 'success', text: "Department updated successfully!" }))
            .catch(() => setMessage({ type: 'danger', text: "Failed to update department." }));
    };

    return (
        <Container className="my-4">
            <h2>Update Department</h2>
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={departmentData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit">Update Department</Button>
            </Form>
        </Container>
    );
};

export default UpdateDepartment;
