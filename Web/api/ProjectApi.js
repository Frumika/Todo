"use strict"

import {HttpClient} from "./HttpClient.js";


const BASE_URL = "http://localhost:8801/api/project";

export class ProjectApi {

    static async getProjects() {
        return await HttpClient.get(
            `${BASE_URL}/projects`,
        );
    }

    static async createProject(data) {
        return await HttpClient.post(
            `${BASE_URL}/create`,
            data
        );
    }

    static async updateProject(data) {
        return await HttpClient.patch(
            `${BASE_URL}/update`,
            data
        );
    }

    static async deleteProject(projectId) {
        return await HttpClient.delete(
            `${BASE_URL}/delete/${projectId}`,
        );
    }
}