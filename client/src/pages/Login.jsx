import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h2 className="text-center mb-4 font-semibold text-xl md:text-2xl lg:text-3xl">
        Login Now
      </h2>
      <form className="border border-gray-200 rounded p-4 w-full max-w-xl flex flex-col justify-center flex-start">
        <div className="flex flex-col gap-2">
          <label className="label">Email</label>
          <input type="email" className="input w-full" placeholder="Email" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="label">Password</label>
          <input
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
        <button
          type="button"
          className="flex items-center justify-center btn btn-neutral mt-4"
        >
          <h2>Login With Google</h2> <FcGoogle />
        </button>
        <span className="text-sm mt-4">
          {" "}
          New here?{" "}
          <Link className="link" to={"/auth/register"}>
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
