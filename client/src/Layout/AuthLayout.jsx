import { FiX } from "react-icons/fi";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const navigate = useNavigate();
 
  const handleBackAuth = () => {
    navigate('/');
    // navigate(-1); // one step back using history
  }
  

  return (
    <div className="flex flex-col gap-4 p-6" >
      <button 
      className="btn w-fit"
      onClick={handleBackAuth} >
        <FiX></FiX>
      </button>
      <div className="min-h-screen flex justify-center items-center" >
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
