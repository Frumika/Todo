import {MainPage} from "./mainPage/MainPage.js";
import {LoginPage} from "./loginPage/LoginPage.js";
import {RegisterPage} from "./registerPage/RegisterPage.js";

export class Router {
    constructor(root) {
        this.root = root;
    }

    #mainPage = new MainPage()
        .setProps({
            onLogin: () => this.navigate('login'),
            onRegister: () => this.navigate('register')
        });

    #loginPage = new LoginPage()
        .setProps({
            headerText: "С возвращением!",
            buttonText: "Войти",
            iconSrc: "../../assets/login-white.svg",
            onBack: () => this.navigate('main')
        });

    #registerPage = new RegisterPage()
        .setProps({
            headerText: "Регистрация",
            buttonText: "Зарегистрироваться",
            iconSrc: "../../assets/register-white.svg",
            onBack: () => this.navigate('main')
        });

    navigate(route) {
        this.root.innerHTML = '';

        let page = null;
        switch (route) {
            case 'main': {
                page = this.#mainPage;
                break;
            }
            case 'login': {
                page = this.#loginPage;
                break;
            }
            case 'register': {
                page = this.#registerPage;
                break;
            }
            default: {
                page = this.#mainPage;
            }
        }

        page.mount(this.root);
    }
}