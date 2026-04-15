"use strict"


import {Component} from "../../Component.js";

export class Logo extends Component {
    #text;

    constructor(text = "") {
        super();
        this.#text = text;
    }

    render() {
        const logoText = document.createElement("p");
        logoText.className = "logo-text";
        logoText.textContent = this.#text;

        return logoText;
    }
}