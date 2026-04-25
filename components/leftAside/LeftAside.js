"use strict"


import {Component} from "../../ui/Component.js";

export class LeftAside extends Component{

    render(){
        const leftAside = document.createElement("div");
        leftAside.className = "left-aside";

        const leftAsideContainer = document.createElement("div");
        leftAsideContainer.className = "left-aside__container";

        leftAside.append(leftAsideContainer);

        return leftAside;
    }

}