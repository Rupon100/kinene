import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from '../AuthProvider/useAuth'
import SocialLogin from "../Common/SocialLogin";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("destination from login: ", state);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const email = form.email.value;
  //   const pass = form.pass.value;
  //   const user = { email, pass };

  //   console.log(user);

  //   loginUser(email, pass)
  //   .then((currentUser) => {
  //     console.log(currentUser);

  //     axios.post(`http://localhost:4080/login`, {email,pass})
  //     .then(res => {
  //       console.log(res.data);
  //       toast.success(res?.data?.message);
  //     })
    
  //     form.reset();
  //     navigate(state || '/');
  //   })
  //   .catch(err => {
  //     toast.error("Auth invalid!");
  //     console.log(err);
  //   })
  // }
  
  const handleLogin = async (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const pass = form.pass.value;

  try {
    // 1️⃣ Check backend first
    const res = await axios.post('http://localhost:4080/login', { email, pass });
    console.log('Backend login success:', res.data);
    toast.success(res.data.message);

    const currentUser = await loginUser(email, pass); 
    console.log('Firebase login:', currentUser);


    form.reset();
    navigate(state || '/');

  } catch (err) {
    console.error('Login failed:', err);
    toast.error(err.response?.data?.message || 'Login failed!');
  }
};


  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-center mb-4 font-semibold text-xl md:text-2xl lg:text-3xl">
        Login Now
      </h2>
      <form onSubmit={(e) => handleLogin(e)} className="border border-gray-200 rounded p-4 w-full max-w-xl flex flex-col justify-center flex-start">
        <div className="flex flex-col gap-2">
          <label className="label">Email</label>
          <input name="email" type="email" className="input w-full" placeholder="Email" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label">Password</label>
          <input
          name="pass"
            type="password"
            className="input w-full"
            placeholder="Password"
          />
        </div>
        <div>
          <a className="link link-hover">Forgot password?</a>
          {/* will do that letter */}
        </div>
        <button className="btn btn-neutral mt-4">Login</button>
        {/* social login here */}
        <SocialLogin state={state} ></SocialLogin>
        
        <span className="text-sm mt-4">
          {" "}
          New here?{" "}
          <Link  
          state={state}
          className="link" 
          to={"/auth/register"}>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
