import {MainPage} from "./main/MainPage.js";

export class Router {
    constructor(root) {
        this.root = root;
    }

    #mainPage = new MainPage()
        .setProps({
            onLogin: () => this.navigate('login'),
            onRegister: () => this.navigate('register')
        });

    #loginPage = null;
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
                console.log("Go to login page");
                page = this.#mainPage;

                // page = this.#loginPage;
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