"use strict"

import {Component} from "../../ui/Component.js";
import {Button} from "../../ui/button/Button.js";
import {Logo} from "../../ui/logo/Logo.js";


export class Header extends Component {

    render() {
        const header = document.createElement("header");
        header.className = "header";

        const headerContainer = document.createElement("div");
        headerContainer.className = "header__container";

        header.append(headerContainer);

        const logo = new Logo("My Todo");
        logo.mount(headerContainer);

        return header;
    }

}