import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        api.get('/departments/')
            .then(response => setDepartments(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Department List</h2>
            <ul>
                {departments.map(department => (
                    <li key={department.id}>{department.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentList;
