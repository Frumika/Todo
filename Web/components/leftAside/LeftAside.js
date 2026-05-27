"use strict"


import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";
import {AuthService} from "../../services/AuthService.js";
import {ProjectsPanel} from "../projectsPanel/ProjectsPanel.js";

export class LeftAside extends Component {
    props = {
        onLogin: () => {
        },
        onRegister: () => {
        },
        onProfile: () => {
        },
        onLogout: async () => {
        },
    }

    render() {
        const leftAside = document.createElement("div");
        leftAside.className = "left-aside";

        const leftAsideContainer = document.createElement("div");
        leftAsideContainer.className =
            "left-aside__container";

        const auth = document.createElement("div");
        auth.className = "auth";

        if (AuthService.isAuthorized()) {
            this.createAuthorizedButtons(auth);
        } else {
            this.createUnauthorizedButtons(auth);
        }
        leftAsideContainer.append(auth);


        // const projectPanel = new ProjectsPanel();
        // projectPanel.mount(leftAsideContainer)

        leftAside.append(leftAsideContainer);

        return leftAside;
    }

    createUnauthorizedButtons(container) {
        const loginButton = new Button()
            .setIcon("../../assets/login.svg")
            .setText("Вход")
            .setFontColor("#202020")
            .setBackColor("white")
            .hasActiveBackground()
            .onClick(() => this.props.onLogin());

        loginButton.mount(container);

        const registerButton = new Button()
            .setIcon("../../assets/register.svg")
            .setText("Регистрация")
            .setFontColor("#202020")
            .setBackColor("white")
            .hasActiveBackground()
            .onClick(() => this.props.onRegister());
        registerButton.mount(container);

    }

    createAuthorizedButtons(container) {
        const profileButton = new Button()
            .setIcon("../../assets/profile.svg")
            .setText("Профиль")
            .setFontColor("#202020")
            .setBackColor("white")
            .hasActiveBackground()
            .onClick(() => this.props.onProfile());

        profileButton.mount(container);

        const logoutButton = new Button()
            .setIcon("../../assets/logout.svg")
            .setText("Выйти")
            .setFontColor("#202020")
            .setBackColor("white")
            .hasActiveBackground()
            .onClick(async () => {
                await this.props.onLogout();
            });

        logoutButton.mount(container);
    }

}