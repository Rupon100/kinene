import React from "react";
import useAuth from "../AuthProvider/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Services/useAxiosSecure";

const SocialLogin = ({ state }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleSocialLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      console.log("Google login User: ", user);
      
      await axiosSecure.post('/auth-google', {
        email: user?.email,
        uid: user?.uid,
        name: user?.displayName
      })

      navigate(state || '/');

    } catch (err) {
      console.log("Google login error: ", err.message);
    }
  };

  return (
    <button
      onClick={handleSocialLogin}
      type="button"
      className="flex items-center justify-center btn btn-neutral mt-4 gap-2"
    >
      <h2>Continue with Google</h2>
      <FcGoogle />
    </button>
  );
};

export default SocialLogin;
