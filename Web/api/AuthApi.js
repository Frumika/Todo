"use strict"

import {AuthStorage} from "../auth/AuthStorage.js";
import {HttpClient} from "./HttpClient.js";

const BASE_URL = "http://localhost:8801/api/auth";

export class AuthApi {
    static async login(data) {
        return await HttpClient.post(
            `${BASE_URL}/login`,
            data,
        );
    }

    static async register(data) {
        return await HttpClient.post(
            `${BASE_URL}/register`,
            data,
        );
    }

    static async logout() {
        return await HttpClient.delete(
            `${BASE_URL}/logout`,
            {
                refreshToken: AuthStorage.getRefreshToken(),
            },
        );
    }

    static async logoutAll() {
        return await HttpClient.delete(
            `${BASE_URL}/logout_all`,
            {
                refreshToken: AuthStorage.getRefreshToken(),
            },
        );
    }
}