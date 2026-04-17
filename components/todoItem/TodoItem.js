"use strict"


import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";
import {Checkbox} from "../../ui/checkbox/Checkbox.js";


export class TodoItem extends Component {
    #titleInput = null;
    #descriptionInput = null;

    state = {
        mode: "edit",
        title: "",
        description: ""
    };

    #checkbox = new Checkbox()
        .onClick(() => this.#toggleComplete());

    #editButton = new Button()
        .setIcon("../../assets/edit.svg")
        .onClick(() => this.#switchToEdit());

    #deleteButton = new Button()
        .setIcon("../../assets/delete.svg")
        .onClick(() => this.#delete());

    #appendButton = new Button()
        .setIcon("../../assets/check.svg")
        .onClick(() => this.#save());


    render() {
        const container = document.createElement("div");
        container.className = "item-container";

        if (this.state.mode === "edit") {
            this.#renderEdit(container);
        } else {
            this.#renderView(container);
        }

        return container;
    }

    #renderEdit(container) {
        const textContainer = this.#createTextContainer();

        const title = this.#createInput("text-container__title", "Заголовок", this.state.title);
        const description = this.#createInput("text-container__description", "Описание", this.state.description);

        this.#titleInput = title;
        this.#descriptionInput = description;

        textContainer.append(title, description);
        container.append(textContainer);

        this.#appendButton.mount(container);
        this.#deleteButton.mount(container);
    }

    #renderView(container) {
        const isComplete = this.state.mode === "complete";

        this.#checkbox.isActive(isComplete).mount(container);

        const textContainer = this.#createTextContainer();

        const title = this.#createText("h2", "text-container__title", this.state.title, isComplete);
        const description = this.#createText("p", "text-container__description", this.state.description, isComplete);

        textContainer.append(title, description);
        container.append(textContainer);

        if (!isComplete) {
            this.#editButton.mount(container);
        }

        this.#deleteButton.mount(container);
    }


    #toggleComplete() {
        const isComplete = this.state.mode === "complete";

        this.setState({
            mode: isComplete ? "read" : "complete"
        });
    };

    #switchToEdit() {
        this.setState({mode: "edit"});
    };

    #delete() {
        this.unmount();
    };

    #save() {
        this.setState({
            mode: "read",
            title: this.#titleInput?.value ?? "",
            description: this.#descriptionInput?.value ?? ""
        });
    };


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