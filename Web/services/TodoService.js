import {TodoStorage} from "../storage/TodoStorage.js";
import {AuthService} from "./AuthService.js";
import {TodoApi} from "../api/TodoApi.js";

export class TodoService {

    static async getTodos(projectId = null) {

        if (AuthService.isAuthorized()) {
            const response =
                await TodoApi.getTodos(projectId);

            if (!response.ok) {
                return response;
            }

            return {
                ok: true,
                data: response.data.data,
            };
        }

        return {
            ok: true,
            data: TodoStorage.load(),
        };
    }

    static async createTodo(projectId, todo) {

        if (AuthService.isAuthorized()) {
            return await TodoApi.createTodo(
                projectId,
                todo,
            );
        }

        const todos = TodoStorage.load();

        const newTodos = [
            ...todos,
            todo,
        ];

        TodoStorage.save(newTodos);

        return {
            ok: true,
            data: todo,
        };
    }

    static async updateTodo(todo) {

        if (AuthService.isAuthorized()) {
            return await TodoApi.updateTodo(todo);
        }

        const todos = TodoStorage.load();

        const updatedTodos = todos.map(t =>
            t.id === todo.id
                ? todo
                : t
        );

        TodoStorage.save(updatedTodos);

        return {
            ok: true,
            data: todo,
        };
    }

    static async deleteTodo(id) {

        if (AuthService.isAuthorized()) {
            return await TodoApi.deleteTodo(id);
        }

        const todos = TodoStorage.load();

        TodoStorage.save(
            todos.filter(t => t.id !== id)
        );

        return {
            ok: true,
        };
    }
}