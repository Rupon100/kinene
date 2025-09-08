import React from 'react';
import useAuth from '../AuthProvider/useAuth';
import { useEffect } from 'react';
import useAxiosSecure from '../Services/useAxiosSecure';
import { useState } from 'react';

const useRole = () => {
    const { user } = useAuth(); 
    const axiosSecure = useAxiosSecure();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchedRole = async() => {
            if(user?.email){
                try{
                    const res = await axiosSecure.get(`/users/${user?.email}`);
                    setRole(res?.data?.type);
                }catch(error){
                    console.log(error.message);
                }finally{
                    setLoading(false);
                }
            }
        }
        fetchedRole();
    }, [user?.email, axiosSecure]);

    return { role, loading };
};

export default useRole;