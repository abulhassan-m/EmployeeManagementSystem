import React, { useState } from 'react';
import { Container, Form, Table, Button } from 'react-bootstrap';
import api from '../api/axios';

const SearchEmployees = () => {
    const [query, setQuery] = useState("");
    const [employees, setEmployees] = useState([]);

    const handleSearch = () => {
        api.get(`/employees/?search=${query}`)
            .then(res => setEmployees(res.data))
            .catch(() => alert("Search failed"));
    };

    return (
        <Container className="my-4">
            <h2>Search Employees by Education or Experience</h2>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Enter education or experience keyword"
                    onChange={e => setQuery(e.target.value)}
                />
            </Form.Group>
            <Button onClick={handleSearch}>Search</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr><th>Name</th><th>Education</th><th>Experience</th></tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.first_name} {emp.last_name}</td>
                            <td>{emp.education}</td>
                            <td>{emp.experience}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default SearchEmployees;
