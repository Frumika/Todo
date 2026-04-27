"use strict"

import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";
import {Logo} from "../../ui/logo/Logo.js";


export class Header extends Component {
    props = {
        projectName: null,
        onAdd: () => {
        }
    }

    render() {
        const header = document.createElement("header");
        header.className = "header";

        const headerContainer = document.createElement("div");
        headerContainer.className = "header__container";

        header.append(headerContainer);

        const logo = new Logo(this.props.projectName);
        logo.mount(headerContainer);

        const addButton = new Button()
            .setIcon("../../assets/add.svg")
            .setText("Добавить задачу")
            .setFontColor("white")
            .setBackColor("#D33322")
            .hasActiveBackground()
            .onClick(() => this.props.onAdd());
        addButton.mount(headerContainer);

        return header;
    }

}