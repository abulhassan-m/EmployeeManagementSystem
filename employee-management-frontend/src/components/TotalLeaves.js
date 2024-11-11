import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import api from '../api/axios';

const TotalLeaves = () => {
    const [totalLeaves, setTotalLeaves] = useState(0);

    useEffect(() => {
        api.get('/employees/total-leaves/').then(res => setTotalLeaves(res.data.total_leaves));
    }, []);

    return (
        <Container className="my-4">
            <h2>Total Leaves Taken</h2>
            <Alert variant="info">Total leaves taken by all employees: {totalLeaves}</Alert>
        </Container>
    );
};

export default TotalLeaves;
