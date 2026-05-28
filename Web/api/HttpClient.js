import {AuthStorage} from "../storage/AuthStorage.js";


const REFRESH_URL = "http://localhost:8801/api/auth/refresh";

export class HttpClient {
    static async send(url, options = {}, retry = true) {
        const accessToken = AuthStorage.getAccessToken();

        const headers = {
            ...options.headers,
        };

        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        let response = await fetch(url, {
            ...options,
            headers,
        });

        if (response.status === 401 && retry) {
            const refreshResult = await this.#refreshTokens();

            if (refreshResult.success) {
                response = await this.send(url, options, false);
            } else {
                AuthStorage.clear();
            }
        }

        return await this.#createResult(response);
    }

    static async #refreshTokens() {
        console.log("REFRESH REQUEST");

        const refreshToken = AuthStorage.getRefreshToken();

        const response = await fetch(REFRESH_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refreshToken,
            }),
        });

        if (!response.ok) {
            return {
                success: false,
            };
        }

        const data = await response.json();

        AuthStorage.setAccessToken(data.accessToken);
        AuthStorage.setRefreshToken(data.refreshToken);

        return {
            success: true,
        };
    }

    static async #createResult(response) {
        let data = null;

        try {
            data = await response.json();
        } catch {
        }

        return {
            ok: response.ok,
            status: response.status,
            data,
        };
    }

    static async get(url) {
        return await this.send(url, {
            method: "GET",
        });
    }

    static async post(url, body) {
        return await this.send(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    static async put(url, body) {
        return await this.send(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    static async patch(url, body){
        return await this.send(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }

    static async delete(url, body) {
        return await this.send(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    }
}