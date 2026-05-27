import {Component} from "../../ui/Component.js";
import {ProjectItem} from "../../ui/projectItem/ProjectItem.js";
import {ProjectApi} from "../../api/ProjectApi.js";


export class ProjectsContainer extends Component {

    #projectItems = new Map();

    container = null;

    props = {
        projects: [],
        selectedProjectId: null,

        onSelect: (project) => {
        },
    };

    async render() {
        const wrapper = document.createElement("div");
        wrapper.className = "projects";

        this.container = document.createElement("div");
        this.container.className = "projects-container";

        wrapper.append(this.container);

        await this.loadProjects();

        this.updateList();

        return wrapper;
    }

    async loadProjects() {
        const response = await ProjectApi.getProjects();

        if (!response.ok) {
            console.log(response.data);
            return;
        }

        this.props.projects = response.data;
    }

    updateList() {

        const existingIds =
            new Set(this.#projectItems.keys());

        const newIds = new Set(this.props.projects.map(p => p.id));

        // remove
        existingIds.forEach(id => {
            if (!newIds.has(id)) {

                const comp = this.#projectItems.get(id);
                comp.elem.remove();
                this.#projectItems.delete(id);
            }
        });

        // create/update
        this.props.projects.forEach(
            (project, index) => {

                let comp = this.#projectItems.get(project.id);

                if (!comp) {
                    comp = new ProjectItem();

                    this.#projectItems.set(
                        project.id,
                        comp,
                    );

                    comp.mount(this.container);
                }

                comp.setProps({
                    id: project.id,

                    text: project.name,

                    isSelected: project.id === this.props.selectedProjectId,

                    onClick: (id) => this.#handleSelect(id),
                    onSave: (id, text) => this.#handleSave(id, text),
                });

                comp.rerender();

                const currentNode = comp.elem;

                const expectedNode = this.container.children[index];

                if (currentNode !== expectedNode) {
                    this.container.insertBefore(
                        currentNode,
                        expectedNode || null,
                    );
                }
            }
        );
    }

    async addProject() {

        const response =
            await ProjectApi.createProject({
                name: "",
            });

        if (!response.ok) {
            console.log(response.data);

            return;
        }

        const newProject =
            response.data;

        this.props.projects = [
            ...this.props.projects.map(p => ({
                ...p,
                isSelected: false,
            })),

            {
                ...newProject,
                mode: "edit",
            }
        ];

        this.props.selectedProjectId =
            newProject.id;

        this.updateList();
    }

    #handleSelect(id) {

        this.props.selectedProjectId = id;

        this.updateList();

        const project =
            this.props.projects.find(
                p => p.id === id
            );

        this.props.onSelect(project);
    }

    async #handleSave(id, text) {

        const response =
            await ProjectApi.updateProject({
                id,
                name: text,
            });

        if (!response.ok) {
            console.log(response.data);

            return;
        }

        this.props.projects =
            this.props.projects.map(project =>
                project.id === id
                    ? {
                        ...project,
                        name: text,
                    }
                    : project
            );

        this.updateList();
    }
}