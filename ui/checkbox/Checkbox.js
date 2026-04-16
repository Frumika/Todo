"use strict"

import {Component} from "../../Component.js";

export class Checkbox extends Component {
    state = {
        iconSrc: null,
        onClick: null,
    };


    setIcon(src) {
        return this.setState({iconSrc: src});
    }

    onClick(callback) {
        return this.setState({onClick: callback});
    }

    render() {
        const checkbox = document.createElement('img');
        checkbox.className = "checkbox";
        checkbox.src = this.state.iconSrc;

        this.#addListener(checkbox);

        return checkbox;
    }

    #addListener(checkbox) {
        if (this.state.onClick) {
            checkbox.addEventListener('click', (event) => {
                this.state.onClick(event);
            });
        }
    }
}