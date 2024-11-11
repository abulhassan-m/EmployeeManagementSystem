import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        api.get('/departments/')
            .then(response => setDepartments(response.data))
            .catch(() => alert("Failed to load departments"));
    }, []);

    return (
        <Container className="my-4">
            <h2>Departments</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(department => (
                        <tr key={department.id}>
                            <td>{department.name}</td>
                            <td>
                                <Link to={`/departments/update/${department.id}`}>
                                    <Button variant="warning" size="sm" className="me-2">Edit</Button>
                                </Link>
                                <Link to={`/departments/delete/${department.id}`}>
                                    <Button variant="danger" size="sm">Delete</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Link to="/departments/add">
                <Button variant="primary">Add New Department</Button>
            </Link>
        </Container>
    );
};

export default DepartmentList;
