"use strict"


import {Component} from "../../Component.js";
import {Button} from "../../ui/button/Button.js";
import {Checkbox} from "../../ui/checkbox/Checkbox.js";


export class TodoItem extends Component {

    state = {
        title: null,
        description: null,
    }

    setTitle(title) {
        return this.setState({title: title});
    }

    setDescription(description) {
        return this.setState({description: description});
    }

    render() {
        const item = document.createElement("div");
        item.className = "item-container";

        this.checkbox = new Checkbox()
            .setIcon("../../assets/check.svg")
            .onClick(() => console.log("checked"));
        this.checkbox.mount(item);

        const textContainer = this.#getTextContainer();
        item.append(textContainer);

        this.editButton = new Button()
            .setIcon("../../assets/edit.svg")
            .onClick(() => console.log("edited"));
        this.editButton.mount(item);

        this.delButton = new Button()
            .setIcon("../../assets/delete.svg")
            .onClick(() => console.log("deleted"));
        this.delButton.mount(item);

        return item;
    }

    #getTextContainer() {
        const textContainer = document.createElement("div");
        textContainer.className = "text-container";

        const title = document.createElement("h2");
        title.className = "text-container__title";
        title.textContent = this.state.title;

        const description = document.createElement("p");
        description.className = "text-container__description";
        description.textContent = this.state.description;

        textContainer.append(title, description);

        return textContainer;
    }
}