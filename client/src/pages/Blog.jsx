import React, { useEffect } from 'react';
import useAuth from '../AuthProvider/useAuth';
import useAxiosSecure from '../Services/useAxiosSecure';

const Blog = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
     
    useEffect(() => {
        const fetchData = async() => {
            await axiosSecure.get(`blog/${user?.email}`, {withCredentials: true})
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
            
        }
        fetchData();
    }, [user?.email])
    return (
        <div>
            this is blog page for website
        </div>
    );
};

export default Blog;