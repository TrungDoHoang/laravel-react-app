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
    setUser: (user: UserI) => {},
    setToken: (token: string) => {},
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
    const setToken = (token: string) => {
        _setToken(token);
        if (token) {
            localStorage.setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, token);
        } else {
            localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setToken,
                setUser,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
