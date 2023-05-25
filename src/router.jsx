import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";

import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Student from "./views/Student";
import AddStudent from "./views/AddStudent";
import UpdateStudent from "./views/UpdateStudent";
import NotFound from "./views/NotFound";

const router = createBrowserRouter([

    {
        path:'/',
        element: <DefaultLayout />,
        children: [
            {
                path:'/dashboard',
                element:<Navigate to='/' />
            },
            {
                path: '/',
                element:<Dashboard />,
            },
            {
                path: '/product',
                element: <Student />,
            },
            {
                path: '/product/add',
                element: <AddStudent />,
            },
            {
                path: '/product/:id/edit',
                element: <UpdateStudent />,
            },
            {
                path: '/product/notfound',
                element: <NotFound />,
            },
            


        ]
    },
  
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/login" />
            },
            {
                path: '/login',
                element: <Login />
            },  
            {
                path: '/signup',
                element: <Signup />
            },
            
        ],
    },

])

export default router;