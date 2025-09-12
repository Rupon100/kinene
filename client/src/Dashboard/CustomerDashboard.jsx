import React from 'react';
import { Outlet } from 'react-router';

const CustomerDashboard = () => {
    return (
        <div>
            <h2>Customer dashboard</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default CustomerDashboard;