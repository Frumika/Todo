"use strict"

import {HttpClient} from "./HttpClient.js";

const BASE_URL = "http://localhost:8801/api/todo_item";

export class TodoApi {

    static async getTodos(projectId) {
        return await HttpClient.get(
            `${BASE_URL}/all/${projectId}`,
        );
    }

    static async createTodo(projectId, data) {
        return await HttpClient.post(
            `${BASE_URL}/create/${projectId}`,
            data
        );
    }

    static async updateTodo(data) {
        return await HttpClient.patch(
            `${BASE_URL}/update`,
            data
        )
    }

    static async deleteTodo(itemId) {
        return await HttpClient.delete(
            `${BASE_URL}/all/${itemId}`,
        );
    }
}