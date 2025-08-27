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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        errorElement: <Error></Error>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/shop',
                element: <PrivateRoute><Shop></Shop></PrivateRoute>
            },
            {
                path: '/blog',
                element: <PrivateRoute><Blog></Blog></PrivateRoute>
            },
            {
                path: '/about',
                element: <PrivateRoute><About></About></PrivateRoute>
            },
            {
                path: '/career',
                element: <PrivateRoute><Career></Career></PrivateRoute>
            },
            {
                path: '/contact',
                element: <PrivateRoute><Contact></Contact></PrivateRoute>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/register',
                element: <Register></Register>
            },
            {
                path: '/auth/login',
                element: <Login></Login>
            }
        ]
    }
])