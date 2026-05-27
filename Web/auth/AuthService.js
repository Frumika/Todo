import {AuthApi} from "../api/AuthApi.js";
import {AuthStorage} from "./AuthStorage.js";

export class AuthService {
    static async login(login, password) {
        const response = await AuthApi.login({
            login,
            password,
        });

        if (!response.ok) {
            return response;
        }

        AuthStorage.setAccessToken(
            response.data.accessToken,
        );

        AuthStorage.setRefreshToken(
            response.data.refreshToken,
        );

        return response;
    }

    static async register(login, password) {
        const response = await AuthApi.register({login, password,});

        if (!response.ok) {
            return response;
        }

        AuthStorage.setAccessToken(
            response.data.accessToken,
        );

        AuthStorage.setRefreshToken(
            response.data.refreshToken,
        );

        return response;
    }

    static async logout() {
        const response = await AuthApi.logout();

        AuthStorage.clear();

        return response;
    }

    static isAuthorized() {
        return AuthStorage.getAccessToken() != null;
    }
}