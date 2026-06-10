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

    render() {
        const wrapper = document.createElement("div");
        wrapper.className = "projects";

        this.container = document.createElement("div");
        this.container.className = "projects-container";

        wrapper.append(this.container);
        this.updateList();

        return wrapper;
    }

    async init() {
        await this.loadProjects();
        this.updateList();
    }

    async loadProjects() {
        const response = await ProjectApi.getProjects();

        console.log(response);

        if (!response.ok) {
            console.log(response.data);
            return;
        }

        this.props.projects = response.data.data ?? [];
    }

    updateList() {
        const projects = this.props.projects || [];

        const existingIds = new Set(this.#projectItems.keys());
        const newIds = new Set(projects.map(p => p.id));

        // remove
        existingIds.forEach(id => {
            if (!newIds.has(id)) {
                const comp = this.#projectItems.get(id);

                comp.elem.remove();
                this.#projectItems.delete(id);
            }
        });

        // create/update
        projects.forEach((project, index) => {
            let projectItem = this.#projectItems.get(project.id);

            if (!projectItem) {
                projectItem = new ProjectItem();

                this.#projectItems.set(project.id, projectItem);

                projectItem.mount(this.container);
            }

            projectItem.setProps({
                id: project.id,
                text: project.name,
                createdAt: project.createdAt,
                updatedAt: project.updatedAt,

                isSelected: project.id === this.props.selectedProjectId,

                onClick: () =>{
                    this.#handleSelect(project)
                    // console.log(project)
                },
                onSave: (id, text) => this.#handleSave(id, text),
                onDelete: (id) => this.#handleDelete(id),
            });

            projectItem.rerender();

            const currentNode = projectItem.elem;
            const expectedNode = this.container.children[index];

            if (currentNode !== expectedNode) {
                this.container.insertBefore(
                    currentNode,
                    expectedNode || null,
                );
            }
        });
    }

    async addProject() {
        const response = await ProjectApi.createProject({name: ""});

        if (!response.ok) {
            console.log(response.data);
            return;
        }

        const newProject = response.data.data;

        console.log("NEW PROJECT")
        console.log(newProject);

        this.props.projects = [...this.props.projects, newProject];
        this.props.selectedProjectId = newProject.id;

        this.updateList();

        const newItem = this.#projectItems.get(newProject.id);
        newItem?.startEditing();
    }

    #handleSelect(project) {
        this.props.selectedProjectId = project.id;
        this.updateList();
        this.props.onSelect(project);
    }

    async #handleSave(id, text) {
        const response = await ProjectApi.updateProject({
            projectId: id,
            name: text,
        });

        if (!response.ok) {
            console.log(response.data);
            return;
        }

        this.props.projects = this.props.projects.map(project =>
            project.id === id
                ? {...project, name: text}
                : project
        );

        this.updateList();
    }

    async #handleDelete(id) {
        const response =
            await ProjectApi.deleteProject(id);

        if (!response.ok) {
            console.log(response.data);
            return;
        }

        this.props.projects =
            this.props.projects.filter(
                project => project.id !== id
            );

        if (this.props.selectedProjectId === id) {
            this.props.selectedProjectId = null;
        }

        this.updateList();
    }
}