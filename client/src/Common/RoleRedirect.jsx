import React, { useEffect } from 'react';
import useRole from '../Hooks/useRole';
import { useNavigate } from 'react-router';

const RoleRedirect = () => {
    const { role } = useRole();
    const navigate = useNavigate();

    useEffect(() => {
        if(role == "seller") navigate('seller');
        if(role == "customer") navigate('customer');
        if(role == "admin") navigate('admin');
    }, [role, navigate])


    return  <h2>redirecting...</h2>
};

export default RoleRedirect;