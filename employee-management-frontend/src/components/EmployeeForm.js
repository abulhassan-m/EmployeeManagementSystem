import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const EmployeeForm = ({ employeeId, onSuccess }) => {
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        department: '',
    });
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        api.get('/departments/').then(res => setDepartments(res.data));
        if (employeeId) {
            api.get(`/employees/${employeeId}/`).then(res => setEmployee(res.data));
        }
    }, [employeeId]);

    const handleChange = e => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const request = employeeId
            ? api.put(`/employees/${employeeId}/`, employee)
            : api.post('/employees/', employee);
        request.then(onSuccess);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="first_name" value={employee.first_name} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="last_name" value={employee.last_name} onChange={handleChange} placeholder="Last Name" required />
            <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="phone_number" value={employee.phone_number} onChange={handleChange} placeholder="Phone Number" />
            <select name="department" value={employee.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
            </select>
            <button type="submit">Save</button>
        </form>
    );
};

export default EmployeeForm;
