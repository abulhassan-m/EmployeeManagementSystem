import React from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const DeleteEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleDelete = () => {
        api.delete(`/employees/${id}/`)
            .then(() => {
                alert("Employee deleted successfully!");
                navigate('/employees');
            })
            .catch(() => alert("Failed to delete employee"));
    };

    return (
        <Container className="my-4">
            <h2>Delete Employee</h2>
            <Alert variant="danger">Are you sure you want to delete this employee?</Alert>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Container>
    );
};

export default DeleteEmployee;
