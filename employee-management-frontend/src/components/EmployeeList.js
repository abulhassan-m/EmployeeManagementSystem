import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        api.get('/employees/')
            .then(response => setEmployees(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Employee List</h2>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.first_name} {employee.last_name} - {employee.department.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
