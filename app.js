"use strict"

import {Header} from "./components/header/Header.js";
import {TodoItem} from "./components/item/TodoItem.js";
import {Checkbox} from "./ui/checkbox/Checkbox.js";


const app = document.getElementById('app');

const header = new Header();
header.mount(app);

const todoItem = new TodoItem()
    .setTitle("Заголовок заметки")
    .setDescription("Текст очень важной заметки");

todoItem.mount(app);