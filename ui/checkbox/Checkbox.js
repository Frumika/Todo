"use strict"

import {Component} from "../Component.js";

export class Checkbox extends Component {

    props = {
        onToggle: () => {},
        isActive: false,
    };

    onToggle(callback) {
        this.props.onToggle = callback;
        return this;
    }

    isActive(isActive) {
        this.props.isActive = isActive;
        return this;
    }

    render() {
        const checkbox = document.createElement('div');
        checkbox.className = "checkbox";

        if (this.props.isActive) {
            checkbox.style.backgroundColor = "lightgray";
        } else {
            checkbox.style.backgroundColor = "transparent";
        }

        if (this.props.onToggle) {
            checkbox.addEventListener('click', () => this.props.onToggle());
        }

        return checkbox;
    }
}