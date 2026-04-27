"use strict"


import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";

export class LeftAside extends Component{

    render(){
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
            .setBackColor("#FCFAF8")
            .hasActiveBackground()
        loginButton.mount(auth);

        const registerButton = new Button()
            .setIcon("../../assets/register.svg")
            .setText("Регистрация")
            .setFontColor("#202020")
            .setBackColor("#FCFAF8")
            .hasActiveBackground()
        registerButton.mount(auth);

        leftAsideContainer.append(auth);
        leftAside.append(leftAsideContainer);

        return leftAside;
    }

}