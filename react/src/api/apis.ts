import { API_PATH } from "../constants";
import { registerPayload } from "../type";
import axiosClient from "./axiosClient";

export const registerApi = (payload: registerPayload) =>
    axiosClient.post(API_PATH.REGISTER, payload);
