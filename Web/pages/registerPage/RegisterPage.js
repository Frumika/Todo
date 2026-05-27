import {Input} from "../../ui/input/Input.js";
import {PasswordInput} from "../../ui/input/PasswordInput.js";
import {AuthPage} from "../authPage/AuthPage.js";
import {AuthService} from "../../services/AuthService.js";

export class RegisterPage extends AuthPage {
    #loginInput;
    #passwordInput;
    #confirmPasswordInput;

    createInputContainer() {
        const container = document.createElement("div");
        container.className = "services-page__input-container";

        this.#loginInput = new Input()
            .setProps({
                placeholder: "Логин",
            });
        this.#loginInput.mount(container);

        this.#passwordInput = new PasswordInput();
        this.#confirmPasswordInput = new PasswordInput();

        this.#passwordInput.setProps({
            placeholder: "Пароль",
            onToggle: () => this.#confirmPasswordInput.switchType(),
        });

        this.#confirmPasswordInput.setProps({
            placeholder: "Подтвердите пароль",
            onToggle: () => this.#passwordInput.switchType(),
        });

        this.#passwordInput.mount(container);
        this.#confirmPasswordInput.mount(container);

        return container;
    }

    async onSubmit() {
        const login = this.#loginInput.getValue();
        const password = this.#passwordInput.getValue();
        const confirmPassword = this.#confirmPasswordInput.getValue();

        const response = await AuthService.register(
            login,
            password,
        );

        if (!response.ok) {
            console.log(response.data);
            return;
        }

        console.log("Register success");
        this.props.onBack();
    }
}