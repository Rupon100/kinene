import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import useAuth from "../AuthProvider/useAuth";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, logOut } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleClose = () => setIsOpen(false);

  const handleLogOut = async() => {
    try {

      const res = await axios.post(`http://localhost:4080/logout`, {}, {withCredentials: true});
      console.log(res.data)

      logOut()
        .then(() => {
          console.log("Logged Out!!!");
        })
        .catch((err) => {
          console.log(err.message);
        });

    } catch (err) {
      console.log("Logout token error!");
    }
  };

  const items = [
    { path: "/", name: "Home" },
    { path: "/shop", name: "Shop" },
    { path: "/blog", name: "Blog" },
    { path: "/about", name: "About" },
    { path: "/career", name: "Career" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar flex justify-between items-center max-w-6xl mx-auto relative">
        {/* Logo */}
        <div>
          <Link to={"/"} className="text-xl font-semibold">
            Kinene
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-8">
          {items.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              onClick={handleClose}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "text-gray-700 hover:text-blue-500 transition"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
          </div>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <Link to={"/auth/login"} className="btn">
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl p-2"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Dropdown (Nav links only) */}
        <div
          className={`absolute left-0 w-full bg-white flex flex-col items-center gap-4 py-6 transition-all duration-300 ease-in-out z-10 md:hidden
            ${
              isOpen
                ? "top-16 opacity-100 pointer-events-auto"
                : "-top-96 opacity-0 pointer-events-none"
            }
          `}
        >
          {items.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              onClick={handleClose}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold border-b-2 border-blue-500"
                  : "text-gray-700 hover:text-blue-500 transition"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
