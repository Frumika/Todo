import {Component} from "../../ui/Component.js";
import {ProjectsContainer} from "../projectContainer/ProjectContainer.js";
import {Button} from "../../ui/button/Button.js";

export class ProjectPanel extends Component {

    #projectsContainer = null;

    render() {
        const wrapper = document.createElement("div");
        wrapper.className = "project-panel";

        // header
        const header = document.createElement("div");
        header.className = "project-panel__header";

        const title = document.createElement("h3");
        title.className = "project-panel__title";
        title.textContent = "Проекты";

        header.append(title);

        // container
        const containerWrapper = document.createElement("div");
        containerWrapper.className = "project-panel__container";

        this.#projectsContainer = new ProjectsContainer();
        this.#projectsContainer.mount(containerWrapper);
        this.#projectsContainer.init();

        // footer (button area)
        const footer = document.createElement("div");
        footer.className = "project-panel__footer";

        const addButton = new Button()
            .setIcon("../../assets/add.svg")
            .setText("Добавить проект")
            .setFontColor("white")
            .setBackColor("#D33322")
            .hasActiveBackground()
            .onClick(() => this.#projectsContainer.addProject());
        addButton.mount(footer);

        wrapper.append(header, containerWrapper, footer);

        return wrapper;
    }
}