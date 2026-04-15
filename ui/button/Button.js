"use strict"


import {Component} from "../../Component.js";

export class Button extends Component {
    #iconSrc = undefined;
    #text = undefined;
    #onClick = null;

    #hasBorder = false;
    #borderWidth = undefined;
    #borderStyle = undefined;
    #borderColor = undefined;

    setIcon(src) {
        this.#iconSrc = src;
        return this;
    }

    setText(text) {
        this.#text = text;
        return this;
    }

    setBorder({width, style, color} = {}) {
        this.#hasBorder = true;

        if (width) this.#borderWidth = width;
        if (style) this.#borderStyle = style;
        if (color) this.#borderColor = color;

        return this;
    }

    onClick(callback) {
        this.#onClick = callback;
        return this;
    }

    render() {
        const button = document.createElement('div');
        button.className = "button";


        if (this.#iconSrc) {
            const icon = document.createElement('img');
            icon.className = "button__img";
            icon.src = this.#iconSrc;
            icon.alt = this.#text;

            button.append(icon);
        }

        if (this.#text) {
            const text = document.createElement('p');
            text.className = "button__text";
            text.textContent = this.#text;

            button.append(text);
        }

        this.#applyStyle(button);
        this.#addListener(button);

        return button;
    }

    #addListener(button) {
        if (this.#onClick) {
            button.addEventListener('click', (event) => {
                this.#onClick(event);
            });
        }
    }

    #applyStyle(button) {
        if (this.#hasBorder) {
            button.style.borderWidth = this.#borderWidth;
            button.style.borderStyle = this.#borderStyle;
            button.style.borderColor = this.#borderColor;
        }
    }
}