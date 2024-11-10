import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Table, Container, Button } from 'react-bootstrap';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        api.get('/employees/')
            .then(response => setEmployees(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = id => {
        api.delete(`/employees/${id}/`).then(() => setEmployees(employees.filter(e => e.id !== id)));
    };

    return (
        <Container className="my-4">
            <h2>Employee List</h2>
            <Table striped bordered hover responsive className="shadow-sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.first_name} {employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone_number}</td>
                            <td>{employee.department.name}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(employee.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default EmployeeList;
