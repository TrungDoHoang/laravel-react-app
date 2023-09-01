import { API_PATH } from "../constants";
import { loginPayload, registerPayload } from "../type";
import axiosClient from "./axiosClient";

export const registerApi = (payload: registerPayload) =>
    axiosClient.post(API_PATH.REGISTER, payload);

export const loginApi = (payload: loginPayload) =>
    axiosClient.post(API_PATH.LOGIN, payload);

export const userApi = () => axiosClient.get(API_PATH.USER);
