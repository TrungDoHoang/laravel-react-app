import { createContext, useContext, useState } from "react";
import { LOCAL_STORAGE_KEY } from "../constants";
import { UserI } from "../type";

const StateContext = createContext({
    user: {
        id: NaN,
        name: "",
        email: "",
        created_at: "",
        updated_at: "",
    },
    token: "",
    notification: "",
    setUser: (user: UserI) => {},
    setToken: (token: string) => {},
    setNotification: (notification: string) => {},
});

export const ContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<UserI>({
        id: NaN,
        name: "",
        email: "",
        created_at: "",
        updated_at: "",
    });
    const [token, _setToken] = useState(
        localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) ?? "",
    );
    const [notification, _setNotification] = useState("");

    const setToken = (token: string) => {
        _setToken(token);
        if (token) {
            localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, token);
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        }
    };

    const setNotification = (message: string) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setToken,
                setUser,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
