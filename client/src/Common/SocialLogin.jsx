import React from "react";
import useAuth from "../AuthProvider/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";

const SocialLogin = ({state}) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const handleSocialLogin = () => {
    googleLogin()
    .then((result) => {
        console.log("Google User: ", result?.user);
        console.log(state);
        navigate(state || '/')
    })
    .catch((error) => {
        console.log(error.message);
    })
  }

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
