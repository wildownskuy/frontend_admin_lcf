import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";

import DefaultLayout from "./components/DefaultLayout";

import Student from "./views/Student";
import AddStudent from "./views/AddStudent";
import UpdateStudent from "./views/UpdateStudent";
import NotFound from "./views/NotFound";
import Pagination from "./views/Pagination";

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
                element: <Pagination />,
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
    }

])

export default router;