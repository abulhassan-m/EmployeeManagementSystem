// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalDepartments: 0,
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
                setStats({
                    totalEmployees: employeesRes.data.length,
                    totalDepartments: departmentsRes.data.length,
                });
            } catch (error) {
                console.error('Error fetching stats', error);
            }
        };

        fetchStats();
    }, []);

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Employees per Department',
                data: chartData.counts,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <div>
                    <h2>Total Employees</h2>
                    <p>{stats.totalEmployees}</p>
                </div>
                <div>
                    <h2>Total Departments</h2>
                    <p>{stats.totalDepartments}</p>
                </div>
            </div>
            <h3>Interactive Employee Distribution Chart</h3>
            <iframe
                src="http://localhost:8000/api/plotly-chart/employee-distribution/"
                width="100%"
                height="500px"
                style={{ border: 'none' }}
                title="Employee Distribution Chart"
            ></iframe>
        </div>
    );
};

export default Dashboard;
