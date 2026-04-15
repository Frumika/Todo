"use strict"


import {Component} from "../../Component.js";
import {Button} from "../../ui/button/Button";

export class TodoItem extends Component {
    #title;
    #description;
    #isCompleted = false;

    #onDelete = null;
    #onEdit = null;

    constructor({title, description, onDelete, onEdit} = {}) {
        super();
        this.#title = title;
        this.#description = description;
        this.#onDelete = onDelete;
        this.#onEdit = onEdit;
    }


    render() {
        const item = document.createElement("div");
        item.className = "main__container-item";


        const checkbox = document.createElement("img");
        checkbox.className = "checkbox";
        checkbox.src = this.#isCompleted
            ? "assets/check-filled.svg"
            : "assets/check.svg";

        checkbox.addEventListener("click", () => {
            this.#toggleCompleted();
        });

        const textContainer = document.createElement("div");
        textContainer.className = "item__text";

        const title = document.createElement("h2");
        title.className = "item__text-header";
        title.textContent = this.#title;

        const description = document.createElement("p");
        description.className = "item__text-main";
        description.textContent = this.#description;

        if (this.#isCompleted) {
            title.style.textDecoration = "line-through";
            description.style.textDecoration = "line-through";
            description.style.color = "gray";
        }

        textContainer.append(title, description);

        const edit = new Button()
            .setIcon("../../assets/edit.svg")
            .onClick(() => this.#onEdit())

        const del = new Button()
            .setIcon("../../assets/delete.svg")
            .onClick(() => this.#onDelete())

        item.append(checkbox, textContainer, edit, del);

        return item;
    }

    #toggleCompleted() {
        this.#isCompleted = !this.#isCompleted;

        const newEl = this.render();
        this.el.replaceWith(newEl);
        this.el = newEl;
    }
}