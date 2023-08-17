import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import GuestLayout from "../components/GuestLayout";
import { PATH } from "../constants";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";
import NotFound from "../views/NotFound";
import Register from "../views/Register";
import User from "../views/User";

const router = createBrowserRouter([
    {
        path: PATH.ROOT,
        element: <DefaultLayout />,
        children: [
            {
                path: PATH.ROOT,
                element: <Navigate to={PATH.DASHBOARD} />,
            },
            {
                path: PATH.DASHBOARD,
                element: <Dashboard />,
            },
            {
                path: PATH.USER,
                element: <User />,
            },
        ],
    },
    {
        path: PATH.ROOT,
        element: <GuestLayout />,
        children: [
            {
                path: PATH.LOGIN,
                element: <Login />,
            },
            {
                path: PATH.REGISTER,
                element: <Register />,
            },
        ],
    },
    {
        path: PATH.ANY,
        element: <NotFound />,
    },
]);

export default router;
