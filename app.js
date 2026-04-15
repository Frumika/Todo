"use strict"

import {Header} from "./components/header/Header.js";

const app = document.getElementById('app');

const header = new Header();
header.mount(app);