"use strict"


import {Component} from "../../Component.js";
import {Button} from "../../ui/button/Button.js";
import {Checkbox} from "../../ui/checkbox/Checkbox.js";


export class TodoItem extends Component {
    #titleInput = null;
    #descriptionInput = null;

    #checkbox = new Checkbox()
        .onClick(() => {
            const isComplete = this.state.mode === "complete";
            this.setState({
                mode: this.state.mode === "complete" ? "read" : "complete"
            });
        });


    #editButton = new Button()
        .setIcon("../../assets/edit.svg")
        .onClick(() => {
            this.setState({mode: "edit"});
        });

    #deleteButton = new Button()
        .setIcon("../../assets/delete.svg")
        .onClick(() => this.unmount());

    #appendButton = new Button()
        .setIcon("../../assets/check.svg")
        .onClick(() => {
            this.setState({
                mode: "read",
                title: this.#titleInput.value,
                description: this.#descriptionInput.value
            });
        });

    state = {
        mode: "edit",
        title: "",
        description: ""
    };

    setTitle(title) {
        return this.setState({title});
    }

    setDescription(description) {
        return this.setState({description});
    }

    setMode(mode) {
        return this.setState({mode: mode});
    }

    render() {
        const container = document.createElement("div");
        container.className = "item-container";

        if (this.state.mode === "edit") {
            this.#renderEditMode(container);
        } else {
            this.#renderViewMode(container);
        }

        return container;
    }

    #renderEditMode(container) {
        const textContainer = document.createElement("div");
        textContainer.className = "text-container";

        const title = document.createElement("input");
        title.className = "text-container__title";
        title.placeholder = "Заголовок";
        title.value = this.state.title;

        const description = document.createElement("input");
        description.className = "text-container__description";
        description.placeholder = "Описание";
        description.value = this.state.description;

        this.#titleInput = title;
        this.#descriptionInput = description;

        textContainer.append(title, description);
        container.append(textContainer);

        this.#appendButton.mount(container);
        this.#deleteButton.mount(container);
    }

    #renderViewMode(container) {
        const isComplete = this.state.mode === "complete";

        this.#checkbox.isActive(isComplete).mount(container);

        const textContainer = document.createElement("div");
        textContainer.className = "text-container";

        const title = document.createElement("h2");
        title.className = "text-container__title";
        if (isComplete) title.classList.add("text-container__through");

        title.textContent = this.state.title;

        const description = document.createElement("p");
        description.className = "text-container__description";
        if (isComplete) description.classList.add("text-container__through");

        description.textContent = this.state.description;

        textContainer.append(title, description);
        container.append(textContainer);

        if (!isComplete) this.#editButton.mount(container);
        this.#deleteButton.mount(container);
    }
}