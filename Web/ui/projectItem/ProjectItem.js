import {Component} from "../Component.js";

export class ProjectItem extends Component {

    props = {
        id: null,
        text: "",
        isSelected: false,

        onClick: () => {
        },
    };

    onClick(callback) {
        this.props.onClick = callback;
        return this;
    }

    render() {
        const item = document.createElement("div");
        item.className = "project-item";

        if (this.props.isSelected) {
            item.classList.add("project-item--selected");
        }

        const text = document.createElement("p");
        text.className = "project-item__text";
        text.textContent = this.props.text;

        item.append(text);

        item.addEventListener("click", () => {
            this.props.onClick();
        });

        return item;
    }
}