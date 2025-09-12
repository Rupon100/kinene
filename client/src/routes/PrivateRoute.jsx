import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../AuthProvider/useAuth';
import useRole from '../Hooks/useRole';
 
const PrivateRoute = ({children, requiredRole}) => {
    const { user, loading: authLoading } = useAuth();
    const { role, loading: roleLoading } = useRole();
    const location = useLocation();

    console.log("router role and user role: ", requiredRole, role);
    
    if(authLoading || roleLoading){
        return <h2>loading.....</h2>;
    }
    

    if(!user){
        return <Navigate to={'/auth/login'} state={location?.pathname} replace ></Navigate>;
    }

    if(requiredRole && requiredRole !== role) return <Navigate to={'/'} replace ></Navigate>

    return children;
};

export default PrivateRoute;



 