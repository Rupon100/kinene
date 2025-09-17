import React from 'react';
import { Outlet } from 'react-router';

const CustomerDashboard = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default CustomerDashboard;