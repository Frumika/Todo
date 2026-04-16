"use strict"

import {Header} from "./components/header/Header.js";
import {TodoItem} from "./components/item/TodoItem.js";


const app = document.getElementById('app');

const header = new Header()
    .onAddClick(() => {
        const todoItem = new TodoItem()
            .setTitle("Заголовок заметки")
            .setDescription("Текст очень важной заметки");

        todoItem.mount(app);
    });
header.mount(app);
