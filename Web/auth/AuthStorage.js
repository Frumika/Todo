"use strict"

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export class AuthStorage {
    static setAccessToken(token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }

    static getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    static removeAccessToken() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    static setRefreshToken(token) {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }

    static getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    static removeRefreshToken() {
        return localStorage.removeItem(REFRESH_TOKEN_KEY);
    }

    static clear() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
}