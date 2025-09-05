import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../AuthProvider/useAuth";
import SocialLogin from "../Common/SocialLogin";
import axios from 'axios'
import toast from 'react-hot-toast'

const Register = () => {
  const { createUser } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log("destination from register: ", state);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.pass.value;

    createUser(email, pass)
    .then((result) => {
      const user = result?.user;
      const newUser = { email, pass, uid: user?.uid, type: 'customer' }; // also add here value from user so that user can delete from firebase also from database 
      console.log(newUser);

      axios.post(`http://localhost:4080/register`, newUser)
      .then(res => {
        console.log(res?.data);
        if(res?.data?.insertedId){
          return toast.success("User Created!");
        }
      })
      .catch(err => { 
        toast.error("Something wrong!!");
        console.log('backend error: ', err.message)
       })

      navigate(state || '/')
      form.reset();
    })
    .catch(err => {
      toast.error(err.message);
      console.log(err.message);
    })

  };
  
  

  return (
    <div className="w-full flex flex-col justify-center items-center">
        <h2 className="text-center mb-4 font-semibold text-xl md:text-2xl lg:text-3xl" >Register Now</h2>
      <form onSubmit={(e) => handleRegister(e)} className="border border-gray-200 rounded p-4 w-full max-w-xl flex flex-col justify-center flex-start">
        <div className="flex flex-col gap-2" >
          <label className="label">Email</label>
          <input name="email" type="email" className="input w-full" placeholder="Email" />
        </div>
        <div className="flex flex-col gap-2" >
          <label className="label">Password</label>
          <input name="pass" type="password" className="input w-full" placeholder="Password" />
        </div>
         
        <button className="btn btn-neutral mt-4">Register</button>
        {/* social login here */}
        <SocialLogin state={state} ></SocialLogin>

        <span className="text-sm mt-4" > Already Have Account? <Link state={state} className="link" to={'/auth/login'} >Login</Link></span>
      </form>
    </div>
  );
};

export default Register;
