export const PATH = {
    ANY: "*",
    ROOT: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    USERS: "/users",
    ADD_USER: "/users/add",
    EDIT_USER: "/users/:id",
    DASHBOARD: "/dashboard",
};

export const API_PATH = {
    LOGIN: "/login",
    REGISTER: "/register",
    USER: "/user",
    LOGOUT: "/logout",
    USERS: "/users",
};

export enum LOCAL_STORAGE_KEY {
    ACCESS_TOKEN = "ACCESS_TOKEN",
}

export enum USER_FORM_KEY {
    ADD = "add",
    EDIT = "edit",
}
