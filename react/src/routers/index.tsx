import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import GuestLayout from "../components/GuestLayout";
import { PATH, USER_FORM_KEY } from "../constants";
import {
    Dashboard,
    Login,
    NotFound,
    Register,
    UserForm,
    Users,
} from "../views";

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
                path: PATH.ADD_USER,
                element: <UserForm key={USER_FORM_KEY.ADD} />,
            },
            {
                path: PATH.EDIT_USER,
                element: <UserForm key={USER_FORM_KEY.EDIT} />,
            },
            {
                path: PATH.USER,
                element: <Users />,
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
