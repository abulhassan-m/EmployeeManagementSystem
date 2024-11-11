import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../api/axios';

const AddDepartment = () => {
    const [departmentData, setDepartmentData] = useState({ name: '' });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = e => {
        setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!departmentData.name) {
            setMessage({ type: 'danger', text: "Department name is required." });
            return;
        }

        api.post('/departments/', departmentData)
            .then(() => setMessage({ type: 'success', text: "Department added successfully!" }))
            .catch(() => setMessage({ type: 'danger', text: "Failed to add department." }));
    };

    return (
        <Container className="my-4">
            <h2>Add Department</h2>
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
                <Button type="submit">Add Department</Button>
            </Form>
        </Container>
    );
};

export default AddDepartment;
