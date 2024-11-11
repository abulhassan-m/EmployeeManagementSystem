import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import api from '../api/axios';

const FilterEmployeesByDepartment = () => {
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    useEffect(() => {
        api.get('/departments/').then(res => setDepartments(res.data));
    }, []);

    const handleFilter = () => {
        api.get(`/employees/by-department/?department=${selectedDepartment}`)
            .then(res => setEmployees(res.data))
            .catch(() => alert("Failed to filter employees by department"));
    };

    return (
        <Container className="my-4">
            <h2>Filter Employees by Department</h2>
            <Form.Group className="mb-3">
                <Form.Label>Select Department</Form.Label>
                <Form.Select onChange={e => setSelectedDepartment(e.target.value)}>
                    <option value="">Choose a department</option>
                    {departments.map(dept => (
                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button onClick={handleFilter}>Filter</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr><th>Name</th><th>Email</th></tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.first_name} {emp.last_name}</td>
                            <td>{emp.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default FilterEmployeesByDepartment;
