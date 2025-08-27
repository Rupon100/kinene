import React from 'react';
import useAuth from '../AuthProvider/useAuth';
import { Navigate, useLocation } from 'react-router';
// import WholeSpiner from '../Common/WholeSpiner';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log("location from private Route: ", location?.pathname);

    // console.log(location)

    if(user){
        return children;
    }

    if(loading){
        return <h2>spining</h2>;
    }

    return <Navigate to={'/auth/login'} state={location?.pathname} replace ></Navigate>
};

export default PrivateRoute;