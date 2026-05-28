"use strict"

import {Component} from "../../ui/Component.js";
import {Header} from "../header/Header.js";
import {TodoContainer} from "../main/TodoContainer.js";

export class Content extends Component {
    #header;
    #todoContainer;

    props = {
        selectedProject: null,
    }

    render() {
        const content = document.createElement("div");
        content.className = "content";

        const contentContainer = document.createElement("div");
        contentContainer.className = "content__container";

        content.append(contentContainer);

        this.#todoContainer = new TodoContainer();
        this.#header = new Header()
            .setProps({
                projectName: "Текущий проект",
                onAdd: () => this.#todoContainer.addTodoItem()
            });

        this.#header.mount(contentContainer);
        this.#todoContainer.mount(contentContainer)

        return content;
    }

    onProjectSelected(project) {
        this.selectedProject = project;

        this.#header.setProps({
            projectName: project.name,
        });

        this.#header.rerender?.();

        this.#todoContainer.setProject(project.id);
    }
}