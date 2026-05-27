import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";
import {Input} from "../../ui/input/Input.js";
import {PasswordInput} from "../../ui/input/PasswordInput.js";


export class AuthPage extends Component {
    props = {
        headerText: "",
        buttonText: "",
        iconSrc: "",

        onBack: () => {
        },
    }

    render() {
        const loginPage = document.createElement("div");
        loginPage.className = "auth-page";

        const header = this.createHeader();
        const main = this.createMain();

        loginPage.append(header);
        loginPage.append(main);

        return loginPage;
    }

    createHeader() {
        const header = document.createElement("div");
        header.className = "auth-page__header";

        const backButton = new Button()
            .setIcon("../../assets/back.svg")
            .setText("Назад")
            .setFontColor("#202020")
            .setBackColor("transparent")
            .hasActiveBackground()
            .onClick(() => this.props.onBack());
        backButton.mount(header);

        return header;
    }

    createMain() {
        const main = document.createElement("div");
        main.className = "auth-page__main";

        const loginContainer = document.createElement("div");
        loginContainer.className = "auth-page__main-container";

        const headerContainer = this.createHeaderContainer();
        const inputContainer = this.createInputContainer();
        const buttonContainer = this.createButtonContainer();

        loginContainer.append(headerContainer, inputContainer, buttonContainer)
        main.append(loginContainer);

        return main;
    }

    createHeaderContainer() {
        const container = document.createElement("div");
        container.className = "auth-page__header-container";

        const text = document.createElement("h2");
        text.className = "auth-page__header-text";
        text.textContent = this.props.headerText;
        container.append(text)

        return container;
    }

    createButtonContainer() {
        const container = document.createElement("div");
        container.className = "auth-page__button-container";

        const submitButton = new Button()
            .setIcon(this.props.iconSrc)
            .setText(this.props.buttonText)
            .setFontColor("white")
            .setBackColor("#D33322")
            .hasActiveBackground()
            .onClick(async () => await this.onSubmit())
        submitButton.mount(container);

        return container;
    }

    createInputContainer() {
        throw new Error("Method createInputContainer() must be implemented");
        return null;
    }

    async onSubmit() {
        throw new Error("Method onSubmit() must be implemented");
    }
}