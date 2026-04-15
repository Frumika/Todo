"use strict"

import {Component} from "../../Component.js";

export class Checkbox extends Component {
    #iconSrc = undefined;
    #onClick = null;

    setIcon(src) {
        this.#iconSrc = src;
        return this;
    }

    onClick(callback) {
        this.#onClick = callback;
        return this;
    }

    render() {
        const checkbox = document.createElement('img');
        checkbox.className = "checkbox";
        checkbox.src = this.#iconSrc;

        return checkbox;
    }
}