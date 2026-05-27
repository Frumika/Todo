import {Component} from "../../ui/Component.js";
import {LeftAside} from "../../components/leftAside/LeftAside.js";
import {Content} from "../../components/content/Content.js";
import {AuthService} from "../../services/AuthService.js";

export class MainPage extends Component {
    props = {
        onLogin: () => {},
        onRegister: () => {},
        onProfile: () => {},
        onLogout: () => {},
    }

    render() {
        const container = document.createElement("div");
        container.className = "main-page";

        const leftAside = new LeftAside()
            .setProps({
                onLogin: () => this.props.onLogin(),
                onRegister: () => this.props.onRegister(),
                onProfile: () => this.props.onProfile(),
                onLogout: async () => {
                    await AuthService.logout();
                    this.props.onLogout();
                },
            });

        const content = new Content();

        leftAside.mount(container);
        content.mount(container);

        return container;
    }
}