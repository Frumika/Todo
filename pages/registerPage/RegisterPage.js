import {Input} from "../../ui/input/Input.js";
import {PasswordInput} from "../../ui/input/PasswordInput.js";
import {AuthPage} from "../authPage/AuthPage.js";

export class RegisterPage extends AuthPage {
    createInputContainer() {
        const container = document.createElement("div");
        container.className = "auth-page__input-container";

        const loginInput = new Input()
            .setProps({
                placeholder: "Логин",
            });
        loginInput.mount(container);

        const passwordInput = new PasswordInput();
        const confirmPasswordInput = new PasswordInput();

        passwordInput.setProps({
            placeholder: "Пароль",
            onToggle: () => confirmPasswordInput.switchType(),
        });

        confirmPasswordInput.setProps({
            placeholder: "Подтвердите пароль",
            onToggle: () => passwordInput.switchType(),
        });

        passwordInput.mount(container);
        confirmPasswordInput.mount(container);

        return container;
    }
}