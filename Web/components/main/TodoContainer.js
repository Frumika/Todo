"use strict"


import {Component} from "../../ui/Component.js";
import {TodoItem} from "../todoItem/TodoItem.js";
import {TodoApi} from "../../api/TodoApi.js";

export class TodoContainer extends Component {
    #todoItems = new Map();
    container = null;
    projectId = null;

    props = {
        todos: []
    };

    render() {
        const main = document.createElement("div");
        main.className = "todo-container";

        this.container = document.createElement("div");
        this.container.className = "todo-container__container";

        main.append(this.container);
        this.updateList();

        return main;
    }

    async setProject(projectId) {
        if (!projectId) return;

        this.projectId = projectId;

        const response = await TodoApi.getTodos(projectId);

        if (!response.ok) {
            console.log(response.data);
            return;
        }

        this.props.todos = (response.data.data ?? []).map(todo => ({
            ...todo,
            mode: "read"
        }));

        console.log("TODOS");
        console.log(this.props.todos);

        this.updateList();
    }

    updateList({ focusId = null, scrollMode = "nearest" } = {}) {
        const existingIds = new Set(this.#todoItems.keys());
        const newIds = new Set(this.props.todos.map(t => t.id));

        // remove
        existingIds.forEach(id => {
            if (!newIds.has(id)) {
                const comp = this.#todoItems.get(id);

                comp.elem.remove();
                this.#todoItems.delete(id);
            }
        });

        // create / update
        this.props.todos.forEach((todo, index) => {
            let todoItem = this.#todoItems.get(todo.id);

            if (!todoItem) {
                todoItem = new TodoItem();
                this.#todoItems.set(todo.id, todoItem);
                todoItem.mount(this.container);
            }

            todoItem.setProps({
                id: todo.id,
                title: todo.title,
                description: todo.description,
                isCompleted: todo.isCompleted,
                mode: todo.mode,

                onToggle: (id) => this.#handleToggle(id),
                onEdit: (id) => this.#handleEdit(id),
                onDelete: (id) => this.#handleDelete(id),
                onSave: (id, data) => this.#handleSave(id, data),
            });

            console.log("TODO ITEM")
            console.log(todoItem);

            todoItem.rerender();

            const currentNode = todoItem.elem;
            const expectedNode = this.container.children[index];

            if (currentNode !== expectedNode) {
                this.container.insertBefore(currentNode, expectedNode || null);
            }

            if (focusId === todo.id && todoItem?.elem) {
                todoItem.elem.scrollIntoView({
                    block: scrollMode,
                    behavior: "auto"
                });
            }
        });
    }

    async addTodoItem() {
        if (!this.projectId) return;

        await TodoApi.createTodo(this.projectId, {
            title: "",
            description: ""
        });

        await this.setProject(this.projectId);
    }

    #handleToggle(id) {
        const todo = this.props.todos.find(t => t.id === id);
        if (!todo) return;

        TodoApi.updateTodo({
            todoItemId: id,
            title: todo.title,
            description: todo.description,
            isCompleted: !todo.isCompleted
        }).then(() => this.setProject(this.projectId));
    }

    #handleEdit(id) {
        this.props.todos = this.props.todos.map(todo =>
            todo.id === id
                ? { ...todo, mode: "edit" }
                : { ...todo, mode: "read" }
        );

        this.updateList();
    }

    #handleSave(id, data) {
        TodoApi.updateTodo({
            todoItemId: id,
            title: data.title,
            description: data.description,
            isCompleted: this.props.todos.find(t => t.id === id)?.isCompleted ?? false
        }).then(() => this.setProject(this.projectId));
    }

    #handleDelete(id) {
        TodoApi.deleteTodo(id)
            .then(() => this.setProject(this.projectId));
    }
}