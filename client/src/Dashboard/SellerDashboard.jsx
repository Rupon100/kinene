import React from 'react';
import { Outlet } from 'react-router';

const SellerDashboard = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default SellerDashboard;