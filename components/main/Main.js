"use strict"


import {Component} from "../../ui/Component.js";
import {TodoItem} from "../todoItem/TodoItem.js";

export class Main extends Component {

    render() {
        const mainContainer = document.createElement("div");
        mainContainer.className = "main-container";

        return mainContainer;
    }

    addTodoItem() {
        if (!this.elem) return;

        const todoItem = new TodoItem();
        todoItem.mount(this.elem);
    }
}