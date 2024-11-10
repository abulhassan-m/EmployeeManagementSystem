// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const isAdmin = localStorage.getItem('is_staff') === 'true';

    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalDepartments: 0,
        employeesByDepartment: [],
        recentActivities: [],
    });
    const [chartData, setChartData] = useState({ labels: [], counts: [] });

    useEffect(() => {
        // Fetch total employees and departments
        const fetchStats = async () => {
            try {
                const employeesRes = await api.get('/employees/');
                const departmentsRes = await api.get('/departments/');
                const response = await api.get('/data/employee-distribution/');
                setChartData(response.data);
                const employeeCounts = departmentsRes.data.map(department => ({
                    departmentName: department.name,
                    count: employeesRes.data.filter(emp => emp.department === department.id).length,
                }));
                const recentActivities = employeesRes.data.slice(-5);
                setStats({
                    totalEmployees: employeesRes.data.length,
                    totalDepartments: departmentsRes.data.length,
                    employeesByDepartment: employeeCounts,
                    recentActivities,
                });
            } catch (error) {
                console.error('Error fetching stats', error);
            }
        };

        fetchStats();
    }, []);

    const data = {
        labels: stats.employeesByDepartment.map(item => item.departmentName),
        datasets: [
            {
                label: 'Employees per Department',
                data: stats.employeesByDepartment.map(item => item.count),
                backgroundColor: 'rgba(75,192,192,0.6)',
            },
        ],
    };

    return (
        <div>
            {/* Render Admin-Only Section */}
            {isAdmin && (
                <div>
                    <h3>Admin Options</h3>
                    <p><a href="/employees">Manage Employees</a></p>
                    <p><a href="/departments">Manage Departments</a></p>
                </div>
            )}
            <Container fluid>
            <Row className="my-4">
                <Col md={6} lg={3}>
                    <Card className="text-center shadow-sm">
                        <Card.Body>
                            <Card.Title>Total Employees</Card.Title>
                            <Card.Text className="display-4">{stats.totalEmployees}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3}>
                    <Card className="text-center shadow-sm">
                        <Card.Body>
                            <Card.Title>Total Departments</Card.Title>
                            <Card.Text className="display-4">{stats.totalDepartments}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col lg={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5>Employee Distribution by Department</h5>
                            <iframe
                                src="http://localhost:8000/api/plotly-chart/employee-distribution/"
                                width="100%"
                                height="500px"
                                style={{ border: 'none' }}
                                title="Employee Distribution Chart"
                            ></iframe>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h5>Recent Activity</h5>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.recentActivities.map((activity) => (
                                        <tr key={activity.id}>
                                            <td>{activity.first_name} {activity.last_name}</td>
                                            <td>{activity.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="text-center mt-4">
                <Col>
                    <Link to="/employees">
                        <Button variant="primary" className="m-2">View All Employees</Button>
                    </Link>
                    <Link to="/departments">
                        <Button variant="secondary" className="m-2">View All Departments</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
        </div>
        
    );
};

export default Dashboard;
