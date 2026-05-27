import {ProjectApi} from "../api/ProjectApi.js";

export class ProjectService {
    static #projects = [];
    static #selectedProjectId = null;

    static get projects() {
        return this.#projects;
    }

    static get selectedProjectId() {
        return this.#selectedProjectId;
    }

    static setSelectedProject(id) {
        this.#selectedProjectId = id;
    }

    static async getProjects() {
        const response = await ProjectApi.getProjects();

        if (!response.ok) {
            return response;
        }

        this.#projects = response.data;

        return response;
    }

    static async createProject(name = "") {
        const response = await ProjectApi.createProject({name});

        if (!response.ok) {
            return response;
        }

        await this.getProjects();

        return response;
    }

    static async updateProject(id, name = "") {
        const response = await ProjectApi.updateProject({id, name,});

        if (!response.ok) {
            return response;
        }

        await this.getProjects();

        return response;
    }

    static async deleteProject(projectId) {
        const response = await ProjectApi.deleteProject(projectId);

        if (!response.ok) {
            return response;
        }

        this.#projects = this.#projects.filter(p => p.id !== projectId);

        if (this.#selectedProjectId === projectId) {
            this.#selectedProjectId = null;
        }

        return response;
    }
}