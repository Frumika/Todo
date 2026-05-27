import {Component} from "../../ui/Component.js";
import {ProjectsContainer} from "../projectContainer/ProjectContainer.js";
import {Button} from "../../ui/button/Button.js";

export class ProjectsPanel extends Component {
    #container;
    #projectsContainer;

    props = {

        onSelect: () => {
        },
    };

    render() {
        const wrapper = document.createElement("div");
        wrapper.className = "projects-panel";

        // header
        const header = document.createElement("div");
        header.className = "projects-panel__header";

        const title = document.createElement("h2");
        title.className = "projects-panel__title";
        title.textContent = "Проекты";

        header.append(title);

        // middle
        this.#projectsContainer = new ProjectsContainer()
            .setProps({
                onSelect: () => this.props.onSelect()
            });

        const middle = document.createElement("div");
        middle.className = "projects-panel__middle";

        this.#projectsContainer.mount(middle);


        const footer = document.createElement("div");
        footer.className = "projects-panel__footer";

        const addButton = new Button()
            .setText("Добавить проект")
            .setFontColor("#5A3824")
            .setBackColor("#FFE3CF")
            .hasActiveBackground()
            .onClick(() => this.#projectsContainer.addProject());

        addButton.mount(footer);

        wrapper.append(header, middle, footer);

        this.#container = wrapper;

        return wrapper;
    }
}