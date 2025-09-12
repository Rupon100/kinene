import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import useRole from "../Hooks/useRole";

const Dashboard = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <header className="bg-slate-700 text-white flex items-center justify-between px-6 py-3 shadow-md">
        <Link to={'/'} className="text-lg font-bold">{user?.displayName || "My Site"}</Link>
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer px-3 py-1 rounded-md btn btn-neutral"
        >
          Back
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-gray-100 p-4 border-r">
          <nav className="space-y-2 flex md:flex-col flex-wrap gap-2">
            {role === "customer" && (
              <>
               <Link
                  to={'/dashboard/customer/white-list'}
                  className="px-3 cursor-pointer py-2 rounded-md bg-white shadow hover:bg-gray-200 w-full md:w-auto text-left"
                >
                  White List
                </Link>
               <Link
                  to={'/dashboard/customer/history'}
                  className="px-3 cursor-pointer py-2 rounded-md bg-white shadow hover:bg-gray-200 w-full md:w-auto text-left"
                >
                  Purchase history
                </Link>
              </>
            )}

            {role === "seller" && (
              <>
                <Link
                  to={'/dashboard/seller/add-product'}
                  className="px-3 cursor-pointer py-2 rounded-md bg-white shadow hover:bg-gray-200 w-full md:w-auto text-left"
                >
                  Add Product
                </Link>
                <Link
                  to={'/dashboard/seller/products'}
                  className="px-3 cursor-pointer py-2 rounded-md bg-white shadow hover:bg-gray-200 w-full md:w-auto text-left"
                >
                  My Products
                </Link>
                <Link
                  to={'/dashboard/seller/orders'}
                  className="px-3 cursor-pointer py-2 rounded-md bg-white shadow hover:bg-gray-200 w-full md:w-auto text-left"
                >
                  Orders
                </Link>
              </>
            )}

            {role === "admin" && (
              <>
                <button
                  onClick={() => navigate("/dashboard/manage-users")}
                  className="px-3 py-2 rounded-md bg-white shadow hover:bg-gray-200 w-full md:w-auto text-left"
                >
                  Manage Users
                </button>
                <button
                  onClick={() => navigate("/dashboard/manage-products")}
                  className="px-3 py-2 rounded-md bg-white shadow hover:bg-gray-200 w-full md:w-auto text-left"
                >
                  Manage Products
                </button>
                <button
                  onClick={() => navigate("/dashboard/site-settings")}
                  className="px-3 py-2 rounded-md bg-white shadow hover:bg-gray-200 w-full md:w-auto text-left"
                >
                  Site Settings
                </button>
              </>
            )}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
