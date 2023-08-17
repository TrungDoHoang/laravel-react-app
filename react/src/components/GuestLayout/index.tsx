import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { PATH } from "../../constants";

const GuestLayout = () => {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to={PATH.DASHBOARD} />;
    }
    return (
        <div id="guestLayout">
            <div className="login-signup-form animated fadeInDown">
                <div className="form">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default GuestLayout;
