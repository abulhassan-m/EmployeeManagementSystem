import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import DepartmentList from './components/DepartmentList';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/employees" element={<EmployeeList />} />
                    <Route path="/departments" element={<DepartmentList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
