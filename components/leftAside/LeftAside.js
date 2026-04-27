"use strict"


import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";

export class LeftAside extends Component {
    props = {
        onLoginClick: () => {
        },
        onRegisterClick: () => {
        }
    }

    render() {
        const leftAside = document.createElement("div");
        leftAside.className = "left-aside";

        const leftAsideContainer = document.createElement("div");
        leftAsideContainer.className = "left-aside__container";

        const auth = document.createElement("div");
        auth.className = "auth"

        const loginButton = new Button()
            .setIcon("../../assets/login.svg")
            .setText("Вход")
            .setFontColor("#202020")
            .setBackColor("white")
            .hasActiveBackground()
            .onClick(() => this.props.onLoginClick())
        loginButton.mount(auth);

        const registerButton = new Button()
            .setIcon("../../assets/register.svg")
            .setText("Регистрация")
            .setFontColor("#202020")
            .setBackColor("white")
            .hasActiveBackground()
            .onClick(() => this.props.onRegisterClick())
        registerButton.mount(auth);

        leftAsideContainer.append(auth);
        leftAside.append(leftAsideContainer);

        return leftAside;
    }

}