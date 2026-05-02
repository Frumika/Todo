import {Component} from "../Component.js";
import {Input} from "./Input.js";

export class PasswordInput extends Component {
    #inputElem = null;
    #iconElem = null;

    props = {
        isVisible: false,
        placeholder: null,
        value: "",
        type: "password",
        onToggle: () => {
        },
    }


    render() {
        const container = this.createContainer();
        const input = this.createInputElement();
        const button = this.createToggleButton();

        container.append(input, button);
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

        input.type = this.props.type;

        if (this.props.placeholder) {
            input.placeholder = this.props.placeholder;
        }

        input.value = this.props.value ?? "";

        this.#inputElem = input;

        return input;
    }

    createToggleButton() {
        let src = "../../assets/";
        src += this.props.type === "text" ? "eye-open.svg" : "eye-close.svg";

        this.#iconElem = document.createElement("img");
        this.#iconElem.src = src;
        this.#iconElem.alt = "toggle";
        this.#iconElem.className = "input-container__toggle-button";

        this.#iconElem.addEventListener("click", () => {
            this.switchType();
            this.props.onToggle();
        });

        return this.#iconElem;
    }

    switchType() {
        this.props.isVisible = !this.props.isVisible;
        this.applyState();
    }

    applyState() {
        this.#inputElem.type = this.props.isVisible ? "text" : "password";

        if (this.#iconElem) {
            let src = "../../assets/";
            src += this.props.isVisible ? "eye-open.svg" : "eye-close.svg";
            this.#iconElem.src = src;
        }
    }
}