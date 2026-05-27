import {Input} from "../../ui/input/Input.js";
import {PasswordInput} from "../../ui/input/PasswordInput.js";
import {AuthPage} from "../authPage/AuthPage.js";
import {AuthService} from "../../services/AuthService.js";


export class LoginPage extends AuthPage {
    #loginInput;
    #passwordInput;

    createInputContainer() {
        const container = document.createElement("div");
        container.className = "services-page__input-container";

        this.#loginInput = new Input()
            .setProps({
                placeholder: "Логин",
            });

        this.#loginInput.mount(container);

        this.#passwordInput = new PasswordInput()
            .setProps({
                placeholder: "Пароль",
            });

        this.#passwordInput.mount(container);

        return container;
    }

    async onSubmit() {
        const login = this.#loginInput.getValue();
        const password = this.#passwordInput.getValue();

        const response = await AuthService.login(
            login,
            password,
        );

        if (!response.ok) {
            console.log(response.data);

            return;
        }

        console.log("Login success");
        this.props.onBack();
    }
}