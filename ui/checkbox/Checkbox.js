"use strict"

import {Component} from "../../Component.js";

export class Checkbox extends Component {

    state = {
        iconSrc: null,
        onClick: null,
        active: false,
    };

    setIcon(src) {
        return this.setState({iconSrc: src});
    }

    onClick(callback) {
        return this.setState({onClick: callback});
    }

    isActive(isActive) {
        return this.setState({active: isActive});
    }

    render() {

        let checkbox;
        if(this.state.iconSrc){
            checkbox = document.createElement('img');
            checkbox.src = this.state.iconSrc;
        }
        else{
            checkbox = document.createElement('div');
        }

        checkbox.className = "checkbox";

        if (this.state.active) {
            checkbox.style.backgroundColor = "lightgreen";
        } else {
            checkbox.style.backgroundColor = "transparent";
        }

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