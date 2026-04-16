"use strict"

import {Component} from "../../Component.js";
import {Button} from "../../ui/button/Button.js";
import {Logo} from "../../ui/logo/Logo.js";


export class Header extends Component {

    state = {
        onAddClick: null
    }

    onAddClick(callback) {
        return this.setState({onAddClick: callback});
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
                if (this.state.onAddClick) {
                    this.state.onAddClick(this.addButton);
                }
            });

        this.addButton.mount(headerContainer);

        return header;
    }

}