"use strict"


import {Component} from "../../Component.js";

export class Button extends Component {

    state = {
        iconSrc: null,
        text: null,
        onClick: null,

        hasBorder: false,
        borderWidth: null,
        borderStyle: null,
        borderColor: null,
    };

    setIcon(src) {
        return this.setState({iconSrc: src});
    }

    setText(text) {
        return this.setState({text});
    }

    setBorder({width, style, color} = {}) {
        return this.setState({
            hasBorder: true,
            borderWidth: width,
            borderStyle: style,
            borderColor: color,
        });
    }

    onClick(callback) {
        return this.setState({onClick: callback});
    }

    render() {
        const button = document.createElement('div');
        button.className = "button";

        if (this.state.iconSrc) {
            const icon = document.createElement('img');
            icon.className = "button__img";
            icon.src = this.state.iconSrc;
            icon.alt = this.state.text;

            button.append(icon);
        }

        if (this.state.text) {
            const text = document.createElement('p');
            text.className = "button__text";
            text.textContent = this.state.text;

            button.append(text);
        }

        this.#applyStyle(button);
        this.#addListener(button);

        return button;
    }

    #addListener(button) {
        if (this.state.onClick) {
            button.addEventListener('click', (event) => {
                this.state.onClick(event);
            });
        }
    }

    #applyStyle(button) {
        if (this.state.hasBorder) {
            button.style.borderWidth = this.state.borderWidth;
            button.style.borderStyle = this.state.borderStyle;
            button.style.borderColor = this.state.borderColor;
        }
    }
}