"use strict"


import {Component} from "../../ui/Component.js";
import {TodoItem} from "../todoItem/TodoItem.js";
import {TodoStorage} from "../../storage/TodoStorage.js";
import {TodoService} from "../../services/TodoService.js";

export class TodoContainer extends Component {
    #todoItems = new Map();
    container = null;

    props = {
        todos: TodoStorage.load()
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

    async init(projectId = null) {
        this.projectId = projectId;

        const response = await TodoService.getTodos(projectId);

        if (!response.ok) {
            console.log(response.data);
            return;
        }

        this.props.todos = response.data ?? [];

        this.updateList();
    }

    updateList({focusId = null, scrollMode = "nearest"} = {}) {
        const existingIds = new Set(this.#todoItems.keys());
        const newIds = new Set(this.props.todos.map(t => t.id));

        existingIds.forEach(id => {
            if (!newIds.has(id)) {
                const comp = this.#todoItems.get(id);

                comp.elem.remove();
                this.#todoItems.delete(id);
            }
        });

        this.props.todos.forEach((todo, index) => {
            let comp = this.#todoItems.get(todo.id);

            // Удаление
            if (!comp) {
                comp = new TodoItem();
                this.#todoItems.set(todo.id, comp);

                comp.mount(this.container);
            }

            // Создание \ Обновление
            comp.setProps({
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

            comp.rerender();

            const currentNode = comp.elem;
            const expectedNode = this.container.children[index];

            if (currentNode !== expectedNode) {
                this.container.insertBefore(currentNode, expectedNode || null);
            }


            // Фокус на активном элементе
            if (focusId) {
                const comp = this.#todoItems.get(focusId);

                if (comp?.elem) {
                    comp.elem.scrollIntoView({
                        block: scrollMode,
                        behavior: "auto"
                    });
                }
            }
        });
    }

    #commit(id = null) {
        TodoStorage.save(this.props.todos);
        this.updateList({focusId: id});
    }

    addTodoItem() {
        const newTodo = {
            id: crypto.randomUUID(),
            title: "",
            description: "",
            isComplete: false,
            mode: "edit"
        };

        this.props.todos = [
            ...this.props.todos.map(todo => ({...todo, mode: "read"})),
            newTodo
        ];

        this.#commit(newTodo.id);
    }

    #handleToggle(id) {
        this.props.todos = this.props.todos.map(todo =>
            todo.id === id
                ? {...todo, isComplete: !todo.isComplete}
                : todo
        );

        this.#commit(id);
    }

    #handleEdit(id) {
        this.props.todos = this.props.todos.map(todo =>
            todo.id === id
                ? {...todo, mode: "edit"}
                : {...todo, mode: "read"}
        );
        this.#commit(id);
    }

    #handleSave(id, data) {
        this.props.todos = this.props.todos.map(todo =>
            todo.id === id
                ? {
                    ...todo,
                    title: data.title,
                    description: data.description,
                    mode: "read"
                }
                : todo
        );

        this.#commit(id);
    }

    #handleDelete(id) {
        this.props.todos = this.props.todos.filter(todo => todo.id !== id);
        this.#commit();
    }
}