"use strict"

import {Header} from "./components/header/Header.js";
import {TodoItem} from "./components/todoItem/TodoItem.js";


const app = document.getElementById('app');

const header = new Header()
    .onAddClick(() => {
        const todoItem = new TodoItem();
        todoItem.mount(app);
    });
header.mount(app);
