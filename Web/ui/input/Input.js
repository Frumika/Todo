import {Component} from "../Component.js";

export class Input extends Component {
    #inputElement;

    props = {
        placeholder: null,
        value: "",
        onSendData: (data) => {
        },
    }

    render() {
        const container = this.createContainer();
        this.#inputElement = this.createInputElement();

        container.append(this.#inputElement);

        return container;
    }

    getValue() {
        return this.#inputElement.value;
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

        input.addEventListener("input", () => {
            this.props.value = input.value;

            this.props.onSendData(input.value);
        });

        return input;
    }
}