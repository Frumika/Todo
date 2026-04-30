import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";
import {Input} from "../../ui/input/Input.js";
import {PasswordInput} from "../../ui/input/PasswordInput.js";
import {AuthPage} from "../authPage/AuthPage.js";


export class LoginPage extends AuthPage {
    createInputContainer() {
        const container = document.createElement("div");
        container.className = "auth-page__input-container";

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
}