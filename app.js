"use strict"

import {Router} from "./pages/Router.js";

const root = document.getElementById('app');

const router = new Router(root);
router.navigate('main');