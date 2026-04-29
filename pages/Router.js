import {MainPage} from "./mainPage/MainPage.js";
import {LoginPage} from "./loginPage/LoginPage.js";

export class Router {
    constructor(root) {
        this.root = root;
    }

    #mainPage = new MainPage()
        .setProps({
            onLogin: () => this.navigate('login'),
            onRegister: () => this.navigate('register')
        });

    #loginPage = new LoginPage();
    #registerPage = null;

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
                console.log("Go to Register page");
                page = this.#mainPage;

                // page = this.#registerPage;
                break;
            }
            default: {
                page = this.#mainPage;
            }
        }

        page.mount(this.root);

    }
}