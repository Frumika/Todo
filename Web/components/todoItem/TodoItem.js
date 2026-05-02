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

    #saveButton = new Button()
        .setIcon("../../assets/check.svg")
        .setText("Сохранить")
        .setFontColor("white")
        .setBackColor("#D33322")
        .hasActiveBackground();

    #deleteButton = new Button()
        .setIcon("../../assets/delete.svg")
        .setText("Удалить")
        .setFontColor("#444444")
        .setBackColor("#F5F5F5")
        .hasActiveBackground();


    render() {
        this.#bindHandlers();

        const container = document.createElement("div");
        container.classList.add("todo-item");

        if (this.props.mode === "edit") {
            container.classList.add("todo-item--edit");
            this.#renderEdit(container);
        } else {
            if (!this.props.isComplete) container.classList.add("todo-item--read");
            this.#renderView(container);
        }

        return container;
    }

    #bindHandlers() {
        this.#checkbox
            .isActive(this.props.isComplete)
            .onToggle(() => this.props.onToggle(this.props.id));

        this.#deleteButton
            .onClick(() => this.props.onDelete(this.props.id));

        this.#saveButton
            .onClick(() => {
                const data = {
                    title: this.#titleInput.value ?? "",
                    description: this.#descriptionInput.value ?? ""
                };

                this.props.onSave(this.props.id, data);
            });
    }

    #renderEdit(container) {
        const controlContainer = this.#createControlContainer();
        const textContainer = this.#createTextContainer();

        const title = this.#createInput("text-container__title", "Заголовок", this.props.title);
        const description = this.#createInput("text-container__description", "Описание", this.props.description);

        this.#titleInput = title;
        this.#descriptionInput = description;

        textContainer.append(title, description);
        controlContainer.append(textContainer);

        const buttonContainer = this.#createButtonContainer();

        this.#saveButton.mount(buttonContainer);
        this.#deleteButton.mount(buttonContainer);

        const dividingLine = this.#createHr();

        container.append(controlContainer, dividingLine, buttonContainer);
    }

    #renderView(container) {
        const controlContainer = this.#createControlContainer();
        const textContainer = this.#createTextContainer();

        const isComplete = this.props.isComplete;
        const title = this.#createText("h2", "text-container__title", this.props.title, isComplete);
        const description = this.#createText("p", "text-container__description", this.props.description, isComplete);

        textContainer.append(title, description);

        this.#checkbox.mount(controlContainer);
        controlContainer.append(textContainer);

        const dividingLine = this.#createHr();

        container.append(controlContainer, dividingLine);


        if (!isComplete) {
            this.#addListeners(container);
        }
    }

    #createHr() {
        const hr = document.createElement("div");
        hr.className = "dividing-line";
        return hr;
    }

    #createButtonContainer() {
        const el = document.createElement("div");
        el.className = "button-container";
        return el;
    }

    #createControlContainer() {
        const el = document.createElement("div");
        el.className = "control-container";
        return el;
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
            el.classList.add("text-container--through");
        }

        el.textContent = text;
        return el;
    }

    #addListeners(container) {
        container.addEventListener("click", (event) => {
            if (event.target.className !== "checkbox") {
                this.props.onEdit(this.props.id)
            }
        });
    }
}