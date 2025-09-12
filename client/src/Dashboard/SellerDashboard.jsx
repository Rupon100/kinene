import React from 'react';
import { Outlet } from 'react-router';

const SellerDashboard = () => {
    return (
        <div>
            <h2>Seller dashboard</h2>
            <Outlet></Outlet>
        </div>
    );
};

export default SellerDashboard;