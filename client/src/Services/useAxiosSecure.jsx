 import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from '../AuthProvider/useAuth';
import { useNavigate } from 'react-router';
 

 const axiosInstance = axios.create({
    baseURL: "http://localhost:4080",
    withCredentials: true,
 })

 const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        const interceptor = axiosInstance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if(error.response){
                const status = error?.response?.status;
                if(status === 401 || status === 403){
                    console.log('error code: ', status);
                    logOut()
                    .then(() => {
                        console.log("Logged Out From interceptors!");
                        navigate('/auth/login');
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
                }
                return Promise.reject(error);
            }
        })

        return () => {
            axiosInstance.interceptors.response.eject(interceptor)
        }

    }, [logOut, navigate])

    return axiosInstance;
 };
 
 export default useAxiosSecure;