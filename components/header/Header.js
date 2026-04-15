"use strict"

import {Component} from "../../Component.js";
import {Button} from "../../ui/button/Button.js";
import {Logo} from "../../ui/logo/Logo.js";


export class Header extends Component {

    render() {
        const header = document.createElement("header");
        header.className = "header";

        const headerContainer = document.createElement("div");
        headerContainer.className = "header__container";

        header.append(headerContainer)

        const logo = new Logo("My Todo");
        headerContainer.append(logo.render())


        const addButton = new Button()
            .setIcon("../../assets/add.svg")
            .setText("Добавить")
            .setBorder({
                width: "2px",
                style: "solid",
                color: "#FF7F50"
            });


        headerContainer.append(addButton.render())

        return header;
    }
}