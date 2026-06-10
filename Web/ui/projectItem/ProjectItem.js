import {Component} from "../Component.js";
import {Button} from "../Button/Button.js";

export class ProjectItem extends Component {
    props = {
        id: null,
        text: "",
        createdAt: null,
        updatedAt: null,
        isSelected: false,

        onClick: () => {
        },
        onSave: (id, text) => {
        },
        onDelete: (id) => {
        },

        editIconSrc: "../../assets/check-black.svg",
        saveIconSrc: "../../assets/edit-black.svg",
        deleteIconSrc: "../../assets/delete-black.svg"
    };

    state = {
        isEditing: false, text: "",
    };

    setProps(props) {
        super.setProps(props);

        if (this.props.text !== this.state.text && !this.state.isEditing) {
            this.state.text = this.props.text;
        }

        return this;
    }

    startEditing() {
        this.state.isEditing = true;
        this.rerender();
        return this;
    }

    #renderTextElement() {
        if (this.state.isEditing) {
            const input = document.createElement("input");
            input.className = "project-item__input";
            input.value = this.state.text;
            return input;
        }

        const p = document.createElement("p");
        p.className = "project-item__text";
        p.textContent = this.state.text;
        return p;
    }

    #renderActionButton(textElement) {
        const button = new Button()
            .setIcon(this.state.isEditing ? this.props.editIconSrc : this.props.saveIconSrc)
            .hasActiveBackground()
            .onClick((event) => this.#handleActionClick(event, textElement));

        const elem = button.render();
        elem.classList.add("project-item__action-button");
        return elem;
    }

    #renderDeleteButton() {
        const deleteButton = new Button()
            .setIcon(this.props.deleteIconSrc)
            .hasActiveBackground()
            .onClick(() => this.props.onDelete(this.props.id));

        const elem = deleteButton.render();
        elem.classList.add("project-item__action-button");
        return elem;
    }

    #handleActionClick(event, textElement) {
        event.stopPropagation();

        if (this.state.isEditing) {
            const newText = textElement.value.trim();

            if (!newText.length) {
                return;
            }

            this.state.text = newText;
            this.props.onSave(this.props.id, newText);
        }

        this.state.isEditing = !this.state.isEditing;
        this.rerender();
    }

    render() {
        const item = document.createElement("div");
        item.className = "project-item";

        if (this.props.isSelected) item.classList.add("project-item--selected");
        if (this.state.isEditing) item.classList.add("project-item--editing");

        const content = document.createElement("div");
        content.className = "project-item__content";

        const textElement = this.#renderTextElement();
        content.append(textElement);

        item.append(content, this.#renderActionButton(textElement));

        if (!this.state.isEditing) {
            item.append(this.#renderDeleteButton());
        }

        item.addEventListener("click", () => {
            if (!this.state.isEditing) {
                this.props.onClick(this.props.id);
            }
        });

        return item;
    }
}