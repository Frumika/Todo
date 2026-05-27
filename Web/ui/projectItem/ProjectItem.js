import {Component} from "../Component.js";
import {Button} from "../Button/Button.js";

export class ProjectItem extends Component {
    props = {
        id: null,
        text: "",
        isSelected: false,

        onClick: () => {
        },

        onSave: (id, text) => {
        },

        editIconSrc: "../../assets/check-black.svg",
        saveIconSrc: "../../assets/edit-black.svg",
    };

    state = {
        isEditing: false,
        text: "",
    };


    setProps(props) {
        super.setProps(props);

        this.state.text = this.props.text;

        return this;
    }

    onClick(callback) {
        this.props.onClick = callback;
        return this;
    }

    onSave(callback) {
        this.props.onSave = callback;
        return this;
    }

    render() {
        const item = document.createElement("div");
        item.className = "project-item";

        if (this.props.isSelected) {
            item.classList.add("project-item--selected");
        }

        if (this.state.isEditing) {
            item.classList.add("project-item--editing");
        }

        const content = document.createElement("div");
        content.className = "project-item__content";

        let textElement;

        if (this.state.isEditing) {
            textElement = document.createElement("input");
            textElement.className = "project-item__input";
            textElement.value = this.state.text;
        }
        else {
            textElement = document.createElement("p");
            textElement.className = "project-item__text";
            textElement.textContent = this.state.text;
        }

        content.append(textElement);

        const actionButton = new Button()
            .setIcon(
                this.state.isEditing
                    ? this.props.editIconSrc
                    : this.props.saveIconSrc
            )
            .hasActiveBackground()
            .onClick((event) => {
                event.stopPropagation();

                if (this.state.isEditing) {
                    const newText = textElement.value.trim();

                    if (!newText.length) {
                        return;
                    }

                    this.state.text = newText;

                    this.props.onSave(
                        this.props.id,
                        newText
                    );
                }

                this.state.isEditing = !this.state.isEditing;

                this.rerender();
            });

        const actionButtonElement = actionButton.render();
        actionButtonElement.classList.add("project-item__action-button");

        item.append(
            content,
            actionButtonElement
        );

        item.addEventListener("click", () => {
            if (!this.state.isEditing) {
                this.props.onClick();
            }
        });

        return item;
    }
}