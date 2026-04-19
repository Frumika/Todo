"use strict"

import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";
import {Logo} from "../../ui/logo/Logo.js";


export class Header extends Component {

    props = {
        onAddClick: () => {}
    }

    onAddClick(callback) {
        this.props.onAddClick = callback;
        return this;
    }

    render() {
        const header = document.createElement("header");
        header.className = "header";

        const headerContainer = document.createElement("div");
        headerContainer.className = "header__container";

        header.append(headerContainer);

        const logo = new Logo("My Todo");
        logo.mount(headerContainer);

        this.addButton = new Button()
            .setIcon("../../assets/add.svg")
            .setText("Добавить")
            .setBorder({
                width: "2px",
                style: "solid",
                color: "#FF7F50"
            })
            .onClick(() => {
                if (this.props.onAddClick) {
                    this.props.onAddClick();
                }
            });

        this.addButton.mount(headerContainer);

        return header;
    }

}