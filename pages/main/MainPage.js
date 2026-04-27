import {Component} from "../../ui/Component.js";
import {LeftAside} from "../../components/leftAside/LeftAside.js";
import {Content} from "../../components/content/Content.js";

export class MainPage extends Component {
    props = {
        onLogin: () => {
        },
        onRegister: () => {
        },
    }

    render() {
        const container = document.createElement("div");
        container.className = "main-page";

        const leftAside = new LeftAside()
            .setProps({
                onLogin: () => this.props.onLogin(),
                onRegister: () => this.props.onRegister()
            });
        const content = new Content();

        leftAside.mount(container);
        content.mount(container);

        return container;
    }
}