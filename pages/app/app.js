"use strict"

import {Header} from "../../components/header/Header.js";
import {Main} from "../../components/main/Main.js";


const app = document.getElementById('app');

const header = new Header();

const main = new Main();

header.mount(app);
main.mount(app);

