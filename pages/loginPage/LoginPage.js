import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";
import {Input} from "../../ui/input/Input.js";
import {PasswordInput} from "../../ui/input/PasswordInput.js";


export class LoginPage extends Component {
    props = {


        onLogin: () => {
        },
    }

    render() {
        const loginPage = document.createElement("div");
        loginPage.className = "login-page";

        const loginContainer = document.createElement("div");
        loginContainer.className = "login-page__container";

        const headerContainer = this.#createHeaderContainer();
        const inputContainer = this.#createInputContainer();
        const buttonContainer = this.#createButtonContainer();

        loginContainer.append(headerContainer, inputContainer, buttonContainer)
        loginPage.append(loginContainer);

        return loginPage;
    }

    #createHeaderContainer() {
        const container = document.createElement("div");
        container.className = "header-container";

        const text = document.createElement("h2");
        text.className = "header-container__text";
        text.textContent = "С возвращением!";
        container.append(text)

        return container;
    }

    #createInputContainer() {
        const container = document.createElement("div");
        container.className = "login-page__input-container";

        const loginInput = new Input()
            .setProps({
                placeholder: "Логин",
            });
        loginInput.mount(container);

        const passwordInput = new PasswordInput()
            .setProps({
                placeholder: "Пароль",
            });
        passwordInput.mount(container);

        return container;
    }

    #createButtonContainer() {
        const container = document.createElement("div");
        container.className = "login-page__button-container";

        const loginButton = new Button()
            .setIcon("../../assets/login-white.svg")
            .setText("Войти")
            .setFontColor("white")
            .setBackColor("#D33322")
            .hasActiveBackground()
            .onClick(() => this.props.onLogin())
        loginButton.mount(container);

        return container;
    }
}