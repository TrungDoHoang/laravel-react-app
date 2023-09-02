export const PATH = {
    ANY: "*",
    ROOT: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    USER: "/user",
    ADD_USER: "/user/add",
    EDIT_USER: "/user/:id",
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
