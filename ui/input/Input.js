import {Component} from "../Component.js";

export class Input extends Component {
    props = {
        placeholder: null,
        value: "",
    }

    render() {
        const container = this.createContainer();
        const input = this.createInputElement();

        container.append(input);
        return container;
    }

    createContainer() {
        const container = document.createElement("div");
        container.className = "input-container";
        return container;
    }

    createInputElement() {
        const input = document.createElement("input");
        input.className = "input-container__text";

        if (this.props.placeholder) {
            input.placeholder = this.props.placeholder;
        }

        input.value = this.props.value ?? "";

        return input;
    }
}