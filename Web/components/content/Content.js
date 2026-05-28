"use strict"

import {Component} from "../../ui/Component.js";
import {Header} from "../header/Header.js";
import {TodoContainer} from "../main/TodoContainer.js";

export class Content extends Component {
    render() {
        const content = document.createElement("div");
        content.className = "content";

        const contentContainer = document.createElement("div");
        contentContainer.className = "content__container";

        content.append(contentContainer);

        const main = new TodoContainer();
        const header = new Header()
            .setProps({
                projectName: "Текущий проект",
                onAdd: () => main.addTodoItem()
            });

        header.mount(contentContainer);
        main.mount(contentContainer)

        return content;
    }
}