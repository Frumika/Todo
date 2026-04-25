"use strict"

import {Component} from "../../ui/Component.js";
import {Header} from "../header/Header.js";
import {Main} from "../main/Main.js";

export class Content extends Component {
    render() {
        const content = document.createElement("div");
        content.className = "content";

        const contentContainer = document.createElement("div");
        contentContainer.className = "content__container";

        content.append(contentContainer);

        const header = new Header()
            .setProps({projectName: "Заглушка"});
        header.mount(contentContainer);

        const main = new Main();
        main.mount(contentContainer)

        return content;
    }
}