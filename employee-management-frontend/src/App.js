import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './components/DepartmentList';
import EmployeeForm from './components/EmployeeForm';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import DeleteEmployee from './components/DeleteEmployee';
import AddDepartment from './components/AddDepartment';
import UpdateDepartment from './components/UpdateDepartment';
import DeleteDepartment from './components/DeleteDepartment';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const PrivateRoute = ({ children, adminOnly }) => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('is_staff') === 'true';

    if (!token) return <Navigate to="/login" />;  // Redirect to login if not logged in
    if (adminOnly && !isAdmin) return <Navigate to="/" />;  // Redirect to dashboard if not admin

    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />  {/* Set Dashboard as Home Page */}
                <Route path="/login" element={<Login />} />
                <Route path="/empform" element={<EmployeeForm />} />
                <Route path="/addemp" element={<AddEmployee />} />
                <Route path="/updateemp" element={<UpdateEmployee />} />
                <Route path="/delemp" element={<DeleteEmployee />} />
                <Route path="/departments" element={<DepartmentList />} />
                <Route path="/departments/add" element={<AddDepartment />} />
                <Route path="/departments/update/:id" element={<UpdateDepartment />} />
                <Route path="/departments/delete/:id" element={<DeleteDepartment />} />
                <Route
                    path="/employees"
                    element={
                        <PrivateRoute adminOnly={true}>
                            <EmployeeList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/departments"
                    element={
                        <PrivateRoute adminOnly={true}>
                            <DepartmentList />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;