import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthLayout from "../Layout/AuthLayout";
import Shop from "../pages/Shop";
import Blog from "../pages/Blog";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Career from "../pages/Career";
import PrivateRoute from "./PrivateRoute";
import CustomerProfile from "../Profile/CustomerProfile";
import SellerProfile from "../Profile/SellerProfile";
import AdminProfile from "../Profile/AdminProfile";
import Dashboard from "../Layout/Dashboard";
import SellerDashboard from "../Dashboard/SellerDashboard";
import AdminDashboard from "../Dashboard/AdminDashboard";
import CustomerDashboard from "../Dashboard/CustomerDashboard";
import RoleRedirect from "../Common/RoleRedirect";
import AddProducts from "../pages/DashboardPages/PagesSeller/AddProducts";
import MyProducts from "../pages/DashboardPages/PagesSeller/MyProducts";
import SellersOrders from "../pages/DashboardPages/PagesSeller/SellersOrders";
import WhiteList from "../pages/DashboardPages/PagesCustomer/WhiteList";
import PurchaseHistory from "../pages/DashboardPages/PagesCustomer/PurchaseHistory";
import ProductDetails from "../Common/ProductDetails";

export const router = createBrowserRouter([
  // root layout
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/shop",
        element: (
          <PrivateRoute>
            <Shop></Shop>
          </PrivateRoute>
        ),
      },
      {
        path: "/blog",
        element: (
          <PrivateRoute>
            <Blog></Blog>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <PrivateRoute>
            <About></About>
          </PrivateRoute>
        ),
      },
      {
        path: "/career",
        element: (
          <PrivateRoute>
            <Career></Career>
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <PrivateRoute>
            <Contact></Contact>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/customer",
        element: (
          <PrivateRoute requiredRole={"customer"}>
            <CustomerProfile></CustomerProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/seller",
        element: (
          <PrivateRoute requiredRole={"seller"}>
            <SellerProfile></SellerProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/admin",
        element: (
          <PrivateRoute>
            <AdminProfile></AdminProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
    ],
  },

  // dashboard layout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // seller paths and children
      {
        path: "seller",
        element: (
          <PrivateRoute requiredRole="seller">
            <SellerDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "add-product",
            element: (
              <PrivateRoute requiredRole="seller">
                <AddProducts></AddProducts>
              </PrivateRoute>
            ),
          },
          {
            path: "products",
            element: (
              <PrivateRoute requiredRole="seller">
                 <MyProducts></MyProducts>
              </PrivateRoute>
            ),
          },
          {
            path: "orders",
            element: (
              <PrivateRoute requiredRole="seller">
                <SellersOrders></SellersOrders>
              </PrivateRoute>
            ),
          },
        ],
      },
      // customer routes and paths
      {
        path: "customer",
        element: (
          <PrivateRoute requiredRole="customer">
            <CustomerDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'white-list',
            element: (
              <PrivateRoute requiredRole="customer">
                <WhiteList></WhiteList>
              </PrivateRoute>
            ),
          },
          {
            path: 'history',
            element: (
              <PrivateRoute requiredRole="customer">
                 <PurchaseHistory></PurchaseHistory>
              </PrivateRoute>
            ),
          }
        ]
      },
      // admin all route
      {
        path: "admin",
        element: (
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
    ],
  },
]);
