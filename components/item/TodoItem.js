"use strict"


import {Component} from "../../Component.js";
import {Button} from "../../ui/button/Button.js";
import {Checkbox} from "../../ui/checkbox/Checkbox.js";

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

    setTitle(title){
        this.#title = title;
        return this;
    }

    setDescription(description){
        this.#description = description;
        return this;
    }

    render() {
        const item = document.createElement("div");
        item.className = "item-container";

        const checkbox = new Checkbox()
            .setIcon("../../assets/check.svg")
            .onClick(() => console.log("checked"))
            .render();

        const textContainer = this.#getTextContainer();

        const edit = new Button()
            .setIcon("../../assets/edit.svg")
            .onClick(() => this.#onEdit())
            .render();

        const del = new Button()
            .setIcon("../../assets/delete.svg")
            .onClick(() => this.#onDelete())
            .render();

        item.append(checkbox, textContainer, edit, del);

        return item;
    }

    #getTextContainer() {
        const textContainer = document.createElement("div");
        textContainer.className = "text-container";

        const title = document.createElement("h2");
        title.className = "text-container__title";
        title.textContent = this.#title;

        const description = document.createElement("p");
        description.className = "text-container__description";
        description.textContent = this.#description;

        textContainer.append(title, description);

        return textContainer;
    }

    #toggleCompleted() {
        this.#isCompleted = !this.#isCompleted;

        const newEl = this.render();
        this.el.replaceWith(newEl);
        this.el = newEl;
    }
}