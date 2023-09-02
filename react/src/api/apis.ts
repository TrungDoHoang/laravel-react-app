import { API_PATH } from "../constants";
import { UserI, loginPayload, registerPayload } from "../type";
import axiosClient from "./axiosClient";

export const registerApi = (payload: registerPayload) =>
    axiosClient.post(API_PATH.REGISTER, payload);

export const loginApi = (payload: loginPayload) =>
    axiosClient.post(API_PATH.LOGIN, payload);

export const userApi = () => axiosClient.get(API_PATH.USER);

export const logoutApi = () => axiosClient.post(API_PATH.LOGOUT);

export const getUsersApi = () => axiosClient.get(API_PATH.USERS);

export const getUserApi = (id: string) =>
    axiosClient.get(API_PATH.USERS + `/${id}`);

export const createUserApi = () => axiosClient.post(API_PATH.USERS);

export const updateUserApi = () => axiosClient.put(API_PATH.USERS);

export const deleteUserApi = (u: UserI) =>
    axiosClient.delete(API_PATH.USERS + `/${u.id}`);
