"use strict"

import {Content} from "../../components/content/Content.js";
import {LeftAside} from "../../components/leftAside/LeftAside.js";

const app = document.getElementById('app');

const leftAside = new LeftAside();
leftAside.mount(app);

const content = new Content();
content.mount(app);
