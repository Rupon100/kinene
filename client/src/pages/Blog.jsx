import React, { useEffect } from 'react';
import axios from 'axios';
import useAuth from '../AuthProvider/useAuth';

const Blog = () => {
    const { user } = useAuth();
    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`http://localhost:4080/blog/${user?.email}`, {withCredentials: true});
            console.log(res.data);
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