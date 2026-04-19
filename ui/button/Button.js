"use strict"


import {Component} from "../Component.js";

export class Button extends Component {

    props = {
        iconSrc: null,
        text: null,
        onClick: () => {},

        hasBorder: false,
        borderWidth: null,
        borderStyle: null,
        borderColor: null,
    };

    setIcon(src) {
        this.props.iconSrc = src;
        return this;
    }

    setText(text) {
        this.props.text = text;
        return this;
    }

    setBorder({width, style, color} = {}) {
        this.props = {
            ...this.props,
            hasBorder: true,
            borderWidth: width,
            borderStyle: style,
            borderColor: color,
        };

        return this;
    }

    onClick(callback) {
        this.props.onClick = callback;
        return this;
    }

    render() {
        const button = document.createElement('div');
        button.className = "button";

        if (this.props.iconSrc) {
            const icon = document.createElement('img');
            icon.className = "button__img";
            icon.src = this.props.iconSrc;
            icon.alt = this.props.text;

            button.append(icon);
        }

        if (this.props.text) {
            const text = document.createElement('p');
            text.className = "button__text";
            text.textContent = this.props.text;

            button.append(text);
        }

        this.#applyStyle(button);
        this.#addListener(button);

        return button;
    }

    #addListener(button) {
        if (this.props.onClick) {
            button.addEventListener('click', () => this.props.onClick());
        }
    }

    #applyStyle(button) {
        if (this.props.hasBorder) {
            button.style.borderWidth = this.props.borderWidth;
            button.style.borderStyle = this.props.borderStyle;
            button.style.borderColor = this.props.borderColor;
        }
    }
}