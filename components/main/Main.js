"use strict"


import {Component} from "../../ui/Component.js";
import {TodoItem} from "../todoItem/TodoItem.js";
import {TodoStorage} from "../../storage/TodoStorage.js";

export class Main extends Component {
    state = {
        todos: []
    };

    #commit() {
        TodoStorage.save(this.state.todos);
        this.rerender();
    }

    render() {
        this.state.todos = TodoStorage.load();

        const mainContainer = document.createElement("div");
        mainContainer.className = "main-container";

        this.state.todos.forEach(todo => {
            const todoItem = new TodoItem()
                .setProps({
                    id: todo.id,
                    title: todo.title,
                    description: todo.description,
                    isComplete: todo.isComplete,
                    mode: todo.mode,

                    onToggle: (id) => this.#handleToggle(id),
                    onEdit: (id) => this.#handleEdit(id),
                    onDelete: (id) => this.#handleDelete(id),
                    onSave: (id, data) => this.#handleSave(id, data),
                });

            todoItem.mount(mainContainer);
        });


        return mainContainer;
    }

    addTodoItem() {
        const newTodo = {
            id: crypto.randomUUID(),
            title: "",
            description: "",
            isComplete: false,
            mode: "edit"
        };

        this.state.todos = [...this.state.todos, newTodo];
        this.#commit();
    }

    #handleToggle(id) {
        this.state.todos = this.state.todos.map(todo =>
            todo.id === id
                ? {...todo, isComplete: !todo.isComplete}
                : todo
        );

        this.#commit();
    }

    #handleEdit(id) {
        this.state.todos = this.state.todos.map(todo =>
            todo.id === id
                ? {...todo, mode: "edit"}
                : todo
        );

        this.#commit();
    }

    #handleSave(id, data) {
        this.state.todos = this.state.todos.map(todo =>
            todo.id === id
                ? {
                    ...todo,
                    title: data.title,
                    description: data.description,
                    mode: "read"
                }
                : todo
        );

        this.#commit();
    }

    #handleDelete(id) {
        this.state.todos = this.state.todos.filter(todo => todo.id !== id);
        this.#commit();
    }
}