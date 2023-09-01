import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { PATH } from "../../constants";
import { useEffect } from "react";
import { userApi } from "../../api/apis";

const DefaultLayout = () => {
    const { user, token, setToken, setUser } = useStateContext();
    const logoutHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setToken("");
    };

    if (!token) {
        return <Navigate to={PATH.LOGIN} />;
    }

    useEffect(() => {
        userApi().then((res) => setUser(res.data));
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to={PATH.DASHBOARD}>Dashboard</Link>
                <Link to={PATH.USER}>User</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user?.name}{" "}
                        <a onClick={logoutHandler} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
