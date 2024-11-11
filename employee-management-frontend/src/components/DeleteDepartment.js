import React from 'react';
import { Button, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const DeleteDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        api.delete(`/departments/${id}/`)
            .then(() => {
                alert("Department deleted successfully!");
                navigate('/departments');
            })
            .catch(() => alert("Failed to delete department"));
    };

    return (
        <Container className="my-4">
            <h2>Delete Department</h2>
            <Alert variant="danger">Are you sure you want to delete this department?</Alert>
            <Button variant="danger" onClick={handleDelete}>Delete Department</Button>
        </Container>
    );
};

export default DeleteDepartment;
