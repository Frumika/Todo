"use strict"


import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";
import {Checkbox} from "../../ui/checkbox/Checkbox.js";


export class TodoItem extends Component {
    #titleInput = null;
    #descriptionInput = null;

    props = {
        id: null,
        title: "",
        description: "",
        isComplete: false,
        mode: "edit",

        onToggle: () => {
        },
        onEdit: () => {
        },
        onDelete: () => {
        },
        onSave: () => {
        }
    };

    #checkbox = new Checkbox();
    #editButton = new Button().setIcon("../../assets/edit.svg");
    #deleteButton = new Button().setIcon("../../assets/delete.svg");
    #saveButton = new Button().setIcon("../../assets/check.svg");


    render() {
        this.#bindHandlers();

        const container = document.createElement("div");
        container.className = "item-container";

        if (this.props.mode === "edit") {
            this.#renderEdit(container);
        } else {
            this.#renderView(container);
        }

        return container;
    }

    #bindHandlers() {
        this.#checkbox
            .isActive(this.props.isComplete)
            .onToggle(() => this.props.onToggle(this.props.id));

        this.#editButton
            .onClick(() => this.props.onEdit(this.props.id));

        this.#deleteButton
            .onClick(() => this.props.onDelete(this.props.id));

        this.#saveButton
            .onClick(() => {
                const data = {
                    title: this.#titleInput.value ?? "",
                    description: this.#descriptionInput.value  ?? ""
                };

                this.props.onSave(this.props.id, data);
            });
    }

    #renderEdit(container) {
        const textContainer = this.#createTextContainer();

        const title = this.#createInput("text-container__title", "Заголовок", this.props.title);
        const description = this.#createInput("text-container__description", "Описание", this.props.description);

        this.#titleInput = title;
        this.#descriptionInput = description;

        textContainer.append(title, description);
        container.append(textContainer);

        this.#saveButton.mount(container);
        this.#deleteButton.mount(container);
    }

    #renderView(container) {
        this.#checkbox.mount(container);

        const textContainer = this.#createTextContainer();

        const isComplete = this.props.isComplete;
        const title = this.#createText("h2", "text-container__title", this.props.title, isComplete);
        const description = this.#createText("p", "text-container__description", this.props.description, isComplete);

        textContainer.append(title, description);
        container.append(textContainer);

        if (!isComplete) {
            this.#editButton.mount(container);
        }

        this.#deleteButton.mount(container);
    }

    #createTextContainer() {
        const el = document.createElement("div");
        el.className = "text-container";
        return el;
    }

    #createInput(className, placeholder, value) {
        const input = document.createElement("input");
        input.className = className;
        input.placeholder = placeholder;
        input.value = value;
        return input;
    }

    #createText(tag, className, text, isComplete) {
        const el = document.createElement(tag);
        el.className = className;

        if (isComplete) {
            el.classList.add("text-container__through");
        }

        el.textContent = text;
        return el;
    }
}